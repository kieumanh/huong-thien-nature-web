// Living Zen Philosophy v1.0: the single source of truth for the philosophy page, the Home pointer, search and tests.
// Source: the owner's "MASTER PROMPT — LIVING ZEN PHILOSOPHY v1.0" (2026-11-27). The philosophy has its own version (below),
// independent of the website version in package.json. Do not change a commitment quietly: add an entry to `philosophyChangelog`.
// Honesty rules (AGENTS.md): applications and commitments are directions we work toward, never claims of achievement;
// `example` is filled only where the site already shows the fact; links point to pages that exist.
import type { Language } from './site.ts';

export type Bi<T> = Record<Language, T>;

export type PhilosophyIconName =
  | 'open-wisdom' | 'inner-sovereignty' | 'regenerative-living' | 'interconnected-living' | 'conscious-economy'
  | 'collective-wisdom' | 'mindful-innovation' | 'compassionate-service' | 'embodied-wisdom' | 'freedom-from-attachment';

export type PhilosophyTier = 1 | 2 | 3;

/** Where a link inside the philosophy page may go. The component resolves these to real routes. */
export type PhilosophyTarget =
  | { to: 'guidance' | 'practice' | 'journal' | 'ecosystem-partners' | 'shop' | 'shop-food' | 'support' | 'feedback' | 'contact' | 'zenwork' | 'story' }
  | { to: 'article'; slug: string };

export interface PhilosophyValue {
  id: string;
  slug: string;
  no: number;
  titleVi: string;
  titleEn: string;
  icon: PhilosophyIconName;
  tier: PhilosophyTier;
  summary: Bi<string>;
  philosophy: Bi<string[]>;
  practicalApplications: Bi<string[]>;
  commitment: Bi<string>;
  reflectionQuestion: Bi<string>;
  relatedArticles: string[];
  /** One fact the site already shows; omitted when nothing is confirmed. */
  example?: { text: Bi<string>; target: PhilosophyTarget; label: Bi<string> };
  version: string;
}

export const philosophyVersion = {
  id: 'v1.0',
  number: '1.0',
  published: '2026-11-27',
  updated: '2026-11-27',
  nextReview: '2027-11',
};

export const philosophyNames = {
  vi: { full: 'Nghệ thuật sống tỉnh thức', short: 'Living Zen', english: 'Living Zen Philosophy' },
  en: { full: 'The Art of Conscious Living', short: 'Living Zen', english: 'Living Zen Philosophy' },
};

export const philosophyTagline = {
  vi: ['Hiểu mình.', 'Thuận tự nhiên.', 'Sống tự chủ.', 'Cùng trưởng thành.'],
  en: ['Understand yourself.', 'Live with nature.', 'Live self-directed.', 'Grow together.'],
} satisfies Bi<string[]>;

