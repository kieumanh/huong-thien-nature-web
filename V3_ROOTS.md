# V3 Roots — phạm vi và bàn giao

## Cơ sở triển khai

Phiên bản 0.3.0 phát triển từ mã nguồn đã có trên GitHub (`9cc3513`). Người dùng yêu cầu hoàn thiện theo định hướng V3 Roots và push GitHub. Hai liên kết ChatGPT được cung cấp không truy cập được từ môi trường cloud (cổng mạng trả HTTP 403), nên phiên bản này không khẳng định tái tạo các yêu cầu chưa đọc trong cuộc trò chuyện đó.

“Roots” được triển khai như định hướng thiết kế: bắt rễ trong hiện tại, gần gũi với thiên nhiên, tông đất và xanh rừng, bố cục thoáng, hình ảnh được kế thừa, biểu tượng mầm cây/rễ dạng vector. Các nội dung và chức danh của Hương Thiền, Kiều Mạnh được giữ theo tài liệu repository.

## Phần đã hoàn thiện

- Trang chủ Việt/Anh với các phần câu chuyện, ba nền tảng thực tập, thiên nhiên, đội ngũ, tản văn, lộ trình và kết nối.
- Chữ hệ thống dễ đọc, không tải font bên ngoài; bố cục thích ứng desktop, tablet và điện thoại.
- Ba bài tản văn đầy đủ với sáu tuyến Việt/Anh. Nội dung mở rộng từ tư liệu đã có, gồm quay về sự chú tâm, khung bảy tầng và quan sát thiên nhiên.
- Chuyển ngôn ngữ giữ nguyên bài đang đọc; liên kết canonical, hreflang và sitemap thống nhất.
- Header/footer và dữ liệu nội dung dùng chung, thuận tiện cập nhật sau này.
- Menu di động đóng bằng Escape, trả focus về nút mở, đóng khi chọn liên kết hoặc nhấn ngoài menu; điều hướng vẫn dùng được khi không có JavaScript.
- Biểu mẫu xem trước có dữ liệu mẫu, kiểm tra trường bắt buộc/email, trạng thái phản hồi dễ truy cập và không thực hiện yêu cầu mạng. Khi JavaScript không chạy, các trường và nút gửi được khóa.
- Trang lỗi 404 đồng bộ giao diện; sitemap tự tạo từ danh sách bài viết.
- GitHub Actions kiểm tra nguồn, kiểu dữ liệu, build và liên kết mỗi khi push `main` hoặc mở pull request.

## Kiểm tra lại

Chạy với Node.js 24 từ thư mục repository:

```bash
npm ci
npm run check
npm run audit
npm run build
npm run audit:build
npm exec -- wrangler deploy --dry-run
npm run preview -- --host 0.0.0.0 --port 4322
```

Trong môi trường cloud, thiết lập các biến XDG và tắt telemetry theo `HANDOFF.md` trước khi chạy Astro/Wrangler.

Build dự kiến: 10 trang HTML (hai trang chủ, sáu bài viết, trang vào gốc và 404), cùng sitemap có tám URL. `audit:build` kiểm tra nội dung bài, liên kết nội bộ, ảnh, anchor, ngôn ngữ, canonical, hreflang và JSON-LD.

Kiểm tra trình duyệt tùy chọn khi Python Playwright và Chromium đã có:

```bash
python tests/browser-smoke.py
```

Mặc định dùng preview ở cổng 4322; có thể đặt `APP_BASE_URL`, `CHROMIUM_EXECUTABLE` và `ROOTS_ARTIFACT_DIR`. Nếu không có Chromium hệ thống, dùng browser do Playwright cung cấp. Kết quả và ảnh chụp nằm trong `.artifacts/`, được Git bỏ qua. Bộ kiểm tra đi qua tám trang song ngữ, năm chiều rộng 320/375/768/1024/1440 px, menu, chuyển ngôn ngữ, biểu mẫu, 404 và trường hợp tắt JavaScript.

## Kết quả xác minh trong môi trường phát triển

- Astro check: 16 tệp, không có lỗi, cảnh báo hoặc hint.
- Source audit: 25 ID không trùng, 14 ảnh WebP có trong repository.
- Build audit: 10 trang HTML, sáu trang bài viết, tám URL sitemap và 268 tham chiếu nội bộ hợp lệ.
- Kiểm tra Chromium/Playwright: tám trang nội dung, cả hai ngôn ngữ ở năm chiều rộng, menu, chuyển ngôn ngữ bài viết, xác thực biểu mẫu không gửi mạng, HTTP 404 và trường hợp không có JavaScript đều đạt.
- Axe-core: không phát hiện vi phạm trong các quy tắc WCAG A/AA tự động trên tám trang nội dung. Kiểm tra tự động không thay thế đánh giá thủ công với người dùng hoặc chứng nhận khả năng truy cập.
- Wrangler dry-run chấp nhận bộ static assets; không thực hiện triển khai Cloudflare.

## Giới hạn và triển khai

Chưa có backend hoặc danh sách nhận tin thực. Không có đăng nhập, thanh toán, lịch đặt chỗ hay lưu dữ liệu cá nhân. Các chức năng này cần một giai đoạn triển khai riêng; website hiển thị rõ trạng thái chưa mở đăng ký.

Cloudflare Pages dùng nhánh `main`, lệnh `npm run build`, đầu ra `dist`, Node.js 24. Push GitHub không phải bằng chứng triển khai Cloudflare thành công. Kiểm tra commit của deployment và hai tuyến ngôn ngữ sau khi Git integration chạy. Không đưa token vào mã nguồn, tài liệu hoặc gói ZIP.
