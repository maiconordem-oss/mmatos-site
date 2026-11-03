export const SITE = {
  nome: 'Maicon Matos Advocacia',
  advogado: 'Maicon Silveira de Matos',
  autor: 'Dr. Maicon Matos',
  oab: 'OAB/RS 136.221',
  area: 'Direito Previdenciário',
  url: 'https://mmatos.com.br',
  whatsapp: '5551996443212',
  telefone: '(51) 99644-3212',
  email: 'adv@mmatos.com.br',
};

export const linkWhatsapp = (texto?: string) =>
  `https://wa.me/${SITE.whatsapp}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`;

export const dataBR = (d?: Date) =>
  d ? d.toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '';
