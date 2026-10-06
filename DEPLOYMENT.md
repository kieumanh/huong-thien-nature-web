# Step 7 — review, Pages demo, domain and maintenance

## What is prepared

- Static Astro source prepared for Cloudflare Pages (`npm run build`, output `dist`).
- Wrangler Workers dry-run retained as an independent compatibility/build check.
- Production domain and canonical URLs set to `huongthiennature.com`.
- Bilingual homepage routes, SEO metadata, robots and sitemap.
- Supplied project images converted to compressed WebP for the site.
- A phase-one maintenance and release checklist.

## Pre-publication gates

- [ ] Run `npm install`, `npm run check`, and `npm run build` in an environment with package access.
- [ ] Review Vietnamese and English copy, founder titles, logo and image consent/cropping.
- [ ] Review 320 px, tablet and desktop layouts; keyboard navigation; contrast; screen-reader labels; browser console.
- [ ] Replace or wire the preview interest form. It currently does not transmit or store data.
- [ ] Add a privacy notice and service terms before collecting personal data or accepting payments.
- [ ] Review all spiritual/wellbeing language and avoid medical or unsupported scientific claims.
- [ ] Configure secure API secrets, Turnstile and email only when server-side form handling is implemented.
- [x] Confirm the GitHub repository is public; the project owner explicitly chose public visibility.
- [ ] Connect the reviewed repository to Cloudflare Pages with build command `npm run build` and output directory `dist`; use its `pages.dev` URL as the phase-one demo.
- [ ] Verify the Pages build and inspect its preview deployment.
- [ ] Attach the root and `www` hostnames in Cloudflare, choose one canonical host and test HTTPS/redirects after the zone is active.
- [ ] Verify sitemap, robots, canonical URLs, `hreflang`, social previews and Search Console after the domain is live.

## Launch checklist

1. Push the reviewed source and media to the public GitHub repository.
2. Connect the repository to Cloudflare Pages; build `main` with `npm run build` and publish `dist`.
3. Confirm the Pages build, then test both languages, mobile navigation, imagery, 404, metadata and the preview form on the `pages.dev` demo.
4. Attach `huongthiennature.com` only after the zone and DNS records are active; choose one canonical host.
5. Verify DNS resolution, HTTPS certificate, HTTP-to-HTTPS behavior and canonical redirects on the custom domain.
6. Keep Workers dry-run as a compatibility check; Pages is the current demo host.
7. Submit `/sitemap.xml` in Google Search Console and check indexing after the domain is live.
8. Announce the domain only after the form's real behavior and privacy notice match what the page promises.

## Ongoing care

- **Weekly:** test forms/links and check for broken assets or deployment errors.
- **Monthly:** publish or update a useful article in both languages; review SEO snippets, sitemap and mobile speed.
- **Quarterly:** review accessibility, consent language, founder/team details, services and phase priorities.
- **Each release:** record the commit, what changed, what was checked and how to roll back.

## Current blockers to an actual production launch

`astro check` and `astro build` pass, the source audit passes, and Wrangler dry-run accepts the generated static assets. Cloudflare account authentication is still required to create/connect the Pages project and inspect its DNS/TLS settings. The repository `kieumanh/huong-thien-nature-web` is public by the owner's explicit choice.
