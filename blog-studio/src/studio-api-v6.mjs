import existing from "./family-main-v6.mjs";
import { STUDIO_HTML } from "./studio-shell-v4.mjs";
const j=(o,status=200)=>Response.json(o,{status,headers:{"Cache-Control":"no-store","Content-Type":"application/json; charset=utf-8","X-Content-Type-Options":"nosniff"}});
const hex=bytes=>[...new Uint8Array(bytes)].map(x=>x.toString(16).padStart(2,"0")).join("");
async function account(req,env){
 const match=(req.headers.get("Cookie")||"").match(/(?:^|;\s*)ht_blog_session=([0-9a-f]{64})/);
 if(!match)return null;
 const h=hex(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(match[1])));
 return env.DB.prepare("SELECT u.id,u.email,u.display_name,u.role FROM users u JOIN sessions s ON s.user_id=u.id WHERE s.token_hash=? AND s.expires_at>datetime('now')").bind(h).first();
}
async function dashboard(env){
 const queries=[
  env.DB.prepare("SELECT status,workflow_stage,category,locale,created_at,updated_at,published_at,deleted_at FROM posts").all(),
  env.DB.prepare("SELECT COUNT(*) n,COALESCE(SUM(byte_size),0) bytes FROM media").first(),
  env.DB.prepare("SELECT action,created_at,target_id FROM audit_log ORDER BY id DESC LIMIT 8").all(),
  env.DB.prepare("SELECT day, SUM(views) total FROM post_daily_views WHERE day>=date('now','-29 days') GROUP BY day ORDER BY day").all(),
  env.DB.prepare("SELECT p.id,p.title,p.locale,COALESCE(SUM(v.views),0) views FROM posts p LEFT JOIN post_daily_views v ON v.post_id=p.id WHERE p.deleted_at IS NULL AND p.status='published' GROUP BY p.id ORDER BY views DESC LIMIT 5").all()
 ];
 const [posts,media,events,views,top]=await Promise.all(queries);
 const active=posts.results.filter(p=>!p.deleted_at);
 const bucket={idea:0,writing:0,review:0,published:0};
 for(const p of active)bucket[p.status==='published'?'published':p.workflow_stage in bucket?p.workflow_stage:'writing']++;
 const cats={};for(const p of active)cats[p.category]=(cats[p.category]||0)+1;
 const chart=[];for(let i=13;i>=0;i--){const d=new Date(Date.now()-i*86400000).toISOString().slice(0,10);chart.push({day:d,published:active.filter(p=>p.status==='published'&&String(p.published_at||'').slice(0,10)===d).length,edited:active.filter(p=>String(p.updated_at||'').slice(0,10)===d).length})}
 return j({version:"1.1.0",counts:{total:active.length,published:bucket.published,draft:active.length-bucket.published,trash:posts.results.length-active.length,media:media.n,mediaBytes:media.bytes,views30d:views.results.reduce((a,v)=>a+v.total,0)},pipeline:bucket,categories:cats,chart,views:views.results,topPosts:top.results,activity:events.results,notes:"Lượt mở bài là số lần tải trang /read/ trong CMS, không phải số người đọc duy nhất. Chưa bao gồm lượt đọc ngoài website Astro."});
}
async function getPostStages(env){
 const x=await env.DB.prepare("SELECT id,workflow_stage FROM posts").all();
 return Object.fromEntries(x.results.map(row=>[row.id,row.workflow_stage]));
}
const pageHeaders={"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff","Referrer-Policy":"no-referrer","X-Frame-Options":"DENY","Strict-Transport-Security":"max-age=31536000","Content-Security-Policy":"default-src 'none'; connect-src 'self'; img-src 'self' data: https:; script-src 'unsafe-inline'; style-src 'unsafe-inline'; font-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'"};
export default {async fetch(request,env,ctx){
 try{
  const url=new URL(request.url),path=url.pathname,method=request.method;
  if(method==="GET"&&["/","/login"].includes(path)){
   const owner=await env.DB.prepare("SELECT COUNT(*) n FROM users WHERE role='owner'").first();
   if(owner.n===0)return Response.redirect(url.origin+"/owner-setup",302);
   return new Response(STUDIO_HTML,{headers:pageHeaders});
  }
  if(method==="GET"&&path==="/api/health")return j({ok:true,version:"1.1.0",platform:"Cloudflare Workers + D1 + R2"});
  if(method==="GET"&&path==="/api/studio/dashboard"){
   if(!await account(request,env))return j({error:"Vui lòng đăng nhập."},401);
   return dashboard(env);
  }

  if(method==="GET"&&path==="/api/studio/post-stats"){
   if(!await account(request,env))return j({error:"Vui lòng đăng nhập."},401);
   const id=url.searchParams.get("id");
   if(!/^[0-9a-f-]{36}$/.test(String(id||"")))return j({error:"Mã bài viết không hợp lệ."},400);
   const post=await env.DB.prepare("SELECT id,status,updated_at FROM posts WHERE id=? AND deleted_at IS NULL").bind(id).first();
   if(!post)return j({error:"Bài viết không tồn tại."},404);
   const stats=await env.DB.prepare("SELECT COALESCE(SUM(views),0) total,COALESCE(SUM(CASE WHEN day>=date('now','-29 days') THEN views ELSE 0 END),0) last30 FROM post_daily_views WHERE post_id=?").bind(id).first();
   return j({id:post.id,status:post.status,updated_at:post.updated_at,viewsTotal:stats?.total||0,views30d:stats?.last30||0});
  }
  if(method==="POST"&&path==="/api/studio/stage"){
   if(request.headers.get("Origin")!==url.origin)return j({error:"Nguồn yêu cầu không hợp lệ."},403);
   const user=await account(request,env);
   if(!user)return j({error:"Phiên đăng nhập hết hạn."},401);
   let body;try{body=await request.json()}catch{return j({error:"Dữ liệu không hợp lệ."},400)}
   if(!/^[0-9a-f-]{36}$/.test(String(body.id||""))||!["idea","writing","review","published"].includes(body.stage))return j({error:"Giai đoạn không hợp lệ."},400);
   const found=await env.DB.prepare("SELECT id,status,workflow_stage,deleted_at,body FROM posts WHERE id=?").bind(body.id).first();
   if(!found||found.deleted_at)return j({error:"Bài viết không tồn tại."},404);
   if(body.stage==="published"&&!String(found.body||"").trim())return j({error:"Không thể xuất bản bài viết trống."},400);
   if(body.stage==="published"){
    await env.DB.prepare("UPDATE posts SET workflow_stage='published',status='published',published_at=COALESCE(published_at,CURRENT_TIMESTAMP),updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(body.id).run();
   }else{
    await env.DB.prepare("UPDATE posts SET workflow_stage=?,status='draft',published_at=NULL,updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(body.stage,body.id).run();
   }
   await env.DB.prepare("INSERT INTO audit_log(user_id,action,target_id) VALUES(?,'stage_change',?)").bind(user.id,body.id).run();
   return j({ok:true,id:body.id,stage:body.stage});
  }
  if(method==="GET"&&path==="/api/posts"){
   const core=await existing.fetch(request,env,ctx);if(!core.ok)return core;
   const obj=await core.json(),stages=await getPostStages(env);
   obj.posts=obj.posts.map(p=>({...p,workflow_stage:p.status==='published'?'published':stages[p.id]||'writing'}));
   return j(obj);
  }
  if(method==="POST"&&path==="/api/posts"){
   const incoming=await request.clone().json().catch(()=>null);
   if(incoming?.status==="published"&&!String(incoming?.body||"").trim())return j({error:"Thêm nội dung trước khi xuất bản."},400);
   const core=await existing.fetch(request,env,ctx);
   if(core.ok){
    const clone=core.clone();const data=await clone.json();
    if(data.post?.id){
     if(data.post.status==="published")await env.DB.prepare("UPDATE posts SET workflow_stage='published' WHERE id=?").bind(data.post.id).run();
     else await env.DB.prepare("UPDATE posts SET workflow_stage='writing' WHERE id=? AND workflow_stage='published'").bind(data.post.id).run();
    }
   }
   return core;
  }
  if(method==="GET"&&path.startsWith("/read/")){
   const response=await existing.fetch(request,env,ctx);
   if(response.ok&&response.headers.get("content-type")?.includes("text/html")){
    const m=path.match(/^\/read\/(vi|en)\/([a-z0-9-]+)$/);
    if(m){
     const write=async()=>{const post=await env.DB.prepare("SELECT id FROM posts WHERE locale=? AND slug=? AND status='published' AND deleted_at IS NULL").bind(m[1],m[2]).first();if(post)await env.DB.prepare("INSERT INTO post_daily_views(post_id,day,views) VALUES(?,date('now'),1) ON CONFLICT(post_id,day) DO UPDATE SET views=views+1").bind(post.id).run()};
     const agent=(request.headers.get("User-Agent")||"").toLowerCase();
     if(!/bot|crawl|spider|monitor|facebookexternalhit|preview/.test(agent)){if(ctx?.waitUntil)ctx.waitUntil(write().catch(e=>console.error("view tally",e)));else await write().catch(()=>{})}
    }
   }
   return response;
  }
  return existing.fetch(request,env,ctx);
 }catch(e){console.error("Studio v1",String(e));return j({error:"Không thể xử lý yêu cầu. Vui lòng tải lại."},500)}
}};
