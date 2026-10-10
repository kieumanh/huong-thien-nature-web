import studio from "./studio-api-v7.mjs";
const headers={"Cache-Control":"public,max-age=60,stale-while-revalidate=60","Content-Type":"application/json; charset=utf-8","X-Content-Type-Options":"nosniff"};
const answer=(v,status=200)=>Response.json(v,{status,headers});
const allowed=(s)=>/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s||"");
export default {async fetch(request,env,ctx) {
  const url=new URL(request.url),p=url.pathname;
  if(request.method==="GET"&&p==="/api/public/journal"){
    const lang=url.searchParams.get("lang");
    const page=Number(url.searchParams.get("page")||1);
    const limit=Number(url.searchParams.get("limit")||50);
    if(!["vi","en"].includes(lang)||!Number.isInteger(page)||page<1||page>200||!Number.isInteger(limit)||limit<1||limit>50)return answer({error:"Invalid pagination"},400);
    try {
      const records=await env.DB.prepare("SELECT id,locale,slug,title,excerpt,category,cover_id,seo_title,seo_description,published_at,updated_at,'published' AS status FROM posts WHERE locale=? AND status='published' AND deleted_at IS NULL ORDER BY published_at DESC, id DESC LIMIT ? OFFSET ?").bind(lang,limit,(page-1)*limit).all();
      return answer({posts:records.results,page,limit});
    } catch(e){console.error("public journal list",String(e));return answer({error:"Service unavailable"},503)}
  }
  const m=p.match(/^\/api\/public\/journal\/(vi|en)\/([a-z0-9-]+)$/);
  if(request.method==="GET"&&m) {
    if(!allowed(m[2]))return answer({error:"Not found"},404);
    try {
      const article=await env.DB.prepare("SELECT id,locale,slug,title,excerpt,body,category,cover_id,seo_title,seo_description,published_at,updated_at,'published' AS status FROM posts WHERE locale=? AND slug=? AND status='published' AND deleted_at IS NULL LIMIT 1").bind(m[1],m[2]).first();
      return article?answer({post:article}):answer({error:"Not found"},404);
    }catch(e){console.error("public journal detail",String(e));return answer({error:"Service unavailable"},503)}
  }
  return studio.fetch(request,env,ctx);
}};
