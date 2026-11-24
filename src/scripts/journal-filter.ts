// Tản văn listing: search, sort, topic filter, 9-per-page pagination and "Một bài viết hữu duyên".
// Progressive enhancement: without JavaScript every article stays visible and the search form opens the site-wide search.
import { normalizeSearch } from './search-engine';

const PAGE_SIZE = 9;
const root = document.documentElement;
const en = root.lang === 'en';
const unit = en ? 'articles' : 'bài đọc';
const grid = document.querySelector<HTMLElement>('#journal-grid');
const group = document.querySelector<HTMLElement>('[data-journal-topics]');
const buttons = [...(group?.querySelectorAll<HTMLButtonElement>('button[data-topic]') ?? [])];
const cards = [...document.querySelectorAll<HTMLElement>('#journal-grid [data-journal-card]')];
const count = document.querySelector<HTMLElement>('[data-journal-count]');
const nav = document.querySelector<HTMLElement>('[data-journal-pages]');
const form = document.querySelector<HTMLFormElement>('[data-journal-form]');
const input = document.querySelector<HTMLInputElement>('[data-journal-query]');
const sortSelect = document.querySelector<HTMLSelectElement>('[data-journal-sort]');
const empty = document.querySelector<HTMLElement>('[data-journal-empty]');
const siteLink = document.querySelector<HTMLAnchorElement>('[data-journal-site]');
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type Sort = 'featured' | 'newest' | 'short';
const sorts: Sort[] = ['featured', 'newest', 'short'];
const num = (card: HTMLElement, key: string) => Number.parseFloat(card.dataset[key] ?? '') || 0;
const slugOf = (card: HTMLElement) => card.dataset.slug ?? '';
const linkOf = (card: HTMLElement) => card.querySelector<HTMLAnchorElement>('.journal-card-copy a');
const titleOf = (card: HTMLElement) => linkOf(card)?.textContent?.trim() ?? '';
const metaOf = (card: HTMLElement) => [...card.querySelectorAll('.article-meta span')].map(item => item.textContent?.trim()).filter(Boolean).join(' · ');

