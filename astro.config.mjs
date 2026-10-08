import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Cambia esta URL cuando tengas el dominio real.
// De ella dependen el sitemap, el feed RSS y las vistas previas al compartir (Open Graph).
export default defineConfig({
  site: 'https://hub-marco.marco-portugal-business.workers.dev',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
