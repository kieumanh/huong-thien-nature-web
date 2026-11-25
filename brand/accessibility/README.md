# Báo cáo accessibility và performance — website 2.24.0 (Living Zen 2.0)

Chạy ngày 26/11/2026 trên bản build cục bộ (`dist/`), Chromium headless qua Playwright, axe-core 4.10.

## Accessibility (WCAG 2.2 AA, axe)

- Bộ kiểm thử CI có sẵn (`zen-botanical-browser`, `navigation-controls`, `contact`, `music`, `tan-van`): **đạt cả 5**, gồm quét axe nhiều trang, ngày và đêm.
- Kiểm thử bổ sung cho Living Zen: 7 trang (Trang chủ VI/EN, Hệ sinh thái VI/EN, `/living-zen/`, Cửa hàng, Khóa thực hành) × 9 bề rộng (320, 360, 390, 430, 768, 1024, 1280, 1440, 1920) × 2 chế độ (luôn sáng, luôn tối): **không tràn ngang, không lỗi JavaScript**; axe ở 390 và 1280 px: **0 vi phạm** (sau khi sửa 1 lỗi tương phản chú thích trên thẻ nền tối ở trang `/living-zen/`).
- Lựa chọn giao diện: đổi sang "Luôn tối" có hiệu lực ngay và được giữ sau khi tải lại trang.
- Token: `contrast-tokens.md`. Kết quả này không thay cho kiểm thử với người dùng trình đọc màn hình thật.

## Performance (phòng thí nghiệm, không phải dữ liệu người dùng thật)

Điện thoại giả lập 390 × 844, máy chủ tĩnh cục bộ, trung vị 3 lần đo. So sánh với 2.23.0 cùng điều kiện.

| Trang | LCP 2.23.0 → 2.24.0 | CLS |
|---|---|---|
| /vi/ | 136 → 168 ms | 0 → 0 |
| /vi/he-sinh-thai/ | 128 → 156 ms | 0 → 0 |
| Bài tản văn | 132 → 168 ms | 0 → 0 |

Chênh lệch chủ yếu do font Lora (≈ 52 KB cho latin + tiếng Việt, `font-display: swap`, chỉ tải khi trang có chữ Lora). Mục tiêu LCP ≤ 2,5 s và CLS ≤ 0,1 vẫn đạt rất xa trong điều kiện này; mạng di động thật sẽ chậm hơn. Dữ liệu thực tế (phân vị 75) cần công cụ đo lường, đã hẹn xây ở CMS.
