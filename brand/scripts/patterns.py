"""Living Zen Visual Language: original motifs drawn in code.

Every motif lives in a 200 × 200 box and takes one colour, so each one exists as master, monochrome,
light and dark versions simply by changing that colour. Meanings are creative intentions only.
"""
from __future__ import annotations

import math
import random

S = 'fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"'


def st(c, w=4):
    return S.format(c=c, w=w)


def petal(cx, base, height, width, angle=0):
    """Closed petal path from (cx, base) upward, rotated by angle degrees around the base."""
    tip = base - height
    d = (f'M{cx} {base} C{cx - width} {base - height * .3} {cx - width * .7} {tip + height * .25} {cx} {tip} '
         f'C{cx + width * .7} {tip + height * .25} {cx + width} {base - height * .3} {cx} {base} Z')
    return d if not angle else d, f'rotate({angle} {cx} {base})'


def petal_el(cx, base, h, w, angle, attrs):
    d, rot = petal(cx, base, h, w, angle)
    return f'<path d="{d}" transform="{rot}" {attrs}/>' if angle else f'<path d="{d}" {attrs}/>'


def arc(cx, cy, r, a0, a1):
    x0, y0 = cx + r * math.cos(math.radians(a0)), cy + r * math.sin(math.radians(a0))
    x1, y1 = cx + r * math.cos(math.radians(a1)), cy + r * math.sin(math.radians(a1))
    large = 1 if (a1 - a0) % 360 > 180 else 0
    return f'M{x0:.1f} {y0:.1f} A{r} {r} 0 {large} 1 {x1:.1f} {y1:.1f}'


def leaf(x, y, length, angle, width=.38):
    w = length * width
    d = f'M0 0 C{w} {-length * .2} {w * .9} {-length * .8} 0 {-length} C{-w * .9} {-length * .8} {-w} {-length * .2} 0 0 Z'
    return d, f'translate({x} {y}) rotate({angle})'


def leaf_el(x, y, length, angle, attrs, vein=None):
    d, t = leaf(x, y, length, angle)
    out = f'<path d="{d}" transform="{t}" {attrs}/>'
    if vein:
        out += f'<path d="M0 -{length * .1:.1f} V-{length * .85:.1f}" transform="{t}" {vein}/>'
    return out


# ---------------------------------------------------------------- motifs
def lotus_line(c): return ''.join(petal_el(100, 150, h, w, a, st(c)) for h, w, a in [(90, 26, 0), (76, 24, -38), (76, 24, 38)]) + f'<path d="M40 156 H160" {st(c)}/>'
def lotus_layered(c):
    out = ''.join(petal_el(100, 150, 70, 26, a, f'fill="{c}" opacity=".35"') for a in (-64, -32, 32, 64))
    return out + ''.join(petal_el(100, 150, h, 24, a, f'fill="{c}"') for h, a in [(92, 0), (78, -24), (78, 24)])
def lotus_geometric(c):
    pts = lambda a: f'<polygon points="100,150 86,110 100,62 114,110" transform="rotate({a} 100 150)" {st(c)}/>'
    return ''.join(pts(a) for a in (-50, -25, 0, 25, 50)) + f'<circle cx="100" cy="150" r="5" fill="{c}"/>'
def lotus_leaf(c):
    out = lotus_layered(c).replace('opacity=".35"', 'opacity="0"')
    d, t = leaf(40, 170, 90, 70, .34)
    return out + f'<path d="{d}" transform="{t}" fill="{c}" opacity=".55"/><path d="M30 172 Q100 150 170 172" {st(c, 5)}/>'
def lotus_watermark(c): return f'<g opacity=".25">{lotus_line(c)}</g><circle cx="100" cy="112" r="80" {st(c, 2)} opacity=".25"/>'

