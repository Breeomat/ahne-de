# ahne-de

Persönliche Seite von Marc Ahne unter https://www.ahne.de. Astro 5, statisch, Hosting über GitHub Pages
(Workflow `.github/workflows/deploy.yml`, baut bei jedem Push auf `main`).

## Inhalte pflegen
- Name, Untertitel, E-Mail, Anschrift (nur Impressum) und Links: `src/lib/site.ts`.
- Text „über mich“: `src/pages/index.astro`.
- Impressum und Datenschutz: `src/pages/impressum/`, `src/pages/datenschutz/`. Bei neuen externen Diensten
  (Formulare, Statistik, eingebettete Inhalte) die Datenschutzerklärung anpassen.
- Nichts erfinden. Fehlende Angaben als `<span class="fehlt">[fehlt: …]</span>` markieren.
- Später erweiterbar (Blog, Profilseiten): neue Seiten unter `src/pages/`, gleiches Layout `src/layouts/Basis.astro`.

## Technik
- Links immer über `url()` aus `src/lib/site.ts` (Basis-Pfad).
- Farben/Schriften: Tokens in `src/styles/global.css`, Schriften lokal (Fontsource), keine externen Dienste.
- Vor dem Push: `npm run build` muss fehlerfrei laufen.

## Domain (noch nicht umgestellt)
Derzeit Vorschau unter https://breeomat.github.io/ahne-de/ (`astro.config.mjs`: `site: 'https://breeomat.github.io'`, `base: '/ahne-de/'`).
Bei der Umstellung: `site: 'https://www.ahne.de'`, `base: '/'`, `public/CNAME` mit `www.ahne.de` anlegen,
Sitemap-Zeile in `public/robots.txt` prüfen.
GitHub → Settings → Pages → Source „GitHub Actions“, Custom domain `www.ahne.de`, „Enforce HTTPS“ an.
DNS bei Ionos: `www` als CNAME auf `breeomat.github.io`; für `ahne.de` (ohne www) A-Records 185.199.108.153,
185.199.109.153, 185.199.110.153, 185.199.111.153 und AAAA 2606:50c0:8000::153, 2606:50c0:8001::153,
2606:50c0:8002::153, 2606:50c0:8003::153. MX- und sonstige Mail-Einträge (marc@ahne.de) NICHT ändern.
