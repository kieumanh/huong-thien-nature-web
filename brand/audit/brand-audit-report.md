# Brand Audit — Hương Thiền Nature (trước Living Zen 2.0)

Ngày kiểm kê: 26/11/2026. Phiên bản website được kiểm: **2.23.0** (commit `35fbe7b`, nhánh `main`).
Điểm khôi phục: nhánh `anchor/2026-11-26-v2.23.0` trên GitHub, đẩy trước khi thay đổi bất cứ điều gì.
Tài sản nhận diện gốc đã sao lưu vào `brand/logos/legacy/`.

## 1. Tóm tắt

Website có nền móng tốt: hệ token màu đã có (`tokens.css`), giao diện ngày/đêm theo giờ Việt Nam, chữ viết tay tiếng Việt chuẩn, kiểm thử trình duyệt và axe đầy đủ. Vấn đề chính nằm ở **thứ bậc màu** và **tài sản logo**:

1. Lớp `gold.css` (từ 2.12.0) phủ vàng kim lên gần như mọi thứ: mọi nút chính là gradient vàng, mọi tiêu đề mục có gạch vàng, mọi thẻ có nền vàng nhạt, footer và đầu trang hành trình đều mang nhận diện của landing page Tần Số Vàng. Thương hiệu mẹ (xanh rừng, thiên nhiên) bị lấn át.
2. Logo chỉ tồn tại dạng **ảnh bitmap WebP 720 px**, có **texture giấy** và **dấu ✦ của công cụ tạo ảnh** ở góc phải dưới. Không có SVG, không in một màu được, không có bản đơn sắc, favicon là logo thu nhỏ nên mất chi tiết.
3. 281 mã màu hex khác nhau rải rác trong CSS và component (187 riêng trong `golden-frequency.css`).
4. Font biên tập là Georgia hệ thống: hiển thị khác nhau giữa máy, dấu tiếng Việt ở một số máy Android rơi về font khác.
5. Chưa có tài liệu thương hiệu, bộ icon, họa tiết hay mẫu ứng dụng ngoài website.

## 2. Kiểm kê và phân loại

| Tài sản | Hiện trạng | Phân loại | Hành động trong 2.0 |
|---|---|---|---|
| Logo tam giác + sen + lá + đường đất + chữ "Hương Thiền" + NATURE | Ý tưởng tốt, nhận diện cao; bitmap có texture và dấu AI | **REBUILD** | Vẽ lại vector (Concept A), giữ nguyên ý; chờ duyệt mới thay trên web |
| Favicon / app icon | Logo đầy đủ thu nhỏ, chữ không đọc được ở 32 px | **REBUILD** | Favicon giản lược riêng 16 / 24–48 px, app icon, maskable |
| Màu Forest `#243F32`, Paper `#FBF6EA`, Orchid `#713C63` | Đúng vai trò, tương phản tốt | **KEEP** | Chuẩn hóa thành màu nhận diện chính |
| Vàng kim (`--gold-*`), tím đêm (`--plum-*`) | Bị áp toàn site | **REFINE** | Thành accent có chủ đích; giữ nguyên trong Tần Số Vàng, ban đêm |
| `gold.css` (lớp phủ toàn cục) | Ghi đè nút, thẻ, footer, header | **REFINE** | Viết lại thành lớp accent Living Zen (tên file giữ nguyên vì test tham chiếu) |
| Gradient chữ vàng ở đầu trang hành trình | Đẹp nhưng lệch nhận diện mẹ | **RETIRE** (ban ngày) | Ban ngày: giấy mộc + lá; ban đêm giữ bầu trời tím |
| Gạch vàng dưới mọi tiêu đề mục | Lặp, gây ồn | **RETIRE** | Bỏ; giữ ở Tần Số Vàng |
| Dancing Script (tự lưu trữ, 3 subset) | Tốt, đúng dấu | **KEEP** | Chỉ cho tiêu đề cảm xúc |
| Georgia cho tiêu đề/biên tập | Không đồng nhất giữa thiết bị | **REFINE** | Lora tự lưu trữ (SIL OFL), Georgia làm dự phòng |
| Font giao diện system-ui | Nhanh, đọc tốt | **KEEP** | Giữ |
| Giao diện theo giờ (`daylight.js`) | Tốt, có hoàng hôn | **REFINE** | Thêm lựa chọn: theo giờ / luôn sáng / luôn tối / theo hệ điều hành; thêm `data-phase` dawn/day/dusk/night |
| Quỹ đạo Thân – Tâm – Trí (trang chủ) | Bản sắc riêng | **KEEP** | Phát triển thành họa tiết Orbit |
| Hình minh họa SVG trong bài | Tự vẽ bằng mã, nhất quán | **KEEP** | |
| Ảnh Pixabay trong 12 bài Roots | Có giấy phép, nhưng không phải ảnh thật của dự án | **KEEP** (không thêm mới) | Ưu tiên ảnh thật (album) |
| Nút nổi (nhạc, lên đầu trang) tím đêm + vàng | Tách rời nhận diện ban ngày | **REFINE** | Ban ngày xanh rừng, ban đêm tím |
| Footer tím đêm | Giống landing Tần Số Vàng | **REFINE** | Ban ngày xanh rừng, ban đêm tím đêm, một đường vàng |
| Icon | SVG rời rạc trong component, nét khác nhau | **REBUILD** | Bộ 36 icon lưới 24, nét 1,75 |
| Màu ngữ nghĩa success/warning/error | Có, thiếu info | **REFINE** | Thêm info; quy tắc luôn kèm icon + chữ |

## 3. Kiểm tra khả năng đọc và tương phản

Kết quả theo token: `accessibility/contrast-tokens.md`. Hai cặp cấm dùng cho chữ: vàng kim `#F4C76B` và vàng đậm `#C88A2C` trên giấy mộc (1,47:1 và 2,73:1). Kiểm tra giao diện thật (sau khi render, cả ngày và đêm) bằng axe ở 7 trang × 9 bề rộng: xem `accessibility/README.md`.

## 4. Nhất quán giữa các kênh

- Website: nhất quán nội bộ, nhưng mang hai bản sắc (thiên nhiên / vàng-tím) chồng lên nhau.
- Ảnh chia sẻ mạng xã hội (`public/media/social/`): dùng logo bitmap.
- Dự án liên quan (Farm Lê Lam Sơn, ZenWork, Zen Flow Inventory) có nhận diện riêng → cần quy chuẩn đồng thương hiệu, không ép dùng logo Hương Thiền Nature.

## 5. Những điều không thay đổi

URL, nội dung bài viết, SEO metadata, canonical, hreflang, dữ liệu có cấu trúc, tìm kiếm, nhạc nền, chế độ đọc, form liên hệ, kết nối Zen Flow Inventory, giá đã công bố, lịch sử phiên bản, API.
