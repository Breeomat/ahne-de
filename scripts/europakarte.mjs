#!/usr/bin/env node
// Karte für den Sprachwechsel-Flug Stockhausen ↔ London (Drohnenflug, Ausflüge „england“/„deutschland“).
// Quelle: Natural Earth 1:50m (gemeinfrei), über world-atlas (countries-50m.json) und topojson-client.
//
//   node scripts/europakarte.mjs <pfad>/topojson-client.js <pfad>/countries-50m.json
//
// Schreibt public/drohne/europa.svg und src/lib/europa-rahmen.json.
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';

const [clientPfad, atlasPfad] = process.argv.slice(2);
const topojson = createRequire(import.meta.url)(clientPfad);
const welt = JSON.parse(readFileSync(atlasPfad, 'utf8'));
const laender = topojson.feature(welt, welt.objects.countries).features;

const rahmen = { west: -7, sued: 46.5, ost: 16.5, nord: 56.5, breite: 1000 };
const kx = Math.cos((((rahmen.sued + rahmen.nord) / 2) * Math.PI) / 180);
rahmen.hoehe = Math.round((rahmen.breite * (rahmen.nord - rahmen.sued)) / ((rahmen.ost - rahmen.west) * kx));
const xy = ([lon, lat]) => [((lon - rahmen.west) / (rahmen.ost - rahmen.west)) * rahmen.breite, ((rahmen.nord - lat) / (rahmen.nord - rahmen.sued)) * rahmen.hoehe];
const imRahmen = (ring) => ring.some(([lon, lat]) => lon > rahmen.west - 3 && lon < rahmen.ost + 3 && lat > rahmen.sued - 3 && lat < rahmen.nord + 3);
const pfad = (f) => {
  const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  return polys.filter((p) => imRahmen(p[0])).map((p) => p.map((r) => 'M' + r.map((q) => xy(q).map((v) => v.toFixed(1)).join(',')).join(' ') + 'Z').join('')).join('');
};
const hervor = { Germany: 'ek-de', 'United Kingdom': 'ek-uk' };
const flaechen = laender.filter((f) => f.geometry).map((f) => [f.properties.name, pfad(f)]).filter(([, d]) => d);

const orte = [['Stockhausen', 9.4445, 50.5615], ['London', -0.1276, 51.5072]];
const namen = [['DEUTSCHLAND', 10.2, 51.9], ['ENGLAND', -1.9, 52.9], ['FRANKREICH', 2.6, 47.6]];
const S = 3000;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${rahmen.breite} ${rahmen.hoehe}" aria-hidden="true"><style>
.ek-meer{fill:#0c2c48}.ek-land{fill:#1f3a35;stroke:#4f7f74;stroke-width:.8}.ek-de{fill:#3a4a2a;stroke:#ffd76a;stroke-width:1.6}
.ek-uk{fill:#2e3f5c;stroke:#ffd76a;stroke-width:1.6}.ek-ort{fill:#ffd76a;stroke:#2a1e05;stroke-width:1.5}
.ek-name{font:700 13px system-ui,-apple-system,'Segoe UI',sans-serif;fill:#fff3c8;paint-order:stroke;stroke:#0c2c48;stroke-width:4;stroke-linejoin:round}
.ek-land-name{font:800 18px system-ui,-apple-system,'Segoe UI',sans-serif;fill:rgb(255 243 200 / .55);letter-spacing:.25em}
</style><rect class="ek-meer" x="${-S}" y="${-S}" width="${rahmen.breite + 2 * S}" height="${rahmen.hoehe + 2 * S}"/>
${flaechen.map(([n, d]) => `<path class="${hervor[n] ?? 'ek-land'}" d="${d}"/>`).join('')}
${namen.map(([n, lon, lat]) => { const [x, y] = xy([lon, lat]); return `<text class="ek-land-name" x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="middle">${n}</text>`; }).join('')}
${orte.map(([n, lon, lat]) => { const [x, y] = xy([lon, lat]); return `<circle class="ek-ort" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5"/><text class="ek-name" x="${(x + 9).toFixed(1)}" y="${(y + 5).toFixed(1)}">${n}</text>`; }).join('')}
</svg>`;
writeFileSync(new URL('../public/drohne/europa.svg', import.meta.url), svg);
writeFileSync(new URL('../src/lib/europa-rahmen.json', import.meta.url), JSON.stringify({ ...rahmen, orte: Object.fromEntries(orte.map(([n, lon, lat]) => [n, xy([lon, lat]).map((v) => +v.toFixed(1))])) }, null, 1));
console.log(`europa.svg: ${flaechen.length} Länder, ${Math.round(svg.length / 1024)} KB, Rahmen ${rahmen.breite}×${rahmen.hoehe}`);
