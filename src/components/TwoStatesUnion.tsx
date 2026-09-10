import React, { useRef, useEffect, useState } from "react";
import { Heart, ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import { PageOrnaments } from "@/components/Ornaments";
import { useLang } from "@/i18n/LanguageContext";

import gujaratImg from "../assets/gujaratImg.png";
import upImg from "../assets/upImg.png";

export function TwoStatesUnion() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  // Gujarat and Uttar Pradesh used to each run their own independent
  // scroll-trigger (via <Reveal>). Because this is a tall sticky section,
  // the top-positioned Gujarat block would cross into view well before the
  // bottom-positioned Uttar Pradesh block did, so UP only ever seemed to
  // "arrive" once the user had scrolled much further (around when the
  // dotted lines finished and the heart appeared). Driving both off this
  // same scrollProgress value - the one thing already tracking this exact
  // section - guarantees they always appear together.
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
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

    const handleScroll = () => {
      const { top, height } = container.getBoundingClientRect();
      const viewportHeight =
        scrollParent instanceof HTMLElement ? scrollParent.clientHeight : window.innerHeight;

      const scrollDistance = height - viewportHeight;
      let progress = -top / scrollDistance;

      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
      // Section has started engaging (its sticky pin is active) - reveal
      // both states together and never hide them again once shown.
      if (progress > 0.02) setRevealed(true);
    };

    scrollParent.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => scrollParent.removeEventListener("scroll", handleScroll);
  }, []);

  const showHeart = scrollProgress > 0.95;

  // The dotted connectors are drawn in REAL pixel space (viewBox matches the
  // measured container box), so the arc curvature and the dash pattern look
  // identical at every width instead of being stretched by a 100x100 grid.
  const stageRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (r) setSize({ w: r.width, h: r.height });

    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const paths = React.useMemo(() => {
    const { w, h } = size;
    if (w < 2 || h < 2) return [] as string[];
    const cx = w / 2;
    const cy = h / 2;
    const bow = Math.min(w, h) * 0.32;

    const arc = (x0: number, y0: number, dir: 1 | -1) => {
      const mx = (x0 + cx) / 2;
      const my = (y0 + cy) / 2;
      // perpendicular offset from the straight chord => a consistent bow
      const dx = cx - x0;
      const dy = cy - y0;
      const len = Math.hypot(dx, dy) || 1;
      const px = (-dy / len) * bow * dir;
      const py = (dx / len) * bow * dir;
      return `M ${x0} ${y0} Q ${mx + px} ${my + py}, ${cx} ${cy}`;
    };

    return [arc(w * 0.2, h * 0.24, 1), arc(w * 0.8, h * 0.76, 1)];
  }, [size]);


  return (
    <section ref={containerRef} className="relative h-[250dvh] w-full snap-start bg-paper">
      {/* h-dvh (not h-screen/100vh) so this matches the browser's real, currently
          visible viewport on mobile - 100vh is defined by many mobile browsers as
          the LARGEST possible viewport (address bar hidden), which is taller than
          what's actually on screen while the bar is showing. That mismatch is what
          was clipping the Uttar Pradesh image at the true screen edge. */}
      <div className="sticky top-0 flex h-dvh w-full flex-col items-center justify-center overflow-hidden px-6">
        <PageOrnaments />

        <div ref={stageRef} className="relative flex h-[65vh] w-full flex-col sm:h-[65vh] md:h-[65h]">
          {/* GUJARAT */}
          <div className="absolute left-0 top-0 z-20 flex w-[clamp(13.5rem,66vw,17rem)] flex-col items-center sm:w-[clamp(17rem,44vw,20rem)] md:w-[clamp(19rem,36vw,28rem)] xl:w-[clamp(25rem,34vw,34rem)]">
            {/* Text slides in from the left, in lockstep with Uttar Pradesh below */}
            <p
              className={clsx(
                "mb-3 font-heading text-xl text-text-body transition-all duration-700 ease-out md:text-3xl",
                revealed ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0",
              )}
            >
              {t.gujarat}
            </p>

            {/* Image fades/rises in a beat after the text, same trigger as UP's image */}
            <img
              src={gujaratImg}
              alt={t.gujarat}
              className={clsx(
                "w-full object-contain drop-shadow-md mix-blend-multiply transition-all duration-700 ease-out",
                revealed ? "translate-y-0 opacity-100 delay-150" : "translate-y-6 opacity-0",
              )}
            />
          </div>

          {/* UTTAR PRADESH */}
          {/* Anchored with real clearance above the box's bottom edge (was bottom-0,
              which is what let the image run flush to - and get clipped by - the
              true screen edge). Also leaves room for "Keep Scrolling" below it. */}
          <div className="absolute bottom-0 right-0 z-20 flex w-[clamp(13.5rem,66vw,17rem)] flex-col items-center sm:w-[clamp(17rem,44vw,20rem)] md:w-[clamp(19rem,36vw,28rem)] xl:w-[clamp(25rem,34vw,34rem)]">
            {/* Image fades/rises in a beat after the text, same trigger as Gujarat's image */}
            <img
              src={upImg}
              alt={t.uttarPradesh}
              className={clsx(
                "w-full object-contain drop-shadow-md mix-blend-multiply transition-all duration-700 ease-out",
                revealed ? "translate-y-0 opacity-100 delay-150" : "translate-y-6 opacity-0",
              )}
            />

            {/* Text slides in from the right, same trigger as Gujarat's text */}
            <p
              className={clsx(
                "mt-3 font-heading text-xl text-text-body transition-all duration-700 ease-out md:text-3xl",
                revealed
                  ? "translate-x-0 translate-y-0 opacity-100"
                  : "translate-x-8 translate-y-6 opacity-0",
              )}
            >
              {t.uttarPradesh}
              
            </p>
          </div>

          

          <svg
            className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
            viewBox={`0 0 ${Math.max(size.w, 1)} ${Math.max(size.h, 1)}`}
          >
            <defs>
              <mask id="path-mask">
                {paths.map((d, i) => (
                  <path
                    key={i}
                    d={d}
                    fill="transparent"
                    stroke="white"
                    strokeWidth={Math.max(size.w, size.h) * 0.06}
                    pathLength="100"
                    strokeDasharray="100"
                    strokeDashoffset={100 - scrollProgress * 100}
                  />
                ))}
              </mask>
            </defs>
            <g
              mask="url(#path-mask)"
              fill="transparent"
              stroke="var(--gold)"
              strokeWidth="2"
              strokeDasharray="5 7"
              strokeLinecap="round"
            >
              {paths.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>
          </svg>


          <div
            aria-hidden="true"
            className={clsx(
              "absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-all duration-700 ease-out",
              showHeart ? "scale-100 opacity-100" : "scale-0 opacity-0",
            )}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-paper shadow-md animate-gentle-pulse">
              <Heart className="h-8 w-8 fill-[oklch(0.55_0.12_15)] text-[oklch(0.55_0.11_15)]" />
            </div>
          </div>

        </div>

        <div style={{ marginTop: '20px' }} className={clsx(
                  "z-10 flex flex-col items-center text-text-secondary transition-opacity duration-500",
                  showHeart ? "opacity-0" : "opacity-100 animate-pulse"
                )}>
          <span className="mb-1 font-body text-[0.75rem] uppercase">{t.keepScrolling}</span>
                  <ChevronDown className="h-5 w-5" />
        </div>
      </div>
    </section>
  );
}
