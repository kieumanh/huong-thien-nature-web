// Home hero slideshow: crossfades the album photos every 6 seconds, loads each photo just before it is shown,
// pauses when the page is hidden, when the pointer or keyboard focus is on it, or when the visitor presses pause.
// Reduced motion and data saver: no automatic change (the dots still work, with no fade).
const slider = document.querySelector<HTMLElement>('[data-hero-slides]');
if (slider) {
  const slides = [...slider.querySelectorAll<HTMLElement>('[data-hero-slide]')];
  const dots = [...slider.querySelectorAll<HTMLButtonElement>('[data-hero-dot]')];
  const toggle = slider.querySelector<HTMLButtonElement>('[data-hero-toggle]');
  const live = slider.querySelector<HTMLElement>('[data-hero-live]');
  const interval = Number(slider.dataset.interval) || 6000;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  let index = 0;
  let timer = 0;
  let userPaused = false;
  let hovering = false;

  const load = (slide: HTMLElement | undefined) => {
    const img = slide?.querySelector<HTMLImageElement>('img[data-src]');
    if (!img) return;
    img.srcset = img.dataset.srcset || '';
    img.src = img.dataset.src || '';
    img.removeAttribute('data-src');
    img.removeAttribute('data-srcset');
  };
  const show = (next: number, announce = false) => {
    index = (next + slides.length) % slides.length;
    load(slides[index]);
    load(slides[(index + 1) % slides.length]);
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
      if (i === index) slide.removeAttribute('aria-hidden'); else slide.setAttribute('aria-hidden', 'true');
    });
    dots.forEach((dot, i) => { if (i === index) dot.setAttribute('aria-current', 'true'); else dot.removeAttribute('aria-current'); });
    if (announce && live) live.textContent = slides[index].querySelector('img')?.alt || '';
  };
  const allowed = () => slides.length > 1 && !reduced.matches && !saveData;
  const stop = () => { window.clearInterval(timer); timer = 0; };
  const start = () => {
    stop();
    if (allowed() && !userPaused && !hovering && !document.hidden) timer = window.setInterval(() => show(index + 1), interval);
  };
  const label = () => {
    if (!toggle) return;
    const paused = userPaused || !allowed();
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', (paused ? toggle.dataset.play : toggle.dataset.pause) || '');
    slider.classList.toggle('is-paused', paused);
  };

  dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i, true); start(); }));
  toggle?.addEventListener('click', () => {
    if (!allowed()) { userPaused = false; slides.length > 1 && show(index + 1, true); return; }
    userPaused = !userPaused;
    label();
    start();
  });
  slider.addEventListener('pointerenter', () => { hovering = true; stop(); });
  slider.addEventListener('pointerleave', () => { hovering = false; start(); });
  slider.addEventListener('focusin', stop);
  slider.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', start);
  reduced.addEventListener('change', () => { label(); start(); });

  load(slides[1]);
  label();
  start();
}
export {};
