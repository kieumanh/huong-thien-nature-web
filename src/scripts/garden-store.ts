// "Khu vườn của tôi": saved articles, reading history and reading preferences.
// Everything lives in this browser's localStorage. There is no account and nothing is sent to a server.
// Every call is wrapped so a blocked or full storage never breaks reading.

export type Visit = { at: number; pct: number };
export type Garden = { saved: string[]; history: Record<string, Visit> };
export type ReadingPrefs = { size: number; theme: 'light' | 'ivory' | 'dim' };

export const GARDEN_KEY = 'htn:garden:v1';
export const PREFS_KEY = 'htn:reading:v1';
export const GARDEN_EVENT = 'htn:garden-change';
const LIMIT = 200;
const SLUG = /^[a-z0-9-]{1,80}$/;

export const sizeSteps = [0.92, 1, 1.12, 1.26, 1.42] as const;
export const defaultPrefs: ReadingPrefs = { size: 1, theme: 'ivory' };

function load(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function announce() {
  window.dispatchEvent(new CustomEvent(GARDEN_EVENT));
}

export function loadGarden(): Garden {
  const data = load(GARDEN_KEY) as Partial<Garden> | null;
  const saved = Array.isArray(data?.saved) ? data.saved.filter((slug): slug is string => typeof slug === 'string' && SLUG.test(slug)) : [];
  const history: Garden['history'] = {};
  if (data?.history && typeof data.history === 'object') {
    for (const [slug, visit] of Object.entries(data.history)) {
      const v = visit as Partial<Visit>;
      if (SLUG.test(slug) && typeof v?.at === 'number' && typeof v?.pct === 'number') history[slug] = { at: v.at, pct: Math.max(0, Math.min(100, Math.round(v.pct))) };
    }
  }
  return { saved: [...new Set(saved)].slice(0, LIMIT), history };
}

function persist(garden: Garden) {
  const entries = Object.entries(garden.history).sort((a, b) => b[1].at - a[1].at).slice(0, LIMIT);
  save(GARDEN_KEY, { saved: garden.saved.slice(0, LIMIT), history: Object.fromEntries(entries) });
  announce();
}

export const isSaved = (slug: string) => loadGarden().saved.includes(slug);

/** Returns true when the article is saved after the call. */
export function toggleSaved(slug: string): boolean {
  const garden = loadGarden();
  const saved = !garden.saved.includes(slug);
  garden.saved = saved ? [slug, ...garden.saved] : garden.saved.filter(item => item !== slug);
  persist(garden);
  return saved;
}

/** Remember how far the reader got. Progress never moves backwards unless the article is read again from the top. */
export function recordProgress(slug: string, pct: number) {
  if (!SLUG.test(slug)) return;
  const garden = loadGarden();
  const value = Math.max(0, Math.min(100, Math.round(pct)));
  const previous = garden.history[slug];
  garden.history[slug] = { at: Date.now(), pct: previous && value < previous.pct && previous.pct >= 98 ? previous.pct : value };
  persist(garden);
}

export const clearHistory = () => { const garden = loadGarden(); garden.history = {}; persist(garden); };

/** Removes everything this site stored on the device: saved articles, history and reading preferences. */
export function clearAll() {
  try {
    localStorage.removeItem(GARDEN_KEY);
    localStorage.removeItem(PREFS_KEY);
  } catch { /* storage unavailable: nothing to clear */ }
  announce();
}

/** The article the reader was in the middle of: started, not finished, most recent first. */
export function unfinished(garden: Garden = loadGarden()): string | undefined {
  return Object.entries(garden.history).filter(([, visit]) => visit.pct >= 4 && visit.pct < 96).sort((a, b) => b[1].at - a[1].at)[0]?.[0];
}

export function loadPrefs(): ReadingPrefs {
  const data = load(PREFS_KEY) as Partial<ReadingPrefs> | null;
  const size = typeof data?.size === 'number' && data.size >= 0 && data.size < sizeSteps.length ? Math.round(data.size) : defaultPrefs.size;
  const theme = data?.theme === 'light' || data?.theme === 'dim' || data?.theme === 'ivory' ? data.theme : defaultPrefs.theme;
  return { size, theme };
}
export const savePrefs = (prefs: ReadingPrefs) => save(PREFS_KEY, prefs);

/** Calls back when the garden changes here or in another tab. */
export function onGardenChange(callback: () => void) {
  window.addEventListener(GARDEN_EVENT, callback);
  window.addEventListener('storage', event => { if (event.key === GARDEN_KEY || event.key === null) callback(); });
}
