import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { articles, articlePath, journalPath } from '../src/data/articles.ts';
import { articleFigures, figuresFor, illustrations } from '../src/data/article-figures.ts';
import { articleIllustrations } from '../src/data/editorial-illustrations.ts';
import { healingArticles } from '../src/data/healing-articles.ts';
import { articleTopics, articleWords, curatedRank, featuredArticle, journalTopics, neighbours, readingLanes, relatedArticles } from '../src/data/journal-topics.ts';
import { articleReflections } from '../src/data/article-reflections.ts';
import { coverOverrides } from '../src/data/article-covers.ts';
import { articlePhotos } from '../src/data/article-photos.ts';
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
    for (const lang of langs) assert.doesNotMatch(article.translations[lang].note, /115/, `${article.slug}: no emergency number in the ${lang} note`);
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
  for (const [id, art] of Object.entries(illustrations)) {
    for (const file of art.localized ? [`${id}.svg`, `${id}.en.svg`] : [`${id}.svg`]) {
      const svg = readFileSync(new URL(`../public/media/illustrations/${file}`, import.meta.url), 'utf8');
      assert.ok(svg.startsWith('<svg') && svg.includes('<title>') && !/<script|href="http/i.test(svg), `${file} is a safe, titled illustration`);
    }
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
      assert.doesNotMatch(block.care, /115/);
    }
  }
});

test('built pages: journal has search, sort, topic chips with icons, an open-page feature; empathy anchors resolve', () => {
  for (const lang of langs) {
    if (!existsSync(dist(`${journalPath(lang)}index.html`))) continue;
    const journal = readFileSync(dist(`${journalPath(lang)}index.html`), 'utf8');
    assert.equal((journal.match(/type="search"/g) ?? []).length, 1, `${lang}: one search box`);
    assert.ok(journal.includes('data-journal-query') && journal.includes('data-chance-button'), `${lang}: search, sort and "a chance encounter"`);
    assert.ok(!journal.includes('data-journal-sort'), `${lang}: no sort control, the list is always newest first`);
    assert.ok(!journal.includes('journal-lane__number'), `${lang}: reading lanes carry no numbers`);
    const dates = [...journal.matchAll(/data-date="([^"]*)"/g)].map(match => match[1]);
    const dated = dates.filter(Boolean);
    assert.deepEqual(dated, [...dated].sort().reverse(), `${lang}: cards are listed newest first`);
    assert.ok(dates.slice(0, dated.length).every(Boolean) && dates.slice(dated.length).every(date => date === ''), `${lang}: articles without a date come last`);
    assert.match(journal, /action="\/(vi\/timkiem|en\/search)\/"/, `${lang}: without JavaScript the box opens the site search`);
    assert.equal((journal.match(/class="journal-topic"/g) ?? []).length, journalTopics.length + 1);
    assert.equal((journal.match(/class="topic-icon"/g) ?? []).length, journalTopics.length + 1, `${lang}: every chip has a thin-line icon`);
    assert.equal((journal.match(/data-journal-card/g) ?? []).length, articles.length, `${lang}: one card per article`);
    assert.equal((journal.match(/data-topic="[a-z-]+"/g) ?? []).length - journalTopics.length - 1, articles.length, 'each card carries its topic');
    for (const key of ['data-slug', 'data-keywords', 'data-minutes', 'data-curated']) assert.equal((journal.match(new RegExp(`${key}=`, 'g')) ?? []).length, articles.length, `${lang}: ${key} on every card`);
    assert.ok(journal.includes('data-journal-pages') && journal.includes('journal-book'), `${lang}: pagination and open-page feature`);
    assert.ok(!journal.includes('class="journal-number"'), 'numbers on cards are gone');
    assert.ok(journal.includes('"@type":"CollectionPage"') && journal.includes('"@type":"BreadcrumbList"'), `${lang}: structured data`);
    assert.ok(articles.length > 9, 'more than one page of articles');
    const thumbs = journal.match(/src="\/media\/thumbs\/[a-z0-9-]+\.webp"/g) ?? [];
    assert.equal(thumbs.length, articles.length, `${lang}: every card uses a thumbnail`);
    const home = readFileSync(dist(`/${lang}/index.html`), 'utf8');
    assert.ok(home.indexOf('id="welcome"') > 0 && home.indexOf('id="welcome"') < home.indexOf('id="story"'), 'welcome comes right after the hero');
    for (const article of healingArticles) assert.ok(existsSync(dist(`${articlePath(lang, article.slug)}index.html`)));
  }
  if (!existsSync(dist('/vi/tan-van/index.html'))) return;
  const vi = readFileSync(dist('/vi/tan-van/index.html'), 'utf8');
  for (const line of ['Một khoảng lặng giữa dòng đời.', 'Có những điều không cần vội vã để hiểu.', 'như cách ta bắt đầu lại từ một hơi thở.', 'Một bài viết hữu duyên']) assert.ok(vi.includes(line), line);
});

