# AGENTS.md — Hương Thiền Nature (dành cho ChatGPT/Codex, Claude và mọi trợ lý AI)

Đọc tệp này trước. Sau đó đọc `HANDOFF.md` (trạng thái hiện tại), `DEPLOYMENT.md` (triển khai), `CHANGELOG.md` (lịch sử).

## Làm việc với chủ dự án

- Chủ dự án (Kiều Mạnh) là nhà thiết kế giải pháp, **không viết code**. Anh định hướng; trợ lý viết code, sửa lỗi, kiểm thử và triển khai.
- Giao tiếp bằng **tiếng Việt**, ngắn gọn, nói kết quả trước. Giải thích kỹ thuật bằng ngôn ngữ đời thường.
- Không bắt chủ dự án chạy lệnh. Tự chạy kiểm tra, rồi báo kết quả thật (đạt/không đạt), không khẳng định điều chưa xác minh.
- Mọi thay đổi hiển thị công khai (nội dung, ảnh, tên người) cần đúng sự thật và có nguồn ảnh hợp lệ.

## Dự án là gì

Website song ngữ Việt/Anh của hệ sinh thái Hương Thiền Nature: thiền, chánh niệm, nông sản/thảo dược, khóa thực hành (có buổi Tarot 1:1), tản văn, cửa hàng danh mục. Ba trục nội dung: **Thân · Tâm · Trí** (Farm & Botanicals · Eco-Retreat/Meditation · Academy/Library).

- Repository: `kieumanh/huong-thien-nature-web` (công khai). Nhánh production: `main`.
- Domain: `https://huongthiennature.com`. Cloudflare Worker tên `huong-thien-nature`.
- Phiên bản hiện tại: xem `package.json` (khớp `src/data/releases.ts` và `CHANGELOG.md`).

## Kiến trúc

- Astro 7 (static output → `dist/`), TypeScript, Tailwind CSS 4, không có cơ sở dữ liệu, không đăng nhập, không thanh toán.
- Cloudflare **Worker + Static Assets** (`wrangler.worker.jsonc`, entry `src/worker.ts`). Worker chỉ xử lý `/api/*`:
  - `/api/contact`, `/api/contact-config`: form liên hệ (Resend + Turnstile, logic ở `functions/`).
  - `/api/shop-feed`: proxy chỉ-đọc tới feed công khai của **Zen Flow Inventory** (`https://zen-flow-inventory.huongthiennature.com/api/shop-feed`, đổi được bằng biến tùy chọn `INVENTORY_FEED_URL`, https). Worker lọc theo danh sách trường cho phép (`src/data/shop-feed.ts`); nguồn lỗi → 503 và trang dùng danh mục dự phòng.
  - Mọi phản hồi `/api/*` đều có CSP `default-src 'none'`, nosniff, no-referrer (`hardenApi` trong `src/worker.ts`).
- `wrangler.jsonc` là cấu hình **Pages demo**, KHÔNG dùng để deploy production.
- `blog-studio/` là Zen Studio CMS (Worker riêng, nhiều file phiên bản). Không thuộc build của website; chỉ sửa khi được yêu cầu.

## Bản đồ mã nguồn

- `src/pages/` — route (`vi/`, `en/`, `[lang]/`); `src/components/` — giao diện; `src/data/` — nội dung song ngữ gõ kiểu (articles, courses, products, people, releases, search, tarot-guidance…); `src/styles/`, `src/scripts/`.
- `public/media/` ảnh WebP; `public/_redirects` chuyển hướng URL cũ (không bỏ khi đổi URL).
- `scripts/` audit nguồn và build; `tests/` kiểm thử Node + Playwright; `.github/workflows/validate.yml` là CI.

## Lệnh chuẩn (Node 24 ở CI; 22 vẫn chạy được)

```bash
npm ci
npm run check && npm run audit
npm run build && npm run audit:build
npm run test:contact && npm run test:worker && npm run test:search && npm run test:shop && npm run test:tarot && npm run test:frequency && npm run test:headers
node --test tests/hybrid-nature.test.mjs tests/ecosystem-content.test.mjs tests/ecosystem-orbit.test.mjs tests/home-discovery.test.mjs
npx wrangler deploy --dry-run --config wrangler.worker.jsonc
```

Kiểm thử trình duyệt (Playwright) chạy trong CI; chạy cục bộ cần Python Playwright và `APP_BASE_URL`.

## Quy tắc khi sửa

