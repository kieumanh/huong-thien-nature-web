import { articles, type Article } from './articles.ts';

function publishedArticle(slug: string): Article {
  const article = articles.find(item => item.slug === slug);
  if (!article) throw new Error(`Homepage article is not published: ${slug}`);
  return article;
}

export const beginnerArticles = ['meditation-for-beginners', 'start-meditating-at-home', 'breath-meditation'].map(publishedArticle);
export const featuredArticles = ['wandering-mind', 'mindful-gardening', 'loving-kindness-meditation'].map(publishedArticle);

export const homeCopy = {
  vi: {
    start: 'Bắt đầu với Roots',
    searchEyebrow: 'Tìm trong tản văn', searchTitle: 'Hôm nay bạn muốn đọc gì?',
    searchDescription: 'Bạn có thể bắt đầu bằng chính điều đang vướng trong lòng, chẳng hạn “nhiều suy nghĩ”.',
    searchLabel: 'Bạn muốn tìm hiểu điều gì?', searchPlaceholder: 'Hơi thở, chánh niệm, làm vườn…', searchButton: 'Tìm bài viết',
    suggestionsLabel: 'Từ khóa gợi ý', suggestions: ['Hơi thở', 'Nhiều suy nghĩ', 'Làm vườn'],
    library: 'bài viết song ngữ', browse: 'Xem toàn bộ thư viện',
    readingEyebrow: 'Cho người mới bắt đầu',
    featuredTitle: 'Từ thực tập đến đời sống.',
    featuredDescription: 'Có hôm mình tập trong vườn, có hôm ngay giữa một ý nghĩ cứ trở đi trở lại. Ba bài dưới đây kể về những lúc như thế.',
  },
  en: {
    start: 'Begin with Roots',
    searchEyebrow: 'Something you are looking for', searchTitle: 'Find a reflection for today.',
    searchDescription: 'A question about breathing, something on your mind or a way to bring attention into daily life. Start with a keyword.',
    searchLabel: 'What would you like to explore?', searchPlaceholder: 'Breathing, mindfulness, gardening…', searchButton: 'Find articles',
    suggestionsLabel: 'Suggested keywords', suggestions: ['Breath', 'Wandering mind', 'Gardening'],
    library: 'bilingual articles', browse: 'Browse the full library',
    readingEyebrow: 'For a first step',
    featuredTitle: 'From practice into everyday life.',
    featuredDescription: 'Three Roots reflections: meeting a thinking mind, caring for a garden and practising kindness. Read slowly, try something small and keep what fits your life.',
  },
} as const;
