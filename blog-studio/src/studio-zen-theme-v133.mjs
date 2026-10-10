import {applyNatureBrand} from "./studio-nature-theme.mjs";
export function applyZenBrand(html) {
 let result=applyNatureBrand(html);
 result=result.replaceAll('<span>Hương Thiền<small>BLOG STUDIO</small></span>','<span>Zen Studio<small>CONTENT MANAGEMENT</small></span>');
 result=result.replaceAll('<span>Hương Thiền<small>NATURE · STUDIO</small></span>','<span>Zen Studio<small>CONTENT MANAGEMENT</small></span>');
 result=result.replaceAll("Hương Thiền Nature Studio","Zen Studio")
   .replaceAll("HƯƠNG THIỀN NATURE STUDIO","ZEN STUDIO")
   .replaceAll("Hương Thiền Blog Studio","Zen Studio")
   .replaceAll("Hương Thiền Studio","Zen Studio")
   .replaceAll("HƯƠNG THIỀN STUDIO","ZEN STUDIO")
   .replaceAll("Nature Studio","Zen Studio")
   .replaceAll("Blog Studio","Zen Studio");
 result=result.replaceAll("<title>Hương Thiền · Bảng quản trị nội dung</title>","<title>Zen Studio · Quản trị nội dung</title>");
 return result;
}
