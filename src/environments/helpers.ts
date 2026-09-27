import type { ObjectTemplate } from "./types";

/** Compact object-template constructor used by environment files. */
export function obj(
  key: string,
  name: string,
  visualType: string,
  x: number,
  y: number,
  size: number,
  extra: Partial<Pick<ObjectTemplate, "flip" | "z">> = {},
): ObjectTemplate {
  return { key, name, visualType, x, y, size, ...extra };
}
