"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Phone, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { navigation } from "@/data/navigation";
import { clinic } from "@/data/clinic";
import { cn, telUrl, whatsappUrl } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Logo } from "./Logo";

type MobileMenuProps = { open: boolean; onClose: () => void; active: string };

const ease = [0.22, 1, 0.36, 1] as const;

export function MobileMenu({ open, onClose, active }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const items = focusables();
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ivory lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="flex items-center justify-between px-5 py-5">
            <Logo />
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar menu"
              className="inline-flex size-12 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-ivory"
            >
              <X className="size-5" strokeWidth={1.5} />
            </button>
          </div>

          <nav aria-label="Navegação mobile" className="flex-1 px-5 pt-8">
            <ul className="flex flex-col">
              {navigation.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease }}
                  className="border-b border-line"
                >
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-baseline justify-between py-4"
                  >
                    <span
                      className={cn(
                        "font-serif text-[2.6rem] leading-none transition-colors",
                        active === item.id ? "text-ink italic" : "text-ink/70 group-hover:text-ink",
                      )}
                    >
                      {item.label}
                    </span>
                    <span className="font-serif text-sm text-mocha italic">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-5 px-5 pt-10 pb-[max(2rem,env(safe-area-inset-bottom))]"
          >
            <Button href={whatsappUrl()} size="lg" className="w-full" icon={<WhatsAppIcon className="size-4" />} iconPosition="start">
              Agendar avaliação
            </Button>
            <div className="flex flex-col gap-3 text-sm text-ink-soft">
              <a href={telUrl()} className="inline-flex min-h-11 items-center gap-3">
                <Phone className="size-4 text-mocha" strokeWidth={1.5} /> {clinic.phone.display}
              </a>
              <a
                href={clinic.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-start gap-3"
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-mocha" strokeWidth={1.5} />
                {clinic.address.street}, {clinic.address.complement} — {clinic.address.neighborhood}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
