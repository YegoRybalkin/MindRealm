import type { ArtDef } from "./types";
import { castleArt } from "./castle";
import { houseArt } from "./house";
import { gardenArt } from "./garden";
import { stationArt } from "./station";
import { itemArt } from "./items";
import { items2Art } from "./items2";
import { rooms2Art } from "./rooms2";
import { rooms3Art } from "./rooms3";
import { items3Art } from "./items3";

/**
 * Registry of every object illustration, keyed by `visualType`.
 * New environments can register their own sets here.
 */
export const ART: Record<string, ArtDef> = {
  ...castleArt,
  ...houseArt,
  ...gardenArt,
  ...stationArt,
  ...itemArt,
  ...items2Art,
  ...rooms2Art,
  ...rooms3Art,
  ...items3Art,
};

export function getArt(visualType: string): ArtDef | undefined {
  return ART[visualType];
}

export type { ArtDef };
