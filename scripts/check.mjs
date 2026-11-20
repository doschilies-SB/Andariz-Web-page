import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { visualAssets } from '../src/config.js';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['index.html', 'viajes-en-grupo.html'];
const css = [
  await readFile(path.join(root, 'src/styles.css'), 'utf8'),
  await readFile(path.join(root, 'src/group-travel.css'), 'utf8'),
].join('\n');
const errors = [];
const resources = new Set([
  ...Object.values(visualAssets).filter(Boolean),
  ...[...css.matchAll(/url\(['"]?(\/[^'"\)]+)['"]?\)/g)].map((m) => m[1]),
]);
for (const page of pages) {
  const html = await readFile(path.join(root, page), 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  if (new Set(ids).size !== ids.length) errors.push(`Hay IDs duplicados en ${page}.`);
  for (const m of html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)) {
    if (m[1] === '/' || m[1] === '/viajes-en-grupo') continue;
    resources.add(m[1]);
  }
  for (const m of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const part of m[1].split(',')) resources.add(part.trim().split(' ')[0]);
  }
  for (const match of html.matchAll(/data-dialog="([^"]+)"/g)) {
    if (!ids.includes(match[1])) errors.push(`Falta el diálogo ${match[1]} en ${page}`);
  }
  for (const match of html.matchAll(/<img\b([^>]+)>/g)) {
    if (!/\balt=/.test(match[1])) errors.push(`Imagen sin texto alternativo en ${page}.`);
    if (!/\bwidth=/.test(match[1]) || !/\bheight=/.test(match[1])) errors.push(`Imagen sin dimensiones en ${page}.`);
  }
  if (/Thakhi|lorem ipsum|\bTODO:\s|example\.com/i.test(html)) errors.push(`Hay contenido provisional en ${page}.`);
}
for (const resource of resources) {
  try { if (!(await stat(path.join(root, resource))).isFile()) throw new Error(); }
  catch { errors.push(`Falta el recurso ${resource}`); }
}
for (const file of ['src/main.js','src/group-travel.js','src/config.js','scripts/build.mjs','scripts/serve.mjs']) {
  try { execFileSync(process.execPath, ['--check', path.join(root, file)], { stdio:'pipe' }); }
  catch { errors.push(`Error de sintaxis en ${file}`); }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`OK: ${pages.length} páginas, ${resources.size} recursos locales, diálogos, imágenes y sintaxis JavaScript.`);
