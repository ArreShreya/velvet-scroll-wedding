import { useLang } from "@/i18n/LanguageContext";
import { PageOrnaments, GoldDivider } from "./Ornaments";
import { Reveal } from "./Reveal";

export function ClosingPage() {
  const { t } = useLang();
  const invitation = t.formalInvitation;

  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] snap-start flex-col items-center justify-center px-6 py-16 text-center">
      <PageOrnaments />
      <Reveal
        variant="fade"
        as="p"
        className="max-w-xl font-emotional text-3xl leading-relaxed text-text-heading md:text-5xl"
      >
        {t.closingBlessing}
      </Reveal>
      <Reveal variant="fade" delay={150} as="span" className="mt-8 block font-heading text-2xl text-text-secondary">
        ❖
      </Reveal>

      <Reveal
            as="p"
            delay={480}
            className="mt-5 max-w-2xl font-body text-xl italic leading-relaxed text-text-body sm:text-2xl"
          >
            {invitation.blessing}
          </Reveal>

          <Reveal variant="left" as="div" delay={520} className="mt-9 max-w-3xl">
            <p className="font-heading text-xl font-semibold text-text-heading sm:text-2xl">
              {invitation.awaitingLabel}
            </p>
            <div className="mt-2 space-y-1 font-body text-base leading-relaxed text-text-body sm:text-lg">
              {invitation.awaitingNames.map((name) => (
                <p key={name}>{name}</p>
              ))}
            </div>
          </Reveal>

          <Reveal variant="right" as="div" delay={560} className="mt-7 max-w-3xl">
            <p className="font-heading text-xl font-semibold text-text-heading sm:text-2xl">
              {invitation.complimentsLabel}
            </p>
            <p className="mt-2 font-body text-base leading-relaxed text-text-body sm:text-lg">
              {invitation.complimentsNames}
            </p>
          </Reveal>

      {/* <Reveal variant="fade" delay={300}>
        <p className="mt-8 font-sans text-sm uppercase tracking-[0.4em] text-ink/70 sm:text-base">
          {t.closingWith}
        </p>
        <p className="mt-4 font-display text-4xl text-rose-deep md:text-5xl">
          {t.closingNames}
        </p>
        <GoldDivider className="mt-8" />
      </Reveal> */}
    </section>
  );
}
