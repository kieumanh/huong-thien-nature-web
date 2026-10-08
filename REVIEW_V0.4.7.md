# Kiểm tra mã nguồn và homepage — v0.4.7

Ngày kiểm tra: 08/10/2026. Kế thừa v0.4.6; phạm vi gồm mã Astro/TypeScript, nội dung song ngữ, CSS, liên kết, tìm kiếm, API liên hệ, Worker, nhạc và điều hướng.

## Thay đổi

- Giữ phong cách Roots; bổ sung ô tìm kiếm và từ khóa gợi ý ngay sau phần mở đầu.
- Thêm lộ trình ba bài cho người mới; CTA chính dẫn đến bài hướng dẫn bắt đầu thiền.
- Chọn ba bài Roots nổi bật từ thư viện 15 bài hiện có, với nội dung tiếng Việt và tiếng Anh. Không thêm bài chưa được xuất bản.
- Đưa lựa chọn bài và nội dung homepage vào `src/data/home.ts`; báo lỗi nếu bài được chọn không tồn tại.
- Bỏ các khóa nội dung homepage cũ không còn dùng.
- Sửa audit liên kết để bỏ query string khi kiểm tra đường dẫn tệp; URL tìm kiếm có `?q=...` không còn bị hiểu là tên tệp.
- Giới hạn selector kiểm thử nút gửi Contact trong form liên hệ, vì homepage nay có thêm nút gửi tìm kiếm.
- Đồng bộ số phiên bản package, lockfile và tài liệu thành 0.4.7.

## Kết quả

- Astro check: 43 tệp, không có lỗi, cảnh báo hoặc hint.
- 40 kiểm thử Node đạt: 31 Contact API, 4 tìm kiếm, 5 Worker.
- Source audit đạt: 33 anchor duy nhất, 21 tài nguyên media.
- Build đạt: 38 trang HTML, 30 trang bài song ngữ, 36 URL sitemap, hai chỉ mục tìm kiếm; 1.479 liên kết/tài nguyên nội bộ hợp lệ.
- Pages Functions compile và Worker dry-run đạt. Không thực hiện deployment bằng dry-run.
- Sáu bộ kiểm thử Chromium đạt: toàn bộ trang nội dung, homepage/tìm kiếm, Contact, Tản văn/độ tương phản, nhạc và nút điều hướng.
- Giao diện hai ngôn ngữ không tràn ngang ở các chiều rộng kiểm tra từ 320 đến 1.440 px. Lộ trình đọc và liên kết vẫn dùng được khi tắt JavaScript; trang tìm kiếm có liên kết dự phòng đến thư viện.
- Tìm kiếm kiểm tra kết quả thực, không có kết quả, dữ liệu truy vấn chứa HTML, giữ từ khóa khi đổi ngôn ngữ và lỗi tải chỉ mục.
- Axe-core không phát hiện vi phạm tự động theo WCAG 2 A/AA và 2.1 AA trên tám trang đại diện: homepage, tìm kiếm, thư viện và bài hướng dẫn đầu tiên trong mỗi ngôn ngữ.
- Rà soát ảnh giao diện desktop/mobile và `git diff --check` đạt.

Các kiểm thử Contact dùng provider/widget giả lập, không gửi email thật. Kết quả này chưa xác minh cấu hình secret, gửi email hoặc deployment Cloudflare production. Kiểm tra tự động và rà soát mã không bảo đảm phát hiện mọi lỗi.