def enso_ink(c):
    pts_out, pts_in = [], []
    for i in range(0, 316, 5):
        a = math.radians(i - 70)
        width = 4 + 9 * math.sin(math.radians(i * 180 / 315))
        pts_out.append((100 + (70 + width / 2) * math.cos(a), 100 + (70 + width / 2) * math.sin(a)))
        pts_in.append((100 + (70 - width / 2) * math.cos(a), 100 + (70 - width / 2) * math.sin(a)))
    pts = pts_out + pts_in[::-1]
    return f'<path d="M{" L".join(f"{x:.1f} {y:.1f}" for x, y in pts)} Z" fill="{c}"/>'
def enso_thin(c): return f'<circle cx="100" cy="100" r="70" {st(c, 2)}/>'
def enso_open(c): return f'<path d="{arc(100, 100, 70, -60, 255)}" {st(c, 6)}/>'
def enso_light(c):
    rays = ''.join(f'<circle cx="{100 + 86 * math.cos(math.radians(a)):.1f}" cy="{100 + 86 * math.sin(math.radians(a)):.1f}" r="2.5" fill="{c}"/>' for a in range(0, 360, 30))
    return f'<path d="{arc(100, 100, 66, -60, 255)}" {st(c, 5)}/><circle cx="100" cy="100" r="9" fill="{c}"/>' + rays
def enso_frame(c): return f'<circle cx="100" cy="100" r="78" {st(c, 2)}/><circle cx="100" cy="100" r="70" {st(c, 1)} opacity=".6"/><path d="M92 22 H108" {st(c, 3)}/>'

def young_leaf(c): return leaf_el(100, 175, 140, 18, f'fill="{c}"')
def old_leaf(c):
    d, t = leaf(100, 180, 150, -12, .42)
    veins = ''.join(f'<path d="M0 -{y} L{s * 22} -{y + 22}" transform="{t}" {st(c, 2)}/>' for y in (40, 70, 100) for s in (-1, 1))
    return f'<path d="{d}" transform="{t}" {st(c, 4)}/><path d="M0 0 V-140" transform="{t}" {st(c, 3)}/>' + veins
def branch(c):
    leaves = ''.join(leaf_el(40 + i * 28, 150 - i * 18, 40, (-60 if i % 2 else 40), f'fill="{c}"') for i in range(5))
    return f'<path d="M30 160 Q100 120 175 60" {st(c, 4)}/>' + leaves
def root(c):
    lines = ['M100 30 V90', 'M100 90 Q80 120 60 170', 'M100 90 Q120 125 145 172', 'M100 90 V175', 'M80 128 Q60 140 40 145', 'M122 132 Q145 140 165 138', 'M100 140 Q90 160 86 178']
    return f'<path d="M40 30 H160" {st(c, 3)}/>' + ''.join(f'<path d="{d}" {st(c, 3)}/>' for d in lines)
def sprout(c): return f'<path d="M100 170 V100" {st(c, 5)}/>' + leaf_el(100, 108, 54, -55, f'fill="{c}"') + leaf_el(100, 100, 60, 50, f'fill="{c}"') + f'<path d="M60 172 Q100 160 140 172" {st(c, 4)}/>'
def seed(c): return f'<path d="M100 165 C70 165 58 140 60 115 C62 85 85 55 100 40 C115 55 138 85 140 115 C142 140 130 165 100 165 Z" fill="{c}"/><path d="M100 70 C88 95 88 125 100 150" {st("#FBF6EA", 4)} opacity=".7"/>'
def canopy(c): return ''.join(f'<path d="{arc(x, y, r, 180, 360)} Z" fill="{c}" opacity="{o}"/>' for x, y, r, o in [(60, 120, 42, .55), (140, 120, 42, .55), (100, 100, 52, .9)]) + f'<path d="M100 100 V175" {st(c, 6)}/>'
def ground_cover(c):
    out = ''
    for i, x in enumerate(range(25, 190, 30)):
        out += leaf_el(x, 165, 34 + (i % 2) * 10, -30, f'fill="{c}"') + leaf_el(x + 6, 165, 28, 28, f'fill="{c}" opacity=".6"')
    return out + f'<path d="M15 168 H185" {st(c, 3)}/>'

