import { createFileRoute } from "@tanstack/react-router";
import { ScrollShell } from "@/components/ScrollShell";
import { TimelinePage } from "@/components/TimelinePage";
import { EventPage } from "@/components/EventPage";
import { events } from "@/components/wedding-data";
import ganesha from "@/assets/ganesha.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shreya weds Prabhav — 11 & 12 December" },
      {
        name: "description",
        content:
          "An unfurling scroll invitation for the wedding of Shreya & Prabhav — Mehandi, Sangeet, Masquerade, Haldi, Baarat, Varmala and Fera.",
      },
      { property: "og:title", content: "Shreya weds Prabhav" },
      {
        property: "og:description",
        content: "Join us for two days of celebration — 11th & 12th December.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ScrollShell>
      <div className="snap-y snap-mandatory">
        {/* Ganesha invocation */}
        <section className="flex min-h-[calc(100vh-5rem)] snap-start flex-col items-center justify-center px-6 py-16 text-center">
          <img
            src={ganesha}
            alt="Illustration of Lord Ganesha"
            width={1024}
            height={1024}
            className="w-56 max-w-[60vw] md:w-72"
          />
          <p className="mt-6 font-display text-xl leading-relaxed text-rose-deep md:text-2xl">
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।<br />
            निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
          </p>
          <p className="mt-4 max-w-md font-sans text-xs leading-relaxed tracking-[0.12em] text-ink/70">
            Vakratunda Mahakaya Suryakoti Samaprabha
            <br />
            Nirvighnam Kuru Me Deva Sarvakaryeshu Sarvada
          </p>
        </section>

        {/* Couple names */}
        <section className="flex min-h-[calc(100vh-5rem)] snap-start flex-col items-center justify-center px-6 py-16 text-center">
          <span className="font-sans text-[0.65rem] uppercase tracking-[0.5em] text-ink/60">
            with love, together forever
          </span>
          <h1 className="mt-8 font-display text-6xl leading-[1.05] text-rose-deep md:text-8xl">
            Shreya
          </h1>
          <span className="my-4 flex items-center gap-4 font-display text-2xl italic text-ink/70 md:text-3xl">
            <i className="block h-px w-14 bg-rose" />
            weds
            <i className="block h-px w-14 bg-rose" />
          </span>
          <h1 className="font-display text-6xl leading-[1.05] text-rose-deep md:text-8xl">
            Prabhav
          </h1>
          <p className="mt-10 font-sans text-xs uppercase tracking-[0.4em] text-ink/60">
            11 &amp; 12 December
          </p>
        </section>

        <TimelinePage />

        {events.map((e) => (
          <EventPage key={e.id} event={e} />
        ))}
      </div>
    </ScrollShell>
  );
}
