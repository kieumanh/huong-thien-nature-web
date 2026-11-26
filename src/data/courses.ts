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
    eyebrow: 'Khóa thực hành 6 chặng · 2 tháng, mỗi tuần 1 buổi',
    action: 'Xem khóa Tần Số Vàng',
  },
  en: {
    slug: 'golden-frequency',
    title: 'The Golden Frequency: mastering high-frequency energy',
    description: 'A six-stage practice course with Hương Thiền: understand five kinds of frequency, locate where you are today and bring calm, clear energy into your relationships, work, career and finances.',
    eyebrow: 'Six-stage practice course · Two months, weekly',
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
 * Tarot session price, confirmed by the owner (25/11/2026): 600.000 ₫ per 90-minute session. The hero facts, sticky bar
 * and schema.org Offer all read this one figure. `price: null` falls back to "Liên hệ" / "Ask us" and publishes no Offer.
 */
export const tarotOffer: { price: number | null; currency: 'VND' } = { price: 600_000, currency: 'VND' };

export function tarotPriceLabel(lang: Language, offer: { price: number | null } = tarotOffer) {
  if (offer.price === null || !Number.isFinite(offer.price) || offer.price <= 0) return lang === 'vi' ? 'Liên hệ' : 'Ask us';
  const amount = new Intl.NumberFormat(lang === 'vi' ? 'vi-VN' : 'en-US').format(Math.round(offer.price));
  return lang === 'vi' ? `${amount} ₫ / phiên` : `${amount} VND / session`;
}

/** Contact form link that pre-fills the tarot enquiry (the form reads the allow-listed `topic=tarot`). */
export function tarotEnquiryPath(lang: Language) {
  return `${lang === 'vi' ? '/vi/lien-he/' : '/en/contact/'}?topic=tarot#interest-form`;
}

/**
 * Golden Frequency course fee, confirmed by the owner (25/11/2026). 5.600.000 ₫ is the recommended fee for 2026 and holds until
 * Tết Âm lịch 2027 (mùng 1 = 06/02/2027, Vietnam time); from then the official fee is 6.600.000 ₫. The page shows a countdown to
 * `promoEndsAt`, and the browser swaps in the official fee when it passes. Structured data lists both fees with validity dates, so no
 * rebuild is needed after Tết.
 */
export const frequencyPricing = {
  promo: 5_600_000,
  regular: 6_600_000,
  promoEndsAt: '2027-02-06T00:00:00+07:00',
} as const;

export type FrequencyOffer = { price: number | null; currency: 'VND'; regular?: number; endsAt?: string };

export function frequencyOfferFor(date: Date = new Date()): FrequencyOffer {
  const active = date.getTime() < Date.parse(frequencyPricing.promoEndsAt);
  return { price: active ? frequencyPricing.promo : frequencyPricing.regular, currency: 'VND', regular: frequencyPricing.regular, ...(active ? { endsAt: frequencyPricing.promoEndsAt } : {}) };
}

export const frequencyOffer: FrequencyOffer = frequencyOfferFor();

function money(lang: Language, price: number) {
  const amount = new Intl.NumberFormat(lang === 'vi' ? 'vi-VN' : 'en-US').format(Math.round(price));
  return lang === 'vi' ? `${amount} ₫` : `${amount} VND`;
}

export function frequencyPriceLabel(lang: Language, offer: { price: number | null } = frequencyOffer) {
  if (offer.price === null || !Number.isFinite(offer.price) || offer.price <= 0) return lang === 'vi' ? 'Liên hệ' : 'Ask us';
  return money(lang, offer.price);
}

/** Official price (formatted) shown once the recommended price has ended. */
export function frequencyRegularLabel(lang: Language) {
  return money(lang, frequencyPricing.regular);
}

/** Day and month of the last day of the recommended price (the eve of Tết), for the plain-text note. */
const promoLastDay = { vi: '05/02/2027', en: '5 February 2027' } as const;

/** One-line fee note: the recommended price and when the official fee returns. */
export function frequencyFeeNote(lang: Language, offer: FrequencyOffer = frequencyOffer) {
  if (offer.price === null || offer.endsAt === undefined) {
    return lang === 'vi' ? 'Học phí chính thức của khóa.' : 'The official course fee.';
  }
  return lang === 'vi'
    ? `Giá khuyến nghị năm 2026, áp dụng đến hết ${promoLastDay.vi} (giao thừa Tết Âm lịch). Từ mùng 1 Tết, học phí chính thức là ${money(lang, offer.regular ?? frequencyPricing.regular)}.`
    : `Recommended 2026 price, valid until the end of ${promoLastDay.en} (Lunar New Year’s Eve). From the first day of Tết the official fee is ${money(lang, offer.regular ?? frequencyPricing.regular)}.`;
}

/** Allow-listed contact topic for Golden Frequency enrolment messages. */
export const frequencyTopic = 'tan-so-vang';

export function frequencyEnquiryPath(lang: Language) {
  return `${lang === 'vi' ? '/vi/lien-he/' : '/en/contact/'}?topic=${frequencyTopic}#interest-form`;
}
