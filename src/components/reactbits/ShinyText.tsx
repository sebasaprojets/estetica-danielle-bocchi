"use client";

/**
 * ShinyText — adaptado do React Bits (reactbits.dev/text-animations/shiny-text)
 * Ajustes: animação via CSS (mais leve), cores da marca e
 * desativação automática com prefers-reduced-motion.
 */

import { cn } from "@/lib/utils";

type ShinyTextProps = {
  text: string;
  className?: string;
  color?: string;
  shineColor?: string;
  /** duração de um ciclo, em segundos */
  speed?: number;
};

export default function ShinyText({
  text,
  className,
  color = "#806b5d",
  shineColor = "#e9ddd2",
  speed = 4,
}: ShinyTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent motion-safe:animate-[shine_var(--shine-speed)_linear_infinite]",
        className,
      )}
      style={
        {
          "--shine-speed": `${speed}s`,
          backgroundImage: `linear-gradient(110deg, ${color} 0%, ${color} 40%, ${shineColor} 50%, ${color} 60%, ${color} 100%)`,
          backgroundSize: "250% 100%",
          backgroundPosition: "100% 0",
          WebkitBackgroundClip: "text",
        } as React.CSSProperties
      }
    >
      {text}
    </span>
  );
}
