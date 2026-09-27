import type { EnvironmentTemplate, SectionTemplate } from "./types";
import { castle } from "./castle";
import { house } from "./house";
import { garden } from "./garden";
import { spaceStation } from "./spaceStation";

/**
 * Environment registry. To add an environment, create a template file and list it here.
 */
export const ENVIRONMENTS: EnvironmentTemplate[] = [castle, house, garden, spaceStation];

const byId = new Map(ENVIRONMENTS.map((e) => [e.id, e]));

export function getEnvironment(id: string): EnvironmentTemplate {
  return byId.get(id) ?? castle;
}

export function findSectionTemplate(envId: string, templateId: string): SectionTemplate | undefined {
  return getEnvironment(envId).sections.find((s) => s.id === templateId);
}

export type { EnvironmentTemplate, SectionTemplate };
export type { ObjectTemplate, EnvironmentTheme } from "./types";
