// Golden Frequency page: reveal-on-scroll, the six-area self-check map, the weekly tracker and the sticky quote bar.
// All text is written with textContent / value; nothing is sent anywhere unless the visitor submits the contact form.

type CheckCopy = {
  levels: string[];
  results: [string, string][];
  message: string;
  domainLabel: string;
  domains: { name: string; focus: string }[];
  cx: number;
  cy: number;
  radius: number;
};

const motion = matchMedia('(prefers-reduced-motion: reduce)');
const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

if ('IntersectionObserver' in window && !motion.matches && !saveData) {
  const observer = new IntersectionObserver(entries => {
    for (const { isIntersecting, target } of entries) {
      if (!isIntersecting) continue;
      target.classList.add('gf-revealed');
      observer.unobserve(target);
    }
  }, { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-gf-reveal]').forEach(element => observer.observe(element));
}

setupSelfCheck();
setupWeek();
setupSticky();
setupRails();

function setupSelfCheck() {
  const root = document.querySelector<HTMLElement>('[data-gf-check]');
  if (!root) return;
  let copy: CheckCopy;
  try { copy = JSON.parse(root.dataset.gfCopy || ''); } catch { return; }
  const steps = [...root.querySelectorAll<HTMLFieldSetElement>('[data-gf-step]')];
  const meta = root.querySelector<HTMLElement>('[data-gf-meta]')!;
  const progress = root.querySelector<HTMLElement>('[data-gf-progress]')!;
  const dots = [...root.querySelectorAll<HTMLLIElement>('.gf-check-dots li')];
  const nav = root.querySelector<HTMLElement>('[data-gf-nav]')!;
  const back = root.querySelector<HTMLButtonElement>('[data-gf-back]')!;
  const next = root.querySelector<HTMLButtonElement>('[data-gf-next]')!;
  const restart = root.querySelector<HTMLButtonElement>('[data-gf-restart]')!;
  const shape = root.querySelector<SVGPolygonElement>('[data-gf-shape]')!;
  const points = [...root.querySelectorAll<SVGCircleElement>('[data-gf-point]')];
  const empty = root.querySelector<HTMLElement>('[data-gf-empty]')!;
  const outcome = root.querySelector<HTMLElement>('[data-gf-outcome]')!;
  const outcomeTitle = root.querySelector<HTMLElement>('[data-gf-outcome-title]')!;
  const outcomeNote = root.querySelector<HTMLElement>('[data-gf-outcome-note]')!;
  const focus = root.querySelector<HTMLElement>('[data-gf-focus]')!;
  const send = root.querySelector<HTMLAnchorElement>('[data-gf-send]')!;
  let current = 0;
  let pointer = false;

  const values = () => steps.map(step => Number(step.querySelector<HTMLInputElement>('input:checked')?.value || 0));
  const position = (index: number, level: number) => {
    const angle = ((-90 + index * 60) * Math.PI) / 180;
    const r = (copy.radius * level) / 4;
    return [copy.cx + r * Math.cos(angle), copy.cy + r * Math.sin(angle)];
  };

  root.classList.add('is-enhanced');
  meta.hidden = false;
  nav.hidden = false;

  const show = (index: number, moveFocus = false) => {
    current = Math.max(0, Math.min(steps.length - 1, index));
    steps.forEach((step, stepIndex) => step.classList.toggle('is-current', stepIndex === current));
    sync();
    if (moveFocus) {
      const target = steps[current].querySelector<HTMLInputElement>('input:checked') ?? steps[current].querySelector<HTMLInputElement>('input');
      target?.focus({ preventScroll: true });
    }
  };

  function sync() {
    const levels = values();
    const answered = levels.filter(Boolean).length;
    progress.textContent = `${copy.domainLabel} ${current + 1}/${steps.length} · ${copy.domains[current].name}`;
    dots.forEach((dot, index) => {
      dot.classList.toggle('is-answered', levels[index] > 0);
      dot.classList.toggle('is-current', index === current);
    });
    back.disabled = current === 0;
    next.disabled = current === steps.length - 1 || !levels[current];
    shape.setAttribute('points', levels.map((level, index) => position(index, level).map(value => value.toFixed(1)).join(',')).join(' '));
    points.forEach((point, index) => {
      const [x, y] = position(index, levels[index]);
      point.setAttribute('cx', x.toFixed(1));
      point.setAttribute('cy', y.toFixed(1));
      point.classList.toggle('is-set', levels[index] > 0);
    });
    empty.hidden = answered === steps.length;
    outcome.hidden = answered !== steps.length;
    if (answered !== steps.length) return;
    const average = levels.reduce((sum, level) => sum + level, 0) / levels.length;
    const band = average < 1.75 ? 0 : average < 2.5 ? 1 : average < 3.25 ? 2 : 3;
    const lowest = levels.indexOf(Math.min(...levels));
    outcomeTitle.textContent = copy.results[band][0];
    outcomeNote.textContent = copy.results[band][1];
    focus.textContent = `${copy.domains[lowest].name}: ${copy.domains[lowest].focus}`;
  }

  // Mouse or touch choices advance to the next area; keyboard users move on with the Next button,
  // because arrow keys change a radio selection on every press.
  root.addEventListener('pointerdown', () => { pointer = true; });
  root.addEventListener('keydown', () => { pointer = false; });
  root.addEventListener('change', event => {
    const step = (event.target as HTMLElement).closest<HTMLFieldSetElement>('[data-gf-step]');
    if (!step) return;
    sync();
    const index = steps.indexOf(step);
    if (pointer && index === current && index < steps.length - 1) {
      window.setTimeout(() => show(index + 1), motion.matches ? 0 : 320);
    }
  });
  back.addEventListener('click', () => show(current - 1, true));
  next.addEventListener('click', () => show(current + 1, true));
  restart.addEventListener('click', () => {
    root.querySelectorAll<HTMLInputElement>('input:checked').forEach(input => { input.checked = false; });
    show(0, true);
  });

  send.addEventListener('click', event => {
    const levels = values();
    if (levels.some(level => !level)) return;
    const lines = levels.map((level, index) => `• ${copy.domains[index].name}: ${level}/4 (${copy.levels[level - 1]})`);
    const text = [copy.message, ...lines, '', `${outcomeTitle.textContent ?? ''}. ${focus.textContent ?? ''}`].join('\n');
    const message = document.querySelector<HTMLTextAreaElement>('#interest-form [name="message"]');
    const interest = document.querySelector<HTMLSelectElement>('#interest-form [name="interest"]');
    if (!message) return;
    event.preventDefault();
    const untouched = !message.value || message.value === message.dataset.autofill;
    message.value = (untouched ? text : `${message.value}\n\n${text}`).slice(0, 5000);
    message.dataset.autofill = message.value;
    if (interest) interest.value = 'courses';
    document.querySelector('#quote')?.scrollIntoView({ behavior: motion.matches ? 'auto' : 'smooth', block: 'start' });
    window.setTimeout(() => message.focus({ preventScroll: true }), motion.matches ? 0 : 600);
  });

  show(0);
}

function setupWeek() {
  const list = document.querySelector<HTMLElement>('[data-gf-week]');
  if (!list) return;
  const boxes = [...list.querySelectorAll<HTMLInputElement>('input[data-gf-day]')];
  const count = document.querySelector<HTMLElement>('[data-gf-week-count]');
  const bar = document.querySelector<HTMLElement>('[data-gf-week-bar]');
  const reset = document.querySelector<HTMLButtonElement>('[data-gf-week-reset]');
  const key = 'huong-thien:golden-frequency-week';
  try {
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    if (Array.isArray(saved)) boxes.forEach((box, index) => { box.checked = saved[index] === true; });
  } catch { /* storage unavailable: the tracker still works for this visit */ }
  const update = () => {
    const done = boxes.filter(box => box.checked).length;
    if (count) count.textContent = String(done);
    if (bar) bar.style.width = `${(done / boxes.length) * 100}%`;
    try { localStorage.setItem(key, JSON.stringify(boxes.map(box => box.checked))); } catch { /* ignore */ }
  };
  list.addEventListener('change', update);
  reset?.addEventListener('click', () => { boxes.forEach(box => { box.checked = false; }); update(); });
  update();
}

// Quote bar: appears once the hero has scrolled away and leaves when the quote section arrives.
function setupSticky() {
  const bar = document.querySelector<HTMLElement>('[data-gf-sticky]');
  const hero = document.querySelector('.gf-hero');
  const quote = document.querySelector('#quote');
  if (!bar || !hero || !quote || !('IntersectionObserver' in window)) return;
  let passedHero = false;
  let reachedQuote = false;
  const sync = () => {
    const on = passedHero && !reachedQuote;
    bar.hidden = !on;
    document.body.toggleAttribute('data-gf-sticky-on', on);
  };
  new IntersectionObserver(([entry]) => { passedHero = !entry.isIntersecting && entry.boundingClientRect.top < 0; sync(); }).observe(hero);
  new IntersectionObserver(([entry]) => { reachedQuote = entry.isIntersecting || entry.boundingClientRect.top < 0; sync(); }).observe(quote);
}

// A sideways-scrolling card rail must be reachable by keyboard when it has nothing focusable inside.
function setupRails() {
  const rails = [...document.querySelectorAll<HTMLElement>('[data-gf-rail]')];
  const focusable = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const update = () => {
    for (const rail of rails) {
      const scrolls = rail.scrollWidth > rail.clientWidth + 4 && !rail.querySelector(focusable);
      if (scrolls) {
        rail.tabIndex = 0;
        rail.setAttribute('aria-labelledby', rail.dataset.gfRail || '');
      } else {
        rail.removeAttribute('tabindex');
        rail.removeAttribute('aria-labelledby');
      }
    }
  };
  update();
  let frame = 0;
  window.addEventListener('resize', () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); });
}
