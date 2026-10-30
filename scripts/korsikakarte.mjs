#!/usr/bin/env node
// Karte für den Urlaubsflug über Korsika (Überraschung „Urlaub“) erzeugen.
// Quelle: Natural Earth 1:10m (gemeinfrei), über das npm-Paket world-atlas (countries-10m.json) und topojson-client.
//
//   node scripts/korsikakarte.mjs <pfad>/topojson-client.js <pfad>/countries-10m.json
//
// Schreibt public/drohne/korsika.svg und src/lib/korsika-rahmen.json. Nur nötig, wenn sich die Karte ändern soll.
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';

const [clientPfad, atlasPfad] = process.argv.slice(2);
const topojson = createRequire(import.meta.url)(clientPfad);
const welt = JSON.parse(readFileSync(atlasPfad, 'utf8'));
const laender = topojson.feature(welt, welt.objects.countries);
const frankreich = laender.features.find((f) => f.properties.name === 'France');

// Ausschnitt: Korsika mit etwas Meer drumherum
const rahmen = { west: 8.35, sued: 41.25, ost: 9.75, nord: 43.15, breite: 1000 };
const kx = Math.cos((((rahmen.sued + rahmen.nord) / 2) * Math.PI) / 180);
rahmen.hoehe = Math.round((rahmen.breite * (rahmen.nord - rahmen.sued)) / ((rahmen.ost - rahmen.west) * kx));
const xy = ([lon, lat]) => [((lon - rahmen.west) / (rahmen.ost - rahmen.west)) * rahmen.breite, ((rahmen.nord - lat) / (rahmen.nord - rahmen.sued)) * rahmen.hoehe];

const polygone = frankreich.geometry.coordinates.filter((poly) =>
  poly[0].every(([lon, lat]) => lon > rahmen.west && lon < rahmen.ost && lat > rahmen.sued && lat < rahmen.nord),
);
const d = polygone
  .map((poly) => poly.map((ring) => 'M' + ring.map((p) => xy(p).map((v) => v.toFixed(1)).join(',')).join(' ') + 'Z').join(''))
  .join('');

// Orte (bekannte Koordinaten)
const orte = [
  ['Bastia', 9.4508, 42.6977], ['Calvi', 8.7575, 42.5675], ['Ajaccio', 8.7386, 41.9192], ['Bonifacio', 9.1594, 41.3874],
  ['Porto-Vecchio', 9.2795, 41.5911], ['Corte', 9.15, 42.3061], ['Saint-Florent', 9.3031, 42.6811],
];
const cinto = xy([8.9453, 42.3794]);
const S = 4000; // Meer weit über den Rand hinaus, damit beim Drehen keine Kanten zu sehen sind
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${rahmen.breite} ${rahmen.hoehe}" aria-hidden="true"><style>
.ko-meer{fill:#11507e}.ko-welle{fill:none;stroke:#2a6d96;stroke-width:1;stroke-dasharray:6 10;opacity:.5}
.ko-strand{fill:none;stroke:#f0dca8;stroke-width:4;stroke-linejoin:round;opacity:.85}.ko-land{fill:#3d7a4a;stroke:#d9c88f;stroke-width:1}
.ko-berg{fill:#6b7f5a;stroke:#e9e3cf;stroke-width:1.2}.ko-ort{fill:#ffd76a;stroke:#3a2a0a;stroke-width:1.5}
.ko-name{font:700 15px system-ui,-apple-system,'Segoe UI',sans-serif;fill:#fff3c8;paint-order:stroke;stroke:#0b3150;stroke-width:4;stroke-linejoin:round;letter-spacing:.03em}
.ko-gipfel{font:600 12px system-ui,-apple-system,'Segoe UI',sans-serif;fill:#e9e3cf;paint-order:stroke;stroke:#2f5b3c;stroke-width:3}
</style><rect class="ko-meer" x="${-S}" y="${-S}" width="${rahmen.breite + 2 * S}" height="${rahmen.hoehe + 2 * S}"/>
${Array.from({ length: 40 }, (_, i) => `<path class="ko-welle" d="M-200 ${i * 55 + 20} q50 -10 100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0"/>`).join('')}
<path class="ko-strand" d="${d}"/><path class="ko-land" d="${d}"/>
<path class="ko-berg" d="M${cinto[0] - 14},${cinto[1] + 10} L${cinto[0]},${cinto[1] - 14} L${cinto[0] + 14},${cinto[1] + 10}Z"/><text class="ko-gipfel" x="${cinto[0] + 18}" y="${cinto[1] + 4}">Monte Cinto 2706 m</text>
${orte.map(([n, lon, lat]) => { const [x, y] = xy([lon, lat]); return `<circle class="ko-ort" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6"/><text class="ko-name" x="${(x + 10).toFixed(1)}" y="${(y + 5).toFixed(1)}">${n}</text>`; }).join('')}
</svg>`;
writeFileSync(new URL('../public/drohne/korsika.svg', import.meta.url), svg);
writeFileSync(new URL('../src/lib/korsika-rahmen.json', import.meta.url), JSON.stringify({ ...rahmen, orte: Object.fromEntries(orte.map(([n, lon, lat]) => [n, xy([lon, lat]).map((v) => +v.toFixed(1))])) }, null, 1));
console.log(`korsika.svg: ${polygone.length} Flächen, ${Math.round(svg.length / 1024)} KB, Rahmen ${rahmen.breite}×${rahmen.hoehe}`);
