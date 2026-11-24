import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { articles, articlePath, journalPath } from '../src/data/articles.ts';
import { articleFigures, figuresFor, illustrations } from '../src/data/article-figures.ts';
import { articleIllustrations } from '../src/data/editorial-illustrations.ts';
import { healingArticles } from '../src/data/healing-articles.ts';
import { articleTopics, articleWords, journalTopics, readingLanes } from '../src/data/journal-topics.ts';
import { frequencyEmpathy, homeEmpathy, tarotEmpathy } from '../src/data/empathy.ts';

const langs = ['vi', 'en'] as const;
const dist = (path: string) => new URL(`../dist${path}`, import.meta.url);

test('five new healing articles are 1,200–2,200 Vietnamese words with an English version', () => {
  assert.equal(healingArticles.length, 5);
  for (const article of healingArticles) {
    const words = articleWords(article, 'vi');
    assert.ok(words >= 1200 && words <= 2200, `${article.slug}: ${words} words`);
    assert.ok(article.translations.en.sections.length >= 3 && article.translations.en.practice.steps.length >= 4);
    assert.match(article.image, /^\/media\/journey\/[a-z0-9-]+\.webp$/, 'covers are our own album photos, not stock');
    for (const lang of langs) assert.match(article.translations[lang].note, /115/, `${article.slug}: crisis line in the ${lang} note`);
  }
});

test('every article shows at least three images in both languages, none from new stock photos', () => {
  for (const article of articles) {
    for (const lang of langs) {
      const content = article.translations[lang];
      const figures = figuresFor(article.slug, lang, article.translations.vi.sections.length, content.sections.length);
      const extra = lang === 'vi' && articleIllustrations[article.slug] ? 1 : 0;
      assert.ok(1 + figures.length + extra >= 3, `${article.slug}/${lang}: only ${1 + figures.length + extra} images`);
      for (const figure of figures) {
        assert.ok(figure.after >= 1 && figure.after <= content.sections.length);
        assert.ok(figure.alt.length > 20 && figure.caption.length > 8);
        assert.ok(existsSync(new URL(`../public${figure.src}`, import.meta.url)), figure.src);
        assert.ok(!figure.src.includes('pixabay'));
      }
    }
  }
  for (const id of Object.keys(illustrations)) {
    const svg = readFileSync(new URL(`../public/media/illustrations/${id}.svg`, import.meta.url), 'utf8');
    assert.ok(svg.startsWith('<svg') && svg.includes('<title>') && !/<script|href="http/i.test(svg), `${id}.svg is a safe, titled illustration`);
  }
  assert.ok(Object.values(articleFigures).flat().every(item => /^(album|ill):/.test(item.ref)));
});

test('every article belongs to exactly one topic and every topic has articles', () => {
  for (const article of articles) assert.ok(articleTopics[article.slug], `${article.slug} has no topic`);
  assert.equal(Object.keys(articleTopics).length, articles.length, 'no stale topic entries');
  for (const topic of journalTopics) assert.ok(articles.some(article => articleTopics[article.slug] === topic.id), topic.id);
  for (const lane of readingLanes) for (const slug of lane.slugs) assert.ok(articles.some(article => article.slug === slug), slug);
});

test('empathy blocks speak to real difficulties, offer a step and always include crisis guidance', () => {
  const paths = { practice: '/p/', contact: '/c/', frequency: '/f/', tarot: '/t/', ecosystem: '/e/', article: (slug: string) => `/a/${slug}/` };
  for (const lang of langs) {
    for (const block of [homeEmpathy(lang, paths), frequencyEmpathy(lang), tarotEmpathy(lang)]) {
      assert.ok(block.cards.length >= 5);
      for (const card of block.cards) assert.ok(card.feeling && card.understanding.length > 40 && card.step && card.href);
      assert.match(block.care, /115/);
    }
  }
});

test('built pages: journal filters by topic without a keyword box, empathy anchors resolve', () => {
  for (const lang of langs) {
    if (!existsSync(dist(`${journalPath(lang)}index.html`))) continue;
    const journal = readFileSync(dist(`${journalPath(lang)}index.html`), 'utf8');
    assert.ok(!journal.includes('type="search"') && !journal.includes('data-journal-search'), `${lang}: keyword search removed`);
    assert.equal((journal.match(/class="journal-topic"/g) ?? []).length, journalTopics.length + 1);
    assert.equal((journal.match(/data-topic="[a-z-]+"/g) ?? []).length - journalTopics.length - 1, articles.length, 'each card carries its topic');
    assert.ok(journal.includes('data-journal-pages'), `${lang}: pagination mount present`);
    assert.ok(articles.length > 9, 'more than one page of articles');
    const home = readFileSync(dist(`/${lang}/index.html`), 'utf8');
    assert.ok(home.indexOf('id="welcome"') > 0 && home.indexOf('id="welcome"') < home.indexOf('id="story"'), 'welcome comes right after the hero');
    for (const article of healingArticles) assert.ok(existsSync(dist(`${articlePath(lang, article.slug)}index.html`)));
  }
});

test('built practice page: breathing guide, reading path and quick links', () => {
  for (const [lang, path] of [['vi', '/vi/goi-y/'], ['en', '/en/suggestions/']]) {
    if (!existsSync(dist(`${path}index.html`))) continue;
    const page = readFileSync(dist(`${path}index.html`), 'utf8');
    assert.ok(page.includes('data-breath-button'), `${lang}: breathing guide`);
    assert.match(page, /115/, `${lang}: crisis line in breathing note`);
    assert.equal((page.match(/practice-path__item/g) ?? []).length >= 3, true, `${lang}: three reading steps`);
    for (const id of ['practice', 'start-reading', 'quiet-moments']) assert.ok(page.includes(`id="${id}"`), `${lang}: #${id}`);
  }
});