def ripple(c): return ''.join(f'<circle cx="100" cy="100" r="{r}" {st(c, 3)} opacity="{o}"/>' for r, o in [(18, 1), (40, .75), (62, .5), (84, .28)])
def radiating(c): return ''.join(f'<path d="M100 100 Q{100 + 50 * math.cos(math.radians(a + 20)):.1f} {100 + 50 * math.sin(math.radians(a + 20)):.1f} {100 + 85 * math.cos(math.radians(a)):.1f} {100 + 85 * math.sin(math.radians(a)):.1f}" {st(c, 3)}/>' for a in range(0, 360, 45))
def concentric(c): return ''.join(f'<circle cx="100" cy="100" r="{r}" {st(c, 2)}/>' for r in range(12, 92, 14))
def updown(c): return f'<path d="M10 100 C40 40 70 40 100 100 S160 160 190 100" {st(c, 5)}/><circle cx="100" cy="100" r="5" fill="{c}"/>'
def flow(c): return ''.join(f'<path d="M10 {y} C60 {y - 24} 100 {y + 24} 190 {y - 6}" {st(c, 3)} opacity="{o}"/>' for y, o in [(70, .5), (100, 1), (130, .5)])

def orbit_simple(c): return f'<ellipse cx="100" cy="100" rx="80" ry="34" {st(c, 2)}/><circle cx="100" cy="100" r="14" fill="{c}"/><circle cx="174" cy="88" r="7" fill="{c}"/>'
def three_rings(c): return ''.join(f'<circle cx="{100 + 30 * math.cos(math.radians(a))}" cy="{105 + 30 * math.sin(math.radians(a))}" r="46" {st(c, 3)}/>' for a in (-90, 30, 150))
def solar(c):
    out = f'<circle cx="100" cy="100" r="12" fill="{c}"/>'
    for r, a in [(36, 200), (58, 320), (82, 60)]:
        out += f'<circle cx="100" cy="100" r="{r}" {st(c, 1.5)} opacity=".6"/><circle cx="{100 + r * math.cos(math.radians(a)):.1f}" cy="{100 + r * math.sin(math.radians(a)):.1f}" r="7" fill="{c}"/>'
    return out
def awareness(c): return f'<circle cx="100" cy="100" r="8" fill="{c}"/><circle cx="100" cy="100" r="30" {st(c, 2)}/><path d="{arc(100, 100, 56, -30, 210)}" {st(c, 2)}/><path d="{arc(100, 100, 82, 150, 390)}" {st(c, 2)} opacity=".6"/>'
def connection(c):
    pts = [(100, 38), (40, 150), (160, 150)]
    out = ''.join(f'<path d="M{a[0]} {a[1]} Q100 110 {b[0]} {b[1]}" {st(c, 2)}/>' for a, b in [(pts[0], pts[1]), (pts[1], pts[2]), (pts[2], pts[0])])
    return out + ''.join(f'<circle cx="{x}" cy="{y}" r="13" fill="{c}"/>' for x, y in pts) + f'<circle cx="100" cy="113" r="6" fill="{c}"/>'

def stage(n):
    def draw(c):
        ground = f'<path d="M30 172 Q100 158 170 172" {st(c, 4)}/>'
        if n == 0: return ground + f'<ellipse cx="100" cy="150" rx="12" ry="16" fill="{c}"/>'
        if n == 1: return ground + f'<ellipse cx="100" cy="158" rx="10" ry="12" fill="{c}"/><path d="M100 148 Q98 128 108 118" {st(c, 4)}/>'
        if n == 2: return ground + f'<path d="M100 170 V120" {st(c, 4)}/>' + leaf_el(100, 124, 36, -55, f'fill="{c}"') + leaf_el(100, 120, 40, 50, f'fill="{c}"')
        if n == 3: return ground + f'<path d="M100 170 V80" {st(c, 5)}/><path d="M100 120 L70 95 M100 105 L132 82" {st(c, 3)}/>' + ''.join(leaf_el(x, y, 30, a, f'fill="{c}"') for x, y, a in [(70, 95, -40), (132, 82, 40), (100, 80, 0)])
        if n == 4: return canopy(c) + ground
        if n == 5: return canopy(c).replace('opacity=".9"', 'opacity=".5"') + ''.join(f'<circle cx="{x}" cy="{y}" r="7" fill="{c}"/>' for x, y in [(80, 80), (120, 72), (100, 60), (60, 110), (140, 108)]) + ground
        if n == 6: return canopy(c).replace('opacity=".9"', 'opacity=".5"') + ''.join(f'<circle cx="{x}" cy="{y}" r="9" {st(c, 3)}/>' for x, y in [(78, 96), (122, 92), (100, 70)]) + ground
        return f'<path d="M30 160 Q100 140 170 160" {st(c, 4)}/><path d="M30 178 Q100 160 170 178" {st(c, 3)} opacity=".6"/>' + leaf_el(70, 150, 30, 80, f'fill="{c}" opacity=".6"') + f'<ellipse cx="120" cy="166" rx="7" ry="9" fill="{c}"/>'
    return draw

