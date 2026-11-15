import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeMunicipalities, serializeMunicipalities, importMunicipalities } from '../scripts/import-municipalities.mjs';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const municipalityFixture = Array.from({ length: 290 }, (_, i) => ({
  id: String(i + 1).padStart(4, '0'),
  title: 'Testkommun ' + String(i + 1).padStart(3, '0'),
  region_type: 'K',
}));

test('kräver exakt 290 unika kommuner, utan statistikposter eller regionsposter', () => {
  const items = normalizeMunicipalities({ values: [
    ...municipalityFixture,
    { id: '0180', title: 'Testkommun 180', region_type: 'L' },
    { id: '0000', title: 'Riket', region_type: 'R' },
  ] });
  assert.equal(items.length, 290);
  assert.deepEqual(Object.keys(items[0]).sort(), ['code', 'name']);
});

test('avbryter partiella importer – skriv aldrig ett ofullständigt register', () => {
  assert.throws(() => normalizeMunicipalities({ values: municipalityFixture.slice(0, 2) }), /290 kommuner/);
  assert.throws(() => normalizeMunicipalities({ data: municipalityFixture }), /values/);
});

test('genererad data innehåller inga påhittade kommunwebbplatser', () => {
  const output = serializeMunicipalities(normalizeMunicipalities({ values: municipalityFixture }));
  assert.ok(output.includes('window.OOJ_MUNICIPALITIES'));
  assert.equal(output.includes('"url"'), false);
});

test('hämtar flera sidor och skriver endast när datan är komplett', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'ooj-'));
  try {
    const target = join(dir, 'municipalities.js');
    let count = 0;
    const fetcher = async () => {
      count++;
      const values = count === 1 ? municipalityFixture.slice(0, 100) : municipalityFixture.slice(100);
      return { ok: true, json: async () => ({
        values,
        next_url: count === 1 ? 'https://api.kolada.se/v3/municipality?page=2' : null,
      }) };
    };
    const result = await importMunicipalities({ fetcher, output: target });
    assert.equal(result.count, 290);
    assert.equal(count, 2);
    assert.match(await readFile(target, 'utf8'), /Testkommun 290/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
