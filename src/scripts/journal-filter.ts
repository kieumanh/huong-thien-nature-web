const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const form = document.querySelector<HTMLFormElement>('[data-journal-search]');
const input = form?.querySelector<HTMLInputElement>('input');
const clear = form?.querySelector<HTMLButtonElement>('[data-journal-clear]');
const count = document.querySelector<HTMLElement>('[data-journal-count]');
const empty = document.querySelector<HTMLElement>('[data-journal-empty]');
const cards = [...document.querySelectorAll<HTMLElement>('[data-journal-card]')];

if (form && input && count && empty && cards.length) {
  const en = document.documentElement.lang === 'en';
  const unit = en ? 'articles' : 'bài viết';
  const apply = () => {
    const words = normalize(input.value).split(' ').filter(Boolean);
    let shown = 0;
    for (const card of cards) {
      const text = card.dataset.search ?? '';
      const match = words.every(word => text.includes(word));
      card.hidden = !match;
      if (match) shown += 1;
    }
    empty.hidden = shown > 0;
    if (clear) clear.hidden = input.value === '';
    count.textContent = words.length ? `${shown}/${cards.length} ${unit}` : `${cards.length} ${unit}`;
  };
  form.addEventListener('submit', event => { event.preventDefault(); apply(); });
  input.addEventListener('input', apply);
  clear?.addEventListener('click', () => { input.value = ''; apply(); input.focus(); });
  const initial = new URLSearchParams(location.search).get('q');
  if (initial) { input.value = initial.slice(0, 80); apply(); }
}
