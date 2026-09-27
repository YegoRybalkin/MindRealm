import { resolveLook } from "@/lib/looks";
import type { Section, WorldObject } from "@/lib/types";

/**
 * Ensure no two objects of the same kind look alike anywhere in a world.
 * Walks sections in order (room objects, then container contents): the first
 * object of each kind keeps the original illustration, every later one gets the
 * first look not yet used for that kind, plus a matching name ("Spotted Chest").
 * Objects that already have a unique look are left untouched.
 */
export function assignUniqueLooks(sections: Section[]): Section[] {
  const used = new Map<string, Set<number>>();
  /** Looks already used in the room being visited — varied so a room isn't all one style. */
  let roomLooks = new Set<number>();

  const visit = (o: WorldObject): WorldObject => {
    let next = o;
    const set = used.get(o.visualType) ?? new Set<number>();
    used.set(o.visualType, set);
    const key = o.look ? o.look.preset : -1;
    if (set.has(key)) {
      let p = 0;
      while (set.has(p) || roomLooks.has(p)) p++;
      set.add(p);
      roomLooks.add(p);
      const oldAdj = o.look ? resolveLook(o.look).adjective + " " : "";
      const baseName = oldAdj && o.name.startsWith(oldAdj) ? o.name.slice(oldAdj.length) : o.name;
      next = { ...o, look: { preset: p }, name: `${resolveLook({ preset: p }).adjective} ${baseName}` };
    } else {
      set.add(key);
      if (o.look) roomLooks.add(o.look.preset);
    }
    if (next.contents) {
      const inner = next.contents.objects.map(visit);
      if (inner.some((x, i) => x !== next.contents!.objects[i])) next = { ...next, contents: { ...next.contents, objects: inner } };
    }
    return next;
  };

  const ordered = [...sections].sort((a, b) => a.order - b.order);
  const updated = new Map<string, Section>();
  for (const s of ordered) {
    roomLooks = new Set<number>();
    const objects = s.objects.map(visit);
    updated.set(s.id, objects.some((x, i) => x !== s.objects[i]) ? { ...s, objects } : s);
  }
  return sections.map((s) => updated.get(s.id) ?? s);
}
