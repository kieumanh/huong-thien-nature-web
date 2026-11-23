import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { products, productCategories, productPath, shopPath, stockLabel } from '../src/data/products.ts';
import { matchesProduct } from '../src/scripts/shop-filter.ts';

test('all eight labelled products have unique pages, translations and valid WebP assets', async () => {
  assert.equal(products.length, 8);
  assert.equal(new Set(products.map(product => product.slug)).size, 8);
  for (const product of products) {
    assert(productCategories.some(category => category.id === product.category));
    assert(Number.isSafeInteger(product.price) && product.price > 0);
    const image = await readFile(new URL(`../public${product.image}`, import.meta.url));
    assert.equal(image.subarray(0, 4).toString(), 'RIFF');
    assert.equal(image.subarray(8, 12).toString(), 'WEBP');
    for (const lang of ['vi', 'en'] as const) {
      const copy = product.translations[lang];
      assert(copy.name && copy.subtitle && copy.description && copy.ingredients && copy.use.length && copy.storage && copy.note && copy.alt);
      assert(productPath(lang, product.slug).startsWith(shopPath(lang)));
      assert(product.keywords[lang].length >= 4);
    }
  }
});
test('unlabelled products are removed and stock states have distinct accessible labels', () => {
  assert(!products.some(product => ['hat-ngu-coc-do','gia-vi-dang-long'].includes(product.slug)));
  assert(products.every(product => product.stock === 'unknown'));
  for(const lang of ['vi','en'] as const) assert.equal(new Set(['in_stock','out_of_stock','unknown'].map(stock=>stockLabel(stock as typeof products[number]['stock'],lang))).size,3);
});
test('category and ingredient search work together, with Vietnamese accents optional', () => {
  const text = 'Bột nêm thuần chay Sachi Gia vị rau củ';
  assert(matchesProduct('seasoning', text, 'all', 'bot nem'));
  assert(matchesProduct('seasoning', text, 'seasoning', 'SACHI rau củ'));
  assert(!matchesProduct('seasoning', text, 'drinks', 'sachi'));
  assert(!matchesProduct('seasoning', text, 'seasoning', 'sachi missing'));
  assert(matchesProduct('seasoning', text, 'all', ''));
  assert(!matchesProduct('seasoning', text, 'all', '<script>alert(1)</script>'));
});

test('three shop themes have bilingual copy, distinct routes and cover every built-in product', async () => {
  const { shopThemes, themePath, themeById, themeIds } = await import('../src/data/shop-themes.ts');
  assert.deepEqual(shopThemes.map(theme => theme.id), ['thuc-pham-sach', 'da-nang-luong', 'sach']);
  assert.deepEqual([...themeIds], shopThemes.map(theme => theme.id));
  for (const lang of ['vi', 'en'] as const) {
    assert.equal(new Set(shopThemes.map(theme => themePath(lang, theme))).size, 3);
    for (const theme of shopThemes) {
      assert(themePath(lang, theme).startsWith(shopPath(lang)));
      assert(theme.name[lang] && theme.tagline[lang] && theme.lead[lang] && theme.emptyTitle[lang] && theme.emptyBody[lang] && theme.door[lang]);
      assert(!products.some(product => product.slug === theme.slug[lang]), 'theme route must not collide with a product page');
    }
  }
  assert.equal(themeById('da-nang-luong')?.note?.vi.includes('không thay thế chăm sóc y tế') || themeById('da-nang-luong')?.note?.vi.includes('không thay thế'), true, 'stones carry a no-medical-claim note');
  assert.equal(themeById('nope'), undefined);
});

test('normalizeFeed whitelists fields, enforces limits and rejects foreign schemas', async () => {
  const { normalizeFeed, statusText, safeHttps } = await import('../src/data/shop-feed.ts');
  assert.equal(normalizeFeed(null), null);
  assert.equal(normalizeFeed({ schema: 2, products: [] }), null);
  assert.equal(normalizeFeed({ schema: 1 }), null);
  const feed = normalizeFeed({
    schema: 1, announcement: { text: '  Hi\u0000there  ', tone: 'evil' }, season: { name: 'x'.repeat(200), note: '' },
    products: [
      { id: 'a', name: '<img src=x onerror=alert(1)>', theme: 'sach', status: 'in', price: 5000.6, keywords: ['k', 7, 'y'.repeat(99)] },
      { id: 'a', name: 'duplicate id', theme: 'sach', status: 'in' },
      { id: 'b', name: 'contact', theme: 'da-nang-luong', status: 'contact', price: 10 },
      { id: 'c', name: 'neg', theme: 'sach', status: 'in', price: -1 },
      ...Array.from({ length: 300 }, (_, index) => ({ id: `n${index}`, name: 'n', theme: 'sach', status: 'out' })),
    ],
  });
  assert(feed);
  assert.equal(feed.announcement?.text, 'Hi there');
  assert.equal(feed.announcement?.tone, 'info');
  assert.equal(feed.season?.name.length, 80);
  assert.equal(feed.products.length, 199, 'only the first 200 raw entries are read; the duplicate id is dropped');
  assert.equal(feed.products[0].price, 5001);
  assert.equal(feed.products[0].name, '<img src=x onerror=alert(1)>', 'text is kept verbatim: the UI inserts it with textContent');
  assert.deepEqual(feed.products[0].keywords.map(keyword => keyword.length), [1, 40]);
  assert.equal(feed.products.find(product => product.id === 'b')?.price, null);
  assert.equal(feed.products.find(product => product.id === 'c')?.price, null);
  assert.equal(safeHttps('https://u:p@x.com/a.jpg'), '');
  assert.equal(safeHttps('javascript:alert(1)'), '');
  assert.equal(safeHttps('https://cdn.example.com/a.jpg'), 'https://cdn.example.com/a.jpg');
  for (const lang of ['vi', 'en'] as const) assert.equal(new Set((['in', 'low', 'out', 'preorder', 'contact'] as const).map(status => statusText(status, lang))).size, 5);
});

