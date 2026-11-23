import assert from 'node:assert/strict';
import test from 'node:test';
import { tarotEnquiryPath, tarotOffer, tarotPriceLabel } from '../src/data/courses.ts';
import { tarotSchema } from '../src/data/tarot-schema.ts';
import { tarotLanding } from '../src/data/tarot-guidance.ts';

test('no price is published until the owner supplies one', () => {
  assert.equal(tarotOffer.price, null);
  assert.equal(tarotPriceLabel('vi'), 'Liên hệ');
  assert.equal(tarotPriceLabel('en'), 'Ask us');
  for (const lang of ['vi', 'en'] as const) {
    const service = tarotSchema(lang).find(node => node['@type'] === 'Service');
    assert.ok(service && !('offers' in service), 'no Offer without a confirmed price');
  }
});

test('a confirmed price is formatted and published consistently', () => {
  assert.equal(tarotPriceLabel('vi', { price: 600000 }), '600.000 ₫');
  assert.equal(tarotPriceLabel('en', { price: 600000 }), '600,000 VND');
  for (const bad of [0, -5, Number.NaN]) assert.equal(tarotPriceLabel('vi', { price: bad }), 'Liên hệ');
  const service = tarotSchema('vi', { price: 600000, currency: 'VND' }).find(node => node['@type'] === 'Service') as { offers: { price: string; priceCurrency: string } };
  assert.equal(service.offers.price, '600000');
  assert.equal(service.offers.priceCurrency, 'VND');
});

test('structured data mirrors the visible FAQ and links to the organisation', () => {
  for (const lang of ['vi', 'en'] as const) {
    const nodes = tarotSchema(lang);
    const faq = nodes.find(node => node['@type'] === 'FAQPage') as { mainEntity: { name: string }[] };
    assert.equal(faq.mainEntity.length, tarotLanding[lang].faq.length);
    const service = nodes.find(node => node['@type'] === 'Service') as { provider: { '@id': string }; url: string };
    assert.equal(service.provider['@id'], 'https://huongthiennature.com/#organization');
    assert.match(service.url, /^https:\/\/huongthiennature\.com\/(vi|en)\//);
  }
});

test('booking copy is complete and the 90-minute outline still adds up', () => {
  for (const lang of ['vi', 'en'] as const) {
    const copy = tarotLanding[lang];
    assert.equal(copy.howto.length, 3);
    assert.ok(copy.reassure.length >= 3);
    assert.equal(copy.steps.reduce((sum, step) => sum + Number(step[0]), 0), 90);
    assert.ok(tarotEnquiryPath(lang).includes('topic=tarot'));
  }
});
