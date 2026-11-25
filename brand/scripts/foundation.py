"""Living Zen 2.0 foundation data: colours, contrast, design tokens. Single source for brand/ and the website."""
from __future__ import annotations

PRIMARY = [
    ('forest', 'Forest Green', 'Xanh rừng', '#243F32', 'Màu nhận diện chính: logo, điều hướng, nút chính ban ngày, footer ban ngày.'),
    ('orchid', 'Orchid', 'Tím lan', '#713C63', 'Tiêu đề cảm xúc, trích dẫn, nội dung thiền và đời sống nội tâm.'),
    ('golden', 'Golden Light', 'Vàng kim', '#F4C76B', 'Điểm nhấn có chủ đích: ánh sáng, dấu mốc, hành động đặc biệt. Không dùng cho chữ trên nền sáng.'),
]
SUPPORTING = [
    ('paper', 'Organic Paper', 'Giấy mộc', '#FBF6EA', 'Nền đọc, nền mặc định.'),
    ('moss', 'Moss Green', 'Xanh rêu', '#526747', 'Thiên nhiên, thực hành, không gian THÂN.'),
    ('clay', 'Earth Clay', 'Đất nung', '#8B523D', 'Đất, dinh dưỡng, nguồn cội, cửa hàng.'),
    ('night', 'Night Plum', 'Tím đêm', '#100C24', 'Không gian ban đêm, Tần Số Vàng.'),
]
EXTENDED = [
    ('forest-hover', 'Forest Hover', '#365544'), ('leaf', 'Leaf', '#536C4C'), ('ink-soft', 'Soft Ink', '#586557'),
    ('cream', 'Warm Cream', '#F6EED9'), ('herbal', 'Herbal Cream', '#F3EBD4'), ('raised', 'Raised Paper', '#FFFDF7'),
    ('sand', 'Sand', '#DDD5BF'), ('rice', 'Rice Gold', '#EFE0B8'), ('orchid-deep', 'Deep Orchid', '#492742'),
    ('orchid-mist', 'Orchid Mist', '#F1E4EE'), ('orchid-line', 'Orchid Line', '#CDB1C7'), ('gold-hi', 'Golden Highlight', '#FFE7A8'),
    ('gold-deep', 'Golden Deep', '#C88A2C'), ('gold-accent', 'Golden Accent', '#855510'), ('gold-wash', 'Golden Wash', '#FBF2DD'),
    ('gold-ink', 'Golden Ink', '#1A1233'), ('plum-deep', 'Plum Deep', '#1A1338'), ('plum', 'Cosmic Plum', '#2C1F50'),
    ('night-orchid', 'Night Orchid', '#EDB9DD'),
]
SEMANTIC = [
    ('success', '#2B5741', '#E1F0E5', 'Thành công — kèm icon ✓ và chữ'),
    ('warning', '#6B4C22', '#F3E8CE', 'Cảnh báo — kèm icon ! và chữ'),
    ('error', '#7C392C', '#F4E5DF', 'Lỗi — kèm icon × và chữ mô tả cách sửa'),
    ('info', '#2F4F63', '#E3EDF2', 'Thông tin — kèm icon i'),
]

ALL = {key: hex for key, _, _, hex, _ in PRIMARY + SUPPORTING}
ALL.update({key: hex for key, _, hex in EXTENDED})


