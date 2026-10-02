import { ArrowUpRight, HeartHandshake, Leaf, Star } from "lucide-react";
import { clinic } from "@/data/clinic";
import CountUp from "@/components/reactbits/CountUp";
import FadeContent from "@/components/reactbits/FadeContent";

export function TrustBar() {
  const { rating, count, reviewsUrl } = clinic.reviews;

  return (
    <section id="confianca" aria-labelledby="trust-title" className="relative bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <FadeContent>
            <p className="eyebrow text-mocha-deep">Confiança construída em cada atendimento</p>
            <h2 id="trust-title" className="mt-4 max-w-xl text-4xl leading-tight text-ink md:text-5xl">
              A experiência das nossas clientes fala por nós.
            </h2>
          </FadeContent>
          <FadeContent delay={0.1}>
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-2 border-b border-ink/20 pb-1 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              Ver avaliações no Google
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </a>
          </FadeContent>
        </div>

        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line lg:grid-cols-4">
          <TrustItem delay={0}>
            <div className="flex items-baseline gap-3">
              <CountUp to={rating} decimals={1} duration={1.6} className="font-serif text-6xl leading-none text-ink md:text-7xl" />
              <span className="flex gap-0.5 text-mocha" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" strokeWidth={0} />
                ))}
              </span>
            </div>
            <p className="mt-4 text-sm font-medium text-ink">Estrelas no Google</p>
            <p className="mt-1 text-sm text-ink-soft">Nota média das avaliações públicas.</p>
          </TrustItem>

          <TrustItem delay={0.08}>
            <CountUp to={count} duration={2.2} className="font-serif text-6xl leading-none text-ink md:text-7xl" />
            <p className="mt-4 text-sm font-medium text-ink">Avaliações</p>
            <p className="mt-1 text-sm text-ink-soft">Clientes que compartilharam sua experiência.</p>
          </TrustItem>

          <TrustItem delay={0.16}>
            <HeartHandshake className="size-10 text-mocha" strokeWidth={1} aria-hidden="true" />
            <p className="mt-6 text-sm font-medium text-ink">Atendimento humanizado</p>
            <p className="mt-1 text-sm text-ink-soft">Atenção individual, escuta e cuidado do início ao fim.</p>
          </TrustItem>

          <TrustItem delay={0.24}>
            <Leaf className="size-10 text-olive" strokeWidth={1} aria-hidden="true" />
            <p className="mt-6 text-sm font-medium text-ink">Ambiente acolhedor</p>
            <p className="mt-1 text-sm text-ink-soft">Espaço organizado, limpo e pensado para o seu conforto.</p>
          </TrustItem>
        </ul>

        <p className="mt-6 text-xs leading-relaxed text-ink-soft/80">
          Dados de referência do Perfil da Empresa no Google (atualizado em {clinic.reviews.lastUpdated.split("-").reverse().join("/")}).
          As avaliações refletem experiências individuais e não representam garantia de resultados.
        </p>
      </div>
    </section>
  );
}

function TrustItem({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <li className="bg-ivory">
      <FadeContent delay={delay} className="flex h-full flex-col p-6 transition-colors duration-500 hover:bg-cream md:p-10">
        {children}
      </FadeContent>
    </li>
  );
}
