import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import FadeContent from "@/components/reactbits/FadeContent";

type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  id?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
  id,
}: SectionHeadingProps) {
  const light = tone === "light";
  return (
    <FadeContent
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <p className={cn("eyebrow flex items-center gap-3", light ? "text-sand" : "text-mocha-deep")}>
        {index && <span className="font-serif text-sm tracking-normal normal-case italic">{index}</span>}
        <span aria-hidden="true" className={cn("h-px w-8", light ? "bg-sand/60" : "bg-mocha/50")} />
        {eyebrow}
      </p>
      <h2 id={id} className={cn("text-title max-w-[16ch]", light ? "text-ivory" : "text-ink", align === "center" && "mx-auto")}>
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-xl text-base leading-relaxed md:text-[1.0625rem]",
            light ? "text-ivory/75" : "text-ink-soft",
          )}
        >
          {description}
        </p>
      )}
    </FadeContent>
  );
}
