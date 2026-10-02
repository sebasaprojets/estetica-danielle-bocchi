import type { ImageLoaderProps } from "next/image";

/**
 * Loader usado apenas na exportação estática (GitHub Pages), onde o
 * otimizador de imagens do Next.js não está disponível.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (src.startsWith("https://images.unsplash.com")) {
    return `${src}?auto=format&fit=crop&w=${width}&q=${quality ?? 72}`;
  }
  return src.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}` : src;
}
