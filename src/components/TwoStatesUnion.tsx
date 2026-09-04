import React, { useRef, useEffect, useState } from "react";
import { Heart, ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import { PageOrnaments } from "@/components/Ornaments";

import gujaratImg from "../assets/gujaratImg.png"; 
import upImg from "../assets/upImg.png";

export function TwoStatesUnion() {
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
      const viewportHeight = scrollParent instanceof HTMLElement ? scrollParent.clientHeight : window.innerHeight;
      
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

  return (
    <section ref={containerRef} className="relative h-[250dvh] w-full snap-start bg-paper">
      {/* h-dvh (not h-screen/100vh) so this matches the browser's real, currently
          visible viewport on mobile - 100vh is defined by many mobile browsers as
          the LARGEST possible viewport (address bar hidden), which is taller than
          what's actually on screen while the bar is showing. That mismatch is what
          was clipping the Uttar Pradesh image at the true screen edge. */}
      <div className="sticky top-0 flex h-dvh w-full flex-col items-center justify-center overflow-hidden px-6">
        <PageOrnaments />
        
        <h2 className="absolute top-20 font-heading text-4xl font-semibold leading-tight text-text-heading md:text-5xl">
          Two States, One Union
        </h2>

        {/* Shorter + less top margin on mobile leaves real breathing room at the
            bottom of the viewport before we even get to the per-side offsets below. */}
        <div className="relative mt-24 flex h-[64vh] w-full max-w-3xl flex-col sm:mt-28 sm:h-[70vh] md:mt-36 md:h-[78vh]">
          
          {/* GUJARAT */}
          <div className="absolute left-0 top-0 z-10 flex w-[55%] flex-col items-center md:w-[45%]">
            {/* Text slides in from the left, in lockstep with Uttar Pradesh below */}
            <p
              className={clsx(
                "mb-3 font-heading text-2xl text-text-body transition-all duration-700 ease-out md:text-3xl",
                revealed ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              )}
            >
              Gujarat
            </p>

            {/* Image fades/rises in a beat after the text, same trigger as UP's image */}
            <img
              src={gujaratImg}
              alt="Gujarat"
              className={clsx(
                "w-full object-contain drop-shadow-md mix-blend-multiply transition-all duration-700 ease-out",
                revealed ? "translate-y-0 opacity-100 delay-150" : "translate-y-6 opacity-0"
              )}
            />
          </div>

          {/* UTTAR PRADESH */}
          {/* Anchored with real clearance above the box's bottom edge (was bottom-0,
              which is what let the image run flush to - and get clipped by - the
              true screen edge). Also leaves room for "Keep Scrolling" below it. */}
          <div className="absolute bottom-[14%] right-0 z-10 flex w-[55%] flex-col items-center md:bottom-[16%] md:w-[45%]">
            {/* Text slides in from the right, same trigger as Gujarat's text */}
            <p
              className={clsx(
                "mb-3 font-heading text-2xl text-text-body transition-all duration-700 ease-out md:text-3xl",
                revealed ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              )}
            >
              Uttar Pradesh
            </p>

            {/* Image fades/rises in a beat after the text, same trigger as Gujarat's image */}
            <img
              src={upImg}
              alt="Uttar Pradesh"
              className={clsx(
                "w-full object-contain drop-shadow-md mix-blend-multiply transition-all duration-700 ease-out",
                revealed ? "translate-y-0 opacity-100 delay-150" : "translate-y-6 opacity-0"
              )}
            />
          </div>

          <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <mask id="path-mask">
                <path d="M 28 15 C 4 25, 4 78, 50 50" fill="transparent" stroke="white" strokeWidth="4" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - (scrollProgress * 100)} />
                <path d="M 72 85 C 96 75, 96 22, 50 50" fill="transparent" stroke="white" strokeWidth="4" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - (scrollProgress * 100)} />
              </mask>
            </defs>
            <g mask="url(#path-mask)" fill="transparent" stroke="var(--gold)" strokeWidth="0.8" strokeDasharray="2 2">
              <path d="M 28 15 C 4 25, 4 78, 50 50" />
              <path d="M 72 85 C 96 75, 96 22, 50 50" />
            </g>
          </svg>

          {/* INTUITIVE CUE: Shows only while the user is actively scrolling the lines.
              Sits at the box's true bottom-0, now that Uttar Pradesh no longer occupies
              that spot - so it always has clear space below the UP image above it. */}
          <div className={clsx(
            "absolute left-1/2 bottom-0 md:bottom-[2%] z-10 flex -translate-x-1/2 flex-col items-center text-text-secondary transition-opacity duration-500",
            showHeart ? "opacity-0" : "opacity-100 animate-pulse"
          )}>
            <span className="mb-1 font-body text-[0.75rem] uppercase">Keep Scrolling</span>
            <ChevronDown className="h-5 w-5" />
          </div>

          <div
            aria-hidden="true"
            className={clsx(
              "absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-all duration-700 ease-out",
              showHeart ? "scale-100 opacity-100" : "scale-0 opacity-0"
            )}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-paper shadow-md animate-gentle-pulse">
              <Heart className="h-8 w-8 fill-[oklch(0.55_0.12_15)] text-[oklch(0.55_0.11_15)]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}