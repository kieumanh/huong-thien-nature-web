const button = document.querySelector<HTMLButtonElement>('.back-to-top');
if (button) {
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    button.hidden = scrollable <= 0 || window.scrollY / scrollable < .3;
  };
  const schedule = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  new ResizeObserver(schedule).observe(document.body);
  button.addEventListener('click', () => {
    const destination = document.querySelector<HTMLElement>('#top') || document.querySelector<HTMLElement>('#main-content');
    if (destination) {
      if (!destination.hasAttribute('tabindex')) destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
    }
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  });
  update();
}
export {};