def luminance(hex_color: str) -> float:
    hex_color = hex_color.lstrip('#')
    channels = [int(hex_color[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    linear = [c / 12.92 if c <= .03928 else ((c + .055) / 1.055) ** 2.4 for c in channels]
    return .2126 * linear[0] + .7152 * linear[1] + .0722 * linear[2]


def contrast(a: str, b: str) -> float:
    la, lb = sorted((luminance(a), luminance(b)), reverse=True)
    return (la + .05) / (lb + .05)


def verdict(ratio: float) -> str:
    if ratio >= 7: return 'AAA chữ thường'
    if ratio >= 4.5: return 'AA chữ thường'
    if ratio >= 3: return 'Chỉ chữ lớn / thành phần giao diện'
    return 'Không dùng cho chữ'


PAIRS = [
    ('forest', 'paper'), ('ink-soft', 'paper'), ('orchid', 'paper'), ('gold-accent', 'paper'), ('moss', 'paper'), ('clay', 'paper'),
    ('paper', 'forest'), ('golden', 'forest'), ('gold-hi', 'forest'), ('gold-ink', 'golden'), ('gold-hi', 'night'), ('night-orchid', 'night'),
    ('paper', 'orchid'), ('orchid-deep', 'orchid-mist'), ('forest', 'cream'), ('golden', 'paper'), ('gold-deep', 'paper'), ('sand', 'paper'),
]

# ---- Design tokens (three tiers). Primitive values are the palette above plus scales.
PRIMITIVE = {
    'color': {key: value for key, value in ALL.items()},
    'space': {'1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '24px', '6': '32px', '7': '48px', '8': '64px', '9': '96px'},
    'radius': {'control': '10px', 'input': '14px', 'card': '20px', 'feature': '28px', 'floating': '16px', 'pill': '999px'},
    'font': {
        'emotion': '"Dancing Script", Georgia, serif',
        'editorial': '"Lora Variable", Lora, Georgia, "Noto Serif", serif',
        'interface': 'system-ui, "Segoe UI", "Noto Sans", Arial, sans-serif',
    },
    'duration': {'instant': '60ms', 'fast': '150ms', 'standard': '260ms', 'gentle': '600ms', 'ambient': '22s'},
    'easing': {'standard': 'cubic-bezier(.2, .65, .3, 1)', 'enter': 'cubic-bezier(.05, .7, .1, 1)', 'exit': 'cubic-bezier(.3, 0, .8, .15)', 'breath': 'cubic-bezier(.45, 0, .55, 1)'},
    'shadow': {'flat': 'none', 'subtle': '0 1px 2px #243f3214, 0 2px 8px #243f320d', 'raised': '0 6px 24px #243f3214', 'floating': '0 2px 6px #243f3226, 0 10px 28px #243f3224'},
    'breakpoint': {'sm': '480px', 'md': '768px', 'lg': '1024px', 'xl': '1280px', 'xxl': '1440px'},
}

# Semantic tokens point at primitives; values are CSS so night mode can override them in daylight.css.
SEMANTIC_TOKENS = {
    'bg': 'var(--surface)', 'surface': 'var(--surface-raised)', 'surface-muted': 'var(--surface-container)',
    'fg': 'var(--foreground)', 'fg-muted': 'var(--muted)',
    'primary': 'var(--primary)', 'primary-hover': 'var(--primary-hover)', 'on-primary': 'var(--on-primary)',
    'secondary': 'var(--surface-warm)', 'on-secondary': 'var(--foreground)',
    'accent': 'var(--orchid)', 'special': 'var(--gold)', 'on-special': 'var(--gold-ink)', 'special-text': 'var(--gold-accent)',
    'border': 'var(--border)', 'border-strong': 'var(--border-control)', 'focus': 'var(--focus)',
    'success': 'var(--success)', 'warning': 'var(--warning)', 'error': 'var(--error)', 'info': 'var(--info)',
}

COMPONENT_TOKENS = {
    'button-primary-bg': 'var(--lz-primary)', 'button-primary-fg': 'var(--lz-on-primary)', 'button-primary-hover': 'var(--lz-primary-hover)',
    'button-secondary-bg': 'var(--lz-secondary)', 'button-secondary-fg': 'var(--lz-on-secondary)', 'button-secondary-border': 'var(--lz-border)',
    'button-special-bg': 'var(--gold-gradient)', 'button-special-fg': 'var(--gold-ink)',
    'card-bg': 'var(--lz-surface)', 'card-border': 'var(--lz-border)', 'card-shadow': 'var(--lz-shadow-subtle)', 'card-radius': 'var(--lz-radius-card)',
    'input-bg': 'var(--lz-surface)', 'input-border': 'var(--lz-border-strong)', 'input-radius': 'var(--lz-radius-input)',
    'nav-active-fg': 'var(--lz-fg)', 'nav-active-indicator': 'var(--lz-primary)', 'nav-hover-bg': 'var(--lz-secondary)',
    'header-rule': 'var(--lz-border)',
    'footer-bg': 'var(--footer-surface)', 'footer-fg': 'var(--footer-link)', 'footer-heading': 'var(--footer-heading)', 'footer-accent': 'var(--gold)',
    'quote-fg': 'var(--lz-accent)', 'quote-rule': 'var(--orchid-line)',
    'badge-bg': 'var(--lz-surface-muted)', 'badge-fg': 'var(--lz-fg)',
    'progress-track': 'var(--lz-surface-muted)', 'progress-fill': 'var(--lz-primary)',
    'product-card-bg': 'var(--lz-surface)', 'course-card-bg': 'var(--lz-surface)', 'article-measure': '68ch',
}


def tokens_css() -> str:
    lines = ['/* Living Zen 2.0 design tokens — generated by brand/scripts/build.py. Do not edit by hand. */', ':root {']
    for group, values in PRIMITIVE.items():
        if group == 'breakpoint':
            continue
        lines.append(f'  /* {group} */')
        for key, value in values.items():
            lines.append(f'  --lz-{group}-{key}: {value};')
    lines.append('  /* semantic */')
    lines.extend(f'  --lz-{key}: {value};' for key, value in SEMANTIC_TOKENS.items())
    lines.append('  /* component */')
    lines.extend(f'  --lz-{key}: {value};' for key, value in COMPONENT_TOKENS.items())
    lines.append('}')
    return '\n'.join(lines) + '\n'
