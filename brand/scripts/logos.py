"""Living Zen 2.0 logo geometry: three concepts and the full system of the recommended one.

Everything is pure vector: shapes are paths, words are outlined glyphs (text_outline.py).
Run build.py to write files; this module only returns SVG strings.
"""
from __future__ import annotations

import math

from text_outline import outline

FOREST = '#243F32'
PAPER = '#FBF6EA'
ORCHID = '#713C63'
GOLD = '#F4C76B'
GOLD_DEEP = '#855510'
NIGHT = '#100C24'
IVORY = '#F6EED9'
BLACK = '#111111'
WHITE = '#FFFFFF'


def rounded_polygon(points, radius):
    """Closed path through points with circular-ish corners (quadratic joins)."""
    n = len(points)
    parts = []
    for i in range(n):
        p0, p1, p2 = points[i - 1], points[i], points[(i + 1) % n]
        def toward(a, b, d):
            length = math.dist(a, b)
            return (a[0] + (b[0] - a[0]) * d / length, a[1] + (b[1] - a[1]) * d / length)
        a = toward(p1, p0, radius)
        b = toward(p1, p2, radius)
        parts.append(('M' if i == 0 else 'L') + f'{a[0]:.1f} {a[1]:.1f} Q{p1[0]} {p1[1]} {b[0]:.1f} {b[1]:.1f}')
    return ' '.join(parts) + ' Z'


TRIANGLE = rounded_polygon([(256, 52), (46, 440), (466, 440)], 40)
LOTUS = (
    'M256 304 C228 276 226 216 256 172 C286 216 284 276 256 304 Z '
    'M249 307 C208 303 184 266 186 216 C221 230 245 266 249 307 Z '
    'M263 307 C304 303 328 266 326 216 C291 230 267 266 263 307 Z'
)
EARTH = 'M146 354 Q256 322 366 354 M178 390 Q256 366 334 390'


def mark_living_roots(color=FOREST, simplified=False, stroke=16, tiny=False):
    """Concept A — triangle (Thân–Tâm–Trí), lotus (awareness), earth lines (soil, cycles).

    simplified: one earth line and heavier strokes for 24–48 px; tiny: triangle and lotus only (16 px).
    """
    if tiny:
        return (f'<path d="{TRIANGLE}" fill="none" stroke="{color}" stroke-width="40" stroke-linejoin="round"/>'
                f'<g transform="translate(256 372) scale(1.5) translate(-256 -307)"><path d="{LOTUS}" fill="{color}"/></g>')
    earth = 'M150 368 Q256 330 362 368' if simplified else EARTH
    weight = stroke + (6 if simplified else 0)
    return (f'<path d="{TRIANGLE}" fill="none" stroke="{color}" stroke-width="{weight}" stroke-linejoin="round"/>'
            f'<g transform="translate(256 309) scale(1.08) translate(-256 -307)"><path d="{LOTUS}" fill="{color}"/></g>'
            f'<path d="{earth}" fill="none" stroke="{color}" stroke-width="{weight - 2}" stroke-linecap="round"/>')


def mark_zen_essence(color=FOREST):
    """Concept B — one leaf-petal lotus over a single arc of earth; no frame."""
    petals = (
        'M256 334 C204 294 208 200 256 132 C304 200 308 294 256 334 Z '
        'M256 298 C251 258 251 206 256 170 C261 206 261 258 256 298 Z '
        'M242 336 C172 334 126 284 126 216 C184 230 230 272 242 336 Z '
        'M270 336 C340 334 386 284 386 216 C328 230 282 272 270 336 Z'
    )
    return (f'<path d="{petals}" fill="{color}" fill-rule="evenodd"/>'
            f'<path d="M126 384 Q256 342 386 384" fill="none" stroke="{color}" stroke-width="20" stroke-linecap="round"/>')


def mark_inner_light(color=FOREST, light=GOLD_DEEP):
    """Concept C — an open ensō of awareness, a point of light and a lotus at rest."""
    r, cx, cy = 196, 256, 268
    start, end = math.radians(-58), math.radians(250)
    x1, y1 = cx + r * math.cos(start), cy + r * math.sin(start)
    x2, y2 = cx + r * math.cos(end), cy + r * math.sin(end)
    enso = f'M{x1:.1f} {y1:.1f} A{r} {r} 0 1 1 {x2:.1f} {y2:.1f}'
    return (f'<path d="{enso}" fill="none" stroke="{color}" stroke-width="18" stroke-linecap="round"/>'
            f'<circle cx="256" cy="150" r="18" fill="{light}"/>'
            f'<g transform="translate(0 40)"><path d="{LOTUS}" fill="{color}"/></g>'
            f'<path d="M166 384 Q256 360 346 384" fill="none" stroke="{color}" stroke-width="14" stroke-linecap="round"/>')


