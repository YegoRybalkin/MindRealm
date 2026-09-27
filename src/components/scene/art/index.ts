import type { ArtDef } from "./types";
import { castleArt } from "./castle";
import { houseArt } from "./house";
import { gardenArt } from "./garden";
import { stationArt } from "./station";

/**
 * Registry of every object illustration, keyed by `visualType`.
 * New environments can register their own sets here.
 */
export const ART: Record<string, ArtDef> = {
  ...castleArt,
  ...houseArt,
  ...gardenArt,
  ...stationArt,
};

export function getArt(visualType: string): ArtDef | undefined {
  return ART[visualType];
}

export type { ArtDef };
