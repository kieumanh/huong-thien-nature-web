// Living Zen 2.0: the brand essence written for visitors. Source: the owner's master prompt
// "Hương Thiền Nature — Living Zen 2.0" (2026-11-26) and the ecosystem wording in ecosystem-vision.ts.
// Thân / Tâm / Trí are told once on the home page (Ecosystem section) and once on the Ecosystem page (the three focal points), never here:
// the home page shows `home` (three pledges); the Ecosystem page shows the threads, what we are not and the promises.
import type { Language } from './site.ts';

export type Pledge = { label: string; title: string; text: string };

export const livingZen = {
  vi: {
    eyebrow: 'Living Zen',
    tagline: 'Từ thiên nhiên, trở về với chính mình.',
    intro: 'Ba trọng tâm ở trên được đan từ nhiều sợi và được giữ bằng vài lời hứa. Đây là những điều nằm phía sau mọi việc tụi mình làm, từ một bài tản văn đến một luống rau.',
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
    intro: 'The three focal points above are woven from many threads and held by a few promises. They sit behind everything we make, from a journal piece to a vegetable bed.',
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
    promiseTitle: 'How we speak with you',
    promises: [
      'We keep measured science, teaching, personal experience and spiritual belief clearly apart.',
      'We do not promise cures or supernatural transformation.',
      'We never use fear or vulnerability to invite you to sign up or buy.',
      'We do not judge anyone who has not practised yet. You begin where you are.',
    ],
  },
} satisfies Record<Language, unknown>;
