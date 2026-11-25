"""Turn short Vietnamese strings into SVG path data, so logo files carry no live text.

Fonts are the OFL files in brand/fonts. Each family ships as unicode subsets (latin + vietnamese);
every character is drawn from the first subset that contains it. Variable fonts are instanced
at the requested weight. Kerning is not applied: the strings here are short and letter-spaced
by hand in the logo builder.
"""
from __future__ import annotations

import functools
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

FONTS = Path(__file__).resolve().parent.parent / 'fonts'

FAMILIES = {
    'script': ['dancing-script-latin-700-normal.woff2', 'dancing-script-vietnamese-700-normal.woff2'],
    'serif': ['lora-latin-wght-normal.woff2', 'lora-vietnamese-wght-normal.woff2'],
    'serif-italic': ['lora-latin-wght-italic.woff2', 'lora-vietnamese-wght-italic.woff2'],
    'sans': ['be-vietnam-pro-latin-600-normal.woff2', 'be-vietnam-pro-vietnamese-600-normal.woff2'],
    'sans-regular': ['be-vietnam-pro-latin-400-normal.woff2', 'be-vietnam-pro-vietnamese-400-normal.woff2'],
}


@functools.cache
def _font(name: str, weight: int | None) -> TTFont:
    font = TTFont(FONTS / name)
    if 'fvar' in font and weight is not None:
        from fontTools.varLib import instancer
        font = instancer.instantiateVariableFont(font, {'wght': weight})
    return font


def _pick(family: str, char: str, weight: int | None):
    for name in FAMILIES[family]:
        font = _font(name, weight)
        glyph = font.getBestCmap().get(ord(char))
        if glyph:
            return font, glyph
    raise KeyError(f'No glyph for {char!r} in {family}')


def outline(text: str, family: str, size: float, x: float = 0, y: float = 0, tracking: float = 0,
            weight: int | None = None, anchor: str = 'start') -> tuple[str, float]:
    """Return (path data, advance width) with the baseline at y. tracking is in em."""
    pieces: list[tuple[TTFont, str, float]] = []
    width = 0.0
    for index, char in enumerate(text):
        font, glyph = _pick(family, char, weight)
        scale = size / font['head'].unitsPerEm
        advance = font['hmtx'][glyph][0] * scale
        pieces.append((font, glyph, width))
        width += advance + (tracking * size if index < len(text) - 1 else 0)
    start = x - (width / 2 if anchor == 'middle' else width if anchor == 'end' else 0)
    data = []
    for font, glyph, offset in pieces:
        scale = size / font['head'].unitsPerEm
        pen = SVGPathPen(font.getGlyphSet())
        font.getGlyphSet()[glyph].draw(TransformPen(pen, (scale, 0, 0, -scale, start + offset, y)))
        data.append(pen.getCommands())
    return ' '.join(part for part in data if part), width
