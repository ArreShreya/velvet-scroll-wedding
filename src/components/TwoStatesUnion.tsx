import React, { useRef, useEffect, useState } from "react";
import { clsx } from "clsx";
import { PageOrnaments } from "@/components/Ornaments";
import { useInView } from "@/hooks/useInView";
import { useLang } from "@/i18n/LanguageContext";

import gujaratImg from "../assets/gujaratImg.png";
import upImg from "../assets/upImg.png";

export function TwoStatesUnion() {
  const { t } = useLang();
  const { ref: containerRef, inView: revealed } = useInView<HTMLElement>(0.2);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    if (!revealed) return;

    const start = performance.now();
    const duration = 2200;
    let frameId = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setAnimationProgress(progress);
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [revealed]);

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

    const arc = (x0: number, y0: number) => {
      const mx = (x0 + cx) / 2;
      const my = (y0 + cy) / 2;
      const dx = cx - x0;
      const dy = cy - y0;
      const len = Math.hypot(dx, dy) || 1;
      const px = (-dy / len) * bow;
      const py = (dx / len) * bow;
      return `M ${x0} ${y0} Q ${mx + px} ${my + py}, ${cx} ${cy}`;
    };

    return [arc(w * 0.2, h * 0.24), arc(w * 0.8, h * 0.76)];
  }, [size]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[calc(100vh-5rem)] snap-start flex-col items-center justify-center bg-paper px-6"
    >
      <div className="flex h-[65vh] w-full flex-col items-center justify-center overflow-hidden">
        <PageOrnaments />

        <div
          ref={stageRef}
          className="relative flex h-[65vh] w-full flex-col sm:h-[65vh] md:h-[65h]"
        >
          {/* UTTAR PRADESH */}
          <div className="absolute left-0 top-0 z-20 flex w-[clamp(13.5rem,66vw,17rem)] flex-col items-center sm:w-[clamp(17rem,44vw,20rem)] md:w-[clamp(19rem,36vw,28rem)] xl:w-[clamp(25rem,34vw,34rem)]">
            {/* Text slides in from the left, in lockstep with Gujarat below */}
            <p
              className={clsx(
                "mb-3 font-heading text-xl text-text-body transition-all duration-700 ease-out md:text-3xl",
                revealed ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0",
              )}
            >
              {t.uttarPradesh}
            </p>

            {/* Image fades/rises in a beat after the text, same trigger as UP's image */}
            <img
              src={upImg}
              alt={t.uttarPradesh}
              className={clsx(
                "w-full object-contain drop-shadow-md mix-blend-multiply transition-all duration-700 ease-out",
                revealed ? "translate-y-0 opacity-100 delay-150" : "translate-y-6 opacity-0",
              )}
            />
          </div>

          {/* GUJARAT */}
          <div className="absolute bottom-0 right-0 z-20 flex w-[clamp(13.5rem,66vw,17rem)] flex-col items-center sm:w-[clamp(17rem,44vw,20rem)] md:w-[clamp(19rem,36vw,28rem)] xl:w-[clamp(25rem,34vw,34rem)]">
            {/* Image fades/rises in a beat after the text, same trigger as UP's image */}
            <img
              src={gujaratImg}
              alt={t.gujarat}
              className={clsx(
                "w-full object-contain drop-shadow-md mix-blend-multiply transition-all duration-700 ease-out",
                revealed ? "translate-y-0 opacity-100 delay-150" : "translate-y-6 opacity-0",
              )}
            />

            {/* Text slides in from the right, same trigger as UP's text */}
            <p
              className={clsx(
                "mt-3 font-heading text-xl text-text-body transition-all duration-700 ease-out md:text-3xl",
                revealed
                  ? "translate-x-0 translate-y-0 opacity-100"
                  : "translate-x-8 translate-y-6 opacity-0",
              )}
            >
              {t.gujarat}
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
                    strokeDashoffset={100 - animationProgress * 100}
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
        </div>
      </div>
    </section>
  );
}
