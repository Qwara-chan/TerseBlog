import { getAllPostsInLocale } from '@/lib/content';
import type { Locale } from '@/i18n/config';
import { LOCALES } from '@/i18n/config';
import { siteConfig } from '@/config';

export const GET = async ({ params }: { params: { lang: string } }) => {
  if (!siteConfig.i18n.enabled) {
    return new Response('i18n disabled', { status: 404 });
  }
  const locale = params.lang as Locale;
  const posts = getAllPostsInLocale(locale).map(p => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    tags: p.tags.join(', '),
    date: p.date,
  }));
  return new Response(JSON.stringify(posts), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export function getStaticPaths() {
  if (!siteConfig.i18n.enabled) return [];
  return LOCALES.map(lang => ({ params: { lang } }));
}
