import type { WeddingEvent } from "./wedding-data";
import { EventIcon } from "./EventIcon";

export function EventPage({ event }: { event: WeddingEvent }) {
  return (
    <section
      id={event.id}
      className="flex min-h-[calc(100vh-5rem)] snap-start flex-col items-center justify-center px-5 py-14"
      style={{ ["--event-accent" as string]: event.accent }}
    >
      {/* Full-scene illustration frame — artwork arrives with the SVG spec */}
      <div
        className="relative flex aspect-[16/9] w-full max-w-4xl items-center justify-center overflow-hidden rounded-sm border border-rose/50"
        style={{
          background:
            "linear-gradient(160deg, color-mix(in oklab, var(--event-accent) 16%, transparent), color-mix(in oklab, var(--event-accent) 4%, transparent))",
        }}
      >
        <div className="text-center text-ink/50">
          <span
            className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border"
            style={{ borderColor: "var(--event-accent)", color: "var(--event-accent)" }}
          >
            <EventIcon id={event.id} className="h-8 w-8" />
          </span>
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.4em]">Scene illustration</p>
          <p className="mt-2 font-display text-lg">{event.theme}</p>
          <p className="font-sans text-xs tracking-wide">{event.venue}</p>
        </div>
      </div>

      <p className="mt-7 font-sans text-[0.65rem] uppercase tracking-[0.45em] text-ink/60">
        {event.date}
      </p>
      <h2 className="mt-2 text-center font-display text-4xl text-rose-deep md:text-5xl">
        {event.name}
      </h2>
      <p className="mt-2 font-sans text-sm tracking-[0.3em] text-ink/70">{event.time}</p>
    </section>
  );
}
