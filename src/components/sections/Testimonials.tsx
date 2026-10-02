"use client";

import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { testimonials } from "@/data/testimonials";
import { clinic } from "@/data/clinic";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import FadeContent from "@/components/reactbits/FadeContent";
import { InlineCTA } from "./InlineCTA";

const AUTOPLAY_MS = 7000;

export function Testimonials() {
  const reduce = useReducedMotion();
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const total = testimonials.length;

  const go = useCallback(
    (dir: number) => setState(([i]) => [(i + dir + total) % total, dir]),
    [total],
  );
  const goTo = (i: number) => setState(([cur]) => [i, i > cur ? 1 : -1]);

  const autoplay = playing && !hovered && !reduce && total > 1;

  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [autoplay, index, go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 60, filter: "blur(6px)" }),
    center: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * -60, filter: "blur(6px)" }),
  };

  return (
    <section data-defer id="depoimentos" aria-labelledby="testimonials-title" className="relative overflow-hidden bg-ink py-24 text-ivory md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute top-10 right-[-4rem] font-serif text-[22rem] leading-none text-ivory/[0.04] select-none md:text-[34rem]">
        “
      </div>

      <div className="relative mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="testimonials-title"
              tone="light"
              index="03"
              eyebrow="Experiência dos clientes"
              title={
                <>
                  Palavras de quem <span className="text-sand italic">já viveu.</span>
                </>
              }
              description="Relatos reais, compartilhados publicamente no Google, reproduzidos com fidelidade."
            />
            <FadeContent delay={0.15} className="mt-8">
              <a
                href={clinic.reviews.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-2 border-b border-ivory/25 pb-1 text-sm font-medium transition-colors hover:border-sand hover:text-sand"
              >
                Ver avaliações originais no Google
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
              </a>
            </FadeContent>
          </div>

          <FadeContent delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <div
              role="region"
              aria-roledescription="carrossel"
              aria-label="Depoimentos de clientes"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onFocusCapture={() => setHovered(true)}
              onBlurCapture={() => setHovered(false)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") go(1);
                if (e.key === "ArrowLeft") go(-1);
              }}
            >
              <div
                className="relative grid min-h-[22rem] md:min-h-[24rem]"
                aria-live={autoplay ? "off" : "polite"}
                aria-atomic="true"
              >
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={testimonials[index].id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} de ${total}`}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    drag={total > 1 ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.18}
                    onDragEnd={onDragEnd}
                    className="col-start-1 row-start-1 cursor-grab touch-pan-y active:cursor-grabbing"
                  >
                    <TestimonialCard testimonial={testimonials[index]} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-12 flex items-center justify-between gap-6 border-t border-ivory/10 pt-8">
                <div className="flex items-center gap-2" role="group" aria-label="Escolher depoimento">
                  {testimonials.map((t, i) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Ir para o depoimento ${i + 1}`}
                      aria-current={i === index ? "true" : undefined}
                      className="group flex min-h-11 items-center px-1"
                    >
                      <span
                        className={cn(
                          "relative block h-[3px] overflow-hidden rounded-full bg-ivory/20 transition-all duration-500",
                          i === index ? "w-14" : "w-6 group-hover:bg-ivory/40",
                        )}
                      >
                        {i === index && (
                          <motion.span
                            key={`${index}-${autoplay}`}
                            className="absolute inset-0 origin-left bg-sand"
                            initial={{ scaleX: autoplay ? 0 : 1 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: autoplay ? AUTOPLAY_MS / 1000 : 0, ease: "linear" }}
                          />
                        )}
                      </span>
                    </button>
                  ))}
                  <span className="ml-3 font-serif text-sm text-ivory/60 italic tabular-nums">
                    {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {!reduce && total > 1 && (
                    <button
                      type="button"
                      onClick={() => setPlaying((p) => !p)}
                      aria-label={playing ? "Pausar rotação automática" : "Retomar rotação automática"}
                      className="inline-flex size-11 items-center justify-center rounded-full text-ivory/70 transition-colors hover:text-ivory"
                    >
                      {playing ? <Pause className="size-4" strokeWidth={1.5} /> : <Play className="size-4" strokeWidth={1.5} />}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Depoimento anterior"
                    className="inline-flex size-12 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:border-ivory hover:bg-ivory hover:text-ink"
                  >
                    <ArrowLeft className="size-4" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Próximo depoimento"
                    className="inline-flex size-12 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:border-ivory hover:bg-ivory hover:text-ink"
                  >
                    <ArrowRight className="size-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </FadeContent>
        </div>

        <InlineCTA
          tone="dark"
          className="mt-20"
          title="Viva essa experiência também."
          text="Converse com a nossa equipe e agende o seu horário com atendimento personalizado."
          buttonLabel="Agendar meu horário"
        />
      </div>
    </section>
  );
}
