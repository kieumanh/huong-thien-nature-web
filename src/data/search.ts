import { articles, articlePath } from './articles.ts';
import { getCopy, type Language } from './site.ts';
export type SearchEntry = { title: string; description: string; url: string; category: string; text: string };
const plain = (value: unknown): string => {
  if (typeof value === 'string') return value.replace(/<[^>]*>/g, ' ');
  if (Array.isArray(value)) return value.map(plain).join(' ');
  if (value && typeof value === 'object') return Object.values(value).map(plain).join(' ');
  return '';
};
export function buildSearchIndex(lang: Language): SearchEntry[] {
  const t = getCopy(lang);
  const sections = [
    { title: t.introTitle, description: t.introCopy, url: `/${lang}/#story`, text: plain([t.introCopy,t.pillars]) },
    { title: plain(t.practiceTitle), description: t.practiceCopy, url: `/${lang}/#practice`, text: plain([t.practiceCopy,t.steps]) },
    { title: t.natureTitle, description: t.natureCopy, url: `/${lang}/#nature`, text: plain(t.natureCopy) },
    { title: lang === 'vi' ? 'Hương Thiền và Kiều Mạnh' : 'Hương Thiền and Kiều Mạnh', description: t.founderCopy, url: `/${lang}/#people`, text: plain([t.founderCopy,t.coCopy]) },
    { title: t.phasesTitle, description: lang === 'vi' ? 'Ba giai đoạn phát triển Hương Thiền Nature.' : 'The three stages of Hương Thiền Nature.', url: `/${lang}/#path`, text: plain(t.phases) },
    { title: t.contactTitle, description: t.contactCopy, url: `/${lang}/#connect`, text: t.contactCopy },
  ].map(entry => ({ ...entry, category: lang === 'vi' ? 'Hương Thiền Nature' : 'About us' }));
  return [...sections,...articles.map(article => ({title:article.translations[lang].title,description:article.translations[lang].description,url:articlePath(lang,article.slug),category:article.translations[lang].category,text:plain([article.translations[lang],article.keywords?.[lang]])}))];
}
