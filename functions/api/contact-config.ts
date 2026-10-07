import { configured, json, type ContactEnv } from '../_lib/contact.ts';

export function onRequestGet({ env }: { env: ContactEnv }) {
  const available = configured(env);
  return json({ available, siteKey: available ? env.TURNSTILE_SITE_KEY!.trim() : null });
}
