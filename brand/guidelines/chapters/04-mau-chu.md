# Phần 4 · Màu sắc và Chữ

## 20. Primary Color Palette

![Bảng màu](../colors/palette.png)

| Màu | HEX | RGB | Vai trò |
|---|---|---|---|
| Forest Green · Xanh rừng | `#243F32` | 36, 63, 50 | Màu nhận diện chính: logo, điều hướng, nút chính ban ngày, footer ban ngày |
| Orchid · Tím lan | `#713C63` | 113, 60, 99 | Tiêu đề cảm xúc, trích dẫn, nội dung thiền và nội tâm |
| Golden Light · Vàng kim | `#F4C76B` | 244, 199, 107 | Điểm nhấn có chủ đích; **không dùng cho chữ trên nền sáng** |

## 21. Secondary Color Palette

| Màu | HEX | Vai trò |
|---|---|---|
| Organic Paper · Giấy mộc | `#FBF6EA` | Nền đọc, nền mặc định |
| Moss Green · Xanh rêu | `#526747` | Thiên nhiên, thực hành, không gian THÂN |
| Earth Clay · Đất nung | `#8B523D` | Đất, dinh dưỡng, cửa hàng |
| Night Plum · Tím đêm | `#100C24` | Ban đêm, Tần Số Vàng |

## 22. Extended Color Palette

Forest Hover `#365544` · Leaf `#536C4C` · Soft Ink `#586557` · Warm Cream `#F6EED9` · Herbal Cream `#F3EBD4` · Raised Paper `#FFFDF7` · Sand `#DDD5BF` · Rice Gold `#EFE0B8` · Deep Orchid `#492742` · Orchid Mist `#F1E4EE` · Orchid Line `#CDB1C7` · Golden Highlight `#FFE7A8` · Golden Deep `#C88A2C` · Golden Accent `#855510` · Golden Wash `#FBF2DD` · Golden Ink `#1A1233` · Plum Deep `#1A1338` · Cosmic Plum `#2C1F50` · Night Orchid `#EDB9DD`.

**Màu ngữ nghĩa** (luôn kèm icon và chữ, không truyền tải thông tin chỉ bằng màu): Success `#2B5741`/`#E1F0E5` · Warning `#6B4C22`/`#F3E8CE` · Error `#7C392C`/`#F4E5DF` · Info `#2F4F63`/`#E3EDF2`. Focus: viền 2 px màu `--focus`, cách 3 px. Disabled: độ mờ 55%, không đổi màu.

Không tạo thêm màu gần giống nhau. Màu mới đi qua quy trình ở mục 42.

## 23. Color proportion

Giao diện ban ngày của thương hiệu mẹ (định hướng, không phải luật từng màn hình): **55%** giấy mộc và nền trung tính · **25%** xanh rừng và nhóm xanh · **10%** tím lan · **5%** đất nung · **5%** vàng kim.
Không gian riêng (Tần Số Vàng, Tarot) được dùng tỷ lệ khác nhưng vẫn giữ logo, chữ và lưới của thương hiệu mẹ.

### Quy tắc vàng kim

Primary action thông thường: **xanh rừng**. Secondary: **nền kem**. Tertiary: **liên kết chữ**. Special: **vàng kim** (`.button--special`), chỉ khi thật sự đặc biệt. Gradient chỉ ở khu vực truyền thông đặc biệt. Không mặc định gạch vàng dưới tiêu đề, nền vàng cho thẻ hay viền phát sáng.

## 24. Color combinations

| Không gian | Màu chính | Cảm giác |
|---|---|---|
| Thương hiệu mẹ | Forest + Paper + Orchid + Golden Light | Ổn định, gần gũi |
| THÂN | Moss, Forest, Earth Clay, Warm Cream | Đất, nuôi dưỡng |
| TÂM | Orchid, Orchid Mist, Deep Orchid, Paper | Riêng tư, dịu dàng |
| TRÍ | Paper, Golden Accent, Forest, Golden Light | Sáng rõ, học hỏi |
| Tần Số Vàng | Night Plum, Cosmic Plum, Golden Light, Golden Highlight | Tĩnh, sâu |
| Tarot tâm lý | Deep Orchid, Orchid, Orchid Line, Golden Light | Riêng tư, không huyền bí quá mức |
| Cửa hàng | Forest, Moss, Paper, Earth Clay | Chân thực, minh bạch |
| Quỹ & cộng đồng | Moss, Paper, Rice Gold, Golden Accent | Hợp tác, phụng sự |

