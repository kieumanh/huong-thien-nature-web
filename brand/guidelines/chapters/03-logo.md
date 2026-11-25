# Phần 3 · Triết lý thiết kế và Logo

## 11. Triết lý thiết kế Living Zen

Mộc mạc như đất · tràn đầy sức sống như cây · dịu dàng như một người bạn · tĩnh lặng như một thiền sinh · sáng suốt như ánh bình minh.

Ba nguyên tắc thực hành: **khoảng trắng là một phần của thiết kế** (không lấp mọi chỗ trống bằng họa tiết); **mỗi màn hình một điểm nhấn** (không biến mọi nút thành gradient); **chuyển động để nâng đỡ, không để gây chú ý**.

## 12. Ba phương án logo

![Ba phương án logo](../logos/concepts/a-living-roots-lockup.png){.third} ![](../logos/concepts/b-zen-essence-lockup.png){.third} ![](../logos/concepts/c-inner-light-lockup.png){.third}

| Tiêu chí (trọng số) | A · Living Roots | B · Zen Essence | C · Inner Light |
|---|---:|---:|---:|
| Kế thừa bản sắc (25%) | 5 | 3 | 2 |
| Khả năng ghi nhớ (20%) | 4 | 4 | 4 |
| Khả năng thu nhỏ (20%) | 4 | 5 | 3 |
| Tính khác biệt (15%) | 4 | 3 | 4 |
| Ứng dụng đa nền tảng (10%) | 4 | 5 | 3 |
| Thẩm mỹ lâu dài (10%) | 5 | 4 | 4 |
| **Tổng** | **4,35** | **3,90** | **3,20** |

**A · Living Roots** giữ tam giác bo tròn, hoa sen và đường đất của logo gốc nhưng vẽ lại bằng hình học sạch: tam giác (Thân – Tâm – Trí; Giới – Định – Tuệ như lớp liên tưởng bổ sung), ba cánh sen (tỉnh thức, trưởng thành nội tâm), hai đường đất (đất đai, mùa màng, vòng tuần hoàn). Chiếc lá nhỏ của logo gốc được gộp vào hai cánh bên để mark đọc được ở 32 px.
**B · Zen Essence** gộp sen và lá thành một hình; gọn nhất ở cỡ nhỏ nhưng mất tam giác nhận diện.
**C · Inner Light** dùng vòng ensō mở và một chấm sáng; sâu lắng, hợp không gian thiền nhưng xa logo hiện tại nhất.

**Đề xuất: A.** Logo trên website **chưa được thay**; chờ chủ dự án duyệt. Các lớp ý nghĩa trên là đề xuất sáng tạo, không phải ý nghĩa lịch sử đã được người sáng lập xác nhận.

## 13. Logo chính thức sau khi được duyệt

Khi phương án được duyệt: thay `public/media/huong-thien-logo-*.webp`, favicon, apple-touch-icon, android icons và `site.webmanifest` bằng tệp trong `brand/logos/` (xem quy trình ở mục 42). Đến lúc đó, các tệp trong thư mục này mang trạng thái **ĐỀ XUẤT**.

## 14. Logo construction

![Logo chính](../logos/primary/htn-primary-forest-1024.png){.half}

- Lưới 512 × 512. Tam giác: đỉnh (256, 52), (46, 440), (466, 440), bo góc 40, nét 16.
- Sen: ba cánh đối xứng qua trục x = 256, gốc tại y = 307, phóng 1,08.
- Đất: hai đường cong bậc hai, nét 14, đầu tròn.
- Chữ: "Hương Thiền" Dancing Script 700 đã chuyển thành vector; "NATURE" Lora 500, giãn chữ 0,42 em, cao bằng 30% chữ trên.
- Mọi tệp master là SVG thuần vector: không ảnh bitmap, không texture, không bóng, không phát sáng, không watermark.

## 15. Responsive Logo System

| Biến thể | Tệp | Dùng khi |
|---|---|---|
| Primary (dọc, đầy đủ) | `logos/primary/` | Bìa, trang giới thiệu, bảng hiệu đứng |
| Horizontal | `logos/horizontal/` | Header, chữ ký email, slide, danh thiếp |
| Vertical | `logos/vertical/` | Tem nhãn, mạng xã hội vuông |
| Compact (mark + "Hương Thiền") | `logos/compact/` | Không gian hẹp |
| Brand mark | `logos/brand-mark/` | Avatar, watermark, bao bì nhỏ |
| Wordmark | `logos/wordmark/` | Khi mark đã xuất hiện gần đó |
| Monochrome | `logos/monochrome/` | In một màu, khắc laser, dập nổi, thêu, in lụa |
| Reversed | `logos/reversed/` | Nền xanh rừng, nền tím đêm |
| Favicon | `logos/favicon/` | Tab trình duyệt (bản 16 px riêng) |
| App icon, maskable | `logos/app-icons/` | Điện thoại, PWA |
| Watermark | `logos/watermark/` | Ảnh, video (độ mờ 14–18%) |
| Co-branding | `logos/co-branding/` | Cùng đối tác |

Màu: Forest (mặc định), Orchid, Golden Light (chỉ trên nền tối hoặc ngữ cảnh đặc biệt), Trắng ngà, Đen, Trắng.

## 16. Clear space

Khoảng trống tối thiểu quanh logo = **chiều cao hai cánh sen bên** (≈ 18% chiều cao mark). Không đặt chữ, ảnh hay mép giấy vào vùng này.

## 17. Minimum size

| Biến thể | Màn hình | In |
|---|---|---|
| Brand mark | 24 px (dưới 24 px dùng favicon 16) | 6 mm |
| Horizontal | 120 px rộng | 30 mm rộng |
| Primary | 160 px rộng | 35 mm rộng |

![Kiểm thử kích thước](../logos/tests/size-test-sheet.png)

Đã kiểm ở 16, 24, 32, 48, 64, 128, 256, 512 px: 16 px dùng bản chỉ có tam giác + sen; 24–48 px dùng bản một đường đất, nét dày hơn.

## 18. Logo usage

Ưu tiên logo xanh rừng trên giấy mộc hoặc trắng; trắng ngà trên xanh rừng; vàng kim trên tím đêm. Trên ảnh: đặt ở vùng ảnh phẳng, độ tương phản ≥ 3:1 với nền; nếu ảnh nhiều chi tiết, dùng nền phẳng mờ 80% phía sau.

## 19. Logo misuse

Không: kéo giãn, xoay, đổi tỷ lệ mark và chữ, thêm bóng/phát sáng, đặt gradient lên chữ, dùng vàng kim trên nền sáng, đổi font chữ "Hương Thiền", đặt logo trên ảnh rối, dùng lại bản bitmap có texture giấy cũ, thêm khẩu hiệu vào trong vùng clear space.
