import core from "./studio-api-journal.mjs";
import {applyZenBrand} from "./studio-zen-theme-v133.mjs";
import {STUDIO_JS as OLD} from "./studio-client-v6.mjs";
import {STUDIO_JS as NEW} from "./studio-client-zen-v134.mjs";
import {STUDIO_EDITORIAL_CSS} from "./studio-editorial-css-v130.mjs";
import {STUDIO_NATURE_CSS_V131} from "./studio-nature-css-v131.mjs";
import {exportBundle} from "./studio-docx-export.mjs";
import {DEMO_SHIM,DEMO_STYLE,DEMO_CTA,DEMO_BANNER} from "./studio-demo-v132.mjs";
const json=(obj,status=200)=>Response.json(obj,{status,headers:{"Cache-Control":"private,no-store"}});
const toHex=bytes=>Array.from(new Uint8Array(bytes),v=>v.toString(16).padStart(2,"0")).join("");
async function account(req,env) {
 const match=(req.headers.get("cookie")||"").match(/(?:^|;\s*)ht_blog_session=([0-9a-f]{64})/);
 if(!match)return null;
 const hash=toHex(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(match[1])));
 return env.DB.prepare("SELECT u.id,u.role FROM users u JOIN sessions s ON s.user_id=u.id WHERE s.token_hash=? AND s.expires_at>datetime('now')").bind(hash).first();
}
async function readership(env) {
 const [a,b,top]=await Promise.all([
 env.DB.prepare("SELECT day,SUM(views) views FROM post_daily_views WHERE day>=date('now','-89 days') GROUP BY day").all(),
 env.DB.prepare("SELECT day,SUM(views) views FROM post_daily_view_sources WHERE source='nature' AND day>=date('now','-89 days') GROUP BY day").all(),
 env.DB.prepare("SELECT p.id,p.locale,p.slug,p.title,COALESCE(x.n,0) nature,COALESCE(y.n,0) studio FROM posts p LEFT JOIN (SELECT post_id,SUM(views)n FROM post_daily_view_sources WHERE day>=date('now','-29 days') GROUP BY post_id)x ON x.post_id=p.id LEFT JOIN(SELECT post_id,SUM(views)n FROM post_daily_views WHERE day>=date('now','-29 days') GROUP BY post_id)y ON y.post_id=p.id WHERE p.deleted_at IS NULL AND p.status='published' ORDER BY nature+studio DESC LIMIT 10").all()
 ]);
 const map=new Map();
 for(const [src,arr] of [["studio",a.results],["nature",b.results]])for(const x of arr){const row=map.get(x.day)||{day:x.day,studio:0,nature:0};row[src]=Number(x.views);map.set(x.day,row)}
 const days=[];for(let i=89;i>=0;i--){const day=new Date(Date.now()-i*86400000).toISOString().slice(0,10);days.push(map.get(day)||{day,studio:0,nature:0})}
 return {readerDaily:days,readerTop:top.results,sourceNotes:"Lượt mở trang, không phải người đọc duy nhất. Nature production chưa kích hoạt bộ đếm lượt đọc, nên số liệu Nature hiện chưa đầy đủ."};
}
const analyticsCss=".reader-report{padding:24px;margin:18px 0}.reader-head{display:flex;justify-content:space-between;flex-wrap:wrap;gap:16px}.reader-head h2{font:400 29px Georgia,serif;color:#243f32}.reader-head p{font-size:12px;color:#647766}.reader-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:20px 0}.reader-summary span{display:block;font-size:11px;color:#6a7c6b}.reader-summary strong{display:block;font:400 32px Georgia,serif;color:#243f32}.reader-svg{width:100%;height:auto;max-height:280px}.reader-legend{display:flex;gap:15px;font-size:11px}.reader-rank-row{display:grid;grid-template-columns:20px minmax(0,1fr) 55px 110px;gap:10px;padding:10px 0;border-top:1px solid #e1e9dd;font-size:12px}.reader-rank-row a{color:#294d37}.reader-rank-row b,.reader-rank-row small{text-align:right}.export-toolbar{display:flex;justify-content:flex-end;margin:15px 0}@media(max-width:650px){.reader-rank-row{grid-template-columns:20px minmax(0,1fr) 45px}.reader-rank-row small{display:none}}";
export default {async fetch(request,env,ctx){
 const path=new URL(request.url).pathname;
 const isDemo=(path==="/demo"||path==="/demo/");
 if(/^\/media\/d2000000-0000-4000-8000-00000000000[123]$/.test(path)){
  const n=path.slice(-1),file=n==="1"?"hero-canopy-v2.webp":n==="2"?"practice-cushion-v2.webp":"hero-canopy-v2.webp";
  return Response.redirect("https://huongthiennature.com/media/"+file,302);
 }
 if(request.method==="GET"&&path==="/api/health")return json({ok:true,version:"1.3.4",product:"Zen Studio",platform:"Cloudflare Workers + D1 + R2"});
 if(path==="/api/studio/export-word"){
  if(request.method!=="GET")return json({error:"Method not allowed"},405);
  return exportBundle(request,env,await account(request,env));
 }
 if(path==="/api/studio/dashboard"){
  const auth=await account(request,env);if(!auth)return json({error:"Unauthorized"},401);
  const response=await core.fetch(request,env,ctx);if(!response.ok)return response;
  const baseline=await response.json();const data=await readership(env);
  const days=data.readerDaily.slice(-30),studio=days.reduce((n,x)=>n+x.studio,0),nature=days.reduce((n,x)=>n+x.nature,0);
  return json({...baseline,version:"1.3.4",readerDaily:data.readerDaily,readerTop:data.readerTop,sourceNotes:data.sourceNotes,counts:{...baseline.counts,views30d:studio+nature,studio30d:studio,nature30d:nature}});
 }
 const target=isDemo?new Request(new URL("/",request.url),request):request;
 const response=await core.fetch(target,env,ctx);
 if(request.method!=="GET"||path.startsWith("/read/")||!(response.headers.get("content-type")||"").includes("text/html"))return response;
 let html=applyZenBrand((await response.text()).replace(OLD,NEW));
 html=html.replace("</head>",'<style id="studio-demo-theme">'+DEMO_STYLE+'</style></head>');
 if(isDemo)html=html.replace("</head>",'<script>'+DEMO_SHIM+'</script></head>').replace('</body>',DEMO_BANNER+'</body>');
 html=html.replace("PHIÊN BẢN 1.1.0","PHIÊN BẢN 1.3.4").replace("</head>",'<style id="studio-editorial-133">'+analyticsCss+STUDIO_EDITORIAL_CSS+STUDIO_NATURE_CSS_V131+'</style></head>');
 if(!isDemo)html=html.replace('<div class="authlinks">',DEMO_CTA+'<div class="authlinks">');
 const headers=new Headers(response.headers);headers.delete("content-length");headers.set("cache-control","private,no-store");if(isDemo)headers.set("X-Robots-Tag","noindex,nofollow,noarchive");
 return new Response(html,{status:response.status,headers});
}};