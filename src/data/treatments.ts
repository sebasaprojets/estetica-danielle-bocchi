/**
 * Tratamentos / serviços
 * ------------------------------------------------------------
 * IMPORTANTE: cadastre aqui SOMENTE serviços confirmados pela clínica.
 * Não descreva promessas de resultado. Itens com `published: false`
 * não aparecem no site até serem confirmados.
 *
 * - `category`: usada nos filtros da seção.
 * - `description`: texto curto exibido no card (editável).
 * - `details`: lista opcional revelada no hover/foco do card.
 * - `whatsappTopic`: como o tratamento aparece na mensagem automática.
 */

import type { SiteImage } from "./images";

export type TreatmentCategory = {
  id: string;
  label: string;
  /** false = categoria aguardando confirmação (oculta no site) */
  published: boolean;
};

export type Treatment = {
  id: string;
  name: string;
  category: TreatmentCategory["id"];
  description: string;
  details?: string[];
  image: SiteImage;
  whatsappTopic: string;
  published: boolean;
  /** true = texto provisório, aguardando revisão da clínica */
  provisionalCopy: boolean;
};

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const treatmentCategories: TreatmentCategory[] = [
  { id: "limpeza-de-pele", label: "Limpeza de pele", published: true },
  { id: "cuidados-faciais", label: "Cuidados faciais", published: true },
  { id: "tratamentos-esteticos", label: "Tratamentos estéticos", published: true },
  // Exibir somente após confirmação da clínica e do(s) profissional(is) habilitado(s).
  { id: "injetaveis", label: "Procedimentos injetáveis", published: false },
];

export const treatments: Treatment[] = [
  {
    id: "limpeza-de-pele",
    name: "Limpeza de pele",
    category: "limpeza-de-pele",
    description:
      "Um dos cuidados mais lembrados pelas nossas clientes. Realizado com técnica, delicadeza e atenção às necessidades da sua pele.",
    details: [
      "Avaliação da pele antes do procedimento",
      "Etapas explicadas com clareza",
      "Orientações de cuidados para casa",
    ],
    image: {
      src: unsplash("1616394584738-fc6e612e71b9"),
      alt: "Profissional realizando cuidado facial em cliente deitada",
      provisional: true,
    },
    whatsappTopic: "a limpeza de pele",
    published: true,
    provisionalCopy: true,
  },
  {
    id: "cuidados-faciais",
    name: "Cuidados faciais",
    category: "cuidados-faciais",
    description:
      "Protocolos faciais indicados após avaliação individual, pensados para o momento e o tipo da sua pele.",
    details: [
      "Indicação personalizada em avaliação",
      "Atendimento individual e sem pressa",
      "Ambiente tranquilo e acolhedor",
    ],
    image: {
      src: unsplash("1552693673-1bf958298935"),
      alt: "Cliente com máscara facial em momento de relaxamento",
      provisional: true,
    },
    whatsappTopic: "os cuidados faciais",
    published: true,
    provisionalCopy: true,
  },
  {
    id: "tratamentos-esteticos",
    name: "Tratamentos estéticos",
    category: "tratamentos-esteticos",
    description:
      "Tratamentos estéticos conduzidos com profissionalismo, com indicação definida em conversa e avaliação com a nossa equipe.",
    details: [
      "Conversa inicial sobre seus objetivos",
      "Indicação feita pela equipe após avaliação",
      "Acompanhamento atencioso em cada etapa",
    ],
    image: {
      src: unsplash("1540555700478-4be289fbecef"),
      alt: "Ambiente de atendimento estético com maca e iluminação suave",
      provisional: true,
    },
    whatsappTopic: "os tratamentos estéticos",
    published: true,
    provisionalCopy: true,
  },
  {
    id: "injetaveis",
    name: "Procedimentos injetáveis",
    category: "injetaveis",
    description: "A confirmar pela clínica.",
    image: {
      src: unsplash("1598440947619-2c35fc9aa908"),
      alt: "Imagem ilustrativa",
      provisional: true,
    },
    whatsappTopic: "os procedimentos injetáveis",
    published: false,
    provisionalCopy: true,
  },
];

export const publishedCategories = treatmentCategories.filter((c) => c.published);
export const publishedTreatments = treatments.filter(
  (t) => t.published && publishedCategories.some((c) => c.id === t.category),
);
