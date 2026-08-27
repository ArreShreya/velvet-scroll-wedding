import { Figure, Ground, PaperBase, VIEWBOX } from "./parts";

/** Engagement & Sangeet — royal blue & gold lawn stage, swinging truss lights + sweeping beam. */
export function SangeetScene() {
  return (
    <svg viewBox={VIEWBOX} className="h-full w-full" role="img" aria-label="Sangeet stage with truss lighting">
      <PaperBase accent="oklch(0.45 0.16 265)" />
      <defs>
        <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.9 0.09 95)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="oklch(0.9 0.09 95)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g id="nightSky">
        <rect x="0" y="0" width="800" height="300" fill="oklch(0.45 0.16 265)" opacity="0.18" />
      </g>
      <Ground y={348} fill="oklch(0.8 0.08 145)" />

      {/* Truss */}
      <g id="truss">
        <rect x="150" y="86" width="500" height="12" fill="oklch(0.72 0.1 90)" />
        <rect x="152" y="98" width="10" height="212" fill="oklch(0.7 0.09 90)" />
        <rect x="638" y="98" width="10" height="212" fill="oklch(0.7 0.09 90)" />
        {Array.from({ length: 12 }).map((_, i) => (
          <path key={i} d={`M${158 + i * 42} 98 l42 -12`} stroke="oklch(0.75 0.09 90)" strokeWidth="3" />
        ))}
      </g>

      <g id="trussLights">
        {[220, 320, 420, 520, 600].map((x, i) => (
          <g
            key={x}
            className="scene-tilt"
            style={{ transformOrigin: `${x}px 98px`, animationDelay: `${i * 0.6}s` }}
          >
            <rect x={x - 8} y="98" width="16" height="18" rx="3" fill="oklch(0.45 0.05 265)" />
            <circle cx={x} cy="118" r="6" fill="oklch(0.88 0.12 95)" />
          </g>
        ))}
      </g>

      {/* Sweeping focus beam */}
      <g id="focusBeam" className="scene-beam" style={{ transformOrigin: "400px 100px" }}>
        <path d="M392 104 L300 300 L500 300 L408 104 Z" fill="url(#beamGrad)" />
      </g>

      {/* Stage */}
      <g id="stage">
        <rect x="250" y="296" width="300" height="18" rx="3" fill="oklch(0.55 0.12 265)" />
        <rect x="250" y="314" width="300" height="14" fill="oklch(0.45 0.1 265)" opacity="0.8" />
        <rect x="250" y="292" width="300" height="6" fill="oklch(0.78 0.1 90)" />
      </g>

      {/* Couple dancing on the stage */}
      <g id="couple">
        <Figure x={378} y={296} s={0.95} fill="oklch(0.4 0.14 265)" arms="up" />
        <Figure x={422} y={296} s={0.95} fill="oklch(0.72 0.12 90)" dress arms="up" />
      </g>

      {/* Guests on the lawn */}
      <g id="guests">
        <Figure x={180} y={360} s={0.8} fill="oklch(0.5 0.12 280)" arms="up" />
        <Figure x={228} y={368} s={0.72} fill="oklch(0.72 0.1 30)" dress />
        <Figure x={596} y={364} s={0.78} fill="oklch(0.48 0.13 265)" arms="side" />
        <Figure x={650} y={372} s={0.7} fill="oklch(0.74 0.1 90)" dress arms="up" />
      </g>
    </svg>
  );
}
