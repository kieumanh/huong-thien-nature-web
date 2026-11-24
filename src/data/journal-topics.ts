import type { Language } from './site';
import { articles, type Article } from './articles.ts';

// Topic groups for the journal (2.14.0). Readers click a group instead of typing a keyword.
// Every published article belongs to exactly one topic; tests/journal.test.ts enforces this.

type Text = Record<Language, string>;
export const journalTopics = [
  { id: 'bat-dau', label: { vi: 'Bắt đầu thiền', en: 'Getting started' } },
  { id: 'hoi-tho-co-the', label: { vi: 'Hơi thở & cơ thể', en: 'Breath & body' } },
  { id: 'cam-xuc-chua-lanh', label: { vi: 'Cảm xúc & chữa lành', en: 'Emotions & healing' } },
  { id: 'yeu-thuong', label: { vi: 'Yêu thương & quan hệ', en: 'Kindness & relationships' } },
  { id: 'doi-song', label: { vi: 'Đời sống tỉnh thức', en: 'Mindful living' } },
  { id: 'thien-nhien', label: { vi: 'Thiên nhiên', en: 'Nature' } },
] as const satisfies readonly { id: string; label: Text }[];

export type JournalTopic = (typeof journalTopics)[number]['id'];

export const articleTopics: Record<string, JournalTopic> = {
  'what-is-meditation': 'bat-dau', 'meditation-for-beginners': 'bat-dau', 'start-meditating-at-home': 'bat-dau', 'meditation-habit': 'bat-dau',
  'breath-meditation': 'hoi-tho-co-the', 'natural-breathing': 'hoi-tho-co-the', 'body-mindfulness': 'hoi-tho-co-the', 'meditation-posture': 'hoi-tho-co-the',
  'healing-as-coming-home': 'cam-xuc-chua-lanh', 'staying-with-strong-emotions': 'cam-xuc-chua-lanh', 'walking-through-loss': 'cam-xuc-chua-lanh',
  'wandering-mind': 'cam-xuc-chua-lanh', 'when-meditation-is-difficult': 'cam-xuc-chua-lanh', 'returning-attention': 'cam-xuc-chua-lanh',
  'loving-kindness-meditation': 'yeu-thuong', 'gentle-boundaries': 'yeu-thuong',
  'everyday-mindfulness': 'doi-song', 'small-joys-gratitude': 'doi-song', 'seven-layers': 'doi-song',
  'mindful-gardening': 'thien-nhien', 'listening-to-nature': 'thien-nhien', 'sun-moon-rhythms': 'thien-nhien',
};

export function topicOf(article: Article): JournalTopic {
  const topic = articleTopics[article.slug];
  if (!topic) throw new Error(`Article has no journal topic: ${article.slug}`);
  return topic;
}
export const topicLabel = (topic: JournalTopic, lang: Language) => journalTopics.find(item => item.id === topic)!.label[lang];

/** Who an article suits, shown on the card like the reference library. */
export function audienceOf(article: Article, lang: Language) {
  const forEveryone = ['cam-xuc-chua-lanh', 'yeu-thuong', 'doi-song', 'thien-nhien'].includes(topicOf(article));
  return forEveryone ? (lang === 'vi' ? 'Mọi người' : 'Everyone') : (lang === 'vi' ? 'Người mới' : 'Beginners');
}

export function articleWords(article: Article, lang: Language) {
  const t = article.translations[lang];
  return [t.introduction, ...t.sections.flatMap(section => section.paragraphs), ...t.practice.steps].join(' ').trim().split(/\s+/).length;
}

