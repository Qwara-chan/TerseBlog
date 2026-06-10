import type { Post, PostFrontmatter, HeadingItem, TagCount } from '@/lib/types';
import { siteConfig } from '@/config';

/**
 * Calculate reading time for mixed CJK + English content.
 */
export function calculateReadingTime(
  content: string,
  options?: { cnSpeed?: number; enSpeed?: number }
): number {
  const cnSpeed = options?.cnSpeed ?? siteConfig.content.readingSpeed.cn;
  const enSpeed = options?.enSpeed ?? siteConfig.content.readingSpeed.en;

  const cjkChars = (content.match(/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g) || []).length;
  const latinWords = content
    .replace(/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

  const cjkMinutes = cjkChars / cnSpeed;
  const enMinutes = latinWords / enSpeed;
  return Math.max(1, Math.ceil(cjkMinutes + enMinutes));
}

/**
 * Strip markdown syntax and return plain text excerpt.
 */
export function generateExcerpt(content: string, length?: number): string {
  const maxLen = length ?? siteConfig.content.excerptLength;
  const plain = content
    .replace(/^---[\s\S]*?---/, '') // strip frontmatter
    .replace(/```[\s\S]*?```/g, '') // strip code blocks
    .replace(/!\[.*?\]\(.*?\)/g, '') // strip images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // strip links, keep text
    .replace(/[*_~`#>|]/g, '') // strip markdown markers
    .replace(/\n{2,}/g, ' ') // collapse multiple newlines
    .replace(/\s+/g, ' ') // collapse whitespace
    .trim();

  if (plain.length <= maxLen) return plain;
  return plain.slice(0, maxLen).replace(/\s+\S*$/, '') + '…';
}

/**
 * Generate a GitHub-style heading ID from text.
 */
function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Parse headings from markdown content into a nested tree.
 */
export function generateTOC(content: string, maxDepth?: number): HeadingItem[] {
  const depth = maxDepth ?? siteConfig.content.tocMaxDepth;
  const withoutCode = content.replace(/```[\s\S]*?```/g, '');
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const items: HeadingItem[] = [];
  const stack: HeadingItem[] = [];

  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(withoutCode)) !== null) {
    const level = match[1].length;
    if (level > depth) continue;

    const text = match[2].trim();
    const item: HeadingItem = {
      depth: level,
      text,
      id: headingId(text),
      children: [],
    };

    // Build nested structure
    while (stack.length > 0 && stack[stack.length - 1].depth >= level) {
      stack.pop();
    }
    if (stack.length > 0) {
      stack[stack.length - 1].children!.push(item);
    } else {
      items.push(item);
    }
    stack.push(item);
  }

  return items;
}

/**
 * Convert an Astro.glob module into a typed Post.
 */
export function buildPost(mod: Record<string, unknown>, slug: string): Post {
  const fm = mod.frontmatter as PostFrontmatter || mod as unknown as PostFrontmatter;
  // rawContent/compiledContent are functions in Astro 5
  const rawContent: string = typeof mod.rawContent === 'function'
    ? (mod.rawContent as Function)()
    : (mod.rawContent as string) || '';
  const desc = fm.description || '';

  return {
    title: fm.title || slug,
    date: fm.date || new Date().toISOString().split('T')[0],
    description: desc,
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    draft: fm.draft ?? false,
    updated: fm.updated,
    slug,
    content: rawContent,
    headings: generateTOC(rawContent || desc),
    readingTime: calculateReadingTime(rawContent || desc),
    excerpt: generateExcerpt(rawContent || desc),
  };
}

/**
 * Get all posts from modules (array from Astro.glob or object from import.meta.glob).
 */
export function getAllPosts(modules: Record<string, unknown>[] | Record<string, Record<string, unknown>>): Post[] {
  const posts: Post[] = [];

  if (Array.isArray(modules)) {
    // Astro.glob format: array of modules with .file
    for (const mod of modules) {
      const slug = mod.file
        ? (mod.file as string).split('/').pop()?.replace(/\.(md|mdx)$/, '') || ''
        : '';
      if (!slug) continue;
      posts.push(buildPost(mod, slug));
    }
  } else {
    // import.meta.glob format: { [path]: module }
    for (const [path, mod] of Object.entries(modules)) {
      const slug = path.split('/').pop()?.replace(/\.(md|mdx)$/, '') || '';
      if (!slug) continue;
      posts.push(buildPost(mod as Record<string, unknown>, slug));
    }
  }

  const isProd = import.meta.env.PROD;
  return posts
    .filter((p) => !(isProd && p.draft))
    .sort((a, b) => {
      const aTime = new Date(a.date).getTime();
      const bTime = new Date(b.date).getTime();
      if (isNaN(aTime) && isNaN(bTime)) return 0;
      if (isNaN(aTime)) return 1;
      if (isNaN(bTime)) return -1;
      return bTime - aTime;
    });
}

/**
 * Find a single post by slug.
 */
export function getPostBySlug(slug: string, posts: Post[]): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/**
 * Filter posts by tag (case-insensitive).
 */
export function getPostsByTag(tag: string, posts: Post[]): Post[] {
  const t = tag.toLowerCase();
  return posts.filter((p) => p.tags.some((pt) => pt.toLowerCase() === t));
}

/**
 * Get all unique tags with post counts.
 */
export function getAllTags(posts: Post[]): TagCount[] {
  const map = new Map<string, number>();
  for (const p of posts) {
    for (const tag of p.tags) {
      map.set(tag, (map.get(tag) || 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get previous and next posts by date.
 */
export function getAdjacentPosts(slug: string, posts: Post[]): { prev: Post | null; next: Post | null } {
  const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const idx = sorted.findIndex((p) => p.slug === slug);
  return {
    prev: idx < sorted.length - 1 ? sorted[idx + 1] : null,
    next: idx > 0 ? sorted[idx - 1] : null,
  };
}

/**
 * Paginate posts array.
 */
export function paginatePosts(
  posts: Post[],
  page: number,
  pageSize?: number
): { items: Post[]; totalPages: number; currentPage: number } {
  const size = pageSize ?? siteConfig.content.postsPerPage;
  const totalPages = Math.max(1, Math.ceil(posts.length / size));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * size;
  const items = posts.slice(start, start + size);
  return { items, totalPages, currentPage };
}
