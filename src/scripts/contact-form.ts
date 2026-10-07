import { contactCopy, contactRecipient } from '../data/contact';

type Turnstile = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widget: string) => void;
};
declare global {
  interface Window { turnstile?: Turnstile; }
}

const form = document.querySelector<HTMLFormElement>('#interest-form');
if (form) void setup(form);

async function setup(form: HTMLFormElement) {
  const lang = form.dataset.language === 'en' ? 'en' : 'vi';
  const t = contactCopy[lang];
  const result = form.querySelector<HTMLElement>('#form-result')!;
  const fieldset = form.querySelector<HTMLFieldSetElement>('fieldset')!;
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const label = button.querySelector<HTMLElement>('.send-label')!;
  const verification = form.querySelector<HTMLElement>('#contact-verification')!;
  const draftLinks = form.querySelector<HTMLElement>('.contact-draft-links')!;
  const emailApp = form.querySelector<HTMLAnchorElement>('[data-email-app]')!;
  const gmail = form.querySelector<HTMLAnchorElement>('[data-gmail]')!;
  let emailMode = false;
  let token = '';
  let widget: string | undefined;
  let sending = false;
  let requestId = '';
  let succeeded = false;
  const status = (message: string, kind: 'info' | 'success' | 'error' = 'info') => {
    result.textContent = message;
    result.dataset.kind = kind;
  };
  const refreshButton = () => { button.disabled = sending || (!emailMode && !token); };
  const useEmail = () => {
    emailMode = true;
    fieldset.disabled = false;
    verification.hidden = true;
    label.textContent = t.compose;
    form.setAttribute('aria-busy', 'false');
    form.dataset.delivery = 'email';
    form.querySelector<HTMLElement>('#contact-privacy')!.textContent = t.emailPrivacy;
    refreshButton();
    status(t.unavailable);
  };
  const resetVerification = () => {
    token = '';
    refreshButton();
    if (widget !== undefined) window.turnstile?.reset(widget);
  };
  form.addEventListener('input', () => {
    draftLinks.hidden = true;
    if (emailMode) status(t.unavailable);
    // Retrying an unchanged submission keeps its idempotency key; editing creates a new request.
    requestId = '';
    if (succeeded) {
      succeeded = false;
      status(t.ready);
    }
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    const fields = new FormData(form);
    if (emailMode) {
      if (fields.get('website')) return;
      const topic = form.querySelector<HTMLSelectElement>('#interest')!.selectedOptions[0].textContent;
      const subject = `Hương Thiền Nature · ${topic}`;
      const body = [
        `Name / Tên: ${String(fields.get('name')).trim()}`,
        `Email: ${String(fields.get('email')).trim()}`,
        `Interest / Quan tâm: ${topic}`, '', String(fields.get('message')).trim(), '',
        lang === 'vi' ? 'Tôi đồng ý sử dụng thông tin này để phản hồi lời nhắn.' : 'I consent to using these details to respond to this message.',
      ].join('\n');
      // Draft only: no message data leaves this page until a visitor chooses a link.
      emailApp.href = `mailto:${contactRecipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const params = new URLSearchParams({ view: 'cm', fs: '1', to: contactRecipient, su: subject, body });
      gmail.href = `https://mail.google.com/mail/?${params}`;
      draftLinks.hidden = false;
      status(t.draftReady);
      emailApp.focus();
      return;
    }
    if (!token) { status(t.verification_failed, 'error'); return; }
    requestId ||= crypto.randomUUID();
    const body = {
      name: fields.get('name'), email: fields.get('email'), interest: fields.get('interest'),
      message: fields.get('message'), consent: fields.get('consent') === 'on',
      website: fields.get('website') || '', language: lang, turnstileToken: token, requestId,
    };
    sending = true;
    fieldset.disabled = true;
    form.setAttribute('aria-busy', 'true');
    label.textContent = t.sending;
    refreshButton();
    status(t.sending);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body), signal: AbortSignal.timeout(25_000),
      });
      const reply = await response.json() as { ok?: boolean; code?: string };
      if (response.ok && reply.ok === true) {
        form.reset();
        requestId = '';
        succeeded = true;
        status(t.success, 'success');
      } else {
        const code = reply.code;
        const message = code === 'verification_failed' ? t.verification_failed : code === 'invalid_data' ? t.invalid_data : code === 'busy' ? t.busy : code === 'unavailable' ? t.unavailable : t.send_failed;
        if (code === 'unavailable') useEmail();
        else status(message, 'error');
      }
    } catch {
      status(t.send_failed, 'error');
    } finally {
      sending = false;
      fieldset.disabled = false;
      form.setAttribute('aria-busy', 'false');
      label.textContent = emailMode ? t.compose : t.send;
      resetVerification();
    }
  });

  try {
    const response = await fetch('/api/contact-config', { cache: 'no-store', signal: AbortSignal.timeout(10_000) });
    const config = await response.json() as { available?: boolean; siteKey?: string };
    if (!response.ok || config.available !== true || typeof config.siteKey !== 'string' || !config.siteKey) throw new Error('unavailable');
    await new Promise<void>((resolve, reject) => {
      if (window.turnstile) { resolve(); return; }
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      const timer = setTimeout(() => reject(new Error('verification unavailable')), 15_000);
      script.onload = () => { clearTimeout(timer); resolve(); };
      script.onerror = () => { clearTimeout(timer); reject(new Error('verification unavailable')); };
      document.head.append(script);
    });
    if (!window.turnstile) throw new Error('verification unavailable');
    fieldset.disabled = false;
    widget = window.turnstile.render(verification, {
      // The compact widget fits a padded form even on a 320 px screen.
      sitekey: config.siteKey, action: 'contact', theme: 'light', size: 'compact', language: lang,
      'response-field': false,
      callback: (value: string) => {
        if (emailMode) return;
        token = value;
        refreshButton();
        if (!sending && !succeeded && result.textContent === t.verification_failed) status(t.ready);
      },
      'expired-callback': () => { if (!emailMode) { token = ''; refreshButton(); status(t.verification_failed, 'error'); } },
      'error-callback': () => { if (!emailMode) { token = ''; refreshButton(); status(t.verification_failed, 'error'); } },
    });
    status(t.ready);
    form.setAttribute('aria-busy', 'false');
  } catch {
    useEmail();
  }
}
