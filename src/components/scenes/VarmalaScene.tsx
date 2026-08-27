import { Figure, PaperBase, VIEWBOX } from "./parts";

/** Varmala — white & pink beach mandap, seamless rolling wave layers. */
function WaveLayer({ y, fill, dur, opacity }: { y: number; fill: string; dur: number; opacity: number }) {
  const seg = "q50 -12 100 0" + " t100 0".repeat(19);
  return (
    <g className="scene-wave" style={{ animationDuration: `${dur}s` }}>
      <path d={`M-800 ${y} ${seg} V450 H-800 Z`} fill={fill} opacity={opacity} />
    </g>
  );
}

export function VarmalaScene() {
  return (
    <svg viewBox={VIEWBOX} className="h-full w-full" role="img" aria-label="Varmala under a beach mandap">
      <PaperBase accent="oklch(0.75 0.09 10)" />
      <g id="sky">
        <rect x="0" y="0" width="800" height="250" fill="oklch(0.93 0.05 30)" opacity="0.7" />
        <circle cx="660" cy="90" r="42" fill="oklch(0.92 0.09 60)" opacity="0.55" />
      </g>

      <g id="ocean">
        <rect x="0" y="220" width="800" height="110" fill="oklch(0.88 0.05 210)" />
        <WaveLayer y={244} fill="oklch(0.84 0.06 205)" dur={14} opacity={0.8} />
        <WaveLayer y={272} fill="oklch(0.9 0.04 200)" dur={10} opacity={0.85} />
        <WaveLayer y={300} fill="oklch(0.95 0.02 200)" dur={7} opacity={0.9} />
      </g>

      <g id="sand">
        <path d="M0 320 q200 -12 400 0 t400 -4 V450 H0 Z" fill="oklch(0.93 0.04 80)" />
      </g>

      {/* Mandap */}
      <g id="mandap">
        <rect x="286" y="240" width="9" height="130" fill="oklch(0.96 0.01 80)" />
        <rect x="505" y="240" width="9" height="130" fill="oklch(0.96 0.01 80)" />
        <path d="M270 244 h260 l-24 -34 h-212 z" fill="oklch(0.98 0.01 60)" />
        <path d="M270 244 h260" stroke="oklch(0.8 0.09 10)" strokeWidth="5" />
        <path d="M294 244 q28 30 56 0 q28 30 56 0 q28 30 56 0 q28 30 52 0" fill="none" stroke="oklch(0.82 0.1 10)" strokeWidth="4" />
        {Array.from({ length: 12 }).map((_, i) => (
          <circle key={i} cx={296 + i * 19} cy={252 + (i % 2) * 6} r="4.5" fill="oklch(0.86 0.08 10)" />
        ))}
      </g>

      {/* Couple exchanging garlands */}
      <g id="couple">
        <Figure x={372} y={370} s={1.05} fill="oklch(0.97 0.01 80)" arms="up" />
        <Figure x={428} y={370} s={1.05} fill="oklch(0.8 0.11 10)" dress arms="up" />
        <path d="M372 336 q28 -22 56 0" fill="none" stroke="oklch(0.82 0.1 10)" strokeWidth="4" strokeDasharray="1 6" strokeLinecap="round" />
      </g>

      {/* Guests */}
      <g id="guests">
        <Figure x={200} y={382} s={0.72} fill="oklch(0.86 0.06 20)" dress />
        <Figure x={244} y={374} s={0.66} fill="oklch(0.94 0.02 60)" />
        <Figure x={580} y={378} s={0.7} fill="oklch(0.84 0.08 15)" dress />
        <Figure x={624} y={386} s={0.75} fill="oklch(0.95 0.02 60)" />
      </g>
    </svg>
  );
}
