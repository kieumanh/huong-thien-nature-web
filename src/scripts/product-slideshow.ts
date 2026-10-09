/** Only visible, unattended slides rotate. Manual controls always remain available. */
const slideshow = document.querySelector<HTMLElement>('[data-product-slideshow]');
if (slideshow) {
  const slides = [...slideshow.querySelectorAll<HTMLElement>('[data-slide]')];
  const controls = slideshow.querySelector<HTMLElement>('.slideshow-controls')!;
  const pause = slideshow.querySelector<HTMLButtonElement>('[data-slide-pause]')!;
  const counter = slideshow.querySelector<HTMLElement>('[data-slide-counter]')!;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const vi = slideshow.dataset.lang === 'vi';
  let index = 0;
  let paused = reduced.matches;
  let hovered = false;
  let focused = false;
  let visible = true;
  let timer: ReturnType<typeof setInterval> | undefined;
  const show = (next: number) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, position) => { slide.hidden = position !== index; });
    counter.textContent = `${index + 1} / ${slides.length}`;
  };
  const sync = () => {
    if (timer !== undefined) clearInterval(timer);
    timer = undefined;
    pause.textContent = paused ? (vi ? 'Tiếp tục' : 'Play') : (vi ? 'Tạm dừng' : 'Pause');
    pause.setAttribute('aria-pressed', String(paused));
    if (slides.length > 1 && !paused && !hovered && !focused && visible && !document.hidden) {
      timer = setInterval(() => show(index + 1), 4000);
    }
  };
  slideshow.querySelector('[data-slide-prev]')?.addEventListener('click', () => { show(index - 1); sync(); });
  slideshow.querySelector('[data-slide-next]')?.addEventListener('click', () => { show(index + 1); sync(); });
  pause.addEventListener('click', () => { paused = !paused; sync(); });
  slideshow.addEventListener('pointerenter', () => { hovered = true; sync(); });
  slideshow.addEventListener('pointerleave', () => { hovered = false; sync(); });
  // Stop rotation on keyboard focus until the visitor explicitly resumes it.
  slideshow.addEventListener('focusin', () => { focused = true; paused = true; sync(); });
  slideshow.addEventListener('focusout', event => {
    if (!slideshow.contains(event.relatedTarget as Node | null)) { focused = false; sync(); }
  });
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', () => { paused = reduced.matches; sync(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      sync();
    }, { threshold: 0.1 }).observe(slideshow);
  }
  window.addEventListener('pagehide', () => { if (timer !== undefined) clearInterval(timer); });
  window.addEventListener('pageshow', sync);
  controls.hidden = slides.length < 2;
  sync();
}