def terrain(c): return f'<path d="M10 150 L60 90 L95 125 L135 60 L190 150" {st(c, 4)}/><path d="M10 170 H190" {st(c, 3)}/>'
def contours(c): return ''.join(f'<path d="M{100 - r} 110 C{100 - r} {110 - r * .9} {100 + r} {110 - r * 1.1} {100 + r} 110 C{100 + r} {110 + r * .8} {100 - r} {110 + r * .7} {100 - r} 110 Z" {st(c, 2)}/>' for r in (18, 38, 58, 78))
def strata(c): return ''.join(f'<path d="M10 {y} C60 {y - 10} 140 {y + 10} 190 {y}" {st(c, w)}/>' for y, w in [(60, 2), (85, 4), (115, 2), (140, 6), (170, 3)])
def terraces(c): return ''.join(f'<path d="M{10 + i * 6} {50 + i * 26} Q100 {30 + i * 26} {190 - i * 6} {50 + i * 26}" {st(c, 3)}/>' for i in range(6))
def tree_rings(c): return ''.join(f'<ellipse cx="{100 + i * 1.5}" cy="100" rx="{12 + i * 13}" ry="{10 + i * 12}" {st(c, 2)}/>' for i in range(6))
def water(c): return ''.join(f'<path d="M{x} 20 C{x - 30} 70 {x + 30} 130 {x} 180" {st(c, 3)} opacity="{o}"/>' for x, o in [(70, .5), (100, 1), (130, .5)])

def vesica(c): return f'<circle cx="80" cy="100" r="50" {st(c, 2)}/><circle cx="120" cy="100" r="50" {st(c, 2)}/><circle cx="100" cy="100" r="5" fill="{c}"/>'
def seven_circles(c): return f'<circle cx="100" cy="100" r="30" {st(c, 2)}/>' + ''.join(f'<circle cx="{100 + 30 * math.cos(math.radians(a)):.1f}" cy="{100 + 30 * math.sin(math.radians(a)):.1f}" r="30" {st(c, 2)}/>' for a in range(0, 360, 60))
def octagram(c):
    sq = lambda a: f'<rect x="50" y="50" width="100" height="100" transform="rotate({a} 100 100)" {st(c, 2)}/>'
    return sq(0) + sq(45) + f'<circle cx="100" cy="100" r="22" {st(c, 2)}/>'
def mandala(c): return ''.join(petal_el(100, 100, 70, 16, a, st(c, 2)) for a in range(0, 360, 45)) + f'<circle cx="100" cy="100" r="16" fill="{c}"/><circle cx="100" cy="100" r="84" {st(c, 1.5)}/>'

