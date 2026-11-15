#!/usr/bin/env node
/**
 * Importera den officiella kommunförteckningen från Koladas öppna API v3.
 * Inga statistikvärden hämtas. Endast kommunnamn och kommunkoder.
 *
 * Kör: node scripts/import-municipalities.mjs
 * Kör tester: node --test tests/*.test.mjs
 *
 * Viktigt: Denna import innehåller INTE hemsidesadresser. Vi lägger aldrig
 * till gissade kommunala domäner. URL:er i OOJ är ett separat verifieringssteg.
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const SOURCE = 'https://api.kolada.se/v3/municipality';
export const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
export const DESTINATION = path.join(ROOT, 'js/ooj-municipalities.js');

export function normalizeMunicipalities(payload) {
  const raw = payload?.values;
  if (!Array.isArray(raw)) throw new Error('Oväntat svar från Kolada: saknar values[]');
  const all = raw
    .filter(item => typeof item?.id === 'string' && /^\d{4}$/.test(item.id)
      && typeof item.title === 'string' && item.title.trim())
    .filter(item => (item.region_type ?? item.municipality_type ?? item.type ?? 'K') === 'K')
    .map(item => ({ code: item.id, name: item.title.trim() }));
  const unique = [...new Map(all.map(item => [item.code, item])).values()];
  unique.sort((a, b) => a.name.localeCompare(b.name, 'sv'));
  if (unique.length !== 290) {
    throw new Error('Importen avbröts: förväntade 290 kommuner, fick ' + unique.length +
      '. Kontrollera API-svar/paginering eller ändrade registeruppgifter.');
  }
  if (unique.some(x => /^(?:riket|alla kommuner)/i.test(x.name))) {
    throw new Error('Importen innehåller sammanställningsposter, inte bara kommuner.');
  }
  return unique;
}

export function serializeMunicipalities(data) {
  return [
    '/* GENERERAD FIL – redigera inte manuellt.',
    ' * Källa: Kolada (RKA), https://api.kolada.se/v3/municipality',
    ' * Namn och kommunkoder. INGA verifierade webbadresser ingår.',
    ' */',
    'window.OOJ_MUNICIPALITIES = ' + JSON.stringify(data, null, 2) + ';',
    '',
  ].join('\n');
}

export async function importMunicipalities({ fetcher = fetch, output = DESTINATION } = {}) {
  let url = SOURCE;
  const gathered = [];
  const visited = new Set();
  for (let page = 0; url && page < 20; page++) {
    if (visited.has(url)) throw new Error('Cirkulär paginering i API-svaret.');
    if (!url.startsWith('https://api.kolada.se/v3/')) {
      throw new Error('Oväntad pagineringsadress – avbruten import.');
    }
    visited.add(url);
    const response = await fetcher(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Kolada svarade med HTTP ' + response.status);
    const json = await response.json();
    if (!Array.isArray(json.values)) throw new Error('Kolada skickade inget values[]');
    gathered.push(...json.values);
    const next = json.next_url ?? json.next_page ?? null;
    url = next ? new URL(next, url).href : null;
  }
  if (url) throw new Error('För många sidor från Kolada – avbruten import.');
  const items = normalizeMunicipalities({ values: gathered });
  const result = serializeMunicipalities(items);
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, result, 'utf8');
  return { count: items.length, output, source: SOURCE };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  importMunicipalities().then(result => {
    console.log('Importerade ' + result.count + ' kommuner från Kolada till ' + result.output);
    console.log('Nästa steg: verifiera kommunernas webbplatser separat.');
  }).catch(err => { console.error(err.message); process.exitCode = 1; });
}
