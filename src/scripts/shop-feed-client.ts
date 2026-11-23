import { normalizeFeed, statusText, type FeedProduct, type ShopFeed } from '../data/shop-feed';
import { themeById } from '../data/shop-themes';

// Progressive enhancement: pages ship with a built-in catalogue; when the Zen Flow feed answers, announcements, season
// and (per space) the product list are replaced. All feed text is inserted with textContent / attributes, never innerHTML.
const lang = document.documentElement.lang === 'en' ? 'en' : 'vi';
const vi = lang === 'vi';
const catalogue = document.querySelector<HTMLElement>('[data-shop-catalogue]');
const money = new Intl.NumberFormat(vi ? 'vi-VN' : 'en-US', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 });

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function card(product: FeedProduct, contact: string): HTMLElement {
  const article = el('article', 'product-card zen-card feed-card');
  article.dataset.productCard = '';
  article.dataset.category = product.category;
  article.dataset.search = [product.name, product.blurb, product.category, product.season, product.keywords.join(' ')].join(' ');
  const media = el('div', 'product-image');
  if (product.image) {
    const img = el('img');
    img.src = product.image; img.alt = product.name; img.loading = 'lazy'; img.decoding = 'async'; img.referrerPolicy = 'no-referrer';
    img.width = 800; img.height = 600;
    media.append(img);
  } else {
    const glyph = el('span', 'product-placeholder', themeById(product.theme)?.glyph ?? '✧');
    glyph.setAttribute('aria-hidden', 'true');
    media.append(glyph);
  }
  const body = el('div', 'product-card-copy');
  if (product.category) body.append(el('p', 'product-category', product.category));
  body.append(el('h3', undefined, product.name));
  if (product.blurb) body.append(el('p', 'product-subtitle', product.blurb));
  if (product.unit) body.append(el('p', 'product-unit', product.unit));
  const bottom = el('div', 'product-card-bottom');
  const price = el('p', 'product-price');
  price.append(el('span', undefined, vi ? 'Giá' : 'Price'), el('strong', undefined, product.price === null ? (vi ? 'Liên hệ' : 'Contact us') : money.format(product.price)));
  const status = el('p', 'product-stock', statusText(product.status, lang));
  status.dataset.status = product.status;
  const ask = el('a', 'quiet-link stock-inquiry', product.status === 'out' ? (vi ? 'Báo tôi khi có hàng' : 'Tell me when back') : (vi ? 'Hỏi mua' : 'Ask to buy'));
  ask.href = `${contact}?item=${encodeURIComponent(product.name)}#connect`;
  ask.setAttribute('aria-label', `${ask.textContent} — ${product.name}`);
  bottom.append(price, status, ask);
  body.append(bottom);
  article.append(media, body);
  return article;
}

function showFeedProducts(items: FeedProduct[]) {
  if (!catalogue) return;
  const grid = catalogue.querySelector<HTMLElement>('#shop-grid');
  const controls = catalogue.querySelector<HTMLElement>('[data-shop-controls]');
  const filters = catalogue.querySelector<HTMLElement>('.shop-filters');
  if (!grid || !controls || !filters) return;
  grid.replaceChildren(...items.map(product => card(product, catalogue.dataset.contact || '/')));
  grid.dataset.source = 'feed';
  const categories = [...new Set(items.map(product => product.category).filter(Boolean))].sort((a, b) => a.localeCompare(b, lang));
  const chip = (value: string, label: string, n: number) => {
    const button = el('button', undefined, label + ' ');
    button.type = 'button'; button.dataset.filter = value; button.setAttribute('aria-pressed', 'false');
    button.append(el('span', undefined, String(n)));
    return button;
  };
  filters.replaceChildren(chip('all', vi ? 'Tất cả' : 'All', items.length), ...categories.map(category => chip(category, category, items.filter(product => product.category === category).length)));
  filters.hidden = categories.length < 2;
  const note = catalogue.querySelector<HTMLElement>('[data-shop-price-note]');
  if (note) note.textContent = vi ? 'Giá do cửa hàng đăng. Tình trạng hàng cập nhật từ kho trong vài phút.' : 'Prices are published by the shop. Availability refreshes from the stockroom within minutes.';
  controls.hidden = false;
  catalogue.querySelector<HTMLElement>('[data-theme-empty]')?.setAttribute('hidden', '');
  catalogue.dispatchEvent(new CustomEvent('shop:refresh'));
}

function apply(feed: ShopFeed) {
  const announce = document.querySelector<HTMLElement>('[data-shop-announce]');
  if (announce && feed.announcement) { announce.textContent = feed.announcement.text; announce.dataset.tone = feed.announcement.tone; announce.hidden = false; }
  const season = document.querySelector<HTMLElement>('[data-shop-season]');
  if (season && feed.season) { season.textContent = feed.season.note ? `${feed.season.name} — ${feed.season.note}` : feed.season.name; season.hidden = false; }
  for (const badge of document.querySelectorAll<HTMLElement>('[data-theme-count]')) {
    const n = feed.products.filter(product => product.theme === badge.dataset.themeCount).length;
    if (n > 0) badge.textContent = `${n} ${vi ? 'sản phẩm' : 'products'}`;
  }
  const themeId = catalogue?.dataset.shopTheme;
  const items = themeId ? feed.products.filter(product => product.theme === themeId) : [];
  if (items.length) showFeedProducts(items);
}

void (async () => {
  const status = document.querySelector<HTMLElement>('[data-feed-status]');
  let feed: ShopFeed | null = null;
  try {
    const response = await fetch('/api/shop-feed', { signal: AbortSignal.timeout(5000), headers: { Accept: 'application/json' } });
    if (response.ok) feed = normalizeFeed(await response.json());
  } catch { /* keep the built-in catalogue */ }
  if (feed) { apply(feed); return; }
  const hasFallback = !!catalogue?.querySelector('[data-product-card]');
  if (status && hasFallback) {
    status.dataset.state = 'unavailable';
    status.textContent = vi ? 'Chưa kết nối được với kho. Danh mục dưới đây là bản tham khảo; hãy liên hệ để hỏi giá và tình trạng hàng.' : 'The stockroom is not reachable right now. The catalogue below is indicative; please contact us to confirm price and availability.';
  }
})();
