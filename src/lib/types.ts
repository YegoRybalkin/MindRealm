/**
 * Core data model: World → Section → Object → Concept.
 *
 * Sections store a *snapshot* of their objects (position, size, art) at creation time.
 * This guarantees concepts stay attached to the same object in the same place even if
 * environment templates are edited later.
 */

export type EnvironmentType = "castle" | "house" | "garden" | "spaceStation" | (string & {});

export interface Point {
  /** Horizontal center of the object, as a percentage of scene width (0–100). */
  x: number;
  /** Bottom edge of the object (where it "stands"), as a percentage of scene height (0–100). */
  y: number;
}

export interface BackdropSpec {
  /** Key of a backdrop renderer registered in the scene system. */
  kind: string;
  /** Free-form, renderer-specific options (palette, window style, etc.). */
  options?: Record<string, string | number | boolean>;
}

export interface WorldObject {
  id: string;
  name: string;
  /** Key of the illustration used to draw this object. */
  visualType: string;
  position: Point;
  /** Width as a percentage of scene width. */
  size: number;
  /** Mirror the illustration horizontally. */
  flip?: boolean;
  /** Explicit stacking order; objects are otherwise layered by their y position. */
  z?: number;
  conceptId: string | null;
  /** Key of the template object this was created from (used for upgrades). */
  templateKey?: string;
  /**
   * Distinct appearance for repeated object kinds (see lib/looks.ts). Absent means
   * the original illustration.
   */
  look?: { preset: number };
  /**
   * Openable containers (wardrobes, shelves, chests…) hold a close-up scene with
   * their own objects. The container itself can still carry a concept.
   */
  contents?: ObjectInterior;
}

export interface ObjectInterior {
  /** Title for the close-up view, e.g. "Inside the Wardrobe". */
  title: string;
  background: BackdropSpec;
  objects: WorldObject[];
}

export interface Section {
  id: string;
  name: string;
  order: number;
  /** Template the section was created from (useful for generators). */
  templateId: string;
  background: BackdropSpec;
  objects: WorldObject[];
}

export interface Concept {
  id: string;
  title: string;
  description: string;
  example?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  correctAttempts: number;
  totalAttempts: number;
  lastReviewed: string | null;
  /** 0–1. See lib/domain/mastery.ts. */
  mastery: number;
  /**
   * Reserved for spaced-repetition scheduling (e.g. SM-2 / FSRS state).
   * Not used by the MVP algorithm.
   */
  review?: {
    dueAt?: string;
    interval?: number;
    ease?: number;
  };
}

export interface World {
  id: string;
  name: string;
  environmentType: EnvironmentType;
  subject?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  lastStudiedAt: string | null;
  isDemo?: boolean;
  /** Data format version; older worlds are upgraded on load (lib/domain/migrate.ts). */
  schemaVersion?: number;
  sections: Section[];
  concepts: Record<string, Concept>;
}

export interface TestRecord {
  id: string;
  worldId: string;
  scope: TestScope;
  startedAt: string;
  finishedAt: string;
  correct: number;
  total: number;
}

export interface Profile {
  /** ISO dates (YYYY-MM-DD) on which the learner studied. */
  activityDays: string[];
  testHistory: TestRecord[];
  demoSeeded: boolean;
}

export type TestScope = "world" | "section" | "weak";
