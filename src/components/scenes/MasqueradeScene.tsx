import { Ground, PaperBase, VIEWBOX } from "./parts";

/** Masquerade — black & magenta hall, rotating disco ball, masked dancers. */
function MaskedFigure({ x, y, s = 1, fill }: { x: number; y: number; s?: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="-38" r="6.5" fill="var(--fig-skin)" />
      <path d="M-7 -41 h14 v5 h-14 z" fill="oklch(0.5 0.24 330)" />
      <path d="M-7 -28 h14 l2 16 h-4 l-2 12 h-6 l-2 -12 h-4 z" fill={fill} />
      <path d="M-6 -26 l-9 -11" stroke="var(--fig-skin)" strokeWidth="3" strokeLinecap="round" />
      <path d="M6 -26 l9 -11" stroke="var(--fig-skin)" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

export function MasqueradeScene() {
  return (
    <svg viewBox={VIEWBOX} className="h-full w-full" role="img" aria-label="Masquerade ball in a dark hall">
      <PaperBase accent="oklch(0.5 0.24 330)" />
      <g id="hall">
        <rect x="0" y="0" width="800" height="330" fill="oklch(0.3 0.06 330)" opacity="0.55" />
        <rect x="0" y="330" width="800" height="120" fill="oklch(0.35 0.05 330)" opacity="0.4" />
        {[70, 200, 600, 730].map((x) => (
          <rect key={x} x={x} y="120" width="34" height="210" rx="6" fill="oklch(0.42 0.12 330)" opacity="0.45" />
        ))}
      </g>
      <Ground y={332} fill="oklch(0.42 0.07 330)" />

      {/* Disco ball */}
      <g id="discoBall">
        <path d="M400 40 v34" stroke="oklch(0.7 0.06 330)" strokeWidth="3" />
        <g className="scene-spin" style={{ transformOrigin: "400px 110px" }}>
          <circle cx="400" cy="110" r="36" fill="oklch(0.62 0.1 330)" />
          {Array.from({ length: 7 }).map((_, r) =>
            Array.from({ length: 8 }).map((_, c) => (
              <rect
                key={`${r}-${c}`}
                x={368 + c * 9}
                y={80 + r * 9}
                width="7"
                height="7"
                fill={(r + c) % 2 ? "oklch(0.85 0.08 330)" : "oklch(0.72 0.14 330)"}
                opacity="0.85"
              />
            )),
          )}
          <circle cx="400" cy="110" r="36" fill="none" stroke="oklch(0.85 0.06 330)" strokeWidth="2" />
        </g>
      </g>

      {/* Reflected specks */}
      <g id="specks">
        {[
          [180, 90],
          [610, 120],
          [270, 200],
          [540, 210],
          [120, 240],
          [690, 260],
          [330, 120],
          [470, 150],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="5"
            fill="oklch(0.9 0.1 330)"
            className="scene-twinkle"
            style={{ animationDelay: `${(i * 0.47).toFixed(2)}s` }}
          />
        ))}
      </g>

      {/* Dancers */}
      <g id="dancers">
        <MaskedFigure x={220} y={368} s={0.85} fill="oklch(0.32 0.05 330)" />
        <MaskedFigure x={290} y={380} s={0.95} fill="oklch(0.55 0.2 330)" />
        <MaskedFigure x={370} y={392} s={1.05} fill="oklch(0.28 0.04 330)" />
        <MaskedFigure x={452} y={384} s={1} fill="oklch(0.6 0.18 330)" />
        <MaskedFigure x={528} y={372} s={0.9} fill="oklch(0.3 0.05 330)" />
        <MaskedFigure x={600} y={362} s={0.8} fill="oklch(0.58 0.19 330)" />
      </g>
    </svg>
  );
}
