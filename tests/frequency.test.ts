import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { courseImage, coursePath, courses, frequencyCourse, frequencyEnquiryPath, frequencyFeeNote, frequencyOffer, frequencyOfferFor, frequencyPriceLabel, frequencyPricing, frequencyTopic } from '../src/data/courses.ts';
import { courseCompare } from '../src/data/course-compare.ts';
import { studentFeedback } from '../src/data/student-feedback.ts';
import { journeyPageKeys, journeyPath } from '../src/data/journey-pages.ts';
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

test('confirmed fee: 5.600.000 ₫ until Tết Âm lịch 2027, then 6.600.000 ₫', () => {
  assert.equal(frequencyPricing.promo, 5600000);
  assert.equal(frequencyPricing.regular, 6600000);
  assert.equal(frequencyPricing.promoEndsAt, '2027-02-06T00:00:00+07:00', 'mùng 1 Tết Đinh Mùi is Saturday 6 February 2027');
  assert.equal(frequencyOfferFor(new Date('2026-11-25T00:00:00+07:00')).price, 5600000);
  assert.equal(frequencyOfferFor(new Date('2027-01-01T00:00:00+07:00')).price, 5600000, 'the recommended price runs past 1 January');
  assert.equal(frequencyOfferFor(new Date('2027-02-05T23:59:59+07:00')).price, 5600000);
  assert.equal(frequencyOfferFor(new Date('2027-02-06T00:00:00+07:00')).price, 6600000);
  assert.equal(frequencyOfferFor(new Date('2030-06-01T00:00:00+07:00')).price, 6600000);
  assert.equal(frequencyPriceLabel('vi', frequencyOfferFor(new Date('2026-11-25T00:00:00+07:00'))), '5.600.000 ₫');
  assert.equal(frequencyPriceLabel('en', frequencyOfferFor(new Date('2027-03-01T00:00:00+07:00'))), '6,600,000 VND');
  assert.match(frequencyFeeNote('vi', frequencyOfferFor(new Date('2026-11-25T00:00:00+07:00'))), /05\/02\/2027.*6\.600\.000/);
  assert.match(frequencyFeeNote('en', frequencyOfferFor(new Date('2026-11-25T00:00:00+07:00'))), /5 February 2027.*6,600,000/);
  for (const bad of [0, -1, Number.NaN]) assert.equal(frequencyPriceLabel('en', { price: bad }), 'Ask us');
  assert.ok(frequencyOffer.price === 5600000 || frequencyOffer.price === 6600000);
  for (const lang of languages) {
    const service = frequencySchema(lang, { price: null, currency: 'VND' }).find(node => node['@type'] === 'Service');
    assert.ok(service && !('offers' in service), 'no Offer without a figure');
  }
  const priced = frequencySchema('vi', frequencyOfferFor(new Date('2026-11-25T00:00:00+07:00'))).find(node => node['@type'] === 'Service') as { offers: { price: string; priceValidUntil: string } };
  assert.equal(priced.offers.price, '5600000');
  assert.equal(priced.offers.priceValidUntil, '2027-02-05');
  const official = frequencySchema('vi', frequencyOfferFor(new Date('2027-03-01T00:00:00+07:00'))).find(node => node['@type'] === 'Service') as { offers: { price: string } & Record<string, unknown> };
  assert.equal(official.offers.price, '6600000');
  assert.ok(!('priceValidUntil' in official.offers));
});

