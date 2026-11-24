"""Draw the five animated illustrations (and the cover) for the article "Mặt Trời, Mặt Trăng và nhịp sống của chúng ta".

Run:  python3 scripts/illustrations/sky-rhythm.py
Writes public/media/illustrations/<id>.svg (Vietnamese labels) and <id>.en.svg (English labels),
plus the cover public/media/illustrations/sun-moon-cover.webp (1200 x 800) and its 640 x 400 thumbnail.

Rules kept on purpose: no scripts, no external links, a <title> in every file, movement by CSS keyframes only
(so they play inside an <img>; no SMIL, which ignores prefers-reduced-motion), and every animation switched off under prefers-reduced-motion with a meaningful still frame.
The cover render needs Python Playwright (Chromium) and Pillow.
"""
import io
import math
import pathlib
import random

root = pathlib.Path(__file__).resolve().parents[2]
out = root / 'public' / 'media' / 'illustrations'
FONT = "'Be Vietnam Pro','Noto Sans','Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif"
GOLD, GOLD_LIGHT, GOLD_DEEP = '#f4c76b', '#ffe7a8', '#dc9b36'
INK, CREAM = '#3a2a55', '#fff6dc'

REDUCE = '@media (prefers-reduced-motion: reduce){*{animation:none !important}}'


def svg(title: str, body: str, defs: str = '', css: str = '') -> str:
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800" role="img">'
            f'<title>{title}</title><defs>{defs}<style>text{{font-family:{FONT};font-weight:600}}{css}{REDUCE}</style></defs>{body}</svg>')


def stars(seed: int, count: int, x0=0, x1=1200, y0=0, y1=420, twinkle=True) -> str:
    rnd = random.Random(seed)
    parts = []
    for i in range(count):
        x, y = rnd.randint(x0, x1), rnd.randint(y0, y1)
        r = round(rnd.uniform(1.2, 2.8), 1)
        cls = f' class="tw tw{i % 3}"' if twinkle else ''
        parts.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{GOLD_LIGHT}" opacity="{round(rnd.uniform(.4, .9), 2)}"{cls}/>')
    return ''.join(parts)


TWINKLE_CSS = ('.tw{animation:tw 5s ease-in-out infinite}.tw1{animation-delay:-1.7s}.tw2{animation-delay:-3.3s}'
               '@keyframes tw{0%,100%{opacity:.35}50%{opacity:1}}')


def moon_shape(cx: float, cy: float, r: float, phase: str, lit=GOLD_LIGHT, dark='#2c1f50', rim=GOLD) -> str:
    """One moon disc. phase: new, wax_cres, first_q, wax_gib, full, wan_gib, last_q, wan_cres (northern-hemisphere view)."""
    base = f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{dark}" stroke="{rim}" stroke-opacity=".55" stroke-width="2.5"/>'
    if phase == 'new':
        return base
    if phase == 'full':
        return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{lit}" stroke="{rim}" stroke-opacity=".8" stroke-width="2.5"/>'
    waning = phase.startswith('wan')
    kind = phase.split('_')[1]
    k = {'cres': .55, 'q': 0.0, 'gib': .55}[kind]
    top, bottom = f'{cx} {cy - r}', f'{cx} {cy + r}'
    gibbous = kind == 'gib'
    # right half is lit, the terminator is an ellipse of half-width k*r
    d = f'M {top} A {r} {r} 0 0 1 {bottom} A {round(k * r, 1)} {r} 0 0 {1 if gibbous else 0} {top} Z'
    shape = f'<path d="{d}" fill="{lit}"/>'
    if waning:
        shape = f'<g transform="translate({2 * cx} 0) scale(-1 1)">{shape}</g>'
    return base + shape


