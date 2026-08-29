import { useEffect, useState, type ReactNode } from "react";
import goldRod from "@/assets/gold-rod.png";
import goldTassel from "@/assets/gold-tassel.png";
import { LanguageToggle } from "./LanguageToggle";
import { Monogram } from "./Monogram";
import { useLang } from "@/i18n/LanguageContext";
import beach from "@/assets/beach-watercolor.jpg";
import { ShlokaAudio } from "./ShlokaAudio";
import { ShellOpenContext } from "./ShellOpen";

type Phase = "closed" | "opening" | "open";

const UNFURL_MS = 2000;

export function ScrollShell({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("closed");
  const { t } = useLang();

  useEffect(() => {
    if (phase !== "opening") return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => setPhase("open"), reduce ? 0 : UNFURL_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  const [shower, setShower] = useState(false);
  useEffect(() => {
    if (phase !== "opening") return;
    setShower(true);
    const id = window.setTimeout(() => setShower(false), 3600);
    return () => window.clearTimeout(id);
  }, [phase]);

  const closed = phase === "closed";
  const opened = phase === "open";
  const unrolling = !closed; // rods travel to their pinned positions

  return (
    <ShellOpenContext.Provider value={opened}>
      <div
        className="min-h-screen overflow-x-hidden bg-velvet"
        style={{
          ["--header-h" as string]: "2.75rem",
          ["--rod-h" as string]: "clamp(3.5rem, 8vw, 6rem)",

        }}
      >
        {/* ---------- Landing backdrop (beach) ---------- */}
        {!opened && (
          <button
            type="button"
            aria-label={t.openInvitation}
            onClick={() => closed && setPhase("opening")}
            className={`fixed inset-0 z-40 flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-velvet transition-opacity duration-[900ms] ${
              closed ? "opacity-100" : "pointer-events-none opacity-0"
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
              className={`relative z-10 mt-[10vh] mb-[38vh] px-6 text-center font-display text-4xl leading-tight text-rose-deep transition-opacity duration-700 md:text-6xl ${
                closed ? "opacity-100" : "opacity-0"
              }`}
              style={{ textShadow: "0 2px 14px oklch(0.99 0.01 60 / 0.75)" }}
            >
              {t.landingTitle}
              <span className="mt-1 block italic">{t.landingTitleItalic}</span>
            </h1>

            <p
              className={`relative z-10 mt-[34vh] font-sans text-xs uppercase tracking-[0.5em] text-rose-deep transition-opacity duration-500 ${
                closed ? "animate-pulse opacity-80" : "opacity-0"
              }`}
            >
              {t.tapToUnfurl}
            </p>
          </button>
        )}

        {/* ---------- The paper, uncoiling from the centre outward ---------- */}
        {!opened && (
          <div
            className="pointer-events-none fixed inset-0 z-[25] bg-paper transition-[clip-path] ease-[cubic-bezier(0.33,0,0.2,1)]"
            style={{
              clipPath: unrolling
                ? "inset(var(--header-h) 0px 0px 0px)"
                : "inset(50% 0px calc(50% - var(--rod-h)) 0px)",
              transitionDuration: `${UNFURL_MS}ms`,
            }}
          >
            <div className="absolute inset-0 bg-paper-grain opacity-60" />
          </div>
        )}

        {/* ---------- Header strip: monogram + language toggle ---------- */}
        <header
          className={`fixed inset-x-0 top-0 z-[70] flex h-[var(--header-h)] items-center justify-between px-3 transition-colors duration-700 md:px-5 ${
            closed ? "bg-transparent" : "bg-velvet"
          }`}
        >
          <div className="pointer-events-auto rounded-full border border-rose/50 bg-paper-tint px-2 py-0.5 shadow-[0_6px_18px_-12px_rgba(90,50,40,0.6)] backdrop-blur-sm">
            <Monogram />
          </div>
          <LanguageToggle />
        </header>

        {/* ---------- The two golden rods: present from the start ---------- */}
        {/* Top rod — starts at the centre, rolls up to just under the header */}
        <div
          className="pointer-events-none fixed inset-x-0 top-[var(--header-h)] z-[45] ease-[cubic-bezier(0.33,0,0.2,1)]"
          style={{
            transform: closed
              ? "translateY(calc(50vh - var(--header-h) - var(--rod-h)))"
              : "translateY(0)",
            transition: `transform ${UNFURL_MS}ms cubic-bezier(0.33,0,0.2,1)`,
          }}
        >
          <img
            src={goldRod}
            alt=""
            width={1536}
            height={171}
            className="block h-[var(--rod-h)] w-full object-fill"
          />
        </div>

        {/* Bottom rod — starts at the centre, rolls down to the bottom edge */}
        <div
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[45]"
          style={{
            transform: closed
              ? "translateY(calc(var(--rod-h) - 50vh))"
              : "translateY(0)",
            transition: `transform ${UNFURL_MS}ms cubic-bezier(0.33,0,0.2,1)`,
          }}
        >
          <img
            src={goldRod}
            alt=""
            width={1536}
            height={171}
            className="block h-[var(--rod-h)] w-full object-fill"
          />
        </div>

        {/* Gold thread + tassel on the closed bundle — falls away on tap */}
        {!opened && (
          <div
            className="pointer-events-none fixed inset-x-0 top-1/2 z-[46] flex -translate-y-1/2 justify-center transition-opacity duration-500"
            style={{ opacity: closed ? 1 : 0 }}
          >
            <div className="relative w-[86vw] max-w-3xl">
              <div className="absolute left-1/2 top-1/2 h-[3.5rem] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-thread" />
              <img
                src={goldTassel}
                alt=""
                aria-hidden="true"
                width={1024}
                height={1024}
                className="absolute left-1/2 top-1/2 w-20 -translate-x-1/2 select-none drop-shadow-[0_8px_14px_rgba(90,60,10,0.35)] sm:w-24"
              />
            </div>
          </div>
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

        {/* Torn deckled paper edges — below the rods */}
        <div
          className={`pointer-events-none fixed left-4 z-[35] w-5 bg-deckle-left transition-opacity duration-700 sm:left-8 md:left-16 md:w-8 lg:left-24 ${
            opened ? "opacity-100" : "opacity-0"
          }`}
          style={{
            top: "calc(var(--header-h) + var(--rod-h))",
            bottom: "var(--rod-h)",
          }}
        />
        <div
          className={`pointer-events-none fixed right-4 z-[35] w-5 bg-deckle-right transition-opacity duration-700 sm:right-8 md:right-16 md:w-8 lg:right-24 ${
            opened ? "opacity-100" : "opacity-0"
          }`}
          style={{
            top: "calc(var(--header-h) + var(--rod-h))",
            bottom: "var(--rod-h)",
          }}
        />
        {/* Velvet margin outside the paper, left and right */}
        <div className="pointer-events-none fixed inset-y-0 left-0 z-30 w-4 bg-velvet sm:w-8 md:w-16 lg:w-24" />
        <div className="pointer-events-none fixed inset-y-0 right-0 z-30 w-4 bg-velvet sm:w-8 md:w-16 lg:w-24" />

        {/* Paper surface — strictly between the two rods, never past them */}
        <div
          className={`pointer-events-none fixed inset-x-0 z-0 bg-paper transition-opacity duration-700 ${
            opened ? "opacity-100" : "opacity-0"
          }`}
          style={{
            top: "calc(var(--header-h) + var(--rod-h))",
            bottom: "var(--rod-h)",
          }}
        >
          <div className="absolute inset-0 bg-paper-grain opacity-60" />
        </div>

        {/* Content — tucked between both rods */}
        <main
          className={`relative transition-opacity duration-700 ${
            opened ? "opacity-100" : "opacity-0"
          }`}
          style={{
            paddingTop: "calc(var(--header-h) + var(--rod-h))",
            paddingBottom: "var(--rod-h)",
          }}
        >
          <div className="relative z-10 px-8 sm:px-14 md:px-24 lg:px-32">{children}</div>
        </main>

      </div>
    </ShellOpenContext.Provider>
  );
}
