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
    searchEyebrow: 'Một điều bạn đang tìm', searchTitle: 'Tìm một bài viết cho hôm nay.',
    searchDescription: 'Một câu hỏi về hơi thở, một điều đang băn khoăn, hay cách đưa sự chú tâm vào đời sống. Bắt đầu bằng một từ khóa.',
    searchLabel: 'Bạn muốn tìm hiểu điều gì?', searchPlaceholder: 'Hơi thở, chánh niệm, làm vườn…', searchButton: 'Tìm bài viết',
    suggestionsLabel: 'Từ khóa gợi ý', suggestions: ['Hơi thở', 'Nhiều suy nghĩ', 'Làm vườn'],
    library: 'bài viết song ngữ', browse: 'Xem toàn bộ thư viện',
    readingEyebrow: 'Cho người mới bắt đầu',
    featuredTitle: 'Từ thực tập đến đời sống.',
    featuredDescription: 'Ba bài trong bộ Roots: gặp tâm đang nghĩ, chăm sóc khu vườn và nuôi dưỡng sự tử tế. Đọc chậm, thử một điều nhỏ và giữ điều phù hợp với bạn.',
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