## 25. Accessibility contrast

Xem bảng đầy đủ: `accessibility/contrast-tokens.md`. Tóm tắt: Forest/Paper 10,63:1 · Orchid/Paper 7,70:1 · Soft Ink/Paper 5,70:1 · Golden Accent/Paper 5,89:1 · Golden Highlight/Night 15,68:1 — đều đạt AA chữ thường. **Cấm**: Golden Light/Paper 1,47:1, Golden Deep/Paper 2,73:1 cho chữ.
Kết quả token không chứng minh cả website đạt chuẩn; giao diện thật được kiểm bằng axe sau khi render (mục 25 trong `accessibility/README.md`).

## 26. Typography

![Mẫu chữ tiếng Việt](../typography/vietnamese-specimen.png)

| Vai trò | Font | Dùng cho | Hạn chế |
|---|---|---|---|
| Cảm xúc | **Dancing Script** 600–700 (SIL OFL, tự lưu trữ) | Slogan, hero ngắn, lời chào, trích dẫn | Không cho văn bản dài, menu, biểu mẫu, giá, dashboard |
| Biên tập | **Lora** variable 400–700 (SIL OFL, tự lưu trữ, mới ở 2.0) | Tiêu đề, tản văn, sách, học liệu | — |
| Giao diện web | **system-ui** (Segoe UI, Roboto, SF…) | Menu, nút, biểu mẫu, văn bản giao diện | Tải tức thì, không tốn băng thông |
| Giao diện in | **Be Vietnam Pro** (SIL OFL) | Tài liệu in, mẫu mạng xã hội | — |

Đã so sánh Georgia, Lora, Noto Serif bằng văn bản tiếng Việt thật: Lora giữ dấu chồng (ề, ặ, ữ) rõ, nét ấm hợp "mộc mạc nhưng không sơ sài", file nhỏ (≈ 52 KB cho latin + vietnamese, `font-display: swap`). Tối đa **ba họ chữ** trên một trang.

### Type scale

| Cấp | Font | Cỡ (web) | Độ đậm | Line-height | Ghi chú |
|---|---|---|---|---|---|
| Display Large | Dancing Script | clamp(2.65rem, 5.5vw, 5rem) | 600 | 1.18 | Hero |
| Display Medium | Dancing Script | clamp(2.05rem, 5vw, 4rem) | 600 | 1.18 | Tiêu đề trang |
| Display Small | Dancing Script | clamp(1.9rem, 4.2vw, 3rem) | 600 | 1.2 | Tagline khối |
| Headline 1 | Lora | clamp(1.65rem, 3.3vw, 3rem) | 400 | 1.2 | letter-spacing −0,02em |
| Headline 2 | Lora | clamp(1.17rem, 2.15vw, 1.55rem) | 400–500 | 1.32 | Thẻ |
| Headline 3 / Title Large | Lora | 1.35rem | 500 | 1.3 | |
| Title Medium | system-ui | 1.05rem | 650 | 1.4 | |
| Body Large | system-ui | clamp(1.055rem, 1.5vw, 1.18rem) | 400 | 1.65 | Lead |
| Body Medium | system-ui / Lora (tản văn) | 1rem | 400 | 1.7 | Đoạn văn cách 1em |
| Body Small | system-ui | .875rem | 400 | 1.55 | |
| Label | system-ui | .875rem | 650 | 1.35 | Nút |
| Caption | system-ui | .85rem | 400 | 1.5 | |
| Quote | Lora italic | 1.2rem | 400 | 1.5 | Màu tím lan |
| Numeric | system-ui, `tabular-nums` | theo ngữ cảnh | 600 | — | Giá, số liệu |

Độ dài dòng văn bản dài: **60–75 ký tự** (token `--lz-article-measure: 68ch`). Đã kiểm ở 320 px: không cắt chữ, không chồng dấu.
