import type { Language } from './site.ts';

export const journeyPages = {
  practice: {
    vi: { slug: 'thuc-hanh', title: 'Thực hành', heading: 'Bắt đầu thực hành thiền và chánh niệm', description: 'Bạn có thể bắt đầu bằng một phút cảm nhận hơi thở tự nhiên hoặc bàn chân chạm đất. Hương Thiền Nature có hướng dẫn thiền tại nhà và đi bộ chánh niệm cho người mới.' },
    en: { slug: 'practice', title: 'Practice', heading: 'A first step in meditation and mindfulness', description: 'Begin with a minute of feeling your natural breath or your feet on the ground. Hương Thiền Nature offers guides to meditating at home and walking mindfully.' },
  },
  ecosystem: {
    vi: { slug: 'he-sinh-thai', title: 'Hệ sinh thái', heading: 'Hệ sinh thái Thân, Tâm và Trí', description: 'Hương Thiền Nature kết nối ba hướng sống thuận tự nhiên. Farm & Botanicals chăm chút bữa ăn, Eco-Retreat hướng đến nghỉ ngơi giữa thiên nhiên và Academy phát triển học liệu thực hành.' },
    en: { slug: 'ecosystem', title: 'Ecosystem', heading: 'The ecosystem of Body, Heart and Mind', description: 'Hương Thiền Nature connects three ways to live closer to nature. Farm & Botanicals starts with food, Eco-Retreat makes space for rest outdoors, and Academy develops learning materials.' },
  },
  story: {
    vi: { slug: 'cau-chuyen', title: 'Câu chuyện', heading: 'Từ một chỗ ngồi yên đến Hương Thiền Nature', description: 'Đỗ Thị Kim Hương, thường gọi là Hương Thiền, sáng lập Hương Thiền Nature để đưa thiền định và chánh niệm vào đời sống. Câu chuyện bắt đầu từ những năm tháng cô tự lo cho mình ở Quảng Nam.' },
    en: { slug: 'story', title: 'Our story', heading: 'From a quiet seat to Hương Thiền Nature', description: 'Đỗ Thị Kim Hương, known as Hương Thiền, founded Hương Thiền Nature to bring meditation and mindfulness into everyday life. Her story begins in Quảng Nam, where she learned to look after herself early.' },
  },
  team: {
    vi: { slug: 'doi-ngu', title: 'Đội ngũ', heading: 'Những người làm nên Hương Thiền Nature', description: 'Hương Thiền sáng lập và phụ trách chuyên môn thiền. Kiều Mạnh đồng sáng lập, viết, biên tập và phụ trách truyền thông. Dự án còn có cố vấn, đối tác làm nông và nhóm phát triển công nghệ.' },
    en: { slug: 'team', title: 'Team', heading: 'The people behind Hương Thiền Nature', description: 'Hương Thiền founded the project and leads meditation practice. Co-founder Kiều Mạnh writes, edits and leads communications. An adviser, a farming partner and a technology team work alongside them.' },
  },
} as const;

export type JourneyPage = keyof typeof journeyPages;
export const journeyPageKeys = Object.keys(journeyPages) as JourneyPage[];
export const journeyPath = (lang: Language, page: JourneyPage) => `/${lang}/${journeyPages[page][lang].slug}/`;

export const partnerProfiles = [
  {
    name: 'Nguyễn Trần Quyết',
    site: 'https://kimtuthap.org/',
    label: 'kimtuthap.org',
    logo: '/media/partners/kim-tu-thap-logo.webp',
    image: null,
    logoLabel: 'Thiền Định Kim Tự Tháp',
    source: 'https://kimtuthap.org/',
    vi: {
      role: 'Cố vấn dự án · Nha Trang, Khánh Hòa',
      bio: 'Anh Quyết đồng hành với Hương Thiền Nature trong vai trò cố vấn tại Nha Trang. Trên website Thiền Định Kim Tự Tháp, anh được ghi tên là dịch giả của cuốn Thiền rất đơn giản, tài liệu nhập môn dành cho người mới.',
    },
    en: {
      role: 'Project adviser · Nha Trang, Khánh Hòa',
      bio: 'Quyết advises Hương Thiền Nature in Nha Trang. The Pyramid Meditation website credits him as the translator of Thiền rất đơn giản, an introductory meditation guide.',
    },
  },
  {
    name: 'Lê Lam Sơn',
    site: 'https://guiyeuthuongvaodat.com/',
    label: 'guiyeuthuongvaodat.com',
    logo: '/media/partners/farm-logo.svg',
    image: { src: '/media/partners/le-lam-son.webp', width: 640, height: 640, vi: 'Lê Lam Sơn ôm thúng rau trong vườn', en: 'Lê Lam Sơn holding a basket of greens in his garden' },
    source: 'https://guiyeuthuongvaodat.com/gioi-thieu/',
    vi: {
      role: 'Đối tác nông nghiệp thuận tự nhiên · Cư M’gar, Đắk Lắk',
      bio: 'Tại nông trại Gửi Yêu Thương Vào Đất, anh Sơn chia sẻ cách chăm đất và trồng thực phẩm theo điều kiện của khu vườn. Dự án học cùng anh từ những việc cụ thể như phủ luống, quan sát đất và theo dõi cây qua từng mùa.',
    },
    en: {
      role: 'Natural farming partner · Cư M’gar, Đắk Lắk',
      bio: 'At Gửi Yêu Thương Vào Đất farm, Sơn shares how he cares for soil and grows food in response to local conditions. The project learns alongside him through work such as mulching, observing the soil and watching crops change with the seasons.',
    },
  },
  {
    name: 'ZenWork',
    site: 'https://zenwork.io.vn/',
    label: 'zenwork.io.vn',
    logo: '/media/partners/zenwork-logo.webp',
    image: null,
    logoLabel: 'ZenWork',
    source: 'https://github.com/kieumanh/zen-work/blob/main/public/logo.png',
    vi: {
      role: 'Dự án công nghệ của Hương Thiền Nature',
      bio: 'ZenWork phụ trách công nghệ, hỗ trợ truyền thông và phát triển phần mềm từ những nhu cầu có thật. Một hướng đang làm là giúp nhóm theo dõi công việc, bàn giao giữa các công cụ AI và kiểm tra kết quả theo tiêu chí đã thống nhất.',
    },
    en: {
      role: 'A technology project by Hương Thiền Nature',
      bio: 'ZenWork leads technology, supports communications and develops software around practical needs. One current area of work helps teams track tasks, hand work between AI tools and review results against agreed criteria.',
    },
  },
];
