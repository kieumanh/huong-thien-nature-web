## 2.11.1 — Bổ sung thông tin cho người tham khảo đăng ký

Rà soát hai trang Tarot tâm lý học và Tần Số Vàng từ góc nhìn người sắp đăng ký, bổ sung những gì còn thiếu mà không thêm thông tin chưa được xác nhận.

- Tần Số Vàng: khối "Thông tin khóa học" ngay dưới phần báo giá nhanh (hình thức, thời gian, khai giảng, khối lượng, đầu vào, đồng hành, sau khóa, học phí) kèm danh sách "Bạn nên chuẩn bị"; thêm liên kết "Thông tin khóa học" vào thanh điều hướng nhanh.
- Tần Số Vàng: thêm 4 câu hỏi đáp (chuẩn bị học online, đã thiền nhiều năm, học phí và thanh toán, chọn khóa nào); dữ liệu có cấu trúc FAQPage tự đồng bộ.
- Bảng "Nên chọn khóa nào?" so sánh hai khóa (`src/components/CourseCompare.astro`, dữ liệu `src/data/course-compare.ts`) trên trang Tần Số Vàng, trang Tarot và trang Khóa thực hành.
- Tarot: ô chi phí đổi thành "Báo giá qua tin nhắn" (thay cho "Liên hệ"), ghi chú nhắn Zalo để nhận báo giá; thêm 3 câu hỏi đáp (chưa có câu hỏi rõ ràng, chi phí và thanh toán, chọn Tarot hay Tần Số Vàng).
- Kiểm thử: bổ sung test cho khối thông tin và bảng so sánh; cập nhật các kỳ vọng nhãn giá Tarot.
- Chưa có (chờ chủ dự án): hình thức buổi Tarot (online hay trực tiếp), số buổi học trực tiếp và nền tảng lớp Tần Số Vàng, sĩ số, chính sách hoàn/dời lịch, cam kết bảo mật buổi 1:1, cảm nhận học viên đã đồng ý công khai, thông tin chuyên môn người hướng dẫn.

## 2.11.0 — Tinh chỉnh giao diện và tìm kiếm Tản văn

- Tản văn: ô tìm bài theo từ khóa (không phân biệt dấu, lọc ngay trên trang, hỗ trợ `?q=`); bỏ chữ "Roots" ở tiêu đề lộ trình, nhãn thẻ bài và ghi chú nguồn.
- Timeline Câu chuyện: tiêu đề mỗi mốc đậm, lớn hơn, có vạch nhấn; nhãn mốc thời gian dạng viên thuốc.
- Đội ngũ: biểu tượng Farm Gửi yêu thương vào đất đặt trên nền sáng có viền; nút "Liên hệ đội ngũ" canh giữa.
- Chân trang: biểu tượng tròn; nhóm Hệ sinh thái (Đội ngũ đầu tiên) lên trước, "Gợi ý" xuống cuối. Menu chính cũng xếp Hệ sinh thái, Đội ngũ lên đầu và Gợi ý xuống cuối.
- Cửa hàng (trang không gian): thẻ không gian có màu riêng và vuốt ngang; một bảng điều khiển gồm tìm kiếm rộng, nhóm sản phẩm vuốt ngang kèm số lượng.
- Liên hệ: thêm Hotline và Zalo hỗ trợ 0388000680.
- Tần Số Vàng: không công bố học phí trên trang, thanh báo giá hay dữ liệu có cấu trúc; khách nhận học phí qua tin nhắn (công tắc `showFrequencyFee` trong `src/data/courses.ts`, mức 5,6tr năm 2026 và 6,6tr từ 2027 giữ sẵn để bật lại). Thang tần số ở chặng 1 kéo được qua 5 trạng thái (Co lại → Mở rộng), mỗi trạng thái hiện thân, cảm xúc, suy nghĩ, hành động và một bước nhỏ; dùng được bằng phím mũi tên, không có JavaScript thì hiện đủ 5 trạng thái. Khối giảng viên canh giữa trên điện thoại.
- Bài tản văn: khối "Nguồn và đọc thêm" thành thẻ có ghi chú biên tập và từng nguồn là một thẻ bấm được; "Bài liên quan" dùng thẻ bài có ảnh, nhóm và thời gian đọc.
- Chưa làm: ảnh chân dung nhà khoa học trên trang Tần Số Vàng (không tự lấy ảnh từ internet; chờ ảnh có bản quyền hợp lệ do chủ dự án cung cấp).

