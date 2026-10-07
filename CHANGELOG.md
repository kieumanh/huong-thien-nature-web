# Lịch sử phiên bản

Phiên bản dùng `major.minor.patch`, hiển thị từ `package.json` tại footer và thẻ `application-version`. V3 Roots là tên định hướng thiết kế; số phát hành là số đi kèm. Thay đổi sửa lỗi/giao diện tăng patch, tính năng lớn tăng minor, thay đổi không tương thích tăng major.

## V3 Roots 0.3.2

- Contact có phương án Soạn email đến địa chỉ chủ dự án đã cung cấp khi API hoặc khởi tạo xác minh chưa hoạt động. Có liên kết ứng dụng email và Gmail; người dùng kiểm tra rồi tự gửi, không nhầm bản nháp với gửi thành công.
- Điều khiển nhạc chuyển xuống góc trái, bảng âm lượng mở cùng phía.
- Nút Về đầu trang ở góc phải xuất hiện khi cuộn đạt 30% phần trang có thể cuộn; hỗ trợ bàn phím và giảm chuyển động.
- Hiển thị số phiên bản tại footer và metadata để nhận diện bản đang chạy.

## V3 Roots 0.3.1

- API liên hệ Cloudflare Pages Functions, Resend và Turnstile; gửi trực tiếp cần cấu hình runtime.
- Nhạc nền Lotus at First Light, bật/tắt, âm lượng và ghi nhớ lựa chọn. Tính năng nhạc đã phát hành trước khi quy ước tăng số cho từng bản cập nhật được áp dụng.
