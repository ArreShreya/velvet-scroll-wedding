import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ENTRY_PALETTE } from "./entryConfig";

/** Glowing fairy lights strung between the curtain layers. */
function FairyLights({ z, count = 26 }: { z: number; count?: number }) {
  const group = useRef<THREE.Group>(null);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: -11 + (i / (count - 1)) * 22,
        y: 7 - Math.sin((i / count) * Math.PI) * 3.2 + ((i * 37) % 9) / 9,
        phase: (i * 1.7) % (Math.PI * 2),
      })),
    [count],
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current?.children.forEach((child, i) => {
      const seed = seeds[i];
      if (!seed) return;
      const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.4 + Math.sin(t * 2 + seed.phase) * 0.6;
    });
  });

  return (
    <group ref={group} position={[0, 0, z]}>
      {seeds.map((s, i) => (
        <mesh key={i} position={[s.x, s.y, 0]}>
          <sphereGeometry args={[0.12, 10, 10]} />
          <meshStandardMaterial
            color={"#fff3d6"}
            emissive={ENTRY_PALETTE.gold}
            emissiveIntensity={1.6}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Petals drifting downward between the layers. */
function Petals({ z, count = 40 }: { z: number; count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (Math.sin(i * 12.9898) * 43758.5453) % 1,
        y: (Math.sin(i * 78.233) * 12345.678) % 1,
        z: (Math.sin(i * 39.425) * 24680.135) % 1,
        spin: 0.4 + ((i * 13) % 10) / 12,
      })),
    [count],
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!mesh.current) return;
    seeds.forEach((s, i) => {
      const x = s.x * 18;
      const drift = Math.sin(t * 0.6 + i) * 1.2;
      const y = 10 - ((t * (0.9 + Math.abs(s.y)) + Math.abs(s.y) * 20) % 20);
      dummy.position.set(x + drift, y, s.z * 6);
      dummy.rotation.set(t * s.spin, t * s.spin * 0.7, t * 0.3);
      dummy.scale.setScalar(0.22 + Math.abs(s.z) * 0.18);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} position={[0, 0, z]}>
      {/* Placeholder petal: swap for a textured plane using ENTRY_ASSETS.petalTexture */}
      <circleGeometry args={[1, 8]} />
      <meshStandardMaterial
        color={ENTRY_PALETTE.petal}
        side={THREE.DoubleSide}
        roughness={0.7}
        transparent
        opacity={0.9}
      />
    </instancedMesh>
  );
}

/** Floating floral arrangement placeholder (swap for ENTRY_ASSETS.floralModel). */
function FloatingFlorals({ z }: { z: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) group.current.position.y = Math.sin(t * 0.5) * 0.4;
  });
  return (
    <group ref={group} position={[0, 0, z]}>
      {[-8, 8].map((x) => (
        <group key={x} position={[x, 2.5, 0]}>
          {Array.from({ length: 9 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                Math.cos(i * 1.4) * 0.9,
                Math.sin(i * 2.1) * 0.9,
                Math.sin(i * 0.8) * 0.6,
              ]}
            >
              <icosahedronGeometry args={[0.42, 0]} />
              <meshStandardMaterial
                color={i % 2 ? ENTRY_PALETTE.petal : "#f6ded2"}
                roughness={0.75}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

export function Decor() {
  return (
    <>
      <FairyLights z={-5} />
      <Petals z={-5} />
      <FloatingFlorals z={-5} />
      <FairyLights z={-15} count={20} />
      <Petals z={-15} count={30} />
      <FloatingFlorals z={-15} />
      <Petals z={-24} count={24} />
    </>
  );
}
