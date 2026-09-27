/**
 * Central product vocabulary. Rename concepts here and the whole UI follows.
 */
export const TERMS = {
  world: "Memory World",
  worlds: "Memory Worlds",
  section: "Section",
  sections: "Sections",
  object: "Object",
  objects: "Objects",
  concept: "Concept",
  concepts: "Concepts",
  learnMode: "Learn",
  testMode: "Test",
  learnModeLong: "Learn Mode",
  testModeLong: "Test Mode",
  worldMap: "World Map",
  generateSection: "Generate Section",
  testMemory: "Test Memory",
} as const;

export function plural(count: number, singular: string, pluralForm?: string) {
  return `${count} ${count === 1 ? singular : pluralForm ?? `${singular}s`}`;
}
