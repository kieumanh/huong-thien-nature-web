## 2.29.3 — Sửa menu ở 1440px

- Bản 2.29.2 làm trang Hệ sinh thái (vi) rộng hơn màn hình 2px ở 1440px khi dựng bằng font của máy CI (kiểm tra tự động báo lỗi, bản đó đã lên production). Nay: thanh menu rộng tới 1560px từ 1440px (dư chỗ >140px), cỡ chữ lớn hơn chỉ dùng từ 1600px, 1280–1599px giữ cỡ 14px; ở 1280–1439px thu gọn khoảng cách và đệm nút Liên hệ. Đã kiểm tra áp lực với chữ rộng hơn 4%: không mục nào tràn. Gạch chân mục hiện tại và nút Liên hệ giữ nguyên.

## 2.29.2 — Menu máy tính dễ đọc hơn

- Trang đang xem có gạch chân (không chỉ đổi nền nhạt), nhận ra ngay ở chế độ ngày và đêm.
- Cỡ chữ và khoảng cách mục menu tăng dần theo màn hình: 14px ở 1280–1599px, 15,2px từ 1600px, 16px từ 1800px; từ 1600px thanh menu rộng tới 1560px để các mục thoáng hơn.
- Nút "Liên hệ" thành nút viên thuốc nền xanh rừng (chữ sáng, viền nổi khi rê chuột/bàn phím).
- Đã đo ở 1280–2560px, vi/en, nhiều trang: không mục nào xuống dòng, không tràn ngang, khoảng cách tới logo và cụm tìm kiếm ≥ 13px. Chỉ đổi CSS (`global.css`), không đổi nội dung hay thứ tự mục.

## 2.29.1 — Bộ nhận diện theo câu chủ đạo mới; khung riêng cho câu bổ sung

- **Bộ nhận diện đồng bộ** (`brand/`): brand book, hướng dẫn nhanh, bản chiến lược, README, mẫu in, mạng xã hội, văn phòng phẩm, bao bì, ấn phẩm, chữ ký email, mẫu chữ tiếng Việt và trang nội bộ `/living-zen/` đều dùng câu chủ đạo mới "Hiểu mình. Thuận tự nhiên. Sống tự chủ. Cùng trưởng thành." (EN: "Understand yourself. Live with nature. Live self-directed. Grow together."). Logo, màu, font và token không đổi.
- **Bố cục các mẫu**: biển hiệu và bìa Facebook/YouTube thu logo lại và tự co cỡ chữ để không chồng lên logo; bìa Zalo xếp logo phía trên, chữ phía dưới (bản cũ đã có chữ đè lên logo).
- **Triết lý sống**: đoạn "Hương Thiền Nature là hệ sinh thái…" nằm trong một khung riêng, nền ngả vàng nhẹ và viền vàng bên trái, để đọc như phần bổ sung cho đoạn trên. Nội dung chữ không đổi; triết lý vẫn là v1.1.
- Kiểm thử: `npm run test:philosophy` kiểm thêm việc không còn câu cũ trong `brand/` và trang `/living-zen/`, và khung bổ sung có đúng một lần trên trang.

## 2.29.0 — Một câu chủ đạo, một khối Living Zen, Triết lý sống v1.1 (đủ mười ví dụ)

