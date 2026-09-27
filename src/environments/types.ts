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
}
