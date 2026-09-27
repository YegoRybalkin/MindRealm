import type { Section, WorldObject } from "@/lib/types";

/**
 * Objects can contain other objects (openable containers). These helpers walk the
 * tree so every feature — tests, search, stats, placement — sees nested objects too.
 */

export interface PlacedObject {
  object: WorldObject;
  /** The container this object lives in, if any. */
  container: WorldObject | null;
}

/** Room objects first, each followed by its container contents. */
export function flattenObjects(objects: WorldObject[], container: WorldObject | null = null): PlacedObject[] {
  const out: PlacedObject[] = [];
  for (const o of objects) {
    out.push({ object: o, container });
    if (o.contents) out.push(...flattenObjects(o.contents.objects, o));
  }
  return out;
}

export function sectionObjects(section: Section): PlacedObject[] {
  return flattenObjects(section.objects);
}

export function findObjectDeep(objects: WorldObject[], id: string): PlacedObject | undefined {
  return flattenObjects(objects).find((p) => p.object.id === id);
}

export function mapObjectDeep(objects: WorldObject[], id: string, fn: (o: WorldObject) => WorldObject): WorldObject[] {
  return objects.map((o) => {
    if (o.id === id) return fn(o);
    if (o.contents && findObjectDeep(o.contents.objects, id)) {
      return { ...o, contents: { ...o.contents, objects: mapObjectDeep(o.contents.objects, id, fn) } };
    }
    return o;
  });
}

/** Number of objects (including container contents) that hold a concept. */
export function countWithConcepts(objects: WorldObject[]) {
  return flattenObjects(objects).filter((p) => p.object.conceptId).length;
}
