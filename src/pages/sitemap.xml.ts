import type { APIRoute } from 'astro';
import { articles, articlePath } from '../data/articles';

export const GET: APIRoute = () => {
  const base = 'https://huongthiennature.com';
  const paths = [
    { vi: '/vi/', en: '/en/' },
    { vi: '/vi/journal/', en: '/en/journal/' },
    ...articles.map(article => ({
      vi: articlePath('vi', article.slug), en: articlePath('en', article.slug),
    })),
  ];
  const entries = paths.flatMap(pair => [pair.vi, pair.en].map(path =>
    `<url><loc>${base}${path}</loc><xhtml:link rel="alternate" hreflang="vi" href="${base}${pair.vi}"/><xhtml:link rel="alternate" hreflang="en" href="${base}${pair.en}"/><xhtml:link rel="alternate" hreflang="x-default" href="${base}${pair.vi}"/></url>`
  ));
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
