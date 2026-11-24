import { existsSync } from 'node:fs';
import { join } from 'node:path';

// Card thumbnails (2.16.0): 640 x 400 WebP, centre-cropped to the card's 16:10 frame, each under 100 KB.
// They are resized copies of covers already hosted here (public/media/thumbs/<same file name>); the originals are untouched.
// Used only at build time. An article whose cover has no thumbnail falls back to the full cover.
export function thumbOf(image: string): { src: string; width: number; height: number; isThumb: boolean } {
  const name = image.split('/').at(-1) ?? '';
  const src = `/media/thumbs/${name}`;
  return existsSync(join(process.cwd(), 'public', src)) ? { src, width: 640, height: 400, isThumb: true } : { src: image, width: 0, height: 0, isThumb: false };
}