## 2.10.0 — Khóa thực hành Tần Số Vàng

- Trang mới `/vi/khoa-thuc-hanh/tan-so-vang/` và `/en/practice-courses/golden-frequency/`: khóa 6 chặng làm chủ năng lượng tần số cao, phong cách trời đêm và ánh vàng theo nhịp ngày/đêm của site.
- Nội dung: năm dạng tần số (Thân, Cảm xúc, Tư duy, Hành động, Tâm thức) kèm điểm tựa nghiên cứu; lợi ích cho mối quan hệ, công việc, sự nghiệp, tài chính; bộ công cụ nâng – giữ – cải thiện; một ngày ở tần số cao; bài tập 7 ngày có ô đánh dấu lưu trên trình duyệt; sáu nhà khoa học (Davidson, Ricard, Fredrickson, Barrett, Dweck, Frankl) có nguồn, minh họa bằng hình sinh tự động thay cho ảnh chân dung; mục “Tần số có đo được không?” nói rõ giới hạn khoa học; phúc lợi sau khóa; 9 câu hỏi đáp.
- Bài tự định vị sáu lĩnh vực (tư duy, cảm xúc, hành vi, lối sống, mối quan hệ, tài chính) vẽ bản đồ radar ngay trên máy người dùng, gợi ý điểm đòn bẩy và có thể gửi kèm yêu cầu báo giá.
- Liên hệ sớm: khối nhận báo giá ngay dưới phần mở đầu (Zalo, gọi điện, biểu mẫu), dải kêu gọi giữa trang, thanh báo giá cố định, biểu mẫu liên hệ nhúng ở cuối trang tự điền chủ đề `tan-so-vang`. Học phí đã xác nhận: 5.600.000 ₫ trong năm 2026, 6.600.000 ₫ từ 01/01/2027 (`frequencyFees` trong `src/data/courses.ts`; trang chọn mức theo năm Việt Nam lúc build, nên cần build lại sau 01/01/2027). Người hỗ trợ học viên: Kiều Mạnh. Hình thức: lớp online 1 tháng, khai giảng hằng tháng.
- Ảnh chia sẻ mạng xã hội 1200×630 riêng cho tiếng Việt và tiếng Anh (`public/media/guidance/tan-so-vang.jpg`, `golden-frequency.jpg`). Trang Khóa thực hành hiển thị khóa mới như thẻ nổi bật. Thêm vào tìm kiếm, sitemap, dữ liệu có cấu trúc Service + FAQ.
- Kiểm thử mới `npm run test:frequency`; biểu mẫu liên hệ nhận chủ đề nhúng qua `data-topic`.

## 2.9.0 — Cửa hàng ba không gian, Tarot dễ đặt lịch, bảo mật

