import React, { useRef, useEffect, useState } from "react";
import { Heart, ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import { PageOrnaments } from "@/components/Ornaments";
import { Reveal } from "@/components/Reveal";

import gujaratImg from "../assets/gujaratImg.png"; 
import upImg from "../assets/upImg.png";

export function TwoStatesUnion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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
    };

    scrollParent.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => scrollParent.removeEventListener("scroll", handleScroll);
  }, []);

  const showHeart = scrollProgress > 0.95;

  return (
    <section ref={containerRef} className="relative h-[250vh] w-full snap-start bg-paper">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6">
        <PageOrnaments />
        
        <h2 className="absolute top-20 font-display text-4xl leading-tight text-rose-deep md:text-5xl">
          Two States, One Union
        </h2>

        <div className="relative mt-36 flex h-[80vh] w-full max-w-3xl flex-col">
          
          {/* GUJARAT */}
          <div className="absolute left-0 top-0 z-10 flex w-[55%] flex-col items-center md:w-[45%]">
            {/* The text slides in from the left */}
            <Reveal variant="left">
              <p className="mb-2 font-display text-2xl text-rose-deep md:text-3xl">Gujarat</p>
            </Reveal>
            
            {/* The image waits a split second, then triggers our vertical fade up */}
            <Reveal delay={150} className="w-full">
              <img 
                src={gujaratImg} 
                alt="Gujarat" 
                className="w-full object-contain drop-shadow-md mix-blend-multiply animate-slow-fade-up" 
              />
            </Reveal>
          </div>

          {/* UTTAR PRADESH */}
          <div className="absolute bottom-0 right-0 z-10 flex w-[55%] flex-col items-center md:w-[45%]">
            {/* The text slides in from the right */}
            <Reveal variant="right">
              <p className="mb-2 font-display text-2xl text-rose-deep md:text-3xl">Uttar Pradesh</p>
            </Reveal>
            
            {/* The image waits a split second, then triggers our vertical fade up */}
            <Reveal delay={150} className="w-full">
              <img 
                src={upImg} 
                alt="Uttar Pradesh" 
                className="w-full object-contain drop-shadow-md mix-blend-multiply animate-slow-fade-up" 
              />
            </Reveal>
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

          {/* INTUITIVE CUE: Shows only while the user is actively scrolling the lines */}
          <div className={clsx(
            /* CHANGED: bottom-[5%] is now bottom-[15%] on mobile and bottom-[20%] on desktop */
            "absolute left-1/2 bottom-[15%] md:bottom-[20%] z-10 flex -translate-x-1/2 flex-col items-center text-rose-deep/60 transition-opacity duration-500",
            showHeart ? "opacity-0" : "opacity-100 animate-pulse"
          )}>
            <span className="mb-1 font-sans text-[0.75rem] uppercase tracking-[0.2em]">Keep Scrolling</span>
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
              <Heart className="h-8 w-8 fill-rose-deep text-rose-deep" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}