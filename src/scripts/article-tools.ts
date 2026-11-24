// Article page: "Đọc trong tĩnh lặng" reading mode, save to "Khu vườn của tôi", share, resume reading.
// Reading mode is never switched on automatically: it starts only when the reader asks for it and is not remembered as "on".
// Only the text size and background the reader chose are remembered, on this device.
import { loadGarden, loadPrefs, onGardenChange, recordProgress, savePrefs, sizeSteps, toggleSaved, type ReadingPrefs } from './garden-store';

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
  // ---- Save to the garden
  const saveButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-save]')];
  const syncSave = () => {
    const saved = loadGarden().saved.includes(slug);
    for (const button of saveButtons) {
      button.setAttribute('aria-pressed', String(saved));
      const label = button.querySelector('[data-save-label]');
      if (label) label.textContent = (saved ? button.dataset.labelOn : button.dataset.labelOff) ?? '';
    }
  };
  for (const button of saveButtons) {
    button.addEventListener('click', () => {
      const wanted = toggleSaved(slug);
      syncSave();
      const stored = loadGarden().saved.includes(slug) === wanted;
      if (!stored) say(en ? 'This browser is blocking storage, so the article could not be saved.' : 'Trình duyệt đang chặn lưu trữ nên chưa lưu được bài này.');
      else say(wanted ? (en ? 'Saved to my garden.' : 'Đã lưu vào khu vườn của bạn.') : (en ? 'Removed from my garden.' : 'Đã bỏ khỏi khu vườn của bạn.'));
    });
  }
  onGardenChange(syncSave);
  syncSave();

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

  // ---- Reading progress and resume (this device only)
  const span = () => {
    const rect = article.getBoundingClientRect();
    const start = rect.top + window.scrollY;
    return { start, end: Math.max(start + 1, start + rect.height - window.innerHeight) };
  };
  const current = () => {
    const { start, end } = span();
    return Math.max(0, Math.min(100, Math.round(((window.scrollY - start) / (end - start)) * 100)));
  };
  const before = loadGarden().history[slug];
  recordProgress(slug, before?.pct ?? 0); // opened: remembered as visited without losing where the reader got to
  let lastSaved = before?.pct ?? 0;
  let timer: number | undefined;
  const flush = () => {
    window.clearTimeout(timer);
    const pct = current();
    if (Math.abs(pct - lastSaved) >= 1 && (window.scrollY > 0 || lastSaved === 0)) { lastSaved = pct; recordProgress(slug, pct); }
  };
  window.addEventListener('scroll', () => { window.clearTimeout(timer); timer = window.setTimeout(flush, 1200); }, { passive: true });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); });
  window.addEventListener('pagehide', flush);

  const toast = document.querySelector<HTMLElement>('[data-resume]');
  const toastText = document.querySelector<HTMLElement>('[data-resume-text]');
  if (toast && toastText && before && before.pct >= 4 && before.pct < 96 && !location.hash && window.scrollY < 200) {
    toastText.textContent = `${toast.dataset.prefix ?? ''} ${before.pct}%.`;
    toast.hidden = false;
    const hide = () => { toast.hidden = true; window.removeEventListener('scroll', onScroll); window.clearTimeout(hideTimer); };
    const onScroll = () => { if (window.scrollY > 320) hide(); };
    const hideTimer = window.setTimeout(hide, 16000);
    window.addEventListener('scroll', onScroll, { passive: true });
    toast.querySelector('[data-resume-go]')?.addEventListener('click', () => {
      const { start, end } = span();
      window.scrollTo({ top: start + ((end - start) * before.pct) / 100, behavior: reduced() ? 'auto' : 'smooth' });
      hide();
    });
    toast.querySelector('[data-resume-top]')?.addEventListener('click', hide);
  }
}
