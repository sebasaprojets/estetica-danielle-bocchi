import { ArrowUpRight, Check } from "lucide-react";
import type { Treatment } from "@/data/treatments";
import { treatmentMessage, whatsappUrl } from "@/lib/utils";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { SmartImage } from "./SmartImage";

type TreatmentCardProps = {
  treatment: Treatment;
  index: number;
  categoryLabel?: string;
};

export function TreatmentCard({ treatment, index, categoryLabel }: TreatmentCardProps) {
  return (
    <SpotlightCard className="group flex h-full flex-col rounded-[1.75rem] border border-line bg-ivory p-3 transition-[box-shadow,transform] duration-500 ease-(--ease-luxe) hover:-translate-y-1 hover:shadow-lift">
      <div className="relative overflow-hidden rounded-[1.35rem]">
        <SmartImage
          image={treatment.image}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 92vw"
          wrapperClassName="aspect-[4/5]"
          className="transition-transform duration-[1.4s] ease-(--ease-luxe) group-hover:scale-[1.06]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-80" />
        <span className="absolute top-4 left-4 z-20 rounded-full bg-ivory/85 px-3 py-1 font-serif text-sm text-ink italic backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-3 pt-6 pb-3 md:px-4">
        {categoryLabel && <p className="eyebrow text-[0.625rem] text-mocha-deep">{categoryLabel}</p>}
        <h3 className="mt-2 text-[2rem] leading-tight text-ink">{treatment.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{treatment.description}</p>

        {treatment.details && treatment.details.length > 0 && (
          <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-(--ease-luxe) [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:group-focus-within:grid-rows-[1fr] [@media(hover:hover)]:group-hover:grid-rows-[1fr]">
            <ul className="overflow-hidden">
              {treatment.details.map((d) => (
                <li key={d} className="mt-3 flex items-start gap-2.5 text-sm text-ink-soft first:mt-5">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-olive-deep" strokeWidth={2} aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto pt-7">
          <a
            href={whatsappUrl(treatmentMessage(treatment.whatsappTopic))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Saiba mais sobre ${treatment.name} pelo WhatsApp`}
            className="group/link inline-flex min-h-11 items-center gap-3 text-[0.8125rem] font-semibold tracking-[0.08em] text-ink uppercase"
          >
            Saiba mais
            <span className="flex size-9 items-center justify-center rounded-full border border-ink/20 transition-all duration-300 group-hover/link:border-ink group-hover/link:bg-ink group-hover/link:text-ivory">
              <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </span>
          </a>
        </div>
      </div>
    </SpotlightCard>
  );
}
