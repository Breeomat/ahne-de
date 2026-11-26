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
  Leistung: Die Karte wird nur gelegentlich neu gezeichnet (mit Rand `RAND`, bei Bedarf und 220 ms nach dem Scrollen);
  dazwischen bewegen CSS-Transformationen das fertige Bild. Keine Dauer-Animationen auf der Karte (kosten ständig Rechenzeit).
- Tageszeit: Der Drohnenflug zeigt Stockhausen zur echten Uhrzeit (Sonnenstand `src/scripts/tageszeit.ts`, ohne
  externen Dienst): nachts Laternen, Fensterlicht und Sterne, morgens Nebel über dem Bach, abends goldenes Licht.
  Stile in `global.css` (Abschnitt „Tageszeit“). Zum Testen `?zeit=nacht|daemmerung|morgen|tag|abend` anhängen.
- Überraschungen (Startseite): `src/components/Ueberraschungen.astro` – „112“ tippen oder 3× auf die Feuerwehr-Rolle →
  Einsatz (Blaulicht, Drohne zum Feuerwehrhaus); Hobbys mit `ei` in `src/lib/ueber-mich.ts`: Drohne (Looping), Urlaub (Flug über Korsika), Schalke (Tor + Flug übers Stadion), KI-Werkzeuge
  (Terminal, Claude Code/Gemini/Copilot schicken die Drohne einmal übers Dorf nach Hause – Ausflug `dorfrunde`),
  Kochen (Rezept des Tages aus `src/lib/rezepte.ts`, Auswahl im Browser je Tag, „Noch ein Rezept“ blättert).
- Wetterfenster: Der Drohnenflug zeigt das echte Wetter der aktuellen Stunde (Regen, Schnee mit weißen Dächern, Nebel,
  Wolken, Gewitter; Anzeige TMP/WX). `scripts/wetter.mjs` holt im Workflow vor dem Build die stündliche Vorhersage
  (Open-Meteo, 3 Tage) nach `src/data/wetter.json`; Platzhalter `{ "start": null }` = kein Wetter. Stile in `global.css`
  (Abschnitt „Wetterfenster“). Testen mit `?wetter=klar|wolkig|bedeckt|nebel|niesel|regen|schnee|gewitter`.
- „Brummi“ (Haustier-Drohne, Startseite): `src/components/Brummi.astro` – folgt Maus/Finger, landet bei Langeweile auf
  Überschriften, fliegt mit leerem Akku zur Ladestation (unten links, „Brummis Ladestation“), schläft nachts (Tageszeit des
  Drohnenflugs), antwortet beim Antippen, hält still wenn die Maus nahe kommt (damit man ihn anklicken kann), sagt
  alle 40–70 s von selbst etwas (`plaudern`). Ohne Bewegung bei `prefers-reduced-motion`.
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
  Im Ausdruck/PDF unten Ort, Datum und Unterschriftslinie (`.vk__unterschrift`); die Unterschrift selbst NICHT
  veröffentlichen (Bild nur lokal beim Seiteninhaber).
- Browserspiel „Brummis Paketdienst“ (versteckt): `/spiel/` bzw. `/en/game/`, `src/components/Spiel.astro`. Pakete an
  echten Orten abholen/liefern (Koordinaten aus `dorfkarte.ts` von stockhausen-online), 2 Minuten, Akku → Ladestation am
  Sportplatz; Wind (Stärke/Richtung) und Regen aus `src/data/wetter.json`. `noindex`, nicht in der Sitemap, speichert nichts.
  Test: `?wetter=regen&wind=30&richtung=270`. Zugang: 3× schnell auf „Brummis Ladestation“ tippen (`Brummi.astro`), Brummi gibt ab und zu den Hinweis.
