import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const artigos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artigos' }),
  schema: z.object({
    // Título da aba e do Google (até ~60 caracteres é o ideal)
    titulo: z.string(),
    // Título grande da página: primeira parte em branco, "tituloDestaque" em dourado e itálico
    tituloH1: z.string(),
    tituloDestaque: z.string().default(''),
    // Resumo para o Google (até ~155 caracteres)
    descricao: z.string(),
    categoria: z.string(),
    publicado: z.coerce.date().optional(),
    atualizado: z.coerce.date().optional(),
    // Desempate na ordem dos artigos sem data
    ordem: z.number().optional(),
    ctaTitulo: z.string().default('Tem dúvidas sobre o seu benefício?'),
    ctaTexto: z
      .string()
      .default('Cada caso tem particularidades. Envie um resumo da sua situação para uma análise individual.'),
    whatsappTexto: z.string().default('Olá! Gostaria de orientação sobre meu benefício do INSS.'),
    // true = não aparece no site (fica guardado para revisão)
    rascunho: z.boolean().default(false),
  }),
});

export const collections = { artigos };