- Cửa hàng: trang tổng quan dẫn vào ba không gian riêng (Thực phẩm sạch, Đá năng lượng, Sách), mỗi không gian có giao diện, bộ lọc và tìm kiếm riêng. Sản phẩm và tồn kho lấy từ Zen Flow Inventory qua `/api/shop-feed` (chỉ hiển thị mục đã xuất bản; lỗi nguồn thì dùng danh mục dự phòng). `/api/shop-stock` và secret `INVENTORY_SITE_TOKEN` không còn dùng.
- Khóa Tarot: nút Zalo ngay đầu trang, ba cam kết ngắn, thanh đặt lịch cố định trên điện thoại, mục "Đặt lịch trong 3 bước", biểu mẫu liên hệ tự điền chủ đề. Ô chi phí hiện "Liên hệ" cho đến khi chủ dự án cung cấp giá (đặt `tarotOffer.price` trong `src/data/courses.ts`). Thêm dữ liệu có cấu trúc Service và FAQ, không công bố giá khi chưa có.
- Bảo mật: Content-Security-Policy sinh khi build (băm SHA-256 cho từng script nội tuyến, chỉ cho phép Turnstile là bên thứ ba), HSTS, Permissions-Policy, COOP, bộ nhớ đệm bất biến cho tệp băm, `security.txt`, tiêu đề chặn cho mọi phản hồi API, hỗ trợ giới hạn tần suất tùy chọn cho form liên hệ.
- Hạ tầng: nâng Astro 6 → 7, vá phụ thuộc (`npm audit`: 0 lỗ hổng). Bộ kiểm tra build kiểm cả CSP và không gian cửa hàng. Sửa các bài kiểm tra trình duyệt Tarot đã lỗi thời.

## 2.8.4 — Đồng bộ lịch sử phiên bản

- Khôi phục mục 2.8.0–2.8.3 bị mất khi gộp nhánh. Các bản 2.7.3–2.7.6 hoàn thành sau 2.8.3 nên được giữ theo thứ tự thời gian.
- Thêm AGENTS.md, cập nhật HANDOFF.md và docs/BRANCHES.md để người hoặc công cụ AI khác (ví dụ ChatGPT/Codex) tiếp tục phát triển.

## 2.7.6 — Liên kết Khóa thực hành

- Khôi phục mục Khóa thực hành và sửa liên kết tới trang Tarot trong danh mục.

## 2.7.5 — Gợi ý và nhãn ba quỹ đạo

- Đổi mục Thực hành thành Gợi ý và chuyển hướng đường dẫn cũ. Bỏ liên kết tìm kiếm ở chân trang và sửa nhãn Thân, Tâm, Trí bị cắt.

## 2.7.4 — Lá rơi khắp màn hình

- Rải lá xuân và lá thu trên toàn chiều ngang của mọi trang, kể cả khi cuộn.

## 2.7.3 — Nhận diện thương hiệu rõ hơn

- Ẩn ảnh núi ở phần mở đầu trên màn hình nhỏ, giữ ảnh đời thực ở phần câu chuyện bên dưới.
- Thay ảnh ba quỹ đạo bằng minh họa riêng cho cây mầm, hoa sen và sách mở; bỏ nút dừng chuyển động trên mọi kích thước màn hình.
- Cấp favicon và biểu tượng cài đặt ứng dụng từ logo Hương Thiền Nature.

## 2.8.3 — Trang Tarot gọn hơn và có mục về AI

- Rút gọn nội dung giới thiệu, lộ trình và tài liệu đọc. Chuyển bài thơ của Hương Thiền vào mục mở rộng cạnh phần giới thiệu người đồng hành.
- Gỡ khối nghiên cứu về tâm linh và cảm nhận cơ thể. Thêm so sánh giữa AI và trao đổi 1:1, với ví dụ về câu hỏi công việc.

## 2.8.2 — Tarot dưới góc nhìn tâm lý học

- Giới thiệu Hương Thiền là người sáng lập và giảng viên thực hành thiền, chánh niệm và thức tỉnh tâm linh.
- Gỡ khối thử câu hỏi với The Magician. Đưa tư liệu gốc ra thành mục riêng, bổ sung công trình của David Bryce Yaden và Lisa Feldman Barrett cùng các đồng tác giả.

## 2.8.1 — Khóa thực hành và điều hướng gọn hơn

