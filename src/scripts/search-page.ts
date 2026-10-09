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
        const content=document.createElement('div');content.className='search-result-content';
        content.append(category,heading,description);
        if(entry.product && entry.product.image.startsWith('/media/shop/')) {
          card.classList.add('search-result--product');
          const photoLink=document.createElement('a');photoLink.href=entry.url;photoLink.className='search-result-photo';
          const image=document.createElement('img');image.src=entry.product.image;image.alt=entry.product.imageAlt;image.loading='lazy';image.decoding='async';image.width=240;image.height=240;
          photoLink.append(image);card.append(photoLink);
          const unit=document.createElement('p');unit.className='search-product-unit';unit.textContent=entry.product.unit;
          const price=document.createElement('p');price.className='search-product-price';price.textContent=`${en?'Demo price':'Giá tham khảo'}: ${entry.product.priceLabel}`;
          const stock=document.createElement('p');stock.className='product-stock';stock.dataset.stock=entry.product.stock;stock.textContent=entry.product.stockLabel;
          const detail=document.createElement('a');detail.className='quiet-link';detail.href=entry.url;detail.textContent=en?'View product →':'Xem sản phẩm →';
          content.append(unit,price,stock,detail);
        }
        card.append(content);list.append(card);
      }
    }).catch(()=>{status.textContent=en?'Search could not load. Please refresh and try again.':'Chưa tải được dữ liệu tìm kiếm. Vui lòng tải lại trang và thử lại.';});
  }
}
