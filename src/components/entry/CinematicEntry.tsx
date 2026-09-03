import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";
import monogram from "@/assets/monogram-ps.png.asset.json";
import { useLang } from "@/i18n/LanguageContext";
import { Curtains } from "./Curtains";
import { Decor } from "./Decor";
import {
  CAMERA_START_Z,
  ENTRY_PALETTE,
  FLY_DURATION,
  INVITE_SIZE,
  INVITE_Z,
  clamp01,
  easeInOutCubic,
} from "./entryConfig";

type Phase = "sealed" | "flying" | "open";

/** Drives the shared progress ref and flies the camera down the Z axis. */
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
    const p = clamp01(elapsed.current / FLY_DURATION);
    progressRef.current = p;

    // Stop exactly where the invitation card fills the screen.
    const cam = camera as THREE.PerspectiveCamera;
    const halfFov = (cam.fov * Math.PI) / 360;
    const aspect = size.width / size.height;
    const [w, h] = INVITE_SIZE;
    const fitDistance = Math.max(h / 2 / Math.tan(halfFov), w / 2 / (Math.tan(halfFov) * aspect));
    const endZ = INVITE_Z + fitDistance;

    const eased = easeInOutCubic(p);
    cam.position.z = THREE.MathUtils.lerp(CAMERA_START_Z, endZ, eased);
    // gentle idle drift before launch, settling to dead-centre on arrival
    const idle = (1 - eased) * 0.35;
    cam.position.x = Math.sin(elapsed.current * 0.4) * idle;
    cam.position.y = Math.cos(elapsed.current * 0.3) * idle;
    cam.lookAt(0, 0, INVITE_Z);

    if (p >= 1 && !done.current) {
      done.current = true;
      onArrive();
    }
  });

  return null;
}

/** The invitation card sitting behind the last curtain. */
function InviteCard() {
  const [w, h] = INVITE_SIZE;
  return (
    <group position={[0, 0, INVITE_Z]}>
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial color={ENTRY_PALETTE.paper} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[w + 0.5, h + 0.5]} />
        <meshStandardMaterial color={ENTRY_PALETTE.gold} roughness={0.45} metalness={0.5} />
      </mesh>

    </group>
  );
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
      <fog attach="fog" args={[ENTRY_PALETTE.fog, 18, 70]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[6, 12, 10]} intensity={1.1} />
      <pointLight position={[0, 2, INVITE_Z + 6]} intensity={60} color={"#ffe9d2"} />
      <Environment>
        <Lightformer intensity={2} position={[0, 6, 4]} scale={[12, 12, 1]} />
        <Lightformer
          intensity={1}
          color="#f3c9bf"
          position={[-8, 1, -6]}
          rotation-y={Math.PI / 2}
          scale={[24, 2, 1]}
        />
      </Environment>

      <Curtains progressRef={progressRef} />
      <Decor />
      <InviteCard />
      <CameraRig running={running} progressRef={progressRef} onArrive={onArrive} />
    </>
  );
}

/**
 * Tap-to-reveal entry: wax seal (2D, framer-motion) -> camera fly-through of
 * three curtain layers (R3F) -> hand-off to the scrollable DOM invitation.
 */
export function CinematicEntry({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const [phase, setPhase] = useState<Phase>("sealed");
  const progressRef = useRef(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(reduce);
  }, []);

  const handleArrive = () => {
    setPhase("open");
    // let the card settle, then hand scrolling over to the DOM invitation
    window.setTimeout(onDone, 650);
  };

  const breakSeal = () => {
    if (phase !== "sealed") return;
    if (reduced) {
      onDone();
      return;
    }
    setPhase("flying");
  };

  return (
    <div className="fixed inset-0 z-[90] overflow-hidden bg-paper">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, CAMERA_START_Z], fov: 55 }}
        gl={{ antialias: true }}
      >
        <EntryScene
          running={phase !== "sealed"}
          progressRef={progressRef}
          onArrive={handleArrive}
        />
      </Canvas>

      {/* ---------- 2D seal layer ---------- */}
      <AnimatePresence>
        {phase === "sealed" && (
          <motion.button
            type="button"
            aria-label={t.openInvitation}
            onClick={breakSeal}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center focus-visible:outline-none"
          >
            {/* envelope body + flap */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--paper-tint,#fdf3ec),#f3d9d1)]" />
            <motion.div
              className="absolute inset-x-0 top-0 h-1/2 origin-top border-b border-rose/30 bg-[linear-gradient(180deg,#f7e2da,#eeccc3)] [clip-path:polygon(0_0,100%_0,50%_100%)]"
              exit={{ rotateX: -115 }}
              style={{ transformPerspective: 1400 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            />

            <motion.span
              className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border border-gold/50 bg-[radial-gradient(circle_at_35%_30%,#e8a9a3,#b9635c)] shadow-[0_18px_40px_-18px_rgba(120,60,50,0.8)]"
              exit={{ scale: 0.7, opacity: 0, rotate: -14 }}
              transition={{ duration: 0.5, ease: "easeIn" }}
            >
              <img src={monogram.url} alt="" width={718} height={980} className="h-16 w-auto" />
            </motion.span>

            <motion.p
              className="relative z-10 mt-10 animate-pulse font-sans text-[0.75rem] uppercase tracking-[0.42em] text-rose-deep/80"
              exit={{ opacity: 0 }}
            >
              {t.tapTheSeal}
            </motion.p>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cross-fade to the DOM invitation once the camera lands */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 bg-paper"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "open" ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </div>
  );
}
