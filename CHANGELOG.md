## 2.16.2 — Gỡ lời nhắc số 115, thêm ZenWork vào Hệ sinh thái, sửa thanh chế độ đọc và khoảng cách

- **Gỡ nội dung "Trường hợp khẩn cấp, gọi 115" (và "113 hoặc 115") theo yêu cầu** ở mọi nơi: 5 bài Tản văn (vi/en), khối đồng cảm ở Trang chủ, trang khóa Tần Số Vàng, trang Tarot và Hỏi đáp của khóa. Các câu khuyên tìm đến người thân, bác sĩ hoặc chuyên gia được giữ lại; chỉ bỏ số điện thoại khẩn cấp. Test (`tests/journal.test.ts`) nay kiểm tra không còn số 115.
- **Hệ sinh thái:** thêm thẻ **ZenWork** (zenwork.io.vn) ở mục "Những người đồng hành xung quanh", ghi vai trò công nghệ và truyền thông của hệ sinh thái. Không ghi ngày vì chưa có mốc thời gian được xác nhận.
- **Chế độ đọc:** thanh công cụ trước đây cố định và đè lên đầu bài viết trên điện thoại (thanh hai hàng che tiêu đề); nay nằm trong luồng trang và dính trên cùng khi cuộn, không còn che nội dung.
- **Trang Gợi ý:** ba nút "1 · 2 · 3" không còn dính sát khung bài thực tập bên dưới.
- Không có migration.

## 2.16.1 — Gỡ "Khu vườn của tôi", canh giữa nút Liên hệ ở Trang chủ

- **Gỡ "Khu vườn của tôi" theo yêu cầu:** bỏ mục trên trang Tản văn, nút "Lưu vào khu vườn", thông báo "Tiếp tục từ chỗ cũ", nhãn "Đã lưu" trên thẻ bài và việc ghi nhớ tiến độ đọc. "Một bài viết hữu duyên" nay gợi ý từ tất cả bài. Chế độ "Đọc trong tĩnh lặng" (nền, cỡ chữ) và nút Chia sẻ giữ nguyên; cỡ chữ và nền vẫn nhớ trên thiết bị người đọc.
- **Trang chủ:** nút "Liên hệ" ở khối "Những người đi cùng nhau" được canh giữa (đo trên 390 px và 1280 px).
- Kiểm thử cập nhật (`tests/journal.test.ts`, `tests/tan-van-browser.py`). Không có migration.

## 2.16.0 — Tản văn "Một khoảng lặng giữa dòng đời": trang sách mở, tìm kiếm, Đọc trong tĩnh lặng, Khu vườn của tôi

