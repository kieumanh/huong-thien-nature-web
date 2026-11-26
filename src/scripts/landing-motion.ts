/** Gentle reveal on scroll for the landing pages. Progressive enhancement: without this script, with reduced motion, with data saver or
 *  without IntersectionObserver nothing is ever hidden. Text blocks only slide a little (no fade) so contrast never depends on timing. */
const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
const media = window.matchMedia('(prefers-reduced-motion: reduce)');
const dataSaver = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
const html = document.documentElement;

if (targets.length && 'IntersectionObserver' in window && !media.matches && !dataSaver) {
  html.classList.add('landing-motion');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).classList.add('is-in');
        observer.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.1 });
  for (const [index, target] of Array.from(targets).entries()) {
    target.style.setProperty('--reveal-delay', `${(index % 4) * 90}ms`);
    observer.observe(target);
  }
  media.addEventListener('change', () => {
    if (media.matches) {
      html.classList.remove('landing-motion');
      for (const target of targets) target.classList.add('is-in');
    }
  });
}

export {};
