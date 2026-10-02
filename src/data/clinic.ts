/**
 * Dados institucionais da clínica.
 * ------------------------------------------------------------
 * Este é o ponto central de edição. Campos marcados com
 * `confirmed: false` ou comentários "A CONFIRMAR" ainda precisam
 * ser validados pela clínica antes da publicação definitiva.
 */

const fullAddress = "Av. Cândido de Abreu, 140 – Sala 706 – Centro Cívico, Curitiba – PR, 80530-000";
const mapsQuery = "Estética Danielle Bocchi, Av. Cândido de Abreu, 140, Curitiba - PR";

export type OpeningHour = {
  days: string;
  hours: string;
  /** false = informação provisória, aguardando confirmação da clínica */
  confirmed: boolean;
};

export const clinic = {
  name: "Estética Danielle Bocchi",
  shortName: "Danielle Bocchi",
  tagline: "Estética e Saúde",
  city: "Curitiba",
  category: "Centro de saúde e beleza",
  description:
    "Estética Danielle Bocchi, no Centro Cívico de Curitiba: um espaço dedicado ao cuidado, à autoestima e ao bem-estar, com atendimento humanizado e atenção em cada detalhe.",

  phone: {
    display: "(41) 99758-1018",
    e164: "+5541997581018",
  },

  whatsapp: {
    number: "5541997581018",
    defaultMessage:
      "Olá! Conheci a Estética Danielle Bocchi pelo site e gostaria de saber mais sobre os tratamentos e agendar um horário.",
  },

  address: {
    street: "Av. Cândido de Abreu, 140",
    complement: "Sala 706",
    neighborhood: "Centro Cívico",
    city: "Curitiba",
    state: "PR",
    postalCode: "80530-000",
    country: "BR",
    full: fullAddress,
  },

  maps: {
    embedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(mapsQuery)}&z=17&output=embed`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}`,
    placeUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`,
  },

  /**
   * Avaliações do Google — valores fornecidos como referência.
   * Atualize periodicamente. `reviewsUrl` pode ser trocado pelo link
   * direto do Perfil da Empresa no Google quando disponível.
   */
  reviews: {
    rating: 5.0,
    count: 517,
    reviewsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`,
    lastUpdated: "2026-10",
  },

  /**
   * Horário de funcionamento.
   * Única informação conhecida: atendimento até 19h30. A CONFIRMAR.
   */
  openingHours: [
    { days: "Segunda a sexta", hours: "Até 19h30", confirmed: false },
    { days: "Sábado", hours: "A confirmar", confirmed: false },
    { days: "Domingo e feriados", hours: "A confirmar", confirmed: false },
  ] satisfies OpeningHour[],

  /** Redes sociais — preencher quando o perfil oficial for informado. */
  social: {
    instagram: null as string | null,
  },
} as const;

export type Clinic = typeof clinic;
