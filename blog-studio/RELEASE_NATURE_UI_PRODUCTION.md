# Hương Thiền Studio — Nature UI production promotion (2026-10-10)

Cloudflare Worker: huong-thien-blog-studio
Production URL: https://studio.huongthiennature.com
Deployment module: studio-brand-production.mjs
Source branch: experiment/blog-studio-cloudflare-v1

## Scope and rollback
Promoted the previously tested Nature Preview styling only, applied to the existing v1.1.0 Studio and its journal API. New v1.2.0 Word export, separate readership ingestion, and charts remain excluded pending authenticated end-to-end QA. All existing D1 and R2 bindings and secrets retained. Source of previous backend remains studio-api-journal.mjs in the branch; rollback can redeploy that entrypoint bundle.

## Live smoke tests
- PASS: GET / HTTP 200 with branded HTML, forest logo and valid inline JavaScript.
- PASS: GET /register and /forgot-password HTTP 200 with Nature theme.
- PASS: GET /api/health HTTP 200.
- PASS: GET /api/public/journal with lang=vi HTTP 200.
- PASS: GET public journal article HTTP 200.
- PASS: GET /api/posts without session HTTP 401.
- PASS: GET /api/studio/dashboard without session HTTP 401.
- PASS: POST /api/studio/stage without session HTTP 401.
- PASS: GET /api/studio/export-word without session HTTP 401 (not deployed as enabled feature).
- PASS: Cloudflare D1 counts preserved: 1 user, 1 article, 1 media item.
- PENDING: authenticated browser workflow (edit/save/publish, Kanban, R2 upload, mobile screenshots) due to no authorized active owner session in available test environment.

## Release decision
UI promotion completed, browser-authenticated full acceptance still pending. Keep studio-preview.huongthiennature.com available temporarily as design rollback/reference. Do not claim comprehensive E2E or GA acceptance. Original Hương Thiền Nature website remains unchanged.
