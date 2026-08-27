import { useEffect, useState, type ReactNode } from "react";
import goldRod from "@/assets/gold-rod.png";
import goldTassel from "@/assets/gold-tassel.png";
import { LanguageToggle } from "./LanguageToggle";
import { useLang } from "@/i18n/LanguageContext";
import beach from "@/assets/beach-watercolor.jpg";
import { ShlokaAudio } from "./ShlokaAudio";

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
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
          {/* Frosted glass veil — the painting stays visible underneath */}
          <div className="pointer-events-none absolute inset-0 bg-paper-veil backdrop-blur-[3px] backdrop-saturate-125" />

          <h1
            className={`relative z-10 mb-12 px-6 text-center font-display text-4xl leading-tight text-rose-deep transition-opacity duration-700 md:text-6xl ${
              phase === "opening" ? "opacity-0" : "opacity-100"
            }`}
            style={{ textShadow: "0 2px 14px oklch(0.99 0.01 60 / 0.75)" }}
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
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34%] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-thread" />
            <img
              src={goldTassel}
              alt=""
              aria-hidden="true"
              width={1024}
              height={1024}
              className="pointer-events-none absolute left-1/2 top-[42%] w-24 -translate-x-1/2 select-none drop-shadow-[0_8px_14px_rgba(90,60,10,0.35)] sm:w-28 md:w-32"
            />
          </div>

          <p
            className={`relative z-10 mt-24 font-sans text-xs uppercase tracking-[0.5em] text-rose-deep transition-opacity duration-500 ${
              phase === "opening" ? "opacity-0" : "opacity-80 animate-pulse"
            }`}
          >
            {t.tapToUnfurl}
          </p>
        </button>
      )}

      {/* Shloka audio — starts once the scroll is open */}
      {opened && <ShlokaAudio />}

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

      {/* Torn deckled paper edges, pulled in from the rod ends */}
      <div
        className={`pointer-events-none fixed inset-y-0 left-4 z-40 w-5 bg-deckle-left transition-opacity duration-700 sm:left-8 md:left-16 md:w-8 lg:left-24 ${
          opened ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`pointer-events-none fixed inset-y-0 right-4 z-40 w-5 bg-deckle-right transition-opacity duration-700 sm:right-8 md:right-16 md:w-8 lg:right-24 ${
          opened ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Velvet margin outside the paper, left and right */}
      <div className="pointer-events-none fixed inset-y-0 left-0 z-30 w-4 bg-velvet sm:w-8 md:w-16 lg:w-24" />
      <div className="pointer-events-none fixed inset-y-0 right-0 z-30 w-4 bg-velvet sm:w-8 md:w-16 lg:w-24" />

      {/* Paper surface + content */}
      <main
        className={`relative bg-paper transition-opacity duration-700 ${
          opened ? "opacity-100" : "opacity-0"
        }`}
        style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}
      >
        <div className="pointer-events-none fixed inset-0 z-30 bg-paper-grain opacity-60" />
        <div className="relative z-10 px-8 sm:px-14 md:px-24 lg:px-32">{children}</div>
      </main>
    </div>
  );
}
