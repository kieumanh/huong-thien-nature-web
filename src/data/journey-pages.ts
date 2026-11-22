import type { Language } from './site.ts';

export const journeyPages = {
  practice: {
    vi: { slug: 'thuc-hanh', title: 'Thực hành', heading: 'Bắt đầu thực hành thiền và chánh niệm', description: 'Bạn có thể bắt đầu bằng một phút cảm nhận hơi thở tự nhiên hoặc bàn chân chạm đất. Hương Thiền Nature có hướng dẫn thiền tại nhà và đi bộ chánh niệm cho người mới.' },
    en: { slug: 'practice', title: 'Practice', heading: 'A first step in meditation and mindfulness', description: 'Begin with a minute of feeling your natural breath or your feet on the ground. Hương Thiền Nature offers guides to meditating at home and walking mindfully.' },
  },
  ecosystem: {
    vi: { slug: 'he-sinh-thai', title: 'Hệ sinh thái', heading: 'Hệ sinh thái Thân, Tâm và Trí', description: 'Định hướng của Hương Thiền Nature là nối việc chăm đất, thực tập thiền và học từ trải nghiệm. Tìm hiểu ba hướng Thân, Tâm và Trí, điểm mạnh và các bước dự kiến trước khi mở rộng.' },
    en: { slug: 'ecosystem', title: 'Ecosystem', heading: 'The ecosystem of Body, Heart and Mind', description: 'Hương Thiền Nature connects soil care, meditation and learning through experience. Explore the direction and strengths of Body, Heart and Mind, and what the team plans to test before growing.' },
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
    vi: 'Cố vấn Hương Thiền Nature tại Nha Trang, Khánh Hòa.',
    en: 'Hương Thiền Nature adviser in Nha Trang, Khánh Hòa.',
  },
  {
    name: 'Lê Lam Sơn',
    site: 'https://guiyeuthuongvaodat.com/',
    label: 'guiyeuthuongvaodat.com',
    logo: '/media/partners/farm-logo.svg',
    vi: 'Đối tác nông nghiệp thuận tự nhiên tại Cư M’gar, Đắk Lắk.',
    en: 'Natural farming partner in Cư M’gar, Đắk Lắk.',
  },
  {
    name: 'ZenWork',
    site: 'https://zenwork.io.vn/',
    label: 'zenwork.io.vn',
    logo: '/media/partners/zenwork-logo.webp',
    vi: 'Dự án con của Hương Thiền Nature do Kiều Mạnh vận hành. ZenWork phụ trách truyền thông và tiếp thị, thiết kế giải pháp, xây dựng và ứng dụng phần mềm vào quản lý, vận hành doanh nghiệp.',
    en: 'A Hương Thiền Nature project run by Kiều Mạnh. ZenWork handles communications and marketing, designs solutions, and builds and applies software for business management and operations.',
  },
];
