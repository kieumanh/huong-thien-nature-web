import assert from 'node:assert/strict';
import { readdir, readFile, access } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { articles as articleEntries, articlePath, journalPath } from '../src/data/articles.ts';
import { products, productPath, shopPath } from '../src/data/products.ts';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const base = 'https://huongthiennature.com';
const files = [];
async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    else if (entry.name.endsWith('.html')) files.push(path);
  }
}
await collect(dist);
assert.equal(files.length, articleEntries.length * 2 + 8 + (products.length + 1) * 2, 'Build must contain both shop catalogues, every product translation and all existing pages');
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.equal(new Set(locations).size, (articleEntries.length + products.length + 4) * 2, 'Sitemap must list all localized pages and products');
let references = 0;
let articles = 0;
for (const file of files) {
  const html = await readFile(file, 'utf8');
  const route = '/' + file.slice(dist.length).replace(/index\.html$/, '');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `Duplicate IDs on ${route}`);
  assert(!html.includes('undefined'), `Unresolved content on ${route}`);
  const localized = /^\/(vi|en)\//.exec(route);
  if (localized) {
    const lang = localized[1];
    assert(html.includes(`<html lang="${lang}">`), `Incorrect language on ${route}`);
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `Expected one page heading on ${route}`);
    assert.equal([...html.matchAll(/<main\b/g)].length, 1, `Expected one main landmark on ${route}`);
    assert(html.includes(`rel="canonical" href="${base}${route}"`), `Incorrect canonical on ${route}`);
    assert(locations.includes(base + route), `Sitemap missing ${route}`);
    const other = lang === 'vi' ? 'en' : 'vi';
    const article = articleEntries.find(item => articlePath(lang, item.slug) === route);
    const product = products.find(item => productPath(lang, item.slug) === route);
    const alternate = product ? productPath(other, product.slug) : route === shopPath(lang) ? shopPath(other) : article ? articlePath(other, article.slug) : route === journalPath(lang) ? journalPath(other) : route === '/vi/timkiem/' ? '/en/search/' : route === '/en/search/' ? '/vi/timkiem/' : `/${other}/`;
    assert(html.includes(`hreflang="${lang === 'vi' ? 'en' : 'vi'}" href="${base}${alternate}"`), `Incorrect translation link on ${route}`);
    assert(html.includes(`href="${shopPath(lang)}"`), `Shop navigation missing on ${route}`);
    if (route === shopPath(lang)) {
      assert.equal([...html.matchAll(/data-product-card/g)].length, products.length, `Catalogue must include every supplied product on ${route}`);
      for (const item of products) assert(html.includes(`href="${productPath(lang, item.slug)}"`), `Missing product link: ${item.slug}`);
    }
    if (product) {
      assert(html.includes(`?product=${product.slug}#connect`), `Product enquiry must retain product identity on ${route}`);
      assert(html.includes('product-information') && html.includes('shop-demo-note'), `Missing product details or demo notice on ${route}`);
      assert(!html.includes('"@type":"Offer"'), `Demo prices must not be advertised as live offers on ${route}`);
    }
    if (/\/(journal|tan-van)\/[^/]+\/$/.test(route)) {
      articles++;
      assert([...html.matchAll(/<h2\b/g)].length >= 4, `Article content missing on ${route}`);
    } else if (route === journalPath(lang)) {
      assert.equal([...html.matchAll(/<article\b/g)].length, articleEntries.length, `Journal listing must include every article on ${route}`);
    }
  }
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(json);
  for (const [, href] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const parsed = new URL(href.replaceAll('&amp;', '&'), new URL(route, base));
    const pathname = href.startsWith('#') ? '' : parsed.pathname;
    const fragment = decodeURIComponent(parsed.hash.slice(1));
    let target = file;
    if (pathname) {
      assert(!pathname.includes('..'), `Invalid local path: ${href}`);
      target = resolve(dist, '.' + pathname);
      if (!/\.[^/]+$/.test(pathname)) target = join(target, 'index.html');
      await access(target);
    }
    if (fragment) {
      const targetHtml = target === file ? html : await readFile(target, 'utf8');
      assert(targetHtml.includes(`id="${fragment}"`), `Missing anchor ${href} on ${route}`);
    }
    references++;
  }
}
assert.equal(articles, articleEntries.length * 2, 'Both translations of every article must be generated');

assert(!locations.some(url => url.includes('/vi/journal/')), 'Vietnamese sitemap must use localized URLs');
const redirects = await readFile(join(dist, '_redirects'), 'utf8');
for (const item of articleEntries.filter(item => item.phase !== 'roots')) {
  assert(redirects.includes(`/vi/journal/${item.slug}/ ${articlePath('vi', item.slug)} 301`), 'Legacy article must redirect');
}
const roots = articleEntries.filter(item => item.phase === 'roots');
assert.equal(roots.length, 12, 'The complete first Roots release must contain all twelve planned articles');
assert.equal(new Set(roots.map(item => item.id)).size, 12, 'Roots editorial IDs must be unique');
assert.equal(new Set(roots.map(item => item.image)).size, 6, 'Roots must use all six illustrations');
for (const item of roots) {
  const imageBytes = await readFile(join(dist, item.image));
  assert(imageBytes.length > 1000 && imageBytes.subarray(0, 4).toString() === 'RIFF' && imageBytes.subarray(8, 12).toString() === 'WEBP', `Invalid illustration: ${item.image}`);
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.viSlug), `Vietnamese slug must be unaccented: ${item.slug}`);
  for (const lang of ['vi', 'en']) {
    const content = item.translations[lang];
    const html = await readFile(join(dist, articlePath(lang, item.slug), 'index.html'), 'utf8');
    const schemas = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
    const schema = schemas.find(value => value['@type'] === 'BlogPosting');
    assert(schema && schema.headline === content.title && schema.inLanguage === lang, `Missing article SEO on ${item.slug}/${lang}`);
    assert.equal(schema.image, base + item.image, 'Social/structured images must point at the article illustration');
    assert(html.includes('og:type" content="article"'), 'Article social metadata must use article type');
    assert(html.includes('article-toc') && html.includes('article-sources'), 'Article must include navigation and attribution');
    assert.equal([...html.matchAll(/class="related-card"/g)].length, 3, 'Related reading must stay bounded');
    assert(content.sections.length >= 3 && content.practice.steps.length >= 4, 'Full article and practice must be present');
    assert(content.cta && articleEntries.some(entry => entry.slug === content.cta.slug), 'CTA target must be published');
    assert(item.relatedSlugs.every(slug => articleEntries.some(entry => entry.slug === slug)), 'Related articles must be published');
  }
}
for (const lang of ['vi','en']) {
  const home = await readFile(join(dist, lang, 'index.html'), 'utf8');
  assert(!home.includes('mailto:') && !home.includes('data-gmail'), 'Contact must use server delivery only');
}
console.log(`Build audit passed: ${files.length} HTML pages, ${articles} articles, ${locations.length} sitemap URLs, ${references} local links/assets, twelve Roots entries and six valid WebP illustrations.`);
