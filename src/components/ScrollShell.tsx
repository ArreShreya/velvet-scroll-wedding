import { useEffect, useState, type ReactNode } from "react";
import goldRod from "@/assets/gold-rod.png";
import { LanguageToggle } from "./LanguageToggle";
import { useLang } from "@/i18n/LanguageContext";
import beach from "@/assets/beach-watercolor.jpg";

type Phase = "closed" | "opening" | "open";

export function ScrollShell({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("closed");
  const { t } = useLang();

  useEffect(() => {
    if (phase !== "opening") return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setPhase("open"), reduce ? 0 : 1600);
    return () => window.clearTimeout(t);
  }, [phase]);

  const [shower, setShower] = useState(false);
  useEffect(() => {
    if (phase !== "opening") return;
    setShower(true);
    const t = window.setTimeout(() => setShower(false), 3600);
    return () => window.clearTimeout(t);
  }, [phase]);

  const opened = phase === "open";

  return (
    <div className="min-h-screen bg-velvet">
      {/* Landing screen: watercolor beach + title + closed roll */}
      {phase !== "open" && (
        <button
          type="button"
          aria-label={t.openInvitation}
          onClick={() => phase === "closed" && setPhase("opening")}
          className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-velvet"
        >
          <img
            src={beach}
            alt=""
            width={1536}
            height={1024}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="pointer-events-none absolute inset-0 bg-paper-veil" />

          <h1
            className={`relative z-10 mb-12 px-6 text-center font-display text-4xl leading-tight text-rose-deep transition-opacity duration-700 md:text-6xl ${
              phase === "opening" ? "opacity-0" : "opacity-100"
            }`}
          >
            {t.landingTitle}
            <span className="mt-1 block italic">{t.landingTitleItalic}</span>
          </h1>

          <div
            className={`relative z-10 w-[86vw] max-w-3xl transition-all duration-[1500ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
              phase === "opening" ? "scale-y-[3] opacity-0" : "scale-y-100 opacity-100"
            }`}
          >
            <img src={goldRod} alt="" width={1536} height={512} className="w-full select-none" />
            <div className="pointer-events-none absolute left-[14%] right-[14%] top-1/2 h-[26%] -translate-y-1/2 rounded-[999px] bg-paper-roll shadow-[0_10px_30px_-12px_rgba(60,30,20,0.5)]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34%] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-thread" />
            <div className="pointer-events-none absolute left-1/2 top-[64%] h-10 w-16 -translate-x-1/2 bg-tassel [clip-path:polygon(40%_0,60%_0,100%_100%,0_100%)] opacity-90" />
          </div>

          <p
            className={`relative z-10 mt-10 font-sans text-xs uppercase tracking-[0.5em] text-rose-deep transition-opacity duration-500 ${
              phase === "opening" ? "opacity-0" : "opacity-80 animate-pulse"
            }`}
          >
            {t.tapToUnfurl}
          </p>
        </button>
      )}

      {/* Kumkum & rice shower — plays once on open */}
      {shower && (
        <div className="pointer-events-none fixed inset-0 z-[55] overflow-hidden">
          {Array.from({ length: 46 }).map((_, i) => (
            <span
              key={i}
              className={i % 2 === 0 ? "shower-kumkum" : "shower-rice"}
              style={{
                left: `${(i * 17 + 3) % 100}%`,
                animationDelay: `${((i * 137) % 900) / 1000}s`,
                animationDuration: `${2 + ((i * 7) % 13) / 10}s`,
                ["--drift" as string]: `${(((i * 53) % 60) - 30) / 1}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Language toggle — fixed, above everything */}
      <div className="pointer-events-none fixed right-3 top-2 z-[60] flex justify-end md:right-5 md:top-3">
        <LanguageToggle />
      </div>

      {/* Fixed rods */}
      <div
        className={`fixed inset-x-0 top-0 z-40 transition-transform duration-[1200ms] ease-out ${
          opened ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <img src={goldRod} alt="" width={1536} height={512} className="h-9 w-full object-cover md:h-12" />
      </div>
      <div
        className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-[1200ms] ease-out ${
          opened ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <img src={goldRod} alt="" width={1536} height={512} className="h-9 w-full object-cover md:h-12" />
      </div>

      {/* Torn deckled paper edges, left + right, persistent while scrolling */}
      <div
        className={`pointer-events-none fixed inset-y-0 left-0 z-40 w-5 bg-deckle-left transition-opacity duration-700 md:w-8 ${
          opened ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`pointer-events-none fixed inset-y-0 right-0 z-40 w-5 bg-deckle-right transition-opacity duration-700 md:w-8 ${
          opened ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Paper surface + content */}
      <main
        className={`relative bg-paper transition-opacity duration-700 ${
          opened ? "opacity-100" : "opacity-0"
        }`}
        style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}
      >
        <div className="pointer-events-none fixed inset-0 z-30 bg-paper-grain opacity-60" />
        <div className="relative z-10 px-5 md:px-9">{children}</div>
      </main>
    </div>
  );
}
