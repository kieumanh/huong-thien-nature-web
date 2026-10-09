import { matchesProduct } from './shop-filter';

const catalogue = document.querySelector<HTMLElement>('[data-shop-catalogue]');
if (catalogue) {
  const controls = catalogue.querySelector<HTMLElement>('.shop-controls');
  const cards = [...catalogue.querySelectorAll<HTMLElement>('[data-product-card]')];
  const buttons = [...catalogue.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const input = catalogue.querySelector<HTMLInputElement>('#shop-search');
  const count = catalogue.querySelector<HTMLElement>('[data-shop-count]');
  const empty = catalogue.querySelector<HTMLElement>('.shop-empty');
  let filter = 'all';
  const update = () => {
    let visible = 0;
    for (const card of cards) {
      card.hidden = !matchesProduct(card.dataset.category || '', card.dataset.search || '', filter, input?.value || '');
      if (!card.hidden) visible++;
    }
    if (count) count.textContent = `${visible} / ${cards.length} ${catalogue.dataset.lang === 'vi' ? 'sản phẩm' : 'products'}`;
    if (empty) empty.hidden = visible !== 0;
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
  };
  buttons.forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter || 'all'; update(); }));
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
  if (controls) controls.hidden = false;
}
