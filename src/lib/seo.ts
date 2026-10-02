import { clinic } from "@/data/clinic";
import { getSiteUrl } from "./utils";

/**
 * Dados estruturados (Schema.org) para negócio local.
 * Contém SOMENTE informações verificadas. Horários, avaliações agregadas e
 * coordenadas não são incluídos até serem confirmados pela clínica.
 */
export function localBusinessJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${url}/#business`,
    name: clinic.name,
    description: clinic.description,
    url,
    telephone: clinic.phone.e164,
    image: `${url}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${clinic.address.street}, ${clinic.address.complement}`,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.state,
      postalCode: clinic.address.postalCode,
      addressCountry: clinic.address.country,
    },
    areaServed: { "@type": "City", name: "Curitiba" },
    hasMap: clinic.maps.placeUrl,
    ...(clinic.social.instagram ? { sameAs: [clinic.social.instagram] } : {}),
  };
}

export function websiteJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    url,
    name: clinic.name,
    inLanguage: "pt-BR",
    publisher: { "@id": `${url}/#business` },
  };
}
