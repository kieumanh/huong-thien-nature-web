"""Exercise the homepage reading journey and search against the built website."""
from pathlib import Path
import os, json, shutil
from urllib.parse import urlparse, parse_qs
from playwright.sync_api import sync_playwright
from site_manifest import load_site_manifest

base = os.environ.get('APP_BASE_URL', 'http://127.0.0.1:8788').rstrip('/')
out = Path(os.environ.get('ROOTS_ARTIFACT_DIR', str(Path(__file__).resolve().parents[1] / '.artifacts')))
out.mkdir(parents=True, exist_ok=True)
site = load_site_manifest()
report = []
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_EXECUTABLE') or shutil.which('chromium'), headless=True, args=['--no-sandbox'])
    page = browser.new_page(viewport={'width':1440,'height':1000}, reduced_motion='reduce')
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    for lang in ['vi','en']:
        home = base+'/'+lang+'/'
        search = '/vi/timkiem/' if lang=='vi' else '/en/search/'
        page.goto(home, wait_until='domcontentloaded')
        assert page.locator('.home-reading-list li').count() == 3
        assert page.locator('#journal .journal-card').count() == 3
        published = {article['paths'][lang] for article in site['articles']}
        for link in page.locator('.home-reading-list a, #journal .journal-card h3 a').all():
            assert link.get_attribute('href') in published
        primary = page.locator('.hero-actions a').first
        primary.click()
        page.wait_for_function('!!document.querySelector(".article-body")')
        page.locator('.article-body > a.quiet-link').click()
        page.wait_for_url(base+site['journals'][lang])
        page.goto(home, wait_until='domcontentloaded')
        keyword = 'hoi tho' if lang=='vi' else 'breath'
        page.locator('#home-search-query').fill(keyword)
        page.locator('.home-search-form button').click()
        page.wait_for_url('**'+search+'?q=*')
        page.wait_for_function('document.querySelectorAll(".search-result").length > 0')
        assert parse_qs(urlparse(page.url).query)['q']==[keyword]
        assert page.locator('#search-query').input_value()==keyword
        assert all(link.get_attribute('href').startswith('/'+lang+'/') for link in page.locator('.search-result h2 a').all())
        page.locator('.search-result h2 a').first.click()
        page.wait_for_function('document.querySelector("main") !== null')
        assert page.locator('html').get_attribute('lang')==lang
        page.goto(home, wait_until='domcontentloaded')
        page.locator('.home-search-suggestions a').first.click()
        page.wait_for_function('document.querySelectorAll(".search-result").length > 0')
        assert parse_qs(urlparse(page.url).query)['q']
        report.append(lang+': homepage CTA, published reading/featured links, native keyword search, result navigation and suggestion search pass')
        page.goto(base+search+'?q=zzzxxyyunlikely',wait_until='domcontentloaded')
        empty = 'Chưa có kết quả' if lang=='vi' else 'No results'
        page.wait_for_function('(text)=>document.querySelector("#search-status").textContent.includes(text)',arg=empty)
        assert page.locator('.search-result').count()==0
        # Text from the query must never become HTML.
        page.goto(base+search+'?q=%3Cimg%20src%3Dx%20onerror%3Dwindow.queryExecuted%3Dtrue%3E',wait_until='domcontentloaded')
        page.wait_for_function('(text)=>document.querySelector("#search-status").textContent.includes(text)',arg=empty)
        assert page.evaluate('window.queryExecuted === undefined')
        page.goto(base+search+'?q=breath',wait_until='domcontentloaded')
        page.wait_for_function('document.querySelector(".language a[href]").href.includes("q=breath")')
        other='en' if lang=='vi' else 'vi'
        page.locator('.language a[lang="'+other+'"]').click()
        page.wait_for_url('**?q=breath')
        assert parse_qs(urlparse(page.url).query)['q']==['breath']
        assert page.locator('html').get_attribute('lang')==other
    report.append('Search handles empty results, treats queries as text and preserves the keyword when changing language')
    failed = browser.new_page()
    failed.route('**/search-index.json',lambda route:route.abort())
    failed.goto(base+'/vi/timkiem/?q=hoi+tho',wait_until='domcontentloaded')
    failed.wait_for_function('document.querySelector("#search-status").textContent.includes("Chưa tải được")')
    assert failed.locator('.search-result').count()==0
    failed.close()
    report.append('Failed search-index loading gives an error without showing false results')
    for width in [320,375,768,1024,1101,1200,1440]:
        page.set_viewport_size({'width':width,'height':900})
        for lang in ['vi','en']:
            page.goto(base+'/'+lang+'/',wait_until='domcontentloaded')
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
            page.locator('.home-search-form').scroll_into_view_if_needed()
            form = page.locator('.home-search-form').bounding_box()
            assert form and form['x']>=0 and form['x']+form['width']<=width
        report.append('Homepage controls fit '+str(width)+' px in both languages')
    nojs = browser.new_context(java_script_enabled=False, viewport={'width':375,'height':900})
    np = nojs.new_page()
    np.goto(base+'/vi/',wait_until='domcontentloaded')
    np.locator('.home-reading-list a').first.click()
    np.wait_for_function('!!document.querySelector(".article-body")')
    np.goto(base+'/vi/',wait_until='domcontentloaded')
    np.locator('#home-search-query').fill('hoi tho')
    np.locator('.home-search-form button').click()
    np.wait_for_url('**/vi/timkiem/?q=*')
    assert np.locator('main noscript').is_visible()
    np.locator('main noscript a').click()
    np.wait_for_url(base+site['journals']['vi'])
    report.append('No JavaScript: reading links and search-page journal fallback remain usable')
    page.goto(base+'/vi/',wait_until='domcontentloaded')
    page.set_viewport_size({'width':1440,'height':1000})
    page.screenshot(path=str(out/f"v{site['version']}-homepage-desktop.png"),full_page=True)
    page.set_viewport_size({'width':375,'height':850})
    page.screenshot(path=str(out/f"v{site['version']}-homepage-mobile.png"),full_page=True)
    assert errors==[], errors
    browser.close()
out.joinpath(f"v{site['version']}-homepage-search-report.json").write_text(json.dumps(report,indent=2,ensure_ascii=False))
print('\n'.join(report))
