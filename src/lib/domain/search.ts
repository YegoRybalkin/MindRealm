import { getEnvironment } from "@/environments";
import type { Concept, Section, World, WorldObject } from "@/lib/types";
import { normalizeAnswer } from "./matching";

export interface SearchHit {
  world: World;
  section: Section;
  object: WorldObject;
  concept: Concept;
  environmentName: string;
  score: number;
}

/** Global concept search across every world. */
export function searchConcepts(worlds: World[], query: string, limit = 30): SearchHit[] {
  const q = normalizeAnswer(query);
  if (!q) return [];
  const terms = q.split(" ");
  const hits: SearchHit[] = [];
  for (const world of worlds) {
    const env = getEnvironment(world.environmentType);
    for (const section of world.sections) {
      for (const object of section.objects) {
        const concept = object.conceptId ? world.concepts[object.conceptId] : undefined;
        if (!concept) continue;
        const title = normalizeAnswer(concept.title);
        const body = normalizeAnswer(`${concept.description} ${concept.example ?? ""} ${concept.notes ?? ""}`);
        const where = normalizeAnswer(`${object.name} ${section.name} ${world.name} ${world.subject ?? ""}`);
        let score = 0;
        if (title === q) score += 100;
        else if (title.startsWith(q)) score += 60;
        else if (title.includes(q)) score += 40;
        for (const t of terms) {
          if (title.includes(t)) score += 10;
          else if (where.includes(t)) score += 5;
          else if (body.includes(t)) score += 3;
          else {
            score = 0;
            break;
          }
        }
        if (score > 0) hits.push({ world, section, object, concept, environmentName: env.name, score });
      }
    }
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}
