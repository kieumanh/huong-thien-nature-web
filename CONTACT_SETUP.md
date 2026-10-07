# Cấu hình form liên hệ

Form dùng Cloudflare Worker để phục vụ Astro static và gửi email qua Resend sau khi máy chủ xác minh Turnstile. Worker route entry nằm ở `worker.ts`; cấu hình triển khai nằm trong `wrangler.jsonc`.

## Biến và secrets trên Worker

Trong Cloudflare Dashboard → Worker `huong-thien-nature` → Settings → Variables and Secrets, cấu hình:

| Tên | Loại | Giá trị |
|---|---|---|
| `CONTACT_TO_EMAIL` | Variable | Email nhận do chủ dự án xác nhận. |
| `CONTACT_FROM_EMAIL` | Variable | Email gửi đã được Resend xác minh; ví dụ `Hương Thiền Nature <sender@your-verified-domain>`. |
| `RESEND_API_KEY` | Secret | API key Resend có quyền gửi thư. |
| `TURNSTILE_SITE_KEY` | Variable | Site key công khai của widget. |
| `TURNSTILE_SECRET_KEY` | Secret | Secret key để xác minh phía máy chủ. |

1. Trong Resend, xác minh domain gửi thư và tạo API key gửi thư. Gmail có thể nhận thư, nhưng Gmail không tự trở thành địa chỉ gửi đã xác minh. `onboarding@resend.dev` chỉ phù hợp giới hạn thử nghiệm của Resend.
2. Tạo Turnstile widget và thêm hostname thực tế của website. Worker kiểm tra hostname và action `contact`.
3. Nhập các giá trị ở trên trong Worker settings. Không commit secrets vào Git hoặc gửi chúng trong chat.
4. Deploy Worker sau khi cấu hình; gửi một tin nhắn thử trên website, kiểm tra Inbox/Spam và trạng thái email trong Resend.

## API và quyền riêng tư

- `GET /api/contact-config` chỉ trả trạng thái có cấu hình và site key công khai.
- `POST /api/contact` nhận JSON cùng origin, kiểm tra nội dung, đồng ý, honeypot và giới hạn 32 KiB.
- Turnstile được xác minh phía máy chủ. Token, hostname hoặc action sai sẽ không gửi email.
- Email dùng văn bản thuần; Reply-To là email người gửi. Form không tự đăng ký bản tin.
- Ứng dụng không lưu nội dung trong database và không ghi dữ liệu cá nhân/token vào log.
- Thành công chỉ được trả về sau khi Resend cấp receipt; điều đó chưa chứng minh thư đã vào Inbox.

## Phát triển và kiểm tra

```bash
npm ci
npm run check
npm run test:contact
npm run audit
npm run build
npm run audit:build
npm run dev:worker
```

Wrangler local sẽ dùng `.dev.vars` nếu bạn cần thử tích hợp thật. Tạo file từ `.dev.vars.example`, điền bằng trình soạn thảo an toàn; file này đã được Git bỏ qua. Dùng hostname được Turnstile cho phép. Test Node dùng provider mock và không gửi email thật.

Xem `DEPLOYMENT.md` để cấu hình Cloudflare Workers Builds, build preview và gắn custom domain sau khi xác minh Worker.
