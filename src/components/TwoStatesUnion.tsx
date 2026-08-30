import React, { useRef, useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { clsx } from "clsx";
import { PageOrnaments } from "@/components/Ornaments";
import { Reveal } from "@/components/Reveal";

import gujaratImg from "../assets/gujaratImg.png"; 
import upImg from "../assets/upImg.png";

// ADDED: Pass an onReveal prop to trigger the unlocking of the page
export function TwoStatesUnion({ onReveal }: { onReveal?: () => void }) {
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
      const windowHeight = window.innerHeight;
      
      const scrollDistance = height - windowHeight;
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

        <div className="relative mt-36 md:mt-44 flex h-[75vh] w-full max-w-3xl flex-col">
          
          <Reveal variant="left" className="absolute left-[2%] top-0 z-10 flex w-[55%] flex-col items-center md:w-[45%]">
            <p className="mb-2 font-display text-2xl text-rose-deep md:text-3xl">Gujarat</p>
            <img src={gujaratImg} alt="Gujarat" className="w-full object-contain drop-shadow-md mix-blend-multiply" />
          </Reveal>

          <Reveal variant="right" className="absolute right-[2%] top-[35%] z-10 flex w-[55%] flex-col items-center md:w-[45%]">
            <p className="mb-2 font-display text-2xl text-rose-deep md:text-3xl">Uttar Pradesh</p>
            <img src={upImg} alt="Uttar Pradesh" className="w-full object-contain drop-shadow-md mix-blend-multiply" />
          </Reveal>

          <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <mask id="path-mask">
                <path d="M 28 35 C 28 115, 38 85, 50 85" fill="transparent" stroke="white" strokeWidth="4" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - (scrollProgress * 100)} />
                <path d="M 72 70 C 72 115, 62 85, 50 85" fill="transparent" stroke="white" strokeWidth="4" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - (scrollProgress * 100)} />
              </mask>
            </defs>
            <g mask="url(#path-mask)" fill="transparent" stroke="var(--gold)" strokeWidth="0.8" strokeDasharray="2 2">
              <path d="M 28 35 C 28 115, 38 85, 50 85" />
              <path d="M 72 70 C 72 115, 62 85, 50 85" />
            </g>
          </svg>

          {/* ADDED: Interactive Button Gate */}
          <button 
            onClick={onReveal}
            className={clsx(
              "absolute left-1/2 top-[85%] z-30 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              showHeart ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
            )}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-paper shadow-md animate-gentle-pulse hover:bg-paper-tint transition-colors cursor-pointer">
              <Heart className="h-6 w-6 fill-rose-deep text-rose-deep" />
            </div>
            <span className="mt-3 font-sans text-xs tracking-[0.2em] uppercase text-rose-deep/80 animate-pulse">
              Tap to reveal
            </span>
          </button>

        </div>
      </div>
    </section>
  );
}