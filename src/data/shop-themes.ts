import type { Language } from './site.ts';
import { shopPath } from './products.ts';

export const themeIds = ['thuc-pham-sach', 'da-nang-luong', 'sach'] as const;
export type ThemeId = (typeof themeIds)[number];
type Copy = Record<Language, string>;
export type ShopTheme = {
  id: ThemeId; accent: 'leaf' | 'stone' | 'book'; glyph: string;
  slug: Copy; name: Copy; tagline: Copy; lead: Copy; note: Copy | null; emptyTitle: Copy; emptyBody: Copy; door: Copy;
};

// The ids match the "theme" field published by Zen Flow Inventory (/api/shop-feed).
export const shopThemes: readonly ShopTheme[] = [
  {
    id: 'thuc-pham-sach', accent: 'leaf', glyph: '🌾',
    slug: { vi: 'thuc-pham-sach', en: 'clean-food' },
    name: { vi: 'Thực phẩm sạch', en: 'Clean food' },
    tagline: { vi: 'Nguyên liệu chay cho gian bếp tỉnh thức', en: 'Plant-based ingredients for a mindful kitchen' },
    lead: { vi: 'Gia vị, ngũ cốc và thức uống chay quen thuộc, có ảnh thật và hướng dẫn dùng. Giá và tình trạng hàng được cập nhật từ kho khi sẵn sàng.', en: 'Everyday seasonings, grains and drinks with real photographs and usage notes. Prices and availability update from the stockroom when ready.' },
    door: { vi: 'Gia vị, ngũ cốc, thức uống chay', en: 'Seasonings, grains, plant-based drinks' },
    note: null,
    emptyTitle: { vi: 'Danh mục đang được cập nhật', en: 'The catalogue is being updated' },
    emptyBody: { vi: 'Gửi lời nhắn để hỏi nguyên liệu bạn cần.', en: 'Send a message to ask about the ingredient you need.' },
  },
  {
    id: 'da-nang-luong', accent: 'stone', glyph: '💎',
    slug: { vi: 'da-nang-luong', en: 'energy-stones' },
    name: { vi: 'Đá năng lượng', en: 'Energy stones' },
    tagline: { vi: 'Đá tự nhiên cho góc thiền của bạn', en: 'Natural stones for your meditation corner' },
    lead: { vi: 'Đá tự nhiên để đặt ở góc thiền, đeo như vòng nhắc mình thở chậm lại, hoặc tặng người thân. Đá là vật đồng hành trong thực hành, không phải phương thuốc.', en: 'Natural stones for a meditation corner, a wrist reminder to slow your breath, or a gift. They accompany practice; they are not a remedy.' },
    door: { vi: 'Vòng tay, đá thô và vật phẩm thiền', en: 'Bracelets, raw stones and meditation objects' },
    note: { vi: 'Ý nghĩa “năng lượng” của đá là niềm tin cá nhân, chưa có bằng chứng khoa học về tác dụng chữa bệnh. Đá không thay thế chăm sóc y tế.', en: 'The “energy” meaning of stones is a personal belief; there is no scientific evidence of healing effects. Stones do not replace medical care.' },
    emptyTitle: { vi: 'Bộ sưu tập đang được chuẩn bị', en: 'The collection is being prepared' },
    emptyBody: { vi: 'Chúng tôi chỉ đăng những viên đá đã có ảnh thật và giá rõ ràng. Gửi lời nhắn để được báo khi có hàng.', en: 'We only list stones that have real photographs and a confirmed price. Send a message to be told when stock arrives.' },
  },
  {
    id: 'sach', accent: 'book', glyph: '📖',
    slug: { vi: 'sach', en: 'books' },
    name: { vi: 'Sách', en: 'Books' },
    tagline: { vi: 'Sách cho đường thực hành', en: 'Books for the path of practice' },
    lead: { vi: 'Sách về thiền, chánh niệm và đời sống nội tâm do Hương Thiền chọn và giới thiệu.', en: 'Books on meditation, mindfulness and inner life, chosen and introduced by Hương Thiền.' },
    door: { vi: 'Thiền, chánh niệm, đời sống nội tâm', en: 'Meditation, mindfulness, inner life' },
    note: null,
    emptyTitle: { vi: 'Tủ sách đang được sắp xếp', en: 'The bookshelf is being arranged' },
    emptyBody: { vi: 'Gửi lời nhắn để hỏi về một cuốn sách cụ thể hoặc được báo khi có sách mới.', en: 'Send a message to ask about a specific title or to hear when new books arrive.' },
  },
] as const;

export const themeById = (id: string): ShopTheme | undefined => shopThemes.find(theme => theme.id === id);
export const themePath = (lang: Language, theme: ShopTheme): string => `${shopPath(lang)}${theme.slug[lang]}/`;
