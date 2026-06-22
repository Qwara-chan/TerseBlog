import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const configPath = resolve(import.meta.dirname, '../src/config.ts');
let content = readFileSync(configPath, 'utf-8');

const target = process.argv[2];
const pattern = /(\n\s+i18n:\s*\{\n\s+enabled:\s*)(true|false)/;

if (target === 'on') {
  content = content.replace(pattern, '$1true');
  console.log('i18n: enabled');
} else if (target === 'off') {
  content = content.replace(pattern, '$1false');
  console.log('i18n: disabled');
} else {
  const match = content.match(pattern);
  console.log('Usage: npm run i18n:on  |  npm run i18n:off');
  console.log('Current: ' + (match?.[2] ?? 'unknown'));
  process.exit(1);
}

writeFileSync(configPath, content);
