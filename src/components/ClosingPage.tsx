import { useLang } from "@/i18n/LanguageContext";
import { PageOrnaments, GoldDivider } from "./Ornaments";
import { Reveal } from "./Reveal";

export function ClosingPage() {
  const { t } = useLang();

  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] snap-start flex-col items-center justify-center px-6 py-16 text-center">
      <PageOrnaments />
      <Reveal
        as="p"
        className="max-w-xl font-display text-2xl italic leading-relaxed text-rose-deep md:text-3xl"
      >
        {t.closingBlessing}
      </Reveal>
      <Reveal delay={150} as="span" className="mt-8 block font-display text-2xl text-rose-deep/80">
        ❖
      </Reveal>
      <Reveal delay={300}>
        <p className="mt-8 font-sans text-sm uppercase tracking-[0.4em] text-ink/70 sm:text-base">
          {t.closingWith}
        </p>
        <p className="mt-4 font-display text-4xl text-rose-deep md:text-5xl">
          {t.closingNames}
        </p>
        <GoldDivider className="mt-8" />
      </Reveal>
    </section>
  );
}
