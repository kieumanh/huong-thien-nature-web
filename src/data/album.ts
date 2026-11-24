import { journeyPath } from './journey-pages.ts';
import type { Language } from './site.ts';

// Album of real photographs from the project's journey of sharing and meeting.
// Files live in public/media/journey/: `<id>.webp` (full size) and `<id>-640.webp` (grid size).
// Captions and alt text describe only what is visible in each photo. Names are used only
// where the photo itself shows them (the event banner). Add a photo by adding its two files
// and one entry below; keep `vi` and `en` in step.

export const albumCategories = ['meeting', 'garden', 'sea', 'daily'] as const;
export type AlbumCategory = (typeof albumCategories)[number];

type Text = Record<Language, string>;

export type AlbumPhoto = {
  id: string;
  category: AlbumCategory;
  width: number;
  height: number;
  thumbWidth: number;
  thumbHeight: number;
  caption: Text;
  alt: Text;
};

export const albumSections: Record<AlbumCategory, { title: Text; intro: Text }> = {
  meeting: {
    title: { vi: 'Gặp gỡ và chia sẻ', en: 'Meeting and sharing' },
    intro: { vi: 'Những khoảnh khắc gặp gỡ trong chuyến chia sẻ ở Nha Trang.', en: 'Moments from a sharing trip in Nha Trang.' },
  },
  garden: {
    title: { vi: 'Giữa vườn và thiên nhiên', en: 'In the garden' },
    intro: { vi: 'Luống rau, lối đất đỏ, hàng đu đủ và chuối: những ngày ở giữa vườn.', en: 'Vegetable beds, red-earth paths, papaya and banana trees: days spent in the garden.' },
  },
  sea: {
    title: { vi: 'Bên biển', en: 'By the sea' },
    intro: { vi: 'Bãi cát, sóng và những lúc nghỉ chân.', en: 'Sand, waves and moments of rest.' },
  },
  daily: {
    title: { vi: 'Những khoảnh khắc nhỏ', en: 'Small moments' },
    intro: { vi: 'Vài khoảnh khắc nhỏ giữa ngày.', en: 'A few small moments from the day.' },
  },
};

const size = (width: number, height: number) => ({ width, height, thumbWidth: 640, thumbHeight: Math.round((height * 640) / width) });

