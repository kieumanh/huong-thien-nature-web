import { mkdir, writeFile } from 'node:fs/promises';
import { articles, articlePath } from '../src/data/articles.ts';
import packageInfo from '../package.json' with { type: 'json' };
const { version } = packageInfo;

const directory = new URL('../public/content/', import.meta.url);
await mkdir(directory, { recursive: true });
const entries = articles.filter(article => article.phase === 'roots').map((article, index) => ({
  ...article,
  publicationOrder: index + 1,
  paths: { vi: articlePath('vi', article.slug), en: articlePath('en', article.slug) },
}));
await writeFile(new URL('roots-articles.json', directory), JSON.stringify({ version, collection: 'Roots', entries }, null, 2) + '\n');
console.log(`Roots export: ${entries.length} bilingual entries.`);
