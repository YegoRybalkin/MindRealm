import { findSectionTemplate } from "@/environments";
import { instantiateSection } from "@/lib/domain/sections";
import { computeMastery } from "@/lib/domain/mastery";
import { createId } from "@/lib/id";
import type { Concept, Section, World } from "@/lib/types";

type DemoConcept = { object: string; title: string; description: string; example?: string; correct: number; total: number };

const GREAT_HALL: DemoConcept[] = [
  {
    object: "fireplace",
    title: "Structural Functionalism",
    description: "Views society as a complex system whose parts work together to promote stability and social order.",
    example: "Schools transmit skills and values that keep the wider economy and society running smoothly.",
    correct: 3,
    total: 4,
  },
  {
    object: "throne",
    title: "Conflict Theory",
    description: "Sees society as an arena of inequality in which groups compete for power and scarce resources.",
    example: "Landlords and tenants have opposing interests over rent levels and housing conditions.",
    correct: 2,
    total: 2,
  },
  {
    object: "painting",
    title: "Symbolic Interactionism",
    description: "Focuses on how people create and interpret shared meanings through everyday interaction and symbols.",
    example: "A wedding ring carries meaning only because people agree on what it represents.",
    correct: 1,
    total: 3,
  },
  {
    object: "shield",
    title: "Sociological Imagination",
    description: "The ability to connect individual experiences with broader social and historical forces.",
    example: "Unemployment can be understood not only as an individual's problem but as part of broader economic conditions.",
    correct: 3,
    total: 3,
  },
];

const LIBRARY: DemoConcept[] = [
  {
    object: "globe",
    title: "Cultural Relativism",
    description: "Judging a culture's beliefs and practices by its own standards rather than those of another culture.",
    example: "Understanding arranged marriage within the values of the society where it is practised.",
    correct: 1,
    total: 2,
  },
  {
    object: "bookshelf",
    title: "Socialization",
    description: "The lifelong process through which people learn the norms, values and roles of their society.",
    example: "Children learn gender expectations from family, school, peers and media.",
    correct: 2,
    total: 3,
  },
  {
    object: "clock",
    title: "Social Change",
    description: "The transformation over time of culture, institutions, behaviour and social structures.",
    example: "The internet reshaped how people work, date and form communities.",
    correct: 0,
    total: 1,
  },
  {
    object: "statue",
    title: "Norms",
    description: "Shared rules and expectations that guide behaviour within a group or society.",
    example: "Standing in line at a shop, or not talking loudly in a library.",
    correct: 0,
    total: 0,
  },
];

function build(templateId: string, order: number, items: DemoConcept[], concepts: Record<string, Concept>, reviewedAt: string): Section {
  const template = findSectionTemplate("castle", templateId);
  if (!template) throw new Error(`Missing template ${templateId}`);
  const section = instantiateSection(template, order);
  items.forEach((item) => {
    const tpl = template.objects.find((o) => o.key === item.object);
    const idx = tpl ? template.objects.indexOf(tpl) : -1;
    const object = section.objects[idx];
    if (!object) return;
    const id = createId("cpt");
    concepts[id] = {
      id,
      title: item.title,
      description: item.description,
      example: item.example,
      createdAt: reviewedAt,
      updatedAt: reviewedAt,
      correctAttempts: item.correct,
      totalAttempts: item.total,
      lastReviewed: item.total ? reviewedAt : null,
      mastery: computeMastery(item.correct, item.total),
    };
    object.conceptId = id;
  });
  return section;
}

export function createDemoWorld(): World {
  const created = new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString();
  const reviewed = new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString();
  const concepts: Record<string, Concept> = {};
  const sections = [build("castle-great-hall", 0, GREAT_HALL, concepts, reviewed), build("castle-library", 1, LIBRARY, concepts, reviewed)];
  return {
    id: createId("wld"),
    name: "Sociology Foundations",
    environmentType: "castle",
    subject: "SOC 101",
    description: "Core theories and ideas from introductory sociology. An example world — feel free to explore, edit or delete it.",
    createdAt: created,
    updatedAt: reviewed,
    lastStudiedAt: reviewed,
    isDemo: true,
    sections,
    concepts,
  };
}
