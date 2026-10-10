import studio from "./studio-api-journal.mjs";
import {applyNatureBrand} from "./studio-nature-theme.mjs";
import {exportBundle} from "./studio-docx-export.mjs";
const json=(v,s=200)=>Response.json(v,{status:s,headers:{"Cache-Control":"private,no-store"}});
const tohex=bytes=>[...new Uint8Array(bytes)].map(x=>x.toString(16).padStart(2,"0")).join("");
async function userFor(req,env){const m=(req.headers.get("cookie")||"").match(/(?:^|;\s*)ht_blog_session=([0-9a-f]{64})/);if(!m)return null;const token=tohex(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(m[1])));return env.DB.prepare("SELECT u.id,u.role FROM sessions s JOIN users u ON s.user_id=u.id WHERE s.token_hash=? AND s.expires_at>datetime('now')").bind(token).first()}
async function stats(env){
 const [daily,top]=await Promise.all([
 env.DB.prepare("SELECT day,source,SUM(views) AS views FROM (SELECT day,'studio' source,views FROM post_daily_views UNION ALL SELECT day,source,views FROM post_daily_view_sources) WHERE day >= date('now','-89 days') GROUP BY day,source ORDER BY day").all(),
 env.DB.prepare("SELECT p.id,p.slug,p.locale,p.title,p.status,COALESCE(s.studio,0) studio,COALESCE(n.nature,0) nature FROM posts p LEFT JOIN (SELECT post_id,SUM(views) studio FROM post_daily_views WHERE day>=date('now','-29 days') GROUP BY post_id) s ON s.post_id=p.id LEFT JOIN (SELECT post_id,SUM(views) nature FROM post_daily_view_sources WHERE day>=date('now','-29 days') GROUP BY post_id) n ON n.post_id=p.id WHERE p.deleted_at IS NULL AND p.status='published' ORDER BY (COALESCE(s.studio,0)+COALESCE(n.nature,0)) DESC LIMIT 10").all()
 ]);
 let by=new Map;for(const x of daily.results){let item=by.get(x.day)||{day:x.day,studio:0,nature:0};item[x.source]=Number(x.views);by.set(x.day,item)}
 const series=[];for(let i=89;i>=0;i--){const dt=new Date(Date.now()-i*86400000).toISOString().slice(0,10);series.push(by.get(dt)||{day:dt,studio:0,nature:0})}
 return {readerDaily:series,readerTop:top.results,sourceNotes:"Số lần tải trang: Nature và Studio, không phải khách duy nhất; bot đã biết được lọc ở tầng Worker. Dữ liệu Nature chỉ bắt đầu tính kể từ khi bật bộ đếm."};
}
export default {async fetch(request,env,ctx){
 const url=new URL(request.url),path=url.pathname;
 if(path==="/api/internal/nature-view"){
  if(request.method!=="POST")return json({error:"Method not allowed"},405);
  const provided=request.headers.get("X-Nature-View-Key");
  if(!env.NATURE_VIEW_KEY||!provided||provided!==env.NATURE_VIEW_KEY)return json({error:"Forbidden"},403);
  let data;try{data=await request.json()}catch{return json({error:"Invalid JSON"},400)}
  if(!["vi","en"].includes(data.locale)||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(data.slug||"")))return json({error:"Invalid slug"},400);
  const post=await env.DB.prepare("SELECT id FROM posts WHERE locale=? AND slug=? AND status='published' AND deleted_at IS NULL").bind(data.locale,data.slug).first();
  if(!post)return json({error:"Not found"},404);
  await env.DB.prepare("INSERT INTO post_daily_view_sources(post_id,day,source,views) VALUES(?,date('now'),'nature',1) ON CONFLICT(post_id,day,source) DO UPDATE SET views=views+1").bind(post.id).run();
  return json({ok:true});
 }
 if(path==="/api/studio/export-word"){
  if(request.method!=="GET")return json({error:"Method not allowed"},405);
  const user=await userFor(request,env);
  if(!user)return json({error:"Cần đăng nhập"},401);
  return exportBundle(request,env,user);
 }
 if(path==="/api/studio/dashboard"||path==="/api/studio/post-stats"){
  const original=await studio.fetch(request,env,ctx);
  if(!original.ok)return original;
  const value=await original.json(),metrics=await stats(env);
  if(path.endsWith("/dashboard")){
   const start=metrics.readerDaily.slice(-30),studioViews=start.reduce((n,x)=>n+x.studio,0),natureViews=start.reduce((n,x)=>n+x.nature,0);
   value.version="1.2.0";value.counts={...value.counts,views30d:studioViews+natureViews,nature30d:natureViews,studio30d:studioViews};
   value.readerDaily=metrics.readerDaily;value.readerTop=metrics.readerTop;value.sourceNotes=metrics.sourceNotes;
  }else{
   const id=url.searchParams.get("id");
   value.viewsNature30d=metrics.readerTop.find(p=>p.id===id)?.nature||0;
   value.viewsStudio30d=metrics.readerTop.find(p=>p.id===id)?.studio||0;
   value.views30d=value.viewsNature30d+value.viewsStudio30d;
  }
  return json(value);
 }
 if(path==="/api/health")return json({ok:true,version:"1.2.0",platform:"Cloudflare Workers + D1 + R2",features:["nature-theme","read-analytics","docx-zip-export"]});
 const response=await studio.fetch(request,env,ctx);
 if(request.method==="GET"&&(response.headers.get("content-type")||"").includes("text/html")&&!path.startsWith("/read/")){
  const raw=await response.text();const h=new Headers(response.headers);h.delete("Content-Length");h.set("Cache-Control","private,no-store");
  return new Response(applyNatureBrand(raw),{status:response.status,headers:h});
 }
 return response;
}};
