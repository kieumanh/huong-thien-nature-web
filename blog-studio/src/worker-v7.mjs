import { renderArticleMarkdown } from "./studio-format-v2.mjs";
import {HTML} from "./ui-fixed.mjs";
const HEAD={"X-Content-Type-Options":"nosniff","Referrer-Policy":"no-referrer","X-Frame-Options":"DENY","Strict-Transport-Security":"max-age=31536000"};
const reply=(o,s=200,h={})=>new Response(JSON.stringify(o),{status:s,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store",...HEAD,...h}});
const error=(m,s=400)=>reply({error:m},s);
const rand=()=>{let x=new Uint8Array(32);crypto.getRandomValues(x);return [...x].map(b=>b.toString(16).padStart(2,"0")).join("")};
const hex=b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("");
const hash=async s=>hex(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s)));
const crypt=async(p,s)=>{let k=await crypto.subtle.importKey("raw",new TextEncoder().encode(p),"PBKDF2",false,["deriveBits"]);return hex(await crypto.subtle.deriveBits({name:"PBKDF2",salt:new TextEncoder().encode(s),iterations:100000,hash:"SHA-256"},k,256))};
const equal=(a,b)=>{if(typeof a!=="string"||typeof b!=="string"||a.length!==b.length)return false;let d=0;for(let i=0;i<a.length;i++)d|=a.charCodeAt(i)^b.charCodeAt(i);return d===0};
const goodPass=s=>typeof s==="string"&&s.length>=12&&s.length<=128;
const cookie=(v,age)=>"ht_blog_session="+v+"; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age="+age;
async function read(r){if(Number(r.headers.get("content-length")||0)>300000)return null;try{const t=await r.text();return t.length>300000?null:JSON.parse(t)}catch{return null}}
async function me(r,e){const m=(r.headers.get("Cookie")||"").match(/(?:^|;\s*)ht_blog_session=([a-f0-9]{64})/);if(!m)return null;return e.DB.prepare("SELECT u.id,u.email,u.display_name,u.role,s.token_hash FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>datetime('now')").bind(await hash(m[1])).first()}
async function sign(u,e){const t=rand();await e.DB.prepare("INSERT INTO sessions(token_hash,user_id,expires_at) VALUES(?,?,datetime('now','+30 days'))").bind(await hash(t),u.id).run();return cookie(t,2592000)}
function html(h){return new Response(h,{headers:{"Content-Type":"text/html;charset=utf-8","Cache-Control":"no-store","Content-Security-Policy":"default-src 'none'; connect-src 'self'; img-src 'self' data: https:; script-src 'unsafe-inline'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",...HEAD}})}
const escape=s=>String(s||"").replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x]));
function format(body){return renderArticleMarkdown(body)}
const cols="id,locale,slug,title,excerpt,body,category,cover_id,status,seo_title,seo_description,created_by,created_at,updated_at,published_at,deleted_at";
const allowCors=o=>["https://huongthiennature.com","https://www.huongthiennature.com"].includes(o)?{"Access-Control-Allow-Origin":o,"Vary":"Origin"}:{};
function validPost(p){if(!p||typeof p!=="object"||!["vi","en"].includes(p.locale)||!["draft","published"].includes(p.status)||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug||""))return false;for(const [k,n] of Object.entries({title:200,slug:160,excerpt:800,body:180000,category:70,seo_title:180,seo_description:320})){if(typeof p[k]!=="string"||p[k].length>n)return false}return !!p.title.trim()&&(!p.cover_id||/^[0-9a-f-]{36}$/.test(p.cover_id))}
async function audit(e,u,action,target){await e.DB.prepare("INSERT INTO audit_log(user_id,action,target_id) VALUES(?,?,?)").bind(u.id,action,target||null).run()}
export default {async fetch(r,e){
try{
const url=new URL(r.url),p=url.pathname,m=r.method,origin=r.headers.get("Origin");
if(m==="POST"&&origin!==url.origin)return error("Nguồn yêu cầu không hợp lệ.",403);
if(m==="GET"&&["/","/login","/setup","/join"].includes(p))return html(HTML);
if(m==="GET"&&p==="/api/health")return reply({ok:true,version:"1.0.0",platform:"Cloudflare Workers + D1 + R2"});
if(m==="GET"&&p==="/api/setup-state"){const n=await e.DB.prepare("SELECT COUNT(*) AS n FROM users").first();return reply({needs_setup:n.n===0})}
if(m==="POST"&&p==="/api/setup"){
 const b=await read(r);if(!b||!goodPass(b.password)||typeof b.token!=="string")return error("Mật khẩu cần tối thiểu 12 ký tự.");
 const n=await e.DB.prepare("SELECT COUNT(*) AS n FROM users").first();if(n.n!==0)return error("Đã kích hoạt.",403);
 if(!equal(b.token,e.BOOTSTRAP_TOKEN))return error("Mã kích hoạt không hợp lệ.",403);
 const email=String(b.email||"").trim().toLowerCase();if(email!==e.ADMIN_EMAIL.toLowerCase())return error("Email không thuộc chủ sở hữu.",403);
 const id=crypto.randomUUID(),salt=rand(),pw=await crypt(b.password,salt),name=String(b.name||"Chủ sở hữu").slice(0,90);
 await e.DB.prepare("INSERT INTO users(id,email,display_name,role,salt,password_hash) VALUES(?,?,?,'owner',?,?)").bind(id,email,name,salt,pw).run();
 return reply({ok:true},200,{"Set-Cookie":await sign({id},e)});
}
if(m==="POST"&&p==="/api/join"){
 const b=await read(r);if(!b||!goodPass(b.password)||typeof b.code!=="string")return error("Thông tin không hợp lệ.");
 const h=await hash(b.code),inv=await e.DB.prepare("SELECT * FROM invitations WHERE token_hash=? AND used_at IS NULL AND expires_at>datetime('now')").bind(h).first();
 if(!inv)return error("Mã mời không hợp lệ hoặc đã hết hạn.",403);
 const id=crypto.randomUUID(),salt=rand();
 try{await e.DB.prepare("INSERT INTO users(id,email,display_name,role,salt,password_hash) VALUES(?,?,?,?,?,?)").bind(id,inv.email,String(b.name||"Thành viên").slice(0,90),inv.role,salt,await crypt(b.password,salt)).run()}catch{return error("Email đã có tài khoản.",409)}
 await e.DB.prepare("UPDATE invitations SET used_at=CURRENT_TIMESTAMP WHERE token_hash=? AND used_at IS NULL").bind(h).run();return reply({ok:true},201);
}
if(m==="POST"&&p==="/api/login"){
 const b=await read(r),email=String(b?.email||"").trim().toLowerCase();
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||typeof b?.password!=="string")return error("Email hoặc mật khẩu không hợp lệ.");
 const h=await hash("login:"+email),count=await e.DB.prepare("SELECT COUNT(*) AS n FROM auth_attempts WHERE scope_hash=? AND created_at>datetime('now','-15 minutes')").bind(h).first();
 if(count.n>=8)return error("Vui lòng đăng nhập lại sau 15 phút.",429);
 const u=await e.DB.prepare("SELECT * FROM users WHERE email=?").bind(email).first();
 const ph=await crypt(b.password,u?.salt||"00000000000000000000000000000000");
 if(!u||!equal(ph,u.password_hash)){await e.DB.prepare("INSERT INTO auth_attempts(scope_hash) VALUES(?)").bind(h).run();return error("Email hoặc mật khẩu không chính xác.",401)}
 await e.DB.prepare("DELETE FROM auth_attempts WHERE scope_hash=?").bind(h).run();return reply({ok:true},200,{"Set-Cookie":await sign(u,e)});
}
if(m==="GET"&&p==="/api/public/posts"){
 let query="SELECT id,locale,slug,title,excerpt,body,category,cover_id,seo_title,seo_description,published_at,updated_at FROM posts WHERE status='published' AND deleted_at IS NULL";
 const lang=url.searchParams.get("lang");let rows;
 if(["vi","en"].includes(lang))rows=await e.DB.prepare(query+" AND locale=? ORDER BY published_at DESC LIMIT 100").bind(lang).all();
 else rows=await e.DB.prepare(query+" ORDER BY published_at DESC LIMIT 100").all();
 return reply({posts:rows.results},200,{"Cache-Control":"public,max-age=60",...allowCors(origin)});
}
if(m==="GET"&&p.startsWith("/read/")){
 const matches=p.match(/^\/read\/(vi|en)\/([a-z0-9-]+)$/);if(!matches)return error("Not found",404);
 const a=await e.DB.prepare("SELECT * FROM posts WHERE locale=? AND slug=? AND status='published' AND deleted_at IS NULL").bind(matches[1],matches[2]).first();
 if(!a)return html('<h1>Không tìm thấy bài viết.</h1>');
 const cover=a.cover_id?'<img width="100%" style="border-radius:14px" src="/media/'+a.cover_id+'" alt="">':"";
 return html('<!doctype html><html lang="'+a.locale+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+escape(a.seo_title||a.title)+'</title><meta name="description" content="'+escape(a.seo_description||a.excerpt)+'"><style>body{background:#f8f7f1;color:#294632;font:18px/1.9 Georgia,serif;margin:0}main{margin:70px auto;max-width:780px;padding:20px}h1{font-size:clamp(35px,5vw,62px);line-height:1.2}h2{margin-top:40px}a{color:#346f4e}p{overflow-wrap:anywhere}</style></head><body><main><a href="/">← Hương Thiền Blog Studio</a><p>'+escape(a.category)+'</p><h1>'+escape(a.title)+'</h1><p>'+escape(a.excerpt)+'</p>'+cover+'<article>'+format(a.body)+'</article></main></body></html>');
}
const user=await me(r,e);
if(m==="GET"&&p.startsWith("/media/")){
 const id=p.slice(7);if(!/^[0-9a-f-]{36}$/.test(id))return error("Không tìm thấy.",404);
 const item=await e.DB.prepare("SELECT * FROM media WHERE id=?").bind(id).first();if(!item)return error("Không tìm thấy.",404);
 const published=await e.DB.prepare("SELECT 1 FROM posts WHERE status='published' AND deleted_at IS NULL AND (cover_id=? OR body LIKE ?) LIMIT 1").bind(id,"%/media/"+id+"%").first();
 if(!user&&!published)return error("Không tìm thấy.",404);
 const img=await e.MEDIA.get(item.storage_key);if(!img)return error("Không tìm thấy.",404);
 return new Response(img.body,{headers:{"Content-Type":item.content_type,"Cache-Control":published?"public,max-age=86400":"private,no-store",...HEAD}});
}
if(m==="GET"&&p==="/api/me")return user?reply({user:{id:user.id,email:user.email,display_name:user.display_name,role:user.role}}):error("Chưa đăng nhập.",401);
if(m==="POST"&&p==="/api/logout"){if(user)await e.DB.prepare("DELETE FROM sessions WHERE token_hash=?").bind(user.token_hash).run();return reply({ok:true},200,{"Set-Cookie":cookie("",0)})}
if(!user)return error("Vui lòng đăng nhập.",401);
if(m==="GET"&&p==="/api/posts"){const x=await e.DB.prepare("SELECT "+cols+" FROM posts ORDER BY updated_at DESC LIMIT 500").all();return reply({posts:x.results})}
if(m==="POST"&&p==="/api/posts"){
 const b=await read(r);if(!validPost(b))return error("Kiểm tra lại tiêu đề, đường dẫn và nội dung.");
 if(b.cover_id&&!await e.DB.prepare("SELECT id FROM media WHERE id=?").bind(b.cover_id).first())return error("Ảnh bìa không tồn tại.");
 if(b.id&&!/^[0-9a-f-]{36}$/.test(b.id))return error("ID không hợp lệ.");
 const id=b.id||crypto.randomUUID(),old=b.id?await e.DB.prepare("SELECT * FROM posts WHERE id=?").bind(id).first():null;
 if(b.id&&!old)return error("Bài viết không tồn tại.",404);
 const published=b.status==="published"?(old?.published_at||new Date().toISOString()):null;
 try{
 if(old)await e.DB.prepare("UPDATE posts SET locale=?,slug=?,title=?,excerpt=?,body=?,category=?,cover_id=?,status=?,seo_title=?,seo_description=?,published_at=?,deleted_at=NULL,updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(b.locale,b.slug,b.title.trim(),b.excerpt,b.body,b.category,b.cover_id||null,b.status,b.seo_title,b.seo_description,published,id).run();
 else await e.DB.prepare("INSERT INTO posts(id,locale,slug,title,excerpt,body,category,cover_id,status,seo_title,seo_description,created_by,published_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)").bind(id,b.locale,b.slug,b.title.trim(),b.excerpt,b.body,b.category,b.cover_id||null,b.status,b.seo_title,b.seo_description,user.id,published).run();
 }catch(ex){if(String(ex).includes("UNIQUE"))return error("Đường dẫn slug đã tồn tại.",409);throw ex}
 await audit(e,user,b.status==="published"?"publish":"save",id);return reply({post:await e.DB.prepare("SELECT "+cols+" FROM posts WHERE id=?").bind(id).first()});
}
const trash=p.match(/^\/api\/posts\/([0-9a-f-]{36})\/(trash|restore)$/);
if(m==="POST"&&trash){await e.DB.prepare(trash[2]==="restore"?"UPDATE posts SET deleted_at=NULL,updated_at=CURRENT_TIMESTAMP WHERE id=?":"UPDATE posts SET deleted_at=CURRENT_TIMESTAMP,updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(trash[1]).run();await audit(e,user,trash[2],trash[1]);return reply({ok:true})}
if(m==="GET"&&p==="/api/media"){const x=await e.DB.prepare("SELECT id,content_type,byte_size,created_at FROM media ORDER BY created_at DESC LIMIT 200").all();return reply({media:x.results})}
if(m==="POST"&&p==="/api/upload"){
 const mime=(r.headers.get("Content-Type")||"").split(";")[0].toLowerCase(),n=Number(r.headers.get("content-length")||0);
 if(!["image/jpeg","image/png","image/webp","image/gif"].includes(mime))return error("Chỉ nhận ảnh JPEG, PNG, WebP, GIF.",415);
 if(n>6*1024*1024)return error("Ảnh vượt quá 6 MB.",413);
 const buf=await r.arrayBuffer(),b=new Uint8Array(buf);if(buf.byteLength<20||buf.byteLength>6*1024*1024)return error("Ảnh không hợp lệ.",413);
 const sig=[...b.slice(0,12)].map(x=>x.toString(16).padStart(2,"0")).join("");
 const valid=mime==="image/jpeg"&&sig.startsWith("ffd8ff")||mime==="image/png"&&sig.startsWith("89504e470d0a1a0a")||mime==="image/gif"&&(sig.startsWith("474946383761")||sig.startsWith("474946383961"))||mime==="image/webp"&&new TextDecoder().decode(b.slice(0,4))==="RIFF"&&new TextDecoder().decode(b.slice(8,12))==="WEBP";
 if(!valid)return error("Định dạng ảnh không khớp nội dung.",415);
 const id=crypto.randomUUID(),key="blog/"+id+"."+{"image/jpeg":"jpg","image/png":"png","image/webp":"webp","image/gif":"gif"}[mime];
 await e.MEDIA.put(key,buf,{httpMetadata:{contentType:mime}});await e.DB.prepare("INSERT INTO media(id,storage_key,content_type,byte_size,uploaded_by) VALUES(?,?,?,?,?)").bind(id,key,mime,buf.byteLength,user.id).run();await audit(e,user,"upload",id);return reply({id,url:"/media/"+id},201);
}
if(m==="GET"&&p==="/api/users"&&user.role==="owner"){const x=await e.DB.prepare("SELECT id,email,display_name,role,created_at FROM users ORDER BY created_at").all();return reply({users:x.results})}
if(m==="POST"&&p==="/api/invite"&&user.role==="owner"){
 const b=await read(r),email=String(b?.email||"").trim().toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return error("Email không hợp lệ.");
 if(await e.DB.prepare("SELECT id FROM users WHERE email=?").bind(email).first())return error("Email đã có tài khoản.",409);
 const t=rand();await e.DB.prepare("INSERT INTO invitations(token_hash,email,role,inviter_id,expires_at) VALUES(?,?,'editor',?,datetime('now','+7 days'))").bind(await hash(t),email,user.id).run();await audit(e,user,"invite",email);return reply({code:t,email,expires_in_days:7});
}
if(m==="POST"&&p==="/api/password"){
 const b=await read(r);if(!goodPass(b?.new_password)||typeof b.current_password!=="string")return error("Mật khẩu tối thiểu 12 ký tự.");
 const old=await e.DB.prepare("SELECT salt,password_hash FROM users WHERE id=?").bind(user.id).first();
 if(!equal(await crypt(b.current_password,old.salt),old.password_hash))return error("Mật khẩu hiện tại không đúng.",403);
 const salt=rand();await e.DB.prepare("UPDATE users SET salt=?,password_hash=? WHERE id=?").bind(salt,await crypt(b.new_password,salt),user.id).run();
 await e.DB.prepare("DELETE FROM sessions WHERE user_id=? AND token_hash<>?").bind(user.id,user.token_hash).run();return reply({ok:true});
}
if(m==="GET"&&p==="/api/export"&&user.role==="owner"){
 const a=await e.DB.prepare("SELECT "+cols+" FROM posts ORDER BY created_at").all(),b=await e.DB.prepare("SELECT id,storage_key,content_type,byte_size,created_at FROM media").all();
 return new Response(JSON.stringify({version:"1.1.0",exported_at:new Date().toISOString(),posts:a.results,media:b.results}),{headers:{"Content-Type":"application/json","Content-Disposition":"attachment; filename=huong-thien-blog-studio-backup.json",...HEAD}});
}
return error("Không tìm thấy.",404);
}catch(x){console.error("Blog Studio",x);return error("Có lỗi hệ thống. Vui lòng thử lại.",500)}
}};