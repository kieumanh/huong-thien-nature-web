// Search on the menu bar: the magnifier opens a bar that grows across the header with live results beneath it, so nobody has to leave the page to search.
// Without JavaScript the magnifier stays a plain link to the search page (the same page that the "see all results" link and Enter lead to).
import { searchRecords, type SearchRecord } from './search-engine';

const trigger = document.querySelector<HTMLAnchorElement>('[data-nav-search]');
const bar = document.querySelector<HTMLElement>('[data-searchbar]');
const panel = document.querySelector<HTMLElement>('[data-search-panel]');
if (trigger && bar && panel) {
  const form = bar.querySelector<HTMLFormElement>('form')!;
  const input = bar.querySelector<HTMLInputElement>('input')!;
  const closeButton = bar.querySelector<HTMLButtonElement>('[data-search-close]')!;
  const status = panel.querySelector<HTMLElement>('[data-search-status]')!;
  const list = panel.querySelector<HTMLElement>('[data-search-results]')!;
  const suggest = panel.querySelector<HTMLElement>('[data-search-suggest]')!;
  const all = panel.querySelector<HTMLAnchorElement>('[data-search-all]')!;
  const header = trigger.closest('header')!;
  const lang = document.documentElement.lang === 'en' ? 'en' : 'vi';
  const en = lang === 'en';
  const searchPath = new URL(trigger.href, location.href).pathname;
  const MAX = 6;
  let records: SearchRecord[] | null = null;
  let loading: Promise<void> | null = null;
  let failed = false;
  let timer = 0;
  let open = false;

  const ensureIndex = () => loading ??= fetch(`/${lang}/search-index.json`, { signal: AbortSignal.timeout(15000) })
    .then(response => { if (!response.ok) throw new Error('index unavailable'); return response.json() as Promise<SearchRecord[]>; })
    .then(data => { records = data.filter(entry => entry.url.startsWith(`/${lang}/`)); failed = false; })
    .catch(() => { failed = true; loading = null; });

  const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  const render = () => {
    const query = input.value.trim().slice(0, 120);
    all.hidden = !query;
    if (query) { all.href = `${searchPath}?q=${encodeURIComponent(query)}`; all.textContent = `${all.dataset.label} →`; }
    suggest.hidden = Boolean(query);
    if (!query) { list.replaceChildren(); status.textContent = ''; return; }
    if (failed) { list.replaceChildren(); status.textContent = en ? 'Search could not load. Press Enter to open the search page.' : 'Chưa tải được dữ liệu. Nhấn Enter để mở trang tìm kiếm.'; return; }
    if (!records) { status.textContent = en ? 'Searching…' : 'Đang tìm…'; return; }
    const results = searchRecords(records, query);
    status.textContent = results.length
      ? (en ? `${results.length} results. Showing ${Math.min(results.length, MAX)}.` : `${results.length} kết quả. Hiển thị ${Math.min(results.length, MAX)} kết quả đầu.`)
      : (en ? 'No results. Try fewer words or another keyword.' : 'Chưa có kết quả. Thử ít từ hơn hoặc đổi từ khóa.');
    list.replaceChildren(...results.slice(0, MAX).map(entry => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = entry.url;
      const category = document.createElement('span');
      category.className = 'nav-search-category';
      category.textContent = entry.category;
      const title = document.createElement('strong');
      title.textContent = entry.title;
      const description = document.createElement('span');
      description.className = 'nav-search-desc';
      description.textContent = entry.description.length > 110 ? `${entry.description.slice(0, 107).trimEnd()}…` : entry.description;
      link.append(category, title, description);
      item.append(link);
      return item;
    }));
  };

  const openSearch = () => {
    if (open) return;
    open = true;
    bar.hidden = false;
    panel.hidden = false;
    header.classList.add('search-open');
    requestAnimationFrame(() => requestAnimationFrame(() => bar.classList.add('is-open')));
    trigger.setAttribute('aria-expanded', 'true');
    input.focus({ preventScroll: true });
    void ensureIndex().then(render);
    render();
  };
  const closeSearch = (returnFocus = true) => {
    if (!open) return;
    open = false;
    bar.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    header.classList.remove('search-open');
    const finish = () => { if (!open) { bar.hidden = true; panel.hidden = true; } };
    if (reducedMotion()) finish(); else window.setTimeout(finish, 460);
    if (returnFocus) trigger.focus();
  };

  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', 'nav-search-panel');
  trigger.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    if (open) closeSearch(); else openSearch();
  });
  closeButton.addEventListener('click', () => closeSearch());
  input.addEventListener('input', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(render, 110);
    void ensureIndex().then(render);
  });
  form.addEventListener('submit', event => {
    if (!input.value.trim()) event.preventDefault();
  });
  document.addEventListener('keydown', event => {
    if (!open) return;
    if (event.key === 'Escape') { event.preventDefault(); closeSearch(); return; }
    if (event.key === '/' || event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      const links = [...panel.querySelectorAll<HTMLAnchorElement>('.nav-search-results a, .nav-search-all:not([hidden])')];
      if (event.key === '/' || !links.length) return;
      const current = links.indexOf(document.activeElement as HTMLAnchorElement);
      if (event.key === 'ArrowDown') { event.preventDefault(); (links[current + 1] ?? links[0]).focus(); }
      else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (current <= 0) input.focus(); else links[current - 1].focus();
      }
    }
  });
  document.addEventListener('click', event => {
    if (!open || !(event.target instanceof Node)) return;
    if (!bar.contains(event.target) && !panel.contains(event.target) && !trigger.contains(event.target)) closeSearch(false);
  });
  document.addEventListener('focusin', event => {
    if (open && event.target instanceof Node && !header.contains(event.target)) closeSearch(false);
  });
  // A "/" press outside any field opens the search, as on many reading sites.
  document.addEventListener('keydown', event => {
    if (open || event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
    const target = event.target as HTMLElement | null;
    if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
    event.preventDefault();
    openSearch();
  });
}
export {};
