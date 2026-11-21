"""Compare Zen Botanical with the source baseline and exercise its bilingual flows."""
import json
import os
from pathlib import Path
from urllib.parse import urlsplit

from playwright.sync_api import expect, sync_playwright

base = os.environ['APP_BASE_URL'].rstrip('/')
baseline = os.environ.get('BASELINE_URL', '').rstrip('/')
artifact = Path(os.environ.get('ROOTS_ARTIFACT_DIR', '.artifacts'))
axe_path = Path(os.environ['AXE_PATH'])
widths = (320, 375, 393, 768, 1024, 1440)
snapshot_widths = (393, 1440)
routes = {
    'vi': {
        'home': '/vi/', 'journal': '/vi/tan-van/',
        'article': '/vi/tan-van/nhung-kho-khan-khi-thuc-hanh-thien/',
        'shop': '/vi/cua-hang/', 'product': '/vi/cua-hang/bot-cacao/',
        'search': '/vi/timkiem/?q=bot+cacao', 'contact': '/vi/lien-he/',
        'versions': '/vi/phien-ban/',
    },
    'en': {
        'home': '/en/', 'journal': '/en/journal/',
        'article': '/en/journal/when-meditation-is-difficult/',
        'shop': '/en/shop/', 'product': '/en/shop/bot-cacao/',
        'search': '/en/search/?q=cocoa', 'contact': '/en/contact/',
        'versions': '/en/versions/',
    },
}
report = {'viewports': widths, 'snapshots': [], 'axe': [], 'passes': []}
artifact.mkdir(parents=True, exist_ok=True)

def wait_page(page, url):
    target = urlsplit(url)
    source = urlsplit(page.url)
    same_document = source._replace(fragment='') == target._replace(fragment='') and source.fragment != target.fragment
    response = page.goto(url, wait_until='load')
    assert (response and response.ok) or (response is None and same_document), url
    expect(page.locator('h1')).to_be_visible()

def dimensions(page):
    return page.evaluate("""() => ({
        width: document.documentElement.scrollWidth,
        height: document.querySelector('main').getBoundingClientRect().height,
        firstAction: Math.round(document.querySelector('main a.button')?.getBoundingClientRect().top || 0),
    })""")

def screenshot(page, label, lang, name, width):
    if name == 'search':
        page.wait_for_function("document.querySelector('#search-results h2')")
    page.evaluate("""async () => {
      const images = [...document.images].filter(image => image.checkVisibility({ contentVisibilityAuto: true }));
      for (const image of images) image.loading = 'eager';
      await Promise.all(images.map(image => image.decode().catch(() => undefined)));
      window.scrollTo(0, 0);
    }""")
    page.screenshot(path=str(artifact / f'{label}-{lang}-{name}-{width}.jpg'),
                    full_page=name == 'home', animations='disabled', type='jpeg', quality=82)
    report['snapshots'].append(dict(label=label, language=lang, page=name, viewport=width, **dimensions(page)))

def arrange_api(page):
    page.route('**/api/contact-config', lambda route: route.fulfill(json={'available': False, 'siteKey': None}))
    page.route('**/api/shop-stock', lambda route: route.fulfill(status=503, json={'status': 'unavailable', 'stock': {}}))

def check_accessibility(page, lang, name, width):
    page.add_script_tag(path=str(axe_path))
    result = page.evaluate("""async () => {
      const result = await axe.run({ runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } });
      return { passes: result.passes.length, incomplete: result.incomplete.map(({ id, nodes }) => ({ id, targets: nodes.map(node => node.target) })),
        violations: result.violations.map(({id, impact, nodes}) => ({ id, impact, nodes: nodes.map(node => node.target) })) };
    }""")
    report['axe'].append(dict(language=lang, page=name, viewport=width, **result))

