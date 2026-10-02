import { images } from "@/data/images";
import { whatsappUrl } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { Sprig, WhatsAppIcon } from "@/components/ui/Icons";
import BlurText from "@/components/reactbits/BlurText";
import FadeContent from "@/components/reactbits/FadeContent";
import Magnet from "@/components/reactbits/Magnet";

export function CTA() {
  return (
    <section id="agendamento" aria-labelledby="cta-title" className="bg-ivory px-3 md:px-5">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-mocha-deep md:rounded-[2.5rem]">
        <SmartImage
          image={images.cta}
          fill
          sizes="100vw"
          wrapperClassName="absolute inset-0 -z-10 bg-mocha-deep"
          className="opacity-45 mix-blend-luminosity"
          showMarker={false}
          showMonogram={false}
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-ink/80 via-mocha-deep/70 to-mocha/50" />

        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center md:py-36">
          <FadeContent>
            <Sprig className="mx-auto size-14 text-sand" />
          </FadeContent>
          <h2 id="cta-title" className="text-title mt-8 text-ivory">
            <span className="sr-only">Está na hora de cuidar de você.</span>
            <span aria-hidden="true">
              <BlurText as="span" text="Está na hora de" className="justify-center" />
              <BlurText as="span" text="cuidar de você." startDelay={0.3} className="justify-center text-sand italic" />
            </span>
          </h2>
          <FadeContent delay={0.3}>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ivory/80 md:text-lg">
              Entre em contato com nossa equipe e descubra como podemos fazer parte da sua jornada de autocuidado.
            </p>
          </FadeContent>
          <FadeContent delay={0.45} className="mt-12">
            <Magnet padding={80} strength={5}>
              <Button
                href={whatsappUrl()}
                variant="light"
                size="lg"
                icon={<WhatsAppIcon className="size-5" />}
                iconPosition="start"
                className="min-h-14 px-10"
              >
                Agendar pelo WhatsApp
              </Button>
            </Magnet>
          </FadeContent>
        </div>
      </div>
    </section>
  );
}
