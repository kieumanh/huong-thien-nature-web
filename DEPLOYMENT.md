# Production deployment — Cloudflare Worker

## Trạng thái kiến trúc

- Source: GitHub `kieumanh/huong-thien-nature-web`, branch `main`.
- Frontend: Astro static, build command `npm run build`, output `dist`.
- Production Worker: `huong-thien-nature`.
- Runtime API: `/api/contact` và `/api/contact-config`.
- Production hostname: `huongthiennature.com`.
- Custom Domain được khai báo trong `wrangler.worker.jsonc`.
- Static Assets được phục vụ trực tiếp; Worker script chạy trước chỉ cho `/api/*`.

## Cổng kiểm tra trước deploy

```bash
npm ci
npm run check
npm run audit
npm run test:contact
npm run build
npm run audit:build
npm run deploy:worker-dry-run
```

GitHub Actions chạy cùng các kiểm tra trên sau mỗi push lên `main`.

## Deploy production

1. Đăng nhập Cloudflare/Wrangler bằng tài khoản sở hữu zone `huongthiennature.com`.
2. Tạo/kiểm tra Worker `huong-thien-nature`.
3. Đặt các binding Resend + Turnstile theo `CONTACT_SETUP.md`.
4. Chạy `npm run deploy:worker`.
5. Wrangler sẽ triển khai code + `dist` và yêu cầu Cloudflare gắn Custom Domain `huongthiennature.com`.
6. Kiểm tra HTTPS, `/vi/`, `/en/`, sitemap, robots, 404 và hai API contact.
7. Gửi một form thật để xác nhận email đến hộp nhận.

## DNS và domain

Custom Domain phù hợp khi Worker là origin. Cloudflare tự tạo bản ghi/certificate cần thiết sau khi domain được gắn. Nếu hostname đang có CNAME xung đột, phải bỏ CNAME đó trước khi tạo Custom Domain.

## Rollback

Cloudflare Pages scripts/config vẫn được giữ tạm thời như đường lui trong giai đoạn chuyển đổi. Không xóa Pages project cho đến khi Worker production, API contact và domain đã được xác minh thực tế.

## Điều còn cần quyền Cloudflare

Repo đã sẵn sàng cho Worker deployment. Việc tạo Worker thật, thêm secrets/bindings, cấp chứng chỉ và gắn Custom Domain cần phiên đăng nhập Cloudflare hoặc API token có quyền tương ứng.
