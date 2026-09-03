/**
 * Central config for the 3D tap-to-reveal entry.
 *
 * Swap in your own assets later: drop files in /public and point these
 * placeholder paths at them (leave a path empty to keep the procedural look).
 */
export const ENTRY_ASSETS = {
  /** e.g. "/textures/velvet.jpg" — tiling fabric texture for the curtains */
  curtainTexture: "",
  /** e.g. "/textures/petal.png" — transparent petal sprite */
  petalTexture: "",
  /** e.g. "/models/floral-arch.glb" — floating floral arrangement */
  floralModel: "",
} as const;

/** Blush / ivory palette (three.js needs raw hex, not Tailwind tokens). */
export const ENTRY_PALETTE = {
  fog: "#f6e7e2",
  curtainA: "#e8b7b0",
  curtainB: "#f0cdc4",
  curtainC: "#f7e2d8",
  gold: "#d9a441",
  petal: "#e9a7ae",
  paper: "#fbf4ea",
} as const;

/** Z position of each curtain layer, front to back. */
export const CURTAIN_LAYERS = [
  { z: 0, color: ENTRY_PALETTE.curtainA, part: [0.08, 0.34] as const },
  { z: -10, color: ENTRY_PALETTE.curtainB, part: [0.32, 0.58] as const },
  { z: -20, color: ENTRY_PALETTE.curtainC, part: [0.56, 0.82] as const },
];

/** Camera travels from in front of curtain 1 to just before the invite card. */
export const CAMERA_START_Z = 12;
export const INVITE_Z = -34;
/** Invitation card size in world units (w, h). */
export const INVITE_SIZE: readonly [number, number] = [7.2, 10.4];
/** Fly-through duration in seconds. */
export const FLY_DURATION = 5.2;

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
