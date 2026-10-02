import { withBase } from "@/lib/utils";

export type NavItem = { id: string; label: string; href: string };

const item = (id: string, label: string): NavItem => ({ id, label, href: withBase(`/#${id}`) });

export const navigation: NavItem[] = [
  item("inicio", "Início"),
  item("tratamentos", "Tratamentos"),
  item("sobre", "Sobre"),
  item("depoimentos", "Depoimentos"),
  item("contato", "Contato"),
];
