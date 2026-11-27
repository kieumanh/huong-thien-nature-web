"""Brand Book and Quick Guide: Markdown → HTML → PDF (Chrome via Playwright).

    python3 brand/scripts/book.py

Writes guidelines/brand-book.md (all chapters joined), brand-book.pdf (high quality),
brand-book-web.pdf (smaller images), quick-guide.pdf, and copies strategy chapters to strategy/.
"""
from __future__ import annotations

import re
import shutil
import tempfile
from pathlib import Path

import markdown
from PIL import Image
from playwright.sync_api import sync_playwright

BRAND = Path(__file__).resolve().parent.parent
GUIDE = BRAND / 'guidelines'

CSS = """
@font-face{font-family:Lora;src:url('FONTS/lora-latin-wght-normal.woff2');font-weight:400 700;unicode-range:U+0000-00FF,U+2000-206F}
@font-face{font-family:Lora;src:url('FONTS/lora-vietnamese-wght-normal.woff2');font-weight:400 700;unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0309,U+0323,U+1EA0-1EF9,U+20AB}
@font-face{font-family:Lora;font-style:italic;src:url('FONTS/lora-latin-wght-italic.woff2');font-weight:400 700}
@font-face{font-family:'Dancing Script';src:url('FONTS/dancing-script-latin-700-normal.woff2');unicode-range:U+0000-00FF}
@font-face{font-family:'Dancing Script';src:url('FONTS/dancing-script-vietnamese-700-normal.woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0309,U+0323,U+1EA0-1EF9}
@font-face{font-family:'Be Vietnam Pro';src:url('FONTS/be-vietnam-pro-latin-400-normal.woff2');unicode-range:U+0000-00FF,U+2000-206F}
@font-face{font-family:'Be Vietnam Pro';src:url('FONTS/be-vietnam-pro-vietnamese-400-normal.woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0309,U+0323,U+1EA0-1EF9,U+20AB}
@font-face{font-family:'Be Vietnam Pro';font-weight:600;src:url('FONTS/be-vietnam-pro-latin-600-normal.woff2');unicode-range:U+0000-00FF}
@font-face{font-family:'Be Vietnam Pro';font-weight:600;src:url('FONTS/be-vietnam-pro-vietnamese-600-normal.woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0309,U+0323,U+1EA0-1EF9}
@page{size:A4;margin:18mm 18mm 20mm;@bottom-center{content:counter(page)}}
html{font:10.5pt/1.6 'Be Vietnam Pro',sans-serif;color:#243F32;background:#FBF6EA;-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0}
h1{font:500 26pt/1.15 Lora,serif;color:#243F32;break-before:page;margin:0 0 6mm;padding-top:4mm;border-top:3px solid #F4C76B}
h1:first-of-type{break-before:auto}
h2{font:500 15pt/1.25 Lora,serif;margin:8mm 0 2mm;break-after:avoid}
h3{font:600 11.5pt/1.3 'Be Vietnam Pro',sans-serif;margin:5mm 0 1.5mm;break-after:avoid}
p,li{orphans:3;widows:3}
blockquote{margin:4mm 0;padding:2mm 6mm;border-left:2px solid #CDB1C7;color:#713C63;font:italic 12pt/1.5 Lora,serif}
table{width:100%;border-collapse:collapse;margin:3mm 0;font-size:9pt;break-inside:auto}
th,td{border-bottom:1px solid #DDD5BF;padding:1.6mm 2mm;text-align:left;vertical-align:top}
th{background:#F6EED9;font-weight:600}
tr{break-inside:avoid}
code{font:9pt/1.4 'DejaVu Sans Mono',monospace;background:#F3EBD4;padding:.2mm 1mm;border-radius:2px}
pre{background:#F3EBD4;padding:3mm;border-radius:3mm;font-size:8pt;break-inside:avoid;white-space:pre-wrap}
pre code{background:none;padding:0}
img{max-width:100%;display:block;margin:3mm auto;break-inside:avoid}
img.half{display:inline-block;width:48%;margin:2mm 1%}
img.third{display:inline-block;width:31%;margin:2mm 1%;vertical-align:top}
em{color:#586557}
.cover{height:257mm;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;break-after:page;background:#243F32;color:#FBF6EA;margin:-18mm -18mm 0;padding:18mm}
.cover img{width:110mm;margin:0 auto 10mm}
.cover .title{font:500 30pt/1.15 Lora,serif;margin:0}
.cover .tag{font:700 20pt 'Dancing Script';color:#F4C76B;margin:6mm 0}
.cover .meta{font-size:9.5pt;opacity:.85}
.cover-note{padding:3mm 5mm;background:#F6EED9;border-radius:3mm;font-size:9pt;margin-bottom:5mm}
.toc{columns:2;font-size:9.5pt}.toc li{break-inside:avoid}
"""


