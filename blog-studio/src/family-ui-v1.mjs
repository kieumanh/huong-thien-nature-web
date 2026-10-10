export function familyUI(){
return String.raw`<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Tài khoản · Hương Thiền Blog Studio</title><style>
:root{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#294b3b;background:#f4f6ed}*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;background:radial-gradient(circle at 10% 15%,#dceadd 0,transparent 34%),#f6f7f0}.box{width:min(100%,500px);border:1px solid #dce6d8;background:#fffefa;border-radius:22px;padding:clamp(24px,5vw,47px);box-shadow:0 16px 50px #12341a14}.brand{font:28px Georgia,serif;color:#326a4d}.brand small{display:block;font:700 10px system-ui;letter-spacing:2.3px;margin:8px 0 35px}h1{font:400 clamp(32px,6vw,44px)/1.12 Georgia,serif;margin:0 0 14px}.subtitle{color:#748777;line-height:1.7;margin-bottom:29px;font-size:14px}label{display:block;color:#5d7964;font-size:13px;font-weight:600;margin:16px 0}input{display:block;width:100%;padding:13px 15px;border:1px solid #d6e3d5;border-radius:10px;margin:9px 0 0;background:#fff;outline-color:#5a9772;font:15px system-ui}.buttons{display:flex;gap:10px;flex-wrap:wrap;margin:18px 0}button{background:#356b4c;border:0;border-radius:10px;color:#fff;padding:13px 20px;font-weight:600;cursor:pointer}button.secondary{background:#e6efe3;color:#326b4d}button:disabled{opacity:.6;cursor:wait}.msg{white-space:pre-wrap;line-height:1.5;margin-top:14px;color:#236543;font-size:14px}.msg.bad{color:#b34338}.footer{border-top:1px solid #e5ebe0;padding-top:18px;margin-top:32px;font-size:13px;color:#829184}.footer a{color:#386c4e;text-decoration:none}.hide{display:none}#detail{font-size:14px;line-height:1.6;background:#f2f6ef;padding:14px;border-radius:9px}
</style></head><body><div class="box"><div class="brand">✺ Hương Thiền<small>BLOG STUDIO · GIA ĐÌNH</small></div><h1 id="heading">Tài khoản</h1><p class="subtitle" id="description"></p><form id="form" autocomplete="on"><div id="fields"></div><div class="buttons"><button id="submit" type="submit">Tiếp tục</button></div></form><p class="msg" id="message" role="status" aria-live="polite"></p><div class="footer"><a href="/">← Đăng nhập Blog Studio</a> · <a href="/register">Đăng ký</a> · <a href="/forgot-password">Quên mật khẩu</a></div></div>
<script>
(function(){
const path=location.pathname,params=new URLSearchParams(location.search),secret=params.get('token');const el=id=>document.getElementById(id);
const fields=el('fields'),msg=el('message'),form=el('form'),btn=el('submit');
const input=(label,type,name,auto)=>{const wrap=document.createElement('label');wrap.textContent=label;const item=document.createElement('input');item.type=type;item.id=name;item.name=name;item.autocomplete=auto||'off';item.required=true;wrap.appendChild(item);fields.appendChild(wrap);return item};
const config={
'/owner-setup':['Kích hoạt quản trị','Xác nhận email chủ sở hữu trước khi thiết lập mật khẩu.','Gửi liên kết kích hoạt'],
'/owner-complete':['Thiết lập tài khoản','Tạo mật khẩu riêng cho tài khoản chủ sở hữu. Liên kết sử dụng một lần.','Kích hoạt tài khoản'],
'/register':['Đăng ký tham gia','Sau khi xác minh email, yêu cầu sẽ được chủ sở hữu phê duyệt.','Gửi email xác minh'],
'/verify-email':['Xác minh địa chỉ email','Xác minh để gửi yêu cầu đến chủ sở hữu.','Xác minh email'],
'/approve':['Phê duyệt tài khoản','Chỉ chủ sở hữu đã đăng nhập mới được phê duyệt hoặc từ chối.','Phê duyệt'],
'/activate':['Tạo mật khẩu','Tài khoản đã được chấp thuận. Hãy đặt mật khẩu mới.','Kích hoạt'],
'/forgot-password':['Quên mật khẩu','Nhập email đã đăng ký để nhận liên kết đặt lại mật khẩu.','Gửi liên kết'],
'/reset-password':['Đặt lại mật khẩu','Liên kết chỉ có hiệu lực một lần.','Cập nhật mật khẩu']
};
const selected=config[path]||config['/register'];el('heading').textContent=selected[0];el('description').textContent=selected[1];btn.textContent=selected[2];
let name,email,password,confirm;
if(['/owner-setup','/register','/forgot-password'].includes(path))email=input('Địa chỉ email','email','email','email');
if(['/register','/owner-complete'].includes(path))name=input('Họ và tên','text','name','name');
if(['/owner-complete','/reset-password','/activate'].includes(path)){password=input('Mật khẩu mới (ít nhất 12 ký tự)','password','password','new-password');confirm=input('Nhập lại mật khẩu','password','confirm','new-password')}
let reject;
if(path==='/approve'){const detail=document.createElement('p');detail.id='detail';detail.textContent='Đang kiểm tra yêu cầu...';fields.appendChild(detail);reject=document.createElement('button');reject.type='button';reject.className='secondary';reject.textContent='Từ chối';btn.parentNode.appendChild(reject)}
const say=(text,bad=false)=>{msg.textContent=text;msg.className='msg'+(bad?' bad':'')};
async function api(endpoint,data,method='POST'){const opts={method,credentials:'same-origin',headers:{'Content-Type':'application/json'}};if(method==='POST')opts.body=JSON.stringify(data);const r=await fetch(endpoint,opts),o=await r.json();if(!r.ok)throw Error(o.error||'Không thể thực hiện yêu cầu.');return o}
if(path==='/approve'){if(!secret){say('Liên kết phê duyệt không hợp lệ.',true);btn.disabled=true;reject.disabled=true}else api('/api/auth/pending?token='+encodeURIComponent(secret),null,'GET').then(x=>{el('detail').textContent='Tên: '+x.request.display_name+' | Email: '+x.request.email;}).catch(e=>say(e.message+' Nếu chưa đăng nhập, hãy mở Blog Studio ở tab khác rồi quay lại.',true));reject.onclick=async()=>{if(!window.confirm('Từ chối yêu cầu này?'))return;try{const r=await api('/api/auth/reject',{token:secret});say(r.message);btn.disabled=reject.disabled=true}catch(e){say(e.message,true)}}}
form.onsubmit=async event=>{event.preventDefault();if((password&&password.value!==confirm.value)){say('Hai mật khẩu chưa khớp.',true);return}if(password&&password.value.length<12){say('Mật khẩu phải có ít nhất 12 ký tự.',true);return}btn.disabled=true;try{
let endpoint,data;
if(path==='/owner-setup'){endpoint='/api/auth/owner-start';data={email:email.value}}
if(path==='/owner-complete'){endpoint='/api/auth/owner-complete';data={token:secret,name:name.value,password:password.value}}
if(path==='/register'){endpoint='/api/auth/register';data={name:name.value,email:email.value}}
if(path==='/verify-email'){endpoint='/api/auth/verify';data={token:secret}}
if(path==='/approve'){endpoint='/api/auth/approve';data={token:secret}}
if(path==='/activate'){endpoint='/api/auth/activate';data={token:secret,password:password.value}}
if(path==='/forgot-password'){endpoint='/api/auth/forgot';data={email:email.value}}
if(path==='/reset-password'){endpoint='/api/auth/reset';data={token:secret,password:password.value}}
if(!endpoint)throw Error('Đường dẫn không hợp lệ.');
if(['verify-email','approve','activate','owner-complete','reset-password'].includes(path)&&!secret)throw Error('Không tìm thấy mã xác thực.');
const r=await api(endpoint,data);say(r.message||'Đã hoàn tất.');if(['owner-complete','activate','reset-password','approve'].includes(path))form.style.display='none';
}catch(e){say(e.message,true)}finally{btn.disabled=false}};
})();
</script></body></html>`;
}