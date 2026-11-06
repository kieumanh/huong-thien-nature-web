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
          const catalogue = await env.ASSETS.fetch(new Request(new URL('/catalogue/inventory.json', request.url)));
          if (!catalogue.ok) return json({ stock: {} }, 503);
          const upstream = await fetch('https://huong-thien-inventory.kieumanh2211.chatgpt.site/shop-availability', {
            method: 'POST',
            headers: {
              'OAI-Sites-Authorization': `Bearer ${env.INVENTORY_SITE_TOKEN}`,
              'Content-Type': 'application/json',
              'x-ht-inventory': '1',
            },
            body: await catalogue.text(),
            redirect: 'error',
            signal: AbortSignal.timeout(4500),
          });
          if (upstream.ok) {
            const { stock } = await upstream.json() as { stock: Record<string, unknown> };
            const availability = Object.fromEntries(Object.entries(stock).filter(([slug, value]) =>
              /^[a-z0-9-]{1,100}$/.test(slug) && (value === 'in_stock' || value === 'out_of_stock')));
            return Response.json({ stock: availability }, { headers: { 'Cache-Control': 'public, max-age=30' } });
          }
          console.warn('shop-stock upstream response', upstream.status);
        } catch (error) {
          console.warn('shop-stock request failed', error instanceof Error ? error.name : 'unknown');
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
