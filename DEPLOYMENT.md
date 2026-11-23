# Cloudflare Worker deployment — Hương Thiền Nature

Production architecture: GitHub `main` → Cloudflare Workers Builds → Astro build in `dist` → Worker Static Assets. The Worker handles `/api/contact`, `/api/contact-config` and `/api/shop-feed`; all other requests are served from the static asset binding. Cloudflare Pages remains a separate optional demo and is not the production Worker configuration.

## Repository configuration

- `wrangler.worker.jsonc`: production Worker entrypoint, static assets, `/api/*` routing and `huongthiennature.com` custom domain.
- `src/worker.ts`: Worker router. It reuses the existing validated Resend/Turnstile API handlers.
- `wrangler.jsonc`: Pages demo configuration; do not use it for a Worker deploy.
- Worker name: `huong-thien-nature`.
- Website release: see `package.json` and `CHANGELOG.md` (Worker runtime introduced in 0.4.1).

## Configure Workers Builds

In Cloudflare Dashboard:

1. Open **Workers & Pages → Create application → Workers → Connect to Git** (or select the existing Worker and open **Settings → Builds**).
2. Connect repository `kieumanh/huong-thien-nature-web`, production branch `main`.
3. Set **Root directory** to `/`.
4. Set **Build command** to `npm run build`.
5. Set **Deploy command** to `npx wrangler deploy --config wrangler.worker.jsonc`.
6. Keep Preview command disabled until a separate preview Worker/config is created. Use Node.js 24 if the build environment exposes a Node version setting.
7. Ensure the Worker service is named `huong-thien-nature`, matching `name` in `wrangler.worker.jsonc`.
8. Save, then retry the failed build or push a new commit. Build should produce `dist`; deploy should use the Worker config explicitly.

Do not set the deploy command to bare `npx wrangler deploy`: the root `wrangler.jsonc` is for Pages. Do not enter `npm run deploy:worker` as the Workers Builds Deploy command, because that script builds again; use the command above after the separate build step. For a one-command local deploy, run `npm run deploy:worker`.

## Runtime variables and secrets

Open **Worker → Settings → Variables and Secrets** and configure these for Production:

| Name | Type | Value |
|---|---|---|
| `CONTACT_TO_EMAIL` | Text | The recipient inbox selected by the project owner; enter it only in Worker settings. |
| `CONTACT_FROM_EMAIL` | Text | Sender address verified in Resend, e.g. a verified address on `huongthiennature.com` |
| `TURNSTILE_SITE_KEY` | Text | Public site key from the Turnstile widget |
| `RESEND_API_KEY` | Secret | Resend API key with sending permission |
| `TURNSTILE_SECRET_KEY` | Secret | Secret key paired with the Turnstile widget |

Add `huongthiennature.com` as an allowed hostname on the Turnstile widget. The Worker validates both hostname and action (`contact`). Never paste API keys into source files, GitHub, or chat. Local development values can be copied from `.dev.vars.example` to `.dev.vars`; `.dev.vars` is ignored by Git.

For Resend, verify the sending domain and use an allowed sender in `CONTACT_FROM_EMAIL`. The recipient can be Gmail; a Gmail recipient does not make Gmail a verified sending domain. Configure the bindings before testing email delivery.

## Domain, DNS, and HTTPS

The Worker config declares `huongthiennature.com` as a Custom Domain. The zone must already be active in this Cloudflare account. On first deploy, Wrangler/Cloudflare provisions the Custom Domain and its DNS record. If deployment reports a conflicting existing DNS record, inspect the zone's DNS page and remove only the conflicting record for this hostname before retrying; do not delete unrelated records. Wait for the hostname and TLS certificate to become active.

After deploy, verify:

- `https://huongthiennature.com/vi/` and `/en/` load.
- `/robots.txt` and `/sitemap.xml` respond successfully.
- A missing path returns the generated 404 page.
- `GET /api/contact-config` returns only availability and the public Turnstile key (never secrets or recipient data).
- The form passes Turnstile and a real message arrives at the recipient inbox; inspect Spam and the Resend event. API success alone does not prove inbox delivery.
- HTTPS certificate, DNS, canonical URL and redirects are correct.

## Local checks and deploy

```bash
npm ci
npm run check
npm run test:contact
npm run audit
npm run build
npm run audit:build
npm run deploy:worker-dry-run
npm run dev:worker
```

`npm run deploy:worker-dry-run` builds the site and bundles the Worker without publishing. `npm run dev:worker` starts Wrangler locally with Worker routing and Static Assets. Direct authenticated deployment uses `npm run deploy:worker`; Workers Builds runs the separate build/deploy commands configured above.

## Release gates

- Review the Vietnamese and English copy, founder titles, imagery consent, responsive layouts, keyboard navigation and contrast.
- Configure all five runtime values and test delivery to the inbox.
- Keep privacy notice and service terms current before collecting personal information or accepting payments.
- Check the Cloudflare build's commit SHA and deployment version after Git integration runs. A successful GitHub push alone does not verify a Cloudflare deploy.
- Keep the Pages demo separate; it uses `wrangler.jsonc`, `npm run build`, output `dist`, and Pages Functions from `functions/`.

## Shop feed (Zen Flow Inventory)

`/api/shop-feed` proxies `https://zen-flow-inventory.huongthiennature.com/api/shop-feed` (read-only, published items only, cached 60 s). Override with the optional text variable `INVENTORY_FEED_URL` (https only). If the source is down the Worker answers 503 and the shop pages show their static fallback. `INVENTORY_SITE_TOKEN` and the old `/api/shop-stock` route no longer exist and can be deleted from Worker settings.

## Security headers

`npm run build` ends with `scripts/secure-headers.mjs`, which appends the Content-Security-Policy (SHA-256 hash for every inline script), HSTS, Permissions-Policy, COOP and immutable-cache rules to `dist/_headers`. Always deploy the output of `npm run build`, never of `astro build` alone; `npm run audit:build` fails if the CSP is missing or out of date. HSTS is `max-age=31536000` without `includeSubDomains`/`preload` until every `*.huongthiennature.com` host is confirmed HTTPS-only.

Verify after each deploy: `curl -sI https://huongthiennature.com/vi/ | grep -i -E "content-security|strict-transport"` and open one page with DevTools → Console to confirm there are no "Content Security Policy" errors.

## Optional contact rate limiting

The contact endpoint already requires Turnstile, an exact Origin match, JSON and a size cap. For an extra per-IP limit, create a Workers Rate Limiting binding named `CONTACT_LIMITER` (Dashboard → Worker → Settings → Bindings, or `ratelimits` in `wrangler.worker.jsonc`, e.g. 5 requests per 60 s). When the binding is absent or errors, the endpoint keeps working on Turnstile alone; when it rejects, visitors see the existing "busy" message. It is deliberately not in `wrangler.worker.jsonc` yet because it could not be verified against the live account.
