import { getCollection, type CollectionEntry } from 'astro:content';

export type Artigo = CollectionEntry<'artigos'>;

const dataDe = (a: Artigo) => a.data.publicado ?? a.data.atualizado;

/** Artigos publicados: os com data primeiro (mais recentes no topo), depois os sem data pela "ordem". */
export async function getArtigos(): Promise<Artigo[]> {
  const todos = await getCollection('artigos', ({ data }) => !data.rascunho);
  return todos.sort((a, b) => {
    const da = dataDe(a)?.getTime(), db = dataDe(b)?.getTime();
    if (da && db) return db - da;
    if (da) return -1;
    if (db) return 1;
    return (a.data.ordem ?? 999) - (b.data.ordem ?? 999);
  });
}

/** Até 3 artigos relacionados: mesma categoria primeiro, depois os mais recentes. */
export function relacionados(atual: Artigo, todos: Artigo[], n = 3): Artigo[] {
  const outros = todos.filter((a) => a.id !== atual.id);
  const mesma = outros.filter((a) => a.data.categoria === atual.data.categoria);
  const resto = outros.filter((a) => a.data.categoria !== atual.data.categoria);
  return [...mesma, ...resto].slice(0, n);
}
