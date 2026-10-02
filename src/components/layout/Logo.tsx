import { cn } from "@/lib/utils";
import { clinic } from "@/data/clinic";
import { LotusMark } from "@/components/brand/Lotus";

type LogoProps = { className?: string; tone?: "dark" | "light"; size?: "md" | "lg" };

/** Logotipo: símbolo de lótus + nome. As pétalas se abrem lentamente no hover. */
export function Logo({ className, tone = "dark", size = "md" }: LogoProps) {
  return (
    <span className={cn("group flex items-center gap-3", className)}>
      <LotusMark
        strokeWidth={7}
        className={cn("shrink-0", size === "lg" ? "w-14 md:w-16" : "w-10", tone === "light" ? "text-ivory" : "text-ink")}
      />
      <span className="flex flex-col leading-none">
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
    </span>
  );
}