- **Trang Tản văn thiết kế lại theo hướng tạp chí tĩnh lặng:** phần đầu trang có tiêu đề, câu "Một khoảng lặng giữa dòng đời." và ba đoạn dẫn; bài nổi bật là **"một trang sách mở"** (ảnh, chủ đề, thời gian đọc, tiêu đề, một câu trích nguyên văn từ chính bài, nút đọc; không tự chạy); chip chủ đề có icon nét mảnh (giữ nguyên 6 chủ đề, địa chỉ `?chu-de=` và `?trang=`); thẻ bài viết kiểu tạp chí (3 cột máy tính, 2 cột máy tính bảng, 1 cột điện thoại, viền mảnh, cả thẻ bấm được, chuyển động nhẹ chỉ khi người dùng không tắt hiệu ứng). Số thứ tự trên thẻ được bỏ.
- **Tìm kiếm và sắp xếp trong Tản văn** (v2.14.0 từng bỏ ô tìm kiếm, nay đưa lại theo yêu cầu): tìm theo tên bài, chủ đề, từ khóa và toàn văn (nạp chỉ mục tìm kiếm của site khi người đọc bắt đầu gõ), không phân biệt dấu; gõ một cụm từ thì chỉ hiện bài chứa đúng cụm đó. Sắp xếp: *Bài viết được tuyển chọn* / *Mới nhất* / *Thời gian đọc ngắn*. Trạng thái nằm trên địa chỉ (`?q=`, `?sap-xep=`). Khi không có JavaScript, ô tìm kiếm mở trang tìm kiếm của site.
- **"Một bài viết hữu duyên":** gợi ý ngẫu nhiên một bài, ưu tiên bài chưa mở, có nút "Bài khác"; không bao giờ tự chuyển trang.
- **Trang bài viết:** thêm khối trích dẫn (chỉ dùng câu có nguyên văn trong bài, không gán cho ai khác), "Một khoảng dừng" (ở 4 bài, mỗi bài một lời mời ngắn), dòng kết "Chúc bạn có một ngày đủ bình yên để lắng nghe chính mình.", nút Lưu và Chia sẻ (hộp chia sẻ của hệ thống, hoặc sao chép liên kết chuẩn), bài trước/bài sau, tối đa 3 bài liên quan (ưu tiên bài tác giả đã nối, rồi cùng chủ đề), đường dẫn BreadcrumbList và `articleSection` trong dữ liệu có cấu trúc.
- **Đọc trong tĩnh lặng (chế độ đọc):** chỉ bật khi người đọc bấm; ẩn menu, chân trang, bài liên quan; chỉnh cỡ chữ (5 mức) và nền Sáng / Ngà / Dịu tối; tắt mọi chuyển động trang trí; thoát bằng nút hoặc phím Esc và trả tiêu điểm về nút ban đầu. Cỡ chữ và nền được nhớ trên thiết bị, còn chế độ đọc không tự bật lại. Trình phát nhạc nền duy nhất của site vẫn dùng như cũ.
- **Khu vườn của tôi:** lưu/bỏ lưu bài, "Tiếp tục đọc" (nhớ phần trăm đã đọc, hiện thông báo nhỏ không đẩy trang để quay lại đúng chỗ), danh sách bài đã lưu, xóa lịch sử đọc, xóa toàn bộ dữ liệu trên thiết bị (hỏi lại một lần). Mọi thứ nằm trong `localStorage` của trình duyệt: không tài khoản, không gửi gì về máy chủ (`src/scripts/garden-store.ts`).
- **Ảnh và hiệu năng:** 8 ảnh bìa được đổi (`src/data/article-covers.ts`, ảnh gốc giữ nguyên trên đĩa): 4 bài từng trùng ảnh bìa với bài khác, 2 bài chữa lành có khuôn mặt rõ trên bìa, 2 bài thiên nhiên đổi sang ảnh của chính Hương Thiền; không còn cặp bìa trùng nhau, và ảnh của chính Hương Thiền trên bìa tăng từ 5/21 lên 9/21 bài (43%). Thẻ bài dùng 21 ảnh thu nhỏ 640×400 dưới 100 KB (`public/media/thumbs/`, cắt từ ảnh đã có sẵn trên site). Đo Lighthouse trên điện thoại giả lập, máy cục bộ, trung vị 3 lần: trang Tản văn 93 → 99 điểm, trang bài viết 88 → 99, độ xô lệch bố cục (CLS) 0,147 → 0; trang nhẹ hơn 900 → 456 KB (danh sách) và 365 → 159 KB (bài viết).
- **Sửa lỗi xô lệch bố cục:** menu hiện ra trước khi mã chạy làm trang nhảy 128px trên điện thoại; lớp `js` nay được thêm ngay trong `public/scripts/daylight.js`.
- **Chưa làm (có chủ ý):** Zen Studio CMS chưa có trường trích dẫn/khoảng dừng/bài nổi bật (không đổi hợp đồng API; dữ liệu nằm ở `src/data/article-reflections.ts` và `featuredSlug`); chưa có RSS; chưa thêm ảnh Pixabay mới.
- Kiểm thử: viết lại kiểm tra trang danh sách và bài viết (`tests/journal.test.ts`), thêm `tests/garden.test.ts` (kho lưu cục bộ, `npm run test:garden`) và `tests/tan-van-browser.py` (trình duyệt thật: bố cục 390/820/1440 px, tìm kiếm, sắp xếp, chế độ đọc, lưu, tiếp tục đọc, xóa dữ liệu, riêng tư, axe, không JavaScript), đã đưa vào CI.

## 2.15.2 — Menu điện thoại không còn chạm sát khung tiêu đề

