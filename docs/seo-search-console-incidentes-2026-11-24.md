# Incidentes do Search Console — 24/11/2026

Escopo: leitura dos relatórios da propriedade de domínio `mmatos.com.br`; nenhum dado do Search Console foi alterado. O relatório de indexação informava última atualização em 15/11/2026, então os motivos abaixo refletem rastreamentos históricos, não necessariamente o estado atual do Google.

## Resumo

- Desempenho na Pesquisa Web, 23/08–22/11/2026: 6 cliques, 1,14 mil impressões, CTR média 0,5%, posição média 15.
- Indexação: 13 URLs indexadas e 14 não indexadas, agrupadas em 5 soft 404, 4 URLs com redirecionamento, 1 erro 5xx e 4 URLs rastreadas mas não indexadas.
- Sitemaps: nenhum sitemap consta como enviado no Search Console. O sitemap público é gerado por `src/pages/sitemap.xml.ts` e está referenciado em `public/robots.txt`.
- HTTPS: 9 URLs HTTPS, 0 não HTTPS, atualização do relatório em 23/11/2026.
- Core Web Vitals: dados de campo insuficientes em celular e computador.

## URLs e encaminhamento

### Erro soft 404 — 5 URLs

| URL do Search Console | Leitura e encaminhamento |
|---|---|
| `http://mmatos.com.br/cgi-sys/suspendedpage.cgi` | Caminho legado de hospedagem. A versão HTTPS no domínio canônico respondeu 404 no teste público atual; nenhuma rota desse tipo existe no código. Manter 404 e aguardar nova coleta. A variante HTTP não foi testada isoladamente nesta revisão. |
| `https://mmatos.com.br/cgi-sys/suspendedpage.cgi` | Respondeu 404 no teste público atual, com a página local de não encontrado. Sem mudança de código indicada. |
| `http://www.mmatos.com.br/cgi-sys/suspendedpage.cgi` | Caminho legado no host `www`. Nenhuma rota desse tipo existe no código. A resposta atual do HTTP `www` não foi testada isoladamente; depende de configuração do host/DNS. |
| `https://www.mmatos.com.br/cgi-sys/suspendedpage.cgi` | Caminho legado no host `www`. Em verificação pública anterior, o host `www` entregou página 404 da hospedagem HostGator, não o site canônico. Encaminhar configuração do host para quem administra DNS/Cloudflare/hospedagem. |
| `https://mmatos.com.br/?q={search_term_string}` | O caminho atualmente responde 200 e inclui canonical para a home. A string `search_term_string` não aparece no código atual; origem provável é referência legada, mas não confirmada. Não adicionar bloqueio ou `noindex` na home por causa desse exemplo isolado. |

### Página com redirecionamento — 4 URLs

| URL do Search Console | Leitura e encaminhamento |
|---|---|
| `https://mmatos.com.br/index.html` | Alias da home. O objetivo é uma única URL canônica `https://mmatos.com.br/`; manter redirecionamento. Conferir o destino final em produção após novo rastreamento. |
| `http://mmatos.com.br/` | Variante HTTP da home; HTTPS é a URL canônica. O relatório já a classifica como redirecionada. Manter redirecionamento HTTP→HTTPS. |
| `https://mmatos.com.br/artigos/bpc-loas-pessoa-com-deficiencia.html` | Alias com extensão `.html`; o teste público atual seguiu para `/artigos/bpc-loas-pessoa-com-deficiencia` e respondeu 200. Redirecionamento esperado para a URL sem extensão. |
| `https://mmatos.com.br/artigos/pente-fino-inss-2025.html` | Alias `.html` para URL de artigo sem extensão; o objetivo é a URL canônica sem extensão. Não substituir por conteúdo duplicado. |

### Erro no servidor (5xx) — 1 URL

| URL do Search Console | Leitura e encaminhamento |
|---|---|
| `https://mmatos.com.br/artigos/auxilio-doenca-negado.html` | O Search Console registrou 5xx; último rastreamento em 30/10/2026. O teste público atual seguiu para `/artigos/auxilio-doenca-negado` e respondeu 200. Não há falha reproduzida no momento; monitorar a próxima coleta antes de alterar a página. |

### Rastreada, mas não indexada — 4 URLs

| URL do Search Console | Leitura e encaminhamento |
|---|---|
| `http://www.mmatos.com.br/` | Variante HTTP no host `www`; o site atual declara o domínio apex em canonical. Configuração atual do `www` depende do responsável pelo DNS/Cloudflare/hospedagem. |
| `https://www.mmatos.com.br/` | Variante HTTPS no host `www`; verificação pública anterior levou a página 404 HostGator. O repositório não pode corrigir o roteamento se o host não chega ao Cloudflare Pages. |
| `https://mmatos.com.br/cgi-sys/suspendedpage.cgi?q={search_term_string}` | Caminho legado; a versão sem query respondeu 404 no teste atual. A variante com query também respondeu 404; não há handler ou URL equivalente no código atual. Aguardar recrawl. |
| `https://mmatos.com.br/artigos/revisao-beneficio-inss.html` | Alias `.html`; o teste público atual redirecionou para `/artigos/revisao-beneficio-inss` e respondeu 200. Redirecionamento esperado; acompanhar a URL final no Search Console. |

## Ajuste técnico nesta branch

`src/pages/sitemap.xml.ts` agora omite `lastmod` da home e da listagem, que não têm data de alteração confiável, e só o inclui para artigos com campo `atualizado`. A data `publicado` não é usada como substituto. A ausência de sitemap no painel requer que o responsável envie `https://mmatos.com.br/sitemap.xml` depois do merge e deploy; isso não foi feito aqui.

## Pendências fora do código

1. Configurar `www.mmatos.com.br` no DNS/Cloudflare/hospedagem para chegar ao Cloudflare Pages e redirecionar para `https://mmatos.com.br`. Um ajuste do site não intercepta requisições que ainda terminam na hospedagem antiga.
2. Depois do merge/deploy, o responsável envia o sitemap pelo Search Console e confere se foi lido; não solicitar indexação em massa.
3. Aguardar atualização dos relatórios e validar apenas os grupos cuja resposta foi corrigida; não enviar pedidos de indexação individual neste trabalho.
4. Revisão jurídica/editorial do artigo `regras-aposentadoria-2026.md` continua pendente do advogado, inclusive a afirmação sobre publicação do acórdão da ADI 6309, à luz do Informativo 1220 do STF. Nenhum texto jurídico foi alterado.

## Referências

- Google, diretrizes para sitemap e `lastmod`: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google, requisitos técnicos da Pesquisa: https://developers.google.com/search/docs/essentials/technical
- Google, relatório de cobertura de HTTPS: https://support.google.com/webmasters/answer/7496537
- Search Console: https://search.google.com/search-console

