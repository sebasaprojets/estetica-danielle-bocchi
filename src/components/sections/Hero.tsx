"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Star } from "lucide-react";
import { useRef } from "react";
import { clinic } from "@/data/clinic";
import { images } from "@/data/images";
import { siteConfig } from "@/data/site";
import { whatsappUrl } from "@/lib/utils";
import { useIntro } from "@/lib/intro";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { Sprig, WhatsAppIcon } from "@/components/ui/Icons";
import BlurText from "@/components/reactbits/BlurText";
import Magnet from "@/components/reactbits/Magnet";
import ShinyText from "@/components/reactbits/ShinyText";
import CircularText from "@/components/reactbits/CircularText";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { done: introDone } = useIntro();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 110]);
  const imageScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.06, 1.16]);
  const detailY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -70]);

  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
          transition: { duration: 0.9, delay, ease },
        };

  return (
    <section
      id="inicio"
      ref={ref}
      aria-labelledby="hero-title"
      className="grain relative isolate overflow-hidden bg-ivory pt-28 pb-16 md:pt-36 lg:min-h-[100svh] lg:pb-24"
    >
      {/* Fundo animado discreto */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-nude absolute -top-56 -left-48 size-[52rem] will-change-transform md:motion-safe:animate-drift" />
        <div className="glow-sand absolute top-1/4 -right-56 size-[44rem] will-change-transform md:motion-safe:animate-drift md:[animation-delay:-8s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ivory" />
      </div>

      <div className="mx-auto grid max-w-[88rem] items-center gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        {/* Texto */}
        <div className="relative z-10 lg:col-span-7 lg:pr-4">
          <motion.p
            {...fadeUp(0.1)}
            className="eyebrow inline-flex items-center gap-3 rounded-full border border-mocha/20 bg-ivory/60 px-4 py-2 backdrop-blur-sm"
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-olive" />
            <ShinyText text={`${clinic.tagline} | ${clinic.city}`} speed={5} color="#6b5749" shineColor="#d6c2b2" />
          </motion.p>

          <h1 id="hero-title" className="text-display mt-8 text-ink">
            <span className="sr-only">Realce sua beleza. Valorize sua essência.</span>
            <span aria-hidden="true" className="block">
              <BlurText as="span" text="Realce sua beleza." startDelay={0.2} play={introDone} className="block lg:flex-nowrap" />
              <BlurText
                as="span"
                text="Valorize sua essência."
                startDelay={0.55}
                play={introDone}
                className="block text-mocha-deep italic"
              />
            </span>
          </h1>

          <motion.p {...fadeUp(0.9)} className="mt-8 max-w-lg text-base leading-relaxed text-ink-soft md:text-lg">
            Um espaço dedicado ao cuidado, à autoestima e ao bem-estar, com atendimento humanizado e atenção em cada
            detalhe.
          </motion.p>

          <motion.div {...fadeUp(1.05)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Magnet>
              <Button
                href={whatsappUrl()}
                size="lg"
                icon={<WhatsAppIcon className="size-4" />}
                iconPosition="start"
                className="w-full sm:w-auto"
              >
                Agende seu horário
              </Button>
            </Magnet>
            <Button href="#tratamentos" variant="secondary" size="lg" icon={<ArrowRight className="size-4" strokeWidth={1.5} />}>
              Conheça nossos tratamentos
            </Button>
          </motion.div>

          <motion.a
            {...fadeUp(1.2)}
            href={clinic.reviews.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-4 text-sm text-ink-soft"
          >
            <span className="flex items-center gap-0.5 text-mocha" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" strokeWidth={0} />
              ))}
            </span>
            <span>
              <strong className="font-semibold text-ink">
                {clinic.reviews.rating.toFixed(1).replace(".", ",")}
              </strong>{" "}
              no Google · {clinic.reviews.count} avaliações
            </span>
            <span className="h-px w-6 bg-mocha/40 transition-all duration-300 group-hover:w-10" aria-hidden="true" />
          </motion.a>
        </div>

        {/* Composição visual */}
        <div className="relative lg:col-span-5">
          <motion.div
            initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: introDone ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
            transition={{ duration: 1.4, delay: 0.15, ease }}
            className="arch relative mx-auto aspect-[4/5] w-full max-w-[34rem] overflow-hidden shadow-lift lg:mr-0 lg:ml-auto lg:aspect-auto lg:h-[min(78svh,46rem)]"
          >
            <motion.div style={{ y: imageY, scale: imageScale }} className="absolute -inset-y-16 inset-x-0">
              <SmartImage
                image={images.hero}
                fill
                preload
                fetchPriority="high"
                sizes="(min-width: 1024px) 45vw, 92vw"
                wrapperClassName="absolute inset-0"
                showMarker={false}
              />
            </motion.div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
          </motion.div>

          {/* Selo circular */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.8 }}
            animate={introDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, delay: 1.1, ease }}
            className="absolute top-6 left-0 hidden size-32 items-center justify-center rounded-full bg-ivory/85 text-mocha-deep shadow-soft backdrop-blur-md sm:flex lg:top-16 lg:-left-16"
          >
            <CircularText text="AGENDE SUA AVALIAÇÃO · ESTÉTICA & BEM-ESTAR · " className="absolute inset-1.5" />
            <Sprig className="size-9 text-mocha" />
          </motion.div>

          {/* Detalhe sobreposto */}
          <motion.div
            style={{ y: detailY }}
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1.1, delay: 1.25, ease }}
            className="absolute -bottom-8 left-2 hidden w-44 overflow-hidden rounded-[1.25rem] border-[6px] border-ivory shadow-lift md:block lg:-left-10 lg:w-52"
          >
            <SmartImage image={images.heroDetail} width={420} height={520} sizes="208px" className="h-56 w-full lg:h-64" showMarker={false} />
          </motion.div>

          {siteConfig.showProvisionalMarkers && images.hero.provisional && (
            <p className="mt-4 text-right text-[0.625rem] tracking-wide text-ink-soft/70">Imagens ilustrativas</p>
          )}
        </div>
      </div>

      {/* Indicador de rolagem */}
      <a
        href="#confianca"
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-ink-soft lg:flex"
      >
        <span className="eyebrow text-[0.5625rem]">Role</span>
        <span className="relative block h-12 w-px overflow-hidden bg-ink/10">
          <span className="absolute inset-0 bg-mocha motion-safe:animate-scroll-line" />
        </span>
        <ArrowDown className="size-3.5 motion-reduce:hidden" strokeWidth={1.5} aria-hidden="true" />
      </a>
    </section>
  );
}
