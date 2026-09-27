import { getEnvironment } from "@/environments";
import { createId } from "@/lib/id";
import type { Concept, Section, World, WorldObject } from "@/lib/types";
import { nowIso } from "@/lib/utils";
import { applyReviewResult, averageMastery } from "./mastery";
import { instantiateSection, sortSections } from "./sections";

export interface NewWorldInput {
  name: string;
  environmentType: string;
  subject?: string;
  description?: string;
}

export interface ConceptInput {
  title: string;
  description: string;
  example?: string;
  notes?: string;
}

export function createWorld(input: NewWorldInput): World {
  const env = getEnvironment(input.environmentType);
  const at = nowIso();
  const count = Math.min(env.startingSections, env.sections.length);
  const sections = env.sections.slice(0, count).map((t, i) => instantiateSection(t, i));
  return {
    id: createId("wld"),
    name: input.name.trim(),
    environmentType: env.id,
    subject: input.subject?.trim() || undefined,
    description: input.description?.trim() || undefined,
    createdAt: at,
    updatedAt: at,
    lastStudiedAt: null,
    sections,
    concepts: {},
  };
}

function touch(world: World): World {
  return { ...world, updatedAt: nowIso() };
}

function mapObject(world: World, sectionId: string, objectId: string, fn: (o: WorldObject) => WorldObject): World {
  return {
    ...world,
    sections: world.sections.map((s) =>
      s.id !== sectionId ? s : { ...s, objects: s.objects.map((o) => (o.id === objectId ? fn(o) : o)) },
    ),
  };
}

export function findObject(world: World, sectionId: string, objectId: string) {
  const section = world.sections.find((s) => s.id === sectionId);
  const object = section?.objects.find((o) => o.id === objectId);
  return { section, object };
}

/** Create or update the concept attached to an object. */
export function upsertConcept(world: World, sectionId: string, objectId: string, input: ConceptInput): { world: World; concept: Concept } {
  const { object } = findObject(world, sectionId, objectId);
  if (!object) throw new Error("Object not found");
  const at = nowIso();
  const existing = object.conceptId ? world.concepts[object.conceptId] : undefined;
  const concept: Concept = existing
    ? {
        ...existing,
        title: input.title.trim(),
        description: input.description.trim(),
        example: input.example?.trim() || undefined,
        notes: input.notes?.trim() || undefined,
        updatedAt: at,
      }
    : {
        id: createId("cpt"),
        title: input.title.trim(),
        description: input.description.trim(),
        example: input.example?.trim() || undefined,
        notes: input.notes?.trim() || undefined,
        createdAt: at,
        updatedAt: at,
        correctAttempts: 0,
        totalAttempts: 0,
        lastReviewed: null,
        mastery: 0,
      };
  let next = mapObject(world, sectionId, objectId, (o) => ({ ...o, conceptId: concept.id }));
  next = { ...next, concepts: { ...next.concepts, [concept.id]: concept } };
  return { world: touch(next), concept };
}

export function removeConcept(world: World, sectionId: string, objectId: string): World {
  const { object } = findObject(world, sectionId, objectId);
  if (!object?.conceptId) return world;
  const { [object.conceptId]: _removed, ...concepts } = world.concepts;
  void _removed;
  return touch({ ...mapObject(world, sectionId, objectId, (o) => ({ ...o, conceptId: null })), concepts });
}

export function addSection(world: World, section: Section): World {
  return touch({ ...world, sections: [...world.sections, section] });
}

export function removeSection(world: World, sectionId: string): World {
  const section = world.sections.find((s) => s.id === sectionId);
  if (!section) return world;
  const concepts = { ...world.concepts };
  for (const o of section.objects) if (o.conceptId) delete concepts[o.conceptId];
  const sections = sortSections(world.sections.filter((s) => s.id !== sectionId)).map((s, i) => ({ ...s, order: i }));
  return touch({ ...world, sections, concepts });
}

export function renameSection(world: World, sectionId: string, name: string): World {
  return touch({ ...world, sections: world.sections.map((s) => (s.id === sectionId ? { ...s, name: name.trim() || s.name } : s)) });
}

export function updateWorldMeta(world: World, patch: Partial<Pick<World, "name" | "subject" | "description">>): World {
  return touch({ ...world, ...patch });
}

export function recordReview(world: World, conceptId: string, correct: boolean): World {
  const c = world.concepts[conceptId];
  if (!c) return world;
  const at = nowIso();
  return { ...world, lastStudiedAt: at, updatedAt: at, concepts: { ...world.concepts, [conceptId]: applyReviewResult(c, correct, at) } };
}

export function markStudied(world: World): World {
  return { ...world, lastStudiedAt: nowIso() };
}

/* ---------- derived stats ---------- */

export function sectionConcepts(world: World, section: Section): Concept[] {
  return section.objects.flatMap((o) => (o.conceptId && world.concepts[o.conceptId] ? [world.concepts[o.conceptId]] : []));
}

export function worldStats(world: World) {
  const concepts = Object.values(world.concepts);
  const totalAttempts = concepts.reduce((s, c) => s + c.totalAttempts, 0);
  const correctAttempts = concepts.reduce((s, c) => s + c.correctAttempts, 0);
  const objectCount = world.sections.reduce((s, sec) => s + sec.objects.length, 0);
  return {
    conceptCount: concepts.length,
    sectionCount: world.sections.length,
    objectCount,
    freeObjects: objectCount - concepts.length,
    mastery: averageMastery(concepts),
    accuracy: totalAttempts ? correctAttempts / totalAttempts : null,
    totalAttempts,
  };
}

export function sectionStats(world: World, section: Section) {
  const concepts = sectionConcepts(world, section);
  return { conceptCount: concepts.length, objectCount: section.objects.length, mastery: averageMastery(concepts) };
}
