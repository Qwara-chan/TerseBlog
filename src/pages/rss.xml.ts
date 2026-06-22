import rss from '@astrojs/rss';
import { siteConfig } from '@/config';
import { getAllPosts } from '@/lib/content';
import { prefixFor, type Locale } from '@/i18n/config';
import type { APIContext } from 'astro';

export const GET = async (_context: APIContext) => {
  if (siteConfig.i18n.enabled) {
    const locales = siteConfig.i18n.locales;
    const prefixMap = siteConfig.i18n.prefixMap;
    const prefixMapLiteral = JSON.stringify(
      Object.fromEntries(locales.map(l => [l, prefixMap[l]]))
    );
    const defaultPrefix = JSON.stringify(prefixMap[siteConfig.i18n.defaultLocale as Locale]);
    return new Response(`<!DOCTYPE html><html><head><meta charset="utf-8"><script>
      (function(){
        var SUPPORTED = ${JSON.stringify(locales as readonly string[])};
        var PREFIX_MAP = ${prefixMapLiteral};
        var DEFAULT_PREFIX = ${defaultPrefix};
        function getCookie(n){var m=document.cookie.match(new RegExp('(?:^|; )'+n+'=([^;]*)'));return m?decodeURIComponent(m[1]):null}
        var cookie=getCookie('locale');
        var al=navigator.language||'';
        var locale=cookie;
        if(!locale||SUPPORTED.indexOf(locale)===-1){
          if(/zh-Hant|zh-TW|zh-HK/i.test(al)) locale='zh-TW';
          else if(/^zh/i.test(al)) locale='zh-CN';
          else if(/^ja/i.test(al)) locale='ja';
          else if(/^en/i.test(al)) locale='en';
          else locale=${JSON.stringify(siteConfig.i18n.defaultLocale)};
        }
        var prefix=PREFIX_MAP[locale]||DEFAULT_PREFIX;
        location.replace('/'+prefix+'/rss.xml');
      })();
    </script></head><body>Redirecting…</body></html>`, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
  const postModules = import.meta.glob('../posts/zh-CN/*.md', { eager: true });
  const isProd = import.meta.env.PROD;

  const posts = Object.entries(postModules)
    .filter(([, mod]) => {
      const fm = (mod as any).frontmatter || mod;
      return !(isProd && fm.draft);
    })
    .map(([path, mod]) => {
      const slug = path.split('/').pop()?.replace(/\.(md|mdx)$/, '') || '';
      const fm = (mod as any).frontmatter || mod;
      return {
        title: fm.title || slug,
        description: fm.description || '',
        pubDate: new Date(fm.date || new Date()),
        link: `/posts/${slug}`,
      };
    })
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: siteConfig.site,
    items: posts,
    customData: `<language>en</language>`,
  });
};
