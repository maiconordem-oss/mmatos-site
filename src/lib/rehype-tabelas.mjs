// Copia o título de cada coluna para as células (data-label),
// para que no celular cada linha da tabela vire um bloco empilhado e legível.
const texto = (n) => (n.type === 'text' ? n.value : (n.children || []).map(texto).join(''));
const filhos = (n, tag) => (n.children || []).filter((c) => c.type === 'element' && c.tagName === tag);

export default function rehypeTabelas() {
  return (tree) => {
    const visitar = (no) => {
      if (no.type === 'element' && no.tagName === 'table') {
        const thead = filhos(no, 'thead')[0];
        const cab = thead ? filhos(filhos(thead, 'tr')[0] || {}, 'th').map((th) => texto(th).trim()) : [];
        for (const tbody of filhos(no, 'tbody')) {
          for (const tr of filhos(tbody, 'tr')) {
            filhos(tr, 'td').forEach((td, i) => {
              if (cab[i]) td.properties = { ...td.properties, dataLabel: cab[i] };
            });
          }
        }
        no.properties = { ...no.properties, className: ['tabela'] };
      }
      (no.children || []).forEach(visitar);
    };
    visitar(tree);
  };
}
