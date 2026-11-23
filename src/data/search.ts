import { tarotCourse, frequencyCourse, coursePath } from './courses.ts';
import { frequencyLanding, frequencyScientists, frequencyTypes, selfCheckDomains, weeklyPlan } from './golden-frequency.ts';
import { tarotLanding, tarotResearchCopy, tarotSources } from './tarot-guidance.ts';
import { contactPath, contactEmail, hotline } from './contact-channels.ts';
import { articles, articlePath } from './articles.ts';
import { ecosystemVision } from './ecosystem-vision.ts';
import { journeyPageKeys, journeyPages, journeyPath, partnerProfiles } from './journey-pages.ts';
import { getCopy, type Language } from './site.ts';
import { products, productPath, shopPath, productCategories, formatPrice, stockLabel } from './products.ts';
import { shopThemes, themePath } from './shop-themes.ts';
import type { SearchRecord } from '../scripts/search-engine.ts';
export type SearchEntry = SearchRecord;
const plain = (value: unknown): string => {
  if (typeof value === 'string') return value.replace(/<[^>]*>/g, ' ');
  if (Array.isArray(value)) return value.map(plain).join(' ');
  if (value && typeof value === 'object') return Object.values(value).map(plain).join(' ');
  return '';
};
export function buildSearchIndex(lang: Language): SearchEntry[] {
  const t = getCopy(lang);
  const sections = [
    ...journeyPageKeys.map(page => ({
      title: journeyPages[page][lang].heading,
      description: journeyPages[page][lang].description,
      url: journeyPath(lang, page),
      text: plain([
        journeyPages[page][lang].description,
        page === 'story' ? [t.introCopy, t.founderCopy, 'Carla Phương Cao, Thích Nhất Hạnh, Patriji, Hoàng Thị Phương Thảo, PSSM Việt Nam, Tịnh độ, Quảng Nam'] : '',
        page === 'practice' ? [t.practiceCopy, t.steps] : '',
        page === 'ecosystem' ? [t.natureCards, t.natureNote, t.phases, ecosystemVision[lang]] : '',
        page === 'team' ? partnerProfiles.map(partner => [partner.name, partner[lang], partner.label]) : '',
      ]),
    })),
    {
      title: tarotCourse[lang].title, description: tarotCourse[lang].description,
      url: coursePath(lang), text: plain([tarotLanding[lang], tarotResearchCopy[lang], tarotSources.map(person => [person.name, person.work, person[lang]])]),
    },
    {
      title: frequencyCourse[lang].title, description: frequencyCourse[lang].description,
      url: coursePath(lang, frequencyCourse),
      text: plain([
        frequencyLanding[lang], frequencyTypes.map(type => type[lang]), selfCheckDomains.map(domain => domain[lang]),
        weeklyPlan.map(entry => entry[lang]), frequencyScientists.map(person => [person.name, person[lang]]),
        lang === 'vi' ? 'tần số cao năng lượng rung động báo giá học phí khai giảng' : 'high frequency vibration energy quote fee start date',
      ]),
    },
    { title: lang === 'vi' ? 'Liên hệ Hương Thiền Nature' : 'Contact Hương Thiền Nature', description: t.contactCopy, url: contactPath(lang), text: [t.contactCopy, 'Zalo', hotline, contactEmail].join(' ') },
  ].map(entry => ({ ...entry, category: lang === 'vi' ? 'Hương Thiền Nature' : 'About us' }));
  const shopCategory = lang === 'vi' ? 'Cửa hàng' : 'Shop';
  const catalogue = { title: shopCategory, description: lang === 'vi' ? 'Catalogue gia vị, ngũ cốc và thức uống với giá tham khảo.' : 'Seasonings, grains and drinks with suggested demo prices.', url: shopPath(lang), category: shopCategory, text: lang === 'vi' ? 'Farm Botanicals sản phẩm thực phẩm chay' : 'Farm Botanicals plant-based pantry products' };
  const productEntries = products.map(product => {
    const copy = product.translations[lang];
    return { title: copy.name, description: copy.description, url: productPath(lang, product.slug), category: shopCategory, text: plain([copy, product.keywords[lang], productCategories.find(category => category.id === product.category)?.[lang]]), product: { image: product.image, imageAlt: copy.alt, price: product.price, priceLabel: formatPrice(product.price, lang), unit: copy.unit, stock: product.stock, stockLabel: stockLabel(product.stock, lang) } };
  });
  const themeEntries = shopThemes.map(theme => ({ title: theme.name[lang], description: `${theme.tagline[lang]}. ${theme.lead[lang]}`, url: themePath(lang, theme), category: shopCategory, text: [theme.name.vi, theme.name.en, theme.tagline[lang], theme.door[lang]].join(' ') }));
  return [...sections,...articles.map(article => ({title:article.translations[lang].title,description:article.translations[lang].description,url:articlePath(lang,article.slug),category:article.translations[lang].category,text:plain([article.translations[lang],article.keywords?.[lang]])})), catalogue, ...themeEntries, ...productEntries];
}
