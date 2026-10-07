"""Release, corner placement and scroll-threshold checks against a running site."""
from pathlib import Path
import os, shutil, json
from playwright.sync_api import sync_playwright

base = os.environ.get('APP_BASE_URL', 'http://127.0.0.1:8788').rstrip('/')
out = Path(os.environ.get('ROOTS_ARTIFACT_DIR', str(Path(__file__).resolve().parents[1] / '.artifacts')))
out.mkdir(parents=True, exist_ok=True)
report = []
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_EXECUTABLE') or shutil.which('chromium'), headless=True, args=['--no-sandbox'])
    page = browser.new_page(viewport={'width': 375, 'height': 850}, reduced_motion='reduce')
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    for lang in ['vi', 'en']:
        page.goto(base+'/'+lang+'/', wait_until='domcontentloaded')
        page.wait_for_function("!document.querySelector('.music-toggle').disabled")
        assert page.locator('meta[name="application-version"]').get_attribute('content') == '0.3.2'
        assert 'V0.3.2' in page.locator('.footer-bottom').inner_text()
        button = page.locator('.back-to-top')
        assert button.is_hidden()
        for progress, visible in [(0.29, False), (0.31, True), (0.1, False), (0.7, True)]:
            page.evaluate('(p) => window.scrollTo({top:(document.documentElement.scrollHeight-innerHeight)*p,behavior:"instant"})', progress)
            page.wait_for_function('(visible) => document.querySelector(".back-to-top").hidden === !visible', arg=visible)
        button.focus()
        page.keyboard.press('Enter')
        page.wait_for_function('window.scrollY < 1 && document.querySelector(".back-to-top").hidden')
        assert page.evaluate('document.activeElement.id') == 'top'
        report.append(lang+': release number, 30% scroll threshold and keyboard return with focus all pass')
        for width in [320, 375, 768, 1440]:
            page.set_viewport_size({'width': width, 'height': 850})
            page.evaluate('window.scrollTo({top:(document.documentElement.scrollHeight-innerHeight)*.5,behavior:"instant"})')
            page.wait_for_function('!document.querySelector(".back-to-top").hidden')
            dock = page.locator('.music-dock').bounding_box()
            back = button.bounding_box()
            assert dock and back and dock['x'] <= 20 and back['x'] > dock['x']+dock['width']
            page.locator('.music-options').evaluate('el => el.open=true')
            panel = page.locator('.music-panel').bounding_box()
            assert panel and abs(panel['x']-dock['x']) <= 2 and panel['x']+panel['width'] <= width
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
            page.locator('.music-options').evaluate('el => el.open=false')
        report.append(lang+': left music/right back-to-top controls fit and do not overlap at 320/375/768/1440 px')
    page.set_viewport_size({'width':375,'height':850})
    page.goto(base+'/vi/journal/seven-layers/',wait_until='domcontentloaded')
    page.evaluate('window.scrollTo({top:(document.documentElement.scrollHeight-innerHeight)*.5,behavior:"instant"})')
    page.wait_for_function('!document.querySelector(".back-to-top").hidden')
    page.locator('.back-to-top').click()
    page.wait_for_function('window.scrollY < 1')
    report.append('Article pages share the same back-to-top behavior')
    page.goto(base+'/missing-page-controls',wait_until='domcontentloaded')
    page.set_viewport_size({'width':1440,'height':2000})
    page.wait_for_function('document.documentElement.scrollHeight <= innerHeight')
    assert page.locator('.back-to-top').is_hidden()
    report.append('Non-scrollable pages keep the button hidden')
    page.goto(base+'/vi/',wait_until='domcontentloaded')
    page.set_viewport_size({'width':375,'height':850})
    page.locator('#connect').scroll_into_view_if_needed()
    page.wait_for_function('!document.querySelector(".back-to-top").hidden')
    page.screenshot(path=str(out/'v0.3.2-contact-controls-mobile.png'))
    assert errors == [], errors
    browser.close()
out.joinpath('v0.3.2-controls-report.json').write_text(json.dumps(report, indent=2, ensure_ascii=False))
print('\n'.join(report))
