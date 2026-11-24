import assert from 'node:assert/strict';
import test from 'node:test';

// "Khu vườn của tôi" keeps everything in localStorage on this device. These tests run the store against a fake storage.
class FakeStorage {
  data = new Map<string, string>();
  failWrites = false;
  getItem(key: string) { return this.data.get(key) ?? null; }
  setItem(key: string, value: string) { if (this.failWrites) throw new Error('QuotaExceededError'); this.data.set(key, value); }
  removeItem(key: string) { this.data.delete(key); }
}
const storage = new FakeStorage();
const events: string[] = [];
Object.assign(globalThis, {
  localStorage: storage,
  window: { dispatchEvent: (event: { type: string }) => { events.push(event.type); return true; }, addEventListener: () => {} },
});
const store = await import('../src/scripts/garden-store.ts');

const reset = () => { storage.data.clear(); storage.failWrites = false; events.length = 0; };

test('saving toggles an article and announces the change', () => {
  reset();
  assert.equal(store.isSaved('gentle-boundaries'), false);
  assert.equal(store.toggleSaved('gentle-boundaries'), true);
  assert.equal(store.toggleSaved('wandering-mind'), true);
  assert.deepEqual(store.loadGarden().saved, ['wandering-mind', 'gentle-boundaries'], 'newest first');
  assert.equal(store.toggleSaved('gentle-boundaries'), false);
  assert.deepEqual(store.loadGarden().saved, ['wandering-mind']);
  assert.ok(events.length >= 3 && events.every(type => type === store.GARDEN_EVENT));
});

test('reading progress is clamped, keeps the latest place and never un-finishes an article', () => {
  reset();
  store.recordProgress('wandering-mind', 42.4);
  assert.equal(store.loadGarden().history['wandering-mind'].pct, 42);
  store.recordProgress('wandering-mind', 300);
  assert.equal(store.loadGarden().history['wandering-mind'].pct, 100);
  store.recordProgress('wandering-mind', 10);
  assert.equal(store.loadGarden().history['wandering-mind'].pct, 100, 'a finished article stays finished');
  store.recordProgress('Not A Slug!', 50);
  assert.equal(Object.keys(store.loadGarden().history).length, 1, 'invalid ids are ignored');
});

test('"continue reading" is the most recent article that is started but not finished', () => {
  reset();
  store.recordProgress('meditation-habit', 1);
  assert.equal(store.unfinished(), undefined, 'merely opened is not started');
  store.recordProgress('meditation-habit', 30);
  store.recordProgress('what-is-meditation', 99);
  assert.equal(store.unfinished(), 'meditation-habit');
  const garden = store.loadGarden();
  garden.history['gentle-boundaries'] = { at: Date.now() + 1000, pct: 60 };
  assert.equal(store.unfinished(garden), 'gentle-boundaries', 'the most recent one wins');
});

test('history can be cleared without touching saved articles, and everything can be cleared', () => {
  reset();
  store.toggleSaved('seven-layers');
  store.recordProgress('seven-layers', 50);
  store.savePrefs({ size: 3, theme: 'dim' });
  store.clearHistory();
  assert.deepEqual(store.loadGarden(), { saved: ['seven-layers'], history: {} });
  store.clearAll();
  assert.equal(storage.getItem(store.GARDEN_KEY), null);
  assert.equal(storage.getItem(store.PREFS_KEY), null);
  assert.deepEqual(store.loadGarden(), { saved: [], history: {} });
  assert.deepEqual(store.loadPrefs(), store.defaultPrefs);
});

test('reading preferences are validated, and corrupt or hostile storage falls back safely', () => {
  reset();
  store.savePrefs({ size: 4, theme: 'dim' });
  assert.deepEqual(store.loadPrefs(), { size: 4, theme: 'dim' });
  storage.setItem(store.PREFS_KEY, JSON.stringify({ size: 99, theme: '<script>' }));
  assert.deepEqual(store.loadPrefs(), store.defaultPrefs);
  storage.setItem(store.GARDEN_KEY, '{not json');
  assert.deepEqual(store.loadGarden(), { saved: [], history: {} });
  storage.setItem(store.GARDEN_KEY, JSON.stringify({ saved: ['ok-slug', 7, '../etc/passwd', 'ok-slug'], history: { 'a-b': { at: 1, pct: 250 }, 'bad slug': { at: 1, pct: 5 }, 'c-d': 'x' } }));
  assert.deepEqual(store.loadGarden(), { saved: ['ok-slug'], history: { 'a-b': { at: 1, pct: 100 } } });
});

test('a blocked or full storage never throws', () => {
  reset();
  storage.failWrites = true;
  assert.doesNotThrow(() => { store.toggleSaved('wandering-mind'); store.recordProgress('wandering-mind', 20); store.savePrefs(store.defaultPrefs); store.clearAll(); });
  assert.equal(store.isSaved('wandering-mind'), false, 'nothing was stored, and the interface can tell');
});

test('the store sends nothing anywhere: no network calls in the module', async () => {
  const { readFileSync } = await import('node:fs');
  const source = readFileSync(new URL('../src/scripts/garden-store.ts', import.meta.url), 'utf8');
  assert.ok(!/fetch\(|XMLHttpRequest|sendBeacon|WebSocket|indexedDB|document\.cookie/.test(source));
});
