## 2.0.5 — Nút nhạc nền xanh sage dịu nhẹ

- Tinh chỉnh nút nhạc nền thành dáng viên thuốc bo mềm, gọn hơn và thêm trạng thái hover/focus nhẹ.
- Chuyển sang cặp màu xanh sage dịu hơn, vẫn tự chọn biến thể sáng/tối theo vùng nền để giữ độ đọc rõ.
- Giữ nguyên nút phát/dừng, trạng thái phát, bảng chỉnh âm lượng và vị trí responsive.

## 2.0.4 — Hệ mặt trời Thân · Tâm · Trí

- Thay ba kim tự tháp và các quỹ đạo riêng bằng một hệ mặt trời chung, với Hương Thiền Nature ở trung tâm và ba hành tinh đại diện cho Thân, Tâm, Trí.
- Tinh gọn khu khám phá trên trang chủ: một ô tìm kiếm, từ khóa gợi ý và ba lối đọc ngắn gọn.
- Nút nổi chọn màu nền tương phản tốt nhất theo vùng nó đang phủ; kiểm tra nhiều điểm trên nút để phù hợp cả nền ảnh và nền chuyển sắc.

## 2.0.3 — Hệ sinh thái chuyển động quanh ba trọng tâm

- Ba kim tự tháp là tâm điểm của ba quỹ đạo tròn, với các giá trị chuyển động quanh Thân – Tâm – Trí.
- Nhãn chữ luôn giữ thẳng; có nút dừng/tiếp tục, tự dừng ngoài màn hình và khi tab bị ẩn.
- Bố cục riêng cho desktop, tablet và mobile; giảm chuyển động và tiết kiệm dữ liệu dùng hình tĩnh.

## 2.0.2 — Ba kim tự tháp hệ sinh thái

- Gộp nội dung Thân, Tâm, Trí vào một khu vực với ba kim tự tháp: Farm & Botanicals, Eco-Retreat và Academy.
- Thêm reveal khi cuộn và chuyển động ảnh rất nhẹ khi hover; trên điện thoại xếp dọc, chế độ giảm chuyển động/tiết kiệm dữ liệu giữ nội dung tĩnh.
- Tách rõ catalogue Farm & Botanicals (giá tham khảo, cần xác nhận) khỏi Eco-Retreat, Academy và Membership là các định hướng chưa mở đăng ký.
- Chỉnh lời giới thiệu, tản văn và liên hệ để mỗi phần có nhiệm vụ riêng; giữ giọng giản dị, không hứa hẹn kết quả thiền hay công dụng sức khỏe.
- Thêm kiểm thử nội dung song ngữ cho ba trung tâm và phạm vi catalogue/định hướng.

## 0.4.7 — Homepage discovery

- Giữ phong cách Roots, cập nhật CTA đầu trang để mở bài nhập môn, thêm ô tìm kiếm và từ khóa gợi ý ngay trên homepage.
- Thêm lộ trình đọc ba bước cho người mới; giới thiệu ba bài Roots về tâm nhiều suy nghĩ, làm vườn và lòng tử tế, có đường dẫn đến thư viện đầy đủ.
- Nội dung song ngữ và lựa chọn bài homepage được gom tại `src/data/home.ts`; bỏ hai trường copy cũ không còn dùng.
- Sửa audit liên kết để kiểm tra đường dẫn trang riêng với query/hash, hỗ trợ các liên kết tìm kiếm có `?q=`.
- Bổ sung kiểm thử trình duyệt cho homepage, tìm kiếm, đổi ngôn ngữ, lỗi tải dữ liệu, responsive và phương án điều hướng khi tắt JavaScript.

## 0.4.6 — Release package

- Đóng gói mã nguồn mới nhất trên `main`, kế thừa tính năng tìm kiếm song ngữ của bản 0.4.5 và các sửa lỗi Contact/CSS của bản 0.4.4.
- Đồng bộ số phiên bản trong package, lockfile, giao diện và tài liệu triển khai; gắn nhãn Git `v0.4.6`.

# v0.4.5

- Add responsive navigation search and separate Vietnamese/English results pages.
- Search all articles and project sections, with accent-insensitive Vietnamese matching.
- Preserve v0.4.4 contact fixes; validate search in CI.

## 0.4.4 — Error checks and cleanup

- Sửa trạng thái Contact: sự kiện Turnstile hết hạn/báo lỗi không ghi đè trạng thái đang gửi hoặc kết quả gửi thành công. Xác minh vẫn được yêu cầu cho lần gửi tiếp theo.
- Bỏ nhánh xử lý lỗi lặp và gộp hai callback xác minh dùng chung một hàm.
- Loại bỏ bốn nhóm CSS không còn được dùng (`contact-status`, `contact-draft-links`, `contact-direct`, `footer-mark`); gộp các khai báo bị ghi đè cho nhạc, nút lên đầu trang và footer.
- Sửa kiểm thử Tản văn còn dùng số lượng/vị trí của bộ ba bài cũ. Dùng manifest từ nguồn nội dung hiện tại, kiểm tra toàn bộ 30 trang bài viết song ngữ thay vì chỉ sáu trang bài cũ.

