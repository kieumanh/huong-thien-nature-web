// Topic filter + pagination (3 x 3 = 9 per page) for the journal.
// Progressive enhancement: without JavaScript every article stays visible.
const PAGE_SIZE = 9;
const group = document.querySelector<HTMLElement>('[data-journal-topics]');
const buttons = [...(group?.querySelectorAll<HTMLButtonElement>('button[data-topic]') ?? [])];
const cards = [...document.querySelectorAll<HTMLElement>('#journal-grid [data-journal-card]')];
const count = document.querySelector<HTMLElement>('[data-journal-count]');
const nav = document.querySelector<HTMLElement>('[data-journal-pages]');

if (group && buttons.length && cards.length && count && nav) {
  const en = document.documentElement.lang === 'en';
  const unit = en ? 'articles' : 'bài đọc';
  const valid = new Set(buttons.map(button => button.dataset.topic));
  let topic = 'all';
  let page = 1;

  const render = (push: boolean, scroll: boolean) => {
    const matching = cards.filter(card => topic === 'all' || card.dataset.topic === topic);
    const pages = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
    page = Math.min(Math.max(1, page), pages);
    const start = (page - 1) * PAGE_SIZE;
    const visible = new Set(matching.slice(start, start + PAGE_SIZE));
    for (const card of cards) card.hidden = !visible.has(card);
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.topic === topic));
    const total = matching.length;
    const from = total ? start + 1 : 0;
    const to = Math.min(start + PAGE_SIZE, total);
    count.textContent = pages > 1
      ? (en ? `Showing ${from}–${to} of ${total} ${unit}` : `Đang hiện ${from}–${to}/${total} ${unit}`)
      : `${total} ${unit}`;

    nav.hidden = pages <= 1;
    nav.replaceChildren();
    if (pages > 1) {
      const make = (label: string, target: number, opts: { current?: boolean; disabled?: boolean; aria?: string; kind?: string } = {}) => {
        const item = document.createElement('li');
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = label;
        button.className = 'journal-page' + (opts.kind ? ` journal-page--${opts.kind}` : '');
        if (opts.aria) button.setAttribute('aria-label', opts.aria);
        if (opts.current) button.setAttribute('aria-current', 'page');
        if (opts.disabled) button.disabled = true;
        button.addEventListener('click', () => { page = target; render(true, true); });
        item.append(button);
        nav.append(item);
      };
      make(en ? '‹ Previous' : '‹ Trước', page - 1, { disabled: page === 1, aria: en ? 'Previous page' : 'Trang trước', kind: 'step' });
      for (let n = 1; n <= pages; n += 1) make(String(n), n, { current: n === page, aria: `${en ? 'Page' : 'Trang'} ${n}` });
      make(en ? 'Next ›' : 'Sau ›', page + 1, { disabled: page === pages, aria: en ? 'Next page' : 'Trang sau', kind: 'step' });
    }

    if (push) {
      const url = new URL(location.href);
      if (topic === 'all') url.searchParams.delete('chu-de'); else url.searchParams.set('chu-de', topic);
      if (page === 1) url.searchParams.delete('trang'); else url.searchParams.set('trang', String(page));
      history.replaceState(null, '', url);
    }
    if (scroll) document.getElementById('journal-articles')?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  group.addEventListener('click', event => {
    const button = (event.target as Element).closest<HTMLButtonElement>('button[data-topic]');
    if (!button) return;
    topic = valid.has(button.dataset.topic) ? (button.dataset.topic ?? 'all') : 'all';
    page = 1;
    render(true, false);
  });

  const params = new URLSearchParams(location.search);
  const initial = params.get('chu-de');
  if (initial && valid.has(initial)) topic = initial;
  page = Number.parseInt(params.get('trang') ?? '1', 10) || 1;
  render(false, false);
}
