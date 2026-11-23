import { courseImage, coursePath, frequencyCourse, frequencyOffer } from './courses.ts';
import { frequencyLanding } from './golden-frequency.ts';
import type { Language } from './site.ts';

const origin = 'https://huongthiennature.com';

/**
 * schema.org nodes for the Golden Frequency course page. A fee is published only when
 * `frequencyOffer.price` holds a confirmed figure, never a placeholder.
 */
export function frequencySchema(lang: Language, offer: { price: number | null; currency: string } = frequencyOffer) {
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
      ...(priced ? { offers: { '@type': 'Offer', price: String(Math.round(offer.price as number)), priceCurrency: offer.currency, url } } : {}),
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
