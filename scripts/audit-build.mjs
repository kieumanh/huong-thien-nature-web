import assert from 'node:assert/strict';
import { readdir, readFile, access } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { articles as articleEntries, articlePath, journalPath } from '../src/data/articles.ts';
import { products, productPath, shopPath } from '../src/data/products.ts';
import { journeyPageKeys, journeyPath } from '../src/data/journey-pages.ts';
import { courses, coursePath } from '../src/data/courses.ts';
import { releases, releasesPath } from '../src/data/releases.ts';
import { contactPath } from '../src/data/contact-channels.ts';
import { shopThemes, themePath } from '../src/data/shop-themes.ts';
import { contentSecurityPolicy, inlineScriptHashes, turnstileHost } from './secure-headers.mjs';

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
assert.equal(files.length, (articleEntries.length + journeyPageKeys.length + courses.length) * 2 + 12 + (products.length + 1 + shopThemes.length) * 2, 'Build must contain both shop catalogues, every theme space, every product translation and all existing pages');
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.equal(new Set(locations).size, (articleEntries.length + products.length + shopThemes.length + journeyPageKeys.length + courses.length + 5) * 2, 'Sitemap must list all localized pages and products');
for (const course of courses) {
  for (const lang of ['vi', 'en']) {
    const path = coursePath(lang, course);
    assert(locations.includes(base + path), `Course missing from sitemap: ${path}`);
    await access(join(dist, path, 'index.html'));
  }
}
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
    if (route === '/vi/timkiem/' || route === '/en/search/') {
      assert(!locations.includes(base + route) && html.includes('name="robots" content="noindex, follow"'), `Search results must be excluded from indexing on ${route}`);
    } else {
      assert(locations.includes(base + route), `Sitemap missing ${route}`);
    }
    const other = lang === 'vi' ? 'en' : 'vi';
    const article = articleEntries.find(item => articlePath(lang, item.slug) === route);
    const product = products.find(item => productPath(lang, item.slug) === route);
    const section = journeyPageKeys.find(page => journeyPath(lang, page) === route);
    const course = courses.find(item => coursePath(lang, item) === route);
    const theme = shopThemes.find(item => themePath(lang, item) === route);
    const alternate = course ? coursePath(other, course) : theme ? themePath(other, theme) : section ? journeyPath(other, section) : route === contactPath(lang) ? contactPath(other) : route === releasesPath(lang) ? releasesPath(other) : product ? productPath(other, product.slug) : route === shopPath(lang) ? shopPath(other) : article ? articlePath(other, article.slug) : route === journalPath(lang) ? journalPath(other) : route === '/vi/timkiem/' ? '/en/search/' : route === '/en/search/' ? '/vi/timkiem/' : `/${other}/`;
    assert(html.includes(`hreflang="${lang === 'vi' ? 'en' : 'vi'}" href="${base}${alternate}"`), `Incorrect translation link on ${route}`);
    for (const page of journeyPageKeys) assert(html.includes(`href="${journeyPath(lang, page)}"`), `Section navigation missing on ${route}`);
    assert(html.includes(`href="${shopPath(lang)}"`), `Shop navigation missing on ${route}`);
    if (route === shopPath(lang)) {
      for (const item of shopThemes) assert(html.includes(`href="${themePath(lang, item)}"`), `Shop hub must link to the ${item.id} space on ${route}`);
    }
    if (theme?.id === 'thuc-pham-sach') {
      assert.equal([...html.matchAll(/data-product-card/g)].length, products.length, `Clean-food space must include every supplied product on ${route}`);
      for (const item of products) assert(html.includes(`href="${productPath(lang, item.slug)}"`), `Missing product link: ${item.slug}`);
    }
    if (theme) {
      assert(html.includes('data-shop-theme') && html.includes('data-theme-empty'), `Theme space must carry its feed hooks and empty state on ${route}`);
      for (const other of shopThemes.filter(item => item.id !== theme.id)) assert(html.includes(`href="${themePath(lang, other)}"`), `Theme space must link to sibling spaces on ${route}`);
    }
    assert(html.includes(`href="${releasesPath(lang)}"`), `Missing footer version link on ${route}`);
    if (route === releasesPath(lang)) {
      const version = html.match(/name="application-version" content="([^"]+)"/)?.[1];
      assert.equal(releases[0].version, version, 'The current release must match the application version');
      assert.equal(new Set(releases.map(entry => entry.version)).size, releases.length, 'Release versions must be unique');
      for (const entry of releases) {
        assert(html.includes(`id="v${entry.version}"`), `Missing version ${entry.version} on ${route}`);
      }
    }
    if (route === contactPath(lang)) {
      assert(html.includes('id="interest-form"') && html.includes('mailto:huongthiennature@gmail.com')
        && html.includes('tel:+84868499856') && html.includes('https://zalo.me/0868499856'), `Contact channels missing on ${route}`);
    }
    if (product) {
      assert(html.includes(`${contactPath(lang)}?product=${product.slug}#connect`), `Product enquiry must retain product identity on ${route}`);
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
  const schemas = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  if (localized && locations.includes(base + route)) {
    const graph = schemas.find(schema => schema['@graph'])?.['@graph'];
    assert(graph?.some(entry => entry['@id'] === base + route + '#webpage' && entry.inLanguage === localized[1]), `Missing localized page graph on ${route}`);
    if (route !== `/${localized[1]}/`) {
      const trails = schemas.filter(schema => schema['@type'] === 'BreadcrumbList');
      assert.equal(trails.length, 1, `Expected one breadcrumb trail on ${route}`);
      assert.equal(trails[0].itemListElement.at(-1).item, base + route);
    }
  }
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
for (const item of articleEntries.filter(item => ['returning-attention', 'seven-layers', 'listening-to-nature'].includes(item.slug))) {
  assert(redirects.includes(`/vi/journal/${item.slug}/ ${articlePath('vi', item.slug)} 301`), 'Legacy article must redirect');
}
const roots = articleEntries.filter(item => item.phase === 'roots');
assert.equal(roots.length, 12, 'The complete first Roots release must contain all twelve planned articles');
assert.equal(new Set(roots.map(item => item.id)).size, 12, 'Roots editorial IDs must be unique');
for (const item of articleEntries.filter(item => item.slug !== 'when-meditation-is-difficult')) assert.match(item.image, /^\/media\/(pixabay-\d+|journey\/[a-z0-9-]+|illustrations\/[a-z0-9-]+)\.webp$/, 'Article covers are local Pixabay photos, our own album photos or our own drawn illustrations');
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
    const relatedSection = html.match(/<section class="related-articles[\s\S]*?<\/section>/)?.[0] ?? '';
    assert.equal([...relatedSection.matchAll(/data-journal-card/g)].length, 3, 'Related reading must stay bounded');
    assert(content.sections.length >= 3 && content.practice.steps.length >= 4, 'Full article and practice must be present');
    assert(content.cta && articleEntries.some(entry => entry.slug === content.cta.slug), 'CTA target must be published');
    assert(item.relatedSlugs.every(slug => articleEntries.some(entry => entry.slug === slug)), 'Related articles must be published');
  }
}
const rootHome = await readFile(join(dist, 'index.html'), 'utf8');
assert(rootHome.includes('id="hero-title"') && rootHome.includes('id="main-content"'), 'The root URL must render the real Vietnamese homepage');
assert(!rootHome.includes('http-equiv="refresh"'), 'The root homepage must not redirect in the browser');
assert(rootHome.includes(`rel="canonical" href="${base}/vi/"`), 'The root homepage must retain the localized canonical URL');

