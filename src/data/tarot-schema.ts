import { coursePath, tarotCourse, tarotOffer } from './courses.ts';
import { tarotLanding } from './tarot-guidance.ts';
import type { Language } from './site.ts';

const origin = 'https://huongthiennature.com';

/**
 * schema.org nodes for the tarot session page. A price is published only when `tarotOffer.price`
 * holds a real figure — never a placeholder — so search engines never see an invented cost.
 */
export function tarotSchema(lang: Language, offer: { price: number | null; currency: string } = tarotOffer) {
  const url = origin + coursePath(lang);
  const { title, description } = tarotCourse[lang];
  const priced = offer.price !== null && Number.isFinite(offer.price) && offer.price > 0;
  return [
    {
      '@type': 'Service',
      '@id': url + '#service',
      name: title,
      description,
      url,
      serviceType: lang === 'vi' ? 'Buổi hướng dẫn tự phản tỉnh 1:1' : 'One-to-one guided self-reflection session',
      inLanguage: lang,
      provider: { '@id': origin + '/#organization' },
      image: new URL(tarotCourse.thumbnail.src, origin).href,
      ...(priced ? { offers: { '@type': 'Offer', price: String(Math.round(offer.price as number)), priceCurrency: offer.currency, url } } : {}),
    },
    {
      '@type': 'FAQPage',
      '@id': url + '#faq',
      inLanguage: lang,
      mainEntity: tarotLanding[lang].faq.map(([question, answer]) => ({
        '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ];
}
