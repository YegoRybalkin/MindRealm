import { cn } from "@/lib/utils";
import { MASTERY_LABELS, masteryLevel, type MasteryLevel } from "@/lib/domain/mastery";
import type { Concept } from "@/lib/types";

export const LEVEL_COLOR: Record<MasteryLevel, string> = {
  new: "hsl(var(--mastery-new))",
  learning: "hsl(var(--mastery-learning))",
  familiar: "hsl(var(--mastery-familiar))",
  mastered: "hsl(var(--mastery-mastered))",
};

/** Circular mastery indicator. */
export function MasteryRing({ value, size = 44, stroke = 4, className, label = true }: { value: number; size?: number; stroke?: number; className?: string; label?: boolean }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  const color = v >= 0.8 ? LEVEL_COLOR.mastered : v >= 0.5 ? LEVEL_COLOR.familiar : v > 0 ? LEVEL_COLOR.learning : LEVEL_COLOR.new;
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }} role="img" aria-label={`${Math.round(v * 100)}% mastery`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - v)} style={{ transition: "stroke-dashoffset .6s ease" }} />
      </svg>
      {label && <span className="absolute text-[11px] font-semibold tabular-nums">{Math.round(v * 100)}</span>}
    </div>
  );
}

export function MasteryBar({ value, className }: { value: number; className?: string }) {
  const v = Math.max(0, Math.min(1, value));
  const color = v >= 0.8 ? LEVEL_COLOR.mastered : v >= 0.5 ? LEVEL_COLOR.familiar : v > 0 ? LEVEL_COLOR.learning : LEVEL_COLOR.new;
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-current/10", className)} style={{ backgroundColor: "color-mix(in srgb, currentColor 12%, transparent)" }}>
      <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${v * 100}%`, background: color }} />
    </div>
  );
}

export function MasteryBadge({ concept, className }: { concept: Concept; className?: string }) {
  const level = masteryLevel(concept);
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", className)}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: LEVEL_COLOR[level] }} />
      {MASTERY_LABELS[level]}
      {concept.totalAttempts > 0 && (
        <span className="text-muted-foreground tabular-nums">
          · {concept.correctAttempts}/{concept.totalAttempts}
        </span>
      )}
    </span>
  );
}
