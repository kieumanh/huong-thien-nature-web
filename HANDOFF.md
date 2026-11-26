# Bàn giao phát triển Hương Thiền Nature

Cập nhật: 2026-11-26, phiên bản 2.24.3 (Tarot dùng số hỗ trợ; icon Thân là hạt giống). Điểm neo trước đợt này: nhánh `anchor/2026-11-26-v2.23.0`.

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
| 24/11 | 2.13.0: trang Album (34 ảnh thật, sáu nhóm, lightbox) trên menu; dải ảnh thật trên Trang chủ, Câu chuyện, Hệ sinh thái, Gợi ý, Khóa thực hành, Tần Số Vàng, Tarot; menu gập ☰ đến 1279px |
| 24/11 | 2.14.0: khối đồng cảm trên Trang chủ, Tần Số Vàng, Tarot; 5 bài Tản văn mới (chữa lành, cảm xúc, ranh giới, mất mát, biết ơn); mọi bài ≥ 3 ảnh (12 tranh minh họa SVG tự vẽ + ảnh album); Tản văn lọc theo 6 chủ đề thay ô tìm kiếm |
| 24/11 | 2.14.1: Tản văn chia trang, lưới 3 × 3 (9 bài/trang), phân trang chạy cùng bộ lọc chủ đề |
| 24/11 | 2.14.2: trang Gợi ý: thở một phút có hướng dẫn, lối đọc 3 bước, nút đi nhanh, lời mời cuối trang |
| 24/11 | 2.14.3: ba lối đọc Tản văn có chấm đầu dòng vàng và gạch chân từng bài |
| 24/11 | 2.14.4: ba lối đọc bỏ gạch chân, giữ chấm • đầu dòng |
| 24/11 | 2.15.2: sửa khoảng cách menu điện thoại (đường kẻ không còn chạm nút đóng) |
| 25/11 | 2.23.0: Tần Số Vàng học 2 tháng, 1 buổi/tuần, 2 giờ/buổi; ở gần học trực tiếp, ở xa 100% online; học phí đã gồm không gian, thiết bị, phương tiện hỗ trợ, giáo án và tài nguyên (`priceNote`, mục "Học phí đã gồm"). Còn chờ chủ dự án xác nhận: nhóm đồng hành 30 ngày / buổi gặp lại sau 30 ngày trong phần hỗ trợ sau khóa có giữ nguyên không. |
| 25/11 | 2.22.1: mục Những người đồng hành (ecosystem) hiển thị nhãn "Dự án" rõ ràng và link website là nút toàn chiều rộng (`.partner-card__site`); tên farm tiếng Anh thống nhất. |
| 25/11 | 2.22.0: công bố giá. Tần Số Vàng 5,6 triệu đến hết giao thừa Tết Âm lịch 2027 (đồng hồ đếm ngược), sau đó 6,6 triệu; Tarot 600.000 ₫/phiên 90 phút; bỏ phần nhắn hỏi giá. **Việc cần làm: build lại site sau 06/02/2027** để dữ liệu có cấu trúc chuyển sang 6,6 triệu. |
| 24/11 | 2.21.3: bìa `returning-attention` đổi sang `pixabay-2268333.webp` (bàn chân trần trên cỏ, nguồn đã ghi trong `article-photos.ts`); avatar Kiều Mạnh trong Phản hồi học viên là `author-kieu-manh-avatar.webp` (trường `avatar`). |
| 24/11 | 2.21.2: bỏ ô sắp xếp Tản văn (luôn mới nhất trước); ba bài `returning-attention`, `seven-layers`, `listening-to-nature` có ngày đăng 22/11/2026 (chủ dự án cung cấp). |
| 24/11 | 2.21.1: lối đọc Gợi ý có bước 4 "Thấy khó ngồi yên?" (cùng kiểu thẻ, dẫn tới `when-meditation-is-difficult`); khối rời `practice-help` đã gỡ; ghép bằng `practicePath(lang)` trong `src/data/home.ts`. |
| 24/11 | 2.21.0: Tản văn xếp bài mới nhất lên đầu (mặc định), bài chưa có ngày xếp cuối; bỏ tùy chọn "tuyển chọn" và số thứ tự ở lối đọc. Còn chờ chủ dự án cung cấp ngày đăng cho `returning-attention`, `seven-layers`, `listening-to-nature`. |
| 24/11 | 2.20.1: khôi phục ảnh Tarot như 2.19.1 (`tarot-thumbnail.jpg`, `course-tarot.webp`, ảnh chia sẻ chung); gỡ minh họa mới, `tarot-course-*.jpg`, trường `thumbnail.share` và công cụ dựng ảnh Tarot. |
| 24/11 | 2.20.0: Tarot có minh họa mới (`tarot-illustration.webp`) thay ảnh Pixabay đã gỡ khỏi kho; ảnh chia sẻ riêng vi/en (`tarot-course-*.jpg`) cho og, twitter và schema; thumbnail tìm kiếm `course-tarot.webp` làm lại. |
| 24/11 | 2.19.1: sửa mốc lập gia đình trong trang Câu chuyện từ 22 lên 25 tuổi (vi, en). |
| 24/11 | 2.19.0: bài Tản văn mới "Mặt Trời, Mặt Trăng và nhịp sống của chúng ta" (Thiên nhiên, vi ~2.750 chữ, en rút gọn); 5 hình minh họa chuyển động song ngữ (CSS, tắt khi giảm chuyển động) + bìa vẽ riêng; 7 nguồn với `sourcesNote`; sửa tiêu đề chế độ đọc nền sáng vào ban đêm. |
| 24/11 | 2.18.0: kết quả tìm kiếm có ảnh thu nhỏ; thumbnail chia sẻ minh họa (mặc định + Quỹ ủng hộ, vi/en); dải ảnh Hành trình cân đối (2×2 trên điện thoại) + ảnh thứ 4; nút Gặp đội ngũ; trang Đội ngũ giữ bio dài. |
| 24/11 | 2.17.1: liên kết tác giả cuối bài tách rõ; bio tác giả gọn hơn. |
| 24/11 | 2.17.0: trang Quỹ ủng hộ (vi/en) có hình động, thông tin chuyển khoản + QR TPBank của Kiều Xuân Mạnh; khối Quỹ ủng hộ ở chân trang. |
| 24/11 | 2.16.2: gỡ dòng số khẩn cấp 115; thêm ZenWork vào Hệ sinh thái; thanh chế độ đọc nằm trong luồng trang; khoảng cách trang Gợi ý. |
| 24/11 | 2.16.1: gỡ "Khu vườn của tôi" (mục, nút Lưu, nhắc đọc tiếp) khỏi Tản văn; canh giữa nút Liên hệ Trang chủ. |
| 26/11 | 2.24.3: Tarot — nút Zalo dùng 0388.000.680 (Kiều Mạnh); trang Liên hệ giữ hai thẻ; icon THÂN là hạt giống (`brand/icons/brand/hat-giong.svg`) có chuyển động nhẹ; khối trích dẫn ví dụ Tarot có khoảng đệm, không còn sát lằn tím. |
| 26/11 | 2.24.2: Living Zen — mô tả Thân/Tâm/Trí thẳng hàng (subgrid), bỏ thanh màu bên trái, icon cây/thiền/ánh sáng trong trí có chuyển động nhẹ và căn giữa khung; tắt khi bật giảm chuyển động. |
| 26/11 | 2.24.1: Living Zen và Tần Số Vàng — viết lại đoạn 28 tuổi; sửa đường kẻ đè chữ trong phản hồi học viên; icon Thân–Tâm–Trí (cây / thiền / ánh sáng trong trí, `brand/icons/brand`); chân trang thu gọn; Tần Số Vàng: khung vàng dịu hơn, thêm ảnh thứ tư, căn đường kẻ lịch sinh hoạt (mobile và tablet), liên hệ trang này dùng 0388.000.680 (Kiều Mạnh); gỡ "Buổi gặp lại sau 30 ngày" (còn 5 mục hỗ trợ). Trang Tarot và Liên hệ vẫn dùng hotline 0868 499 856. |
| 26/11 | 2.24.0: Living Zen 2.0 — thư mục `brand/` (kiểm kê, 3 logo đề xuất, màu, chữ Lora, token, icon, họa tiết, 75 mẫu, brand book), lớp màu mới (xanh rừng chính, vàng là điểm nhấn), lựa chọn giao diện, khối Thân – Tâm – Trí, trang nội bộ `/living-zen/` |
| 24/11 | 2.16.0: Tản văn "Một khoảng lặng giữa dòng đời": trang sách mở, tìm kiếm + sắp xếp, "Một bài viết hữu duyên", chế độ Đọc trong tĩnh lặng, Khu vườn của tôi (localStorage), trích dẫn/khoảng dừng, ảnh thu nhỏ, sửa CLS |
| 24/11 | 2.15.1: vòng quỹ đạo Trang chủ trở lại Thân/Tâm/Trí, trung tâm "Nhận biết"; Liên hệ có 2 thẻ (Hương Thiền 0868499856, Kiều Mạnh 0388000680); bỏ dòng 115 dưới khối thở theo yêu cầu chủ dự án; kimtuthap.vn đã được chủ dự án xác nhận là website thứ hai của đối tác |
| 24/11 | 2.15.0: Hệ sinh thái viết lại quanh 3 trọng tâm (Pháp môn / Thiên nhiên từ farm đối tác / Thực hành-sách-đá); Trang chủ thêm khối 2 khóa; đá năng lượng có bảng giá tham khảo từ kimtuthap.vn (chưa có ảnh, cần xác nhận quan hệ với kimtuthap.org); Hotline/Zalo gộp một số 0868499856; sửa nhãn timeline tablet |

