import { useInView } from "@/hooks/useInView";

/** Renders the shloka lines letter-by-letter, as if written by hand. */
export function ShlokaText({ lines }: { lines: string[] }) {
  const { ref, inView } = useInView<HTMLParagraphElement>(0.3);

  let index = 0;

  return (
    <p
      ref={ref}
      className="mt-6 font-display text-xl leading-relaxed text-rose-deep md:text-2xl"
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          {Array.from(line).map((ch, ci) => {
            const delay = index++ * 55;
            return (
              <span
                key={ci}
                className={inView ? "shloka-letter" : undefined}
                style={inView ? { animationDelay: `${delay}ms` } : { opacity: 0 }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            );
          })}
        </span>
      ))}
    </p>
  );
}