export const philosophyValues: PhilosophyValue[] = [
  {
    id: 'open-wisdom', slug: 'open-wisdom', no: 1, titleVi: 'Trí tuệ rộng mở', titleEn: 'Open Wisdom', icon: 'open-wisdom', tier: 3,
    summary: {
      vi: 'Tri thức để sẻ chia và nuôi dưỡng sự hiểu biết, không phải để giữ riêng hay tạo ra sự khan hiếm.',
      en: 'Knowledge is for sharing and growing understanding, not for keeping to ourselves or making scarce.',
    },
    philosophy: {
      vi: [
        'Tri thức không chỉ để tích lũy cho riêng mình, mà còn để sẻ chia, nuôi dưỡng sự hiểu biết và giúp con người trưởng thành.',
        'Trí tuệ không thuộc độc quyền của một cá nhân, một tổ chức hay một hệ thống tư tưởng.',
      ],
      en: [
        'Knowledge is not only to be gathered for ourselves. It is also to be shared, to deepen understanding and to help people grow.',
        'Wisdom does not belong exclusively to one person, one organisation or one system of thought.',
      ],
    },
    practicalApplications: {
      vi: [
        'Chia sẻ tản văn và tài liệu có giá trị.',
        'Phát triển các khóa thực hành miễn phí phù hợp với nguồn lực.',
        'Kết hợp trí tuệ cổ xưa với khoa học hiện đại.',
        'Khuyến khích tự học, tự quan sát và kiểm chứng.',
        'Tôn trọng bản quyền và ghi nhận nguồn tri thức.',
        'Giảm những rào cản không cần thiết đối với việc học tập.',
      ],
      en: [
        'Share journal pieces and materials that carry real value.',
        'Offer free practice courses where our resources allow.',
        'Bring together ancient wisdom and modern science.',
        'Encourage self-study, self-observation and checking for yourself.',
        'Respect copyright and credit the sources of what we learn.',
        'Lower the barriers to learning that do not need to be there.',
      ],
    },
    commitment: {
      vi: 'Chia sẻ những tri thức có thể chia sẻ một cách có trách nhiệm, thay vì cố tình tạo ra sự khan hiếm để duy trì quyền lực hoặc sự lệ thuộc.',
      en: 'To share, responsibly, the knowledge that can be shared, rather than creating scarcity on purpose to keep power or dependence.',
    },
    reflectionQuestion: {
      vi: 'Điều mình biết đang giúp mình tự do hơn, hay đang khiến mình cảm thấy vượt trội hơn người khác?',
      en: 'Is what I know making me freer, or only making me feel above others?',
    },
    relatedArticles: ['meditation-for-beginners'],
    example: {
      text: { vi: 'Toàn bộ Tản văn trên website được đọc tự do.', en: 'Every journal piece on this website is free to read.' },
      target: { to: 'journal' },
      label: { vi: 'Đọc Tản văn', en: 'Read the journal' },
    },
    version: '1.0',
  },
  {
    id: 'inner-sovereignty', slug: 'inner-sovereignty', no: 2, titleVi: 'Tự chủ thân, tâm và trí', titleEn: 'Inner Sovereignty', icon: 'inner-sovereignty', tier: 1,
    summary: {
      vi: 'Mỗi người có quyền tự nhận thức, tự lựa chọn và chịu trách nhiệm về hành trình của mình.',
      en: 'Each person has the right to see, choose and take responsibility for their own journey.',
    },
    philosophy: {
      vi: [
        'Mỗi người có quyền tự do lựa chọn, tự nhận thức và chịu trách nhiệm về hành trình sống của mình.',
        'Không một tổ chức, giáo viên, phương pháp hay hệ thống niềm tin nào nên tước đi quyền tự chủ ấy.',
      ],
      en: [
        'Each person has the right to choose freely, to see for themselves and to take responsibility for the way they live.',
        'No organisation, teacher, method or belief system should take that autonomy away.',
      ],
    },
    practicalApplications: {
      vi: [
        'Không tạo ra sự lệ thuộc giữa người hướng dẫn và học viên.',
        'Không áp đặt niềm tin, tín ngưỡng hay phương pháp thực hành.',
        'Tôn trọng quyền riêng tư và dữ liệu cá nhân.',
        'Khuyến khích khả năng tự học và tư duy độc lập.',
        'Cho phép người dùng tự quyết định mức độ tham gia.',
        'Tôn trọng quyền rời khỏi hệ sinh thái.',
      ],
      en: [
        'Do not create dependence between guide and student.',
        'Do not impose beliefs, faiths or methods of practice.',
        'Respect privacy and personal data.',
        'Encourage self-study and independent thinking.',
        'Let people decide how deeply they take part.',
        'Respect the right to leave the ecosystem.',
      ],
    },
    commitment: {
      vi: 'Sự trưởng thành của người học quan trọng hơn việc họ tiếp tục cần đến người hướng dẫn.',
      en: 'A learner’s growth matters more than whether they keep needing a guide.',
    },
    reflectionQuestion: {
      vi: 'Mình đang học để trở nên tự chủ hơn, hay chỉ đang tìm một người khác quyết định thay mình?',
      en: 'Am I learning to become more self-directed, or only looking for someone else to decide for me?',
    },
    relatedArticles: ['seven-layers', 'healing-as-coming-home'],
    version: '1.0',
  },
  {
    id: 'regenerative-living', slug: 'regenerative-living', no: 3, titleVi: 'Sống thuận tự nhiên và tái sinh', titleEn: 'Regenerative Living', icon: 'regenerative-living', tier: 2,
    summary: {
      vi: 'Con người là một phần của thiên nhiên. Phát triển là nuôi dưỡng và phục hồi, không chỉ bớt gây hại.',
      en: 'People are part of nature. Growth means nurturing and restoring, not only doing less harm.',
    },
    philosophy: {
      vi: [
        'Con người không đứng bên ngoài thiên nhiên mà là một phần của thiên nhiên.',
        'Sự phát triển không chỉ hướng đến việc giảm tác động tiêu cực, mà còn hướng đến nuôi dưỡng và phục hồi những hệ sinh thái mà con người đang sống cùng.',
      ],
      en: [
        'People do not stand outside nature. We are part of it.',
        'Growth is not only about reducing harm. It is also about nurturing and restoring the living systems we live with.',
      ],
    },
    practicalApplications: {
      vi: [
        'Nông nghiệp thuận tự nhiên.',
        'Phát triển hệ sinh thái đất sống.',
        'Nuôi dưỡng đa dạng sinh học.',
        'Khuyến khích ẩm thực thực vật và tiêu dùng có ý thức.',
        'Hạn chế lãng phí tài nguyên.',
        'Phát triển công nghệ nhẹ và tiết kiệm năng lượng.',
        'Ưu tiên độ bền thay vì tiêu dùng liên tục.',
      ],
      en: [
        'Natural farming.',
        'Growing living soil.',
        'Nurturing biodiversity.',
        'Encouraging plant-based eating and conscious consumption.',
        'Cutting down on wasted resources.',
        'Developing light, energy-saving technology.',
        'Choosing durability over constant consumption.',
      ],
    },
    commitment: {
      vi: 'Cân nhắc tác động dài hạn đối với thiên nhiên, sức khỏe con người và các thế hệ tương lai trong những quyết định phát triển.',
      en: 'To weigh the long-term effects on nature, human health and future generations in the decisions we make about growth.',
    },
    reflectionQuestion: {
      vi: 'Lối sống của mình đang lấy đi điều gì từ thiên nhiên, và đang trả lại điều gì?',
      en: 'What is my way of living taking from nature, and what is it giving back?',
    },
    relatedArticles: ['mindful-gardening', 'listening-to-nature'],
    example: {
      text: {
        vi: 'Từ tháng 9/2026, Hương Thiền Nature kết nối với anh Lê Lam Sơn và farm Gửi Yêu Thương Vào Đất, đối tác nông nghiệp thuận tự nhiên tại Cư M’gar, Đắk Lắk.',
        en: 'Since September 2026, Hương Thiền Nature has worked with Lê Lam Sơn and Farm Gửi Yêu Thương Vào Đất, a natural farming partner in Cư M’gar, Đắk Lắk.',
      },
      target: { to: 'ecosystem-partners' },
      label: { vi: 'Gặp người đồng hành', en: 'Meet our partners' },
    },
    version: '1.0',
  },
  {
    id: 'interconnected-living', slug: 'interconnected-living', no: 4, titleVi: 'Sống trong sự tương liên', titleEn: 'Interconnected Living', icon: 'interconnected-living', tier: 2,
    summary: {
      vi: 'Thân, tâm, trí, tài chính, môi trường và cộng đồng đều tác động lẫn nhau.',
      en: 'Body, mind, understanding, finances, environment and community all shape one another.',
    },
    philosophy: {
      vi: [
        'Không có khía cạnh nào của đời sống tồn tại hoàn toàn độc lập.',
        'Thân thể, tâm thức, trí tuệ, tài chính, môi trường và cộng đồng đều có ảnh hưởng qua lại.',
        'Tiếp cận đời sống bằng tinh thần duyên khởi và tư duy hệ sinh thái, tránh nhìn nhận vấn đề chỉ từ một nguyên nhân duy nhất.',
      ],
      en: [
        'No part of life exists entirely on its own.',
        'Body, mind, understanding, finances, environment and community all shape one another.',
        'We approach life through dependent arising and ecosystem thinking, and avoid explaining a problem by a single cause.',
      ],
    },
    practicalApplications: {
      vi: [
        'Kết nối thiền định, yoga, dinh dưỡng, giáo dục và công nghệ.',
        'Phát triển các dự án có khả năng bổ trợ lẫn nhau.',
        'Tái sử dụng tài nguyên và tri thức.',
        'Tôn trọng sự đa dạng trong cộng đồng.',
        'Đánh giá tác động dài hạn của từng quyết định.',
      ],
      en: [
        'Connect meditation, yoga, nutrition, education and technology.',
        'Grow projects that support one another.',
        'Reuse resources and knowledge.',
        'Respect diversity in the community.',
        'Weigh the long-term effects of each decision.',
      ],
    },
    commitment: {
      vi: 'Không tối ưu một khía cạnh bằng cách vô tình làm tổn hại những khía cạnh khác.',
      en: 'Not to improve one aspect by unknowingly harming the others.',
    },
    reflectionQuestion: {
      vi: 'Những lựa chọn tưởng chừng rất riêng tư của mình đang ảnh hưởng đến những ai và những điều gì?',
      en: 'Who and what are my seemingly private choices affecting?',
    },
    relatedArticles: ['sun-moon-rhythms', 'listening-to-nature'],
    version: '1.0',
  },
  {
    id: 'conscious-economy', slug: 'conscious-economy', no: 5, titleVi: 'Kinh tế tỉnh thức', titleEn: 'Conscious Economy', icon: 'conscious-economy', tier: 3,
    summary: {
      vi: 'Kinh tế nuôi dưỡng đời sống, nhưng không phải là mục đích tối hậu.',
      en: 'The economy sustains life, but it is not life’s final purpose.',
    },
    philosophy: {
      vi: [
        'Kinh tế là nguồn lực nuôi dưỡng đời sống và sự phát triển bền vững, nhưng không phải mục đích tối hậu.',
        'Giá trị kinh tế cần được tạo ra từ sự trao đổi công bằng và lợi ích thực sự dành cho con người.',
      ],
      en: [
        'The economy is a resource that sustains life and lasting growth, but it is not the final purpose.',
        'Economic value should come from fair exchange and real benefit to people.',
      ],
    },
    practicalApplications: {
      vi: [
        'Định giá sản phẩm và dịch vụ minh bạch.',
        'Tôn trọng công sức của người lao động.',
        'Không khai thác nỗi sợ hoặc sự bất an để bán hàng.',
        'Không sử dụng quảng cáo gây hiểu lầm.',
        'Không hứa hẹn chữa lành, giác ngộ hay chuyển hóa vượt quá khả năng thực tế.',
        'Cân bằng giữa doanh thu, sinh kế và tinh thần phụng sự.',
        'Hạn chế các hình thức tiêu dùng không cần thiết.',
      ],
      en: [
        'Price products and services transparently.',
        'Respect the work of those who labour.',
        'Never use fear or insecurity to sell.',
        'Never use misleading advertising.',
        'Never promise healing, enlightenment or transformation beyond what is realistic.',
        'Balance revenue, livelihood and the spirit of service.',
        'Discourage unnecessary consumption.',
      ],
    },
    commitment: {
      vi: 'Không đánh đổi phẩm giá con người, quyền tự chủ hay sự trung thực chỉ để đạt được mục tiêu doanh thu.',
      en: 'Never to trade away human dignity, autonomy or honesty just to reach a revenue goal.',
    },
    reflectionQuestion: {
      vi: 'Mình đang sử dụng tiền bạc để nuôi dưỡng đời sống, hay đang để tiền bạc quyết định toàn bộ giá trị của đời sống?',
      en: 'Am I using money to nourish my life, or letting money decide the whole worth of it?',
    },
    relatedArticles: [],
    example: {
      text: {
        vi: 'Học phí các khóa thực hành được ghi công khai ngay trên trang khóa học, để bạn biết trước khi quyết định.',
        en: 'Course fees are listed openly on the course pages, so you know them before you decide.',
      },
      target: { to: 'guidance' },
      label: { vi: 'Xem các khóa thực hành', en: 'See the practice courses' },
    },
    version: '1.0',
  },
  {
    id: 'collective-wisdom', slug: 'collective-wisdom', no: 6, titleVi: 'Trí tuệ cộng đồng', titleEn: 'Collective Wisdom', icon: 'collective-wisdom', tier: 2,
    summary: {
      vi: 'Không ai sở hữu toàn bộ trí tuệ. Mỗi người đóng góp một phần vào hiểu biết chung.',
      en: 'No one owns all wisdom. Each person adds a piece to what we understand together.',
    },
    philosophy: {
      vi: [
        'Không ai sở hữu toàn bộ trí tuệ.',
        'Mỗi người, mỗi nền văn hóa và mỗi trải nghiệm sống đều có thể đóng góp một phần vào sự hiểu biết chung.',
      ],
      en: [
        'No one holds all of wisdom.',
        'Every person, culture and lived experience can add a part to what we understand together.',
      ],
    },
    practicalApplications: {
      vi: [
        'Xây dựng cộng đồng cùng học và cùng thực hành.',
        'Tôn trọng sự khác biệt giữa các truyền thống.',
        'Khuyến khích phản hồi mang tính xây dựng.',
        'Kết nối người thực hành thiền, người làm nông, nhà giáo dục và nhà phát triển công nghệ.',
        'Ghi nhận công lao của cộng sự.',
        'Sẵn sàng thừa nhận và sửa chữa sai lầm.',
      ],
      en: [
        'Build a community that learns and practises together.',
        'Respect differences between traditions.',
        'Encourage constructive feedback.',
        'Connect meditators, farmers, educators and technology builders.',
        'Credit the people we work with.',
        'Be ready to admit and correct mistakes.',
      ],
    },
    commitment: {
      vi: 'Không biến cộng đồng thành nơi chỉ chấp nhận những người có cùng quan điểm.',
      en: 'Never to turn the community into a place that only welcomes people who think alike.',
    },
    reflectionQuestion: {
      vi: 'Lần gần nhất mình thực sự học được điều gì đó từ một người có quan điểm khác mình là khi nào?',
      en: 'When did I last truly learn something from someone who sees things differently from me?',
    },
    relatedArticles: [],
    example: {
      text: {
        vi: 'Phản hồi của học viên chỉ được đăng khi có sự đồng ý của chính họ.',
        en: 'Student feedback is published only with the student’s own consent.',
      },
      target: { to: 'feedback' },
      label: { vi: 'Đọc phản hồi học viên', en: 'Read student feedback' },
    },
    version: '1.0',
  },
  {
    id: 'mindful-innovation', slug: 'mindful-innovation', no: 7, titleVi: 'Sáng tạo trong tỉnh thức', titleEn: 'Mindful Innovation', icon: 'mindful-innovation', tier: 3,
    summary: {
      vi: 'Sáng tạo nên giúp con người có thêm tự do, sự hiện diện và chất lượng sống.',
      en: 'Creating should give people more freedom, presence and quality of life.',
    },
    philosophy: {
      vi: [
        'Mọi sáng tạo, dù trong công nghệ, giáo dục hay đời sống, đều nên giúp con người có thêm tự do, sự hiện diện và chất lượng sống.',
        'Công nghệ nên là công cụ hỗ trợ con người, thay vì liên tục tranh giành sự chú ý của họ.',
      ],
      en: [
        'Every creation, in technology, education or daily life, should give people more freedom, presence and quality of life.',
        'Technology should help people, rather than constantly compete for their attention.',
      ],
    },
    practicalApplications: {
      vi: [
        'Thiết kế phần mềm tối giản và dễ sử dụng.',
        'Không sử dụng các cơ chế gây nghiện có chủ đích.',
        'Hạn chế thông báo không cần thiết.',
        'Khuyến khích trải nghiệm ngoài màn hình.',
        'Sử dụng AI để hỗ trợ tư duy, không thay thế tư duy.',
        'Phát triển phần mềm tiết kiệm tài nguyên.',
        'Tôn trọng quyền sở hữu và khả năng di chuyển dữ liệu.',
      ],
      en: [
        'Design minimal, easy-to-use software.',
        'Avoid mechanisms built to be addictive.',
        'Limit unnecessary notifications.',
        'Encourage experiences away from the screen.',
        'Use AI to support thinking, not replace it.',
        'Build software that saves resources.',
        'Respect data ownership and portability.',
      ],
    },
    commitment: {
      vi: 'Đánh giá thành công bằng giá trị mà con người nhận được, thay vì chỉ đo thời gian họ ở lại nền tảng.',
      en: 'To judge success by the value people receive, not only by the time they spend on a platform.',
    },
    reflectionQuestion: {
      vi: 'Công nghệ mình đang sử dụng giúp mình sống sâu sắc hơn, hay khiến mình ngày càng khó có mặt trong hiện tại?',
      en: 'Does the technology I use help me live more deeply, or make it ever harder to be present?',
    },
    relatedArticles: [],
    version: '1.0',
  },
  {
    id: 'compassionate-service', slug: 'compassionate-service', no: 8, titleVi: 'Phụng sự bằng lòng từ bi', titleEn: 'Compassionate Service', icon: 'compassionate-service', tier: 3,
    summary: {
      vi: 'Phụng sự đến từ sự thấu hiểu, không nhằm chứng minh mình tốt hơn ai, và không đòi hỏi kiệt sức.',
      en: 'Service comes from understanding, not from proving we are better, and it does not demand exhaustion.',
    },
    philosophy: {
      vi: [
        'Phụng sự xuất phát từ sự thấu hiểu những khó khăn chung của con người và muôn loài, không nhằm chứng minh bản thân tốt đẹp hơn người khác.',
        'Phụng sự không đồng nghĩa với việc hy sinh bản thân đến kiệt quệ.',
      ],
      en: [
        'Service comes from understanding the shared hardships of people and all beings. It is not meant to prove that we are better than anyone.',
        'Service does not mean sacrificing ourselves until we are exhausted.',
      ],
    },
    practicalApplications: {
      vi: [
        'Xây dựng các chương trình hỗ trợ cộng đồng phù hợp nguồn lực.',
        'Chia sẻ tri thức và kinh nghiệm hữu ích.',
        'Lắng nghe với thái độ không phán xét.',
        'Tôn trọng giới hạn của bản thân và người khác.',
        'Không áp đặt sự giúp đỡ khi người khác không mong muốn.',
        'Nuôi dưỡng sự cân bằng giữa cho đi và đón nhận.',
      ],
      en: [
        'Build community support programmes that fit our resources.',
        'Share useful knowledge and experience.',
        'Listen without judging.',
        'Respect our own limits and those of others.',
        'Never push help on someone who does not want it.',
        'Keep a balance between giving and receiving.',
      ],
    },
    commitment: {
      vi: 'Người trao đi cũng cần được nuôi dưỡng như người đón nhận.',
      en: 'Those who give need nourishing as much as those who receive.',
    },
    reflectionQuestion: {
      vi: 'Mình đang giúp đỡ vì người khác thực sự cần, hay vì mình cần cảm thấy bản thân có giá trị?',
      en: 'Am I helping because someone truly needs it, or because I need to feel I am worth something?',
    },
    relatedArticles: ['gentle-boundaries', 'loving-kindness-meditation'],
    example: {
      text: {
        vi: 'Trang Quỹ ủng hộ nói rõ dự án cần gì và mời những ai có khả năng, có lòng cùng góp sức.',
        en: 'The Support fund page says what the project needs and invites those who are able and willing to help.',
      },
      target: { to: 'support' },
      label: { vi: 'Đến Quỹ ủng hộ', en: 'Go to the Support fund' },
    },
    version: '1.0',
  },
  {
    id: 'embodied-wisdom', slug: 'embodied-wisdom', no: 9, titleVi: 'Trí tuệ từ trải nghiệm sống', titleEn: 'Embodied Wisdom', icon: 'embodied-wisdom', tier: 1,
    summary: {
      vi: 'Tri thức trở thành trí tuệ khi được quan sát, thực hành, kiểm chứng và sống thật.',
      en: 'Knowledge becomes wisdom when it is observed, practised, tested and lived.',
    },
    philosophy: {
      vi: [
        'Tri thức chỉ thực sự trở thành trí tuệ sống khi được quan sát, thực hành, kiểm chứng và chuyển hóa trong đời sống.',
        'Không đánh đồng việc đọc nhiều sách với sự trưởng thành, cũng không đánh đồng trải nghiệm chủ quan với chân lý phổ quát.',
      ],
      en: [
        'Knowledge only becomes living wisdom when it is observed, practised, tested and transformed in daily life.',
        'Reading many books is not the same as growing, and a subjective experience is not a universal truth.',
      ],
    },
    practicalApplications: {
      vi: [
        'Đưa kiến thức vào thực hành.',
        'Khuyến khích quan sát và ghi chép trải nghiệm.',
        'Phân biệt niềm tin, giả thuyết, kinh nghiệm và bằng chứng.',
        'Học hỏi từ thành công lẫn thất bại.',
        'Cởi mở với những phát hiện mới.',
        'Không dùng uy tín cá nhân thay thế cho bằng chứng.',
      ],
      en: [
        'Bring knowledge into practice.',
        'Encourage observing and noting down experience.',
        'Tell belief, hypothesis, experience and evidence apart.',
        'Learn from successes and failures alike.',
        'Stay open to new findings.',
        'Never use personal authority in place of evidence.',
      ],
    },
    commitment: {
      vi: 'Trung thực về những điều đã biết, chưa biết và vẫn đang tìm hiểu.',
      en: 'To be honest about what we know, what we do not know and what we are still finding out.',
    },
    reflectionQuestion: {
      vi: 'Điều mình đang chia sẻ là điều mình thực sự hiểu, hay chỉ là điều mình đã từng đọc ở đâu đó?',
      en: 'Is what I am sharing something I truly understand, or only something I have read somewhere?',
    },
    relatedArticles: ['sun-moon-rhythms', 'everyday-mindfulness'],
    example: {
      text: {
        vi: 'Bài “Mặt Trời, Mặt Trăng và nhịp sống của chúng ta” kể riêng điều đã được đo lường, điều chưa có bằng chứng và phần chiêm nghiệm cá nhân.',
        en: 'The piece “The Sun, the Moon and the Rhythm of Our Days” keeps what has been measured, what lacks evidence and personal reflection apart.',
      },
      target: { to: 'article', slug: 'sun-moon-rhythms' },
      label: { vi: 'Đọc bài viết', en: 'Read the piece' },
    },
    version: '1.0',
  },
  {
    id: 'freedom-from-attachment', slug: 'freedom-from-attachment', no: 10, titleVi: 'Tự do khỏi chấp trước', titleEn: 'Freedom from Attachment', icon: 'freedom-from-attachment', tier: 1,
    summary: {
      vi: 'Sẵn sàng học, đổi và buông, kể cả những điều chính mình đã tạo ra.',
      en: 'Ready to learn, change and let go, even of what we ourselves have made.',
    },
    philosophy: {
      vi: [
        'Sẵn sàng học hỏi, thay đổi và buông bỏ những điều không còn phù hợp, kể cả những quan điểm, phương pháp và thành tựu do chính mình tạo ra.',
        'Living Zen không nên trở thành một hệ thống niềm tin mới mà con người phải bám víu vào.',
      ],
      en: [
        'Being ready to learn, to change and to let go of what no longer fits, including views, methods and achievements of our own making.',
        'Living Zen should not become a new belief system that people have to cling to.',
      ],
    },
    practicalApplications: {
      vi: [
        'Không tuyệt đối hóa người thầy.',
        'Không tuyệt đối hóa phương pháp.',
        'Không tuyệt đối hóa thành công.',
        'Sẵn sàng thay đổi sản phẩm không còn phù hợp.',
        'Chấp nhận sự vô thường của các dự án.',
        'Tôn trọng những người lựa chọn một con đường khác.',
        'Không đồng nhất giá trị con người với thành tựu hoặc danh tính xã hội.',
      ],
      en: [
        'Do not absolutise any teacher.',
        'Do not absolutise any method.',
        'Do not absolutise success.',
        'Be ready to change products that no longer fit.',
        'Accept the impermanence of projects.',
        'Respect those who choose another path.',
        'Do not equate a person’s worth with achievements or social identity.',
      ],
    },
    commitment: {
      vi: 'Hương Thiền Nature phải có khả năng tự phản biện và thay đổi cả những quan điểm của chính mình.',
      en: 'Hương Thiền Nature must be able to question itself and change even its own views.',
    },
    reflectionQuestion: {
      vi: 'Liệu mình có đang chấp vào chính ý niệm rằng mình là một người không chấp trước?',
      en: 'Am I perhaps clinging to the very idea that I am someone who does not cling?',
    },
    relatedArticles: ['returning-attention'],
    version: '1.0',
  },
];

