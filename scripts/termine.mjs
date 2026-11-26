#!/usr/bin/env node
// Termine für die „Dorfzeitung“ im Haus-Männchen (/haus/) – läuft in GitHub Actions vor dem Build (deploy.yml).
// Holt die Termine der nächsten 14 Tage aus dem Kalender von stockhausen-online (termine.ics) nach
// src/data/termine.json. Bei Fehlern bleibt die Datei unverändert (Platzhalter: keine Termine).
//
//   node scripts/termine.mjs
import { writeFileSync } from 'node:fs';

const ZIEL = new URL('../src/data/termine.json', import.meta.url);
const tag = (d) => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin' }).format(d).replaceAll('-', '');

try {
  const antwort = await fetch('https://stockhausen-online.de/termine.ics');
  if (!antwort.ok) throw new Error(`HTTP ${antwort.status}`);
  const ics = (await antwort.text()).replace(/\r?\n[ \t]/g, '');
  const von = tag(new Date());
  const bis = tag(new Date(Date.now() + 14 * 86400000));
  const termine = ics.split('BEGIN:VEVENT').slice(1).map((ev) => {
    const feld = (n) => ev.match(new RegExp(`^${n}[^:]*:(.*)$`, 'm'))?.[1]?.replace(/\\([,;])/g, '$1').replace(/\\n/gi, ' ').trim();
    const start = feld('DTSTART') ?? '';
    return { tag: start.slice(0, 8), titel: feld('SUMMARY'), ort: feld('LOCATION') ?? '' };
  }).filter((t) => t.titel && t.tag >= von && t.tag <= bis)
    .sort((a, b) => a.tag.localeCompare(b.tag))
    .slice(0, 8)
    .map((t) => ({ ...t, tag: `${t.tag.slice(0, 4)}-${t.tag.slice(4, 6)}-${t.tag.slice(6, 8)}` }));
  writeFileSync(ZIEL, JSON.stringify({ erzeugt: new Date().toISOString(), termine }) + '\n');
  console.log(`Termine: ${termine.length} geschrieben.`);
} catch (fehler) {
  console.error('Termine: Fehler –', fehler.message);
}
