import type { Language } from './site.ts';

export type CourseKey = 'golden-frequency' | 'tarot';

/** Side-by-side facts that help a visitor choose between the two practice courses. Only confirmed facts. */
export const courseCompare = {
  vi: {
    title: 'Nên chọn khóa nào?',
    intro: 'Hai hướng thực hành khác nhau. Chọn theo điều bạn đang cần lúc này.',
    current: 'Bạn đang xem',
    rows: ['Phù hợp khi', 'Hình thức', 'Bạn mang về', 'Đồng hành', 'Học phí'],
    courses: {
      'golden-frequency': {
        name: 'Tần Số Vàng',
        values: [
          'Bạn muốn một lộ trình thực hành để nâng trạng thái sống trong mối quan hệ, công việc và đời sống.',
          'Lớp online, 1 tháng, khai giảng hằng tháng.',
          'Bản đồ tần số, bộ công cụ 10 phút mỗi ngày, bài tập tuần và hỗ trợ sau khóa.',
          'Hương Thiền hướng dẫn; Kiều Mạnh hỗ trợ học viên.',
          'Báo giá qua tin nhắn.',
        ],
        chips: ['Lớp online', '1 tháng · 6 chặng', 'Khai giảng hằng tháng'],
        action: 'Xem khóa Tần Số Vàng',
      },
      tarot: {
        name: 'Tarot tâm lý học 1:1',
        values: [
          'Bạn có một câu hỏi hoặc tình huống cụ thể muốn làm rõ.',
          'Một buổi 1:1 cùng Hương Thiền, 90 phút. Gặp trực tiếp nếu ở cùng vị trí, online cho bạn ở xa.',
          'Một cảm xúc được gọi tên, một cách hiểu mới và một bước nhỏ vừa sức.',
          'Đối thoại trực tiếp với Hương Thiền trong buổi gặp.',
          'Báo giá qua tin nhắn.',
        ],
        chips: ['1:1 cùng Hương Thiền', '90 phút', 'Trực tiếp hoặc online'],
        action: 'Xem buổi Tarot 1:1',
      },
    },
  },
  en: {
    title: 'Which one is right for you?',
    intro: 'Two different kinds of practice. Choose by what you need right now.',
    current: 'You are viewing',
    rows: ['Right when', 'Format', 'What you take home', 'Who is with you', 'Fee'],
    courses: {
      'golden-frequency': {
        name: 'The Golden Frequency',
        values: [
          'You want a practice path to raise your state of living in relationships, work and daily life.',
          'Online class, one month, starting every month.',
          'A frequency map, a 10-minutes-a-day toolkit, weekly exercises and support after the course.',
          'Hương Thiền guides; Kiều Mạnh supports students.',
          'Quote by message.',
        ],
        chips: ['Online class', 'One month · six stages', 'Starts every month'],
        action: 'View The Golden Frequency',
      },
      tarot: {
        name: 'Psychological tarot 1:1',
        values: [
          'You have a specific question or situation you want to make clearer.',
          'A one-to-one, 90-minute session with Hương Thiền. In person if you are nearby, online if you are far away.',
          'A feeling named, a new way of seeing it and one small, manageable step.',
          'A direct conversation with Hương Thiền during the session.',
          'Quote by message.',
        ],
        chips: ['1:1 with Hương Thiền', '90 minutes', 'In person or online'],
        action: 'View the 1:1 tarot session',
      },
    },
  },
} satisfies Record<Language, unknown>;
