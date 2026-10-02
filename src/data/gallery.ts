/**
 * Galeria — substitua pelas fotografias reais da clínica
 * (ambiente, decoração, equipamentos, salas de atendimento e bastidores).
 * `ratio` controla a proporção no layout editorial (masonry).
 */

import type { SiteImage } from "./images";

export type GalleryItem = SiteImage & {
  id: string;
  caption: string;
  ratio: "portrait" | "landscape" | "square";
};

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const gallery: GalleryItem[] = [
  {
    id: "ambiente",
    src: unsplash("1600334089648-b0d9d3028eb2"),
    alt: "Sala de atendimento com decoração em tons claros",
    caption: "Ambiente",
    ratio: "portrait",
    provisional: true,
  },
  {
    id: "detalhes",
    src: unsplash("1556228578-8c89e6adf883"),
    alt: "Produtos de cuidado com a pele organizados sobre bancada",
    caption: "Detalhes",
    ratio: "landscape",
    provisional: true,
  },
  {
    id: "atendimento",
    src: unsplash("1544161515-4ab6ce6db874"),
    alt: "Momento de cuidado e relaxamento durante atendimento",
    caption: "Atendimento",
    ratio: "square",
    provisional: true,
  },
  {
    id: "decoracao",
    src: unsplash("1519823551278-64ac92734fb1"),
    alt: "Elementos de decoração em ambiente de bem-estar",
    caption: "Decoração",
    ratio: "portrait",
    provisional: true,
  },
  {
    id: "estrutura",
    src: unsplash("1560750588-73207b1ef5b8"),
    alt: "Estrutura de atendimento organizada e iluminada",
    caption: "Estrutura",
    ratio: "landscape",
    provisional: true,
  },
  {
    id: "cuidado",
    src: unsplash("1596755389378-c31d21fd1273"),
    alt: "Composição de produtos de skincare em tons suaves",
    caption: "Cuidado",
    ratio: "portrait",
    provisional: true,
  },
  {
    id: "bastidores",
    src: unsplash("1487412947147-5cebf100ffc2"),
    alt: "Retrato delicado em luz natural",
    caption: "Bastidores",
    ratio: "square",
    provisional: true,
  },
];