def render_html(md_text: str, base: Path, title: str, cover: bool, toc: bool, small_images: Path | None) -> str:
    html = markdown.markdown(md_text, extensions=['tables', 'attr_list', 'fenced_code'])
    def fix(match):
        src = match.group(1)
        path = (base / src).resolve()
        if small_images and path.suffix == '.png' and path.exists():
            out = small_images / (str(abs(hash(path))) + '.jpg')
            image = Image.open(path).convert('RGB'); image.thumbnail((1000, 1000)); image.save(out, 'JPEG', quality=78)
            path = out
        return f'src="{path.as_uri()}"'
    html = re.sub(r'src="([^"]+)"', fix, html)
    head = ''
    if cover:
        logo = (BRAND / 'logos/primary/htn-primary-ivory.svg').as_uri()
        head = (f'<section class="cover"><img src="{logo}" alt=""><p class="title">{title}</p>'
                '<p class="tag">Understand yourself. Live with nature. Live self-directed. Grow together.</p><p class="meta">Living Zen — Organic Spiritual Design System · Phiên bản thương hiệu 2.0.1 · 27/11/2026</p></section>')
    if toc:
        items = re.findall(r'<h2>(.*?)</h2>', html)
        head += '<h2>Mục lục</h2><ol class="toc">' + ''.join(f'<li>{re.sub("<[^>]+>", "", item)}</li>' for item in items) + '</ol>'
    css = CSS.replace('FONTS', (BRAND / 'fonts').as_uri())
    return f'<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>{title}</title><style>{css}</style></head><body>{head}{html}</body></html>'


def to_pdf(html: str, out: Path):
    with tempfile.NamedTemporaryFile('w', suffix='.html', delete=False, encoding='utf-8') as handle:
        handle.write(html)
        source = Path(handle.name)
    with sync_playwright() as p:
        browser = p.chromium.launch(args=['--no-sandbox', '--allow-file-access-from-files'])
        page = browser.new_page()
        page.goto(source.as_uri(), wait_until='networkidle')
        page.pdf(path=str(out), format='A4', print_background=True, display_header_footer=True, header_template='<span></span>',
                 footer_template='<div style="width:100%;text-align:center;font:8px sans-serif;color:#586557">Hương Thiền Nature · Living Zen 2.0 · <span class="pageNumber"></span>/<span class="totalPages"></span></div>',
                 margin={'top': '18mm', 'bottom': '18mm', 'left': '18mm', 'right': '18mm'})
        browser.close()
    source.unlink()


def build():
    chapters = sorted((GUIDE / 'chapters').glob('*.md'))
    book = '\n\n'.join(chapter.read_text(encoding='utf-8') for chapter in chapters)
    (GUIDE / 'brand-book.md').write_text('<!-- Generated by brand/scripts/book.py from guidelines/chapters/. Edit the chapters. -->\n\n' + book, encoding='utf-8')
    strategy = BRAND / 'strategy'
    strategy.mkdir(exist_ok=True)
    shutil.copy2(GUIDE / 'chapters/02-chien-luoc.md', strategy / 'brand-strategy.md')
    voice = (GUIDE / 'chapters/02-chien-luoc.md').read_text(encoding='utf-8')
    voice = voice[voice.index('## 9.'):voice.index('## 10.')]
    (strategy / 'brand-voice.md').write_text('# Brand Voice — Living Zen 2.0\n\n' + voice, encoding='utf-8')
    colour = (GUIDE / 'chapters/04-mau-chu.md').read_text(encoding='utf-8')
    apps = (GUIDE / 'chapters/07-ung-dung.md').read_text(encoding='utf-8')
    arch = ('# Brand Architecture — Living Zen 2.0\n\nMô hình **branded house**: một thương hiệu mẹ, nhiều không gian chuyên đề có cá tính riêng. '
            'Dự án tương lai (Khu vườn nội tâm, Không gian học viên, Thư viện trí tuệ, Hệ thống thực hành miễn phí, Trợ lý học tập Bạn Đạo, Chương trình sống cộng đồng, Sách và ấn phẩm) '
            'dùng thương hiệu mẹ + một màu không gian từ bảng dưới; chức năng nghiệp vụ của các dự án này nằm ngoài phạm vi đợt nâng cấp thương hiệu.\n\n'
            + colour[colour.index('## 24.'):colour.index('## 25.')] + '\n' + apps[apps.index('## 40.'):])
    (strategy / 'brand-architecture.md').write_text(arch, encoding='utf-8')

    to_pdf(render_html(book, GUIDE, 'Living Zen — Brand Guidelines 2.0', True, True, None), GUIDE / 'brand-book.pdf')
    with tempfile.TemporaryDirectory() as small:
        to_pdf(render_html(book, GUIDE, 'Living Zen — Brand Guidelines 2.0', True, True, Path(small)), GUIDE / 'brand-book-web.pdf')
    quick = (GUIDE / 'quick-guide.md').read_text(encoding='utf-8')
    to_pdf(render_html(quick, GUIDE, 'Living Zen 2.0 · Quick Guide', False, False, None), GUIDE / 'quick-guide.pdf')


if __name__ == '__main__':
    build()
