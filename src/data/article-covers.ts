import type { Language } from './site';

// Cover choices made in the 2.16.0 editorial pass.
// Rules: one cover per article, no repeats; no clearly identifiable faces on covers of healing, loss or difficulty pieces;
// only photographs that are already hosted on this site (our own album, or locally stored Pixabay photos with a recorded source).
// Original images stay on disk; this file only decides which one an article shows.
type Cover = { image: string; alt: Record<Language, string> };

export const coverOverrides: Record<string, Cover> = {
  // A bare foot on the grass: attention coming back to the body and the ground (was a temple incense photo).
  'returning-attention': {
    image: '/media/pixabay-2268333.webp',
    alt: { vi: 'Một bàn chân trần đặt trên thảm cỏ xanh, phía trên là ống quần jean.', en: 'A bare foot rests on green grass, with the hem of blue jeans above it.' },
  },
  // Water, for a piece about the days when sitting is hard (was a bamboo path shared with another article).
  'when-meditation-is-difficult': {
    image: '/media/pixabay-58125.webp',
    alt: { vi: 'Những tảng đá nhô lên khỏi mặt nước xanh thẫm đang gợn sóng nhẹ.', en: 'Dark rocks rising from softly rippling deep-blue water.' },
  },
  // A flowing stream instead of a portrait: strong emotions are a movement of water that comes and goes.
  'staying-with-strong-emotions': {
    image: '/media/pixabay-2608830.webp',
    alt: { vi: 'Dòng suối chảy qua những tảng đá rêu phủ giữa rừng cây xanh.', en: 'A stream running over mossy rocks among green forest.' },
  },
  // Rows with room between them, for soft boundaries (was a close portrait).
  'gentle-boundaries': {
    image: '/media/journey/veggie-bed-trellis.webp',
    alt: { vi: 'Luống rau xanh dài chạy tới những giàn tre dựng trong nắng.', en: 'A long bed of green vegetables leading to bamboo trellises in the sunlight.' },
  },
  // Two women hugging, for loving-kindness (was a lotus shared with the natural-breathing article).
  'loving-kindness-meditation': {
    image: '/media/journey/hug-closeup.webp',
    alt: { vi: 'Hai người phụ nữ ôm nhau và mỉm cười gần ống kính.', en: 'Two women embrace and smile close to the camera.' },
  },
  // A real seated posture for the posture article (was a Japanese room shared with start-meditating-at-home).
  'meditation-posture': {
    image: '/media/journey/beach-meditate-calm.webp',
    alt: { vi: 'Một người phụ nữ đội mũ đan xanh nhạt ngồi xếp bằng trên cát, mắt nhắm, hai tay đặt trên gối; phía sau là các tòa nhà ven biển và dãy núi xa.', en: 'A woman in a pale green crocheted hat sits cross-legged on the sand, eyes closed and hands on her knees, with seafront buildings and distant mountains behind her.' },
  },
  // A small practice corner for the habit article (was terraced fields shared with meditation-for-beginners).
  'meditation-habit': {
    image: '/media/journey/altar-flowers.webp',
    alt: { vi: 'Bình hoa nhỏ giữa vài viên đá và những mô hình kim tự tháp trong suốt trên bàn gỗ.', en: 'A small vase of flowers among a few stones and clear pyramid models on a wooden table.' },
  },
  // The red-stone path through the garden, for the piece about listening to the outdoors (was a waterfall photo from a stock site).
  'listening-to-nature': {
    image: '/media/journey/red-stone-path.webp',
    alt: { vi: 'Một bạn nhỏ và một em bé nắm tay nhau bước trên lối đi rải đá đỏ giữa vườn cây.', en: 'A child and a toddler hold hands walking on a path of red stones through a garden of trees.' },
  },
  // A small bunch of flowers on the red-earth path, for mindful gardening (was a tea-plantation photo from a stock site).
  'mindful-gardening': {
    image: '/media/journey/flowers-red-path.webp',
    alt: { vi: 'Một người phụ nữ đội mũ xanh ngồi xổm trên lối đất đỏ, ôm em bé và cầm lọ hoa.', en: 'A woman in a green hat crouches on a red-earth path, holding a toddler and a jar of flowers.' },
  },
};
