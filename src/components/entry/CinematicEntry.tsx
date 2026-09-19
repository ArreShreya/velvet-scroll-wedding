import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import monogram from "@/assets/monogram-ps.png.asset.json";
import { useLang } from "@/i18n/LanguageContext";
import { STAGE } from "./entryConfig";
import entryRevealVideo from "../../assets/entry_video.mp4";

type Stage = "sealed" | "flap" | "flying" | "open";

export function CinematicEntry({
  onDone,
  onVideoStart,
}: {
  onDone: () => void;
  onVideoStart?: () => void;
}) {
  const { t } = useLang();
  const [stage, setStage] = useState<Stage>("sealed");
  const [reduced, setReduced] = useState(false);

  // Reference to the video element so we can command it to play
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Stage 1 -> Stage 2: only after the flap has finished opening.
  useEffect(() => {
    if (stage !== "flap") return;

    const id = window.setTimeout(() => {
      setStage("flying");
      // Play the video as soon as the envelope is fully open, and kick
      // off the background audio (shloka -> looping BGM) at the same
      // moment, since the entry video's own audio is muted.
      if (videoRef.current) {
        videoRef.current.play().catch((err) => console.warn("Video play failed:", err));
      }
      onVideoStart?.();
    }, STAGE.flapOpen * 1000);

    return () => window.clearTimeout(id);
  }, [stage, onVideoStart]);

  // Triggered automatically when the video reaches its end
  const handleArrive = () => {
    setStage("open");
    window.setTimeout(onDone, STAGE.handoff * 1000 + 250);
  };

  const breakSeal = () => {
    if (stage !== "sealed") return;
    if (reduced) {
      onDone();
      return;
    }
    setStage("flap");
  };

  const flapOpen = stage !== "sealed";

  return (
    <div className="fixed inset-0 z-[90] overflow-hidden bg-paper">
      {/* ---------- VIDEO LAYER ---------- */}
      <div className="absolute inset-0 z-0 bg-black">
        <video
          ref={videoRef}
          src={entryRevealVideo}
          playsInline
          // Muted so it never competes with the shloka/BGM background audio.
          muted
          onEnded={handleArrive}
          className="h-full w-full object-cover"
        />
      </div>

      {/* ---------- Stage 1: envelope + wax seal ---------- */}
      <AnimatePresence>
        {stage !== "open" && (
          <motion.div
            key="envelope"
            className="absolute inset-0 z-10"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2 origin-left border-r border-rose/30 bg-[linear-gradient(115deg,#fdf3ec,#f0cdc4)]"
              animate={{ x: flapOpen ? "-100%" : "0%", rotateY: flapOpen ? -32 : 0 }}
              transition={{ duration: STAGE.flapOpen, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformPerspective: 1400 }}
            />
            <motion.div
              className="absolute inset-y-0 right-0 w-1/2 origin-right border-l border-rose/30 bg-[linear-gradient(245deg,#fdf3ec,#f0cdc4)]"
              animate={{ x: flapOpen ? "100%" : "0%", rotateY: flapOpen ? 32 : 0 }}
              transition={{ duration: STAGE.flapOpen, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformPerspective: 1400 }}
            />

            <AnimatePresence>
              {stage === "sealed" && (
                <motion.button
                  type="button"
                  aria-label={t.openInvitation}
                  onClick={breakSeal}
                  exit={{ scale: 0.66, opacity: 0, rotate: -16, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: "easeIn" }}
                  className="absolute inset-0 flex flex-col items-center justify-center focus-visible:outline-none"
                >
                  <span className="flex h-28 w-28 items-center justify-center rounded-full border border-gold/50 bg-[radial-gradient(circle_at_35%_30%,#e8a9a3,#b9635c)] shadow-[0_18px_40px_-18px_rgba(120,60,50,0.8)]">
                    <img src={monogram.url} alt="" width={718} height={980} className="h-16 w-auto" />
                  </span>
                  <p className="mt-10 animate-pulse font-accent text-lg text-text-secondary">
                    {t.tapTheSeal}
                  </p>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- Stage 5: cross-fade into the DOM invitation ---------- */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 bg-paper"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === "open" ? 1 : 0 }}
        transition={{ duration: STAGE.handoff, ease: "easeInOut" }}
      />
    </div>
  );
}