# ---------------------------------------------------------------- 1. the Sun through a day
def sun_daily_light(lang: str) -> str:
    t = {'vi': dict(title='Mặt Trời đi qua bầu trời và nhịp tỉnh táo, buồn ngủ của cơ thể trong một ngày',
                    am='Sáng', noon='Trưa', pm='Chiều', alert='Tỉnh táo', sleepy='Buồn ngủ'),
         'en': dict(title='The Sun crossing the sky, and the body’s rhythm of alertness and sleepiness through a day',
                    am='Morning', noon='Noon', pm='Evening', alert='Alert', sleepy='Sleepy')}[lang]
    steps = 24
    kf, line = [], []
    for i in range(steps + 1):
        u = i / steps
        x, y = 120 + 960 * u, 400 - 1040 * u * (1 - u)
        kf.append(f'{round(100 * u, 2)}%{{transform:translate({round(x, 1)}px,{round(y, 1)}px)}}')
    css = ('.sun{transform:translate(600px,140px);animation:sunpath 16s linear infinite}'
           '@keyframes sunpath{' + ''.join(kf) + '}'
           '.guide{transform:translateX(600px);animation:guide 16s linear infinite}'
           '@keyframes guide{0%{transform:translateX(120px)}100%{transform:translateX(1080px)}}'
           '.halo{transform-box:fill-box;transform-origin:center;animation:halo 4s ease-in-out infinite}'
           '@keyframes halo{0%,100%{transform:scale(1);opacity:.85}50%{transform:scale(1.18);opacity:1}}')
    defs = (f'<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdf5e2"/><stop offset=".55" stop-color="#f8e6c4"/><stop offset="1" stop-color="#efd2a8"/></linearGradient>'
            f'<radialGradient id="glow"><stop offset="0" stop-color="{GOLD_LIGHT}" stop-opacity=".95"/><stop offset=".45" stop-color="{GOLD}" stop-opacity=".35"/><stop offset="1" stop-color="{GOLD}" stop-opacity="0"/></radialGradient>'
            f'<linearGradient id="sunbody" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0c2"/><stop offset="1" stop-color="{GOLD_DEEP}"/></linearGradient>')
    body = (
        '<rect width="1200" height="800" fill="url(#sky)"/>'
        '<path d="M120 400 Q600 -120 1080 400" fill="none" stroke="#c9873a" stroke-opacity=".45" stroke-width="3" stroke-dasharray="3 14" stroke-linecap="round"/>'
        '<line x1="60" y1="400" x2="1140" y2="400" stroke="#9c6b3a" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/>'
        '<g class="sun"><circle class="halo" r="120" fill="url(#glow)"/><circle r="46" fill="url(#sunbody)"/></g>'
        f'<text x="150" y="450" font-size="42" text-anchor="middle" fill="{INK}">{t["am"]}</text>'
        f'<text x="600" y="450" font-size="42" text-anchor="middle" fill="{INK}">{t["noon"]}</text>'
        f'<text x="1050" y="450" font-size="42" text-anchor="middle" fill="{INK}">{t["pm"]}</text>'
        '<rect x="60" y="476" width="1080" height="256" rx="28" fill="#ffffff" fill-opacity=".42"/>'
        '<line x1="100" y1="712" x2="1100" y2="712" stroke="#9c6b3a" stroke-opacity=".45" stroke-width="2"/>'
        f'<path d="M120 712 C330 712 420 510 600 510 S870 712 1080 712" fill="none" stroke="{GOLD_DEEP}" stroke-width="9" stroke-linecap="round"/>'
        '<path d="M120 522 C250 537 330 697 480 697 L720 697 C870 697 950 537 1080 522" fill="none" stroke="#6d4f9a" stroke-width="9" stroke-linecap="round"/>'
        '<g class="guide"><line y1="492" y2="716" stroke="#7a4a6e" stroke-opacity=".6" stroke-width="3" stroke-dasharray="6 9"/></g>'
        f'<circle cx="372" cy="766" r="11" fill="{GOLD_DEEP}"/><text x="394" y="779" font-size="38" fill="{INK}">{t["alert"]}</text>'
        f'<circle cx="702" cy="766" r="11" fill="#6d4f9a"/><text x="724" y="779" font-size="38" fill="{INK}">{t["sleepy"]}</text>'
    )
    return svg(t['title'], body, defs, css)


