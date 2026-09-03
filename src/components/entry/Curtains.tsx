import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CURTAIN_LAYERS, clamp01, easeInOutCubic } from "./entryConfig";

/** Plane with sine folds baked into the geometry so it reads as draped fabric. */
function useDrapedGeometry(width: number, height: number, folds: number) {
  return useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, height, 48, 12);
    const pos = geo.attributes["position"] as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const sag = Math.cos((y / height) * Math.PI) * 0.15;
      pos.setZ(i, Math.sin((x / width) * Math.PI * folds) * (0.55 + sag));
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, [width, height, folds]);
}

function CurtainPanel({
  side,
  color,
  geometry,
}: {
  side: -1 | 1;
  color: string;
  geometry: THREE.BufferGeometry;
}) {
  return (
    <mesh geometry={geometry} position={[side * 5.5, 0, 0]} castShadow receiveShadow>
      {/* Velvet-ish sheen; swap in a fabric texture map later. */}
      <meshPhysicalMaterial
        color={color}
        roughness={0.95}
        metalness={0.04}
        side={THREE.DoubleSide}
        sheen={1}
        sheenColor={"#ffd9c9"}
        sheenRoughness={0.6}
      />
    </mesh>
  );
}

/** One curtain layer: two panels that part left/right as the camera reaches it. */
function CurtainLayer({
  z,
  color,
  part,
  progressRef,
}: {
  z: number;
  color: string;
  part: readonly [number, number];
  progressRef: React.RefObject<number>;
}) {
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);
  const geometry = useDrapedGeometry(11, 26, 6);

  useFrame(() => {
    const p = progressRef.current ?? 0;
    const openStart = part[0];
    const openEnd = part[1];
    const o = easeInOutCubic(clamp01((p - openStart) / (openEnd - openStart)));
    const shift = o * 11;
    if (left.current) {
      left.current.position.x = -shift;
      left.current.rotation.y = o * 0.35;
    }
    if (right.current) {
      right.current.position.x = shift;
      right.current.rotation.y = -o * 0.35;
    }
  });

  return (
    <group position={[0, 0, z]}>
      {/* pelmet / valance */}
      <mesh position={[0, 11.5, 0.4]}>
        <boxGeometry args={[24, 1.4, 0.6]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>
      <group ref={left}>
        <CurtainPanel side={-1} color={color} geometry={geometry} />
      </group>
      <group ref={right}>
        <CurtainPanel side={1} color={color} geometry={geometry} />
      </group>
    </group>
  );
}

export function Curtains({ progressRef }: { progressRef: React.RefObject<number> }) {
  return (
    <>
      {CURTAIN_LAYERS.map((layer) => (
        <CurtainLayer key={layer.z} {...layer} progressRef={progressRef} />
      ))}
    </>
  );
}
