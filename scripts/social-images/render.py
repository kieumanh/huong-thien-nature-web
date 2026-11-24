"""Render the link-share images (1200 x 630 JPEG) from template.html, and the Tarot course illustration.

Needs Python Playwright (Chromium) and Pillow:  python3 scripts/social-images/render.py
Outputs:
  public/media/social/<name>-<lang>.jpg            link-share pictures (brand, support, tarot-course)
  public/media/thumbs/page-support.webp            640 x 400 search thumbnail (support page)
  public/media/guidance/tarot-illustration.webp    text-free Tarot illustration for course cards (1200 x 630)
  public/media/thumbs/course-tarot.webp            640 x 400 search thumbnail (Tarot course)
Text lives in template.html; change it there and re-run. Keep every share file under ~250 KB.
"""
import io
import pathlib
import sys

from PIL import Image
from playwright.sync_api import sync_playwright

root = pathlib.Path(__file__).resolve().parents[2]
template = pathlib.Path(__file__).with_name('template.html').as_uri()
social_dir = root / 'public' / 'media' / 'social'
thumb_dir = root / 'public' / 'media' / 'thumbs'
guidance_dir = root / 'public' / 'media' / 'guidance'
for folder in (social_dir, thumb_dir, guidance_dir):
    folder.mkdir(parents=True, exist_ok=True)

# (template variant, file name, languages)
jobs = [('brand', 'huong-thien-nature', ('vi', 'en')), ('support', 'quy-ung-ho', ('vi', 'en')), ('tarot', 'tarot-course', ('vi', 'en'))]


def shoot(page, variant: str, lang: str) -> Image.Image:
    page.goto(f'{template}?v={variant}&lang={lang}', wait_until='load')
    page.evaluate('document.fonts.ready')
    page.wait_for_timeout(300)
    return Image.open(io.BytesIO(page.screenshot(type='png'))).convert('RGB')


with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1200, 'height': 630}, device_scale_factor=1)
    for variant, name, languages in jobs:
        for lang in languages:
            image = shoot(page, variant, lang)
            target = social_dir / f'{name}-{lang}.jpg'
            image.save(target, 'JPEG', quality=90, optimize=True, progressive=True, subsampling=0)
            print(target.relative_to(root), target.stat().st_size // 1024, 'KB', image.size)
            if variant == 'support' and lang == 'vi':
                # Search-result thumbnail: centre crop to 16:10, 640 x 400 WebP.
                crop = image.crop((96, 0, 1104, 630)).resize((640, 400), Image.LANCZOS)
                thumb = thumb_dir / 'page-support.webp'
                crop.save(thumb, 'WEBP', quality=80, method=6)
                print(thumb.relative_to(root), thumb.stat().st_size // 1024, 'KB')

    # Tarot course card illustration: no text (the card already shows the title), one file for both languages.
    art = shoot(page, 'tarot-art', 'vi')
    illustration = guidance_dir / 'tarot-illustration.webp'
    art.save(illustration, 'WEBP', quality=84, method=6)
    print(illustration.relative_to(root), illustration.stat().st_size // 1024, 'KB', art.size)
    thumb = thumb_dir / 'course-tarot.webp'
    art.crop((96, 0, 1104, 630)).resize((640, 400), Image.LANCZOS).save(thumb, 'WEBP', quality=80, method=6)
    print(thumb.relative_to(root), thumb.stat().st_size // 1024, 'KB')
    browser.close()
sys.exit(0)
