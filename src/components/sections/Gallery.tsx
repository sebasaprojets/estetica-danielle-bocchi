"use client";

import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import { useCallback, useState } from "react";
import { gallery } from "@/data/gallery";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Lightbox } from "@/components/ui/Lightbox";
import FadeContent from "@/components/reactbits/FadeContent";

const ratioClass = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
} as const;

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section id="galeria" aria-labelledby="gallery-title" className="relative bg-ivory py-24 md:py-36">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="gallery-title"
            className="lg:col-span-7"
            index="04"
            eyebrow="Galeria"
            title={
              <>
                Um espaço feito para <span className="text-mocha-deep italic">acolher.</span>
              </>
            }
          />
          <FadeContent delay={0.1} className="lg:col-span-5">
            <p className="text-base leading-relaxed text-ink-soft md:text-[1.0625rem]">
              Detalhes do ambiente, da estrutura e do cuidado que fazem parte da experiência na clínica.
            </p>
          </FadeContent>
        </div>

        <ul className="mt-14 columns-2 gap-3 md:gap-5 lg:columns-3">
          {gallery.map((item, i) => (
            <motion.li
              key={item.id}
              className="mb-3 break-inside-avoid md:mb-5"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Ampliar imagem: ${item.caption}`}
                className="group relative block w-full overflow-hidden rounded-[1.25rem] text-left"
              >
                <SmartImage
                  image={item}
                  fill
                  sizes="(min-width: 1024px) 30vw, 48vw"
                  wrapperClassName={cn("w-full", ratioClass[item.ratio])}
                  className="transition-transform duration-[1.4s] ease-(--ease-luxe) group-hover:scale-[1.06]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 z-10 bg-gradient-to-t from-ink/55 via-ink/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
                <span className="absolute inset-x-4 bottom-4 z-10 flex translate-y-2 items-center justify-between text-ivory opacity-0 transition-all duration-500 ease-(--ease-luxe) group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <span className="font-serif text-xl italic">{item.caption}</span>
                  <Expand className="size-4" strokeWidth={1.5} aria-hidden="true" />
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <Lightbox items={gallery} index={active} onClose={close} onNavigate={setActive} />
    </section>
  );
}