- **Sửa lỗi menu trên điện thoại:** khi mở menu, đường kẻ của danh sách liên kết chạm sát nút đóng (X) và viền nổi bật của nút bị đè; dòng đầu tiên cũng nằm quá gần đường kẻ. Nay có khoảng thở phía trên đường kẻ và phía trên dòng đầu, các mục có lề ngang mềm hơn. Menu dạng thả xuống trên tablet cũng có thêm khoảng đệm phía trên. Đã kiểm tra điện thoại 320 và 390, tablet đứng và ngang.

## 2.15.1 — Thân, Tâm, Trí trở lại vòng quỹ đạo, thêm hotline Kiều Mạnh, đối tác đá năng lượng

- **Trang chủ:** vòng quỹ đạo trở lại với ba hành tinh **Thân, Tâm, Trí** (Thân ứng với môi trường thiên nhiên từ các farm đối tác, Tâm ứng với pháp môn tu tập, Trí ứng với môi trường thực hành, sách vở, đá thanh lọc); **trung tâm đổi thành "Nhận biết"** (EN: Awareness). Ba thẻ bên trên xếp theo thứ tự Thân, Tâm, Trí.
- **Liên hệ:** thêm thẻ Hotline / Zalo hỗ trợ của Kiều Mạnh (0388000680), cùng kiểu thẻ Hotline / Zalo Hương Thiền, mỗi thẻ có nút Gọi ngay và Nhắn Zalo.
- **Gợi ý:** bỏ dòng nhắc số 115 dưới câu trong khối thở; chỉ còn câu của chủ dự án.
- **Cửa hàng · Đá năng lượng:** ghi rõ Đá Quý Kim Tự Tháp là đối tác của Hương Thiền Nature (kimtuthap.vn là website thứ hai của đối tác); bỏ ghi chú chưa xác nhận quan hệ. Bảng giá vẫn là giá niêm yết công khai ngày 24/11/2026, chưa có ảnh.
- Kiểm thử: cập nhật bài kiểm tra Hệ sinh thái (nhãn Thân/Tâm/Trí, trung tâm Nhận biết), Liên hệ (hai số điện thoại), khối thở.

## 2.15.0 — Viết lại Hệ sinh thái quanh ba trọng tâm, giới thiệu hai khóa thực hành ở Trang chủ, bảng giá đá, một số Hotline/Zalo

- **Hệ sinh thái viết lại hoàn toàn** theo nội dung của chủ dự án: hệ sinh thái bao quanh ba trọng tâm (Pháp môn tu tập; Môi trường thiên nhiên từ các farm đối tác; Môi trường thực hành, sách vở, đá thanh lọc), các đối tác xung quanh bổ trợ, và một cuộc sống tỉnh thức, lành mạnh, phụng sự. Mỗi trọng tâm có liên kết tới đúng trang (khóa thực hành, Gợi ý, farm đối tác, Cửa hàng, Tản văn). Thêm dòng lưu ý: đá và vật phẩm hỗ trợ là bạn đồng hành, không thay thế chăm sóc y tế. Mô hình cũ Thân/Tâm/Trí (Farm & Botanicals, Eco-Retreat, Academy) đã bỏ.
- **Trang chủ:** khối hệ sinh thái cải biên theo ba trọng tâm mới (vòng quỹ đạo với ba hành tinh Pháp môn, Thiên nhiên, Hỗ trợ), ngay sau đó là khối **"Hai cách để đi cùng Hương Thiền"** giới thiệu Tần Số Vàng và buổi Tarot 1:1 (ảnh, mô tả, hình thức, nút xem khóa, liên kết so sánh). Mã ở `HomeCourses.astro`.
- **Cửa hàng · Đá năng lượng:** bảng giá tham khảo 14 vật phẩm (vòng tay, vật phẩm góc thiền, đá vụn) lấy từ trang công khai Đá Quý Kim Tự Tháp (kimtuthap.vn), ghi nguồn và ngày lấy 24/11/2026, mỗi dòng có nút hỏi về món đó. Chưa có ảnh vì không tải được ảnh từ website nguồn; sẽ bổ sung ảnh thật khi có. Dữ liệu ở `src/data/partner-stones.ts`.
- **Liên hệ:** gộp Hotline và Zalo thành một thẻ duy nhất với số 0868499856 (nút Gọi ngay, Nhắn Zalo); bỏ cặp số hỗ trợ riêng.
- **Gợi ý:** câu cuối khối thở đổi theo lời chủ dự án ("Nếu thấy chóng mặt, khó chịu, hãy quay về với hơi thở tự nhiên…"), giữ thêm một dòng nhỏ về 115 khi quá tải hoặc khủng hoảng. Chữ ở lối đọc Tản văn và thẻ bài Gợi ý nhẹ hơn (không đậm).
- **Sửa lỗi timeline Câu chuyện trên tablet:** nhãn mốc ("13 tuổi · …") bị kéo cao theo cả khối nên thành hình bầu dục lớn màu tím nhạt; nay chỉ ôm sát chữ. Đã kiểm tra điện thoại, tablet ngang/dọc và máy tính.
- Kiểm thử: cập nhật các bài kiểm tra Hệ sinh thái, tìm kiếm; thêm kiểm tra trang Hệ sinh thái, Liên hệ một số điện thoại, bảng giá đá và lỗi nhãn timeline.

