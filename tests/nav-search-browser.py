"""Menu-bar search opens in place with live results; Home hero is one still photograph; 404 offers a way back."""
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
        # The Home hero is one still photograph (no slideshow, no ornaments).
        page.goto(base + path, wait_until='networkidle')
        assert page.locator('.landing-hero__art img').count() == 1
        assert page.locator('[data-hero-slide], [data-hero-toggle], .landing-orb, .landing-hero__leaf').count() == 0
        assert errors == [], errors
        ctx.close()
    # 404: each language has its own page (English under /en/, Vietnamese elsewhere), with working header, footer and home link.
    ctx = browser.new_context(viewport={'width': 393, 'height': 850})
    page = ctx.new_page(); page.goto(base + '/en/404.html', wait_until='domcontentloaded')
    expect(page.locator('h1')).to_have_text('We couldn’t find this page.')
    assert page.evaluate("document.documentElement.lang") == 'en'
    assert page.locator('header a.brand').get_attribute('href') == '/en/'
    assert page.locator('[data-lost-path]').inner_text() == '/en/404.html'
    page.locator('main a.button').click(); page.wait_for_url('**/en/')
    page.goto(base + '/vi/khong-co/', wait_until='domcontentloaded')
    expect(page.locator('h1')).to_have_text('Không tìm thấy trang này.')
    assert page.evaluate("document.documentElement.lang") == 'vi'
    page.locator('main a.button').click(); page.wait_for_url('**/vi/')
    ctx.close(); browser.close()
print('Menu search, still hero and 404 pass')
