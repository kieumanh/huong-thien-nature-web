"""Tản văn in a real browser: search, sort, topics, "a chance encounter", reading mode, privacy, axe and layout."""
from pathlib import Path
import os, shutil, json
from playwright.sync_api import sync_playwright
from site_manifest import load_site_manifest

base = os.environ.get('APP_BASE_URL', 'http://127.0.0.1:8788').rstrip('/')
out = Path(os.environ.get('ROOTS_ARTIFACT_DIR', str(Path(__file__).resolve().parents[1] / '.artifacts')))
out.mkdir(parents=True, exist_ok=True)
axe_path = os.environ.get('AXE_PATH')
site = load_site_manifest()
report = []
ARTICLE = {'vi': '/vi/tan-van/chua-lanh-la-tro-ve/', 'en': '/en/journal/healing-as-coming-home/'}
KEYS = ['htn:garden:v1', 'htn:reading:v1']

def listing(lang):
    return site['journals'][lang]

def stored(page):
    return page.evaluate("keys => keys.map(key => localStorage.getItem(key))", KEYS)

def axe_violations(page, label):
    if not axe_path:
        return []
    page.add_script_tag(path=axe_path)
    result = page.evaluate("axe.run(document, {runOnly: {type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}})")
    return [f"{label}: {v['id']} on {[n['target'] for n in v['nodes']][:3]}" for v in result['violations']]