## 2.14.4 — Ba lối đọc Tản văn: bỏ gạch chân, giữ chấm đầu dòng

- Tên bài trong 3 lối đọc không còn gạch chân; giữ chấm tròn vàng đầu dòng, đường kẻ ngăn và chữ đậm. Khi rê chuột hoặc dùng bàn phím, chữ đổi sang màu vàng và có viền focus.

## 2.14.3 — Ba lối đọc trong Tản văn dễ nhận biết từng bài

- Mỗi bài trong 3 lối đọc ("Không biết bắt đầu từ đâu?") có **chấm đầu dòng màu vàng**, **gạch chân vàng** dưới tên bài, đường kẻ mảnh ngăn giữa các bài và vùng bấm rộng hơn; hiện rõ cả khi rê chuột hoặc dùng bàn phím (viền focus).

## 2.14.2 — Trang Gợi ý dễ dùng hơn: thở một phút có hướng dẫn, lối đọc cho người mới

- **Đi nhanh:** ba nút ở đầu trang dẫn tới ba mục (Trở về hơi thở · Bài nên đọc · Phút lắng lại).
- **Trở về với hơi thở:** thêm khối **"Thở cùng nhau một phút"**: vòng sáng nở ra/thu lại theo nhịp hít 4 giây, thở ra 6 giây, có đếm ngược, nút bắt đầu/dừng, đọc được bằng trình đọc màn hình, tôn trọng chế độ giảm chuyển động, kèm lưu ý an toàn và 115. Không có JavaScript thì khối này chỉ hiện phần giải thích, không có nút. Mã ở `BreathGuide.astro` + `src/scripts/breath-guide.ts`.
- **Nên đọc bài nào khi mới tập:** danh sách chữ thành 3 thẻ "Bước 1/2/3" có số, thời gian đọc, mô tả ngắn, bấm cả thẻ để đọc; thẻ riêng "Thấy khó ngồi yên? Điều đó rất bình thường."
- **Những phút lắng lại:** giữ dải ảnh thật; thêm khối cuối trang **"Khi bạn muốn có người đi cùng"** dẫn tới Khóa thực hành và lời nhắn, không ép buộc.
- Kiểm tra: axe sáng/tối, VI/EN, 390px và 1366px không lỗi mới, không tràn ngang.

## 2.14.1 — Tản văn chia trang: lưới 3 × 3, 9 bài mỗi trang

- Trang Tản văn hiện bài theo **lưới 3 cột × 3 hàng (9 bài/trang)** trên máy tính; máy tính bảng 2 cột, điện thoại 1 cột (vẫn 9 bài/trang). Đủ 9 bài thì sang trang mới, có nút Trước / số trang / Sau, trang hiện tại được đánh dấu, bấm chuyển trang sẽ cuộn về đầu danh sách.
- Phân trang chạy cùng bộ lọc chủ đề: chọn chủ đề thì tính lại trang từ trang 1, chủ đề ít hơn 9 bài thì ẩn thanh trang. Dòng đếm cho biết đang xem bài nào ("Đang hiện 1–9/21 bài đọc"). Đường dẫn nhớ trang và chủ đề (`?trang=2&chu-de=...`). Không có JavaScript thì vẫn thấy đủ bài.

## 2.14.0 — Trang chủ đồng cảm, hai khóa thấu hiểu hơn, 5 bài Tản văn mới, lọc Tản văn theo chủ đề