test('built article pages: reading mode, save, share, pull quote, pause, closing line, neighbours and at most three related pieces', () => {
  for (const lang of langs) {
    for (const article of articles) {
      const file = dist(`${articlePath(lang, article.slug)}index.html`);
      if (!existsSync(file)) continue;
      const page = readFileSync(file, 'utf8');
      assert.ok(page.includes('data-reading-toggle') && page.includes('data-reading-bar') && page.includes('data-share'), `${article.slug}/${lang}: reading and share tools`);
      assert.equal((page.match(/class="article-closing"/g) ?? []).length, 1, `${article.slug}/${lang}: closing line`);
      assert.ok(page.includes(lang === 'vi' ? 'Chúc bạn có một ngày đủ bình yên để lắng nghe chính mình.' : 'May your day be peaceful enough to hear yourself.'));
      assert.equal((page.match(/rel="prev"/g) ?? []).length + (page.match(/rel="next"/g) ?? []).length, 2, `${article.slug}/${lang}: previous and next`);
      const related = page.slice(page.indexOf('class="related-articles'));
      const cards = (related.match(/data-journal-card/g) ?? []).length;
      assert.ok(cards >= 1 && cards <= 3, `${article.slug}/${lang}: ${cards} related cards`);
      assert.ok(page.includes('"@type":"BreadcrumbList"') && page.includes('"@type":"BlogPosting"'), `${article.slug}/${lang}: structured data`);
      assert.ok(!/(Mua ngay|Đặt mua|Buy now|Add to cart)/.test(page.slice(page.indexOf('class="article-body"'), page.indexOf('class="related-articles'))), `${article.slug}/${lang}: no sales call to action in the article`);
    }
  }
});

test('built practice page: breathing guide, reading path and quick links', () => {
  for (const [lang, path] of [['vi', '/vi/goi-y/'], ['en', '/en/suggestions/']]) {
    if (!existsSync(dist(`${path}index.html`))) continue;
    const page = readFileSync(dist(`${path}index.html`), 'utf8');
    assert.ok(page.includes('data-breath-button'), `${lang}: breathing guide`);
    assert.ok(page.includes('data-breath') && !page.includes('breath-guide__care'), `${lang}: breathing note is the owner's sentence only`);
    assert.equal((page.match(/practice-path__item/g) ?? []).length, 4, `${lang}: four reading steps`);
    assert.ok(!page.includes('practice-help'), `${lang}: the reassurance is step 4, not a separate card`);
    for (const id of ['practice', 'start-reading', 'quiet-moments']) assert.ok(page.includes(`id="${id}"`), `${lang}: #${id}`);
  }
});

