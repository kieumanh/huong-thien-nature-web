"""Build every Living Zen 2.0 brand asset into brand/.

    python3 brand/scripts/build.py            # foundation, logos, icons, patterns
    python3 brand/scripts/kits.py             # social, stationery, publishing… templates
    python3 brand/scripts/book.py             # brand book + quick guide (needs Playwright/Chrome)

Needs: rsvg-convert, ImageMagick `convert`, Pillow, fontTools + brotli, and the brand fonts installed
locally for live-text previews (build.py installs them under ~/.local/share/fonts/livingzen).
"""
from __future__ import annotations

import json
import os
import shutil
import subprocess
from pathlib import Path

from PIL import Image

import foundation as F
import icons as I
import logos as L
import patterns as P

BRAND = Path(__file__).resolve().parent.parent
ROOT = BRAND.parent


def write(path: Path | str, text: str):
    path = BRAND / path
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding='utf-8')
    return path


def png(svg: Path, out: Path, width: int, background: str | None = None):
    out.parent.mkdir(parents=True, exist_ok=True)
    cmd = ['rsvg-convert', '-w', str(width), str(svg), '-o', str(out)]
    if background:
        cmd[1:1] = ['-b', background]
    subprocess.run(cmd, check=True)


def pdf(svg: Path, out: Path):
    out.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(['rsvg-convert', '-f', 'pdf', str(svg), '-o', str(out)], check=True)


def webp(source_png: Path, out: Path):
    Image.open(source_png).save(out, 'WEBP', quality=92, method=6)


def install_fonts():
    target = Path.home() / '.local/share/fonts/livingzen'
    target.mkdir(parents=True, exist_ok=True)
    from fontTools.ttLib import TTFont
    for woff in (BRAND / 'fonts').glob('*.woff2'):
        ttf = target / woff.with_suffix('.ttf').name
        if not ttf.exists():
            font = TTFont(woff); font.flavor = None; font.save(ttf)
    subprocess.run(['fc-cache', '-f'], check=False, capture_output=True)


