import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

// Search lives on the menu bar (it opens in place, with live results); the Home page no longer carries a second search box.
// Each page keeps a plain link to the search page, so search still works without JavaScript.
for (const [language, home, searchPath] of [['Vietnamese', 'dist/vi/index.html', '/vi/timkiem/'], ['English', 'dist/en/index.html', '/en/search/']]) {
  test(language + ' header search opens in place and keeps a no-JavaScript link', () => {
    const html = fs.readFileSync(home, 'utf8');
    assert(!html.includes('home-discovery'), 'the old Home search block is gone');
    assert(html.includes(`class="nav-search" data-nav-search href="${searchPath}"`), 'the magnifier is a real link to the search page');
    const bar = html.split('data-searchbar')[1]?.split('</header>')[0] || '';
    assert(bar.includes('role="search"') && bar.includes(`action="${searchPath}"`), 'the bar is a search form that submits to the search page');
    assert(bar.includes('data-search-results') && bar.includes('data-search-suggest') && bar.includes('data-search-all'), 'results, suggestions and the see-all link are in the panel');
    assert.equal((bar.match(/<a href="[^"]*\?q=/g) || []).length, 3, 'three suggested keywords');
  });

  test(language + ' Home page opens a doorway to the three shop themes', () => {
    const html = fs.readFileSync(home, 'utf8');
    const shop = html.split('id="shop"')[1]?.split('</section>')[0] || '';
    assert.equal((shop.match(/class="landing-shop__card"/g) || []).length, 3);
  });
}

test('404 page is bilingual, animated and offers a way back', () => {
  const html = fs.readFileSync('dist/404.html', 'utf8');
  for (const needle of ['data-lost-lang="vi"', 'data-lost-lang="en"', 'data-lost-back', 'lost__orb', 'href="/vi/"', 'href="/en/"']) assert(html.includes(needle), needle);
});
