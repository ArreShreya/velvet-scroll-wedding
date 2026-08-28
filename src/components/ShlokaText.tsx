import { useInView } from "@/hooks/useInView";

/** Renders lines letter-by-letter, as if written by hand. */
export function ShlokaText({
  lines,
  className = "mt-6 font-display text-xl leading-relaxed text-rose-deep md:text-2xl",
  step = 55,
  startDelay = 0,
}: {
  lines: string[];
  className?: string;
  step?: number;
  startDelay?: number;
}) {
  const { ref, inView } = useInView<HTMLParagraphElement>(0.3);

  let index = 0;

  return (
    <p ref={ref} className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {Array.from(line).map((ch, ci) => {
            const delay = startDelay + index++ * step;
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
