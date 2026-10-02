import { Sprig } from "@/components/ui/Icons";

const words = [
  "Limpeza de pele",
  "Cuidados faciais",
  "Bem-estar",
  "Atendimento humanizado",
  "Autoestima",
  "Centro Cívico · Curitiba",
];

/** Faixa editorial em rolagem infinita (inspirada no Infinite Scroll / LogoLoop do React Bits). */
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10">
      {words.map((w) => (
        <li key={w} className="flex items-center gap-10 font-serif text-3xl whitespace-nowrap text-ink/80 italic md:text-[2.75rem]">
          {w}
          <Sprig className="size-7 text-mocha/60" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative overflow-hidden border-y border-line bg-cream py-6 md:py-8">
      <div className="flex w-max motion-safe:animate-marquee hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream md:w-32" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream md:w-32" />
    </div>
  );
}
