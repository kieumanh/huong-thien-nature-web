import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import test from 'node:test';
import { albumAnchor, albumCategories, albumCopy, albumPath, albumPhoto, albumPhotoSrc, albumPhotos, albumSections, albumThumbSrc } from '../src/data/album.ts';
import { journeyPageKeys, journeyPath } from '../src/data/journey-pages.ts';

const languages = ['vi', 'en'] as const;
const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const publicFile = (path: string) => new URL(`../public${path}`, import.meta.url);

test('every album photo has unique ids, a known category and both image files', () => {
  const ids = albumPhotos.map(photo => photo.id);
  assert.equal(new Set(ids).size, ids.length, 'photo ids must be unique');
  assert.ok(ids.length >= 51, 'the album holds all fifty-one shared photos');
  for (const photo of albumPhotos) {
    assert.ok((albumCategories as readonly string[]).includes(photo.category), `${photo.id}: unknown category`);
    assert.match(photo.id, /^[a-z0-9-]+$/, `${photo.id}: ids are lowercase kebab-case`);
    for (const src of [albumPhotoSrc(photo), albumThumbSrc(photo)]) {
      assert.ok(existsSync(publicFile(src)), `${photo.id}: missing ${src}`);
      const bytes = readFileSync(publicFile(src));
      assert.equal(bytes.subarray(0, 4).toString('ascii'), 'RIFF', `${src} must be WebP`);
      assert.equal(bytes.subarray(8, 12).toString('ascii'), 'WEBP', `${src} must be WebP`);
    }
    assert.ok(statSync(publicFile(albumThumbSrc(photo))).size < statSync(publicFile(albumPhotoSrc(photo))).size, `${photo.id}: the grid image is lighter than the full image`);
    assert.ok(photo.width > 0 && photo.height > 0 && photo.thumbWidth === 640 && photo.thumbHeight > 0);
    assert.ok(Math.abs(photo.thumbWidth / photo.thumbHeight - photo.width / photo.height) < 0.01, `${photo.id}: the thumbnail keeps the photo's proportions`);
  }
});

test('no photo file in public/media/journey is left out of the album data', () => {
  const known = new Set(albumPhotos.flatMap(photo => [`${photo.id}.webp`, `${photo.id}-640.webp`]));
  const files = readdirSync(publicFile('/media/journey/'));
  for (const file of files) assert.ok(known.has(file), `${file} is not listed in src/data/album.ts`);
  assert.equal(files.length, known.size, 'each photo has exactly two files');
});

test('captions and alt text exist in Vietnamese and English and stay specific', () => {
  for (const photo of albumPhotos) {
    for (const lang of languages) {
      assert.ok(photo.caption[lang].trim().length > 8, `${photo.id}: ${lang} caption`);
      assert.ok(photo.alt[lang].trim().length > 20, `${photo.id}: ${lang} alt text`);
      assert.ok(!/\b(IMG|HEIC|DSC)[_-]?\d+/i.test(`${photo.caption[lang]} ${photo.alt[lang]}`), `${photo.id}: no camera file names in text`);
    }
    assert.notEqual(photo.caption.vi, photo.caption.en);
  }
  // Only the event banner states a place and a date, because the banner itself shows them.
  const withDates = albumPhotos.filter(photo => languages.some(lang => /\d{1,2}\/\d{1,2}\/\d{4}|\d{4}/.test(photo.caption[lang])));
  assert.deepEqual(withDates.map(photo => photo.id), ['event-banner']);
});

test('every category has a bilingual heading, an intro and at least one photo', () => {
  for (const category of albumCategories) {
    for (const lang of languages) {
      assert.ok(albumSections[category].title[lang].length > 2);
      assert.ok(albumSections[category].intro[lang].length > 10);
    }
    assert.ok(albumPhotos.some(photo => photo.category === category), `${category} has no photos`);
  }
  for (const lang of languages) {
    const copy = albumCopy[lang];
    assert.ok(copy.counter(2, 20).includes('2') && copy.counter(2, 20).includes('20'));
    assert.ok(copy.credit.length > 5 && copy.removal.length > 20, 'credit and removal-request note are present');
  }
});

