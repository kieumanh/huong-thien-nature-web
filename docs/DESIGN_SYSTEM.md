# Zen Botanical Design System

Website dùng màu, ảnh và khoảng thở từ thiên nhiên. Material 3 định hướng trạng thái và cách tổ chức thành phần. Apple HIG gợi ý cách phân cấp nội dung và tiết chế chuyển động. Tỷ lệ 60/25/15 là định hướng thẩm mỹ. Đọc [Material 3](https://m3.material.io/styles/color/the-color-system), [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/design-principles) và [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

## Token

Nguồn dùng chung nằm ở `src/styles/tokens.css`. Các tên `--forest`, `--moss`, `--leaf`, `--sage`, `--paper`, `--cream`, `--clay`, `--ink-soft` và `--sun` lưu màu thương hiệu.

| Vai trò | Quy ước |
| --- | --- |
| Primary / secondary | Forest cho hành động chính. Moss cho liên kết và điểm nhấn. |
| Surface | Rice Paper cho nền. Soft Sage cho vùng trợ giúp. Cream Sand cho vùng ấm. |
| Foreground / muted | Forest cho tiêu đề và nội dung. Ink Soft cho miêu tả trên nền sáng. |
| Border / focus | Viền mờ cho khối, viền đậm hơn cho trường nhập. Outline focus hiện trên nền tương ứng. |
| Success / warning / error | Xanh đậm, nâu đất, đỏ đất trên nền nhạt. Luôn kèm nội dung trạng thái bằng chữ. |
| Typography | Georgia và serif hệ thống cho tiêu đề. Sans hệ thống cho chữ đọc và điều khiển. Body 16 px trở lên ở thiết lập mặc định, phần đọc bài dài dùng khoảng 17–18 px. Kiểm tra tiếng Việt cùng tiếng Anh. |
| Khoảng cách và hình dạng | Thang 4, 8, 12, 16, 24, 32, 48 px. Card 20 px, vùng nổi bật 28 px, input 14 px và nút chính bo viên thuốc. |
| Elevation | Bóng nhẹ cho thẻ tương tác và nút nổi, phối hợp viền để tạo ranh giới trên nền giấy. |

## Thành phần

- **Điều hướng**. Header giữ mục chính, chuyển VI/EN và tìm kiếm. Menu nhỏ dùng nút với `aria-expanded`, Escape đưa focus về nút, và đường dẫn vẫn hiện khi tắt JavaScript. Breadcrumb dùng chung, chỉ có một liên kết trên mỗi đích trong cùng ngữ cảnh.
- **Nút và liên kết**. `.button` cho hành động chính, `.button--tonal` cho hành động phụ, `.quiet-link` cho hành động trong nội dung. Chúng dùng cùng chiều cao mục tiêu, trạng thái hover, active, focus và disabled. Nút gửi form thay nhãn khi đang gửi.
- **Thẻ**. `ArticleCard` dùng cho Tản văn và bài nổi bật. Thẻ bài liên quan giữ cùng phân cấp. Tiêu đề thẻ sản phẩm mở trang chi tiết. Đường dẫn hỏi sản phẩm riêng dẫn đến biểu mẫu. Giá được ghi rõ là tham khảo. Thân, Tâm, Trí có trạng thái và đường dẫn thật.
- **Form và phản hồi**. Label gắn với trường nhập. Giá trị lỗi và trạng thái tải/thành công có chữ. Bộ lọc cửa hàng là nhóm nút `aria-pressed`, không dùng vai trò tab khi nội dung vẫn nằm trong cùng danh sách. Tìm kiếm có trạng thái tải, rỗng và lỗi tải dữ liệu. Dùng disclosure HTML cho mục lục, ảnh, lộ trình và bảng âm lượng. Hiện chưa có quy trình cần modal.
- **Nút nổi**. Nhạc và Về đầu trang dùng cùng mặt nền đục và kích thước. Âm lượng nằm trong bảng mở bằng `details`, đóng bằng Escape. Nút về đầu xuất hiện từ ngưỡng 30% phần có thể cuộn.
- **Footer**. Ba nhóm Khám phá, Hệ sinh thái và Kết nối. Phiên bản đọc từ `package.json`; khi phát hành thêm mục mới trong `src/data/releases.ts` và cập nhật CHANGELOG. Audit kiểm tra mục đầu khớp số đang chạy.

## Responsive và chuyển động

Thiết kế từ luồng một cột, dùng gutter linh hoạt và giới hạn dòng đọc. Các thẻ chính lên hai hoặc ba cột khi đủ chiều rộng. Điện thoại ưu tiên thẻ Thân, Tâm, Trí tĩnh và thu gọn các nội dung dài vào disclosure. Nội dung chính phải hiện khi JavaScript tắt. Chiều rộng được kiểm tra ở 320, 375, 393, 768, 1024, 1440 CSS px.

Cảnh rừng và yoga dùng ảnh thật có khung tỉ lệ ổn định. Mandala xuất hiện ở đầu thư viện. Hiệu ứng chỉ chạy trong vùng nhìn và dừng khi tab ẩn, bật tiết kiệm dữ liệu hoặc bật giảm chuyển động. Chuyển động chữ khi đang đọc được tránh. Hover nhẹ chỉ áp dụng trên thiết bị có con trỏ phù hợp. Không tải thư viện hiệu ứng.
