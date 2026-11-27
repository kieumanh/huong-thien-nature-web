import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { philosophyCopy, philosophyEssays, philosophyTagline, philosophyTiers, philosophyValues, philosophyVersion, livingZenSeries } from '../src/data/philosophy.ts';
import { resolveTarget } from '../src/data/philosophy-links.ts';
import { articles } from '../src/data/articles.ts';
import { journeyPath } from '../src/data/journey-pages.ts';
import { releasesPath } from '../src/data/releases.ts';
import { buildSearchIndex } from '../src/data/search.ts';

// Living Zen philosophy page: one data source (src/data/philosophy.ts), two languages, a few honest guarantees.
// The first group reads the data; the second reads the built pages, so run `npm run build` before it.
const langs = ['vi', 'en'] as const;
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const html = (lang: 'vi' | 'en') => fs.readFileSync(`dist${journeyPath(lang, 'philosophy')}index.html`, 'utf8');
const mainOf = (page: string) => page.match(/<main[\s\S]*?<\/main>/)?.[0] ?? page;
const hrefsIn = (fragment: string) => [...fragment.matchAll(/href="([^"]+)"/g)].map(match => match[1]);
const texts = (value: unknown): string[] => typeof value === 'string' ? [value] : Array.isArray(value) ? value.flatMap(texts) : value && typeof value === 'object' ? Object.values(value).flatMap(texts) : [];