# ---------------------------------------------------------------- 2. one lunar month
def moon_phase_cycle(lang: str) -> str:
    t = {'vi': dict(title='Một vòng trăng gần 29,5 ngày: từ mồng một, qua rằm, rồi quay lại cuối tháng',
                    d1='Mồng 1', full='Rằm', end='30', cycle='29,5', unit='ngày'),
         'en': dict(title='One lunar month of about 29.5 days: new moon, full moon, and back to the end of the month',
                    d1='Day 1', full='Day 15', end='Day 30', cycle='29.5', unit='days')}[lang]
    cx, cy, R, r = 600, 410, 235, 50
    order = ['new', 'wax_cres', 'first_q', 'wax_gib', 'full', 'wan_gib', 'last_q', 'wan_cres']
    moons = ''
    for i, ph in enumerate(order):
        a = math.radians(-90 + 45 * i)
        moons += moon_shape(round(cx + R * math.cos(a), 1), round(cy + R * math.sin(a), 1), r, ph)
    css = ('.spin{transform-origin:600px 410px;animation:spin 24s linear infinite}'
           '@keyframes spin{to{transform:rotate(360deg)}}'
           '.pulse{transform-box:fill-box;transform-origin:center;animation:pulse 4s ease-in-out infinite}'
           '@keyframes pulse{0%,100%{opacity:.55}50%{opacity:1}}' + TWINKLE_CSS)
    defs = ('<linearGradient id="night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#100c24"/><stop offset=".6" stop-color="#2c1f50"/><stop offset="1" stop-color="#3b2a5c"/></linearGradient>'
            f'<radialGradient id="mid"><stop offset="0" stop-color="{GOLD}" stop-opacity=".28"/><stop offset="1" stop-color="{GOLD}" stop-opacity="0"/></radialGradient>')
    body = (
        '<rect width="1200" height="800" fill="url(#night)"/>' + stars(11, 46, 0, 1200, 0, 800) +
        f'<circle cx="{cx}" cy="{cy}" r="170" fill="url(#mid)"/>'
        f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="none" stroke="{GOLD}" stroke-opacity=".28" stroke-width="2" stroke-dasharray="4 12" stroke-linecap="round"/>'
        + moons +
        f'<g class="spin"><circle class="pulse" cx="{cx}" cy="{cy - R}" r="{r + 14}" fill="none" stroke="{GOLD_LIGHT}" stroke-width="5"/></g>'
        f'<text x="{cx}" y="{cy + 12}" font-size="84" text-anchor="middle" fill="{GOLD_LIGHT}">≈ {t["cycle"]}</text>'
        f'<text x="{cx}" y="{cy + 66}" font-size="40" text-anchor="middle" fill="{CREAM}" fill-opacity=".85">{t["unit"]}</text>'
        f'<text x="{cx}" y="86" font-size="46" text-anchor="middle" fill="{CREAM}">{t["d1"]}</text>'
        f'<text x="{cx}" y="768" font-size="46" text-anchor="middle" fill="{CREAM}">{t["full"]}</text>'
        f'<text x="{round(cx - R * math.cos(math.radians(45)) - 72)}" y="{round(cy - R * math.sin(math.radians(45)) + 14)}" font-size="46" text-anchor="end" fill="{CREAM}">{t["end"]}</text>'
    )
    return svg(t['title'], body, defs, css)


