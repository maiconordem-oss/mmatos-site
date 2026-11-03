# Instruções para o Claude neste repositório

Site de advocacia previdenciária do Dr. Maicon Silveira de Matos (OAB/RS 136.221), em Astro, publicado na Cloudflare Pages a cada envio ao ramo `main`.

## Publicar artigos

- Cada artigo é um arquivo `src/content/artigos/<slug>.md`. O slug vira o endereço `/artigos/<slug>`: minúsculas, sem acento, palavras separadas por hífen, focado na busca principal (ex.: `auxilio-acidente-quem-tem-direito`).
- Nunca renomeie ou apague um arquivo já publicado: isso quebra o endereço que o Google já indexou.
- O cabeçalho segue o esquema de `src/content.config.ts`. Sempre preencha `publicado` com a data do dia (AAAA-MM-DD). Ao revisar um artigo antigo, preencha `atualizado`.
- `titulo` com até ~60 caracteres e `descricao` com até ~155, contendo o termo principal de busca.
- Estrutura: parágrafo de abertura que responde direto à dúvida, um `<div class="destaque">` com o resumo, seções `##`, listas e tabelas quando ajudarem. Entre 900 e 1.800 palavras.
- Antes de enviar, rode `npm run build` e confirme que não há erro.

## Regras de conteúdo (obrigatórias)

- Pesquise antes de escrever: valores (salário mínimo, teto), prazos, leis, portarias e decisões mudam. Use fontes oficiais (gov.br/inss, Planalto, STF, STJ, TNU, TRF4) e não invente números, súmulas, temas ou julgados.
- Publicidade da advocacia (Provimento OAB 205/2021 e Código de Ética): conteúdo informativo e educativo. Proibido prometer resultado, garantir benefício, citar valores de honorários, usar tom de captação ("ligue já", "ganhe sua causa"), comparar com outros advogados ou expor casos de clientes.
- Linguagem simples para leigos, sem juridiquês desnecessário. O público costuma ser mais velho e lê no celular.
- Não copie textos de outros sites.
- Não repita temas já publicados; se o tema existe, atualize o artigo existente em vez de criar outro.
