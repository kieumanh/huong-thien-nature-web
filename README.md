# Hương Thiền Nature — V3 Roots 0.4.0

Bilingual Vietnamese/English Astro website for the Hương Thiền Nature project. V3 Roots uses an earth-and-forest palette, readable system typography, a botanical root emblem and an editorial layout. The deployment target is GitHub → Cloudflare Workers Builds → Workers Static Assets, with `https://huongthiennature.com` as the intended custom domain.

This edition continues the repository's existing content. The shared ChatGPT Work conversation could not be retrieved from the cloud environment, so it does not claim to reproduce unseen design requirements. See `V3_ROOTS.md` for scope and validation.

## Current delivery

- Public-facing experience: brand story, meditation practice, nature reflections, founders, fifteen complete journal articles in each language (twelve new Roots guides and the original three), three-stage roadmap and a contact form backed by the Cloudflare Worker API.
- Responsive Vietnamese and English routes: `/vi` and `/en`.
- Astro static output (`npm run build`, output `dist`) served by Cloudflare Workers Static Assets with Tailwind CSS Vite integration.
- Wrangler Worker configuration in `wrangler.jsonc`; `worker.ts` serves static assets and dispatches the contact API.
- Supplied imagery optimized to WebP and placed in `public/media/`.
- SEO: canonical URLs, `hreflang`, article Open Graph, Organization/BlogPosting/BreadcrumbList JSON-LD, robots and a generated sitemap with 34 localized URLs.
- Shared header/footer, typed bilingual content, article language switching, keyboard navigation, and navigation that works without JavaScript.
- Background music: the supplied `Lotus at First Light` MP3 loops at 25% initial volume. A fixed player supports pause/play and volume; the user's pause/volume choice is remembered, and playback position resumes within a session. Browsers that block audible autoplay start playback after an eligible interaction or an explicit Play click.
- Tản văn / Journal has its own bilingual article listing at `/vi/tan-van/` and `/en/journal/`, with a Roots reading path, linked from the main navigation, homepage and article breadcrumbs. The original three articles retain their v0.3.4 URLs and earlier redirects. The homepage features three articles, with a link to the full library.
- Twelve Roots entries include complete Vietnamese/English copy, six new watercolor illustrations, practices, CTAs, localized URLs, keywords, source attribution and ordered related reading. Build exports the reusable content to `public/content/roots-articles.json` and `dist/content/roots-articles.json`. See `ROOTS_CONTENT.md` for the release inventory and illustration prompts.
- Music controls sit at the bottom left; a bottom-right back-to-top button appears at 30% of the scrollable document height, supports keyboard focus and respects reduced motion. Both controls independently select light or dark colors for contrast against the surface underneath, including local images.
- Release numbers follow `major.minor.patch` in `package.json`; the footer and application-version meta tag use the same number. See `CHANGELOG.md` for each release.

Validation commands: `npm run check`, `npm run test:contact`, `npm run audit`, `npm run build`, `npm run audit:build`, and `npm run build:pages-functions`. The build audit verifies 36 HTML pages, article content, translation links, sitemap coverage, structured data, CTAs, bounded related reading and local asset/anchor targets. `npm run deploy:worker-dry-run` checks optional static Worker compatibility.

The contact form sends messages to `kieumanh2211@gmail.com` through Resend after server-side Turnstile verification and explicit consent when its five runtime bindings are configured. Email-draft and mailto fallbacks were removed in v0.3.4. See `CONTACT_SETUP.md` for setup; implementation tests do not prove live email delivery. There is no login, payment, booking calendar, database or member area in this phase.

## Run locally

```bash
npm ci
npm run dev
```

## Build and preview for Cloudflare Workers

```bash
npm run build
npm run audit:build
npm run preview
```

Connect the repository to Cloudflare Workers Builds. Set build command `npm run build`, deploy command `npx wrangler deploy`, and Node.js 24. `wrangler.jsonc` configures the Worker. See `DEPLOYMENT.md` for domain cutover and contact bindings.

For local contact development, use `npm run dev:worker`; Astro dev/preview alone has no contact API; `dev:worker` runs the API through Wrangler. Production sending requires the Worker bindings described in `CONTACT_SETUP.md`.

Optional music browser checks with Python Playwright/Chromium: `APP_BASE_URL=http://127.0.0.1:8788 python tests/music-browser.py`. Tests exercise the actual MP3 under allowed and blocked autoplay policies. JavaScript-disabled visitors get native audio controls.

Journal and contrasting controls: `APP_BASE_URL=http://127.0.0.1:8788 python tests/journal-contrast-browser.py` checks article navigation, both listing translations, mobile layouts, light/dark sections and independent image contrast under each control.

Node.js 24.19.0 and npm 11.9.0 were used for this edition. Set the Cloudflare build environment variable `NODE_VERSION=24` when the project does not already use Node.js 24. In restricted cloud environments, see `HANDOFF.md` for writable cache/configuration paths. The site uses system fonts and does not fetch Google Fonts.

## Production workflow

1. The source repository is public by the project owner's choice; confirm image permissions before expanding media use.
2. Complete the release checks in `DEPLOYMENT.md`.
3. Connect the repository to Cloudflare Pages; build command `npm run build`, output directory `dist`.
4. Verify the `pages.dev` preview, both language routes, imagery and mobile layout.
5. Attach `huongthiennature.com` to Pages after the Cloudflare zone is active and DNS is ready.
6. Confirm HTTPS, DNS, canonical host, redirects, sitemap and form behavior before sharing the custom domain.

## Content and attribution

- Hương Thiền: project founder, initiating author and teacher.
- Kiều Mạnh: teacher and co-founder.
- The supplied “seven layers” materials are presented as a personal contemplative framework, not a clinical tool or universal scientific model.
- Language about energy, resonance or messages from plants/nature is framed as metaphor, subjective reflection or spiritual practice. It is not presented as an experimentally established measurement, medical claim or guaranteed communication.
- Meditation copy preserves the supplied practice insight: noticing attention wandered and returning without self-judgement is part of the exercise.

See `CONTENT_GUIDE.md` for the supplied files and editorial choices.
