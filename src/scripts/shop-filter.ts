import { normalizeSearch } from './search-engine.ts';

export function matchesProduct(category: string, text: string, filter: string, query: string): boolean {
  const words = normalizeSearch(query.slice(0, 120)).split(' ').filter(Boolean);
  const searchable = normalizeSearch(text);
  return (filter === 'all' || category === filter) && words.every(word => searchable.includes(word));
}
