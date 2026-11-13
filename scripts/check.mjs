import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { visualAssets } from '../src/config.js';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const css = await readFile(path.join(root, 'src/styles.css'), 'utf8');
const errors = [];
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
if (new Set(ids).size !== ids.length) errors.push('Hay IDs duplicados.');
const resources = new Set([
  ...Object.values(visualAssets).filter(Boolean),
  ...[...html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)].map((m) => m[1]),
  ...[...html.matchAll(/srcset="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((part) => part.trim().split(' ')[0])),
  ...[...css.matchAll(/url\(['"]?(\/[^'"\)]+)['"]?\)/g)].map((m) => m[1]),
]);
for (const resource of resources) {
  try { if (!(await stat(path.join(root, resource))).isFile()) throw new Error(); }
  catch { errors.push(`Falta el recurso ${resource}`); }
}
for (const match of html.matchAll(/data-dialog="([^"]+)"/g)) {
  if (!ids.includes(match[1])) errors.push(`Falta el diálogo ${match[1]}`);
}
for (const match of html.matchAll(/<img\b([^>]+)>/g)) {
  if (!/\balt=/.test(match[1])) errors.push('Imagen sin texto alternativo.');
  if (!/\bwidth=/.test(match[1]) || !/\bheight=/.test(match[1])) errors.push('Imagen sin dimensiones.');
}
for (const file of ['src/main.js','src/config.js','scripts/build.mjs','scripts/serve.mjs']) {
  try { execFileSync(process.execPath, ['--check', path.join(root, file)], { stdio:'pipe' }); }
  catch { errors.push(`Error de sintaxis en ${file}`); }
}
if (/Thakhi|lorem ipsum|\bTODO:\s|example\.com/i.test(html)) errors.push('Hay contenido provisional en la página.');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`OK: ${resources.size} recursos locales, diálogos, imágenes y sintaxis JavaScript.`);
