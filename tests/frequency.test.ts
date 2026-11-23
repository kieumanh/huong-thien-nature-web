import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { courseImage, coursePath, courses, frequencyCourse, frequencyEnquiryPath, frequencyOffer, frequencyPriceLabel, frequencyTopic } from '../src/data/courses.ts';
import { frequencySchema } from '../src/data/golden-frequency-schema.ts';
import { frequencyLanding, frequencyReferences, frequencyScientists, frequencyTypes, selfCheckDomains, weeklyPlan } from '../src/data/golden-frequency.ts';

const languages = ['vi', 'en'] as const;

test('the course is listed with bilingual routes and social images that exist', () => {
  assert.ok(courses.includes(frequencyCourse));
  assert.equal(coursePath('vi', frequencyCourse), '/vi/khoa-thuc-hanh/tan-so-vang/');
  assert.equal(coursePath('en', frequencyCourse), '/en/practice-courses/golden-frequency/');
  for (const lang of languages) {
    const image = courseImage(frequencyCourse, lang);
    assert.ok(existsSync(new URL(`../public${image}`, import.meta.url)), `missing social image ${image}`);
    const bytes = readFileSync(new URL(`../public${image}`, import.meta.url));
    assert.equal(bytes.readUInt16BE(0), 0xffd8, 'social image must be a JPEG');
  }
  assert.notEqual(courseImage(frequencyCourse, 'vi'), courseImage(frequencyCourse, 'en'));
});

test('no fee is published until the owner confirms one', () => {
  assert.equal(frequencyOffer.price, null);
  assert.equal(frequencyPriceLabel('vi'), 'Nhận báo giá');
  assert.equal(frequencyPriceLabel('en'), 'Ask for a quote');
  assert.equal(frequencyPriceLabel('vi', { price: 3500000 }), '3.500.000 ₫');
  for (const bad of [0, -1, Number.NaN]) assert.equal(frequencyPriceLabel('en', { price: bad }), 'Ask for a quote');
  for (const lang of languages) {
    const service = frequencySchema(lang).find(node => node['@type'] === 'Service');
    assert.ok(service && !('offers' in service));
  }
  const priced = frequencySchema('vi', { price: 3500000, currency: 'VND' }).find(node => node['@type'] === 'Service') as { offers: { price: string } };
  assert.equal(priced.offers.price, '3500000');
});

test('structured data mirrors the visible questions', () => {
  for (const lang of languages) {
    const faq = frequencySchema(lang).find(node => node['@type'] === 'FAQPage') as { mainEntity: { name: string }[] };
    assert.equal(faq.mainEntity.length, frequencyLanding[lang].faq.length);
    assert.equal(faq.mainEntity[0].name, frequencyLanding[lang].faq[0][0]);
  }
});

test('the six stages, five frequencies, six life areas and seven days are complete in both languages', () => {
  for (const lang of languages) {
    const copy = frequencyLanding[lang];
    assert.equal(copy.stages.length, 6);
    assert.deepEqual(copy.stages.map(stage => stage[3]), ['frequencies', 'benefits', 'methods', 'self-check', 'daily', 'weekly']);
    assert.equal(copy.benefits.domains.length, 4);
    assert.equal(copy.methods.groups.length, 3);
    assert.equal(copy.support.items.length, 6);
    assert.equal(copy.howto.length, 3);
    assert.ok(copy.faq.length >= 8);
    assert.equal(copy.selfCheck.levels.length, 4);
    assert.equal(copy.selfCheck.results.length, 4);
    assert.deepEqual(copy.links.map(([id]) => id), ['value', 'curriculum', 'self-check', 'scientists', 'support', 'faq', 'quote']);
  }
  assert.equal(frequencyTypes.length, 5);
  assert.deepEqual(selfCheckDomains.map(domain => domain.vi.name), ['Tư duy', 'Cảm xúc', 'Hành vi', 'Lối sống', 'Mối quan hệ', 'Tài chính']);
  for (const domain of selfCheckDomains) for (const lang of languages) {
    assert.equal(domain[lang].levels.length, 4);
    assert.ok(domain[lang].levels.every(level => level.length > 10) && domain[lang].focus.length > 20);
  }
  assert.equal(weeklyPlan.length, 7);
});

test('every scientist has a sourced, bilingual profile and no photograph', () => {
  assert.ok(frequencyScientists.length >= 4 && frequencyScientists.length <= 6);
  for (const person of frequencyScientists) {
    assert.match(person.source, /^https:\/\//);
    for (const lang of languages) for (const field of ['role', 'idea', 'life', 'lesson'] as const) assert.ok(person[lang][field].length > 10, `${person.id}.${lang}.${field}`);
    assert.ok(!('image' in person), 'scientists are shown with generated glyphs, not photographs');
  }
  for (const [, href] of frequencyReferences) assert.match(href, /^https:\/\//);
});

test('copy keeps the editorial guardrails', () => {
  const text = JSON.stringify(frequencyLanding);
  for (const banned of ['chữa khỏi', 'cam kết thu nhập', 'đảm bảo', 'guarantee', 'will cure', 'will make you rich']) assert.ok(!text.includes(banned), banned);
  assert.ok(frequencyLanding.vi.scope.includes('không thay thế'));
  assert.ok(frequencyLanding.en.scope.includes('does not replace'));
});

test('quote links carry the allow-listed topic that the contact form understands', () => {
  const script = readFileSync(new URL('../src/scripts/contact-form.ts', import.meta.url), 'utf8');
  assert.ok(script.includes(`'${frequencyTopic}'`));
  for (const lang of languages) assert.ok(frequencyEnquiryPath(lang).includes(`topic=${frequencyTopic}`));
});
