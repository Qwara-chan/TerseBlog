import en from './dictionaries/en.json';
import zhCN from './dictionaries/zh-CN.json';
import zhTW from './dictionaries/zh-TW.json';
import ja from './dictionaries/ja.json';
import { DEFAULT_LOCALE } from './config';
import type { Locale } from '@/config';

const DICTS: Record<Locale, any> = {
  'en': en,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'ja': ja,
};

export type Dict = typeof en;

export function getDictionary(locale: Locale): Dict {
  return (DICTS[locale] || DICTS[DEFAULT_LOCALE]) as Dict;
}

export function getNested(obj: any, key: string): string | undefined {
  const parts = key.split('.');
  let cur: any = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return typeof cur === 'string' ? cur : undefined;
}

export function format(template: string, args?: Record<string, string | number>): string {
  if (!args) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) => String(args[k] ?? `{${k}}`));
}

export function makeT(dict: Dict) {
  return function t(key: string, args?: Record<string, string | number>): string {
    const v = getNested(dict, key);
    if (v === undefined) {
      const fallback = getNested(DICTS[DEFAULT_LOCALE], key);
      return fallback ? format(fallback, args) : key;
    }
    return format(v, args);
  };
}
