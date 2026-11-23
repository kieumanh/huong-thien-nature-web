import { journeyPath } from './journey-pages.ts';
import type { Language } from './site.ts';

type CourseCopy = { slug: string; title: string; description: string; eyebrow: string; action: string };

export type Course = {
  id: string;
  thumbnail: {
    src: string;
    /** Optional per-language social image (text baked into the picture). Falls back to `src`. */
    localized?: Partial<Record<Language, string>>;
    width: number;
    height: number;
    source?: string;
    credit: string;
    alt: Record<Language, string>;
  };
  vi: CourseCopy;
  en: CourseCopy;
};

export const tarotCourse = {
  id: 'tarot',
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
    eyebrow: '1:1 cùng Hương Thiền · 90 phút',
    action: 'Xem khóa tarot',
  },
  en: {
    slug: 'tarot-reflection',
    title: 'Listening to yourself through tarot',
    description: 'A 90-minute one-to-one session with Hương Thiền. Begin with 15 minutes of meditation together, then use imagery and conversation to explore a question from your life.',
    eyebrow: 'One-to-one with Hương Thiền · 90 minutes',
    action: 'Explore the tarot course',
  },
} satisfies Course;

export const frequencyCourse = {
  id: 'golden-frequency',
  thumbnail: {
    src: '/media/guidance/tan-so-vang.jpg',
    localized: { en: '/media/guidance/golden-frequency.jpg' },
    width: 1200,
    height: 630,
    credit: 'Hương Thiền Nature',
    alt: {
      vi: 'Ảnh bìa khóa Tần Số Vàng: những vòng sóng vàng lan tỏa trên nền trời đêm, kèm dòng chữ “Làm chủ năng lượng tần số cao”.',
      en: 'The Golden Frequency cover: golden rings of waves spreading across a night sky, with the words “Mastering high-frequency energy”.',
    },
  },
  vi: {
    slug: 'tan-so-vang',
    title: 'Tần Số Vàng: làm chủ năng lượng tần số cao',
    description: 'Khóa thực hành 6 chặng cùng Hương Thiền: hiểu 5 dạng tần số, tự định vị trạng thái của mình và mang năng lượng bình an, sáng suốt vào mối quan hệ, công việc, sự nghiệp và tài chính.',
    eyebrow: 'Khóa thực hành 6 chặng · Nhận báo giá',
    action: 'Xem khóa Tần Số Vàng',
  },
  en: {
    slug: 'golden-frequency',
    title: 'The Golden Frequency: mastering high-frequency energy',
    description: 'A six-stage practice course with Hương Thiền: understand five kinds of frequency, locate where you are today and bring calm, clear energy into your relationships, work, career and finances.',
    eyebrow: 'Six-stage practice course · Ask for a quote',
    action: 'Explore The Golden Frequency',
  },
} satisfies Course;

export const courses: readonly Course[] = [frequencyCourse, tarotCourse];

export function coursePath(lang: Language, course: Course = tarotCourse) {
  return `${journeyPath(lang, 'guidance')}${course[lang].slug}/`;
}

export function courseImage(course: Course, lang: Language) {
  return course.thumbnail.localized?.[lang] ?? course.thumbnail.src;
}

/**
 * Tarot session price. Keep `price: null` until the owner confirms a figure; the page then shows
 * "Liên hệ" / "Ask us" and publishes no price in structured data. Set a whole-number VND amount
 * (e.g. `price: 600000`) and the hero facts, sticky bar and schema.org Offer all update together.
 */
export const tarotOffer: { price: number | null; currency: 'VND' } = { price: null, currency: 'VND' };

export function tarotPriceLabel(lang: Language, offer: { price: number | null } = tarotOffer) {
  if (offer.price === null || !Number.isFinite(offer.price) || offer.price <= 0) return lang === 'vi' ? 'Liên hệ' : 'Ask us';
  const amount = new Intl.NumberFormat(lang === 'vi' ? 'vi-VN' : 'en-US').format(Math.round(offer.price));
  return lang === 'vi' ? `${amount} ₫` : `${amount} VND`;
}

/** Contact form link that pre-fills the tarot enquiry (the form reads the allow-listed `topic=tarot`). */
export function tarotEnquiryPath(lang: Language) {
  return `${lang === 'vi' ? '/vi/lien-he/' : '/en/contact/'}?topic=tarot#interest-form`;
}

/**
 * Golden Frequency course fee. Keep `price: null` until the owner confirms a figure: the page then
 * invites visitors to ask for a quote and no Offer is published. A whole-number VND amount updates
 * the hero, sticky bar, quote section and structured data together.
 */
export const frequencyOffer: { price: number | null; currency: 'VND' } = { price: null, currency: 'VND' };

export function frequencyPriceLabel(lang: Language, offer: { price: number | null } = frequencyOffer) {
  if (offer.price === null || !Number.isFinite(offer.price) || offer.price <= 0) return lang === 'vi' ? 'Nhận báo giá' : 'Ask for a quote';
  const amount = new Intl.NumberFormat(lang === 'vi' ? 'vi-VN' : 'en-US').format(Math.round(offer.price));
  return lang === 'vi' ? `${amount} ₫` : `${amount} VND`;
}

/** Allow-listed contact topic for the Golden Frequency quote request. */
export const frequencyTopic = 'tan-so-vang';

export function frequencyEnquiryPath(lang: Language) {
  return `${lang === 'vi' ? '/vi/lien-he/' : '/en/contact/'}?topic=${frequencyTopic}#interest-form`;
}
