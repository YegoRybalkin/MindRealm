"use client";

import { motion } from "framer-motion";
import { Flag, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TestHud({ answered, total, correct, onFinish, onExit }: { answered: number; total: number; correct: number; onFinish: () => void; onExit: () => void }) {
  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="glass-strong pointer-events-auto flex items-center gap-3 rounded-2xl py-2 pl-4 pr-2 text-white shadow-2xl sm:gap-5">
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gold">Recall</p>
        <p className="text-sm tabular-nums" aria-live="polite">
          <span className="font-semibold">{answered}</span>
          <span className="text-white/60"> / {total} tested</span>
          <span className="hidden text-white/60 sm:inline"> · </span>
          <span className="hidden text-emerald-300 sm:inline">{correct} correct</span>
        </p>
      </div>
      <div className="hidden h-1.5 w-28 overflow-hidden rounded-full bg-white/10 sm:block" aria-hidden>
        <div className="h-full rounded-full bg-gold transition-[width] duration-500" style={{ width: `${total ? (answered / total) * 100 : 0}%` }} />
      </div>
      <Button size="sm" variant="gold" onClick={onFinish}>
        <Flag /> Finish
      </Button>
      <Button size="icon-sm" variant="ghost" className="text-white/70 hover:bg-white/10 hover:text-white" onClick={onExit} aria-label="Exit test">
        <X />
      </Button>
    </motion.div>
  );
}
