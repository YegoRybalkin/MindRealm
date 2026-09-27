import type { SectionTemplate } from "@/environments";
import type { BackdropSpec, Section, WorldObject } from "@/lib/types";
import { createId } from "@/lib/id";
import { isHex, shade } from "@/lib/color";

export interface SectionVariant {
  /** Prefix for the name, e.g. "North Wing". */
  prefix?: string;
  /** Mirror the layout horizontally so repeated rooms feel distinct. */
  mirror?: boolean;
  /** Lighten/darken palette colors (-1..1). */
  tone?: number;
}

/**
 * Turn a template into a concrete section. Object positions are copied (snapshotted)
 * so the layout never changes after concepts are attached.
 */
export function instantiateSection(template: SectionTemplate, order: number, variant: SectionVariant = {}): Section {
  const objects: WorldObject[] = template.objects.map((o) => ({
    id: createId("obj"),
    name: o.name,
    visualType: o.visualType,
    position: { x: variant.mirror ? Math.round((100 - o.x) * 10) / 10 : o.x, y: o.y },
    size: o.size,
    flip: variant.mirror ? !o.flip : o.flip,
    z: o.z,
    conceptId: null,
  }));
  return {
    id: createId("sec"),
    name: variant.prefix ? `${variant.prefix} ${template.name}` : template.name,
    order,
    templateId: template.id,
    background: tintBackdrop(template.background, variant.tone ?? 0),
    objects,
  };
}

function tintBackdrop(bg: BackdropSpec, tone: number): BackdropSpec {
  if (!tone || !bg.options) return { ...bg, options: { ...bg.options } };
  const options: NonNullable<BackdropSpec["options"]> = {};
  for (const [k, v] of Object.entries(bg.options)) {
    options[k] = isHex(v) && k !== "light" ? shade(v, tone) : v;
  }
  return { ...bg, options };
}

export function sortSections(sections: Section[]): Section[] {
  return [...sections].sort((a, b) => a.order - b.order);
}

/** Objects in the order they should be painted (back to front). */
export function paintOrder(objects: WorldObject[]): WorldObject[] {
  return [...objects].sort((a, b) => (a.z ?? a.position.y) - (b.z ?? b.position.y));
}
