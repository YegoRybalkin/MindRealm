/**
 * Answer matching for recall tests: case/whitespace/punctuation-insensitive,
 * ignores leading articles and tolerates small spelling mistakes.
 */

export function normalizeAnswer(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^(the|a|an) /, "");
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[b.length];
}

function allowedTypos(len: number): number {
  if (len <= 3) return 0;
  if (len <= 6) return 1;
  if (len <= 12) return 2;
  return Math.floor(len * 0.18);
}

export type MatchResult = { correct: boolean; exact: boolean };

export function matchAnswer(answer: string, expected: string): MatchResult {
  const a = normalizeAnswer(answer);
  const e = normalizeAnswer(expected);
  if (!a) return { correct: false, exact: false };
  if (a === e) return { correct: true, exact: true };
  // Accept answers that drop a parenthetical, e.g. "Norms" for "Norms (social)".
  const eCore = normalizeAnswer(expected.replace(/\([^)]*\)/g, ""));
  if (eCore && a === eCore) return { correct: true, exact: true };
  const dist = Math.min(levenshtein(a, e), eCore ? levenshtein(a, eCore) : Infinity);
  const target = eCore || e;
  if (dist <= allowedTypos(target.length)) return { correct: true, exact: false };
  // Compare without spaces ("socialization" vs "social ization").
  if (a.replace(/ /g, "") === e.replace(/ /g, "")) return { correct: true, exact: false };
  return { correct: false, exact: false };
}
