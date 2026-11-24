import type { Language } from './site.ts';
import { formatPrice } from './products.ts';

// Public price list of "Đá Quý Kim Tự Tháp" (kimtuthap.vn). The owner asked for the stones of the partner site kimtuthap.org;
// that site sells nothing, and the matching store found was kimtuthap.vn. Ownership is NOT verified: confirm before relying on it.
// Names and prices were copied from the partner's public pages on 24/11/2026. They are indicative only:
// Hương Thiền confirms price, size and availability before any order. No photographs are reused here;
// real product photos will be added once the partner or Hương Thiền provides them.
export const partnerStonesSource = {
  name: 'Đá Quý Kim Tự Tháp',
  site: 'https://kimtuthap.vn/',
  label: 'kimtuthap.vn',
  checked: '2026-11-24',
};

type Item = { id: string; price: number; from?: boolean; unit?: 'kg'; vi: string; en: string };
type Group = { id: string; vi: string; en: string; items: Item[] };

export const partnerStones: Group[] = [
  {
    id: 'bracelets', vi: 'Vòng tay đá', en: 'Stone bracelets',
    items: [
      { id: 'vong-thach-anh-hong', price: 400000, from: true, vi: 'Vòng thạch anh hồng', en: 'Rose quartz bracelet' },
      { id: 'vong-thach-anh-toc-vang', price: 400000, vi: 'Vòng đá thạch anh tóc vàng', en: 'Golden rutilated quartz bracelet' },
      { id: 'vong-thach-anh-am-khoi', price: 450000, vi: 'Vòng thạch anh ám khói', en: 'Smoky quartz bracelet' },
      { id: 'vong-thach-anh-toc-den', price: 550000, vi: 'Vòng đá thạch anh tóc đen', en: 'Black rutilated quartz bracelet' },
      { id: 'vong-thach-anh-uu-linh', price: 550000, vi: 'Vòng đá thạch anh ưu linh', en: 'Phantom quartz bracelet' },
      { id: 'vong-thach-anh-toc-do', price: 600000, vi: 'Vòng đá thạch anh tóc đỏ', en: 'Red rutilated quartz bracelet' },
      { id: 'vong-tay-thach-anh-toc', price: 650000, vi: 'Vòng đeo tay đá thạch anh tóc', en: 'Rutilated quartz bracelet' },
      { id: 'vong-tay-tourmaline', price: 650000, vi: 'Vòng tay đá tourmaline', en: 'Tourmaline bracelet' },
    ],
  },
  {
    id: 'objects', vi: 'Vật phẩm cho góc thiền', en: 'Objects for a meditation corner',
    items: [
      { id: 'kim-tu-thap-thach-anh', price: 350000, vi: 'Kim tự tháp đá thạch anh', en: 'Quartz pyramid' },
      { id: 'qua-cau-12-mat', price: 500000, vi: 'Quả cầu 12 mặt đá thạch anh', en: 'Twelve-facet quartz sphere' },
      { id: 'den-da-thach-anh', price: 500000, vi: 'Đèn đá thạch anh', en: 'Quartz lamp' },
      { id: 'tham-thien-thach-anh', price: 1200000, vi: 'Thảm thiền đá thạch anh', en: 'Quartz meditation mat' },
    ],
  },
  {
    id: 'gravel', vi: 'Đá vụn', en: 'Crushed stones',
    items: [
      { id: 'thach-anh-vun-rai-nen', price: 15000, from: true, unit: 'kg', vi: 'Thạch anh vụn rải nền nhà', en: 'Crushed quartz for floors and gardens' },
      { id: 'thach-anh-vun-danh-bong', price: 100000, from: true, unit: 'kg', vi: 'Vụn thạch anh đánh bóng', en: 'Polished quartz chips' },
    ],
  },
];

export const partnerStonesCopy = {
  vi: {
    title: 'Bảng giá tham khảo từ Đá Quý Kim Tự Tháp',
    intro: 'Các vật phẩm bên dưới được niêm yết công khai trên website Đá Quý Kim Tự Tháp (kimtuthap.vn). Hương Thiền tổng hợp lại để bạn tham khảo trước khi hỏi mua.',
    note: 'Đây là giá niêm yết công khai, lấy ngày 24/11/2026, có thể đã thay đổi. Ảnh thật và quy cách từng món sẽ được bổ sung; trong lúc chờ, bạn có thể xem ảnh tại website nguồn. Hương Thiền xác nhận giá, kích cỡ và tình trạng hàng trước khi đặt.',
    from: 'từ', per: '/kg', ask: 'Hỏi về món này', source: 'Xem trên kimtuthap.vn', sourceNote: 'Nguồn:',
  },
  en: {
    title: 'Indicative price list from Đá Quý Kim Tự Tháp',
    intro: 'The items below are listed publicly on the Đá Quý Kim Tự Tháp website (kimtuthap.vn). We have gathered them here for you to browse before asking about a purchase.',
    note: 'These are public list prices, copied on 24 November 2026, and may have changed. Real photographs and details for each item will be added; meanwhile you can see photos on the source website. Hương Thiền confirms price, size and availability before any order.',
    from: 'from', per: '/kg', ask: 'Ask about this item', source: 'See kimtuthap.vn', sourceNote: 'Source:',
  },
} satisfies Record<Language, Record<string, string>>;

export const partnerPriceLabel = (item: Item, lang: Language) =>
  `${item.from ? `${partnerStonesCopy[lang].from} ` : ''}${formatPrice(item.price, lang)}${item.unit ? partnerStonesCopy[lang].per : ''}`;
