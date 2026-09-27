import type { ObjectTemplate, SectionTemplate } from "@/environments";
import { getInterior } from "@/environments/interiors";
import type { BackdropSpec, ObjectInterior, Section, WorldObject } from "@/lib/types";
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
  const objects = template.objects.map((o) => instantiateObject(o, !!variant.mirror));
  return {
    id: createId("sec"),
    name: variant.prefix ? `${variant.prefix} ${template.name}` : template.name,
    order,
    templateId: template.id,
    background: tintBackdrop(template.background, variant.tone ?? 0),
    objects,
  };
}

export function instantiateObject(o: ObjectTemplate, mirror = false): WorldObject {
  const object: WorldObject = {
    id: createId("obj"),
    name: o.name,
    visualType: o.visualType,
    position: { x: mirror ? Math.round((100 - o.x) * 10) / 10 : o.x, y: o.y },
    size: o.size,
    flip: mirror ? !o.flip : o.flip,
    z: o.z,
    conceptId: null,
    templateKey: o.key,
  };
  if (o.interior) {
    const contents = instantiateInterior(o.interior);
    if (contents) object.contents = contents;
  }
  return object;
}

/** Build the close-up contents of a container from its interior template. */
export function instantiateInterior(key: string): ObjectInterior | undefined {
  const t = getInterior(key);
  if (!t) return undefined;
  return {
    title: t.title,
    background: { ...t.background, options: { ...t.background.options } },
    objects: t.objects.map((o) => instantiateObject(o)),
  };
}

function tintBackdrop(bg: BackdropSpec, tone: number): BackdropSpec {
  if (!tone || !bg.options) return { ...bg, options: { ...bg.options } };
  const options: NonNullable<BackdropSpec["options"]> = {};
  for (const [k, v] of Object.entries(bg.options)) {
    // Wallpaper colours are left alone: uniqueness is handled in lib/domain/wallpapers.ts.
    options[k] = isHex(v) && k !== "light" && !k.startsWith("wp") ? shade(v, tone) : v;
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