Ghi chú lịch sử: CHANGELOG từng thiếu mục 2.0.0/2.0.1 và 2.8.0–2.8.3 (mất khi gộp nhánh song song). 2.8.x đã được khôi phục ở 2.8.4. Mô tả 2.0.0 xem `RELEASE_2.0.0.md`.

## Trạng thái hiện tại

- Website: tiếng Việt `/vi`, tiếng Anh `/en`, gốc `/` mở thẳng trang chủ tiếng Việt. 96 trang HTML, 32 bài tản văn, 92 URL trong sitemap.
- Trang chính: trang chủ (ba quỹ đạo, khám phá, tìm kiếm), Tản văn, Cửa hàng (tổng quan + ba không gian chủ đề), Khóa thực hành (Tần Số Vàng, Tarot 1:1), Phản hồi học viên, Album, Câu chuyện, Đội ngũ, Hệ sinh thái, Liên hệ, Lịch sử phiên bản.
- Kiểm tra ngày 24/11/2026 trên bản clone: `check`, `audit`, `build`, `audit:build`, các bộ test Node (contact, worker, search, shop, tarot, headers, hybrid-nature, ecosystem, home), `wrangler deploy --dry-run`, bảy bài kiểm tra trình duyệt Playwright (axe: 104 lượt quét, 0 lỗi) và quét CSP 81 trang trong trình duyệt thật đều đạt. `npm audit`: 0 lỗ hổng.

