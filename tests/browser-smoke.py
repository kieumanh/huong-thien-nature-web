from pathlib import Path
import os
import shutil
from playwright.sync_api import sync_playwright
import json
from site_manifest import load_site_manifest

base = os.environ.get('APP_BASE_URL', 'http://127.0.0.1:4322').rstrip('/')
out = Path(os.environ.get('ROOTS_ARTIFACT_DIR', str(Path(__file__).resolve().parents[1] / '.artifacts')))
out.mkdir(parents=True, exist_ok=True)
report = []
site = load_site_manifest()
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_EXECUTABLE') or shutil.which('chromium'), headless=True, args=['--no-sandbox'])
    context = browser.new_context(viewport={'width':1440,'height':1000}, device_scale_factor=1, reduced_motion='reduce')
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    for lang in ['vi','en']:
        paths = ['/'+lang+'/', site['journals'][lang]] + [article['paths'][lang] for article in site['articles']]
        for path in paths:
            response = page.goto(base+path, wait_until='domcontentloaded')
            assert response.status == 200
            assert page.locator('html').get_attribute('lang') == lang
            assert page.locator('h1').count() == 1
            assert page.locator('main').count() == 1
            assert page.title().endswith('Hương Thiền Nature')
            assert page.locator('link[rel="canonical"]').get_attribute('href') == 'https://huongthiennature.com'+path
            report.append('Rendered '+path)
    for width in [320,375,768,1024,1440]:
        page.set_viewport_size({'width':width,'height':900})
        for lang in ['vi','en']:
            page.goto(base+'/'+lang+'/', wait_until='domcontentloaded')
            assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'), 'Overflow '+str(width)+' '+lang
            for image in page.locator('img').all():
                image.scroll_into_view_if_needed()
                image.evaluate('img => img.loading = \"eager\"')
            page.wait_for_function('Array.from(document.images).every(img => img.complete && img.naturalWidth > 0)')
            assert page.evaluate('Array.from(document.images).every(img => img.complete && img.naturalWidth > 0)'), 'Broken image'
            page.evaluate('window.scrollTo(0,0)')
            page.wait_for_timeout(250)
            if width in [375,1440] and lang=='vi':
                page.screenshot(path=str(out/('v3-roots-'+str(width)+'.png')), full_page=True)
        report.append('No overflow or broken images at '+str(width)+' px, both languages')
    page.set_viewport_size({'width':375,'height':850})
    page.goto(base+'/vi/',wait_until='domcontentloaded')
    toggle = page.locator('.nav-toggle')
    toggle.click()
    assert toggle.get_attribute('aria-expanded')=='true'
    assert page.locator('#main-nav a').first.is_visible()
    page.keyboard.press('Escape')
    assert toggle.get_attribute('aria-expanded')=='false'
    assert toggle.evaluate('el => el === document.activeElement')
    toggle.click()
    page.locator('#main-nav a[href="#practice"]').click()
    assert toggle.get_attribute('aria-expanded')=='false'
    page.evaluate('window.scrollTo(0,0)')
    page.wait_for_timeout(400)
    toggle.click()
    page.mouse.click(10, 500)
    assert toggle.get_attribute('aria-expanded')=='false'
    report.append('Mobile menu: open, Escape with focus return, anchor close, outside close')
    page.goto(base+'/vi/tan-van/bay-tang-trai-nghiem/',wait_until='domcontentloaded')
    page.locator('.language a[lang="en"]').click()
    assert page.url==base+'/en/journal/seven-layers/'
    assert page.locator('html').get_attribute('lang')=='en'
    page.screenshot(path=str(out/'v3-roots-article.png'),full_page=True)
    report.append('Article language switch preserves the selected article')
    page.goto(base+'/vi/',wait_until='domcontentloaded')
    page.wait_for_function("document.querySelector('#interest-form').getAttribute('aria-busy') === 'false'")
    assert page.locator('#name').is_enabled()
    assert page.locator('#interest-form button').is_disabled()
    assert page.locator('#form-result').get_attribute('data-kind')=='error'
    report.append('Unconfigured contact service displays an error without reporting delivery')
    response=page.goto(base+'/missing-v3-roots-page',wait_until='domcontentloaded')
    assert response.status==404
    assert page.locator('h1').inner_text()=='Không tìm thấy trang.'
    report.append('Custom 404 returns HTTP 404')
    nojs=browser.new_context(java_script_enabled=False,viewport={'width':375,'height':850})
    np=nojs.new_page()
    np.goto(base+'/vi/',wait_until='domcontentloaded')
    assert np.locator('#main-nav a').first.is_visible()
    assert np.locator('#name').is_disabled()
    assert np.locator('#interest-form button').is_disabled()
    assert np.locator('#interest-form noscript').is_visible()
    assert np.evaluate('document.documentElement.scrollWidth <= window.innerWidth')
    assert np.locator('a[href^="mailto:"]').count()==0
    report.append('JavaScript disabled: navigation works; form cannot submit as GET')
    assert errors==[], 'Browser errors: '+str(errors)
    report.append('No JavaScript page errors')
    browser.close()
out.joinpath('v3-roots-browser-report.json').write_text(json.dumps(report,indent=2,ensure_ascii=False))
print('\n'.join(report))
