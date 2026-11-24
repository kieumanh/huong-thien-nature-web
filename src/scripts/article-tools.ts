// Article page: "Đọc trong tĩnh lặng" reading mode and share.
// Reading mode is never switched on automatically: it starts only when the reader asks for it and is not remembered as "on".
// Only the text size and background the reader chose are remembered, on this device.
import { loadPrefs, savePrefs, sizeSteps, type ReadingPrefs } from './garden-store';

const root = document.documentElement;
const en = root.lang === 'en';
const article = document.querySelector<HTMLElement>('[data-article]');
const slug = article?.dataset.slug ?? '';
const status = document.querySelector<HTMLElement>('[data-article-status]');
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let statusTimer: number | undefined;
const say = (message: string) => {
  if (!status) return;
  status.textContent = message;
  window.clearTimeout(statusTimer);
  statusTimer = window.setTimeout(() => { status.textContent = ''; }, 6000);
};

if (article && slug) {
  // ---- Share: the system share sheet when there is one, otherwise copy the link.
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-share]')) {
    button.addEventListener('click', async () => {
      const url = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href || `${location.origin}${location.pathname}`;
      const title = button.dataset.title ?? document.title;
      try {
        if (typeof navigator.share === 'function') { await navigator.share({ title, url }); return; }
      } catch (error) {
        if ((error as DOMException).name === 'AbortError') return;
      }
      try {
        await navigator.clipboard.writeText(url);
        say(button.dataset.copied ?? '');
      } catch {
        say(button.dataset.failed ?? '');
      }
    });
  }

  // ---- Reading mode
  const toggle = document.querySelector<HTMLButtonElement>('[data-reading-toggle]');
  const bar = document.querySelector<HTMLElement>('[data-reading-bar]');
  const exit = document.querySelector<HTMLButtonElement>('[data-reading-exit]');
  const sizeButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-reading-size]')];
  const themeButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-reading-choice]')];
  let prefs: ReadingPrefs = loadPrefs();
  const isOn = () => root.dataset.reading === 'on';

  // Keep the paragraph the reader is looking at in place while the page chrome appears or disappears.
  const keepPlace = (change: () => void) => {
    const blocks = [...document.querySelectorAll<HTMLElement>('.article-body > p, .article-body section, .article-body figure, .article-body aside, .article-header h1')];
    const anchor = blocks.find(block => block.getBoundingClientRect().bottom > 80);
    const before = anchor?.getBoundingClientRect().top ?? 0;
    change();
    if (anchor) window.scrollTo({ top: window.scrollY + anchor.getBoundingClientRect().top - before, behavior: 'instant' as ScrollBehavior });
  };

  const apply = () => {
    root.style.setProperty('--reading-scale', String(sizeSteps[prefs.size]));
    root.dataset.readingTheme = prefs.theme;
    for (const button of themeButtons) button.setAttribute('aria-pressed', String(button.dataset.readingChoice === prefs.theme));
    for (const button of sizeButtons) {
      const next = prefs.size + Number(button.dataset.readingSize);
      button.disabled = next < 0 || next >= sizeSteps.length;
    }
  };

  const enter = () => {
    if (!bar) return;
    prefs = loadPrefs();
    keepPlace(() => {
      root.dataset.reading = 'on';
      bar.hidden = false;
      apply();
    });
    toggle?.setAttribute('aria-pressed', 'true');
    exit?.focus({ preventScroll: true });
  };
  const leave = () => {
    if (!bar) return;
    keepPlace(() => {
      delete root.dataset.reading;
      delete root.dataset.readingTheme;
      root.style.removeProperty('--reading-scale');
      bar.hidden = true;
    });
    toggle?.setAttribute('aria-pressed', 'false');
    toggle?.focus({ preventScroll: true });
  };

  toggle?.addEventListener('click', () => (isOn() ? leave() : enter()));
  exit?.addEventListener('click', leave);
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && isOn()) leave(); });
  for (const button of sizeButtons) {
    button.addEventListener('click', () => {
      const next = Math.max(0, Math.min(sizeSteps.length - 1, prefs.size + Number(button.dataset.readingSize)));
      if (next === prefs.size) return;
      prefs = { ...prefs, size: next };
      savePrefs(prefs);
      keepPlace(apply);
    });
  }
  for (const button of themeButtons) {
    button.addEventListener('click', () => {
      const theme = button.dataset.readingChoice;
      if (theme !== 'light' && theme !== 'ivory' && theme !== 'dim') return;
      prefs = { ...prefs, theme };
      savePrefs(prefs);
      apply();
    });
  }

}
