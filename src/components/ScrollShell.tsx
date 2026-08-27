import { useEffect, useState, type ReactNode } from "react";
import goldRod from "@/assets/gold-rod.png";
import goldTassel from "@/assets/gold-tassel.png";
import { LanguageToggle } from "./LanguageToggle";
import { useLang } from "@/i18n/LanguageContext";
import beach from "@/assets/beach-watercolor.jpg";
import { ShlokaAudio } from "./ShlokaAudio";

type Phase = "closed" | "opening" | "open";

const UNROLL_MS = 2200;

export function ScrollShell({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("closed");
  const { t } = useLang();

  useEffect(() => {
    if (phase !== "opening") return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setPhase("open"), reduce ? 0 : UNROLL_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const [shower, setShower] = useState(false);
  useEffect(() => {
    if (phase !== "opening") return;
    setShower(true);
    const timer = window.setTimeout(() => setShower(false), 3600);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const opened = phase === "open";
  const unrolling = phase !== "closed";

  /** Rolled paper cylinder + its gold rod, travelling to the viewport edge. */
  const rollTransition = `transform ${UNROLL_MS}ms cubic-bezier(0.33, 0, 0.15, 1)`;

  return (
    <div className="min-h-screen bg-velvet">
      {/* Landing / unrolling stage */}
      {phase !== "open" && (
        <button
          type="button"
          aria-label={t.openInvitation}
          onClick={() => phase === "closed" && setPhase("opening")}
          className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-transparent"
        >
          {/* Beach backdrop — fades away as the scroll unrolls */}
          <div
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
              unrolling ? "opacity-0" : "opacity-100"
            }`}
          >
            <img
              src={beach}
              alt=""
              width={1536}
              height={1024}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-paper-veil backdrop-blur-[3px] backdrop-saturate-125" />
          </div>

          <h1
            className={`relative z-10 mb-14 px-6 text-center font-display text-4xl leading-tight text-rose-deep transition-opacity duration-700 md:text-6xl ${
              unrolling ? "opacity-0" : "opacity-100"
            }`}
            style={{ textShadow: "0 2px 14px oklch(0.99 0.01 60 / 0.75)" }}
          >
            {t.landingTitle}
            <span className="mt-1 block italic">{t.landingTitleItalic}</span>
          </h1>

          {/* ── Upper half of the roll: gently rolls UP ── */}
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 flex flex-col items-center justify-end"
            style={{
              transform: unrolling
                ? "translateY(calc(-100% - 50svh))"
                : "translateY(-100%)",
              transition: rollTransition,
            }}
          >
            <div className="relative w-[86vw] max-w-3xl">
              <div className="mx-auto h-16 w-[calc(100%-8%)] rounded-t-[999px] bg-paper-roll shadow-[0_-8px_22px_-14px_rgba(60,30,20,0.45)] sm:h-20" />
              <img
                src={goldRod}
                alt=""
                width={1536}
                height={512}
                className="-mt-2 w-full select-none"
              />
            </div>
          </div>

          {/* ── Lower half of the roll: gently rolls DOWN ── */}
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 flex flex-col items-center justify-start"
            style={{
              transform: unrolling ? "translateY(50svh)" : "translateY(0)",
              transition: rollTransition,
            }}
          >
            <div className="relative w-[86vw] max-w-3xl">
              <img
                src={goldRod}
                alt=""
                width={1536}
                height={512}
                className="w-full select-none"
              />
              <div className="mx-auto -mt-2 h-16 w-[calc(100%-8%)] rounded-b-[999px] bg-paper-roll shadow-[0_10px_26px_-14px_rgba(60,30,20,0.5)] sm:h-20" />
              {/* Golden thread + tassel, resting on the closed seam */}
              <div
                className={`absolute inset-x-0 top-0 transition-opacity duration-700 ${
                  unrolling ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="absolute left-1/2 top-0 h-24 w-[6px] -translate-x-1/2 rounded-full bg-thread" />
                <img
                  src={goldTassel}
                  alt=""
                  aria-hidden="true"
                  width={1024}
                  height={1024}
                  className="absolute left-1/2 top-16 w-24 -translate-x-1/2 select-none drop-shadow-[0_8px_14px_rgba(90,60,10,0.35)] sm:w-28 md:w-32"
                />
              </div>
            </div>
          </div>

          <p
            className={`relative z-10 mt-52 font-sans text-xs uppercase tracking-[0.5em] text-rose-deep transition-opacity duration-500 ${
              unrolling ? "opacity-0" : "opacity-80 animate-pulse"
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

      {/* Fixed rods, settling in as the roll reaches the edges */}
      <div
        className="fixed inset-x-0 top-0 z-40"
        style={{
          transform: unrolling ? "translateY(0)" : "translateY(-100%)",
          transition: rollTransition,
        }}
      >
        <img src={goldRod} alt="" width={1536} height={512} className="h-9 w-full object-cover md:h-12" />
      </div>
      <div
        className="fixed inset-x-0 bottom-0 z-40"
        style={{
          transform: unrolling ? "translateY(0)" : "translateY(100%)",
          transition: rollTransition,
        }}
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
        className={`relative bg-paper transition-opacity duration-[1200ms] ${
          unrolling ? "opacity-100" : "opacity-0"
        }`}
        style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}
      >
        <div className="pointer-events-none fixed inset-0 z-30 bg-paper-grain opacity-60" />
        <div className="relative z-10 px-8 sm:px-14 md:px-24 lg:px-32">{children}</div>
      </main>
    </div>
  );
}