# ---------------------------------------------------------------- 3. Earth, Moon, Sun and the tides
def earth_moon_sun(lang: str) -> str:
    t = {'vi': dict(title='Mặt Trời, Trái Đất, Mặt Trăng thẳng hàng hay vuông góc: nước biển dâng nhiều hay ít',
                    sun='Mặt Trời', earth='Trái Đất', moon='Mặt Trăng', tide='Triều dâng'),
         'en': dict(title='Sun, Earth and Moon in line or at right angles: how much the sea swells',
                    sun='Sun', earth='Earth', moon='Moon', tide='Tide')}[lang]
    ex, ey, orbit = 650, 400, 250
    mx = ex - orbit  # the Moon starts between Earth and Sun: a new moon
    css = ('.orbit{transform-origin:650px 400px;animation:spin 20s linear infinite}'
           f'.keep{{transform-origin:{mx}px 400px;animation:unspin 20s linear infinite}}'
           '@keyframes spin{to{transform:rotate(360deg)}}@keyframes unspin{to{transform:rotate(-360deg)}}'
           '.bulge{transform-origin:650px 400px;animation:swell 10s ease-in-out infinite}'
           '@keyframes swell{0%,100%{transform:scaleX(1)}50%{transform:scaleX(.74)}}'
           '.ray{stroke-dasharray:14 22;animation:flow 3s linear infinite}@keyframes flow{to{stroke-dashoffset:-36}}'
           '.sunpulse{transform-origin:40px 400px;animation:sp 5s ease-in-out infinite}@keyframes sp{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}')
    defs = ('<linearGradient id="space" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#150f2c"/><stop offset="1" stop-color="#1f2a52"/></linearGradient>'
            f'<radialGradient id="sunglow"><stop offset="0" stop-color="{GOLD_LIGHT}"/><stop offset=".55" stop-color="{GOLD}" stop-opacity=".75"/><stop offset="1" stop-color="{GOLD}" stop-opacity="0"/></radialGradient>'
            '<radialGradient id="earth" cx=".38" cy=".34"><stop offset="0" stop-color="#7fd0d8"/><stop offset=".6" stop-color="#2f7fa8"/><stop offset="1" stop-color="#1c4a78"/></radialGradient>')
    rays = ''.join(f'<line class="ray" x1="230" y1="{y}" x2="1150" y2="{y}" stroke="{GOLD}" stroke-opacity=".38" stroke-width="3" stroke-linecap="round"/>'
                   for y in (250, 325, 400, 475, 550))
    moon = (f'<circle cx="{mx}" cy="400" r="44" fill="#2c2748" stroke="{GOLD}" stroke-opacity=".5" stroke-width="2"/>'
            f'<path d="M {mx} 356 A 44 44 0 0 0 {mx} 444 Z" fill="{GOLD_LIGHT}"/>')
    body = (
        '<rect width="1200" height="800" fill="url(#space)"/>' + stars(5, 40, 0, 1200, 0, 800, True) + rays +
        f'<g class="sunpulse"><circle cx="40" cy="400" r="230" fill="url(#sunglow)"/><circle cx="40" cy="400" r="150" fill="{GOLD_LIGHT}"/></g>'
        f'<circle cx="{ex}" cy="{ey}" r="{orbit}" fill="none" stroke="{CREAM}" stroke-opacity=".28" stroke-width="2" stroke-dasharray="3 12" stroke-linecap="round"/>'
        f'<g class="orbit"><ellipse class="bulge" cx="{ex}" cy="{ey}" rx="118" ry="84" fill="#6fc1e6" fill-opacity=".5"/>'
        f'<g class="keep">{moon}<text x="{mx}" y="486" font-size="38" text-anchor="middle" fill="{CREAM}">{t["moon"]}</text></g></g>'
        f'<circle cx="{ex}" cy="{ey}" r="66" fill="url(#earth)"/>'
        f'<path d="M610 380 q18 -22 38 -8 q10 14 -4 26 q-22 8 -34 -18Z M668 410 q24 -6 30 14 q-8 20 -26 12 q-10 -12 -4 -26Z" fill="#8fd18a" fill-opacity=".85"/>'
        f'<text x="{ex}" y="{ey + 108}" font-size="38" text-anchor="middle" fill="{CREAM}">{t["earth"]}</text>'
        f'<text x="40" y="640" font-size="38" fill="{CREAM}">{t["sun"]}</text>'
        f'<ellipse cx="880" cy="768" rx="30" ry="18" fill="#6fc1e6" fill-opacity=".7"/><text x="925" y="781" font-size="38" fill="{CREAM}">{t["tide"]}</text>'
    )
    return svg(t['title'], body, defs, css)


