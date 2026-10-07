import assert from 'node:assert/strict';
import { readdir, readFile, access } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { articles as articleEntries, articlePath, journalPath } from '../src/data/articles.ts';

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
assert.equal(files.length, articleEntries.length * 2 + 6, 'Build must contain two homepages, two journal indexes, translated articles, root entry and 404');
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.equal(new Set(locations).size, (articleEntries.length + 2) * 2, 'Sitemap must list all localized homes, journal indexes and articles');
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
    const alternate = article ? articlePath(other, article.slug) : route === journalPath(lang) ? journalPath(other) : `/${other}/`;
    assert(html.includes(`hreflang="${lang === 'vi' ? 'en' : 'vi'}" href="${base}${alternate}"`), `Incorrect translation link on ${route}`);
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
    const [pathname, fragment] = href.split('#');
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
console.log(`Build audit passed: ${files.length} HTML pages, ${articles} articles, ${locations.length} sitemap URLs, ${references} local links/assets.`);

assert(!locations.some(url => url.includes('/vi/journal/')), 'Vietnamese sitemap must use localized URLs');
const redirects = await readFile(join(dist, '_redirects'), 'utf8');
for (const item of articleEntries) {
  assert(redirects.includes(`/vi/journal/${item.slug}/ ${articlePath('vi', item.slug)} 301`), 'Legacy article must redirect');
}
for (const lang of ['vi','en']) {
  const home = await readFile(join(dist, lang, 'index.html'), 'utf8');
  assert(!home.includes('mailto:') && !home.includes('data-gmail'), 'Contact must use server delivery only');
}
