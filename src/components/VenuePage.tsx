import { useLang } from "@/i18n/LanguageContext";

const MAP_URL = "https://maps.app.goo.gl/RT8fNV2uctTz2kAJA";

export function VenuePage() {
  const { t } = useLang();
  return (
    <section className="flex min-h-[calc(100vh-5rem)] snap-start flex-col items-center justify-center px-6 py-16 text-center">
      <span className="font-sans text-[0.65rem] uppercase tracking-[0.5em] text-ink/60">
        {t.venueKicker}
      </span>
      <span className="mt-6 font-display text-2xl text-rose">❖</span>
      <h2 className="mt-6 max-w-xl font-display text-4xl leading-tight text-rose-deep md:text-5xl">
        {t.venueName}
      </h2>
      <i className="my-8 block h-px w-24 bg-rose" />
      <a
        href={MAP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-rose/70 bg-[oklch(0.99_0.012_40_/_0.7)] px-7 py-3 font-sans text-[0.7rem] uppercase tracking-[0.35em] text-rose-deep transition-colors hover:bg-[oklch(0.96_0.03_25_/_0.7)]"
      >
        {t.venueCta}
      </a>
    </section>
  );
}
