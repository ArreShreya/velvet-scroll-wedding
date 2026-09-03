import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";
import monogram from "@/assets/monogram-ps.png.asset.json";
import { useLang } from "@/i18n/LanguageContext";
import { EntryLayers } from "./EntryLayers";
import {
  CAMERA_START_Z,
  ENTRY_PALETTE,
  INVITE_SIZE,
  INVITE_Z,
  STAGE,
  clamp01,
  easeInOutCubic,
} from "./entryConfig";

/**
 * Stage machine for the whole opening:
 *   sealed  -> user taps the wax seal
 *   flap    -> envelope halves swing open like double doors (Stage 1)
 *   flying  -> single continuous camera dolly down the aisle (Stages 2-4)
 *   open    -> cross-fade hand-off to the DOM invitation (Stage 5)
 * A stage can only be entered from the one before it.
 */
type Stage = "sealed" | "flap" | "flying" | "open";

/**
 * THE CAMERA TIMELINE lives here: one clock, one dolly, no cuts.
 * It also publishes normalised progress into `progressRef` so the curtain
 * panels part in lockstep with the same timeline.
 */
function CameraRig({
  running,
  progressRef,
  onArrive,
}: {
  running: boolean;
  progressRef: React.RefObject<number>;
  onArrive: () => void;
}) {
  const { camera, size } = useThree();
  const elapsed = useRef(0);
  const done = useRef(false);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (running) elapsed.current += delta;
    const p = clamp01(elapsed.current / STAGE.fly);
    progressRef.current = p;

    // End exactly where the invitation card fills the frame edge to edge.
    const cam = camera as THREE.PerspectiveCamera;
    const halfFov = (cam.fov * Math.PI) / 360;
    const aspect = size.width / size.height;
    const [w, h] = INVITE_SIZE;
    const fitDistance = Math.max(h / 2 / Math.tan(halfFov), w / 2 / (Math.tan(halfFov) * aspect));
    const endZ = INVITE_Z + fitDistance;

    const eased = easeInOutCubic(p);
    cam.position.z = THREE.MathUtils.lerp(CAMERA_START_Z, endZ, eased);
    const idle = (1 - eased) * 0.3;
    cam.position.x = Math.sin(elapsed.current * 0.4) * idle;
    cam.position.y = THREE.MathUtils.lerp(1.1, 0, eased) + Math.cos(elapsed.current * 0.3) * idle;
    cam.lookAt(0, 0, INVITE_Z);

    if (p >= 1 && !done.current) {
      done.current = true;
      onArrive();
    }
  });

  return null;
}

function EntryScene({
  running,
  progressRef,
  onArrive,
}: {
  running: boolean;
  progressRef: React.RefObject<number>;
  onArrive: () => void;
}) {
  return (
    <>
      <color attach="background" args={[ENTRY_PALETTE.fog]} />
      <fog attach="fog" args={[ENTRY_PALETTE.fog, 26, 96]} />
      <ambientLight intensity={1} />
      <EntryLayers progressRef={progressRef} />
      <CameraRig running={running} progressRef={progressRef} onArrive={onArrive} />
    </>
  );
}

export function CinematicEntry({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const [stage, setStage] = useState<Stage>("sealed");
  const progressRef = useRef(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Stage 1 -> Stage 2: only after the flap has finished opening.
  useEffect(() => {
    if (stage !== "flap") return;
    const id = window.setTimeout(() => setStage("flying"), STAGE.flapOpen * 1000);
    return () => window.clearTimeout(id);
  }, [stage]);

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
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 1.1, CAMERA_START_Z], fov: 55 }}
        gl={{ antialias: true }}
      >
        <EntryScene
          running={stage === "flying" || stage === "open"}
          progressRef={progressRef}
          onArrive={handleArrive}
        />
      </Canvas>

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
            {/* left / right halves swing open like double doors */}
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

            {/* wax seal */}
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
                  <p className="mt-10 animate-pulse font-sans text-[0.75rem] uppercase tracking-[0.42em] text-rose-deep/80">
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
