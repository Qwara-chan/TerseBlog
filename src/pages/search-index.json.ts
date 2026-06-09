import type { APIRoute } from 'astro';

interface SearchDoc {
  title: string;
  description: string;
  tags: string;
  content: string;
  slug: string;
  date: string;
}

function stripMarkdown(md: string): string {
  return md
    .replace(/^---[\s\S]*?---\n?/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~`#>|]/g, '')
    .replace(/\n{2,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const GET: APIRoute = async () => {
  const modules = import.meta.glob('../posts/*.md', { eager: true });
  const posts: SearchDoc[] = [];

  const isProd = import.meta.env.PROD;

  for (const [path, mod] of Object.entries(modules)) {
    const slug = path.split('/').pop()?.replace(/\.(md|mdx)$/, '') || '';
    if (!slug) continue;
    const m = mod as Record<string, any>;
    const fm = m.frontmatter || {};
    if (isProd && fm.draft) continue;
    const raw = typeof m.rawContent === 'function' ? m.rawContent() : '';

    posts.push({
      title: fm.title || slug,
      description: fm.description || '',
      tags: Array.isArray(fm.tags) ? fm.tags.join(', ') : '',
      content: stripMarkdown(raw).slice(0, 2000),
      slug,
      date: fm.date ? String(fm.date) : '',
    });
  }

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
