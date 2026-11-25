# Phần 5 · Ngôn ngữ hình ảnh

## 27. Iconography

![Bộ icon](../icons/icon-sheet.png)

Lưới **24 × 24**, vùng sống 20 × 20 (đệm 2), nét **1,75**, đầu và góc nét tròn, không tô đặc (trừ chấm nhỏ). Hiển thị ở 20, 24, 32 px; dưới 20 px chỉ dùng icon chức năng. Bộ hiện có **20 icon thương hiệu** (thiền, yoga, hơi thở, hoa sen, trái tim, trí tuệ, hạt giống, đất, cây, nước, ánh sáng, mặt trăng, mặt trời, sách, nhật ký, ẩm thực chay, tarot, cộng đồng, phụng sự, Thân – Tâm – Trí) và **16 icon chức năng** (trang chủ, tìm kiếm, menu, tài khoản, cài đặt, phát nhạc, âm lượng, đánh dấu, lưu trữ, chia sẻ, quay lại, thông báo, tiến trình, giỏ hàng, đặt lịch, trợ giúp).
Icon chức năng phổ thông có thể thay bằng thư viện mã nguồn mở cùng phong cách (ví dụ Lucide, giấy phép ISC) nếu cần thêm. Không trộn icon 3D, emoji hệ điều hành, icon đặc và icon nét trong cùng một nhóm.

## 28. Brand patterns — Living Zen Visual Language

![Thư viện họa tiết](../patterns/motif-sheet.png)

**46 họa tiết gốc** (vẽ bằng mã trong `scripts/patterns.py`, không lấy từ thương hiệu khác) trong tám nhóm:

| Nhóm | Họa tiết | Ý nghĩa sáng tạo | Dùng cho |
|---|---|---|---|
| Lotus | đơn tuyến, nhiều lớp, hình học, sen + lá, watermark | Nhận biết, trưởng thành nội tâm | Thiền, bìa, watermark |
| Ensō | nét mực, mảnh, mở, ánh sáng, khung | Khoảng lặng, tiếp nối, không hoàn hảo | Trích dẫn, khung nội dung |
| Botanical | lá non, lá già, cành, rễ, mầm, hạt, tán, thảm | Sự sống, tương thuộc | THÂN, cửa hàng, nông nghiệp |
| Breath | gợn sóng, lan tỏa, đồng tâm, lên xuống, dòng chảy | Hơi thở, thư giãn | Thực tập, thở 4s/6s |
| Orbit | quỹ đạo, ba vòng, hệ mặt trời, tâm nhận biết, kết nối | Thân – Tâm – Trí | Trang chủ, hệ sinh thái |
| Seed | 8 trạng thái: hạt → nảy mầm → ra lá → đâm cành → thành cây → nở hoa → kết trái → về đất | Nuôi dưỡng, trưởng thành | Tiến trình học, cộng đồng |
| Earth Lines | địa hình, đồng mức, tầng đất, ruộng bậc thang, vòng tuổi, dòng nước | Nguồn cội | Nông nghiệp, bao bì |
| Golden Geometry | vesica, bảy vòng tròn, bát giác, mandala giản lược | Chiêm nghiệm, ánh sáng | Tần Số Vàng (mật độ thấp) |

Không gán cho họa tiết công dụng vật lý, chữa bệnh hay năng lượng. Ensō không phải biểu tượng độc quyền; tính riêng đến từ cách vẽ và phối hợp.

Mỗi họa tiết có bản **master, đơn sắc, sáng, tối, watermark** (`patterns/<nhóm>/`). Thêm: **12 nền lặp liền mạch** (tile + bản sáng/tối), **12 khung**, **10 đường chia** (xanh và vàng), **8 nền chất liệu nhẹ**, **8 họa tiết chuyển động** (`motion/`).

![Nền lặp](../patterns/seamless/pattern-sheet.png)

Quy tắc: tối đa **một** nền lặp mỗi màn hình, độ mờ 6–12%; không đặt họa tiết sau đoạn văn dài; website chỉ tải họa tiết đang dùng.

