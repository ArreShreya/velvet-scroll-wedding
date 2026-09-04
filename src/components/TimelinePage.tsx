import { events } from "./wedding-data";
import { EventIcon } from "./EventIcon";
import { useLang } from "@/i18n/LanguageContext";
import { PageOrnaments } from "./Ornaments";
import { useInView } from "@/hooks/useInView";
import { Reveal } from "./Reveal";
import { useEffect, useState } from "react";

/** Seconds hand tick — 0..59, updated once per second. */
function useTick() {
  const [sec, setSec] = useState(0);
  useEffect(() => {
    const set = () => setSec(new Date().getSeconds());
    set();
    const id = window.setInterval(set, 1000);
    return () => window.clearInterval(id);
  }, []);
  return sec;
}

/** Thin gold hand sweeping a semi-circular arc, one tick per second. */
function ClockHand({
  cx,
  cy,
  r,
  startDeg,
  dir,
  sec,
}: {
  cx: number;
  cy: number;
  r: number;
  startDeg: number;
  dir: 1 | -1;
  sec: number;
}) {
  const rad = (startDeg * Math.PI) / 180;
  const tx = cx + r * 0.94 * Math.cos(rad);
  const ty = cy + r * 0.94 * Math.sin(rad);
  return (
    <g
      className="clock-hand"
      style={{ transform: `rotate(${dir * 3 * sec}deg)`, transformOrigin: `${cx}px ${cy}px` }}
    >
      <line
        x1={cx}
        y1={cy}
        x2={tx}
        y2={ty}
        stroke="var(--rose-deep)"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.45"
      />
      <circle cx={cx} cy={cy} r="2.4" fill="var(--rose-deep)" opacity="0.6" />
      <circle cx={tx} cy={ty} r="2.8" fill="var(--rose-deep)" opacity="0.8" />
    </g>
  );
}

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
  const { ref, inView } = useInView<HTMLElement>(0.2);
  const sec = useTick();
  const copyFor = (id: string) =>
    t.events[id] ?? { name: id, time: "", date: "" };

  return (
    <section
      ref={ref}
      id="timeline"
      className="relative flex min-h-[calc(100svh-5rem)] snap-start flex-col items-center justify-center px-1 py-12 sm:px-5 sm:py-16"
    >
      <PageOrnaments />
      
      {/* Kicker & Title */}
      <Reveal as="p" className="text-center font-body text-xs uppercase text-text-secondary sm:text-2xl">
        {t.timelineKicker}
      </Reveal>
      <Reveal as="h2" delay={120} className="mt-3 text-center font-heading text-4xl font-semibold text-text-heading sm:text-5xl md:text-6xl">
        {t.timelineTitle}
      </Reveal>

      {/* Mobile: two facing semi-circle arcs */}
      <div className="mt-8 w-full sm:hidden">
        <MobileArc ids={["mehandi", "engagement-sangeet", "masquerade"]} facing="left" label={t.day1} />
        <MobileArc
          ids={["haldi", "baarat", "varmala", "fera"]}
          facing="right"
          label={t.day2}
          className="mt-10"
          offset={3}
        />
      </div>

      {/* Tablet & desktop: semi-circle arc */}
      <div className="relative mt-24 hidden w-full max-w-3xl sm:block">
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
              className={`pop-circle ${inView ? "pop-in" : "pop-out"}`}
              style={{ animationDelay: `${i * 1000}ms` }}
            />
          ))}
          <ClockHand cx={CX} cy={CY} r={R} startDeg={180} dir={1} sec={sec} />
        </svg>

        {events.map((e, i) => {
          const { x, left: leftPct, top: topPct } = pointAt(i);
          const side = x < CX - 20 ? "right" : x > CX + 20 ? "left" : "center";
          const c = copyFor(e.id);
          return (
            <a
              key={e.id}
              href={`#${e.id}`}
              className="press absolute w-32 -translate-y-1/2 text-center md:w-40"
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
                transform:
                  side === "right"
                    ? "translate(-105%, -50%)"
                    : side === "left"
                      ? "translate(5%, -50%)"
                      : "translate(-50%, -102%)",
              }}
            >
              <span
                className={`block ${inView ? "pop-in" : "pop-out"}`}
                style={{ animationDelay: `${i * 1000}ms` }}
              >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 bg-paper-tint text-text-heading md:h-14 md:w-14">
                  <EventIcon id={e.id} className="h-6 w-6 md:h-8 md:w-8" />
                </span>
                {/* Desktop Event Name (Increased to text-lg) */}
                <span className="mt-2 block font-heading text-lg leading-tight text-text-heading md:text-xl">
                  {c.name}
                </span>
                {/* Desktop Event Time (Increased to text-xs) */}
                <span className="mt-0.5 block font-numeric text-xs text-text-secondary md:text-sm">
                  {c.time}
                </span>
              </span>
            </a>
          );
        })}

        {/* Desktop Day 1 / Day 2 labels (Increased to text-sm) */}
        <div className="absolute inset-x-0 bottom-1 flex justify-center gap-10 font-numeric text-sm uppercase text-text-secondary md:text-base">
          <span>{t.day1}</span>
          <span className="text-text-heading">❖</span>
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
  offset = 0,
}: {
  ids: string[];
  facing: "left" | "right";
  label: string;
  className?: string;
  offset?: number;
}) {
  const { t } = useLang();
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const sec = useTick();
  const W = 300;
  const H = 290;
  const R = 88;
  const cy = H / 2;
  
  const cx = facing === "left" ? 240 : 60;

  const at = (i: number) => {
    const f = ids.length === 1 ? 0.5 : i / (ids.length - 1);
    const deg = facing === "left" ? -90 - 180 * f : -90 + 180 * f;
    const rad = (deg * Math.PI) / 180;
    return { x: cx + R * Math.cos(rad), y: cy + R * Math.sin(rad) };
  };

  const start = at(0);
  const end = at(ids.length - 1);

  return (
    <div ref={ref} className={`mx-auto w-full max-w-sm ${className}`}>
      {/* Mobile Day Label (Increased to text-xs) */}
      <p className="mb-2 text-center font-numeric text-lg font-medium uppercase text-text-secondary">
        {label}
      </p>
      <div className="relative">
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
          return (
            <circle
              key={id}
              cx={p.x}
              cy={p.y}
              r="5"
              fill="var(--rose-deep)"
              className={`pop-circle ${inView ? "pop-in" : "pop-out"}`}
              style={{ animationDelay: `${(offset + i) * 1000}ms` }}
            />
          );
        })}
        <ClockHand cx={cx} cy={cy} r={R} startDeg={270} dir={facing === "left" ? -1 : 1} sec={sec} />
      </svg>

      {ids.map((id, i) => {
        const p = at(i);
        const c = t.events[id] ?? { name: id, time: "", date: "" };
        return (
          <a
            key={id}
            href={`#${id}`}
            className="press absolute flex w-[48%] items-center gap-3"
            style={{
              left: `${(p.x / W) * 100}%`,
              top: `${(p.y / H) * 100}%`,
              transform:
                facing === "left" ? "translate(-104%, -50%)" : "translate(4%, -50%)",
              flexDirection: facing === "left" ? "row-reverse" : "row",
              textAlign: facing === "left" ? "right" : "left",
            }}
          >
            <span
              className={`flex w-full items-center gap-3 ${inView ? "pop-in" : "pop-out"}`}
              style={{
                animationDelay: `${(offset + i) * 1000}ms`,
                flexDirection: facing === "left" ? "row-reverse" : "row",
              }}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-paper-tint text-text-heading">
                <EventIcon id={id} className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                {/* Mobile Event Name (Increased to text-base) */}
                <span className="block font-heading text-base font-semibold leading-tight text-text-heading">
                  {c.name}
                </span>
                {/* Mobile Event Time (Increased to text-xs) */}
                <span className="mt-0.5 block font-numeric text-xs text-text-secondary">
                  {c.time}
                </span>
              </span>
            </span>
          </a>
        );
      })}

      </div>
    </div>
  );
}