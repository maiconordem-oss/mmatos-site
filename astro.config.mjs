import { defineConfig } from 'astro/config';
import rehypeTabelas from './src/lib/rehype-tabelas.mjs';

export default defineConfig({
  site: 'https://mmatos.com.br',
  // Gera /artigos/nome.html, que a Cloudflare serve como /artigos/nome (mesmos endereços de antes)
  trailingSlash: 'never',
  build: { format: 'file' },
  markdown: { rehypePlugins: [rehypeTabelas] },
});
