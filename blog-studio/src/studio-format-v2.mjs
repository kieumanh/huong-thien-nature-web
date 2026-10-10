// Escape-first, intentionally limited Markdown renderer for public article pages.
// No arbitrary HTML, scripts, iframes or unsafe URL schemes.
export function renderArticleMarkdown(source){
 const escape=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const inline=s=>s.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*([^*]+)\*/g,"<em>$1</em>").replace(/\[([^\]]{1,120})\]\((https?:\/\/[^\s()]{1,700})\)/g,(_,title,href)=>'<a target="_blank" rel="noopener noreferrer" href="'+href+'">'+title+"</a>");
 return escape(source).split(/\r?\n/).map(line=>{
  if(/^!\[[^\]]*\]\(\/media\/[0-9a-f-]{36}\)$/.test(line)){
   const m=line.match(/^!\[([^\]]*)\]\(\/media\/([0-9a-f-]{36})\)$/);
   return '<figure><img loading="lazy" style="max-width:100%;height:auto;border-radius:12px" src="/media/'+m[2]+'" alt="'+m[1]+'"></figure>';
  }
  if(line.startsWith("### "))return "<h3>"+inline(line.slice(4))+"</h3>";
  if(line.startsWith("## "))return "<h2>"+inline(line.slice(3))+"</h2>";
  if(line.startsWith("# "))return "<h2>"+inline(line.slice(2))+"</h2>";
  if(line.startsWith("> "))return '<blockquote style="border-left:3px solid #80aa87;padding-left:18px">'+inline(line.slice(2))+"</blockquote>";
  if(line.startsWith("- "))return "<p>• "+inline(line.slice(2))+"</p>";
  if(line.trim()==="---")return "<hr>";
  return line.trim()? "<p>"+inline(line)+"</p>":"";
 }).join("\n");
}