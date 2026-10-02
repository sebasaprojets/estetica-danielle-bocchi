"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { publishedCategories, publishedTreatments } from "@/data/treatments";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TreatmentCard } from "@/components/ui/TreatmentCard";
import FadeContent from "@/components/reactbits/FadeContent";
import { InlineCTA } from "./InlineCTA";

/** Os filtros aparecem automaticamente quando houver tratamentos suficientes. */
const FILTER_THRESHOLD = 5;

export function Treatments() {
  const [filter, setFilter] = useState<string>("todos");
  const showFilters = publishedTreatments.length >= FILTER_THRESHOLD && publishedCategories.length > 1;

  const items = useMemo(
    () => (filter === "todos" ? publishedTreatments : publishedTreatments.filter((t) => t.category === filter)),
    [filter],
  );
  const labelFor = (id: string) => publishedCategories.find((c) => c.id === id)?.label;

  return (
    <section id="tratamentos" aria-labelledby="treatments-title" className="relative bg-ivory py-24 md:py-36">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="treatments-title"
            className="lg:col-span-7"
            index="01"
            eyebrow="Tratamentos"
            title={
              <>
                Cuidados pensados <span className="text-mocha-deep italic">para você.</span>
              </>
            }
          />
          <FadeContent delay={0.1} className="lg:col-span-5">
            <p className="text-base leading-relaxed text-ink-soft md:text-[1.0625rem]">
              Cada pessoa é única — por isso, a indicação de qualquer procedimento acontece após uma conversa e
              avaliação individual com a nossa equipe, com transparência em cada etapa.
            </p>
          </FadeContent>
        </div>

        {showFilters && (
          <FadeContent className="mt-12">
            <div role="tablist" aria-label="Filtrar tratamentos por categoria" className="flex flex-wrap gap-2">
              <LayoutGroup id="treatment-filters">
                {[{ id: "todos", label: "Todos" }, ...publishedCategories].map((c) => {
                  const active = filter === c.id;
                  return (
                    <button
                      key={c.id}
                      role="tab"
                      type="button"
                      aria-selected={active}
                      onClick={() => setFilter(c.id)}
                      className={cn(
                        "relative min-h-11 rounded-full px-5 text-sm font-medium transition-colors duration-300",
                        active ? "text-ivory" : "text-ink-soft hover:text-ink",
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="filter-pill"
                          className="absolute inset-0 -z-0 rounded-full bg-ink"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      )}
                      <span className="relative">{c.label}</span>
                    </button>
                  );
                })}
              </LayoutGroup>
            </div>
          </FadeContent>
        )}

        <motion.ul layout className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((t, i) => (
              <motion.li
                key={t.id}
                layout
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <TreatmentCard treatment={t} index={i} categoryLabel={labelFor(t.category)} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <InlineCTA
          className="mt-16"
          title="Não sabe qual cuidado é ideal para você?"
          text="Agende uma avaliação: nossa equipe conversa com você, entende suas necessidades e indica o melhor caminho."
          buttonLabel="Agendar avaliação"
          message="Olá! Conheci a Estética Danielle Bocchi pelo site e gostaria de agendar uma avaliação para entender qual tratamento é ideal para mim."
        />
      </div>
    </section>
  );
}
