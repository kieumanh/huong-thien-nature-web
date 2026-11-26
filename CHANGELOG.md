## 2.26.3 — Trang Hệ sinh thái: ảnh ngang tự vẽ thay ảnh đứng

- **Khối kết trang Hệ sinh thái** đổi ảnh hoa sen đứng sang một minh họa ngang tự vẽ, `public/media/illustrations/eco-closing-horizon.svg` (1200 × 600): một buổi chiều yên ắng bên hồ, cây xanh bên bờ (Thân), mặt nước lặng với vòng sóng nhẹ (Tâm), mặt trời dịu phía chân trời (Trí). Chỉ vẽ phẳng, ba lớp màu xanh – vàng nhạt, không chữ, không họa tiết thừa.
- Chuyển động chỉ bằng CSS (vòng sóng lan nhẹ, mặt trời thở chậm); tắt khi bật giảm chuyển động. Chú thích alt song ngữ mô tả hình.
- CSS: `.eco-closing__art` (khung ngang, bo góc, tối đa 44rem) thay `.eco-closing__photo`.

## 2.26.2 — Hero Trang chủ: một ảnh tĩnh, gọn và dễ cảm nhận

- **Bỏ slide ảnh tự chuyển** ở đầu Trang chủ (và nút tạm dừng, các chấm chọn ảnh đi kèm). Đã xóa `HeroSlides.astro`, `src/scripts/hero-slides.ts`, `heroPhotos` và cờ `hero: true` trong `src/data/album.ts`.
- **Bỏ họa tiết quanh ảnh:** hai ảnh tròn nhỏ, hai chiếc lá bay, vòng thở "Hít vào/Thở ra" và đường viền vòm phía sau. Hero còn đúng một ảnh hoàng hôn trên lối đá (`sunset-lake-path`) trong khung vòm, đổ bóng nhẹ, cỡ ảnh đồng nhất trên điện thoại, máy tính bảng và máy tính (`landing.css`: `.landing-hero__art`). Vòng thở vẫn còn ở khối thực hành phía dưới.
- **Kiểm thử:** `landing.test.mjs` và `nav-search-browser.py` kiểm tra hero chỉ có một ảnh và không còn slide hay họa tiết.

## 2.26.1 — Trang 404 song ngữ thật, Những người đồng hành canh giữa

- **Trang 404 hai ngôn ngữ:** mỗi ngôn ngữ có một trang riêng, gồm tiêu đề, menu, chân trang và liên kết về trang chủ đúng ngôn ngữ. `src/pages/404.astro` (tiếng Việt) và `src/pages/en/404.astro` (tiếng Anh) cùng dựng từ `src/components/NotFoundPage.astro`. Host trả về `404.html` gần nhất theo thư mục, nên địa chỉ `/en/…` sai hiện bản tiếng Anh. Bỏ cơ chế đổi ngôn ngữ bằng script.
- **Những người đồng hành (Hệ sinh thái):** tiêu đề bỏ chữ "xung quanh" (tiếng Anh: "Our companions on the path"). Ba thẻ luôn canh giữa trên mọi thiết bị: một cột trên điện thoại, hai thẻ một hàng và thẻ thứ ba canh giữa trên máy tính bảng, ba thẻ một hàng trên máy tính (`journey-pages.css`, bố cục flex).
- **Kiểm thử:** `home-discovery.test.mjs` kiểm tra hai trang 404; `nav-search-browser.py` mở `/en/404` và `/vi/…` để xác nhận ngôn ngữ, menu và nút về trang chủ.

## 2.26.0 — Tìm kiếm ngay trên menu, 404 động, slide hero, chỉnh Trang chủ

