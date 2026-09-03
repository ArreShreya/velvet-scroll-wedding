import { useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import {
  ENTRY_LAYERS,
  INVITE_SIZE,
  INVITE_Z,
  INVITE_LAYER,
  STAGE,
  clamp01,
  easeInOutCubic,
  type EntryLayer,
} from "./entryConfig";

/**
 * A flat billboard plane. Uses the illustrated PNG when `src` is set,
 * otherwise a tinted translucent placeholder so the choreography is reviewable.
 */
function LayerPlane({
  layer,
  progressRef,
}: {
  layer: EntryLayer;
  progressRef: React.RefObject<number>;
}) {
  const ref = useRef<THREE.Group>(null);
  const [x, y, z] = layer.position;
  const [w, h] = layer.size;

  useFrame(() => {
    if (!ref.current || !layer.part) return;
    const [a, b] = STAGE.curtainPart;
    const o = easeInOutCubic(clamp01(((progressRef.current ?? 0) - a) / (b - a)));
    const dir = layer.part === "left" ? -1 : 1;
    ref.current.position.x = x + dir * o * 9;
    ref.current.rotation.y = -dir * o * 0.4;
  });

  return (
    <group ref={ref} position={[x, y, z]}>
      <mesh rotation={layer.floor ? [-Math.PI / 2, 0, 0] : [0, 0, 0]}>
        <planeGeometry args={[w, h]} />
        <PlaneMaterial src={layer.src} color={layer.color} opacity={layer.opacity ?? 1} />
      </mesh>
    </group>
  );
}

/** Texture when art is supplied, flat tint while it is not. */
function PlaneMaterial({
  src,
  color,
  opacity = 1,
}: {
  src: string;
  color: string;
  opacity?: number;
}) {
  if (src) return <TexturedMaterial src={src} opacity={opacity} />;
  return (
    <meshBasicMaterial
      color={color}
      transparent
      opacity={opacity * 0.92}
      side={THREE.DoubleSide}
      depthWrite={false}
      toneMapped={false}
    />
  );
}

function TexturedMaterial({ src, opacity }: { src: string; opacity: number }) {
  const texture = useLoader(THREE.TextureLoader, src);
  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);
  return (
    <meshBasicMaterial
      map={texture}
      transparent
      opacity={opacity}
      side={THREE.DoubleSide}
      depthWrite={false}
      toneMapped={false}
    />
  );
}

/** The invitation card at the far end of the aisle — the camera's target. */
function InviteCard() {
  const [w, h] = INVITE_SIZE;
  return (
    <group position={[0, 0, INVITE_Z]}>
      <mesh position={[0, 0, -0.06]}>
        <planeGeometry args={[w + 0.45, h + 0.45]} />
        <meshBasicMaterial color="#d9a441" toneMapped={false} />
      </mesh>
      <mesh>
        <planeGeometry args={[w, h]} />
        <PlaneMaterial src={INVITE_LAYER.src} color={INVITE_LAYER.color} />
      </mesh>
    </group>
  );
}

export function EntryLayers({ progressRef }: { progressRef: React.RefObject<number> }) {
  return (
    <>
      {ENTRY_LAYERS.map((layer) => (
        <LayerPlane key={layer.id} layer={layer} progressRef={progressRef} />
      ))}
      <InviteCard />
    </>
  );
}
