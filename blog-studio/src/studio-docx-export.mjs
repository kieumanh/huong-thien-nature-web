// Word OOXML and ZIP archive generator. No remote conversion service required.
const T=new TextEncoder(),utf=s=>T.encode(String(s));
const join=a=>{let n=a.reduce((s,x)=>s+x.length,0),r=new Uint8Array(n),p=0;for(const x of a){r.set(x,p);p+=x.length}return r};
const b2=n=>new Uint8Array([n&255,(n>>>8)&255]),b4=n=>new Uint8Array([n&255,(n>>>8)&255,(n>>>16)&255,(n>>>24)&255]);
const C=(()=>{let a=new Uint32Array(256);for(let i=0;i<256;i++){let c=i;for(let z=0;z<8;z++)c=c&1?0xedb88320^(c>>>1):c>>>1;a[i]=c}return a})();
const crc=d=>{let c=-1;for(let x of d)c=C[(c^x)&255]^(c>>>8);return(c^-1)>>>0};
export function zip(entries){
 let local=[],central=[],offset=0;
 for(const [name,blob] of entries){let n=utf(name),d=blob instanceof Uint8Array?blob:utf(blob),len=d.length,check=crc(d);
 if(len>35e6)throw Error("File too large");let lh=join([b4(0x04034b50),b2(20),b2(0x0800),b2(0),b2(0),b2(0),b4(check),b4(len),b4(len),b2(n.length),b2(0),n]);
 local.push(lh,d);central.push(join([b4(0x02014b50),b2(20),b2(20),b2(0x0800),b2(0),b2(0),b2(0),b4(check),b4(len),b4(len),b2(n.length),b2(0),b2(0),b2(0),b2(0),b4(0),b4(offset),n]));offset+=lh.length+len}
 let cd=join(central);return join([...local,cd,b4(0x06054b50),b2(0),b2(0),b2(central.length),b2(central.length),b4(cd.length),b4(offset),b2(0)]);
}
const xml=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"}[c])).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,"");
const p=(s,style="Normal")=>'<w:p><w:pPr><w:pStyle w:val="'+style+'"/></w:pPr><w:r><w:t xml:space="preserve">'+xml(s)+'</w:t></w:r></w:p>';
const picture=(rid,id)=>'<w:p><w:r><w:drawing><wp:inline><wp:extent cx="4937760" cy="2777490"/><wp:docPr id="'+(id+1)+'" name="Ảnh minh họa"/><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="0" name="image"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="'+rid+'"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="4937760" cy="2777490"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>';
const types='<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>'+["jpg","jpeg","png","webp","gif"].map(ext=>'<Default Extension="'+ext+'" ContentType="image/'+(ext==="jpg"?"jpeg":ext)+'"/>').join("")+'<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>';
const pkgRels='<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>';
const styles='<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'+[["Normal",24],["Title",40],["Heading1",32],["Heading2",27]].map(([id,size])=>'<w:style w:type="paragraph" w:styleId="'+id+'"><w:name w:val="'+id+'"/><w:rPr><w:rFonts w:ascii="'+(id==="Normal"?"Calibri":"Georgia")+'"/><w:sz w:val="'+size+'"/><w:color w:val="243F32"/></w:rPr></w:style>').join("")+'</w:styles>';
const extOf={"image/jpeg":"jpg","image/png":"png","image/webp":"webp","image/gif":"gif"};
const imageIds=post=>[...new Set([...(post.cover_id?[post.cover_id]:[]),...[...post.body.matchAll(/!\[[^\]]*\]\(\/media\/([0-9a-f-]{36})\)/g)].map(m=>m[1])])].slice(0,12);
async function imagesFor(post,env){let result=[];for(const id of imageIds(post)){let row=await env.DB.prepare("SELECT storage_key,content_type,byte_size FROM media WHERE id=?").bind(id).first();if(!row||!extOf[row.content_type]||row.byte_size>4000000)continue;const file=await env.MEDIA.get(row.storage_key);if(file)result.push({id,ext:extOf[row.content_type],data:new Uint8Array(await file.arrayBuffer())})}return result}
export function docx(post,images){
 let lookup=new Map(images.map((a,i)=>[a.id,{rel:"rId"+(i+1),index:i}]));
 let lines=[p(post.title,"Title")];if(post.excerpt)lines.push(p(post.excerpt));if(lookup.has(post.cover_id))lines.push(picture(lookup.get(post.cover_id).rel,0));
 for(const line of post.body.split(/\r?\n/)){let m=line.trim().match(/^!\[[^\]]*\]\(\/media\/([0-9a-f-]{36})\)$/);if(m){if(m[1]!==post.cover_id&&lookup.has(m[1])){let pic=lookup.get(m[1]);lines.push(picture(pic.rel,pic.index+1))}continue}if(!line.trim())continue;let style=/^#{1,2}\s/.test(line)?"Heading1":/^###\s/.test(line)?"Heading2":"Normal";let cleaned=line.replace(/^#{1,3}\s+|^>\s+|^-\s+/,"").replace(/\*\*/g,"");lines.push(p(cleaned,style))}
 let document='<?xml version="1.0" encoding="utf-8"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><w:body>'+lines.join("")+'<w:sectPr><w:pgSz w:w="11906" w:h="16838"/></w:sectPr></w:body></w:document>';
 let rels='<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+images.map((im,i)=>'<Relationship Id="rId'+(i+1)+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/img'+i+'.'+im.ext+'"/>').join("")+'</Relationships>';
 return zip([["[Content_Types].xml",types],["_rels/.rels",pkgRels],["word/document.xml",document],["word/styles.xml",styles],["word/_rels/document.xml.rels",rels],...images.map((im,i)=>["word/media/img"+i+"."+im.ext,im.data])]);
}
export async function exportBundle(request,env,user){
 if(!user)return Response.json({error:"Đăng nhập để xuất file."},{status:401});
 let u=new URL(request.url),ids=(u.searchParams.get("ids")||"").split(",").filter(Boolean),format=u.searchParams.get("format");
 if(!ids.length||ids.length>20||ids.some(i=>!/^[0-9a-f-]{36}$/.test(i)))return Response.json({error:"Chọn từ 1 đến 20 bài viết."},{status:400});
 let entries=[["README.txt","Hương Thiền Studio: mỗi thư mục có bài DOCX (ảnh nhúng), Markdown và ảnh gốc."]],total=0;
 for(const id of ids){let post=await env.DB.prepare("SELECT * FROM posts WHERE id=? AND deleted_at IS NULL").bind(id).first();if(!post)return Response.json({error:"Bài viết không tồn tại."},{status:404});
 let imgs=await imagesFor(post,env);total+=imgs.reduce((n,v)=>n+v.data.length,0);if(total>28000000)return Response.json({error:"Ảnh lớn hơn 28 MB; hãy xuất ít bài hơn."},{status:413});
 let bytes=docx(post,imgs);if(ids.length===1&&format==="docx")return new Response(bytes,{headers:{"Content-Type":"application/vnd.openxmlformats-officedocument.wordprocessingml.document","Content-Disposition":'attachment; filename="'+post.slug+'.docx"',"Cache-Control":"no-store"}});
 let base="huong-thien-studio/"+post.locale+"-"+post.slug+"/";entries.push([base+post.slug+".docx",bytes],[base+post.slug+".md","# "+post.title+"\n\n"+post.excerpt+"\n\n"+post.body],...imgs.map(x=>[base+"images/"+x.id+"."+x.ext,x.data]))}
 return new Response(zip(entries),{headers:{"Content-Type":"application/zip","Content-Disposition":'attachment; filename="huong-thien-studio-articles.zip"',"Cache-Control":"private,no-store"}});
}