- **Tìm kiếm trên thanh menu:** bấm kính lúp, một thanh tìm kiếm mở rộng từ phải sang trái ngay trên menu, kết quả hiện ngay bên dưới (6 kết quả đầu, gợi ý từ khóa khi chưa gõ, nút "Xem tất cả kết quả"). Không phải rời trang. Phím `/` mở nhanh, Esc đóng, mũi tên lên xuống chọn kết quả, Enter mở trang tìm kiếm đầy đủ. Không có JavaScript thì kính lúp vẫn là liên kết tới trang tìm kiếm. Mã: `src/scripts/nav-search.ts`, kiểu ở cuối `global.css`.
- **Trang 404 mới** (`src/pages/404.astro`): số 404 với vòng thở ở giữa, lá rơi nhẹ, hai ngôn ngữ (hiện theo địa chỉ /en/ hoặc còn lại), nút Về trang chủ, nút Quay lại trang trước (chỉ hiện khi người đọc đến từ trang khác của site), gợi ý bốn nơi để ghé.
- **Slide hero Trang chủ** (`HeroSlides.astro`, `hero-slides.ts`): đổi ảnh mờ dần mỗi 6 giây, lấy từ các ảnh trong album được đánh dấu `hero: true` trong `src/data/album.ts` (hiện 8 ảnh; đánh dấu thêm ảnh để thêm slide). Ảnh đầu tải ngay, ảnh sau chỉ tải trước khi hiện. Có nút tạm dừng và chấm chọn ảnh; dừng khi chuột/bàn phím đang ở trên slide hoặc tab bị ẩn; không tự chạy khi bật giảm chuyển động hoặc tiết kiệm dữ liệu.
- **Trang chủ:** gỡ khối "Hôm nay bạn muốn đọc gì?" (tìm kiếm đã có trên menu, ba bài gợi ý trùng với "Có thể bạn đang…") và thay bằng lối vào Cửa hàng (thực phẩm sạch, đá năng lượng, sách; `HomeShop.astro`). Ba hành tinh Thân – Tâm – Trí chuyển lên đầu phần Hệ sinh thái, trước ba thẻ. Icon ngôi nhà ở lời mời cuối trang được căn giữa (cùng chữ và nút) trên điện thoại. Nhãn "Hít vào/Thở ra" của vòng thở luôn đọc được trong chế độ đêm.
- **Tản văn:** ảnh bìa bài "Thiền tâm từ cho người mới" cắt lại để thấy đủ khuôn mặt (thu nhỏ dùng chung cho mọi giao diện).
- **Kiểm thử:** `tests/nav-search-browser.py` (mới, vào CI), cập nhật `home-discovery.test.mjs` và `landing.test.mjs`; `tan-van-browser.py` chọn đúng biểu mẫu tìm kiếm của trang Tản văn (nay có thêm biểu mẫu trên menu).

## 2.25.1 — Tần Số Vàng: dữ liệu giá đúng cả sau Tết, không cần build lại

- Dữ liệu có cấu trúc (JSON-LD) của trang Tần Số Vàng nay liệt kê cả hai mức: 5.600.000 ₫ hiệu lực đến 05/02/2027 và 6.600.000 ₫ hiệu lực từ 06/02/2027 (`validFrom`). Sau Tết dữ liệu vẫn đúng mà không phải build lại. Chữ hiển thị trên trang vẫn tự đổi sang 6,6 triệu nhờ đồng hồ đếm ngược như trước.
- Cập nhật `tests/frequency.test.ts`.

## 2.25.0 — Trang chủ và Hệ sinh thái dựng lại theo phong cách landing page