test('built ecosystem page follows the three focal points; contact shows one phone; stones list the partner prices', () => {
  for (const [lang, eco, contact, stones] of [
    ['vi', '/vi/he-sinh-thai/', '/vi/lien-he/', '/vi/cua-hang/da-nang-luong/'],
    ['en', '/en/ecosystem/', '/en/contact/', '/en/shop/energy-stones/'],
  ]) {
    if (!existsSync(dist(`${eco}index.html`))) continue;
    const page = readFileSync(dist(`${eco}index.html`), 'utf8');
    assert.equal((page.match(/class="eco-focus zen-card/g) ?? []).length, 3, `${lang}: three focal points`);
    assert.ok(!page.includes('Eco-Retreat') && !page.includes('Academy'), `${lang}: old model removed`);
    assert.match(page, /id="partnerships"/);
    const contactPage = readFileSync(dist(`${contact}index.html`), 'utf8');
    assert.equal((contactPage.match(/contact-phone__number/g) ?? []).length, 2, `${lang}: one merged Hotline/Zalo card per person`);
    for (const number of ['0868499856', '0388000680']) assert.ok(contactPage.includes(`>${number}<`) && contactPage.includes(`https://zalo.me/${number}`) && contactPage.includes(`tel:+84${number.slice(1)}`), `${lang}: ${number} has number, call and Zalo`);
    const stonesPage = readFileSync(dist(`${stones}index.html`), 'utf8');
    assert.ok(stonesPage.includes('id="partner-stones"') && stonesPage.includes('kimtuthap.vn'), `${lang}: partner price list with source`);
    assert.ok((stonesPage.match(/partner-stones__price/g) ?? []).length >= 10, `${lang}: priced items`);
  }
  const css = readFileSync(new URL('../src/styles/journey-pages.css', import.meta.url), 'utf8');
  assert.match(css, /\.journey-milestone \{[^}]*align-self: start/, 'timeline labels must not stretch into tall pills on tablet');
});


test('editorial data: pull quotes are the article’s own words, related and neighbouring pieces behave, covers are unique', () => {
  for (const [slug, reflection] of Object.entries(articleReflections)) {
    const article = articles.find(item => item.slug === slug);
    assert.ok(article, `${slug} is a published article`);
    for (const lang of langs) {
      const content = article.translations[lang];
      const text = [content.introduction, ...content.sections.flatMap(section => section.paragraphs), ...content.practice.steps].join(' ');
      if (reflection.quote) {
        // Only the first letter may differ in case: a quote may start a sentence the article began mid-sentence.
        const quote = reflection.quote[lang].replace(/[.…]+$/, '');
        const lowered = quote.charAt(0).toLowerCase() + quote.slice(1);
        assert.ok(text.includes(quote) || text.includes(lowered), `${slug}/${lang}: the quote comes word for word from the article`);
      }
      for (const pause of reflection.pause ?? []) assert.ok(pause[lang].length > 20 && pause[lang].length < 160, `${slug}/${lang}: a pause is one short invitation`);
    }
  }
  for (const article of articles) {
    const related = relatedArticles(article, 3);
    assert.ok(related.length >= 1 && related.length <= 3 && related.every(item => item.slug !== article.slug));
    assert.equal(new Set(related.map(item => item.slug)).size, related.length);
    const { previous, next } = neighbours(article);
    assert.ok(previous.slug !== article.slug && next.slug !== article.slug && articles.length > 2);
  }
  assert.equal(new Set(articles.map(article => curatedRank(article.slug))).size, articles.length, 'the curated order ranks every article once');
  assert.equal(curatedRank(featuredArticle().slug), 0, 'the featured article leads the curated order');
  const covers = articles.map(article => article.image);
  const healing = new Set(['healing-as-coming-home', 'staying-with-strong-emotions', 'walking-through-loss', 'gentle-boundaries', 'small-joys-gratitude', 'when-meditation-is-difficult']);
  const used = new Map<string, string>();
  for (const article of articles) {
    if (healing.has(article.slug) || coverOverrides[article.slug]) assert.ok(!used.has(article.image), `${article.slug} repeats the cover of ${used.get(article.image)}`);
    used.set(article.image, article.slug);
    assert.ok(articlePhotos[article.image], `${article.slug}: cover has recorded dimensions`);
    assert.ok(existsSync(new URL(`../public${article.image}`, import.meta.url)), article.image);
    assert.ok(article.translations.vi.imageAlt.length > 15 && article.translations.en.imageAlt.length > 15, `${article.slug}: alt text in both languages`);
  }
  for (const image of covers) {
    const thumb = new URL(`../public/media/thumbs/${image.split('/').at(-1)}`, import.meta.url);
    assert.ok(existsSync(thumb), `${image}: thumbnail exists`);
    assert.ok(readFileSync(thumb).length < 100_000, `${image}: thumbnail is under 100 KB`);
  }
});
