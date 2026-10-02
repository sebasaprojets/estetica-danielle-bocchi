/**
 * Banco de imagens do site.
 * ------------------------------------------------------------
 * Todas as imagens abaixo são PROVISÓRIAS (fotografias editoriais
 * do Unsplash) e devem ser substituídas pelas fotos reais da clínica.
 *
 * Para trocar: coloque o arquivo em /public/images/... e altere `src`
 * para "/images/nome-do-arquivo.jpg", ajustando `alt` e marcando
 * `provisional: false`.
 */

export type SiteImage = {
  src: string;
  alt: string;
  /** true = imagem ilustrativa, ainda não é foto real da clínica */
  provisional: boolean;
};

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const images = {
  hero: {
    src: unsplash("1570172619644-dfd03ed5d881"),
    alt: "Cliente relaxando durante um cuidado facial em ambiente acolhedor",
    provisional: true,
  },
  heroDetail: {
    src: unsplash("1620916566398-39f1143ab7be"),
    alt: "Detalhe de frascos de cuidados com a pele sobre superfície clara",
    provisional: true,
  },
  aboutMain: {
    src: unsplash("1600334129128-685c5582fd35"),
    alt: "Ambiente de atendimento com iluminação suave e decoração em tons neutros",
    provisional: true,
  },
  aboutDetail: {
    src: unsplash("1515377905703-c4788e51af15"),
    alt: "Detalhe de toalhas e elementos naturais em ambiente de bem-estar",
    provisional: true,
  },
  cta: {
    src: unsplash("1519824145371-296894a0daa9"),
    alt: "Composição delicada de produtos de cuidado em tons nude",
    provisional: true,
  },
} satisfies Record<string, SiteImage>;
