export type SearchRecord = { title: string; description: string; url: string; category: string; text: string; product?: { image: string; imageAlt: string; price: number; priceLabel: string; unit: string; stock: 'in_stock' | 'out_of_stock' | 'unknown'; stockLabel: string } };
export function normalizeSearch(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g,'d').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
}
export function searchRecords(records: SearchRecord[], query: string): SearchRecord[] {
  const normalizedQuery = normalizeSearch(query.slice(0,120));
  const words = [...new Set(normalizedQuery.split(' ').filter(Boolean))];
  if (!words.length) return [];
  return records.map((entry,index) => {
    const title=normalizeSearch(entry.title), summary=normalizeSearch(entry.description), text=normalizeSearch(entry.text+' '+entry.category);
    const all=title+' '+summary+' '+text;
    if (!words.every(word=>all.includes(word))) return {entry,index,score:0};
    const titleScore=words.reduce((score,word)=>score+(title.includes(word)?10:0),0);
    const summaryScore=words.reduce((score,word)=>score+(summary.includes(word)?4:0),0);
    const bodyScore=words.reduce((score,word)=>score+(text.includes(word)?1:0),0);
    const phraseScore=normalizedQuery.length>0 && title.includes(normalizedQuery) ? 20 : 0;
    const titlePrefixScore=words.length>0 && title.startsWith(words[0]) ? 12 : 0;
    return {entry,index,score:titleScore+summaryScore+bodyScore+phraseScore+titlePrefixScore};
  }).filter(row=>row.score>0).sort((a,b)=>b.score-a.score||a.index-b.index).map(row=>row.entry);
}