- „Haus-Männchen“ (öffentlich, Link im Seitenfuß): `/haus/` bzw. `/en/house/`, `src/components/Haus.astro`. Eigener
  Entwurf (keine Nachbildung eines bestehenden Spiels). Dreistöckiges Haus im Querschnitt, Pixel-Grafik (Spielkoordinaten 320×240, gezeichnet
  in halben Pixeln auf 640×480, angezeigt 1280×960 ohne Glättung; Mauer, Dach und Wandeinrichtung einmal vorgezeichnet
  (`statisch()`), Spielfeld breiter als die Textspalte; Schrift und Sprechblasen scharf auf der großen Leinwand, Größe passt sich der Bildschirmbreite an).
  Männchen mit Bedürfnissen lebt seinen Tag (kochen, essen, lesen, fernsehen, basteln, duschen, schlafen; Schlafenszeit
  22:30–6:30 Uhr), Sprechblasen (Wetter, Gradzahl, Jahreszeit/Fest, Laune – keine Termine, Wunsch des Seiteninhabers). Mitmachen: Gegenstände anklicken, Essen hinstellen, Licht, Anklopfen, Brief (Antwort aus
  festen Sätzen, nichts wird gesendet/gespeichert), Dorfzeitung. Echtes Wetter (`src/data/wetter.json`), Sonnenstand
  und Uhrzeit des Besuchers, Blick aufs Dorf aus den Fenstern, Termine der nächsten 14 Tage aus stockhausen-online
  (`scripts/termine.mjs` im Workflow → `src/data/termine.json`, Platzhalter `{ "termine": [] }`).
  Jahreszeiten und Feiertage nach dem echten Datum (`FEST`, `JAHRESZEIT`): Baum im Garten blüht/grün/bunt/kahl,
  fallende Blätter im Herbst, Lichterkette am Dach (1. Advent bis 6. Januar), Adventskranz mit passender Kerzenzahl,
  Weihnachtsbaum statt Stehlampe (24.12.–6.1., Geschenke 24.–26.12.), Nikolausstiefel, Silvester-Feuerwerk, Ostern
  (Karfreitag–Ostermontag: Eier im Garten, Osterstrauß), Halloween-Kürbis (25.–31.10.).
  Katze „Minka“: läuft selbst durchs Haus (auch Treppen), schläft auf Sofa/Bett/Kisten, sitzt auf Fensterbänken,
  frisst am Napf im Flur (wartet miauend, wenn er leer ist – dann füttert sie das Männchen), wird vom Männchen gestreichelt.
  Knöpfe „Katze füttern“, „Wollknäuel werfen“; Klick auf die Katze streichelt sie (Herzchen).
  Besuch (tagsüber alle paar Minuten, `besuchUpdate`): Postbote, Nachbar mit Hund (14–17:30 Uhr oft zum Kaffee am
  Esstisch, Hund liegt unter dem Tisch, Minka flüchtet ins Obergeschoss), Schornsteinfeger (danach auf dem Dach), bei
  Schnee schippt der Nachbar den Weg. Gespräche als Sprechblasen.
  Besuch auch per Knopf (Postbote, Nachbar, Kaffeebesuch, Schornsteinfeger; „Schnee schippen“ nur bei Schnee).
  Extras: Computer → auf dem Bildschirm läuft eine eigene kleine Animation (Küstenstadt im Sonnenuntergang, Sportwagen;
  bewusst keine Inhalte aus echten Spielen wie GTA – urheberrechtlich geschützt); Fernrohr → echter Sternenhimmel über
  Stockhausen zur aktuellen Uhrzeit (helle Sterne mit Koordinaten, Sternbilder, Mond mit Phase, vereinfachte Bahn);
  Plattenspieler → Rock/Walzer/Disco, das Männchen tanzt passend. Ton (Knopf, standardmäßig aus): im Browser erzeugt
  (Web Audio, kein Dienst): Schritte, Miauen, Fauchen, Klingel, Klopfen, Regen, Donner, Kaminknistern, Feuerwerk,
  eigene kleine Melodien am Plattenspieler.
  Test: `?wetter=…` wie beim Drohnenflug, `?zeit=nacht|morgen|tag|abend`, `?datum=JJJJ-MM-TT`,
  `?besuch=post|nachbar|kaffee|feger|schippen` (Besuch nach 3 s).
- Logo: goldener Stempel „MA“ mit „Stockhausen · Vogelsberg“ im Ring, `src/components/Logo.astro` (Startseite neben dem
  Namen). Browser-Symbol vereinfacht ohne Ringtext: `public/favicon.svg`; `favicon-32.png`, `favicon-192.png` und
  `apple-touch-icon.png` (dunkler Grund) daraus per Playwright erzeugt.
- Wärmepumpe (/waermepumpe/, Link im Seitenfuß): kommt NICHT aus dem Build, sondern vom PC des Seiteninhabers.
  `scripts/waermepumpe/waermepumpe_hochladen.py` liegt dort neben `waermepumpen_dashboard.py` und
  `waermepumpen_auswertung.py` (Ordner `logs` mit den Logdateien und `waermepumpen_strom_verlauf.csv`) und läuft nachts
  um 1 Uhr per Aufgabenplanung (`waermepumpe_hochladen.bat`). Es schreibt in EINEM Commit per GitHub-API (Token in
  `github_token.txt` auf dem PC, nur Contents read/write) EINE Seite `public/waermepumpe/index.html`: die Dashboard-Ansicht
  (Seite `SEITE` aus `waermepumpen_dashboard.py`) im Design von ahne.de (`ahne_stil()`: dunkel, Gold, Schrift Inter aus
  `public/schriften/`). Alle Abfragen werden vorab über `Handler.do_GET` des Dashboards berechnet und eingebettet.
  Nur die 24 Stunden des Vortags (endet um Mitternacht), keine Zeitraum-Auswahl, kein Strom & COP, keine „Auswertung je Tag,
  Woche, Monat“, keine „Alle Messwerte“, kein aktueller
  Betriebszustand (Verdichter an/aus, Betriebsart) – Wunsch des Seiteninhabers. Oben zwei gezeichnete Außengeräte
  (`WP_ANIMATION`, `WP_GERAET`) als Zeitraffer des Vortags (24 h in ca. 48 s, Regler, Pause): Ventilator dreht, wenn der
  Verdichter zu der Uhrzeit lief, Leuchtfarbe nach Betriebsart – Wiedergabe, keine Live-Anzeige. Ohne Dashboard-Skript
  nur die Tagesauswertung des Vortags (`waermepumpen_auswertung.py`) als index.html. `noindex`, nicht in der
  Sitemap, keine IP-Adressen. Die Dateien nicht von Hand bearbeiten, sie werden jede Nacht überschrieben.
- „Wärmepumpen live“ (Seitenfuß, `Basis.astro`): Link auf das lokale Dashboard http://192.168.178.95:8080/ – nur im
  Heimnetz erreichbar (Wunsch des Seiteninhabers).
- Name, E-Mail, Anschrift (Impressum und Visitenkarte), Telefon (nur Visitenkarte): `src/lib/site.ts`.
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
