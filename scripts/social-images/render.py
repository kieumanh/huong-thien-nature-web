"""Render the link-share images (1200 x 630 JPEG) from template.html.

Needs Python Playwright (Chromium) and Pillow:  python3 scripts/social-images/render.py
Output: public/media/social/<name>-<lang>.jpg, plus 640 x 400 search thumbnails for the support page.
Text lives in template.html; change it there and re-run. Keep every file under ~250 KB.
"""
import io
import pathlib
import sys

from PIL import Image
from playwright.sync_api import sync_playwright

root = pathlib.Path(__file__).resolve().parents[2]
template = pathlib.Path(__file__).with_name('template.html').as_uri()
out_dir = root / 'public' / 'media' / 'social'
out_dir.mkdir(parents=True, exist_ok=True)

jobs = [('brand', 'huong-thien-nature'), ('support', 'quy-ung-ho')]
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1200, 'height': 630}, device_scale_factor=1)
    for variant, name in jobs:
        for lang in ('vi', 'en'):
            page.goto(f'{template}?v={variant}&lang={lang}', wait_until='load')
            page.evaluate('document.fonts.ready')
            page.wait_for_timeout(300)
            image = Image.open(io.BytesIO(page.screenshot(type='png'))).convert('RGB')
            target = out_dir / f'{name}-{lang}.jpg'
            image.save(target, 'JPEG', quality=90, optimize=True, progressive=True, subsampling=0)
            print(target.relative_to(root), target.stat().st_size // 1024, 'KB', image.size)
            if variant == 'support' and lang == 'vi':
                # Search-result thumbnail: centre crop to 16:10, 640 x 400 WebP.
                crop = image.crop((96, 0, 1104, 630)).resize((640, 400), Image.LANCZOS)
                thumb = root / 'public' / 'media' / 'thumbs' / 'page-support.webp'
                crop.save(thumb, 'WEBP', quality=80, method=6)
                print(thumb.relative_to(root), thumb.stat().st_size // 1024, 'KB')
    browser.close()
sys.exit(0)