export const albumPhotos: AlbumPhoto[] = [
  // Meeting and sharing
  {
    id: 'event-banner', category: 'meeting', ...size(960, 1280),
    caption: { vi: 'Bên tấm biển buổi “Thiền và chia sẻ cùng Master Parinitha Patri”, Nha Trang, 12/11/2026.', en: 'Beside the banner for “Meditation and sharing with Master Parinitha Patri”, Nha Trang, 12 November 2026.' },
    alt: { vi: 'Một người phụ nữ đứng chắp hai bàn tay trước tấm biển sự kiện Thiền và chia sẻ cùng Master Parinitha Patri.', en: 'A woman stands with her hands together beside an event banner for a meditation and sharing evening with Master Parinitha Patri.' },
  },
  {
    id: 'studio-group', category: 'meeting', ...size(1280, 960),
    caption: { vi: 'Ảnh lưu niệm cùng nhau trong phòng tập yoga.', en: 'A group photo together in the yoga studio.' },
    alt: { vi: 'Khoảng hai mươi người đứng và quỳ chụp ảnh chung trong một phòng tập yoga.', en: 'About twenty people standing and kneeling for a group photo in a yoga studio.' },
  },
  {
    id: 'lobby-group', category: 'meeting', ...size(1280, 960),
    caption: { vi: 'Gặp gỡ và chụp ảnh chung ở sảnh.', en: 'Meeting and posing together in the lobby.' },
    alt: { vi: 'Sáu người đứng cạnh nhau mỉm cười trong sảnh một trung tâm thương mại, một người bế em bé.', en: 'Six people stand smiling side by side in a shopping-centre lobby, one of them holding a baby.' },
  },
  {
    id: 'three-greeting', category: 'meeting', ...size(960, 1280),
    caption: { vi: 'Chắp tay chào nhau.', en: 'Hands together in greeting.' },
    alt: { vi: 'Ba người đứng cạnh nhau trong phòng tập, người ở giữa chắp hai bàn tay.', en: 'Three people stand together in a studio, the one in the middle with palms together.' },
  },
  {
    id: 'hug-lobby', category: 'meeting', ...size(960, 1280),
    caption: { vi: 'Một cái ôm khi gặp nhau.', en: 'A hug on meeting.' },
    alt: { vi: 'Hai người phụ nữ ôm nhau trong sảnh, bên cạnh là bức tranh tường vẽ vũ trụ.', en: 'Two women hug in a lobby beside a space-themed mural.' },
  },
  {
    id: 'hug-closeup', category: 'meeting', ...size(960, 1280),
    caption: { vi: 'Một cái ôm nữa, mỉm cười trước ống kính.', en: 'Another hug, smiling at the camera.' },
    alt: { vi: 'Hai người phụ nữ ôm nhau và mỉm cười gần ống kính.', en: 'Two women embrace and smile close to the camera.' },
  },

  // In the garden
  {
    id: 'wooden-house', category: 'garden', ...size(960, 1280),
    caption: { vi: 'Căn nhà gỗ mái ngói giữa vườn, dưới bầu trời xanh.', en: 'A timber house with a tiled roof in the garden, under a blue sky.' },
    alt: { vi: 'Căn nhà gỗ mái ngói giữa cây cối xanh, trời trong với những dải mây mỏng.', en: 'A timber house with a tiled roof among green plants beneath a clear sky streaked with thin clouds.' },
  },
  {
    id: 'veggie-bed-trellis', category: 'garden', ...size(960, 1280),
    caption: { vi: 'Luống rau xanh mướt bên những giàn tre.', en: 'A lush bed of greens beside bamboo trellises.' },
    alt: { vi: 'Luống rau xanh dài chạy tới những giàn tre dựng trong nắng.', en: 'A long bed of green vegetables leading to bamboo trellises in the sunlight.' },
  },
  {
    id: 'veggie-sunset', category: 'garden', ...size(960, 1280),
    caption: { vi: 'Em bé ngồi ngắm luống rau trong ánh nắng thấp.', en: 'A toddler sits looking at the vegetable bed in low sunlight.' },
    alt: { vi: 'Một em bé ngồi quay lưng trên nền đất, nhìn luống rau xanh dưới ánh nắng thấp.', en: 'A toddler sits with their back to the camera on the soil, looking at a bed of greens in low sunlight.' },
  },
  {
    id: 'red-stone-path', category: 'garden', ...size(960, 1280),
    caption: { vi: 'Hai bạn nhỏ dắt tay nhau trên lối đá đỏ.', en: 'Two children hold hands on a path of red stones.' },
    alt: { vi: 'Một bạn nhỏ và một em bé nắm tay nhau bước trên lối đi rải đá đỏ giữa vườn cây.', en: 'A child and a toddler hold hands walking on a path of red stones through a garden of trees.' },
  },
  {
    id: 'flowers-red-path', category: 'garden', ...size(960, 1280),
    caption: { vi: 'Một bó hoa nhỏ trên lối đất đỏ.', en: 'A small bunch of flowers on the red-earth path.' },
    alt: { vi: 'Một người phụ nữ đội mũ xanh ngồi xổm trên lối đất đỏ, ôm em bé và cầm lọ hoa.', en: 'A woman in a green hat crouches on a red-earth path, holding a toddler and a jar of flowers.' },
  },
  {
    id: 'hands-together-garden', category: 'garden', ...size(960, 1280),
    caption: { vi: 'Chắp tay giữa luống rau và hoa dại.', en: 'Hands together among the vegetables and wildflowers.' },
    alt: { vi: 'Một người phụ nữ đội mũ xanh chắp hai bàn tay giữa vườn rau và hoa dại.', en: 'A woman in a green hat holds her palms together among vegetables and wildflowers.' },
  },
  {
    id: 'smile-papaya-garden', category: 'garden', ...size(960, 1280),
    caption: { vi: 'Nụ cười giữa vườn đu đủ và chuối.', en: 'A smile among papaya and banana plants.' },
    alt: { vi: 'Một người phụ nữ mặc áo khoác hồng và váy xanh mỉm cười, hai tay chạm vào chiếc mũ, giữa vườn.', en: 'A woman in a pink jacket and green dress smiles with both hands on her hat in a garden.' },
  },
  {
    id: 'toddler-papaya', category: 'garden', ...size(960, 1280),
    caption: { vi: 'Những bước chạy nhỏ dưới hàng đu đủ.', en: 'Little steps beneath the papaya trees.' },
    alt: { vi: 'Một em bé đội mũ cười tươi bước giữa vườn đu đủ.', en: 'A smiling toddler in a cap walks among papaya trees.' },
  },
  {
    id: 'selfie-papaya', category: 'garden', ...size(960, 1280),
    caption: { vi: 'Tự chụp cùng em bé dưới tán đu đủ.', en: 'A selfie with a toddler under the papaya leaves.' },
    alt: { vi: 'Một người phụ nữ đội mũ đan màu xanh mỉm cười, ôm em bé đội mũ lưỡi trai, chụp ảnh tự sướng.', en: 'A woman in a green crocheted hat smiles while holding a toddler in a cap for a selfie.' },
  },

  // By the sea
  {
    id: 'beach-dance', category: 'sea', ...size(960, 1280),
    caption: { vi: 'Hai tay mở rộng trên bãi cát.', en: 'Arms open on the sand.' },
    alt: { vi: 'Một người phụ nữ đội mũ xanh đứng trên bãi cát, hai tay mở nhẹ bên bờ biển.', en: 'A woman in a green hat stands on a sandy beach with her arms gently open by the sea.' },
  },
  {
    id: 'beach-sitting', category: 'sea', ...size(960, 1280),
    caption: { vi: 'Ngồi nghỉ nhìn sóng.', en: 'Resting and watching the waves.' },
    alt: { vi: 'Một người phụ nữ đội mũ xanh ngồi trên cát nhìn ra biển, phía sau là dãy nhà cao tầng và núi.', en: 'A woman in a green hat sits on the sand looking out to sea, with tall buildings and hills behind.' },
  },
  {
    id: 'beach-palms', category: 'sea', ...size(1280, 960),
    caption: { vi: 'Nghỉ chân dưới hàng dừa.', en: 'A rest in the shade of the palms.' },
    alt: { vi: 'Một người phụ nữ cầm quạt xanh ngồi trên ghế dưới hàng dừa, cạnh là em bé đang ăn.', en: 'A woman holding a teal fan sits on a lounger under coconut palms, a toddler eating beside her.' },
  },

  // Small moments
  {
    id: 'small-bowl', category: 'daily', ...size(960, 1280),
    caption: { vi: 'Mỉm cười với chiếc bát nhỏ.', en: 'Smiling with a small bowl.' },
    alt: { vi: 'Một người phụ nữ ngồi xếp bằng trên ghế xanh, mỉm cười, một tay cầm bát trắng, một tay giơ lên chào.', en: 'A woman sits cross-legged on a green banquette, smiling, one hand holding a white bowl and the other raised in a wave.' },
  },
  {
    id: 'painting-tree', category: 'daily', ...size(960, 1280),
    caption: { vi: 'Chăm chú tô màu một cái cây.', en: 'Painting a tree with full attention.' },
    alt: { vi: 'Một bạn nhỏ cúi xuống tô màu bức tranh cái cây xanh trong cuốn sổ.', en: 'A child leans over a notebook, painting a green tree.' },
  },
];

