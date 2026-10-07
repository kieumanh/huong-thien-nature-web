# Contact form configuration

In production the Cloudflare Worker serves the Astro static assets and routes `/api/contact` and `/api/contact-config` through `src/worker.ts`. The Worker reuses the shared validation, Turnstile verification and Resend sending logic in `functions/`; no database is used.

## Runtime bindings on the Worker

In Cloudflare Dashboard, open **Workers & Pages → huong-thien-nature → Settings → Variables and Secrets**. Add these under Production:

| Name | Type | Value |
|---|---|---|
| `CONTACT_TO_EMAIL` | Text | The recipient inbox selected by the project owner; configure it only in Worker settings. |
| `CONTACT_FROM_EMAIL` | Text | Sender email authorized by Resend, for example `Hương Thiền Nature <sender@verified-domain>` |
| `RESEND_API_KEY` | Secret | Resend API key with sending permission |
| `TURNSTILE_SITE_KEY` | Text | Public site key for the Turnstile widget |
| `TURNSTILE_SECRET_KEY` | Secret | Secret key paired with that widget |

In Turnstile, allow `huongthiennature.com` as a hostname and use the `contact` action expected by the API. Do not put secret values in source, `.dev.vars.example`, GitHub, or chat. `.dev.vars` is ignored by Git.

For Resend, verify the sending domain and use an authorized sender. The Gmail address is the recipient only; it does not authorize Gmail as the sender domain. Configure the five runtime values before expecting a real email.

## API behavior

- `GET /api/contact-config` returns `available` and the public Turnstile site key only; it does not expose the recipient or secrets.
- `POST /api/contact` accepts same-origin JSON and validates name, email, interest, message, consent, honeypot, request ID and a 32 KiB body limit.
- Turnstile is verified server-side. Invalid token, hostname or action is rejected.
- Resend receives plain-text content and the sender's email as Reply-To. Personal data and provider responses are not logged.
- Success is returned only after Resend accepts the message. Check the inbox/Spam and Resend event to verify actual delivery.

## Local testing

```bash
cp .dev.vars.example .dev.vars
# Enter local test values in .dev.vars using a secure editor.
npm run dev:worker
```

Use a hostname allowed by the Turnstile test widget. `npm run test:contact` uses mocked providers and does not send real mail. `npm run dev:pages` remains available for testing the separate Pages demo.
