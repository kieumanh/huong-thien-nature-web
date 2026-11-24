import type { Language } from './site';
import { albumPhoto, albumPhotoSrc } from './album.ts';

// Extra images inside each journal article (2.14.0): our own illustrations (SVG, drawn for this site)
// and real photographs from the album. No stock photos. `after` is the Vietnamese section number;
// the English version, which has fewer sections, places the figure proportionally.

type Text = Record<Language, string>;
export const illustrations: Record<string, { alt: Text; caption: Text }> = {
  'breath-waves': { alt: { vi: 'Minh họa những con sóng mảnh màu vàng lên xuống quanh một điểm sáng trên nền trời đêm.', en: 'Illustration of thin golden waves rising and falling around a point of light on a night sky.' }, caption: { vi: 'Hơi thở lên xuống như sóng, và luôn có một điểm để quay về.', en: 'The breath rises and falls like waves, with a point to return to.' } },
  'footsteps': { alt: { vi: 'Minh họa những dấu chân trần nối nhau trên một lối đất màu kem.', en: 'Illustration of bare footprints following one another along a cream-coloured path.' }, caption: { vi: 'Từng bước chân, biết mình đang bước.', en: 'One step at a time, knowing that we are stepping.' } },
  'held-light': { alt: { vi: 'Minh họa hai bàn tay khum lại nâng một ngọn lửa nhỏ màu vàng.', en: 'Illustration of two cupped hands holding a small golden flame.' }, caption: { vi: 'Nâng niu ngọn lửa nhỏ bên trong mình.', en: 'Caring for the small flame within.' } },
  'lanterns': { alt: { vi: 'Minh họa những ngọn đèn nhỏ trôi trên mặt nước dưới bầu trời đêm.', en: 'Illustration of small lanterns floating on water under a night sky.' }, caption: { vi: 'Thương nhớ, như những ngọn đèn nhỏ vẫn sáng trên mặt nước.', en: 'Longing, like small lanterns still glowing on the water.' } },
  'lotus-dawn': { alt: { vi: 'Minh họa một đóa sen vàng nở trên mặt nước lúc bình minh.', en: 'Illustration of a golden lotus opening on water at dawn.' }, caption: { vi: 'Sen vẫn nở từ bùn, theo nhịp của riêng nó.', en: 'The lotus still blooms from the mud, at its own pace.' } },
  'moon-tide': { alt: { vi: 'Minh họa vầng trăng tròn trên biển đêm và những lớp sóng lăn tăn ánh vàng.', en: 'Illustration of a full moon over the night sea with rippling golden waves.' }, caption: { vi: 'Cảm xúc lên xuống như thủy triều, và rồi lặng lại.', en: 'Feelings rise and fall like the tide, then settle.' } },
  'returning-path': { alt: { vi: 'Minh họa một lối chấm vàng xoắn dần vào điểm sáng ở giữa trên nền trời tím.', en: 'Illustration of a dotted golden path spiralling into a point of light on a violet sky.' }, caption: { vi: 'Mỗi lần nhận ra và quay về là một bước trên đường.', en: 'Every noticing and returning is a step on the path.' } },
  'seedling': { alt: { vi: 'Minh họa một mầm cây hai lá nhú lên từ đất đỏ.', en: 'Illustration of a two-leaf seedling rising from red earth.' }, caption: { vi: 'Thay đổi lớn bắt đầu từ một mầm rất nhỏ.', en: 'Big change begins with a very small sprout.' } },
  'sitting-still': { alt: { vi: 'Minh họa bóng một người ngồi thiền trước vầng sáng vàng lúc hoàng hôn.', en: 'Illustration of the silhouette of a person meditating before a golden glow at dusk.' }, caption: { vi: 'Ngồi xuống, và cho phép mình được yên một lát.', en: 'Sitting down and allowing ourselves a moment of stillness.' } },
  'small-vase': { alt: { vi: 'Minh họa một bình hoa nhỏ trên bàn, quanh là những đốm sáng vàng.', en: 'Illustration of a small vase of flowers on a table, surrounded by points of golden light.' }, caption: { vi: 'Những điều tốt đẹp nhỏ bé vẫn luôn có mặt.', en: 'Small good things are always present.' } },
  'soft-boundary': { alt: { vi: 'Minh họa hai vòng tròn chạm nhau với đường viền mềm, mỗi vòng giữ một điểm sáng riêng.', en: 'Illustration of two touching circles with soft edges, each holding its own light.' }, caption: { vi: 'Gần nhau mà vẫn giữ được ánh sáng riêng.', en: 'Close together, each keeping its own light.' } },
  'still-lake': { alt: { vi: 'Minh họa dãy núi và mặt trời in bóng trên mặt hồ phẳng lặng.', en: 'Illustration of mountains and the sun reflected in a still lake.' }, caption: { vi: 'Khi mặt hồ lặng, mình thấy rõ điều đang có.', en: 'When the lake is still, we see clearly what is there.' } },
};

