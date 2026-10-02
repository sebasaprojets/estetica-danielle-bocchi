"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./Icons";
import { whatsappUrl } from "@/lib/utils";

/** Botão flutuante do WhatsApp — sempre acessível, sem pop-ups invasivos. */
export function WhatsAppButton() {
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState(false);

  // Mostra o rótulo por alguns segundos após o carregamento, depois recolhe.
  useEffect(() => {
    const show = setTimeout(() => setExpanded(true), 2400);
    const hide = setTimeout(() => setExpanded(false), 7400);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  return (
    <motion.a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar pelo WhatsApp"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex h-14 items-center gap-2 rounded-full bg-[#1f7a4d] pr-4 pl-4 text-white shadow-lift transition-colors duration-300 hover:bg-[#186640] md:right-6 md:bottom-6"
    >
      <span className="relative flex size-6 items-center justify-center">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-white/30 motion-safe:animate-ping [animation-duration:2.6s]"
        />
        <WhatsAppIcon className="relative size-6" />
      </span>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.span
            key="label"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden text-sm font-semibold whitespace-nowrap"
          >
            Agende pelo WhatsApp
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
}
