import { MehandiScene } from "./MehandiScene";
import { SangeetScene } from "./SangeetScene";
import { MasqueradeScene } from "./MasqueradeScene";
import { HaldiScene } from "./HaldiScene";
import { BaaratScene } from "./BaaratScene";
import { VarmalaScene } from "./VarmalaScene";
import { FeraScene } from "./FeraScene";

export const SCENES: Record<string, () => React.JSX.Element> = {
  mehandi: MehandiScene,
  "engagement-sangeet": SangeetScene,
  masquerade: MasqueradeScene,
  haldi: HaldiScene,
  baarat: BaaratScene,
  varmala: VarmalaScene,
  fera: FeraScene,
};
