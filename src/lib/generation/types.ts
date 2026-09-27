import type { EnvironmentTemplate } from "@/environments";
import type { Section, World } from "@/lib/types";

export interface SectionGenerationContext {
  world: World;
  environment: EnvironmentTemplate;
  /** Optional hint, e.g. a topic or a desired room name (useful for AI generators). */
  hint?: string;
}

/**
 * Produces the next section for a world. The MVP uses a template-based implementation;
 * an AI-backed generator (scene + objects from a model) can implement the same interface.
 */
export interface SectionGenerator {
  readonly id: string;
  generate(ctx: SectionGenerationContext): Promise<Section>;
}
