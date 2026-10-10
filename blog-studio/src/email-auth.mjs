
const J=(v,s=200)=>Response.json(v,{status:s,headers:{"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
const token=()=>{const a=new Uint8Array(32);crypto.getRandomValues(a);return [...a].map(x=>x.toString(16).padStart(2,"0")).join("")};
const hash=async x=>[...new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(x)))].map(y=>y.toString(16).padStart(2,"0")).join("");
const mailOK=x=>typeof x==="string"&&x.length<255&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x);
const link=(path,t)=>"https://studio.huongthiennature.com"+path+"?token="+encodeURIComponent(t);
async function send(e,to,subject,body){if(!e.RESEND_API_KEY)throw Error("EMAIL_NOT_CONFIGURED");const r=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":"Bearer "+e.RESEND_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({from:"Hương Thiền Blog Studio <no-reply@huongthiennature.com>",to:[to],subject,text:body})});if(!r.ok){console.error("mail delivery",r.status);throw Error("EMAIL_DELIVERY_FAILED")}}
async function mint(e,email,kind,reqId,minutes){const t=token();await e.DB.prepare("DELETE FROM account_tokens WHERE email=? AND kind=?").bind(email,kind).run();await e.DB.prepare("INSERT INTO account_tokens(token_hash,email,kind,request_id,expires_at) VALUES(?,?,?,?,datetime('now',?))").bind(await hash(t),email,kind,reqId||null,"+"+minutes+" minutes").run();return t}
async function consume(e,t,kind){if(typeof t!=="string"||!/^[0-9a-f]{64}$/.test(t))return null;const h=await hash(t);return e.DB.prepare("SELECT * FROM account_tokens WHERE token_hash=? AND kind=? AND consumed_at IS NULL AND expires_at>datetime('now')").bind(h,kind).first()}
const response={ok:true,message:"Nếu email hợp lệ, hướng dẫn sẽ được gửi đến hộp thư."};
const safe=fn=>async(r,e)=>{try{return await fn(r,e)}catch(ex){console.error("account-email-flow",String(ex));return J({error:"Không thể hoàn tất yêu cầu email lúc này. Vui lòng thử lại sau."},503)}};
export const emailAuth=safe(async(r,e)=>{
 const url=new URL(r.url),p=url.pathname,b=await r.json().catch(()=>null);
 const email=String(b?.email||"").toLowerCase().trim(),now="CURRENT_TIMESTAMP";
 if(p==="/api/auth/register"&&r.method==="POST"){
  const name=String(b?.name||"").trim().slice(0,90);if(!mailOK(email)||name.length<2)return J({error:"Tên và email không hợp lệ."},400);
  if(!e.RESEND_API_KEY)return J({error:"Chức năng email chưa được kích hoạt."},503);
  const exists=await e.DB.prepare("SELECT id FROM users WHERE email=?").bind(email).first();if(exists)return J(response);
  const old=await e.DB.prepare("SELECT * FROM account_requests WHERE email=?").bind(email).first();
  if(old&&old.status==="pending_approval")return J(response);
  const id=old?.id||crypto.randomUUID();
  if(old)await e.DB.prepare("UPDATE account_requests SET display_name=?,status='pending_email',created_at=CURRENT_TIMESTAMP,verified_at=NULL,reviewed_at=NULL WHERE id=?").bind(name,id).run();
  else await e.DB.prepare("INSERT INTO account_requests(id,email,display_name) VALUES(?,?,?)").bind(id,email,name).run();
  const t=await mint(e,email,"verify",id,30);
  await send(e,email,"Xác minh đăng ký Blog Studio","Xin chào "+name+",\n\nBấm liên kết này để xác minh địa chỉ email (có hiệu lực 30 phút):\n"+link("/verify-email",t)+"\n\nNếu bạn không đăng ký, hãy bỏ qua.");
  return J(response);
 }
 if(p==="/api/auth/verify"&&r.method==="POST"){
  const row=await consume(e,b?.token,"verify");if(!row)return J({error:"Liên kết hết hạn hoặc không hợp lệ."},400);
  const request=await e.DB.prepare("SELECT * FROM account_requests WHERE id=? AND status='pending_email'").bind(row.request_id).first();
  if(!request)return J({error:"Yêu cầu không tồn tại."},400);
  if(!e.RESEND_API_KEY)return J({error:"Chức năng email chưa sẵn sàng."},503);
  const t=await mint(e,request.email,"approve",request.id,10080);
  await send(e,e.ADMIN_EMAIL,"Yêu cầu duyệt Blog Studio: "+request.display_name,"Thành viên muốn tham gia Blog Studio:\nTên: "+request.display_name+"\nEmail: "+request.email+"\n\nPhê duyệt bằng liên kết (7 ngày):\n"+link("/approve",t)+"\n\nNếu không nhận ra yêu cầu này, hãy bỏ qua.");
  await e.DB.batch([e.DB.prepare("UPDATE account_tokens SET consumed_at=CURRENT_TIMESTAMP WHERE token_hash=?").bind(row.token_hash),e.DB.prepare("UPDATE account_requests SET status='pending_approval',verified_at=CURRENT_TIMESTAMP WHERE id=?").bind(request.id)]);
  return J({ok:true,message:"Email đã xác minh. Yêu cầu đang chờ chủ sở hữu phê duyệt."});
 }
 if(p==="/api/auth/approve"&&r.method==="POST"){
  const row=await consume(e,b?.token,"approve");if(!row)return J({error:"Liên kết phê duyệt không hợp lệ hoặc hết hạn."},400);
  // Link is delivered only to the account owner, and is single-use.
  const req=await e.DB.prepare("SELECT * FROM account_requests WHERE id=? AND status='pending_approval'").bind(row.request_id).first();if(!req)return J({error:"Yêu cầu không còn hợp lệ."},400);
  if(!e.RESEND_API_KEY)return J({error:"Email chưa sẵn sàng."},503);
  const t=await mint(e,req.email,"activate",req.id,1440);
  await send(e,req.email,"Đăng ký Blog Studio đã được phê duyệt","Chào "+req.display_name+",\n\nTài khoản của bạn đã được chủ sở hữu phê duyệt. Tạo mật khẩu trong vòng 24 giờ bằng liên kết:\n"+link("/activate",t)+"\n");
  await e.DB.batch([e.DB.prepare("UPDATE account_tokens SET consumed_at=CURRENT_TIMESTAMP WHERE token_hash=?").bind(row.token_hash),e.DB.prepare("UPDATE account_requests SET status='approved',reviewed_at=CURRENT_TIMESTAMP WHERE id=?").bind(req.id)]);
  return J({ok:true,message:"Đã phê duyệt. Liên kết tạo mật khẩu đã gửi đến người đăng ký."});
 }
 if(p==="/api/auth/forgot"&&r.method==="POST"){
  if(!mailOK(email))return J(response);
  if(!e.RESEND_API_KEY)return J({error:"Chức năng email chưa được kích hoạt."},503);
  const user=await e.DB.prepare("SELECT id FROM users WHERE email=?").bind(email).first();if(!user)return J(response);
  const t=await mint(e,email,"reset",null,30);
  await send(e,email,"Đặt lại mật khẩu Blog Studio","Một yêu cầu đặt lại mật khẩu vừa được gửi đến hệ thống. Nếu chính bạn yêu cầu, hãy sử dụng liên kết này trong 30 phút:\n"+link("/reset-password",t)+"\n\nNếu không phải bạn, hãy bỏ qua.");
  return J(response);
 }
 if((p==="/api/auth/reset"||p==="/api/auth/activate")&&r.method==="POST"){
  const kind=p.endsWith("activate")?"activate":"reset",row=await consume(e,b?.token,kind),pass=b?.password;
  if(!row)return J({error:"Liên kết đã hết hạn hoặc đã sử dụng."},400);
  if(typeof pass!=="string"||pass.length<12||pass.length>128)return J({error:"Mật khẩu phải từ 12 đến 128 ký tự."},400);
  const salt=token(),key=await crypto.subtle.importKey("raw",new TextEncoder().encode(pass),"PBKDF2",false,["deriveBits"]),digest=[...new Uint8Array(await crypto.subtle.deriveBits({name:"PBKDF2",salt:new TextEncoder().encode(salt),iterations:240000,hash:"SHA-256"},key,256))].map(x=>x.toString(16).padStart(2,"0")).join("");
  if(kind==="reset"){
   const user=await e.DB.prepare("SELECT id FROM users WHERE email=?").bind(row.email).first();if(!user)return J({error:"Yêu cầu không hợp lệ."},400);
   await e.DB.batch([e.DB.prepare("UPDATE users SET salt=?,password_hash=? WHERE id=?").bind(salt,digest,user.id),e.DB.prepare("DELETE FROM sessions WHERE user_id=?").bind(user.id),e.DB.prepare("UPDATE account_tokens SET consumed_at=CURRENT_TIMESTAMP WHERE token_hash=?").bind(row.token_hash)]);
  }else{
   const req=await e.DB.prepare("SELECT * FROM account_requests WHERE id=? AND status='approved'").bind(row.request_id).first();if(!req)return J({error:"Tài khoản chưa được duyệt."},403);
   const id=crypto.randomUUID();
   await e.DB.batch([e.DB.prepare("INSERT INTO users(id,email,display_name,role,salt,password_hash) VALUES(?,?,?,'editor',?,?)").bind(id,row.email,req.display_name,salt,digest),e.DB.prepare("UPDATE account_tokens SET consumed_at=CURRENT_TIMESTAMP WHERE token_hash=?").bind(row.token_hash)]);
  }
  return J({ok:true,message:"Đã cập nhật mật khẩu. Bạn có thể đăng nhập."});
 }
 return J({error:"Not found"},404);
});
