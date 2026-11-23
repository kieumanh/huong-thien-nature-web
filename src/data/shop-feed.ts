// Public catalogue published by Zen Flow Inventory. Treat every field as untrusted input:
// normalizeFeed() whitelists fields, caps lengths and rejects non-https images. Used by the Worker AND the browser.
import type { Language } from './site.ts';
import { themeIds, type ThemeId } from './shop-themes.ts';

export const feedStatuses = ['in', 'low', 'out', 'preorder', 'contact'] as const;
export type FeedStatus = (typeof feedStatuses)[number];
export type FeedProduct = {
  id: string; name: string; category: string; unit: string; price: number | null; theme: ThemeId; status: FeedStatus;
  image: string; blurb: string; season: string; keywords: string[];
};
export type ShopFeed = {
  announcement: { text: string; tone: 'info' | 'warn' | 'success' } | null;
  season: { name: string; note: string } | null;
  products: FeedProduct[]; updated: string | null;
};

const MAX_PRODUCTS = 200;
const text = (value: unknown, max: number): string => (typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max) : '');

export function safeHttps(value: unknown): string {
  if (typeof value !== 'string' || value.length > 500) return '';
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : '';
  } catch { return ''; }
}

export function normalizeFeed(raw: unknown): ShopFeed | null {
  if (!raw || typeof raw !== 'object') return null;
  const data = raw as Record<string, unknown>;
  if (data.schema !== 1 || !Array.isArray(data.products)) return null;
  const tones = ['info', 'warn', 'success'];
  const a = data.announcement as Record<string, unknown> | null;
  const s = data.season as Record<string, unknown> | null;
  const announcement = a && text(a.text, 300) ? { text: text(a.text, 300), tone: (tones.includes(a.tone as string) ? a.tone : 'info') as 'info' | 'warn' | 'success' } : null;
  const season = s && text(s.name, 80) ? { name: text(s.name, 80), note: text(s.note, 300) } : null;
  const seen = new Set<string>();
  const products: FeedProduct[] = [];
  for (const item of data.products.slice(0, MAX_PRODUCTS) as Record<string, unknown>[]) {
    if (!item || typeof item !== 'object') continue;
    const id = text(item.id, 80), name = text(item.name, 120);
    if (!id || !name || seen.has(id) || !themeIds.includes(item.theme as ThemeId) || !feedStatuses.includes(item.status as FeedStatus)) continue;
    const price = typeof item.price === 'number' && Number.isFinite(item.price) && item.price >= 0 && item.price <= 1e10 ? Math.round(item.price) : null;
    seen.add(id);
    products.push({
      id, name, category: text(item.category, 80), unit: text(item.unit, 40), price: item.status === 'contact' ? null : price,
      theme: item.theme as ThemeId, status: item.status as FeedStatus, image: safeHttps(item.image), blurb: text(item.blurb, 300), season: text(item.season, 80),
      keywords: Array.isArray(item.keywords) ? item.keywords.map(k => text(k, 40)).filter(Boolean).slice(0, 10) : [],
    });
  }
  const updated = typeof data.updated === 'string' && !Number.isNaN(Date.parse(data.updated)) ? data.updated : null;
  return { announcement, season, products, updated };
}

export const statusText = (status: FeedStatus, lang: Language): string => ({
  in: { vi: 'Còn hàng', en: 'In stock' }, low: { vi: 'Sắp hết', en: 'Running low' }, out: { vi: 'Hết hàng', en: 'Out of stock' },
  preorder: { vi: 'Đặt trước', en: 'Pre-order' }, contact: { vi: 'Liên hệ', en: 'Contact us' },
})[status][lang];
