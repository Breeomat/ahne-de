# ahne-de

Persönliche Seite von Marc Ahne unter https://www.ahne.de. Astro 5, statisch, Hosting über GitHub Pages
(Workflow `.github/workflows/deploy.yml`, baut bei jedem Push auf `main`).

## Inhalte pflegen
- Zweisprachig: Deutsch unter `/`, Englisch unter `/en/`. Umschalter oben rechts springt auf das Gegenstück
  (Seitenpaare in `seiten`, Beschriftungen in `ui`: `src/lib/sprache.ts`). Jede Änderung immer in beiden Sprachen.
- Darstellung: fest „Modern“ (`data-stil="modern"` am `<html>` in `src/layouts/Basis.astro`, kein Umschalter mehr).
  Stil in `src/styles/global.css`: Grundregeln oben (frühere „Oldschool“-Ansicht, Fallback ohne das Attribut),
  darunter Abschnitt „Darstellung Modern“. Startseiten-Abschnitte in `<section class="block">`. Bewegung aus bei
  `prefers-reduced-motion`.
- Drohnenflug (Modern, nur Startseite): `src/components/Drohnenflug.astro` – Flugroute (`route`: Kartenpunkte,
  Zoom, Kurs, Ortsnamen je Sprache) und Anzeige; Karte `public/drohne/stockhausen.svg` aus der Grundkarte von
  stockhausen-online (`python3 scripts/drohnenkarte.py <pfad>/basis.svg`). Hinweis „© OpenStreetMap-Mitwirkende“
  unter dem Kontakt bleibt stehen. Ziel des Flugs ist auf Wunsch Mühlweg 11a (`zuhause`, Haus leuchtet am Ende).
- Tageszeit: Der Drohnenflug zeigt Stockhausen zur echten Uhrzeit (Sonnenstand `src/scripts/tageszeit.ts`, ohne
  externen Dienst): nachts Laternen, Fensterlicht und Sterne, morgens Nebel über dem Bach, abends goldenes Licht.
  Stile in `global.css` (Abschnitt „Tageszeit“). Zum Testen `?zeit=nacht|daemmerung|morgen|tag|abend` anhängen.
- Überraschungen (Startseite): `src/components/Ueberraschungen.astro` – „112“ tippen oder 3× auf die Feuerwehr-Rolle →
  Einsatz (Blaulicht, Drohne zum Feuerwehrhaus); Hobbys mit `ei` in `src/lib/ueber-mich.ts`: Drohne (Looping), Urlaub (Flug über Korsika), Schalke (Tor + Flug übers Stadion), KI-Werkzeuge
  (Terminal, Claude Code/Gemini/Copilot schicken die Drohne einmal übers Dorf nach Hause – Ausflug `dorfrunde`),
  Kochen (Rezept des Tages aus `src/lib/rezepte.ts`, Auswahl im Browser je Tag, „Noch ein Rezept“ blättert).
- Ausflüge der Drohne (`ausfluege` in `Drohnenflug.astro`, zeitgesteuert): Korsika (Urlaub), Veltins-Arena (Schalke,
  gezeichnete Karte `public/drohne/schalke.svg`), England/Deutschland (Sprachwechsel auf der Startseite). Karten Korsika
  und Europa aus Natural Earth: `node scripts/korsikakarte.mjs …` bzw. `node scripts/europakarte.mjs …` (Pfade zu
  topojson-client und world-atlas, siehe Kopf der Skripte).
- Sprachwechsel: auf der Startseite erst Drohnenflug Stockhausen ↔ London (Ereignis `drohne:reise`, Skript in
  `Basis.astro`), dann normaler Seitenwechsel; auf den anderen Seiten direkt.
- „Was steht heute an?“ (KI-Tagesnotiz, Startseite unter der Einleitung, intern „logbuch“): `scripts/logbuch.mjs` läuft im Workflow vor dem Build (auch
  per Zeitplan 23:05 UTC, GitHub startet geplante Läufe oft Stunden später), holt Wetter (Open-Meteo, ohne Schlüssel) und Termine der nächsten 7 Tage
  (stockhausen-online.de/termine.ics) und lässt Claude (`claude-opus-5-5`, strukturierte Ausgabe) eine sachliche Notiz (Wetter + Termine)
  DE/EN schreiben → `src/data/logbuch.json`. Braucht das Repository-Secret `ANTHROPIC_API_KEY`; ohne Secret oder bei
  Fehlern bleibt der Platzhalter `{ "datum": null }` und der Abschnitt wird nicht angezeigt. Besucher senden nichts an eine KI.
- Visitenkarte mit Lebenslauf (versteckt): `/visitenkarte/` bzw. `/en/business-card/`, erreichbar über 5× schnell auf
  „Marc“ in der Überschrift der Startseite. Bewusst schlicht (`Basis` mit `schlicht`, ohne Drohne), druckbar, `noindex`
  und nicht in der Sitemap (`verborgen`, Filter in `astro.config.mjs`). Inhalte in `src/lib/lebenslauf.ts` (Quellen im
  Dateikopf); Seite `src/components/Visitenkarte.astro`. Beruf und Arbeitgeber nur hier, nicht auf der Startseite.
- Name, E-Mail, Anschrift (nur Impressum): `src/lib/site.ts`.
- Texte „über mich“ (Einleitung, Ehrenamt, Hobbys) je Sprache: `src/lib/ueber-mich.ts`. Nichts über Beruf und
  Arbeitgeber (Wunsch des Seiteninhabers) – das steht nur auf der versteckten Visitenkarte.
- Seiten liegen als Komponenten in `src/components/` (Startseite, Impressum, Datenschutz); `src/pages/` und
  `src/pages/en/` binden sie nur mit `sprache` ein. Neue Seite: Komponente + beide Seiten + Eintrag in `seiten`.
- Impressum und Datenschutz: bei neuen externen Diensten (Formulare, Statistik, eingebettete Inhalte)
  die Datenschutzerklärung in beiden Sprachen anpassen; die deutsche Fassung ist maßgeblich.
- Nichts erfinden. Fehlende Angaben als `<span class="fehlt">[fehlt: …]</span>` markieren.
- Später erweiterbar (Blog, Profilseiten): neue Seiten unter `src/pages/`, gleiches Layout `src/layouts/Basis.astro`.

## Technik
- Links immer über `url()` aus `src/lib/site.ts` (Basis-Pfad).
- Farben/Schriften: Tokens in `src/styles/global.css`, Schriften lokal (Fontsource), keine externen Dienste.
- Vor dem Push: `npm run build` muss fehlerfrei laufen.
- Veröffentlichen bricht ohne Meldung ab („veroeffentlichen“ nach 1–2 s, keine Schritte)? Dann erlaubt die Umgebung
  `github-pages` (Settings → Environments → Deployment branches) den Zweig `main` nicht.

## Domain
Die Seite läuft unter https://www.ahne.de (`astro.config.mjs`: `site`, `base: '/'`; `public/CNAME` = `www.ahne.de`).
GitHub → Settings → Pages → Source „GitHub Actions“, Custom domain `www.ahne.de`, „Enforce HTTPS“ an.
DNS bei Ionos: `www` als CNAME auf `breeomat.github.io`; für `ahne.de` (ohne www) A-Records 185.199.108.153,
185.199.109.153, 185.199.110.153, 185.199.111.153 und AAAA 2606:50c0:8000::153, 2606:50c0:8001::153,
2606:50c0:8002::153, 2606:50c0:8003::153. MX- und sonstige Mail-Einträge (marc@ahne.de) NICHT ändern.
