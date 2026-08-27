import { Figure, PaperBase, VIEWBOX } from "./parts";

/** Haldi — lilac & yellow pool deck rain dance, shimmering water, falling petals. */
export function HaldiScene() {
  const petals = Array.from({ length: 14 }, (_, i) => ({
    x: 60 + i * 52,
    delay: (i * 0.73) % 6,
    dur: 7 + (i % 4),
    fill: i % 2 ? "oklch(0.85 0.15 95)" : "oklch(0.78 0.16 60)",
  }));

  return (
    <svg viewBox={VIEWBOX} className="h-full w-full" role="img" aria-label="Haldi rain dance on a pool deck">
      <PaperBase accent="oklch(0.72 0.13 300)" />
      <g id="sky">
        <rect x="0" y="0" width="800" height="240" fill="oklch(0.85 0.08 300)" opacity="0.5" />
        <circle cx="130" cy="80" r="46" fill="oklch(0.9 0.11 95)" opacity="0.5" />
      </g>

      <g id="deck">
        <rect x="0" y="240" width="800" height="90" fill="oklch(0.9 0.04 90)" />
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={i} x={i * 80} y="240" width="3" height="90" fill="oklch(0.82 0.04 80)" />
        ))}
      </g>

      {/* Rain dance shower arch */}
      <g id="showerRig">
        <path d="M250 240 q150 -110 300 0" fill="none" stroke="oklch(0.7 0.1 300)" strokeWidth="6" />
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={i}
            x1={278 + i * 30}
            y1={200 + Math.abs(4 - i) * 6}
            x2={278 + i * 30}
            y2="300"
            stroke="oklch(0.85 0.06 240)"
            strokeWidth="2"
            className="scene-rain"
            style={{ animationDelay: `${(i * 0.21).toFixed(2)}s` }}
          />
        ))}
      </g>

      {/* Pool */}
      <g id="pool">
        <rect x="0" y="330" width="800" height="120" fill="oklch(0.84 0.08 220)" />
        <g id="poolShimmer">
          {[350, 372, 394, 416].map((y, i) => (
            <path
              key={y}
              d={`M-100 ${y} q40 -8 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0`}
              fill="none"
              stroke="oklch(0.94 0.04 220)"
              strokeWidth="3"
              opacity="0.7"
              className="scene-shimmer"
              style={{ animationDelay: `${i * 0.8}s` }}
            />
          ))}
        </g>
      </g>

      {/* Dancers on the deck */}
      <g id="dancers">
        <Figure x={230} y={330} s={0.9} fill="oklch(0.88 0.12 95)" arms="up" />
        <Figure x={300} y={330} s={0.95} fill="oklch(0.78 0.1 300)" dress arms="up" />
        <Figure x={400} y={330} s={1} fill="oklch(0.86 0.13 90)" arms="side" />
        <Figure x={470} y={330} s={0.92} fill="oklch(0.8 0.09 300)" dress arms="up" />
        <Figure x={545} y={330} s={0.85} fill="oklch(0.88 0.12 95)" arms="up" />
      </g>

      {/* Falling petals */}
      <g id="petals">
        {petals.map((p, i) => (
          <g key={i} transform={`translate(${p.x} 0)`}>
            <path
              d="M0 0 c6 -4 12 0 10 6 c-2 6 -10 8 -14 4 c-3 -3 -1 -8 4 -10 z"
              fill={p.fill}
              className="scene-petal"
              style={{ animationDelay: `${p.delay.toFixed(2)}s`, animationDuration: `${p.dur}s` }}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