export const philosophyValueById = (id: string) => philosophyValues.find(value => value.id === id);

export const philosophyTiers = [
  {
    tier: 1 as PhilosophyTier,
    id: 'inner-transformation',
    name: { vi: 'Chuyển hóa tự thân', en: 'Inner Transformation' },
    meaning: {
      vi: 'Nuôi dưỡng khả năng tự hiểu, tự chủ, trải nghiệm và trưởng thành.',
      en: 'Nurturing the ability to understand ourselves, be self-directed, experience and grow.',
    },
    values: ['inner-sovereignty', 'embodied-wisdom', 'freedom-from-attachment'],
  },
  {
    tier: 2 as PhilosophyTier,
    id: 'interconnected-life',
    name: { vi: 'Sống trong tương liên', en: 'Interconnected Life' },
    meaning: {
      vi: 'Nhận thức mối liên hệ giữa bản thân, cộng đồng và thiên nhiên.',
      en: 'Seeing the links between ourselves, community and nature.',
    },
    values: ['regenerative-living', 'interconnected-living', 'collective-wisdom'],
  },
  {
    tier: 3 as PhilosophyTier,
    id: 'conscious-contribution',
    name: { vi: 'Sáng tạo và phụng sự', en: 'Conscious Contribution' },
    meaning: {
      vi: 'Đưa trí tuệ và sự hiểu biết trở lại đời sống thông qua hành động có trách nhiệm.',
      en: 'Bringing wisdom and understanding back into life through responsible action.',
    },
    values: ['open-wisdom', 'conscious-economy', 'mindful-innovation', 'compassionate-service'],
  },
];