test('the ten values are complete in both languages and sit in three tiers of 3, 3 and 4', () => {
  assert.equal(philosophyValues.length, 10);
  assert.equal(new Set(philosophyValues.map(value => value.id)).size, 10);
  assert.equal(new Set(philosophyValues.map(value => value.slug)).size, 10);
  assert.deepEqual(philosophyValues.map(value => value.no), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  for (const value of philosophyValues) {
    assert(value.titleVi && value.titleEn, `${value.id} needs both titles`);
    assert.equal(value.version, philosophyVersion.number, `${value.id} carries the philosophy version`);
    for (const lang of langs) {
      assert(value.summary[lang].length > 20, `${value.id} summary ${lang}`);
      assert(value.philosophy[lang].length >= 2 && value.philosophy[lang].every(line => line.length > 20), `${value.id} philosophy ${lang}`);
      assert(value.practicalApplications[lang].length >= 3, `${value.id} applications ${lang}`);
      assert(value.commitment[lang].length > 20, `${value.id} commitment ${lang}`);
      assert(value.reflectionQuestion[lang].trim().endsWith('?'), `${value.id} reflection question ${lang} should be a question`);
    }
    assert.equal(value.philosophy.vi.length, value.philosophy.en.length, `${value.id} paragraphs match across languages`);
    assert.equal(value.practicalApplications.vi.length, value.practicalApplications.en.length, `${value.id} applications match across languages`);
  }
  assert.deepEqual(philosophyTiers.map(tier => tier.values.length), [3, 3, 4]);
  for (const tier of philosophyTiers) {
    for (const id of tier.values) assert.equal(philosophyValues.find(value => value.id === id)?.tier, tier.tier, `${id} sits in tier ${tier.tier}`);
  }
});

test('related essays exist and every link target resolves to a real place', () => {
  const slugs = new Set(articles.map(article => article.slug));
  for (const value of philosophyValues) for (const slug of value.relatedArticles) assert(slugs.has(slug), `${value.id}: no article ${slug}`);
  for (const slug of philosophyEssays) assert(slugs.has(slug), `essay ${slug} missing`);
  assert(philosophyEssays.length >= 3 && philosophyEssays.length <= 6);
  for (const lang of langs) {
    for (const value of philosophyValues) {
      if (!value.example?.target) continue;
      const { href, external } = resolveTarget(lang, value.example.target);
      assert(external ? href.startsWith('https://') : href.startsWith(`/${lang}/`), `${value.id} example link ${href}`);
    }
  }
});

test('the philosophy has its own version, independent of the website version, with a dated history', () => {
  assert.equal(philosophyVersion.id, 'v1.1');
  assert.notEqual(philosophyVersion.number, pkg.version, 'the philosophy version is not the code version');
  for (const lang of langs) {
    const history = philosophyCopy[lang].changelog;
    assert.deepEqual(history.map(entry => entry.version), ['1.1', '1.0'], 'newest change first, v1.0 kept');
    for (const entry of history as Array<Record<string, string>>) assert(entry.version && entry.date && entry.change && entry.reason && entry.impact, 'each change records content, reason, date and impact');
  }
});

test('no placeholder text and no mention of Linux in the philosophy copy', () => {
  const everything = texts([philosophyCopy, philosophyValues]).join('\n');
  assert(!/\b(lorem|todo|tbd|xxx)\b|\[\.\.\.\]|\[…\]/i.test(everything), 'placeholder text found');
  assert(!/linux/i.test(everything), 'Linux is not mentioned');
});

test('the Living Zen Series is planning data only: not rendered, not searchable, not published', () => {
  assert.equal(livingZenSeries.status, 'planned');
  assert.equal(livingZenSeries.pieces.length, 10);
  for (const lang of langs) {
    const index = JSON.stringify(buildSearchIndex(lang));
    const page = html(lang);
    for (const piece of livingZenSeries.pieces) {
      assert(!index.includes(piece[lang]), `series piece "${piece[lang]}" should not be in the search index`);
      assert(!page.includes(piece[lang]), `series piece "${piece[lang]}" should not be on the page`);
    }
  }
});

for (const lang of langs) {
  test(`${lang} philosophy page has all sections, one h1, ten values and accessible figures`, () => {
    const page = html(lang);
    const main = mainOf(page);
    assert.equal((main.match(/<h1\b/g) ?? []).length, 1, 'exactly one h1');
    for (const id of ['ph-why', 'ph-manifesto', 'ph-model', 'ph-values', 'ph-refrain', 'ph-practice', 'ph-commitments', 'ph-essays', 'ph-growing', 'ph-closing']) {
      assert(main.includes(`id="${id}"`), `section ${id} missing`);
    }
    for (const value of philosophyValues) assert(new RegExp(`<details[^>]*id="${value.slug}"`).test(main), `value ${value.slug} missing`);
    assert.equal((main.match(/<details\b/g) ?? []).length, 10, 'ten values, each a native details element');
    const figures = main.match(/<svg\b[^>]*role="img"[^>]*aria-label="[^"]+"/g) ?? [];
    assert(figures.length >= 4, `at least four described illustrations, found ${figures.length}`);
    for (const img of main.match(/<img\b[^>]*>/g) ?? []) {
      assert(/\balt="[^"]+"/.test(img) && /\bwidth="\d+"/.test(img) && /\bheight="\d+"/.test(img), `image needs alt, width, height: ${img.slice(0, 100)}`);
    }
    assert((main.match(/<img\b/g) ?? []).length >= 5, 'photographs from the album are woven in');
  });

  test(`${lang} philosophy page does not depend on animation or scripts to be readable`, () => {
    const page = html(lang);
    assert(!/<animate\b|<animateTransform\b|<animateMotion\b|<set\b/.test(page), 'no SMIL animation (it ignores reduced motion)');
    assert(!/<script[^>]+src="https?:/.test(page), 'no third-party scripts');
    const main = mainOf(page);
    for (const value of philosophyValues) assert(main.includes(value.reflectionQuestion[lang]), 'value text is in the HTML, not injected by script');
    const css = fs.readFileSync('src/styles/philosophy.css', 'utf8');
    assert(/@media \(prefers-reduced-motion: reduce\)/.test(css), 'reduced-motion rules exist');
  });

  test(`${lang} philosophy page is in the sitemap, the menu (after Story), the footer and the search index`, () => {
    const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
    assert(sitemap.includes(`https://huongthiennature.com${journeyPath(lang, 'philosophy')}`));
    const page = html(lang);
    const header = page.match(/<header class="topbar[\s\S]*?<\/header>/)?.[0] ?? '';
    const menu = hrefsIn(header);
    assert(menu.includes(journeyPath(lang, 'philosophy')));
    assert(menu.indexOf(journeyPath(lang, 'story')) !== -1 && menu.indexOf(journeyPath(lang, 'story')) + 1 === menu.indexOf(journeyPath(lang, 'philosophy')), 'Philosophy comes straight after Story');
    assert(!menu.includes(journeyPath(lang, 'album')), 'Album is no longer in the top menu');
    const footer = hrefsIn(page.match(/<footer[\s\S]*?<\/footer>/)?.[0] ?? '');
    assert.equal(footer.indexOf(journeyPath(lang, 'album')) + 1, footer.indexOf(releasesPath(lang)), 'Album sits right above the version link in Discover');
    assert(footer.includes(journeyPath(lang, 'philosophy')));
    const index = buildSearchIndex(lang);
    assert(index.some(row => row.url === journeyPath(lang, 'philosophy')));
    assert.equal(index.filter(row => row.url.startsWith(`${journeyPath(lang, 'philosophy')}#`)).length, 10);
  });

  test(`${lang} Home and Story point to the philosophy without repeating all ten values`, () => {
    const home = mainOf(fs.readFileSync(`dist/${lang}/index.html`, 'utf8'));
    assert(hrefsIn(home).includes(journeyPath(lang, 'philosophy')), 'Home links to the philosophy');
    const listed = philosophyValues.filter(value => home.includes(lang === 'vi' ? value.titleVi : value.titleEn));
    assert(listed.length < 5, `Home names ${listed.length} values; it should only point to the page`);
    const story = mainOf(fs.readFileSync(`dist${journeyPath(lang, 'story')}index.html`, 'utf8'));
    assert(hrefsIn(story).includes(journeyPath(lang, 'philosophy')), 'Story links to the philosophy');
  });
}

test('every one of the ten values has a real example, and each example points to something that exists on the website', () => {
  for (const value of philosophyValues) {
    assert(value.example, `${value.id} needs an example`);
    for (const lang of langs) assert(value.example.text[lang].length > 30, `${value.id} example ${lang}`);
    if (value.example.target) assert(value.example.label?.vi && value.example.label?.en, `${value.id}: a linked example needs a label in both languages`);
  }
});

test('the philosophy line is the one main line of the website; the old line is gone from public pages', () => {
  const main = { vi: 'Hiểu mình. Thuận tự nhiên. Sống tự chủ. Cùng trưởng thành.', en: 'Understand yourself. Live with nature. Live self-directed. Grow together.' };
  for (const lang of langs) {
    for (const file of [`dist/${lang}/index.html`, `dist${journeyPath(lang, 'ecosystem')}index.html`, `dist${journeyPath(lang, 'philosophy')}index.html`]) {
      const page = fs.readFileSync(file, 'utf8');
      assert(mainOf(page).includes(main[lang]) || philosophyTagline[lang].every(part => mainOf(page).includes(part)), `${file} carries the main line`);
      assert(!/Từ thiên nhiên, trở về với chính mình|Rooted in nature\. Awakened within|Rooted in Nature\. Awakened Within/.test(page), `${file} still shows the old line`);
    }
  }
});

test('the brand pack and the internal brand page use the same main line (the old line is gone from their sources)', () => {
  const oldLine = /Từ thiên nhiên, trở về với chính mình|Rooted in Nature\. Awakened Within|Rooted in nature\. Awakened within/;
  const textFile = /\.(md|svg|py|html|json|css|txt)$/;
  const files = [...(fs.readdirSync('brand', { recursive: true }) as string[])]
    .map(name => `brand/${name}`)
    .filter(file => textFile.test(file) && !file.endsWith('CHANGELOG.md') && !file.includes('/previews/'));
  files.push('src/pages/living-zen/index.astro');
  const stale = files.filter(file => oldLine.test(fs.readFileSync(file, 'utf8')));
  assert.deepEqual(stale, [], 'no brand source still carries the old line');
});

for (const lang of langs) {
  test(`${lang} philosophy page shows the complementary note as its own frame`, () => {
    const page = mainOf(html(lang));
    assert.equal((page.match(/class="ph-nature__place"/g) ?? []).length, 1, 'one framed note in the Living Zen section');
  });
}

for (const lang of langs) {
  test(`${lang} Ecosystem page has one short pointer to the philosophy, not a second copy of it, and no longer cites learning at the farm`, () => {
    const eco = mainOf(fs.readFileSync(`dist${journeyPath(lang, 'ecosystem')}index.html`, 'utf8'));
    assert(hrefsIn(eco).includes(journeyPath(lang, 'philosophy')), 'Ecosystem links to the philosophy');
    assert(!/Tụi mình không phải là|What we are not|lz-tile|lz-not-line/.test(eco), 'the old "what we are not" and promises block is gone from the Ecosystem page');
    assert(!/học hỏi tại Farm|learning from at Lê Lam Sơn/.test(eco), 'the sentence about learning at the farm is removed');
    assert((eco.match(/class="lz-values[ "]/g) ?? []).length === 1, 'exactly one Living Zen block');
    const home = mainOf(fs.readFileSync(`dist/${lang}/index.html`, 'utf8'));
    assert((home.match(/class="lz-values[ "]/g) ?? []).length === 1, 'exactly one Living Zen block on Home');
    assert(!home.includes('living-zen-philosophy'), 'the separate pointer section is gone from Home');
  });

  test(`${lang} philosophy page now holds what the Ecosystem page used to say about what Hương Thiền Nature is not`, () => {
    const page = mainOf(html(lang));
    const parts = lang === 'vi' ? ['tổ chức tâm linh huyền bí', 'chỉ bán khóa học', 'Không phán xét người chưa thực hành'] : ['mysterious spiritual organisation', 'only sells courses', 'not judge anyone who has not practised'];
    for (const part of parts) assert(page.includes(part), `missing: ${part}`);
  });
}
