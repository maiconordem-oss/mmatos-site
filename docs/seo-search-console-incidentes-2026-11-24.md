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
| `http://mmatos.com.br/cgi-sys/suspendedpage.cgi` | O navegador atualizou para HTTPS e a URL final respondeu 404 com a página 404 do site. Nenhuma rota CGI existe no projeto; esse é o retorno esperado para URL inexistente. |
| `https://mmatos.com.br/cgi-sys/suspendedpage.cgi` | Respondeu 404 no teste público atual, com a página local de não encontrado. Sem mudança de código indicada. |
| `http://www.mmatos.com.br/cgi-sys/suspendedpage.cgi` | Após ativação da regra Cloudflare `www`→apex, chega a `https://mmatos.com.br/cgi-sys/suspendedpage.cgi` e retorna 404 legítimo. |
| `https://www.mmatos.com.br/cgi-sys/suspendedpage.cgi` | Após ativação da regra Cloudflare `www`→apex, chega ao mesmo caminho no apex e retorna 404 legítimo. O redirect não transforma o CGI em uma página existente. |
| `https://mmatos.com.br/?q={search_term_string}` | O caminho atualmente responde 200 e inclui canonical para a home. A string `search_term_string` não aparece no código atual; origem provável é referência legada, mas não confirmada. Não adicionar bloqueio ou `noindex` na home por causa desse exemplo isolado. |

### Página com redirecionamento — 4 URLs

| URL do Search Console | Leitura e encaminhamento |
|---|---|
| `https://mmatos.com.br/index.html` | Navegador chegou à URL canônica `https://mmatos.com.br/`, que respondeu 200. Alias de home esperado; não há mudança de código indicada. |
| `http://mmatos.com.br/` | Navegador chegou a `https://mmatos.com.br/`, que respondeu 200. Manter HTTPS como URL canônica. |
| `https://mmatos.com.br/artigos/bpc-loas-pessoa-com-deficiencia.html` | Navegador chegou a `/artigos/bpc-loas-pessoa-com-deficiencia`, que respondeu 200. Alias `.html` esperado para a rota sem extensão. |
| `https://mmatos.com.br/artigos/pente-fino-inss-2025.html` | Navegador chegou a `/artigos/pente-fino-inss-2025`, que respondeu 200. Alias `.html` esperado para a rota sem extensão. |

### Erro no servidor (5xx) — 1 URL

| URL do Search Console | Leitura e encaminhamento |
|---|---|
| `https://mmatos.com.br/artigos/auxilio-doenca-negado.html` | O Search Console registrou 5xx no último rastreamento de 30/10/2026. Em 24/11, navegador chegou a `/artigos/auxilio-doenca-negado`, que respondeu 200. Não reproduzido; monitorar a próxima coleta antes de alterar código ou conteúdo. |

### Rastreada, mas não indexada — 4 URLs

| URL do Search Console | Leitura e encaminhamento |
|---|---|
| `http://www.mmatos.com.br/` | Agora chega a `https://mmatos.com.br/` e retorna 200. A configuração Cloudflare confirma redirect 301 por hostname. |
| `https://www.mmatos.com.br/` | Agora chega a `https://mmatos.com.br/` e retorna 200; o host `www` deixa de exibir o erro 404 da hospedagem antiga. |
| `https://mmatos.com.br/cgi-sys/suspendedpage.cgi?q={search_term_string}` | Respondeu 404 com a página 404 local. Não há handler CGI no projeto; URL inexistente esperada. |
| `https://mmatos.com.br/artigos/revisao-beneficio-inss.html` | Navegador chegou a `/artigos/revisao-beneficio-inss`, que respondeu 200. Alias `.html` esperado. A classificação “rastreada, não indexada” exige nova leitura após atualização do relatório; não editar conteúdo jurídico neste trabalho. |

## Ajuste técnico nesta branch

`src/pages/sitemap.xml.ts` agora omite `lastmod` da home e da listagem, que não têm data de alteração confiável, e só o inclui para artigos com campo `atualizado`. A data `publicado` não é usada como substituto. A ausência de sitemap no painel requer que o responsável envie `https://mmatos.com.br/sitemap.xml` depois do merge e deploy; isso não foi feito aqui.

## Correções e próximos passos

1. **`www` — regra aplicada pelo responsável no Cloudflare:** expressão `http.host eq "www.mmatos.com.br"`, destino `https://mmatos.com.br` + caminho, status 301 e query preservada. A configuração foi conferida na API do Cloudflare e o navegador confirmou host final, conteúdo e query. A regra intercepta o A `www` proxied para `69.6.249.67`; não adicionei DNS, domínio Pages ou regra.
2. **URLs controladas pelo site:** os CGI no apex continuam como 404 legítimo; a URL `?q={search_term_string}` mostra a home; aliases `.html`/`index.html` chegam às canônicas; o 5xx histórico do artigo retorna 200 hoje. Esses comportamentos são esperados e não pedem novo ajuste de código. A regra `www` apenas consolida o host e não corrige os CGI inexistentes no apex, não remove aliases esperados nem reabre o 5xx antigo.
3. O ajuste de `lastmod` do sitemap já está na branch. Depois de merge/deploy, o responsável envia `https://mmatos.com.br/sitemap.xml` no Search Console e aguarda o novo rastreamento; não solicitar indexação em massa.
4. Revisão jurídica/editorial do artigo `regras-aposentadoria-2026.md` continua pendente do advogado, inclusive a afirmação sobre publicação do acórdão da ADI 6309 à luz do Informativo 1220 do STF. Nenhum texto jurídico foi alterado.

## Referências

- Google, diretrizes para sitemap e `lastmod`: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google, requisitos técnicos da Pesquisa: https://developers.google.com/search/docs/essentials/technical
- Google, relatório de cobertura de HTTPS: https://support.google.com/webmasters/answer/7496537
- Cloudflare, domínios customizados Pages: https://developers.cloudflare.com/pages/configuration/custom-domains/
- Cloudflare, redirecionar `www` para o apex: https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-www-to-root/
- Cloudflare, redirecionar um host para outro: https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-different-hostname/
- Cloudflare Pages, pular build pelo prefixo `[CI Skip]`: https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/
- Search Console: https://search.google.com/search-console

