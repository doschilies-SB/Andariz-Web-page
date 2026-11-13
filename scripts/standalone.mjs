import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const destination = path.resolve(process.argv[2] || path.join(root, 'Andariz-Home-preview.html'));
const mime = { '.svg':'image/svg+xml', '.webp':'image/webp', '.woff':'font/woff', '.woff2':'font/woff2', '.otf':'font/otf', '.ttf':'font/ttf', '.png':'image/png', '.jpg':'image/jpeg' };
const cache = new Map();
async function dataUrl(url) {
  if (!cache.has(url)) {
    const data = await readFile(path.join(root, url));
    cache.set(url, `data:${mime[path.extname(url)]};base64,${data.toString('base64')}`);
  }
  return cache.get(url);
}
let html = await readFile(path.join(root, 'index.html'), 'utf8');
let css = await readFile(path.join(root, 'src/styles.css'), 'utf8');
for (const m of [...css.matchAll(/url\(['"]?(\/[^'"\)]+)['"]?\)/g)]) css = css.replace(m[0], `url('${await dataUrl(m[1])}')`);
html = html.replace(/\s*<link rel="preload"[^>]+>/g, '').replace(/\s*srcset="[^"]*"/g, '');
for (const m of [...html.matchAll(/(src|href)="(\/assets\/[^"?]+)"/g)]) html = html.replace(m[0], `${m[1]}="${await dataUrl(m[2])}"`);
html = html.replace('<link rel="stylesheet" href="/src/styles.css">', `<style>${css}</style>`);
html = html.replace('<script src="/src/main.js" type="module"></script>', '');
html = html.replace(/<meta property="og:image"[^>]+>/, '');
let config = (await readFile(path.join(root, 'src/config.js'), 'utf8')).replace(/export /g, '');
for (const m of [...config.matchAll(/(['"])(\/assets\/[^'"]+)\1/g)]) config = config.replace(m[0], JSON.stringify(await dataUrl(m[2])));
const main = (await readFile(path.join(root, 'src/main.js'), 'utf8')).replace(/^import[^\n]+\n/, '');
html = html.replace('</body>', `<script>\n(() => {\n${config}\n${main}\n})();\n</script>\n</body>`);
await writeFile(destination, html);
console.log(`Vista previa autónoma creada: ${path.basename(destination)}`);
