/** Progressive enhancement for the 2.5D homepage. Never blocks reading or navigation. */
const home = document.querySelector<HTMLElement>('.hybrid-home');
if (home) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const dataSaver = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const desktop = window.matchMedia('(min-width: 761px)').matches;
  const activate = () => !media.matches && !dataSaver;

  const targets = home.querySelectorAll<HTMLElement>(
    '#story .intro-copy, #story .pillar, #practice .practice-image, #practice .steps li, #nature .section-head, #nature .nature-card, #people .portrait-wrap, #people .person, #journal .journal-card, #path .phase, #connect .contact-grid'
  );
  if (activate() && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('hybrid-in-view');
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0.08 });
    for (const target of targets) {
      target.setAttribute('data-hybrid-reveal', '');
      observer.observe(target);
    }
    document.documentElement.classList.add('hybrid-motion');
  }

  const hero = home.querySelector<HTMLElement>('.hybrid-hero');
  if (hero && activate() && desktop) {
    let scheduled = false;
    const render = () => {
      scheduled = false;
      const progress = Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / Math.max(1, hero.offsetHeight)));
      hero.style.setProperty('--hybrid-scroll', progress.toFixed(3));
      hero.style.setProperty('--hybrid-image-offset-y', (progress * 65).toFixed(1) + 'px');
      hero.style.setProperty('--hybrid-sun-offset-y', (progress * 45).toFixed(1) + 'px');
      hero.style.setProperty('--hybrid-foliage-offset-y', (-progress * 35).toFixed(1) + 'px');
    };
    const schedule = () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(render);
      }
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    render();
    if (isFinePointer) {
      hero.addEventListener('pointermove', (event: PointerEvent) => {
        const bounds = hero.getBoundingClientRect();
        if (!bounds.width || !bounds.height) return;
        const x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
        const y = (event.clientY - bounds.top) / bounds.height * 2 - 1;
        hero.style.setProperty('--hybrid-pointer-offset-x', (Math.max(-1, Math.min(1, x)) * 9).toFixed(1) + 'px');
        hero.style.setProperty('--hybrid-foliage-offset-x', (Math.max(-1, Math.min(1, x)) * -17).toFixed(1) + 'px');
      }, { passive: true });
      hero.addEventListener('pointerleave', () => {
        hero.style.setProperty('--hybrid-pointer-offset-x', '0px');
        hero.style.setProperty('--hybrid-foliage-offset-x', '0px');
      });
    }
  }
}
