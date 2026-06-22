import Fuse from 'fuse.js';
import { siteConfig } from '@/config';
import { prefixFor, DEFAULT_LOCALE, isLocale, type Locale } from '@/i18n/config';

interface SearchDoc {
  title: string;
  description: string;
  tags: string;
  content: string;
  slug: string;
  date: string;
}

interface SearchResult {
  item: SearchDoc;
  refIndex: number;
  score?: number;
}

/**
 * Resolve the current locale from URL (preferred) or localStorage.
 * Falls back to default locale. Used at runtime to pick the right index file.
 */
function resolveLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  if (siteConfig.i18n.enabled) {
    const seg = location.pathname.split('/').filter(Boolean)[0];
    if (seg && isLocale(seg)) return seg;
    try {
      const stored = localStorage.getItem('astro-blog-locale');
      if (stored && isLocale(stored)) return stored;
    } catch { /* ignore */ }
  }
  return DEFAULT_LOCALE;
}

export class SearchEngine {
  private fuse: Fuse<SearchDoc> | null = null;
  private index: SearchDoc[] = [];

  /**
   * Load search index from JSON file.
   */
  async init(): Promise<void> {
    try {
      const url = siteConfig.i18n.enabled
        ? '/' + prefixFor(resolveLocale()) + '/search-index.json'
        : '/search-index.json';
      const res = await fetch(url);
      if (!res.ok) {
        console.error('Search index returned', res.status, 'at', url);
        return;
      }
      const data = await res.json();
      if (!Array.isArray(data)) {
        console.error('Search index is not an array at', url);
        return;
      }
      this.index = data;
      this.fuse = new Fuse(this.index, {
        keys: [
          { name: 'title', weight: 2 },
          { name: 'tags', weight: 1.5 },
          { name: 'description', weight: 1 },
          { name: 'content', weight: 0.5 },
        ],
        threshold: 0.4,
        includeScore: true,
        minMatchCharLength: 2,
      });
    } catch (err) {
      console.error('Failed to load search index:', err);
    }
  }

  /**
   * Search with debounced input.
   */
  search(query: string, limit = 10): SearchResult[] {
    if (!this.fuse || !query.trim()) return [];
    return this.fuse.search(query.trim(), { limit });
  }

  /**
   * Highlight matching terms in text.
   */
  highlight(text: string, query: string): string {
    if (!query.trim()) return this.escapeHtml(text);
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return this.escapeHtml(text).replace(regex, '<mark>$1</mark>');
  }

  private escapeHtml(str: string): string {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }
}

export const searchEngine = new SearchEngine();
