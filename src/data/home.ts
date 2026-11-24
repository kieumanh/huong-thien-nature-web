import { articles, type Article } from './articles.ts';
import type { Language } from './site.ts';

function publishedArticle(slug: string): Article {
  const article = articles.find(item => item.slug === slug);
  if (!article) throw new Error(`Homepage article is not published: ${slug}`);
  return article;
}

export const beginnerArticles = ['meditation-for-beginners', 'start-meditating-at-home', 'breath-meditation'].map(publishedArticle);

/** Step 4 of the beginner reading path: reassurance for restless sittings, pointing to the article that explains them. */
export const difficultSittingStep = {
  article: publishedArticle('when-meditation-is-difficult'),
  vi: {
    title: 'Thấy khó ngồi yên? Điều đó rất bình thường.',
    description: 'Tâm trí bồn chồn không có nghĩa là bạn làm sai. Có một bài viết riêng cho những ngày như thế.',
  },
  en: {
    title: 'Finding it hard to sit still? That is very common.',
    description: 'A restless mind does not mean you are doing it wrong. There is a piece written for days like these.',
  },
};

/** The beginner reading path on the practice page: three articles, then the step for restless sittings. */
export function practicePath(lang: Language) {
  return [
    ...beginnerArticles.map(article => ({ article, title: article.translations[lang].title, description: article.translations[lang].description })),
    { article: difficultSittingStep.article, title: difficultSittingStep[lang].title, description: difficultSittingStep[lang].description },
  ];
}
export const featuredArticles = ['wandering-mind', 'mindful-gardening', 'loving-kindness-meditation'].map(publishedArticle);

export const homeCopy = {
  vi: {
    start: 'Thử bài thiền đầu tiên',
    searchEyebrow: 'Tìm trong tản văn', searchTitle: 'Hôm nay bạn muốn đọc gì?',
    searchDescription: 'Bạn có thể bắt đầu bằng chính điều đang vướng trong lòng, chẳng hạn “nhiều suy nghĩ”.',
    searchLabel: 'Bạn muốn tìm hiểu điều gì?', searchPlaceholder: 'Hơi thở, chánh niệm, làm vườn…', searchButton: 'Tìm bài viết',
    suggestionsLabel: 'Từ khóa gợi ý', suggestions: ['Hơi thở', 'Nhiều suy nghĩ', 'Làm vườn'],
    library: 'bài viết song ngữ', browse: 'Xem toàn bộ thư viện',
    readingEyebrow: 'Cho người mới bắt đầu',
    featuredTitle: 'Tản văn về thiền và đời sống',
    featuredDescription: 'Khi đầu óc cứ bận một chuyện, khi đứng bên luống rau, khi khó nói với mình một lời tử tế. Ba bài này bắt đầu ở những lúc như thế.',
  },
  en: {
    start: 'Try your first meditation',
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
