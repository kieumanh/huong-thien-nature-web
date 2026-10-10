import {familyUI} from "./family-ui-v1.mjs";
import {enhanceSecurityForms} from "./password-ui-v2.mjs";
export function upgradedFamilyUI(){
  let html=familyUI();
  const previous="const r=await fetch(endpoint,opts),o=await r.json();if(!r.ok)throw Error(o.error||'Không thể thực hiện yêu cầu.');return o";
  const replacement=String.raw`const r=await fetch(endpoint,opts);
  const ct=(r.headers.get('content-type')||'').toLowerCase();
  const raw=await r.text();
  if(!ct.includes('json')){
    const ray=r.headers.get('cf-ray');
    const hint=r.status===403||r.status===429
      ? 'Yêu cầu có thể đã bị lớp bảo vệ máy chủ kiểm tra. Hãy thử lại sau ít phút.'
      : 'Máy chủ trả về định dạng không mong đợi. Vui lòng thử lại.';
    throw Error(hint+' (HTTP '+r.status+(ray?', mã '+ray:'')+').');
  }
  let o;
  try{o=JSON.parse(raw)}catch{
    throw Error('Phản hồi máy chủ không hợp lệ (HTTP '+r.status+'). Vui lòng thử lại.');
  }
  if(!r.ok)throw Error(o.error||'Không thể thực hiện yêu cầu (HTTP '+r.status+').');
  return o`;
  if(!html.includes(previous))throw Error("Outdated email form: API wrapper not found");
  html=html.replace(previous,replacement);
  html=html.replace("password.value.length<12","[...password.value].length<12");
  html=html.replace("if(!confirm('Từ chối yêu cầu này?'))","if(!window.confirm('Từ chối yêu cầu này?'))");
  return enhanceSecurityForms(html);
}
