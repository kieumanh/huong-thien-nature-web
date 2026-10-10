# Hương Thiền Studio — Nature brand preview (10/10/2026)

Preview URL: https://studio-preview.huongthiennature.com/
Original Studio: https://studio.huongthiennature.com/
Nature reference: https://huongthiennature.com/
Cloudflare script: huong-thien-studio-preview

## Branding alignment
- Reuses original Nature logo huong-thien-logo-forest.webp and site favicon, linked to canonical Nature media.
- Exact brand colors from src/styles/global.css: forest #243f32, moss #526747, sage #e8ebdf, cream #f2eedf, paper #faf8f1 and earth #7a5a30.
- Matching typography stacks: Iowan Old Style/Palatino/Georgia headings, Avenir Next/Avenir/Segoe UI body.
- Botanical-sprig.svg from the main Nature project used in sidebar, background and login/account cards.
- Nature hero canopy background applied to sign-in.
- Refined cards, navigation, buttons, tables, Kanban and editor without changing client JS or data structures.

## Data isolation & tests
This preview proxies the original Studio worker with a service binding, modifies only HTML, and blocks state-changing routes except login/logout for session tests. It does not deploy modifications to the original Studio, D1 or R2.
- PASS: preview /, /register, /forgot-password, /owner-setup and /reset-password return HTTP 200 with brand styles and canonical image refs.
- PASS: login page embedded JS compiles.
- PASS: source image endpoints return 200 (forest logo image/webp, botanical SVG, hero canopy image/webp).
- PASS: unauthorized dashboard returns 401; write to /api/posts is blocked 403.
- PASS: all preview pages carry X-Robots-Tag noindex, nofollow, noarchive.
- LIMITATION: Preview has read-only UI; saving/publishing/registration is deliberately unavailable. Use the normal Studio for real writes.
- PENDING: visual QA on logged-in desktop/mobile screenshots (browser automation unavailable through this connector).

## Product manager decision
Approved as isolated **Nature Theme Preview**; DO NOT promote to Studio production before visual QA and owner approval. Keep original worker untouched.
