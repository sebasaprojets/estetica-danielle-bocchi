import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl();
  return [
    { url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${url}/politica-de-privacidade`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];
}
