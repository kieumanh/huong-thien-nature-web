# Hương Thiền Studio Nature v1.3.1 — UI refinement & QA
Date: 2026-10-10
Environment: https://studio-preview.huongthiennature.com
Cloudflare Worker: huong-thien-studio-preview
Main script: studio-preview-nature-v131.mjs
Source branch: experiment/blog-studio-cloudflare-v1

## Decisions based on the attached annotated screenshots
1. Removed the entire CHÈN NHANH auxiliary row from the editor UI.
2. Removed the Markdown tab row and visual-vs-Markdown mode selector. The existing Markdown representation remains in the hidden underlying field and D1; content is not migrated.
3. Rebuilt the single always-visible writing toolbar with matching outline SVG icons (bold, italic, H2/H3, quote, bullet list, link, upload image, R2 library image selector, divider, undo and redo).
4. Preserved formatting selection when clicking toolbar buttons. The R2 picker still works after removing the tab row (null-safe mode switching).
5. Replaced sidebar glyphs with consistent thin outline SVG iconography.
6. Softened the sidebar to a muted sage gradient, slim forest active accent and restrained hover/selected colors.
7. Refined editor header (back, preview, reports, save, Word, help, settings) with matching icons and compact sizing.
8. Tablet <= 850px uses a hidden flyout sidebar; mobile <= 560px narrows controls, keeps safe-area footer and allows toolbar horizontal scrolling.

## Technical verification
PASS: syntax validation of all deployed JS modules and embedded client script.
PASS: Cloudflare Workers deployment HTTP 200, entry studio-preview-nature-v131.mjs.
PASS: GET / HTTP 200, source includes toolbar/icon/sidebar classes and version 1.3.1-preview.
PASS: GET /register and /forgot-password HTTP 200.
PASS: GET /api/posts without login HTTP 401.
PASS: GET /api/studio/dashboard without login HTTP 401.
PASS: POST /api/posts on preview HTTP 403 (read-only).
PASS: Static code inspection for responsive CSS at <= 1220px, 850px and 560px.
PASS: null-safe fallback in the visual/Markdown switch used internally by R2 image picker.
PENDING: authenticated in-browser save/publish and R2 picker, as the preview is read-only and an authorized owner session was not exposed to automated tools.
PENDING: screenshot-based authenticated desktop/tablet/mobile assessment; browser rendering account temporarily hit a rate limit, so no visual sign-off can be claimed.
PENDING: full integration tests of editor before merging into production.

## Release status
Public **Preview v1.3.1** available, not merged into Studio production.
Main Studio, Hương Thiền Nature, D1 and R2 content remain unchanged.
This is a user-review release; production approval requires actual mobile and authenticated editor QA.

## References
Publii official WYSIWYG editor documentation: https://getpublii.com/docs/post-editor.html
Publii post authoring guide: https://getpublii.com/docs/adding-editing-and-deleting-posts.html
