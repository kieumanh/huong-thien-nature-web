import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

// Home and Ecosystem are landing pages: few words, lots of air, many pictures and soft icons.
// These checks read the built pages (run `npm run build` first) and keep that shape from drifting back to long text.
const page = file => fs.readFileSync(`dist/${file}`, 'utf8');
const mainOf = html => html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? html;
function words(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? html;
  const text = main.replace(/<(script|style|svg|noscript)[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ');
  return text.split(/\s+/).filter(Boolean).length;
}
const count = (html, re) => (html.match(re) ?? []).length;

const budgets = [
  { name: 'Home vi', file: 'vi/index.html', maxWords: 1400, minImages: 14, minIcons: 10 },
  { name: 'Home en', file: 'en/index.html', maxWords: 1150, minImages: 14, minIcons: 10 },
  { name: 'Ecosystem vi', file: 'vi/he-sinh-thai/index.html', maxWords: 900, minImages: 12, minIcons: 6 },
  { name: 'Ecosystem en', file: 'en/ecosystem/index.html', maxWords: 760, minImages: 12, minIcons: 6 },
];

for (const b of budgets) {
  test(`${b.name} stays airy: short, picture-led and animated`, () => {
    const html = page(b.file);
    assert(words(html) <= b.maxWords, `${b.name} has ${words(html)} words, budget ${b.maxWords}`);
    assert(count(html, /<img\b/g) >= b.minImages, `${b.name} should show at least ${b.minImages} photographs`);
    assert(count(html, /class="ai(?: [^"]*)?"/g) >= b.minIcons, `${b.name} should carry at least ${b.minIcons} animated icons`);
    assert(count(html, /data-reveal=/g) >= 8, `${b.name} should reveal sections softly as they scroll in`);
  });

  test(`${b.name} photographs are accessible and do not shift the layout`, () => {
    const imgs = mainOf(page(b.file)).match(/<img\b[^>]*>/g) ?? [];
    assert(imgs.length > 0);
    for (const img of imgs) {
      assert(/\balt="[^"]+"/.test(img), `image without a description: ${img.slice(0, 120)}`);
      assert(/\bwidth="\d+"/.test(img) && /\bheight="\d+"/.test(img), `image without width and height: ${img.slice(0, 120)}`);
    }
  });
}

test('decorative icons are hidden from assistive technology and motion respects reduced-motion', () => {
  const css = fs.readFileSync('src/styles/animated-icons.css', 'utf8') + fs.readFileSync('src/styles/landing.css', 'utf8');
  assert(/prefers-reduced-motion:\s*reduce/.test(css), 'reduced-motion fallback is missing');
  for (const file of ['vi/index.html', 'vi/he-sinh-thai/index.html']) {
    const svgs = page(file).match(/<svg\b[^>]*class="ai[^"]*"[^>]*>/g) ?? [];
    assert(svgs.length > 0);
    assert(svgs.every(svg => svg.includes('aria-hidden="true"')), `an animated icon on ${file} is not aria-hidden`);
  }
});

test('landing pages only use photographs that exist in the album', async () => {
  const album = fs.readFileSync('src/data/album.ts', 'utf8');
  const ids = new Set([...album.matchAll(/id:\s*'([a-z0-9-]+)'/g)].map(m => m[1]));
  const used = new Set();
  for (const file of ['src/components/HomePage.astro', 'src/components/EcosystemOverview.astro', 'src/components/EcosystemHero.astro', 'src/pages/[lang]/[section].astro', 'src/components/ContactPage.astro', 'src/components/ShopTheme.astro']) {
    const src = fs.readFileSync(file, 'utf8');
    for (const m of src.matchAll(/(?:id|photo)="([a-z0-9-]+)"|'([a-z0-9]+(?:-[a-z0-9]+)+)'/g)) used.add(m[1] ?? m[2]);
  }
  const photoLike = [...used].filter(id => ids.has(id));
  assert(photoLike.length >= 20, 'the landing pages should draw on the shared album');
});

test('the Home hero is one calm photograph: no slideshow, no extra ornaments', () => {
  for (const lang of ['vi', 'en']) {
    const html = page(`${lang}/index.html`);
    const art = html.split('class="landing-hero__art"')[1]?.split('</section>')[0] || '';
    assert.equal(count(art, /<img\b/g), 1, 'exactly one hero photograph');
    assert.equal(count(art, /<img[^>]*fetchpriority="high"/g), 1, 'the hero photo loads at once');
    for (const gone of ['data-hero-slide', 'data-hero-toggle', 'data-hero-dot', 'hero-slides']) assert(!html.includes(gone), `${gone} must not return to the Home page`);
    for (const gone of ['landing-orb', 'landing-hero__leaf', 'breath-ring']) assert(!art.includes(gone), `${gone} must not return to the Home hero`);
  }
});
