import type { CSSProperties } from "react";
import type { WeddingEvent } from "./wedding-data";
import { SCENES, type Hotspot } from "./scene-layers";

/** A window cut out of the base illustration, animated in place. */
function Region({ src, spot, index }: { src: string; spot: Hotspot; index: number }) {
  const feather = spot.feather ?? 30;
  const mask = `radial-gradient(ellipse at center, #000 ${100 - feather}%, transparent 100%)`;

  const inner: CSSProperties = {
    position: "absolute",
    width: `${(100 / spot.w) * 100}%`,
    height: `${(100 / spot.h) * 100}%`,
    left: `${(-spot.x / spot.w) * 100}%`,
    top: `${(-spot.y / spot.h) * 100}%`,
    maxWidth: "none",
    animationDelay: `${(index % 4) * -1.7}s`,
  };

  return (
    <div
      className="pointer-events-none absolute overflow-hidden"
      style={{
        left: `${spot.x}%`,
        top: `${spot.y}%`,
        width: `${spot.w}%`,
        height: `${spot.h}%`,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      <img src={src} alt="" aria-hidden="true" style={inner} className={`region-${spot.anim}`} />
      {spot.particles ? (
        <div className="absolute inset-0">
          {Array.from({ length: spot.particles === "sparkle" ? 10 : 8 }).map((_, i) => (
            <span
              key={i}
              className={spot.particles === "sparkle" ? "particle-sparkle" : "particle-petal"}
              style={{
                left: `${(i * 37 + 11) % 92}%`,
                top: spot.particles === "sparkle" ? `${(i * 53 + 7) % 88}%` : "-8%",
                animationDelay: `${(i * 1.31) % 7}s`,
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function EventPage({ event }: { event: WeddingEvent }) {
  const scene = SCENES[event.id];

  return (
    <section
      id={event.id}
      className="flex min-h-[calc(100vh-5rem)] snap-start flex-col items-center justify-center px-5 py-14"
      style={{ ["--event-accent" as string]: event.accent }}
    >
      <p className="font-sans text-[0.65rem] uppercase tracking-[0.45em] text-ink/60">
        {event.date}
      </p>
      <h2 className="mt-2 text-center font-display text-4xl text-rose-deep md:text-5xl">
        {event.name}
      </h2>
      <p className="mt-2 mb-7 font-sans text-sm tracking-[0.3em] text-ink/70">{event.time}</p>

      <div
        className="relative aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-sm border border-rose/50"
        style={{
          boxShadow:
            "0 18px 40px -28px color-mix(in oklab, var(--event-accent) 70%, transparent)",
        }}
      >
        {scene ? (
          <>
            <img
              src={scene.bg}
              alt={`${event.name} — ${event.theme}, ${event.venue}`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {scene.hotspots.map((spot, i) => (
              <Region key={i} src={scene.bg} spot={spot} index={i} />
            ))}
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
