import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const production = process.argv.includes('--production');
const root = path.join(projectRoot, production ? 'dist' : '');
const portArg = process.argv.indexOf('--port');
const port = Number(process.env.PORT || (portArg >= 0 ? process.argv[portArg + 1] : 5173));
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.webp':'image/webp', '.png':'image/png', '.jpg':'image/jpeg', '.woff':'font/woff', '.woff2':'font/woff2', '.ttf':'font/ttf', '.otf':'font/otf', '.json':'application/json', '.txt':'text/plain; charset=utf-8' };

const routeMap = new Map([
  ['/', '/index.html'],
  ['/viajes-en-grupo', '/viajes-en-grupo.html'],
]);

export function publicFile(pathname) {
  let decoded;
  try { decoded = decodeURIComponent(pathname); } catch { return null; }
  if (decoded.includes('\0') || decoded.includes('\\')) return null;
  const normalized = decoded.length > 1 && decoded.endsWith('/') ? decoded.slice(0, -1) : decoded;
  const target = routeMap.get(normalized) ?? normalized;
  if (!/^\/(?:index\.html|viajes-en-grupo\.html|404\.html|robots\.txt|(?:src|assets)\/[^\0]+)$/.test(target)) return null;
  const full = path.resolve(root, `.${target}`);
  if (!full.startsWith(root + path.sep)) return null;
  return full;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = http.createServer(async (req, res) => {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
    try {
      const file = publicFile(new URL(req.url, 'http://localhost').pathname);
      if (!file || !(await stat(file)).isFile()) throw new Error('not found');
      const data = await readFile(file);
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache', 'X-Content-Type-Options':'nosniff' });
      res.end(req.method === 'HEAD' ? undefined : data);
    } catch {
      const data = await readFile(path.join(root, '404.html')).catch(() => 'No encontrado');
      res.writeHead(404, { 'Content-Type':'text/html; charset=utf-8' });
      res.end(req.method === 'HEAD' ? undefined : data);
    }
  });
  server.listen(port, '0.0.0.0', () => console.log(`Andariz disponible en http://localhost:${port}`));
}
