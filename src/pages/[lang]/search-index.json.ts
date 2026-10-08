import type { APIRoute } from 'astro';
import { languages, type Language } from '../../data/site';
import { buildSearchIndex } from '../../data/search';
export function getStaticPaths() { return languages.map(lang=>({params:{lang}})); }
export const GET: APIRoute = ({params}) => new Response(JSON.stringify(buildSearchIndex(params.lang as Language)),{headers:{'Content-Type':'application/json; charset=utf-8'}});
