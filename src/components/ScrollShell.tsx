import { useEffect, useState, type ReactNode } from "react";
import monogram from "@/assets/monogram-ps.png.asset.json";
import { LanguageToggle } from "./LanguageToggle";
import { Monogram } from "./Monogram";
import { useLang } from "@/i18n/LanguageContext";
import beach from "@/assets/beach-watercolor.jpg";
import { ShlokaAudio } from "./ShlokaAudio";
import { ShellOpenContext } from "./ShellOpen";

type Phase = "closed" | "opening" | "open";

const OPEN_MS = 1800;

export function ScrollShell({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("closed");
  const { t } = useLang();

  useEffect(() => {
    if (phase !== "opening") return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => setPhase("open"), reduce ? 0 : OPEN_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  const [shower, setShower] = useState(false);
  useEffect(() => {
    if (phase !== "opening") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const startId = window.setTimeout(() => setShower(true), 900);
    const endId = window.setTimeout(() => setShower(false), 4500);
    return () => {
      window.clearTimeout(startId);
      window.clearTimeout(endId);
    };
  }, [phase]);

  const closed = phase === "closed";
  const opened = phase === "open";

  return (
    <ShellOpenContext.Provider value={opened}>
      <div
        className="h-screen overflow-hidden bg-paper"
        style={{
          ["--header-h" as string]: "3.25rem",
        }}
      >
        {/* ---------- Sealed envelope landing ---------- */}
        {!opened && (
          <button
            type="button"
            aria-label={t.openInvitation}
            onClick={() => closed && setPhase("opening")}
            className={`envelope-intro fixed inset-0 z-40 cursor-pointer overflow-hidden bg-velvet focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose ${
              phase === "opening" ? "is-opening pointer-events-none" : ""
            }`}
          >
            <img
              src={beach}
              alt=""
              width={1536}
              height={1024}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-paper-veil backdrop-blur-[1px] backdrop-saturate-110" />

            <h1
              className="envelope-title absolute inset-x-0 top-[8svh] z-10 px-6 text-center font-display text-4xl leading-tight text-rose-deep md:top-[7svh] md:text-6xl"
              style={{ textShadow: "0 2px 14px oklch(0.99 0.01 60 / 0.75)" }}
            >
              {t.landingTitle}
              <span className="mt-1 block italic">{t.landingTitleItalic}</span>
            </h1>

            <div className="envelope-stage absolute left-1/2 top-[54%] w-[88vw] max-w-[42rem] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
              <div className="envelope-shell">
                <div className="envelope-back" />
                <div className="envelope-letter">
                  <span className="font-display text-sm uppercase tracking-[0.28em] text-rose-deep/80 sm:text-base">
                    Shreya <i className="normal-case">&amp;</i> Prabhav
                  </span>
                  <span className="mt-1 font-sans text-[0.55rem] uppercase tracking-[0.3em] text-ink/55 sm:text-[0.65rem]">
                    11 · 12 December
                  </span>
                </div>
                <div className="envelope-flap" />
                <div className="envelope-front" />
                <div className="envelope-seal">
                  <img src={monogram.url} alt="" width={718} height={980} />
                </div>
              </div>
            </div>

            <p
              className="envelope-cue absolute inset-x-0 bottom-[8svh] z-10 animate-pulse px-4 font-sans text-xs uppercase tracking-[0.42em] text-rose-deep/80"
            >
              {t.tapToUnfurl}
            </p>
          </button>
        )}

        {/* ---------- Header strip: monogram + language toggle ---------- */}
        <header
          className={`invitation-header fixed inset-x-0 top-0 z-[70] flex h-[var(--header-h)] items-center justify-between border-b border-rose/30 px-3 transition-opacity duration-700 md:px-5 ${
            opened ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="pointer-events-auto rounded-full border border-rose/50 bg-paper-tint px-2 py-0.5 shadow-[0_6px_18px_-12px_rgba(90,50,40,0.6)] backdrop-blur-sm">
            <Monogram />
          </div>
          <LanguageToggle />
        </header>

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

        {/* Full-viewport handmade paper surface */}
        <div
          className={`pointer-events-none fixed inset-0 z-0 bg-paper transition-opacity duration-700 ${
            opened ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-paper-grain opacity-60" />
        </div>

        {/* Full-screen invitation content */}
        <main
          className={`fixed inset-x-0 z-10 overflow-x-hidden overflow-y-auto overscroll-contain transition-opacity duration-700 ${
            opened ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          style={{
            top: "var(--header-h)",
            bottom: 0,
          }}
        >
          <div className="relative z-10 px-2 sm:px-4 lg:px-8">
            {children}
          </div>
        </main>

      </div>
    </ShellOpenContext.Provider>
  );
}
