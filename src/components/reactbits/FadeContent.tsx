"use client";

/**
 * FadeContent — inspirado no React Bits (reactbits.dev/animations/fade-content)
 * Reescrito com framer-motion (sem GSAP) para manter o bundle enxuto.
 * Usado como "reveal on scroll" padrão das seções.
 */

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type FadeContentProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  blur?: boolean;
  delay?: number;
  duration?: number;
  y?: number;
  amount?: number;
};

export default function FadeContent({
  children,
  blur = false,
  delay = 0,
  duration = 0.9,
  y = 28,
  amount = 0.2,
  ...props
}: FadeContentProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <motion.div {...props}>{children}</motion.div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
