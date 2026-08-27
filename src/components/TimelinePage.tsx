import { events } from "./wedding-data";
import { EventIcon } from "./EventIcon";
import { useLang } from "@/i18n/LanguageContext";

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
  const { t } = useLang();
  const copyFor = (id: string) =>
    t.events[id] ?? { name: id, time: "", date: "" };

  return (
    <section
      id="timeline"
      className="flex min-h-[calc(100svh-5rem)] snap-start flex-col items-center justify-center px-1 py-12 sm:px-5 sm:py-16"
    >
      <p className="text-center font-sans text-[0.6rem] uppercase tracking-[0.35em] text-rose-deep/70 sm:text-[0.65rem] sm:tracking-[0.45em]">
        {t.timelineKicker}
      </p>
      <h2 className="mt-3 text-center font-display text-3xl text-rose-deep sm:text-4xl md:text-5xl">
        {t.timelineTitle}
      </h2>

      {/* Mobile: vertical reflow */}
      <ol className="mt-8 w-full max-w-sm space-y-3 sm:hidden">
        {events.map((e) => {
          const c = copyFor(e.id);
          return (
            <li key={e.id}>
              <a
                href={`#${e.id}`}
                className="flex items-center gap-3 rounded-full border border-rose/50 bg-paper-tint px-3 py-2"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-rose/60 text-rose-deep">
                  <EventIcon id={e.id} className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-base leading-tight text-ink">
                    {c.name}
                  </span>
                  <span className="block font-sans text-[0.6rem] tracking-[0.18em] text-rose-deep/80">
                    {c.date}
                  </span>
                </span>
                <span className="shrink-0 font-sans text-[0.65rem] tracking-[0.14em] text-rose-deep">
                  {c.time}
                </span>
              </a>
            </li>
          );
        })}
      </ol>

      {/* Tablet & desktop: semi-circle arc */}
      <div className="relative mt-24 hidden w-full max-w-2xl sm:block">
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
          const { x, left: leftPct, top: topPct } = pointAt(i);
          const side = x < CX - 20 ? "right" : x > CX + 20 ? "left" : "center";
          const c = copyFor(e.id);
          return (
            <a
              key={e.id}
              href={`#${e.id}`}
              className="absolute w-28 -translate-y-1/2 text-center transition-transform duration-200 hover:scale-105 md:w-32"
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
                transform:
                  side === "right"
                    ? "translate(-105%, -50%)"
                    : side === "left"
                      ? "translate(5%, -50%)"
                      : "translate(-50%, -125%)",
              }}
            >
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-rose/60 bg-paper-tint text-rose-deep md:h-12 md:w-12">
                <EventIcon id={e.id} className="h-6 w-6 md:h-7 md:w-7" />
              </span>
              <span className="mt-1.5 block font-display text-sm leading-tight text-ink">
                {c.name}
              </span>
              <span className="block font-sans text-[0.65rem] tracking-[0.18em] text-rose-deep/80">
                {c.time}
              </span>
            </a>
          );
        })}

        <div className="absolute inset-x-0 bottom-1 flex justify-center gap-10 font-sans text-[0.7rem] uppercase tracking-[0.3em] text-ink/60">
          <span>{t.day1}</span>
          <span className="text-rose-deep">·</span>
          <span>{t.day2}</span>
        </div>
      </div>
    </section>
  );
}
