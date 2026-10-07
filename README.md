# Hương Thiền Nature — V3 Roots 0.4.1

Bilingual Vietnamese/English Astro website for the Hương Thiền Nature project. V3 Roots uses an earth-and-forest palette, readable system typography, a botanical root emblem and an editorial layout. Production targets GitHub → Cloudflare Worker with Static Assets on `https://huongthiennature.com`; Cloudflare Pages remains available as a separate `pages.dev` demo.

This edition continues the repository's existing content. The shared ChatGPT Work conversation could not be retrieved from the cloud environment, so it does not claim to reproduce unseen design requirements. See `V3_ROOTS.md` for scope and validation.

## Current delivery

- Public-facing experience: brand story, meditation practice, nature reflections, founders, fifteen complete journal articles in each language (twelve new Roots guides and the original three), three-stage roadmap and a contact form served by the Worker.
- Responsive Vietnamese and English routes: `/vi` and `/en`.
- Astro static output (`npm run build`, output `dist`) with Tailwind CSS Vite integration; Worker serves the assets and handles `/api/contact` and `/api/contact-config`.
- `wrangler.worker.jsonc` is the production Worker configuration. `wrangler.jsonc` remains the independent Pages demo configuration.
- Supplied imagery optimized to WebP and placed in `public/media/`.
- SEO: canonical URLs, `hreflang`, article Open Graph, Organization/BlogPosting/BreadcrumbList JSON-LD, robots and a generated sitemap with 34 localized URLs.
- Shared header/footer, typed bilingual content, article language switching, keyboard navigation, and navigation that works without JavaScript.
- Background music: the supplied `Lotus at First Light` MP3 loops at 25% initial volume. A fixed player supports pause/play and volume; the user's pause/volume choice is remembered, and playback position resumes within a session. Browsers that block audible autoplay start playback after an eligible interaction or an explicit Play click.
- Tản văn / Journal has its own bilingual article listing at `/vi/tan-van/` and `/en/journal/`, with a Roots reading path, linked from the main navigation, homepage and article breadcrumbs. The original three articles retain their v0.3.4 URLs and earlier redirects. The homepage features three articles, with a link to the full library.
- Twelve Roots entries include complete Vietnamese/English copy, six new watercolor illustrations, practices, CTAs, localized URLs, keywords, source attribution and ordered related reading. Build exports the reusable content to `public/content/roots-articles.json` and `dist/content/roots-articles.json`. See `ROOTS_CONTENT.md` for the release inventory and illustration prompts.
- Music controls sit at the bottom left; a bottom-right back-to-top button appears at 30% of the scrollable document height, supports keyboard focus and respects reduced motion. Both controls independently select light or dark colors for contrast against the surface underneath, including local images.
- Release numbers follow `major.minor.patch` in `package.json`; the footer and application-version meta tag use the same number. See `CHANGELOG.md` for each release.

Validation commands: `npm run check`, `npm run test:contact`, `npm run test:worker`, `npm run audit`, `npm run build`, `npm run audit:build`, `npm run build:pages-functions`, and `npm run deploy:worker-dry-run`. The build audit verifies 36 HTML pages, article content, translation links, sitemap coverage, structured data, CTAs, bounded related reading and local asset/anchor targets.

The contact form sends messages to the privately configured recipient through Resend after server-side Turnstile verification and explicit consent when its five runtime bindings are configured. Email-draft and mailto fallbacks were removed in v0.3.4. See `CONTACT_SETUP.md` for setup; implementation tests do not prove live email delivery. There is no login, payment, booking calendar, database or member area in this phase.

## Run locally

```bash
npm ci
npm run dev
```

## Build and preview

```bash
npm run build
npm run audit:build
npm run preview
```

For the production Worker, use `npm run dev:worker` locally and `npm run deploy:worker` for a direct deploy. In Workers Builds, set Build command `npm run build` and Deploy command `npx wrangler deploy --config wrangler.worker.jsonc`. The Worker entrypoint reuses the validated contact handlers from `functions/`; `run_worker_first` sends `/api/*` to the Worker and other requests to Static Assets.

For the separate Pages demo, use `npm run dev:pages` locally or connect the repository to Cloudflare Pages with build command `npm run build` and output `dist`. Pages uses its own Functions runtime and configuration.

For local contact development, use `npm run dev:pages`; Astro dev/preview alone has no contact API. Production sending requires the bindings described in `CONTACT_SETUP.md`.

Optional music browser checks with Python Playwright/Chromium: `APP_BASE_URL=http://127.0.0.1:8788 python tests/music-browser.py`. Tests exercise the actual MP3 under allowed and blocked autoplay policies. JavaScript-disabled visitors get native audio controls.

Journal and contrasting controls: `APP_BASE_URL=http://127.0.0.1:8788 python tests/journal-contrast-browser.py` checks article navigation, both listing translations, mobile layouts, light/dark sections and independent image contrast under each control.

Node.js 24.19.0 and npm 11.9.0 were used for this edition. Set the Cloudflare build environment variable `NODE_VERSION=24` when the project does not already use Node.js 24. In restricted cloud environments, see `HANDOFF.md` for writable cache/configuration paths. The site uses system fonts and does not fetch Google Fonts.

## Production workflow

1. The source repository is public by the project owner's choice; confirm image permissions before expanding media use.
2. Complete the release checks in `DEPLOYMENT.md`.
3. Connect the repository to Cloudflare Workers Builds; set root `/`, build command `npm run build`, deploy command `npx wrangler deploy --config wrangler.worker.jsonc`, production branch `main` and Node.js 24.
4. Configure the runtime variables/secrets in the Worker, then verify `/vi/`, `/en/`, assets and both contact API routes.
5. Wrangler attaches `huongthiennature.com` as the configured custom domain when deploying. Confirm the hostname is in the active Cloudflare zone and remove any conflicting DNS record if Cloudflare reports one.
6. Confirm HTTPS, DNS, canonical host, redirects, sitemap and actual contact email delivery before sharing the custom domain.

## Content and attribution

- Hương Thiền: project founder, initiating author and teacher.
- Kiều Mạnh: teacher and co-founder.
- The supplied “seven layers” materials are presented as a personal contemplative framework, not a clinical tool or universal scientific model.
- Language about energy, resonance or messages from plants/nature is framed as metaphor, subjective reflection or spiritual practice. It is not presented as an experimentally established measurement, medical claim or guaranteed communication.
- Meditation copy preserves the supplied practice insight: noticing attention wandered and returning without self-judgement is part of the exercise.

See `CONTENT_GUIDE.md` for the supplied files and editorial choices.
