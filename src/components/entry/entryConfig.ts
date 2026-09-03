/**
 * Central config for the 3D cinematic fly-through entry.
 *
 * Every element in the scene is a FLAT plane with a transparent-background
 * illustration mapped onto it. To swap in real art, just set `src` to a file
 * you dropped in /public (e.g. "/entry/curtain-left.png"). While `src` is
 * empty the plane renders as a labelled placeholder so the camera
 * choreography can be reviewed without art.
 */

/** Blush / ivory palette (three.js needs raw hex, not Tailwind tokens). */
export const ENTRY_PALETTE = {
  fog: "#f6e7e2",
  curtain: "#eccdc6",
  lantern: "#d9a441",
  arch: "#f0d8cf",
  chandelier: "#f6e8d5",
  pom: "#e5aeb2",
  aisle: "#fbf1ea",
  gold: "#d9a441",
  paper: "#fbf4ea",
} as const;

export type EntryLayer = {
  /** stable id, also used as the placeholder label */
  id: string;
  /** drop art in /public and point here, e.g. "/entry/curtain-left.png" */
  src: string;
  /** world-space position [x, y, z] */
  position: readonly [number, number, number];
  /** plane size [width, height] in world units */
  size: readonly [number, number];
  /** placeholder tint until art is supplied */
  color: string;
  /** curtain panels slide outward as the camera reaches them */
  part?: "left" | "right";
  /** lay the plane flat on the floor (the aisle runner) */
  floor?: boolean;
  opacity?: number;
};

/**
 * Ordered farthest-to-nearest is irrelevant for rendering (real depth does the
 * work) but is kept readable here: curtains z=0, aisle + florals in between,
 * card at the far end.
 */
export const ENTRY_LAYERS: readonly EntryLayer[] = [
  // --- Stage 2: nearest curtain pair + hanging lanterns ---
  {
    id: "curtain-left.png",
    src: "",
    position: [-4.6, 0, 0],
    size: [10, 22],
    color: ENTRY_PALETTE.curtain,
    part: "left",
  },
  {
    id: "curtain-right.png",
    src: "",
    position: [4.6, 0, 0],
    size: [10, 22],
    color: ENTRY_PALETTE.curtain,
    part: "right",
  },
  {
    id: "lantern-left.png",
    src: "",
    position: [-3.1, 5.4, -1],
    size: [1.7, 3.2],
    color: ENTRY_PALETTE.lantern,
    part: "left",
  },
  {
    id: "lantern-right.png",
    src: "",
    position: [3.1, 5.4, -1],
    size: [1.7, 3.2],
    color: ENTRY_PALETTE.lantern,
    part: "right",
  },

  // --- Stage 3: aisle floor + parallax florals + arch ---
  {
    id: "aisle-runner.png",
    src: "",
    position: [0, -6.5, -28],
    size: [16, 62],
    color: ENTRY_PALETTE.aisle,
    floor: true,
  },

  { id: "pom-left-1.png", src: "", position: [-6.2, -3.4, -8], size: [4.4, 4.4], color: ENTRY_PALETTE.pom },
  { id: "pom-right-1.png", src: "", position: [6.2, -3.4, -9], size: [4.4, 4.4], color: ENTRY_PALETTE.pom },
  { id: "pom-left-2.png", src: "", position: [-5.4, -3.8, -17], size: [3.8, 3.8], color: ENTRY_PALETTE.pom },
  { id: "pom-right-2.png", src: "", position: [5.4, -3.8, -18], size: [3.8, 3.8], color: ENTRY_PALETTE.pom },
  { id: "pom-left-3.png", src: "", position: [-4.6, -4.2, -26], size: [3.2, 3.2], color: ENTRY_PALETTE.pom },
  { id: "pom-right-3.png", src: "", position: [4.6, -4.2, -27], size: [3.2, 3.2], color: ENTRY_PALETTE.pom },

  {
    id: "arch-canopy.png",
    src: "",
    position: [0, 1.5, -40],
    size: [24, 20],
    color: ENTRY_PALETTE.arch,
    opacity: 0.95,
  },
  {
    id: "chandelier.png",
    src: "",
    position: [0, 6.2, -38],
    size: [4.2, 5],
    color: ENTRY_PALETTE.chandelier,
  },

  // --- Stage 4: the invitation card + its stand at the far end ---
  {
    id: "card-stand.png",
    src: "",
    position: [0, -5.4, -50.2],
    size: [5.4, 3],
    color: ENTRY_PALETTE.gold,
  },
];

/** The invitation card is handled separately — the camera fits exactly to it. */
export const INVITE_LAYER = {
  id: "invitation-card.png",
  src: "",
  color: ENTRY_PALETTE.paper,
} as const;

export const CAMERA_START_Z = 9;
export const INVITE_Z = -50;
/** Invitation card size in world units (w, h) — portrait, like the reference. */
export const INVITE_SIZE: readonly [number, number] = [7.2, 10.4];

/** ---- Timeline (seconds), one shared clock drives every stage ---- */
export const STAGE = {
  /** flap opens like double doors before the dolly starts */
  flapOpen: 0.9,
  /** curtains part between these two points of overall fly progress */
  curtainPart: [0.02, 0.3] as const,
  /** total dolly length once the flap is out of the way */
  fly: 5.6,
  /** cross-fade to the DOM invitation */
  handoff: 0.6,
} as const;

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
