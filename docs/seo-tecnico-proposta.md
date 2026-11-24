# Proposta inicial de SEO técnico

Branch: seo/tecnico-inicial-2026-11-24  
Base: main. Avaliação de código feita em 24/11/2026.

Esta branch registra proposta para revisão. Não altera conteúdo jurídico/editorial, o Perfil da Empresa, nem publica no site.

## Achados do código

- public/robots.txt permite rastreamento e aponta para https://mmatos.com.br/sitemap.xml.
- src/layouts/Base.astro gera canonical por página, title, description e robots; também oferece noindex para a página 404.
- src/pages/sitemap.xml.ts gera o sitemap a partir de getArtigos(), que exclui rascunhos.
- A home inclui JSON-LD de LegalService com PostalAddress parcial: apenas região e país, sem logradouro ou cidade. Não acrescentar nem inferir endereço sem confirmação.

## Propostas técnicas priorizadas

1. **Sitemap — prioridade alta:** remover lastmod da home e da listagem de artigos, pois ambas recebem a data do build, mesmo sem mudança de conteúdo. Manter lastmod por artigo somente quando a data corresponder à última alteração substancial; atualizar o campo atualizado durante revisões editoriais.
2. **Dados estruturados locais — prioridade alta, dependente do advogado:** omitir o PostalAddress parcial até confirmar endereço físico elegível e divulgável. Depois, avaliar endereço completo alinhado com a página e o Perfil da Empresa. O Google documenta endereço físico como propriedade exigida para elegibilidade de recursos de negócio local; os dados devem ser reais.
3. **Produção — prioridade alta:** verificar resposta, conteúdo e tipo MIME de robots.txt e sitemap.xml após implantação; conferir redirects HTTP/HTTPS e www, além das canonicals em amostra de URLs.
4. **Medição — prioridade alta:** com acesso autorizado ao Search Console, conferir sitemap lido, indexação, canonicals selecionados pelo Google, exclusões e desempenho por consulta/página.
5. **Manutenção — contínua:** em alterações substanciais, manter atualizada a data editorial e validar que o sitemap reflita a data correta.

## Pendência editorial (não alterada)

O artigo src/content/artigos/regras-aposentadoria-2026.md precisa de revisão do advogado sobre a afirmação referente à publicação do acórdão da ADI 6309 e sobre tom/atualidade, considerando o Informativo 1220 do STF: https://www.stf.jus.br/arquivo/informativo/documento/informativo1220.htm . Esta é uma pendência para conferência, não uma conclusão de erro ou de efeito jurídico. Não editar nem publicar antes de aprovação.

## Dependências

- Acesso autorizado ao Search Console e confirmação da propriedade.
- Advogado confirmar cidade, modelo de atendimento, endereço elegível e dados divulgáveis.
- Revisão jurídica/ética do artigo citado e de qualquer atualização editorial.
- Perfil da Empresa: confirmar se existe, titularidade, elegibilidade e autorização antes de qualquer alteração.

## Referências oficiais do Google

- Sitemaps e precisão de lastmod: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Dados estruturados de negócio local: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Requisitos técnicos da Pesquisa: https://developers.google.com/search/docs/essentials/technical
