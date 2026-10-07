import { onRequest as contact } from '../functions/api/contact.ts';
import { onRequestGet as contactConfig } from '../functions/api/contact-config.ts';
import { json, type ContactEnv } from '../functions/_lib/contact.ts';

interface AssetsBinding {
  fetch(request: Request): Promise<Response>;
}

interface Env extends ContactEnv {
  ASSETS: AssetsBinding;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact') {
      return contact({ request, env });
    }

    if (url.pathname === '/api/contact-config') {
      if (request.method !== 'GET') {
        return json({ ok: false, code: 'method_not_allowed' }, 405, { Allow: 'GET' });
      }
      return contactConfig({ env });
    }

    if (url.pathname.startsWith('/api/')) {
      return json({ ok: false, code: 'not_found' }, 404);
    }

    return env.ASSETS.fetch(request);
  },
};
