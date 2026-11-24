// Topic filter for the journal: progressive enhancement (without JavaScript every article stays visible).
const group = document.querySelector<HTMLElement>('[data-journal-topics]');
const buttons = [...(group?.querySelectorAll<HTMLButtonElement>('button[data-topic]') ?? [])];
const cards = [...document.querySelectorAll<HTMLElement>('#journal-grid [data-journal-card]')];
const count = document.querySelector<HTMLElement>('[data-journal-count]');

if (group && buttons.length && cards.length && count) {
  const en = document.documentElement.lang === 'en';
  const unit = en ? 'articles' : 'bài đọc';
  const valid = new Set(buttons.map(button => button.dataset.topic));
  const apply = (topic: string, push: boolean) => {
    if (!valid.has(topic)) topic = 'all';
    let shown = 0;
    for (const card of cards) {
      const match = topic === 'all' || card.dataset.topic === topic;
      card.hidden = !match;
      if (match) shown += 1;
    }
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.topic === topic));
    count.textContent = topic === 'all' ? `${cards.length} ${unit}` : `${shown}/${cards.length} ${unit}`;
    if (push) {
      const url = new URL(location.href);
      if (topic === 'all') url.searchParams.delete('chu-de'); else url.searchParams.set('chu-de', topic);
      history.replaceState(null, '', url);
    }
  };
  group.addEventListener('click', event => {
    const button = (event.target as Element).closest<HTMLButtonElement>('button[data-topic]');
    if (button) apply(button.dataset.topic ?? 'all', true);
  });
  const initial = new URLSearchParams(location.search).get('chu-de');
  if (initial) apply(initial, false);
}
