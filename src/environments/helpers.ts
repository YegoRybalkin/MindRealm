import type { ObjectTemplate, WallpaperSpec } from "./types";

/** Compact object-template constructor used by environment files. */
export function obj(
  key: string,
  name: string,
  visualType: string,
  x: number,
  y: number,
  size: number,
  extra: Partial<Pick<ObjectTemplate, "flip" | "z" | "interior">> = {},
): ObjectTemplate {
  return { key, name, visualType, x, y, size, ...extra };
}

/** Wallpaper options for a section backdrop (see components/scene/wallpapers.tsx). */
export function wp(pattern: string, a: string, b: string, c?: string) {
  return { wp: pattern, wpA: a, wpB: b, wpC: c ?? b };
}

export function wallpaper(pattern: string, a: string, b: string, c?: string): WallpaperSpec {
  return { pattern, a, b, c };
}
