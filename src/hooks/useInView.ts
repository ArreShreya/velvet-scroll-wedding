import { useEffect, useRef, useState } from "react";
import { useShellOpen } from "@/components/ShellOpen";

/**
 * Fires once, the first time the element scrolls into view — but never before
 * the scroll shell has opened, so reveals don't burn off behind the landing screen.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.2,
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const opened = useShellOpen();

  useEffect(() => {
    if (!opened) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, opened]);

  return { ref, inView };
}
