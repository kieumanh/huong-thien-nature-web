export interface ContactEnv {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
}

export const interests = ['meditation', 'retreat', 'courses', 'membership', 'other'] as const;
export type Interest = (typeof interests)[number];

export interface ContactPayload {
  name: string;
  email: string;
  interest: Interest;
  message: string;
  language: 'vi' | 'en';
  consent: true;
  website: string;
  turnstileToken: string;
  requestId: string;
}

const emailPattern = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function validEmail(value: string) {
  return value.length <= 254 && emailPattern.test(value) && !/[\u0000-\u001f\u007f]/.test(value);
}

export function configured(env: ContactEnv) {
  const sender = env.CONTACT_FROM_EMAIL?.trim() || '';
  const senderEmail = sender.match(/^[^<>\r\n]+<([^<>]+)>$/)?.[1] || sender;
  return Boolean(
    env.RESEND_API_KEY?.trim() && env.TURNSTILE_SECRET_KEY?.trim() &&
    env.TURNSTILE_SITE_KEY?.trim() && validEmail(env.CONTACT_TO_EMAIL?.trim() || '') &&
    validEmail(senderEmail) && !/[\r\n]/.test(sender)
  );
}

export function validatePayload(value: unknown): ContactPayload | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  for (const key of ['name', 'email', 'interest', 'message', 'language', 'website', 'turnstileToken', 'requestId']) {
    if (typeof input[key] !== 'string') return null;
  }
  const name = (input.name as string).trim();
  const email = (input.email as string).trim();
  const message = (input.message as string).trim();
  if (!name || name.length > 100 || /[\u0000-\u001f\u007f]/.test(name)) return null;
  if (!validEmail(email)) return null;
  if (message.length < 10 || message.length > 5000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(message)) return null;
  if (!interests.includes(input.interest as Interest)) return null;
  if (input.language !== 'vi' && input.language !== 'en') return null;
  if (input.consent !== true || input.website !== '') return null;
  if (!(input.turnstileToken as string).trim() || (input.turnstileToken as string).length > 2048) return null;
  if (!uuidPattern.test(input.requestId as string)) return null;
  return {
    name, email, message, interest: input.interest as Interest,
    language: input.language, consent: true, website: '',
    turnstileToken: input.turnstileToken as string, requestId: input.requestId as string,
  };
}

export function json(body: Record<string, unknown>, status = 200, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...extraHeaders,
    },
  });
}

export async function readBody(request: Request, maxBytes = 32_768) {
  if (Number(request.headers.get('content-length')) > maxBytes) throw new RangeError('body too large');
  if (!request.body) return null;
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      bytes += part.value.byteLength;
      if (bytes > maxBytes) {
        await reader.cancel();
        throw new RangeError('body too large');
      }
      chunks.push(part.value);
    }
  } finally {
    reader.releaseLock();
  }
  const buffer = new Uint8Array(bytes);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(buffer)) as unknown;
}

const interestNames: Record<Interest, string> = {
  meditation: 'Meditation / Thiền', retreat: 'Retreat', courses: 'Courses / Khóa học',
  membership: 'Membership / Cộng đồng', other: 'Other / Nội dung khác',
};

export function emailMessage(payload: ContactPayload, env: ContactEnv) {
  return {
    from: env.CONTACT_FROM_EMAIL!.trim(),
    to: [env.CONTACT_TO_EMAIL!.trim()],
    reply_to: payload.email,
    subject: `Hương Thiền Nature · ${interestNames[payload.interest]}`,
    text: [
      'New website contact / Liên hệ từ website',
      '', `Name / Tên: ${payload.name}`, `Email: ${payload.email}`,
      `Interest / Quan tâm: ${interestNames[payload.interest]}`,
      `Language / Ngôn ngữ: ${payload.language}`, '',
      'Message / Nội dung:', payload.message, '',
      'The sender consented to use of these details to respond to this message.',
      'Người gửi đồng ý sử dụng thông tin để phản hồi tin nhắn này.',
    ].join('\n'),
  };
}
