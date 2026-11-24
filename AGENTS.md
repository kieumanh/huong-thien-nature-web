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
- **Album ảnh** (từ 2.13.0): trang hành trình `album` (`/vi/album/`, `/en/album/`, tự vào route, sitemap, tìm kiếm, `audit:build`). Dữ liệu ở `src/data/album.ts` (id, nhóm, tỷ lệ, chú thích và alt `vi`/`en`); tệp ảnh ở `public/media/journey/` gồm `<id>.webp` (bản đầy đủ, cạnh dài ≤ 1280) và `<id>-640.webp` (bản lưới), đã bỏ EXIF. Thêm ảnh = thêm hai tệp + một mục dữ liệu; `npm run test:album` bắt ảnh thiếu, thừa hoặc thiếu bản dịch. Chú thích chỉ mô tả điều nhìn thấy; không nhận diện người bằng khuôn mặt, không thêm tên, địa điểm, ngày nếu ảnh không tự thể hiện (ảnh tấm biển sự kiện có ngày và địa điểm vì tấm biển tự ghi; nhóm ảnh vườn được chủ dự án xác nhận thuộc dự án hợp tác Farm Gửi Yêu Thương Vào Đất cùng anh Lê Lam Sơn, ghi ở phần giới thiệu nhóm). Ảnh có trẻ nhỏ và người trong cộng đồng đã được chủ dự án đồng ý đăng công khai (24/11/2026). Ba ảnh tranh treo tường ký tên Thích Nhất Hạnh được chủ dự án xác nhận đăng (24/11/2026); chú thích chỉ mô tả hình, không chép lại câu trích. Ảnh chụp tranh hoặc tác phẩm khác của người khác cần chủ dự án xác nhận quyền dùng trước khi đăng. Giao diện: `AlbumGallery.astro` (trang đầy đủ + lightbox `<dialog>`, `src/scripts/album-lightbox.ts`), `AlbumStrip.astro`/`AlbumRows.astro` (dải 3–4 ảnh đặt trên Trang chủ, Câu chuyện, Hệ sinh thái, Gợi ý, danh mục Khóa thực hành, Tần Số Vàng, Tarot), CSS `src/styles/album.css` (hàng ảnh căn đều bằng flex, không cắt ảnh; màu chữ dùng biến theo ngày/đêm). Menu có 9 mục nên nút ☰ gập menu dùng ngưỡng 1280px (`global.css`, `gold.css`, `Header.astro`); thêm mục menu mới phải kiểm tra lại độ vừa khít ở 1280px.
- **Hệ sinh thái** (từ 2.15.0): nội dung ở `src/data/ecosystem-vision.ts` (ba trọng tâm do chủ dự án viết; không tự thêm lộ trình hay cam kết), dựng trong nhánh `ecosystem` của `src/pages/[lang]/[section].astro`; Trang chủ dùng `natureCards` trong `src/data/site.ts` qua `EcosystemOverview.astro` + `EcosystemOrbit.astro` (nhãn THÂN (thiên nhiên từ farm đối tác) / TÂM (pháp môn tu tập) / TRÍ (thực hành, sách vở, đá), trung tâm "Nhận biết"), rồi `HomeCourses.astro` giới thiệu hai khóa. Đá năng lượng: `src/data/partner-stones.ts` (giá tham khảo công khai, có nguồn và ngày; chỉ đăng ảnh thật khi đã có). Liên hệ: hai thẻ `contact-phone` (Hương Thiền 0868499856, Kiều Mạnh 0388000680). Khối thở chỉ có câu của chủ dự án, không thêm dòng 115 (chủ dự án đã yêu cầu bỏ). kimtuthap.vn là website thứ hai của đối tác đá năng lượng.
- **Trang Gợi ý** (từ 2.14.2): ba mục (hơi thở, bài nên đọc, phút lắng lại) trong `src/pages/[lang]/[section].astro` nhánh `practice`; `BreathGuide.astro` + `src/scripts/breath-guide.ts` (nhịp 4s/6s, 60s, lưu ý ở cuối là câu của chủ dự án, không thêm dòng 115 theo yêu cầu của chủ dự án; không hứa hiệu quả); thẻ lối đọc `.practice-path` lấy từ `beginnerArticles`.
- **Đồng cảm và Tản văn thư viện** (từ 2.14.0): khối "Có thể bạn đang…" ở `src/data/empathy.ts` (`homeEmpathy`, `frequencyEmpathy`, `tarotEmpathy`) dựng bởi `EmpathyPaths.astro` + `src/styles/empathy.css`; mỗi thẻ gồm khó khăn, câu thấu hiểu, một bước nhỏ (liên kết tới bài hoặc mục của trang); kèm lời khuyên tìm người thân/chuyên gia nhưng KHÔNG ghi số khẩn cấp 115 (chủ dự án yêu cầu gỡ ở 2.16.2), không hứa kết quả. Tản văn: chủ đề ở `src/data/journal-topics.ts` (mỗi bài đúng một chủ đề, `npm run test:journal` bắt bài thiếu chủ đề), 3 lối đọc `readingLanes`, lọc bằng nút chủ đề và phân trang 9 bài/trang, lưới 3 × 3 (`src/scripts/journal-filter.ts`, hằng `PAGE_SIZE`, tham số `?chu-de=` và `?trang=`), ô tìm kiếm trong Tản văn đã quay lại ở 2.16.0 (xem mục dưới). Bài mới về chữa lành ở `src/data/healing-articles.ts` (VI đầy đủ 1.200–2.200 chữ, EN rút gọn; ghi chú cuối bài khuyên tìm chuyên gia, không ghi số 115 từ 2.16.2). Ảnh trong bài ở `src/data/article-figures.ts`: `ill:<tên>` là tranh SVG tự vẽ trong `public/media/illustrations/` (sinh bằng mã, không dùng ảnh ngoài), `album:<id>` là ảnh album; mỗi bài cần ≥ 3 ảnh ở cả hai ngôn ngữ. Không thêm ảnh Pixabay mới. Bìa bài có thể là ảnh album (`/media/journey/<id>.webp`).
- **Tản văn "Một khoảng lặng giữa dòng đời"** (từ 2.16.0; từ 2.16.1 đã gỡ "Khu vườn của tôi", nút Lưu và nhắc đọc tiếp, chỉ còn chế độ đọc và kho tùy chọn đọc `garden-store.ts`): trang danh sách `src/pages/[lang]/[journal]/index.astro` (hero, bài nổi bật "trang sách mở" lấy từ `featuredSlug` trong `src/data/journal-topics.ts`, tìm kiếm + sắp xếp + "Một bài viết hữu duyên" + khu vườn, đều trong `src/scripts/journal-filter.ts`), thẻ `ArticleCard.astro` (biến thể `library` mang `data-slug/keywords/minutes/date/curated`), icon chủ đề `TopicIcon.astro`. Tìm toàn văn dùng `/<lang>/search-index.json`, nạp khi người đọc bắt đầu gõ; thứ tự "tuyển chọn" là `curatedRank`. Bài viết: `src/scripts/article-tools.ts` (Đọc trong tĩnh lặng, Lưu, Chia sẻ, tiếp tục đọc) và CSS ở `src/styles/tan-van.css` (nền Sáng/Ngà/Dịu tối chỉ áp khi `html[data-reading="on"]`). Trích dẫn và "khoảng dừng" ở `src/data/article-reflections.ts` (trích dẫn phải là nguyên văn trong bài; `tests/journal.test.ts` kiểm tra; thêm bài = thêm mục theo slug, giữ vi và en song hành). Bìa bài có thể đổi trung tâm ở `src/data/article-covers.ts` (ảnh gốc giữ nguyên; ảnh mới phải có trong `article-photos.ts` và có ảnh thu nhỏ cùng tên trong `public/media/thumbs/`, 640×400, dưới 100 KB). **Khu vườn của tôi** lưu bằng `localStorage` (`src/scripts/garden-store.ts`, khóa `htn:garden:v1` và `htn:reading:v1`): không tài khoản, không gửi lên máy chủ, đừng thêm gọi mạng vào module này (`tests/garden.test.ts` kiểm tra). Lớp `js` được thêm sớm trong `public/scripts/daylight.js` để menu không gây xô lệch bố cục; các phần chỉ dùng khi có JavaScript mang lớp `js-only`. Kiểm thử trình duyệt: `tests/tan-van-browser.py` (có trong CI).
- **Quỹ ủng hộ** (từ 2.17.0): trang hành trình `support` (`/vi/quy-ung-ho/`, `/en/support-fund/`), nội dung song ngữ ở `src/data/support-fund.ts` (lý do, năm hạng mục, lời mời, lời cảm ơn là lời của chủ dự án; KHÔNG tự thêm số tiền mục tiêu, ngày, biên nhận hay cam kết sao kê), giao diện `src/components/SupportFund.astro` (hình động SVG/CSS, tắt khi `prefers-reduced-motion`; nút sao chép số tài khoản chỉ có khi có JavaScript). Thông tin tài khoản của thủ quỹ (Kiều Xuân Mạnh, 02871729888, TPBank) và ảnh QR `public/media/support/tpbank-vietqr.webp` do chủ dự án cung cấp; chỉ đổi khi chủ dự án gửi thông tin mới và luôn giải mã lại QR để đối chiếu số tài khoản. Khối `footer-support` trong `Footer.astro` hiện ở mọi trang. Kiểm thử: `npm run test:support`.
- HSTS đang `max-age=31536000` không `includeSubDomains`/`preload` vì chưa xác minh mọi subdomain (kanban, farm, inventory…) chỉ dùng HTTPS. Chủ dự án quyết định có bật hay không.

## Triển khai

Push lên `main` → Cloudflare Workers Builds (build `npm run build`, deploy `npx wrangler deploy --config wrangler.worker.jsonc`). Push thành công **không** chứng minh deploy thành công: luôn mở `/vi/`, `/en/`, `/sitemap.xml`, `/api/contact-config` trên domain thật để xác minh.

## Nhánh

Quy ước và tình trạng nhánh: `docs/BRANCHES.md`. Đừng xóa nhánh nếu chủ dự án chưa đồng ý.

## Dự án liên quan (repository khác, cùng hệ sinh thái)

`kieumanh/zen-flow-inventory` (Zen Flow Inventory: kho, bán hàng, thu chi, feed cửa hàng; đọc `AGENTS.md` và `HANDOFF.md` của repo đó trước khi sửa feed), `kieumanh/farm-gui-yeu-thuong-vao-dat` (Farm Yêu Thương, Lê Lam Sơn). Các dự án khác (Sổ nợ An Tâm, Kanban Zen Studio, Portfolio, Satori…) nằm ở nơi khác; hỏi chủ dự án khi cần.
