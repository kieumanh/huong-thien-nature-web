import { onRequest as handleContact } from '../functions/api/contact.ts';
import { onRequestGet as handleContactConfig } from '../functions/api/contact-config.ts';
import { json, type ContactEnv } from '../functions/_lib/contact.ts';

interface WorkerEnv extends ContactEnv {
  INVENTORY_SITE_TOKEN?: string;
  ASSETS: { fetch(request: Request): Promise<Response> };
}

const worker = {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/contact') {
      return handleContact({ request, env });
    }

    if (pathname === '/api/contact-config') {
      if (request.method !== 'GET') {
        return json({ ok: false, code: 'method_not_allowed' }, 405, { Allow: 'GET' });
      }
      return handleContactConfig({ env });
    }

    if (pathname === '/api/shop-stock') {
      if (request.method !== 'GET') return json({ ok: false }, 405, { Allow: 'GET' });
      if (env.INVENTORY_SITE_TOKEN) {
        try {
          const upstream = await fetch('https://huong-thien-inventory.kieumanh2211.chatgpt.site/shop-availability', {
            headers: { 'OAI-Sites-Authorization': `Bearer ${env.INVENTORY_SITE_TOKEN}` },
            redirect: 'error',
            signal: AbortSignal.timeout(4000),
          });
          if (upstream.ok) {
            const { stock } = await upstream.json() as { stock: Record<string, unknown> };
            const availability = Object.fromEntries(Object.entries(stock).filter(([slug, value]) =>
              /^[a-z0-9-]{1,100}$/.test(slug) && (value === 'in_stock' || value === 'out_of_stock')));
            return Response.json({ stock: availability }, { headers: { 'Cache-Control': 'public, max-age=30' } });
          }
        } catch {
          // The catalogue remains usable and shows unknown when the inventory is unavailable.
        }
      }
      return json({ stock: {} }, 503);
    }

    if (pathname.startsWith('/api/')) {
      return json({ ok: false, code: 'not_found' }, 404);
    }

    return env.ASSETS.fetch(request);
  },
};

export default worker;
