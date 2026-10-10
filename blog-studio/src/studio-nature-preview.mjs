import {applyNatureBrand} from "./studio-nature-theme.mjs";
const proxyHeaders={"Cache-Control":"private,no-store","X-Robots-Tag":"noindex, nofollow, noarchive"};
export default {async fetch(request,env,ctx) {
 const url=new URL(request.url),path=url.pathname;
 if(!["GET","HEAD"].includes(request.method)&&!["/api/login","/api/logout"].includes(path)) {
   return Response.json({error:"Bản xem thử giao diện ở chế độ chỉ đọc. Mở studio.huongthiennature.com để thay đổi nội dung."},{status:403,headers:proxyHeaders});
 }
 const result=await env.STUDIO.fetch(request);
 const h=new Headers(result.headers);
 h.set("X-Robots-Tag","noindex, nofollow, noarchive");
 if((h.get("Content-Type")||"").includes("text/html") && !path.startsWith("/read/")){
   const body=applyNatureBrand(await result.text());
   h.delete("Content-Length");
   h.set("Cache-Control","private,no-store");
   h.set("X-Studio-Theme","Hương Thiền Nature preview");
   return new Response(body,{status:result.status,headers:h});
 }
 return new Response(result.body,{status:result.status,headers:h});
}};
