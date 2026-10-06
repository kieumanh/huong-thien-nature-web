# Hương Thiền Nature

Bilingual Vietnamese/English Astro website foundation for the Hương Thiền Nature project. The phase-one demo target is GitHub → Cloudflare Pages (`pages.dev`); `https://huongthiennature.com` is the intended custom domain after DNS is ready.

## Current delivery

- Phase 1 public-facing experience: brand story, meditation practice, nature reflections, founders, journal previews, three-stage roadmap and an interest form preview.
- Responsive Vietnamese and English routes: `/vi` and `/en`.
- Astro static output for Pages (`npm run build`, output `dist`) with Tailwind CSS Vite integration.
- Wrangler Workers Static Assets configuration retained for a separate compatibility dry-run.
- Supplied imagery optimized to WebP and placed in `public/media/`.
- SEO basics: canonical URLs, `hreflang`, Open Graph, Organization JSON-LD, robots and sitemap.

Validation completed for this handoff: `npm run check`, `npm run build`, `npm run audit`, and `wrangler deploy --dry-run` all pass.

The interest form is deliberately a non-sending preview. Connect a server-side endpoint, consent text, Turnstile verification, secure storage and transactional email before accepting real booking or membership data. There is no login, payment, booking calendar, database or member area in this first phase.

## Run locally

```bash
npm install
npm run dev
```

## Build and preview for Cloudflare Pages

```bash
npm run build
npm run preview
```

In Cloudflare Pages, set the build command to `npm run build` and the build output directory to `dist`. `wrangler.jsonc` is retained for a Workers Static Assets compatibility check; Pages is the current demo host. For a later on-demand backend, add the Cloudflare adapter and Worker bindings as a separate, reviewed phase.

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
