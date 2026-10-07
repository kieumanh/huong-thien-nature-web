import assert from 'node:assert/strict';
import { readdir, readFile, access } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

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
assert.equal(files.length, 10, 'Build must contain two homepages, six articles, root entry and 404');
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.equal(new Set(locations).size, 8, 'Sitemap must list eight distinct localized pages');
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
    const alternate = route.replace(/^\/(vi|en)\//, lang === 'vi' ? '/en/' : '/vi/');
    assert(html.includes(`hreflang="${lang === 'vi' ? 'en' : 'vi'}" href="${base}${alternate}"`), `Incorrect translation link on ${route}`);
    if (route.includes('/journal/')) {
      articles++;
      assert([...html.matchAll(/<h2\b/g)].length >= 4, `Article content missing on ${route}`);
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
assert.equal(articles, 6, 'Both translations of every article must be generated');
console.log(`Build audit passed: ${files.length} HTML pages, ${articles} articles, ${locations.length} sitemap URLs, ${references} local links/assets.`);
