// One-minute guided breathing: 4s in, 6s out (6 cycles). Progressive enhancement; the button stays hidden without JavaScript.
const root = document.querySelector<HTMLElement>('[data-breath]');
const orb = root?.querySelector<HTMLElement>('[data-breath-orb]');
const label = root?.querySelector<HTMLElement>('[data-breath-label]');
const time = root?.querySelector<HTMLElement>('[data-breath-time]');
const button = root?.querySelector<HTMLButtonElement>('[data-breath-button]');

if (root && orb && label && time && button) {
  const IN = 4000, OUT = 6000, TOTAL = 60000;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timer = 0, tick = 0, start = 0, running = false;
  button.hidden = false;

  const finish = (completed: boolean) => {
    running = false;
    clearTimeout(timer); clearInterval(tick);
    orb.dataset.phase = 'idle';
    time.hidden = true;
    label.textContent = completed ? root.dataset.done ?? '' : root.dataset.idle ?? '';
    button.textContent = completed ? button.dataset.again ?? '' : button.dataset.start ?? '';
    button.removeAttribute('aria-pressed');
  };
  const phase = (inhale: boolean) => {
    orb.dataset.phase = inhale ? 'in' : 'out';
    label.textContent = (inhale ? root.dataset.in : root.dataset.out) ?? '';
  };
  const cycle = () => {
    if (!running) return;
    if (Date.now() - start >= TOTAL - 500) return finish(true);
    phase(true);
    timer = window.setTimeout(() => {
      if (!running) return;
      phase(false);
      timer = window.setTimeout(cycle, OUT);
    }, IN);
  };
  button.addEventListener('click', () => {
    if (running) return finish(false);
    running = true;
    start = Date.now();
    button.textContent = button.dataset.stop ?? '';
    time.hidden = false;
    const update = () => { time.textContent = `${Math.max(0, Math.ceil((TOTAL - (Date.now() - start)) / 1000))} ${root.dataset.left}`; };
    update();
    tick = window.setInterval(update, 1000);
    if (reduce) orb.dataset.motion = 'off';
    cycle();
  });
}
