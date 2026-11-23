import assert from 'node:assert/strict';
import test from 'node:test';
import worker from '../src/worker.ts';

const unusedAssets = {
  async fetch() {
    return new Response('static asset');
  },
};

test('Worker routes site pages to Static Assets', async () => {
  const response = await worker.fetch(new Request('https://example.test/vi/'), { ASSETS: unusedAssets });
  assert.equal(response.status, 200);
  assert.equal(await response.text(), 'static asset');
});

test('Worker serves only public contact configuration', async () => {
  const response = await worker.fetch(new Request('https://example.test/api/contact-config'), { ASSETS: unusedAssets });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { available: false, siteKey: null });
});

test('Worker rejects unsupported contact-config methods without falling through to assets', async () => {
  const response = await worker.fetch(new Request('https://example.test/api/contact-config', { method: 'POST' }), { ASSETS: unusedAssets });
  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'GET');
});

test('unknown API routes return JSON 404 instead of a static page', async () => {
  const response = await worker.fetch(new Request('https://example.test/api/missing'), { ASSETS: unusedAssets });
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { ok: false, code: 'not_found' });
});

test('Worker keeps the contact endpoint on the Worker when runtime bindings are absent', async () => {
  const payload = {
    name: 'Visitor', email: 'visitor@example.com', interest: 'other', message: 'A message long enough to pass validation.',
    language: 'en', consent: true, website: '', turnstileToken: 'test-token', requestId: '2a5a7271-60c8-4c86-b9fc-87de2f087651',
  };
  const response = await worker.fetch(new Request('https://example.test/api/contact', {
    method: 'POST',
    headers: { origin: 'https://example.test', 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  }), { ASSETS: unusedAssets });
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { ok: false, code: 'unavailable' });
});

const feedPayload = {
  schema: 1, updated: '2026-11-23T01:00:00.000Z', announcement: { text: 'Giao hàng thứ Bảy', tone: 'info' }, season: { name: 'Mùa thu hoạch', note: '' },
  products: [
    { id: 'p1', name: 'Gạo lứt đỏ', category: 'Ngũ cốc', unit: 'kg', price: 68000, theme: 'thuc-pham-sach', status: 'in', image: 'https://cdn.example.com/a.jpg', blurb: 'Gạo mới', season: '', keywords: ['gạo'], cost: 42000, sku: 'SECRET', lots: [{ code: 'X' }] },
    { id: 'p2', name: 'Thạch anh', category: 'Đá', unit: 'viên', price: 450000, theme: 'da-nang-luong', status: 'contact', image: 'http://insecure.example.com/a.jpg', blurb: '', season: '', keywords: [] },
    { id: 'p3', name: 'Chủ đề lạ', theme: 'khong-co', status: 'in' },
    { id: 'p4', name: 'Trạng thái lạ', theme: 'sach', status: 'weird' },
  ],
};

test('shop feed is proxied server-side, whitelisted, cached briefly and never leaks internal fields', async (t) => {
  const request = new Request('https://example.test/api/shop-feed');
  let target = '';
  t.mock.method(globalThis, 'fetch', async (url: string) => { target = String(url); return Response.json(feedPayload); });
  const response = await worker.fetch(request, { ASSETS: unusedAssets });
  assert.equal(response.status, 200);
  assert.equal(target, 'https://zen-flow-inventory.huongthiennature.com/api/shop-feed');
  assert.match(response.headers.get('cache-control') ?? '', /max-age=60/);
  const wire = await response.text();
  const feed = JSON.parse(wire);
  assert.deepEqual(feed.products.map((product: { id: string }) => product.id), ['p1', 'p2']);
  assert.equal(feed.products[1].price, null, 'contact-only items expose no price');
  assert.equal(feed.products[1].image, '', 'non-https images are dropped');
  for (const secret of ['42000', 'SECRET', 'lots', 'cost', 'sku']) assert(!wire.includes(secret), `leaked ${secret}`);
  assert.equal(feed.announcement.text, 'Giao hàng thứ Bảy');
});

