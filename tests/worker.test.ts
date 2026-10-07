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
