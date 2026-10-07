# Bàn giao phát triển Hương Thiền Nature

## Nguồn kế thừa

Mã nguồn và tài liệu trong repository `kieumanh/huong-thien-nature-web` là cơ sở tiếp tục phát triển. Phiên bản V3 Roots tiếp tục từ commit `9cc35139162f750635f98d24fdc72e3267b79af3`. Liên kết hội thoại ChatGPT Work không truy cập được từ môi trường này; không khẳng định đã kế thừa các yêu cầu chưa đọc. Xem `V3_ROOTS.md` để biết phạm vi phiên bản.

## Thành phần đã có

- Website Astro tĩnh, giao diện tiếng Việt `/vi` và tiếng Anh `/en`.
- Giao diện V3 Roots: tông đất/xanh rừng, dấu rễ cây dạng vector, chữ hệ thống dễ đọc, menu có hỗ trợ bàn phím.
- Ba bài tản văn đầy đủ ở mỗi ngôn ngữ, tổng cộng sáu trang bài viết; chuyển ngôn ngữ giữ nguyên bài.
- Nội dung dùng chung trong `src/data`, bố cục dùng chung trong `src/components`; sitemap tự tạo từ danh sách bài viết.
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
npm run audit:build
npm run test:contact
npm run build:pages-functions
npm run dev -- --host 0.0.0.0 --port 4321
```

Hai biến XDG giúp các công cụ ghi cấu hình/cache vào vùng được phép của môi trường cloud. Trên máy cá nhân có thể dùng vị trí mặc định. Cloud task đã được cô lập; sử dụng checkout hiện có, không tạo Git worktree trừ khi được yêu cầu.

Kiểm tra `/vi`, `/en`, `/robots.txt`, `/sitemap.xml` và ảnh trong `/media/`. Xem bản build bằng `npm run preview`. Khi phát triển form gửi tin, dùng `npm run dev:pages` để chạy cả Pages Functions tại cổng 8788. Kiểm tra tương thích Worker static tùy chọn: `npm run deploy:worker-dry-run`.

## Triển khai

Cloudflare Pages: nhánh production `main`, lệnh build `npm run build`, thư mục đầu ra `dist`. Nếu dự án đã liên kết GitHub, kiểm tra deployment tương ứng với commit mới sau khi push.

Triển khai trực tiếp bằng `npm run deploy:pages` cần thông tin xác thực Cloudflare cho dự án `huong-thien-nature-web`. Không lưu token vào repository. Push GitHub và build cục bộ không chứng minh deployment Cloudflare đã thành công.

## Phạm vi hiện tại và công việc tiếp theo

Form liên hệ đã có endpoint gửi email qua Resend, xác minh Turnstile ở máy chủ và ô đồng ý. Cần năm binding trong `CONTACT_SETUP.md` trước khi gửi thật; thiếu cấu hình hoặc JavaScript thì form khóa. Email nhận do chủ dự án cấu hình; địa chỉ không nằm trong frontend. Chưa có tài khoản thành viên, thanh toán, lịch đặt chỗ hoặc cơ sở dữ liệu. Kiểm thử dùng mock không chứng minh thư đã vào hộp nhận.

Tiếp tục rà soát giao diện trên thiết bị thực, khả năng truy cập, nội dung song ngữ và quyền sử dụng hình ảnh; xác minh deployment Pages, DNS/TLS và tên miền theo `DEPLOYMENT.md`.

## Gói mã nguồn

Dùng `git archive` tại commit đã push để đóng gói các tệp được Git quản lý. Gói bao gồm mã nguồn, ảnh, lockfile và tài liệu; không bao gồm `.git`, dependencies đã cài, cache, bản build hoặc thông tin xác thực. Dùng lockfile để cài lại dependencies và build lại `dist`.
