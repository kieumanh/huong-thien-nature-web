import type { Language } from './site.ts';

export const contactPath = (lang: Language) => lang === 'vi' ? '/vi/lien-he/' : '/en/contact/';
export const contactEmail = 'huongthiennature@gmail.com';
export const hotline = '0868499856';
export const internationalPhone = '+84868499856';
export const zaloUrl = `https://zalo.me/${hotline}`;
