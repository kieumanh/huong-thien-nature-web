# Cấu hình form liên hệ

Form dùng Cloudflare Pages Functions để gửi email bằng Resend, xác minh Turnstile ở phía máy chủ. Frontend vẫn là Astro static; không cần database hoặc Astro server adapter.

## Binding cần đặt trong Cloudflare Pages

| Tên | Loại | Giá trị |
|---|---|---|
| `CONTACT_TO_EMAIL` | Biến cấu hình | Email nhận do chủ dự án xác nhận; không đưa vào frontend. |
| `CONTACT_FROM_EMAIL` | Biến cấu hình | Email gửi đã được Resend xác minh/cho phép, có thể ở dạng `Hương Thiền Nature <sender@your-verified-domain>`. |
| `RESEND_API_KEY` | Secret | API key Resend có quyền gửi email. |
| `TURNSTILE_SITE_KEY` | Khóa công khai | Site key của widget Turnstile cho hostname thực tế của website. |
| `TURNSTILE_SECRET_KEY` | Secret | Secret key tương ứng để xác minh phía máy chủ. |

1. Trong Resend, xác minh domain gửi email và tạo API key gửi thư. Gmail dùng được làm email nhận, nhưng địa chỉ Gmail không tự trở thành email gửi được xác minh. `onboarding@resend.dev` chỉ dùng trong giới hạn thử nghiệm của Resend với email của tài khoản, không phải sender production mặc định.
2. Tạo Turnstile widget, thêm hostname thực tế của Pages và tên miền riêng. Máy chủ kiểm tra hostname và action `contact`.
3. Trong Cloudflare Pages → Settings → Variables and Secrets, nhập năm binding trên cho Production, và riêng cho Preview nếu cần. Không gửi API key trong chat hoặc commit `.env`/`.dev.vars`. Biến cấu hình cũng có thể được lưu dạng Secret; site key vẫn được trả về frontend vì là khóa công khai.
4. Deploy lại commit mới bằng Git integration hoặc `npm run deploy:pages` (nhánh production `main`). Dùng Node.js 24, build `npm run build`, output `dist`. Thư mục `functions/` phải có trong checkout khi triển khai. Upload ZIP static cũ không đưa API lên Pages.
5. Gửi một lời nhắn được cho phép trên website thực, kiểm tra hộp nhận/Spam và trạng thái email trong Resend. HTTP 200 từ API chỉ chứng minh nhà cung cấp đã chấp nhận email, chưa chứng minh thư đã vào Inbox.

Cấu hình trong môi trường Codex không tự tạo binding trên dự án Cloudflare Pages. Cần nhập chúng vào Cloudflare trước khi gửi thật.

## Hành vi

- `GET /api/contact-config` chỉ trả trạng thái có cấu hình và site key công khai, không trả email hoặc secret.
- `POST /api/contact` nhận JSON cùng origin, kiểm tra tên/email/chủ đề/nội dung/đồng ý, honeypot và giới hạn 32 KiB.
- Turnstile được xác minh phía máy chủ. Token chưa hợp lệ, hostname hoặc action sai không được gửi email.
- Email dùng văn bản thuần; Reply-To là email người gửi. Không dùng input làm HTML hoặc subject tùy ý.
- Thành công chỉ xuất hiện sau khi Resend trả receipt. Lỗi giữ nội dung; thử lại không sửa nội dung giữ idempotency key để tránh gửi trùng.
- Form không tự đăng ký bản tin. Dữ liệu được chuyển qua nhà cung cấp email đến hộp nhận để phản hồi; ứng dụng không lưu database hay ghi dữ liệu cá nhân/token vào log.
- Thiếu cấu hình, API cấu hình không chạy hoặc widget không tải được lúc khởi tạo: form chuyển sang chế độ **Soạn email**, giữ các ô nhập và kiểm tra dữ liệu/đồng ý. Lời nhắn được ghép trên trình duyệt để người dùng mở ứng dụng email hoặc Gmail, kiểm tra rồi tự bấm Gửi. Phương án này dùng email nhận công khai do chủ dự án cung cấp: `kieumanh2211@gmail.com`. Không báo đã gửi khi chỉ soạn bản nháp. Khi sửa nội dung, các liên kết bản nháp cũ được ẩn cho đến lần soạn tiếp theo.
- API báo `unavailable` lúc gửi: chuyển sang chế độ Soạn email và giữ nội dung. Lỗi mạng/nhà cung cấp có trạng thái gửi không chắc chắn vẫn giữ thông báo lỗi và idempotency key để thử lại, tránh tự động tạo một lần gửi khác.
- Không có JavaScript thì nút submit vẫn khóa để tránh GET chứa thông tin cá nhân; liên kết email trực tiếp luôn dùng được.

## Phát triển và kiểm tra

```bash
npm ci
npm run check
npm run test:contact
npm run audit
npm run build
npm run audit:build
npm run build:pages-functions
npm run dev:pages
```

`dev:pages` build frontend và chạy cả API tại cổng 8788. Astro dev/preview riêng không có contact API. Nếu cần thử email thật cục bộ, sao chép `.dev.vars.example` thành `.dev.vars`, điền giá trị qua trình soạn thảo an toàn và dùng hostname được Turnstile cho phép. `.dev.vars` được Git bỏ qua. Trong cloud, đặt XDG/telemetry theo `HANDOFF.md`. Sau khi sửa frontend, build lại; Wrangler theo dõi thay đổi Functions.

Node tests dùng provider mock, không gửi email thật. Với Python Playwright/Chromium đã cài:

```bash
APP_BASE_URL=http://127.0.0.1:8788 python tests/contact-browser.py
APP_BASE_URL=http://127.0.0.1:8788 python tests/browser-smoke.py
```

`contact-browser.py` kiểm tra gửi thành công/lỗi với API và widget mock, cùng phương án soạn email khi thiếu cấu hình. `browser-smoke.py` kiểm tra các tuyến nội dung và điều hướng trên máy chủ chưa cấu hình. `tests/navigation-controls-browser.py` kiểm tra góc trái của nhạc và ngưỡng 30% của nút lên đầu trang. Các kiểm tra này không xác minh email đã vào Gmail.

`wrangler.jsonc` là cấu hình Pages. `wrangler.worker.jsonc` chỉ giữ phép kiểm tra Workers Static Assets tùy chọn, không triển khai Pages Functions. Không dùng Worker static đó để xuất bản form gửi tin.
