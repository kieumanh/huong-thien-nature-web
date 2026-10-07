import { contactCopy } from '../data/contact';

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
  let token = '';
  let widget: string | undefined;
  let sending = false;
  let requestId = '';
  let succeeded = false;
  const status = (message: string, kind: 'info' | 'success' | 'error' = 'info') => {
    result.textContent = message;
    result.dataset.kind = kind;
  };
  const refreshButton = () => { button.disabled = sending || !token; };
  const unavailable = () => {
    fieldset.disabled = false;
    button.disabled = true;
    verification.hidden = true;
    form.setAttribute('aria-busy', 'false');
    status(t.unavailable, 'error');
  };
  const resetVerification = () => {
    token = '';
    refreshButton();
    if (widget !== undefined) window.turnstile?.reset(widget);
  };
  const verificationFailed = () => {
    token = '';
    refreshButton();
    // A widget event cannot change the outcome of an email request already sent.
    if (!sending && !succeeded) status(t.verification_failed, 'error');
  };
  form.addEventListener('input', () => {
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
        status(message, 'error');
      }
    } catch {
      status(t.send_failed, 'error');
    } finally {
      sending = false;
      fieldset.disabled = false;
      form.setAttribute('aria-busy', 'false');
      label.textContent = t.send;
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
        token = value;
        refreshButton();
        if (!sending && !succeeded && result.textContent === t.verification_failed) status(t.ready);
      },
      'expired-callback': verificationFailed,
      'error-callback': verificationFailed,
    });
    status(t.ready);
    form.setAttribute('aria-busy', 'false');
  } catch {
    unavailable();
  }
}
