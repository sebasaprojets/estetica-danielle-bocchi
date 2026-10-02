"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { GalleryItem } from "@/data/gallery";
import { SmartImage } from "./SmartImage";

type LightboxProps = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + items.length) % items.length);
      if (e.key === "Tab") {
        const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-lightbox] button"));
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onClose, onNavigate]);

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          data-lightbox
          role="dialog"
          aria-modal="true"
          aria-label={`Imagem ${index + 1} de ${items.length}: ${item.caption}`}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-md md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar galeria"
            className="absolute top-4 right-4 z-10 inline-flex size-12 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:bg-ivory hover:text-ink md:top-6 md:right-6"
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>

          <motion.figure
            key={item.id}
            className="relative flex max-h-full w-full max-w-5xl flex-col items-center"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <SmartImage
              image={item}
              fill
              sizes="(min-width: 1024px) 70vw, 95vw"
              wrapperClassName="h-[70svh] w-full rounded-[1.25rem] bg-ink"
              className="object-contain!"
            />
            <figcaption className="mt-5 flex w-full items-center justify-between text-sm text-ivory/80">
              <span className="font-serif text-xl text-ivory italic">{item.caption}</span>
              <span className="tabular-nums">
                {index + 1} / {items.length}
              </span>
            </figcaption>
          </motion.figure>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index - 1 + items.length) % items.length);
            }}
            aria-label="Imagem anterior"
            className="absolute bottom-6 left-4 inline-flex size-12 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:bg-ivory hover:text-ink md:top-1/2 md:bottom-auto md:left-6 md:-translate-y-1/2"
          >
            <ChevronLeft className="size-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + 1) % items.length);
            }}
            aria-label="Próxima imagem"
            className="absolute right-4 bottom-6 inline-flex size-12 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:bg-ivory hover:text-ink md:top-1/2 md:right-6 md:bottom-auto md:-translate-y-1/2"
          >
            <ChevronRight className="size-5" strokeWidth={1.5} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
