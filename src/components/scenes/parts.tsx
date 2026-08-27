/** Shared building blocks for the hand-coded event SVG scenes. */

export const VIEWBOX = "0 0 800 450";

type FigureProps = {
  x: number;
  y: number;
  /** uniform scale, 1 ≈ 46px tall */
  s?: number;
  fill: string;
  /** skirt/lehenga silhouette instead of straight body */
  dress?: boolean;
  /** arms raised (dancing) */
  arms?: "down" | "up" | "side";
  skin?: string;
};

/** A small, faceless pastel-painting figure. */
export function Figure({
  x,
  y,
  s = 1,
  fill,
  dress = false,
  arms = "down",
  skin = "var(--fig-skin)",
}: FigureProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="-38" r="6.5" fill={skin} />
      <path d="M-4 -32 h8 l1 6 h-10 z" fill={skin} opacity="0.9" />
      {dress ? (
        <path d="M0 -28 c6 0 8 4 9 10 l5 18 h-28 l5 -18 c1 -6 3 -10 9 -10 z" fill={fill} />
      ) : (
        <path d="M-7 -28 h14 l2 16 h-4 l-2 12 h-6 l-2 -12 h-4 z" fill={fill} />
      )}
      {arms === "up" && (
        <>
          <path d="M-6 -26 l-8 -12" stroke={skin} strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M6 -26 l8 -12" stroke={skin} strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      )}
      {arms === "side" && (
        <>
          <path d="M-6 -26 l-11 6" stroke={skin} strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M6 -26 l11 6" stroke={skin} strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      )}
    </g>
  );
}

/** Soft ivory/blush wash used as the base of every scene. */
export function PaperBase({ accent }: { accent: string }) {
  return (
    <g id="paperBase">
      <rect x="0" y="0" width="800" height="450" fill="var(--scene-paper)" />
      <rect x="0" y="0" width="800" height="450" fill={accent} opacity="0.07" />
    </g>
  );
}

export function Ground({ y = 330, fill }: { y?: number; fill: string }) {
  return (
    <path
      d={`M0 ${y} c120 -14 220 8 340 2 c130 -7 210 12 460 -6 V450 H0 Z`}
      fill={fill}
    />
  );
}
