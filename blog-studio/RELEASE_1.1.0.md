# Hương Thiền Studio v1.1.0 — UI/UX, DevOps, QA & Product Manager review

Ngày phát hành thử nghiệm: 10/10/2026  
Môi trường: https://studio.huongthiennature.com/  
Nhánh mã nguồn: `experiment/blog-studio-cloudflare-v1`  
Cloudflare Worker entry: `studio-api-v7.mjs`  
Hạ tầng: Cloudflare Workers, D1, R2; website chính không thay đổi.

## Nguồn tham chiếu, không sao chép mã nguồn

- Publii CMS: không gian biên tập rộng, thanh công cụ và chế độ xem trước, cài đặt bài viết ẩn ở cạnh màn hình.
- Lovable: thiết kế nhất quán, phân cấp rõ ràng, thẻ/nút tinh gọn, trạng thái phản hồi khi thao tác.
- Ghost: quy trình bản nháp → xuất bản, liên kết bài và thông tin bài viết.

## Changelog v1.1.0

- Chuyển màn hình viết bài thành *editor mode* toàn chiều ngang, ẩn sidebar và topbar chính.
- Thanh điều khiển ở trên: Quay lại, Xem trước, Thống kê, Lưu và menu tùy chọn; cài đặt bên cạnh.
- Biên tập nội dung **trực quan (WYSIWYG)** mặc định với tab chuyển qua lại Markdown. Định dạng hỗ trợ: chữ đậm, nghiêng, h2/h3, trích dẫn, danh sách, link và đường phân cách.
- Hỗ trợ kéo ảnh từ R2 vào nội dung bằng nút ảnh trên toolbar (chọn tệp).
- Nút **Lưu** giữ nguyên trạng thái đang xuất bản thay vì tự động chuyển thành bản nháp. Menu riêng cho Lưu nháp / Xuất bản.
- Bổ sung liên kết mở bài đã xuất bản từ danh sách bài và trình soạn thảo, kèm nút sao chép liên kết.
- Bổ sung bảng thống kê từng bài (lượt mở trang 30 ngày/tổng cộng, ngày cập nhật), có xác thực.
- Mobile/tablet: bố cục editor, toolbar và điều khiển linh hoạt.
- Cập nhật changelog trong dashboard và số phiên bản `v1.1.0`, API health và file xuất dữ liệu.
- Giữ dữ liệu D1/R2, tài khoản và quyền truy cập đang có.

## QA test cases

| ID | Kịch bản | Kỳ vọng | Trạng thái |
| --- | --- | --- | --- |
| SEC-01 | GET /api/studio/dashboard không cookie | 401 JSON | PASS — thực tế |
| SEC-02 | GET /api/studio/post-stats không cookie | 401 JSON | PASS — thực tế |
| SEC-03 | GET /api/posts không cookie | 401 JSON | PASS — thực tế |
| WEB-01 | GET /, /register, /forgot-password | 200 | PASS — thực tế |
| WEB-02 | GET /api/health | 200, version 1.1.0 | PASS — thực tế |
| WEB-03 | GET /api/public/posts | 200 | PASS — thực tế |
| UI-01 | JavaScript trang chủ | Không có SyntaxError | PASS — biên dịch trên phản hồi thật |
| UI-02 | Editor, link, version và Kanban trong HTML đã xuất bản | Tồn tại đủ thành phần | PASS — kiểm tra HTML |
| UI-03 | Chuyển màn hình danh sách ↔ trình biên tập trên phiên đăng nhập | Không lỗi bố cục | PENDING — cần browser phiên đăng nhập |
| UI-04 | WYSIWYG ↔ Markdown với bài nhiều đoạn, in đậm, liên kết và ảnh | Không mất nội dung | PENDING — cần browser phiên đăng nhập |
| UI-05 | Chọn chữ, bấm toolbar và lưu | Nội dung đã định dạng còn sau tải lại | PENDING — end-to-end |
| DATA-01 | Lưu nháp mới và tải lại | D1 giữ đúng dữ liệu | PENDING — authenticated E2E |
| DATA-02 | Sửa bài đã xuất bản rồi bấm **Lưu** | Tiếp tục xuất bản, không chuyển thành nháp | PENDING — authenticated E2E |
| DATA-03 | Sao chép link bài và mở /read/{locale}/{slug} | Bài công khai hiển thị đúng | PASS — link bài đã có; chưa kiểm thử nút sao chép trong browser |
| DATA-04 | Ảnh nội dung / ảnh bìa R2 | Tệp tải lên và hiển thị trong bài | PENDING — authenticated E2E |
| STATS-01 | GET /api/studio/post-stats khi đăng nhập | Chỉ trả thống kê đúng bài | PENDING — authenticated E2E |
| MOBILE-01 | Desktop (1440px), Tablet (768px), Mobile (375px) | Không tràn/mất nút, toolbar dùng được | PENDING — cần screenshot/browser thật |
| UX-01 | Thay đổi chưa lưu khi rời bài | Hiện xác nhận trước khi rời | PENDING — browser thật |
| BUILD-01 | Kiểm tra cú pháp các module bundle & script nhúng | Không lỗi cú pháp | PASS — 16 module/script |
| DEPLOY-01 | Phát hành Cloudflare | HTTP 200, entry v7 | PASS — thực tế |

## Đánh giá UI Designer

Ưu điểm: Không gian biên tập được ưu tiên đúng yêu cầu, nhãn thao tác dễ hiểu, cài đặt thứ cấp ẩn đi, thông điệp thương hiệu thống nhất; responsive đã được viết ở ba breakpoint.
Cần xem trên nhiều thiết bị: toolbar có thể chiếm hai dòng trên màn hình hẹp; cần chụp màn hình thật để đánh giá khoảng trắng và tràn nút.

## Đánh giá Developer

Cấu trúc hiện tại vẫn là frontend script nhúng một trang nhằm phát hành nhanh, có WYSIWYG tối giản và serializer Markdown giới hạn. Đủ cho nội dung thông thường, không tương đương toàn bộ tính năng TinyMCE/HugeRTE (bảng, gallery, định dạng nâng cao). Vì chuyển đổi từ nội dung phong phú sang Markdown có thể không bảo toàn mọi cấu trúc phức tạp, **hãy sao lưu và kiểm thử bài dài trước khi sử dụng chính thức**.

## DevOps

Worker riêng đã xuất bản thành công, các binding D1/R2 và cấu hình xác thực hiện có được giữ lại. Mã mới nằm trên nhánh thử nghiệm, không merge vào `main`. Không xóa hay ghi đè bài viết hiện có. Nhật ký sự kiện và số lượt xem thực dùng D1.

## Product Manager verdict

**v1.1.0 Beta đã xuất bản và đạt smoke test không đăng nhập.** Chưa phê duyệt General Availability (GA) trước khi test thực tế các thao tác soạn/sửa/lưu/xuất bản và responsive trên phiên đăng nhập. Các cải thiện sau ưu tiên: xử lý danh sách/galleries nâng cao, backup ảnh R2, hỗ trợ đa website/tenant khi sản phẩm mở cho đối tác.
