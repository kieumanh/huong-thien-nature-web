"""Compare Zen Botanical with the source baseline and exercise its bilingual flows."""
from datetime import datetime, timezone
import json
import os
import re
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
        'home': '/vi/', 'practice': '/vi/goi-y/', 'ecosystem': '/vi/he-sinh-thai/',
        'story': '/vi/cau-chuyen/', 'team': '/vi/doi-ngu/', 'journal': '/vi/tan-van/',
        'article': '/vi/tan-van/nhung-kho-khan-khi-thuc-hanh-thien/',
        'shop': '/vi/cua-hang/', 'food': '/vi/cua-hang/thuc-pham-sach/', 'stones': '/vi/cua-hang/da-nang-luong/', 'books': '/vi/cua-hang/sach/', 'product': '/vi/cua-hang/bot-cacao/',
        'search': '/vi/timkiem/?q=bot+cacao', 'contact': '/vi/lien-he/',
        'versions': '/vi/phien-ban/', 'courses': '/vi/khoa-thuc-hanh/', 'guidance': '/vi/khoa-thuc-hanh/tam-ly-tarot/',
    },
    'en': {
        'home': '/en/', 'practice': '/en/suggestions/', 'ecosystem': '/en/ecosystem/',
        'story': '/en/story/', 'team': '/en/team/', 'journal': '/en/journal/',
        'article': '/en/journal/when-meditation-is-difficult/',
        'shop': '/en/shop/', 'food': '/en/shop/clean-food/', 'stones': '/en/shop/energy-stones/', 'books': '/en/shop/books/', 'product': '/en/shop/bot-cacao/',
        'search': '/en/search/?q=cocoa', 'contact': '/en/contact/',
        'versions': '/en/versions/', 'courses': '/en/practice-courses/', 'guidance': '/en/practice-courses/tarot-reflection/',
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
    page.route('**/api/shop-feed', lambda route: route.fulfill(status=503, json={'ok': False, 'code': 'unavailable'}))

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
    page.wait_for_url(base + routes['vi']['practice'])
    expect(page.locator('#practice h2')).to_be_visible()
    wait_page(page, base + '/vi/#journey-learning')
    expect(page.locator('#journey a')).to_have_attribute('href', '/vi/cau-chuyen/#journey')
    report['passes'].append('Keyboard navigation, practice CTA and legacy homepage journey links work.')

    for lang, entries in routes.items():
        wait_page(page, base + entries['home'])
        menu.click()
        page.locator(f'#main-nav a[href="{entries["team"]}"]').click()
        page.wait_for_url(base + entries['team'])
        expect(page.locator('#doi-tac .partner-card')).to_have_count(3)
        expect(page.locator('#doi-tac img')).to_have_count(3)
        expect(page.locator('#doi-tac a[href="https://zenwork.io.vn/"]')).to_have_count(1)
        expect(page.locator('.footer-credit a')).to_have_attribute('href', 'https://zenwork.io.vn/')
        expect(page.locator('#huong-thien h3')).to_be_visible()
        expect(page.locator('#kieu-manh h3')).to_be_visible()
        menu.click()
        page.locator(f'#main-nav a[href="{entries["courses"]}"]').click()
        page.wait_for_url(base + entries['courses'])
        page.locator(f'.course-card a[href="{entries["guidance"]}"]').click()
        page.wait_for_url(base + entries['guidance'])
        expect(page.locator('#guidance-title')).to_be_visible()
        expect(page.locator('.guidance-person img')).to_have_count(3)
        expect(page.locator('.guidance-work cite')).to_have_text('Jung and Tarot: An Archetypal Journey')
        expect(page.locator('.guidance-invitation a[href="https://zalo.me/0868499856"]')).to_be_visible()
        expect(page.locator('.language a')).to_have_attribute('href', routes['en' if lang == 'vi' else 'vi']['guidance'])
        minutes = page.locator('.guidance-session .session-duration').all_text_contents()
        assert sum(int(step.split()[0]) for step in minutes) == 90 and minutes[0].startswith('15 ')
        expect(page.locator('[data-guidance-sequence] li')).to_have_count(3)
        expect(page.locator('.sequence-glyph svg [data-sequence-motion]').first).to_have_css('animation-name', 'none')
        expect(page.locator('.guidance-session ol')).to_have_css('border-inline-start-width', '2px')
        exercise = page.locator('.guidance-ai-details .guidance-disclosure').first
        exercise.locator('summary').click()
        expect(exercise.locator('p')).to_be_visible()
        expect(exercise.locator('p')).to_have_css('animation-name', 'none')
        wait_page(page, base + entries['story'])
        expect(page.locator('.journey-timeline .journey-chapters li')).to_have_count(12)
        expect(page.locator('.journey-timeline')).to_have_css('border-inline-start-width', '2px')
        page.locator('.journey-jumps a').nth(1).click()
        assert urlsplit(page.url).fragment == 'journey-learning'
        wait_page(page, base + entries['ecosystem'])
        expect(page.locator('[data-ecosystem-illustration]')).to_have_count(2)
        expect(page.locator('main details')).to_have_count(0)
        wait_page(page, base + entries['article'])
        page.locator('.article-toc a').first.click()
        assert urlsplit(page.url).fragment == 'section-1'
        expect(page.locator('.article-illustration')).to_have_count(1 if lang == 'vi' else 0)
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

        # Hub: three doors, feed down -> built-in counts stay.
        wait_page(page, base + entries['shop'])
        expect(page.locator('.shop-door')).to_have_count(3)
        # Clean-food space: built-in catalogue + honest "stockroom unreachable" notice while the feed is down.
        wait_page(page, base + entries['food'])
        expect(page.locator('[data-feed-status]')).to_have_attribute('data-state', 'unavailable')
        expect(page.locator('[data-stock="unknown"]')).to_have_count(8)
        # Stones/books have no built-in products: empty state, no fake catalogue.
        for empty in ('stones', 'books'):
            wait_page(page, base + entries[empty])
            expect(page.locator('[data-theme-empty]')).to_be_visible()
            expect(page.locator('[data-product-card]')).to_have_count(0)
        # Feed available: announcement, season and per-space replacement; unpublished spaces keep their fallback.
        page.unroute('**/api/shop-feed')
        page.route('**/api/shop-feed', lambda route: route.fulfill(json={
            'schema': 1, 'updated': None, 'announcement': {'text': 'Giao hàng thứ Bảy', 'tone': 'info'}, 'season': None,
            'products': [{'id': 's1', 'name': 'Thạch anh tím', 'category': 'Đá thô', 'unit': 'viên', 'price': 450000, 'theme': 'da-nang-luong',
                         'status': 'in', 'image': '', 'blurb': '', 'season': '', 'keywords': []}]}))
        wait_page(page, base + entries['stones'])
        expect(page.locator('.feed-card')).to_have_count(1)
        expect(page.locator('.shop-announce')).to_be_visible()
        expect(page.locator('[data-theme-empty]')).to_be_hidden()
        wait_page(page, base + entries['food'])
        expect(page.locator('[data-product-card]')).to_have_count(8)
        expect(page.locator('[data-shop-count]')).to_be_visible()
        page.locator('[data-filter="drinks"]').click()
        expect(page.locator('[data-product-card]:visible')).to_have_count(2)
        page.locator('#shop-search').fill('kczzzz')
        expect(page.locator('.shop-empty')).to_be_visible()
        page.locator('[data-shop-reset]').click()
        expect(page.locator('[data-product-card]:visible')).to_have_count(8)
        page.locator('[data-stock-inquiry][href*="muoi-hong-himalaya"]').click()
        assert urlsplit(page.url).path == entries['contact']
        assert 'product=muoi-hong-himalaya' in page.url
        expect(page.locator('#message')).not_to_have_value('')
        expect(page.locator('#interest-form button')).to_be_disabled()
        expect(page.locator('#message')).to_be_enabled()
        page.locator('#message').focus()
        expect(page.locator('.music-dock')).to_be_hidden()
        page.unroute('**/api/shop-feed')
        page.route('**/api/shop-feed', lambda route: route.fulfill(status=503, json={'ok': False, 'code': 'unavailable'}))
    report['passes'].append('VI/EN article TOC and author, live-search result/error/empty, shop hub, three spaces, feed fallback/replacement, catalogue filter/reset and product enquiry prefill.')

    page.set_viewport_size({'width': 1440, 'height': 900})
    page.emulate_media(reduced_motion='no-preference')
    wait_page(page, base + routes['vi']['home'])
    page.set_viewport_size({'width': 393, 'height': 850})
    mandala = page.locator('.home-story__copy .contemplative-scene--mandala')
    mandala.scroll_into_view_if_needed()
    expect(mandala).to_have_class(re.compile('scene-visible'))
    assert mandala.evaluate("""el => {
      const center = node => node.getBoundingClientRect().left + node.getBoundingClientRect().width / 2;
      return Math.abs(center(el) - center(el.parentElement)) <= 1;
    }""")
    for width in widths:
        page.set_viewport_size({'width': width, 'height': 900})
        expect(page.locator('.material-hero__art')).to_be_visible() if width >= 760 else expect(page.locator('.material-hero__art')).to_be_hidden()
        assert page.locator('.solar-pillar').evaluate_all("""cards => {
          function luminance(color) {
            const scale = color.startsWith('color(srgb ') ? 1 : 255;
            const [r, g, b] = color.match(/[0-9.]+/g).map(channel => {
              const value = Number(channel) / scale;
              return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
            });
            return .2126 * r + .7152 * g + .0722 * b;
          }
          return cards.length === 3 && cards.every(card => {
            const bg = luminance(getComputedStyle(card).backgroundColor);
            const fg = luminance(getComputedStyle(card.querySelector('p')).color);
            const bounds = card.getBoundingClientRect();
            return (Math.max(bg, fg) + .05) / (Math.min(bg, fg) + .05) >= 4.5 &&
              bounds.left >= 0 && bounds.right <= innerWidth && card.scrollWidth <= card.clientWidth;
          });
        }"""), ('ecosystem cards must be legible and fit', width)
        scene = page.locator('.solar-system-scene')
        scene.scroll_into_view_if_needed()
        page.wait_for_function("getComputedStyle(document.querySelector('.solar-orbit')).animationPlayState === 'running'")
        assert scene.evaluate("""el => {
          const bounds = el.getBoundingClientRect();
          return [...el.querySelectorAll('.solar-orbit')].every(orbit => {
            const planet = orbit.querySelector('.solar-planet');
            return orbit.offsetWidth + planet.offsetWidth <= bounds.width + 1;
          });
        }"""), ('orbit exceeds its frame', width)
    expect(page.locator('main details')).to_have_count(0)
    page.locator('.solar-system-scene').scroll_into_view_if_needed()
    expect(page.locator('[data-ecosystem]')).to_have_class('ecosystem-motion ecosystem-active')
    expect(page.locator('[data-orbit-toggle]')).to_have_count(0)
    expect(page.locator('.solar-planet__art')).to_have_count(3)
    page.emulate_media(reduced_motion='reduce')
    expect(page.locator('[data-ecosystem]')).not_to_have_class('ecosystem-active')
    report['passes'].append('Homepage orbits fit every viewport, rotate in view, use three new illustrations, have no pause button and respect reduced motion.')
    page.clock.install(time=datetime(2026, 11, 20, 16, 59, 59, tzinfo=timezone.utc))
    wait_page(page, base + routes['vi']['story'])
    expect(page.locator('html')).to_have_attribute('data-season', 'autumn')
    page.clock.fast_forward(2000)
    expect(page.locator('html')).to_have_attribute('data-season', 'winter')
    for season in ['spring', 'summer', 'autumn', 'winter']:
        page.clock.fast_forward(6 * 3_600_000)
        expect(page.locator('html')).to_have_attribute('data-season', season)
    expect(page.locator('.seasonal-accent .season-bank').first).to_be_hidden()
    assert page.locator('.topbar').evaluate("el => getComputedStyle(el, '::before').animationName") == 'none'
    report['passes'].append('Four six-hour seasons follow Vietnam time on inner pages and respect reduced motion.')
    assert not errors, errors
    page.close()

def check_no_script(browser):
    context = browser.new_context(java_script_enabled=False, viewport={'width': 320, 'height': 850})
    page = context.new_page()
    for entries in routes.values():
        wait_page(page, base + entries['home'])
        expect(page.locator('#main-nav')).to_be_visible()
        expect(page.locator('audio[controls]')).to_be_visible()
        page.locator(f'#main-nav a[href="{entries["practice"]}"]').click()
        page.wait_for_url(base + entries['practice'])
        expect(page.locator('#practice h2')).to_be_visible()
        wait_page(page, base + entries['article'])
        expect(page.locator('.article-toc a').first).to_be_visible()
        wait_page(page, base + entries['food'])
        expect(page.locator('[data-product-card]')).to_have_count(8)
        expect(page.locator('[data-stock="unknown"]')).to_have_count(8)
        wait_page(page, base + entries['search'])
        expect(page.locator('noscript a').first).to_be_visible()
        wait_page(page, base + entries['contact'])
        expect(page.locator('a[href^="mailto:"]')).to_be_visible()
        expect(page.locator('.form-note')).to_be_visible()
    context.close()
    report['passes'].append('VI/EN no-JS navigation, native audio, reading, catalogue, search alternatives and direct contact channels.')

def check_daylight(browser):
    page = browser.new_page(viewport={'width': 393, 'height': 850}, reduced_motion='reduce')
    arrange_api(page)
    html = page.locator('html')
    for utc_hour, utc_minute, tone, twilight in [(3, 0, 'day', '0%'), (11, 0, 'day', '75%'), (11, 50, 'night', '70%'), (14, 0, 'night', '0%')]:
        page.clock.set_fixed_time(datetime(2026, 11, 22, utc_hour, utc_minute, tzinfo=timezone.utc))
        wait_page(page, base + routes['vi']['guidance'])
        expect(html).to_have_attribute('data-sky', tone)
        assert html.evaluate("el => el.style.getPropertyValue('--twilight')") == twilight
    for lang, entries in routes.items():
        for name, path in entries.items():
            wait_page(page, base + path)
            expect(html).to_have_attribute('data-sky', 'night')
            check_accessibility(page, lang, name + '-night', 393)
    page.emulate_media(reduced_motion='no-preference')
    wait_page(page, base + routes['vi']['guidance'])
    figure = page.locator('[data-guidance-sequence]')
    card_step = figure.locator('[data-sequence-step]').nth(1)
    card_step.scroll_into_view_if_needed()
    expect(card_step).to_have_class(re.compile('sequence-started'))
    expect(card_step.locator('.sequence-card-front')).to_have_css('animation-iteration-count', '1')
    page.close()
    report['passes'].append('Vietnam clock sets day, twilight and night correctly. Night contrast and finite tarot sequence motion tested.')

def check_tarot_conversion(browser):
    """Booking path of the tarot page: direct CTA, honest price slot, mobile booking bar, schema, prefilled enquiry."""
    for lang, entries in routes.items():
        for width in (320, 393):
            page = browser.new_page(viewport={'width': width, 'height': 850}, reduced_motion='reduce')
            arrange_api(page)
            wait_page(page, base + entries['guidance'])
            sticky = page.locator('[data-guidance-sticky]')
            expect(sticky).to_be_hidden()
            expect(page.locator('.guidance-hero a.guidance-button')).to_have_attribute('href', 'https://zalo.me/0868499856')
            expect(page.locator('.guidance-facts dd').nth(2)).to_have_text('Liên hệ' if lang == 'vi' else 'Ask us')
            expect(page.locator('.guidance-howto-steps li')).to_have_count(3)
            expect(page.locator('.guidance-invitation a.button--tonal')).to_have_attribute('href', re.compile(r'topic=tarot'))
            page.evaluate("document.querySelector('#session').scrollIntoView()")
            expect(sticky).to_be_visible()
            expect(sticky.locator('a')).to_have_attribute('href', 'https://zalo.me/0868499856')
            box = sticky.bounding_box()
            assert box and box['width'] <= width + 1 and box['x'] >= 0, ('sticky bar overflows', lang, width)
            assert dimensions(page)['width'] <= width, ('horizontal overflow with booking bar', lang, width)
            clash = page.evaluate("""() => {
                const bar = document.querySelector('[data-guidance-sticky]').getBoundingClientRect();
                return [...document.querySelectorAll('.back-to-top, .music-dock[data-music-ready]')]
                    .filter(el => el.getBoundingClientRect().height && getComputedStyle(el).visibility !== 'hidden')
                    .some(el => el.getBoundingClientRect().bottom > bar.top + 1);
            }""")
            assert not clash, ('floating controls overlap the booking bar', lang, width)
            if width == 393:
                check_accessibility(page, lang, 'guidance-booking-bar', width)
            page.evaluate("document.querySelector('#booking').scrollIntoView()")
            expect(sticky).to_be_hidden()
            blocks = [json.loads(text) for text in page.locator('script[type="application/ld+json"]').all_inner_texts()]
            graph = next(block['@graph'] for block in blocks if '@graph' in block)
            assert {'Service', 'FAQPage'} <= {node['@type'] for node in graph}, ('tarot schema', lang)
            assert 'offers' not in json.dumps(graph), 'no price may be published before the owner supplies it'
            page.close()
        page = browser.new_page(viewport={'width': 393, 'height': 850}, reduced_motion='reduce')
        arrange_api(page)
        page.goto(base + entries['contact'] + '?topic=tarot', wait_until='load')
        expect(page.locator('[name="message"]')).to_have_value(re.compile(r'1:1'))
        page.goto(base + entries['contact'] + '?topic=%3Cscript%3E', wait_until='load')
        expect(page.locator('[name="message"]')).to_have_value('')
        page.close()
    report['passes'].append('Tarot page: direct Zalo CTA, honest price slot, mobile booking bar clear of floating controls, schema without invented price, prefilled enquiry.')

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True, args=['--no-sandbox'])
    page = browser.new_page(reduced_motion='reduce')
    page.clock.set_fixed_time(datetime(2026, 11, 22, 3, tzinfo=timezone.utc))
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
                if name in {'practice', 'ecosystem', 'story', 'team', 'courses', 'guidance'}:
                    continue
                wait_page(page, baseline + path)
                screenshot(page, 'baseline', 'vi', name, width)
    page.close()

    try:
        check_flows(browser)
        check_tarot_conversion(browser)
        check_no_script(browser)
        check_daylight(browser)
    finally:
        artifact.joinpath('zen-botanical-browser.json').write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding='utf-8')
    findings = [result for result in report['axe'] if result['violations']]
    print('\n'.join(report['passes']))
    print(f"axe: {len(report['axe'])} scans, {len(findings)} scans with violations")
    assert not findings, json.dumps(findings, ensure_ascii=False)