export const philosophyCopy = {
  vi: {
    hero: {
      eyebrow: 'Triết lý sống',
      title: 'Living Zen',
      subtitle: 'The Art of Conscious Living',
      name: 'Nghệ thuật sống tỉnh thức',
      lead: 'Giữa một thế giới không ngừng chuyển động, chúng mình học cách sống sâu sắc hơn, hiểu mình hơn và nuôi dưỡng những điều có giá trị lâu dài.',
      note: 'Living Zen không phải một tôn giáo, một trường phái hay một phương pháp bắt buộc. Đây là một định hướng sống mở.',
      scroll: 'Đọc triết lý',
      figure: 'Hình minh họa: một cây non đứng bên mặt nước lặng lúc bình minh, lá rơi chậm và những vòng sóng lan ra.',
    },
    why: {
      eyebrow: 'Vì sao Living Zen ra đời',
      title: 'Vì sao chúng mình viết ra Living Zen',
      lead: 'Có những điều ngày càng khó giữ giữa đời sống hôm nay. Chúng mình gọi tên chúng một cách bình tĩnh, rồi nói rõ mình muốn đứng ở đâu.',
      items: [
        { icon: 'wave', title: 'Thông tin dồn dập', text: 'Mỗi ngày có quá nhiều điều để đọc, để xem, để biết. Khó phân biệt điều nào đáng giữ lại.' },
        { icon: 'path', title: 'Nhịp sống nhanh', text: 'Nhiều người thấy mình luôn đang chạy, mà ít khi có chỗ dừng để hỏi mình đang chạy về đâu.' },
        { icon: 'chat', title: 'Sự chú ý bị chia nhỏ', text: 'Chú ý là thứ quý giá và rất dễ bị chia nhỏ qua màn hình và thông báo.' },
        { icon: 'leaf', title: 'Con người và thiên nhiên', text: 'Chúng ta sống nhờ đất, nước và cây cỏ, nhưng nhịp sống hiện đại khiến mối quan hệ ấy xa dần.' },
        { icon: 'breath', title: 'Công nghệ và AI đi rất nhanh', text: 'Công nghệ mở ra nhiều khả năng, và cũng đặt ra một câu hỏi: nó đang phục vụ con người, hay ngược lại?' },
        { icon: 'compass', title: 'Nhu cầu tự chủ và ý nghĩa', text: 'Giữa tất cả, nhiều người mong sống tự chủ hơn, có ý nghĩa hơn và chăm sóc sức khỏe một cách toàn diện.' },
      ],
      closing: 'Living Zen không phải câu trả lời cho tất cả những điều ấy. Đó là một lời mời nhẹ nhàng: dừng lại, nhìn rõ, rồi chọn cách sống của chính mình.',
      natureTitle: 'Living Zen là gì, và không là gì',
      nature: 'Living Zen được nuôi dưỡng từ trí tuệ phương Đông, thiền và chánh niệm, tâm lý học hiện đại, tinh thần khoa học, nông nghiệp thuận tự nhiên, tư duy hệ sinh thái, công nghệ có đạo đức, kinh tế bền vững, trí tuệ cộng đồng và tinh thần phụng sự. Chúng mình không tuyệt đối hóa nguồn tri thức nào, không dùng tuyên bố khoa học thiếu căn cứ để hợp thức hóa niềm tin tâm linh, và tôn trọng quyền tự do nhận thức, trải nghiệm và lựa chọn của mỗi người.',
      place: 'Hương Thiền Nature là hệ sinh thái. Living Zen là nền tảng triết lý định hướng cho hệ sinh thái ấy, không phải một thương hiệu riêng.',
      figure: 'Hình minh họa: những chấm tròn nhỏ ban đầu rải rác rồi từ từ xếp thành một đường thẳng bình yên bên một vầng sáng thở chậm.',
    },
    manifesto: {
      eyebrow: 'Tuyên ngôn',
      title: 'Living Zen — Nghệ thuật sống tỉnh thức',
      intro: [
        'Hương Thiền Nature được hình thành từ niềm tin rằng sự phát triển của con người không nhất thiết phải đánh đổi bằng sự bình an của nội tâm, sức khỏe của thiên nhiên hay tự do của những người xung quanh.',
        'Chúng mình hướng đến một lối sống nơi trí tuệ được sẻ chia, thiên nhiên được tôn trọng, công nghệ được dùng có ý thức, kinh tế được xây từ giá trị thực, và mỗi người được tự do trưởng thành theo hành trình riêng của mình.',
        'Chúng mình không tìm cách dựng một hệ thống niềm tin để mọi người phải tuân theo. Điều chúng mình mong làm được là tạo ra những điều kiện thuận lợi để mỗi người có thể tự quan sát, tự trải nghiệm, tự hiểu và tự chuyển hóa đời sống.',
      ],
      refusals: [
        'Không lấy sự lệ thuộc làm thước đo thành công.',
        'Không lấy sự chú ý của con người làm tài nguyên để khai thác.',
        'Không lấy lợi nhuận làm lý do để đánh đổi những giá trị căn bản.',
      ],
      outro: [
        'Chúng mình trân trọng trí tuệ cổ xưa, cởi mở với khoa học hiện đại, học hỏi từ thiên nhiên và lắng nghe những trải nghiệm đa dạng của cộng đồng.',
        'Hương Thiền Nature không phải là một hành trình hướng đến sự hoàn hảo. Đó là một hành trình không ngừng học hỏi, thực hành, sửa đổi và trưởng thành.',
      ],
      seal: 'Đó là tinh thần Living Zen.',
    },
    model: {
      eyebrow: 'Mô hình ba tầng',
      title: 'Ba phương diện, một tâm điểm tỉnh thức',
      lead: 'Từ tâm điểm là sự tỉnh thức, đời sống mở ra như những vòng sinh trưởng của một cây: từ bên trong, đến những mối liên hệ, đến việc đóng góp trở lại.',
      awareness: {
        name: 'Tỉnh thức',
        english: 'Awareness',
        text: 'Khả năng nhận biết bản thân, hoàn cảnh, hành động và những hệ quả mà hành động tạo ra. Tỉnh thức không phải một trạng thái hoàn hảo hay một danh hiệu tinh thần. Đó là điều ta có thể quên đi và nhớ lại mỗi ngày.',
      },
      tabsLabel: 'Chọn một phương diện để đọc các giá trị tương ứng',
      centreTab: 'Tâm điểm',
      noHierarchy: 'Ba tầng không phải ba cấp bậc. Không ai đứng cao hơn ai: đây là ba phương diện nâng đỡ lẫn nhau, và mỗi người có thể bắt đầu từ bất kỳ phương diện nào.',
      relationTitle: 'Liên hệ với Thân – Tâm – Trí',
      relation: 'Thân – Tâm – Trí là mô hình nuôi dưỡng con người của Hương Thiền Nature: chăm thân, an tâm, mở trí. Ba tầng Living Zen là mạch giá trị chạy phía sau mô hình ấy. Thân – Tâm – Trí nói chúng mình nuôi dưỡng điều gì; ba tầng nói chúng mình nuôi dưỡng theo tinh thần nào.',
      valuesLabel: 'Các giá trị trong phương diện này',
      figure: 'Hình minh họa: ba vòng sinh trưởng đồng tâm quanh một tâm điểm sáng; mỗi vòng có những hạt tròn nhỏ, tương ứng số giá trị của phương diện ấy (ba, ba và bốn).',
    },
    values: {
      eyebrow: 'Mười giá trị cốt lõi',
      title: 'Mười giá trị, mười cách nhìn về một lối sống',
      lead: 'Mỗi giá trị đứng riêng được, và cũng nâng đỡ những giá trị còn lại. Bấm vào từng giá trị để đọc triết lý, ứng dụng, cam kết và một câu hỏi để tự chiêm nghiệm.',
      note: 'Phần “Ứng dụng” và “Cam kết” là những định hướng chúng mình theo đuổi, không phải lời khẳng định rằng mọi điều đã làm được.',
      labels: {
        philosophy: 'Triết lý', applications: 'Ứng dụng thực tế', commitment: 'Cam kết của Hương Thiền Nature',
        reflection: 'Câu hỏi để tự chiêm nghiệm', related: 'Bài viết liên quan', example: 'Một ví dụ có thật', open: 'Đọc thêm', close: 'Thu gọn',
      },
    },
    refrain: {
      eyebrow: 'Ranh giới của chúng mình',
      title: 'Những điều chúng mình lựa chọn không làm',
      lead: 'Có những điều chúng mình chọn không làm, để những điều còn lại có chỗ lớn lên. Đây là cách chúng mình giữ mình, không phải lời phán xét ai.',
      items: [
        'Không khai thác sự chú ý như một tài nguyên vô hạn.',
        'Không tạo sự lệ thuộc tinh thần.',
        'Không hứa hẹn những kết quả chưa được chứng minh.',
        'Không áp đặt niềm tin.',
        'Không dùng thủ thuật thao túng hành vi để bán hàng.',
        'Không thu thập dữ liệu vượt quá nhu cầu thực tế.',
        'Không đánh đổi sự trung thực chỉ để tăng trưởng.',
        'Không xem bất kỳ cá nhân hay hệ thống tư tưởng nào là bất khả sai lầm.',
      ],
    },
    practice: {
      eyebrow: 'Từ triết lý đến đời sống',
      title: 'Triết lý chỉ có nghĩa khi đi vào đời sống',
      lead: 'Sáu lĩnh vực dưới đây là nơi Living Zen được thử mỗi ngày. Mỗi đường dẫn chỉ đến một nơi có thật trên website hoặc trong hệ sinh thái.',
      figure: 'Hình minh họa: bộ rễ trải rộng dưới đất, nhựa sống chảy lên thân cây và nâng sáu chiếc lá, mỗi lá là một lĩnh vực của đời sống.',
      fields: [
        { id: 'practice', icon: 'lotus', title: 'Thiền định và thực hành', text: 'Nuôi dưỡng sự hiện diện và khả năng tự quan sát.', links: [{ target: { to: 'guidance' }, label: 'Khóa thực hành' }, { target: { to: 'practice' }, label: 'Gợi ý thực hành' }] },
        { id: 'education', icon: 'book', title: 'Giáo dục và tri thức', text: 'Khuyến khích học tập suốt đời và tư duy độc lập.', links: [{ target: { to: 'journal' }, label: 'Tản văn' }] },
        { id: 'farm', icon: 'sprout', title: 'Thiên nhiên và nông nghiệp', text: 'Học cách sống trong sự tương liên với hệ sinh thái.', links: [{ target: { to: 'ecosystem-partners' }, label: 'Người đồng hành' }] },
        { id: 'food', icon: 'leaf', title: 'Ẩm thực và sức khỏe', text: 'Nuôi dưỡng thân thể bằng những lựa chọn phù hợp và có ý thức.', links: [{ target: { to: 'shop-food' }, label: 'Thực phẩm sạch' }] },
        { id: 'tech', icon: 'breath', title: 'Công nghệ', text: 'Phát triển những công cụ hỗ trợ sự tự chủ, hiệu quả và chất lượng sống.', links: [{ target: { to: 'zenwork' }, label: 'ZenWork' }] },
        { id: 'service', icon: 'hands', title: 'Kinh tế và phụng sự', text: 'Tạo ra giá trị thực, sinh kế lành mạnh và sự trao đổi công bằng.', links: [{ target: { to: 'shop' }, label: 'Cửa hàng' }, { target: { to: 'support' }, label: 'Quỹ ủng hộ' }] },
      ],
      momentsTitle: 'Những khoảnh khắc thật, từ vườn và từ chỗ ngồi yên',
      momentsIntro: 'Vài hình từ album của chúng mình, nơi triết lý đi vào những việc rất nhỏ.',
    },
    commitments: {
      eyebrow: 'Cam kết với cộng đồng',
      title: 'Những điều chúng mình cam kết thực hiện',
      lead: 'Đây là những định hướng và cam kết chúng mình cần thực hiện từng ngày, không phải lời khẳng định rằng mọi điều đã hoàn hảo. Nếu bạn thấy việc chúng mình làm chưa đúng với những dòng này, xin hãy cho chúng mình biết.',
      groups: [
        { id: 'learners', icon: 'sprout', title: 'Học viên', text: 'Tôn trọng quyền tự chủ của bạn: không áp đặt niềm tin, không tạo sự lệ thuộc vào người hướng dẫn, và nói thật về phạm vi và giới hạn của từng phương pháp.' },
        { id: 'readers', icon: 'book', title: 'Người đọc', text: 'Phân biệt rõ điều đã được kiểm chứng, điều thuộc kinh nghiệm cá nhân và điều thuộc niềm tin; ghi nguồn khi trích dẫn; sửa khi sai.' },
        { id: 'customers', icon: 'heart', title: 'Khách hàng', text: 'Định giá minh bạch, mô tả sản phẩm trung thực, không khai thác nỗi sợ hay sự bất an để bán hàng.' },
        { id: 'users', icon: 'chat', title: 'Người dùng công nghệ', text: 'Hướng tới phần mềm gọn nhẹ, tôn trọng quyền riêng tư và dữ liệu cá nhân, không dùng cơ chế gây nghiện, và minh bạch khi có dùng AI.' },
        { id: 'partners', icon: 'hands', title: 'Cộng sự', text: 'Ghi nhận công lao, lắng nghe góp ý, sẵn sàng thừa nhận và sửa chữa sai lầm.' },
        { id: 'nature', icon: 'leaf', title: 'Thiên nhiên', text: 'Cân nhắc tác động dài hạn trong từng quyết định, hạn chế lãng phí và ưu tiên độ bền.' },
        { id: 'future', icon: 'sun', title: 'Các thế hệ tương lai', text: 'Xây những điều có thể tiếp tục được nuôi dưỡng, thay vì những điều chỉ hiệu quả trước mắt.' },
      ],
    },
    essays: {
      eyebrow: 'Kho tản văn',
      title: 'Những bài viết đi cùng Living Zen',
      lead: 'Vài bài trong Tản văn đã nói về những điều này theo cách rất đời thường. Bộ bài Living Zen Series sẽ được viết thêm khi từng bài được duyệt.',
      all: 'Xem tất cả Tản văn',
    },
    growing: {
      eyebrow: 'Một triết lý đang trưởng thành',
      title: 'Living Zen là một triết lý mở, và sẽ còn thay đổi',
      lead: 'Khi có thêm trải nghiệm và hiểu biết mới, chúng mình sẽ cùng nhìn lại những dòng này. Mỗi lần thay đổi đều được ghi lại, không sửa âm thầm.',
      labels: { version: 'Phiên bản triết lý', published: 'Ngày công bố', updated: 'Cập nhật gần nhất', review: 'Rà soát định kỳ', reviewValue: 'Mỗi năm một lần', history: 'Lịch sử thay đổi', change: 'Nội dung', reason: 'Lý do', impact: 'Tác động' },
      independent: 'Phiên bản triết lý độc lập với phiên bản website: website có thể đổi mỗi tuần, triết lý chỉ đổi khi chúng mình thật sự hiểu thêm.',
      feedbackTitle: 'Đóng góp ý kiến',
      feedback: 'Nếu bạn thấy điều nào cần làm rõ, sửa hoặc bổ sung, hãy viết cho chúng mình qua trang Liên hệ.',
      feedbackLink: 'Gửi ý kiến cho chúng mình',
      figure: 'Hình minh họa: những vòng sinh trưởng của thân cây; vòng ở giữa là phiên bản 1.0, vòng ngoài cùng đang lớn dần và hai vòng nét đứt chờ những phiên bản sau.',
    },
    closing: {
      title: 'Mỗi người một con đường',
      text: 'Chúng mình không mong tất cả mọi người đi cùng một con đường. Chúng mình chỉ mong mỗi người có thể bước đi trên con đường của mình với nhiều hiểu biết, tự do, tình thương và sự hiện diện hơn.',
    },
    changelog: [
      { version: '1.0', date: '2026-11-27', change: 'Công bố lần đầu: tuyên ngôn, mười giá trị cốt lõi, mô hình ba tầng, những điều chúng mình chọn không làm và cam kết với cộng đồng.', reason: 'Gom những nguyên tắc vẫn đang định hướng công việc thành một văn bản mở để mọi người cùng đọc, góp ý và giám sát.', impact: 'Trở thành nền tảng giá trị cho website và các dự án trong hệ sinh thái. Chưa thay đổi sản phẩm hay dịch vụ nào.' },
    ],
    home: {
      eyebrow: 'Tinh thần Living Zen',
      title: 'Một định hướng sống mở',
      text: 'Hiểu mình. Thuận tự nhiên. Sống tự chủ. Cùng trưởng thành. Living Zen không phải một tôn giáo và không mời ai đi cùng một con đường. Đó là mạch giá trị đứng sau mọi việc chúng mình làm.',
      link: 'Khám phá triết lý sống',
    },
    story: {
      text: 'Hành trình này tiếp tục được chúng mình viết thành một định hướng sống mở, gọi là Living Zen.',
      link: 'Đọc triết lý sống',
    },
    footerLine: 'Living Zen — Nghệ thuật sống tỉnh thức',
  },
  en: {
    hero: {
      eyebrow: 'Philosophy',
      title: 'Living Zen',
      subtitle: 'The Art of Conscious Living',
      name: 'Nghệ thuật sống tỉnh thức',
      lead: 'In a world that never stops moving, we are learning to live more deeply, to understand ourselves better and to nurture what lasts.',
      note: 'Living Zen is not a religion, a school or a required method. It is an open way of living.',
      scroll: 'Read the philosophy',
      figure: 'Illustration: a young tree beside still water at dawn, leaves falling slowly and ripples spreading outward.',
    },
    why: {
      eyebrow: 'Why Living Zen exists',
      title: 'Why we wrote Living Zen',
      lead: 'Some things are getting harder to hold on to in daily life today. We name them calmly, then say where we want to stand.',
      items: [
        { icon: 'wave', title: 'A flood of information', text: 'There is so much to read, watch and know each day that it is hard to tell what is worth keeping.' },
        { icon: 'path', title: 'A fast pace', text: 'Many people feel they are always running, with little room to stop and ask where they are running to.' },
        { icon: 'chat', title: 'Divided attention', text: 'Attention is precious and easily broken into pieces by screens and notifications.' },
        { icon: 'leaf', title: 'People and nature', text: 'We live because of soil, water and plants, yet the modern pace slowly pulls us away from them.' },
        { icon: 'breath', title: 'Technology and AI move fast', text: 'Technology opens many possibilities and also raises a question: is it serving people, or the other way round?' },
        { icon: 'compass', title: 'A need for autonomy and meaning', text: 'Through all of this, many people want to live with more autonomy and meaning, and to care for their health as a whole.' },
      ],
      closing: 'Living Zen is not an answer to all of this. It is a gentle invitation: pause, see clearly, then choose how to live in your own way.',
      natureTitle: 'What Living Zen is, and is not',
      nature: 'Living Zen is nurtured by Eastern wisdom, meditation and mindfulness, modern psychology, the scientific spirit, natural farming, ecosystem thinking, ethical technology, a sustainable economy, community wisdom and a spirit of service. We do not absolutise any source of knowledge, we do not use unsupported scientific claims to justify spiritual belief, and we respect each person’s freedom to perceive, experience and choose.',
      place: 'Hương Thiền Nature is the ecosystem. Living Zen is the philosophical foundation that guides it, not a separate brand.',
      figure: 'Illustration: small dots, scattered at first, slowly settle into one calm line beside a slowly breathing glow.',
    },
    manifesto: {
      eyebrow: 'Manifesto',
      title: 'Living Zen — The Art of Conscious Living',
      intro: [
        'Hương Thiền Nature began from a belief that human growth does not have to be paid for with inner peace, the health of nature or the freedom of the people around us.',
        'We are working toward a way of living where wisdom is shared, nature is respected, technology is used with awareness, the economy is built on real value, and each person is free to grow along their own path.',
        'We are not trying to build a belief system that everyone must follow. We hope to create conditions in which each person can observe for themselves, experience for themselves, understand for themselves and change their own life.',
      ],
      refusals: [
        'We do not measure success by dependence.',
        'We do not treat people’s attention as a resource to be mined.',
        'We do not trade away basic values for profit.',
      ],
      outro: [
        'We honour ancient wisdom, stay open to modern science, learn from nature and listen to the many experiences of our community.',
        'Hương Thiền Nature is not a journey toward perfection. It is a journey of continually learning, practising, correcting and growing.',
      ],
      seal: 'That is the spirit of Living Zen.',
    },
    model: {
      eyebrow: 'The three-layer model',
      title: 'Three dimensions, one still centre',
      lead: 'From the centre of awareness, life opens like the growth rings of a tree: first within, then through our connections, then as what we give back.',
      awareness: {
        name: 'Awareness',
        english: 'Tỉnh thức',
        text: 'The ability to notice ourselves, our circumstances, our actions and what those actions lead to. Awareness is not a perfect state or a spiritual title. It is something we can forget and remember again every day.',
      },
      tabsLabel: 'Choose a dimension to read its values',
      centreTab: 'The centre',
      noHierarchy: 'The three layers are not three ranks. No one stands higher than anyone else: they are three dimensions that support one another, and anyone can begin from any of them.',
      relationTitle: 'How this relates to Body – Heart – Mind',
      relation: 'Body – Heart – Mind is Hương Thiền Nature’s model for nurturing a person: caring for the body, settling the heart, opening the mind. The three Living Zen layers are the thread of values running behind that model. Body – Heart – Mind says what we nurture; the three layers say in what spirit we nurture it.',
      valuesLabel: 'Values in this dimension',
      figure: 'Illustration: three concentric growth rings around a glowing centre; each ring carries small round seeds, one for each value in that dimension (three, three and four).',
    },
    values: {
      eyebrow: 'Ten core values',
      title: 'Ten values, ten ways of seeing one way of living',
      lead: 'Each value stands on its own and also supports the others. Open any value to read its philosophy, applications, commitment and a question for reflection.',
      note: 'The “Applications” and “Commitment” parts are directions we work toward, not claims that everything is already done.',
      labels: {
        philosophy: 'Philosophy', applications: 'In practice', commitment: 'Our commitment',
        reflection: 'A question to reflect on', related: 'Related reading', example: 'A real example', open: 'Read more', close: 'Close',
      },
    },
    refrain: {
      eyebrow: 'Our boundaries',
      title: 'What we choose not to do',
      lead: 'Some things we choose not to do, so the rest has room to grow. This is how we hold ourselves, not a judgement of anyone else.',
      items: [
        'We do not treat attention as an unlimited resource.',
        'We do not create spiritual dependence.',
        'We do not promise results that have not been shown.',
        'We do not impose beliefs.',
        'We do not use behaviour-manipulating tricks to sell.',
        'We do not collect more data than we actually need.',
        'We do not trade away honesty just to grow.',
        'We do not treat any person or school of thought as beyond error.',
      ],
    },
    practice: {
      eyebrow: 'From philosophy to daily life',
      title: 'A philosophy only means something when it enters daily life',
      lead: 'The six fields below are where Living Zen is tested every day. Each link goes to a place that really exists on this website or in the ecosystem.',
      figure: 'Illustration: roots spreading underground, sap rising through the trunk and lifting six leaves, each one a field of daily life.',
      fields: [
        { id: 'practice', icon: 'lotus', title: 'Meditation and practice', text: 'Nurturing presence and the ability to observe ourselves.', links: [{ target: { to: 'guidance' }, label: 'Practice courses' }, { target: { to: 'practice' }, label: 'Practice suggestions' }] },
        { id: 'education', icon: 'book', title: 'Education and knowledge', text: 'Encouraging lifelong learning and independent thinking.', links: [{ target: { to: 'journal' }, label: 'Journal' }] },
        { id: 'farm', icon: 'sprout', title: 'Nature and farming', text: 'Learning to live in connection with the ecosystem.', links: [{ target: { to: 'ecosystem-partners' }, label: 'Our partners' }] },
        { id: 'food', icon: 'leaf', title: 'Food and health', text: 'Nourishing the body with suitable, conscious choices.', links: [{ target: { to: 'shop-food' }, label: 'Naturally grown food' }] },
        { id: 'tech', icon: 'breath', title: 'Technology', text: 'Building tools that support autonomy, effectiveness and quality of life.', links: [{ target: { to: 'zenwork' }, label: 'ZenWork' }] },
        { id: 'service', icon: 'hands', title: 'Economy and service', text: 'Creating real value, healthy livelihoods and fair exchange.', links: [{ target: { to: 'shop' }, label: 'Shop' }, { target: { to: 'support' }, label: 'Support fund' }] },
      ],
      momentsTitle: 'Real moments, from the garden and from sitting still',
      momentsIntro: 'A few pictures from our album, where the philosophy meets very small things.',
    },
    commitments: {
      eyebrow: 'Our commitments to the community',
      title: 'What we commit to carrying out',
      lead: 'These are directions and commitments we need to carry out every day, not a claim that everything is already perfect. If you see us falling short of these lines, please tell us.',
      groups: [
        { id: 'learners', icon: 'sprout', title: 'Students', text: 'To respect your autonomy: no imposed beliefs, no dependence on a guide, and honesty about the scope and limits of each method.' },
        { id: 'readers', icon: 'book', title: 'Readers', text: 'To tell apart what has been verified, what is personal experience and what is belief; to name our sources when we cite; to correct ourselves when wrong.' },
        { id: 'customers', icon: 'heart', title: 'Customers', text: 'Transparent pricing, honest product descriptions, and no use of fear or insecurity to sell.' },
        { id: 'users', icon: 'chat', title: 'People who use our technology', text: 'To work toward light software that respects privacy and personal data, avoids addictive mechanisms and is open about where AI is used.' },
        { id: 'partners', icon: 'hands', title: 'Collaborators', text: 'To credit their work, listen to their feedback and be ready to admit and correct mistakes.' },
        { id: 'nature', icon: 'leaf', title: 'Nature', text: 'To weigh long-term effects in each decision, reduce waste and favour durability.' },
        { id: 'future', icon: 'sun', title: 'Future generations', text: 'To build what can keep being nurtured, rather than what is only effective in the short term.' },
      ],
    },
    essays: {
      eyebrow: 'Journal',
      title: 'Writing that walks with Living Zen',
      lead: 'A few journal pieces already speak about these things in everyday terms. The Living Zen Series will be written piece by piece, each one published only after review.',
      all: 'See the whole journal',
    },
    growing: {
      eyebrow: 'A philosophy that keeps growing',
      title: 'Living Zen is an open philosophy, and it will change',
      lead: 'As we gain new experience and understanding, we will look at these lines again together. Every change is recorded, never made quietly.',
      labels: { version: 'Philosophy version', published: 'Published', updated: 'Last updated', review: 'Regular review', reviewValue: 'Once a year', history: 'Change history', change: 'What changed', reason: 'Why', impact: 'Effect' },
      independent: 'The philosophy’s version is independent of the website’s: the website may change every week, the philosophy changes only when we truly understand more.',
      feedbackTitle: 'Share your thoughts',
      feedback: 'If anything needs clearing up, correcting or adding, write to us through the Contact page.',
      feedbackLink: 'Send us your thoughts',
      figure: 'Illustration: the growth rings of a trunk; the inner ring is version 1.0, the outermost ring is slowly growing and two dashed rings wait for later versions.',
    },
    closing: {
      title: 'Each person, their own path',
      text: 'We do not hope that everyone will walk the same path. We only hope each person can walk their own with more understanding, freedom, kindness and presence.',
    },
    changelog: [
      { version: '1.0', date: '2026-11-27', change: 'First publication: the manifesto, ten core values, the three-layer model, what we choose not to do, and our commitments to the community.', reason: 'To gather the principles that already guide our work into one open text that everyone can read, question and hold us to.', impact: 'It becomes the value foundation for the website and the projects in the ecosystem. No product or service has been changed.' },
    ],
    home: {
      eyebrow: 'The spirit of Living Zen',
      title: 'An open way of living',
      text: 'Understand yourself. Live with nature. Live self-directed. Grow together. Living Zen is not a religion and does not ask anyone to walk the same path. It is the thread of values behind everything we do.',
      link: 'Explore the philosophy',
    },
    story: {
      text: 'We keep writing this journey into an open way of living, which we call Living Zen.',
      link: 'Read the philosophy',
    },
    footerLine: 'Living Zen — The Art of Conscious Living',
  },
} satisfies Record<Language, unknown>;

