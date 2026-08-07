/**
 * Dados de contato do Grupo SR Energia.
 *
 * ⚠️ PENDENTE — o cliente ainda não forneceu estas informações. Enquanto os
 * campos estiverem vazios, a página de contato mostra apenas os canais
 * configurados e o formulário avisa que o envio ainda não está ativo. Nenhum
 * dado fictício é exibido ao visitante.
 *
 * Basta preencher abaixo para tudo passar a funcionar — nenhuma outra alteração
 * de código é necessária.
 */

export const CONTACT = {
  /** E-mail que recebe as mensagens do formulário. Ex.: "contato@srenergia.com.br" */
  email: "",
  /** Telefone principal, já formatado para exibição. Ex.: "(00) 0000-0000" */
  phone: "",
  /** WhatsApp em formato internacional, só dígitos. Ex.: "5500000000000" */
  whatsapp: "",
  /** Endereço completo em uma linha. */
  address: "",
  /** Cidade/UF. Ex.: "Cidade — UF" */
  city: "",
  /** Horário de atendimento. Ex.: "Segunda a sexta, 8h às 18h" */
  hours: "",
  /** Perfis sociais. Deixe vazio o que não existir. */
  social: {
    instagram: "",
    linkedin: "",
    facebook: "",
  },
} as const;

export const hasEmail = CONTACT.email.length > 0;
export const hasWhatsapp = CONTACT.whatsapp.length > 0;

export const whatsappUrl = hasWhatsapp
  ? `https://wa.me/${CONTACT.whatsapp}`
  : null;
