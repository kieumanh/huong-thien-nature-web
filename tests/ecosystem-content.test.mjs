import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

for (const [language, path, values, titles, disclaimer] of [
  ['Vietnamese', 'dist/vi/index.html', ['THÂN', 'TÂM', 'TRÍ'], ['Hương Thiền Farm &amp; Botanicals', 'Hương Thiền Eco-Retreat', 'Hương Thiền Academy'], 'chưa mở đăng ký'],
  ['English', 'dist/en/index.html', ['BODY', 'HEART', 'MIND'], ['Hương Thiền Farm &amp; Botanicals', 'Hương Thiền Eco-Retreat', 'Hương Thiền Academy'], 'registration']
]) {
  test(language + ' page presents the ecosystem as three distinct directions', () => {
    const html = fs.readFileSync(path, 'utf8');
    assert.equal((html.match(/class="solar-planet solar-planet--/g) || []).length, 3);
    assert.equal((html.match(/class="solar-pillar solar-pillar--/g) || []).length, 3);
    assert(html.includes('class="solar-sun"'));
    for (const label of [...values, ...titles]) assert(html.includes(label), 'missing: ' + label);
    assert(html.includes(disclaimer));
    assert(!html.includes('eco-pyramid'));
    const story = html.split('<section id="story"')[1]?.split('</section>')[0] || '';
    assert(!story.includes('class="pillar'));
  });
}

test('ecosystem strategy pages show two illustrations and link back to the live orbits', () => {
  for (const [lang, route] of [['vi', 'he-sinh-thai'], ['en', 'ecosystem']]) {
    const html = fs.readFileSync(`dist/${lang}/${route}/index.html`, 'utf8');
    assert.equal((html.match(/<figure[^>]+data-ecosystem-illustration/g) || []).length, 2);
    assert(html.includes(`href="/${lang}/#nature"`));
    assert(!html.includes('solar-orbit--1'));
    const partnerships = html.match(/<section[^>]+id="partnerships"[^>]*>(.*?)<\/section>/s)?.[1];
    assert(partnerships, 'missing partnership journey for ' + lang);
    for (const marker of ['Lê Lam Sơn', 'Nguyễn Trần Quyết', 'datetime="2026-09"', 'https://guiyeuthuongvaodat.com/', 'https://kimtuthap.org/']) {
      assert(partnerships.includes(marker), 'missing: ' + marker);
    }
  }
});
