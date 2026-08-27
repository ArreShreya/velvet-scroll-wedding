import { Figure, Ground, PaperBase, VIEWBOX } from "./parts";

/** Mehandi — lawn with palm trees, dark pink & orange decor. Palm leaves sway. */
export function MehandiScene() {
  return (
    <svg viewBox={VIEWBOX} className="h-full w-full" role="img" aria-label="Mehandi on a palm-lined lawn">
      <PaperBase accent="oklch(0.62 0.19 15)" />
      <g id="sky">
        <circle cx="640" cy="110" r="70" fill="oklch(0.82 0.14 55)" opacity="0.35" />
      </g>
      <Ground y={330} fill="oklch(0.82 0.09 140)" />
      <g id="lawnShade">
        <path d="M0 372 c180 -10 340 12 520 2 c110 -6 180 8 280 0 V450 H0 Z" fill="oklch(0.76 0.1 140)" opacity="0.6" />
      </g>

      {/* Decor canopy */}
      <g id="canopy">
        <path d="M250 250 L400 190 L550 250 Z" fill="oklch(0.62 0.19 15)" opacity="0.75" />
        <path d="M250 250 q75 26 150 0 q75 26 150 0" fill="none" stroke="oklch(0.72 0.17 50)" strokeWidth="5" />
        <rect x="256" y="250" width="6" height="86" fill="oklch(0.55 0.09 40)" />
        <rect x="538" y="250" width="6" height="86" fill="oklch(0.55 0.09 40)" />
        <g id="marigoldStrand">
          {Array.from({ length: 13 }).map((_, i) => (
            <circle key={i} cx={258 + i * 23} cy={262 + Math.sin(i) * 5} r="5" fill="oklch(0.75 0.17 60)" />
          ))}
        </g>
      </g>

      {/* Palm trees — trunks static, leaves animated */}
      {[
        { x: 110, y: 336, s: 1 },
        { x: 700, y: 340, s: 1.15 },
        { x: 205, y: 330, s: 0.75 },
      ].map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y}) scale(${p.s})`}>
          <path d="M0 0 c-6 -50 -4 -90 4 -128" stroke="oklch(0.55 0.07 60)" strokeWidth="9" fill="none" strokeLinecap="round" />
          <g id={`palmLeaves-${i + 1}`} className="scene-sway" style={{ animationDelay: `${i * 0.9}s` }}>
            <path d="M4 -128 c-40 -6 -62 6 -78 26 c30 -10 54 -12 78 -6 z" fill="oklch(0.68 0.13 145)" />
            <path d="M4 -128 c40 -6 62 6 78 26 c-30 -10 -54 -12 -78 -6 z" fill="oklch(0.63 0.13 145)" />
            <path d="M4 -128 c-18 -34 -42 -44 -66 -46 c22 16 38 32 60 54 z" fill="oklch(0.7 0.12 150)" />
            <path d="M4 -128 c18 -34 42 -44 66 -46 c-22 16 -38 32 -60 54 z" fill="oklch(0.6 0.13 148)" />
          </g>
        </g>
      ))}

      {/* Seated couple with mehandi being applied */}
      <g id="mehandiScene">
        <ellipse cx="400" cy="336" rx="86" ry="12" fill="oklch(0.6 0.14 20)" opacity="0.2" />
        <g transform="translate(372 336)">
          <path d="M-26 0 c0 -22 10 -34 26 -34 c16 0 26 12 26 34 z" fill="oklch(0.62 0.19 15)" />
          <circle cx="0" cy="-42" r="8" fill="var(--fig-skin)" />
          <path d="M-16 -14 q16 -10 30 -2" stroke="var(--fig-skin)" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
        <g transform="translate(428 336)">
          <path d="M-24 0 c0 -20 9 -32 24 -32 c15 0 24 12 24 32 z" fill="oklch(0.7 0.16 50)" />
          <circle cx="0" cy="-40" r="8" fill="var(--fig-skin)" />
        </g>
        {/* artist applying mehandi */}
        <g transform="translate(330 336)">
          <path d="M-20 0 c0 -18 8 -30 20 -30 c12 0 20 12 20 30 z" fill="oklch(0.78 0.08 30)" />
          <circle cx="0" cy="-38" r="7.5" fill="var(--fig-skin)" />
          <path d="M14 -22 l26 8" stroke="var(--fig-skin)" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>
        <Figure x={492} y={336} s={0.85} fill="oklch(0.66 0.16 35)" dress arms="side" />
      </g>
    </svg>
  );
}
