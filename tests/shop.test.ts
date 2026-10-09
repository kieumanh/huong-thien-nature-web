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
