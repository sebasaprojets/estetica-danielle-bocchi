import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { clinic } from "@/data/clinic";

// Ensina o tailwind-merge sobre os tamanhos de fonte customizados do tema.
const twMerge = extendTailwindMerge({
  extend: { classGroups: { "font-size": [{ text: ["display", "title"] }] } },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Gera o link do WhatsApp com mensagem pré-preenchida. */
export function whatsappUrl(message: string = clinic.whatsapp.defaultMessage) {
  return `https://wa.me/${clinic.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Mensagem personalizada para um tratamento específico. */
export function treatmentMessage(treatmentName: string) {
  return `Olá! Conheci a Estética Danielle Bocchi pelo site e gostaria de saber mais sobre ${treatmentName}.`;
}

export function telUrl(phone: string = clinic.phone.e164) {
  return `tel:${phone}`;
}

/** URL absoluta do site (configure NEXT_PUBLIC_SITE_URL em produção). */
export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}
