// Shared progressive enhancement for password forms.
// Never sends passwords to another service; all feedback is local to the browser.
export function enhanceSecurityForms(html) {
 const css=String.raw`<style>
.password-control{position:relative;display:block}.password-control>input{padding-right:53px!important}
.password-visibility{position:absolute;right:8px;top:50%;transform:translateY(-50%);display:flex;align-items:center;justify-content:center;width:40px;height:38px;padding:5px;border:0;background:transparent;color:#427353;cursor:pointer;border-radius:8px;margin:0}
.password-visibility:hover,.password-visibility:focus-visible{background:#e5efe6;outline-offset:2px}
.password-visibility svg{width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.password-meter{margin:10px 0 16px;font:12px/1.5 system-ui,-apple-system,'Segoe UI',sans-serif;letter-spacing:normal;text-transform:none;color:#627c67}
.password-meter-track{height:6px;border-radius:99px;background:#e6eae3;overflow:hidden;margin:8px 0}
.password-meter-fill{display:block;width:0;height:100%;background:#b7bcb3;border-radius:99px;transition:width .2s ease,background .2s ease}
.password-meter-info{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
.password-meter-hint{font-size:11px;color:#839588;margin-top:3px}
.password-meter[data-grade="1"] .password-meter-fill{background:#cc5f51}
.password-meter[data-grade="2"] .password-meter-fill{background:#c69046}
.password-meter[data-grade="3"] .password-meter-fill{background:#6f9675}
.password-meter[data-grade="4"] .password-meter-fill{background:#2e7654}
.password-meter[data-grade="5"] .password-meter-fill{background:#236f50}
h1,.brand{font-family:'Segoe UI',system-ui,sans-serif!important;letter-spacing:-.018em}
</style>`;
 const script=String.raw`<script>
(function(){
 const EYE='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
 const EYE_OFF='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 5.1A10.9 10.9 0 0112 5c6.4 0 10 7 10 7a15 15 0 01-4 4.6M6.8 6.8C3.6 8.5 2 12 2 12s3.6 7 10 7c1.7 0 3.2-.5 4.5-1.3"/><path d="M10.5 10.5a2.1 2.1 0 003 3"/></svg>';
 function score(value){
  const chars=[...value],length=chars.length;if(!length)return {n:0,label:'Chưa nhập',hint:'Nên từ 12 ký tự, kết hợp nhiều loại ký tự'};
  const groups=[/[a-z]/.test(value),/[A-Z]/.test(value),/[0-9]/.test(value),/[^a-zA-Z0-9]/u.test(value)].filter(Boolean).length;
  const unique=new Set(chars).size;
  const simple=/(password|matkhau|123456|qwerty|admin|abcdef|111111|aaaaaa|000000)/i.test(value);
  let n=1;if(length>=8)n++;if(length>=12&&groups>=2)n++;if(length>=16&&groups>=3)n++;if(length>=20&&groups>=3&&unique>=12)n++;
  if(simple||unique<=3)n=Math.min(n,1);
  else if(/(.)\1{3,}/u.test(value))n=Math.min(n,2);
  return {n,label:['','Rất yếu','Yếu','Trung bình','Mạnh','Rất mạnh'][n],hint:length<12?'Tối thiểu 12 ký tự để tạo tài khoản':groups<3?'Nên bổ sung chữ hoa, chữ thường, số hoặc ký hiệu':'Không nên dùng tên, ngày sinh hay mật khẩu từng sử dụng'};
 }
 function add(input){
  if(input.dataset.passwordEnhanced)return;input.dataset.passwordEnhanced='1';
  const box=document.createElement('span');box.className='password-control';
  input.parentNode.insertBefore(box,input);box.appendChild(input);
  const button=document.createElement('button');button.type='button';button.className='password-visibility';button.setAttribute('aria-label','Hiện mật khẩu');button.setAttribute('aria-pressed','false');button.title='Hiện mật khẩu';button.innerHTML=EYE;
  button.addEventListener('click',()=>{const visible=input.type==='password';input.type=visible?'text':'password';button.innerHTML=visible?EYE_OFF:EYE;button.title=visible?'Ẩn mật khẩu':'Hiện mật khẩu';button.setAttribute('aria-label',button.title);button.setAttribute('aria-pressed',String(visible));input.focus({preventScroll:true})});box.appendChild(button);
  if(/confirm|repeat|nhap-lai/i.test(input.id+' '+input.name))return;
  const meter=document.createElement('div');meter.className='password-meter';meter.setAttribute('aria-live','polite');
  meter.innerHTML='<div class="password-meter-track"><span class="password-meter-fill"></span></div><div class="password-meter-info"><span class="password-meter-label">Độ mạnh: Chưa nhập</span><span class="password-meter-count"></span></div><div class="password-meter-hint">Nên từ 12 ký tự, kết hợp nhiều loại ký tự</div>';
  box.insertAdjacentElement('afterend',meter);
  const update=()=>{const value=input.value,x=score(value);meter.dataset.grade=String(x.n);meter.querySelector('.password-meter-fill').style.width=(x.n*20)+'%';meter.querySelector('.password-meter-label').textContent='Độ mạnh: '+x.label;meter.querySelector('.password-meter-count').textContent=[...value].length+' ký tự';meter.querySelector('.password-meter-hint').textContent=x.hint};
  input.addEventListener('input',update);update();
 }
 function scan(){document.querySelectorAll('input[type="password"]').forEach(add)}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scan);else scan();
 const observer=new MutationObserver(()=>{if(document.querySelector('input[type="password"]:not([data-password-enhanced])'))scan()});
 observer.observe(document.documentElement,{childList:true,subtree:true});
})();
</script>`;
 const brand=html
  .replace(/Vườn câu chữ\s*[·\-]\s*Gia đình\s*[·\-]\s*/gi,"Vườn câu chữ · ")
  .replace(/Gia đình\s*(?:và|&)\s*(?:dữ liệu|sao lưu)/gi,"Thành viên và sao lưu")
  .replace(/BLOG STUDIO\s*[·\-]\s*GIA ĐÌNH/gi,"BLOG STUDIO · QUẢN LÝ NỘI DUNG")
  .replace(/GIA ĐÌNH/gi,"ĐỐI TÁC")
  .replace(/Gia đình/gi,"Đối tác")
  .replace(/gia đình/gi,"đối tác");
 const styled=brand.includes("</head>")?brand.replace("</head>",css+"</head>"):brand.replace("</style>","</style>"+css);
 return styled.includes("</body>")?styled.replace("</body>",script+"</body>"):styled.replace("</html>",script+"</html>");
}
