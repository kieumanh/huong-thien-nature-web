import test from 'node:test';
import assert from 'node:assert/strict';
import { searchRecords, normalizeSearch } from '../src/scripts/search-engine.ts';
import { buildSearchIndex } from '../src/data/search.ts';
import { articles } from '../src/data/articles.ts';
import { products, productPath } from '../src/data/products.ts';
test('Vietnamese accents and đ are optional',()=>{assert.equal(normalizeSearch('THIỀN ĐỊNH'),'thien dinh');const index=buildSearchIndex('vi');assert.deepEqual(searchRecords(index,'hơi thở'),searchRecords(index,'hoi tho'));assert(searchRecords(index,'hoi tho').length>0);});
test('index covers every article, product, catalogue and project section in each language',()=>{for(const lang of ['vi','en'] as const){const data=buildSearchIndex(lang);const count=articles.length+products.length+8;assert.equal(data.length,count);assert.equal(new Set(data.map(row=>row.url)).size,count);assert(data.every(row=>row.url.startsWith(`/${lang}/`)));}});
test('product names and ingredients are searchable in both languages',()=>{assert(searchRecords(buildSearchIndex('vi'),'bot nem sachi').some(row=>row.url===productPath('vi','bot-nem-sachi')));assert(searchRecords(buildSearchIndex('en'),'black sesame').some(row=>row.url===productPath('en','sua-kokkoh')));});
test('full body is searchable and empty queries have no matches',()=>{const entry={title:'Other',description:'Intro',category:'Practice',url:'/en/journal/test/',text:'quiet garden practice'};assert.equal(searchRecords([entry],'quiet garden').length,1);assert.equal(searchRecords([entry],'quiet missing').length,0);assert.equal(searchRecords([entry],'').length,0);assert.equal(searchRecords([entry],'<script>alert(1)</script>').length,0);});
test('title matches rank before body matches',()=>{const a={title:'Other',description:'',category:'',url:'/a',text:'breath'},b={...a,title:'Breath',url:'/b'};assert.equal(searchRecords([a,b],'breath')[0].url,'/b');});

test('founder journey and all ecosystem pillars are searchable',()=>{for(const lang of ['vi','en'] as const){const data=buildSearchIndex(lang);assert(searchRecords(data,'Do Thi Kim Huong').some(row=>row.url.endsWith('#journey')));for(const query of ['Farm Botanicals','Eco-Retreat','Academy']){assert(searchRecords(data,query).some(row=>row.url.endsWith('#nature')));}}});
