# Kiểm toán trải nghiệm Hương Thiền Nature

Baseline v2.1.0, GitHub `main` tại [c56492a](https://github.com/kieumanh/huong-thien-nature-web/commit/c56492a9830e6dfd66c3fa40ee5d7a37640de10d). Mốc khôi phục [backup/zen-botanical-before-2026](https://github.com/kieumanh/huong-thien-nature-web/tree/backup/zen-botanical-before-2026). Ngày đối chiếu 21/11/2026, giờ Việt Nam. Production công bố v2.1.0 trong metadata và chân trang tại thời điểm kiểm tra.

Ảnh baseline được chụp trên Chromium từ production, gồm trang chủ, Tản văn, Cửa hàng và Liên hệ. Báo cáo QA ghi lại phép so sánh desktop và mobile từ cùng commit baseline, cùng cấu hình trình duyệt.

| Khu vực | Quan sát trên baseline | Điều chỉnh |
| --- | --- | --- |
| Đầu trang | Câu mở đầu ở ngôi thứ nhất kéo thành bốn dòng ở khoảng 1363 px. Người mới đọc được cảm xúc trước khi hiểu website giúp họ làm gì. | Đặt chiêm nghiệm dài trong câu chuyện Hương Thiền. Đầu trang dùng câu ngắn, ảnh rừng và hai lối vào có mục đích riêng. |
| Hành trình | Thân, Tâm, Trí nằm sau khu thực tập, tìm kiếm và ba thẻ bài viết. Farm, Retreat và Academy dùng mô tả dài và một ghi chú trạng thái chung. | Đưa ba hướng lên ngay dưới phần mở đầu, gắn trạng thái sát từng chương trình. Trên điện thoại ưu tiên thẻ tĩnh. Giữ sơ đồ quỹ đạo theo yêu cầu mở trên màn hình rộng. |
| Khám phá và đọc | Trang chủ và thư viện có thẻ bài viết, metadata, đường dẫn đọc dùng các cách trình bày khác nhau. Mục lục dài làm chậm việc vào bài. | Dùng chung thẻ bài và breadcrumb. Giữ lối đọc nhập môn, thư viện đầy đủ và mục lục có thể thu gọn. |
| Tác giả và đội ngũ | Đầu bài chỉ in ngày cố định cho loạt Roots. Nội dung vai trò của hai người được sao chép ở nhiều nơi. | Hiển thị ngày từ bài viết, đồng bộ tiểu sử và phân công chuyên môn, biên tập. Thêm lối đến các bài của tác giả. |
| Cửa hàng | Nút hỏi ở thẻ sản phẩm còn dẫn về form cũ trên trang chủ. Khi không lấy được tồn kho, phản hồi tổng quát chỉ có cho trình đọc màn hình. | Dẫn về biểu mẫu hiện có kèm mã sản phẩm, thông báo trạng thái nguồn tồn kho ngay cạnh kết quả. Dữ liệu và định dạng phản hồi Worker được giữ theo hợp đồng hiện tại. |
| Tìm kiếm và liên hệ | Cỡ chữ, padding, lỗi, trạng thái tải và màu đường viền chưa dùng chung quy tắc. Form chỉ gửi được khi JavaScript và xác minh hoạt động. | Chuẩn hóa trường nhập và phản hồi. Cung cấp các lối đọc, xem cửa hàng và liên hệ trực tiếp khi tắt JavaScript. |
| Thanh điều hướng và nút nổi | Nhạc ở đầu thứ tự Tab, trước liên kết bỏ qua. Hai nút nổi có thể lấn phần cuối form khi bàn phím ảo mở. Xử lý tương phản đọc điểm ảnh ở tần suất cuộn cao. | Đưa nút sau nội dung theo thứ tự DOM. Tạm ẩn khi nhập liệu trên màn hình nhỏ. Giảm số lần đọc pixel và giữ bề mặt nút đục, dễ đọc. |
| Thiết kế và hiệu năng | CSS chứa các kiểu trang chủ cũ và nhiều biến thể bo góc. Một số ảnh chưa có kích thước hoặc khung tỉ lệ ổn định. | Gom token và component theo chức năng. Giữ ảnh thật đã dùng, tải trì hoãn khi phù hợp và giới hạn hiệu ứng trong vùng nhìn. |

Cần kế thừa URL VI/EN, các liên kết sâu ở trang chủ, bản quyền và ghi nguồn ảnh, toàn bộ bài và dữ liệu sản phẩm. Việc gửi email, xác minh Turnstile, giá tham khảo, trạng thái tồn kho chưa biết và định tuyến Cloudflare Worker là ràng buộc của trải nghiệm. Xem [báo cáo QA](QA_REPORT.md) cho các giới hạn kiểm chứng.
