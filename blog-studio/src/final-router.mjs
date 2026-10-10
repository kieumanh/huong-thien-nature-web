import app from './entry.mjs';
const pages=new Set(['/register','/forgot-password','/verify-email','/approve','/activate','/reset-password']);
export default {fetch(request,env,ctx){const u=new URL(request.url);if(request.method==='GET'&&pages.has(u.pathname)){return app.fetch(new Request(u.origin+'/',{headers:request.headers}),env,ctx)}return app.fetch(request,env,ctx)}};
