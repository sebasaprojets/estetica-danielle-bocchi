"use client";

/**
 * SpotlightCard — adaptado do React Bits (reactbits.dev/components/spotlight-card)
 * Ajustes: paleta da marca, sem setState a cada movimento (CSS vars),
 * suporte a teclado e className livre.
 */

import { useRef, type HTMLAttributes, type PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    spotlightColor?: string;
  }
>;

export default function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(214, 194, 178, 0.35)",
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={cn("group/spot relative isolate overflow-hidden", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 ease-(--ease-luxe) group-hover/spot:opacity-100 group-focus-within/spot:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 30%), ${spotlightColor}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
