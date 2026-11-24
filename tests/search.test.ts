import { shopThemes, themePath } from '../src/data/shop-themes.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import { searchRecords, normalizeSearch } from '../src/scripts/search-engine.ts';
import { buildSearchIndex } from '../src/data/search.ts';
import { courses, coursePath } from '../src/data/courses.ts';
import { articles, articlePath } from '../src/data/articles.ts';
import { journeyPageKeys, journeyPath } from '../src/data/journey-pages.ts';
import { products, productPath } from '../src/data/products.ts';
test('Vietnamese accents and đ are optional',()=>{assert.equal(normalizeSearch('THIỀN ĐỊNH'),'thien dinh');const index=buildSearchIndex('vi');assert.deepEqual(searchRecords(index,'hơi thở'),searchRecords(index,'hoi tho'));assert(searchRecords(index,'hoi tho').length>0);});
test('index covers every article, product, catalogue and project section in each language',()=>{for(const lang of ['vi','en'] as const){const data=buildSearchIndex(lang);const count=articles.length+products.length+journeyPageKeys.length+courses.length+2+shopThemes.length;assert.equal(data.length,count);assert.equal(new Set(data.map(row=>row.url)).size,count);assert(courses.every(course => data.some(row => row.url === coursePath(lang, course))));assert(shopThemes.every(theme => data.some(row => row.url === themePath(lang, theme))));assert(data.every(row=>row.url.startsWith(`/${lang}/`)));}});
test('product names and ingredients are searchable in both languages',()=>{assert(searchRecords(buildSearchIndex('vi'),'bot nem sachi').some(row=>row.url===productPath('vi','bot-nem-sachi')));assert(searchRecords(buildSearchIndex('en'),'black sesame').some(row=>row.url===productPath('en','sua-kokkoh')));});
test('product aliases find rich results with images, prices and explicit stock status',()=>{
  for(const [lang,query,slug] of [['vi','lac','dau-phong-song'],['vi','ca cao','bot-cacao'],['vi','xi dau','tuong-tamari'],['en','groundnuts','dau-phong-song']] as const){
    const result=searchRecords(buildSearchIndex(lang),query).find(row=>row.url===productPath(lang,slug));
    assert(result?.product && result.description.length>30);
    assert(result.product.image.startsWith('/media/shop/') && result.product.imageAlt);
    assert(result.product.price>0 && result.product.priceLabel && result.product.stockLabel);
    assert.equal(result.product.stock,'unknown');
  }
  for(const lang of ['vi','en'] as const) assert(!buildSearchIndex(lang).some(row=>/hat-ngu-coc-do|gia-vi-dang-long/.test(row.url)));
});
test('full body is searchable and empty queries have no matches',()=>{const entry={title:'Other',description:'Intro',category:'Practice',url:'/en/journal/test/',text:'quiet garden practice'};assert.equal(searchRecords([entry],'quiet garden').length,1);assert.equal(searchRecords([entry],'quiet missing').length,0);assert.equal(searchRecords([entry],'').length,0);assert.equal(searchRecords([entry],'<script>alert(1)</script>').length,0);});
test('title matches rank before body matches',()=>{const a={title:'Other',description:'',category:'',url:'/a',text:'breath'},b={...a,title:'Breath',url:'/b'};assert.equal(searchRecords([a,b],'breath')[0].url,'/b');});
test('title prefix ranks ahead of a later title occurrence for broad queries',()=>{
  const startsWith={title:'Thiền cho người mới bắt đầu',description:'',category:'',url:'/guide',text:''};
  const endsWith={title:'Hương Thiền và cộng đồng',description:'',category:'',url:'/about',text:''};
  assert.equal(searchRecords([endsWith,startsWith],'thiền')[0].url,'/guide');
});
test('an introductory meditation query leads with a directly relevant article',()=>{
  const results=searchRecords(buildSearchIndex('vi'),'thiền');
  assert.match(results[0]?.title ?? '',/^Thiền/i);
});
test('founder journey and all ecosystem pillars are searchable',()=>{for(const lang of ['vi','en'] as const){const data=buildSearchIndex(lang);assert(searchRecords(data,'Do Thi Kim Huong').some(row=>row.url===journeyPath(lang,'story')));for(const query of lang==='vi'?['Pháp môn tu tập','farm đối tác','đá thanh lọc']:['Paths of practice','partner farms','cleansing stones']){assert(searchRecords(data,query).some(row=>row.url===journeyPath(lang,'ecosystem')));}}});

test('partner names find the localized team page', () => {
  for (const lang of ['vi', 'en'] as const) {
    for (const query of ['Nguyen Tran Quyet', 'Le Lam Son', 'ZenWork']) {
      assert(searchRecords(buildSearchIndex(lang), query).some(row => row.url === journeyPath(lang, 'team')));
    }
  }
});

test('results carry a small thumbnail that exists on disk (articles, pages, courses)', async () => {
  const { existsSync, statSync } = await import('node:fs');
  for (const lang of ['vi', 'en'] as const) {
    const data = buildSearchIndex(lang);
    for (const article of articles) {
      const row = data.find(entry => entry.url === articlePath(lang, article.slug));
      assert(row?.image, `${lang}: article ${article.slug} has a result image`);
    }
    for (const page of journeyPageKeys) assert(data.find(entry => entry.url === journeyPath(lang, page))?.image, `${lang}: ${page} page has a result image`);
    for (const course of courses) assert(data.find(entry => entry.url === coursePath(lang, course))?.image, `${lang}: course has a result image`);
    for (const entry of data.filter(row => row.image)) {
      const file = new URL(`../public${entry.image!.src}`, import.meta.url);
      assert(entry.image!.src.startsWith('/media/thumbs/'), `${entry.url}: thumbnail path`);
      assert(existsSync(file), `${entry.url}: ${entry.image!.src} exists`);
      assert(statSync(file).size < 100 * 1024, `${entry.image!.src} is under 100 KB`);
      assert.deepEqual([entry.image!.width, entry.image!.height], [640, 400]);
    }
  }
});
test('products keep their own image block and do not get a second thumbnail', () => {
  for (const row of buildSearchIndex('vi').filter(entry => entry.product)) assert.equal(row.image, undefined);
});
test('the support page is searchable by its own wording', () => {
  for (const [lang, query] of [['vi', 'tam long'], ['vi', 'quy ung ho'], ['en', 'support fund'], ['en', 'kind hearts']] as const) {
    assert(searchRecords(buildSearchIndex(lang), query).some(row => row.url === journeyPath(lang, 'support')), `${lang}: ${query}`);
  }
});
