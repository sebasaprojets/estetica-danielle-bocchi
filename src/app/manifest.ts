export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { clinic } from "@/data/clinic";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: clinic.name,
    short_name: clinic.shortName,
    description: clinic.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#faf8f5",
    lang: "pt-BR",
    icons: [{ src: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icon.svg`, sizes: "any", type: "image/svg+xml" }],
  };
}