for (const lang of ['vi','en']) {
  const home = await readFile(join(dist, lang, 'index.html'), 'utf8');
  assert(!home.includes('mailto:') && !home.includes('data-gmail'), 'Contact must use server delivery only');
}

// --- Security headers: the generated CSP must cover every inline script and the page must not need any other host.
const headers = await readFile(join(dist, '_headers'), 'utf8');
const documents = await Promise.all(files.map(file => readFile(file, 'utf8')));
const expectedCsp = contentSecurityPolicy(inlineScriptHashes(documents));
assert(headers.includes(`Content-Security-Policy: ${expectedCsp}`), 'dist/_headers must contain the CSP generated from the built pages (run the full build, not astro build alone)');
for (const required of ['Strict-Transport-Security:', 'Permissions-Policy:', 'Cross-Origin-Opener-Policy:', 'X-Frame-Options:', 'X-Content-Type-Options:', 'Referrer-Policy:']) assert(headers.includes(required), `Missing security header ${required}`);
const allowedHosts = new Set([new URL(base).host, new URL(turnstileHost).host]);
for (const [index, html] of documents.entries()) {
  assert(!/\son[a-z]+\s*=\s*["']/i.test(html), `Inline event handler (blocked by CSP) in ${files[index]}`);
  assert(!/href\s*=\s*["']\s*javascript:/i.test(html), `javascript: URL in ${files[index]}`);
  for (const [, host] of html.matchAll(/<(?:script|iframe|link|audio|video|source|embed|object)\b[^>]*\b(?:src|href|data)="https?:\/\/([^/"]+)/g)) {
    assert(allowedHosts.has(host) || /<link[^>]+(?:rel="(?:canonical|alternate)")/.test(html), `Unapproved external resource host ${host} in ${files[index]}`);
  }
}
await access(join(dist, '.well-known', 'security.txt'));

console.log(`Build audit passed: ${files.length} HTML pages, ${articles} articles, ${locations.length} sitemap URLs, ${references} local links/assets, twelve Roots entries with local Pixabay photographs.`);
