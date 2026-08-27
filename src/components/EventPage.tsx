import type { WeddingEvent } from "./wedding-data";
import { SCENE_LAYERS } from "./scene-layers";

export function EventPage({ event }: { event: WeddingEvent }) {
  const scene = SCENE_LAYERS[event.id];

  return (
    <section
      id={event.id}
      className="flex min-h-[calc(100vh-5rem)] snap-start flex-col items-center justify-center px-5 py-14"
      style={{ ["--event-accent" as string]: event.accent }}
    >
      {/* Title above the illustration */}
      <p className="font-sans text-[0.65rem] uppercase tracking-[0.45em] text-ink/60">
        {event.date}
      </p>
      <h2 className="mt-2 text-center font-display text-4xl text-rose-deep md:text-5xl">
        {event.name}
      </h2>
      <p className="mt-2 mb-7 font-sans text-sm tracking-[0.3em] text-ink/70">{event.time}</p>

      <div
        className="relative aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-sm border border-rose/50"
        style={{ boxShadow: "0 18px 40px -28px color-mix(in oklab, var(--event-accent) 70%, transparent)" }}
      >
        {scene ? (
          <>
            <img
              src={scene.bg}
              alt={`${event.name} — ${event.theme}, ${event.venue}`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <img
              src={scene.fg}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className={`pointer-events-none absolute object-contain ${scene.fgClass} ${scene.anim}`}
              style={scene.style}
            />
            {/* blush/ivory connective wash */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.97 0.02 40 / 0.16), transparent 35%, oklch(0.95 0.03 25 / 0.2))",
              }}
            />
          </>
        ) : null}
      </div>

      <p className="mt-5 text-center font-sans text-[0.7rem] tracking-[0.2em] text-ink/55">
        {event.theme} · {event.venue}
      </p>
    </section>
  );
}
