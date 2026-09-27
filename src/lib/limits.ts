/** Maximum number of sections (rooms) in one memory world. */
export const MAX_SECTIONS = 10;

export function canAddSection(sectionCount: number) {
  return sectionCount < MAX_SECTIONS;
}
