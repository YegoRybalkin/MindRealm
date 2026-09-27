import type { BackdropSpec } from "@/lib/types";

export interface ObjectTemplate {
  /** Stable key within the section template. */
  key: string;
  name: string;
  visualType: string;
  x: number;
  y: number;
  size: number;
  flip?: boolean;
  z?: number;
  /** Key into INTERIORS (environments/interiors.ts) — makes the object openable. */
  interior?: string;
}

export interface InteriorTemplate {
  title: string;
  background: BackdropSpec;
  objects: ObjectTemplate[];
}

export interface SectionTemplate {
  id: string;
  name: string;
  /** Short atmospheric line shown on the world map / when generated. */
  blurb: string;
  background: BackdropSpec;
  objects: ObjectTemplate[];
}

export interface EnvironmentTheme {
  /** Color used behind the letterboxed scene. */
  ambient: string;
  /** Accent used for hover glows and markers. */
  glow: string;
  /** Card gradient for previews. */
  cardFrom: string;
  cardTo: string;
}

export interface EnvironmentTemplate {
  id: string;
  name: string;
  tagline: string;
  description: string;
  theme: EnvironmentTheme;
  /** Number of sections created when a new world is started. */
  startingSections: number;
  /** Ordered pool of sections. Generators walk through it, then create variants. */
  sections: SectionTemplate[];
  /** Name prefixes used when the pool is exhausted and variants are created. */
  variantPrefixes: string[];
  /**
   * Extra wall treatments for generated sections. Every section in a world gets a
   * wallpaper no other section in that world uses (see lib/domain/wallpapers.ts).
   */
  wallpaperPool: WallpaperSpec[];
}

/** A wall treatment: a pattern key plus up to three colours. */
export interface WallpaperSpec {
  pattern: string;
  a: string;
  b: string;
  c?: string;
}
