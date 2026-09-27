import { findSectionTemplate, getEnvironment } from "@/environments";
import type { Section, World } from "@/lib/types";
import { instantiateInterior } from "./sections";
import { assignUniqueWallpapers } from "./wallpapers";
import { assignUniqueLooks } from "./looks";

export const CURRENT_SCHEMA = 3;

/**
 * Upgrade worlds saved by older versions without moving anything:
 *  v2 — rooms gain unique wallpapers; containers (wardrobes, shelves…) gain openable contents.
 *  v3 — repeated objects get distinct looks so no two objects of a kind look alike.
 */
export function migrateWorld(world: World): World {
  if ((world.schemaVersion ?? 1) >= CURRENT_SCHEMA) return world;
  const env = getEnvironment(world.environmentType);
  const sections: Section[] = world.sections.map((sec) => {
    const tpl = findSectionTemplate(env.id, sec.templateId);
    if (!tpl) return sec;
    const objects = sec.objects.map((o, i) => {
      const t = tpl.objects[i];
      if (!t || t.visualType !== o.visualType) return o;
      const next = { ...o, templateKey: o.templateKey ?? t.key };
      if (t.interior && !o.contents) {
        const contents = instantiateInterior(t.interior);
        if (contents) next.contents = contents;
      }
      return next;
    });
    return { ...sec, objects };
  });
  return { ...world, sections: assignUniqueLooks(assignUniqueWallpapers(sections, env)), schemaVersion: CURRENT_SCHEMA };
}
