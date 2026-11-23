import { normalizeFeed } from './data/shop-feed.ts';
import { onRequest as handleContact } from '../functions/api/contact.ts';
import { onRequestGet as handleContactConfig } from '../functions/api/contact-config.ts';
import { json, type ContactEnv } from '../functions/_lib/contact.ts';

interface WorkerEnv extends ContactEnv {
  /** Optional override of the Zen Flow Inventory public feed (https only). */
  INVENTORY_FEED_URL?: string;
  ASSETS: { fetch(request: Request): Promise<Response> };
}

const DEFAULT_FEED_URL = 'https://zen-flow-inventory.huongthiennature.com/api/shop-feed';
const MAX_FEED_BYTES = 512 * 1024;

/** Server-side proxy of the Zen Flow catalogue: the browser never talks to the inventory, and only whitelisted fields pass through. */
async function shopFeed(request: Request, env: WorkerEnv): Promise<Response> {
  const unavailable = () => json({ ok: false, code: 'unavailable' }, 503, { 'Cache-Control': 'no-store' });
  try {
    const configured = env.INVENTORY_FEED_URL ? new URL(env.INVENTORY_FEED_URL) : null;
    const target = configured?.protocol === 'https:' ? configured.href : DEFAULT_FEED_URL;
    const upstream = await fetch(target, { headers: { Accept: 'application/json' }, redirect: 'error', signal: AbortSignal.timeout(4000) });
    if (!upstream.ok) { console.warn('shop-feed upstream response', upstream.status); return unavailable(); }
    const body = await upstream.text();
    if (body.length > MAX_FEED_BYTES) return unavailable();
    const feed = normalizeFeed(JSON.parse(body));
    if (!feed) return unavailable();
    return new Response(request.method === 'HEAD' ? null : JSON.stringify(feed), {
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300', 'X-Content-Type-Options': 'nosniff' },
    });
  } catch (error) {
    console.warn('shop-feed request failed', error instanceof Error ? error.message : 'unknown');
    return unavailable();
  }
}

/** JSON endpoints are never pages: forbid framing, referrers and any content-type guessing. */
function hardenApi(response: Response): Response {
  const hardened = new Response(response.body, response);
  hardened.headers.set('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'");
  hardened.headers.set('X-Content-Type-Options', 'nosniff');
  hardened.headers.set('Referrer-Policy', 'no-referrer');
  hardened.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  return hardened;
}

const worker = {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname.startsWith('/api/')) return hardenApi(await route(request, env, pathname));
    return route(request, env, pathname);
  },
};

async function route(request: Request, env: WorkerEnv, pathname: string): Promise<Response> {
  if (pathname === '/api/contact') {
    return handleContact({ request, env });
  }

  if (pathname === '/api/contact-config') {
    if (request.method !== 'GET') {
      return json({ ok: false, code: 'method_not_allowed' }, 405, { Allow: 'GET' });
    }
    return handleContactConfig({ env });
  }

  if (pathname === '/api/shop-feed') {
    if (request.method !== 'GET' && request.method !== 'HEAD') return json({ ok: false }, 405, { Allow: 'GET, HEAD' });
    return shopFeed(request, env);
  }

  if (pathname.startsWith('/api/')) {
    return json({ ok: false, code: 'not_found' }, 404);
  }

  return env.ASSETS.fetch(request);
}

export default worker;
