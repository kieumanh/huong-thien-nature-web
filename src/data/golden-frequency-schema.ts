import { courseImage, coursePath, frequencyCourse, frequencyOffer } from './courses.ts';
import { frequencyLanding } from './golden-frequency.ts';
import type { Language } from './site.ts';

const origin = 'https://huongthiennature.com';

/**
 * schema.org nodes for the Golden Frequency course page. A fee is published only when
 * `frequencyOffer.price` holds a confirmed figure, never a placeholder. While the recommended price runs, the Offer is valid
 * until the day before `endsAt` (Vietnam time).
 */
const lastDay = (endsAt: string) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(Date.parse(endsAt) - 1));

// While the recommended price runs, list both fees: the recommended one valid until the last day before Tết and the official one
// valid from Tết on. The page is static, so this keeps the data right after Tết without a rebuild.
function offers(offer: { price: number | null; currency: string; regular?: number; endsAt?: string }, url: string) {
  const base = { '@type': 'Offer', priceCurrency: offer.currency, url, availability: 'https://schema.org/InStock' };
  const current = { ...base, price: String(Math.round(offer.price as number)), ...(offer.endsAt ? { priceValidUntil: lastDay(offer.endsAt) } : {}) };
  if (!offer.endsAt || !offer.regular) return current;
  return [current, { ...base, price: String(Math.round(offer.regular)), validFrom: offer.endsAt.slice(0, 10) }];
}

export function frequencySchema(lang: Language, offer: { price: number | null; currency: string; endsAt?: string } = frequencyOffer) {
  const url = origin + coursePath(lang, frequencyCourse);
  const { title, description } = frequencyCourse[lang];
  const priced = offer.price !== null && Number.isFinite(offer.price) && offer.price > 0;
  return [
    {
      '@type': 'Service',
      '@id': url + '#service',
      name: title,
      description,
      url,
      serviceType: lang === 'vi' ? 'Khóa thực hành chánh niệm và phát triển bản thân' : 'Mindfulness and personal development practice course',
      inLanguage: lang,
      provider: { '@id': origin + '/#organization' },
      image: new URL(courseImage(frequencyCourse, lang), origin).href,
      ...(priced ? { offers: offers(offer, url) } : {}),
    },
    {
      '@type': 'FAQPage',
      '@id': url + '#faq',
      inLanguage: lang,
      mainEntity: frequencyLanding[lang].faq.map(([question, answer]) => ({
        '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ];
}
