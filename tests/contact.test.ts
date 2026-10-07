import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequest } from '../functions/api/contact.ts';
import { onRequestGet } from '../functions/api/contact-config.ts';
import type { ContactEnv } from '../functions/_lib/contact.ts';

// All outbound requests are mocked. These are test fixtures, not credentials.
const env: ContactEnv = {
  RESEND_API_KEY: 'test-only-not-a-credential',
  CONTACT_FROM_EMAIL: 'Hương Thiền Nature <sender@example.com>',
  CONTACT_TO_EMAIL: 'receiver@example.com',
  TURNSTILE_SITE_KEY: 'test-only-public-key',
  TURNSTILE_SECRET_KEY: 'test-only-not-a-secret',
};
const payload = {
  name: 'Người thử nghiệm', email: 'visitor@example.com', interest: 'meditation',
  message: 'Tôi muốn tìm hiểu thực tập.\nĐây là lời nhắn thử nghiệm.',
  language: 'vi', consent: true, website: '', turnstileToken: 'test-only-token',
  requestId: 'd6e2277e-9518-44cf-af69-6c39f26c8372',
};
function request(data: unknown = payload, headers: Record<string, string> = {}) {
  return new Request('https://example.com/api/contact', {
    method: 'POST', headers: { Origin: 'https://example.com', 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(data),
  });
}
function response(data: unknown, status = 200) { return Response.json(data, { status }); }
const verified = { success: true, hostname: 'example.com', action: 'contact' };

test('public configuration exposes only availability and public widget key', async () => {
  assert.deepEqual(await onRequestGet({ env }).json(), { available: true, siteKey: env.TURNSTILE_SITE_KEY });
  assert.deepEqual(await onRequestGet({ env: {} }).json(), { available: false, siteKey: null });
  assert.deepEqual(await onRequestGet({ env: { ...env, CONTACT_FROM_EMAIL: 'bad\r\nSender <sender@example.com>' } }).json(), { available: false, siteKey: null });
});

test('valid submission verifies Turnstile and sends email to configured receiver', async t => {
  const calls: { url: string; init: RequestInit }[] = [];
  t.mock.method(globalThis, 'fetch', async (url: unknown, init: RequestInit) => {
    calls.push({ url: String(url), init });
    return calls.length === 1 ? response(verified) : response({ id: 'test-only-email-receipt' });
  });
  const result = await onRequest({ request: request(), env });
  assert.equal(result.status, 200);
  assert.deepEqual(await result.json(), { ok: true });
  assert.equal(calls.length, 2);
  assert.equal(calls[0].url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
  const verification = new URLSearchParams(String(calls[0].init.body));
  assert.equal(verification.get('response'), payload.turnstileToken);
  assert.equal(verification.get('secret'), env.TURNSTILE_SECRET_KEY);
  assert.equal(calls[1].url, 'https://api.resend.com/emails');
  const headers = new Headers(calls[1].init.headers);
  assert.equal(headers.get('Idempotency-Key'), 'contact/' + payload.requestId);
  const mail = JSON.parse(String(calls[1].init.body));
  assert.equal(mail.from, env.CONTACT_FROM_EMAIL);
  assert.deepEqual(mail.to, [env.CONTACT_TO_EMAIL]);
  assert.equal(mail.reply_to, payload.email);
  assert(mail.text.includes(payload.message));
  assert.equal(mail.html, undefined, 'User input must not become HTML');
  assert.equal(result.headers.get('Cache-Control'), 'no-store');
});

for (const [label, changes] of Object.entries({
  email: { email: 'invalid' }, consent: { consent: false }, name: { name: 'Line\r\nInjection' },
  'long name': { name: 'x'.repeat(101) }, message: { message: 'short' },
  'long message': { message: 'x'.repeat(5001) }, interest: { interest: 'unknown' },
  'honeypot': { website: 'spam.example' }, token: { turnstileToken: '' },
  'long token': { turnstileToken: 'x'.repeat(2049) }, language: { language: 'invalid' },
  requestId: { requestId: 'invalid' }, 'wrong field type': { name: 12 },
})) {
  test('rejects invalid ' + label + ' without outbound calls', async t => {
    const mock = t.mock.method(globalThis, 'fetch', async () => { throw new Error('must not fetch'); });
    const result = await onRequest({ request: request({ ...payload, ...changes }), env });
    assert.equal(result.status, 422);
    assert.equal(mock.mock.callCount(), 0);
  });
}

test('only same-origin JSON POST is accepted', async t => {
  const mock = t.mock.method(globalThis, 'fetch', async () => { throw new Error('must not fetch'); });
  assert.equal((await onRequest({ request: new Request('https://example.com/api/contact'), env })).status, 405);
  assert.equal((await onRequest({ request: request(payload, { Origin: 'https://another.example' }), env })).status, 403);
  assert.equal((await onRequest({ request: request(payload, { Origin: '' }), env })).status, 403);
  assert.equal((await onRequest({ request: request(payload, { 'Sec-Fetch-Site': 'cross-site' }), env })).status, 403);
  assert.equal((await onRequest({ request: request(payload, { 'Content-Type': 'text/plain' }), env })).status, 415);
  assert.equal(mock.mock.callCount(), 0);
});

test('rejects malformed and oversized bodies, with and without content-length', async t => {
  const mock = t.mock.method(globalThis, 'fetch', async () => { throw new Error('must not fetch'); });
  const malformed = new Request('https://example.com/api/contact', { method: 'POST', headers: { Origin: 'https://example.com', 'Content-Type': 'application/json' }, body: '{' });
  assert.equal((await onRequest({ request: malformed, env })).status, 400);
  assert.equal((await onRequest({ request: request(payload, { 'Content-Length': '99999' }), env })).status, 413);
  assert.equal((await onRequest({ request: request({ ...payload, message: 'x'.repeat(33_000) }), env })).status, 413);
  assert.equal(mock.mock.callCount(), 0);
});

test('missing configuration returns unavailable without a fake success', async t => {
  const mock = t.mock.method(globalThis, 'fetch', async () => { throw new Error('must not fetch'); });
  const result = await onRequest({ request: request(), env: {} });
  assert.equal(result.status, 503);
  assert.deepEqual(await result.json(), { ok: false, code: 'unavailable' });
  assert.equal(mock.mock.callCount(), 0);
});

for (const [label, changes] of Object.entries({
  'invalid token': { success: false }, 'different hostname': { hostname: 'another.example' },
  'different action': { action: 'login' }, 'missing action': { action: undefined },
})) {
  test('Turnstile rejects ' + label + ' before email is sent', async t => {
    const mock = t.mock.method(globalThis, 'fetch', async () => response({ ...verified, ...changes }));
    const result = await onRequest({ request: request(), env });
    assert.equal(result.status, 400);
    assert.equal(mock.mock.callCount(), 1);
  });
}

test('verification service failure is not treated as a passed challenge', async t => {
  const mock = t.mock.method(globalThis, 'fetch', async () => response({}, 503));
  assert.equal((await onRequest({ request: request(), env })).status, 503);
  assert.equal(mock.mock.callCount(), 1);
});

for (const providerStatus of [401, 403, 422, 500, 503]) {
  test('email provider HTTP ' + providerStatus + ' never reports success', async t => {
    let calls = 0;
    t.mock.method(globalThis, 'fetch', async () => ++calls === 1 ? response(verified) : response({}, providerStatus));
    const result = await onRequest({ request: request(), env });
    assert.equal(result.status, 502);
    assert.deepEqual(await result.json(), { ok: false, code: 'send_failed' });
  });
}

test('provider rate limit returns retry guidance', async t => {
  let calls = 0;
  t.mock.method(globalThis, 'fetch', async () => ++calls === 1 ? response(verified) : response({}, 429));
  const result = await onRequest({ request: request(), env });
  assert.equal(result.status, 429);
  assert.equal(result.headers.get('Retry-After'), '30');
  assert.deepEqual(await result.json(), { ok: false, code: 'busy' });
});

test('network failure and missing provider receipt never report success', async t => {
  let calls = 0;
  const mock = t.mock.method(globalThis, 'fetch', async () => {
    if (++calls === 1) return response(verified);
    throw new Error('test network failure');
  });
  assert.equal((await onRequest({ request: request(), env })).status, 502);
  calls = 0;
  mock.mock.mockImplementation(async () => ++calls === 1 ? response(verified) : response({}));
  assert.equal((await onRequest({ request: request(), env })).status, 502);
});

test('unchanged retries retain the same email idempotency key', async t => {
  const keys: (string | null)[] = [];
  t.mock.method(globalThis, 'fetch', async (url: unknown, init: RequestInit) => {
    if (String(url).includes('siteverify')) return response(verified);
    keys.push(new Headers(init.headers).get('Idempotency-Key'));
    return response({ id: 'same-test-receipt' });
  });
  assert.equal((await onRequest({ request: request(), env })).status, 200);
  assert.equal((await onRequest({ request: request({ ...payload, turnstileToken: 'new-test-only-token' }), env })).status, 200);
  assert.deepEqual(keys, ['contact/' + payload.requestId, 'contact/' + payload.requestId]);
});
