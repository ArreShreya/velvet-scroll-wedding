import { events } from "./wedding-data";
import { EventIcon } from "./EventIcon";

const CX = 300;
const CY = 300;
const R = 235;

type Point = { x: number; y: number; left: number; top: number };

const POINTS: Point[] = [
  { x: 65.0, y: 300.0, left: 10.83, top: 88.24 },
  { x: 96.48, y: 182.5, left: 16.08, top: 53.68 },
  { x: 182.5, y: 96.48, left: 30.42, top: 28.38 },
  { x: 300.0, y: 65.0, left: 50.0, top: 19.12 },
  { x: 417.5, y: 96.48, left: 69.58, top: 28.38 },
  { x: 503.52, y: 182.5, left: 83.92, top: 53.68 },
  { x: 535.0, y: 300.0, left: 89.17, top: 88.24 },
];

const pointAt = (i: number): Point => POINTS[i] ?? POINTS[0]!;


export function TimelinePage() {

  return (
    <section
      id="timeline"
      className="flex min-h-[calc(100vh-5rem)] snap-start flex-col items-center justify-center px-5 py-16"
    >
      <p className="font-sans text-[0.65rem] uppercase tracking-[0.45em] text-rose-deep/70">
        11th &amp; 12th December
      </p>
      <h2 className="mt-3 text-center font-display text-4xl text-rose-deep md:text-5xl">
        Wedding Weekend Timeline
      </h2>

      <div className="relative mt-24 w-full max-w-2xl">
        <svg viewBox="0 0 600 340" className="w-full overflow-visible">
          <path
            d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
            fill="none"
            stroke="var(--rose)"
            strokeWidth="2"
            strokeDasharray="1 7"
            strokeLinecap="round"
            opacity="0.7"
          />
          {events.map((e, i) => (
            <circle
              key={e.id}
              cx={pointAt(i).x}
              cy={pointAt(i).y}
              r="6"
              fill="var(--rose-deep)"
              opacity="0.85"
            />
          ))}
        </svg>

        {events.map((e, i) => {
          const { x, left: leftPct, top: topPct } = POINTS[i];
          const side = x < CX - 20 ? "right" : x > CX + 20 ? "left" : "center";
          return (
            <a
              key={e.id}
              href={`#${e.id}`}
              className="absolute w-32 -translate-y-1/2 text-center transition-transform duration-200 hover:scale-105"
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
                transform:
                  side === "right"
                    ? "translate(-108%, -50%)"
                    : side === "left"
                      ? "translate(8%, -50%)"
                      : "translate(-50%, -125%)",
              }}
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-rose/60 bg-paper-tint text-rose-deep">
                <EventIcon id={e.id} className="h-7 w-7" />
              </span>
              <span className="mt-1.5 block font-display text-sm leading-tight text-ink">{e.name}</span>
              <span className="block font-sans text-[0.65rem] tracking-[0.18em] text-rose-deep/80">
                {e.time}
              </span>
            </a>
          );
        })}

        <div className="absolute inset-x-0 bottom-1 flex justify-center gap-10 font-sans text-[0.7rem] uppercase tracking-[0.3em] text-ink/60">
          <span>11 Dec</span>
          <span className="text-rose-deep">·</span>
          <span>12 Dec</span>
        </div>
      </div>
    </section>
  );
}
