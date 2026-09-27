import type { TestScope, World } from "@/lib/types";
import { createId } from "@/lib/id";
import { nowIso } from "@/lib/utils";
import { isWeak } from "./mastery";
import { matchAnswer } from "./matching";
import { flattenObjects } from "./objects";
import { sortSections } from "./sections";

export interface TestTarget {
  sectionId: string;
  objectId: string;
  conceptId: string;
  /** Set when the object sits inside a container (wardrobe, shelf…). */
  containerId?: string;
}

export interface TestAnswer extends TestTarget {
  answer: string;
  correct: boolean;
  exact: boolean;
  expected: string;
}

export interface TestSession {
  id: string;
  worldId: string;
  scope: TestScope;
  sectionId?: string;
  startedAt: string;
  targets: TestTarget[];
  answers: Record<string, TestAnswer>;
}

export function buildTargets(world: World, scope: TestScope, sectionId?: string): TestTarget[] {
  const targets: TestTarget[] = [];
  for (const section of sortSections(world.sections)) {
    if (scope === "section" && section.id !== sectionId) continue;
    for (const { object: o, container } of flattenObjects(section.objects)) {
      const c = o.conceptId ? world.concepts[o.conceptId] : undefined;
      if (!c) continue;
      if (scope === "weak" && !isWeak(c)) continue;
      targets.push({ sectionId: section.id, objectId: o.id, conceptId: c.id, containerId: container?.id });
    }
  }
  return targets;
}

export function startTest(world: World, scope: TestScope, sectionId?: string): TestSession {
  return {
    id: createId("tst"),
    worldId: world.id,
    scope,
    sectionId,
    startedAt: nowIso(),
    targets: buildTargets(world, scope, sectionId),
    answers: {},
  };
}

/** Start a session over an explicit list of objects (e.g. retesting mistakes). */
export function startTestWithTargets(world: World, targets: TestTarget[]): TestSession {
  const valid = targets.filter((t) => world.concepts[t.conceptId]);
  return { id: createId("tst"), worldId: world.id, scope: "weak", startedAt: nowIso(), targets: valid, answers: {} };
}

export function gradeAnswer(session: TestSession, world: World, objectId: string, answer: string): { session: TestSession; result: TestAnswer } | null {
  const target = session.targets.find((t) => t.objectId === objectId);
  const concept = target ? world.concepts[target.conceptId] : undefined;
  if (!target || !concept) return null;
  const m = matchAnswer(answer, concept.title);
  const result: TestAnswer = { ...target, answer: answer.trim(), correct: m.correct, exact: m.exact, expected: concept.title };
  return { session: { ...session, answers: { ...session.answers, [objectId]: result } }, result };
}

export function isTarget(session: TestSession, objectId: string) {
  return session.targets.some((t) => t.objectId === objectId);
}

export function progress(session: TestSession) {
  const answered = Object.values(session.answers);
  const correct = answered.filter((a) => a.correct).length;
  return { answered: answered.length, total: session.targets.length, correct, done: answered.length >= session.targets.length && session.targets.length > 0 };
}

export interface SectionResult {
  sectionId: string;
  name: string;
  correct: number;
  total: number;
}

export function summarize(session: TestSession, world: World) {
  const answers = session.targets.map((t) => session.answers[t.objectId]).filter(Boolean) as TestAnswer[];
  const correct = answers.filter((a) => a.correct).length;
  const bySection: SectionResult[] = [];
  for (const s of sortSections(world.sections)) {
    const inSection = answers.filter((a) => a.sectionId === s.id);
    if (inSection.length) bySection.push({ sectionId: s.id, name: s.name, correct: inSection.filter((a) => a.correct).length, total: inSection.length });
  }
  return {
    correct,
    total: answers.length,
    planned: session.targets.length,
    accuracy: answers.length ? correct / answers.length : 0,
    bySection,
    mistakes: answers.filter((a) => !a.correct),
  };
}

export type TestSummary = ReturnType<typeof summarize>;
