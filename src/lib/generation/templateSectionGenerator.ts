import type { SectionGenerator, SectionGenerationContext } from "./types";
import { instantiateSection } from "@/lib/domain/sections";
import { ensureUniqueWallpaper } from "@/lib/domain/wallpapers";
import type { Section } from "@/lib/types";

const ROMAN = ["", " II", " III", " IV", " V", " VI", " VII", " VIII", " IX", " X"];

/**
 * Walks the environment's section pool starting after the most recently added template,
 * picking templates not yet present in the world. Once every template is used it creates
 * mirrored, re-toned variants ("North Wing Library") — so worlds can grow indefinitely.
 */
export class TemplateSectionGenerator implements SectionGenerator {
  readonly id = "template";

  async generate(ctx: SectionGenerationContext): Promise<Section> {
    return ensureUniqueWallpaper(this.build(ctx), ctx.world.sections, ctx.environment);
  }

  private build({ world, environment }: SectionGenerationContext): Section {
    const pool = environment.sections;
    const order = world.sections.reduce((m, s) => Math.max(m, s.order), -1) + 1;
    const used = new Set(world.sections.map((s) => s.templateId));
    const last = [...world.sections].sort((a, b) => b.order - a.order)[0];
    const start = last ? Math.max(0, pool.findIndex((t) => t.id === last.templateId)) + 1 : 0;

    for (let i = 0; i < pool.length; i++) {
      const t = pool[(start + i) % pool.length];
      if (!used.has(t.id)) return instantiateSection(t, order);
    }

    // Every template is used — build a variant.
    const cycle = world.sections.length - pool.length;
    const template = pool[cycle % pool.length] ?? pool[0];
    const prefixes = environment.variantPrefixes.length ? environment.variantPrefixes : ["Another"];
    const round = Math.floor(cycle / pool.length);
    const prefix = prefixes[round % prefixes.length];
    const names = new Set(world.sections.map((s) => s.name));
    const section = instantiateSection(template, order, {
      prefix,
      mirror: round % 2 === 0,
      tone: round % 3 === 0 ? -0.12 : round % 3 === 1 ? 0.1 : -0.05,
    });
    let n = 0;
    const base = section.name;
    while (names.has(section.name) && n < ROMAN.length - 1) {
      n++;
      section.name = `${base}${ROMAN[n]}`;
    }
    if (names.has(section.name)) section.name = `${base} ${world.sections.length + 1}`;
    return section;
  }
}
