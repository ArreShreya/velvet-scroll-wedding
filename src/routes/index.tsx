import { createFileRoute } from "@tanstack/react-router";
import { ScrollShell } from "@/components/ScrollShell";
import { TimelinePage } from "@/components/TimelinePage";
import { EventPage } from "@/components/EventPage";
import { events } from "@/components/wedding-data";
import { VenuePage } from "@/components/VenuePage";
import { CountdownPage } from "@/components/CountdownPage";
import ganesha from "@/assets/ganesha.png";
import { LanguageProvider, useLang } from "@/i18n/LanguageContext";
import { PageOrnaments, GoldDivider } from "@/components/Ornaments";
import { Reveal } from "@/components/Reveal";
import { ShlokaText } from "@/components/ShlokaText";
import { HandsUnion } from "@/components/HandsUnion";
import { ClosingPage } from "@/components/ClosingPage";


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
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
}

function IndexContent() {
  const { t } = useLang();
  return (
    <ScrollShell>
      <div className="snap-y snap-mandatory">
        {/* Ganesha invocation */}
        <section className="relative flex min-h-[calc(100vh-5rem)] snap-start flex-col items-center justify-center px-6 py-16 text-center">
          <PageOrnaments />
          <ShlokaText
            lines={[t.ganeshInvocation]}
            step={70}
            className="mb-5 font-display text-2xl tracking-[0.12em] text-rose-deep md:text-3xl"
          />
          <Reveal delay={120}>
            <img
              src={ganesha}
              alt="Illustration of Lord Ganesha"
              width={1024}
              height={1024}
              className="w-56 max-w-[60vw] md:w-72"
            />
          </Reveal>
          <ShlokaText lines={[t.shloka1, t.shloka2]} />
          <Reveal delay={240}>
            <GoldDivider className="mt-5" />
            <p className="mt-4 max-w-md font-sans text-sm leading-relaxed tracking-[0.12em] text-ink/70">
              {t.translitLine}
            </p>
          </Reveal>
        </section>

        {/* Couple names */}
        <section className="relative flex min-h-[calc(100vh-5rem)] snap-start flex-col items-center justify-center px-6 py-16 text-center">
          <PageOrnaments />
          <Reveal as="p" className="max-w-lg font-sans text-sm uppercase leading-relaxed tracking-[0.3em] text-ink/70 sm:text-base">
            {t.invitationLine}
          </Reveal>
          <Reveal as="h1" delay={120} className="mt-10 font-display text-6xl leading-[1.05] text-rose-deep md:text-8xl">
            {t.bride}
          </Reveal>
          <Reveal as="span" delay={220} className="my-4 flex items-center gap-4 font-display text-2xl italic text-ink/70 md:text-3xl">
            <i className="block h-px w-14 bg-rose" />
            {t.weds}
            <i className="block h-px w-14 bg-rose" />
          </Reveal>
          <Reveal as="h1" delay={320} className="font-display text-6xl leading-[1.05] text-rose-deep md:text-8xl">
            {t.groom}
          </Reveal>
          <Reveal delay={420}>
            <GoldDivider className="mt-8" />
            <p className="mt-6 max-w-md font-display text-lg italic leading-relaxed text-ink/75 md:text-xl">
              {t.coupleBlessing}
            </p>
            <p className="mt-8 font-sans text-base uppercase tracking-[0.4em] text-ink/70 sm:text-lg">
              {t.dates}
            </p>
          </Reveal>
          <HandsUnion />
        </section>


        {/* Families */}
        <section className="relative flex min-h-[calc(100vh-5rem)] snap-start flex-col items-center justify-center px-6 py-16 text-center">
          <PageOrnaments />
          <Reveal as="h2" className="font-display text-4xl leading-tight text-rose-deep md:text-5xl">
            {t.familiesTitle}
          </Reveal>
          <GoldDivider className="mt-6" />

          <Reveal delay={120} className="mt-10 grid w-full max-w-2xl gap-10 md:grid-cols-2">
            <div>
              <p className="font-sans text-sm uppercase tracking-[0.4em] text-ink/65 sm:text-base">
                {t.theBride}
              </p>
              <p className="mt-3 font-display text-3xl text-rose-deep">{t.brideFull}</p>
              <p className="mt-2 font-sans text-sm leading-relaxed tracking-[0.1em] text-ink/75 sm:text-base">
                {t.brideParents}
              </p>
            </div>
            <div>
              <p className="font-sans text-sm uppercase tracking-[0.4em] text-ink/65 sm:text-base">
                {t.theGroom}
              </p>
              <p className="mt-3 font-display text-3xl text-rose-deep">{t.groomFull}</p>
              <p className="mt-2 font-sans text-sm leading-relaxed tracking-[0.1em] text-ink/75 sm:text-base">
                {t.groomParents}
              </p>
            </div>
          </Reveal>
        </section>


        <TimelinePage />

        {events.map((e) => (
          <EventPage key={e.id} event={e} />
        ))}

        <VenuePage />
        <CountdownPage />
        <ClosingPage />
      </div>
    </ScrollShell>
  );
}