- **Câu chủ đạo của website** (chủ dự án chọn): "Hiểu mình. Thuận tự nhiên. Sống tự chủ. Cùng trưởng thành." thay cho "Từ thiên nhiên, trở về với chính mình." ở Trang chủ, trang Hệ sinh thái và trang Triết lý. Nguồn duy nhất: `src/data/living-zen.ts` (`tagline`) cho hai trang đầu, `philosophyTagline` cho trang Triết lý (cùng một câu). Chữ nhỏ phía trên tiêu đề hero trang Hệ sinh thái đổi thành "Cùng trưởng thành" để khỏi trùng câu.
- **Gộp hai khối Living Zen thành một**: khối "Tụi mình không phải là…" và các thẻ ba tầng riêng ở trang Hệ sinh thái bị bỏ (`.lz-tiles`, `.lz-not-line`); phần "những điều chúng mình chọn không làm" đã có đầy đủ ở trang Triết lý nên không lặp ở hai nơi. `LivingZenValues.astro` còn một khối: câu chủ đạo, một đoạn dẫn, ba lời hứa (chỉ Trang chủ), ba tầng dạng nhãn nhỏ và liên kết "Khám phá triết lý sống". Trang Hệ sinh thái dùng biến thể `compact` (không lặp ba lời hứa). Khối `PhilosophyPointer.astro` của 2.28.0 ở Trang chủ bị xóa vì trùng khối này.
- **Bỏ câu "đang học hỏi tại Farm Lê Lam Sơn"** khỏi phần "Vì sao là hệ sinh thái" (`ecosystem-why.ts`): Hương Thiền Nature đã nhận ra giá trị vườn rừng đa tầng trước khi đến Farm, nên đoạn dẫn kết thúc ở "Hương Thiền Nature chọn cách thứ hai." Các câu khác về Farm (ảnh và lời giới thiệu về buổi làm việc cùng Lê Lam Sơn) là sự việc có thật và được giữ nguyên.
- **Living Zen Philosophy v1.1** (27/11/2026): cả mười giá trị đều có "ví dụ có thật". Bốn ví dụ mới, mỗi ví dụ chỉ dựa trên điều kiểm chứng được trong mã nguồn: 02 Chủ quyền nội tâm (bài hướng dẫn thở một phút ở trang Gợi ý, không cần tài khoản); 04 Sống trong tương liên (trang Hệ sinh thái cho thấy ba trọng tâm và các đối tác nâng đỡ nhau); 07 Sáng tạo có chánh niệm (không quảng cáo; nhạc nền chỉ phát khi bạn bật; giảm chuyển động thì hình động dừng; lựa chọn chỉ lưu trên thiết bị của bạn; không có liên kết kèm theo); 10 Tự do khỏi chấp trước (chính triết lý có số phiên bản, lịch sử thay đổi và rà soát mỗi năm; liên kết tới `#ph-history`). `PhilosophyTarget` có thêm `ecosystem` và `history`; ví dụ có thể không có liên kết.
- Chữ bổ sung ở trang Triết lý theo nội dung gộp từ Hệ sinh thái: ba điều Living Zen không phải (không huyền bí, không chỉ bán khóa học, không phải thương hiệu sản phẩm đơn lẻ) ở phần "Vì sao"; thêm cam kết với người học: không phán xét người chưa thực hành. Lịch sử thay đổi `changelog` có mục v1.1 (nội dung, lý do, tác động) đủ vi/en. Rà soát tiếp theo vẫn là 11/2027.
- Kiểm thử: `tests/philosophy.test.ts` cập nhật (v1.1, mười ví dụ, câu chủ đạo ở ba trang và không còn câu cũ, Hệ sinh thái chỉ một khối `lz-values`, không còn "Tụi mình không phải là" và câu về Farm, Trang chủ không còn khối con trỏ).
- **Chưa đổi (cố ý)**: bộ nhận diện `brand/` (brand book, hướng dẫn nhanh, bộ mẫu) và trang nội bộ `/living-zen/` (noindex) vẫn ghi câu cũ "Từ thiên nhiên, trở về với chính mình."; dựng lại bộ brand khi chủ dự án yêu cầu.

## 2.28.0 — Trang "Triết lý sống" (Living Zen Philosophy v1.0); Album chuyển xuống Khám phá