const byId = new Map(albumPhotos.map(photo => [photo.id, photo]));
export const albumPhoto = (id: string) => {
  const photo = byId.get(id);
  if (!photo) throw new Error(`Unknown album photo: ${id}`);
  return photo;
};

export const albumPhotoSrc = (photo: AlbumPhoto) => `/media/journey/${photo.id}.webp`;
export const albumThumbSrc = (photo: AlbumPhoto) => `/media/journey/${photo.id}-640.webp`;
export const albumPath = (lang: Language) => journeyPath(lang, 'album');
export const albumAnchor = (photo: AlbumPhoto) => `photo-${photo.id}`;

export const albumCopy = {
  vi: {
    jump: 'Đến từng nhóm ảnh',
    open: 'Phóng to ảnh',
    close: 'Đóng',
    previous: 'Ảnh trước',
    next: 'Ảnh sau',
    counter: (index: number, total: number) => `Ảnh ${index} trên ${total}`,
    credit: 'Ảnh: Hương Thiền Nature.',
    removal: 'Nếu bạn có mặt trong một bức ảnh và muốn gỡ, hãy nhắn cho chúng mình, chúng mình sẽ gỡ ngay.',
    removalAction: 'Nhắn cho chúng mình',
    all: 'Xem cả album',
    stripAction: 'Xem toàn bộ album',
  },
  en: {
    jump: 'Jump to a group of photos',
    open: 'Enlarge photo',
    close: 'Close',
    previous: 'Previous photo',
    next: 'Next photo',
    counter: (index: number, total: number) => `Photo ${index} of ${total}`,
    credit: 'Photos: Hương Thiền Nature.',
    removal: 'If you appear in a photo and would like it removed, message us and we will take it down straight away.',
    removalAction: 'Message us',
    all: 'See the whole album',
    stripAction: 'See the whole album',
  },
} as const;