- **Ít chữ, nhiều khoảng thở, nhiều ảnh.** Trang chủ giảm từ khoảng 1.840 xuống 1.190 chữ (vi) và Hệ sinh thái từ khoảng 1.100 xuống 760 chữ; số ảnh thật trên Hệ sinh thái tăng từ 4 lên 14. Mỗi khối chỉ giữ một ý chính, phần còn lại nằm sau đường dẫn.
- **Trang chủ** mở bằng một khung vòm có ảnh thật, hai vòng tròn nhỏ và một vòng thở chuyển động ("Hít vào / Thở ra", 4 giây vào, 6 giây ra). Khối "Có thể bạn đang…" gọn thành sáu ô cảm xúc có icon, mỗi ô dẫn tới một bước nhỏ. Các phần Câu chuyện, Ba trọng tâm, Khóa thực hành, Gợi ý, Tản văn và lời mời cuối trang đều ngắn lại và có ảnh.
- **Hệ sinh thái** mở bằng ba vòm Thân – Tâm – Trí, mỗi trọng tâm một hàng ảnh lớn kèm một dòng ngắn; lời của chủ dự án giữ nguyên đầy đủ trong dữ liệu (và trong tìm kiếm), trang chỉ hiển thị bản rút gọn (`short`), cùng ý với thẻ ở Trang chủ. Đối tác rút còn tên, dự án, phần hỗ trợ và đường dẫn.
- **Icon chuyển động mới** (`AnimatedIcon.astro`, `animated-icons.css`): hơi thở, lá, mầm, tim, sóng, lối đi, la bàn, hoa sen, mặt trời, ngôi nhà, sách, đá, trò chuyện, đôi tay. Chỉ dùng CSS, luôn `aria-hidden`, tắt khi bật giảm chuyển động. Các khối hiện dần khi cuộn tới (`landing-motion.ts`), không chạy khi giảm chuyển động hoặc bật tiết kiệm dữ liệu.
- **Album:** thêm 17 ảnh mới (nhóm mới "Thiên nhiên"); album có 51 ảnh. Đã loại 3 ảnh trùng (2449 và 2445 trùng hệt ảnh đã có, 304 gần như trùng 293). 11 ảnh còn lại được đặt thêm vào Liên hệ, Thực phẩm sạch và Quỹ ủng hộ.
- **Kiểm thử:** thêm `tests/landing.test.mjs` (ngân sách chữ, số ảnh, icon, alt và kích thước ảnh); sửa `zen-botanical-browser.py` theo hero mới; vá lỗi tràn ngang 3–6px trên điện thoại do chiếc lá trang trí.

## 2.24.5 — Hệ sinh thái: bỏ phần lặp Thân – Tâm – Trí

- **Trang Hệ sinh thái** kể Thân – Tâm – Trí bốn lần (ba trọng tâm, ba thẻ phẩm chất Living Zen, ba thẻ "không gian", vòng "nuôi nhau"). Nay chỉ còn ba trọng tâm (lời của chủ dự án, có đường dẫn) và vòng "Ba trọng tâm nuôi nhau" đặt ngay dưới chúng.
- **Icon chuyển động** (hạt giống, thiền, ánh sáng trong trí) chuyển vào huy hiệu của ba thẻ trọng tâm, thay cho số 1, 2, 3; thành phần dùng chung `PillarIcon.astro`. Vẫn tắt khi bật giảm chuyển động.
- **Khối Living Zen** trên trang này chỉ còn các sợi đan, "tụi mình không phải là" và lời hứa; lời dẫn viết lại nối với ba trọng tâm ở trên. Bỏ phần màu sắc từng không gian (thông tin của bộ nhận diện, không dành cho người đọc).

## 2.24.4 — Trang chủ: bỏ phần lặp Thân – Tâm – Trí

- **Trang chủ:** Thân – Tâm – Trí trước đây xuất hiện ba lần (khối Living Zen, khối "Ba trọng tâm" và vòng quỹ đạo). Nay chỉ còn ở phần Hệ sinh thái (lời của chủ dự án, có đường dẫn tới farm, khóa thực hành và đá).
- **Khối Living Zen ở đầu trang** được viết lại thành "ba điều tụi mình luôn giữ": nói rõ từng điều, không hứa quá lời, mời bằng sự tử tế. Ý lấy từ các cam kết đã có trong bộ nhận diện, không thêm cam kết mới. Ba thẻ thẳng hàng, không có thanh màu bên trái.
- Trang Hệ sinh thái giữ nguyên (vẫn có ba phẩm chất có icon chuyển động).

## 2.24.3 — Số hỗ trợ ở Tarot, icon Thân là hạt giống, trích dẫn Tarot

- **Tarot:** các nút Zalo và đặt lịch chuyển sang số hỗ trợ 0388 000 680 (Kiều Mạnh), đồng bộ với Tần Số Vàng. Trang Liên hệ giữ hai thẻ như cũ.
- **Thân:** icon là hạt giống từ bộ icon thương hiệu, thay cho icon cây; chuyển động nhẹ, căn giữa khung.
- **Trích dẫn ví dụ ở trang Tarot:** chữ không còn sát lằn tím bên trái (đã rà 29 trang có trích dẫn ở màn 390px và 1280px; chỉ khối này bị).
- **Chế độ đọc Tối ban ngày:** nút nhạc và nút đầu trang có nền tối riêng, chữ kem không còn chìm trên nền sáng (trước đây tương phản 1,19:1; CI chỉ bắt được lỗi này khi chạy vào ban ngày).

