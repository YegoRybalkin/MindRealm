"use client";

import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw, SearchCheck, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { MasteryBar, MasteryRing } from "@/components/common/ProgressIndicator";
import type { TestSummary } from "@/lib/domain/testSession";
import { pct } from "@/lib/utils";

export function TestResults({
  open,
  onOpenChange,
  summary,
  onReview,
  onRetry,
  onReturn,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  summary: TestSummary | null;
  onReview: () => void;
  onRetry: () => void;
  onReturn: () => void;
}) {
  if (!summary) return null;
  const great = summary.accuracy >= 0.8;
  const skipped = summary.planned - summary.total;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dark max-w-lg p-0" hideClose>
        <div className="relative overflow-hidden rounded-t-2xl px-7 pb-6 pt-8 text-center">
          <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(90% 80% at 50% 0%, hsl(var(--gold) / .22), transparent 70%)" }} />
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 220, damping: 18 }} className="relative mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold">
            <Trophy className="h-6 w-6" />
          </motion.div>
          <p className="relative text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">Test complete</p>
          <DialogTitle className="relative mt-2 font-serif text-5xl font-medium tabular-nums">
            {summary.correct} <span className="text-muted-foreground">/ {summary.total}</span>
          </DialogTitle>
          <DialogDescription className="relative mt-2 text-base">
            <span className="font-medium text-foreground">{pct(summary.accuracy)} accuracy</span>
            <span className="text-muted-foreground"> · {great ? "Excellent recall." : summary.accuracy >= 0.5 ? "Solid — a little review will help." : "Worth another walk through."}</span>
          </DialogDescription>
          {skipped > 0 && <p className="relative mt-1 text-xs text-muted-foreground">{skipped} not attempted</p>}
        </div>
        <div className="space-y-6 px-7 pb-7">
          {summary.bySection.length > 0 && (
            <div>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">By section</h3>
              <ul className="space-y-3">
                {summary.bySection.map((s) => (
                  <li key={s.sectionId} className="flex items-center gap-4">
                    <span className="w-32 shrink-0 truncate text-sm">{s.name}</span>
                    <MasteryBar value={s.correct / s.total} className="flex-1" />
                    <span className="w-20 shrink-0 text-right text-sm tabular-nums text-muted-foreground">
                      {pct(s.correct / s.total)} <span className="text-xs">({s.correct}/{s.total})</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {summary.mistakes.length > 0 ? (
            <div>
              <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Needs review</h3>
              <div className="flex flex-wrap gap-1.5">
                {summary.mistakes.map((m) => (
                  <span key={m.objectId} className="rounded-full bg-rose-500/10 px-3 py-1 text-sm text-rose-200 ring-1 ring-rose-400/20">
                    {m.expected}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            summary.total > 0 && (
              <div className="flex items-center gap-3 rounded-2xl bg-emerald-500/10 p-4 text-sm text-emerald-200 ring-1 ring-emerald-400/20">
                <MasteryRing value={1} size={36} stroke={3} /> Perfect run — nothing to review.
              </div>
            )
          )}
          <div className="flex flex-wrap gap-2">
            {summary.mistakes.length > 0 && (
              <Button variant="gold" onClick={onReview}>
                <SearchCheck /> Review Mistakes
              </Button>
            )}
            <Button variant="secondary" onClick={onRetry}>
              <RotateCcw /> Test Again
            </Button>
            <Button variant="ghost" onClick={onReturn}>
              <ArrowLeft /> Return to World
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
