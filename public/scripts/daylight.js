(() => {
  const root = document.documentElement;
  const clock = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  });
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let timer;

  function syncSky(animate = true) {
    clearTimeout(timer);
    const [hour, minute] = clock.format(new Date()).split(':').map(Number);
    const minutes = hour * 60 + minute;
    const night = minutes < 360 || minutes >= 1100;
    const twilight = night
      ? Math.max(0, minutes < 360 ? (minutes - 300) / 60 : (1200 - minutes) / 100)
      : Math.max(0, (450 - minutes) / 90, (minutes - 1020) / 80);
    const tone = night ? 'night' : 'day';
    const apply = () => {
      root.dataset.sky = tone;
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

  document.addEventListener('visibilitychange', () => syncSky(false));
  window.addEventListener('pageshow', () => syncSky(false));
  syncSky(false);
})();
