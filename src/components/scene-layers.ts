import mehandiBg from "@/assets/scenes/mehandi-bg.jpg";
import mehandiFg from "@/assets/scenes/mehandi-fg.png";
import sangeetBg from "@/assets/scenes/sangeet-bg.jpg";
import sangeetFg from "@/assets/scenes/sangeet-fg.png";
import masqueradeBg from "@/assets/scenes/masquerade-bg.jpg";
import masqueradeFg from "@/assets/scenes/masquerade-fg.png";
import haldiBg from "@/assets/scenes/haldi-bg.jpg";
import haldiFg from "@/assets/scenes/haldi-fg.png";
import baaratBg from "@/assets/scenes/baarat-bg.jpg";
import baaratFg from "@/assets/scenes/baarat-fg.png";
import varmalaBg from "@/assets/scenes/varmala-bg.jpg";
import varmalaFg from "@/assets/scenes/varmala-fg.png";
import feraBg from "@/assets/scenes/fera-bg.jpg";
import feraFg from "@/assets/scenes/fera-fg.png";

export type SceneLayer = {
  bg: string;
  fg: string;
  fgAlt: string;
  /** Tailwind positioning/sizing classes for the foreground layer. */
  fgClass: string;
  /** Animation utility class applied to the foreground layer. */
  anim: string;
  /** Extra opacity/blend for the foreground layer. */
  style?: React.CSSProperties;
};

export const SCENE_LAYERS: Record<string, SceneLayer> = {
  mehandi: {
    bg: mehandiBg,
    fg: mehandiFg,
    fgAlt: "Palm fronds swaying over the mehandi lawn",
    fgClass: "left-0 top-[-6%] w-[58%]",
    anim: "fg-sway",
    style: { opacity: 0.9 },
  },
  "engagement-sangeet": {
    bg: sangeetBg,
    fg: sangeetFg,
    fgAlt: "Stage lights glowing over the sangeet",
    fgClass: "left-0 top-0 w-full",
    anim: "fg-glow",
    style: { mixBlendMode: "screen", opacity: 0.75 },
  },
  masquerade: {
    bg: masqueradeBg,
    fg: masqueradeFg,
    fgAlt: "Disco ball turning above the masquerade hall",
    fgClass: "left-1/2 top-[4%] w-[16%] -translate-x-1/2",
    anim: "fg-spin",
  },
  haldi: {
    bg: haldiBg,
    fg: haldiFg,
    fgAlt: "Marigold petals drifting over the haldi pool deck",
    fgClass: "left-0 top-0 h-[130%] w-full",
    anim: "fg-drift",
    style: { opacity: 0.85 },
  },
  baarat: {
    bg: baaratBg,
    fg: baaratFg,
    fgAlt: "Dhol player striking the drum in the baarat",
    fgClass: "left-[6%] bottom-0 h-[74%] w-auto",
    anim: "fg-strike",
  },
  varmala: {
    bg: varmalaBg,
    fg: varmalaFg,
    fgAlt: "Waves rolling onto the beach",
    fgClass: "left-[-6%] bottom-[2%] w-[112%]",
    anim: "fg-swell",
    style: { opacity: 0.8 },
  },
  fera: {
    bg: feraBg,
    fg: feraFg,
    fgAlt: "Sacred fire flickering during the fera",
    fgClass: "left-1/2 bottom-[12%] h-[26%] w-auto -translate-x-1/2",
    anim: "fg-flame",
  },
};