# ---------------------------------------------------------------- 4. the Moon as a mirror
def moon_mirror(lang: str) -> str:
    t = {'vi': 'Một người ngồi yên bên mặt nước đêm; ánh trăng làm sáng những điều vẫn nằm sẵn trong lòng',
         'en': 'A person sitting still by the night water; moonlight lights up what was already within'}[lang]
    css = ('.moon{transform-box:fill-box;transform-origin:center;animation:breathe 8s ease-in-out infinite}'
           '@keyframes breathe{0%,100%{transform:scale(1);opacity:.8}50%{transform:scale(1.22);opacity:1}}'
           '.lamp{transform-box:fill-box;transform-origin:center;animation:breathe 8s ease-in-out infinite}'
           '.rise{animation:rise 9s ease-in infinite;opacity:0}'
           '@keyframes rise{0%{transform:translate(0,0);opacity:0}12%{opacity:.95}100%{transform:translate(var(--dx),-330px);opacity:0}}'
           '.glint{animation:glint 6s ease-in-out infinite}@keyframes glint{0%,100%{opacity:.25}50%{opacity:.9}}' + TWINKLE_CSS)
    defs = ('<linearGradient id="night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d0920"/><stop offset=".55" stop-color="#2a1d4d"/><stop offset="1" stop-color="#4a2f5e"/></linearGradient>'
            '<linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b2250"/><stop offset="1" stop-color="#120d28"/></linearGradient>'
            f'<radialGradient id="halo"><stop offset="0" stop-color="{GOLD_LIGHT}" stop-opacity=".85"/><stop offset=".5" stop-color="{GOLD}" stop-opacity=".25"/><stop offset="1" stop-color="{GOLD}" stop-opacity="0"/></radialGradient>')
    dots = ''
    rnd = random.Random(8)
    for i in range(9):
        x0 = 262 + rnd.randint(-26, 30)
        dx = rnd.randint(60, 330)
        dots += (f'<circle class="rise" cx="{x0}" cy="{470 + rnd.randint(-12, 14)}" r="{rnd.choice([5, 6, 7, 9])}" fill="{GOLD_LIGHT}" '
                 f'style="--dx:{dx}px;animation-delay:{round(i * 1.0, 1)}s"/>')
    glints = ''.join(f'<ellipse class="glint" cx="{860 + dx}" cy="{y}" rx="{w}" ry="4" fill="{GOLD_LIGHT}" style="animation-delay:{round(-i * .7, 1)}s"/>'
                     for i, (dx, y, w) in enumerate([(0, 560, 120), (-30, 590, 90), (28, 618, 110), (-8, 648, 70), (20, 680, 90), (-24, 712, 60), (6, 744, 44)]))
    body = (
        '<rect width="1200" height="800" fill="url(#night)"/>' + stars(23, 70, 0, 1200, 0, 520) +
        '<circle class="moon" cx="860" cy="210" r="210" fill="url(#halo)"/>'
        f'<circle cx="860" cy="210" r="92" fill="{GOLD_LIGHT}"/>'
        '<circle cx="832" cy="190" r="14" fill="#f1d58e" fill-opacity=".7"/><circle cx="888" cy="236" r="19" fill="#f1d58e" fill-opacity=".55"/><circle cx="880" cy="168" r="9" fill="#f1d58e" fill-opacity=".6"/>'
        '<rect y="540" width="1200" height="260" fill="url(#water)"/>' + glints +
        '<path d="M0 540 L1200 540" stroke="#6d5aa0" stroke-opacity=".5" stroke-width="2"/>'
        '<path d="M0 520 Q150 470 320 508 Q440 530 520 540 L0 560Z" fill="#0c0818"/>'
        f'<circle class="lamp" cx="262" cy="450" r="120" fill="url(#halo)" opacity=".5"/>'
        '<path d="M196 520 Q204 478 240 470 L286 470 Q322 478 330 520 Z" fill="#0c0818"/>'
        '<circle cx="263" cy="438" r="27" fill="#0c0818"/>' + dots
    )
    return svg(t, body, defs, css)


