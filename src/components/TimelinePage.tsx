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

      {/* Mobile: two facing semi-circle arcs */}
      <div className="mt-8 w-full sm:hidden">
        <MobileArc ids={["mehandi", "sangeet", "masquerade"]} facing="left" label={t.day1} />
        <MobileArc
          ids={["haldi", "baarat", "varmala", "fera"]}
          facing="right"
          label={t.day2}
          className="mt-8"
        />
      </div>


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

/** Mobile: a single semi-circular arc bulging left or right with events along it. */
function MobileArc({
  ids,
  facing,
  label,
  className = "",
}: {
  ids: string[];
  facing: "left" | "right";
  label: string;
  className?: string;
}) {
  const { t } = useLang();
  const W = 300;
  const H = 280;
  const R = 105;
  const cy = H / 2;
  const cx = facing === "left" ? 232 : 68;

  const at = (i: number) => {
    const f = ids.length === 1 ? 0.5 : i / (ids.length - 1);
    const deg = facing === "left" ? -90 - 180 * f : -90 + 180 * f;
    const rad = (deg * Math.PI) / 180;
    return { x: cx + R * Math.cos(rad), y: cy + R * Math.sin(rad) };
  };

  const start = at(0);
  const end = at(ids.length - 1);

  return (
    <div className={`relative mx-auto w-full max-w-sm ${className}`}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <path
          d={`M ${start.x} ${start.y} A ${R} ${R} 0 0 ${facing === "left" ? 0 : 1} ${end.x} ${end.y}`}
          fill="none"
          stroke="var(--rose)"
          strokeWidth="2"
          strokeDasharray="1 7"
          strokeLinecap="round"
          opacity="0.75"
        />
        {ids.map((id, i) => {
          const p = at(i);
          return <circle key={id} cx={p.x} cy={p.y} r="5" fill="var(--rose-deep)" opacity="0.85" />;
        })}
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          className="font-sans"
          fontSize="11"
          letterSpacing="3"
          fill="var(--rose-deep)"
          opacity="0.7"
        >
          {label}
        </text>
      </svg>

      {ids.map((id, i) => {
        const p = at(i);
        const c = t.events[id] ?? { name: id, time: "", date: "" };
        return (
          <a
            key={id}
            href={`#${id}`}
            className="absolute flex w-[52%] items-center gap-2"
            style={{
              left: `${(p.x / W) * 100}%`,
              top: `${(p.y / H) * 100}%`,
              transform:
                facing === "left" ? "translate(4%, -50%)" : "translate(-104%, -50%)",
              flexDirection: facing === "left" ? "row" : "row-reverse",
              textAlign: facing === "left" ? "left" : "right",
            }}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rose/60 bg-paper-tint text-rose-deep">
              <EventIcon id={id} className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-sm leading-tight text-ink">{c.name}</span>
              <span className="block font-sans text-[0.65rem] tracking-[0.16em] text-rose-deep/85">
                {c.time}
              </span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
