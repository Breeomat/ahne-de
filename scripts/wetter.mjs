#!/usr/bin/env node
// Wetter für den Drohnenflug („Wetterfenster“) – läuft in GitHub Actions vor dem Build (deploy.yml), nicht beim Besuch.
// Holt die stündliche Vorhersage für Stockhausen (Open-Meteo, ohne Schlüssel) für heute und die nächsten zwei Tage
// und speichert sie in src/data/wetter.json. Der Browser wählt daraus die aktuelle Stunde (Drohnenflug.astro).
// Bei Fehlern bleibt die Datei unverändert; ohne passende Stunde zeigt die Karte kein Wetter.
//
//   node scripts/wetter.mjs
import { writeFileSync } from 'node:fs';

const ZIEL = new URL('../src/data/wetter.json', import.meta.url);
const ORT = { lat: 50.5615, lon: 9.4445 };

try {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.search = new URLSearchParams({
    latitude: ORT.lat, longitude: ORT.lon, timezone: 'Europe/Berlin', forecast_days: '3',
    hourly: 'weather_code,temperature_2m,wind_speed_10m',
  });
  const antwort = await fetch(url);
  if (!antwort.ok) throw new Error(`HTTP ${antwort.status}`);
  const h = (await antwort.json()).hourly;
  const daten = {
    start: h.time[0], // Ortszeit Europe/Berlin, z. B. 2026-11-01T00:00
    code: h.weather_code,
    temp: h.temperature_2m.map((t) => Math.round(t)),
    wind: h.wind_speed_10m.map((w) => Math.round(w)),
    erzeugt: new Date().toISOString(),
  };
  writeFileSync(ZIEL, JSON.stringify(daten) + '\n');
  console.log(`Wetter ab ${daten.start} geschrieben (${daten.code.length} Stunden).`);
} catch (fehler) {
  // fehlendes Wetter darf die Veröffentlichung nicht verhindern
  console.error('Wetter: Fehler –', fehler.message);
}
