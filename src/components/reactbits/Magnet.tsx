"use client";

/**
 * Magnet — adaptado do React Bits (reactbits.dev/animations/magnet)
 * Ajustes: framer-motion springs (sem re-render a cada pixel),
 * desativado em telas touch e com prefers-reduced-motion.
 */

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagnetProps = {
  children: ReactNode;
  className?: string;
  /** área de atração ao redor do elemento, em px */
  padding?: number;
  /** quanto maior, mais sutil o efeito */
  strength?: number;
};

export default function Magnet({ children, className, padding = 60, strength = 6 }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      const inside =
        Math.abs(cx - e.clientX) < width / 2 + padding && Math.abs(cy - e.clientY) < height / 2 + padding;
      x.set(inside ? (e.clientX - cx) / strength : 0);
      y.set(inside ? (e.clientY - cy) / strength : 0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [padding, strength, reduce, x, y]);

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} className={cn("inline-block", className)}>
      {children}
    </motion.div>
  );
}
