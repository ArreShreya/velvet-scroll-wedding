import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { LanguageToggle } from "./LanguageToggle";
import { Monogram } from "./Monogram";
import { ShlokaAudio } from "./ShlokaAudio";
import { ShellOpenContext } from "./ShellOpen";

// WebGL entry is client-only: never import/render the Canvas during SSR.
const CinematicEntry = lazy(() =>
  import("./entry/CinematicEntry").then((m) => ({ default: m.CinematicEntry })),
);

export function ScrollShell({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);


  const [shower, setShower] = useState(false);
  useEffect(() => {
    if (!opened) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const startId = window.setTimeout(() => setShower(true), 120);
    const endId = window.setTimeout(() => setShower(false), 3700);
    return () => {
      window.clearTimeout(startId);
      window.clearTimeout(endId);
    };
  }, [opened]);

  return (
    <ShellOpenContext.Provider value={opened}>
      <div
        className="h-screen overflow-hidden bg-paper"
        style={{
          ["--header-h" as string]: "3.25rem",
        }}
      >
        {!opened && <SealGate onDone={() => setOpened(true)} />}

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
          <div className="relative z-10 px-2 sm:px-4 lg:px-8">{children}</div>
        </main>
      </div>
    </ShellOpenContext.Provider>
  );
}
