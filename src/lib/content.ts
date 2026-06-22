import type { Post, PostFrontmatter, HeadingItem, TagCount } from '@/lib/types';
import { siteConfig } from '@/config';
import { DEFAULT_LOCALE, isLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';

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
    .replace(/^---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~`#>|]/g, '')
    .replace(/\n{2,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (plain.length <= maxLen) return plain;
  return plain.slice(0, maxLen).replace(/\s+\S*$/, '') + '…';
}

function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

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
 * Convert a module into a typed Post, attaching its locale if extractable.
 */
export function buildPost(mod: Record<string, unknown>, slug: string, locale?: Locale): Post {
  const fm = mod.frontmatter as PostFrontmatter || mod as unknown as PostFrontmatter;
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
    locale,
  };
}

/**
 * Extract locale from a module path like '../posts/zh-CN/hello-world.md'.
 */
export function localeFromPath(path: string): Locale | null {
  const m = path.match(/\/posts\/([^\/]+)\//);
  if (!m) return null;
  const seg = m[1];
  if (isLocale(seg)) return seg;
  return null;
}

/**
 * Load posts from a glob {path: module}, attaching locale from path.
 */
export function loadPostsFromGlob(modules: Record<string, Record<string, unknown>>): Post[] {
  const posts: Post[] = [];
  for (const [path, mod] of Object.entries(modules)) {
    const slug = path.split('/').pop()?.replace(/\.(md|mdx)$/, '') || '';
    if (!slug) continue;
    const locale = localeFromPath(path) || DEFAULT_LOCALE;
    posts.push(buildPost(mod as Record<string, unknown>, slug, locale));
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
 * Legacy: get all posts from a glob result, without locale awareness.
 * Used by single-locale fallback pages.
 */
export function getAllPosts(modules: Record<string, unknown>[] | Record<string, Record<string, unknown>>): Post[] {
  const posts: Post[] = [];
  if (Array.isArray(modules)) {
    for (const mod of modules) {
      const slug = (mod as any).file ? ((mod as any).file as string).split('/').pop()?.replace(/\.(md|mdx)$/, '') || '' : '';
      if (!slug) continue;
      posts.push(buildPost(mod as Record<string, unknown>, slug));
    }
  } else {
    for (const [path, mod] of Object.entries(modules)) {
      const slug = path.split('/').pop()?.replace(/\.(md|mdx)$/, '') || '';
      if (!slug) continue;
      posts.push(buildPost(mod as Record<string, unknown>, slug));
    }
  }
  const isProd = import.meta.env.PROD;
  return posts
    .filter((p) => !(isProd && p.draft))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get all posts in a specific locale. If a post exists in the default locale
 * but not in the requested locale, fall back to the default locale's content.
 */
export function getAllPostsInLocale(locale: Locale): Post[] {
  const all = loadPostsFromGlob(
    import.meta.glob('../posts/**/*.md', { eager: true }) as Record<string, Record<string, unknown>>
  );
  const bySlug = new Map<string, Post>();
  for (const p of all) {
    if (p.locale === locale) bySlug.set(p.slug, p);
  }
  for (const p of all) {
    if (p.locale === DEFAULT_LOCALE && !bySlug.has(p.slug)) {
      bySlug.set(p.slug, p);
    }
  }
  return [...bySlug.values()].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlugInLocale(slug: string, locale: Locale): Post | undefined {
  const all = loadPostsFromGlob(
    import.meta.glob('../posts/**/*.md', { eager: true }) as Record<string, Record<string, unknown>>
  );
  const inLocale = all.find(p => p.slug === slug && p.locale === locale);
  if (inLocale) return inLocale;
  return all.find(p => p.slug === slug && p.locale === DEFAULT_LOCALE);
}

export function getPostsByTagInLocale(tag: string, locale: Locale): Post[] {
  return getAllPostsInLocale(locale).filter(p => p.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
}

export function getAllTagsInLocale(locale: Locale): TagCount[] {
  const map = new Map<string, number>();
  for (const p of getAllPostsInLocale(locale)) {
    for (const tag of p.tags) {
      map.set(tag, (map.get(tag) || 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAdjacentPostsInLocale(slug: string, locale: Locale): { prev: Post | null; next: Post | null } {
  const posts = getAllPostsInLocale(locale);
  const idx = posts.findIndex((p) => p.slug === slug);
  return {
    prev: idx < posts.length - 1 ? posts[idx + 1] : null,
    next: idx > 0 ? posts[idx - 1] : null,
  };
}

export function getAllSlugs(): string[] {
  const all = loadPostsFromGlob(
    import.meta.glob('../posts/**/*.md', { eager: true }) as Record<string, Record<string, unknown>>
  );
  return [...new Set(all.map(p => p.slug))];
}

export function getPostBySlug(slug: string, posts: Post[]): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByTag(tag: string, posts: Post[]): Post[] {
  const t = tag.toLowerCase();
  return posts.filter((p) => p.tags.some((pt) => pt.toLowerCase() === t));
}

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

export function getAdjacentPosts(slug: string, posts: Post[]): { prev: Post | null; next: Post | null } {
  const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const idx = sorted.findIndex((p) => p.slug === slug);
  return {
    prev: idx < sorted.length - 1 ? sorted[idx + 1] : null,
    next: idx > 0 ? sorted[idx - 1] : null,
  };
}

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
