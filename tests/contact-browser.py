"""UI integration tests with mocked email/challenge services; never sends email."""
from pathlib import Path
import os
import shutil
import json
from playwright.sync_api import sync_playwright

base = os.environ.get('APP_BASE_URL', 'http://127.0.0.1:8788').rstrip('/')
out = Path(os.environ.get('ROOTS_ARTIFACT_DIR', str(Path(__file__).resolve().parents[1] / '.artifacts')))
out.mkdir(parents=True, exist_ok=True)
report = []
widget_script = '''
window.turnstile = {
  render(element, options) {
    window.contactTestOptions = options;
    element.textContent = 'Verification test fixture';
    const widget = document.createElement('div');
    widget.style.width = options.size === 'compact' ? '150px' : '300px';
    widget.style.height = options.size === 'compact' ? '140px' : '65px';
    widget.textContent = 'Test challenge';
    element.appendChild(widget);
    options.callback('test-only-widget-token');
    return 'test-only-widget';
  },
  reset() { window.contactTestOptions.callback('new-test-only-widget-token'); }
};
'''

def configure(page, available=True):
    page.route('**/api/contact-config', lambda route: route.fulfill(
        status=200, content_type='application/json',
        body=json.dumps({'available':available, 'siteKey':'test-only-public-key' if available else None})))
    page.route('https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',
        lambda route: route.fulfill(status=200, content_type='application/javascript', body=widget_script))

