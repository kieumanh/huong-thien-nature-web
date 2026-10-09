/** CSS owns the orbit; only run while visible and explicitly permitted. */
for (const scene of document.querySelectorAll<HTMLElement>('[data-ecosystem]')) {
  const toggle = scene.querySelector<HTMLButtonElement>('[data-orbit-toggle]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  let visible = false;
  let paused = false;
  const sync = () => {
    const permitted = !reduced.matches && !connection?.saveData && 'IntersectionObserver' in window;
    scene.classList.toggle('ecosystem-active', permitted && visible && !paused && !document.hidden);
    if (toggle) {
      toggle.hidden = !permitted;
      toggle.setAttribute('aria-pressed', String(paused));
      toggle.textContent = (paused ? toggle.dataset.resume : toggle.dataset.pause) || '';
    }
  };
  toggle?.addEventListener('click', () => { paused = !paused; sync(); });
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { visible = entries.some(entry => entry.isIntersecting); sync(); }, { threshold: 0 }).observe(scene);
  }
  sync();
}
