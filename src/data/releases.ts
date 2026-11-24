import type { Language } from './site.ts';

export const releasesPath = (lang: Language) => lang === 'vi' ? '/vi/phien-ban/' : '/en/versions/';

export const releaseTitle = {
  vi: 'Phiên bản',
  en: 'Versions',
} satisfies Record<Language, string>;

type Release = {
  version: string;
  date: string;
  vi: [title: string, summary: string];
  en: [title: string, summary: string];
};

export const releases: Release[] = [
  {
    version: '2.12.1',
    date: '2026-11-24',
    vi: ['Form lời nhắn dễ dùng hơn', 'Form gửi lời nhắn có nhãn vàng, mũi tên chọn chủ đề, bộ đếm ký tự, dòng quyền riêng tư và ô đồng ý rõ hơn. Thẻ phản hồi của Kiều Mạnh có thêm icon sen.'],
    en: ['An easier message form', 'The message form gains gold labels, a clear topic arrow, a character counter, the privacy note and a clearer consent box. Kiều Mạnh\'s feedback card gains a lotus icon.'],
  },
  {
    version: '2.12.0',
    date: '2026-11-24',
    vi: ['Phong cách vàng ánh tím và trang Phản hồi học viên', 'Toàn website mang màu vàng kim, tím đêm và chữ viết tay của trang Tần Số Vàng. Có trang Phản hồi học viên riêng trên menu, thẻ phản hồi và danh mục khóa thực hành được làm lại cho dễ đọc hơn.'],
    en: ['Gold and plum styling and a student feedback page', 'The whole site takes on the gold, night-plum and handwritten display type of the Golden Frequency page. A dedicated student feedback page joins the menu, and the feedback card and practice-course catalogue are redesigned to read more easily.'],
  },
  {
    version: '2.11.2',
    date: '2026-11-24',
    vi: ['Lời nhắn thân thiện hơn và chân trang', 'Tần Số Vàng viết lại phần khó khăn ấm áp hơn, giữ hướng dẫn an toàn và mời trao đổi trước với người hỗ trợ học viên. Mục Gợi ý đứng trước Phiên bản ở chân trang.'],
    en: ['Warmer guidance and footer order', 'The Golden Frequency rewrites its hard-times answer more warmly, keeps the safety guidance and invites a conversation with the student support person first. Suggestions now sits before Versions in the footer.'],
  },
  {
    version: '2.11.1',
    date: '2026-11-24',
    vi: ['Bổ sung thông tin cho người tham khảo đăng ký', 'Tần Số Vàng có khối thông tin khóa học, danh sách cần chuẩn bị và thêm hỏi đáp. Trang Tần Số Vàng, Tarot và Khóa thực hành có bảng so sánh hai khóa. Chi phí buổi Tarot ghi rõ báo giá qua tin nhắn.'],
    en: ['More information for prospective students', 'The Golden Frequency gains a course information sheet, a what-to-prepare list and more answers. The Golden Frequency, tarot and practice-course pages gain a side-by-side comparison. The tarot cost now says quote by message.'],
  },
  {
    version: '2.11.0',
    date: '2026-11-24',
    vi: ['Tinh chỉnh giao diện và tìm kiếm Tản văn', 'Tản văn có ô tìm bài theo từ khóa và bỏ chữ Roots. Tiêu đề trong timeline nổi bật hơn, biểu tượng Farm Gửi yêu thương vào đất rõ hơn, biểu tượng cuối trang bo tròn, thứ tự menu và chân trang đưa Hệ sinh thái và Đội ngũ lên trước. Cửa hàng có thanh điều khiển gọn hơn, trang Liên hệ có thêm hotline và Zalo hỗ trợ.'],
    en: ['Interface polish and journal search', 'The journal gains keyword search and drops the Roots label. Timeline titles stand out, the Farm partner mark is clearer, the footer mark is round, and the menu and footer put Ecosystem and Team first. The shop has tidier controls and the contact page adds a support hotline and Zalo.'],
  },
  {
    version: '2.10.0',
    date: '2026-11-24',
    vi: ['Khóa thực hành Tần Số Vàng', 'Trang giới thiệu khóa 6 chặng làm chủ năng lượng tần số cao: năm dạng tần số, bài tự định vị sáu lĩnh vực đời sống có bản đồ trực quan, bài tập tuần, sáu nhà khoa học minh họa, phúc lợi sau khóa và nút nhận báo giá qua Zalo, điện thoại hoặc biểu mẫu. Có ảnh chia sẻ mạng xã hội riêng cho tiếng Việt và tiếng Anh.'],
    en: ['The Golden Frequency course', 'A landing page for the six-stage course on mastering high-frequency energy: five kinds of frequency, a six-area self-check with a visual map, a weekly practice plan, six scientists as examples, support after the course and quote requests by Zalo, phone or form. Includes Vietnamese and English social sharing images.'],
  },
  {
    version: '2.9.0',
    date: '2026-11-24',
    vi: ['Cửa hàng ba không gian và Tarot dễ đặt lịch', 'Cửa hàng có ba không gian riêng: Thực phẩm sạch, Đá năng lượng và Sách, nối với kho Zen Flow. Trang Tarot có nút Zalo ngay đầu trang, thanh đặt lịch trên điện thoại và hướng dẫn đặt lịch 3 bước. Bổ sung chính sách bảo mật nội dung, HSTS và nâng cấp nền tảng.'],
    en: ['Three-space shop and easier Tarot booking', 'The shop now has three spaces: Clean food, Energy stones and Books, connected to the Zen Flow inventory. The Tarot page has a Zalo button at the top, a mobile booking bar and a three-step guide. Added a content security policy, HSTS and a platform upgrade.'],
  },
  {
    version: '2.8.4',
    date: '2026-11-23',
    vi: ['Đồng bộ lịch sử phiên bản', 'Khôi phục các mục 2.8.0–2.8.3 bị mất khỏi lịch sử khi gộp nhánh. Các bản 2.7.3–2.7.6 được hoàn thành sau 2.8.3 nên nằm ngay bên dưới. Bổ sung tài liệu bàn giao cho người tiếp tục phát triển.'],
    en: ['Version history sync', 'Restored the 2.8.0–2.8.3 entries that were lost when branches were merged. Releases 2.7.3–2.7.6 were finished after 2.8.3, so they sit directly below. Added handoff documentation for the next developer.'],
  },
  {
    version: '2.7.6',
    date: '2026-11-23',
    vi: ['Liên kết Khóa thực hành', 'Khôi phục mục Khóa thực hành và sửa liên kết tới trang Tarot trong danh mục.'],
    en: ['Practice course links', 'Restored Practice courses and fixed the catalogue link to the Tarot session.'],
  },
  {
    version: '2.7.5',
    date: '2026-11-23',
    vi: ['Gợi ý và nhãn ba quỹ đạo', 'Đổi mục Thực hành thành Gợi ý, bỏ liên kết tìm kiếm ở chân trang và sửa nhãn Thân, Tâm, Trí bị cắt.'],
    en: ['Suggestions and orbit labels', 'Renamed Practice to Suggestions, removed the footer search link, and fixed clipped planet labels.'],
  },
  {
    version: '2.7.4',
    date: '2026-11-23',
    vi: ['Lá rơi khắp màn hình', 'Lá xuân và lá thu rơi rải rác trên toàn chiều ngang của mọi trang, kể cả khi cuộn.'],
    en: ['Leaves across the screen', 'Spring and autumn leaves drift across the full width of every page as you scroll.'],
  },
  {
    version: '2.7.3',
    date: '2026-11-23',
    vi: ['Logo và mô hình ba quỹ đạo', 'Dùng đúng logo làm biểu tượng trình duyệt và cài đặt ứng dụng. Ẩn ảnh mở đầu trên mobile, thay hình Thân, Tâm, Trí bằng minh họa sát chủ đề và tinh gọn chuyển động.'],
    en: ['Logo and three-orbit model', 'Used the brand logo for browser and app icons. Hid the opening image on mobile, replaced the Body, Heart and Mind planets with subject-specific illustrations and streamlined motion.'],
  },
  {
    version: '2.8.3',
    date: '2026-11-23',
    vi: ['Trang Tarot gọn hơn và có mục về AI', 'Rút gọn phần giới thiệu và lộ trình, gỡ khối nghiên cứu về tâm linh và cảm nhận cơ thể, bổ sung so sánh AI với buổi hướng dẫn 1:1.'],
    en: ['A shorter tarot page with an AI comparison', 'Shortened the introduction and outline, removed the section on spiritual and bodily experience, and compared AI prompts with one-to-one guidance.'],
  },
  {
    version: '2.8.2',
    date: '2026-11-23',
    vi: ['Tarot dưới góc nhìn tâm lý học', 'Cập nhật giới thiệu Hương Thiền, gỡ bài thử với The Magician và đưa tư liệu gốc vào mục riêng cùng hai công trình về trải nghiệm tâm linh và cảm nhận cơ thể.'],
    en: ['Tarot from a psychological perspective', 'Updated Hương Thiền’s bio, removed the Magician exercise and moved primary sources to a dedicated section with two papers on spiritual and bodily experience.'],
  },
  {
    version: '2.8.1',
    date: '2026-11-23',
    vi: ['Khóa thực hành và điều hướng gọn hơn', 'Đổi tên và địa chỉ mục Khóa thực hành, thêm chuyển hướng từ liên kết cũ, làm gọn thanh đầu trang và thay minh họa Tarot.'],
    en: ['Practice courses and simpler navigation', 'Renamed and moved Practice courses with redirects from old links, refined the header controls and refreshed the Tarot illustrations.'],
  },
  {
    version: '2.8.0',
    date: '2026-11-23',
    vi: ['Trải nghiệm Tarot và ba quỹ đạo', 'Trang riêng cho buổi Tarot 1:1 với lợi ích, lộ trình, bài thực hành và cách hỏi lịch. Ba hành tinh chuyển động liên tục khi hiển thị và ảnh rừng đầu trang được ẩn trên điện thoại.'],
    en: ['Tarot session and three orbits', 'A dedicated Tarot session page with takeaways, a session outline, a short exercise and booking details. The three planets move continuously in view, and the homepage forest photo is hidden on phones.'],
  },
  {
    version: '2.7.2',
    date: '2026-11-23',
    vi: ['Vào thẳng trang chủ', 'Địa chỉ gốc mở trang chủ tiếng Việt. Mandala xuất hiện khi tải chậm và mục Phiên bản có nhãn ngắn hơn.'],
    en: ['Direct homepage entry', 'The root URL opens the Vietnamese homepage. A mandala appears on slow loads and the Versions label is shorter.'],
  },
  {
    version: '2.7.1',
    date: '2026-11-23',
    vi: ['Ảnh đại diện khóa tarot', 'Thêm ảnh Tarot từ Pixabay cho danh mục khóa học và khi chia sẻ liên kết.'],
    en: ['Tarot course thumbnail', 'Added a Pixabay tarot photo to the course catalogue and link previews.'],
  },
  {
    version: '2.7.0',
    date: '2026-11-23',
    vi: ['Bốn mùa trong ngày', 'Mỗi mùa kéo dài 6 giờ theo giờ Việt Nam, với én và mưa phùn mùa xuân, mưa rào mùa hạ, lá vàng mùa thu và tuyết mùa đông.'],
    en: ['Four seasons in one day', 'Each season follows a six-hour slot in Vietnam time, with spring swallows and drizzle, summer showers, autumn leaves and winter snow.'],
  },
  {
    version: '2.6.3',
    date: '2026-11-22',
    vi: ['Chân trang trên điện thoại', 'Sửa chữ bị cắt và điều chỉnh màu nền chân trang ở chạng vạng.'],
    en: ['Mobile footer', 'Fixed clipped text and refined the footer colours at twilight.'],
  },
  {
    version: '2.6.2',
    date: '2026-11-22',
    vi: ['Nguồn ảnh Sallie Nichols', 'Thêm liên kết xem ảnh trên hồ sơ tác giả của Editorial Kairós.'],
    en: ['Sallie Nichols photo source', 'Linked to the photo on the Editorial Kairós author profile.'],
  },
  {
    version: '2.6.1',
    date: '2026-11-22',
    vi: ['Mạch đọc và lộ trình tarot', 'Thêm minh họa động theo ba bước, nối liền các mốc và làm rõ lời mời liên hệ cuối khóa.'],
    en: ['Tarot sequence and timelines', 'Added a three-step animated illustration, continuous timeline connectors and a clearer invitation to get in touch.'],
  },
  {
    version: '2.6.0',
    date: '2026-11-22',
    vi: ['Khóa học và nhịp ngày đêm', 'Thêm mục Khóa học, mở rộng bài tarot và minh họa ba quỹ đạo. Phối chữ viết tay và tím mận trên toàn site, đổi sắc độ theo giờ Việt Nam.'],
    en: ['Courses and the daylight cycle', 'Added a course catalogue, expanded the tarot course and illustrated three orbits. Applied handwritten type and plum accents across the site, with colours following Vietnam time.'],
  },
  {
    version: '2.5.0',
    date: '2026-11-22',
    vi: ['Khóa hướng dẫn tarot cùng Hương Thiền', 'Bổ sung buổi hướng dẫn 1:1 trong 90 phút, màu tím mận, chữ viết tay và trạng thái tương tác rõ hơn cho nút và menu.'],
    en: ['Tarot guidance with Hương Thiền', 'Added a 90-minute one-to-one guided session, a plum accent, handwritten display type and clearer button and menu states.'],
  },
  {
    version: '2.4.2',
    date: '2026-11-22',
    vi: ['Hành trình kết nối đối tác', 'Bổ sung hai mối hợp tác trong Hệ sinh thái, rút gọn chân trang và canh giữa nội dung trên điện thoại.'],
    en: ['Our partnership journey', 'Added two partnerships to the Ecosystem page, simplified the footer and centered its content on mobile.'],
  },
  {
    version: '2.4.1',
    date: '2026-11-22',
    vi: ['Trang chủ và chân trang dễ đọc hơn', 'Tăng độ tương phản của thẻ hệ sinh thái, canh giữa họa tiết trên điện thoại, đưa lịch sử phiên bản vào nhóm Khám phá và thêm hồ sơ ZenWork.'],
    en: ['A clearer homepage and footer', 'Improved ecosystem card contrast, centered decorations on mobile, moved version history to Explore and added the ZenWork profile.'],
  },
  {
    version: '2.4.0',
    date: '2026-11-21',
    vi: ['Ba quỹ đạo trên trang chủ và bốn mùa', 'Đưa mô hình về trang chủ, viết riêng định hướng hệ sinh thái, chia lại timeline và bổ sung ảnh Pixabay trong bài dài. Website tự đổi hiệu ứng theo bốn mùa mỗi giờ.'],
    en: ['Homepage orbits and four seasons', 'Moved the orbits home, expanded the ecosystem strategy, grouped the timeline and added Pixabay photos to long articles. Seasonal accents change each hour.'],
  },
  {
    version: '2.3.0',
    date: '2026-11-21',
    vi: ['Câu chuyện, thực hành và đội ngũ', 'Mở các trang riêng cho Thực hành, Hệ sinh thái, Câu chuyện và Đội ngũ. Thêm hồ sơ đối tác, viết lại trang chủ và đồng bộ dữ liệu có cấu trúc.'],
    en: ['Story, practice and people', 'Added dedicated pages for Practice, Ecosystem, Story and Team. Introduced partner profiles, rewrote the homepage and aligned structured data.'],
  },
  {
    version: '2.2.1',
    date: '2026-11-21',
    vi: ['Đọc liền mạch', 'Mở toàn bộ hành trình, album và mục lục. Ba quỹ đạo tự xoay khi hiện trên màn hình. Trang chủ có ảnh chia sẻ Hương Thiền bên hồ.'],
    en: ['An uninterrupted read', 'Opened the story, galleries and reading guides. The three orbits now turn when in view. Shared homepage links feature Hương Thiền by the lake.'],
  },
  {
    version: '2.2.0',
    date: '2026-11-21',
    vi: ['Zen Botanical', 'Làm mới trang chủ quanh Thân, Tâm và Trí. Đồng bộ trải nghiệm đọc, Cửa hàng và Liên hệ, bổ sung ảnh đáp ứng cho đầu trang và chỉnh điều khiển nổi trên điện thoại.'],
    en: ['Zen Botanical', 'Rebuilt the homepage around Body, Heart and Mind. Unified the reading, shop and contact layouts, added responsive hero photography and refined the floating controls on mobile.'],
  },
  {
    version: '2.1.0',
    date: '2026-11-21',
    vi: ['Chân trang và lịch sử phiên bản', 'Sắp xếp chân trang theo nhóm Khám phá, Hệ sinh thái và Kết nối. Bổ sung lịch sử phiên bản song ngữ, mở trực tiếp từ số phiên bản ở chân trang.'],
    en: ['Footer and version history', 'Grouped footer links into Explore, Ecosystem and Contact. Added a bilingual release timeline linked from the version number in the footer.'],
  },
  {
    version: '2.0.6',
    date: '2026-11-06',
    vi: ['Hành trình Hương Thiền và giao diện mới', 'Mở rộng câu chuyện của Hương Thiền, hoàn thiện thông tin tồn kho và cải thiện giao diện trên điện thoại. Các cập nhật tiếp theo trong dòng 2.0.6 bổ sung trang Liên hệ, bài mới, khung tác giả, hiệu ứng thiền và bố cục trang chủ gọn hơn.'],
    en: ['The founder’s story and a refreshed interface', 'Expanded Hương Thiền’s story, clarified stock availability and improved the mobile layout. Later updates in the 2.0.6 series added the contact page, a new article, author profiles, contemplative motion and a shorter homepage.'],
  },
  {
    version: '2.0.5',
    date: '2026-10-09',
    vi: ['Nút nhạc nền dịu hơn', 'Tinh chỉnh màu xanh sage và hình dáng nút nhạc để dễ nhận ra trên cả vùng nền sáng lẫn tối.'],
    en: ['Softer music controls', 'Refined the shape and sage palette of the music control so it stands out on light and dark backgrounds.'],
  },
  {
    version: '2.0.4',
    date: '2026-10-09',
    vi: ['Ba quỹ đạo Thân, Tâm và Trí', 'Đưa ba hướng phát triển vào một mô hình quỹ đạo chung, với Hương Thiền Nature ở trung tâm.'],
    en: ['Three orbits for Body, Heart and Mind', 'Brought the three areas of the project into one orbit model with Hương Thiền Nature at its centre.'],
  },
  {
    version: '2.0.3',
    date: '2026-10-09',
    vi: ['Mô hình hệ sinh thái chuyển động', 'Thêm chuyển động quỹ đạo và điều khiển tạm dừng. Mô hình dừng khi rời vùng nhìn hoặc khi thiết bị yêu cầu giảm chuyển động.'],
    en: ['An animated ecosystem model', 'Added orbital motion and pause controls. Motion stops outside the viewport or when the device asks for reduced motion.'],
  },
  {
    version: '2.0.2',
    date: '2026-10-09',
    vi: ['Giới thiệu ba hướng phát triển', 'Trình bày Farm & Botanicals, Eco-Retreat và Academy trong cùng một khu vực. Làm rõ nội dung nào có thể khám phá và hoạt động nào đang chuẩn bị.'],
    en: ['Three areas of development', 'Presented Farm & Botanicals, Eco-Retreat and Academy together, clarifying what was available and what was still being prepared.'],
  },
  {
    version: '2.0.1',
    date: '2026-10-08',
    vi: ['Tìm sản phẩm thuận tiện hơn', 'Thu gọn ô tìm kiếm Cửa hàng và thêm ảnh sản phẩm luân phiên.'],
    en: ['Easier product discovery', 'Made shop search more compact and introduced rotating product photography.'],
  },
  {
    version: '2.0.0',
    date: '2026-10-08',
    vi: ['Giao diện lấy cảm hứng từ thiên nhiên', 'Làm mới nhận diện, thu gọn khu liên hệ và thêm thanh tiến trình đọc.'],
    en: ['A nature-inspired redesign', 'Refreshed the visual identity, simplified the contact area and introduced reading progress.'],
  },
  {
    version: '0.4.7',
    date: '2026-10-08',
    vi: ['Khám phá nội dung từ trang chủ', 'Thêm ô tìm kiếm, từ khóa gợi ý và lộ trình đọc cho người mới. Bổ sung danh mục và trang chi tiết sản phẩm song ngữ.'],
    en: ['Explore from the homepage', 'Added search, suggested keywords, a beginner reading path, and bilingual catalogue and product pages.'],
  },
  {
    version: '0.4.6',
    date: '2026-10-08',
    vi: ['Gói phát hành đồng bộ', 'Đồng bộ số phiên bản trong mã nguồn, giao diện và tài liệu triển khai.'],
    en: ['Consistent release packaging', 'Aligned the version number across source, interface and deployment documentation.'],
  },
  {
    version: '0.4.5',
    date: '2026-10-08',
    vi: ['Tìm kiếm tiếng Việt và tiếng Anh', 'Thêm trang kết quả theo từng ngôn ngữ và hỗ trợ tìm tiếng Việt có dấu hoặc không dấu.'],
    en: ['Vietnamese and English search', 'Added separate results pages and Vietnamese search with or without diacritics.'],
  },
  {
    version: '0.4.4',
    date: '2026-10-07',
    vi: ['Phản hồi liên hệ chính xác hơn', 'Sửa trạng thái xác minh để kết quả gửi biểu mẫu được hiển thị đúng.'],
    en: ['Clearer contact feedback', 'Fixed verification states so that the form reports the submission outcome correctly.'],
  },
  {
    version: '0.4.3',
    date: '2026-10-07',
    vi: ['Đóng gói thư viện Roots', 'Phát hành đồng bộ thư viện bài viết song ngữ và cấu hình chạy trên Cloudflare Worker.'],
    en: ['Roots release package', 'Packaged the bilingual journal and Cloudflare Worker configuration together.'],
  },
  {
    version: '0.4.1',
    date: '2026-10-07',
    vi: ['Triển khai Cloudflare Worker', 'Chuyển xử lý biểu mẫu sang Worker, dùng chung phần xác minh và gửi email.'],
    en: ['Cloudflare Worker deployment', 'Moved contact form handling to the Worker with shared verification and email delivery.'],
  },
  {
    version: '0.4.0',
    date: '2026-10-07',
    vi: ['Ra mắt thư viện Roots', 'Phát hành 12 bài song ngữ kèm minh họa, bài thực tập và gợi ý đọc tiếp.'],
    en: ['The Roots library launches', 'Published twelve bilingual articles with illustrations, exercises and related reading.'],
  },
  {
    version: '0.3.5',
    date: '2026-10-07',
    vi: ['Đọc và điều hướng trong bài', 'Thêm mục lục, bài liên quan và dữ liệu mô tả cho trang bài viết.'],
    en: ['Article navigation and discovery', 'Added contents, related articles and descriptive metadata.'],
  },
  {
    version: '0.3.4',
    date: '2026-10-07',
    vi: ['Đường dẫn riêng cho Tản văn tiếng Việt', 'Bản địa hóa đường dẫn và sitemap, đồng thời chuyển hướng các địa chỉ cũ.'],
    en: ['Localized Vietnamese journal URLs', 'Localized journal addresses and sitemap entries, with redirects for older URLs.'],
  },
  {
    version: '0.3.3',
    date: '2026-10-07',
    vi: ['Trang Tản văn riêng', 'Tạo danh sách bài song ngữ và để hai nút nổi đổi tông theo độ sáng của nền.'],
    en: ['A dedicated journal page', 'Introduced bilingual article listings and adaptive contrast for the floating controls.'],
  },
  {
    version: '0.3.2',
    date: '2026-10-07',
    vi: ['Nhạc, cuộn trang và số phiên bản', 'Đặt nút nhạc và nút về đầu trang ở hai góc, thêm số phiên bản ở chân trang.'],
    en: ['Music, scrolling and version numbers', 'Placed music and back-to-top controls in opposite corners and displayed the version in the footer.'],
  },
  {
    version: '0.3.1',
    date: '2026-10-07',
    vi: ['Gửi lời nhắn qua website', 'Bổ sung biểu mẫu liên hệ có xác minh và chức năng gửi email.'],
    en: ['Contact through the website', 'Added a contact form with verification and email delivery.'],
  },
  {
    version: '0.3.0',
    date: '2026-10-07',
    vi: ['Giao diện Roots song ngữ', 'Tạo bố cục Roots, Tản văn và điều hướng hỗ trợ bàn phím.'],
    en: ['The bilingual Roots interface', 'Introduced the Roots layout, journal and keyboard-accessible navigation.'],
  },
  {
    version: '0.1.0',
    date: '2026-10-06',
    vi: ['Bản giới thiệu đầu tiên', 'Đưa bản giới thiệu Hương Thiền Nature lên Cloudflare Pages.'],
    en: ['The first public preview', 'Published the initial Hương Thiền Nature preview on Cloudflare Pages.'],
  },
];
