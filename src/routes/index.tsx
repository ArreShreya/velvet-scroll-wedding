import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
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
import { ClosingPage } from "@/components/ClosingPage";
import { TwoStatesUnion } from "@/components/TwoStatesUnion";
import { VenueOrbitReveal } from "@/components/VenueOrbitReveal";
import { clsx } from "clsx";

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
  const { lang, t } = useLang();
  const invitation = t.formalInvitation;
  
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect the very first tap/click (which opens the envelope)
  useEffect(() => {
    const handleInteraction = () => setHasOpenedEnvelope(true);
    
    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("touchstart", handleInteraction, { once: true });
    document.addEventListener("keydown", handleInteraction, { once: true });
    
    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  // Handle the Scroll Hint and Auto-Scroll timer
  useEffect(() => {
    if (!hasOpenedEnvelope) return;

    const container = containerRef.current;
    if (!container) return;

    const getScrollParent = (node: HTMLElement | null): HTMLElement | Window => {
      if (!node) return window;
      const overflowY = window.getComputedStyle(node).overflowY;
      const isScrollable = overflowY !== "visible" && overflowY !== "hidden";
      if (isScrollable && node.scrollHeight > node.clientHeight) {
        return node;
      }
      return getScrollParent(node.parentElement);
    };

    const scrollParent = getScrollParent(container);

    // Timer 1: Reveal the scroll hint after 20 seconds
    const hintTimer = setTimeout(() => {
      const scrollY = scrollParent instanceof Window ? window.scrollY : scrollParent.scrollTop;
      // Only show if they haven't scrolled down yet
      if (scrollY < 50) {
        setShowScrollHint(true);
      }
    }, 20000); // 20 seconds

    // Timer 2: Execute the auto-scroll after 25 seconds
    const autoScrollTimer = setTimeout(() => {
      const scrollY = scrollParent instanceof Window ? window.scrollY : scrollParent.scrollTop;
      const clientHeight = scrollParent instanceof Window ? window.innerHeight : scrollParent.clientHeight;
      
      // Only auto-scroll if the user is still resting at the very top
      if (scrollY < 50) {
        if (scrollParent instanceof Window) {
          window.scrollBy({ top: window.innerHeight * 0.25, behavior: "smooth" });
        } else {
          scrollParent.scrollBy({ top: clientHeight * 0.25, behavior: "smooth" });
        }
        setShowScrollHint(false); // Hide the button once it auto-scrolls
      }
    }, 25000); // 25 seconds

    const handleScroll = () => {
      const scrollY = scrollParent instanceof Window ? window.scrollY : scrollParent.scrollTop;
      
      // If the user manually scrolls away from the top page, permanently hide the hint and cancel the timers
      if (scrollY > 50) {
        setShowScrollHint(false);
        clearTimeout(hintTimer);
        clearTimeout(autoScrollTimer); 
      }
    };

    scrollParent.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      clearTimeout(hintTimer);
      clearTimeout(autoScrollTimer);
      scrollParent.removeEventListener("scroll", handleScroll);
    };
  }, [hasOpenedEnvelope]);

  return (
    <>
      {/* FLOATING SCROLL HINT */}
      <div 
        className={clsx(
          "fixed bottom-8 right-6 sm:right-10 z-[100] flex flex-col items-center transition-all duration-700",
          showScrollHint ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <span className="mb-2 font-sans text-[0.75rem] font-bold uppercase tracking-[0.25em] text-rose-deep animate-pulse drop-shadow-md">
          Scroll
        </span>
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-paper/95 backdrop-blur-md shadow-lg animate-bounce">
          <ChevronDown className="h-6 w-6 text-rose-deep" />
        </div>
      </div>

      <ScrollShell>
        <div ref={containerRef} className="snap-y snap-mandatory">
          
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

          {/* Formal wedding invitation */}
          <section
            lang={lang}
            className="formal-invitation relative flex min-h-[calc(100vh-5rem)] snap-start flex-col items-center justify-center px-5 py-14 text-center sm:px-8 sm:py-20"
          >
            <PageOrnaments />
            <GoldDivider className="mt-5" />

            <Reveal
              as="p"
              delay={80}
              className="mt-7 w-full max-w-3xl text-left font-display text-xl font-semibold leading-relaxed text-ink/85 sm:text-2xl"
            >
              {invitation.salutation}
            </Reveal>
            <Reveal
              as="div"
              delay={120}
              className="mt-4 max-w-3xl space-y-1 font-sans text-base leading-[1.85] text-ink/80 sm:text-lg"
            >
              {invitation.prelude.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </Reveal>
            {invitation.groomLead && (
              <Reveal
                as="p"
                delay={160}
                className="mt-3 font-sans text-base leading-relaxed text-ink/80 sm:text-lg"
              >
                {invitation.groomLead}
              </Reveal>
            )}

            <Reveal
              variant="scale"
              as="h1"
              delay={200}
              className="mt-4 font-display text-4xl font-semibold leading-tight text-rose-deep sm:text-5xl"
            >
              {invitation.groomName}
            </Reveal>
            <Reveal
              as="div"
              delay={240}
              className="mt-3 max-w-3xl space-y-2 font-sans text-sm leading-relaxed text-ink/70 sm:text-base"
            >
              <p>{invitation.groomGrandparents}</p>
              <p>{invitation.groomParents}</p>
            </Reveal>

            <Reveal
              variant="scale"
              as="p"
              delay={280}
              className="my-4 font-display text-2xl italic text-gold sm:text-3xl"
            >
              {invitation.conjunction}
            </Reveal>
            <Reveal
              variant="scale"
              as="h2"
              delay={320}
              className="font-display text-4xl font-semibold leading-tight text-rose-deep sm:text-5xl"
            >
              {invitation.brideName}
            </Reveal>
            <Reveal
              as="p"
              delay={360}
              className="mt-3 max-w-3xl font-sans text-sm leading-relaxed text-ink/70 sm:text-base"
            >
              {invitation.brideParents}
            </Reveal>
            {invitation.announcement && (
              <Reveal
                as="p"
                delay={400}
                className="mt-3 font-sans text-base leading-relaxed text-ink/80 sm:text-lg"
              >
                {invitation.announcement}
              </Reveal>
            )}

            <GoldDivider className="mt-7" />
            <Reveal
              as="p"
              delay={440}
              className="mt-6 max-w-3xl font-sans text-base leading-[1.85] text-ink/80 sm:text-lg"
            >
              {invitation.invitation}
            </Reveal>
          </section>

          {/* TWO STATES PAGE */}
          <TwoStatesUnion />

          <VenueOrbitReveal />

          {/* Families */}
          <section className="relative flex min-h-[calc(100vh-5rem)] snap-start flex-col items-center justify-center px-6 py-16 text-center">
            <PageOrnaments />
            <Reveal
              as="h2"
              className="font-display text-4xl leading-tight text-rose-deep md:text-5xl"
            >
              {t.familiesTitle}
            </Reveal>
            <GoldDivider className="mt-6" />

            <div className="mt-10 grid w-full max-w-2xl gap-10 md:grid-cols-2">
              <Reveal variant="left" delay={120}>
                <p className="font-sans text-sm uppercase tracking-[0.4em] text-ink/65 sm:text-base">
                  {t.theBride}
                </p>
                <p className="mt-3 font-display text-3xl text-rose-deep">{t.brideFull}</p>
                <p className="mt-2 font-sans text-sm leading-relaxed tracking-[0.1em] text-ink/75 sm:text-base">
                  {t.brideParents}
                </p>
              </Reveal>
              <Reveal variant="right" delay={120}>
                <p className="font-sans text-sm uppercase tracking-[0.4em] text-ink/65 sm:text-base">
                  {t.theGroom}
                </p>
                <p className="mt-3 font-display text-3xl text-rose-deep">{t.groomFull}</p>
                <p className="mt-2 font-sans text-sm leading-relaxed tracking-[0.1em] text-ink/75 sm:text-base">
                  {t.groomParents}
                </p>
              </Reveal>
            </div>
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
    </>
  );
}