## 0.4.3 — Release package

- Đóng gói mã nguồn mới nhất trên nhánh `main`, kế thừa thư viện Roots song ngữ và Cloudflare Worker runtime của bản 0.4.1.
- Đồng bộ số phiên bản trong package, lockfile, giao diện và tài liệu triển khai; gắn nhãn Git `v0.4.3`.

## 0.4.1 — Cloudflare Worker runtime

- Chuyển API liên hệ từ Pages Functions sang Worker entrypoint dùng chung logic kiểm tra, Turnstile và Resend.
- Worker phục vụ Astro static assets và chạy middleware riêng cho `/api/*`; custom domain được khai báo trong Wrangler.
- Thêm lệnh phát triển, deploy và dry-run Worker có chỉ định tường minh `wrangler.worker.jsonc`.
- Giữ cấu hình Pages độc lập để tiếp tục dùng `pages.dev` làm demo.

## 0.4.0 — Roots editorial library

- Publish twelve complete Roots articles in Vietnamese and English, retaining the original three entries.
- Add six watercolor illustrations, practice exercises, localized CTAs, ordered related reading and an introductory reading path.
- Add structured article metadata, publication/source attribution and a reusable content export.
- Credit the manuscript by title only; exclude all Google Drive links from published code, pages and content exports.
- Preserve v0.3.5 navigation/SEO improvements and existing localized URLs/contact behavior.

## 0.3.5 — Journal navigation and SEO

- Exclude the new Google Drive-derived editorial collection and its generated content exports from this release; retain the three previously published bilingual articles.
- Add article contents with accessible section links, BlogPosting/BreadcrumbList structured data and article Open Graph metadata.
- Keep related reading bounded and the homepage journal preview limited to three entries.
- Preserve localized URLs, existing media, contact behavior and the current publication platform.

## 0.3.4
- Remove email draft and mailto fallback; retain server-side message delivery through Resend and Turnstile.
- Localize Vietnamese journal listing and article URLs, translation links and sitemap; redirect legacy URLs.

# Lịch sử phiên bản

Phiên bản dùng `major.minor.patch`, hiển thị từ `package.json` tại footer và thẻ `application-version`. V3 Roots là tên định hướng thiết kế; số phát hành là số đi kèm. Thay đổi sửa lỗi/giao diện tăng patch, tính năng lớn tăng minor, thay đổi không tương thích tăng major.

## V3 Roots 0.3.3

- Hai nút nổi (nhạc và về đầu trang) tự chọn nền tối trên vùng sáng, nền sáng trên vùng tối, theo vị trí riêng khi cuộn/đổi kích thước. Ảnh cùng nguồn được lấy mẫu màu tại vị trí nút. Chữ, biểu tượng, viền, dấu trạng thái và bảng âm lượng cùng đổi màu để giữ độ tương phản.
- Navigation Tản văn dẫn đến trang danh sách riêng, song ngữ tại `/vi/journal/` và `/en/journal/`. Liệt kê ba bài hiện có với ảnh, chủ đề, thời gian đọc và tóm tắt; đọc bài, quay lại danh sách và đổi ngôn ngữ.
- Breadcrumb, liên kết chân trang, nút Xem tất cả và sitemap cập nhật cho hai trang mới. Giữ URL của các bài đã xuất bản.

## V3 Roots 0.3.2

- Contact có phương án Soạn email đến địa chỉ chủ dự án đã cung cấp khi API hoặc khởi tạo xác minh chưa hoạt động. Có liên kết ứng dụng email và Gmail; người dùng kiểm tra rồi tự gửi, không nhầm bản nháp với gửi thành công.
- Điều khiển nhạc chuyển xuống góc trái, bảng âm lượng mở cùng phía.
- Nút Về đầu trang ở góc phải xuất hiện khi cuộn đạt 30% phần trang có thể cuộn; hỗ trợ bàn phím và giảm chuyển động.
- Hiển thị số phiên bản tại footer và metadata để nhận diện bản đang chạy.

## V3 Roots 0.3.1

- API liên hệ Cloudflare Pages Functions, Resend và Turnstile; gửi trực tiếp cần cấu hình runtime.
- Nhạc nền Lotus at First Light, bật/tắt, âm lượng và ghi nhớ lựa chọn. Tính năng nhạc đã phát hành trước khi quy ước tăng số cho từng bản cập nhật được áp dụng.

### Homepage storytelling integration — v0.4.7
- Integrated bilingual founder story, learning milestone timeline and Farm & Botanicals → Eco-Retreat → Academy direction.
- Added responsive Hybrid Nature motion with reduced-motion and data-saver support.
- Replaced selected couple imagery and hero with nature scenes; source credits retained in code and alt text.
- Preserved v0.4.7 Roots search, beginner reading path, featured articles and contact form.
