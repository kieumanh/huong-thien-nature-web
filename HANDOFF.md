# Bàn giao phát triển Hương Thiền Nature

Cập nhật: 2026-11-23, phiên bản 2.8.4. Đọc cùng `AGENTS.md` (quy tắc làm việc) và `CHANGELOG.md`.

## Nguồn sự thật

Repository `kieumanh/huong-thien-nature-web`, nhánh `main`. Hội thoại cũ (ChatGPT Work, Codex, Claude) không phải nguồn sự thật; chỉ tin mã, `CHANGELOG.md` và tài liệu trong repo. Nhiều nhánh `codex/*` là sản phẩm của các phiên Codex trước.

## Lịch sử xây dựng (tóm tắt)

| Giai đoạn | Nội dung chính |
|---|---|
| 6–7/10/2026 | Demo Cloudflare Pages; giao diện V3 Roots song ngữ; form liên hệ (Turnstile + Resend); nhạc nền; thư viện bài Roots; chuyển production sang Cloudflare Worker (0.4.x) |
| 7–9/10 | Tìm kiếm song ngữ; cửa hàng danh mục; giao diện Botanical 2.0.x; ba kim tự tháp rồi hệ mặt trời Thân·Tâm·Trí |
| 10/10 | Zen Studio CMS 1.3.x trong `blog-studio/` (nhánh thử nghiệm `experiment/*`) |
| 6/11 | Tồn kho nối vào cửa hàng; dòng thời gian người sáng lập (2.0.6) |
| 20–21/11 | Bài tản văn mới, hồ sơ tác giả, Zen Botanical 2.2–2.4 (ba quỹ đạo, bốn mùa) |
| 22–23/11 | Khóa Tarot 1:1, nhịp ngày đêm/bốn mùa theo giờ Việt Nam, favicon, lá rơi, đổi tên mục Khóa thực hành (2.5–2.8) |

Ghi chú lịch sử: CHANGELOG từng thiếu mục 2.0.0/2.0.1 và 2.8.0–2.8.3 (mất khi gộp nhánh song song). 2.8.x đã được khôi phục ở 2.8.4. Mô tả 2.0.0 xem `RELEASE_2.0.0.md`.

## Trạng thái hiện tại

- Website: tiếng Việt `/vi`, tiếng Anh `/en`, gốc `/` mở thẳng trang chủ tiếng Việt. 74 trang HTML, 32 bài tản văn, 70 URL trong sitemap.
- Trang chính: trang chủ (ba quỹ đạo, khám phá, tìm kiếm), Tản văn, Cửa hàng/danh mục, Khóa thực hành (Tarot 1:1), Câu chuyện, Đội ngũ, Hệ sinh thái, Liên hệ, Lịch sử phiên bản.
- Kiểm tra ngày 23/11/2026 trên bản clone: `check`, `audit`, `build`, `audit:build`, 4 bộ test Node và `wrangler deploy --dry-run` đều đạt.

## Việc chưa làm / rủi ro đã biết

1. **Form liên hệ chưa xác minh gửi thật.** Test dùng mock. Cần gửi thử một thư thật sau khi đủ 4 biến cấu hình trong Cloudflare (`CONTACT_SETUP.md`).
2. **Tồn kho phụ thuộc site ngoài** (`huong-thien-inventory…chatgpt.site`) và secret `INVENTORY_SITE_TOKEN`. Nếu không còn site đó, `/api/shop-stock` trả "unavailable" (website vẫn chạy). Nên quyết định chuyển nguồn tồn kho về Zen Flow Inventory.
3. **Nội dung Tarot/tâm linh** phải giữ giọng phản tỉnh, không hứa hẹn kết quả; quyền dùng ảnh (Pixabay, Sallie Nichols) cần giữ ghi nguồn.
4. **Repository công khai** gồm cả mã CMS và xác thực (`blog-studio/`). Quét mẫu không thấy khóa/bí mật, nhưng chưa audit bảo mật chuyên sâu. Cân nhắc tách CMS sang repo riêng.
5. **Nhiều nhánh phụ** — xem `docs/BRANCHES.md`.
6. Kiểm thử trình duyệt (Playwright, Lighthouse) chỉ chạy trong CI GitHub; chưa chạy trong phiên bàn giao này.
7. Tài liệu REVIEW_*.md, RELEASE_2.0.0.md, V3_ROOTS.md là lịch sử, có thể lỗi thời.

## Triển khai

Xem `DEPLOYMENT.md`. Tóm tắt: push `main` → Workers Builds → Worker `huong-thien-nature` → `huongthiennature.com`. Sau mỗi lần deploy phải mở domain thật kiểm tra (`/vi/`, `/en/`, `/vi/phien-ban/`, `/sitemap.xml`, `/api/contact-config`).

## Cài đặt và kiểm tra

Chạy các lệnh trong `AGENTS.md`. Trong môi trường cloud hạn chế, đặt `XDG_CONFIG_HOME`, `XDG_CACHE_HOME` vào vùng ghi được và `ASTRO_TELEMETRY_DISABLED=1`, `WRANGLER_SEND_METRICS=false`.

## Gói mã nguồn

`git archive` tại commit đã push; không gồm `.git`, `node_modules`, `dist`, bí mật.
