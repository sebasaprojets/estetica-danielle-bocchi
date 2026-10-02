"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { navigation } from "@/data/navigation";
import { cn, whatsappUrl } from "@/lib/utils";
import { useActiveSection } from "@/lib/useActiveSection";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

const sectionIds = navigation.map((n) => n.id);

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter,padding] duration-500 ease-(--ease-luxe)",
          scrolled
            ? "bg-ivory/80 py-3 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl backdrop-saturate-150"
            : "bg-transparent py-5 md:py-7",
        )}
      >
        <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-6 px-5 md:px-10">
          <Link href="/#inicio" aria-label="Estética Danielle Bocchi — voltar ao início" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative inline-flex min-h-11 items-center px-4 text-[0.8125rem] font-medium tracking-wide transition-colors duration-300",
                        isActive ? "text-ink" : "text-ink-soft hover:text-ink",
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-x-4 bottom-2 h-px bg-mocha"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button href={whatsappUrl()} size="md" className="hidden sm:inline-flex">
              Agendar avaliação
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex size-12 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-ivory lg:hidden"
            >
              <Menu className="size-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} active={active} />
    </>
  );
}
