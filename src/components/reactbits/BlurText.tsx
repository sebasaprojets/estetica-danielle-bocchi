"use client";

/**
 * BlurText — adaptado do React Bits (reactbits.dev/text-animations/blur-text)
 * Ajustes: framer-motion, tag configurável, acessibilidade (aria-label)
 * e respeito a prefers-reduced-motion.
 */

import { motion, useInView, useReducedMotion, type Easing } from "framer-motion";
import { useMemo, useRef, type ElementType } from "react";
import { cn } from "@/lib/utils";

type BlurTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** atraso entre palavras, em ms */
  delay?: number;
  /** atraso inicial, em segundos */
  startDelay?: number;
  direction?: "top" | "bottom";
  stepDuration?: number;
  easing?: Easing;
  once?: boolean;
  /** false = aguarda (ex.: até a abertura terminar) */
  play?: boolean;
};

export default function BlurText({
  text,
  as: Tag = "p",
  className,
  delay = 90,
  startDelay = 0,
  direction = "bottom",
  stepDuration = 0.45,
  easing = [0.22, 1, 0.36, 1],
  once = true,
  play = true,
}: BlurTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, amount: 0.3 });
  const reduce = useReducedMotion();
  const words = useMemo(() => text.split(" "), [text]);

  const offset = direction === "top" ? -24 : 24;
  const from = { filter: "blur(10px)", opacity: 0, y: offset };
  const to = {
    filter: ["blur(10px)", "blur(4px)", "blur(0px)"],
    opacity: [0, 0.6, 1],
    y: [offset, offset * -0.15, 0],
  };

  if (reduce) {
    return (
      <Tag ref={ref} className={className}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={cn("flex flex-wrap", className)} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block will-change-[transform,filter,opacity]"
          initial={from}
          animate={inView && play ? to : from}
          transition={{
            duration: stepDuration * 2,
            times: [0, 0.5, 1],
            delay: startDelay + (i * delay) / 1000,
            ease: easing,
          }}
        >
          {word}
          {i < words.length - 1 && " "}
        </motion.span>
      ))}
    </Tag>
  );
}
