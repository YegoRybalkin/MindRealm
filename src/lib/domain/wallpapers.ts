import { findSectionTemplate, type EnvironmentTemplate } from "@/environments";
import type { WallpaperSpec } from "@/environments/types";
import { rotateHue } from "@/lib/color";
import type { BackdropSpec, Section } from "@/lib/types";

/**
 * Every section in a world gets a wall treatment no other section in that world uses,
 * so each room is recognisable at a glance.
 */

export function wallpaperOf(bg: BackdropSpec): WallpaperSpec | null {
  const o = bg.options ?? {};
  if (typeof o.wp !== "string" || !o.wp) return null;
  return { pattern: o.wp, a: String(o.wpA ?? ""), b: String(o.wpB ?? ""), c: typeof o.wpC === "string" ? o.wpC : undefined };
}

export function signature(w: WallpaperSpec): string {
  return `${w.pattern}|${w.a.toLowerCase()}|${w.b.toLowerCase()}`;
}

export function withWallpaper(bg: BackdropSpec, w: WallpaperSpec): BackdropSpec {
  return { ...bg, options: { ...bg.options, wp: w.pattern, wpA: w.a, wpB: w.b, wpC: w.c ?? w.b } };
}

/** Candidates in preference order: the section's own template, the pool, then hue-shifted pool variants. */
function* candidates(env: EnvironmentTemplate, section: Section): Generator<WallpaperSpec> {
  const own = findSectionTemplate(env.id, section.templateId);
  const ownWp = own ? wallpaperOf(own.background) : null;
  if (ownWp) yield ownWp;
  for (const w of env.wallpaperPool) yield w;
  for (let k = 1; k < 60; k++) {
    for (const w of env.wallpaperPool) {
      const deg = (k * 47) % 360;
      yield { pattern: w.pattern, a: rotateHue(w.a, deg), b: rotateHue(w.b, deg), c: w.c ? rotateHue(w.c, deg) : undefined };
    }
  }
}

/** Give `section` a wallpaper not used by any of `others`. */
export function ensureUniqueWallpaper(section: Section, others: Section[], env: EnvironmentTemplate): Section {
  const taken = others.map((s) => wallpaperOf(s.background)).filter((w): w is WallpaperSpec => !!w);
  const used = new Set(taken.map(signature));
  const usedPatterns = new Set(taken.map((w) => w.pattern));
  const current = wallpaperOf(section.background);
  if (current && !used.has(signature(current))) return section;
  // Prefer a pattern nobody in this world uses yet; fall back to a new colourway.
  let fallback: WallpaperSpec | null = null;
  for (const w of candidates(env, section)) {
    if (used.has(signature(w))) continue;
    if (!usedPatterns.has(w.pattern)) return { ...section, background: withWallpaper(section.background, w) };
    fallback ??= w;
  }
  return fallback ? { ...section, background: withWallpaper(section.background, fallback) } : section;
}

/** Resolve duplicates/missing wallpapers across a whole world (earlier sections keep theirs). */
export function assignUniqueWallpapers(sections: Section[], env: EnvironmentTemplate): Section[] {
  const out: Section[] = [];
  for (const s of [...sections].sort((a, b) => a.order - b.order)) out.push(ensureUniqueWallpaper(s, out, env));
  const byId = new Map(out.map((s) => [s.id, s]));
  return sections.map((s) => byId.get(s.id) ?? s);
}
