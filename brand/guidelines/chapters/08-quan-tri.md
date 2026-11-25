# Phần 8 · Quản lý tài sản, in ấn và quản trị

## Quy chuẩn in ấn

| Hệ màu | Dùng khi | Ghi chú |
|---|---|---|
| RGB / HEX | Màn hình | Giá trị gốc ở mục 20–22 |
| CMYK | In offset/kỹ thuật số | **Chưa xác định**: phải đo theo profile màu (ví dụ FOGRA39 hoặc profile của nhà in) và in thử. Không coi giá trị CMYK hay Pantone nào là tương đương tuyệt đối với HEX khi chưa đối chiếu. |
| Grayscale | In đen trắng | Dùng logo đơn sắc đen; xanh rừng ≈ 80% đen |
| Một màu | In lụa, thêu, khắc laser, dập nổi/chìm, ép kim | Dùng `logos/monochrome/`; ép kim vàng chỉ cho brand mark, cỡ ≥ 12 mm |

Tệp in: kích thước thật, **bleed 3 mm** (đã có trong mẫu), lề an toàn 5 mm (đường nét đứt hồng trong lớp `guides`, ẩn khi in), font nhúng hợp lệ (SIL OFL cho phép nhúng) hoặc chuyển thành vector, ảnh ≥ 300 ppi ở kích thước in, PDF vector khi có thể. Thiết kế đã thử trên giấy kraft và giấy tái chế: bản một màu xanh rừng vẫn nhận diện được.

## 41. Asset management

Cấu trúc `brand/`:

```
brand/
├── README.md · CHANGELOG.md
├── audit/            báo cáo kiểm kê trước 2.0
├── strategy/         chiến lược, giọng nói, kiến trúc thương hiệu
├── guidelines/       brand book (MD + PDF), quick guide, chapters/ (nguồn)
├── logos/            legacy/ concepts/ primary/ horizontal/ vertical/ compact/ brand-mark/ wordmark/
│                     monochrome/ reversed/ favicon/ app-icons/ watermark/ co-branding/ tests/
├── colors/           palette.json · palette.svg · palette.png
├── typography/       mẫu chữ tiếng Việt, licenses/
├── fonts/            WOFF2 gốc (SIL OFL)
├── tokens/           primitive.json · semantic.json · components.json · tokens.css
├── icons/            brand/ functional/ icon-sheet
├── patterns/         8 nhóm họa tiết, seamless/ frames/ dividers/ textures/
├── motion/           8 hình động SVG
├── templates/        social-media/ stationery/ publishing/ education/ packaging/ physical-space/ merchandise/ video/
├── photography/      hướng dẫn, nguồn ảnh
├── accessibility/    tương phản, báo cáo kiểm thử
├── licenses/         tổng hợp giấy phép
├── releases/         ghi chú phát hành, hướng dẫn triển khai và khôi phục
└── scripts/          build.py · kits.py · book.py (tái tạo toàn bộ)
```

Tên tệp: `htn-<biến thể>-<màu>.<đuôi>`; họa tiết `<tên>-<master|mono|light|dark|watermark>.svg`. Website chỉ nhận những tệp đang dùng (`public/brand/`, do `build.py` chép); PDF, mockup và nguồn lớn không vào `public/`. Gói bàn giao: `releases/Huong-Thien-Nature-Living-Zen-Brand-Kit-v2.0.zip`.

## 42. Brand governance

Mỗi tài sản có: nguồn gốc (tự vẽ bằng mã / ảnh thật / thư viện + giấy phép), quyền sử dụng, trạng thái (**ĐỀ XUẤT → ĐÃ DUYỆT → NGỪNG**). Hiện tại: hệ màu, chữ, icon, họa tiết, mẫu = **ĐÃ ÁP DỤNG trên website 2.24.0**; logo Living Roots = **ĐỀ XUẤT**.

| Quy trình | Các bước |
|---|---|
| Đề xuất màu mới | Nêu mục đích + nơi dùng → kiểm tương phản (≥ 4,5:1 cho chữ) ngày và đêm → thêm vào `foundation.py` → chạy `build.py` → cập nhật mục 22 |
| Bổ sung icon | Vẽ trên lưới 24, nét 1,75 → thêm vào `icons.py` → kiểm ở 20/24/32 px → chạy `build.py` |
| Họa tiết mới | Vẽ bằng mã trong `patterns.py` → đủ 5 biến thể → ghi ý nghĩa sáng tạo (không tuyên bố công dụng) |
| Thay đổi logo | Phương án + lý do + bảng chấm điểm → chủ dự án duyệt bằng văn bản → thay tệp web, favicon, manifest, ảnh chia sẻ cùng một bản phát hành → lưu bản cũ vào `logos/legacy/` |
| Landing page mới | Dùng token và thành phần sẵn có → tối đa 1 màu không gian riêng → kiểm axe ngày/đêm, 320–1920 px |
| Đồng bộ ứng dụng (Zen Flow, Kanban, CMS…) | Dùng `tokens/tokens.css` hoặc JSON; logo theo mục 15 |
| Cập nhật Brand Book | Sửa `guidelines/chapters/*.md` → chạy `book.py` → ghi `CHANGELOG.md` |
| Quản lý phiên bản | Thương hiệu: Living Zen 2.0, 2.1… (`brand/CHANGELOG.md`). Website: số trong `package.json`. Hai hệ độc lập. |
| Kiểm tra accessibility | axe (WCAG 2.2 AA) ở chế độ ngày và đêm trước mỗi bản phát hành |
| Kiểm tra giấy phép | Ghi nguồn + giấy phép vào `licenses/README.md` trước khi dùng tài nguyên ngoài |

Không tuyên bố họa tiết, logo hay tên "Living Zen" đã được bảo hộ độc quyền về mặt pháp lý khi chưa tra cứu và đăng ký nhãn hiệu phù hợp.

## Accessibility

Mục tiêu WCAG 2.2 AA cho giao diện thuộc phạm vi: tương phản chữ 4,5:1 (chữ lớn 3:1, thành phần phi văn bản 3:1), focus nhìn thấy, bàn phím, trình đọc màn hình, giảm chuyển động, vùng chạm ≥ 44 px, không truyền tải chỉ bằng màu, zoom 200%, nhãn biểu mẫu và thông báo lỗi có hướng dẫn. Kết quả kiểm thử thật: `accessibility/README.md`.