MOTIFS = {
    'lotus': {'lotus-line': lotus_line, 'lotus-layered': lotus_layered, 'lotus-geometric': lotus_geometric, 'lotus-leaf': lotus_leaf, 'lotus-watermark': lotus_watermark},
    'enso': {'enso-ink': enso_ink, 'enso-thin': enso_thin, 'enso-open': enso_open, 'enso-light': enso_light, 'enso-frame': enso_frame},
    'botanical': {'young-leaf': young_leaf, 'old-leaf': old_leaf, 'branch': branch, 'root': root, 'sprout': sprout, 'seed': seed, 'canopy': canopy, 'ground-cover': ground_cover},
    'breath': {'ripple': ripple, 'radiating': radiating, 'concentric': concentric, 'rise-fall': updown, 'flow': flow},
    'orbit': {'orbit-simple': orbit_simple, 'three-rings': three_rings, 'solar-minimal': solar, 'awareness-centre': awareness, 'connection': connection},
    'seed': {f'seed-{i + 1}-{n}': stage(i) for i, n in enumerate(['hat', 'nay-mam', 'ra-la', 'dam-canh', 'thanh-cay', 'no-hoa', 'ket-trai', 've-dat'])},
    'earth': {'terrain': terrain, 'contours': contours, 'strata': strata, 'terraces': terraces, 'tree-rings': tree_rings, 'water-flow': water},
    'golden-geometry': {'vesica': vesica, 'seven-circles': seven_circles, 'octagram': octagram, 'mandala-lite': mandala},
}


def motif_svg(fn, color, background=None, size=200):
    bg = f'<rect width="200" height="200" fill="{background}"/>' if background else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="{size}" height="{size}">{bg}{fn(color)}</svg>\n'


# ---------------------------------------------------------------- seamless patterns
def tile(fn, scale, offsets, color, opacity=1):
    return ''.join(f'<g transform="translate({x} {y}) scale({scale})" opacity="{opacity}">{fn(color)}</g>' for x, y in offsets)


PATTERNS = {
    'lotus-scatter': (120, lambda c: tile(lotus_line, .3, [(0, 0), (60, 60), (-60, 60), (60, -60), (-60, -60), (120, 0), (0, 120)], c)),
    'leaf-rain': (100, lambda c: tile(young_leaf, .24, [(10, 5), (60, 55), (-40, 55), (60, -45), (110, 5), (10, 105)], c)),
    'enso-dots': (80, lambda c: tile(enso_open, .22, [(18, 18), (-22, 58), (58, 58), (-22, -22), (58, -22)], c)),
    'breath-waves': (120, lambda c: ''.join(f'<path d="M0 {y} C30 {y - 12} 30 {y - 12} 60 {y} S90 {y + 12} 120 {y}" {st(c, 2.5)}/>' for y in (20, 60, 100))),
    'contour-field': (160, lambda c: tile(contours, .55, [(25, 25), (-55, 105), (105, 105), (-55, -55), (105, -55)], c)),
    'seed-rows': (90, lambda c: tile(seed, .16, [(14, 12), (59, 57), (-31, 57), (59, -33), (-31, -33)], c)),
    'orbit-dots': (110, lambda c: tile(orbit_simple, .3, [(25, 25), (-30, 80), (80, 80), (-30, -30), (80, -30)], c)),
    'vesica-grid': (100, lambda c: tile(vesica, .5, [(0, 0), (100, 0), (0, 100), (50, 50), (-50, 50), (50, -50), (-50, -50)], c)),
    'terrace-lines': (140, lambda c: ''.join(f'<path d="M0 {y} Q35 {y - 14} 70 {y} T140 {y}" {st(c, 2)}/>' for y in range(10, 140, 22))),
    'rice-grain': (60, lambda c: ''.join(f'<ellipse cx="{x}" cy="{y}" rx="3" ry="6" transform="rotate({r} {x} {y})" fill="{c}"/>' for x, y, r in [(15, 15, 20), (45, 15, -30), (30, 40, 10), (0, 40, -10), (60, 40, -10), (15, 75, 20), (45, 75, -30)])),
    'canopy-scallop': (80, lambda c: ''.join(f'<path d="{arc(x, y, 20, 180, 360)}" {st(c, 2.5)}/>' for x, y in [(20, 30), (60, 30), (0, 70), (40, 70), (80, 70), (20, 110), (60, 110)])),
    'root-network': (160, lambda c: tile(root, .7, [(10, 10), (-70, 90), (90, 90)], c)),
}


