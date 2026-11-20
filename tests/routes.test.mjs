import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { publicFile } from '../scripts/serve.mjs';

test('La ruta raíz y /viajes-en-grupo resuelven sus HTML correspondientes', () => {
  assert.equal(path.basename(publicFile('/')), 'index.html');
  assert.equal(path.basename(publicFile('/viajes-en-grupo')), 'viajes-en-grupo.html');
  assert.equal(path.basename(publicFile('/viajes-en-grupo/')), 'viajes-en-grupo.html');
  assert.equal(path.basename(publicFile('/viajes-en-grupo.html')), 'viajes-en-grupo.html');
});

test('Las rutas inexistentes o fuera del sitio devuelven null', () => {
  assert.equal(publicFile('/otra-cosa'), null);
  assert.equal(publicFile('/../package.json'), null);
  assert.equal(publicFile('/scripts/serve.mjs'), null);
});
