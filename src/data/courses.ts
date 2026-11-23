import type { Language } from './site.ts';

export const tarotCourse = {
  thumbnail: {
    src: '/media/guidance/tarot-thumbnail.jpg',
    width: 1200,
    height: 630,
    source: 'https://pixabay.com/photos/craft-tarot-divination-2728227/',
    credit: 'AlbanyColley · Pixabay',
    alt: {
      vi: 'Những lá Tarot trải trên bàn, với lá Bánh xe Vận mệnh ở giữa.',
      en: 'Tarot cards spread across a table, with the Wheel of Fortune at the centre.',
    },
  },
  vi: {
    slug: 'tam-ly-tarot',
    title: 'Lắng nghe mình qua tarot',
    description: 'Buổi 1:1 trong 90 phút cùng Hương Thiền. Mở đầu bằng 15 phút thiền chung, sau đó dùng lá bài và đối thoại để hiểu rõ hơn một câu hỏi trong đời sống.',
  },
  en: {
    slug: 'tarot-reflection',
    title: 'Listening to yourself through tarot',
    description: 'A 90-minute one-to-one session with Hương Thiền. Begin with 15 minutes of meditation together, then use imagery and conversation to explore a question from your life.',
  },
} as const;

export const courses = [tarotCourse] as const;

export function coursePath(lang: Language, course: (typeof courses)[number] = tarotCourse) {
  return lang === 'vi'
    ? `/vi/khoa-hoc/${course.vi.slug}/`
    : `/en/courses/${course.en.slug}/`;
}