def pattern_svg(name, color, background, width=600, height=400):
    size, body = PATTERNS[name]
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">'
            f'<defs><pattern id="p" width="{size}" height="{size}" patternUnits="userSpaceOnUse">{body(color)}</pattern></defs>'
            f'<rect width="100%" height="100%" fill="{background}"/><rect width="100%" height="100%" fill="url(#p)"/></svg>\n')


def pattern_tile_svg(name, color):
    size, body = PATTERNS[name]
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}"><defs><clipPath id="t"><rect width="{size}" height="{size}"/></clipPath></defs><g clip-path="url(#t)">{body(color)}</g></svg>\n'


# ---------------------------------------------------------------- dividers, frames, textures
def _div(inner):
    return lambda c: f'<path d="M20 20 H250 M350 20 H580" {st(c, 1.5)}/>' + inner(c)


DIVIDERS = {
    'leaf': _div(lambda c: leaf_el(300, 30, 26, -60, f'fill="{c}"') + leaf_el(300, 30, 26, 60, f'fill="{c}"')),
    'lotus': _div(lambda c: f'<g transform="translate(272 -6) scale(.28)">{lotus_layered(c)}</g>'),
    'wave': lambda c: f'<path d="M20 20 C70 5 120 35 170 20 S270 5 320 20 S420 35 470 20 S560 10 580 20" {st(c, 2)}/>',
    'dots': lambda c: ''.join(f'<circle cx="{x}" cy="20" r="{3 if x != 300 else 5}" fill="{c}"/>' for x in range(60, 560, 40)),
    'enso': _div(lambda c: f'<g transform="translate(282 2) scale(.18)">{enso_open(c)}</g>'),
    'seed-growth': _div(lambda c: ''.join(f'<g transform="translate({256 + i * 22} 4) scale(.16)">{stage(i * 2)(c)}</g>' for i in range(4))),
    'earth': lambda c: f'<path d="M20 26 Q300 2 580 26" {st(c, 2)}/><path d="M80 34 Q300 16 520 34" {st(c, 1.5)} opacity=".6"/>',
    'orbit': _div(lambda c: f'<ellipse cx="300" cy="20" rx="34" ry="9" {st(c, 1.5)}/><circle cx="300" cy="20" r="4" fill="{c}"/><circle cx="332" cy="17" r="2.5" fill="{c}"/>'),
    'light': _div(lambda c: f'<path d="M300 6 L304 16 L314 20 L304 24 L300 34 L296 24 L286 20 L296 16 Z" fill="{c}"/>'),
    'simple': lambda c: f'<path d="M20 20 H580" {st(c, 1)}/><rect x="295" y="15" width="10" height="10" transform="rotate(45 300 20)" fill="{c}"/>',
}


def divider_svg(fn, color):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 40" width="600" height="40">{fn(color)}</svg>\n'


def _corner(fn, scale=.32):
    def frame(c):
        base = f'<rect x="20" y="20" width="560" height="360" rx="18" {st(c, 1.5)}/>'
        spots = [(20, 20, 0), (580, 20, 90), (580, 380, 180), (20, 380, 270)]
        return base + ''.join(f'<g transform="translate({x} {y}) rotate({r}) translate(-8 -8) scale({scale})">{fn(c)}</g>' for x, y, r in spots)
    return frame


FRAMES = {
    'leaf-corners': _corner(lambda c: leaf_el(40, 120, 90, 45, f'fill="{c}"') + leaf_el(40, 120, 70, 85, f'fill="{c}" opacity=".6"')),
    'lotus-crown': lambda c: f'<rect x="20" y="40" width="560" height="340" rx="22" {st(c, 1.5)}/><g transform="translate(258 -8) scale(.42)">{lotus_layered(c)}</g>',
    'enso-window': lambda c: f'<g transform="translate(70 -30) scale(2.3)">{enso_ink(c)}</g>',
    'arch': lambda c: f'<path d="M120 380 V180 A180 180 0 0 1 480 180 V380 Z" {st(c, 2)}/><path d="M140 380 V184 A160 160 0 0 1 460 184 V380" {st(c, 1)} opacity=".5"/>',
    'double-line': lambda c: f'<rect x="20" y="20" width="560" height="360" rx="20" {st(c, 2)}/><rect x="32" y="32" width="536" height="336" rx="14" {st(c, 1)} opacity=".6"/>',
    'botanical-corners': _corner(branch, .36),
    'breath-bands': lambda c: ''.join(f'<path d="M20 {y} C120 {y - 14} 200 {y + 14} 300 {y} S480 {y - 14} 580 {y}" {st(c, 2)}/>' for y in (30, 46, 354, 370)),
    'earth-base': lambda c: f'<rect x="20" y="20" width="560" height="360" rx="18" {st(c, 1.5)}/><path d="M20 330 Q300 280 580 330" {st(c, 2)}/><path d="M20 352 Q300 310 580 352" {st(c, 1.5)} opacity=".6"/>',
    'orbit-ring': lambda c: f'<ellipse cx="300" cy="200" rx="270" ry="175" {st(c, 1.5)}/><circle cx="560" cy="160" r="8" fill="{c}"/><circle cx="60" cy="250" r="5" fill="{c}"/>',
    'geometry-corners': _corner(vesica, .3),
    'seed-band': lambda c: f'<rect x="20" y="20" width="560" height="360" rx="18" {st(c, 1.5)}/>' + ''.join(f'<g transform="translate({60 + i * 62} 316) scale(.28)">{stage(i)(c)}</g>' for i in range(8)),
    'sun-window': lambda c: f'<rect x="20" y="20" width="560" height="360" rx="180" {st(c, 2)}/><circle cx="300" cy="80" r="18" fill="{c}"/>',
}


def frame_svg(fn, color):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">{fn(color)}</svg>\n'


def _speckle(c, seed=7, n=900):
    rng = random.Random(seed)
    return ''.join(f'<circle cx="{rng.uniform(0, 400):.1f}" cy="{rng.uniform(0, 400):.1f}" r="{rng.uniform(.4, 1.2):.2f}" fill="{c}" opacity="{rng.uniform(.06, .2):.2f}"/>' for _ in range(n))


TEXTURES = {
    'paper-speckle': lambda c: _speckle(c),
    'linen': lambda c: ''.join(f'<path d="M0 {y} H400" stroke="{c}" stroke-width=".6" opacity=".09"/>' for y in range(0, 400, 4)) + ''.join(f'<path d="M{x} 0 V400" stroke="{c}" stroke-width=".6" opacity=".06"/>' for x in range(0, 400, 5)),
    'contour-faint': lambda c: f'<g opacity=".12">{contours(c)}</g><g transform="translate(200 200)" opacity=".1">{contours(c)}</g><g transform="translate(200 0)" opacity=".08">{tree_rings(c)}</g>',
    'rice-straw': lambda c: ''.join(f'<path d="M{x} {y} l{l} -{l * .3:.1f}" stroke="{c}" stroke-width="1" opacity=".1"/>' for x, y, l in [(random.Random(i).uniform(0, 400), random.Random(i + 99).uniform(0, 400), random.Random(i + 7).uniform(8, 20)) for i in range(260)]),
    'leaf-shadow': lambda c: ''.join(leaf_el(x, y, 120, a, f'fill="{c}" opacity=".05"') for x, y, a in [(60, 200, 20), (180, 380, -30), (300, 160, 40), (380, 400, -10)]),
    'water-faint': lambda c: ''.join(f'<path d="M0 {y} C100 {y - 10} 300 {y + 10} 400 {y}" {st(c, 1)} opacity=".1"/>' for y in range(20, 400, 26)),
    'dot-grid': lambda c: ''.join(f'<circle cx="{x}" cy="{y}" r="1" fill="{c}" opacity=".16"/>' for x in range(10, 400, 20) for y in range(10, 400, 20)),
    'soft-hatch': lambda c: ''.join(f'<path d="M{x} 0 L{x - 400} 400" stroke="{c}" stroke-width=".7" opacity=".07"/>' for x in range(0, 800, 9)),
}


def texture_svg(fn, color, background):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><rect width="400" height="400" fill="{background}"/>{fn(color)}</svg>\n'


# ---------------------------------------------------------------- motion (CSS keyframes, honours reduced motion)
REDUCE = '@media (prefers-reduced-motion: reduce){*{animation:none!important}}'
MOTION = {
    'leaf-sway': ('Lá khẽ lay động', '.m{transform-origin:100px 175px;animation:sway 6s ease-in-out infinite alternate}@keyframes sway{from{transform:rotate(-4deg)}to{transform:rotate(4deg)}}', lambda c: f'<g class="m">{young_leaf(c)}</g>'),
    'seed-sprout': ('Hạt giống nảy mầm', '.m{transform-origin:100px 170px;animation:grow 4s cubic-bezier(.05,.7,.1,1) infinite}@keyframes grow{0%{transform:scaleY(.1);opacity:.3}60%,100%{transform:scaleY(1);opacity:1}}', lambda c: f'<g class="m">{stage(2)(c)}</g>'),
    'lotus-bloom': ('Hoa sen nở', '.p{transform-origin:100px 150px;animation:bloom 5s ease-in-out infinite alternate}.l{--r:-38deg}.r{--r:38deg}@keyframes bloom{from{transform:rotate(0)}to{transform:rotate(var(--r))}}', lambda c: f'<g class="p l">{petal_el(100, 150, 76, 24, 0, f"fill={chr(34)}{c}{chr(34)} opacity={chr(34)}.6{chr(34)}")}</g><g class="p r">{petal_el(100, 150, 76, 24, 0, f"fill={chr(34)}{c}{chr(34)} opacity={chr(34)}.6{chr(34)}")}</g>{petal_el(100, 150, 90, 26, 0, f"fill={chr(34)}{c}{chr(34)}")}'),
    'breath-circle': ('Vòng tròn hơi thở (4s hít, 6s thở)', '.m{transform-origin:100px 100px;animation:breath 10s cubic-bezier(.45,0,.55,1) infinite}@keyframes breath{0%{transform:scale(.6)}40%{transform:scale(1)}100%{transform:scale(.6)}}', lambda c: f'<circle class="m" cx="100" cy="100" r="70" fill="{c}" opacity=".25"/><circle cx="100" cy="100" r="70" {st(c, 2)}/>'),
    'ripple': ('Gợn nước lan tỏa', '.m{transform-origin:100px 100px;animation:rip 4s ease-out infinite}.d{animation-delay:2s}@keyframes rip{from{transform:scale(.2);opacity:1}to{transform:scale(1.1);opacity:0}}', lambda c: f'<circle class="m" cx="100" cy="100" r="80" {st(c, 3)}/><circle class="m d" cx="100" cy="100" r="80" {st(c, 3)}/><circle cx="100" cy="100" r="6" fill="{c}"/>'),
    'dawn-light': ('Ánh sáng bình minh', '.m{animation:rise 8s ease-in-out infinite alternate}@keyframes rise{from{transform:translateY(30px);opacity:.4}to{transform:translateY(0);opacity:1}}', lambda c: f'<defs><clipPath id="h"><rect width="200" height="150"/></clipPath></defs><g clip-path="url(#h)"><circle class="m" cx="100" cy="150" r="46" fill="{c}"/></g><path d="M20 150 H180" {st(c, 4)}/>'),
    'orbit': ('Quỹ đạo hành tinh', '.m{transform-origin:100px 100px;animation:spin 40s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}', lambda c: f'<g class="m">{solar(c)}</g>'),
    'line-draw': ('Đường nét được vẽ dần', '.m{stroke-dasharray:900;stroke-dashoffset:900;animation:draw 6s ease-in-out infinite alternate}@keyframes draw{to{stroke-dashoffset:0}}', lambda c: f'<path class="m" d="M30 150 C30 90 60 50 100 40 C140 50 170 90 170 150 Q100 120 30 150 Z" {st(c, 3)}/>'),
}


def motion_svg(key, color):
    title, css, body = MOTION[key]
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><title>{title}</title><style>{css}{REDUCE}</style>{body(color)}</svg>\n'
