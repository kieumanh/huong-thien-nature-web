# V3 Roots — phạm vi và bàn giao

## Cơ sở triển khai

Phiên bản 0.3.0 phát triển từ mã nguồn đã có trên GitHub (`9cc3513`); bản 0.3.1 bổ sung gửi liên hệ qua Pages Functions. Người dùng yêu cầu hoàn thiện theo định hướng V3 Roots và push GitHub. Hai liên kết ChatGPT được cung cấp không truy cập được từ môi trường cloud (cổng mạng trả HTTP 403), nên phiên bản này không khẳng định tái tạo các yêu cầu chưa đọc trong cuộc trò chuyện đó.

“Roots” được triển khai như định hướng thiết kế: bắt rễ trong hiện tại, gần gũi với thiên nhiên, tông đất và xanh rừng, bố cục thoáng, hình ảnh được kế thừa, biểu tượng mầm cây/rễ dạng vector. Các nội dung và chức danh của Hương Thiền, Kiều Mạnh được giữ theo tài liệu repository.

## Phần đã hoàn thiện

- Trang chủ Việt/Anh với các phần câu chuyện, ba nền tảng thực tập, thiên nhiên, đội ngũ, tản văn, lộ trình và kết nối.
- Chữ hệ thống dễ đọc, không tải font bên ngoài; bố cục thích ứng desktop, tablet và điện thoại.
- Ba bài tản văn đầy đủ với sáu tuyến Việt/Anh. Nội dung mở rộng từ tư liệu đã có, gồm quay về sự chú tâm, khung bảy tầng và quan sát thiên nhiên.
- Chuyển ngôn ngữ giữ nguyên bài đang đọc; liên kết canonical, hreflang và sitemap thống nhất.
- Header/footer và dữ liệu nội dung dùng chung, thuận tiện cập nhật sau này.
- Menu di động đóng bằng Escape, trả focus về nút mở, đóng khi chọn liên kết hoặc nhấn ngoài menu; điều hướng vẫn dùng được khi không có JavaScript.
- Form liên hệ có lời nhắn, ô đồng ý, kiểm tra email và xác minh Turnstile. Pages Functions gửi qua Resend và tránh email trùng bằng idempotency key. Thiếu cấu hình API thì form cho phép soạn email để mở trong Gmail/ứng dụng email. Không có JavaScript thì submit khóa và liên kết email trực tiếp vẫn dùng được. Xem `CONTACT_SETUP.md`.
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
npm run test:contact
npm run build:pages-functions
npm run deploy:worker-dry-run
npm run preview -- --host 0.0.0.0 --port 4322
```

Trong môi trường cloud, thiết lập các biến XDG và tắt telemetry theo `HANDOFF.md` trước khi chạy Astro/Wrangler.

Build hiện tại: 12 trang HTML (hai trang chủ, hai danh sách Tản văn, sáu bài viết, trang vào gốc và 404), cùng sitemap có mười URL. `audit:build` kiểm tra nội dung bài, liên kết nội bộ, ảnh, anchor, ngôn ngữ, canonical, hreflang và JSON-LD.

Kiểm tra trình duyệt tùy chọn khi Python Playwright và Chromium đã có:

```bash
python tests/browser-smoke.py
```

Mặc định dùng preview ở cổng 4322; có thể đặt `APP_BASE_URL`, `CHROMIUM_EXECUTABLE` và `ROOTS_ARTIFACT_DIR`. Nếu không có Chromium hệ thống, dùng browser do Playwright cung cấp. Kết quả và ảnh chụp nằm trong `.artifacts/`, được Git bỏ qua. Bộ kiểm tra đi qua mười trang song ngữ, năm chiều rộng 320/375/768/1024/1440 px, menu, chuyển ngôn ngữ, form khi chưa cấu hình, 404 và trường hợp tắt JavaScript. Bộ `tests/contact-browser.py` kiểm tra luồng gửi với API/widget mock.

## Kết quả xác minh bản V3 Roots 0.3.0 trong môi trường phát triển

- Astro check: 16 tệp, không có lỗi, cảnh báo hoặc hint.
- Source audit: 25 ID không trùng, 14 ảnh WebP có trong repository.
- Build audit: 10 trang HTML, sáu trang bài viết, tám URL sitemap và 268 tham chiếu nội bộ hợp lệ.
- Kiểm tra Chromium/Playwright: tám trang nội dung, cả hai ngôn ngữ ở năm chiều rộng, menu, chuyển ngôn ngữ bài viết, xác thực biểu mẫu không gửi mạng, HTTP 404 và trường hợp không có JavaScript đều đạt.
- Axe-core: không phát hiện vi phạm trong các quy tắc WCAG A/AA tự động trên tám trang nội dung. Kiểm tra tự động không thay thế đánh giá thủ công với người dùng hoặc chứng nhận khả năng truy cập.
- Wrangler dry-run chấp nhận bộ static assets; không thực hiện triển khai Cloudflare.

## Giới hạn và triển khai

Đã có backend gửi liên hệ qua email, nhưng cần cấu hình và xác minh delivery trên deployment thực. Không có danh sách nhận bản tin, đăng nhập, thanh toán, lịch đặt chỗ hay cơ sở dữ liệu. Form liên hệ không tự đăng ký người gửi vào bản tin.

Từ bản 0.4.1, production dùng Cloudflare Workers Builds: nhánh `main`, build `npm run build`, deploy `npx wrangler deploy --config wrangler.worker.jsonc`, Node.js 24. Pages vẫn được giữ làm demo riêng với đầu ra `dist`. Push GitHub không phải bằng chứng triển khai Cloudflare thành công. Kiểm tra commit của deployment và hai tuyến ngôn ngữ sau khi Git integration chạy. Không đưa token vào mã nguồn, tài liệu hoặc gói ZIP.
