"use client";

import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from "react";

type IntroState = { done: boolean; setDone: (v: boolean) => void };

const IntroContext = createContext<IntroState>({ done: true, setDone: () => {} });

/** Controla quando a abertura terminou, para o hero começar suas animações. */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [finished, setDone] = useState(false);
  const seen = useIntroSeen();
  return <IntroContext.Provider value={{ done: finished || seen, setDone }}>{children}</IntroContext.Provider>;
}

const noopSubscribe = () => () => {};

/** true quando a abertura já foi vista (marcado pelo script de boot no <html>). */
export function useIntroSeen() {
  return useSyncExternalStore(
    noopSubscribe,
    () => !!document.documentElement.dataset.introSeen,
    () => false,
  );
}

export const useIntro = () => useContext(IntroContext);

export const INTRO_STORAGE_KEY = "db-intro-seen";

/**
 * Script executado antes da pintura: se a abertura já foi vista nesta sessão
 * (ou se o visitante prefere menos movimento), ela é ocultada sem "piscar".
 */
export const introBootScript = `try{if(sessionStorage.getItem('${INTRO_STORAGE_KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.introSeen='1'}}catch(e){}`;
