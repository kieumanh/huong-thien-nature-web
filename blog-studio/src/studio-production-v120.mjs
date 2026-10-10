import core from "./studio-release-v120.mjs";
import {STUDIO_JS as BEFORE} from "./studio-client-v6.mjs";
import {STUDIO_JS as AFTER} from "./studio-client-v120.mjs";
const EXTRA_CSS=".reader-report{padding:24px;margin:18px 0}.reader-head{display:flex;justify-content:space-between;gap:18px;flex-wrap:wrap}.reader-head h2{font:400 29px Georgia,serif;color:#243f32;margin:9px 0}.reader-head p{font-size:12px;max-width:650px;color:#627360}.reader-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:20px 0}.reader-summary span{display:block;font-size:11px;color:#6a7c6b}.reader-summary strong{display:block;font:400 33px Georgia,serif;color:#243f32;margin-top:6px}.reader-svg{width:100%;height:auto;max-height:280px}.reader-legend{display:flex;gap:15px;flex-wrap:wrap;font-size:11px;color:#607360}.reader-legend span:first-child{color:#294d37}.reader-legend span:nth-child(2){color:#b18b59}.reader-subheading{font:400 22px Georgia,serif;margin:24px 0 9px}.reader-rank-row{display:grid;grid-template-columns:25px minmax(0,1fr) 55px 125px;gap:12px;align-items:center;padding:11px 0;border-top:1px solid #e3e9df;font-size:12px}.reader-rank-row a{color:#264a37;text-decoration:none}.reader-rank-row small{text-align:right;color:#849080}.reader-rank-row b{text-align:right}.export-toolbar{display:flex;justify-content:flex-end;margin:15px 0}@media(max-width:650px){.reader-report{padding:15px}.reader-summary strong{font-size:26px}.reader-rank-row{grid-template-columns:18px minmax(0,1fr) 45px}.reader-rank-row small{display:none}}";
export default {async fetch(request,env,ctx){
 const response=await core.fetch(request,env,ctx);
 const path=new URL(request.url).pathname;
 if(request.method!=="GET"||!["/","/login"].includes(path)||!(response.headers.get("Content-Type")||"").includes("text/html"))return response;
 const before=await response.text();
 const html=before.replace(BEFORE,AFTER).replace("PHIÊN BẢN 1.1.0","PHIÊN BẢN 1.2.0").replace("</head>",'<style id="studio-release-style">'+EXTRA_CSS+'</style></head>');
 const headers=new Headers(response.headers);headers.delete("Content-Length");headers.set("Cache-Control","private,no-store");
 return new Response(html,{status:response.status,headers});
}};