# ---------------------------------------------------------------- 5. the monthly practice wheel
def practice_wheel(lang: str) -> str:
    t = {'vi': dict(title='Vòng thực hành theo tuần trăng: gieo ý định, nuôi dưỡng, soi chiếu, buông bớt',
                    labels=['Gieo', 'Nuôi', 'Soi', 'Buông']),
         'en': dict(title='A monthly practice wheel: sow an intention, tend it, reflect, release',
                    labels=['Sow', 'Tend', 'Reflect', 'Release'])}[lang]
    cx, cy, R = 600, 400, 250
    nodes = [(cx, cy - R, '1'), (cx + R, cy, '8'), (cx, cy + R, '15'), (cx - R, cy, '22')]
    css = ('.dotspin{transform-origin:600px 400px;animation:spin 24s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}'
           '.node{fill-opacity:.7;animation:nodeglow 24s ease-in-out infinite}'
           '.n2{animation-delay:6s}.n3{animation-delay:12s}.n4{animation-delay:18s}'
           '@keyframes nodeglow{0%{fill-opacity:1;transform:scale(1.14)}16%{fill-opacity:.7;transform:scale(1)}100%{fill-opacity:.7;transform:scale(1)}}'
           '.node{transform-box:fill-box;transform-origin:center}'
           '.core{animation:coremoon 24s linear infinite}'
           '@keyframes coremoon{0%{transform:translateX(0)}49.99%{transform:translateX(-140px)}50%{transform:translateX(140px)}100%{transform:translateX(0)}}'
           '.breath{transform-box:fill-box;transform-origin:center;animation:br 6s ease-in-out infinite}@keyframes br{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.12);opacity:.9}}' + TWINKLE_CSS)
    defs = ('<linearGradient id="night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#100c24"/><stop offset=".6" stop-color="#2c1f50"/><stop offset="1" stop-color="#4a2f5e"/></linearGradient>'
            f'<radialGradient id="mid"><stop offset="0" stop-color="{GOLD}" stop-opacity=".3"/><stop offset="1" stop-color="{GOLD}" stop-opacity="0"/></radialGradient>'
            f'<clipPath id="disc"><circle cx="{cx}" cy="{cy}" r="72"/></clipPath>')
    node_svg, label_svg = '', ''
    pos = [(cx, cy - R - 92, 'middle'), (cx + R + 92, cy + 16, 'start'), (cx, cy + R + 112, 'middle'), (cx - R - 92, cy + 16, 'end')]
    for i, ((nx, ny, num), (lx, ly, anchor)) in enumerate(zip(nodes, pos)):
        node_svg += (f'<circle class="node n{i + 1}" cx="{nx}" cy="{ny}" r="62" fill="{GOLD}" stroke="{GOLD_LIGHT}" stroke-width="3"/>'
                     f'<text x="{nx}" y="{ny + 19}" font-size="54" text-anchor="middle" fill="#2c1f50">{num}</text>')
        label_svg += f'<text x="{lx}" y="{ly}" font-size="48" text-anchor="{anchor}" fill="{CREAM}">{t["labels"][i]}</text>'
    body = (
        '<rect width="1200" height="800" fill="url(#night)"/>' + stars(31, 40, 0, 1200, 0, 800) +
        f'<circle class="breath" cx="{cx}" cy="{cy}" r="150" fill="url(#mid)"/>'
        f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="none" stroke="{GOLD}" stroke-opacity=".35" stroke-width="6" stroke-dasharray="2 16" stroke-linecap="round"/>'
        f'<circle cx="{cx}" cy="{cy}" r="72" fill="{GOLD_LIGHT}"/>'
        f'<g clip-path="url(#disc)"><circle class="core" cx="{cx}" cy="{cy}" r="72" fill="#2c1f50"/></g>'
        f'<circle cx="{cx}" cy="{cy}" r="72" fill="none" stroke="{GOLD}" stroke-opacity=".7" stroke-width="3"/>'
        + node_svg + label_svg +
        f'<g class="dotspin"><circle cx="{cx}" cy="{cy - R}" r="15" fill="{GOLD_LIGHT}"/></g>'
    )
    return svg(t['title'], body, defs, css)


