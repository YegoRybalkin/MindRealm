import { findSectionTemplate, getEnvironment } from "@/environments";
import type { Section, World } from "@/lib/types";
import { instantiateInterior, instantiateObject } from "./sections";
import { assignUniqueWallpapers } from "./wallpapers";
import { assignUniqueLooks } from "./looks";

export const CURRENT_SCHEMA = 5;

/**
 * Upgrade worlds saved by older versions without moving anything:
 *  v2 — rooms gain unique wallpapers; containers (wardrobes, shelves…) gain openable contents.
 *  v3 — repeated objects get distinct looks so no two objects of a kind look alike.
 *  v4 — rooms gain the objects and containers added to their templates since they were created.
 *  v5 — objects whose template illustration changed (for variety) adopt the new art — but only
 *       when no concept is attached, so nothing that has already been memorised changes.
 */
export function migrateWorld(world: World): World {
  if ((world.schemaVersion ?? 1) >= CURRENT_SCHEMA) return world;
  const env = getEnvironment(world.environmentType);
  const sections: Section[] = world.sections.map((sec) => {
    const tpl = findSectionTemplate(env.id, sec.templateId);
    if (!tpl) return sec;
    let mirrored = false;
    const objects = sec.objects.map((o, i) => {
      // Worlds from v1 have no template keys; their objects follow template order.
      const byIndex = tpl.objects[i];
      const samePlace = byIndex && (Math.abs(o.position.x - byIndex.x) < 0.2 || Math.abs(o.position.x - (100 - byIndex.x)) < 0.2) && Math.abs(o.position.y - byIndex.y) < 0.2;
      const t = o.templateKey ? tpl.objects.find((x) => x.key === o.templateKey) : byIndex && (byIndex.visualType === o.visualType || samePlace) ? byIndex : undefined;
      if (!t) return o;
      if (Math.abs(o.position.x - t.x) > 0.2 && Math.abs(o.position.x - (100 - t.x)) < 0.2) mirrored = true;
      let next = { ...o, templateKey: t.key };
      if (t.visualType !== o.visualType && !o.conceptId) {
        // Refresh art, name and size; drop the old look so a fresh unique one is assigned.
        const { look: _look, ...rest } = next;
        void _look;
        next = { ...rest, visualType: t.visualType, name: t.name, size: t.size, position: { ...o.position, y: t.y } };
      }
      if (t.interior && !o.contents) {
        const contents = instantiateInterior(t.interior);
        if (contents) next.contents = contents;
      }
      return next;
    });
    const have = new Set(objects.map((o) => o.templateKey));
    const added = tpl.objects.filter((t) => !have.has(t.key)).map((t) => instantiateObject(t, mirrored));
    return { ...sec, objects: [...objects, ...added] };
  });
  return { ...world, sections: assignUniqueLooks(assignUniqueWallpapers(sections, env)), schemaVersion: CURRENT_SCHEMA };
}
