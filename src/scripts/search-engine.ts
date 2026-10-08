export type SearchRecord = { title: string; description: string; url: string; category: string; text: string };
export function normalizeSearch(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g,'d').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
}
export function searchRecords(records: SearchRecord[], query: string): SearchRecord[] {
  const words = [...new Set(normalizeSearch(query.slice(0,120)).split(' ').filter(Boolean))];
  if (!words.length) return [];
  return records.map((entry,index) => {
    const title=normalizeSearch(entry.title), summary=normalizeSearch(entry.description), text=normalizeSearch(entry.text+' '+entry.category);
    const all=title+' '+summary+' '+text;
    const score=words.every(word=>all.includes(word)) ? words.reduce((n,word)=>n+(title.includes(word)?10:0)+(summary.includes(word)?4:0)+(text.includes(word)?1:0),0) : 0;
    return {entry,index,score};
  }).filter(row=>row.score>0).sort((a,b)=>b.score-a.score||a.index-b.index).map(row=>row.entry);
}
