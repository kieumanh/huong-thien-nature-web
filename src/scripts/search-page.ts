import { searchRecords, type SearchRecord } from './search-engine';

const root = document.querySelector<HTMLElement>('[data-search-page]');
if (root) void loadResults(root);

async function loadResults(page: HTMLElement) {
  const en = page.dataset.language === 'en';
  const lang = en ? 'en' : 'vi';
  const input = page.querySelector<HTMLInputElement>('#search-query')!;
  const status = page.querySelector<HTMLElement>('#search-status')!;
  const list = page.querySelector<HTMLElement>('#search-results')!;
  const fallback = page.querySelector<HTMLElement>('.search-fallback')!;
  const query = (new URLSearchParams(location.search).get('q') || '').slice(0, 120).trim();
  input.value = query;
  if (!query) {
    fallback.hidden = false;
    return;
  }

  for (const link of document.querySelectorAll<HTMLAnchorElement>('.language a[href]')) {
    const url = new URL(link.href);
    url.searchParams.set('q', query);
    link.href = url.href;
  }

  status.textContent = en ? 'Searching…' : 'Đang tìm kiếm…';
  list.setAttribute('aria-busy', 'true');

  try {
    const response = await fetch(`/${lang}/search-index.json`, { signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error('index unavailable');
    const entries = await response.json() as SearchRecord[];
    const results = searchRecords(entries, query).filter(entry => entry.url.startsWith(`/${lang}/`));
    const cards = results.map(entry => renderResult(entry, en));
    list.replaceChildren(...cards);
    if (!results.length) {
      status.textContent = en ? 'No results. Try fewer words or a different keyword.' : 'Chưa có kết quả. Thử ít từ hơn hoặc đổi từ khóa.';
      fallback.hidden = false;
    } else {
      status.textContent = en ? `${results.length} results for “${query}”` : `${results.length} kết quả cho “${query}”`;
    }
  } catch {
    status.dataset.state = 'error';
    status.textContent = en ? 'Search could not load. Please refresh and try again.' : 'Chưa tải được dữ liệu tìm kiếm. Hãy tải lại trang và thử lại.';
    fallback.hidden = false;
  } finally {
    list.setAttribute('aria-busy', 'false');
  }
}

function renderResult(entry: SearchRecord, en: boolean) {
  const card = document.createElement('article');
  card.className = 'search-result';
  const content = document.createElement('div');
  content.className = 'search-result-content';
  const category = document.createElement('p');
  category.className = 'eyebrow';
  category.textContent = entry.category;
  const heading = document.createElement('h2');
  const link = document.createElement('a');
  link.href = entry.url;
  link.textContent = entry.title;
  heading.append(link);
  const description = document.createElement('p');
  description.textContent = entry.description;
  content.append(category, heading, description);

  if (entry.product && entry.product.image.startsWith('/media/shop/')) {
    card.classList.add('search-result--product');
    const photo = document.createElement('div');
    photo.className = 'search-result-photo';
    const image = document.createElement('img');
    image.src = entry.product.image;
    image.alt = entry.product.imageAlt;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.width = 240;
    image.height = 240;
    photo.append(image);
    card.append(photo);
    const unit = document.createElement('p');
    unit.className = 'search-product-unit';
    unit.textContent = entry.product.unit;
    const price = document.createElement('p');
    price.className = 'search-product-price';
    price.textContent = `${en ? 'Indicative price' : 'Giá tham khảo'} · ${entry.product.priceLabel}`;
    const stock = document.createElement('p');
    stock.className = 'product-stock';
    stock.dataset.stock = entry.product.stock;
    stock.textContent = entry.product.stockLabel;
    content.append(unit, price, stock);
  }
  card.append(content);
  return card;
}