def check_flows(browser):
    page = browser.new_page(viewport={'width': 393, 'height': 850}, reduced_motion='reduce')
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    arrange_api(page)
    wait_page(page, base + routes['vi']['home'])
    page.keyboard.press('Tab')
    expect(page.locator('.skip-link')).to_be_focused()
    page.keyboard.press('Enter')
    expect(page.locator('main')).to_be_focused()
    menu = page.locator('.nav-toggle')
    menu.focus()
    page.keyboard.press('Enter')
    expect(menu).to_have_attribute('aria-expanded', 'true')
    expect(page.locator('#main-nav a').first).to_be_focused()
    page.keyboard.press('Escape')
    expect(menu).to_be_focused()
    expect(page.locator('#main-nav')).to_be_hidden()
    page.locator('.material-hero .button').click()
    assert urlsplit(page.url).fragment == 'practice'
    expect(page.locator('#practice h2')).to_be_visible()
    expect(page.locator('[data-orbit-toggle]')).to_be_hidden()
    wait_page(page, base + '/vi/#journey-learning')
    expect(page.locator('#journey')).to_have_attribute('open', '')
    report['passes'].append('Keyboard opens/closes navigation, skip link transfers focus, practice CTA and legacy journey fragment work.')

    for lang, entries in routes.items():
        wait_page(page, base + entries['article'])
        page.locator('.article-toc summary').click()
        page.locator('.article-toc a').first.click()
        assert urlsplit(page.url).fragment == 'section-1'
        expect(page.locator('#article-author h2')).to_have_text('Kiều Mạnh')
        wait_page(page, base + entries['search'])
        expect(page.locator('.search-result--product').first).to_be_visible()
        expect(page.locator('#search-results')).to_have_attribute('aria-busy', 'false')
        assert 'q=' in page.locator('.language a').get_attribute('href')
        page.locator('#search-query').fill('zzzzzzxxxxxx')
        page.locator('.search-form button').click()
        expect(page.locator('.search-fallback')).to_be_visible()
        page.route(f'**/{lang}/search-index.json', lambda route: route.abort())
        wait_page(page, base + entries['search'])
        expect(page.locator('#search-status')).to_have_attribute('data-state', 'error')
        expect(page.locator('.search-fallback')).to_be_visible()
        page.unroute(f'**/{lang}/search-index.json')

        wait_page(page, base + entries['shop'])
        expect(page.locator('.stock-status')).to_have_attribute('data-state', 'unavailable')
        expect(page.locator('[data-stock="unknown"]')).to_have_count(8)
        page.unroute('**/api/shop-stock')
        page.route('**/api/shop-stock', lambda route: route.fulfill(json={
            'status': 'partial', 'stock': {'bot-cacao': 'in_stock', 'bot-nem-sachi': 'out_of_stock'}
        }))
        wait_page(page, base + entries['shop'])
        expect(page.locator('[data-stock-slug="bot-cacao"]')).to_have_attribute('data-stock', 'in_stock')
        expect(page.locator('[data-stock-slug="bot-nem-sachi"]')).to_have_attribute('data-stock', 'out_of_stock')
        expect(page.locator('[data-stock="unknown"]')).to_have_count(6)
        page.locator('[data-filter="drinks"]').click()
        expect(page.locator('[data-product-card]:visible')).to_have_count(2)
        page.locator('#shop-search').fill('kczzzz')
        expect(page.locator('.shop-empty')).to_be_visible()
        page.locator('[data-shop-reset]').click()
        expect(page.locator('[data-product-card]:visible')).to_have_count(8)
        page.locator('[data-stock-inquiry][href*="muoi-hong-himalaya"]').click()
        assert urlsplit(page.url).path == entries['contact']
        assert 'product=muoi-hong-himalaya' in page.url
        assert page.locator('#message').input_value() != ''
        expect(page.locator('#interest-form button')).to_be_disabled()
        expect(page.locator('#message')).to_be_enabled()
        page.locator('#message').focus()
        expect(page.locator('.music-dock')).to_be_hidden()
        page.unroute('**/api/shop-stock')
        page.route('**/api/shop-stock', lambda route: route.fulfill(status=503, json={'status': 'unavailable', 'stock': {}}))
    report['passes'].append('VI/EN article TOC and author, live-search result/error/empty, catalogue filter/reset, stock response mapping and product enquiry prefill.')

    page.set_viewport_size({'width': 1440, 'height': 900})
    page.emulate_media(reduced_motion='no-preference')
    wait_page(page, base + routes['vi']['home'])
    scene = page.locator('.ecosystem-visual')
    expect(page.locator('[data-ecosystem]')).to_have_class('ecosystem-motion')
    scene.locator('summary').click()
    page.locator('.solar-system-scene').scroll_into_view_if_needed()
    expect(page.locator('[data-ecosystem]')).to_have_class('ecosystem-motion ecosystem-active')
    page.locator('[data-orbit-toggle]').click()
    expect(page.locator('[data-orbit-toggle]')).to_have_attribute('aria-pressed', 'true')
    expect(page.locator('[data-ecosystem]')).to_have_class('ecosystem-motion')
    page.emulate_media(reduced_motion='reduce')
    expect(page.locator('[data-orbit-toggle]')).to_be_hidden()
    report['passes'].append('Desktop orbit can be stopped, reduced motion hides the unnecessary control.')
    assert not errors, errors
    page.close()

