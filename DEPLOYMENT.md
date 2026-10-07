# Step 7 — review, Pages demo, domain and maintenance

## What is prepared

- Static Astro source prepared for Cloudflare Pages (`npm run build`, output `dist`).
- Direct-deploy command targets the Pages project `huong-thien-nature-web` (`npm run deploy:pages`).
- Contact API in `functions/` for Resend and Turnstile; runtime bindings described in `CONTACT_SETUP.md`.
- Wrangler Workers static dry-run retained in `wrangler.worker.jsonc` as an independent compatibility/build check.
- Production domain and canonical URLs set to `huongthiennature.com`.
- Bilingual homepage routes, SEO metadata, robots and sitemap.
- Supplied project images converted to compressed WebP for the site.
- A phase-one maintenance and release checklist.

## Pre-publication gates

- [ ] Run `npm ci`, `npm run check`, `npm run audit`, `npm run build` and `npm run audit:build` in an environment with package access. Use Node.js 24 (`NODE_VERSION=24` in the Cloudflare build environment).
- [ ] Review Vietnamese and English copy, founder titles, logo and image consent/cropping.
- [ ] Review 320 px, tablet and desktop layouts; keyboard navigation; contrast; screen-reader labels; browser console.
- [ ] Configure the contact form's five runtime bindings and verify a real email arrives at the designated recipient. API/provider acceptance alone does not verify delivery.
- [ ] Add a privacy notice and service terms before collecting personal data or accepting payments.
- [ ] Review all spiritual/wellbeing language and avoid medical or unsupported scientific claims.
- [ ] Enter Resend/Turnstile secrets securely in Pages and verify the sender domain. See `CONTACT_SETUP.md`.
- [x] Confirm the GitHub repository is public; the project owner explicitly chose public visibility.
- [ ] Connect the reviewed repository to Cloudflare Pages with build command `npm run build` and output directory `dist`; use its `pages.dev` URL as the phase-one demo.
- [ ] Verify the Pages build and inspect its preview deployment.
- [ ] For a direct deployment, configure `CLOUDFLARE_API_TOKEN` securely with Pages Write permission before running `npm run deploy:pages`.
- [ ] Attach the root and `www` hostnames in Cloudflare, choose one canonical host and test HTTPS/redirects after the zone is active.
- [ ] Verify sitemap, robots, canonical URLs, `hreflang`, social previews and Search Console after the domain is live.

## Launch checklist

1. Push the reviewed source and media to the public GitHub repository.
2. Connect the repository to Cloudflare Pages; build `main` with `npm run build` and publish `dist` along with the checkout's `functions/`. Use Node.js 24; no framework adapter is needed. Configure the contact runtime bindings before testing sending.
3. Confirm the Pages build, then test both language homepages, both journal indexes and all six article routes, article language switching, mobile navigation, imagery, 404, metadata and contact email delivery on the `pages.dev` demo. `/sitemap.xml` should contain ten localized URLs.
4. Attach `huongthiennature.com` only after the zone and DNS records are active; choose one canonical host.
5. Verify DNS resolution, HTTPS certificate, HTTP-to-HTTPS behavior and canonical redirects on the custom domain.
6. Keep Workers dry-run as a static compatibility check only; use Pages for the contact API.
7. Submit `/sitemap.xml` in Google Search Console and check indexing after the domain is live.
8. Announce the domain only after the form's real behavior and privacy notice match what the page promises.

## Ongoing care

- **Weekly:** test forms/links and check for broken assets or deployment errors.
- **Monthly:** publish or update a useful article in both languages; review SEO snippets, sitemap and mobile speed.
- **Quarterly:** review accessibility, consent language, founder/team details, services and phase priorities.
- **Each release:** record the commit, what changed, what was checked and how to roll back.

## Current blockers to an actual production launch

`astro check` and `astro build` pass, the source audit passes, and Wrangler dry-run accepts the generated static assets. The source and build output are ready, but an authenticated Cloudflare deployment is still required to publish this version and inspect its DNS/TLS settings. The repository `kieumanh/huong-thien-nature-web` is public by the owner's explicit choice.

GitHub push confirms source publication only. It does not prove a Cloudflare deployment ran or that its build runtime is configured correctly. Check the deployment's commit SHA and both homepages after automatic Git integration runs.
