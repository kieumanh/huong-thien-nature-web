// Enlarged-photo view for the album. Without JavaScript (or without <dialog>) each photo simply links to its full-size file.
const dialog = document.querySelector<HTMLDialogElement>('[data-album-dialog]');
const triggers = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-album-open]'));

if (dialog && triggers.length && typeof dialog.showModal === 'function') {
  const image = dialog.querySelector<HTMLImageElement>('img')!;
  const caption = dialog.querySelector<HTMLElement>('[data-album-caption]')!;
  const counter = dialog.querySelector<HTMLElement>('[data-album-counter]')!;
  const template = dialog.dataset.counter ?? '{n} / {total}';
  let index = 0;

  const show = (target: number) => {
    index = (target + triggers.length) % triggers.length;
    const trigger = triggers[index];
    image.src = trigger.href;
    image.width = Number(trigger.dataset.width) || image.width;
    image.height = Number(trigger.dataset.height) || image.height;
    image.alt = trigger.querySelector('img')?.alt ?? '';
    caption.textContent = trigger.dataset.caption ?? '';
    counter.textContent = template.replace('{n}', String(index + 1)).replace('{total}', String(triggers.length));
    // Warm the neighbours so stepping through feels immediate.
    for (const neighbour of [triggers[(index + 1) % triggers.length], triggers[(index - 1 + triggers.length) % triggers.length]]) new Image().src = neighbour.href;
  };

  triggers.forEach((trigger, position) => trigger.addEventListener('click', event => {
    event.preventDefault();
    show(position);
    dialog.showModal();
  }));

  dialog.querySelector('[data-album-close]')?.addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-album-prev]')?.addEventListener('click', () => show(index - 1));
  dialog.querySelector('[data-album-next]')?.addEventListener('click', () => show(index + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1); }
  });
  // Tapping the dark area around the photo closes the view.
  dialog.addEventListener('click', event => {
    if (!(event.target as HTMLElement).closest('button, img, figcaption')) dialog.close();
  });

  let startX = 0;
  dialog.addEventListener('touchstart', event => { startX = event.touches[0].clientX; }, { passive: true });
  dialog.addEventListener('touchend', event => {
    const distance = event.changedTouches[0].clientX - startX;
    if (Math.abs(distance) > 60) show(index + (distance < 0 ? 1 : -1));
  }, { passive: true });
}
