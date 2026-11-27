// Living Zen 2.0: the brand essence written for visitors. Source: the owner's master prompt
// "Hương Thiền Nature — Living Zen 2.0" (2026-11-26) and the ecosystem wording in ecosystem-vision.ts.
// Thân / Tâm / Trí are told once on the home page (Ecosystem section) and once on the Ecosystem page (the three focal points), never here.
// Since 2.29.0 there is one Living Zen block: the main line (the philosophy's own line, chosen by the owner), a short lead taken from
// philosophyCopy[lang].home, a link to the philosophy page, and on the Home page the three pledges below. What the Ecosystem page used to
// show here (threads, what we are not, promises) now lives in src/data/philosophy.ts, so it is said once.
import type { Language } from './site.ts';

export type Pledge = { label: string; title: string; text: string };

export const livingZen = {
  vi: {
    eyebrow: 'Living Zen',
    tagline: 'Hiểu mình. Thuận tự nhiên. Sống tự chủ. Cùng trưởng thành.',
    pledges: [
      { label: 'RÕ RÀNG', title: 'Nói rõ từng điều', text: 'Điều khoa học đã đo được, điều thuộc giáo lý, trải nghiệm cá nhân và niềm tin tâm linh được kể riêng, để bạn tự cân nhắc.' },
      { label: 'THẬT LÒNG', title: 'Không hứa quá lời', text: 'Tụi mình không hứa chữa khỏi bệnh hay chuyển hóa siêu nhiên. Thực hành ở đây không thay thế chăm sóc y tế.' },
      { label: 'TỬ TẾ', title: 'Mời bằng sự tử tế', text: 'Không dùng nỗi sợ hay sự dễ tổn thương của bạn để mời đăng ký hay mua hàng.' },
    ] as Pledge[],
  },
  en: {
    eyebrow: 'Living Zen',
    tagline: 'Understand yourself. Live with nature. Live self-directed. Grow together.',
    pledges: [
      { label: 'CLARITY', title: 'Clear about what is what', text: 'Measured science, teaching, personal experience and spiritual belief are told apart, so you can weigh each for yourself.' },
      { label: 'HONESTY', title: 'No big promises', text: 'We do not promise cures or supernatural transformation. Practice here does not replace medical care.' },
      { label: 'KINDNESS', title: 'Invited with kindness', text: 'We never use fear or vulnerability to invite you to sign up or buy.' },
    ] as Pledge[],
  },
} satisfies Record<Language, unknown>;