1. Mọi nội dung có **cả `vi` và `en`**; giữ sitemap, hreflang, tìm kiếm (`src/data/search.ts`) đồng bộ.
2. Mỗi bản phát hành: tăng `version` trong `package.json` **và** `package-lock.json`, thêm mục vào `CHANGELOG.md` **và** `src/data/releases.ts` (cùng số). Đã từng bị lệch khi gộp nhánh song song (xem 2.8.4) — kiểm tra lại sau mỗi lần merge.
3. Đổi/xóa URL → thêm dòng trong `public/_redirects`.
4. Giọng văn: giản dị; không hứa hẹn kết quả thiền/sức khỏe; ngôn ngữ về năng lượng, Tarot, tâm linh được trình bày là phản tỉnh/chiêm nghiệm cá nhân, không phải y khoa hay khoa học đã kiểm chứng.
5. Trước khi push `main`: toàn bộ lệnh chuẩn ở trên phải đạt.
6. Không commit bí mật. `.dev.vars*`, `.env*` đã bị git bỏ qua. Không dán khóa vào chat.

## Bí mật và cấu hình (đặt trong Cloudflare, không trong repo)

`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY` (secret); `CONTACT_FROM_EMAIL`, `TURNSTILE_SITE_KEY` (text); `INVENTORY_FEED_URL` (text, tùy chọn, https); binding `CONTACT_LIMITER` (Rate Limiting, tùy chọn — xem `DEPLOYMENT.md`). `CONTACT_TO_EMAIL` có trong `wrangler.worker.jsonc`. Chi tiết: `CONTACT_SETUP.md`. Chưa từng xác minh gửi email thật từ production.

## Cửa hàng, Tarot và bảo mật (từ 2.9.0)

