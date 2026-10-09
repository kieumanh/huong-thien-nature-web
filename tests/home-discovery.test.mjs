import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

for (const [language, path] of [['Vietnamese', 'dist/vi/index.html'], ['English', 'dist/en/index.html']]) {
  test(language + ' homepage discovery stays compact and keeps its key routes', () => {
    const html = fs.readFileSync(path, 'utf8');
    const discovery = html.split('<section class="home-discovery shell"')[1]?.split('</section>')[0] || '';
    assert(discovery.includes('role="search"'));
    assert.equal((discovery.match(/class="home-search-suggestions"/g) || []).length, 1);
    assert.equal((discovery.match(/class="home-beginner-link"/g) || []).length, 3);
    assert(discovery.includes(language === 'Vietnamese' ? '/vi/timkiem/' : '/en/search/'));
    assert(!discovery.includes('home-reading'));
  });
}