- **Trang mới "Triết lý sống"** (`/vi/triet-ly/`, `/en/philosophy/`), đặt trên menu ngay sau "Câu chuyện". Là một mục hành trình mới (`journeyPages.philosophy`) nên tự vào route, sitemap, hreflang, tìm kiếm và `audit:build`. Gồm 11 phần: Hero; Vì sao Living Zen ra đời; Tuyên ngôn; Mô hình ba tầng quanh "Tỉnh thức" (kèm liên hệ với Thân – Tâm – Trí, nói một lần); Mười giá trị (mỗi giá trị là một khối mở/đóng bằng `<details>`: triết lý, ứng dụng thực tế, cam kết, câu hỏi chiêm nghiệm, ví dụ có thật nếu có, bài liên quan); Những điều chúng mình lựa chọn không làm (8 điều); Từ triết lý đến đời sống (6 lĩnh vực, chỉ liên kết tới nơi có thật); Cam kết với cộng đồng (7 nhóm, viết là định hướng, không phải thành tích); Bài viết đi cùng Living Zen; Một triết lý đang trưởng thành (phiên bản, ngày, lịch sử thay đổi, kênh góp ý); Phần kết (không kêu gọi mua bán).
- **Một nguồn dữ liệu**: `src/data/philosophy.ts` (mười giá trị đủ vi/en, ba tầng, chữ trang, phiên bản, lịch sử thay đổi) và `src/data/philosophy-links.ts` (đích liên kết). Không có cơ sở dữ liệu, không thư viện mới, không tracker.
- **Năm hình minh họa động** bằng SVG + CSS (không SMIL, tắt khi giảm chuyển động): phong cảnh hero (mặt trời/mặt trăng, cây đung đưa, lá rơi, gợn nước), "những chấm rải rác lắng thành một đường", ba vòng sinh trưởng quanh "Tỉnh thức" (bấm tầng để xem; mọi chữ vẫn hiện khi không có JavaScript), cây từ rễ đến sáu lĩnh vực, vòng sinh trưởng của phiên bản. Ban đêm có bảng màu riêng. Lồng thêm ảnh thật từ album: `pink-lotus`, dải bốn ảnh (`seedling-coconut-shell`, `beach-meditate-calm`, `cabbage-rows-red-soil`, `altar-flowers`), `stepping-stones-lawn`.
- **Tích hợp**: khối nhỏ "Tinh thần Living Zen" ở Trang chủ (`PhilosophyPointer.astro`, chỉ nêu ba tầng, không liệt kê mười giá trị) kèm liên kết "Khám phá triết lý sống"; một dòng nối ở trang Câu chuyện (không viết lại lịch sử); tìm kiếm có bản ghi trang và 10 bản ghi giá trị (`#slug`), ảnh thu nhỏ `page-philosophy.webp`; footer nhóm Hệ sinh thái có "Triết lý sống".
- **Album**: bỏ khỏi menu đầu trang; footer nhóm Khám phá có "Album" ngay trên "Phiên bản". Vì chữ "Triết lý sống" dài hơn "Album", đã thu nhẹ khoảng cách menu ở 1280–1439px (`global.css`) để không tràn.
- **Living Zen Series** chỉ là dữ liệu kế hoạch (`livingZenSeries`, trạng thái `planned`, 10 tiêu đề), không hiển thị, không lập chỉ mục, không xuất bản. **Living Zen Index** là tài liệu nội bộ `docs/living-zen-index.md` (10 tiêu chí 0–10, thang điểm, "Chưa đủ dữ liệu", rào chắn đạo đức, hiến chương phiên bản). Chưa làm công cụ tương tác.
- **Phiên bản triết lý độc lập với phiên bản website**: Living Zen Philosophy v1.0 (27/11/2026), rà soát mỗi năm một lần (lần tới 11/2027). Mọi thay đổi về bản chất phải ghi nội dung, lý do, ngày, tác động.
- Sửa lỗi bố cục khi dựng: lưới của mỗi phần dùng `minmax(0, 1fr)` để không tràn ngang ở 320–414px.
- Kiểm thử mới: `tests/philosophy.test.ts` (`npm run test:philosophy`, đã thêm vào CI): mười giá trị đủ hai ngôn ngữ, ba tầng 3/3/4, liên kết và bài liên quan có thật, không chữ giữ chỗ và không Linux, Series không bị hiển thị, đủ các phần, một h1, không SMIL, vị trí menu/footer, sitemap, tìm kiếm, Trang chủ không liệt kê đủ mười giá trị. `tests/search.test.ts` cập nhật số bản ghi (thêm 10 giá trị).

## 2.27.1 — "Vì sao là hệ sinh thái": viết lại theo khái niệm vườn rừng đa tầng, vẽ lại hình động

- **Viết lại nội dung** (`src/data/ecosystem-why.ts`): Linux chỉ là cách chủ dự án chỉ ra sự tương tự, nên không còn nhắc đến Linux trên trang. Phần chữ dựa trên chính khái niệm: mô hình đồng nhất (một hệ thống thống nhất, dễ quản lý tập trung nhưng ít đa dạng) so với mô hình hệ sinh thái (nhiều tầng, nhiều thành phần, tương tác và phát triển dựa trên nền tảng chung), như vườn rừng đa tầng đang học hỏi tại Farm Lê Lam Sơn. Hai câu mô tả dùng nguyên văn của chủ dự án.
- Ba lý do Hương Thiền Nature chọn hướng hệ sinh thái: chung một nền (sống tỉnh thức, lành mạnh và phụng sự), nhiều lối để thích nghi, lan tỏa như hạt giống. Dòng cuối nói rằng đa dạng vẫn cần chăm sóc và quản trị để các tầng không lấn nhau.
- **Vẽ lại hình minh họa** (`EcosystemWhy.astro`, SVG nội tuyến + CSS keyframes, không SMIL), khung 4:3 mỗi bên. Bên trái, mô hình đồng nhất: ba cây giống hệt nhau cùng một tầm cao (có vạch nét đứt), rễ không nối, hạt rơi chỉ nằm lại dưới gốc, màu nhạt và lặng. Bên phải, vườn rừng đa tầng: tán cao, tán giữa, tầng thấp, cây chuối, mầm non; ánh nắng len qua từng tầng; mạng sợi vàng nối rễ với ánh sáng chạy dọc; hạt giống bay từ tán cây xuống mọc thành mầm mới ở xa; bướm và bụi sáng bay nhẹ. Ban đêm hiện trăng và sao.
- Giảm chuyển động: hình đứng yên, mầm đã lớn, không có hạt bay, ánh sáng chạy hay bướm.
- Ngân sách chữ trang Hệ sinh thái giữ ở mức 2.27.0 (vi 980, en 820); bài kiểm tra mới yêu cầu hai nhãn mô hình, cụm "vườn rừng" và không có chữ Linux.

