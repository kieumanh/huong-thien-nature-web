import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

for (const [language, path, values, titles, disclaimer] of [
  ['Vietnamese', 'dist/vi/index.html', ['THÂN', 'TÂM', 'TRÍ'], ['Hương Thiền Farm &amp; Botanicals', 'Hương Thiền Eco-Retreat', 'Hương Thiền Academy'], 'chưa mở đăng ký'],
  ['English', 'dist/en/index.html', ['BODY', 'HEART', 'MIND'], ['Hương Thiền Farm &amp; Botanicals', 'Hương Thiền Eco-Retreat', 'Hương Thiền Academy'], 'not open for registration']
]) {
  test(language + ' homepage presents the ecosystem as three distinct directions', () => {
    const html = fs.readFileSync(path, 'utf8');
    assert.equal((html.match(/class="nature-card eco-pyramid eco-pyramid--/g) || []).length, 3);
    for (const label of [...values, ...titles]) assert(html.includes(label), 'missing: ' + label);
    assert(html.includes(disclaimer));
    const story = html.split('<section id="story"')[1]?.split('</section>')[0] || '';
    assert(!story.includes('class="pillar'));
  });
}
