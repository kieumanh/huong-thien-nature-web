import { searchRecords, type SearchRecord } from './search-engine';
const root=document.querySelector<HTMLElement>('[data-search-page]');
if(root) {
  const en=root.dataset.language==='en', lang=en?'en':'vi';
  const input=document.querySelector<HTMLInputElement>('#search-query')!;
  const status=document.querySelector<HTMLElement>('#search-status')!;
  const list=document.querySelector<HTMLElement>('#search-results')!;
  const query=(new URLSearchParams(location.search).get('q')||'').slice(0,120).trim();
  input.value=query;
  document.querySelectorAll<HTMLAnchorElement>('.language a[href]').forEach(link=>{const url=new URL(link.href);if(query)url.searchParams.set('q',query);link.href=url.href;});
  if(query) {
    status.textContent=en?'Searching…':'Đang tìm kiếm…';
    fetch(`/${lang}/search-index.json`, { signal: AbortSignal.timeout(15000) }).then(async response=>{
      if(!response.ok)throw new Error('index unavailable');
      const entries=await response.json() as SearchRecord[];
      const results=searchRecords(entries,query);
      status.textContent=results.length ? (en?`${results.length} results for “${query}”`:`${results.length} kết quả cho “${query}”`) : (en?'No results. Try fewer words or a different keyword.':'Chưa có kết quả. Bạn thử ít từ hơn hoặc một từ khóa khác nhé.');
      for(const entry of results) {
        if(!entry.url.startsWith(`/${lang}/`))continue;
        const card=document.createElement('article');card.className='search-result';
        const category=document.createElement('p');category.className='eyebrow';category.textContent=entry.category;
        const heading=document.createElement('h2'),link=document.createElement('a');link.href=entry.url;link.textContent=entry.title;heading.append(link);
        const description=document.createElement('p');description.textContent=entry.description;
        card.append(category,heading,description);list.append(card);
      }
    }).catch(()=>{status.textContent=en?'Search could not load. Please refresh and try again.':'Chưa tải được dữ liệu tìm kiếm. Vui lòng tải lại trang và thử lại.';});
  }
}
