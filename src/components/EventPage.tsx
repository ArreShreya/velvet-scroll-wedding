import type { CSSProperties } from "react";
import type { WeddingEvent } from "./wedding-data";
import { SCENES, type Hotspot } from "./scene-layers";
import { useLang } from "@/i18n/LanguageContext";
import { Reveal } from "./Reveal";

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
    objectFit: "cover",
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
  const { t } = useLang();
  const copy = t.events[event.id] ?? {
    name: event.name,
    time: event.time,
    date: event.date,
  };

  return (
    <section
      id={event.id}
      className="-mx-2 snap-start py-2 first:pt-0 sm:-mx-3 md:-mx-6"
      style={{ ["--event-accent" as string]: event.accent }}
    >
      <div
        className="relative h-[calc(100svh-6.5rem)] min-h-[24rem] w-full overflow-hidden rounded-sm border border-rose/50"
        style={{
          boxShadow:
            "0 18px 40px -30px color-mix(in oklab, var(--event-accent) 70%, transparent)",
        }}
      >
        {scene ? (
          <>
            <div className="ken-burns absolute inset-0">
              {/* Desktop artwork */}
              <img
                src={scene.bg}
                alt={copy.name}
                loading="lazy"
                className="absolute inset-0 hidden h-full w-full object-cover sm:block"
              />
              {/* Mobile artwork — same elements, vertically recomposed */}
              <img
                src={scene.bgMobile}
                alt={copy.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover sm:hidden"
              />
              <div className="pointer-events-none absolute inset-0 hidden sm:block">
                {scene.hotspots.map((spot, i) => (
                  <Region key={i} src={scene.bg} spot={spot} index={i} />
                ))}
              </div>
            </div>
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.97 0.02 40 / 0.16), transparent 35%, oklch(0.95 0.03 25 / 0.2))",
              }}
            />
          </>
        ) : null}

        {/* Title treatment anchored near the top of the artwork */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-center p-5 pt-6 sm:pt-8">
          <Reveal
            className="rounded-sm px-6 py-5 text-center backdrop-blur-[3px] sm:px-12 sm:py-7"
            style={{
              background:
                "radial-gradient(ellipse at center, oklch(0.99 0.012 40 / 0.9) 35%, oklch(0.99 0.012 40 / 0.5) 65%, transparent 85%)",
            }}
          >
            <p className="font-sans text-sm uppercase tracking-[0.35em] text-ink/80 sm:text-base">
              {copy.date}
            </p>
            <h2
              className="mt-2 font-display text-4xl leading-tight text-rose-deep sm:text-5xl md:text-6xl"
              style={{ textShadow: "0 2px 12px oklch(0.99 0.01 40 / 0.85)" }}
            >
              {copy.name}
            </h2>
            <p className="mt-2 font-sans text-base tracking-[0.28em] text-ink/85 sm:text-lg">
              {copy.time}
            </p>
            {copy.thought ? (
              <p className="mx-auto mt-3 max-w-xs font-display text-base italic leading-snug text-ink/75 sm:max-w-sm sm:text-lg">
                {copy.thought}
              </p>
            ) : null}
          </Reveal>
        </div>

      </div>
    </section>
  );
}
