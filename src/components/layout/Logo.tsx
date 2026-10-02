import { cn } from "@/lib/utils";
import { clinic } from "@/data/clinic";

type LogoProps = { className?: string; tone?: "dark" | "light"; size?: "md" | "lg" };

/** Logotipo tipográfico — substituível pelo arquivo oficial da marca. */
export function Logo({ className, tone = "dark", size = "md" }: LogoProps) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-serif font-medium tracking-[0.01em]",
          size === "lg" ? "text-4xl md:text-5xl" : "text-[1.6rem]",
          tone === "light" ? "text-ivory" : "text-ink",
        )}
      >
        Danielle <span className="italic">Bocchi</span>
      </span>
      <span
        className={cn(
          "mt-1 text-[0.5625rem] font-semibold tracking-[0.34em] uppercase",
          tone === "light" ? "text-sand" : "text-mocha-deep",
        )}
      >
        {clinic.tagline}
      </span>
    </span>
  );
}
