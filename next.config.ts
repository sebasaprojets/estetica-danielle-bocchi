import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=true gera uma versão 100% estática (pasta `out/`) para o
 * GitHub Pages. Em hospedagens com Node.js (ex.: Vercel) o build padrão é usado.
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export",
        trailingSlash: true,
        basePath,
        images: { loader: "custom", loaderFile: "./src/lib/imageLoader.ts" },
      }
    : {}),
};

export default nextConfig;
