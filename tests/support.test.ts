import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { supportAccount, supportFund, supportItemIds } from '../src/data/support-fund.ts';
import { journeyPageKeys, journeyPath } from '../src/data/journey-pages.ts';

// Quỹ ủng hộ: the bank details are the ones the project owner supplied, and the copy must stay in step in both languages.
test('account details match what the owner supplied and the QR image ships', () => {
  assert.equal(supportAccount.holder, 'Kiều Xuân Mạnh');
  assert.equal(supportAccount.number, '02871729888');
  assert.equal(supportAccount.numberSpaced.replaceAll(' ', ''), supportAccount.number);
  assert.ok(existsSync(new URL(`../public${supportAccount.qr}`, import.meta.url)), 'QR image exists');
});

test('both languages carry the five areas, the call, the thanks and the safety note', () => {
  assert.deepEqual(supportItemIds, ['space', 'equipment', 'media', 'journey', 'care']);
  for (const lang of ['vi', 'en'] as const) {
    const copy = supportFund[lang];
    for (const id of supportItemIds) assert.ok(copy.items[id][0] && copy.items[id][1].length > 30, `${lang}: ${id}`);
    assert.ok(copy.reasons.length === 3 && copy.call.length === 2 && copy.thanks.length === 2);
    assert.ok(copy.qrAlt.includes(supportAccount.number) && copy.safety.includes('KIEU XUAN MANH'));
    assert.doesNotMatch(JSON.stringify(copy), /115/, `${lang}: no emergency number`);
  }
  assert.equal(supportFund.vi.reasons.length, supportFund.en.reasons.length);
});

test('the page is a registered section and the built pages show the details and a footer link', () => {
  assert.ok(journeyPageKeys.includes('support'));
  for (const lang of ['vi', 'en'] as const) {
    const file = new URL(`../dist${journeyPath(lang, 'support')}index.html`, import.meta.url);
    if (!existsSync(file)) continue;
    const html = readFileSync(file, 'utf8');
    assert.ok(html.includes('0287 1729 888') && html.includes('Kiều Xuân Mạnh') && html.includes(supportAccount.qr), `${lang}: details on the page`);
    assert.ok(html.includes('footer-support') && html.includes(`href="${journeyPath(lang, 'support')}"`), `${lang}: footer entry`);
  }
});

test('the support page has its own link-share picture (1200 x 630) in both languages', async () => {
  const { supportShareImage } = await import('../src/data/support-fund.ts');
  const { existsSync, statSync } = await import('node:fs');
  assert.deepEqual([supportShareImage.width, supportShareImage.height], [1200, 630]);
  for (const lang of ['vi', 'en'] as const) {
    const file = new URL(`../public${supportShareImage[lang].src}`, import.meta.url);
    assert(existsSync(file), `${lang}: ${supportShareImage[lang].src} exists`);
    assert(statSync(file).size < 300 * 1024, `${lang}: share picture stays under 300 KB`);
    assert(supportShareImage[lang].alt.length > 20);
  }
});
