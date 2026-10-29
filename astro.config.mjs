import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Übergang: Vorschau unter https://breeomat.github.io/ahne-de/
// Nach der DNS-Umstellung bei Ionos: site 'https://www.ahne.de', base '/' (siehe CLAUDE.md)
export default defineConfig({
  site: 'https://breeomat.github.io',
  base: '/ahne-de/',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
