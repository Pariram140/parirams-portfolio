import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pariram140.github.io',
  base: '/parirams-portfolio',
  trailingSlash: 'always',
  integrations: [sitemap()],
});

