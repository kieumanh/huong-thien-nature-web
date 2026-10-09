/** Progressive enhancement for the 2.5D homepage. Never blocks reading or navigation. */
const home = document.querySelector<HTMLElement>('.hybrid-home');
if (home) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const dataSaver = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const desktop = window.matchMedia('(min-width: 761px)');
  const activate = () => !media.matches && !dataSaver;
  document.documentElement.classList.toggle('hybrid-data-saver', dataSaver);

  const targets = home.querySelectorAll<HTMLElement>(
    '.home-discovery-content, .home-beginner-links, .rice-gallery .rice-frame, .visitor-questions details, .section-head, #journey .journey-opening, #journey .journey-chapters article, #journey .journey-gallery, #journey .learning-record, .begin-here .pillar, #story .intro-copy, #story .pillar, #practice .practice-image, #practice .steps li, #nature .section-head, #nature .solar-pillar, #people .portrait-wrap, #people .person, #journal .journal-card, #path .phase, #connect .contact-grid'
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
    for (const [index, target] of Array.from(targets).entries()) {
      target.setAttribute('data-hybrid-reveal', '');
      target.style.setProperty('--reveal-delay', `${(index % 3) * 70}ms`);
      observer.observe(target);
    }
    document.documentElement.classList.add('hybrid-motion');
  }

  const hero = home.querySelector<HTMLElement>('.hybrid-hero');
  if (hero) {
    let scheduled = false;
    const render = () => {
      scheduled = false;
      if (!activate() || !desktop.matches) {
        for (const key of ['--hybrid-scroll', '--hybrid-image-offset-y', '--hybrid-sun-offset-y', '--hybrid-foliage-offset-y', '--hybrid-pointer-offset-x', '--hybrid-foliage-offset-x']) hero.style.removeProperty(key);
        return;
      }
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
    media.addEventListener('change', () => {
      if (!activate()) {
        document.documentElement.classList.remove('hybrid-motion');
        for (const target of targets) target.classList.add('hybrid-in-view');
      }
      schedule();
    });
    desktop.addEventListener('change', schedule);
    finePointer.addEventListener('change', () => {
      hero.style.removeProperty('--hybrid-pointer-offset-x');
      hero.style.removeProperty('--hybrid-foliage-offset-x');
    });
    render();
    {
      hero.addEventListener('pointermove', (event: PointerEvent) => {
        if (!activate() || !desktop.matches || !finePointer.matches) return;
        const bounds = hero.getBoundingClientRect();
        if (!bounds.width || !bounds.height) return;
        const x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
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