// "Không biết bắt đầu từ đâu?" — three guided lanes.
export const readingLanes = [
  { id: 'moi-bat-dau', title: { vi: 'Mới làm quen với thiền', en: 'New to meditation' }, note: { vi: 'Hiểu thiền là gì và ngồi buổi đầu tiên.', en: 'Understand meditation and sit for the first time.' }, slugs: ['what-is-meditation', 'meditation-for-beginners', 'breath-meditation', 'start-meditating-at-home'] },
  { id: 'dang-met', title: { vi: 'Đang mệt, muốn dịu lại', en: 'Tired and wanting to soften' }, note: { vi: 'Cho những ngày lòng nặng và đầu óc không chịu nghỉ.', en: 'For heavy-hearted days and a mind that will not rest.' }, slugs: ['healing-as-coming-home', 'staying-with-strong-emotions', 'wandering-mind'] },
  { id: 'song-tinh-thuc', title: { vi: 'Muốn sống tỉnh thức mỗi ngày', en: 'Living mindfully every day' }, note: { vi: 'Mang sự chú tâm vào việc nhà, các mối quan hệ và niềm vui nhỏ.', en: 'Bringing attention to chores, relationships and small joys.' }, slugs: ['everyday-mindfulness', 'gentle-boundaries', 'small-joys-gratitude'] },
] as const;

export const laneArticles = (slugs: readonly string[]) => slugs.map(slug => {
  const article = articles.find(item => item.slug === slug);
  if (!article) throw new Error(`Reading lane article is not published: ${slug}`);
  return article;
});

/** The article shown as an open book at the top of the journal. Change this one line to feature another. */
export const featuredSlug = 'healing-as-coming-home';
export const featuredArticle = () => {
  const article = articles.find(item => item.slug === featuredSlug);
  if (!article) throw new Error(`Featured article is not published: ${featuredSlug}`);
  return article;
};

/** At most three related pieces: the ones the author linked, then the same topic, then anything else, never the article itself. */
export function relatedArticles(article: Article, limit = 3): Article[] {
  const pool = articles.filter(item => item.slug !== article.slug);
  const picked: Article[] = [];
  const add = (item?: Article) => { if (item && item.slug !== article.slug && !picked.includes(item) && picked.length < limit) picked.push(item); };
  for (const slug of article.relatedSlugs ?? []) add(pool.find(item => item.slug === slug));
  for (const item of pool) if (topicOf(item) === topicOf(article)) add(item);
  for (const item of pool) add(item);
  return picked;
}

/** Previous and next article in the library order, wrapping at the ends. */
export function neighbours(article: Article) {
  const index = articles.findIndex(item => item.slug === article.slug);
  return { previous: articles[(index - 1 + articles.length) % articles.length], next: articles[(index + 1) % articles.length] };
}

/** Thin-line icon paths (24x24) for the topic chips. */
export const topicIcons: Record<JournalTopic, string> = {
  'bat-dau': 'M12 20v-9m0 3c-4 0-6-2-6-6 4 0 6 2 6 6Zm0-2c0-4 2-6 6-6 0 4-2 6-6 6Z',
  'hoi-tho-co-the': 'M3 9c3-3 5 3 9 0s6 3 9 0M3 15c3-3 5 3 9 0s6 3 9 0',
  'cam-xuc-chua-lanh': 'M12 19s-7-4-7-9.5C5 7 7 5.5 9 5.5c1.3 0 2.3.7 3 1.8.7-1.1 1.7-1.8 3-1.8 2 0 4 1.5 4 4C19 15 12 19 12 19Z',
  'yeu-thuong': 'M9 7.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  'doi-song': 'M12 4v2m0 12v2M4 12h2m12 0h2M6.3 6.3l1.4 1.4m8.6 8.6 1.4 1.4m0-11.4-1.4 1.4M7.7 16.3l-1.4 1.4M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z',
  'thien-nhien': 'M6 18c0-7 5-12 12-12 0 7-5 12-12 12Zm0 0 7-7',
};

/** Editorial order for "Bài viết được tuyển chọn": the featured piece, then the three reading lanes in order, then the rest as published. */
export function curatedRank(slug: string): number {
  const order = [featuredSlug, ...readingLanes.flatMap(lane => lane.slugs)];
  const index = order.indexOf(slug);
  return index === -1 ? order.length + articles.findIndex(item => item.slug === slug) : index;
}

/** Plain text used by the listing search box before the full-text index has loaded. */
export function articleKeywords(article: Article, lang: Language): string {
  return [article.translations[lang].title, article.translations[lang].description, article.keywords?.[lang] ?? '', topicLabel(topicOf(article), lang), article.translations[lang].category].join(' ');
}
