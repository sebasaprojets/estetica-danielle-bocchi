"use client";

/**
 * Símbolo de lótus da marca Danielle Bocchi (recriação vetorial do logotipo).
 * - variant "mark": versão leve para header/rodapé, com balanço lento no hover.
 * - variant "intro": versão cinematográfica — pétalas desenhadas uma a uma,
 *   respiração contínua e parallax individual que segue o cursor devagar.
 */

import { motion, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type Petal = {
  id: string;
  d: string;
  /** profundidade do parallax (px) */
  depth: number;
  /** ordem de desenho */
  order: number;
  /** pétala preenchida (base) */
  fill?: boolean;
  /** direção do balanço */
  sway: number;
};

export const petals: Petal[] = [
  { id: "center", d: "M100 8 C116 34 118 66 100 98 C82 66 84 34 100 8 Z", depth: 6, order: 0, sway: 0 },
  { id: "inner-r", d: "M105 98 C112 72 128 50 152 36 C153 64 136 88 105 98 Z", depth: 11, order: 1, sway: 1 },
  { id: "inner-l", d: "M95 98 C88 72 72 50 48 36 C47 64 64 88 95 98 Z", depth: 11, order: 1, sway: -1 },
  { id: "outer-r", d: "M110 104 C132 86 158 74 192 72 C178 98 146 112 110 104 Z", depth: 17, order: 2, sway: 1 },
  { id: "outer-l", d: "M90 104 C68 86 42 74 8 72 C22 98 54 112 90 104 Z", depth: 17, order: 2, sway: -1 },
  { id: "base-l", d: "M22 92 C40 122 78 134 100 120 C80 126 46 116 22 92 Z", depth: 4, order: 3, fill: true, sway: 0 },
  { id: "base-r", d: "M178 92 C160 122 122 134 100 120 C120 126 154 116 178 92 Z", depth: 4, order: 3, fill: true, sway: 0 },
];

const VIEWBOX = "0 0 200 140";

export function LotusMark({ className, strokeWidth = 6 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox={VIEWBOX} aria-hidden="true" className={cn("overflow-visible", className)}>
      {petals.map((p) => (
        <path
          key={p.id}
          d={p.d}
          fill={p.fill ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          className="origin-[50%_100%] transition-transform duration-[1600ms] ease-(--ease-luxe) [transform-box:fill-box]"
          style={{ ["--sway" as string]: `${p.sway * 7}deg` }}
          data-petal={p.sway !== 0 ? "" : undefined}
        />
      ))}
    </svg>
  );
}

type LotusIntroProps = {
  className?: string;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  /** atraso inicial do desenho, em segundos */
  delay?: number;
};

export function LotusIntro({ className, pointerX, pointerY, delay = 0.3 }: LotusIntroProps) {
  return (
    <svg viewBox={VIEWBOX} aria-hidden="true" className={cn("overflow-visible", className)}>
      {petals.map((p) => (
        <IntroPetal key={p.id} petal={p} pointerX={pointerX} pointerY={pointerY} delay={delay} />
      ))}
    </svg>
  );
}

function IntroPetal({
  petal,
  pointerX,
  pointerY,
  delay,
}: {
  petal: Petal;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  delay: number;
}) {
  const x = useTransform(pointerX, (v) => v * petal.depth);
  const y = useTransform(pointerY, (v) => v * petal.depth * 0.6);
  const rotate = useTransform(pointerX, (v) => v * petal.depth * 0.25 + petal.sway * 0.5);
  const start = delay + petal.order * 0.38;
  const ease = [0.65, 0, 0.35, 1] as const;

  return (
    <motion.g style={{ x, y, rotate, transformBox: "fill-box", transformOrigin: "50% 100%" }}>
      <motion.g
        // respiração lenta e contínua
        animate={petal.sway ? { rotate: [0, petal.sway * 2.2, 0] } : { scale: [1, 1.015, 1] }}
        transition={{ duration: 7 + petal.order, repeat: Infinity, ease: "easeInOut", delay: start + 2 }}
        style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
      >
        <motion.path
          d={petal.d}
          stroke="currentColor"
          strokeWidth={5}
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="currentColor"
          initial={{ pathLength: 0, fillOpacity: 0, opacity: 0 }}
          animate={{ pathLength: 1, fillOpacity: petal.fill ? 1 : 0, opacity: 1 }}
          transition={{
            pathLength: { duration: 2.2, delay: start, ease },
            opacity: { duration: 0.4, delay: start },
            fillOpacity: { duration: 1.4, delay: start + 1.4, ease },
          }}
          whileHover={{ scale: 1.07, transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] } }}
          whileTap={{ scale: 1.1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }}
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%", cursor: "default" }}
        />
      </motion.g>
    </motion.g>
  );
}
