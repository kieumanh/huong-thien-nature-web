/** Living Zen model (LivingZenModel.astro) and the value cards (PhilosophyValues.astro).
 *  Progressive enhancement: without this script every panel and every value stays open as plain text.
 *  Here: the tabs, the rings and the arrow keys choose one dimension at a time; a link to a value opens its card. */
export {};

const root = document.querySelector<HTMLElement>('[data-ph-model]');
const grid = document.querySelector<HTMLElement>('[data-ph-values]');

if (root) {
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[role="tabpanel"]'));

  const select = (key: string, focus = false) => {
    root.dataset.active = key;
    if (grid) grid.dataset.activeTier = key;
    for (const tab of tabs) {
      const on = tab.dataset.key === key;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      if (on && focus) tab.focus();
    }
    for (const panel of panels) panel.hidden = panel.dataset.key !== key;
  };

  root.dataset.enhanced = 'true';
  select('centre');

  for (const tab of tabs) {
    tab.addEventListener('click', () => select(tab.dataset.key ?? 'centre'));
    tab.addEventListener('keydown', event => {
      const index = tabs.indexOf(tab);
      const last = tabs.length - 1;
      const next = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? (index === last ? 0 : index + 1)
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? (index === 0 ? last : index - 1)
        : event.key === 'Home' ? 0 : event.key === 'End' ? last : -1;
      if (next < 0) return;
      event.preventDefault();
      select(tabs[next].dataset.key ?? 'centre', true);
    });
  }
  // A mouse or finger can also touch the rings themselves (the tabs stay the keyboard path).
  for (const band of root.querySelectorAll<SVGElement>('[data-band]')) {
    band.addEventListener('click', () => select(band.dataset.band ?? 'centre'));
  }
}

if (grid) {
  const openFromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    const card = id ? grid.querySelector<HTMLDetailsElement>(`details[id="${CSS.escape(id)}"]`) : null;
    if (card) card.open = true;
  };
  openFromHash();
  window.addEventListener('hashchange', openFromHash);
  // A link inside the page to a closed card: open it first so the scroll lands on readable content.
  document.addEventListener('click', event => {
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    const id = link ? decodeURIComponent(link.getAttribute('href')!.slice(1)) : '';
    const card = id ? grid.querySelector<HTMLDetailsElement>(`details[id="${CSS.escape(id)}"]`) : null;
    if (card) card.open = true;
  });
}
