import type { Profile, TestRecord, World } from "@/lib/types";
import { dayKey } from "@/lib/utils";
import { masteryLevel } from "./mastery";

export const EMPTY_PROFILE: Profile = { activityDays: [], testHistory: [], demoSeeded: false };

export function recordActivity(profile: Profile, date = new Date()): Profile {
  const key = dayKey(date);
  if (profile.activityDays.includes(key)) return profile;
  return { ...profile, activityDays: [...profile.activityDays, key].slice(-400) };
}

export function addTestRecord(profile: Profile, record: TestRecord): Profile {
  return { ...profile, testHistory: [...profile.testHistory, record].slice(-200) };
}

/** Consecutive days of study ending today (or yesterday, so the streak isn't lost mid-day). */
export function studyStreak(profile: Profile, today = new Date()): number {
  const days = new Set(profile.activityDays);
  const d = new Date(today);
  if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1);
  let streak = 0;
  while (days.has(dayKey(d))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

export function dashboardStats(worlds: World[], profile: Profile) {
  const concepts = worlds.flatMap((w) => Object.values(w.concepts));
  const total = concepts.reduce((s, c) => s + c.totalAttempts, 0);
  const correct = concepts.reduce((s, c) => s + c.correctAttempts, 0);
  const learned = concepts.filter((c) => {
    const l = masteryLevel(c);
    return l === "familiar" || l === "mastered";
  }).length;
  return {
    conceptsLearned: learned,
    conceptsTotal: concepts.length,
    recallAccuracy: total ? correct / total : null,
    worldCount: worlds.length,
    streak: studyStreak(profile),
  };
}
