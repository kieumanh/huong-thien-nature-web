# Báo cáo QA · Zen Botanical v2.2.0

Đối chiếu với v2.1.0 tại commit [c56492a](https://github.com/kieumanh/huong-thien-nature-web/commit/c56492a9830e6dfd66c3fa40ee5d7a37640de10d). Bản phát hành dùng nhánh `design/zen-botanical-2026`. [Lịch sử kiểm thử GitHub](https://github.com/kieumanh/huong-thien-nature-web/actions/workflows/validate.yml).

## Kiểm tra bản dựng

| Kiểm tra | Kết quả cục bộ |
| --- | --- |
| Astro check | 0 lỗi, 0 cảnh báo, 11 gợi ý có sẵn trong Blog Studio |
| Audit nguồn | 33 anchor duy nhất, 15 biến thể ảnh được tham chiếu, 63 tệp media |
| Unit test | 65 ca cho liên hệ, tìm kiếm, cửa hàng, Worker, chuyển động và trang chủ |
| Worker và Pages Functions | Wrangler Worker dry-run và biên dịch Pages Functions thành công |
| Build và audit | 62 trang HTML, 32 trang bài viết VI/EN, 58 URL sitemap, 2.774 tham chiếu cục bộ được kiểm tra |

## Trình duyệt và so sánh trước/sau

Chromium đi qua 96 tổ hợp của 8 mẫu trang, 2 ngôn ngữ và 6 viewport. Các mẫu không phát sinh tràn ngang hay lỗi JavaScript trong các trạng thái đã chạy. Phép thử zoom nội dung 200% ở viewport 640 px và phép thử reflow tại 320 CSS px đều đạt. Axe chạy 32 lượt, không báo vi phạm. Xem [kết quả thử và ảnh đối chiếu](https://github.com/kieumanh/huong-thien-nature-web/actions/runs/44873555598/artifacts/14695480493).

| Trang chủ VI | v2.1.0 | v2.2.0 |
| --- | ---: | ---: |
| Chiều cao nội dung chính, 393 px | 5.450 px | 4.800 px |
| Chiều cao nội dung chính, 1.440 px | 3.777 px | 3.681 px |
| Vị trí nút thực tập tính từ đầu viewport, 393 px | 422 px | 383 px |
| Vị trí nút thực tập tính từ đầu viewport, 1.440 px | 654 px | 528 px |

Ở desktop, ảnh rừng nằm trong khung vòm và ba hướng của hệ sinh thái đứng cạnh nhau. Trên điện thoại, nút thực tập đến trước ảnh, các thẻ Thân, Tâm và Trí đứng theo một cột và các bài nổi bật có ảnh nhỏ cạnh nội dung. Album và mô hình quỹ đạo mở theo nhu cầu.

Các kịch bản kiểm chứng bỏ qua header, thoát menu bằng Escape, mở mục lục, về đầu trang, đổi ngôn ngữ, bật và chỉnh âm lượng MP3, tìm tiếng Việt không dấu, lọc sản phẩm và điền sẵn lời hỏi. Khi tắt JavaScript, người đọc vẫn mở được điều hướng, bài viết, danh mục, trình phát âm thanh gốc và các kênh liên hệ trực tiếp. Cửa hàng và biểu mẫu được kiểm tra với phản hồi mô phỏng, gồm thành công, lỗi, dữ liệu thiếu và mất kết nối. Khi thử form, các yêu cầu gửi được chặn tại bộ kiểm thử.

Axe đánh dấu cần kiểm tra màu của một số ký hiệu, chú thích ảnh và placeholder. Đối chiếu token cho thấy chữ Ink Soft trên Rice Paper đạt 5,79:1, trên Cream Sand đạt 5,29:1. Bề mặt đục của hai nút nổi có tương phản chữ và icon ít nhất 11,03:1. Kiểm tra focus qua các luồng bàn phím chính.

## Hiệu suất

| Lighthouse mobile trong lab | v2.1.0 | Lượt đo Zen Botanical #168 |
| --- | ---: | ---: |
| Trang chủ · Performance | 86 | 97 |
| Trang chủ · LCP | 4,20 s | 2,56 s |
| Trang chủ · CLS | 0,00 | 0,00 |
| Bài dài · Performance | 95 | 98 |
| Bài dài · LCP | 2,33 s | 2,48 s |
| Bài dài · CLS | 0,11 | 0,00 |

Accessibility và SEO đều đạt 100 cho hai mẫu của hai phiên bản trong lượt đo này. Total Blocking Time là 0 ms. Kết quả ghi nhận trước khi nén thêm biến thể hero 800 px từ 91.736 xuống 63.172 byte. [Xem các lượt xác nhận lại trên GitHub Actions](https://github.com/kieumanh/huong-thien-nature-web/actions/workflows/validate.yml).

## Giới hạn và bước tiếp theo

Lighthouse dùng cấu hình mobile mặc định trên cùng runner và hai bản build Astro. Kết quả là phép đo lab. INP thực địa cần dữ liệu tương tác trong quá trình người đọc sử dụng website. Axe và các luồng bàn phím kiểm tra những trạng thái đã mô tả, chưa phải chứng nhận toàn diện WCAG 2.2 AA.

Tồn kho hiển thị theo phản hồi Inventory. Ở mốc đối chiếu, nguồn phản hồi “chưa xác nhận” cho 8 sản phẩm. Xác nhận hoặc ghép mã mặt hàng tại Inventory sẽ giúp hiển thị trạng thái rõ hơn. Cần một lần kiểm tra có người sở hữu hộp thư tham gia để xác nhận thư liên hệ đã tới nơi.
