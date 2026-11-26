// Post-build step: Astro writes the English 404 to dist/en/404/index.html, but the host serves the
// nearest "404.html" in the folder hierarchy (wrangler.worker.jsonc: not_found_handling "404-page").
// Move it to dist/en/404.html so unknown /en/… addresses get the English page. The Vietnamese page is
// already dist/404.html.
import { existsSync } from 'node:fs';
import { mkdir, rename, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const source = join(dist, 'en', '404', 'index.html');
const target = join(dist, 'en', '404.html');

if (!existsSync(source)) throw new Error(`finish-404: ${source} is missing; did the build change?`);
await mkdir(dirname(target), { recursive: true });
await rename(source, target);
await rm(join(dist, 'en', '404'), { recursive: true, force: true });
console.log('finish-404: dist/en/404.html written');
