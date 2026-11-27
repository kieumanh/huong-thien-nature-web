import { matchesProduct } from './shop-filter';

// Filtering and search for a shop space. Cards and chips may be replaced at runtime by shop-feed-client,
// so everything is looked up on demand and chip clicks are delegated.
const catalogue = document.querySelector<HTMLElement>('[data-shop-catalogue]');
if (catalogue) {
  const input = catalogue.querySelector<HTMLInputElement>('#shop-search');
  const count = catalogue.querySelector<HTMLElement>('[data-shop-count]');
  const empty = catalogue.querySelector<HTMLElement>('.shop-empty');
  const filters = catalogue.querySelector<HTMLElement>('.shop-filters');
  const clear = catalogue.querySelector<HTMLButtonElement>('[data-shop-clear]');
  const vi = catalogue.dataset.lang === 'vi';
  let filter = 'all';
  const update = () => {
    const cards = [...catalogue.querySelectorAll<HTMLElement>('[data-product-card]')];
    const query = input?.value.trim() || '';
    let visible = 0;
    for (const card of cards) {
      card.hidden = !matchesProduct(card.dataset.category || '', card.dataset.search || '', filter, query);
      if (!card.hidden) visible++;
    }
    const word = vi ? 'sản phẩm' : 'products';
    if (count) {
      // "8 sản phẩm" when nothing is filtered; "Hiển thị 3 / 8 sản phẩm" when a filter or search is active.
      count.textContent = visible === cards.length
        ? `${cards.length} ${word}`
        : vi ? `Hiển thị ${visible} / ${cards.length} ${word}` : `Showing ${visible} of ${cards.length} ${word}`;
    }
    if (empty) empty.hidden = visible !== 0 || cards.length === 0;
    if (clear) clear.hidden = filter === 'all' && query === '';
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
  const resetAll = () => {
    filter = 'all';
    if (input) input.value = '';
    update();
    input?.focus();
  };
  catalogue.querySelector('[data-shop-reset]')?.addEventListener('click', resetAll);
  // The clear button hides itself once nothing is active, so focus moves to the search box instead of being lost.
  clear?.addEventListener('click', resetAll);
  catalogue.addEventListener('shop:refresh', () => { filter = 'all'; if (input) input.value = ''; update(); });
}
