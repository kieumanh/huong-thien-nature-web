import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const code = ts.transpile(fs.readFileSync('src/scripts/ecosystem-orbit.ts', 'utf8'), { target: ts.ScriptTarget.ES2022 });
function setup({ reduced = false, saveData = false, observer = true } = {}) {
  const classes = new Set(), events = {}, attributes = {};
  const button = { hidden: true, dataset: { pause: 'Pause', resume: 'Resume' }, setAttribute(k, v) { attributes[k] = v; }, addEventListener(k, fn) { events[k] = fn; } };
  const scene = { querySelector: () => button, classList: { toggle: (k, on) => on ? classes.add(k) : classes.delete(k) } };
  const document = { hidden: false, querySelectorAll: () => [scene], addEventListener(k, fn) { events[k] = fn; } };
  const media = { matches: reduced, addEventListener(_k, fn) { events.media = fn; } };
  let callback;
  class IO { constructor(fn) { callback = fn; } observe() {} }
  vm.runInNewContext(code, { document, navigator: { connection: { saveData } }, matchMedia: () => media, window: observer ? { IntersectionObserver: IO } : {}, IntersectionObserver: IO });
  return { classes, button, events, attributes, document, media, visible: on => callback([{ isIntersecting: on }]) };
}
test('runs only on screen and stops when the page is hidden', () => {
  const s = setup(); assert(!s.classes.has('ecosystem-active'));
  s.visible(true); assert(s.classes.has('ecosystem-active'));
  s.document.hidden = true; s.events.visibilitychange(); assert(!s.classes.has('ecosystem-active'));
  s.document.hidden = false; s.events.visibilitychange(); assert(s.classes.has('ecosystem-active'));
  s.visible(false); assert(!s.classes.has('ecosystem-active'));
});
test('manual pause persists through visibility changes and resumes on request', () => {
  const s = setup(); s.visible(true); s.events.click();
  assert.equal(s.attributes['aria-pressed'], 'true'); assert.equal(s.button.textContent, 'Resume');
  s.visible(false); s.visible(true); assert(!s.classes.has('ecosystem-active'));
  s.events.click(); assert(s.classes.has('ecosystem-active'));
});
test('reduced motion selected mid-session stops animation', () => {
  const s = setup(); s.visible(true); s.media.matches = true; s.events.media();
  assert(!s.classes.has('ecosystem-active')); assert(s.button.hidden);
});
test('data saver and unavailable observer keep the diagram static', () => {
  for (const options of [{ saveData: true }, { reduced: true }, { observer: false }]) {
    const s = setup(options); assert(!s.classes.has('ecosystem-active')); assert(s.button.hidden);
  }
});
