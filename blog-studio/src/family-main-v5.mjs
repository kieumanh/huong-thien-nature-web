import core from "./worker-v5.mjs";
import {familyAuth} from "./family-auth-v3.mjs";
import {upgradedFamilyUI} from "./family-ui-v2.mjs";
import {enhanceSecurityForms} from "./password-ui-v2.mjs";
const HTML_HEADERS={"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff","Referrer-Policy":"no-referrer","X-Frame-Options":"DENY","Content-Security-Policy":"default-src 'none'; connect-src 'self'; img-src 'self' data: https:; script-src 'unsafe-inline'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'","Strict-Transport-Security":"max-age=31536000"};
const pages=new Set(["/owner-setup","/owner-complete","/register","/verify-email","/approve","/activate","/forgot-password","/reset-password"]);
export default {async fetch(request,env,ctx){
 try{
 const url=new URL(request.url),p=url.pathname,method=request.method;
 if(method==="POST"&&["/api/setup","/api/join","/api/invite"].includes(p))return Response.json({error:"Vui lòng sử dụng xác thực và phê duyệt qua email."},{status:410,headers:{"Cache-Control":"no-store"}});
 if(p.startsWith("/api/auth/"))return familyAuth(request,env);
 if(method==="GET"&&pages.has(p))return new Response(upgradedFamilyUI(),{headers:HTML_HEADERS});
 if(method==="GET"&&["/","/login","/setup"].includes(p)){
  const owner=await env.DB.prepare("SELECT COUNT(*) AS n FROM users WHERE role='owner'").first();
  if(!owner?.n)return Response.redirect(url.origin+"/owner-setup",302);
  if(p==="/setup")return Response.redirect(url.origin+"/",302);
  const res=await core.fetch(request,env,ctx);
  if(res.headers.get("content-type")?.includes("text/html")){
   const html=(await res.text()).replace("</form></section><div id=\"app\"",'</form><p style="font-size:13px"><a href="/register">Đăng ký</a> · <a href="/forgot-password">Quên mật khẩu?</a></p></section><div id="app"').replace("</head>","<style>#invite,#inviteEmail{display:none}body a{color:#356b4c}</style></head>");
   return new Response(enhanceSecurityForms(html),{status:res.status,headers:res.headers});
  }
  return res;
 }
 if(method==="GET"&&p==="/join")return Response.redirect(url.origin+"/register",302);
 return core.fetch(request,env,ctx);
 }catch(e){console.error("Blog Studio routing",String(e?.message||e));return Response.json({error:"Hệ thống đang gặp lỗi."},{status:503})}
}};
