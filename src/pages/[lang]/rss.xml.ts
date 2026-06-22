import rss from '@astrojs/rss';
import { getAllPostsInLocale } from '@/lib/content';
import { siteConfig } from '@/config';
import type { Locale } from '@/i18n/config';
import { LOCALES } from '@/i18n/config';

export const GET = async ({ params }: { params: { lang: string } }) => {
  if (!siteConfig.i18n.enabled) {
    return new Response('i18n disabled', { status: 404 });
  }
  const locale = params.lang as Locale;
  const posts = getAllPostsInLocale(locale).map(p => ({
    title: p.title,
    description: p.description,
    pubDate: new Date(p.date),
    link: `/posts/${p.slug}`,
  }));

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: siteConfig.site,
    items: posts,
    customData: `<language>${locale}</language>`,
  });
};

export function getStaticPaths() {
  if (!siteConfig.i18n.enabled) return [];
  return LOCALES.map(lang => ({ params: { lang } }));
}
