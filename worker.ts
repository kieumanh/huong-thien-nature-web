import { onRequest as handleContact } from './functions/api/contact.ts';
import { onRequestGet as handleContactConfig } from './functions/api/contact-config.ts';
import type { ContactEnv } from './functions/_lib/contact.ts';

interface Env extends ContactEnv {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/contact-config') {
      if (request.method !== 'GET') {
        return new Response(JSON.stringify({ ok: false, code: 'method_not_allowed' }), {
          status: 405,
          headers: { 'Content-Type': 'application/json; charset=utf-8', Allow: 'GET' },
        });
      }
      return handleContactConfig({ env });
    }

    if (pathname === '/api/contact') {
      return handleContact({ request, env });
    }

    return env.ASSETS.fetch(request);
  },
};