if (grid && group && buttons.length && cards.length && count && nav) {
  const valid = new Set(buttons.map(button => button.dataset.topic));
  const base = new Map(cards.map(card => [card, normalizeSearch(card.dataset.keywords ?? '')]));
  const titles = new Map(cards.map(card => [card, normalizeSearch(titleOf(card))]));
  const fullText = new Map<HTMLElement, string>();
  let topic = 'all';
  let page = 1;
  let query = '';
  let sort: Sort = 'featured';
  let loading = false;

  // The full text of each article comes from the site search index, fetched once when the reader first uses the box.
  const loadIndex = async () => {
    if (loading || fullText.size) return;
    loading = true;
    try {
      const response = await fetch(`/${en ? 'en' : 'vi'}/search-index.json`);
      if (!response.ok) return;
      const entries = await response.json() as { url: string; text?: string }[];
      const byUrl = new Map(entries.map(entry => [entry.url, entry.text ?? '']));
      for (const card of cards) {
        const href = linkOf(card)?.getAttribute('href');
        const text = href ? byUrl.get(href) : undefined;
        if (text) fullText.set(card, normalizeSearch(text));
      }
      if (query) render(false, false);
    } catch { /* offline or blocked: title, topic and keywords still work */ } finally {
      loading = false;
    }
  };

  // Every word must be present. When the reader typed a phrase and some articles contain that exact phrase, only those are shown:
  // a long article contains almost every common word, so word-by-word matching alone would list the whole library.
  const score = (card: HTMLElement, words: string[], phrase: string) => {
    const title = titles.get(card) ?? '';
    const meta = base.get(card) ?? '';
    const body = fullText.get(card) ?? '';
    const haystack = `${meta} ${body}`;
    if (!words.every(word => title.includes(word) || haystack.includes(word))) return { value: 0, phrase: false };
    const exact = words.length > 1 && (title.includes(phrase) || haystack.includes(phrase));
    const value = words.reduce((total, word) => total + (title.includes(word) ? 10 : 0) + (meta.includes(word) ? 4 : 0) + (body.includes(word) ? 1 : 0), 0) + (exact ? 20 : 0) + (title.includes(phrase) ? 20 : 0) + 1;
    return { value, phrase: exact };
  };

  const bySort = (a: HTMLElement, b: HTMLElement) => {
    if (sort === 'newest') {
      const da = a.dataset.date ?? '', db = b.dataset.date ?? '';
      if (da !== db) return !da ? 1 : !db ? -1 : db.localeCompare(da);
    } else if (sort === 'short') {
      const diff = num(a, 'minutes') - num(b, 'minutes');
      if (diff) return diff;
    }
    return num(a, 'curated') - num(b, 'curated') || num(a, 'order') - num(b, 'order');
  };

  const render = (push: boolean, scroll: boolean) => {
    const phrase = normalizeSearch(query.slice(0, 120));
    const words = [...new Set(phrase.split(' ').filter(Boolean))];
    const scores = new Map<HTMLElement, number>();
    const exact = new Set<HTMLElement>();
    let matching = cards.filter(card => {
      if (topic !== 'all' && card.dataset.topic !== topic) return false;
      if (!words.length) return true;
      const result = score(card, words, phrase);
      scores.set(card, result.value);
      if (result.phrase) exact.add(card);
      return result.value > 0;
    });
    if (exact.size) matching = matching.filter(card => exact.has(card));
    matching = matching.sort((a, b) => (words.length ? (scores.get(b) ?? 0) - (scores.get(a) ?? 0) : 0) || bySort(a, b));

    const pages = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
    page = Math.min(Math.max(1, page), pages);
    const start = (page - 1) * PAGE_SIZE;
    const visible = new Set(matching.slice(start, start + PAGE_SIZE));
    // Re-attach in sorted order (matching first, then the rest) so reading order and tab order follow the screen.
    const rest = cards.filter(card => !matching.includes(card)).sort(bySort);
    for (const card of [...matching, ...rest]) grid.append(card);
    for (const card of cards) card.hidden = !visible.has(card);
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.topic === topic));

    const total = matching.length;
    const from = total ? start + 1 : 0;
    const to = Math.min(start + PAGE_SIZE, total);
    const shown = pages > 1 ? (en ? `Showing ${from}–${to} of ${total} ${unit}` : `Đang hiện ${from}–${to}/${total} ${unit}`) : `${total} ${unit}`;
    count.textContent = words.length ? (en ? `${shown} matching “${query.trim()}”` : `${shown} khớp “${query.trim()}”`) : shown;

    if (empty) empty.hidden = total > 0;
    if (siteLink) siteLink.href = `${siteLink.getAttribute('href')?.split('?')[0] ?? ''}${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`;

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
      const set = (key: string, value: string, fallback: string) => { if (value === fallback) url.searchParams.delete(key); else url.searchParams.set(key, value); };
      set('chu-de', topic, 'all');
      set('q', query.trim(), '');
      set('sap-xep', sort, 'featured');
      set('trang', String(page), '1');
      history.replaceState(null, '', url);
    }
    if (scroll) document.getElementById('journal-articles')?.scrollIntoView({ block: 'start', behavior: reducedMotion() ? 'auto' : 'smooth' });
  };

  group.addEventListener('click', event => {
    const button = (event.target as Element).closest<HTMLButtonElement>('button[data-topic]');
    if (!button) return;
    topic = valid.has(button.dataset.topic) ? (button.dataset.topic ?? 'all') : 'all';
    page = 1;
    render(true, false);
  });

  let timer: number | undefined;
  input?.addEventListener('focus', () => { void loadIndex(); }, { once: true });
  input?.addEventListener('input', () => {
    void loadIndex();
    window.clearTimeout(timer);
    timer = window.setTimeout(() => { query = input.value; page = 1; render(true, false); }, 140);
  });
  form?.addEventListener('submit', event => {
    event.preventDefault();
    window.clearTimeout(timer);
    query = input?.value ?? '';
    page = 1;
    render(true, false);
    input?.blur();
    document.getElementById('journal-grid')?.scrollIntoView({ block: 'start', behavior: reducedMotion() ? 'auto' : 'smooth' });
  });
  sortSelect?.addEventListener('change', () => {
    sort = sorts.includes(sortSelect.value as Sort) ? sortSelect.value as Sort : 'featured';
    page = 1;
    render(true, false);
  });
  document.querySelector<HTMLButtonElement>('[data-journal-reset]')?.addEventListener('click', () => {
    query = ''; topic = 'all'; page = 1;
    if (input) input.value = '';
    render(true, false);
    input?.focus();
  });

  // ---- Một bài viết hữu duyên: a quiet suggestion, never a redirect.
  const chanceButton = document.querySelector<HTMLButtonElement>('[data-chance-button]');
  const chanceBox = document.querySelector<HTMLElement>('[data-chance-result]');
  const chanceLink = document.querySelector<HTMLAnchorElement>('[data-chance-link]');
  const chanceMeta = document.querySelector<HTMLElement>('[data-chance-meta]');
  const chanceOpen = document.querySelector<HTMLAnchorElement>('[data-chance-open]');
  let lastChance = '';
  const suggest = () => {
    const pool = cards.filter(card => slugOf(card) !== lastChance);
    const pick = (pool.length ? pool : cards)[Math.floor(Math.random() * (pool.length || cards.length))];
    if (!pick || !chanceBox || !chanceLink || !chanceMeta || !chanceOpen) return;
    lastChance = slugOf(pick);
    const href = linkOf(pick)?.getAttribute('href') ?? '#';
    chanceLink.textContent = titleOf(pick);
    chanceLink.href = href;
    chanceOpen.href = href;
    chanceMeta.textContent = metaOf(pick);
    chanceBox.hidden = false;
  };
  chanceButton?.addEventListener('click', suggest);
  document.querySelector<HTMLButtonElement>('[data-chance-again]')?.addEventListener('click', suggest);

  // ---- Initial state from the address bar
  const params = new URLSearchParams(location.search);
  const initialTopic = params.get('chu-de');
  if (initialTopic && valid.has(initialTopic)) topic = initialTopic;
  const initialSort = params.get('sap-xep');
  if (initialSort && sorts.includes(initialSort as Sort)) sort = initialSort as Sort;
  if (sortSelect) sortSelect.value = sort;
  query = (params.get('q') ?? '').slice(0, 120);
  if (input) input.value = query;
  if (query) void loadIndex();
  page = Number.parseInt(params.get('trang') ?? '1', 10) || 1;
  render(false, false);
}
