"use client";

/**
 * CircularText — inspirado no React Bits (reactbits.dev/text-animations/circular-text)
 * Versão em SVG (texto nítido e acessível) com rotação lenta via CSS.
 */

import { useId } from "react";
import { cn } from "@/lib/utils";

type CircularTextProps = {
  text: string;
  className?: string;
  /** duração de uma volta completa, em segundos */
  duration?: number;
};

export default function CircularText({ text, className, duration = 28 }: CircularTextProps) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className={cn("motion-safe:animate-spin", className)}
      style={{ animationDuration: `${duration}s`, animationTimingFunction: "linear" }}
    >
      <defs>
        <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
      </defs>
      <text className="fill-current" style={{ fontSize: 12.5, fontWeight: 600 }}>
        <textPath href={`#${id}`} textLength={486} lengthAdjust="spacing">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
