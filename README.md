# mmatos.com.br

Site do escritório Maicon Matos Advocacia, feito com [Astro](https://astro.build) e publicado na Cloudflare Pages.

## Como publicar um artigo novo

1. Crie um arquivo em `src/content/artigos/`, com o nome que vai virar o endereço.
   Exemplo: `src/content/artigos/auxilio-acidente.md` vira `mmatos.com.br/artigos/auxilio-acidente`.
2. Copie o cabeçalho de um artigo existente e preencha (veja os campos abaixo).
3. Escreva o texto em Markdown, abaixo do cabeçalho.
4. Envie para o GitHub. A Cloudflare publica sozinha em cerca de 1 minuto.

A página inicial, a lista de artigos, os "artigos relacionados" e o `sitemap.xml` são atualizados automaticamente.

## Campos do cabeçalho

```yaml
---
titulo: "Título que aparece no Google (até ~60 caracteres)"
tituloH1: "Primeira parte do título grande:"
tituloDestaque: "parte em dourado"
descricao: "Resumo que aparece no Google (até ~155 caracteres)."
categoria: "Auxílio-Doença"
publicado: 2026-11-03
atualizado: 2026-11-10        # opcional
ctaTitulo: "Pergunta da caixa de contato no fim do artigo"   # opcional
ctaTexto: "Texto da caixa de contato"                          # opcional
whatsappTexto: "Mensagem que já vem escrita no WhatsApp"       # opcional
rascunho: true                # opcional: true = não aparece no site
---
```

## Blocos especiais no texto

```html
<div class="destaque">Resumo em itálico, com barra dourada à esquerda.</div>
<div class="alerta">Aviso importante, com moldura.</div>
<div class="destaque-urgente"><strong>Novidade:</strong> moldura dourada.</div>
```

Tabelas em Markdown viram blocos empilhados no celular automaticamente.

## Rodar no computador

```bash
npm install
npm run dev      # abre em http://localhost:4321
npm run build    # gera o site final na pasta dist/
```

## Configuração na Cloudflare Pages

- Framework preset: **Astro**
- Build command: `npm run build`
- Build output directory: `dist`
- Versão do Node: definida no arquivo `.node-version` (22)
