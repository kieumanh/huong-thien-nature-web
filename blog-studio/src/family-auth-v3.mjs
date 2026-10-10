import {emailAuth} from "./email-auth-v3.mjs";
const BASE="https://studio.huongthiennature.com";
const ok=(value,status=200)=>Response.json(value,{status,headers:{"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
const error=(message,status=400)=>ok({error:message},status);
const encode=new TextEncoder();
const random=()=>{const b=new Uint8Array(32);crypto.getRandomValues(b);return [...b].map(x=>x.toString(16).padStart(2,"0")).join("")};
const digest=async str=>[...new Uint8Array(await crypto.subtle.digest("SHA-256",encode.encode(str)))].map(x=>x.toString(16).padStart(2,"0")).join("");
const emailFormat=s=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)&&s.length<255;
const emailOf=v=>String(v||"").trim().toLowerCase();
async function jsonBody(request){const n=Number(request.headers.get("Content-Length")||0);if(n>16000)return null;try{const text=await request.text();return text.length>16000?null:JSON.parse(text)}catch{return null}}
async function passwordHash(pass,salt){const key=await crypto.subtle.importKey("raw",encode.encode(pass),"PBKDF2",false,["deriveBits"]);const b=await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:encode.encode(salt),iterations:100000},key,256);return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}
async function sendMail(env,to,subject,body){
 if(!env.RESEND_API_KEY)throw Error("MAIL_MISSING");
 const r=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":"Bearer "+env.RESEND_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({from:"Zen Studio <no-reply@huongthiennature.com>",to:[to],subject,text:body})});
 if(!r.ok){console.error("Resend status",r.status);throw Error("MAIL_FAILED")}
}
async function signedOwner(request,env){
 const match=(request.headers.get("Cookie")||"").match(/(?:^|;\s*)ht_blog_session=([a-f0-9]{64})/);
 if(!match)return null;
 return await env.DB.prepare("SELECT u.id,u.email,u.role FROM users u JOIN sessions s ON s.user_id=u.id WHERE s.token_hash=? AND s.expires_at>datetime('now')").bind(await digest(match[1])).first();
}
async function throttle(request,env,kind,email,ipMax=12,emailMax=3){
 const ip=request.headers.get("CF-Connecting-IP")||"unknown",pair=[await digest("rate:ip:"+kind+":"+ip),await digest("rate:email:"+kind+":"+email)];
 const q="SELECT COUNT(*) AS n FROM auth_attempts WHERE scope_hash=? AND created_at>datetime('now','-1 hour')";
 const [a,b]=await Promise.all(pair.map(key=>env.DB.prepare(q).bind(key).first()));
 if(a.n>=ipMax||b.n>=emailMax)return false;
 await env.DB.batch(pair.map(key=>env.DB.prepare("INSERT INTO auth_attempts(scope_hash) VALUES(?)").bind(key)));
 return true;
}
async function approveInfo(env,raw){
 if(typeof raw!=="string"||!/^[0-9a-f]{64}$/.test(raw))return null;
 const key=await digest(raw);
 return await env.DB.prepare("SELECT req.id,req.email,req.display_name,req.status,t.token_hash,t.expires_at FROM account_requests req JOIN account_tokens t ON req.id=t.request_id WHERE t.token_hash=? AND t.kind='approve' AND t.consumed_at IS NULL AND t.expires_at>datetime('now') AND req.status='pending_approval'").bind(key).first();
}
async function ownerSetup(request,env,data){
 const users=await env.DB.prepare("SELECT COUNT(*) AS n FROM users").first();
 if(users.n!==0)return error("Hệ thống đã có chủ sở hữu.",403);
 const email=emailOf(data?.email);
 if(!emailFormat(email)||email!==emailOf(env.ADMIN_EMAIL))return ok({ok:true,message:"Nếu email hợp lệ, bạn sẽ nhận được liên kết kích hoạt."});
 if(!await throttle(request,env,"owner-start",email,8,3))return error("Đã vượt giới hạn. Vui lòng thử lại sau.",429);
 if(!env.RESEND_API_KEY)return error("Email chưa được cấu hình.",503);
 const t=random(),h=await digest(t);
 await env.DB.prepare("DELETE FROM owner_bootstrap WHERE consumed_at IS NULL").run();
 await env.DB.prepare("INSERT INTO owner_bootstrap(token_hash,expires_at) VALUES(?,datetime('now','+30 minutes'))").bind(h).run();
 await sendMail(env,email,"Kích hoạt chủ sở hữu Zen Studio","Bạn vừa yêu cầu tạo tài khoản chủ sở hữu Zen Studio.\n\nMở liên kết sau để thiết lập mật khẩu trong vòng 30 phút:\n"+BASE+"/owner-complete?token="+t+"\n\nNếu không phải bạn, hãy bỏ qua. Không chuyển tiếp liên kết này.");
 return ok({ok:true,message:"Nếu email hợp lệ, bạn sẽ nhận được liên kết kích hoạt."});
}
async function ownerComplete(request,env,data){
 const raw=data?.token,pass=data?.password,display=String(data?.name||"Chủ sở hữu").trim().slice(0,90);
 if(typeof raw!=="string"||!/^[0-9a-f]{64}$/.test(raw))return error("Liên kết kích hoạt không hợp lệ.");
 if(typeof pass!=="string"||[...pass].length<12||[...pass].length>128)return error("Mật khẩu cần từ 12 đến 128 ký tự.");
 const users=await env.DB.prepare("SELECT COUNT(*) AS n FROM users").first();
 if(users.n!==0)return error("Chủ sở hữu đã được kích hoạt.",403);
 const h=await digest(raw),valid=await env.DB.prepare("SELECT token_hash FROM owner_bootstrap WHERE token_hash=? AND consumed_at IS NULL AND expires_at>datetime('now')").bind(h).first();
 if(!valid)return error("Liên kết đã hết hạn hoặc đã sử dụng.",400);
 const id=crypto.randomUUID(),salt=random(),pw=await passwordHash(pass,salt);
 await env.DB.batch([env.DB.prepare("INSERT INTO users(id,email,display_name,role,salt,password_hash) VALUES(?,?,?,'owner',?,?)").bind(id,emailOf(env.ADMIN_EMAIL),display||"Chủ sở hữu",salt,pw),env.DB.prepare("UPDATE owner_bootstrap SET consumed_at=CURRENT_TIMESTAMP WHERE token_hash=?").bind(h),env.DB.prepare("INSERT INTO audit_log(user_id,action,target_id) VALUES(?,'owner_activated',?)").bind(id,id)]);
 return ok({ok:true,message:"Đã kích hoạt chủ sở hữu. Bạn có thể đăng nhập."});
}
export async function familyAuth(request,env){
 try{
  const url=new URL(request.url),p=url.pathname,m=request.method;
  if(m==="POST"&&request.headers.get("Origin")!==url.origin)return error("Nguồn gửi yêu cầu không hợp lệ.",403);
  if(p==="/api/auth/owner-start"&&m==="POST")return ownerSetup(request,env,await jsonBody(request));
  if(p==="/api/auth/owner-complete"&&m==="POST")return ownerComplete(request,env,await jsonBody(request));
  if(p==="/api/auth/requests"&&m==="GET"){
   const owner=await signedOwner(request,env);if(owner?.role!=="owner")return error("Yêu cầu quyền chủ sở hữu.",403);
   const q=await env.DB.prepare("SELECT id,email,display_name,created_at,verified_at FROM account_requests WHERE status='pending_approval' ORDER BY verified_at DESC LIMIT 100").all();
   return ok({requests:q.results});
  }
  if(p==="/api/auth/pending"&&m==="GET"){
   const owner=await signedOwner(request,env);if(owner?.role!=="owner")return error("Yêu cầu quyền chủ sở hữu.",403);
   const info=await approveInfo(env,url.searchParams.get("token"));
   return info?ok({request:{id:info.id,email:info.email,display_name:info.display_name,status:info.status}}):error("Yêu cầu không hợp lệ hoặc hết hạn.",404);
  }
  if(["/api/auth/approve","/api/auth/reject"].includes(p)&&m==="POST"){
   const owner=await signedOwner(request,env);if(owner?.role!=="owner")return error("Chỉ chủ sở hữu đã đăng nhập mới được duyệt.",403);
   const data=await jsonBody(request),info=await approveInfo(env,data?.token);
   if(!info)return error("Liên kết phê duyệt không hợp lệ hoặc hết hạn.",404);
   if(!env.RESEND_API_KEY)return error("Email chưa được cấu hình.",503);
   if(p.endsWith("reject")){
    await sendMail(env,info.email,"Thông báo đăng ký Zen Studio","Xin chào "+info.display_name+",\n\nYêu cầu tham gia của bạn hiện chưa được phê duyệt. Bạn có thể trao đổi trực tiếp với chủ sở hữu.");
    await env.DB.batch([env.DB.prepare("UPDATE account_requests SET status='rejected',reviewed_at=CURRENT_TIMESTAMP WHERE id=?").bind(info.id),env.DB.prepare("UPDATE account_tokens SET consumed_at=CURRENT_TIMESTAMP WHERE token_hash=?").bind(info.token_hash),env.DB.prepare("INSERT INTO audit_log(user_id,action,target_id) VALUES(?,'account_rejected',?)").bind(owner.id,info.id)]);
    return ok({ok:true,message:"Đã từ chối và gửi email thông báo."});
   }
   // Actual activation mail + token generation uses the existing proven API, but only through this authenticated owner gateway.
   const forwarded=new Request(request.url,{method:"POST",headers:request.headers,body:JSON.stringify({token:data.token})});
   const result=await emailAuth(forwarded,env);
   if(result.ok)await env.DB.prepare("INSERT INTO audit_log(user_id,action,target_id) VALUES(?,'account_approved',?)").bind(owner.id,info.id).run();
   return result;
  }
  if(m==="POST"&&["/api/auth/register","/api/auth/forgot"].includes(p)){
   const body=await jsonBody(request),email=emailOf(body?.email);
   if(!emailFormat(email))return error("Email không hợp lệ.");
   if(!await throttle(request,env,p,email,12,3))return ok({ok:true,message:"Nếu email hợp lệ, bạn sẽ nhận được hướng dẫn."});
   const forwarded=new Request(request.url,{method:"POST",headers:request.headers,body:JSON.stringify({...body,email})});
   return emailAuth(forwarded,env);
  }
  if(m==="POST"&&["/api/auth/verify","/api/auth/reset","/api/auth/activate"].includes(p)){
   const body=await jsonBody(request);
   if(!body||typeof body.token!=="string")return error("Liên kết không hợp lệ.");
   if(!await throttle(request,env,p,await digest(body.token),20,8))return error("Vui lòng thử lại sau.",429);
   return emailAuth(new Request(request.url,{method:"POST",headers:request.headers,body:JSON.stringify(body)}),env);
  }
  return error("Không tìm thấy.",404);
 }catch(e){console.error("family auth",String(e?.message||e));return error("Không thể xử lý yêu cầu. Vui lòng thử lại sau.",503)}
}
