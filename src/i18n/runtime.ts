import en from './dictionaries/en.json';
import zhCN from './dictionaries/zh-CN.json';
import zhTW from './dictionaries/zh-TW.json';
import ja from './dictionaries/ja.json';
import { DEFAULT_LOCALE, LOCALES, PREFIX_LOCALE, prefixFor, isLocale, type Locale } from './config';

const DICTS: Record<string, any> = { en, 'zh-CN': zhCN, 'zh-TW': zhTW, ja };

export function getDict(locale: Locale): any {
  return DICTS[locale] || DICTS[DEFAULT_LOCALE];
}

function getNested(obj: any, key: string): string | undefined {
  const parts = key.split('.');
  let cur: any = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return typeof cur === 'string' ? cur : undefined;
}

function format(template: string, args?: Record<string, string | number>): string {
  if (!args) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) => String(args[k] ?? `{${k}}`));
}

export function tFor(locale: Locale, key: string, args?: Record<string, string | number>): string {
  const dict = getDict(locale);
  let v = getNested(dict, key);
  if (v === undefined) v = getNested(DICTS[DEFAULT_LOCALE], key);
  if (v === undefined) return key;
  return format(v, args);
}

export function applyI18n(locale: Locale) {
  document.documentElement.setAttribute('data-locale', locale);
  document.documentElement.setAttribute('lang', locale);

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const argsAttr = el.getAttribute('data-i18n-args');
    let args: Record<string, string | number> | undefined;
    if (argsAttr) {
      try { args = JSON.parse(argsAttr); } catch { /* ignore */ }
    }
    el.textContent = tFor(locale, key, args);
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-attr]').forEach((el) => {
    const spec = el.getAttribute('data-i18n-attr');
    if (!spec) return;
    spec.split(';').forEach((pair) => {
      const [attr, key] = pair.split(':').map(s => s.trim());
      if (attr && key) el.setAttribute(attr, tFor(locale, key));
    });
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (key) el.innerHTML = tFor(locale, key);
  });

  document.documentElement.dispatchEvent(new CustomEvent('locale-change', { detail: locale }));
}

export function getStoredLocale(): Locale | null {
  try {
    const v = localStorage.getItem('astro-blog-locale');
    if (v && isLocale(v)) return v;
  } catch { /* ignore */ }
  return null;
}

export function setStoredLocale(locale: Locale) {
  try {
    localStorage.setItem('astro-blog-locale', locale);
    document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  } catch { /* ignore */ }
}

export function switchToLocale(target: Locale, currentPath: string) {
  if (!isLocale(target)) return;
  const seg = currentPath.split('/').filter(Boolean)[0];
  let rest = currentPath;
  if (seg && PREFIX_LOCALE[seg]) {
    rest = '/' + currentPath.split('/').filter(Boolean).slice(1).join('/');
  }
  setStoredLocale(target);
  window.location.href = '/' + prefixFor(target) + (rest === '/' ? '' : rest);
}

export { LOCALES, PREFIX_LOCALE, prefixFor, isLocale, DEFAULT_LOCALE };