## 2.27.0 — Trang Hệ sinh thái: vì sao là hệ sinh thái (so sánh với Linux), kèm hình động

- **Phần mới "Vì sao là hệ sinh thái"** (`#why-ecosystem`) đặt trên trang Hệ sinh thái, ngay sau vòng lặp "eco-loop" và trước khối Living Zen. Chọn trang Hệ sinh thái thay vì Trang chủ vì đây là nơi giải thích ý nghĩa; Trang chủ đã dày và có ngân sách chữ chặt. Nội dung mượn hình ảnh Linux mã nguồn mở (nhiều cộng đồng cùng xây trên một nền chung) để giải thích vì sao Hương Thiền Nature lan tỏa theo kiểu hệ sinh thái chứ không theo kiểu một cây đơn lẻ.
- **Hình minh họa động** `EcosystemWhy.astro` (SVG nội tuyến + CSS keyframes, không SMIL): bên trái một cây đơn lẻ với rễ ngắn, hạt chỉ rơi quanh gốc; bên phải một khu vườn nhiều tầng, rễ nối nhau, xung dinh dưỡng chạy dọc rễ, hạt giống bay từ tán cây lớn xuống rồi mọc thành mầm mới. Cây đung đưa rất nhẹ. Bật giảm chuyển động thì cây đứng yên, mầm đã lớn, không có hạt bay hay xung chạy. Màu sáng/tối đều đọc được.
- Ba ý ngắn bên dưới: "Chung một nền", "Mỗi nơi một vai", "Lan tỏa như hạt giống", cùng một dòng lưu ý rằng đa dạng vẫn cần người chăm sóc để giữ đúng tinh thần chung. Không hứa hẹn kết quả, không nói về cách làm cụ thể của farm, không lặp Thân/Tâm/Trí.
- Dữ liệu chữ song ngữ ở `src/data/ecosystem-why.ts` (và được lập chỉ mục tìm kiếm trong `src/data/search.ts`).
- Nâng ngân sách chữ trang Hệ sinh thái trong `tests/landing.test.mjs`: vi 900 → 980, en 760 → 820. Thêm hai bài kiểm tra cho phần mới (nội dung, hai khung so sánh, ba ý, chỉ có ở trang Hệ sinh thái; CSS keyframes, giảm chuyển động).

## 2.26.6 — Phần kết Hệ sinh thái: ảnh nghỉ chân dưới hàng dừa

- Đổi ảnh phần kết sang `beach-palms` (1280 × 960, 4:3): người phụ nữ mỉm cười dưới hàng dừa, em bé đang ăn bên cạnh. Ảnh thể hiện sự bình an và hạnh phúc đơn giản, và giữ đúng tỷ lệ gốc nên không bị cắt.
- Ảnh có trẻ nhỏ: album ghi nhận chủ dự án đã đồng ý đăng ảnh trẻ em và người trong cộng đồng (24/11/2026).
- Thay `beach-meditate-smile` (2.26.5). Hai ảnh này vẫn còn trong album.

## 2.26.5 — Phần kết Hệ sinh thái: ảnh ngồi thiền bên biển

- Đổi ảnh phần kết sang `beach-meditate-smile` (870 × 656, tỷ lệ 4:3): một người ngồi xếp bằng trên bãi cát, hai tay mở trên gối và mỉm cười. Khung `.eco-closing__art` giữ đúng tỷ lệ ảnh (4:3) thay vì 16:9.
- Ảnh chắp tay `prayer-hands-seashore` không còn dùng ở đây (vẫn còn trong album).

## 2.26.4 — Phần kết Hệ sinh thái dùng ảnh thật ngang

- **Thay minh họa tự vẽ (2.26.3) bằng ảnh thật** trong album: `prayer-hands-seashore` (1280 × 720), chắp tay bên bờ biển đá, sóng nhẹ và dãy núi phía xa. Khung `.eco-closing__art` giữ tỷ lệ 16:9, bo góc, tối đa 44rem.
- Gỡ `public/media/illustrations/eco-closing-horizon.svg` và phần mô tả đi kèm.
- Ảnh lấy từ `AlbumImage`, nên alt song ngữ và tải ảnh thu nhỏ theo `srcset` như các khối khác.

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

