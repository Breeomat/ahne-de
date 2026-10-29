# ahne-de

Persönliche Seite von Marc Ahne unter https://www.ahne.de. Astro 5, statisch, Hosting über GitHub Pages
(Workflow `.github/workflows/deploy.yml`, baut bei jedem Push auf `main`).

## Inhalte pflegen
- Zweisprachig: Deutsch unter `/`, Englisch unter `/en/`. Umschalter oben rechts springt auf das Gegenstück
  (Seitenpaare in `seiten`, Beschriftungen in `ui`: `src/lib/sprache.ts`). Jede Änderung immer in beiden Sprachen.
- Darstellung „Oldschool“ (Standard) / „Modern“: Umschalter oben links, Wahl in localStorage (`stil`), gesetzt als
  `data-stil="modern"` am `<html>`. Modern-Stil komplett in `src/styles/global.css` (Abschnitt „Darstellung Modern“);
  Abschnitte der Startseite stehen dafür in `<section class="block">`. Bewegung aus bei `prefers-reduced-motion`.
- Drohnenflug (Modern, nur Startseite): `src/components/Drohnenflug.astro` – Flugroute (`route`: Kartenpunkte,
  Zoom, Kurs, Ortsnamen je Sprache) und Anzeige; Karte `public/drohne/stockhausen.svg` aus der Grundkarte von
  stockhausen-online (`python3 scripts/drohnenkarte.py <pfad>/basis.svg`). Hinweis „© OpenStreetMap-Mitwirkende“
  unter dem Kontakt bleibt stehen. Ziel des Flugs ist auf Wunsch Mühlweg 11a (`zuhause`, Haus leuchtet am Ende).
- Name, E-Mail, Anschrift (nur Impressum): `src/lib/site.ts`.
- Texte „über mich“ (Einleitung, Werdegang, Ehrenamt, Hobbys) je Sprache: `src/lib/ueber-mich.ts`.
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

## Domain (noch nicht umgestellt)
Derzeit Vorschau unter https://breeomat.github.io/ahne-de/ (`astro.config.mjs`: `site: 'https://breeomat.github.io'`, `base: '/ahne-de/'`).
Bei der Umstellung: `site: 'https://www.ahne.de'`, `base: '/'`, `public/CNAME` mit `www.ahne.de` anlegen,
Sitemap-Zeile in `public/robots.txt` prüfen.
GitHub → Settings → Pages → Source „GitHub Actions“, Custom domain `www.ahne.de`, „Enforce HTTPS“ an.
DNS bei Ionos: `www` als CNAME auf `breeomat.github.io`; für `ahne.de` (ohne www) A-Records 185.199.108.153,
185.199.109.153, 185.199.110.153, 185.199.111.153 und AAAA 2606:50c0:8000::153, 2606:50c0:8001::153,
2606:50c0:8002::153, 2606:50c0:8003::153. MX- und sonstige Mail-Einträge (marc@ahne.de) NICHT ändern.
