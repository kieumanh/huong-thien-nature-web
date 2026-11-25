(() => {
  const root = document.documentElement;
  // Hide the collapsed menu before first paint so the page does not jump when scripts load (layout shift).
  root.classList.add('js');
  const clock = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  });
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const systemDark = matchMedia('(prefers-color-scheme: dark)');
  // Living Zen theme preference: auto (Vietnam time, default), light, dark or system. Stored only in this browser.
  const KEY = 'htn:theme';
  const modes = ['auto', 'light', 'dark', 'system'];
  const readMode = () => { try { const m = localStorage.getItem(KEY); return modes.includes(m) ? m : 'auto'; } catch { return 'auto'; } };
  let mode = readMode();
  let timer;

  function syncSky(animate = true) {
    clearTimeout(timer);
    const [hour, minute] = clock.format(new Date()).split(':').map(Number);
    const minutes = hour * 60 + minute;
    const clockNight = minutes < 360 || minutes >= 1100;
    const night = mode === 'light' ? false : mode === 'dark' ? true : mode === 'system' ? systemDark.matches : clockNight;
    const twilight = mode !== 'auto' ? 0 : night
      ? Math.max(0, minutes < 360 ? (minutes - 300) / 60 : (1200 - minutes) / 100)
      : Math.max(0, (450 - minutes) / 90, (minutes - 1020) / 80);
    // Nature Rhythm phase for styling hooks: dawn 06:00–07:30, day, dusk 17:00–18:20, night.
    const phase = mode !== 'auto' ? (night ? 'night' : 'day')
      : night ? 'night' : minutes < 450 ? 'dawn' : minutes >= 1020 ? 'dusk' : 'day';
    const tone = night ? 'night' : 'day';
    const apply = () => {
      root.dataset.sky = tone;
      root.dataset.phase = phase;
      root.dataset.theme = mode;
      root.style.setProperty('--twilight', `${Math.round(twilight * 100)}%`);
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', night ? '#211b26' : (twilight > .5 ? '#f4e6e0' : '#faf8f1'));
    };
    const changingTone = root.dataset.sky && root.dataset.sky !== tone;
    if (animate && changingTone && !reducedMotion.matches && document.startViewTransition) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
    if (!document.hidden) timer = setTimeout(syncSky, 60_000 - Date.now() % 60_000);
  }

  window.htnTheme = {
    get: () => mode,
    set(next) {
      if (!modes.includes(next)) return;
      mode = next;
      try { next === 'auto' ? localStorage.removeItem(KEY) : localStorage.setItem(KEY, next); } catch { /* storage may be blocked */ }
      syncSky(true);
    },
  };
  systemDark.addEventListener?.('change', () => { if (mode === 'system') syncSky(true); });
  document.addEventListener('visibilitychange', () => syncSky(false));
  window.addEventListener('pageshow', () => syncSky(false));
  syncSky(false);
})();
