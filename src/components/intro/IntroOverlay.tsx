"use client";

/**
 * Abertura cinematográfica com o logotipo da marca.
 * - Pétalas de lótus desenhadas uma a uma, nome revelado letra a letra.
 * - Interativa: cada pétala e cada letra reagem ao cursor/toque, sempre devagar.
 * - Exibida uma vez por sessão; pode ser pulada (botão, Enter, Esc ou clique em "Entrar").
 * - Desativada automaticamente para quem prefere menos movimento.
 */

import { AnimatePresence, animate, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { INTRO_STORAGE_KEY, useIntro, useIntroSeen } from "@/lib/intro";
import { LotusIntro } from "@/components/brand/Lotus";

const NAME = "DANIELLE BOCCHI";
const TAGLINE = "ESTÉTICA E SAÚDE";
const AUTO_EXIT_MS = 9000;
const ENTER_VISIBLE_MS = 5200;
const slow = [0.22, 1, 0.36, 1] as const;

/** Flores caindo devagar — posições fixas (sem aleatoriedade, sem erro de hidratação). */
const blossoms = [
  { left: 6, size: 18, duration: 26, delay: -4, drift: 60, spin: 260, opacity: 0.45 },
  { left: 14, size: 12, duration: 31, delay: -18, drift: -40, spin: -200, opacity: 0.35 },
  { left: 23, size: 22, duration: 24, delay: -10, drift: 80, spin: 300, opacity: 0.4 },
  { left: 37, size: 10, duration: 34, delay: -22, drift: 30, spin: 180, opacity: 0.3 },
  { left: 48, size: 16, duration: 28, delay: -2, drift: -70, spin: -280, opacity: 0.38 },
  { left: 59, size: 13, duration: 32, delay: -14, drift: 50, spin: 240, opacity: 0.32 },
  { left: 68, size: 20, duration: 25, delay: -7, drift: -50, spin: -220, opacity: 0.42 },
  { left: 77, size: 11, duration: 36, delay: -26, drift: 70, spin: 200, opacity: 0.3 },
  { left: 86, size: 17, duration: 27, delay: -12, drift: -30, spin: -260, opacity: 0.4 },
  { left: 94, size: 14, duration: 30, delay: -20, drift: 40, spin: 220, opacity: 0.35 },
];

type Phase = "play" | "exit" | "done";

export function IntroOverlay() {
  const { setDone } = useIntro();
  const seen = useIntroSeen();
  const [phase, setPhase] = useState<Phase>("play");
  const [showEnter, setShowEnter] = useState(false);
  const exiting = useRef(false);

  // Cursor → valores suaves e lentos (-0.5 … 0.5)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 22, damping: 18, mass: 1.2 });
  const sy = useSpring(py, { stiffness: 22, damping: 18, mass: 1.2 });
  const glowX = useTransform(sx, (v) => `${v * 40}vw`);
  const glowY = useTransform(sy, (v) => `${v * 40}vh`);
  const textX = useTransform(sx, (v) => v * -10);
  const textY = useTransform(sy, (v) => v * -6);
  const blossomX = useTransform(sx, (v) => v * 36);

  const exit = useCallback(() => {
    if (exiting.current) return;
    exiting.current = true;
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {}
    setPhase("exit");
    setDone(true);
  }, [setDone]);

  useEffect(() => {
    if (seen) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";

    // Em telas touch (sem cursor), o logotipo "respira" sozinho, bem devagar.
    const drift: { stop: () => void }[] = [];
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      drift.push(
        animate(px, [0, 0.35, -0.3, 0], { duration: 14, repeat: Infinity, ease: "easeInOut" }),
        animate(py, [0, -0.25, 0.3, 0], { duration: 17, repeat: Infinity, ease: "easeInOut" }),
      );
    }
    const enterTimer = setTimeout(() => setShowEnter(true), ENTER_VISIBLE_MS);
    const autoTimer = setTimeout(exit, AUTO_EXIT_MS);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === " ") exit();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(autoTimer);
      drift.forEach((d) => d.stop());
      window.removeEventListener("keydown", onKey);
    };
  }, [exit, seen, px, py]);

  const onPointerMove = (e: React.PointerEvent) => {
    px.set(e.clientX / window.innerWidth - 0.5);
    py.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = "";
      }}
    >
      {phase === "play" && !seen && (
        <motion.div
          id="intro"
          key="intro"
          role="dialog"
          aria-modal="true"
          aria-label="Abertura — Danielle Bocchi Estética e Saúde"
          onPointerMove={onPointerMove}
          className="grain fixed inset-0 z-[90] flex touch-none items-center justify-center overflow-hidden bg-ivory select-none"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
        >
          {/* Luz suave que acompanha o cursor */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -mt-[42rem] -ml-[42rem] size-[84rem] will-change-transform"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.4, ease: slow }}
            style={{
              x: glowX,
              y: glowY,
              background: "radial-gradient(closest-side, rgba(233,221,210,0.95), rgba(250,248,245,0) 75%)",
            }}
          />

          {/* Flores caindo lentamente */}
          <motion.div aria-hidden="true" style={{ x: blossomX }} className="pointer-events-none absolute inset-0">
            {blossoms.map((b, i) => (
              <span
                key={i}
                className="absolute top-0 motion-safe:animate-[blossom-fall_var(--dur)_linear_infinite]"
                style={
                  {
                    left: `${b.left}%`,
                    "--dur": `${b.duration}s`,
                    "--drift": `${b.drift}px`,
                    "--spin": `${b.spin}deg`,
                    "--blossom-opacity": b.opacity,
                    animationDelay: `${b.delay}s`,
                  } as React.CSSProperties
                }
              >
                <Blossom size={b.size} />
              </span>
            ))}
          </motion.div>

          {/* Logotipo */}
          <motion.div
            className="relative flex flex-col items-center px-6 text-ink"
            exit={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
            transition={{ duration: 0.9, ease: slow }}
          >
            <LotusIntro pointerX={sx} pointerY={sy} className="w-[min(42vw,13rem)] md:w-[15rem]" />

            <motion.p
              aria-label={NAME}
              style={{ x: textX, y: textY }}
              className="mt-10 flex font-serif text-[clamp(1.9rem,7.4vw,4.6rem)] leading-none tracking-[0.06em] text-ink md:mt-12"
            >
              {NAME.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  className="inline-block"
                  initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.6, delay: 2.1 + i * 0.075, ease: slow }}
                  whileHover={{ y: -8, color: "#806b5d", transition: { duration: 1.1, ease: slow } }}
                  whileTap={{ y: -8, color: "#806b5d", transition: { duration: 0.9, ease: slow } }}
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              ))}
            </motion.p>

            <div className="mt-6 flex items-center gap-4 md:mt-7">
              <motion.span
                aria-hidden="true"
                className="h-px w-10 origin-right bg-mocha/60 md:w-16"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.8, delay: 3.6, ease: slow }}
              />
              <motion.p
                className="font-serif text-[clamp(0.85rem,2.6vw,1.35rem)] text-mocha-deep"
                initial={{ opacity: 0, letterSpacing: "0.9em", filter: "blur(6px)" }}
                animate={{ opacity: 1, letterSpacing: "0.32em", filter: "blur(0px)" }}
                transition={{ duration: 2.2, delay: 3.7, ease: slow }}
              >
                {TAGLINE}
              </motion.p>
              <motion.span
                aria-hidden="true"
                className="h-px w-10 origin-left bg-mocha/60 md:w-16"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.8, delay: 3.6, ease: slow }}
              />
            </div>

            <div className="mt-14 h-14">
              <AnimatePresence>
                {showEnter && (
                  <motion.button
                    type="button"
                    onClick={exit}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.4, ease: slow }}
                    className="group inline-flex min-h-12 items-center gap-4 rounded-full border border-ink/20 px-7 text-[0.75rem] font-semibold tracking-[0.3em] text-ink uppercase transition-colors duration-700 hover:border-ink hover:bg-ink hover:text-ivory"
                  >
                    Entrar
                    <span className="relative flex size-2">
                      <span className="absolute inset-0 rounded-full bg-mocha/60 motion-safe:animate-ping [animation-duration:2.4s]" />
                      <span className="relative size-2 rounded-full bg-mocha group-hover:bg-ivory" />
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <button
            type="button"
            onClick={exit}
            className="absolute top-5 right-5 min-h-11 rounded-full px-4 text-[0.6875rem] font-semibold tracking-[0.22em] text-ink-soft uppercase transition-colors hover:text-ink md:top-8 md:right-8"
          >
            Pular introdução
          </button>

          {/* Barra de progresso discreta */}
          <motion.span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-px w-full origin-left bg-mocha/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: AUTO_EXIT_MS / 1000, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Blossom({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <g fill="#c4968a">
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="12" cy="6.5" rx="3.6" ry="5.5" transform={`rotate(${r} 12 12)`} />
        ))}
      </g>
      <circle cx="12" cy="12" r="2" fill="#806b5d" />
    </svg>
  );
}
