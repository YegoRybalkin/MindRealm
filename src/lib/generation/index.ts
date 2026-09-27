import { TemplateSectionGenerator } from "./templateSectionGenerator";
import type { SectionGenerator } from "./types";

/** The active generator. Swap for an AI-backed implementation later. */
export const sectionGenerator: SectionGenerator = new TemplateSectionGenerator();

export type { SectionGenerator, SectionGenerationContext } from "./types";
