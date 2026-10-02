"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Building2, Flower2, HeartHandshake, Users } from "lucide-react";
import { useRef } from "react";
import { images } from "@/data/images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import FadeContent from "@/components/reactbits/FadeContent";

/** Pilares — textos baseados no que as clientes destacam nas avaliações. Editáveis. */
const pillars = [
  {
    icon: Building2,
    title: "Estrutura",
    text: "Um espaço organizado e bem cuidado no Centro Cívico, preparado para receber você com conforto.",
  },
  {
    icon: Flower2,
    title: "Ambiente",
    text: "Limpo, tranquilo e acolhedor — pensado para que você se sinta à vontade desde a chegada.",
  },
  {
    icon: Users,
    title: "Equipe",
    text: "Profissionais atenciosos, educados e dedicados, que acompanham você em cada etapa.",
  },
  {
    icon: HeartHandshake,
    title: "Filosofia",
    text: "Atendimento humanizado, escuta atenta e respeito à individualidade de cada cliente.",
  },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const mainY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 40]);
  const detailY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);

  return (
    <section data-defer
      id="sobre"
      ref={ref}
      aria-labelledby="about-title"
      className="grain relative overflow-hidden bg-cream py-24 md:py-36"
    >
      <div className="mx-auto grid max-w-[88rem] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        {/* Composição de imagens */}
        <div className="relative lg:col-span-5">
          <div className="arch relative aspect-[3/4] w-[82%] overflow-hidden shadow-lift">
            <motion.div style={{ y: mainY }} className="absolute -inset-y-12 inset-x-0">
              <SmartImage
                image={images.aboutMain}
                fill
                sizes="(min-width: 1024px) 34vw, 78vw"
                wrapperClassName="absolute inset-0"
              />
            </motion.div>
          </div>
          <motion.div
            style={{ y: detailY }}
            className="absolute right-0 bottom-[-6%] w-[48%] overflow-hidden rounded-[1.25rem] border-[6px] border-cream shadow-lift"
          >
            <SmartImage image={images.aboutDetail} fill sizes="(min-width: 1024px) 20vw, 46vw" wrapperClassName="aspect-[4/5]" showMarker={false} />
          </motion.div>
        </div>

        {/* Texto */}
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <SectionHeading
            id="about-title"
            index="02"
            eyebrow="Sobre a clínica"
            title={
              <>
                Seu momento de cuidado <span className="text-mocha-deep italic">começa aqui.</span>
              </>
            }
            description="Mais do que estética, acreditamos na importância de proporcionar uma experiência acolhedora, com atenção individualizada e cuidado em cada etapa."
          />

          <ul className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2">
            {pillars.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="bg-cream">
                <FadeContent delay={i * 0.08} className="group h-full p-7 transition-colors duration-500 hover:bg-ivory">
                  <div className="flex items-center justify-between">
                    <Icon
                      className="size-7 text-mocha transition-transform duration-500 ease-(--ease-luxe) group-hover:-translate-y-0.5"
                      strokeWidth={1}
                      aria-hidden="true"
                    />
                    <span className="font-serif text-sm text-mocha/70 italic">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-2xl text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{text}</p>
                </FadeContent>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