def fill(page, lang='vi'):
    page.locator('#name').fill('Người thử nghiệm')
    page.locator('#email').fill('visitor@example.com')
    page.locator('#interest').select_option('meditation')
    page.locator('#message').fill('Tôi muốn tìm hiểu thực tập. Đây là lời nhắn thử nghiệm.')
    page.locator('#consent').check()

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_EXECUTABLE') or shutil.which('chromium'), headless=True, args=['--no-sandbox'])
    context = browser.new_context(viewport={'width':375,'height':900}, reduced_motion='reduce')
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    configure(page)
    pending=[]
    payloads=[]
    def capture(route):
        pending.append(route)
        payloads.append(route.request.post_data_json)
    page.route('**/api/contact',capture)
    for lang in ['vi','en']:
        page.goto(base+'/'+lang+'/', wait_until='domcontentloaded')
        page.wait_for_function("!document.querySelector('#name').disabled")
        assert page.locator('#name').input_value()==''
        assert not page.locator('button[type="submit"]').is_disabled()
        fill(page,lang)
        page.locator('#consent').uncheck()
        page.locator('button[type="submit"]').click()
        assert len(pending)==0, 'Consent must be required'
        page.locator('#consent').check()
        page.locator('#message').fill('short')
        page.locator('button[type="submit"]').click()
        assert len(pending)==0, 'Short message must not submit'
        page.locator('#message').fill('Tôi muốn tìm hiểu thực tập. Đây là lời nhắn thử nghiệm.')
        page.locator('button[type="submit"]').click()
        page.wait_for_function("document.querySelector('#interest-form').getAttribute('aria-busy') === 'true'")
        assert len(pending)==1
        assert page.locator('#name').is_disabled()
        assert page.locator('button[type="submit"]').is_disabled()
        page.locator('#interest-form').evaluate("form => form.dispatchEvent(new Event('submit', {bubbles:true,cancelable:true}))")
        assert len(pending)==1, 'Double submission must be prevented'
        body=payloads[-1]
        assert body['language']==lang and body['consent'] is True
        assert body['website']=='' and body['message'].startswith('Tôi muốn')
        assert body['turnstileToken']=='test-only-widget-token'
        assert body['requestId']
        pending.pop().fulfill(status=200,content_type='application/json',body='{"ok":true}')
        page.wait_for_function("document.querySelector('#form-result').dataset.kind === 'success'")
        assert page.locator('#name').input_value()==''
        assert page.locator('#message').input_value()==''
        report.append(lang+': valid JSON submission, required fields/consent, sending state, duplicate prevention, success reset')
    page.goto(base+'/vi/',wait_until='domcontentloaded')
    fill(page)
    page.locator('button[type="submit"]').click()
    assert len(pending)==1
    original_key=payloads[-1]['requestId']
    pending.pop().fulfill(status=502,content_type='application/json',body='{"ok":false,"code":"send_failed"}')
    page.wait_for_function("document.querySelector('#form-result').dataset.kind === 'error'")
    assert page.locator('#message').input_value().startswith('Tôi muốn')
    assert 'Chưa thể xác nhận' in page.locator('#form-result').inner_text()
    page.locator('button[type="submit"]').click()
    assert len(pending)==1 and payloads[-1]['requestId']==original_key
    pending.pop().fulfill(status=429,content_type='application/json',body='{"ok":false,"code":"busy"}')
    page.wait_for_function("document.querySelector('#form-result').textContent.includes('đang bận')")
    page.locator('#message').fill('Nội dung đã thay đổi. Đây là một câu hỏi mới.')
    page.locator('button[type="submit"]').click()
    assert len(pending)==1 and payloads[-1]['requestId']!=original_key
    pending.pop().abort('failed')
    page.wait_for_function("document.querySelector('#form-result').textContent.includes('Chưa thể xác nhận')")
    report.append('Failures preserve content; unchanged retry reuses idempotency key; edited submission gets new key; network errors never show success')
    page.evaluate("window.contactTestOptions['expired-callback']()")
    assert page.locator('button[type="submit"]').is_disabled()
    assert 'hoàn tất xác minh lại' in page.locator('#form-result').inner_text()
    page.evaluate("window.contactTestOptions.callback('fresh-test-only-token')")
    assert not page.locator('button[type="submit"]').is_disabled()
    report.append('Expired verification disables submit; a fresh challenge restores it')
    for width in [320,375,768,1440]:
        page.set_viewport_size({'width':width,'height':900})
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Contact form overflow'
    page.set_viewport_size({'width':375,'height':900})
    page.locator('#connect').scroll_into_view_if_needed()
    page.screenshot(path=str(out/'contact-form-mobile.png'))
    report.append('Contact form fits mobile, tablet and desktop widths')
    # Fallback generates drafts locally; no email provider is called.
    from urllib.parse import urlparse, parse_qs, unquote
    unavailable=context.new_page()
    fallback_posts=[]
    configure(unavailable,False)
    unavailable.route('**/api/contact', lambda route: (fallback_posts.append(route.request), route.abort()))
    for lang in ['vi','en']:
        unavailable.goto(base+'/'+lang+'/',wait_until='domcontentloaded')
        unavailable.wait_for_function("document.querySelector('#interest-form').dataset.delivery === 'email'")
        assert unavailable.locator('#name').is_enabled()
        assert unavailable.locator('button[type="submit"]').is_enabled()
        assert unavailable.locator('#form-result').get_attribute('data-kind')=='info'
        assert unavailable.locator('#contact-verification').is_hidden()
        fill(unavailable,lang)
        unavailable.locator('#consent').uncheck()
        unavailable.locator('button[type="submit"]').click()
        assert unavailable.locator('.contact-draft-links').is_hidden()
        unavailable.locator('#consent').check()
        message='Nội dung có dấu, & ? # + và xuống dòng.\nXin chào Hương Thiền.'
        unavailable.locator('#message').fill(message)
        unavailable.locator('button[type="submit"]').click()
        assert unavailable.locator('.contact-draft-links').is_visible()
        uri=urlparse(unavailable.locator('[data-email-app]').get_attribute('href'))
        assert uri.scheme=='mailto' and uri.path=='kieumanh2211@gmail.com'
        draft=parse_qs(uri.query)
        assert message in draft['body'][0]
        assert 'visitor@example.com' in draft['body'][0]
        gmail=parse_qs(urlparse(unavailable.locator('[data-gmail]').get_attribute('href')).query)
        assert gmail['to']==['kieumanh2211@gmail.com'] and gmail['body']==draft['body']
        assert unavailable.locator('[data-gmail]').get_attribute('rel')=='noopener noreferrer'
        assert unavailable.locator('#form-result').get_attribute('data-kind')=='info'
        assert unavailable.locator('#message').input_value()==message
        unavailable.locator('#message').fill(message+' Nội dung mới.')
        assert unavailable.locator('.contact-draft-links').is_hidden()
        assert len(fallback_posts)==0
    report.append('Both languages: missing configuration enables validated email/Gmail drafts, preserves Unicode, keeps content and never reports sending')
    configure(unavailable,True)
    unavailable.goto(base+'/vi/',wait_until='domcontentloaded')
    fill(unavailable)
    unavailable.unroute('**/api/contact')
    unavailable.route('**/api/contact', lambda route: route.fulfill(status=503,content_type='application/json',body='{"ok":false,"code":"unavailable"}'))
    unavailable.locator('button[type="submit"]').click()
    unavailable.wait_for_function("document.querySelector('#interest-form').dataset.delivery === 'email'")
    assert unavailable.locator('#message').input_value().startswith('Tôi muốn')
    unavailable.locator('button[type="submit"]').click()
    assert unavailable.locator('.contact-draft-links').is_visible()
    report.append('API unavailable during submission switches to drafting and preserves the message')
    for failure in ['config-404','config-network','widget-network']:
        broken=context.new_page()
        configure(broken,True)
        if failure=='config-404':
            broken.unroute('**/api/contact-config')
            broken.route('**/api/contact-config',lambda route: route.fulfill(status=404,content_type='text/html',body='<html>Not found</html>'))
        elif failure=='config-network':
            broken.unroute('**/api/contact-config')
            broken.route('**/api/contact-config',lambda route: route.abort())
        else:
            broken.unroute('https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit')
            broken.route('https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',lambda route: route.abort())
        broken.goto(base+'/vi/',wait_until='domcontentloaded')
        broken.wait_for_function("document.querySelector('#interest-form').dataset.delivery === 'email'")
        assert broken.locator('button[type="submit"]').is_enabled()
        broken.close()
    report.append('Missing API, configuration network failure and blocked widget all leave email drafting available')
    assert errors==[],errors
    report.append('No JavaScript page errors')
    browser.close()
out.joinpath('contact-browser-report.json').write_text(json.dumps(report,indent=2,ensure_ascii=False))
print('\n'.join(report))
