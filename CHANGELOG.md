## 0.4.0 — Roots editorial library

- Publish twelve complete Roots articles in Vietnamese and English, retaining the original three entries.
- Add six watercolor illustrations, practice exercises, localized CTAs, ordered related reading and an introductory reading path.
- Add structured article metadata, publication/source attribution and a reusable content export.
- Credit the manuscript by title only; exclude all Google Drive links from published code, pages and content exports.
- Preserve v0.3.5 navigation/SEO improvements and existing localized URLs/contact behavior.

## 0.3.5 — Journal navigation and SEO

- Exclude the new Google Drive-derived editorial collection and its generated content exports from this release; retain the three previously published bilingual articles.
- Add article contents with accessible section links, BlogPosting/BreadcrumbList structured data and article Open Graph metadata.
- Keep related reading bounded and the homepage journal preview limited to three entries.
- Preserve localized URLs, existing media, contact behavior and the current publication platform.

## 0.3.4
- Remove email draft and mailto fallback; retain server-side message delivery through Resend and Turnstile.
- Localize Vietnamese journal listing and article URLs, translation links and sitemap; redirect legacy URLs.

# Lịch sử phiên bản

Phiên bản dùng `major.minor.patch`, hiển thị từ `package.json` tại footer và thẻ `application-version`. V3 Roots là tên định hướng thiết kế; số phát hành là số đi kèm. Thay đổi sửa lỗi/giao diện tăng patch, tính năng lớn tăng minor, thay đổi không tương thích tăng major.

## V3 Roots 0.3.3

- Hai nút nổi (nhạc và về đầu trang) tự chọn nền tối trên vùng sáng, nền sáng trên vùng tối, theo vị trí riêng khi cuộn/đổi kích thước. Ảnh cùng nguồn được lấy mẫu màu tại vị trí nút. Chữ, biểu tượng, viền, dấu trạng thái và bảng âm lượng cùng đổi màu để giữ độ tương phản.
- Navigation Tản văn dẫn đến trang danh sách riêng, song ngữ tại `/vi/journal/` và `/en/journal/`. Liệt kê ba bài hiện có với ảnh, chủ đề, thời gian đọc và tóm tắt; đọc bài, quay lại danh sách và đổi ngôn ngữ.
- Breadcrumb, liên kết chân trang, nút Xem tất cả và sitemap cập nhật cho hai trang mới. Giữ URL của các bài đã xuất bản.

## V3 Roots 0.3.2

- Contact có phương án Soạn email đến địa chỉ chủ dự án đã cung cấp khi API hoặc khởi tạo xác minh chưa hoạt động. Có liên kết ứng dụng email và Gmail; người dùng kiểm tra rồi tự gửi, không nhầm bản nháp với gửi thành công.
- Điều khiển nhạc chuyển xuống góc trái, bảng âm lượng mở cùng phía.
- Nút Về đầu trang ở góc phải xuất hiện khi cuộn đạt 30% phần trang có thể cuộn; hỗ trợ bàn phím và giảm chuyển động.
- Hiển thị số phiên bản tại footer và metadata để nhận diện bản đang chạy.

## V3 Roots 0.3.1

- API liên hệ Cloudflare Pages Functions, Resend và Turnstile; gửi trực tiếp cần cấu hình runtime.
- Nhạc nền Lotus at First Light, bật/tắt, âm lượng và ghi nhớ lựa chọn. Tính năng nhạc đã phát hành trước khi quy ước tăng số cho từng bản cập nhật được áp dụng.
