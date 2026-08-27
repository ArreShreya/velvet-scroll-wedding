import mehandiBg from "@/assets/scenes/mehandi-bg.jpg";
import sangeetBg from "@/assets/scenes/sangeet-bg.jpg";
import masqueradeBg from "@/assets/scenes/masquerade-bg.jpg";
import haldiBg from "@/assets/scenes/haldi-bg.jpg";
import baaratBg from "@/assets/scenes/baarat-bg.jpg";
import varmalaBg from "@/assets/scenes/varmala-bg.jpg";
import feraBg from "@/assets/scenes/fera-bg.jpg";
import mehandiMobile from "@/assets/scenes/mehandi-bg-mobile.jpg";
import sangeetMobile from "@/assets/scenes/sangeet-bg-mobile.jpg";
import masqueradeMobile from "@/assets/scenes/masquerade-bg-mobile.jpg";
import haldiMobile from "@/assets/scenes/haldi-bg-mobile.jpg";
import baaratMobile from "@/assets/scenes/baarat-bg-mobile.jpg";
import varmalaMobile from "@/assets/scenes/varmala-bg-mobile.jpg";
import feraMobile from "@/assets/scenes/fera-bg-mobile.jpg";

/**
 * Each event page is ONE complete illustration. Motion comes from small
 * clipped windows cut out of that same illustration and animated in place —
 * never from a separately generated floating graphic.
 */
export type Hotspot = {
  /** Region in % of the illustration: x/y = top-left, w/h = size. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Motion applied to the cloned slice of the base art. */
  anim: "glow" | "sway" | "shimmer" | "flame" | "ripple";
  /** Optional particle overlay drawn inside the region. */
  particles?: "sparkle" | "petal";
  /** Softness of the mask edge (0-50, % of region). */
  feather?: number;
};

export type Scene = {
  bg: string;
  /** Vertically recomposed artwork used on narrow screens. */
  bgMobile: string;
  hotspots: Hotspot[];
};

export const SCENES: Record<string, Scene> = {
  mehandi: {
    bg: mehandiBg,
    bgMobile: mehandiMobile,
    hotspots: [
      // palm fronds, top centre + right
      { x: 40, y: 0, w: 32, h: 24, anim: "sway" },
      { x: 66, y: 0, w: 34, h: 26, anim: "sway" },
      // brass lanterns on the ground
      { x: 4, y: 74, w: 12, h: 24, anim: "glow", feather: 45 },
      { x: 80, y: 76, w: 14, h: 22, anim: "glow", feather: 45 },
    ],
  },
  "engagement-sangeet": {
    bg: sangeetBg,
    bgMobile: sangeetMobile,
    hotspots: [
      // truss spotlights
      { x: 40, y: 3, w: 46, h: 13, anim: "glow", feather: 40 },
      // stage chandelier
      { x: 64, y: 17, w: 12, h: 15, anim: "glow", feather: 45 },
      // fairy-light canopy over the lounge
      { x: 0, y: 14, w: 36, h: 22, anim: "glow", particles: "sparkle", feather: 45 },
      // candle table
      { x: 14, y: 82, w: 24, h: 18, anim: "flame", feather: 45 },
    ],
  },
  masquerade: {
    bg: masqueradeBg,
    bgMobile: masqueradeMobile,
    hotspots: [
      // main crystal chandelier — sways and catches the light
      { x: 44, y: 3, w: 22, h: 38, anim: "sway", particles: "sparkle", feather: 35 },
      // far chandelier down the hall
      { x: 42, y: 40, w: 12, h: 18, anim: "glow", feather: 45 },
      // wall sconces
      { x: 0, y: 32, w: 10, h: 22, anim: "flame", feather: 45 },
      { x: 92, y: 40, w: 8, h: 20, anim: "flame", feather: 45 },
    ],
  },
  haldi: {
    bg: haldiBg,
    bgMobile: haldiMobile,
    hotspots: [
      // marigold petals tossed above the pool
      { x: 46, y: 0, w: 46, h: 28, anim: "glow", particles: "petal", feather: 45 },
      // pool surface ripple
      { x: 34, y: 60, w: 48, h: 16, anim: "ripple", feather: 40 },
      // palm fronds, right edge
      { x: 78, y: 0, w: 22, h: 26, anim: "sway" },
    ],
  },
  baarat: {
    bg: baaratBg,
    bgMobile: baaratMobile,
    hotspots: [
      // bunting and hanging tassels swinging over the procession
      { x: 16, y: 0, w: 76, h: 18, anim: "sway", feather: 35 },
      // sunset glow behind the palace
      { x: 52, y: 18, w: 34, h: 22, anim: "glow", feather: 48 },
      // dhol players on the right
      { x: 62, y: 58, w: 34, h: 40, anim: "shimmer", feather: 45 },
    ],
  },
  varmala: {
    bg: varmalaBg,
    bgMobile: varmalaMobile,
    hotspots: [
      // ocean surface, left and right of the mandap
      { x: 0, y: 58, w: 34, h: 14, anim: "ripple", feather: 40 },
      { x: 68, y: 58, w: 32, h: 14, anim: "ripple", feather: 40 },
      // sun on the horizon
      { x: 76, y: 46, w: 14, h: 14, anim: "glow", feather: 48 },
      // mandap chandelier
      { x: 44, y: 25, w: 12, h: 14, anim: "glow", feather: 45 },
      // lanterns along the aisle
      { x: 60, y: 72, w: 12, h: 20, anim: "flame", feather: 45 },
      { x: 80, y: 70, w: 14, h: 24, anim: "flame", feather: 45 },
    ],
  },
  fera: {
    bg: feraBg,
    bgMobile: feraMobile,
    hotspots: [
      // starry sky
      { x: 0, y: 0, w: 34, h: 32, anim: "glow", particles: "sparkle", feather: 48 },
      // the holy fire
      { x: 52, y: 64, w: 9, h: 12, anim: "flame", feather: 40 },
      // hanging lantern under the mandap
      { x: 51, y: 28, w: 10, h: 14, anim: "glow", feather: 45 },
      // candle rows in the foreground
      { x: 20, y: 76, w: 26, h: 22, anim: "flame", feather: 45 },
      { x: 66, y: 74, w: 30, h: 24, anim: "flame", feather: 45 },
    ],
  },
};
