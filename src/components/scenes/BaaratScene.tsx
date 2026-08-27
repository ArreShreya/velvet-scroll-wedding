import { Figure, Ground, PaperBase, VIEWBOX } from "./parts";

/** Baarat — procession with dancing figures around a dhol player whose arm strikes the drum. */
export function BaaratScene() {
  return (
    <svg viewBox={VIEWBOX} className="h-full w-full" role="img" aria-label="Baarat procession with dhol players">
      <PaperBase accent="oklch(0.68 0.17 55)" />
      <g id="skyline">
        <rect x="0" y="0" width="800" height="300" fill="oklch(0.9 0.06 70)" opacity="0.6" />
        {[
          [40, 170],
          [130, 200],
          [640, 190],
          [720, 160],
        ].map(([x, y], i) => (
          <rect key={i} x={x ?? 0} y={y ?? 0} width="90" height={330 - (y ?? 0)} fill="oklch(0.83 0.05 50)" opacity="0.65" />
        ))}
      </g>

      <Ground y={330} fill="oklch(0.86 0.04 70)" />
      <g id="road">
        <rect x="0" y="356" width="800" height="94" fill="oklch(0.8 0.03 60)" />
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x={30 + i * 100} y="400" width="46" height="5" rx="2" fill="oklch(0.88 0.03 60)" />
        ))}
      </g>

      {/* Bunting */}
      <g id="bunting">
        <path d="M0 90 q400 70 800 20" fill="none" stroke="oklch(0.72 0.1 40)" strokeWidth="3" />
        {Array.from({ length: 16 }).map((_, i) => {
          const x = 20 + i * 50;
          const y = 90 + Math.sin((i / 15) * Math.PI) * 46 - i * 2;
          return (
            <path
              key={i}
              d={`M${x - 9} ${y} L${x + 9} ${y} L${x} ${y + 20} Z`}
              fill={i % 3 === 0 ? "oklch(0.7 0.17 30)" : i % 3 === 1 ? "oklch(0.78 0.15 60)" : "oklch(0.84 0.08 15)"}
            />
          );
        })}
      </g>

      {/* Dhol player */}
      <g id="dholPlayer" transform="translate(400 380)">
        <path d="M-9 -30 h18 l3 18 h-5 l-2 12 h-10 l-2 -12 h-5 z" fill="oklch(0.7 0.16 40)" />
        <circle cx="0" cy="-41" r="8" fill="var(--fig-skin)" />
        <path d="M-8 -46 q8 -8 16 0 z" fill="oklch(0.6 0.15 30)" />
        <g id="dhol">
          <ellipse cx="0" cy="-8" rx="26" ry="15" fill="oklch(0.55 0.11 45)" />
          <ellipse cx="-24" cy="-8" rx="5" ry="14" fill="oklch(0.9 0.03 80)" />
          <ellipse cx="24" cy="-8" rx="5" ry="14" fill="oklch(0.9 0.03 80)" />
        </g>
        <g id="dholArm" className="scene-strike" style={{ transformOrigin: "8px -28px" }}>
          <path d="M8 -28 l20 8" stroke="var(--fig-skin)" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M26 -21 l16 -4" stroke="oklch(0.62 0.08 60)" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>

      {/* Dancers around */}
      <g id="baaratis">
        <Figure x={250} y={378} s={0.9} fill="oklch(0.72 0.13 45)" arms="up" />
        <Figure x={310} y={392} s={1} fill="oklch(0.66 0.15 20)" dress arms="up" />
        <Figure x={480} y={392} s={1} fill="oklch(0.74 0.12 60)" arms="up" />
        <Figure x={540} y={378} s={0.9} fill="oklch(0.68 0.14 30)" dress arms="side" />
        <Figure x={608} y={366} s={0.78} fill="oklch(0.75 0.11 50)" arms="up" />
        <Figure x={190} y={364} s={0.75} fill="oklch(0.7 0.12 25)" dress arms="up" />
      </g>
    </svg>
  );
}
