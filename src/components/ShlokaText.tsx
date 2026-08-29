import { useInView } from "@/hooks/useInView";

const VIRAMA = /[\u094D\u09CD\u0ACD\u0B4D\u0BCD\u0C4D\u0CCD\u0D4D]/;
const MARK = /\p{M}/u;
const ZWJ = /[\u200C\u200D]/;

/**
 * Splits a string into visual clusters, keeping Indic conjuncts intact:
 * a base character plus its combining marks, and any consonant chained
 * through a virama (halant) stays in the same cluster.
 */
function clusters(text: string): string[] {
  const chars = Array.from(text);
  const out: string[] = [];
  let current = "";
  let pendingJoin = false;

  for (const ch of chars) {
    if (current === "") {
      current = ch;
      pendingJoin = false;
      continue;
    }
    if (MARK.test(ch) || ZWJ.test(ch)) {
      current += ch;
      if (VIRAMA.test(ch) || ZWJ.test(ch)) pendingJoin = true;
      continue;
    }
    if (pendingJoin) {
      current += ch;
      pendingJoin = false;
      continue;
    }
    out.push(current);
    current = ch;
  }
  if (current !== "") out.push(current);
  return out;
}

/** Renders lines cluster-by-cluster, as if written by hand. */
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
        <span key={li} className="block [overflow-wrap:anywhere]">
          {clusters(line).map((ch, ci) => {
            const delay = startDelay + index++ * step;
            return (
              <span
                key={ci}
                className={inView ? "shloka-letter whitespace-pre-wrap" : "whitespace-pre-wrap"}
                style={inView ? { animationDelay: `${delay}ms` } : { opacity: 0 }}
              >
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </p>
  );
}
