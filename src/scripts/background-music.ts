const audio = document.querySelector<HTMLAudioElement>('#background-music');
const toggle = document.querySelector<HTMLButtonElement>('.music-toggle');
const slider = document.querySelector<HTMLInputElement>('#music-volume');
const output = document.querySelector<HTMLOutputElement>('#music-volume-value');
const musicStatus = document.querySelector<HTMLElement>('.music-status');

if (audio && toggle && slider && output && musicStatus) {
  const en = toggle.dataset.language === 'en';
  const preferenceKey = 'htn-background-music-v1';
  const positionKey = 'htn-lotus-position-v1';
  let enabled = true;
  let volume = .25;
  let blocked = false;
  let lastSaved = 0;
  try {
    const saved = JSON.parse(localStorage.getItem(preferenceKey) || 'null') as { enabled?: unknown; volume?: unknown } | null;
    if (saved && typeof saved.enabled === 'boolean') enabled = saved.enabled;
    if (saved && typeof saved.volume === 'number' && Number.isFinite(saved.volume)) volume = Math.min(1, Math.max(0, saved.volume));
  } catch { /* Playback still works when browser storage is unavailable. */ }
  audio.volume = volume;
  slider.value = String(Math.round(volume * 100));
  output.value = `${slider.value}%`;
  const savePreference = () => {
    try { localStorage.setItem(preferenceKey, JSON.stringify({ enabled, volume })); } catch { /* Optional persistence. */ }
  };
  const savePosition = () => {
    try { sessionStorage.setItem(positionKey, String(audio.currentTime)); } catch { /* Optional persistence. */ }
  };
  const update = () => {
    const playing = !audio.paused && !audio.ended;
    toggle.setAttribute('aria-pressed', String(playing));
    toggle.title = playing ? (en ? 'Pause background music' : 'Dừng nhạc nền') : (en ? 'Play background music' : 'Phát nhạc nền');
    toggle.setAttribute('aria-label', toggle.title);
  };
  const removeGestureListeners = () => {
    document.removeEventListener('pointerdown', onGesture);
    document.removeEventListener('keydown', onGesture);
  };
  const play = async () => {
    if (!enabled) return;
    try {
      await audio.play();
      if (!enabled) { audio.pause(); return; }
      blocked = false;
      removeGestureListeners();
      musicStatus.textContent = en ? 'Playing. You can pause or adjust the volume at any time.' : 'Đang phát. Bạn có thể dừng hoặc chỉnh âm lượng bất cứ lúc nào.';
    } catch (error) {
      if (!enabled) return;
      blocked = error instanceof DOMException && error.name === 'NotAllowedError';
      musicStatus.textContent = blocked
        ? (en ? 'Music will start after your first interaction, or press Play.' : 'Nhạc sẽ phát sau tương tác đầu tiên, hoặc nhấn nút phát nhạc.')
        : (en ? 'Music could not load. Press Play to try again.' : 'Chưa tải được nhạc. Nhấn nút phát để thử lại.');
      if (blocked) {
        document.addEventListener('pointerdown', onGesture);
        document.addEventListener('keydown', onGesture);
      }
    }
    update();
  };
  function onGesture(event: Event) {
    if (!enabled || !blocked || !event.isTrusted) return;
    if (event.target instanceof Element && event.target.closest('.music-dock')) return;
    if (event instanceof KeyboardEvent && !['Enter', ' '].includes(event.key)) return;
    void play();
  }
  toggle.addEventListener('click', () => {
    if (!audio.paused) {
      enabled = false;
      blocked = false;
      audio.pause();
      removeGestureListeners();
      savePosition();
      musicStatus.textContent = en ? 'Music paused. Your choice is remembered.' : 'Đã dừng nhạc. Lựa chọn của bạn được ghi nhớ.';
    } else {
      enabled = true;
      void play();
    }
    savePreference();
    update();
  });
  slider.addEventListener('input', () => {
    volume = Number(slider.value) / 100;
    audio.volume = volume;
    output.value = `${slider.value}%`;
    savePreference();
  });
  audio.addEventListener('play', update);
  audio.addEventListener('pause', update);
  audio.addEventListener('timeupdate', () => {
    if (Date.now() - lastSaved > 5000) { savePosition(); lastSaved = Date.now(); }
  });
  audio.addEventListener('loadedmetadata', () => {
    try {
      const position = Number(sessionStorage.getItem(positionKey));
      if (Number.isFinite(position) && position > 0 && position < audio.duration) audio.currentTime = position;
    } catch { /* A new visit starts at the beginning. */ }
  });
  window.addEventListener('pagehide', savePosition);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') document.querySelector<HTMLDetailsElement>('.music-options')?.removeAttribute('open');
  });
  document.addEventListener('click', event => {
    if (event.target instanceof Element && !event.target.closest('.music-dock')) document.querySelector<HTMLDetailsElement>('.music-options')?.removeAttribute('open');
  });
  toggle.disabled = false;
  update();
  if (enabled) void play();
  else musicStatus.textContent = en ? 'Music paused. Press Play to turn it on.' : 'Nhạc đang tắt. Nhấn nút phát để bật lại.';
}

export {};
