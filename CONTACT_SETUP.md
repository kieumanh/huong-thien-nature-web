# Cấu hình form liên hệ

Production hiện được chuẩn bị chạy trên Cloudflare Worker `huong-thien-nature`. Astro vẫn build tĩnh vào `dist`; Worker chỉ xử lý `/api/*` và dùng Static Assets cho phần còn lại. Không cần database.

## Binding cần đặt trong Cloudflare Worker

| Tên | Loại | Mục đích |
|---|---|---|
| `CONTACT_TO_EMAIL` | Secret hoặc biến cấu hình | Hộp thư nhận liên hệ do chủ dự án chỉ định. |
| `CONTACT_FROM_EMAIL` | Secret hoặc biến cấu hình | Sender đã được Resend xác minh. |
| `RESEND_API_KEY` | Secret | API key Resend có quyền gửi email. |
| `TURNSTILE_SITE_KEY` | Biến cấu hình | Site key Turnstile cho hostname thật. |
| `TURNSTILE_SECRET_KEY` | Secret | Secret key Turnstile. |

Không commit các giá trị thật vào GitHub, `.env` hoặc tài liệu.

## Thiết lập production

1. Xác minh domain gửi trong Resend và tạo API key.
2. Tạo Turnstile widget cho `huongthiennature.com` và action `contact`.
3. Trong Worker `huong-thien-nature`, thêm năm binding trên.
4. Deploy bằng `npm run deploy:worker`.
5. Gửi thử một tin nhắn thật, kiểm tra receipt trong Resend và hộp thư nhận.

## Hành vi API

- `GET /api/contact-config`: chỉ trả trạng thái cấu hình và Turnstile site key công khai.
- `POST /api/contact`: chỉ nhận JSON same-origin, xác minh dữ liệu + Turnstile rồi gửi bằng Resend.
- Worker không lưu database, không ghi nội dung cá nhân hay secret vào log.
- Các đường dẫn `/api/*` không tồn tại trả 404 JSON.
- Static pages/assets được Cloudflare Static Assets phục vụ, không chạy Worker script trừ `/api/*`.

## Phát triển và kiểm tra

```bash
npm ci
npm run check
npm run test:contact
npm run audit
npm run build
npm run audit:build
npm run deploy:worker-dry-run
npm run dev:worker
```

Cloudflare Pages và `functions/` hiện được giữ làm lớp tương thích/rollback trong giai đoạn chuyển đổi; production mục tiêu là Worker + Custom Domain.
