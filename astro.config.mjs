import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Eigene Domain: www.ahne.de (GitHub Pages, Custom Domain; DNS bei Ionos, siehe CLAUDE.md)
export default defineConfig({
  site: 'https://www.ahne.de',
  base: '/',
  trailingSlash: 'always',
  // Visitenkarte ist versteckt (5× auf „Marc“) und soll nicht in die Sitemap
  integrations: [sitemap({ filter: (seite) => !/\/(visitenkarte|business-card)\//.test(seite) })],
});