- Đổi tên và địa chỉ mục Khóa thực hành ở cả hai ngôn ngữ, chuyển hướng từ địa chỉ cũ.
- Nhóm các nút tìm kiếm, ngôn ngữ và menu thành một cụm trên màn hình nhỏ.
- Thay minh họa Tarot bằng sen và gợn nước, lá bài và đối thoại. Canh giữa trên điện thoại và thêm chuyển động nhẹ theo từng mục.

## 2.8.0 — Trải nghiệm Tarot và ba quỹ đạo

- Thiết kế trang giới thiệu buổi Tarot 1:1 với lộ trình 90 phút, bài thực hành, người hướng dẫn, câu hỏi thường gặp và cách liên hệ. Thêm chuyển động theo từng mục.
- Đổi minh họa Thân, Tâm, Trí và cho ba hành tinh quay liên tục trong vùng nhìn. Ẩn khung ảnh rừng đầu trang khi màn hình dưới 760 px.

## 2.7.2 — Vào thẳng trang chủ

- Hiển thị trang chủ tiếng Việt tại địa chỉ gốc, bỏ trang chuyển hướng trung gian.
- Thêm mandala khi tải chậm và rút gọn nhãn thành Phiên bản.

## 2.7.1 — Ảnh đại diện khóa tarot

- Thêm ảnh Tarot của AlbanyColley trên Pixabay vào danh mục khóa học và bản xem trước khi chia sẻ trang khóa Tarot tiếng Việt và tiếng Anh.

## 2.7.0 — Bốn mùa trong ngày

- Chia bốn mùa thành các khung 6 giờ theo giờ Việt Nam. Thêm nắng xuân, én, lá xanh và mưa phùn, nắng hạ và mưa rào, gió thu và lá vàng, tuyết rơi và đọng tuyết vào mùa đông.
- Giữ hiệu ứng thời tiết nhất quán khi chuyển trang và tôn trọng tùy chọn giảm chuyển động.

## 2.6.3 — Chân trang trên điện thoại

- Sửa chữ bị cắt, tách số phiên bản xuống dòng và phối nền chân trang theo sắc độ chạng vạng.

## 2.6.2 — Nguồn ảnh Sallie Nichols

- Thêm liên kết xem ảnh trên hồ sơ tác giả của Editorial Kairós ở cả hai bản Việt và Anh.

## 2.6.1 — Mạch đọc và lộ trình tarot

- Thay minh họa quỹ đạo ở trang tarot bằng ba bước lắng lại, nhìn hình ảnh và đặt câu hỏi.
- Nối các mốc trong lộ trình 90 phút và hành trình Hương Thiền. Làm rõ lời mời liên hệ cuối trang.
- Trình bày Sallie Nichols bằng thông tin tác phẩm.

## 2.6.0 — Khóa học và nhịp ngày đêm

- Tổ chức Khóa học Việt–Anh, mở rộng bài tarot với 15 phút thiền đầu buổi và minh họa ba quỹ đạo.
- Đồng bộ kiểu chữ và sắc tím mận. Thêm chuyển màu ngày đêm theo giờ Việt Nam.

## 2.5.0 — Khóa hướng dẫn tarot cùng Hương Thiền

- Thêm trang Khóa hướng dẫn Việt–Anh với buổi tự phản tỉnh 1:1, lịch trình 90 phút và nguồn đọc mở rộng.
- Bổ sung màu tím mận, kiểu chữ viết tay hỗ trợ tiếng Việt và phản hồi khi tương tác với nút, menu.

## 2.4.2 — Hành trình kết nối đối tác

- Bổ sung mốc hợp tác với farm Gửi Yêu Thương Vào Đất và vai trò đối tác chiến lược của anh Nguyễn Trần Quyết.
- Bỏ nhóm Kết nối ở chân trang và canh giữa nội dung trên điện thoại.

## 2.4.1 — Trang chủ và chân trang dễ đọc hơn

