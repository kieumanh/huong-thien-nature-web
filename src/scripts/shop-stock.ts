import { stockLabel } from '../data/products';

const labels = [...document.querySelectorAll<HTMLElement>('[data-stock-slug]')];
const status = document.querySelector('[data-stock-status]');
const lang = document.documentElement.lang === 'en' ? 'en' : 'vi';
const vi = lang === 'vi';
if (labels.length) {
  for (const label of labels) label.textContent = vi ? 'Đang kiểm tra tồn kho…' : 'Checking stock…';
  void (async () => {
    let stock: Record<string, unknown> = {};
    try {
      const response = await fetch('/api/shop-stock', { signal: AbortSignal.timeout(5000) });
      if (response.ok) stock = (await response.json())?.stock ?? {};
    } catch { /* Keep the unconfirmed fallback. */ }
    let unconfirmed = 0;
    for (const label of labels) {
      const value = stock[label.dataset.stockSlug ?? ''];
      const state = value === 'in_stock' || value === 'out_of_stock' ? value : 'unknown';
      label.dataset.stock = state;
      label.textContent = stockLabel(state, lang);
      const inquiry = label.parentElement?.querySelector<HTMLElement>('[data-stock-inquiry]');
      if (inquiry) inquiry.hidden = state !== 'unknown';
      if (state === 'unknown') unconfirmed++;
    }
    if (status) status.textContent = vi
      ? `Đã kiểm tra tồn kho. ${unconfirmed} sản phẩm chưa xác nhận.`
      : `Stock check complete. ${unconfirmed} products unconfirmed.`;
  })();
}
