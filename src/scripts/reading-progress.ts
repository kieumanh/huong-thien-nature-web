/** Update once per frame; observe layout changes from fonts and lazy images. */
const progress = document.querySelector<HTMLElement>('.reading-progress');
if (progress) {
  const fill = progress.querySelector<HTMLElement>('span')!;
  let scheduled = false;
  const render = () => {
    scheduled = false;
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = distance > 0 ? Math.max(0, Math.min(1, window.scrollY / distance)) : 0;
    fill.style.transform = `scaleX(${ratio})`;
    progress.setAttribute('aria-valuenow', String(Math.round(ratio * 100)));
  };
  const schedule = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(render); }
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('pageshow', schedule);
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(document.body);
  document.fonts.ready.then(schedule);
  render();
}