- Trang chủ: lời mở đầu nói thẳng với người mới ghé ("không cần phải ổn, không cần biết thiền") và khối mới **"Bạn không cần phải ổn rồi mới bắt đầu"** ngay sau phần đầu trang: 6 điều người trên hành trình chữa lành hay mang theo (mệt không rõ vì đâu, đầu óc không chịu tắt, đã thử nhiều mà vẫn xa mình, muốn thương mình, đứng trước ngã rẽ, muốn sống chậm), mỗi điều có một câu thấu hiểu và một bước nhỏ để bắt đầu; ba điều có thể mong ở đây (đi theo nhịp riêng, bước nhỏ thật, có người lắng nghe); lời mời nhắn tin và dòng hướng dẫn khi khủng hoảng (115).
- Tần Số Vàng: khối **"Có thể bạn đang ở đây vì…"** (6 khó khăn, mỗi khó khăn dẫn tới đúng phần của khóa giúp được). Tarot tâm lý học: khối **"Những lúc bạn có thể cần một buổi lắng nghe"** (5 tình huống). Dữ liệu ở `src/data/empathy.ts`, giao diện `EmpathyPaths.astro` + `src/styles/empathy.css`.
- Tản văn: 5 bài mới, mỗi bài 1.200–1.300 chữ tiếng Việt, có bản tiếng Anh rút gọn: Chữa lành không phải là trở thành một người khác; Ở lại với một cơn cảm xúc mạnh; Ranh giới mềm; Đi qua mất mát; Niềm vui nhỏ và lòng biết ơn (`src/data/healing-articles.ts`). Ảnh bìa là ảnh thật trong album.
- Ảnh trong bài: 12 tranh minh họa vẽ riêng cho website (SVG vàng ánh tím, `public/media/illustrations/`) cùng ảnh thật từ album; mọi bài (21 bài) có ít nhất 3 ảnh ở cả hai ngôn ngữ (`src/data/article-figures.ts`). Không thêm ảnh Pixabay mới. Ảnh dọc không bị kéo quá cao.
- Trang Tản văn làm lại theo kiểu thư viện của trang Học tập (guiyeuthuongvaodat.com): bỏ ô tìm kiếm từ khóa, thay bằng **6 nhóm chủ đề bấm để lọc** (có số bài, nhớ chủ đề trên đường dẫn `?chu-de=`), khối **"Không biết bắt đầu từ đâu?"** với 3 lối đọc, thẻ bài có số thứ tự, chủ đề, số chữ ước tính và đối tượng; cuối trang có lời mời gửi chủ đề muốn đọc. Không có JavaScript thì vẫn thấy đủ bài.
- Kiểm thử: thêm `npm run test:journal` (độ dài 5 bài mới, mỗi bài ≥ 3 ảnh, tranh SVG an toàn, mỗi bài đúng một chủ đề, khối đồng cảm luôn có hướng dẫn khủng hoảng, trang Tản văn không còn ô tìm kiếm). Kiểm thử nút lên đầu trang không còn lỗi ngẫu nhiên do ảnh tải chậm.

## 2.13.0 — Album ảnh hành trình gặp gỡ và chia sẻ; ảnh thật trên các trang

