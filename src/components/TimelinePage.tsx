import { events } from "./wedding-data";
import { EventIcon } from "./EventIcon";

const CX = 300;
const CY = 300;
const R = 235;

export function TimelinePage() {
  const n = events.length;

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
          {events.map((e, i) => {
            const angle = Math.PI - (i / (n - 1)) * Math.PI;
            const x = Math.round((CX + R * Math.cos(angle)) * 100) / 100;
            const y = Math.round((CY - R * Math.sin(angle)) * 100) / 100;
            return <circle key={e.id} cx={x} cy={y} r="6" fill="var(--rose-deep)" opacity="0.85" />;
          })}
        </svg>

        {events.map((e, i) => {
          const angle = Math.PI - (i / (n - 1)) * Math.PI;
          const x = CX + R * Math.cos(angle);
          const y = CY - R * Math.sin(angle);
          const leftPct = Math.round((x / 600) * 10000) / 100;
          const topPct = Math.round((y / 340) * 10000) / 100;
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
