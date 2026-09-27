/**
 * Contracts for planned AI features. Nothing here is implemented or called yet — the MVP
 * works fully offline. These interfaces document where AI plugs into the existing domain:
 *
 *  - NotesToConcepts: extract + summarise concepts from pasted/uploaded notes. Its output
 *    feeds `placeConcepts()` (lib/domain/placement.ts), which already assigns concepts to
 *    objects and generates sections as needed.
 *  - ConceptObjectMatcher: choose the most memorable object for each concept instead of
 *    sequential placement.
 *  - SectionGenerator (lib/generation/types.ts): an AI implementation can return new
 *    sections/scenes; swap it in lib/generation/index.ts.
 *  - MnemonicStoryWriter: produce a short vivid story linking a concept to its object.
 *  - QuizWriter: produce alternative question formats for Test Mode.
 */
import type { ConceptInput } from "@/lib/domain/world";
import type { Concept, World, WorldObject } from "@/lib/types";

export interface NotesToConcepts {
  extract(notes: string, opts?: { subject?: string; maxConcepts?: number }): Promise<ConceptInput[]>;
}

export interface ConceptObjectMatcher {
  match(world: World, concepts: ConceptInput[]): Promise<Array<{ concept: ConceptInput; sectionId: string; objectId: string }>>;
}

export interface MnemonicStoryWriter {
  write(concept: Concept, object: WorldObject, context: { sectionName: string; environment: string }): Promise<string>;
}

export interface QuizWriter {
  questions(concept: Concept): Promise<Array<{ prompt: string; answer: string }>>;
}
