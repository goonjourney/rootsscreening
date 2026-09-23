"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Language = "id" | "en";

type LanguageContextValue = {
  lang: Language;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("id");

  function toggleLang() {
    setLang((currentLang) => (currentLang === "id" ? "en" : "id"));
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
