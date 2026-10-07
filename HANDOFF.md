# Bàn giao phát triển Hương Thiền Nature

## Nguồn kế thừa

Mã nguồn và tài liệu trong repository `kieumanh/huong-thien-nature-web` là cơ sở tiếp tục phát triển. Phiên bản nền đã kiểm tra: `7d92880e911847c2291a8e9f012ae4f72419de15`. Lịch sử hội thoại ChatGPT Work và các tệp gốc ngoài repository chưa được cung cấp trong môi trường này.

## Thành phần đã có

- Website Astro tĩnh, giao diện tiếng Việt `/vi` và tiếng Anh `/en`.
- Nội dung thương hiệu, thực tập thiền, thiên nhiên, người sáng lập, nhật ký và lộ trình.
- Tailwind CSS, 14 ảnh WebP trong `public/media`, metadata SEO, robots và sitemap.
- `CONTENT_GUIDE.md`: nguồn nội dung và định hướng biên tập.
- `DEPLOYMENT.md`: quy trình Cloudflare Pages và các việc cần hoàn thành trước khi ra mắt.
- `package-lock.json`: phiên bản dependencies để cài đặt lặp lại.

## Cài đặt và kiểm tra

Đã kiểm tra với Node.js 24.19.0 và npm 11.9.0. Chạy từ thư mục repository:

```bash
export XDG_CONFIG_HOME=/workspace/.config
export XDG_CACHE_HOME=/workspace/.cache
export ASTRO_TELEMETRY_DISABLED=1
export WRANGLER_SEND_METRICS=false
mkdir -p "$XDG_CONFIG_HOME" "$XDG_CACHE_HOME"
npm ci --cache /workspace/.npm --no-fund --no-audit
npm run check
npm run audit
npm run build
npm run dev -- --host 0.0.0.0 --port 4321
```

Hai biến XDG giúp các công cụ ghi cấu hình/cache vào vùng được phép của môi trường cloud. Trên máy cá nhân có thể dùng vị trí mặc định. Cloud task đã được cô lập; sử dụng checkout hiện có, không tạo Git worktree trừ khi được yêu cầu.

Kiểm tra `/vi`, `/en`, `/robots.txt`, `/sitemap.xml` và ảnh trong `/media/`. Xem bản build bằng `npm run preview`. Kiểm tra tương thích Workers tùy chọn: `npm exec -- wrangler deploy --dry-run`.

## Triển khai

Cloudflare Pages: nhánh production `main`, lệnh build `npm run build`, thư mục đầu ra `dist`. Nếu dự án đã liên kết GitHub, kiểm tra deployment tương ứng với commit mới sau khi push.

Triển khai trực tiếp bằng `npm run deploy:pages` cần thông tin xác thực Cloudflare cho dự án `huong-thien-nature-web`. Không lưu token vào repository. Push GitHub và build cục bộ không chứng minh deployment Cloudflare đã thành công.

## Phạm vi hiện tại và công việc tiếp theo

Form quan tâm chỉ là bản xem trước, không gửi hoặc lưu thông tin. Chưa có backend, tài khoản thành viên, thanh toán, lịch đặt chỗ hoặc cơ sở dữ liệu. Trước khi thu thập dữ liệu thật, cần xây dựng endpoint, xác minh Turnstile, lưu trữ an toàn, email giao dịch và nội dung đồng ý/quyền riêng tư.

Tiếp tục rà soát giao diện trên thiết bị thực, khả năng truy cập, nội dung song ngữ và quyền sử dụng hình ảnh; xác minh deployment Pages, DNS/TLS và tên miền theo `DEPLOYMENT.md`.

## Gói mã nguồn

Dùng `git archive` tại commit đã push để đóng gói các tệp được Git quản lý. Gói bao gồm mã nguồn, ảnh, lockfile và tài liệu; không bao gồm `.git`, dependencies đã cài, cache, bản build hoặc thông tin xác thực. Dùng lockfile để cài lại dependencies và build lại `dist`.