## 29. Photography

Ánh sáng tự nhiên, màu chân thực, chất liệu gỗ – đất – đá – giấy – nước, khoảnh khắc thực hành, con người thật, không gian giản dị. Ưu tiên ảnh thật của đội ngũ, buổi thiền, farm đối tác, sản phẩm, bữa ăn chay, thiên nhiên và cộng đồng (album hiện có 2.13.0).
Không dùng ảnh minh họa để giả mạo hoạt động, học viên hay sản phẩm thật. Ảnh có người cần sự đồng ý; ảnh có trẻ em cần sự đồng ý của người giám hộ. Ghi nguồn, giấy phép, tác giả trong `photography/README.md`.
Kỹ thuật: WebP/AVIF, cạnh dài ≤ 1280 px cho web, bỏ EXIF, `loading="lazy"` trừ ảnh đầu trang, alt mô tả điều nhìn thấy.

## 30. Illustration

Botanical line art · organic vector · watercolor nhẹ · paper texture · minimal landscape · soft geometric. Nét 2–4 px ở khung 200, đầu tròn, tối đa 2 màu + 1 nền. Mỗi chủ đề Thân – Tâm – Trí có một nhóm họa tiết gốc (Botanical/Earth · Lotus/Breath/Ensō · Orbit/Seed/Geometry). Không phụ thuộc hình ảnh AI có phong cách rời rạc; hình minh họa trong bài viết tiếp tục là SVG tự vẽ bằng mã.

## 31. Motion guidelines

Chuyển động để nâng đỡ trải nghiệm, không phải để thu hút sự chú ý bằng mọi giá.

| Token | Thời lượng | Dùng cho |
|---|---|---|
| Instant | 60 ms | Đổi trạng thái checkbox, nhấn nút |
| Fast | 150 ms | Hover, focus |
| Standard | 260 ms | Menu, tab, accordion, toast |
| Gentle | 600 ms | Khối hiện dần, dialog |
| Ambient | 4–40 s | Hơi thở (4s hít · 6s thở), quỹ đạo, hoàng hôn (22 s) |

Easing: standard `cubic-bezier(.2,.65,.3,1)`, enter `(.05,.7,.1,1)`, exit `(.3,0,.8,.15)`, breath `(.45,0,.55,1)`. Chỉ animate `opacity` và `transform`. Không nhấp nháy quá 3 lần/giây. Mọi animation tắt khi `prefers-reduced-motion: reduce`; không tự phát âm thanh; dùng CSS/SVG, không dùng SMIL hay thư viện nặng. Hình động thương hiệu: `motion/` (lá lay, hạt nảy mầm, sen nở, vòng hơi thở, gợn nước, bình minh, quỹ đạo, nét vẽ dần) và `templates/video/logo-animation.svg`.

## 32. Light/Dark themes — Nature Rhythm

| Pha | Giờ VN | Nền | Cảm giác |
|---|---|---|---|
| Dawn | 06:00–07:30 | Kem ấm pha hồng đất (`--twilight`) | Khởi đầu, sinh trưởng |
| Day | 07:30–17:00 | Giấy mộc, xanh rừng, tím lan | Sáng rõ, ổn định |
| Dusk | 17:00–18:20 | Kem ấm → hồng đất, tím lan | Buông xuống, nghỉ ngơi |
| Night | 18:20–06:00 | Tím đêm, vàng nhạt, tím lan đêm | Tĩnh lặng, riêng tư |

Người đọc chọn ở cuối trang: **Theo giờ trong ngày** (mặc định) · **Luôn sáng** · **Luôn tối** · **Theo hệ điều hành**. Lựa chọn chỉ lưu trong trình duyệt (`localStorage` khóa `htn:theme`), không cần vị trí, không gửi đi đâu. Khi đã chọn chế độ cố định, nền không tự đổi lúc đang đọc. Không có JavaScript: giao diện ban ngày, đầy đủ chức năng. Thuộc tính `html[data-phase]` (dawn/day/dusk/night) có sẵn cho các thành phần muốn đổi nhẹ theo pha.
