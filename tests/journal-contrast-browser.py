"""Check journal navigation and actual floating-control contrast in Chromium."""
from pathlib import Path
import os, shutil, json
from playwright.sync_api import sync_playwright

base = os.environ.get('APP_BASE_URL', 'http://127.0.0.1:8788').rstrip('/')
out = Path(os.environ.get('ROOTS_ARTIFACT_DIR', str(Path(__file__).resolve().parents[1] / '.artifacts')))
out.mkdir(parents=True, exist_ok=True)
report = []
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_EXECUTABLE') or shutil.which('chromium'), headless=True, args=['--no-sandbox'])
    page = browser.new_page(viewport={'width':1440,'height':900}, reduced_motion='reduce')
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    for lang in ['vi','en']:
        page.goto(base+'/'+lang+'/',wait_until='domcontentloaded')
        page.locator(f'#main-nav a[href="/{lang}/journal/"]').click()
        page.wait_for_url(base+'/'+lang+'/journal/')
        assert page.locator('h1').inner_text() == ('Tản văn' if lang=='vi' else 'Journal')
        assert page.locator('.journal-listing article').count() == 3
        assert page.locator('#main-nav a[aria-current="page"]').get_attribute('href') == '/'+lang+'/journal/'
        for link in page.locator('.journal-listing article h2 a').all():
            assert link.get_attribute('href').startswith('/'+lang+'/journal/')
        page.locator('.journal-listing article h2 a').first.click()
        page.wait_for_url(base+'/'+lang+'/journal/returning-attention/')
        assert page.locator('.article-body section').count() >= 3
        page.locator('.article-body > a.quiet-link').click()
        page.wait_for_url(base+'/'+lang+'/journal/')
        page.locator('.language a[lang="'+('en' if lang=='vi' else 'vi')+'"]').click()
        page.wait_for_url(base+'/'+('en' if lang=='vi' else 'vi')+'/journal/')
        report.append(lang+': main navigation opens listing, all three posts appear, article/back links and language switch work')
    for width in [320,375,768,1440]:
        page.set_viewport_size({'width':width,'height':900})
        for lang in ['vi','en']:
            page.goto(base+'/'+lang+'/journal/',wait_until='domcontentloaded')
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
            for image in page.locator('.journal-listing img').all():
                image.scroll_into_view_if_needed()
            page.wait_for_function('Array.from(document.querySelectorAll(".journal-listing img")).every(i=>i.complete && i.naturalWidth>0)')
            if width <= 768:
                page.locator('.nav-toggle').click()
                assert page.locator('#main-nav a[aria-current="page"]').is_visible()
                page.keyboard.press('Escape')
            page.evaluate('window.scrollTo({top:0,behavior:"instant"})')
        report.append('Journal layouts fit '+str(width)+' px in both languages with working images and menu')
    nojs=browser.new_context(java_script_enabled=False,viewport={'width':375,'height':900})
    np=nojs.new_page()
    np.goto(base+'/vi/',wait_until='domcontentloaded')
    np.locator('#main-nav a[href="/vi/journal/"]').click()
    np.wait_for_url(base+'/vi/journal/')
    np.locator('.journal-listing article h2 a').first.click()
    np.wait_for_url(base+'/vi/journal/returning-attention/')
    report.append('Listing and article navigation also work without JavaScript')
    page.set_viewport_size({'width':1440,'height':900})
    page.goto(base+'/vi/',wait_until='domcontentloaded')
    def region(selector, tone):
        page.locator(selector).evaluate('el=>window.scrollTo({top:el.getBoundingClientRect().top+scrollY+el.offsetHeight/2-(innerHeight-44),behavior:"instant"})')
        page.wait_for_function('(tone)=>Array.from(document.querySelectorAll(".music-dock,.back-to-top")).every(el=>el.dataset.floatingTone===tone)', arg=tone)
        assert page.locator('.back-to-top').is_visible()
    region('#nature','light')
    region('#path','dark')
    page.evaluate('window.scrollTo({top:document.documentElement.scrollHeight,behavior:"instant"})')
    page.wait_for_function('Array.from(document.querySelectorAll(".music-dock,.back-to-top")).every(el=>el.dataset.floatingTone==="light")')
    # Check readable foreground/background contrast in both control color schemes.
    for tone in ['light','dark']:
        if tone=='dark': region('#path','dark')
        contrast=page.evaluate('''() => {
          const lum = text => {const c=text.match(/[\\d.]+/g).slice(0,3).map(Number).map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4});return c[0]*.2126+c[1]*.7152+c[2]*.0722};
          return Array.from(document.querySelectorAll('.music-dock,.back-to-top')).map(el=>{const s=getComputedStyle(el),a=lum(s.color),b=lum(s.backgroundColor);return(Math.max(a,b)+.05)/(Math.min(a,b)+.05)});
        }''')
        assert all(value>=4.5 for value in contrast), contrast
    report.append('Both controls invert across real light sections, dark nature and footer; text/icon contrast exceeds 4.5:1')
    # Place a same-origin image beneath the controls to verify independent photo sampling.
    page.evaluate('''() => {
      const canvas=document.createElement('canvas');canvas.width=2;canvas.height=1;
      const ctx=canvas.getContext('2d');ctx.fillStyle='#000';ctx.fillRect(0,0,1,1);ctx.fillStyle='#fff';ctx.fillRect(1,0,1,1);
      const image=document.createElement('img');image.id='contrast-fixture';image.src=canvas.toDataURL();
      image.style.cssText='position:fixed;inset:0;width:100vw;height:100vh;z-index:39;object-fit:fill';document.body.append(image);
    }''')
    page.wait_for_function('document.querySelector(".music-dock").dataset.floatingTone==="light" && document.querySelector(".back-to-top").dataset.floatingTone==="dark"')
    page.locator('#contrast-fixture').evaluate('el=>el.remove()')
    page.evaluate('window.dispatchEvent(new Event("resize"))')
    report.append('Controls choose independent opposing tones over dark and light regions of the same image')
    page.set_viewport_size({'width':375,'height':850})
    page.goto(base+'/vi/journal/',wait_until='domcontentloaded')
    page.screenshot(path=str(out/'v0.3.3-journal-mobile.png'),full_page=True)
    assert errors == [], errors
    browser.close()
out.joinpath('v0.3.3-journal-contrast-report.json').write_text(json.dumps(report,indent=2,ensure_ascii=False))
print('\n'.join(report))