## Việc chưa làm / rủi ro đã biết

1. **Form liên hệ chưa xác minh gửi thật.** Test dùng mock. Cần gửi thử một thư thật sau khi đủ 4 biến cấu hình trong Cloudflare (`CONTACT_SETUP.md`).
2. **Feed cửa hàng phụ thuộc Zen Flow Inventory đã được triển khai** (`zen-flow-inventory.huongthiennature.com`). Nếu chưa deploy hoặc chưa xuất bản sản phẩm, cửa hàng dùng danh mục dự phòng (thực phẩm sạch 8 sản phẩm; Đá năng lượng và Sách hiện trạng thái trống/liên hệ). `src/pages/catalogue/inventory.json.ts` là di sản của site ChatGPT cũ, Worker không còn dùng; có thể xóa khi chủ dự án đồng ý.
3. **Giá buổi Tarot chưa công bố** — ô giá hiện "Báo giá qua tin nhắn". Nếu muốn hiện giá, chủ dự án cung cấp rồi đặt tại `tarotOffer.price`.
   **Khóa Tần Số Vàng**: học phí đã công bố (5,6tr đến hết giao thừa Tết Âm lịch 2027, 6,6tr từ mùng 1 Tết; mốc trong `frequencyPricing` ở `src/data/courses.ts`); học phí đã gồm không gian, thiết bị, phương tiện hỗ trợ, giáo án và tài nguyên hỗ trợ thầy cô. Người hỗ trợ học viên là Kiều Mạnh. Hình thức (2.23.0): 2 tháng, 1 buổi/tuần, 2 giờ/buổi; ở gần học trực tiếp, ở xa 100% online; khai giảng hằng tháng. Phúc lợi sau khóa: nhóm đồng hành 60 ngày, kết nối khi cần sau 2 tháng, buổi gặp lại sau 30 ngày, sổ tay, bản ghi thiền, ưu tiên học viên. Phần này là nội dung chủ dự án cung cấp, cần giữ đúng khi sửa.
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
