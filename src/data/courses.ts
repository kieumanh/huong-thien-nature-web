import { journeyPath } from './journey-pages.ts';
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
  return `${journeyPath(lang, 'guidance')}${course[lang].slug}/`;
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
