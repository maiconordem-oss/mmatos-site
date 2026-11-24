# Proposta inicial de SEO técnico

Branch: seo/tecnico-inicial-2026-11-24  
Base: main. Avaliação de código feita em 24/11/2026.

Esta branch registra proposta e ajustes técnicos para revisão. Não altera conteúdo jurídico/editorial, o Perfil da Empresa, nem publica no site.

## Achados do código

- public/robots.txt permite rastreamento e aponta para https://mmatos.com.br/sitemap.xml.
- src/layouts/Base.astro gera canonical por página, title, description e robots; também oferece noindex para a página 404.
- src/pages/sitemap.xml.ts gera o sitemap a partir de getArtigos(), que exclui rascunhos.
- A home inclui JSON-LD de LegalService com PostalAddress parcial: apenas região e país, sem logradouro ou cidade. Não acrescentar nem inferir endereço sem confirmação.

## Propostas técnicas priorizadas

1. **Sitemap — ajuste aplicado nesta branch:** removido lastmod automático da home e da listagem; artigos recebem lastmod apenas quando o frontmatter contém `atualizado`. A data de publicação deixou de ser tratada como data de alteração. O ajuste ainda depende de merge e deploy para refletir em produção.
2. **Dados estruturados locais — prioridade alta, dependente do advogado:** omitir o PostalAddress parcial até confirmar endereço físico elegível e divulgável. Depois, avaliar endereço completo alinhado com a página e o Perfil da Empresa. O Google documenta endereço físico como propriedade exigida para elegibilidade de recursos de negócio local; os dados devem ser reais.
3. **Produção — prioridade alta:** uma regra Cloudflare `www`→apex foi aplicada pelo responsável em 24/11/2026 e verificada por leitura. A regra retorna 301, preserva caminho e query, e limita-se ao hostname `www.mmatos.com.br`. Conferir respostas novamente após nova coleta do Search Console. O envio do sitemap continua pendente depois do deploy.
4. **Medição — prioridade alta:** Search Console acessível e propriedade confirmada. Em 24/11/2026, o relatório de Páginas ainda mostrava atualização de 15/11/2026; revisar os exemplos depois de nova coleta, sem solicitar indexação em massa.
5. **Manutenção — contínua:** em alterações substanciais, manter atualizada a data editorial e validar que o sitemap reflita a data correta.

## Pendência editorial (não alterada)

O artigo src/content/artigos/regras-aposentadoria-2026.md precisa de revisão do advogado sobre a afirmação referente à publicação do acórdão da ADI 6309 e sobre tom/atualidade, considerando o Informativo 1220 do STF: https://www.stf.jus.br/arquivo/informativo/documento/informativo1220.htm . Esta é uma pendência para conferência, não uma conclusão de erro ou de efeito jurídico. Não editar nem publicar antes de aprovação.

## Dependências

- Merge e deploy da branch antes de validar o sitemap atualizado no Search Console.
- Responsável pela propriedade enviar `https://mmatos.com.br/sitemap.xml` no Search Console após o deploy.
- Se futuramente optar por servir `www` diretamente pelo Pages em vez do redirect no edge, primeiro associar `www.mmatos.com.br` como domínio customizado ao projeto e só depois alterar o DNS para CNAME `mmatos-site.pages.dev` (a documentação Cloudflare avisa que CNAME manual sem associação prévia pode falhar).
- Advogado confirmar cidade, modelo de atendimento, endereço elegível e dados divulgáveis.
- Revisão jurídica/ética do artigo citado e de qualquer atualização editorial.
- Perfil da Empresa: confirmar se existe, titularidade, elegibilidade e autorização antes de qualquer alteração.

## Referências oficiais do Google

- Sitemaps e precisão de lastmod: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Dados estruturados de negócio local: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Requisitos técnicos da Pesquisa: https://developers.google.com/search/docs/essentials/technical

