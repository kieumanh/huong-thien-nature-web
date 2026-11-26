// Living Zen 2.0: the brand essence written for visitors. Source: the owner's master prompt
// "Hương Thiền Nature — Living Zen 2.0" (2026-11-26) and the ecosystem wording in ecosystem-vision.ts.
// THÂN / TÂM / TRÍ follow the labels already used by the home orbit (EcosystemOrbit.astro).
// The home page shows `home` (three pledges) only: Thân / Tâm / Trí already live in its Ecosystem section, so `qualities` appear on the Ecosystem page (variant 'full').
import type { Language } from './site.ts';

export type QualityIcon = 'seed' | 'meditation' | 'mind';
export type Pledge = { label: string; title: string; text: string };

export const livingZen = {
  vi: {
    eyebrow: 'Living Zen',
    tagline: 'Từ thiên nhiên, trở về với chính mình.',
    intro: 'Hương Thiền Nature là một hệ sinh thái học tập, thực hành và nuôi dưỡng đời sống tỉnh thức: kết nối mỗi người với chính mình, với thiên nhiên và với cộng đồng. Mọi điều tụi mình làm, từ một bài tản văn đến một luống rau, đều muốn giữ ba phẩm chất này.',
    qualities: [
      { icon: 'seed', label: 'THÂN', title: 'Có gốc rễ trong đất', text: 'Ăn sạch, sống chậm, chạm tay vào đất cùng các farm đối tác. Thân khỏe là chỗ dựa cho tâm an.' },
      { icon: 'meditation', label: 'TÂM', title: 'Có khoảng lặng trong tâm', text: 'Thiền, chánh niệm, hơi thở và yoga để trở về, lắng nghe và đối xử dịu dàng với chính mình.' },
      { icon: 'mind', label: 'TRÍ', title: 'Có ánh sáng trong trí', text: 'Tản văn, sách vở, lớp học và bạn đồng hành để hiểu sâu hơn và sống sáng suốt hơn mỗi ngày.' },
    ] as { icon: QualityIcon; label: string; title: string; text: string }[],
    home: {
      intro: 'Hương Thiền Nature là một hệ sinh thái học tập, thực hành và nuôi dưỡng đời sống tỉnh thức: kết nối mỗi người với chính mình, với thiên nhiên và với cộng đồng. Trước khi bạn đọc tiếp, đây là ba điều tụi mình luôn giữ.',
      pledges: [
        { label: 'RÕ RÀNG', title: 'Nói rõ từng điều', text: 'Điều khoa học đã đo được, điều thuộc giáo lý, trải nghiệm cá nhân và niềm tin tâm linh được kể riêng, để bạn tự cân nhắc.' },
        { label: 'THẬT LÒNG', title: 'Không hứa quá lời', text: 'Tụi mình không hứa chữa khỏi bệnh hay chuyển hóa siêu nhiên. Thực hành ở đây không thay thế chăm sóc y tế.' },
        { label: 'TỬ TẾ', title: 'Mời bằng sự tử tế', text: 'Không dùng nỗi sợ hay sự dễ tổn thương của bạn để mời đăng ký hay mua hàng.' },
      ] as Pledge[],
    },
    essenceTitle: 'Hệ sinh thái này đan từ những sợi nào',
    essence: ['Thiền định', 'Chánh niệm', 'Trí tuệ phương Đông', 'Tâm lý học ứng dụng', 'Tình yêu thương', 'Sống thuận tự nhiên', 'Nông nghiệp và hệ sinh thái', 'Ẩm thực chay', 'Công nghệ phục vụ con người', 'Tinh thần phụng sự'],
    notTitle: 'Tụi mình không phải là',
    not: ['một tổ chức tâm linh huyền bí', 'một nơi chỉ bán khóa học', 'một thương hiệu thương mại thiên nhiên đơn lẻ'],
    spacesTitle: 'Mỗi không gian một sắc riêng, chung một gốc',
    spaces: [
      { key: 'than', label: 'THÂN', name: 'Thân thể và thiên nhiên', holds: 'Farm đối tác, thực phẩm sạch, ẩm thực chay, vận động.', tone: 'Xanh rêu, xanh rừng, đất nung' },
      { key: 'tam', label: 'TÂM', name: 'Tâm và trái tim', holds: 'Thiền, chánh niệm, Tarot tâm lý học, phản hồi học viên.', tone: 'Tím lan, sương tím, giấy mộc' },
      { key: 'tri', label: 'TRÍ', name: 'Trí tuệ và học hỏi', holds: 'Tản văn, sách, đá thực hành, khóa Tần Số Vàng.', tone: 'Giấy mộc, vàng trầm, xanh rừng' },
    ],
    promiseTitle: 'Cách tụi mình nói chuyện với bạn',
    promises: [
      'Tách bạch điều khoa học đã đo được, điều thuộc giáo lý, trải nghiệm cá nhân và niềm tin tâm linh.',
      'Không hứa chữa khỏi bệnh, không hứa chuyển hóa siêu nhiên.',
      'Không dùng nỗi sợ hay sự dễ tổn thương để mời bạn đăng ký hay mua hàng.',
      'Không phán xét người chưa thực hành. Bạn bắt đầu từ chỗ bạn đang đứng.',
    ],
  },
  en: {
    eyebrow: 'Living Zen',
    tagline: 'Rooted in Nature. Awakened Within.',
    intro: 'Hương Thiền Nature is an ecosystem for learning, practising and nurturing an awakened life: reconnecting each person with themselves, with nature and with community. Everything we make, from a journal piece to a vegetable bed, aims to keep these three qualities.',
    qualities: [
      { icon: 'seed', label: 'BODY', title: 'Roots in the soil', text: 'Eating clean, living slowly and putting our hands in the soil with partner farms. A healthy body is the ground for a settled mind.' },
      { icon: 'meditation', label: 'MIND', title: 'Stillness in the heart', text: 'Meditation, mindfulness, breath and yoga to come home, listen and treat ourselves gently.' },
      { icon: 'mind', label: 'WISDOM', title: 'Light in the mind', text: 'Journal pieces, books, classes and companions to understand more deeply and live more clearly each day.' },
    ] as { icon: QualityIcon; label: string; title: string; text: string }[],
    home: {
      intro: 'Hương Thiền Nature is an ecosystem for learning, practising and nurturing an awakened life: reconnecting each person with themselves, with nature and with community. Before you read on, here are three things we always keep.',
      pledges: [
        { label: 'CLARITY', title: 'Clear about what is what', text: 'Measured science, teaching, personal experience and spiritual belief are told apart, so you can weigh each for yourself.' },
        { label: 'HONESTY', title: 'No big promises', text: 'We do not promise cures or supernatural transformation. Practice here does not replace medical care.' },
        { label: 'KINDNESS', title: 'Invited with kindness', text: 'We never use fear or vulnerability to invite you to sign up or buy.' },
      ] as Pledge[],
    },
    essenceTitle: 'The threads this ecosystem is woven from',
    essence: ['Meditation', 'Mindfulness', 'Eastern wisdom', 'Applied psychology', 'Loving kindness', 'Living with nature', 'Farming and ecosystems', 'Plant-based cooking', 'Technology in service of people', 'A spirit of service'],
    notTitle: 'What we are not',
    not: ['a mysterious spiritual organisation', 'a place that only sells courses', 'a single nature-products brand'],
    spacesTitle: 'Each space has its own colour, all share one root',
    spaces: [
      { key: 'than', label: 'BODY', name: 'Body and nature', holds: 'Partner farms, clean food, plant-based cooking, movement.', tone: 'Moss, forest green, earth clay' },
      { key: 'tam', label: 'MIND', name: 'Mind and heart', holds: 'Meditation, mindfulness, psychological tarot reflection, student stories.', tone: 'Orchid, orchid mist, organic paper' },
      { key: 'tri', label: 'WISDOM', name: 'Wisdom and learning', holds: 'Journal, books, practice stones, the Golden Frequency course.', tone: 'Organic paper, deep gold, forest green' },
    ],
    promiseTitle: 'How we speak with you',
    promises: [
      'We keep measured science, teaching, personal experience and spiritual belief clearly apart.',
      'We do not promise cures or supernatural transformation.',
      'We never use fear or vulnerability to invite you to sign up or buy.',
      'We do not judge anyone who has not practised yet. You begin where you are.',
    ],
  },
} satisfies Record<Language, unknown>;
