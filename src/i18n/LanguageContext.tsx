import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations, type Dict, type Lang } from "./translations";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, t: translations[lang] }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) return { lang: "en", setLang: () => {}, t: translations.en };
  return ctx;
}
