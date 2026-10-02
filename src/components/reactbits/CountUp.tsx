"use client";

/**
 * CountUp — adaptado do React Bits (reactbits.dev/text-animations/count-up)
 * Ajustes: formatação pt-BR, casas decimais e prefers-reduced-motion.
 * O valor final é renderizado no HTML (SEO e leitores de tela).
 */

import { useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

type CountUpProps = {
  to: number;
  from?: number;
  decimals?: number;
  duration?: number;
  delay?: number;
  className?: string;
};

export default function CountUp({ to, from = 0, decimals = 0, duration = 2, delay = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const value = useMotionValue(from);
  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  const spring = useSpring(value, { damping, stiffness });
  const inView = useInView(ref, { once: true, margin: "0px" });

  const format = (n: number) =>
    new Intl.NumberFormat("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);

  useEffect(() => {
    if (!inView || reduce) return;
    if (ref.current) ref.current.textContent = format(from);
    const t = setTimeout(() => value.set(to), delay * 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, to, from, delay, value]);

  useEffect(
    () =>
      spring.on("change", (latest) => {
        if (ref.current) ref.current.textContent = format(latest);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [spring, decimals],
  );

  return (
    <span ref={ref} className={className}>
      {format(to)}
    </span>
  );
}
