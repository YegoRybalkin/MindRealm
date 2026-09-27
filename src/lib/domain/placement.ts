import { getEnvironment } from "@/environments";
import { sectionGenerator } from "@/lib/generation";
import type { World } from "@/lib/types";
import { sortSections } from "./sections";
import { addSection, upsertConcept, type ConceptInput } from "./world";

/**
 * Parse pasted notes into concepts. Supports one concept per line:
 *   Term: definition   |   Term - definition   |   Term — definition   |   Term<TAB>definition
 */
export function parseConceptList(text: string): ConceptInput[] {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim().replace(/^[-*•\d.)\s]+(?=\S)/, ""))
    .filter(Boolean)
    .map((line) => {
      const m = line.match(/^(.{1,120}?)\s*(?:\t|:|\s[-–—]\s)\s*(.+)$/);
      return m ? { title: m[1].trim(), description: m[2].trim() } : { title: line, description: "" };
    })
    .filter((c) => c.title.length > 0);
}

/**
 * Attach concepts to free objects in section order, generating new sections when the
 * world runs out of space. This is the same entry point a future "Generate Memory Palace
 * from Notes" AI pipeline would call after extracting concepts.
 */
export async function placeConcepts(world: World, concepts: ConceptInput[]): Promise<{ world: World; placed: number; sectionsAdded: number }> {
  let next = world;
  let placed = 0;
  let sectionsAdded = 0;
  const queue = [...concepts];
  const env = getEnvironment(world.environmentType);
  let guard = 0;
  while (queue.length && guard++ < 500) {
    const free = sortSections(next.sections).flatMap((s) => s.objects.filter((o) => !o.conceptId).map((o) => ({ s, o })));
    if (!free.length) {
      const section = await sectionGenerator.generate({ world: next, environment: env });
      next = addSection(next, section);
      sectionsAdded++;
      continue;
    }
    for (const { s, o } of free) {
      const c = queue.shift();
      if (!c) break;
      next = upsertConcept(next, s.id, o.id, c).world;
      placed++;
    }
  }
  return { world: next, placed, sectionsAdded };
}
