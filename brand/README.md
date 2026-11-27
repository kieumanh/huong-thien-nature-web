# Hương Thiền Nature · Living Zen 2.0 — Brand Kit

Bộ nhận diện thương hiệu độc lập với website. **Understand yourself. Live with nature. Live self-directed. Grow together.** · *Hiểu mình. Thuận tự nhiên. Sống tự chủ. Cùng trưởng thành.*

- Đọc trước: `guidelines/brand-book.pdf` (24 trang) hoặc `guidelines/brand-book.md`; đối tác: `guidelines/quick-guide.pdf`.
- Kiểm kê trước 2.0: `audit/brand-audit-report.md`. Chiến lược: `strategy/`.
- Logo: `logos/` — phương án **A · Living Roots** đang ở trạng thái **ĐỀ XUẤT** (chưa thay trên website). `logos/legacy/` giữ logo gốc.
- Màu `colors/`, chữ `typography/` + `fonts/`, token `tokens/`, icon `icons/`, họa tiết `patterns/`, chuyển động `motion/`, mẫu ứng dụng `templates/`.
- Trang xem trước trên website: `https://huongthiennature.com/living-zen/` (không có trong menu, noindex).

## Số lượng tài sản (đã tạo và kiểm tra)

| Hạng mục | Số lượng |
|---|---|
| Phương án logo vector | 3 (mark + lockup, SVG/PNG) |
| Biến thể logo hệ thống A | 6 bố cục × 6 màu + đảo màu + favicon (16, 24–64, ICO) + app icon + maskable + watermark + đồng thương hiệu |
| Icon | 20 thương hiệu + 16 chức năng |
| Họa tiết gốc | 46 (mỗi cái 5 biến thể) |
| Nền lặp / khung / đường chia / nền chất liệu / chuyển động | 12 / 12 / 10 / 8 / 8 |
| Mẫu ứng dụng | 16 mạng xã hội · 8 văn phòng phẩm · 12 ấn phẩm · 10 giáo dục · 10 bao bì · 6 không gian · 8 merchandise · 5 video + logo animation + chữ ký email |

## Tái tạo

```bash
pip install fonttools brotli pillow qrcode markdown playwright   # + rsvg-convert, ImageMagick
python3 brand/scripts/build.py   # nền tảng, logo, icon, họa tiết, token (ghi cả src/styles/living-zen-tokens.css)
python3 brand/scripts/kits.py    # mẫu ứng dụng
python3 brand/scripts/book.py    # brand book + quick guide PDF
```

Không có tệp nguồn Figma/Illustrator: SVG là nguồn chỉnh sửa được (mở bằng Inkscape, Figma, Illustrator). Hai hệ phiên bản độc lập: thương hiệu (Living Zen 2.0, xem `CHANGELOG.md`) và website (`package.json`).
