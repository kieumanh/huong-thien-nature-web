## 2.24.5 — Hệ sinh thái: bỏ phần lặp Thân – Tâm – Trí

- **Trang Hệ sinh thái** kể Thân – Tâm – Trí bốn lần (ba trọng tâm, ba thẻ phẩm chất Living Zen, ba thẻ "không gian", vòng "nuôi nhau"). Nay chỉ còn ba trọng tâm (lời của chủ dự án, có đường dẫn) và vòng "Ba trọng tâm nuôi nhau" đặt ngay dưới chúng.
- **Icon chuyển động** (hạt giống, thiền, ánh sáng trong trí) chuyển vào huy hiệu của ba thẻ trọng tâm, thay cho số 1, 2, 3; thành phần dùng chung `PillarIcon.astro`. Vẫn tắt khi bật giảm chuyển động.
- **Khối Living Zen** trên trang này chỉ còn các sợi đan, "tụi mình không phải là" và lời hứa; lời dẫn viết lại nối với ba trọng tâm ở trên. Bỏ phần màu sắc từng không gian (thông tin của bộ nhận diện, không dành cho người đọc).

## 2.24.4 — Trang chủ: bỏ phần lặp Thân – Tâm – Trí

- **Trang chủ:** Thân – Tâm – Trí trước đây xuất hiện ba lần (khối Living Zen, khối "Ba trọng tâm" và vòng quỹ đạo). Nay chỉ còn ở phần Hệ sinh thái (lời của chủ dự án, có đường dẫn tới farm, khóa thực hành và đá).
- **Khối Living Zen ở đầu trang** được viết lại thành "ba điều tụi mình luôn giữ": nói rõ từng điều, không hứa quá lời, mời bằng sự tử tế. Ý lấy từ các cam kết đã có trong bộ nhận diện, không thêm cam kết mới. Ba thẻ thẳng hàng, không có thanh màu bên trái.
- Trang Hệ sinh thái giữ nguyên (vẫn có ba phẩm chất có icon chuyển động).

## 2.24.3 — Số hỗ trợ ở Tarot, icon Thân là hạt giống, trích dẫn Tarot

- **Tarot:** các nút Zalo và đặt lịch chuyển sang số hỗ trợ 0388 000 680 (Kiều Mạnh), đồng bộ với Tần Số Vàng. Trang Liên hệ giữ hai thẻ như cũ.
- **Thân:** icon là hạt giống từ bộ icon thương hiệu, thay cho icon cây; chuyển động nhẹ, căn giữa khung.
- **Trích dẫn ví dụ ở trang Tarot:** chữ không còn sát lằn tím bên trái (đã rà 29 trang có trích dẫn ở màn 390px và 1280px; chỉ khối này bị).
- **Chế độ đọc Tối ban ngày:** nút nhạc và nút đầu trang có nền tối riêng, chữ kem không còn chìm trên nền sáng (trước đây tương phản 1,19:1; CI chỉ bắt được lỗi này khi chạy vào ban ngày).

## 2.24.2 — Living Zen: căn mô tả, icon chuyển động

- **Thân – Tâm – Trí:** phần mô tả của ba khung nằm thẳng hàng với nhau, kể cả khi tiêu đề TÂM dài hai dòng (dùng subgrid; trình duyệt cũ hơn dùng phương án dự phòng, tiêu đề có chiều cao tối thiểu hai dòng).
- **Bỏ thanh màu bên trái** của các khung.
- **Icon mới, có chuyển động nhẹ:** cây đung đưa theo gió, người ngồi thiền thở chậm, bóng đèn trí tuệ sáng dần. Icon nằm giữa khung. Chuyển động tắt khi thiết bị bật chế độ giảm chuyển động.

## 2.24.1 — Living Zen và Tần Số Vàng: tinh chỉnh giao diện và nội dung

- **Hành trình, 28 tuổi:** viết lại đoạn "Dành thời gian tìm hiểu về nỗi khổ" (VI và EN), giữ nguyên các chi tiết đã có, không thêm sự kiện mới.
- **Phản hồi học viên:** bỏ đường kẻ tím của kiểu trích dẫn chung đang đè lên chữ trong thẻ của Kiều Mạnh.
- **Thân – Tâm – Trí:** icon thương hiệu có sẵn trong `brand/icons/brand`: cây (THÂN), người ngồi thiền (TÂM), ánh sáng trong trí (TRÍ).
- **Chân trang:** lựa chọn giao diện thu gọn thành một khung nhỏ, dễ chạm trên điện thoại.
- **Tần Số Vàng:** khung "Muốn biết lịch khai giảng gần nhất?" chuyển sang nền tối ánh vàng, bớt chói khi đọc ban đêm; thêm ảnh "Chắp tay chào nhau" để lấp khoảng trống trong phần khoảnh khắc; đường kẻ của lịch sinh hoạt căn thẳng với icon trên điện thoại và máy tính bảng; các nút liên hệ trên trang dùng hỗ trợ Kiều Mạnh 0388.000.680 (gọi và Zalo).
- **Gỡ mục** "Buổi gặp lại sau 30 ngày" (VI và EN); còn 5 mục hỗ trợ sau khóa.
- Trang Tarot và trang Liên hệ vẫn dùng số hotline 0868 499 856 như trước.

## 2.24.0 — Living Zen 2.0: bộ nhận diện thương hiệu mới

- **Điểm neo:** trước khi thay đổi, mã nguồn 2.23.0 được giữ ở nhánh `anchor/2026-11-26-v2.23.0` (cách quay lại: `brand/releases/deploy-and-rollback.md`).
- **Bộ nhận diện độc lập** trong thư mục `brand/`: kiểm kê, chiến lược, 3 phương án logo vector (đề xuất A · Living Roots, chưa thay trên web), hệ màu, chữ, token ba tầng, 36 icon, 46 họa tiết, 75 mẫu ứng dụng (mạng xã hội, văn phòng phẩm, ấn phẩm, giáo dục, bao bì, không gian, quà tặng, video), Brand Book và Quick Guide PDF. Tái tạo bằng `brand/scripts/`.
- **Màu có thứ bậc:** nút chính xanh rừng, nút phụ kem, vàng kim chỉ cho nút đặc biệt và trang Tần Số Vàng; bỏ gạch vàng dưới mọi tiêu đề và nền vàng của thẻ. Footer xanh rừng ban ngày, tím đêm ban đêm. Đầu trang hành trình dùng giấy mộc ban ngày, giữ bầu trời tím ban đêm.
- **Chữ:** thêm Lora (tự lưu trữ, SIL OFL) cho tiêu đề và biên tập.
- **Giao diện theo lựa chọn:** cuối trang có ô chọn theo giờ / luôn sáng / luôn tối / theo hệ điều hành, lưu trong trình duyệt.
- **Nội dung:** khối "Living Zen" trên Trang chủ (Thân – Tâm – Trí: gốc rễ trong đất, khoảng lặng trong tâm, ánh sáng trong trí) và phần đầy đủ trên trang Hệ sinh thái.
- **Trang nội bộ** `/living-zen/` xem trước hệ thống thiết kế (noindex, ngoài menu và sitemap).

