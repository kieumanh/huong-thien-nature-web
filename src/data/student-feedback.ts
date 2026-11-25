import { journeyPath } from './journey-pages.ts';
import type { Language } from './site.ts';

export const feedbackPath = (lang: Language) => journeyPath(lang, 'feedback');

/** Feedback shared by students with their consent. Add new entries to the top of `studentFeedback`; never write one on someone's behalf. */
export type StudentFeedback = {
  id: string;
  name: string;
  /** Optional portrait, only when the student (or the author) has supplied it. */
  avatar?: string;
  role: Record<Language, string>;
  /** Authors who also work with Hương Thiền Nature say so openly. */
  disclosure?: Record<Language, string>;
  /** The Vietnamese original, kept word for word. */
  quote: string[];
  /** English reading translation of the original. */
  quoteEn: string[];
  /** One sentence taken word for word from `quote`, shown first as the pull-quote. */
  highlight: string;
  /** The matching sentence of `quoteEn`. */
  highlightEn: string;
};


export const feedbackCopy = {
  vi: {
    title: 'Phản hồi học viên',
    intro: 'Những chia sẻ do chính học viên gửi, được đăng khi có sự đồng ý của họ.',
    link: 'Xem phản hồi học viên',
    all: 'Xem tất cả phản hồi',
    readAll: 'Đọc toàn bộ chia sẻ',
    close: 'Thu gọn',
    translated: 'Bản dịch tiếng Anh',
    inviteTitle: 'Bạn là học viên của Hương Thiền?',
    inviteText: 'Chúng tôi rất vui được lắng nghe trải nghiệm của bạn. Chỉ khi bạn đồng ý, lời chia sẻ mới được đăng ở đây.',
    inviteAction: 'Gửi chia sẻ của bạn',
    coursesAction: 'Xem các khóa thực hành',
  },
  en: {
    title: 'Student feedback',
    intro: 'Shared by the students themselves and published with their consent.',
    link: 'Read student feedback',
    all: 'Read all feedback',
    readAll: 'Read the full message',
    close: 'Show less',
    translated: 'English translation',
    inviteTitle: 'Are you one of Hương Thiền’s students?',
    inviteText: 'We would be glad to hear about your experience. Your words are published here only with your consent.',
    inviteAction: 'Share your experience',
    coursesAction: 'See the practice courses',
  },
} satisfies Record<Language, Record<string, string>>;

export const studentFeedback: StudentFeedback[] = [
  {
    id: 'kieu-manh',
    name: 'Kiều Mạnh',
    avatar: '/media/author-kieu-manh-avatar.webp',
    role: { vi: 'Học trò đầu tiên của giảng viên Hương Thiền', en: 'First student of teacher Hương Thiền' },
    disclosure: {
      vi: 'Kiều Mạnh hiện cũng là người hỗ trợ học viên của Hương Thiền Nature.',
      en: 'Kiều Mạnh is also the student support person at Hương Thiền Nature.',
    },
    highlight: 'Mặc dù chưa hoàn toàn vững chắc công phu, nhưng mình tin rằng mình đã có căn cơ đủ vững để tự thắp đuốc lên mà đi trên hành trình cuộc sống này.',
    highlightEn: 'My practice is not yet fully solid, but I believe my foundation is strong enough to light my own torch and walk this path of life.',
    quote: [
      'Mình gặp bạn Hương 3 năm trước (đầu 2024), trong thời gian này đến hiện tại, mình đã chứng kiến nhiều điều kỳ diệu trong thời gian đồng hành cùng cô ấy. Có nhiều lúc, mình thấy tư duy của cô ấy rất ngược đời, nhưng trực giác mình biết rằng nó đúng, và kết quả mình đã thấy nhiều sự phát triển mà mình khó tưởng tượng.',
      'Cũng nhờ cô, mình đã có 3 năm được rèn luyện thiền định, sống chánh niệm, hiểu sâu về bát chánh đạo để tự tạo giới luật, giúp định tâm và trí tuệ tăng trưởng rõ rệt. Và nếu không có cô, hiện tại có lẽ mình vẫn chỉ là 1 nhân viên đang làm văn phòng ngày 8h cùng với 4 bức tường và những người bạn quen thuộc trong thành phố, khó có cơ hội mở rộng trái tim lẫn trí tuệ cũng như sự liều lĩnh để vươn xa như hiện tại.',
      'Biết ơn cô giáo Hương đã kiên trì tạo môi trường rèn luyện mình suốt 3 năm. Mặc dù chưa hoàn toàn vững chắc công phu, nhưng mình tin rằng mình đã có căn cơ đủ vững để tự thắp đuốc lên mà đi trên hành trình cuộc sống này.',
      'Mong những điều phúc lành, may mắn và bình an sẽ luôn đồng hành cùng cô giáo. 🙏🌷🌱',
    ],
    quoteEn: [
      'I met Hương three years ago (early 2024), and in all that time I have witnessed many wonderful things while walking alongside her. At times her thinking seemed completely upside-down to me, yet my intuition told me it was right, and I have seen growth that I could hardly have imagined.',
      'Thanks to her, I have had three years of training in meditation and mindful living, and a deep understanding of the Noble Eightfold Path that let me set my own precepts, which has clearly grown my concentration and wisdom. Without her, I would probably still be an office worker, eight hours a day between four walls and the same familiar friends in the city, with little chance to open my heart and mind or find the daring to reach as far as I have.',
      'I am grateful to teacher Hương for patiently creating a training environment for me for three years. My practice is not yet fully solid, but I believe my foundation is strong enough to light my own torch and walk this path of life.',
      'May blessings, good fortune and peace always accompany her. 🙏🌷🌱',
    ],
  },
];
