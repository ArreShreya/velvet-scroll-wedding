import { useEffect, useState } from "react";
import monogram from "@/assets/monogram-ps.png.asset.json";
import { useLang } from "@/i18n/LanguageContext";

/**
 * Outer entry screen: a full-page blush/ivory envelope with a royal wax seal.
 * Tapping the seal opens the top flap, then blurs away to reveal the
 * existing beach landing underneath.
 */
export function SealGate({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    if (!opening) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(onDone, reduce ? 0 : 2000);
    return () => window.clearTimeout(id);
  }, [opening, onDone]);

  return (
    <div
      className={`seal-gate fixed inset-0 z-[90] overflow-hidden ${opening ? "is-opening" : ""}`}
    >
      <div className="seal-gate-paper absolute inset-0" />
      <div className="seal-gate-flap seal-gate-flap-left" />
      <div className="seal-gate-flap seal-gate-flap-right" />
      <div className="seal-gate-flap seal-gate-flap-bottom" />
      <div className="seal-gate-flap seal-gate-flap-top" />

      <svg
        className="pointer-events-none absolute inset-0 z-[4] h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g stroke="var(--rose)" strokeWidth="0.22" opacity="0.55" vectorEffect="non-scaling-stroke">
          <line x1="0" y1="0" x2="50" y2="50" />
          <line x1="100" y1="0" x2="50" y2="50" />
          <line x1="0" y1="100" x2="50" y2="50" />
          <line x1="100" y1="100" x2="50" y2="50" />
        </g>
      </svg>

      <button
        type="button"
        aria-label={t.openInvitation}
        onClick={() => setOpening(true)}
        disabled={opening}
        className="seal-gate-seal press focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose"
      >
        <span className="seal-gate-ring" />
        <img src={monogram.url} alt="" width={718} height={980} />
      </button>

      <p className="seal-gate-cue absolute inset-x-0 bottom-[9svh] z-20 animate-pulse px-4 text-center font-sans text-[0.75rem] uppercase tracking-[0.42em] text-rose-deep/75">
        {t.tapTheSeal}
      </p>
    </div>
  );
}
