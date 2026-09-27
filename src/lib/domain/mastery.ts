import type { Concept } from "@/lib/types";

/**
 * MVP mastery model: mastery = correct / total (0 when never tested).
 *
 * Everything that reads or writes mastery goes through this module so a spaced-repetition
 * scheduler (SM-2, FSRS, …) can later replace `applyReviewResult` without UI changes.
 */

export type MasteryLevel = "new" | "learning" | "familiar" | "mastered";

export const MASTERY_LABELS: Record<MasteryLevel, string> = {
  new: "New",
  learning: "Learning",
  familiar: "Familiar",
  mastered: "Mastered",
};

export function computeMastery(correct: number, total: number): number {
  return total > 0 ? correct / total : 0;
}

export function masteryLevel(c: Pick<Concept, "totalAttempts" | "mastery">): MasteryLevel {
  if (c.totalAttempts === 0) return "new";
  if (c.mastery >= 0.8 && c.totalAttempts >= 2) return "mastered";
  if (c.mastery >= 0.5) return "familiar";
  return "learning";
}

export function applyReviewResult(concept: Concept, correct: boolean, at: string): Concept {
  const totalAttempts = concept.totalAttempts + 1;
  const correctAttempts = concept.correctAttempts + (correct ? 1 : 0);
  return {
    ...concept,
    totalAttempts,
    correctAttempts,
    lastReviewed: at,
    mastery: computeMastery(correctAttempts, totalAttempts),
  };
}

/** A concept is "weak" when it has been tested and is not yet familiar. */
export function isWeak(c: Concept): boolean {
  return c.totalAttempts > 0 && masteryLevel(c) === "learning";
}

/** Average mastery across concepts (untested concepts count as 0). */
export function averageMastery(concepts: Concept[]): number {
  if (concepts.length === 0) return 0;
  return concepts.reduce((s, c) => s + c.mastery, 0) / concepts.length;
}
