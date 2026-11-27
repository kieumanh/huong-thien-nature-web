"""Living Zen 2.0 application kits: social, stationery, publishing, education, packaging, space,
merchandise and video templates.

Templates keep LIVE, editable text (Dancing Script / Lora / Be Vietnam Pro, all SIL OFL), so a
designer can change words in any SVG editor. Text in [square brackets] is a placeholder that must be
replaced with real, verified information; nothing here states a real ingredient, certificate,
date or price. Print pieces are drawn in millimetres and include 3 mm bleed; keep text 5 mm inside.

    python3 brand/scripts/kits.py
"""
from __future__ import annotations

import io
import subprocess
from pathlib import Path

import qrcode
import qrcode.image.svg

import logos as L
import patterns as P

BRAND = Path(__file__).resolve().parent.parent
OUT = BRAND / 'templates'
FOREST, PAPER, ORCHID, GOLD, NIGHT, MOSS, CLAY, CREAM, INK = '#243F32', '#FBF6EA', '#713C63', '#F4C76B', '#100C24', '#526747', '#8B523D', '#F6EED9', '#586557'
GOLD_ACCENT, PLUM, GOLD_HI, MIST = '#855510', '#2C1F50', '#FFE7A8', '#F1E4EE'
SCRIPT, SERIF, SANS = 'Dancing Script', 'Lora', 'Be Vietnam Pro'
SITE = 'huongthiennature.com'


def esc(text: str) -> str:
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def T(x, y, text, size, family=SANS, color=FOREST, weight=400, anchor='start', spacing=0, lines=None, leading=1.35, style='normal'):
    """Live text. lines: list of strings rendered as tspans."""
    attrs = (f'font-family="{family}" font-size="{size}" fill="{color}" font-weight="{weight}" text-anchor="{anchor}" '
             f'letter-spacing="{spacing}" font-style="{style}"')
    if lines:
        spans = ''.join(f'<tspan x="{x}" dy="{0 if i == 0 else size * leading:.2f}">{esc(line)}</tspan>' for i, line in enumerate(lines))
        return f'<text x="{x}" y="{y}" {attrs}>{spans}</text>'
    return f'<text x="{x}" y="{y}" {attrs}>{esc(text)}</text>'


def wrap(text: str, width: int) -> list[str]:
    words, lines, current = text.split(), [], ''
    for word in words:
        if len(current) + len(word) + 1 > width and current:
            lines.append(current); current = word
        else:
            current = f'{current} {word}'.strip()
    return lines + [current]


def mark(x, y, size, color=FOREST):
    return L.place(L.mark_living_roots(color), size, x, y)


def logo_h(x, y, height, color=FOREST):
    """Horizontal lockup scaled to a height (source lockup is ~250 high)."""
    _, width = L.words(color, 100)
    text, _ = L.words(color, 100, y=150, x=250)
    s = height / 250
    return f'<g transform="translate({x} {y}) scale({s:.4f})">{L.place(L.mark_living_roots(color), 230, 10, 10)}{text}</g>', (250 + width + 40) * s


def logo_v(cx, y, height, color=FOREST):
    text, _ = L.words(color, 100, y=650, x=400, anchor='middle')
    s = height / 760
    return f'<g transform="translate({cx - 400 * s:.2f} {y}) scale({s:.4f})">{L.place(L.mark_living_roots(color), 460, 170, 40)}{text}</g>'


def motif(fn, x, y, size, color, opacity=1):
    return f'<g transform="translate({x} {y}) scale({size / 200:.4f})" opacity="{opacity}">{fn(color)}</g>'


