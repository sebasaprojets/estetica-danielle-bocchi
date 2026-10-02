/**
 * Depoimentos
 * ------------------------------------------------------------
 * Textos reais, extraídos de avaliações públicas fornecidas pela clínica.
 * Mantenha a fidelidade do texto original. Preencha `author` SOMENTE
 * com autorização expressa da cliente; caso contrário, deixe `null`.
 */

export type Testimonial = {
  id: string;
  quote: string;
  author: string | null;
  source: "Google";
  rating?: number;
};

export const testimonials: Testimonial[] = [
  {
    id: "atendimento-acolhedor",
    quote:
      "Excelente atendimento! Toda a equipe é muito atenciosa, educada e profissional. Fui muito bem acolhida do início ao fim e me senti cuidada em todos os momentos.",
    author: null,
    source: "Google",
  },
  {
    id: "preco-acessivel",
    quote: "Gostei muito. A clínica é muito boa, ótimo atendimento e o preço é bem acessível.",
    author: null,
    source: "Google",
  },
  {
    id: "experiencia",
    quote:
      "Experiência muito boa na clínica. O atendimento foi perfeito e o procedimento superou as expectativas.",
    author: null,
    source: "Google",
  },
];
