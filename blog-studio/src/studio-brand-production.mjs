import core from "./studio-api-journal.mjs";
import {applyNatureBrand} from "./studio-nature-theme.mjs";
export default { async fetch(request,env,ctx) {const result=await core.fetch(request,env,ctx);const path=new URL(request.url).pathname;if(request.method!=="GET"||!(result.headers.get("content-type")||"").includes("text/html")||path.startsWith("/read/"))return result;const headers=new Headers(result.headers);headers.delete("content-length");headers.set("cache-control","private,no-store");return new Response(applyNatureBrand(await result.text()),{status:result.status,headers});}};