def pattern_fill(key, color, w, h, opacity=.12, x=0, y=0, scale=1):
    size, body = P.PATTERNS[key]
    pid = f'p-{key}'
    return (f'<defs><pattern id="{pid}" width="{size}" height="{size}" patternUnits="userSpaceOnUse" patternTransform="scale({scale})">{body(color)}</pattern></defs>'
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="url(#{pid})" opacity="{opacity}"/>')


def qr(x, y, size, data=f'https://{SITE}/vi/', color=FOREST):
    code = qrcode.QRCode(border=0, error_correction=qrcode.constants.ERROR_CORRECT_M)
    code.add_data(data); code.make()
    matrix = code.get_matrix(); n = len(matrix); cell = size / n
    rects = ''.join(f'<rect x="{x + c * cell:.3f}" y="{y + r * cell:.3f}" width="{cell + .02:.3f}" height="{cell + .02:.3f}"/>' for r, row in enumerate(matrix) for c, v in enumerate(row) if v)
    return f'<g fill="{color}">{rects}</g>'


def canvas(w, h, body, bg=PAPER, unit='px'):
    size = f'width="{w}{unit}" height="{h}{unit}"' if unit != 'px' else f'width="{w}" height="{h}"'
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" {size}><rect width="{w}" height="{h}" fill="{bg}"/>{body}</svg>\n'


def placeholder_tag(x, y, size, text='MẪU · thay bằng thông tin thật'):
    return T(x, y, text, size, SANS, CLAY, 600, spacing=size * .05)


# ======================================================================= social media (px)
def social_quote(w, h, quote, dark=False):
    bg, fg, accent = (NIGHT, GOLD_HI, GOLD) if dark else (PAPER, ORCHID, FOREST)
    lines = wrap(quote, 22 if w <= 1080 else 34)
    size = w * .075
    body = pattern_fill('breath-waves', accent, w, h, .07) + motif(P.enso_open, w * .5 - w * .36, h * .5 - w * .36, w * .72, accent, .18)
    body += T(w / 2, h / 2 - (len(lines) - 1) * size * .65, '', size, SCRIPT, fg, 700, 'middle', lines=lines, leading=1.3)
    body += logo_h(w / 2 - w * .17, h - w * .14, w * .085, accent)[0]
    return canvas(w, h, body, bg)


def social_card(w, h, eyebrow, title, text, cta, dark=False, motif_fn=P.lotus_layered, photo=True):
    bg, fg, sub, accent = (NIGHT, GOLD_HI, '#D7CFE6', GOLD) if dark else (PAPER, FOREST, INK, FOREST)
    m = w * .08
    body = ''
    if photo:
        body += (f'<rect x="{m}" y="{m}" width="{w - 2 * m}" height="{h * .42}" rx="{w * .03}" fill="{CREAM if not dark else PLUM}"/>'
                 + motif(motif_fn, w / 2 - h * .12, m + h * .07, h * .24, accent, .5)
                 + T(w / 2, m + h * .38, '[ẢNH THẬT · tỷ lệ khung giữ nguyên]', w * .022, SANS, sub, 600, 'middle'))
    top = m + h * .42 + m * .8 if photo else m * .6
    body += T(m, top + w * .03, eyebrow.upper(), w * .026, SANS, GOLD_ACCENT if not dark else GOLD, 700, spacing=w * .004)
    tl = wrap(title, 24)
    body += T(m, top + w * .11, '', w * .062, SERIF, fg, 500, lines=tl, leading=1.18)
    yy = top + w * .11 + len(tl) * w * .062 * 1.18
    body += T(m, yy + w * .02, '', w * .032, SANS, sub, 400, lines=wrap(text, 48), leading=1.45)
    body += (f'<rect x="{m}" y="{h - m - w * .1}" width="{w * .36}" height="{w * .085}" rx="{w * .0425}" fill="{FOREST if not dark else GOLD}"/>'
             + T(m + w * .18, h - m - w * .1 + w * .053, cta, w * .03, SANS, PAPER if not dark else NIGHT, 600, 'middle'))
    body += logo_h(w - m - w * .3, h - m - w * .1, w * .085, accent)[0]
    return canvas(w, h, body, bg)


def social_avatar(w, dark=False):
    bg, fg = (FOREST, PAPER) if not dark else (NIGHT, GOLD)
    return canvas(w, w, mark(w * .14, w * .12, w * .72, fg), bg)


TAGLINE_VI = ['Hiểu mình. Thuận tự nhiên.', 'Sống tự chủ. Cùng trưởng thành.']


def fit_tagline(x, y_center, max_w, cap, color, anchor='end', weight=700):
    """Tagline hai dòng, co cỡ chữ để dòng dài nhất không vượt max_w (tránh đè lên logo)."""
    size = min(cap, max_w / (.5 * max(len(line) for line in TAGLINE_VI)))
    return T(x, y_center - .3 * size, '', size, SCRIPT, color, weight, anchor, lines=TAGLINE_VI, leading=1.3)


def social_cover(w, h, safe_w, safe_h, dark=False, logo_ratio=.55, stacked=False):
    bg, fg, accent = (FOREST, PAPER, GOLD) if not dark else (NIGHT, GOLD_HI, GOLD)
    sx, sy = (w - safe_w) / 2, (h - safe_h) / 2
    body = pattern_fill('terrace-lines', fg, w, h, .1)
    if stacked:
        # logo trên, tagline căn giữa bên dưới (logo quá rộng để đặt cạnh chữ)
        lh = safe_h * .42
        lg, lw = logo_h(0, 0, lh, fg)
        body += f'<g transform="translate({sx + (safe_w - lw) / 2} {sy + safe_h * .1})">{lg}</g>'
        body += fit_tagline(sx + safe_w / 2, sy + safe_h * .1 + lh + safe_h * .2, safe_w * .8, safe_h * .15, accent, 'middle')
    else:
        lh = safe_h * logo_ratio
        lg, lw = logo_h(0, 0, lh, fg)
        x0 = sx + safe_w * .04
        right = sx + safe_w * .96
        body += f'<g transform="translate({x0} {sy + (safe_h - lh) / 2})">{lg}</g>'
        body += fit_tagline(right, sy + safe_h / 2, right - (x0 + lw) - safe_w * .03, safe_h * .16, accent)
    body += f'<rect x="{sx}" y="{sy}" width="{safe_w}" height="{safe_h}" fill="none" stroke="{accent}" stroke-dasharray="12 10" opacity=".35"><title>Vùng an toàn — xóa khi xuất bản</title></rect>'
    return canvas(w, h, body, bg)


def social_thumbnail(w, h, title, dark=True):
    bg, fg = (NIGHT, GOLD_HI) if dark else (PAPER, FOREST)
    body = f'<rect x="{w * .52}" y="0" width="{w * .48}" height="{h}" fill="{PLUM if dark else CREAM}"/>' + motif(P.enso_light, w * .58, h * .14, h * .72, GOLD if dark else FOREST, .7)
    body += T(w * .05, h * .36, '', h * .11, SERIF, fg, 600, lines=wrap(title, 16), leading=1.12)
    body += logo_h(w * .05, h * .8, h * .1, GOLD if dark else FOREST)[0]
    return canvas(w, h, body, bg)


def social_story(w, h, title, text, dark=False):
    bg, fg, sub, accent = (NIGHT, GOLD_HI, '#D7CFE6', GOLD) if dark else (PAPER, ORCHID, INK, FOREST)
    body = pattern_fill('leaf-rain', accent, w, h, .06)
    body += f'<rect x="0" y="0" width="{w}" height="{h * .12}" fill="none"/><rect x="0" y="{h * .86}" width="{w}" height="{h * .14}" fill="none"/>'
    body += motif(P.lotus_line, w / 2 - w * .2, h * .22, w * .4, accent)
    body += T(w / 2, h * .5, '', w * .09, SCRIPT, fg, 700, 'middle', lines=wrap(title, 16), leading=1.2)
    body += T(w / 2, h * .68, '', w * .036, SANS, sub, 400, 'middle', lines=wrap(text, 38), leading=1.5)
    body += logo_h(w / 2 - w * .2, h * .8, w * .1, accent)[0]
    return canvas(w, h, body, bg)


SOCIAL = {
    'facebook-avatar': lambda: social_avatar(1080),
    'facebook-cover': lambda: social_cover(1640, 624, 1340, 400, logo_ratio=.45),
    'zalo-avatar': lambda: social_avatar(1080),
    'zalo-cover': lambda: social_cover(1500, 1000, 1200, 520, stacked=True),
    'youtube-avatar': lambda: social_avatar(800, dark=True),
    'youtube-banner': lambda: social_cover(2560, 1440, 1546, 423, dark=True),
    'youtube-thumbnail': lambda: social_thumbnail(1280, 720, '[Tiêu đề video ngắn gọn]'),
    'instagram-post': lambda: social_card(1080, 1350, 'Tản văn', '[Tiêu đề bài viết]', '[Một câu tóm tắt nhẹ nhàng, không quá hai dòng.]', 'Đọc bài viết'),
    'instagram-story': lambda: social_story(1080, 1920, 'Có mặt trong đời mình.', '[Lời mời ngắn: ví dụ, cùng thở chậm một phút trước khi bắt đầu ngày mới.]'),
    'reel-cover': lambda: social_story(1080, 1920, '[Tên chủ đề Reel]', '[Một dòng mô tả]', dark=True),
    'quote-card-light': lambda: social_quote(1080, 1080, 'Mỗi ngày là một cơ hội để bắt đầu lại.'),
    'quote-card-dark': lambda: social_quote(1080, 1080, 'Trí tuệ lớn lên từ những điều giản dị.', dark=True),
    'event-announcement': lambda: social_card(1080, 1350, 'Sự kiện · [ngày] · [địa điểm]', '[Tên buổi chia sẻ]', '[Thời gian, hình thức, số chỗ. Chỉ đăng khi đã xác nhận.]', 'Đăng ký tham dự', motif_fn=P.three_rings),
    'course-announcement': lambda: social_card(1080, 1350, 'Khóa thực hành', '[Tên khóa học]', '[Thời lượng, hình thức, học phí đã công bố trên website.]', 'Xem chi tiết', dark=True, motif_fn=P.enso_light),
    'product-announcement': lambda: social_card(1080, 1350, 'Cửa hàng · Thực phẩm sạch', '[Tên sản phẩm]', '[Nguồn gốc, quy cách, giá. Không ghi công dụng chữa bệnh.]', 'Xem sản phẩm', motif_fn=P.canopy),
    'article-share-card': lambda: social_card(1200, 630, 'Tản văn · Hương Thiền Nature', '[Tiêu đề bài viết]', '[Mô tả 1 câu]', 'Đọc tiếp', photo=False),
}


# ======================================================================= print (mm, 3 mm bleed)
def print_canvas(w, h, body, bg=PAPER, bleed=3):
    W, H = w + 2 * bleed, h + 2 * bleed
    guide = (f'<g id="guides" fill="none" stroke="#E0006A" stroke-width=".2" opacity=".6"><title>Đường cắt (trim) và lề an toàn 5 mm — ẩn lớp này khi in</title>'
             f'<rect x="{bleed}" y="{bleed}" width="{w}" height="{h}"/><rect x="{bleed + 5}" y="{bleed + 5}" width="{w - 10}" height="{h - 10}" stroke-dasharray="1 1"/></g>')
    return canvas(W, H, f'<g transform="translate({bleed} {bleed})">{body}</g>{guide}', bg, 'mm')


def card_front():
    return print_canvas(90, 55, mark(5, 9, 36, PAPER) + T(46, 26, 'Hương Thiền', 9, SCRIPT, PAPER, 700) + T(58, 32, 'NATURE', 3, SERIF, PAPER, 500, 'middle', .9)
                        + T(46, 43, '', 2.4, SERIF, GOLD, 400, style='italic', lines=['Hiểu mình. Thuận tự nhiên.', 'Sống tự chủ. Cùng trưởng thành.']), FOREST)


def card_back():
    g, _ = logo_h(8, 7, 9)
    return print_canvas(90, 55, g + T(8, 27, '[Họ và tên]', 4.2, SERIF, FOREST, 600) + T(8, 31.5, '[Vai trò]', 2.6, SANS, INK)
                        + T(8, 39, '', 2.5, SANS, FOREST, lines=['[Số điện thoại / Zalo]', '[email]', SITE], leading=1.5)
                        + qr(66, 26, 17) + f'<path d="M0 52 Q45 47 90 52" stroke="{MOSS}" stroke-width=".5" fill="none"/>')


def letterhead():
    g, _ = logo_h(18, 14, 16)
    body = g + f'<path d="M18 36 H192" stroke="{MOSS}" stroke-width=".3"/>' + T(18, 60, '[Ngày … tháng … năm …]', 3.6, SANS, INK)
    body += T(18, 74, '', 3.8, SERIF, FOREST, lines=['[Kính gửi …]', '', '[Nội dung thư. Lora 11 pt, dòng 1,5; lề trái 18 mm, lề phải 18 mm.]'], leading=1.7)
    body += motif(P.ground_cover, 150, 255, 46, MOSS, .25) + f'<path d="M18 278 H192" stroke="{MOSS}" stroke-width=".3"/>'
    body += T(18, 284, f'Hương Thiền Nature · {SITE} · [điện thoại] · [email]', 2.8, SANS, INK)
    return print_canvas(210, 297, body)


def envelope():
    g, _ = logo_h(10, 8, 12)
    return print_canvas(220, 110, g + T(10, 30, SITE, 3, SANS, INK) + f'<path d="M0 102 Q110 92 220 102" stroke="{MOSS}" stroke-width=".4" fill="none"/>'
                        + T(120, 62, '', 4, SERIF, FOREST, lines=['[Người nhận]', '[Địa chỉ]', '[Tỉnh/Thành]'], leading=1.6))


def small_card(title, lines, bg=PAPER, fg=FOREST, motif_fn=P.lotus_line):
    body = motif(motif_fn, 39, 10, 27, MOSS if bg == PAPER else GOLD, .9) + T(52.5, 52, title, 7, SCRIPT, ORCHID if bg == PAPER else GOLD_HI, 700, 'middle')
    body += T(52.5, 62, '', 3.4, SERIF, fg, 400, 'middle', lines=lines, leading=1.55) + logo_h(32, 128, 8, fg)[0]
    return print_canvas(105, 148, body, bg)


def qr_card():
    body = T(42.5, 14, 'Ghé thăm Hương Thiền Nature', 3.6, SERIF, FOREST, 500, 'middle') + qr(17.5, 20, 50) + T(42.5, 80, SITE, 3, SANS, INK, 600, 'middle')
    return print_canvas(85, 90, body)


def profile_cover():
    body = pattern_fill('contour-field', PAPER, 210, 297, .12, scale=.5) + logo_v(105, 40, 90, PAPER)
    body += T(105, 175, 'Hồ sơ giới thiệu', 9, SERIF, PAPER, 500, 'middle') + T(105, 190, '', 5, SCRIPT, GOLD, 700, 'middle', lines=['Understand yourself. Live with nature.', 'Live self-directed. Grow together.'])
    body += T(105, 270, f'[Năm] · {SITE}', 3.4, SANS, PAPER, 400, 'middle')
    return print_canvas(210, 297, body, FOREST)


STATIONERY = {
    'business-card-front': card_front, 'business-card-back': card_back, 'letterhead-a4': letterhead, 'envelope-dl': envelope,
    'thank-you-card-a6': lambda: small_card('Cảm ơn bạn', ['Cảm ơn bạn đã đi cùng một đoạn đường.', '[Lời nhắn viết tay]'], motif_fn=P.lotus_line),
    'info-card-a6': lambda: small_card('Hương Thiền Nature', ['Thiền định · Chánh niệm', 'Sống thuận tự nhiên', SITE], motif_fn=P.connection),
    'qr-card': qr_card, 'project-profile-cover-a4': profile_cover,
}


def a5_page(body, bg=PAPER):
    return print_canvas(148, 210, body, bg)


PUBLISHING = {
    'book-cover-a5': lambda: a5_page(pattern_fill('terrace-lines', PAPER, 148, 210, .1, scale=.4) + motif(P.enso_ink, 34, 38, 80, GOLD, .9)
                                     + T(74, 140, '[Tên sách]', 11, SERIF, PAPER, 500, 'middle') + T(74, 152, '[Phụ đề]', 4.5, SCRIPT, GOLD, 700, 'middle')
                                     + T(74, 168, '[Tác giả]', 3.6, SANS, PAPER, 400, 'middle', 1) + logo_h(48, 188, 9, PAPER)[0], FOREST),
    'ebook-cover': lambda: canvas(1600, 2560, motif(P.lotus_watermark, 200, 300, 1200, GOLD) + T(800, 1700, '[Tên ebook]', 130, SERIF, GOLD_HI, 500, 'middle')
                                  + T(800, 1860, '', 70, SCRIPT, GOLD, 700, 'middle', lines=['Hiểu mình. Thuận tự nhiên.', 'Sống tự chủ. Cùng trưởng thành.']) + logo_h(560, 2250, 150, GOLD_HI)[0], NIGHT),
    'essay-cover': lambda: a5_page(motif(P.old_leaf, 44, 30, 60, MOSS) + T(74, 120, 'Tản văn', 5, SANS, GOLD_ACCENT, 700, 'middle', .8)
                                   + T(74, 135, '[Tên tản văn]', 10, SERIF, FOREST, 500, 'middle') + T(74, 147, '[Tác giả]', 4, SCRIPT, ORCHID, 700, 'middle') + logo_h(48, 188, 9)[0]),
    'chapter-opener': lambda: a5_page(T(20, 40, 'Chương [số]', 4, SANS, GOLD_ACCENT, 700, spacing=.6) + T(20, 56, '[Tên chương]', 10, SERIF, FOREST, 500)
                                      + f'<path d="M20 64 H60" stroke="{MOSS}" stroke-width=".5"/>' + T(20, 78, '', 3.9, SERIF, INK, lines=['[Đoạn mở đầu. Lora 10,5–11 pt,', 'dòng 1,55, độ dài dòng 60–70 ký tự.]'], leading=1.6)
                                      + motif(P.seven_circles, 98, 150, 40, MOSS, .2)),
    'quote-page': lambda: a5_page(motif(P.enso_open, 24, 45, 100, ORCHID, .25) + T(74, 92, '', 7.5, SCRIPT, ORCHID, 700, 'middle', lines=['Gieo hạt tỉnh thức,', 'nuôi dưỡng yêu thương.'], leading=1.35)
                                  + T(74, 128, '— [Nguồn trích dẫn]', 3.4, SERIF, INK, 400, 'middle', style='italic')),
    'table-of-contents': lambda: a5_page(T(20, 34, 'Mục lục', 10, SERIF, FOREST, 500) + ''.join(T(20, 56 + i * 12, f'[Chương {i + 1}] ', 4, SERIF, FOREST) + T(128, 56 + i * 12, '[trang]', 3.6, SANS, INK, anchor='end') + f'<path d="M58 {55 + i * 12} H112" stroke="{INK}" stroke-width=".2" stroke-dasharray=".6 1.2"/>' for i in range(8))),
    'notes-page': lambda: a5_page(T(20, 30, 'Ghi chú', 8, SCRIPT, ORCHID, 700) + ''.join(f'<path d="M20 {44 + i * 9} H128" stroke="{MOSS}" stroke-width=".2" opacity=".6"/>' for i in range(17))),
    'end-page': lambda: a5_page(motif(P.stage(7), 49, 70, 50, MOSS) + T(74, 140, 'Mỗi ngày là một cơ hội để bắt đầu lại.', 5, SCRIPT, ORCHID, 700, 'middle') + logo_h(48, 175, 9)[0]),
    'bookmark': lambda: print_canvas(50, 180, pattern_fill('seed-rows', PAPER, 50, 180, .1, scale=.3) + motif(P.lotus_line, 10, 20, 30, GOLD)
                                     + T(25, 80, '', 5, SCRIPT, PAPER, 700, 'middle', lines=['Có mặt', 'trong đời mình.'], leading=1.3) + logo_v(25, 140, 30, PAPER), FOREST),
    'workbook-page-a4': lambda: print_canvas(210, 297, T(18, 26, 'Sổ tay thực hành · Tuần [số]', 4, SANS, GOLD_ACCENT, 700, spacing=.5) + T(18, 42, '[Chủ đề tuần]', 9, SERIF, FOREST, 500)
                                              + ''.join(T(18, 66 + i * 54, q, 4.2, SERIF, FOREST, 500) + ''.join(f'<path d="M18 {74 + i * 54 + k * 9} H192" stroke="{MOSS}" stroke-width=".2"/>' for k in range(4))
                                                        for i, q in enumerate(['Hôm nay mình đã dừng lại khi nào?', 'Hơi thở của mình ra sao?', 'Một điều mình biết ơn:', 'Một bước nhỏ cho ngày mai:']))),
    'practice-journal-a5': lambda: a5_page(T(16, 24, 'Nhật ký thực hành', 7, SCRIPT, ORCHID, 700) + T(16, 34, 'Ngày ……… · Thời gian ngồi ……… phút', 3.2, SANS, INK)
                                           + ''.join(motif(P.stage(i), 16 + i * 15, 40, 14, MOSS, .8) for i in range(8)) + T(16, 68, 'Điều mình nhận ra:', 3.6, SERIF, FOREST, 500)
                                           + ''.join(f'<path d="M16 {78 + i * 9} H132" stroke="{MOSS}" stroke-width=".2"/>' for i in range(13))),
    'meditation-guide-cover-a5': lambda: a5_page(motif(P.ripple, 34, 40, 80, GOLD, .9) + T(74, 140, 'Hướng dẫn thiền', 9, SERIF, GOLD_HI, 500, 'middle')
                                                 + T(74, 152, '[Tên bài thực hành]', 5, SCRIPT, GOLD, 700, 'middle') + logo_h(48, 186, 9, GOLD_HI)[0], NIGHT),
}


def slide(title, body_lines, kind='content'):
    w, h = 1920, 1080
    if kind == 'title':
        b = pattern_fill('contour-field', PAPER, w, h, .08) + logo_h(120, 120, 120, PAPER)[0] + T(120, 600, title, 110, SERIF, PAPER, 500)
        b += T(120, 720, body_lines[0], 64, SCRIPT, GOLD, 700)
        return canvas(w, h, b, FOREST)
    b = T(120, 170, title, 72, SERIF, FOREST, 500) + f'<path d="M120 210 H300" stroke="{GOLD}" stroke-width="5" stroke-linecap="round"/>'
    if kind == 'quote':
        b = motif(P.enso_open, 560, 140, 800, ORCHID, .12) + T(960, 520, '', 84, SCRIPT, ORCHID, 700, 'middle', lines=body_lines, leading=1.3) + T(960, 760, '— [Nguồn]', 36, SERIF, INK, anchor='middle', style='italic')
    elif kind == 'concept':
        for i, (head, text) in enumerate(body_lines):
            x = 120 + i * 580
            b += f'<rect x="{x}" y="300" width="540" height="560" rx="28" fill="#FFFDF7" stroke="#DDD5BF"/>' + motif([P.ground_cover, P.lotus_layered, P.enso_light][i], x + 170, 340, 200, [MOSS, ORCHID, GOLD_ACCENT][i])
            b += T(x + 270, 610, head, 46, SERIF, FOREST, 500, 'middle') + T(x + 270, 680, '', 30, SANS, INK, 400, 'middle', lines=wrap(text, 26), leading=1.45)
    elif kind == 'exercise':
        b += f'<rect x="120" y="290" width="1680" height="640" rx="32" fill="{MIST}"/>' + motif(P.updown, 1460, 380, 280, ORCHID, .8)
        b += T(180, 380, 'Bài tập · [thời lượng]', 34, SANS, ORCHID, 700, spacing=2) + T(180, 470, '', 42, SERIF, FOREST, lines=body_lines, leading=1.55)
    else:
        b += T(120, 330, '', 44, SANS, FOREST, lines=[f'·  {line}' for line in body_lines], leading=1.6)
    b += logo_h(1580, 980, 60)[0] + T(120, 1010, f'Hương Thiền Nature · {SITE}', 24, SANS, INK)
    return canvas(w, h, b)


def a4_sheet(title, prompts, foot='Phiếu này để tự quan sát, không phải công cụ chẩn đoán.'):
    body = logo_h(18, 14, 12)[0] + T(18, 46, title, 9, SERIF, FOREST, 500) + T(18, 54, 'Họ tên (không bắt buộc): …………………   Ngày: ………', 3.4, SANS, INK)
    y = 70
    for p in prompts:
        body += T(18, y, p, 4.2, SERIF, FOREST, 500) + ''.join(f'<path d="M18 {y + 8 + k * 9} H192" stroke="{MOSS}" stroke-width=".2"/>' for k in range(4))
        y += 50
    return print_canvas(210, 297, body + T(18, 284, foot, 3, SANS, INK, style='italic'))


EDUCATION = {
    'slide-01-title': lambda: slide('[Tên bài học]', ['Có mặt trong đời mình.'], 'title'),
    'slide-02-content': lambda: slide('[Tiêu đề nội dung]', ['[Ý chính thứ nhất]', '[Ý chính thứ hai]', '[Ý chính thứ ba]']),
    'slide-03-concept': lambda: slide('Thân – Tâm – Trí', [('Thân', 'Gốc rễ trong đất: ăn sạch, vận động, sống chậm.'), ('Tâm', 'Khoảng lặng: thiền, hơi thở, lòng từ.'), ('Trí', 'Ánh sáng: học hỏi, nhận biết, sống sáng suốt.')], 'concept'),
    'slide-04-quote': lambda: slide('', ['Trí tuệ lớn lên', 'từ những điều giản dị.'], 'quote'),
    'slide-05-exercise': lambda: slide('Thực tập', ['Ngồi thoải mái, lưng thẳng nhẹ.', 'Hít vào 4 nhịp, thở ra 6 nhịp.', 'Lặp lại trong 1 phút, chỉ quan sát.'], 'exercise'),
    'practice-sheet-a4': lambda: a4_sheet('Phiếu thực hành', ['Mình đã thực tập gì hôm nay?', 'Cơ thể mình cảm thấy thế nào?', 'Điều gì làm mình xao lãng?', 'Một điều mình muốn giữ lại:']),
    'reflection-sheet-a4': lambda: a4_sheet('Phiếu chiêm nghiệm', ['Điều gì đang có mặt trong mình?', 'Mình cần điều gì lúc này?', 'Một lời tử tế mình nói với mình:', 'Bước nhỏ tiếp theo:']),
    'study-card-a6': lambda: small_card('[Khái niệm]', ['[Định nghĩa ngắn, 1–2 câu]', '[Ví dụ trong đời sống]'], motif_fn=P.sprout),
    'participation-confirmation-a4-landscape': lambda: print_canvas(297, 210, f'<rect x="10" y="10" width="277" height="190" rx="8" fill="none" stroke="{GOLD_ACCENT}" stroke-width=".6"/>' + logo_v(148.5, 22, 50)
        + T(148.5, 98, 'Giấy xác nhận tham gia', 11, SERIF, FOREST, 500, 'middle') + T(148.5, 118, '[Họ và tên học viên]', 12, SCRIPT, ORCHID, 700, 'middle')
        + T(148.5, 132, 'đã tham gia [tên chương trình] · [thời gian]', 4.4, SERIF, FOREST, 400, 'middle')
        + T(148.5, 150, 'Giấy này xác nhận việc tham gia, không phải chứng chỉ hay bằng cấp chuyên môn.', 3.4, SANS, INK, 400, 'middle', style='italic')
        + T(60, 178, '[Người hướng dẫn]', 4, SERIF, FOREST, 500, 'middle') + T(237, 178, '[Ngày]', 4, SERIF, FOREST, 500, 'middle')),
    'program-report-cover-a4': lambda: print_canvas(210, 297, motif(P.terraces, 40, 40, 130, MOSS, .5) + T(18, 200, 'Báo cáo tổng kết', 10, SERIF, FOREST, 500)
                                                     + T(18, 214, '[Tên chương trình] · [kỳ]', 5, SCRIPT, ORCHID, 700) + logo_h(18, 260, 14)[0], CREAM),
}


def label(w, h, title, fields, bg=PAPER, fg=FOREST):
    body = mark(4, 4, 14, fg) + T(21, 11, 'Hương Thiền Nature', 3.4, SERIF, fg, 500) + T(21, 15.5, SITE, 2.2, SANS, INK)
    body += T(4, 27, title, 5.4, SERIF, fg, 600) + T(4, 34, '', 2.6, SANS, fg, lines=fields, leading=1.55)
    body += placeholder_tag(4, h - 4, 2.2) + f'<path d="M0 {h - 9} Q{w / 2} {h - 13} {w} {h - 9}" stroke="{MOSS}" stroke-width=".4" fill="none"/>'
    return print_canvas(w, h, body, bg)


PACKAGING = {
    'product-label-100x60': lambda: label(100, 60, '[Tên sản phẩm]', ['Thành phần: [theo nhà sản xuất]', 'Khối lượng: [ … ]   NSX/HSD: [in trên bao bì]', 'Nguồn gốc: [farm / nhà cung cấp]']),
    'bottle-label-70x120': lambda: print_canvas(70, 120, mark(17, 8, 36, FOREST) + T(35, 58, '[Tên sản phẩm]', 5, SERIF, FOREST, 600, 'middle') + T(35, 66, '[Dung tích]', 3, SANS, INK, anchor='middle')
                                                + T(35, 80, '', 2.4, SANS, INK, anchor='middle', lines=['Thành phần: [ … ]', 'Bảo quản: [ … ]', 'Nguồn gốc: [ … ]'], leading=1.6) + placeholder_tag(8, 112, 2.2)),
    'food-pouch-front': lambda: print_canvas(140, 200, pattern_fill('rice-grain', MOSS, 140, 200, .12, scale=.5) + f'<rect x="15" y="60" width="110" height="90" rx="8" fill="{PAPER}"/>' + logo_v(70, 66, 40)
                                              + T(70, 122, '[Tên sản phẩm]', 6, SERIF, FOREST, 600, 'middle') + T(70, 132, '[Khối lượng tịnh]', 3.4, SANS, INK, anchor='middle') + placeholder_tag(22, 145, 2.6), CREAM),
    'paper-box-dieline': lambda: print_canvas(240, 170, ''.join(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{PAPER}" stroke="{INK}" stroke-width=".3" stroke-dasharray="{d}"/>' for x, y, w, h, d in [(20, 50, 60, 70, '0'), (80, 50, 80, 70, '0'), (160, 50, 60, 70, '0'), (80, 10, 80, 40, '2 1'), (80, 120, 80, 40, '2 1')])
                                              + logo_v(120, 60, 42) + T(120, 112, '[Tên sản phẩm]', 4, SERIF, FOREST, 600, 'middle') + T(10, 166, 'Nét liền: cắt · nét đứt: gấp. Kích thước minh họa, đo lại theo sản phẩm thật.', 2.6, SANS, CLAY)),
    'paper-bag': lambda: print_canvas(260, 320, f'<rect x="20" y="40" width="220" height="270" rx="4" fill="#C9A77A"/>' + motif(P.ground_cover, 40, 240, 180, FOREST, .5) + logo_v(130, 110, 100, FOREST)
                                      + T(130, 226, '', 6.4, SCRIPT, FOREST, 700, 'middle', lines=['Hiểu mình. Thuận tự nhiên.', 'Sống tự chủ. Cùng trưởng thành.']) + f'<path d="M95 40 Q130 0 165 40" stroke="{FOREST}" stroke-width="3" fill="none"/>', '#FFFFFF'),
    'stone-box-card': lambda: print_canvas(90, 90, motif(P.vesica, 25, 8, 40, GOLD_ACCENT, .8) + T(45, 56, '[Tên đá]', 5.4, SERIF, FOREST, 600, 'middle') + T(45, 64, '[Xuất xứ · kích thước · trọng lượng]', 2.6, SANS, INK, anchor='middle')
                                           + T(45, 74, 'Vật phẩm hỗ trợ thực hành và chiêm nghiệm,', 2.4, SANS, INK, anchor='middle', style='italic') + T(45, 78, 'không thay thế chăm sóc y tế.', 2.4, SANS, INK, anchor='middle', style='italic') + placeholder_tag(14, 86, 2.2)),
    'tote-bag': lambda: print_canvas(380, 420, f'<rect x="20" y="60" width="340" height="350" fill="#EFE6D2"/>' + logo_v(190, 140, 150) + T(190, 330, 'Gieo hạt tỉnh thức, nuôi dưỡng yêu thương.', 11, SCRIPT, FOREST, 700, 'middle'), '#FFFFFF'),
    'origin-card': lambda: small_card('Nguồn gốc', ['Farm: [tên farm đối tác]', 'Vùng trồng: [địa danh]', 'Thu hoạch: [mùa vụ]'], motif_fn=P.terraces),
    'care-card': lambda: small_card('Bảo quản', ['[Nơi khô ráo, tránh nắng]', '[Dùng trong … ngày sau khi mở]'], motif_fn=P.water),
    'customer-thank-you': lambda: small_card('Cảm ơn bạn', ['Mỗi món quà từ đất', 'là một lời cảm ơn gửi lại.'], CREAM, motif_fn=P.sprout),
}


def board(w, h, title, lines, bg=FOREST, fg=PAPER, accent=GOLD, motif_fn=P.lotus_line):
    body = pattern_fill('contour-field', fg, w, h, .06, scale=w / 1200) + motif(motif_fn, w * .06, h * .12, min(w, h) * .3, accent, .9)
    body += T(w * .06 + min(w, h) * .36, h * .3, title, h * .12, SERIF, fg, 500) + T(w * .06 + min(w, h) * .36, h * .45, '', h * .055, SANS, fg, lines=lines, leading=1.55)
    body += logo_h(w * .06, h * .78, h * .12, fg)[0]
    return print_canvas(w, h, body, bg, bleed=10)


def signboard():
    lh, x0 = 170, 80
    lg, lw = logo_h(x0, (400 - lh) / 2, lh, PAPER)
    return print_canvas(1200, 400, lg + fit_tagline(1120, 200, 1120 - (x0 + lw) - 40, 44, GOLD), FOREST, 10)


SPACE = {
    'signboard-1200x400': signboard,
    'welcome-board-600x900': lambda: print_canvas(600, 900, logo_v(300, 80, 260) + T(300, 470, 'Chào mừng bạn', 64, SCRIPT, ORCHID, 700, 'middle')
                                                  + T(300, 540, '', 26, SERIF, FOREST, 400, 'middle', lines=['Hãy chậm lại một nhịp.', 'Ở đây, bạn không cần phải vội.'], leading=1.6) + motif(P.ground_cover, 150, 640, 300, MOSS, .5), PAPER, 10),
    'wayfinding-600x200': lambda: print_canvas(600, 200, T(40, 118, 'Phòng thiền', 56, SERIF, PAPER, 500) + f'<path d="M470 100 H560 M525 65 L560 100 L525 135" stroke="{GOLD}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' + mark(330, 40, 120, PAPER), FOREST, 10),
    'info-board-900x600': lambda: board(900, 600, '[Tên chương trình]', ['[Lịch sinh hoạt]', '[Người hướng dẫn]', '[Liên hệ]'], motif_fn=P.solar),
    'practice-rules-600x900': lambda: print_canvas(600, 900, T(300, 110, 'Cùng giữ không gian tĩnh lặng', 34, SERIF, FOREST, 500, 'middle') + motif(P.enso_open, 240, 140, 120, ORCHID, .8)
                                                   + T(80, 340, '', 26, SANS, FOREST, lines=['·  Tắt chuông điện thoại', '·  Nói khẽ, bước nhẹ', '·  Đến sớm vài phút để ổn định', '·  Ngồi theo cách thoải mái với bạn', '·  Có thể rời phòng bất cứ lúc nào'], leading=2) + logo_h(170, 790, 70)[0], PAPER, 10),
    'name-badge-90x55': lambda: print_canvas(90, 55, mark(4, 4, 16) + T(22, 12, 'Hương Thiền Nature', 3, SERIF, FOREST, 500) + T(45, 34, '[Tên]', 9, SCRIPT, ORCHID, 700, 'middle') + T(45, 43, '[Vai trò]', 3, SANS, INK, anchor='middle')),
}


def mock(w, h, base, body):
    return canvas(w, h, f'<rect width="{w}" height="{h}" fill="#EDE8DC"/>{base}{body}' + T(20, h - 20, 'Mockup minh họa phẳng · chưa sản xuất', 14, SANS, INK), '#EDE8DC')


MERCH = {
    'notebook': lambda: mock(800, 600, f'<rect x="230" y="60" width="340" height="460" rx="12" fill="{FOREST}"/><rect x="230" y="60" width="22" height="460" fill="#1A2E24"/>', logo_v(410, 170, 170, PAPER) + T(410, 420, 'Nhật ký thực hành', 22, SCRIPT, GOLD, 700, 'middle')),
    'tote': lambda: mock(800, 600, f'<path d="M330 120 Q400 20 470 120" stroke="#C9B48C" stroke-width="16" fill="none"/><rect x="220" y="120" width="360" height="420" fill="#EFE6D2"/>', logo_v(400, 200, 190) + T(400, 450, 'Có mặt trong đời mình.', 26, SCRIPT, FOREST, 700, 'middle')),
    'tee': lambda: mock(800, 600, f'<path d="M290 60 L230 100 L170 170 L230 220 L260 190 L260 540 L540 540 L540 190 L570 220 L630 170 L570 100 L510 60 Q400 120 290 60 Z" fill="{PAPER}" stroke="#DDD5BF" stroke-width="3"/>', mark(345, 180, 110) + T(400, 330, 'Understand yourself. Live with nature.', 22, SCRIPT, FOREST, 700, 'middle')),
    'postcard': lambda: mock(800, 600, f'<rect x="120" y="120" width="560" height="360" rx="6" fill="{PAPER}"/>', motif(P.terraces, 140, 150, 300, MOSS, .7) + T(460, 260, '', 30, SCRIPT, ORCHID, 700, lines=['Gửi bạn', 'một chút bình yên.'], leading=1.3) + logo_h(460, 400, 46)[0]),
    'quote-greeting-card': lambda: mock(800, 600, f'<rect x="230" y="80" width="340" height="440" rx="6" fill="{NIGHT}"/>', motif(P.enso_light, 300, 120, 200, GOLD, .9) + T(400, 400, '', 26, SCRIPT, GOLD_HI, 700, 'middle', lines=['Mỗi ngày là một cơ hội', 'để bắt đầu lại.'], leading=1.3)),
    'gift-box': lambda: mock(800, 600, f'<rect x="200" y="200" width="400" height="300" fill="#C9A77A"/><rect x="190" y="160" width="420" height="60" fill="#B8956A"/><rect x="380" y="160" width="40" height="340" fill="{FOREST}"/>', mark(250, 280, 110, FOREST)),
    'water-bottle': lambda: mock(800, 600, f'<rect x="340" y="100" width="120" height="420" rx="40" fill="{FOREST}"/><rect x="360" y="60" width="80" height="50" rx="10" fill="#1A2E24"/>', mark(360, 250, 80, PAPER)),
    'ceramic-mug': lambda: mock(800, 600, f'<rect x="260" y="180" width="240" height="280" rx="24" fill="{CREAM}" stroke="#DDD5BF" stroke-width="3"/><path d="M500 240 Q590 240 590 320 Q590 400 500 400" stroke="#DDD5BF" stroke-width="22" fill="none"/>', mark(320, 230, 120) + T(380, 410, 'Thở chậm.', 22, SCRIPT, ORCHID, 700, 'middle')),
}


VIDEO = {
    'title-card': lambda: canvas(1920, 1080, motif(P.enso_ink, 660, 140, 600, GOLD, .25) + T(960, 560, '[Tên video]', 96, SERIF, GOLD_HI, 500, 'middle') + T(960, 660, '[Phụ đề ngắn]', 52, SCRIPT, GOLD, 700, 'middle'), NIGHT),
    'lower-third': lambda: canvas(1920, 1080, f'<rect x="120" y="840" width="760" height="130" rx="20" fill="{FOREST}" opacity=".92"/>' + mark(140, 852, 106, PAPER)
                                  + T(270, 900, '[Họ và tên]', 46, SERIF, PAPER, 500) + T(270, 945, '[Vai trò · Hương Thiền Nature]', 28, SANS, GOLD), 'none'),
    'end-screen': lambda: canvas(1920, 1080, logo_h(660, 120, 200, PAPER)[0] + f'<rect x="160" y="460" width="740" height="416" rx="24" fill="none" stroke="{GOLD}" stroke-dasharray="14 12"/><rect x="1020" y="460" width="740" height="416" rx="24" fill="none" stroke="{GOLD}" stroke-dasharray="14 12"/>'
                                  + T(530, 680, '[Video đề xuất 1]', 34, SANS, PAPER, anchor='middle') + T(1390, 680, '[Video đề xuất 2]', 34, SANS, PAPER, anchor='middle') + T(960, 1000, SITE, 32, SANS, GOLD, anchor='middle'), FOREST),
    'subtitle-style': lambda: canvas(1920, 1080, f'<rect width="1920" height="1080" fill="#6E7F67"/><rect x="560" y="900" width="800" height="76" rx="12" fill="#100C24" opacity=".72"/>' + T(960, 950, 'Hít vào, mình biết mình đang hít vào.', 40, SANS, '#FFFFFF', 500, 'middle')
                                     + T(60, 80, 'Phụ đề: Be Vietnam Pro 500, 40 px/1080p, chữ trắng trên nền tím đêm 72%, tối đa 2 dòng × 42 ký tự.', 28, SANS, '#FFFFFF'), 'none'),
    'intro-outro-storyboard': lambda: canvas(1920, 1080, ''.join(f'<rect x="{80 + i * 460}" y="260" width="420" height="236" rx="12" fill="{[PAPER, PAPER, FOREST, FOREST][i]}" stroke="#DDD5BF"/>' + motif([P.stage(0), P.stage(2), P.lotus_layered, P.enso_open][i], 80 + i * 460 + 135, 285, 150, [MOSS, MOSS, PAPER, GOLD][i])
                                                             + T(80 + i * 460, 550, f'{["0,0s", "1,2s", "2,4s", "3,2s"][i]} · {["Hạt giống", "Nảy mầm", "Sen nở → logo", "Ensō đóng · tagline"][i]}', 30, SANS, FOREST) for i in range(4))
                                             + T(80, 160, 'Intro / outro 4 giây · chậm rãi, không nhấp nháy · nhạc: chỉ dùng âm thanh gốc hoặc có quyền', 36, SERIF, FOREST)),
}


LOGO_ANIMATION = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><title>Hương Thiền Nature — logo animation (CSS, 3 s)</title>
<style>
.tri{{stroke-dasharray:1400;stroke-dashoffset:1400;animation:draw 1.6s cubic-bezier(.45,0,.55,1) forwards}}
.lotus{{transform-origin:256px 309px;transform:scale(.2);opacity:0;animation:bloom 1.2s 1.2s cubic-bezier(.05,.7,.1,1) forwards}}
.earth{{stroke-dasharray:240;stroke-dashoffset:240;animation:draw 1s 1.8s ease-out forwards}}
@keyframes draw{{to{{stroke-dashoffset:0}}}}@keyframes bloom{{to{{transform:scale(1);opacity:1}}}}
@media (prefers-reduced-motion: reduce){{.tri,.earth{{animation:none;stroke-dashoffset:0}}.lotus{{animation:none;transform:none;opacity:1}}}}
</style>
<path class="tri" d="{L.TRIANGLE}" fill="none" stroke="{FOREST}" stroke-width="16" stroke-linejoin="round"/>
<g class="lotus"><g transform="translate(256 309) scale(1.08) translate(-256 -307)"><path d="{L.LOTUS}" fill="{FOREST}"/></g></g>
<path class="earth" d="{L.EARTH}" fill="none" stroke="{FOREST}" stroke-width="14" stroke-linecap="round"/></svg>
'''

EMAIL_SIGNATURE = f'''<!-- Hương Thiền Nature email signature. Paste into the mail client's HTML signature field. Image is optional. -->
<table cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;color:#243F32;font-size:13px;line-height:1.5">
  <tr>
    <td style="padding-right:14px;border-right:2px solid #F4C76B;vertical-align:top">
      <img src="https://{SITE}/brand/htn-mark-forest.svg" width="56" height="56" alt="Hương Thiền Nature" style="display:block" />
    </td>
    <td style="padding-left:14px">
      <strong style="font-family:Georgia,serif;font-size:15px">[Họ và tên]</strong><br />
      <span style="color:#586557">[Vai trò] · Hương Thiền Nature</span><br />
      [Điện thoại / Zalo] · <a href="https://{SITE}/vi/" style="color:#713C63">{SITE}</a><br />
      <em style="color:#713C63">Hiểu mình. Thuận tự nhiên. Sống tự chủ. Cùng trưởng thành.</em>
    </td>
  </tr>
</table>
'''


def render(folder, name, svg):
    path = OUT / folder / f'{name}.svg'
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(svg, encoding='utf-8')
    preview = OUT / folder / 'previews' / f'{name}.png'
    preview.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(['rsvg-convert', '-w', '1200', str(path), '-o', str(preview)], check=True)
    if 'mm"' in svg[:400]:
        subprocess.run(['rsvg-convert', '-f', 'pdf', str(path), '-o', str(path.with_suffix('.pdf'))], check=True)
    return path


def build():
    groups = {'social-media': SOCIAL, 'stationery': STATIONERY, 'publishing': PUBLISHING, 'education': EDUCATION,
              'packaging': PACKAGING, 'physical-space': SPACE, 'merchandise': MERCH, 'video': VIDEO}
    counts = {}
    for folder, items in groups.items():
        for name, fn in items.items():
            render(folder, name, fn())
        counts[folder] = len(items)
    (OUT / 'video/logo-animation.svg').write_text(LOGO_ANIMATION, encoding='utf-8')
    (OUT / 'stationery/email-signature.html').write_text(EMAIL_SIGNATURE, encoding='utf-8')
    return counts


if __name__ == '__main__':
    print(build())
