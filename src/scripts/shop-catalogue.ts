import { matchesProduct } from './shop-filter';

// Filtering and search for a shop space. Cards and chips may be replaced at runtime by shop-feed-client,
// so everything is looked up on demand and chip clicks are delegated.
const catalogue = document.querySelector<HTMLElement>('[data-shop-catalogue]');
if (catalogue) {
  const input = catalogue.querySelector<HTMLInputElement>('#shop-search');
  const count = catalogue.querySelector<HTMLElement>('[data-shop-count]');
  const empty = catalogue.querySelector<HTMLElement>('.shop-empty');
  const filters = catalogue.querySelector<HTMLElement>('.shop-filters');
  let filter = 'all';
  const update = () => {
    const cards = [...catalogue.querySelectorAll<HTMLElement>('[data-product-card]')];
    let visible = 0;
    for (const card of cards) {
      card.hidden = !matchesProduct(card.dataset.category || '', card.dataset.search || '', filter, input?.value || '');
      if (!card.hidden) visible++;
    }
    if (count) count.textContent = `${visible} / ${cards.length} ${catalogue.dataset.lang === 'vi' ? 'sản phẩm' : 'products'}`;
    if (empty) empty.hidden = visible !== 0 || cards.length === 0;
    for (const button of catalogue.querySelectorAll<HTMLButtonElement>('[data-filter]')) button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
  };
  filters?.addEventListener('click', event => {
    const button = (event.target as Element).closest<HTMLButtonElement>('[data-filter]');
    if (!button) return;
    filter = button.dataset.filter || 'all';
    update();
  });
  input?.addEventListener('input', update);
  catalogue.querySelector<HTMLFormElement>('[data-shop-search]')?.addEventListener('submit', event => {
    event.preventDefault();
    update();
  });
  catalogue.querySelector('[data-shop-reset]')?.addEventListener('click', () => {
    filter = 'all';
    if (input) input.value = '';
    update();
    input?.focus();
  });
  catalogue.addEventListener('shop:refresh', () => { filter = 'all'; if (input) input.value = ''; update(); });
}
