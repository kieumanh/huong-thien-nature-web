# Rà soát nội dung và thiết kế — Hương Thiền Nature 2.0.2

## Nhận định

Giao diện hiện có nền tảng nhận diện nhất quán: bảng màu rừng, ảnh thiên nhiên, tiêu đề serif và khoảng trống rộng. Trang đã có hero 2.5D, tìm kiếm, lộ trình đọc cho người mới, câu chuyện sáng lập, thực hành, tản văn và cửa hàng. Ba hướng Farm & Botanicals, Eco-Retreat và Academy đang được kể hai lần: qua thẻ “Nuôi dưỡng Thân / Lắng nghe Tâm / Mở sáng Trí” trong phần câu chuyện, rồi lặp lại ở ba thẻ dài trong khu thiên nhiên. Hai nhóm thẻ dùng cùng một nhịp và một số ý gần nhau, khiến trọng tâm hệ sinh thái chưa có một hình ảnh riêng.

Các cụm “trở về”, “gốc rễ”, “bắt đầu từ một điều nhỏ” xuất hiện ở hero, giới thiệu, thực hành và tản văn. Đây là chất liệu nhận diện, nhưng mật độ dày làm nhịp đọc hơi đều. Nhiều tiêu đề cũng cùng mời người đọc “trở về”, trong khi khu thiên nhiên phải gánh cả ba trung tâm lẫn thực hành với thiên nhiên.

## Chỉnh sửa biên tập

- Giữ hero để nói về hành trình; phần giới thiệu nói về lý do hình thành dự án; phần thực hành hướng dẫn một thao tác cụ thể.
- Bỏ dãy thẻ Thân–Tâm–Trí bị lặp lại ở phần giới thiệu. Dồn giá trị đó vào một khu vực duy nhất với ba kim tự tháp: Farm & Botanicals, Eco-Retreat và Academy.
- Đổi tiêu đề tản văn thành “Ghi chép từ những điều bình thường”, để mở sắc thái khác thay cho hình ảnh “trở về”.
- Viết lại lời liên hệ để người đọc biết có thể hỏi về dự án hoặc catalogue, tránh lặp thêm lời mời bắt đầu bằng bài đọc hay một phút thực tập.
- Nêu rõ catalogue Farm & Botanicals có giá tham khảo và tồn kho cần xác nhận; Eco-Retreat, Academy và Membership là định hướng tương lai, chưa mở đăng ký.
- Giữ ranh giới sẵn có: website chia sẻ nội dung giáo dục và thực tập chiêm nghiệm, không thay thế chăm sóc y tế hay sức khỏe tâm thần. “Bảy tầng” vẫn được gọi là khung chiêm nghiệm cá nhân.

## Hướng thiết kế

Ba ảnh khu thiên nhiên được cắt thành tam giác và chia thành ba lớp ngang như kim tự tháp. Nhãn Thân, Tâm, Trí nằm trong hình; tên trung tâm và phần giải thích ở dưới để hình ảnh không thay thế nội dung. Trên màn hình rộng, các khối cao thấp lệch nhẹ tạo chiều sâu. Khi cuộn tới, chúng hiện lần lượt; rê chuột chỉ nâng ảnh một chút. Trên điện thoại, ba khối xếp dọc và hình thu theo bề rộng màn hình.

Hiệu ứng dùng IntersectionObserver sẵn có, không khóa cuộn, không cần WebGL hay âm thanh. Khi bật giảm chuyển động hoặc tiết kiệm dữ liệu, và khi IntersectionObserver không có, toàn bộ nội dung vẫn hiển thị tĩnh.

## Giới hạn nội dung

Farm & Botanicals có catalogue trưng bày giá tham khảo; không mô tả giá là báo giá chốt hay tồn kho đã xác nhận. Eco-Retreat, Academy và Membership là định hướng, không phải dịch vụ đang mở. Không thêm lịch khai trương, cam kết sức khỏe hay kết quả trị liệu.

## Kiểm định

CI chạy Astro check, source audit, Contact, Search, Shop, Worker và 2.5D tests; sau build chạy audit, Pages Functions compile, Worker dry-run và kiểm tra nội dung song ngữ. Không triển khai Cloudflare production.