test('the garden group credits the Gửi Yêu Thương Vào Đất farm collaboration with Lê Lam Sơn', () => {
  for (const lang of languages) {
    const intro = albumSections.garden.intro[lang];
    assert.ok(intro.includes('Gửi Yêu Thương Vào Đất'), `${lang}: farm name`);
    assert.ok(intro.includes('Lê Lam Sơn'), `${lang}: partner name`);
  }
  assert.ok(albumPhotos.filter(photo => photo.category === 'garden').length >= 10);
  assert.ok(albumCategories.includes('practice'), 'meditation, tarot and the practice corner form their own group');
});

test('albumPhoto rejects unknown ids so a typo cannot ship a blank slot', () => {
  assert.throws(() => albumPhoto('does-not-exist'));
  assert.equal(albumPhoto('event-banner').id, 'event-banner');
  assert.equal(albumAnchor(albumPhoto('event-banner')), 'photo-event-banner');
});

test('the album page has bilingual routes and sits in the menu between Practice and Feedback', () => {
  assert.ok(journeyPageKeys.includes('album'));
  assert.equal(albumPath('vi'), '/vi/album/');
  assert.equal(albumPath('en'), '/en/album/');
  assert.equal(journeyPath('vi', 'album'), albumPath('vi'));
  const header = read('src/components/Header.astro');
  const at = header.indexOf("pageLink('album')");
  assert.ok(at > header.indexOf("pageLink('practice')"), 'album follows the practice courses');
  assert.ok(at < header.indexOf("pageLink('feedback')"), 'album comes before student feedback');
  assert.ok(at < header.indexOf('nav-connect'), 'album comes before the Contact button');
});

test('the menu collapses into the toggle below 1280px so nine links never overflow', () => {
  assert.ok(read('src/styles/global.css').includes('@media (min-width: 1280px)'));
  assert.ok(read('src/styles/global.css').includes('@media (max-width: 1279px)'));
  assert.ok(read('src/components/Header.astro').includes("(min-width: 1280px)"));
});

test('every photo strip on the site only uses photos that exist in the album', () => {
  const files = [
    'src/components/HomePage.astro', 'src/components/CourseCatalogue.astro', 'src/components/GoldenFrequency.astro',
    'src/components/TarotGuidance.astro', 'src/pages/[lang]/[section].astro',
  ];
  const known = new Set(albumPhotos.map(photo => photo.id));
  const strips: string[] = [];
  for (const file of files) {
    const source = read(file);
    for (const match of source.matchAll(/<AlbumStrip[\s\S]*?photos=\{\[([^\]]*)\]\}/g)) {
      const ids = [...match[1].matchAll(/'([^']+)'/g)].map(item => item[1]);
      assert.ok(ids.length >= 3, `${file}: a strip shows at least three photos`);
      for (const id of ids) assert.ok(known.has(id), `${file}: unknown album photo "${id}"`);
      strips.push(...ids);
    }
  }
  assert.ok(strips.length >= 20, 'strips appear on the home, story, ecosystem, practice, catalogue and both landing pages');
  for (const file of ['src/components/GoldenFrequency.astro', 'src/components/TarotGuidance.astro']) {
    assert.ok(read(file).includes('<AlbumStrip'), `${file} includes a photo strip`);
  }
});

test('built pages render the gallery, the lightbox and working photo links', () => {
  for (const lang of languages) {
    const built = new URL(`../dist${albumPath(lang)}index.html`, import.meta.url);
    if (!existsSync(built)) continue;
    const html = readFileSync(built, 'utf8');
    assert.ok(html.includes('data-album-dialog'), `${lang}: lightbox dialog`);
    for (const photo of albumPhotos) {
      assert.ok(html.includes(albumThumbSrc(photo)), `${lang}: grid image for ${photo.id}`);
      assert.ok(html.includes(`href="${albumPhotoSrc(photo)}"`), `${lang}: full-size link for ${photo.id} (works without JavaScript)`);
      assert.ok(html.includes(photo.alt[lang]), `${lang}: alt text for ${photo.id}`);
    }
    assert.ok(html.includes(`href="${albumPath(lang)}"`), `${lang}: the menu links to the album`);
  }
});
