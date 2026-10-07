import { configured, emailMessage, json, readBody, validatePayload, type ContactEnv } from '../_lib/contact.ts';

type Context = { request: Request; env: ContactEnv };

export async function onRequest({ request, env }: Context) {
  if (request.method !== 'POST') return json({ ok: false, code: 'method_not_allowed' }, 405, { Allow: 'POST' });
  const origin = new URL(request.url).origin;
  if (request.headers.get('origin') !== origin || request.headers.get('sec-fetch-site') === 'cross-site') {
    return json({ ok: false, code: 'invalid_origin' }, 403);
  }
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    return json({ ok: false, code: 'invalid_content_type' }, 415);
  }
  let raw: unknown;
  try {
    raw = await readBody(request);
  } catch (error) {
    return json({ ok: false, code: error instanceof RangeError ? 'body_too_large' : 'invalid_data' }, error instanceof RangeError ? 413 : 400);
  }
  const payload = validatePayload(raw);
  if (!payload) return json({ ok: false, code: 'invalid_data' }, 422);
  if (!configured(env)) return json({ ok: false, code: 'unavailable' }, 503);

  try {
    const verificationResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY!.trim(), response: payload.turnstileToken }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!verificationResponse.ok) return json({ ok: false, code: 'unavailable' }, 503);
    const verification = await verificationResponse.json() as { success?: boolean; hostname?: string; action?: string };
    if (verification.success !== true || verification.hostname !== new URL(request.url).hostname || verification.action !== 'contact') {
      return json({ ok: false, code: 'verification_failed' }, 400);
    }
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY!.trim()}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `contact/${payload.requestId}`,
      },
      body: JSON.stringify(emailMessage(payload, env)),
      signal: AbortSignal.timeout(10_000),
    });
    if (response.status === 429) return json({ ok: false, code: 'busy' }, 429, { 'Retry-After': '30' });
    if (!response.ok) return json({ ok: false, code: 'send_failed' }, 502);
    const receipt = await response.json() as { id?: unknown };
    if (typeof receipt.id !== 'string' || !receipt.id) return json({ ok: false, code: 'send_failed' }, 502);
    return json({ ok: true });
  } catch {
    // Do not log personal data, tokens, provider bodies or configuration values.
    return json({ ok: false, code: 'send_failed' }, 502);
  }
}
