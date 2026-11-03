import type { APIRoute } from 'astro';
import { getArtigos } from '../lib/artigos';
import { SITE } from '../lib/site';

export const GET: APIRoute = async () => {
  const artigos = await getArtigos();
  const hoje = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: `${SITE.url}/`, lastmod: hoje },
    { loc: `${SITE.url}/artigos`, lastmod: hoje },
    ...artigos.map((a) => ({
      loc: `${SITE.url}/artigos/${a.id}`,
      lastmod: (a.data.atualizado ?? a.data.publicado)?.toISOString().slice(0, 10),
    })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