- **Cửa hàng**: `/vi/cua-hang/` là trang tổng quan; ba không gian `thuc-pham-sach`, `da-nang-luong`, `sach` (EN: `clean-food`, `energy-stones`, `books`) định nghĩa ở `src/data/shop-themes.ts`, dựng bởi `ShopTheme.astro`. Mã chủ đề **dùng chung với Zen Flow Inventory** — không đổi một bên. Client (`src/scripts/shop-feed-client.ts`) chỉ dùng `textContent`; feed chỉ thay danh mục dự phòng của một chủ đề khi feed có ít nhất 1 sản phẩm của chủ đề đó.
- **Tarot**: giá nằm ở `tarotOffer.price` (`src/data/courses.ts`), mặc định `null` → hiện "Liên hệ", không có Offer trong schema. Chỉ nhập giá khi chủ dự án xác nhận. Thanh đặt lịch cố định chỉ hiện trên điện thoại.
- **CSP**: `scripts/secure-headers.mjs` chạy sau `astro build` (đã nằm trong `npm run build`), băm mọi script nội tuyến vào `dist/_headers`. Thêm script nội tuyến mới là tự động được băm; thêm máy chủ bên thứ ba phải sửa script này, `audit-build.mjs` sẽ báo lỗi nếu quên. Chỉ chạy `astro build` thì **thiếu CSP** và `audit:build` sẽ lỗi.
- **Tần Số Vàng** (từ 2.10.0): trang khóa 6 chặng `/vi/khoa-thuc-hanh/tan-so-vang/` (EN `golden-frequency`). Nội dung ở `src/data/golden-frequency.ts`, giao diện `GoldenFrequency.astro` + `src/styles/golden-frequency.css`, tương tác `src/scripts/golden-frequency.ts`. Học phí ở `frequencyFees` (`src/data/courses.ts`): 5.600.000 ₫ năm 2026, 6.600.000 ₫ từ 2027, chọn theo năm Việt Nam lúc build (cần build lại sau 01/01/2027). Học phí hiện KHÔNG công bố (`showFrequencyFee = false`; khách nhận báo giá qua tin nhắn). Người hỗ trợ học viên: Kiều Mạnh. Lớp online 1 tháng, khai giảng hằng tháng. Từ 2.11.1: khối "Thông tin khóa học" (`copy.info`), bảng so sánh hai khóa (`src/data/course-compare.ts`, `CourseCompare.astro`, dùng ở trang Tần Số Vàng, Tarot và Khóa thực hành) — chỉ ghi dữ kiện đã được chủ dự án xác nhận. "Tần số" luôn được trình bày là ẩn dụ chiêm nghiệm; nhà khoa học chỉ dùng hình sinh tự động, không dùng ảnh chân dung. Ảnh chia sẻ: `public/media/guidance/tan-so-vang.jpg` (VI) và `golden-frequency.jpg` (EN).
- **Phong cách vàng ánh tím** (từ 2.12.0): toàn site dùng ngôn ngữ thiết kế của trang Tần Số Vàng. Biến màu ở `src/styles/tokens.css` (`--gold-*`, `--plum-*`, `--gold-gradient`, `--gold-text`) và `daylight.css` (ngày/hoàng hôn/đêm); ghi đè dùng chung ở `src/styles/gold.css` (nạp cuối trong `BaseLayout.astro`). CSS của trang/thành phần có thể nạp sau, nên ghi đè cần độ ưu tiên cao hơn (vd. `.journey-page .journey-page-header`) hoặc `:where(...)`. Mọi chữ vàng trên nền sáng dùng `--gold-accent` (đủ tương phản); chữ vàng sáng `--gold-hi` chỉ đặt trên nền tím đêm. Sau khi sửa màu, chạy lại axe ở chế độ ngày và đêm.
- **Phản hồi học viên** (từ 2.12.0): dữ liệu ở `src/data/student-feedback.ts` (chỉ đăng khi học viên đồng ý, giữ nguyên văn, có bản dịch EN số đoạn bằng nhau; không tự tạo phản hồi). Trang riêng là một mục hành trình (`journeyPages.feedback`, `/vi/phan-hoi-hoc-vien/`, `/en/student-feedback/`) nên tự vào route, sitemap, tìm kiếm và `audit:build`; thẻ ở `StudentFeedback.astro` (có chế độ `compact` dùng trong danh mục khóa). Menu: mục này đứng trước nút Liên hệ. Danh mục khóa: `CourseCatalogue.astro`, chip thông tin ở `course-compare.ts`.
- **Album ảnh** (từ 2.13.0): trang hành trình `album` (`/vi/album/`, `/en/album/`, tự vào route, sitemap, tìm kiếm, `audit:build`). Dữ liệu ở `src/data/album.ts` (id, nhóm, tỷ lệ, chú thích và alt `vi`/`en`); tệp ảnh ở `public/media/journey/` gồm `<id>.webp` (bản đầy đủ, cạnh dài ≤ 1280) và `<id>-640.webp` (bản lưới), đã bỏ EXIF. Thêm ảnh = thêm hai tệp + một mục dữ liệu; `npm run test:album` bắt ảnh thiếu, thừa hoặc thiếu bản dịch. Chú thích chỉ mô tả điều nhìn thấy; không nhận diện người bằng khuôn mặt, không thêm tên, địa điểm, ngày nếu ảnh không tự thể hiện (ảnh tấm biển sự kiện có ngày và địa điểm vì tấm biển tự ghi; nhóm ảnh vườn được chủ dự án xác nhận thuộc dự án hợp tác Farm Gửi Yêu Thương Vào Đất cùng anh Lê Lam Sơn, ghi ở phần giới thiệu nhóm). Ảnh có trẻ nhỏ và người trong cộng đồng đã được chủ dự án đồng ý đăng công khai (24/11/2026). Không đăng ảnh chụp tranh, câu trích hoặc tác phẩm của người khác (vd. tranh treo tường có ký tên Thích Nhất Hạnh) khi chủ dự án chưa xác nhận quyền dùng. Giao diện: `AlbumGallery.astro` (trang đầy đủ + lightbox `<dialog>`, `src/scripts/album-lightbox.ts`), `AlbumStrip.astro`/`AlbumRows.astro` (dải 3–4 ảnh đặt trên Trang chủ, Câu chuyện, Hệ sinh thái, Gợi ý, danh mục Khóa thực hành, Tần Số Vàng, Tarot), CSS `src/styles/album.css` (hàng ảnh căn đều bằng flex, không cắt ảnh; màu chữ dùng biến theo ngày/đêm). Menu có 9 mục nên nút ☰ gập menu dùng ngưỡng 1280px (`global.css`, `gold.css`, `Header.astro`); thêm mục menu mới phải kiểm tra lại độ vừa khít ở 1280px.
- HSTS đang `max-age=31536000` không `includeSubDomains`/`preload` vì chưa xác minh mọi subdomain (kanban, farm, inventory…) chỉ dùng HTTPS. Chủ dự án quyết định có bật hay không.

## Triển khai

Push lên `main` → Cloudflare Workers Builds (build `npm run build`, deploy `npx wrangler deploy --config wrangler.worker.jsonc`). Push thành công **không** chứng minh deploy thành công: luôn mở `/vi/`, `/en/`, `/sitemap.xml`, `/api/contact-config` trên domain thật để xác minh.

## Nhánh

Quy ước và tình trạng nhánh: `docs/BRANCHES.md`. Đừng xóa nhánh nếu chủ dự án chưa đồng ý.

## Dự án liên quan (repository khác, cùng hệ sinh thái)

`kieumanh/zen-flow-inventory` (Zen Flow Inventory: kho, bán hàng, thu chi, feed cửa hàng; đọc `AGENTS.md` và `HANDOFF.md` của repo đó trước khi sửa feed), `kieumanh/farm-gui-yeu-thuong-vao-dat` (Farm Yêu Thương, Lê Lam Sơn). Các dự án khác (Sổ nợ An Tâm, Kanban Zen Studio, Portfolio, Satori…) nằm ở nơi khác; hỏi chủ dự án khi cần.