## 2.24.2 — Living Zen: căn mô tả, icon chuyển động

- **Thân – Tâm – Trí:** phần mô tả của ba khung nằm thẳng hàng với nhau, kể cả khi tiêu đề TÂM dài hai dòng (dùng subgrid; trình duyệt cũ hơn dùng phương án dự phòng, tiêu đề có chiều cao tối thiểu hai dòng).
- **Bỏ thanh màu bên trái** của các khung.
- **Icon mới, có chuyển động nhẹ:** cây đung đưa theo gió, người ngồi thiền thở chậm, bóng đèn trí tuệ sáng dần. Icon nằm giữa khung. Chuyển động tắt khi thiết bị bật chế độ giảm chuyển động.

## 2.24.1 — Living Zen và Tần Số Vàng: tinh chỉnh giao diện và nội dung

- **Hành trình, 28 tuổi:** viết lại đoạn "Dành thời gian tìm hiểu về nỗi khổ" (VI và EN), giữ nguyên các chi tiết đã có, không thêm sự kiện mới.
- **Phản hồi học viên:** bỏ đường kẻ tím của kiểu trích dẫn chung đang đè lên chữ trong thẻ của Kiều Mạnh.
- **Thân – Tâm – Trí:** icon thương hiệu có sẵn trong `brand/icons/brand`: cây (THÂN), người ngồi thiền (TÂM), ánh sáng trong trí (TRÍ).
- **Chân trang:** lựa chọn giao diện thu gọn thành một khung nhỏ, dễ chạm trên điện thoại.
- **Tần Số Vàng:** khung "Muốn biết lịch khai giảng gần nhất?" chuyển sang nền tối ánh vàng, bớt chói khi đọc ban đêm; thêm ảnh "Chắp tay chào nhau" để lấp khoảng trống trong phần khoảnh khắc; đường kẻ của lịch sinh hoạt căn thẳng với icon trên điện thoại và máy tính bảng; các nút liên hệ trên trang dùng hỗ trợ Kiều Mạnh 0388.000.680 (gọi và Zalo).
- **Gỡ mục** "Buổi gặp lại sau 30 ngày" (VI và EN); còn 5 mục hỗ trợ sau khóa.
- Trang Tarot và trang Liên hệ vẫn dùng số hotline 0868 499 856 như trước.

## 2.24.0 — Living Zen 2.0: bộ nhận diện thương hiệu mới

- **Điểm neo:** trước khi thay đổi, mã nguồn 2.23.0 được giữ ở nhánh `anchor/2026-11-26-v2.23.0` (cách quay lại: `brand/releases/deploy-and-rollback.md`).
- **Bộ nhận diện độc lập** trong thư mục `brand/`: kiểm kê, chiến lược, 3 phương án logo vector (đề xuất A · Living Roots, chưa thay trên web), hệ màu, chữ, token ba tầng, 36 icon, 46 họa tiết, 75 mẫu ứng dụng (mạng xã hội, văn phòng phẩm, ấn phẩm, giáo dục, bao bì, không gian, quà tặng, video), Brand Book và Quick Guide PDF. Tái tạo bằng `brand/scripts/`.
- **Màu có thứ bậc:** nút chính xanh rừng, nút phụ kem, vàng kim chỉ cho nút đặc biệt và trang Tần Số Vàng; bỏ gạch vàng dưới mọi tiêu đề và nền vàng của thẻ. Footer xanh rừng ban ngày, tím đêm ban đêm. Đầu trang hành trình dùng giấy mộc ban ngày, giữ bầu trời tím ban đêm.
- **Chữ:** thêm Lora (tự lưu trữ, SIL OFL) cho tiêu đề và biên tập.
- **Giao diện theo lựa chọn:** cuối trang có ô chọn theo giờ / luôn sáng / luôn tối / theo hệ điều hành, lưu trong trình duyệt.
- **Nội dung:** khối "Living Zen" trên Trang chủ (Thân – Tâm – Trí: gốc rễ trong đất, khoảng lặng trong tâm, ánh sáng trong trí) và phần đầy đủ trên trang Hệ sinh thái.
- **Trang nội bộ** `/living-zen/` xem trước hệ thống thiết kế (noindex, ngoài menu và sitemap).

