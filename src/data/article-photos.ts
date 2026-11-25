import { albumPhotos, albumPhotoSrc } from './album.ts';

// Pixabay source pages and intrinsic dimensions for the locally hosted photographs.
const pixabayPhotos: Record<string, { source?: string; width: number; height: number }> = {
  '/media/huong-ben-ho.webp': { width: 1120, height: 630 },
  '/media/pixabay-7363535.webp': { source: 'https://pixabay.com/photos/bamboo-forest-path-asia-japan-7363535/', width: 1200, height: 802 },
  '/media/pixabay-1869722.webp': { source: 'https://pixabay.com/photos/beverage-tea-pour-pouring-1869722/', width: 853, height: 1280 },
  '/media/pixabay-6166113.webp': { source: 'https://pixabay.com/photos/buffalo-farmer-lake-pond-animals-6166113/', width: 1200, height: 800 },
  '/media/pixabay-1750132.webp': { source: 'https://pixabay.com/photos/japan-japanese-style-room-house-1750132/', width: 1200, height: 799 },
  '/media/pixabay-5104510.webp': { source: 'https://pixabay.com/photos/landscape-terraced-fields-vietnam-5104510/', width: 1200, height: 800 },
  '/media/pixabay-7374190.webp': { source: 'https://pixabay.com/photos/leaves-fern-foliage-nature-7374190/', width: 958, height: 1280 },
  '/media/pixabay-5084840.webp': { source: 'https://pixabay.com/photos/lotus-sen-vietnam-pink-natural-5084840/', width: 853, height: 1280 },
  '/media/pixabay-3358870.webp': { source: 'https://pixabay.com/photos/tea-plantation-landscape-vietnam-3358870/', width: 1200, height: 801 },
  '/media/pixabay-1287964.webp': { source: 'https://pixabay.com/photos/vietnam-saigon-temple-incense-1287964/', width: 1200, height: 900 },
  '/media/pixabay-8259984.webp': { source: 'https://pixabay.com/photos/vietnam-tea-plantation-agriculture-8259984/', width: 1200, height: 800 },
  '/media/pixabay-2268333.webp': { source: 'https://pixabay.com/photos/foot-grass-fingers-barefoot-2268333/', width: 880, height: 585 },
  '/media/pixabay-2641446.webp': { source: 'https://pixabay.com/photos/water-buffalo-vietnam-nature-2641446/', width: 1200, height: 656 },
  '/media/pixabay-6540843.webp': { source: 'https://pixabay.com/photos/waterfall-vietnam-nature-landscape-6540843/', width: 1200, height: 800 },
  // Our own illustration, drawn for the Sun and Moon article (2.19.0; scripts/illustrations/sky-rhythm.py).
  '/media/illustrations/sun-moon-cover.webp': { width: 1200, height: 800 },
  // Already hosted for in-article figures; reused as covers in 2.16.0 (see article-covers.ts). Source pages as recorded in editorial-illustrations.ts.
  '/media/pixabay-2608830.webp': { source: 'https://pixabay.com/photos/nature-water-river-stream-rocks-2608830/', width: 880, height: 586 },
  '/media/pixabay-58125.webp': { source: 'https://pixabay.com/photos/water-rocks-stone-river-nature-58125/', width: 880, height: 586 },
};

// Album photographs (our own) may also be used as article covers.
export const articlePhotos: Record<string, { source?: string; width: number; height: number }> = {
  ...pixabayPhotos,
  ...Object.fromEntries(albumPhotos.map(photo => [albumPhotoSrc(photo), { width: photo.width, height: photo.height }])),
};