export const articleFigures: Record<string, { ref: string; after: number }[]> = {
  'healing-as-coming-home': [{ ref: 'ill:returning-path', after: 2 }, { ref: 'album:beach-sitting', after: 4 }, { ref: 'ill:held-light', after: 6 }],
  'staying-with-strong-emotions': [{ ref: 'ill:moon-tide', after: 1 }, { ref: 'ill:breath-waves', after: 3 }, { ref: 'album:beach-meditate-smile', after: 6 }],
  'gentle-boundaries': [{ ref: 'ill:soft-boundary', after: 2 }, { ref: 'album:three-greeting', after: 5 }, { ref: 'album:hands-together-garden', after: 7 }],
  'walking-through-loss': [{ ref: 'ill:lanterns', after: 3 }, { ref: 'album:plaque-moon-boat', after: 5 }, { ref: 'ill:still-lake', after: 7 }],
  'small-joys-gratitude': [{ ref: 'album:altar-flowers', after: 2 }, { ref: 'ill:small-vase', after: 3 }, { ref: 'album:small-bowl', after: 6 }],
  'when-meditation-is-difficult': [{ ref: 'ill:returning-path', after: 2 }, { ref: 'album:beach-meditate-calm', after: 6 }],
  'meditation-for-beginners': [{ ref: 'ill:sitting-still', after: 2 }, { ref: 'album:studio-group', after: 5 }],
  'breath-meditation': [{ ref: 'ill:breath-waves', after: 2 }, { ref: 'album:beach-meditate-smile', after: 5 }],
  'start-meditating-at-home': [{ ref: 'album:altar-flowers', after: 2 }, { ref: 'ill:lotus-dawn', after: 5 }],
  'natural-breathing': [{ ref: 'ill:still-lake', after: 2 }, { ref: 'album:beach-sitting', after: 5 }],
  'wandering-mind': [{ ref: 'ill:moon-tide', after: 2 }, { ref: 'album:beach-sit-side', after: 5 }],
  'meditation-posture': [{ ref: 'ill:sitting-still', after: 2 }, { ref: 'album:beach-meditate-calm', after: 5 }],
  'what-is-meditation': [{ ref: 'ill:still-lake', after: 2 }, { ref: 'album:beach-palms', after: 5 }],
  'body-mindfulness': [{ ref: 'ill:footsteps', after: 2 }, { ref: 'album:beach-carry', after: 5 }],
  'everyday-mindfulness': [{ ref: 'album:small-bowl', after: 2 }, { ref: 'ill:small-vase', after: 5 }],
  'mindful-gardening': [{ ref: 'ill:seedling', after: 2 }, { ref: 'album:veggie-bed-trellis', after: 5 }],
  'loving-kindness-meditation': [{ ref: 'ill:held-light', after: 2 }, { ref: 'album:hug-lobby', after: 5 }],
  'meditation-habit': [{ ref: 'ill:seedling', after: 2 }, { ref: 'album:hands-together-garden', after: 5 }],
  'returning-attention': [{ ref: 'ill:returning-path', after: 1 }, { ref: 'album:beach-sitting', after: 3 }],
  'seven-layers': [{ ref: 'ill:lotus-dawn', after: 1 }, { ref: 'album:wooden-house', after: 3 }],
  'listening-to-nature': [{ ref: 'album:flowers-red-path', after: 1 }, { ref: 'album:veggie-sunset', after: 3 }],
};

export type ResolvedFigure = { src: string; width: number; height: number; alt: string; caption: string; credit: string; after: number };

export function resolveFigure(ref: string, lang: Language): Omit<ResolvedFigure, 'after'> {
  const [kind, id] = ref.split(':');
  if (kind === 'album') {
    const photo = albumPhoto(id);
    return { src: albumPhotoSrc(photo), width: photo.width, height: photo.height, alt: photo.alt[lang], caption: photo.caption[lang], credit: lang === 'vi' ? 'Ảnh: Hương Thiền Nature' : 'Photo: Hương Thiền Nature' };
  }
  const art = illustrations[id];
  if (kind !== 'ill' || !art) throw new Error(`Unknown article figure: ${ref}`);
  return { src: `/media/illustrations/${id}.svg`, width: 1200, height: 800, alt: art.alt[lang], caption: art.caption[lang], credit: lang === 'vi' ? 'Minh họa: Hương Thiền Nature' : 'Illustration: Hương Thiền Nature' };
}

/** Figures for one article in one language, each placed after a section that exists in that language. */
export function figuresFor(slug: string, lang: Language, viSections: number, sections: number): ResolvedFigure[] {
  return (articleFigures[slug] ?? []).map(({ ref, after }) => ({
    ...resolveFigure(ref, lang),
    after: lang === 'vi' ? Math.min(after, sections) : Math.max(1, Math.min(sections, Math.round(after * sections / Math.max(viSections, 1)))),
  }));
}
