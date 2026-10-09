import { test } from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import ts from 'typescript';

const code = ts.transpile(fs.readFileSync('src/scripts/hybrid-nature.ts', 'utf8'), { target: ts.ScriptTarget.ES2022 });
function setup({ width = 1440, reduced = false, saveData = false, fine = true, observer = true } = {}) {
  const events = new Map();
  const classes = new Set();
  const properties = new Map();
  const media = new Map();
  const targets = [{
    classList: { add: key => classes.add(key) },
    style: { setProperty() {}, removeProperty() {} },
    setAttribute() {},
  }];
  const hero = { offsetHeight: 800, getBoundingClientRect: () => ({ top: -400, left: 0, width, height: 800 }), style: { setProperty: (k,v) => properties.set(k,v), removeProperty: k => properties.delete(k) }, addEventListener: (k,fn) => events.set(k,fn) };
  const window = { matchMedia(query) { const m = { matches: query.includes('min-width') ? width >= 761 : query.includes('pointer') ? fine : reduced, addEventListener: (_,fn) => { m.onchange = fn; } }; media.set(query,m); return m; }, addEventListener: (k,fn) => events.set(k,fn) };
  const observed = [];
  class IO { constructor(fn) { this.fn = fn; } observe(t) { observed.push(t); } unobserve() {} }
  if (observer) window.IntersectionObserver = IO;
  vm.runInNewContext(code, { window, document: { querySelector: () => ({ querySelectorAll: () => targets, querySelector: () => hero }), documentElement: { classList: { add: k => classes.add(k), remove: k => classes.delete(k), toggle: (k,on) => on ? classes.add(k) : classes.delete(k) } } }, navigator: { connection: { saveData } }, IntersectionObserver: IO, requestAnimationFrame: fn => fn() });
  return { events, classes, properties, media, observed };
}
test('desktop applies layered scroll and pointer motion', () => {
  const s = setup();
  assert.equal(s.properties.get('--hybrid-image-offset-y'), '32.5px');
  s.events.get('pointermove')({ clientX: 1440, clientY: 400 });
  assert.equal(s.properties.get('--hybrid-pointer-offset-x'), '9.0px');
  assert.equal(s.properties.get('--hybrid-foliage-offset-x'), '-17.0px');
});
test('tablet supports scroll motion without a fine pointer', () => {
  const s = setup({ width: 820, fine: false });
  assert.equal(s.properties.get('--hybrid-sun-offset-y'), '22.5px');
  s.events.get('pointermove')({ clientX: 800 });
  assert.equal(s.properties.has('--hybrid-pointer-offset-x'), false);
});
test('mobile disables parallax and keeps reveal enhancement', () => {
  const s = setup({ width: 390, fine: false });
  assert.equal(s.properties.size, 0);
  assert.equal(s.classes.has('hybrid-motion'), true);
});
test('responsive breakpoint changes clear and restore parallax', () => {
  const s = setup({ width: 390 });
  const m = s.media.get('(min-width: 761px)');
  m.matches = true; m.onchange();
  assert.equal(s.properties.get('--hybrid-image-offset-y'), '32.5px');
  m.matches = false; m.onchange();
  assert.equal(s.properties.size, 0);
});
test('reduced motion selected mid-session clears movement and reveals text', () => {
  const s = setup();
  const m = s.media.get('(prefers-reduced-motion: reduce)');
  m.matches = true; m.onchange();
  assert.equal(s.properties.size, 0);
  assert.equal(s.classes.has('hybrid-motion'), false);
  assert.equal(s.classes.has('hybrid-in-view'), true);
  s.events.get('pointermove')({ clientX: 1400 });
  assert.equal(s.properties.size, 0);
});
test('data saver disables animated layers and reveal hiding', () => {
  const s = setup({ saveData: true });
  assert.equal(s.properties.size, 0);
  assert.equal(s.classes.has('hybrid-data-saver'), true);
  assert.equal(s.classes.has('hybrid-motion'), false);
});
test('missing IntersectionObserver never hides content', () => {
  assert.equal(setup({ observer: false }).classes.has('hybrid-motion'), false);
});
