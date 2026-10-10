import core from "./worker.mjs";
import {emailAuth} from "./email-auth.mjs";
async function signedOwner(request,env){
 const m=(request.headers.get("Cookie")||"").match(/(?:^|;\s*)ht_blog_session=([a-f0-9]{64})/);
 if(!m)return false;
 const digest=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(m[1]));
 const hash=[...new Uint8Array(digest)].map(n=>n.toString(16).padStart(2,"0")).join("");
 const u=await env.DB.prepare("SELECT users.role FROM sessions JOIN users ON sessions.user_id=users.id WHERE sessions.token_hash=? AND sessions.expires_at>datetime('now')").bind(hash).first();
 return u?.role==="owner";
}
export default {async fetch(request,env,ctx){
 const u=new URL(request.url),p=u.pathname;
 if(p.startsWith("/api/auth/")){
  if(request.method==="POST"&&request.headers.get("Origin")!==u.origin)return Response.json({error:"Nguồn yêu cầu không hợp lệ."},{status:403});
  if(p==="/api/auth/approve"&&!(await signedOwner(request,env)))return Response.json({error:"Chủ sở hữu cần đăng nhập trước khi phê duyệt."},{status:403});
  return emailAuth(request,env);
 }
 return core.fetch(request,env,ctx);
}};
