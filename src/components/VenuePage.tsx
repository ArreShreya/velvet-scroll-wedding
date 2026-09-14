import { useLang } from "@/i18n/LanguageContext";
import { MapPin } from "lucide-react";
import { PageOrnaments, GoldDivider } from "./Ornaments";
import { Reveal } from "./Reveal";

const MAP_URL = "https://www.foxosohotels.com/la-beach-resorts-goa/goa-hotels/hotel-rooms";

export function VenuePage() {
  const { t } = useLang();
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] snap-start flex-col items-center justify-center px-6 py-16 text-center">
      <PageOrnaments />
      <Reveal variant="zoom" as="span" className="block font-body text-[0.8rem] uppercase text-text-secondary">
        {t.venueKicker}
      </Reveal>
      <GoldDivider className="mt-5" />
      <Reveal variant="zoom" as="h2" delay={120} className="mt-6 max-w-xl font-heading text-4xl font-semibold leading-tight text-text-heading md:text-5xl">
        {t.venueName}
      </Reveal>
      <i className="my-8 block h-px w-24 bg-rose" />
      <Reveal variant="zoom" delay={240}>
        <a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Foxoso La Alphonso Beach Resort"
          title="Foxoso La Alphonso Beach Resort"
          className="press inline-flex items-center gap-2 rounded-full border border-rose/70 bg-[oklch(0.99_0.012_40_/_0.7)] px-7 py-3 font-body text-[0.75rem] uppercase text-text-secondary hover:bg-[oklch(0.96_0.03_25_/_0.7)]"
        >
          <MapPin aria-hidden="true" className="h-4 w-4" />
          <span>The venue</span>
        </a>
      </Reveal>

    </section>
  );
}
