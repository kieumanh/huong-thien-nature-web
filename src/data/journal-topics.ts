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
  'mindful-gardening': 'thien-nhien', 'listening-to-nature': 'thien-nhien',
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
