const seasons = ['spring', 'summer', 'autumn', 'winter'] as const;
const hourMs = 3_600_000;
const vietnamOffsetHours = 7;

export function seasonAt(timestamp: number) {
  const vietnamHour = new Date(timestamp + vietnamOffsetHours * hourMs).getUTCHours();
  return seasons[vietnamHour % seasons.length];
}

export function timeUntilNextHour(timestamp: number) {
  return hourMs - timestamp % hourMs;
}