def check_no_script(browser):
    context = browser.new_context(java_script_enabled=False, viewport={'width': 320, 'height': 850})
    page = context.new_page()
    for entries in routes.values():
        wait_page(page, base + entries['home'])
        expect(page.locator('#main-nav')).to_be_visible()
        expect(page.locator('audio[controls]')).to_be_visible()
        page.locator('#main-nav a[href="#practice"]').click()
        expect(page.locator('#practice h2')).to_be_visible()
        wait_page(page, base + entries['article'])
        page.locator('.article-toc summary').click()
        expect(page.locator('.article-toc a').first).to_be_visible()
        wait_page(page, base + entries['shop'])
        expect(page.locator('[data-product-card]')).to_have_count(8)
        expect(page.locator('[data-stock="unknown"]')).to_have_count(8)
        wait_page(page, base + entries['search'])
        expect(page.locator('noscript a').first).to_be_visible()
        wait_page(page, base + entries['contact'])
        expect(page.locator('a[href^="mailto:"]')).to_be_visible()
        expect(page.locator('.form-note')).to_be_visible()
    context.close()
    report['passes'].append('VI/EN no-JS navigation, native audio, reading, catalogue, search alternatives and direct contact channels.')

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True, args=['--no-sandbox'])
    page = browser.new_page(reduced_motion='reduce')
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    arrange_api(page)
    for width in widths:
        page.set_viewport_size({'width': width, 'height': 900})
        for lang, entries in routes.items():
            for name, path in entries.items():
                wait_page(page, base + path)
                measure = dimensions(page)
                assert measure['width'] <= width + 1, (lang, name, width, measure)
                assert page.locator('html').get_attribute('lang') == lang
                if width in snapshot_widths:
                    check_accessibility(page, lang, name, width)
                    if lang == 'vi':
                        screenshot(page, 'candidate', lang, name, width)
    assert not errors, errors
    report['passes'].append(f'{len(widths) * sum(map(len, routes.values()))} viewport/template combinations without overflow or runtime errors.')
    page.set_viewport_size({'width': 640, 'height': 900})
    for lang, entries in routes.items():
        for name, path in entries.items():
            wait_page(page, base + path)
            page.evaluate("document.body.style.zoom = '2'")
            assert dimensions(page)['width'] <= 641, ('200% zoom', lang, name)
    report['passes'].append('200% content zoom at 640 px supported without horizontal overflow; 320 CSS px viewport tested separately.')
    if baseline:
        for width in snapshot_widths:
            page.set_viewport_size({'width': width, 'height': 900})
            for name, path in routes['vi'].items():
                wait_page(page, baseline + path)
                screenshot(page, 'baseline', 'vi', name, width)
    page.close()

    try:
        check_flows(browser)
        check_no_script(browser)
    finally:
        artifact.joinpath('zen-botanical-browser.json').write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding='utf-8')
    findings = [result for result in report['axe'] if result['violations']]
    print('\n'.join(report['passes']))
    print(f"axe: {len(report['axe'])} scans, {len(findings)} scans with violations")
    assert not findings, json.dumps(findings, ensure_ascii=False)
