import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Canvas scratch-card overlay. Children render underneath; a golden foil layer
 * is painted on the canvas and erased along the pointer path with
 * `destination-out` compositing (soft, feathered brush).
 */
export function ScratchReveal({
  children,
  className = "",
  brush = 26,
  threshold = 0.65,
  onRevealed,
}: {
  children: React.ReactNode;
  className?: string;
  brush?: number;
  threshold?: number;
  onRevealed?: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const checkPending = useRef(false);
  const [started, setStarted] = useState(false);
  const [cleared, setCleared] = useState(false);

  const paintFoil = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width: w, height: h } = canvas;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, w, h);

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#e9c877");
    grad.addColorStop(0.28, "#f6e2ad");
    grad.addColorStop(0.5, "#c9a04f");
    grad.addColorStop(0.72, "#f3dda4");
    grad.addColorStop(1, "#d8b467");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // metallic dust speckles
    for (let i = 0; i < (w * h) / 220; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = Math.random() * 1.6 + 0.2;
      ctx.globalAlpha = Math.random() * 0.35 + 0.05;
      ctx.fillStyle = Math.random() > 0.5 ? "#fff6d9" : "#a9803a";
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    paintFoil(canvas);
  }, [paintFoil]);

  useEffect(() => {
    resize();
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => {
      if (!drawing.current && !cleared) resize();
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [resize, cleared]);

  const checkProgress = useCallback(() => {
    if (checkPending.current || cleared) return;
    checkPending.current = true;
    requestAnimationFrame(() => {
      checkPending.current = false;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d", { willReadFrequently: true });
      if (!canvas || !ctx) return;
      const step = 8;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clear = 0;
      let total = 0;
      for (let i = 3; i < data.length; i += 4 * step) {
        total++;
        if ((data[i] ?? 255) < 40) clear++;
      }
      if (total && clear / total >= threshold) {
        setCleared(true);
        onRevealed?.();
      }
    });
  }, [cleared, threshold, onRevealed]);

  const point = (e: PointerEvent | React.PointerEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width / rect.width;
    const sy = canvas.height / rect.height;
    return { x: (e.clientX - rect.left) * sx, y: (e.clientY - rect.top) * sy };
  };

  const scratchTo = (p: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = canvas.width / canvas.getBoundingClientRect().width;
    const r = brush * dpr;
    ctx.globalCompositeOperation = "destination-out";

    const stamp = (x: number, y: number) => {
      const g = ctx.createRadialGradient(x, y, r * 0.25, x, y, r);
      g.addColorStop(0, "rgba(0,0,0,1)");
      g.addColorStop(0.6, "rgba(0,0,0,0.75)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const from = last.current;
    if (from) {
      const dist = Math.hypot(p.x - from.x, p.y - from.y);
      const steps = Math.max(1, Math.floor(dist / (r * 0.35)));
      for (let i = 1; i <= steps; i++) {
        stamp(from.x + ((p.x - from.x) * i) / steps, from.y + ((p.y - from.y) * i) / steps);
      }
    } else {
      stamp(p.x, p.y);
    }
    last.current = p;
  };

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className.includes("absolute") ? "" : "relative"} ${className}`}>
      {children}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full touch-none transition-opacity duration-700"
        style={{ opacity: cleared ? 0 : 1, pointerEvents: cleared ? "none" : "auto", cursor: "grab" }}
        onPointerDown={(e) => {
          if (cleared) return;
          (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
          drawing.current = true;
          last.current = null;
          setStarted(true);
          scratchTo(point(e));
        }}
        onPointerMove={(e) => {
          if (!drawing.current || cleared) return;
          e.preventDefault();
          scratchTo(point(e));
          checkProgress();
        }}
        onPointerUp={() => {
          drawing.current = false;
          last.current = null;
          checkProgress();
        }}
        onPointerLeave={() => {
          drawing.current = false;
          last.current = null;
        }}
      />
      {!started && !cleared && (
        <span className="pointer-events-none absolute inset-x-0 bottom-[8%] z-10 text-center font-accent text-sm text-text-secondary drop-shadow-sm">
          Scratch to reveal ✨
        </span>
      )}
    </div>
  );
}