def svg(width, height, body, title, background=None):
    bg = f'<rect width="100%" height="100%" fill="{background}"/>' if background else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width:.0f} {height:.0f}" width="{width:.0f}" height="{height:.0f}" role="img">'
            f'<title>{title}</title>{bg}{body}</svg>\n')


def words(color, size=100, y=0, x=0, anchor='start', nature=True):
    """Outlined 'Hương Thiền' (script) and 'NATURE' (spaced serif caps) as one group."""
    name, width = outline('Hương Thiền', 'script', size, x=x, y=y, anchor=anchor)
    group = f'<path d="{name}" fill="{color}"/>'
    if nature:
        sub_size = size * .3
        if anchor == 'middle':
            sub, _ = outline('NATURE', 'serif', sub_size, x=x, y=y + size * .58, tracking=.42, weight=500, anchor='middle')
        else:
            sub, _ = outline('NATURE', 'serif', sub_size, x=x + width / 2, y=y + size * .58, tracking=.42, weight=500, anchor='middle')
        group += f'<path d="{sub}" fill="{color}"/>'
    return group, width


def place(mark, size, x, y):
    s = size / 512
    return f'<g transform="translate({x:.1f} {y:.1f}) scale({s:.4f})">{mark}</g>'


def lockup(kind, color=FOREST, mark_color=None, background=None, title='Hương Thiền Nature'):
    mark = mark_living_roots(mark_color or color)
    if kind == 'mark':
        return svg(512, 512, mark, title, background)
    if kind == 'favicon-16':
        return svg(512, 512, mark_living_roots(mark_color or color, tiny=True), title, background)
    if kind == 'favicon':
        return svg(512, 512, mark_living_roots(mark_color or color, simplified=True, stroke=22), title, background)
    if kind == 'vertical':
        text, width = words(color, 100, y=650, x=400, anchor='middle')
        return svg(800, 760, place(mark, 460, 170, 40) + text, title, background)
    if kind == 'primary':
        text, width = words(color, 112, y=640, x=480, anchor='middle')
        return svg(960, 740, place(mark, 420, 270, 70) + text, title, background)
    if kind == 'horizontal':
        _, width = words(color, 100)
        text, _ = words(color, 100, y=150, x=250)
        return svg(250 + width + 40, 250, place(mark, 230, 10, 10) + text, title, background)
    if kind == 'compact':
        text, width = words(color, 100, y=138, x=214, nature=False)
        return svg(214 + width + 24, 200, place(mark, 190, 10, 5) + text, title, background)
    if kind == 'wordmark':
        text, width = words(color, 120, y=130, x=30)
        return svg(width + 60, 210, text, title, background)
    raise ValueError(kind)


def app_icon(maskable=False):
    """Paper mark on a forest square. Maskable keeps the mark inside the 80% safe circle."""
    inner = mark_living_roots(PAPER, simplified=True, stroke=22)
    if maskable:
        return svg(512, 512, f'<rect width="512" height="512" fill="{FOREST}"/>' + place(inner, 300, 106, 96), 'Hương Thiền Nature')
    return svg(512, 512, f'<rect width="512" height="512" rx="112" fill="{FOREST}"/>' + place(inner, 380, 66, 56), 'Hương Thiền Nature')


def watermark(color=FOREST):
    return svg(512, 512, f'<g opacity=".18">{mark_living_roots(color)}</g>', 'Hương Thiền Nature watermark')


def cobrand(partner='LOGO ĐỐI TÁC'):
    text, width = words(FOREST, 80, y=126, x=200)
    divider_x = 200 + width + 50
    label, lw = outline(partner, 'sans', 26, x=divider_x + 50 + 130, y=126, anchor='middle')
    body = (place(mark_living_roots(FOREST), 180, 10, 15) + text +
            f'<path d="M{divider_x} 40 V170" stroke="{FOREST}" stroke-width="2" opacity=".5"/>'
            f'<rect x="{divider_x + 50}" y="45" width="260" height="120" rx="14" fill="none" stroke="{FOREST}" stroke-width="2" stroke-dasharray="8 8" opacity=".6"/>'
            f'<path d="{label}" fill="{FOREST}" opacity=".7"/>')
    return svg(divider_x + 50 + 260 + 20, 210, body, 'Co-branding lockup')


def concepts():
    return {
        'a-living-roots': mark_living_roots(),
        'b-zen-essence': mark_zen_essence(),
        'c-inner-light': mark_inner_light(),
    }


def concept_lockup(name, mark):
    text, _ = words(FOREST, 92, y=600, x=400, anchor='middle')
    return svg(800, 690, place(mark, 440, 180, 30) + text, f'Concept {name}')
