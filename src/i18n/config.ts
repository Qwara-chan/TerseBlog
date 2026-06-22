import { siteConfig, type Locale } from '@/config';

export const PREFIX_LOCALE: Record<string, Locale> = Object.fromEntries(
  Object.entries(siteConfig.i18n.prefixMap).map(([k, v]) => [v, k as Locale])
) as Record<string, Locale>;

export const LOCALES = siteConfig.i18n.locales;
export const DEFAULT_LOCALE: Locale = siteConfig.i18n.defaultLocale;

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function prefixFor(locale: Locale): string {
  return siteConfig.i18n.prefixMap[locale];
}

export function localeFromPrefix(prefix: string | undefined | null): Locale | null {
  if (!prefix) return null;
  return PREFIX_LOCALE[prefix] ?? null;
}

export function stripLocale(pathname: string): { locale: Locale | null; rest: string } {
  const seg = pathname.split('/').filter(Boolean)[0];
  if (seg && PREFIX_LOCALE[seg]) {
    return { locale: PREFIX_LOCALE[seg], rest: '/' + pathname.split('/').filter(Boolean).slice(1).join('/') };
  }
  return { locale: null, rest: pathname };
}

export function localizedPath(locale: Locale, path: string): string {
  const prefix = prefixFor(locale);
  let p = path.startsWith('/') ? path : '/' + path;
  if (p === '/') p = '';
  return '/' + prefix + p;
}

export function detectLocaleFromAcceptLanguage(header: string | null, cookie: string | null | undefined): Locale {
  if (cookie && isLocale(cookie)) return cookie;
  if (!header) return DEFAULT_LOCALE;
  const tags = header
    .split(',')
    .map(p => {
      const [tag, q = 'q=1'] = p.trim().split(';');
      const m = q.match(/q=([0-9.]+)/);
      return { tag: tag.toLowerCase(), q: m ? parseFloat(m[1]) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of tags) {
    const base = tag.split('-')[0];
    if (isLocale(base)) return base as Locale;
    if (tag === 'zh-cn' || tag === 'zh-hans' || tag === 'zh') {
      if (isLocale('zh-CN')) return 'zh-CN';
    }
    if (tag === 'zh-tw' || tag === 'zh-hant' || tag === 'zh-hk') {
      if (isLocale('zh-TW')) return 'zh-TW';
    }
  }
  return DEFAULT_LOCALE;
}

export const LOCALE_LABELS: Record<Locale, string> = {
  'en': 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'ja': '日本語',
};

export const LOCALE_SHORT: Record<Locale, string> = {
  'en': 'EN',
  'zh-CN': '中',
  'zh-TW': '繁',
  'ja': 'JA',
};
