# Phần 6 · Design System

## 33. Design tokens

Ba tầng, sinh từ một nguồn duy nhất `brand/scripts/foundation.py`:

1. **Primitive** (`tokens/primitive.json`): màu, khoảng cách 4/8/12/16/24/32/48/64/96 px, bo góc (control 10 · input 14 · card 20 · feature 28 · floating 16 · pill), font, thời lượng, easing, bóng (flat · subtle · raised · floating), breakpoint (480/768/1024/1280/1440).
2. **Semantic** (`tokens/semantic.json`): bg, surface, fg, fg-muted, primary, on-primary, secondary, accent, special, border, focus, success, warning, error, info. Trỏ về biến CSS của website nên tự đổi theo ngày/đêm.
3. **Component** (`tokens/components.json`): button (primary/secondary/special), card, input, nav, header, footer, quote, badge, progress, product card, course card, article measure.

Website dùng `src/styles/living-zen-tokens.css` (tiền tố `--lz-`), được ghi đè từ cùng script — **không sửa tay**. Quy tắc: component dùng token semantic/component, không hardcode mã màu mới.

## 34. UI components

Trang xem trước nội bộ: **`/living-zen/`** trên website (không có trong menu, `noindex`).

| Thành phần | Mặc định (ngày) | Đêm | Ghi chú truy cập |
|---|---|---|---|
| Button primary | Nền xanh rừng, chữ giấy mộc, pill, cao 48 px | Nền xanh lá nhạt, chữ xanh đậm | Focus viền 2 px; disabled mờ 55% |
| Button secondary (`button--tonal`) | Nền kem, viền cát | Nền tím xám | |
| Button special (`button--special`) | Gradient vàng, chữ mực tím | như ngày | Chỉ 1 nút đặc biệt/màn hình |
| Link | Chữ xanh rừng, gạch chân khi hover | Vàng nhạt | |
| Navigation | Mục hiện tại: nền kem + gạch 2 px xanh rừng | Gạch vàng | `aria-current="page"` |
| Card (article/course/product/profile) | Giấy nổi `#FFFDF7`, viền cát, bóng subtle, bo 20 | Tím xám đậm | Cả thẻ là một liên kết khi phù hợp |
| Quote | Lora nghiêng, tím lan, vạch trái tím nhạt | Tím lan đêm | |
| Chip / Badge | Nền kem, pill | | Không chỉ dùng màu để phân biệt |
| Form input | Viền `--border-control`, bo 14, cao ≥ 44 px | | Nhãn luôn hiện, lỗi có icon × và câu hướng dẫn |
| Toast / trạng thái | Màu ngữ nghĩa + icon ✓ ! × i | | `role="status"` |
| Progress | Rãnh kem, thanh xanh rừng | Thanh vàng | `role="progressbar"` có nhãn |
| Accordion | `<details>` gốc | | Bàn phím mặc định |
| Modal | `<dialog>` gốc | | Trả focus khi đóng |
| Empty / Loading / Error | Một câu nói thật + một hành động | | Skeleton chỉ khi tải > 300 ms |
| Footer | Xanh rừng, một đường vàng 3 px | Tím đêm | Có lựa chọn giao diện |
| Floating controls | Xanh rừng | Tím đêm + vàng | Không che CTA; vùng chạm 48 px |

Responsive đã kiểm ở 320, 360, 390, 430, 768, 1024, 1280, 1440, 1920 px.
