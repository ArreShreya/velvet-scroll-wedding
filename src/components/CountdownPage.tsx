import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { PageOrnaments, GoldDivider } from "./Ornaments";
import { Reveal } from "./Reveal";

const TARGET = new Date("2026-12-11T00:00:00+05:30").getTime();

type Parts = {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function diff(now: number): Parts {
  let ms = Math.max(0, TARGET - now);
  const totalDays = Math.floor(ms / 86400000);
  const months = Math.floor(totalDays / 30);
  const days = totalDays - months * 30;
  ms -= totalDays * 86400000;
  const hours = Math.floor(ms / 3600000);
  ms -= hours * 3600000;
  const minutes = Math.floor(ms / 60000);
  ms -= minutes * 60000;
  const seconds = Math.floor(ms / 1000);
  return { months, days, hours, minutes, seconds };
}

function Dial({ value, label, delay }: { value: number | null; label: string; delay: number }) {
  return (
    <Reveal
      delay={delay}
      className="press relative flex h-24 w-24 flex-col items-center justify-center rounded-full border border-rose/60 bg-[oklch(0.99_0.012_40_/_0.75)] shadow-[0_10px_28px_-20px_rgba(120,60,60,0.6)] sm:h-28 sm:w-28">
      <span className="pointer-events-none absolute -left-2 -top-1 text-lg opacity-70">❀</span>
      <span className="font-display text-3xl leading-none text-rose-deep sm:text-4xl">
        {value === null ? "--" : String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 font-sans text-[0.6rem] uppercase tracking-[0.25em] text-ink/60">
        {label}
      </span>
    </Reveal>
  );
}

export function CountdownPage() {
  const { t } = useLang();
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(diff(Date.now()));
    const id = window.setInterval(() => setParts(diff(Date.now())), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] snap-start flex-col items-center justify-center px-5 py-16 text-center">
      <PageOrnaments />
      <span className="font-sans text-[0.8rem] uppercase tracking-[0.5em] text-ink/65">
        {t.countdownKicker}
      </span>
      <Reveal as="h2" className="mt-4 font-display text-3xl text-rose-deep md:text-4xl">
        {t.countdownTitle}
      </Reveal>
      <GoldDivider className="mt-4" />

      <div className="mt-9 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <Dial value={parts?.months ?? null} label={t.months} delay={0} />
        <Dial value={parts?.days ?? null} label={t.days} delay={120} />
        <Dial value={parts?.hours ?? null} label={t.hours} delay={240} />
        <Dial value={parts?.minutes ?? null} label={t.minutes} delay={360} />
        <Dial value={parts?.seconds ?? null} label={t.seconds} delay={480} />
      </div>

      <Reveal delay={200} className="mt-12 w-full max-w-xs">
        <div className="relative flex aspect-[3/4] items-center justify-center rounded-t-[999px] border border-rose/60 bg-[oklch(0.98_0.015_40_/_0.6)] p-6">
          <span className="pointer-events-none absolute -left-3 bottom-2 text-2xl opacity-60">❀</span>
          <span className="pointer-events-none absolute -right-3 top-6 text-2xl opacity-50">❀</span>
          <p className="font-sans text-xs leading-relaxed tracking-[0.18em] text-ink/50">
            {t.photoPlaceholder}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
