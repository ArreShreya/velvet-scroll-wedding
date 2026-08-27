import { useEffect, useState, type ReactNode } from "react";
import goldRod from "@/assets/gold-rod.png";

type Phase = "closed" | "opening" | "open";

export function ScrollShell({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("closed");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem("scroll-opened") === "1") setPhase("open");
  }, []);

  useEffect(() => {
    if (phase !== "opening") return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => {
      setPhase("open");
      window.sessionStorage.setItem("scroll-opened", "1");
    }, reduce ? 0 : 1600);
    return () => window.clearTimeout(t);
  }, [phase]);

  const opened = phase === "open";

  return (
    <div className="min-h-screen bg-velvet">
      {/* Closed roll */}
      {phase !== "open" && (
        <button
          type="button"
          aria-label="Open the invitation"
          onClick={() => phase === "closed" && setPhase("opening")}
          className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-velvet"
        >
          <div
            className={`relative w-[86vw] max-w-3xl transition-all duration-[1500ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
              phase === "opening" ? "scale-y-[3] opacity-0" : "scale-y-100 opacity-100"
            }`}
          >
            <img
              src={goldRod}
              alt=""
              width={1536}
              height={512}
              className="w-full select-none"
            />
            <div className="pointer-events-none absolute left-[14%] right-[14%] top-1/2 h-[26%] -translate-y-1/2 rounded-[999px] bg-paper-roll shadow-[0_10px_30px_-12px_rgba(60,30,20,0.5)]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34%] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-thread" />
            <div className="pointer-events-none absolute left-1/2 top-[64%] h-10 w-16 -translate-x-1/2 bg-tassel [clip-path:polygon(40%_0,60%_0,100%_100%,0_100%)] opacity-90" />
          </div>
          <p
            className={`mt-10 font-sans text-xs uppercase tracking-[0.5em] text-gold transition-opacity duration-500 ${
              phase === "opening" ? "opacity-0" : "opacity-80 animate-pulse"
            }`}
          >
            tap to unfurl
          </p>
        </button>
      )}

      {/* Fixed rods */}
      <div
        className={`fixed inset-x-0 top-0 z-40 transition-transform duration-[1200ms] ease-out ${
          opened ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <img src={goldRod} alt="" width={1536} height={512} className="h-10 w-full object-fill md:h-14" />
      </div>
      <div
        className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-[1200ms] ease-out ${
          opened ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <img src={goldRod} alt="" width={1536} height={512} className="h-10 w-full object-fill md:h-14" />
      </div>

      {/* Paper surface + content */}
      <main
        className={`relative bg-paper transition-opacity duration-700 ${
          opened ? "opacity-100" : "opacity-0"
        }`}
        style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}
      >
        <div className="pointer-events-none fixed inset-0 z-30 bg-paper-grain opacity-60" />
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
}
