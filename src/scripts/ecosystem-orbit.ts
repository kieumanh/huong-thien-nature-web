/** CSS owns orbital motion; it runs only while visible and explicitly permitted. */
for (const scene of document.querySelectorAll<HTMLElement>('[data-ecosystem]')) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  let visible = false;
  const sync = () => {
    const permitted = !reduced.matches && !connection?.saveData && 'IntersectionObserver' in window;
    scene.classList.toggle('ecosystem-active', permitted && visible && !document.hidden);
  };
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { visible = entries.some(entry => entry.isIntersecting); sync(); }, { threshold: 0 }).observe(scene.querySelector('.solar-system-scene') ?? scene);
  }
  sync();
}