test('the written fee on the page and in the compare table matches the pricing figures, and no quote-by-message copy is left', () => {
  const dots = (value: number) => new Intl.NumberFormat('vi-VN').format(value);
  const commas = (value: number) => new Intl.NumberFormat('en-US').format(value);
  const info = frequencyLanding.vi.info.items.find(([label]) => label === 'Học phí')?.[1] ?? '';
  assert.ok(info.includes(dots(frequencyPricing.promo)) && info.includes(dots(frequencyPricing.regular)));
  const infoEn = frequencyLanding.en.info.items.find(([label]) => label === 'Fee')?.[1] ?? '';
  assert.ok(infoEn.includes(commas(frequencyPricing.promo)) && infoEn.includes(commas(frequencyPricing.regular)));
  for (const lang of languages) {
    const text = JSON.stringify([frequencyLanding[lang], courseCompare[lang]]);
    assert.ok(!/báo giá|quote by message|get a quote|request a quote|ask for a quote/i.test(text), `${lang}: price enquiries removed`);
  }
  assert.equal(frequencyLanding.vi.countdown.units.length, 4);
  assert.equal(frequencyLanding.en.countdown.units.length, 4);
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
    assert.equal(copy.support.items.length, 5);
    assert.equal(copy.howto.length, 3);
    assert.ok(copy.faq.length >= 8);
    assert.equal(copy.selfCheck.levels.length, 4);
    assert.equal(copy.selfCheck.results.length, 4);
    assert.deepEqual(copy.links.map(([id]) => id), ['info', 'value', 'curriculum', 'self-check', 'scientists', 'support', 'faq', 'quote']);
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

test('the course information sheet and the course comparison answer what a student asks before enrolling', () => {
  for (const lang of languages) {
    const { info, faq } = frequencyLanding[lang];
    assert.equal(info.items.length, 9);
    assert.equal(info.prepare.length, 3);
    assert.ok(info.items.every(([label, value]) => label.length > 2 && value.length > 4));
    assert.ok(info.items.some(([, value]) => /online/i.test(value)));
    assert.ok(faq.length >= 12);
    const compare = courseCompare[lang];
    assert.equal(compare.rows.length, 5);
    for (const key of ['golden-frequency', 'tarot'] as const) {
      assert.equal(compare.courses[key].values.length, compare.rows.length);
      assert.ok(compare.courses[key].values.every(value => value.length > 8));
    }
  }
  assert.deepEqual(Object.keys(courseCompare.vi.courses), Object.keys(courseCompare.en.courses));
  const fees = (lang: 'vi' | 'en', key: 'golden-frequency' | 'tarot') => courseCompare[lang].courses[key].values[4];
  assert.ok(fees('vi', 'golden-frequency').includes('5.600.000') && fees('vi', 'golden-frequency').includes('6.600.000'));
  assert.ok(fees('en', 'golden-frequency').includes('5,600,000') && fees('en', 'golden-frequency').includes('6,600,000'));
  assert.ok(fees('vi', 'tarot').includes('600.000') && fees('en', 'tarot').includes('600,000'));
});

test('student feedback keeps the original text and an equal English translation', () => {
  assert.ok(studentFeedback.length >= 1);
  for (const item of studentFeedback) {
    assert.equal(item.quote.length, item.quoteEn.length);
    assert.ok(item.quote.every(paragraph => paragraph.length > 20) && item.name && item.role.vi && item.role.en);
    assert.ok(item.quote.join(' ').includes(item.highlight), 'the pull-quote is a sentence of the original');
    assert.ok(item.quoteEn.join(' ').includes(item.highlightEn));
  }
});

test('the student feedback page has bilingual routes, is built and sits in the menu just before Contact', () => {
  assert.ok(journeyPageKeys.includes('feedback'));
  assert.equal(journeyPath('vi', 'feedback'), '/vi/phan-hoi-hoc-vien/');
  assert.equal(journeyPath('en', 'feedback'), '/en/student-feedback/');
  const header = readFileSync(new URL('../src/components/Header.astro', import.meta.url), 'utf8');
  const feedbackAt = header.indexOf("pageLink('feedback')");
  assert.ok(feedbackAt > header.indexOf("pageLink('practice')"), 'feedback follows the practice courses');
  assert.ok(feedbackAt < header.indexOf('nav-connect'), 'feedback comes before the Contact button');
  for (const lang of languages) {
    const built = new URL(`../dist${journeyPath(lang, 'feedback')}index.html`, import.meta.url);
    if (!existsSync(built)) continue;
    const html = readFileSync(built, 'utf8');
    assert.ok(html.includes('feedback-card') || html.includes('class="feedback'), `${lang} page renders the feedback card`);
    assert.ok(html.includes(`href="${journeyPath(lang, 'feedback')}"`), `${lang} menu links to the page`);
  }
});

test('the gold layer is loaded site-wide after the base styles', () => {
  const layout = readFileSync(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
  assert.ok(layout.includes('gold.css'));
  assert.ok(existsSync(new URL('../src/styles/gold.css', import.meta.url)));
});
