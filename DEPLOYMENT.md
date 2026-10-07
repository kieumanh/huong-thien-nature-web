# Cloudflare Workers deployment

## Production architecture

GitHub is the source repository. Cloudflare Workers Builds checks out the repository, runs `npm ci`, builds the static Astro site with `npm run build`, and deploys `dist/` as Workers Static Assets through `worker.ts`. The Worker also handles `/api/contact` and `/api/contact-config`.

The Worker config is `wrangler.jsonc`. The Pages configuration and Pages-specific build/deploy commands have been removed. The production custom domain is intentionally attached in Cloudflare after the Worker build and contact bindings have been verified.

## Cloudflare Workers Builds setup

In Cloudflare Dashboard, create or open the Worker `huong-thien-nature` and connect GitHub repository `kieumanh/huong-thien-nature-web`:

- Production branch: `main`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: repository root
- Build environment: Node.js 24
- Do not set a separate static output directory; Wrangler reads `dist/` from `wrangler.jsonc`.

Use the branch `codex/cloudflare-worker-deploy` first for a preview build if Cloudflare Builds is configured to build non-production branches. Review the Worker preview, API behavior, and logs before merging the migration to `main`.

## Contact runtime bindings

Configure these Worker variables/secrets in Cloudflare before testing contact submissions. Keep secrets out of Git and chat:

- `CONTACT_TO_EMAIL` — approved recipient address
- `CONTACT_FROM_EMAIL` — sender address verified with Resend
- `RESEND_API_KEY` — secret
- `TURNSTILE_SITE_KEY` — public key matching the site widget
- `TURNSTILE_SECRET_KEY` — secret matching that widget

See `CONTACT_SETUP.md` for detailed setup and validation. Add the production hostname(s) to the Turnstile widget and verify delivery using a real submission.

## Custom domain cutover

After the Worker deploys successfully and the contact form is verified, add `huongthiennature.com` as a Custom Domain on Worker `huong-thien-nature`. Add `www.huongthiennature.com` and configure its redirect to the canonical root hostname. Do not attach a hostname simultaneously to Pages and the Worker. Verify DNS, TLS, redirects, localized pages, sitemap, and the contact form after cutover.

## Release checks

Run in a Node.js 24 environment:

```bash
npm ci
npm run check
npm run test:contact
npm run audit
npm run build
npm run audit:build
npx wrangler deploy --dry-run
```

Then inspect both language homepages, journal indexes, article routes, localization links, mobile navigation, 404 behavior, metadata, sitemap coverage, and form delivery on the Worker preview and production domain. A successful Resend API response confirms provider acceptance, not inbox delivery.

## Static site notes

- Astro remains static (`output: 'static'`) and `site` remains `https://huongthiennature.com`.
- `worker.ts` routes the two API endpoints to the existing validated Pages Function handlers and sends all other requests to Workers Static Assets.
- `npm run dev:worker` builds the site and starts Wrangler locally.
- `npm run deploy` builds and deploys from a developer machine; normal releases should use Cloudflare Workers Builds.
