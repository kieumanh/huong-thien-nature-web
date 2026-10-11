import { onRequest as handleContact } from '../functions/api/contact.ts';
import { onRequestGet as handleContactConfig } from '../functions/api/contact-config.ts';
import { json, type ContactEnv } from '../functions/_lib/contact.ts';
import { handleNatureJournal } from './lib/studio-journal.mjs';

interface WorkerEnv extends ContactEnv {
  ASSETS: { fetch(request: Request): Promise<Response> };
  STUDIO: { fetch(request: Request): Promise<Response> };
}

const worker = {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === '/sitemap.xml' || /^\/(vi\/tan-van|en\/journal)\//.test(pathname)) {
      return handleNatureJournal(request, env, undefined, { staging: false });
    }

    if (pathname === '/api/contact') {
      return handleContact({ request, env });
    }

    if (pathname === '/api/contact-config') {
      if (request.method !== 'GET') {
        return json({ ok: false, code: 'method_not_allowed' }, 405, { Allow: 'GET' });
      }
      return handleContactConfig({ env });
    }

    if (pathname.startsWith('/api/')) {
      return json({ ok: false, code: 'not_found' }, 404);
    }

    return env.ASSETS.fetch(request);
  },
};

export default worker;