- Trang mới "Album" (`/vi/album/`, EN `/en/album/`) nằm trên menu giữa Khóa thực hành và Phản hồi học viên: 34 ảnh thật chia sáu nhóm (Gặp gỡ và chia sẻ; Giữa vườn và thiên nhiên, ghi rõ là khu vườn của dự án hợp tác Farm Gửi Yêu Thương Vào Đất cùng anh Lê Lam Sơn; Bên biển; Thiền, Tarot và góc thực hành; Tranh nhỏ trên tường; Những khoảnh khắc nhỏ). Ảnh có trẻ nhỏ và người trong cộng đồng được chủ dự án đồng ý đăng công khai. Ảnh xếp thành hàng, giữ nguyên tỷ lệ gốc, không cắt. Bấm vào ảnh để xem lớn (phóng to có số thứ tự, nút trước/sau, phím mũi tên, vuốt trên điện thoại, Esc để đóng); khi tắt JavaScript, ảnh mở thẳng bản đầy đủ. Có dòng ghi nguồn ảnh và lời mời gửi yêu cầu gỡ ảnh.
- Dữ liệu ở `src/data/album.ts`: mỗi ảnh có nhóm, tỷ lệ, chú thích và mô tả thay thế (alt) song ngữ. Chú thích chỉ mô tả điều nhìn thấy trong ảnh; chỉ ảnh tấm biển sự kiện ghi địa điểm và ngày vì tấm biển có sẵn thông tin đó. Tệp ảnh ở `public/media/journey/` (`<id>.webp` bản đầy đủ và `<id>-640.webp` bản lưới, đã bỏ siêu dữ liệu).
- Dải ảnh thật xuất hiện trên các trang phù hợp: Trang chủ, Câu chuyện (kèm liên kết từ phần album gia đình), Hệ sinh thái (khu vườn Gửi Yêu Thương Vào Đất), Khóa thực hành (cảnh buổi chia sẻ), Tần Số Vàng, Tarot tâm lý học (bộ bài và buổi gặp gỡ) và Gợi ý (những phút lắng lại: ngồi thiền bên biển, góc bàn nhỏ). Mỗi dải có liên kết "Xem toàn bộ album".
- Menu: có 9 mục nên nút ☰ gập menu hiện đến chiều rộng 1279px (trước đây 1199px); từ 1280px menu hiện ngang đầy đủ và không tràn.
- Kiểm thử: thêm `npm run test:album` (id duy nhất, đủ hai tệp ảnh WebP, không có ảnh thừa, chú thích và alt song ngữ, chỉ ảnh banner có ngày, vị trí menu, mọi dải ảnh chỉ dùng ảnh có trong album, trang dựng sẵn có lightbox và liên kết ảnh) và đưa vào CI.

## 2.12.1 — Form lời nhắn dễ dùng hơn; icon cho phản hồi của Kiều Mạnh

- Form "Gửi một lời nhắn": nhãn và tiêu đề theo màu vàng của phong cách mới; ô chọn chủ đề có mũi tên rõ ràng; ô nhập lời nhắn có gợi ý độ dài và bộ đếm ký tự (tối đa 5.000); hiển thị dòng quyền riêng tư đã có sẵn trong nội dung; ô đồng ý nằm trong khung riêng; nút gửi chiếm đủ chiều rộng trên điện thoại. Mã trường, tên và giá trị không đổi, nên kiểm thử form vẫn đạt.
- Phản hồi học viên: thêm icon sen vàng trên ảnh chữ cái đầu của Kiều Mạnh.

## 2.12.0 — Phong cách vàng ánh tím toàn trang, trang Phản hồi học viên, danh mục khóa học mới

Áp dụng ngôn ngữ thiết kế của trang Tần Số Vàng (vàng kim, tím đêm, chữ Dancing Script) cho toàn website, đồng thời làm lại phần danh mục khóa và phần phản hồi học viên.

- Giao diện: lớp `src/styles/gold.css` (nạp trong `BaseLayout.astro`) và các biến màu mới trong `tokens.css` (`--gold-*`, `--plum-*`). Nền sáng ấm hơn, nền đêm chuyển sang tím đêm (`daylight.css`). Nút chính dạng vàng chữ tối, đường kẻ vàng dưới tiêu đề và thanh đầu trang, đầu trang các mục hành trình thành khung tím đêm với tiêu đề chữ vàng, chân trang tím đêm, thanh điều khiển nổi tím/vàng. Mọi màu chữ được quét axe ở chế độ ngày và đêm.
- Trang mới "Phản hồi học viên" (`/vi/phan-hoi-hoc-vien/`, EN `/en/student-feedback/`): chỉ gồm phản hồi của học viên đã đồng ý đăng. Thẻ phản hồi làm lại: ảnh chữ cái đầu, câu trích nổi bật, bấm "Đọc toàn bộ" để xem nguyên văn, ghi rõ người chia sẻ cũng là người hỗ trợ học viên. Mục này nằm trên menu, ngay trước nút Liên hệ.
- Danh mục Khóa thực hành: thẻ khóa học đồng đều hai cột (ảnh, nhãn, mô tả, ba chip thông tin chính, nút xem chi tiết), bảng "Nên chọn khóa nào?" làm gọn, phần phản hồi dạng giới thiệu ngắn kèm liên kết "Xem tất cả phản hồi". Trang Tần Số Vàng và Tarot trỏ tới trang phản hồi mới.
- Kiểm thử: thêm kiểm tra tuyến đường VI/EN của trang phản hồi, vị trí mục menu và việc nạp lớp vàng.

