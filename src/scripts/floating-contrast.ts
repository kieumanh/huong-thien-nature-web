// Choose a contrasting surface independently at each floating control's location.
const controls = [...document.querySelectorAll<HTMLElement>('.music-dock, .back-to-top')];
type RGB = [number, number, number];
const thumbnails = new WeakMap<HTMLImageElement, ImageData>();

function background(element: Element): RGB {
  const layers: number[][] = [];
  for (let node: Element | null = element; node; node = node.parentElement) {
    const color = getComputedStyle(node).backgroundColor;
    const numbers = color.match(/[\d.]+/g)?.map(Number);
    if (!numbers || numbers.length < 3) continue;
    const alpha = numbers[3] ?? 1;
    if (alpha > 0) layers.push([...numbers.slice(0, 3), alpha]);
    if (alpha === 1) break;
  }
  let color: RGB = [250, 248, 241];
  for (const layer of layers.reverse()) {
    color = color.map((channel, i) => layer[i] * layer[3] + channel * (1 - layer[3])) as RGB;
  }
  return color;
}

function imageColor(image: HTMLImageElement, x: number, y: number): RGB | null {
  if (!image.complete || !image.naturalWidth) return null;
  try {
    let thumbnail = thumbnails.get(image);
    if (!thumbnail) {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 64;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) return null;
      context.drawImage(image, 0, 0, 64, 64);
      thumbnail = context.getImageData(0, 0, 64, 64);
      thumbnails.set(image, thumbnail);
    }
    const rect = image.getBoundingClientRect();
    const style = getComputedStyle(image);
    let u = (x - rect.left) / rect.width;
    let v = (y - rect.top) / rect.height;
    if (style.objectFit === 'cover' || style.objectFit === 'contain') {
      const scale = (style.objectFit === 'cover' ? Math.max : Math.min)(rect.width / image.naturalWidth, rect.height / image.naturalHeight);
      const positions = style.objectPosition.split(' ');
      const fraction = (value: string) => value.endsWith('%') ? parseFloat(value) / 100 : .5;
      const offsetX = (rect.width - image.naturalWidth * scale) * fraction(positions[0]);
      const offsetY = (rect.height - image.naturalHeight * scale) * fraction(positions[1] || '50%');
      u = (x - rect.left - offsetX) / (image.naturalWidth * scale);
      v = (y - rect.top - offsetY) / (image.naturalHeight * scale);
    }
    if (u < 0 || u > 1 || v < 0 || v > 1) return null;
    const px = Math.min(63, Math.floor(u * 64));
    const py = Math.min(63, Math.floor(v * 64));
    const offset = (py * 64 + px) * 4;
    const alpha = thumbnail.data[offset + 3] / 255;
    const behind = background(image);
    return behind.map((channel, i) => thumbnail!.data[offset + i] * alpha + channel * (1 - alpha)) as RGB;
  } catch {
    // Images without same-origin pixel access still use their surrounding surface.
    return null;
  }
}

function luminance(color: RGB) {
  const linear = color.map(channel => {
    const value = channel / 255;
    return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
  });
  return linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
}

let scheduled = false;
function update() {
  scheduled = false;
  for (const control of controls) {
    const rect = control.getBoundingClientRect();
    if (!rect.width || !rect.height) continue;
    const insetX = Math.min(6, rect.width / 4);
    const insetY = Math.min(6, rect.height / 4);
    const points: Array<[number, number]> = [
      [rect.left + rect.width / 2, rect.top + rect.height / 2],
      [rect.left + insetX, rect.top + insetY],
      [rect.right - insetX, rect.top + insetY],
      [rect.left + insetX, rect.bottom - insetY],
      [rect.right - insetX, rect.bottom - insetY],
    ];
    const samples = points.flatMap(([x, y]) => {
      const underneath = document.elementsFromPoint(x, y).find(element => !element.closest('.music-dock, .back-to-top'));
      if (!underneath) return [];
      return [underneath instanceof HTMLImageElement ? imageColor(underneath, x, y) || background(underneath) : background(underneath)];
    });
    if (!samples.length) continue;
    // Choose the branded surface with the best worst-case contrast across the control.
    const light = luminance([250, 248, 241]);
    const dark = luminance([16, 35, 26]);
    const minimumContrast = (surfaceLum: number) => Math.min(...samples.map(color => {
      const surface = luminance(color);
      return (Math.max(surfaceLum, surface) + .05) / (Math.min(surfaceLum, surface) + .05);
    }));
    control.dataset.floatingTone = minimumContrast(light) > minimumContrast(dark) ? 'light' : 'dark';
  }
}
function schedule() {
  if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
}
if (controls.length) {
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  window.addEventListener('load', schedule);
  document.addEventListener('load', schedule, true);
  new ResizeObserver(schedule).observe(document.body);
  const observer = new MutationObserver(schedule);
  controls.forEach(control => observer.observe(control, { attributes: true, attributeFilter: ['hidden'] }));
  schedule();
}
export {};
