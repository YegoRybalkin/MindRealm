/**
 * Visual "looks" that make repeated objects unmistakably different: a recolour,
 * a surface pattern, a change of proportions and a matching name adjective.
 * The first object of a kind in a world keeps its original look; every further
 * one gets a look no other object of that kind in the world uses.
 *
 * Presets are append-only: objects store the preset index.
 */

export type LookPattern = "dots" | "stripes" | "checks" | "stars" | "zigzag" | "veins" | "scales" | "plaid" | "diamonds" | "waves" | "hearts" | "crosses";

export interface LookPreset {
  adjective: string;
  hue: number;
  saturate: number;
  brightness: number;
  tint: string;
  tintAmount: number;
  pattern: LookPattern;
  patternColor: string;
  patternOpacity: number;
  /** Width / height multipliers. */
  sx: number;
  sy: number;
}

const base: Omit<LookPreset, "adjective" | "hue" | "tint" | "pattern" | "patternColor"> = {
  saturate: 1.25,
  brightness: 1,
  tintAmount: 0.55,
  patternOpacity: 0.42,
  sx: 1,
  sy: 1,
};

export const LOOK_PRESETS: LookPreset[] = [
  { ...base, adjective: "Spotted", hue: 140, tint: "#7fe0b0", pattern: "dots", patternColor: "#ffffff" },
  { ...base, adjective: "Tall Striped", hue: 215, tint: "#8fb0ff", pattern: "stripes", patternColor: "#ffe08a", sx: 0.88, sy: 1.14 },
  { ...base, adjective: "Wide Checkered", hue: 55, tint: "#ffd27a", pattern: "checks", patternColor: "#1a1a1a", patternOpacity: 0.3, sx: 1.16, sy: 0.9 },
  { ...base, adjective: "Starry", hue: 265, tint: "#b88cff", pattern: "stars", patternColor: "#fff6c8", brightness: 0.85 },
  { ...base, adjective: "Zigzag", hue: 320, tint: "#ff9ac0", pattern: "zigzag", patternColor: "#ffffff" },
  { ...base, adjective: "Marble", hue: 0, saturate: 0.12, brightness: 1.3, tint: "#f4f2ee", tintAmount: 0.7, pattern: "veins", patternColor: "#6a6a7a", patternOpacity: 0.5 },
  { ...base, adjective: "Scaled", hue: 175, tint: "#6fe0d8", pattern: "scales", patternColor: "#063a3a", patternOpacity: 0.35, sx: 1.08, sy: 1.04 },
  { ...base, adjective: "Tartan", hue: 350, tint: "#ff6b6b", pattern: "plaid", patternColor: "#1c2a5a", patternOpacity: 0.45 },
  { ...base, adjective: "Gilded", hue: 35, saturate: 1.5, tint: "#ffc94a", tintAmount: 0.7, pattern: "diamonds", patternColor: "#fff2b0", brightness: 1.1 },
  { ...base, adjective: "Midnight", hue: 230, brightness: 0.78, tint: "#4a5aa8", pattern: "dots", patternColor: "#9ad0ff", patternOpacity: 0.55, sx: 0.92, sy: 1.08 },
  { ...base, adjective: "Wavy", hue: 190, tint: "#7ad0ff", pattern: "waves", patternColor: "#ffffff" },
  { ...base, adjective: "Heart-print", hue: 330, tint: "#ff8fb0", pattern: "hearts", patternColor: "#b8003a", patternOpacity: 0.4, sx: 1.1, sy: 0.94 },
  { ...base, adjective: "Cross-stitched", hue: 95, tint: "#b8e07a", pattern: "crosses", patternColor: "#2a4a10", patternOpacity: 0.4 },
  { ...base, adjective: "Charcoal", hue: 0, saturate: 0.1, brightness: 0.72, tint: "#5a5a66", tintAmount: 0.5, pattern: "stripes", patternColor: "#ff7a3a", patternOpacity: 0.3 },
  { ...base, adjective: "Frosted", hue: 200, saturate: 0.5, brightness: 1.35, tint: "#dff4ff", tintAmount: 0.65, pattern: "stars", patternColor: "#5aa0d8", patternOpacity: 0.45, sy: 1.06 },
  { ...base, adjective: "Tiger-striped", hue: 25, saturate: 1.6, tint: "#ff9a2a", tintAmount: 0.7, pattern: "zigzag", patternColor: "#1a1008", patternOpacity: 0.5 },
];

export interface ObjectLook {
  preset: number;
}

/** Resolve a stored look; beyond the preset list, looks cycle with a shifted hue and a qualifier. */
export function resolveLook(look: ObjectLook): LookPreset & { hueShift: number } {
  const n = LOOK_PRESETS.length;
  const round = Math.floor(look.preset / n);
  const p = LOOK_PRESETS[look.preset % n];
  const qualifiers = ["", "Pale ", "Deep ", "Bright ", "Dusky "];
  const q = qualifiers[round % qualifiers.length];
  return {
    ...p,
    adjective: round === 0 ? p.adjective : `${q}${p.adjective}${round >= qualifiers.length ? ` ${round + 1}` : ""}`,
    hueShift: round * 97,
    brightness: p.brightness * (round % qualifiers.length === 1 ? 1.2 : round % qualifiers.length === 2 ? 0.8 : 1),
  };
}

export function lookScale(look?: ObjectLook) {
  if (!look) return { sx: 1, sy: 1 };
  const r = resolveLook(look);
  return { sx: r.sx, sy: r.sy };
}
