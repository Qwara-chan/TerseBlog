import { siteConfig } from '@/config';

export function formatDate(date: string, locale?: string): string {
  const loc = locale || siteConfig.language || 'zh-CN';
  try {
    const d = new Date(date);
    return d.toLocaleDateString(loc, { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return date;
  }
}

export function estimateReadingTime(content: string): number {
  const cnSpeed = siteConfig.content.readingSpeed.cn;
  const enSpeed = siteConfig.content.readingSpeed.en;
  const cjk = (content.match(/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g) || []).length;
  const words = content.replace(/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(cjk / cnSpeed + words / enSpeed));
}

export function isExternalUrl(href: string): boolean {
  try {
    const url = new URL(href);
    const siteUrl = new URL(siteConfig.site);
    return url.hostname !== siteUrl.hostname;
  } catch {
    return false;
  }
}

export function groupPostsByYear(posts: { date: string }[]): Map<number, typeof posts> {
  const map = new Map<number, typeof posts>();
  for (const p of posts) {
    const year = new Date(p.date).getFullYear();
    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push(p);
  }
  return new Map([...map.entries()].sort((a, b) => b[0] - a[0]));
}