## 2.11.2 — Lời nhắn an toàn và thân thiện hơn; đổi thứ tự chân trang

- Tần Số Vàng: viết lại câu hỏi đáp về giai đoạn khó khăn theo giọng ấm áp hơn. Giữ hướng dẫn an toàn (gọi 115 hoặc cơ sở y tế gần nhất, nhờ người thân ở cạnh, trò chuyện với chuyên gia sức khỏe tâm thần nơi mình sống), và thêm lời mời trao đổi trước với Kiều Mạnh qua số 0388 000 680, không áp lực quyết định ngay. Bản tiếng Anh tương ứng.
- Chân trang: mục "Gợi ý" đứng trước "Phiên bản" trong nhóm Khám phá.

## 2.11.1 — Bổ sung thông tin cho người tham khảo đăng ký

Rà soát hai trang Tarot tâm lý học và Tần Số Vàng từ góc nhìn người sắp đăng ký, bổ sung những gì còn thiếu mà không thêm thông tin chưa được xác nhận.

- Tần Số Vàng: khối "Thông tin khóa học" ngay dưới phần báo giá nhanh (hình thức, thời gian, khai giảng, khối lượng, đầu vào, đồng hành, sau khóa, học phí) kèm danh sách "Bạn nên chuẩn bị"; thêm liên kết "Thông tin khóa học" vào thanh điều hướng nhanh.
- Tần Số Vàng: thêm 4 câu hỏi đáp (chuẩn bị học online, đã thiền nhiều năm, học phí và thanh toán, chọn khóa nào); dữ liệu có cấu trúc FAQPage tự đồng bộ.
- Bảng "Nên chọn khóa nào?" so sánh hai khóa (`src/components/CourseCompare.astro`, dữ liệu `src/data/course-compare.ts`) trên trang Tần Số Vàng, trang Tarot và trang Khóa thực hành.
- Tarot: ô chi phí đổi thành "Báo giá qua tin nhắn" (thay cho "Liên hệ"), ghi chú nhắn Zalo để nhận báo giá; thêm 3 câu hỏi đáp (chưa có câu hỏi rõ ràng, chi phí và thanh toán, chọn Tarot hay Tần Số Vàng).
- Thanh đặt lịch/báo giá cố định trên điện thoại (Tarot, Tần Số Vàng): nút nhạc và nút lên đầu trang nâng theo chiều cao thật của thanh, không còn bị đè khi chữ xuống dòng ở màn hình hẹp hoặc ngôn ngữ dài hơn.
- Sửa lỗi có sẵn: ban ngày, chữ trên thanh đặt lịch/báo giá cố định (Tarot, Tần Số Vàng) bị tối trên nền tối vì thanh nằm ngoài khung chứa bảng màu; thanh nay tự mang bảng màu riêng.
- Kiểm thử: bổ sung test cho khối thông tin và bảng so sánh; cập nhật các kỳ vọng nhãn giá Tarot.
- Tarot: ghi rõ hình thức gặp trực tiếp nếu ở cùng vị trí, online cho bạn ở xa (hỏi đáp, bảng so sánh, bước đặt lịch).
- Mục "Phản hồi học viên" mới ở trang Khóa thực hành (`#student-feedback`, dữ liệu `src/data/student-feedback.ts`), có bản dịch tiếng Anh và ghi rõ người chia sẻ cũng là người hỗ trợ học viên; trang Tarot và Tần Số Vàng chỉ đặt liên kết tới mục này, không chèn đánh giá vào bài.
- Theo xác nhận của chủ dự án: số 0388 000 680 là của Kiều Mạnh (ghi tên ở Liên hệ); thêm giới thiệu chuyên môn của Hương Thiền (bậc thầy về thiền, chánh niệm, duy trì tỉnh thức ở tần số cao) ở hai trang; thêm cam kết bảo mật cho buổi 1:1 và lớp học trong hỏi đáp.
- Chưa có (chờ chủ dự án): số buổi học trực tiếp và nền tảng lớp Tần Số Vàng, sĩ số, chính sách hoàn/dời lịch, thêm phản hồi của các học viên khác.

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
