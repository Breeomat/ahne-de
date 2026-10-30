import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Eigene Domain: www.ahne.de (GitHub Pages, Custom Domain; DNS bei Ionos, siehe CLAUDE.md)
export default defineConfig({
  site: 'https://www.ahne.de',
  base: '/',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
