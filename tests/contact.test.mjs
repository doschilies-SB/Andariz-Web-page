import test from 'node:test';
import assert from 'node:assert/strict';
import { buildWhatsAppUrl } from '../src/config.js';

test('La consulta mantiene tildes, saltos y caracteres reservados en un único mensaje', () => {
  const url = new URL(buildWhatsAppUrl({name:'María & José',interest:'egipto',message:'¿Fechas? 2 personas + un amigo\nGracias #viaje'}));
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/5493537327836');
  assert.equal([...url.searchParams].length, 1);
  assert.match(url.searchParams.get('text'), /María & José/);
  assert.match(url.searchParams.get('text'), /Egipto en grupo/);
  assert.match(url.searchParams.get('text'), /¿Fechas\? 2 personas \+ un amigo\nGracias #viaje/);
  assert.equal(url.hash, '');
});

test('Una consulta general no agrega un nombre vacío y tolera un interés desconocido', () => {
  const url = new URL(buildWhatsAppUrl({name:'   ',interest:'no-existe',message:'  '}));
  assert.match(url.searchParams.get('text'), /^Hola, Emi\./);
  assert.doesNotMatch(url.searchParams.get('text'), /undefined|Soy\s*\./);
  assert.match(url.searchParams.get('text'), /conversar sobre los viajes de Andariz/);
});