/** Journal essays shown in the "Journal" section (all exist in src/data/articles.ts; the test checks it). */
export const philosophyEssays = ['sun-moon-rhythms', 'listening-to-nature', 'seven-layers', 'gentle-boundaries', 'healing-as-coming-home', 'mindful-gardening'];

/**
 * Living Zen Series — "Sống tỉnh thức giữa đời thường". DATA ONLY: nothing here is rendered, indexed or published.
 * Each piece must be written and approved by the owner before it becomes a journal article.
 */
export const livingZenSeries = {
  title: { vi: 'Living Zen Series — Sống tỉnh thức giữa đời thường', en: 'Living Zen Series — Conscious living in everyday life' },
  status: 'planned' as const,
  pieces: [
    { no: 1, valueId: 'open-wisdom', vi: 'Trí tuệ không có hàng rào', en: 'Wisdom without fences' },
    { no: 2, valueId: 'inner-sovereignty', vi: 'Khi người học không còn cần người thầy', en: 'When the learner no longer needs the teacher' },
    { no: 3, valueId: 'regenerative-living', vi: 'Học cách sống từ một khu rừng', en: 'Learning how to live from a forest' },
    { no: 4, valueId: 'interconnected-living', vi: 'Không có gì tồn tại một mình', en: 'Nothing exists alone' },
    { no: 5, valueId: 'conscious-economy', vi: 'Kiếm tiền mà không đánh mất chính mình', en: 'Earning a living without losing yourself' },
    { no: 6, valueId: 'collective-wisdom', vi: 'Không ai biết tất cả, nhưng ai cũng biết một điều', en: 'No one knows everything, but everyone knows something' },
    { no: 7, valueId: 'mindful-innovation', vi: 'Khi công nghệ biết im lặng', en: 'When technology learns to be quiet' },
    { no: 8, valueId: 'compassionate-service', vi: 'Cho đi mà không đánh mất mình', en: 'Giving without losing yourself' },
    { no: 9, valueId: 'embodied-wisdom', vi: 'Đọc một nghìn cuốn sách và học từ một chiếc lá', en: 'Reading a thousand books and learning from a leaf' },
    { no: 10, valueId: 'freedom-from-attachment', vi: 'Đừng chấp vào cả sự không chấp', en: 'Do not cling even to non-clinging' },
  ],
  style: 'Sâu sắc nhưng gần gũi; có ví dụ đời thường và chút hài hước nhẹ; không giáo điều, không lên lớp; dùng “mình/chúng mình”; tách trải nghiệm cá nhân khỏi kiến thức đã kiểm chứng.',
};

/** Value title in the page language first, the other language second (both are always shown). */
export const valueTitle = (lang: Language, value: PhilosophyValue) => lang === 'vi'
  ? { main: value.titleVi, alt: value.titleEn, altLang: 'en' as const }
  : { main: value.titleEn, alt: value.titleVi, altLang: 'vi' as const };
