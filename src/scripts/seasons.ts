const seasons = ['winter', 'spring', 'summer', 'autumn'] as const;
const minuteMs = 60_000;
const minutesPerSeason = 6 * 60;
const minutesPerDay = 24 * 60;
const vietnamOffsetMinutes = 7 * 60;

type Weather = 'snow' | 'snow-shower' | 'mild-sun' | 'drizzle' | 'heat' | 'heatwave' | 'downpour' | 'wind';

// One seed per Vietnamese calendar day and season keeps the scene consistent between pages.
function dailySeed(day: number, period: number) {
  const first = Math.imul(day + period * 2789, 0x45d9f3b);
  const second = Math.imul(first ^ (first >>> 16), 0x45d9f3b);
  return (second ^ (second >>> 16)) >>> 0;
}

export function seasonSceneAt(timestamp: number) {
  const localMinute = Math.floor(timestamp / minuteMs) + vietnamOffsetMinutes;
  const day = Math.floor(localMinute / minutesPerDay);
  const minuteOfDay = localMinute - day * minutesPerDay;
  const period = Math.floor(minuteOfDay / minutesPerSeason);
  const season = seasons[period];
  const minute = minuteOfDay % minutesPerSeason;
  const seed = dailySeed(day, period);
  const offset = seed >>> 8;
  const hotDay = seed % 100 < 26;
  let weather: Weather = 'wind';
  let shower: { weather: Weather; start: number; duration: number } | undefined;

  switch (season) {
    case 'winter':
      weather = 'snow';
      shower = { weather: 'snow-shower', start: 65 + offset % 165, duration: 18 + seed % 16 };
      break;
    case 'spring':
      weather = 'mild-sun';
      if (seed % 100 < 35) {
        shower = { weather: 'drizzle', start: 25 + offset % 275, duration: 9 + seed % 8 };
      }
      break;
    case 'summer':
      weather = hotDay ? 'heatwave' : 'heat';
      if (hotDay) {
        shower = { weather: 'downpour', start: 40 + offset % 205, duration: 4 + seed % 4 };
      }
      break;
  }

  let nextMinute = minutesPerSeason;
  if (shower) {
    const end = shower.start + shower.duration;
    if (minute < shower.start) {
      nextMinute = shower.start;
    } else if (minute < end) {
      weather = shower.weather;
      nextMinute = end;
    }
  }

  return { season, weather, nextChangeAt: (localMinute - minute + nextMinute - vietnamOffsetMinutes) * minuteMs };
}
