import { Figure, PaperBase, VIEWBOX } from "./parts";

/** Fera — taaron ki chhaon, red decor, twinkling stars, couple circling the holy fire. */
const STARS = Array.from({ length: 34 }, (_, i) => ({
  x: Math.round(((i * 137.5) % 100) * 8) + 10,
  y: Math.round(((i * 61.8) % 100) * 2.2) + 12,
  r: 1.4 + ((i * 7) % 5) * 0.4,
  delay: Number((((i * 0.37) % 3.6) + 0.1).toFixed(2)),
}));

export function FeraScene() {
  return (
    <svg viewBox={VIEWBOX} className="h-full w-full" role="img" aria-label="Fera around the holy fire under a starry sky">
      <PaperBase accent="oklch(0.5 0.2 25)" />
      <g id="nightSky">
        <rect x="0" y="0" width="800" height="330" fill="oklch(0.4 0.12 20)" opacity="0.45" />
      </g>

      <g id="stars">
        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="oklch(0.96 0.05 90)"
            className="scene-twinkle"
            style={{ animationDelay: `${s.delay}s` }}
          />
        ))}
      </g>

      <g id="ground">
        <path d="M0 332 q220 -14 420 0 t380 -6 V450 H0 Z" fill="oklch(0.6 0.1 25)" opacity="0.55" />
      </g>

      {/* Drapes */}
      <g id="drapes">
        <path d="M60 40 q40 160 -10 300" fill="none" stroke="oklch(0.55 0.17 25)" strokeWidth="26" opacity="0.5" strokeLinecap="round" />
        <path d="M740 40 q-40 160 10 300" fill="none" stroke="oklch(0.55 0.17 25)" strokeWidth="26" opacity="0.5" strokeLinecap="round" />
      </g>

      {/* Mandap posts + garland */}
      <g id="mandap">
        <rect x="250" y="200" width="8" height="150" fill="oklch(0.66 0.1 40)" />
        <rect x="542" y="200" width="8" height="150" fill="oklch(0.66 0.1 40)" />
        <path d="M240 204 h320 l-22 -30 h-276 z" fill="oklch(0.52 0.18 25)" opacity="0.85" />
        <path d="M254 210 q36 26 72 0 q36 26 72 0 q36 26 72 0 q36 26 76 0" fill="none" stroke="oklch(0.8 0.12 60)" strokeWidth="4" />
      </g>

      {/* Holy fire */}
      <g id="fire">
        <rect x="368" y="330" width="64" height="16" rx="3" fill="oklch(0.5 0.08 40)" />
        <path d="M400 288 c14 16 20 26 20 36 c0 12 -9 20 -20 20 c-11 0 -20 -8 -20 -20 c0 -12 8 -20 20 -36 z" fill="oklch(0.78 0.16 60)" className="scene-flicker" />
        <path d="M400 306 c8 10 12 16 12 22 c0 8 -5 13 -12 13 c-7 0 -12 -5 -12 -13 c0 -7 5 -12 12 -22 z" fill="oklch(0.9 0.12 90)" className="scene-flicker" style={{ animationDelay: "0.6s" }} />
      </g>

      {/* Couple circling the fire */}
      <g id="pheras">
        <ellipse cx="400" cy="350" rx="96" ry="26" fill="none" stroke="oklch(0.8 0.1 60)" strokeWidth="2" strokeDasharray="2 8" opacity="0.7" />
        <Figure x={306} y={356} s={0.95} fill="oklch(0.94 0.02 80)" />
        <Figure x={340} y={366} s={1} fill="oklch(0.58 0.2 25)" dress />
        <path d="M320 330 q12 -8 22 -2" fill="none" stroke="oklch(0.8 0.12 60)" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Seated guests */}
      <g id="guests">
        <Figure x={600} y={372} s={0.7} fill="oklch(0.68 0.13 30)" dress />
        <Figure x={644} y={380} s={0.72} fill="oklch(0.9 0.03 70)" />
        <Figure x={160} y={378} s={0.72} fill="oklch(0.66 0.15 20)" dress />
      </g>
    </svg>
  );
}
