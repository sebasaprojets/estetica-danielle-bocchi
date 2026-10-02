import { Star } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

type TestimonialCardProps = { testimonial: Testimonial };

/** Depoimento em estilo editorial — texto fiel ao original. */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col">
      <div className="flex gap-1 text-sand" aria-label="Avaliação 5 de 5 estrelas" role="img">
        {Array.from({ length: testimonial.rating ?? 5 }).map((_, i) => (
          <Star key={i} className="size-4 fill-current" strokeWidth={0} aria-hidden="true" />
        ))}
      </div>
      <blockquote className="mt-8">
        <p className="font-serif text-[clamp(1.75rem,1.1rem+2.4vw,3.25rem)] leading-[1.15] text-ivory">
          “{testimonial.quote}”
        </p>
      </blockquote>
      <figcaption className="mt-10 flex items-center gap-4 text-sm">
        <span aria-hidden="true" className="h-px w-10 bg-sand/60" />
        <span className="text-ivory/85">{testimonial.author ?? "Cliente"}</span>
        <span className="text-ivory/50">·</span>
        <span className="text-ivory/60">Avaliação no {testimonial.source}</span>
      </figcaption>
    </figure>
  );
}
