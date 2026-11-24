# Bàn giao phát triển Hương Thiền Nature

Cập nhật: 2026-11-24, phiên bản 2.13.0. Đọc cùng `AGENTS.md` (quy tắc làm việc) và `CHANGELOG.md`.

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
| 24/11 | 2.9.0: cửa hàng ba không gian nối Zen Flow Inventory, Tarot dễ đặt lịch (ô giá chờ), CSP/HSTS, Astro 7 |
| 24/11 | 2.10.0: trang khóa Tần Số Vàng (6 chặng, tự định vị tần số, bài tập tuần, nhà khoa học, báo giá) và ảnh chia sẻ VI/EN |
| 24/11 | 2.11.0–2.11.2: tinh chỉnh giao diện, tìm kiếm Tản văn, ẩn học phí (báo giá qua tin nhắn), thang tần số kéo được, khối thông tin khóa học, bảng so sánh hai khóa, lời nhắn an toàn ấm áp hơn |
| 24/11 | 2.12.0: phong cách vàng ánh tím toàn trang (từ trang Tần Số Vàng), trang Phản hồi học viên trên menu, thẻ phản hồi và danh mục khóa làm lại |
| 24/11 | 2.12.1: form lời nhắn dễ dùng hơn (bộ đếm, mũi tên chọn chủ đề, dòng quyền riêng tư, ô đồng ý), icon sen trên thẻ phản hồi |
| 24/11 | 2.13.0: trang Album (20 ảnh thật, bốn nhóm, lightbox) trên menu; dải ảnh thật trên Trang chủ, Câu chuyện, Hệ sinh thái, Thực hành, Khóa thực hành, Tần Số Vàng, Tarot; menu gập ☰ đến 1279px |

Ghi chú lịch sử: CHANGELOG từng thiếu mục 2.0.0/2.0.1 và 2.8.0–2.8.3 (mất khi gộp nhánh song song). 2.8.x đã được khôi phục ở 2.8.4. Mô tả 2.0.0 xem `RELEASE_2.0.0.md`.

## Trạng thái hiện tại

- Website: tiếng Việt `/vi`, tiếng Anh `/en`, gốc `/` mở thẳng trang chủ tiếng Việt. 86 trang HTML, 32 bài tản văn, 82 URL trong sitemap.
- Trang chính: trang chủ (ba quỹ đạo, khám phá, tìm kiếm), Tản văn, Cửa hàng (tổng quan + ba không gian chủ đề), Khóa thực hành (Tần Số Vàng, Tarot 1:1), Phản hồi học viên, Album, Câu chuyện, Đội ngũ, Hệ sinh thái, Liên hệ, Lịch sử phiên bản.
- Kiểm tra ngày 24/11/2026 trên bản clone: `check`, `audit`, `build`, `audit:build`, các bộ test Node (contact, worker, search, shop, tarot, headers, hybrid-nature, ecosystem, home), `wrangler deploy --dry-run`, bảy bài kiểm tra trình duyệt Playwright (axe: 104 lượt quét, 0 lỗi) và quét CSP 81 trang trong trình duyệt thật đều đạt. `npm audit`: 0 lỗ hổng.

## Việc chưa làm / rủi ro đã biết

1. **Form liên hệ chưa xác minh gửi thật.** Test dùng mock. Cần gửi thử một thư thật sau khi đủ 4 biến cấu hình trong Cloudflare (`CONTACT_SETUP.md`).
2. **Feed cửa hàng phụ thuộc Zen Flow Inventory đã được triển khai** (`zen-flow-inventory.huongthiennature.com`). Nếu chưa deploy hoặc chưa xuất bản sản phẩm, cửa hàng dùng danh mục dự phòng (thực phẩm sạch 8 sản phẩm; Đá năng lượng và Sách hiện trạng thái trống/liên hệ). `src/pages/catalogue/inventory.json.ts` là di sản của site ChatGPT cũ, Worker không còn dùng; có thể xóa khi chủ dự án đồng ý.
3. **Giá buổi Tarot chưa công bố** — ô giá hiện "Báo giá qua tin nhắn". Nếu muốn hiện giá, chủ dự án cung cấp rồi đặt tại `tarotOffer.price`.
   **Khóa Tần Số Vàng**: học phí đã xác nhận (5,6tr năm 2026, 6,6tr từ 2027, `frequencyFees`); người hỗ trợ học viên là Kiều Mạnh. Hình thức: lớp online 1 tháng, khai giảng hằng tháng (ngày cụ thể gửi kèm báo giá). Phúc lợi sau khóa (nhóm 30 ngày, buổi gặp lại, sổ tay, bản ghi thiền, hỏi đáp 30 ngày, ưu tiên học viên) là đề xuất, cần chủ dự án xác nhận; trang ghi "phạm vi cụ thể theo báo giá".
   **Còn thiếu để người tham khảo yên tâm đăng ký (chờ chủ dự án)**: số buổi học trực tiếp và nền tảng của lớp Tần Số Vàng; sĩ số; chính sách hoàn/dời lịch; cam kết bảo mật buổi 1:1; thêm phản hồi học viên khác (mới có 1, của Kiều Mạnh, ở `src/data/student-feedback.ts`; không tự tạo).
4. **Phân tích số liệu (analytics)** chưa có, quyết định xây ở CMS sau.
5. **Hiệu ứng chuyển động**: mọi chuyển động tôn trọng `prefers-reduced-motion`, nhưng quỹ đạo trang chủ không có nút dừng (quyết định thiết kế từ 2.7.3); cân nhắc lại nếu cần đạt WCAG 2.2.2 tuyệt đối.
6. **Nội dung Tarot/tâm linh** phải giữ giọng phản tỉnh, không hứa hẹn kết quả; quyền dùng ảnh (Pixabay, Sallie Nichols) cần giữ ghi nguồn.
7. **Repository công khai** gồm cả mã CMS và xác thực (`blog-studio/`). Quét mẫu không thấy khóa/bí mật, nhưng chưa audit bảo mật chuyên sâu. Cân nhắc tách CMS sang repo riêng.
8. **Nhiều nhánh phụ** — xem `docs/BRANCHES.md`.
9. Lighthouse chỉ chạy trong CI GitHub; Playwright đã chạy cục bộ trong phiên 2.9.0.
10. Tài liệu REVIEW_*.md, RELEASE_2.0.0.md, V3_ROOTS.md là lịch sử, có thể lỗi thời.

## Triển khai

Xem `DEPLOYMENT.md`. Tóm tắt: push `main` → Workers Builds → Worker `huong-thien-nature` → `huongthiennature.com`. Sau mỗi lần deploy phải mở domain thật kiểm tra (`/vi/`, `/en/`, `/vi/phien-ban/`, `/sitemap.xml`, `/api/contact-config`).

## Cài đặt và kiểm tra

Chạy các lệnh trong `AGENTS.md`. Trong môi trường cloud hạn chế, đặt `XDG_CONFIG_HOME`, `XDG_CACHE_HOME` vào vùng ghi được và `ASTRO_TELEMETRY_DISABLED=1`, `WRANGLER_SEND_METRICS=false`.

## Gói mã nguồn

`git archive` tại commit đã push; không gồm `.git`, `node_modules`, `dist`, bí mật.
