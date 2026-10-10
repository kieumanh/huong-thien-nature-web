# Hương Thiền Studio 1.0.0 — Release notes / Product acceptance
Date: 2026-10-10
Branch: experiment/blog-studio-cloudflare-v1
Production service: Cloudflare Worker huong-thien-blog-studio; isolated from Hương Thiền Nature main.
Deployment entrypoint: studio-api-v3.mjs

## Content product decisions
- Ghost inspiration: published/draft workflow, publishing confirmation, editorial metrics.
- Publii inspiration: open, focused writing canvas; Markdown toolbar; SEO settings kept behind disclosure.
- uiPress inspiration: content dashboard, filters, list/drag-and-drop Kanban, manageable release notes.
- No copied code, assets or trademarks. All presentation has independent source.
- D1 preserved current owner, posts, media. Only additive migration: workflow_stage and post_daily_views.
- Public read metrics count page opens of Studio /read/, not unique users or primary-site visitors.

## Delivered UX
Dashboard: 4 live counters, 14-day publishing chart, editorial pipeline, recent action list, release notes preview.
Content: filtered searchable list + Kanban stages idea/writing/review/published; drag-drop and select alternative.
Editor: focused writing, Markdown formatting controls, preview, cover image upload to R2, language/category, SEO, draft vs published, unsaved-change warning, Ctrl/Cmd-S.
Media: owner-authorized R2 image browser via existing API.
System: account screen, export for owners, changelog accessible in sidebar.
Responsive: mobile sidebar, desktop/tablet layouts.

## QA results 2026-10-10
PASS: HTTPS GET / -> HTTP 200.
PASS: HTML inline JavaScript syntax compilation on live response.
PASS: GET /api/health -> 200.
PASS: GET /api/studio/dashboard without session -> 401.
PASS: GET /api/studio/stage without session -> 401.
PASS: GET /api/posts without session -> 401.
PASS: GET /api/public/posts -> 200.
PASS: GET /register and /forgot-password -> 200.
PASS: D1 migration workflow_stage; existing published article migrated to 'published'.
PASS: Cloudflare Worker deployment returned 200, script studio-api-v3.mjs.
PENDING: authenticated dashboard end-to-end rendering on desktop/tablet/mobile; drag-drop writes to D1; editor save/publish, image upload/read and backups. Automated QA account creation was blocked by connector safeguard. Do not claim authenticated E2E passed.
PENDING: real-site performance, accessibility and multi-browser testing (manual browser not available through current connector).
PENDING: decide whether multi-site access is in scope. Current service remains single-site CMS, not tenant-isolated SaaS.

## Product Manager verdict
Release the deployment as **v1.0.0 public beta / preview** only; not GA acceptance until the above authenticated test cases are confirmed.
Recommended next gate: test logged-in with temporary editor account; restore existing state, take screenshots of tablet and mobile; confirm D1/R2 data and web reader. No fabricated visitor metrics.
