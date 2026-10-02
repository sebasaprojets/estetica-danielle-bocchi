"use client";

/**
 * Imagem otimizada com fallback elegante.
 * - Imagens do Unsplash usam o CDN deles (redimensionamento + AVIF/WebP).
 * - Imagens locais (/public) usam o otimizador do Next.js.
 * - Se a imagem falhar, exibe um placeholder da marca (nunca um ícone quebrado).
 */

import Image, { type ImageLoaderProps, type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import type { SiteImage } from "@/data/images";

const unsplashLoader = ({ src, width, quality }: ImageLoaderProps) =>
  `${src}?auto=format&fit=crop&w=${width}&q=${quality ?? 72}`;

type SmartImageProps = Omit<ImageProps, "src" | "alt" | "loader"> & {
  image: SiteImage;
  showMarker?: boolean;
  /** exibe o monograma "DB" no placeholder de fallback */
  showMonogram?: boolean;
  wrapperClassName?: string;
};

export function SmartImage({ image, className, wrapperClassName, showMarker = true, showMonogram = true, ...props }: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  const isUnsplash = image.src.startsWith("https://images.unsplash.com");

  return (
    <div className={cn("relative overflow-hidden bg-nude", wrapperClassName)}>
      {failed ? (
        <div
          role="img"
          aria-label={image.alt}
          className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(120%_80%_at_30%_20%,var(--color-cream),var(--color-nude)_55%,var(--color-sand))]"
        >
          {showMonogram && <span className="font-serif text-5xl text-mocha/40 italic select-none">DB</span>}
        </div>
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          loader={isUnsplash ? unsplashLoader : undefined}
          onError={() => setFailed(true)}
          className={cn("object-cover", className)}
          {...props}
        />
      )}
      {showMarker && siteConfig.showProvisionalMarkers && image.provisional && (
        <span className="pointer-events-none absolute bottom-2 left-2 z-20 rounded-full bg-ivory/80 px-2 py-0.5 text-[0.625rem] font-medium tracking-wide text-ink-soft backdrop-blur-sm">
          Imagem ilustrativa
        </span>
      )}
    </div>
  );
}