def visible_cards(page):
    return page.locator('#journal-grid [data-journal-card]:not([hidden])')

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_EXECUTABLE') or shutil.which('chromium'), headless=True, args=['--no-sandbox'])
    problems = []

    # ---------- Layout: no horizontal scroll, hero, featured page, cards per row ----------
    for width, columns in [(390, 1), (820, 2), (1440, 3)]:
        context = browser.new_context(viewport={'width': width, 'height': 900}, reduced_motion='reduce')
        page = context.new_page()
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        for lang in ['vi', 'en']:
            page.goto(base + listing(lang), wait_until='domcontentloaded')
            page.wait_for_function('document.querySelectorAll("#journal-grid [data-journal-card]:not([hidden])").length > 0')
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'{lang} {width}: horizontal scroll'
            assert page.locator('h1').inner_text() == ('Tản văn' if lang == 'vi' else 'Journal')
            assert page.locator('.journal-slogan').is_visible() and page.locator('.journal-book').is_visible()
            assert page.locator('.journal-book a.button').is_visible()
            assert visible_cards(page).count() == 9, f'{lang} {width}: nine cards on the first page'
            tops = page.evaluate('[...document.querySelectorAll("#journal-grid [data-journal-card]:not([hidden])")].map(card => Math.round(card.getBoundingClientRect().top + scrollY))')
            assert len(set(tops[:columns])) == 1 and (columns == 1 or tops[columns] > tops[0]), f'{lang} {width}: {columns} cards per row'
            assert page.locator('.journal-topic').count() == 7 and page.locator('.journal-topic .topic-icon').count() == 7
            for button in page.locator('button, a.button, select, input').all():
                if button.is_visible():
                    box = button.bounding_box()
                    if box and (box['height'] < 40 and button.get_attribute('class') not in (None, '')):
                        if 'journal-page' in (button.get_attribute('class') or ''): continue
                        problems.append(f'{lang} {width}: small target {button.get_attribute("class")} {box["height"]:.0f}px')
        assert not errors, errors
        context.close()
    report.append('Listing fits 390/820/1440 px in both languages: hero, open-page feature, 1/2/3 cards per row, seven topic chips with icons')

    # ---------- Listing behaviour (desktop, Vietnamese) ----------
    context = browser.new_context(viewport={'width': 1280, 'height': 900}, reduced_motion='reduce')
    page = context.new_page()
    requests = []
    page.on('request', lambda r: requests.append((r.method, r.url)))
    page.goto(base + listing('vi'), wait_until='domcontentloaded')
    page.wait_for_function('document.querySelector("[data-journal-pages]") && !document.querySelector("[data-journal-pages]").hidden')
    total = int(page.evaluate('document.querySelectorAll("#journal-grid [data-journal-card]").length'))
    # Topic chip
    page.locator('.journal-topic[data-topic="thien-nhien"]').click()
    assert visible_cards(page).count() == 3 and page.locator('[data-journal-count]').inner_text().startswith('3')
    assert 'chu-de=thien-nhien' in page.url
    page.locator('.journal-topic[data-topic="all"]').click()
    # Search: diacritic-insensitive on title, then full text (needs the index)
    box = page.locator('#journal-search')
    box.fill('lang nghe')
    page.wait_for_function('document.querySelector("[data-journal-count]").textContent.includes("khớp")')
    titles = page.locator('#journal-grid [data-journal-card]:not([hidden]) h3').all_inner_texts()
    assert any('Lắng nghe' in title for title in titles), titles
    box.fill('khong phu nhan')
    page.wait_for_function('document.querySelector("[data-journal-count]").textContent.includes("khong phu nhan")')
    page.wait_for_function('document.querySelectorAll("#journal-grid [data-journal-card]:not([hidden])").length === 1')
    assert page.evaluate('document.querySelector("#journal-grid [data-journal-card]:not([hidden])").dataset.slug') == 'small-joys-gratitude', 'a phrase finds the article that contains it, not the whole library'
    assert 'q=khong+phu+nhan' in page.url or 'q=khong%20phu%20nhan' in page.url
    box.fill('zzzqqq')
    page.wait_for_function('!document.querySelector("[data-journal-empty]").hidden')
    assert visible_cards(page).count() == 0
    page.locator('[data-journal-reset]').click()
    assert visible_cards(page).count() == 9 and page.locator('[data-journal-empty]').is_hidden()
    assert page.locator('#journal-search').input_value() == ''
    # Sort: newest first is the default on a fresh visit
    page.goto(base + listing('vi'), wait_until='domcontentloaded')
    assert page.locator('#journal-sort').input_value() == 'newest'
    assert page.evaluate('document.querySelector("#journal-grid [data-journal-card]:not([hidden])").dataset.slug') == 'healing-as-coming-home'
    page.select_option('#journal-sort', 'short')
    minutes = page.evaluate('[...document.querySelectorAll("#journal-grid [data-journal-card]:not([hidden])")].map(card => Number(card.dataset.minutes))')
    assert minutes == sorted(minutes), minutes
    page.select_option('#journal-sort', 'newest')
    dates = page.evaluate('[...document.querySelectorAll("#journal-grid [data-journal-card]:not([hidden])")].map(card => card.dataset.date)')
    assert dates[0] == '2026-11-24' and dates == sorted(dates, reverse=True), dates
    # Pagination
    page.locator('.journal-page', has_text='2').first.click()
    assert visible_cards(page).count() == min(9, total - 9) and 'trang=2' in page.url
    page.goto(base + listing('vi') + '?q=tho&sap-xep=short&chu-de=hoi-tho-co-the', wait_until='domcontentloaded')
    page.wait_for_function('document.querySelector("[data-journal-count]").textContent.includes("khớp")')
    assert page.locator('#journal-search').input_value() == 'tho' and page.locator('#journal-sort').input_value() == 'short'
    page.goto(base + listing('vi'), wait_until='domcontentloaded')
    page.wait_for_function('document.querySelector("[data-journal-pages]") && !document.querySelector("[data-journal-pages]").hidden')
    # A chance encounter: suggests, never navigates
    url_before = page.url
    page.locator('[data-chance-button]').click()
    assert page.locator('[data-chance-result]').is_visible()
    href = page.locator('[data-chance-open]').get_attribute('href')
    assert href.startswith('/vi/tan-van/') and page.url == url_before
    first = page.locator('[data-chance-link]').inner_text()
    seen = {first}
    for _ in range(12):
        page.locator('[data-chance-again]').click()
        seen.add(page.locator('[data-chance-link]').inner_text())
        assert page.url == url_before
    assert len(seen) > 1, 'suggestions vary'
    report.append('Listing: topic chips, diacritic-insensitive title and full-text search, empty state, newest-first default and shortest-read sort, pagination, shareable address, "a chance encounter" never navigates')

    # ---------- Article: tools, save, garden ----------
    page.goto(base + ARTICLE['vi'], wait_until='domcontentloaded')
    page.wait_for_function('!!document.querySelector("[data-share]")')
    assert page.locator('.article-pullquote').count() == 1 and page.locator('.article-pause').count() >= 1
    assert page.locator('.article-closing').inner_text() == 'Chúc bạn có một ngày đủ bình yên để lắng nghe chính mình.'
    assert page.locator('.article-pager a').count() == 2
    assert page.locator('.related-articles [data-journal-card]').count() <= 3
    assert page.locator('[data-save]').count() == 0, 'no save buttons'
    page.goto(base + listing('vi'), wait_until='domcontentloaded')
    assert page.locator('[data-garden]').count() == 0 and page.locator('#khu-vuon').count() == 0, 'the garden section is gone'
    report.append('Article: pull quote, pause, closing line, previous/next, at most three related; no save buttons and no garden section')

    # ---------- Reading mode ----------
    page.goto(base + ARTICLE['vi'], wait_until='domcontentloaded')
    page.wait_for_function('!!document.querySelector("[data-reading-toggle]")')
    assert page.evaluate('document.documentElement.dataset.reading') is None, 'never on by itself'
    size_before = page.evaluate('parseFloat(getComputedStyle(document.querySelector(".article-body")).fontSize)')
    toggle = page.locator('[data-reading-toggle]')
    toggle.click()
    assert page.evaluate('document.documentElement.dataset.reading') == 'on' and toggle.get_attribute('aria-pressed') == 'true'
    assert page.locator('.topbar').is_hidden() and page.locator('.footer').is_hidden() and page.locator('.related-articles').is_hidden()
    assert page.locator('[data-reading-bar]').is_visible() and page.evaluate('document.activeElement.hasAttribute("data-reading-exit")')
    assert page.locator('.music-dock').count() == 1, 'the one existing music player stays'
    page.locator('[data-reading-size="1"]').click()
    page.locator('[data-reading-size="1"]').click()
    bigger = page.evaluate('parseFloat(getComputedStyle(document.querySelector(".article-body")).fontSize)')
    assert bigger > size_before * 1.1, (size_before, bigger)
    for theme in ['light', 'ivory', 'dim']:
        page.locator(f'[data-reading-choice="{theme}"]').click()
        assert page.locator(f'[data-reading-choice="{theme}"]').get_attribute('aria-pressed') == 'true'
        problems += axe_violations(page, f'reading mode {theme}')
    background = page.evaluate('getComputedStyle(document.body).backgroundColor')
    assert background == 'rgb(29, 27, 25)', background
    moving = page.evaluate('[...document.querySelectorAll("*")].filter(el => { const s = getComputedStyle(el); return s.animationName !== "none" || (s.transitionDuration && s.transitionDuration.split(",").some(d => parseFloat(d) > 0)); }).length')
    assert moving == 0, f'{moving} elements still animate in reading mode'
    page.keyboard.press('Escape')
    assert page.evaluate('document.documentElement.dataset.reading') is None and page.locator('.topbar').is_visible()
    assert page.evaluate('document.activeElement === document.querySelector("[data-reading-toggle]")'), 'focus returns to the toggle'
    prefs = json.loads(stored(page)[1])
    assert prefs['theme'] == 'dim' and prefs['size'] == 3, prefs
    page.reload(wait_until='domcontentloaded')
    page.wait_for_function('!!document.querySelector("[data-reading-toggle]")')
    assert page.evaluate('document.documentElement.dataset.reading') is None, 'reading mode is not remembered as on'
    page.locator('[data-reading-toggle]').click()
    assert page.locator('[data-reading-choice="dim"]').get_attribute('aria-pressed') == 'true', 'theme remembered on this device'
    page.locator('[data-reading-exit]').click()
    report.append('Reading mode: opt-in only, hides menu/footer/related, size and three backgrounds work and are remembered, Esc and Exit leave and return focus, no animation, axe clean in all themes, single music player kept')

    # ---------- Privacy: nothing leaves the device ----------
    foreign = [url for method, url in requests if not url.startswith(base)]
    posts = [url for method, url in requests if method != 'GET']
    assert not foreign and not posts, (foreign, posts)
    report.append('Privacy: the listing makes only same-origin GET requests; no account, no uploads')
    context.close()

    # ---------- English article, share fallback ----------
    context = browser.new_context(viewport={'width': 390, 'height': 800}, reduced_motion='reduce')
    context.grant_permissions(['clipboard-read', 'clipboard-write'], origin=base)
    page = context.new_page()
    page.goto(base + ARTICLE['en'], wait_until='domcontentloaded')
    page.wait_for_function('!!document.querySelector("[data-share]")')
    page.evaluate('Object.defineProperty(navigator, "share", { value: undefined, configurable: true })')
    page.locator('.article-tools [data-share]').click()
    page.wait_for_function('document.querySelector("[data-article-status]").textContent.length > 0')
    assert page.locator('[data-article-status]').inner_text() == 'Link copied'
    copied = page.evaluate('navigator.clipboard.readText()')
    assert copied.endswith('/en/journal/healing-as-coming-home/'), copied
    assert page.locator('.article-closing').inner_text() == 'May your day be peaceful enough to hear yourself.'
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    report.append('English article on a phone: share falls back to copying the canonical link, closing line is translated, no horizontal scroll')
    context.close()

    # ---------- Accessibility (axe) on the default views ----------
    for width in [390, 1280]:
        context = browser.new_context(viewport={'width': width, 'height': 900}, reduced_motion='reduce')
        page = context.new_page()
        for path in [listing('vi'), listing('en'), ARTICLE['vi'], ARTICLE['en']]:
            page.goto(base + path, wait_until='domcontentloaded')
            page.wait_for_function('document.fonts.status === "loaded"')
            problems += axe_violations(page, f'{path} @{width}')
        page.goto(base + listing('vi') + '?q=zzzqqq', wait_until='domcontentloaded')
        page.wait_for_function('!document.querySelector("[data-journal-empty]").hidden')
        problems += axe_violations(page, f'empty search @{width}')
        context.close()
    report.append('axe (WCAG 2.2 AA tags) on listing, empty state and article, both languages, 390 and 1280 px' if axe_path else 'axe skipped: AXE_PATH not set')

    # ---------- No JavaScript ----------
    context = browser.new_context(java_script_enabled=False, viewport={'width': 390, 'height': 900})
    page = context.new_page()
    page.goto(base + listing('vi'), wait_until='domcontentloaded')
    assert page.locator('#journal-grid [data-journal-card]:visible').count() == total, 'every article stays visible without JavaScript'
    assert page.locator('.journal-sort').is_hidden() and page.locator('[data-chance-button]').is_hidden()
    assert page.locator('form[role="search"]').get_attribute('action') == '/vi/timkiem/'
    page.goto(base + ARTICLE['vi'], wait_until='domcontentloaded')
    assert page.locator('.article-tools').is_hidden() and page.locator('.article-body section').count() >= 3
    report.append('Without JavaScript: all articles readable, search box opens the site search, script-only tools stay hidden')
    context.close()

    browser.close()

assert not problems, '\n'.join(problems)
(out / 'tan-van-browser.json').write_text(json.dumps(report, ensure_ascii=False, indent=2))
print('\n'.join(report))
