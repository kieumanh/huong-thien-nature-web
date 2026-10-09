import { readdir, readFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const home = (await Promise.all([
  'src/pages/[lang]/index.astro', 'src/components/Header.astro',
  'src/components/Footer.astro', 'src/components/ContactForm.astro',
  'src/components/HomeDiscovery.astro',
  'src/data/site.ts', 'src/data/articles.ts',
].map(file => readFile(join(root, file), 'utf8')))).join('\n');
const problems = [];
const ids = [...home.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const idSet = new Set(ids);
for (const id of ids) if (ids.filter((item) => item === id).length > 1) problems.push(`Duplicate id: #${id}`);
for (const [, id] of home.matchAll(/href="#([^"#]+)"/g)) if (!idSet.has(id)) problems.push(`Missing in-page target: #${id}`);

const referenced = new Set([...home.matchAll(/['"]\/media\/([^'"]+)['"]/g)].map((match) => match[1]));
for (const file of referenced) {
  try { await access(join(root, 'public/media', file)); }
  catch { problems.push(`Missing referenced media: ${file}`); }
}

for (const phrase of ['Hương Thiền', 'Kiều Mạnh', 'interest-form', 'Bảy tầng']) {
  if (!home.includes(phrase)) problems.push(`Required content is missing: ${phrase}`);
}

const mediaFiles = await readdir(join(root, 'public/media'));
if (mediaFiles.length < 10) problems.push(`Expected all supplied image assets; found ${mediaFiles.length}.`);

if (problems.length) {
  console.error(`Source audit failed (${problems.length} issue(s)):`);
  for (const issue of problems) console.error(`- ${issue}`);
  process.exitCode = 1;
} else {
  console.log(`Source audit passed: ${ids.length} unique anchors, ${referenced.size} referenced image variants, ${mediaFiles.length} media files.`);
}
