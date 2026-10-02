export type NavItem = { id: string; label: string; href: `/#${string}` };

export const navigation: NavItem[] = [
  { id: "inicio", label: "Início", href: "/#inicio" },
  { id: "tratamentos", label: "Tratamentos", href: "/#tratamentos" },
  { id: "sobre", label: "Sobre", href: "/#sobre" },
  { id: "depoimentos", label: "Depoimentos", href: "/#depoimentos" },
  { id: "contato", label: "Contato", href: "/#contato" },
];