# ------------------------------------------------------------------ logos
def build_logos():
    legacy = BRAND / 'logos/legacy'
    legacy.mkdir(parents=True, exist_ok=True)
    for name in ['huong-thien-logo-light.webp', 'huong-thien-logo-forest.webp', 'huong-thien-logo-footer.webp']:
        shutil.copy2(ROOT / 'public/media' / name, legacy / name)
    for name in ['favicon.ico', 'favicon-32x32.png', 'apple-touch-icon.png', 'android-chrome-192x192.png']:
        shutil.copy2(ROOT / 'public' / name, legacy / name)

    for name, mark in L.concepts().items():
        mark_file = write(f'logos/concepts/{name}-mark.svg', L.svg(512, 512, mark, f'Concept {name}'))
        lock = write(f'logos/concepts/{name}-lockup.svg', L.concept_lockup(name, mark))
        png(lock, BRAND / f'logos/concepts/{name}-lockup.png', 1200)
        png(mark_file, BRAND / f'logos/concepts/{name}-mark-512.png', 512)

    colors = {'forest': L.FOREST, 'orchid': L.ORCHID, 'golden': L.GOLD, 'ivory': L.IVORY, 'black': L.BLACK, 'white': L.WHITE}
    folders = {'primary': 'primary', 'horizontal': 'horizontal', 'vertical': 'vertical', 'compact': 'compact', 'mark': 'brand-mark', 'wordmark': 'wordmark'}
    for kind, folder in folders.items():
        for color_name, hex_value in colors.items():
            group = 'monochrome' if color_name in ('black', 'white') else folder
            name = f'htn-{kind}-{color_name}'
            file = write(f'logos/{group}/{name}.svg', L.lockup(kind, hex_value))
            if color_name in ('forest', 'black'):
                png(file, BRAND / f'logos/{group}/{name}-2048.png', 2048)
                png(file, BRAND / f'logos/{group}/{name}-1024.png', 1024)
                webp(BRAND / f'logos/{group}/{name}-1024.png', BRAND / f'logos/{group}/{name}.webp')
                pdf(file, BRAND / f'logos/{group}/{name}.pdf')
        # reversed: ivory on forest, previewed with its background
        rev = write(f'logos/reversed/htn-{kind}-reversed.svg', L.lockup(kind, L.PAPER, background=L.FOREST))
        png(rev, BRAND / f'logos/reversed/htn-{kind}-reversed-1024.png', 1024)
        rev_night = write(f'logos/reversed/htn-{kind}-golden-on-night.svg', L.lockup(kind, L.GOLD, background=L.NIGHT))
        png(rev_night, BRAND / f'logos/reversed/htn-{kind}-golden-on-night-1024.png', 1024)

    mark = BRAND / 'logos/brand-mark/htn-mark-forest.svg'
    for size in (32, 48, 64, 128, 192, 256, 512, 1024, 2048):
        png(mark, BRAND / f'logos/brand-mark/png/htn-mark-forest-{size}.png', size)

    fav = write('logos/favicon/htn-favicon.svg', L.lockup('favicon'))
    fav16 = write('logos/favicon/htn-favicon-16.svg', L.lockup('favicon-16'))
    png(fav16, BRAND / 'logos/favicon/favicon-16.png', 16)
    for size in (24, 32, 48, 64):
        png(fav, BRAND / f'logos/favicon/favicon-{size}.png', size)
    subprocess.run(['convert', *(str(BRAND / f'logos/favicon/favicon-{s}.png') for s in (16, 32, 48)), str(BRAND / 'logos/favicon/favicon.ico')], check=True)

    app = write('logos/app-icons/htn-app-icon.svg', L.app_icon())
    mask = write('logos/app-icons/htn-maskable.svg', L.app_icon(maskable=True))
    png(app, BRAND / 'logos/app-icons/apple-touch-icon-180.png', 180)
    for size in (192, 512):
        png(app, BRAND / f'logos/app-icons/android-chrome-{size}.png', size)
        png(mask, BRAND / f'logos/app-icons/maskable-{size}.png', size)
    write('logos/watermark/htn-watermark-forest.svg', L.watermark())
    write('logos/watermark/htn-watermark-ivory.svg', L.watermark(L.PAPER))
    cob = write('logos/co-branding/htn-cobrand-template.svg', L.cobrand())
    png(cob, BRAND / 'logos/co-branding/htn-cobrand-template.png', 1400, '#FFFFFF')

    # size test sheet: brand mark at the sizes the prompt asks to verify
    sizes = [16, 24, 32, 48, 64, 128, 256, 512]
    tiles = []
    for size in sizes:
        src = fav16 if size == 16 else fav if size <= 48 else mark
        out = BRAND / f'logos/tests/mark-{size}.png'
        png(src, out, size)
        tiles.append(out)
    sheet = Image.new('RGB', (sum(sizes) + 40 * (len(sizes) + 1), 600), '#FBF6EA')
    x = 40
    for size, tile in zip(sizes, tiles):
        img = Image.open(tile).convert('RGBA')
        sheet.paste(img, (x, 300 - size // 2), img)
        x += size + 40
    sheet.save(BRAND / 'logos/tests/size-test-sheet.png')


# ------------------------------------------------------------------ colours and tokens
def build_colors():
    palette = {
        'primary': [dict(id=k, name=n, vi=v, hex=h, role=r) for k, n, v, h, r in F.PRIMARY],
        'supporting': [dict(id=k, name=n, vi=v, hex=h, role=r) for k, n, v, h, r in F.SUPPORTING],
        'extended': [dict(id=k, name=n, hex=h) for k, n, h in F.EXTENDED],
        'semantic': [dict(id=k, text=t, surface=s, rule=r) for k, t, s, r in F.SEMANTIC],
        'proportion_day': {'paper & neutrals': 55, 'forest & greens': 25, 'orchid': 10, 'earth clay': 5, 'golden light': 5},
    }
    write('colors/palette.json', json.dumps(palette, ensure_ascii=False, indent=2) + '\n')
    rows = [(n, h) for _, n, _, h, _ in F.PRIMARY + F.SUPPORTING]
    body = ''
    for i, (name, hex_value) in enumerate(rows):
        x = 30 + (i % 4) * 240; y = 30 + (i // 4) * 250
        fg = '#FBF6EA' if F.contrast(hex_value, '#FBF6EA') > 3 else '#243F32'
        body += (f'<rect x="{x}" y="{y}" width="220" height="220" rx="20" fill="{hex_value}" stroke="#DDD5BF"/>'
                 f'<text x="{x + 20}" y="{y + 170}" font-family="Lora" font-size="22" fill="{fg}">{name}</text>'
                 f'<text x="{x + 20}" y="{y + 198}" font-family="Be Vietnam Pro" font-size="16" fill="{fg}">{hex_value}</text>')
    svg = write('colors/palette.svg', f'<svg xmlns="http://www.w3.org/2000/svg" width="990" height="540" viewBox="0 0 990 540"><rect width="100%" height="100%" fill="#FFFDF7"/>{body}</svg>\n')
    png(svg, BRAND / 'colors/palette.png', 1980)

    table = '| Chữ | Nền | Tỷ lệ | Dùng được cho |\n|---|---|---:|---|\n'
    for fg, bg in F.PAIRS:
        ratio = F.contrast(F.ALL[fg], F.ALL[bg])
        table += f'| {fg} `{F.ALL[fg]}` | {bg} `{F.ALL[bg]}` | {ratio:.2f}:1 | {F.verdict(ratio)} |\n'
    write('accessibility/contrast-tokens.md', '# Tương phản các cặp màu Living Zen (tính theo WCAG 2.2)\n\n'
          'Tính trên giá trị token, chưa gồm gradient, độ mờ hay ảnh nền. Kiểm tra giao diện thật xem `accessibility/README.md`.\n\n' + table)
    return table


def build_tokens():
    write('tokens/primitive.json', json.dumps(F.PRIMITIVE, ensure_ascii=False, indent=2) + '\n')
    write('tokens/semantic.json', json.dumps(F.SEMANTIC_TOKENS, ensure_ascii=False, indent=2) + '\n')
    write('tokens/components.json', json.dumps(F.COMPONENT_TOKENS, ensure_ascii=False, indent=2) + '\n')
    css = F.tokens_css()
    write('tokens/tokens.css', css)
    (ROOT / 'src/styles/living-zen-tokens.css').write_text(css, encoding='utf-8')


# ------------------------------------------------------------------ icons
def build_icons():
    sheet = ''
    for group, items in (('brand', I.BRAND), ('functional', I.FUNCTIONAL)):
        for n, (key, (title, body)) in enumerate(items.items()):
            write(f'icons/{group}/{key}.svg', I.icon_svg(body, title))
    items = list(I.BRAND.items()) + list(I.FUNCTIONAL.items())
    for n, (key, (title, body)) in enumerate(items):
        x = (n % 9) * 110 + 20; y = (n // 9) * 120 + 20
        sheet += (f'<g transform="translate({x + 15} {y}) scale(2.5)" fill="none" stroke="#243F32" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">{body}</g>'
                  f'<text x="{x + 45}" y="{y + 88}" font-family="Be Vietnam Pro" font-size="12" text-anchor="middle" fill="#586557">{title}</text>')
    svg = write('icons/icon-sheet.svg', f'<svg xmlns="http://www.w3.org/2000/svg" width="1010" height="500" viewBox="0 0 1010 500"><rect width="100%" height="100%" fill="#FBF6EA"/>{sheet}</svg>\n')
    png(svg, BRAND / 'icons/icon-sheet.png', 2020)


# ------------------------------------------------------------------ visual language
VARIANTS = {'master': ('#243F32', None), 'mono': ('#111111', None), 'light': ('#526747', '#FBF6EA'), 'dark': ('#FFE7A8', '#100C24')}


def build_patterns():
    count = 0
    contact = ''
    for family, motifs in P.MOTIFS.items():
        for key, fn in motifs.items():
            for variant, (color, bg) in VARIANTS.items():
                write(f'patterns/{family}/{key}-{variant}.svg', P.motif_svg(fn, color, bg))
            write(f'patterns/{family}/{key}-watermark.svg', P.motif_svg(lambda c, fn=fn: f'<g opacity=".14">{fn(c)}</g>', '#243F32'))
            x = (count % 10) * 120 + 10; y = (count // 10) * 130 + 10
            contact += f'<g transform="translate({x} {y}) scale(.55)">{fn("#243F32")}</g><text x="{x + 55}" y="{y + 122}" font-size="10" font-family="Be Vietnam Pro" text-anchor="middle" fill="#586557">{key}</text>'
            count += 1
    sheet = write('patterns/motif-sheet.svg', f'<svg xmlns="http://www.w3.org/2000/svg" width="1210" height="{(count // 10 + 1) * 130 + 10}"><rect width="100%" height="100%" fill="#FBF6EA"/>{contact}</svg>\n')
    png(sheet, BRAND / 'patterns/motif-sheet.png', 2420)

    previews = []
    for key in P.PATTERNS:
        write(f'patterns/seamless/{key}-tile.svg', P.pattern_tile_svg(key, '#526747'))
        file = write(f'patterns/seamless/{key}-light.svg', P.pattern_svg(key, '#526747', '#FBF6EA'))
        write(f'patterns/seamless/{key}-dark.svg', P.pattern_svg(key, '#C88A2C', '#100C24'))
        out = BRAND / f'patterns/seamless/png/{key}-light.png'
        png(file, out, 600)
        previews.append(out)
    for key, fn in P.DIVIDERS.items():
        write(f'patterns/dividers/{key}.svg', P.divider_svg(fn, '#243F32'))
        write(f'patterns/dividers/{key}-gold.svg', P.divider_svg(fn, '#C88A2C'))
    for key, fn in P.FRAMES.items():
        write(f'patterns/frames/{key}.svg', P.frame_svg(fn, '#243F32'))
        write(f'patterns/frames/{key}-orchid.svg', P.frame_svg(fn, '#713C63'))
    for key, fn in P.TEXTURES.items():
        file = write(f'patterns/textures/{key}.svg', P.texture_svg(fn, '#243F32', '#FBF6EA'))
        png(file, BRAND / f'patterns/textures/png/{key}.png', 400)
    for key in P.MOTION:
        write(f'motion/{key}.svg', P.motion_svg(key, '#243F32'))
    grid = Image.new('RGB', (4 * 610 + 10, 3 * 410 + 10), '#FFFFFF')
    for i, file in enumerate(previews):
        grid.paste(Image.open(file).convert('RGB'), (10 + (i % 4) * 610, 10 + (i // 4) * 410))
    grid.save(BRAND / 'patterns/seamless/pattern-sheet.png')
    return count


# ------------------------------------------------------------------ typography specimen
def build_specimen():
    lines = ['Hương Thiền Nature', 'Từ thiên nhiên, trở về với chính mình.', 'Tình yêu thương vô điều kiện · Nông nghiệp thuận tự nhiên',
             'Trí tuệ và nhận biết · Thân – Tâm – Trí', 'ă â đ ê ô ơ ư · ằ ẳ ẵ ắ ặ · ề ể ễ ế ệ · ồ ổ ỗ ố ộ · ờ ở ỡ ớ ợ · ừ ử ữ ứ ự · ỳ ỷ ỹ ý ỵ']
    faces = [('Georgia (hiện tại)', 'Georgia, DejaVu Serif'), ('Lora — chọn cho biên tập', 'Lora'), ('Noto Serif', 'Noto Serif, DejaVu Serif'),
             ('Be Vietnam Pro — tài liệu in', 'Be Vietnam Pro'), ('System UI — giao diện web', 'DejaVu Sans'), ('Dancing Script — cảm xúc', 'Dancing Script')]
    body = ''; y = 40
    for label, family in faces:
        body += f'<text x="40" y="{y}" font-family="Be Vietnam Pro" font-size="15" fill="#855510">{label}</text>'
        y += 34
        for line in lines[:2] + lines[3:5]:
            body += f'<text x="40" y="{y}" font-family="{family}" font-size="{24 if "ă" not in line else 19}" fill="#243F32">{line}</text>'
            y += 32
        y += 18
    svg = write('typography/vietnamese-specimen.svg', f'<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="{y}"><rect width="100%" height="100%" fill="#FBF6EA"/>{body}</svg>\n')
    png(svg, BRAND / 'typography/vietnamese-specimen.png', 1650)
    licenses = BRAND / 'typography/licenses'
    licenses.mkdir(parents=True, exist_ok=True)
    shutil.copy2(ROOT / 'public/fonts/dancing-script-OFL.txt', licenses / 'dancing-script-OFL.txt')


def build_public():
    """Copy the few files the internal design-system page (/living-zen/) shows. Nothing else goes to public/."""
    out = ROOT / 'public/brand'
    if out.exists():
        shutil.rmtree(out)
    (out / 'icons').mkdir(parents=True)
    for name in L.concepts():
        shutil.copy2(BRAND / f'logos/concepts/{name}-mark.svg', out / f'concept-{name}.svg')
    for name in ['primary/htn-primary-forest', 'horizontal/htn-horizontal-forest', 'brand-mark/htn-mark-forest', 'reversed/htn-horizontal-reversed', 'reversed/htn-mark-golden-on-night', 'wordmark/htn-wordmark-orchid', 'app-icons/htn-app-icon', 'favicon/htn-favicon']:
        shutil.copy2(BRAND / f'logos/{name}.svg', out / (name.split('/')[1] + '.svg'))
    for group in ('brand', 'functional'):
        for file in (BRAND / f'icons/{group}').glob('*.svg'):
            shutil.copy2(file, out / 'icons' / f'{group}-{file.name}')
    for family, key in [('lotus', 'lotus-layered'), ('enso', 'enso-ink'), ('botanical', 'sprout'), ('breath', 'ripple'), ('orbit', 'solar-minimal'), ('seed', 'seed-6-no-hoa'), ('earth', 'terraces'), ('golden-geometry', 'vesica')]:
        shutil.copy2(BRAND / f'patterns/{family}/{key}-master.svg', out / f'motif-{key}.svg')
    for key in ('breath-waves', 'leaf-rain', 'terrace-lines', 'enso-dots'):
        shutil.copy2(BRAND / f'patterns/seamless/{key}-light.svg', out / f'pattern-{key}.svg')
    for key in ('breath-circle', 'leaf-sway', 'lotus-bloom', 'orbit'):
        shutil.copy2(BRAND / f'motion/{key}.svg', out / f'motion-{key}.svg')


if __name__ == '__main__':
    install_fonts()
    build_logos()
    print('contrast pairs:\n' + build_colors())
    build_tokens()
    build_icons()
    print('motifs:', build_patterns())
    build_specimen()
    build_public()
    print('done')
