import rss from '@astrojs/rss';
import { siteConfig } from '@/config';

export const GET = async () => {
  const postModules = import.meta.glob('../posts/*.md', { eager: true });
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
    customData: `<language>${siteConfig.language}</language>`,
  });
};
