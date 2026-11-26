"""Menu-bar search opens in place with live results; Home hero slideshow changes every 6 seconds and can be paused; 404 offers a way back."""
import os, shutil
from playwright.sync_api import sync_playwright, expect

base = os.environ.get('APP_BASE_URL', 'http://127.0.0.1:8788').rstrip('/')
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_EXECUTABLE') or shutil.which('chromium'), headless=True, args=['--no-sandbox'])
    for lang, path, query, search in [('vi', '/vi/', 'hoi tho', '/vi/timkiem/'), ('en', '/en/', 'breath', '/en/search/')]:
        ctx = browser.new_context(viewport={'width': 393, 'height': 850}, reduced_motion='no-preference')
        page = ctx.new_page()
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.goto(base + path, wait_until='networkidle')
        # Search opens in place and keeps the visitor on the page.
        page.locator('.nav-search').click()
        expect(page.locator('#nav-search-input')).to_be_focused()
        assert page.locator('.nav-search').get_attribute('aria-expanded') == 'true'
        page.locator('#nav-search-input').fill(query)
        page.wait_for_function('document.querySelectorAll(".nav-search-results a").length > 0')
        assert page.url == base + path, 'typing must not leave the page'
        assert all(a.get_attribute('href').startswith('/' + lang + '/') for a in page.locator('.nav-search-results a').all())
        page.keyboard.press('Escape')
        expect(page.locator('[data-searchbar]')).to_be_hidden()
        expect(page.locator('.nav-search')).to_be_focused()
        # Enter with a keyword goes to the full search page with the keyword kept.
        page.locator('.nav-search').click()
        page.locator('#nav-search-input').fill(query)
        page.keyboard.press('Enter')
        page.wait_for_url('**' + search + '?q=*')
        # Hero slideshow (Home only).
        page.goto(base + path, wait_until='networkidle')
        slides = page.locator('[data-hero-slide]')
        assert slides.count() >= 6
        assert 'is-active' in slides.nth(0).get_attribute('class')
        page.wait_for_function('document.querySelectorAll("[data-hero-slide]")[1].classList.contains("is-active")', timeout=9000)
        page.locator('[data-hero-toggle]').click()
        assert page.locator('[data-hero-toggle]').get_attribute('aria-pressed') == 'true'
        page.wait_for_timeout(7000)
        assert 'is-active' in slides.nth(1).get_attribute('class'), 'paused slideshow must not move'
        page.locator('[data-hero-dot]').nth(3).click()
        assert 'is-active' in slides.nth(3).get_attribute('class')
        assert slides.nth(3).locator('img').get_attribute('src'), 'photo loads when it is shown'
        assert errors == [], errors
        ctx.close()
    # Reduced motion: no automatic change.
    ctx = browser.new_context(viewport={'width': 1280, 'height': 800}, reduced_motion='reduce')
    page = ctx.new_page(); page.goto(base + '/vi/', wait_until='networkidle'); page.wait_for_timeout(7000)
    assert 'is-active' in page.locator('[data-hero-slide]').nth(0).get_attribute('class')
    ctx.close()
    # 404
    ctx = browser.new_context(viewport={'width': 393, 'height': 850})
    page = ctx.new_page(); page.goto(base + '/en/not-here/', wait_until='domcontentloaded')
    expect(page.locator('[data-lost-lang="en"]')).to_be_visible(); expect(page.locator('[data-lost-lang="vi"]')).to_be_hidden()
    assert page.locator('[data-lost-lang="en"] [data-lost-path]').inner_text() == '/en/not-here/'
    page.locator('[data-lost-lang="en"] a.button').click(); page.wait_for_url('**/en/')
    page.goto(base + '/vi/', wait_until='networkidle'); page.goto(base + '/vi/khong-co/', wait_until='domcontentloaded')
    expect(page.locator('[data-lost-lang="vi"]')).to_be_visible()
    ctx.close(); browser.close()
print('Menu search, hero slideshow and 404 pass')
