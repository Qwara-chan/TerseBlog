import { getAllPosts } from '@/lib/content';
import { siteConfig } from '@/config';

export const GET = async () => {
  if (siteConfig.i18n.enabled) {
    return new Response(JSON.stringify({ redirect: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const postModules = import.meta.glob('../posts/zh-CN/*.md', { eager: true });
  const allPosts = getAllPosts(postModules);
  const items = allPosts.map(p => ({
    slug: p.slug, title: p.title, description: p.description, tags: p.tags.join(', '), date: p.date,
  }));
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json' } });
};
