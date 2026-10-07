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
    # An unavailable service must never open a mail app or claim delivery.
    unavailable=context.new_page()
    configure(unavailable,False)
    for lang in ['vi','en']:
        unavailable.goto(base+'/'+lang+'/',wait_until='domcontentloaded')
        unavailable.wait_for_function("document.querySelector('#form-result').dataset.kind === 'error'")
        assert unavailable.locator('#name').is_enabled()
        assert unavailable.locator('button[type="submit"]').is_disabled()
        assert unavailable.locator('a[href^="mailto:"]').count()==0
        assert unavailable.locator('[data-gmail]').count()==0
    configure(unavailable,True)
    unavailable.goto(base+'/vi/',wait_until='domcontentloaded')
    fill(unavailable)
    unavailable.route('**/api/contact', lambda route: route.fulfill(status=503,content_type='application/json',body='{"ok":false,"code":"unavailable"}'))
    unavailable.locator('button[type="submit"]').click()
    unavailable.wait_for_function("document.querySelector('#form-result').dataset.kind === 'error'")
    assert unavailable.locator('#message').input_value().startswith('Tôi muốn')
    report.append('Unavailable service keeps message text, displays an error and never offers email drafting')
    assert errors==[],errors
    report.append('No JavaScript page errors')
    browser.close()
out.joinpath('contact-browser-report.json').write_text(json.dumps(report,indent=2,ensure_ascii=False))
print('\n'.join(report))
