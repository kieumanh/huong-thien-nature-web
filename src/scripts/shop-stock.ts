import { stockLabel } from '../data/products';

const labels = document.querySelectorAll<HTMLElement>('[data-stock-slug]');
if (labels.length) {
  void fetch('/api/shop-stock', { signal: AbortSignal.timeout(5000) })
    .then(response => response.ok ? response.json() : null)
    .then(payload => {
      if (!payload?.stock) return;
      const lang = document.documentElement.lang === 'en' ? 'en' : 'vi';
      for (const label of labels) {
        const stock = payload.stock[label.dataset.stockSlug ?? ''];
        if (stock === 'in_stock' || stock === 'out_of_stock') {
          label.dataset.stock = stock;
          label.textContent = stockLabel(stock, lang);
        }
      }
    })
    .catch(() => {});
}