- Đồng nhất kiểu hiển thị các thẻ Thân, Tâm và Trí. Canh giữa họa tiết trên điện thoại và thêm chuyển động nhẹ.
- Tổ chức lại chân trang, đưa lịch sử phiên bản vào Khám phá và giữ nút mũi tên về đầu trang.
- Bổ sung hồ sơ ZenWork trong mục Đối tác.

## 2.4.0 — Ba quỹ đạo trên trang chủ và bốn mùa

- Đưa ba hướng, mô hình quỹ đạo, tình trạng hoạt động và thư viện ảnh về trang chủ. Viết riêng định hướng hệ sinh thái và thêm hai minh họa chuyển động.
- Chia 12 mốc hành trình thành ba chặng có liên kết nhảy nhanh. Thêm ảnh Pixabay cho khối thực hành và năm bài dài tiếng Việt.
- Tự đổi hiệu ứng theo bốn mùa mỗi giờ, theo giờ Việt Nam. Rút gọn hồ sơ đối tác và ghi công Zenwork.io.vn ở chân trang.

## 2.3.0 — Câu chuyện, thực hành và đội ngũ

- Bổ sung trang song ngữ cho Thực hành, Hệ sinh thái, Câu chuyện và Đội ngũ. Chuyển nội dung chi tiết sang các trang này.
- Viết lại trang chủ thành hành trình từ thiền tập đến bữa cơm, khu vườn và việc học. Dùng họa tiết mandala và ảnh từ dự án.
- Giới thiệu Nguyễn Trần Quyết, Lê Lam Sơn và ZenWork. Gắn nguồn ảnh trên hồ sơ.
- Đồng bộ sitemap, đường dẫn bản dịch, tìm kiếm nội bộ và dữ liệu có cấu trúc cho trang, dự án, tác giả và breadcrumb.

## 2.2.1 — Đọc liền mạch

- Mở các mục nội dung VI/EN, giữ nguyên văn bản và liên kết.
- Dành đủ không gian cho hành tinh, ảnh và menu trên màn hình hẹp. Quỹ đạo tự xoay trong vùng nhìn và có điều khiển tạm dừng.
- Dùng ảnh Hương Thiền bên hồ cho thẻ chia sẻ trang chủ, định dạng JPEG 1200 × 630.

## 2.2.0 — Zen Botanical

- Làm mới trang chủ VI/EN, đặt Thân, Tâm và Trí ngay sau phần mở đầu. Giữ bản đồ quỹ đạo, câu chuyện đầy đủ, album và các liên kết sâu.
- Đồng bộ nền, kiểu chữ, thẻ, form, điều hướng, chân trang và nút nổi. Nhạc nền bắt đầu theo lựa chọn của người nghe trên lượt truy cập mới.
- Cải thiện trải nghiệm đọc, mục lục, ngày bài viết theo dữ liệu và phân công tác giả với người phụ trách giảng dạy.
- Sửa liên kết hỏi sản phẩm để điền sẵn thông tin ở trang Liên hệ, bổ sung trạng thái nguồn tồn kho và làm rõ giá tham khảo.
- Bổ sung tài liệu thiết kế, kiểm toán UX và kiểm thử trình duyệt cho bản phát hành.

## 2.1.0 — Chân trang và lịch sử phiên bản

- Bổ sung timeline phát hành tiếng Việt và tiếng Anh, liên kết từ số phiên bản ở chân trang.
- Sắp xếp liên kết chân trang theo Khám phá, Hệ sinh thái và Kết nối.

## 2.0.6 — Hành trình Hương Thiền và tinh chỉnh giao diện

- Viết lại hành trình của Hương thành sáu mốc rõ ràng, bổ sung bối cảnh và chuyển tiếp giữa các giai đoạn; đồng bộ nội dung tiếng Anh.
- Tinh chỉnh nhịp dọc trang chủ và các điểm tương tác dùng chung: điều hướng, focus bàn phím, chân trang và khoảng cách trên màn hình nhỏ.
- Giữ nguyên các trang chi tiết, nội dung cửa hàng và tính năng hiện có.

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