test('shop feed honours an https override, rejects http overrides, and fails soft', async (t) => {
  const request = new Request('https://example.test/api/shop-feed');
  const calls: string[] = [];
  const upstream = t.mock.method(globalThis, 'fetch', async (url: string) => { calls.push(String(url)); return Response.json(feedPayload); });
  await worker.fetch(request, { ASSETS: unusedAssets, INVENTORY_FEED_URL: 'https://staging.example.com/api/shop-feed' });
  await worker.fetch(request, { ASSETS: unusedAssets, INVENTORY_FEED_URL: 'http://evil.example.com/feed' });
  assert.deepEqual(calls, ['https://staging.example.com/api/shop-feed', 'https://zen-flow-inventory.huongthiennature.com/api/shop-feed']);
  upstream.mock.mockImplementation(async () => new Response('nope', { status: 500 }));
  assert.equal((await worker.fetch(request, { ASSETS: unusedAssets })).status, 503);
  upstream.mock.mockImplementation(async () => Response.json({ schema: 2, products: [] }));
  assert.equal((await worker.fetch(request, { ASSETS: unusedAssets })).status, 503);
  upstream.mock.mockImplementation(async () => new Response('x'.repeat(600 * 1024)));
  assert.equal((await worker.fetch(request, { ASSETS: unusedAssets })).status, 503);
  upstream.mock.mockImplementation(async () => { throw new Error('network'); });
  const failed = await worker.fetch(request, { ASSETS: unusedAssets });
  assert.equal(failed.status, 503);
  assert.equal(failed.headers.get('cache-control'), 'no-store');
  assert.equal((await worker.fetch(new Request('https://example.test/api/shop-feed', { method: 'POST' }), { ASSETS: unusedAssets })).status, 405);
  assert.equal((await worker.fetch(new Request('https://example.test/api/shop-stock'), { ASSETS: unusedAssets })).status, 404, 'the retired stock endpoint is gone');
});

test('every API response is hardened as a non-page', async () => {
  for (const path of ['/api/contact-config', '/api/missing', '/api/shop-feed']) {
    const response = await worker.fetch(new Request('https://example.test' + path), { ASSETS: unusedAssets, INVENTORY_FEED_URL: 'http://insecure.test/feed' });
    assert.equal(response.headers.get('content-security-policy'), "default-src 'none'; frame-ancestors 'none'", path);
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff', path);
    assert.equal(response.headers.get('referrer-policy'), 'no-referrer', path);
    assert.equal(response.headers.get('cross-origin-resource-policy'), 'same-origin', path);
  }
  const page = await worker.fetch(new Request('https://example.test/vi/'), { ASSETS: unusedAssets });
  assert.equal(page.headers.get('content-security-policy'), null, 'pages get their CSP from the static _headers file');
});

test('contact endpoint honours an optional rate limiter and fails open when it errors', async () => {
  const request = () => new Request('https://example.test/api/contact', {
    method: 'POST', headers: { origin: 'https://example.test', 'content-type': 'application/json', 'cf-connecting-ip': '203.0.113.9' }, body: '{}',
  });
  const keys: string[] = [];
  const blocked = await worker.fetch(request(), { ASSETS: unusedAssets, CONTACT_LIMITER: { async limit({ key }) { keys.push(key); return { success: false }; } } });
  assert.equal(blocked.status, 429);
  assert.equal(blocked.headers.get('retry-after'), '60');
  assert.deepEqual(keys, ['203.0.113.9']);
  const broken = await worker.fetch(request(), { ASSETS: unusedAssets, CONTACT_LIMITER: { async limit() { throw new Error('limiter down'); } } });
  assert.equal(broken.status, 422, 'a limiter outage falls through to normal validation');
  const allowed = await worker.fetch(request(), { ASSETS: unusedAssets, CONTACT_LIMITER: { async limit() { return { success: true }; } } });
  assert.equal(allowed.status, 422);
});
