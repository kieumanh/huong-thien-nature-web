# Kiểm lỗi và dọn mã — v0.4.4

Ngày kiểm tra: 07/10/2026. Phạm vi: mã nguồn trên `main`, build Astro, API liên hệ, Worker, điều hướng, nhạc, CSS và tài nguyên WebP.

## Lỗi đã tái hiện và sửa

| Phát hiện | Ảnh hưởng trước sửa | Cách sửa |
|---|---|---|
| Turnstile hết hạn/báo lỗi khi email đang gửi hoặc sau khi gửi thành công | Ghi đè trạng thái gửi bằng thông báo lỗi xác minh | Luôn vô hiệu hóa token hết hạn; chỉ cập nhật thông báo xác minh khi không đang gửi và chưa có kết quả thành công. Kiểm thử cả hai callback trong hai ngôn ngữ. |
| Kiểm thử danh sách Tản văn vẫn đếm ba bài và chọn bài đầu theo thư viện cũ | Bộ kiểm thử lỗi dù thư viện đã có 15 bài, bỏ qua các bài Roots mới | Đọc manifest từ nguồn nội dung hiện tại. Kiểm tra cả danh sách, bài đầu và toàn bộ 30 trang bài song ngữ. |
| CSS không còn tham chiếu và khai báo bị ghi đè | Giữ mã của chức năng email cũ và logo footer cũ; khó theo dõi màu nút | Xóa `contact-status`, `contact-draft-links`, `contact-direct`, `footer-mark`, kể cả quy tắc responsive. Gộp khai báo màu nhạc/nút lên đầu trang và khoảng đệm footer; bỏ nhánh xử lý lỗi Contact lặp. |

## Kết quả kiểm tra

- `astro check`: 33 tệp, 0 lỗi/cảnh báo/hint.
- 31 kiểm thử Contact API và 5 kiểm thử Worker đạt.
- Build: 36 trang HTML, 30 trang bài viết, 34 URL sitemap; 1.382 liên kết/tài nguyên nội bộ hợp lệ.
- Pages Functions compile và Worker dry-run đạt.
- Năm bộ kiểm thử Chromium đạt: toàn bộ trang nội dung, danh sách Tản văn, Contact, nhạc nền, vị trí nút và ngưỡng cuộn 30%.
- Giao diện tiếng Việt/Anh được kiểm tra ở chiều rộng 320–1.440 px. Menu, liên kết, 404 và điều hướng khi tắt JavaScript đạt.
- Đổi màu nút trên nền sáng/tối/ảnh đạt; độ tương phản chữ và biểu tượng trên 4,5:1.
- Axe-core không phát hiện vi phạm WCAG A/AA tự động trên hai trang chủ, hai trang danh sách và hai trang bài Roots được kiểm tra.
- 21 tệp WebP có chữ ký định dạng hợp lệ; MP3 đính kèm giải mã và phát được trong Chromium.

Các kiểm thử API/widget dùng dữ liệu giả lập và không gửi email thật. Kết quả trên không xác minh deployment production, cấu hình secret Cloudflare hoặc thư đã vào hộp nhận. Kiểm tra tự động không bảo đảm phát hiện mọi lỗi.
