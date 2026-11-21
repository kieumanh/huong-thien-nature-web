# Báo cáo QA · Zen Botanical v2.2.0

Đối chiếu với v2.1.0 tại commit [c56492a](https://github.com/kieumanh/huong-thien-nature-web/commit/c56492a9830e6dfd66c3fa40ee5d7a37640de10d). Bản phát hành dùng nhánh `design/zen-botanical-2026`. [Lịch sử kiểm thử GitHub](https://github.com/kieumanh/huong-thien-nature-web/actions/workflows/validate.yml).

## Kiểm tra bản dựng

| Kiểm tra | Kết quả cục bộ |
| --- | --- |
| Astro check | 0 lỗi, 0 cảnh báo, 11 gợi ý có sẵn trong Blog Studio |
| Audit nguồn | 33 anchor duy nhất, 15 biến thể ảnh được tham chiếu, 63 tệp media |
| Unit test | 65 ca cho liên hệ, tìm kiếm, cửa hàng, Worker, chuyển động và trang chủ |
| Build và audit | 62 trang HTML, 32 trang bài viết VI/EN, 58 URL sitemap, 2.774 tham chiếu cục bộ được kiểm tra |

## Trình duyệt và so sánh trước/sau

Workflow đính kèm artifact `zen-botanical-browser` với ảnh trước/sau ở 393 và 1440 CSS px, kích thước bố cục, kết quả axe và số đo Lighthouse. Kiểm tra responsive trên 8 mẫu trang ở cả VI và EN, trong sáu viewport từ 320 đến 1440 CSS px. Kiểm tra reflow ở 320 CSS px và zoom nội dung 200% như hai phép thử riêng.

Các kịch bản dùng bàn phím để bỏ qua header, đóng menu bằng Escape, mở mục lục và về đầu trang. Chúng kiểm tra nhạc thật, ngôn ngữ, tìm kiếm không dấu, khung tác giả, lọc sản phẩm, điền sẵn lời hỏi, phản hồi form và các lối thay thế khi tắt JavaScript. Phản hồi tồn kho và gửi form dùng dữ liệu mô phỏng tại cổng kiểm thử, với các trường hợp còn hàng, hết hàng, chưa xác nhận và dịch vụ tạm ngưng. Kiểm thử không phát sinh email thật.

## Giới hạn phép đo

Lighthouse đo trong Chromium với cấu hình mobile mặc định, trên cùng runner và hai bản build Astro. LCP, CLS và Total Blocking Time trong lab có thể so sánh giữa hai bản. Chỉ số INP thực địa cần dữ liệu tương tác của lượt truy cập thật. Kiểm tra axe và bàn phím chỉ bao phủ các trạng thái được mô tả, nên chưa đủ để khẳng định toàn bộ website đạt chuẩn WCAG 2.2 AA.
