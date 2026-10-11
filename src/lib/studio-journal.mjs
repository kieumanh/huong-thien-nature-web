// Hương Thiền Nature — live Studio journal adapter.
// Read-only service binding: only published content from the Studio public API.
const ORIGIN = "https://huongthiennature.com";
const STUDIO = "https://studio.huongthiennature.com";
const IMAGE_FALLBACK = "/media/practice-cushion-v2.webp";
const HEAD = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};
const escape = (value) => String(value ?? "").replace(/[&<>"']/g,
  char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const validSlug = (s) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(s || ""));
const validImageId = (s) => /^[a-f0-9-]{36}$/.test(String(s || ""));
const articlePath = (post) => "/" + post.locale + "/" + (post.locale === "vi" ? "tan-van" : "journal") + "/" + post.slug + "/";
const imgPath = (post) => validImageId(post.cover_id) ? STUDIO + "/media/" + post.cover_id : IMAGE_FALLBACK;
const iso = (v) => v ? String(v).replace(" ", "T") : undefined;
function rewriteMedia(src) {
  return src.replace(/!\[([^\]]*)\]\(\/media\/([a-f0-9-]{36})\)/g,
    (_, alt, id) => '<img loading="lazy" src="' + STUDIO + '/media/' + id + '" alt="' + alt + '">');
}
function inline(v) {
  return rewriteMedia(escape(v)
    .replace(/\[([^\]]{1,150})\]\((https?:\/\/[^\s<>()]{1,1000})\)/g,
      (_, label, url) => '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + label + '</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>"));
}
export function renderStudioMarkdown(raw) {
  const lines = String(raw || "").split(/\r?\n/);
  const out = []; let bullets = [];
  const flush = () => { if(bullets.length) {out.push("<ul>"+bullets.map(x=>"<li>"+inline(x)+"</li>").join("")+"</ul>");bullets=[];} };
  for(const line of lines) {
    const text=line.trim();
    if(text.startsWith("- ")) {bullets.push(text.slice(2));continue;}
    flush();
    if(!text) continue;
    if(text==="---") {out.push("<hr>");continue;}
    if(text.startsWith("### "))out.push("<h3>"+inline(text.slice(4))+"</h3>");
    else if(text.startsWith("## "))out.push("<h2>"+inline(text.slice(3))+"</h2>");
    else if(text.startsWith("# "))out.push("<h2>"+inline(text.slice(2))+"</h2>");
    else if(text.startsWith("> "))out.push("<blockquote><p>"+inline(text.slice(2))+"</p></blockquote>");
    else out.push("<p>"+inline(text)+"</p>");
  }
  flush(); return out.join("\n");
}
function requestToSite(request, env) {
  const url=new URL(request.url);url.protocol="https:";url.host="huongthiennature.com";
  const req=new Request(url.toString(), request);
  return env.SITE ? env.SITE.fetch(req) : env.ASSETS.fetch(req);
}
async function studioGet(env, path) {
  const response = await env.STUDIO.fetch(new Request(STUDIO+path, { method:"GET", headers:{"Accept":"application/json"} }));
  if(!response.ok) throw new Error("Studio journal API HTTP "+response.status);
  return response.json();
}
async function listing(env, lang) {
  const posts=[];
  for(let page=1;page<=10;page++){
    const data=await studioGet(env, "/api/public/journal?lang="+lang+"&page="+page+"&limit=50");
    const rows=Array.isArray(data.posts)?data.posts:[];
    for (const p of rows) if (p.locale===lang && validSlug(p.slug) && p.status==="published") posts.push(p);
    if(rows.length<50) break;
  }
  return posts;
}
const cmsCard = (p, lang) => {
 const href=articlePath(p);
 const description=String(p.excerpt||"").slice(0,300);
 const title=String(p.title||"");
 const cover=imgPath(p);
 const category=String(p.category|| (lang==="vi"?"Tản văn":"Journal"));
 const words=Number(p.word_count||0);
 const minutes=Math.max(1,Math.ceil(words/180));
 const label=lang==="vi"?"Đọc tản văn":"Read article";
 return '<article class="journal-card" data-source="studio">'+
 '<a class="journal-image" href="'+escape(href)+'" tabindex="-1" aria-hidden="true"><img src="'+escape(cover)+'" alt="" width="720" height="540" loading="lazy"></a>'+
 '<div class="journal-card-copy"><div class="article-meta"><span>'+escape(category)+'</span><span>'+minutes+' '+(lang==="vi"?"phút đọc":"min read")+'</span></div>'+
 '<h2><a href="'+escape(href)+'">'+escape(title)+'</a></h2><p>'+escape(description)+'</p>'+
 '<a class="quiet-link" href="'+escape(href)+'">'+label+' →</a></div></article>';
};
function withHeaders(response, staging, extra={}) {
  const headers=new Headers(response.headers);
  if(staging) headers.set("X-Robots-Tag","noindex, nofollow, noarchive");
  for(const [k,v] of Object.entries(extra)) headers.set(k,v);
  return new Response(response.body,{status:response.status,headers});
}
async function listPage(request, env, lang, staging) {
  const page=await requestToSite(request,env);
  if(!page.ok || !(page.headers.get("Content-Type")||"").includes("text/html")) return withHeaders(page,staging);
  let posts;
  try { posts=await listing(env,lang); }
  catch(e){console.error("Studio journal listing",String(e));return withHeaders(page,staging,{"X-Studio-Feed":"unavailable"});}
  const original=await page.text();
  // Existing Astro article links take precedence: do not duplicate or override hand-crafted Roots articles.
  posts=posts.filter(p=> !original.includes('href="'+articlePath(p)+'"'));
  const baseCount=(original.match(/class="journal-card"/g)||[]).length;
  const cards=posts.map(p=>cmsCard(p,lang)).join("\n");
  const transformer=new HTMLRewriter()
    .on(".journal-grid",{element(e){e.append(cards,{html:true});}})
    .on(".journal-count",{element(e){e.setInnerContent(String(baseCount+posts.length)+" "+(lang==="vi"?"bài viết để khám phá":"articles to explore"));}});
  const result=transformer.transform(new Response(original,{status:page.status,headers:page.headers}));
  return withHeaders(result,staging,{"Cache-Control":"public, max-age=60","X-Studio-Posts":String(posts.length)});
}
function detailHtml(post,lang) {
 const title=escape(post.title);
 const excerpt=escape(post.excerpt||"");
 const cover=imgPath(post);
 const category=escape(post.category||(lang==="vi"?"Tản văn":"Journal"));
 const back=lang==="vi"?"/vi/tan-van/":"/en/journal/";
 return '<article class="article-page" data-source="studio"><header class="article-header shell">'+
 '<nav class="breadcrumbs"><a href="/'+lang+'/">'+(lang==="vi"?"Trang chủ":"Home")+'</a><span aria-hidden="true">/</span><a href="'+back+'">'+(lang==="vi"?"Tản văn":"Journal")+'</a></nav>'+
 '<div class="article-meta"><span>'+category+'</span></div><h1>'+title+'</h1><p class="lead">'+excerpt+'</p></header>'+
 '<figure class="shell article-cover"><img src="'+escape(cover)+'" alt="'+title+'" width="1200" height="800" fetchpriority="high"></figure>'+
 '<div class="article-body"><div class="studio-article-content">'+renderStudioMarkdown(post.body)+'</div>'+
 '<p style="margin-top:45px"><a class="quiet-link" href="'+back+'">← '+(lang==="vi"?"Trở về Tản văn":"Back to Journal")+'</a></p></div></article>';
}
async function detailPage(request,env,lang,slug,staging){
  // Existing static pages take priority and retain their exact original HTML and SEO.
  const staticResponse=await requestToSite(request,env);
  if(staticResponse.ok) return withHeaders(staticResponse,staging);
  let post;
  try {
    const data=await studioGet(env,"/api/public/journal/"+lang+"/"+slug);
    post=data.post;
  } catch(e) {
    if(String(e).includes("HTTP 404")) return withHeaders(staticResponse,staging);
    console.error("Studio journal article",String(e));return withHeaders(staticResponse,staging);
  }
  if(!post||post.status!=="published"||post.locale!==lang||post.slug!==slug)return withHeaders(staticResponse,staging);
  const shell=await requestToSite(new Request(new URL((lang==="vi"?"/vi/tan-van/":"/en/journal/"),ORIGIN)),env);
  if(!shell.ok) return withHeaders(staticResponse,staging);
  const html=await shell.text();
  const title=String(post.seo_title||post.title)+" | Hương Thiền Nature";
  const desc=String(post.seo_description||post.excerpt||"").slice(0,320);
  const canonical=ORIGIN+articlePath(post);
  const image=new URL(imgPath(post),ORIGIN).href;
  const schema={"@context":"https://schema.org","@type":"BlogPosting",headline:post.title,description:desc,inLanguage:lang,
    mainEntityOfPage:canonical,image, datePublished:iso(post.published_at),dateModified:iso(post.updated_at),
    publisher:{"@type":"Organization",name:"Hương Thiền Nature",url:ORIGIN}};
  const json=JSON.stringify(schema).replace(/</g,"\\u003c");
  const rewriter=new HTMLRewriter()
    .on("title",{element(e){e.setInnerContent(title);}})
    .on("meta[name='description']",{element(e){e.setAttribute("content",desc)}})
    .on("link[rel='canonical']",{element(e){e.setAttribute("href",canonical)}})
    .on("meta[property='og:title']",{element(e){e.setAttribute("content",title)}})
    .on("meta[property='og:description']",{element(e){e.setAttribute("content",desc)}})
    .on("meta[property='og:url']",{element(e){e.setAttribute("content",canonical)}})
    .on("meta[property='og:image']",{element(e){e.setAttribute("content",image)}})
    .on("meta[property='og:type']",{element(e){e.setAttribute("content","article")}})
    .on("meta[name='twitter:title']",{element(e){e.setAttribute("content",title)}})
    .on("meta[name='twitter:description']",{element(e){e.setAttribute("content",desc)}})
    .on("meta[name='twitter:image']",{element(e){e.setAttribute("content",image)}})
    .on("main#main-content",{element(e){e.setAttribute("class","journal-dynamic-article");e.setInnerContent(detailHtml(post,lang),{html:true})}})
    .on("head",{element(e){e.append('<script type="application/ld+json">'+json+'</script>',{html:true})}});
  const result=rewriter.transform(new Response(html,{headers:shell.headers}));
  return withHeaders(result,staging,{"Cache-Control":"public,max-age=60","Content-Type":"text/html; charset=utf-8"});
}
async function sitemap(request,env,staging){
 const page=await requestToSite(request,env);
 if(!page.ok) return withHeaders(page,staging);
 try{
   const [vi,en]=await Promise.all([listing(env,"vi"),listing(env,"en")]);
   const original=await page.text();
   const all=[...vi,...en].filter(p=>!original.includes("<loc>"+ORIGIN+articlePath(p)+"</loc>"));
   const urls=all.map(p=>"<url><loc>"+escape(ORIGIN+articlePath(p))+"</loc><lastmod>"+escape(String(p.updated_at||p.published_at||"").slice(0,10))+"</lastmod></url>").join("\n");
   return withHeaders(new Response(original.replace("</urlset>",urls+"\n</urlset>"),{status:page.status,headers:page.headers}),staging,{"Content-Type":"application/xml; charset=utf-8","Cache-Control":"public,max-age=300"});
 }catch(e){console.error("Studio sitemap",String(e));return withHeaders(page,staging);}
}
export async function handleNatureJournal(request,env,ctx,{staging=false}={}){
  const path=new URL(request.url).pathname;
  if(request.method!=="GET"&&request.method!=="HEAD") return withHeaders(await requestToSite(request,env),staging);
  if(path==="/vi/tan-van/"||path==="/en/journal/")return listPage(request,env,path.startsWith("/vi/")?"vi":"en",staging);
  const m=path.match(/^\/(vi\/tan-van|en\/journal)\/([a-z0-9-]+)\/?$/);
  if(m)return detailPage(request,env,m[1].startsWith("vi")?"vi":"en",m[2],staging);
  if(path==="/sitemap.xml")return sitemap(request,env,staging);
  return withHeaders(await requestToSite(request,env),staging);
}
