# Hương Thiền Nature — V3 Roots

Bilingual Vietnamese/English Astro website for the Hương Thiền Nature project. V3 Roots uses an earth-and-forest palette, readable system typography, a botanical root emblem and an editorial layout. The deployment target is GitHub → Cloudflare Pages (`pages.dev`); `https://huongthiennature.com` is the intended custom domain after DNS is ready.

This edition continues the repository's existing content. The shared ChatGPT Work conversation could not be retrieved from the cloud environment, so it does not claim to reproduce unseen design requirements. See `V3_ROOTS.md` for scope and validation.

## Current delivery

- Public-facing experience: brand story, meditation practice, nature reflections, founders, three full journal articles in each language, three-stage roadmap and a contact form backed by Cloudflare Pages Functions.
- Responsive Vietnamese and English routes: `/vi` and `/en`.
- Astro static output for Pages (`npm run build`, output `dist`) with Tailwind CSS Vite integration.
- Wrangler Pages configuration with Functions for contact email; Workers Static Assets configuration retained in `wrangler.worker.jsonc` for a separate compatibility dry-run.
- Supplied imagery optimized to WebP and placed in `public/media/`.
- SEO basics: canonical URLs, `hreflang`, Open Graph, Organization JSON-LD, robots and a generated sitemap with eight localized URLs.
- Shared header/footer, typed bilingual content, article language switching, keyboard navigation, and navigation that works without JavaScript.
- Background music: the supplied `Lotus at First Light` MP3 loops at 25% initial volume. A fixed player supports pause/play and volume; the user's pause/volume choice is remembered, and playback position resumes within a session. Browsers that block audible autoplay start playback after an eligible interaction or an explicit Play click.

Validation commands: `npm run check`, `npm run test:contact`, `npm run audit`, `npm run build`, `npm run audit:build`, and `npm run build:pages-functions`. The build audit verifies the ten HTML pages, article content, translation links, sitemap coverage and local asset/anchor targets. `npm run deploy:worker-dry-run` checks optional static Worker compatibility.

The contact form sends email through Resend after server-side Turnstile verification and explicit consent. It stays unavailable until its five runtime bindings are configured. See `CONTACT_SETUP.md` for setup; implementation tests use mocks and do not prove live email delivery. There is no login, payment, booking calendar, database or member area in this phase.

## Run locally

```bash
npm ci
npm run dev
```

## Build and preview for Cloudflare Pages

```bash
npm run build
npm run audit:build
npm run preview
```

In Cloudflare Pages, set the build command to `npm run build` and the build output directory to `dist`. Keep `functions/` in the checkout so Pages deploys the contact API. `wrangler.jsonc` configures Pages; `wrangler.worker.jsonc` is only for a separate static compatibility check.

For local contact development, use `npm run dev:pages`; Astro dev/preview alone has no contact API. Production sending requires the bindings described in `CONTACT_SETUP.md`.

Optional music browser checks with Python Playwright/Chromium: `APP_BASE_URL=http://127.0.0.1:8788 python tests/music-browser.py`. Tests exercise the actual MP3 under allowed and blocked autoplay policies. JavaScript-disabled visitors get native audio controls.

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