# ---------------------------------------------------------------- cover (static, rendered to WebP)
def cover() -> str:
    defs = ('<linearGradient id="sky" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f6c776"/><stop offset=".38" stop-color="#d98d78"/><stop offset=".66" stop-color="#6b4a86"/><stop offset="1" stop-color="#1b1438"/></linearGradient>'
            '<linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset="1" stop-color="#1b1438" stop-opacity=".55"/></linearGradient>'
            '<linearGradient id="lake" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e3a56a"/><stop offset=".45" stop-color="#8a5f86"/><stop offset="1" stop-color="#241a46"/></linearGradient>'
            f'<radialGradient id="sunglow"><stop offset="0" stop-color="{GOLD_LIGHT}" stop-opacity=".95"/><stop offset=".5" stop-color="{GOLD}" stop-opacity=".35"/><stop offset="1" stop-color="{GOLD}" stop-opacity="0"/></radialGradient>'
            '<radialGradient id="moonglow"><stop offset="0" stop-color="#fff6dc" stop-opacity=".8"/><stop offset=".5" stop-color="#d9d0ff" stop-opacity=".22"/><stop offset="1" stop-color="#d9d0ff" stop-opacity="0"/></radialGradient>')
    glints = ''.join(f'<ellipse cx="{x}" cy="{y}" rx="{w}" ry="3.5" fill="{c}" fill-opacity=".75"/>'
                     for x, y, w, c in [(300, 585, 120, GOLD_LIGHT), (285, 615, 90, GOLD_LIGHT), (312, 646, 120, GOLD_LIGHT), (296, 680, 70, GOLD_LIGHT), (305, 716, 100, GOLD_LIGHT),
                                        (900, 590, 90, '#fff6dc'), (890, 622, 64, '#fff6dc'), (906, 656, 80, '#fff6dc'), (896, 692, 50, '#fff6dc')])
    body = (
        '<rect width="1200" height="800" fill="url(#sky)"/>' + stars(41, 64, 560, 1200, 0, 380, False) +
        '<circle cx="300" cy="470" r="260" fill="url(#sunglow)"/><circle cx="300" cy="470" r="88" fill="#ffe7a8"/>'
        '<circle cx="900" cy="230" r="190" fill="url(#moonglow)"/><circle cx="900" cy="230" r="72" fill="#fff6dc"/>'
        '<circle cx="880" cy="216" r="11" fill="#e8dcc0" fill-opacity=".7"/><circle cx="922" cy="250" r="15" fill="#e8dcc0" fill-opacity=".55"/><circle cx="918" cy="204" r="7" fill="#e8dcc0" fill-opacity=".6"/>'
        '<path d="M0 520 Q130 470 260 505 Q380 540 520 500 Q690 450 820 505 Q1000 560 1200 490 L1200 800 L0 800Z" fill="#2a1c46" fill-opacity=".9"/>'
        '<rect y="560" width="1200" height="240" fill="url(#lake)"/><rect y="560" width="1200" height="240" fill="url(#fade)"/>' + glints +
        '<path d="M0 560 L1200 560" stroke="#fff6dc" stroke-opacity=".25" stroke-width="2"/>'
    )
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800"><defs>{defs}</defs>{body}</svg>')


def main() -> None:
    out.mkdir(parents=True, exist_ok=True)
    makers = {'sun-daily-light': sun_daily_light, 'moon-phase-cycle': moon_phase_cycle, 'earth-moon-tides': earth_moon_sun,
              'moon-mirror': moon_mirror, 'monthly-wheel': practice_wheel}
    for name, make in makers.items():
        for lang, suffix in (('vi', ''), ('en', '.en')):
            target = out / f'{name}{suffix}.svg'
            target.write_text(make(lang), encoding='utf-8')
            print(target.relative_to(root), target.stat().st_size // 1024 or 1, 'KB')

    from PIL import Image
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1200, 'height': 800}, device_scale_factor=1)
        page.set_content(f'<html><body style="margin:0;background:#1b1438">{cover()}</body></html>')
        page.wait_for_timeout(200)
        image = Image.open(io.BytesIO(page.screenshot(type='png'))).convert('RGB')
        browser.close()
    big = out / 'sun-moon-cover.webp'
    image.save(big, 'WEBP', quality=82, method=6)
    thumb = root / 'public' / 'media' / 'thumbs' / 'sun-moon-cover.webp'
    image.crop((0, 25, 1200, 775)).resize((640, 400), Image.LANCZOS).save(thumb, 'WEBP', quality=80, method=6)
    print(big.relative_to(root), big.stat().st_size // 1024, 'KB', image.size)
    print(thumb.relative_to(root), thumb.stat().st_size // 1024, 'KB')


if __name__ == '__main__':
    main()
