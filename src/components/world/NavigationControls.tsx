"use client";

import { ChevronLeft, ChevronRight, Loader2, Plus } from "lucide-react";
import type { Section } from "@/lib/types";
import { TERMS } from "@/lib/terminology";
import { cn } from "@/lib/utils";

interface Props {
  sections: Section[];
  index: number;
  generating: boolean;
  allowGenerate: boolean;
  onGo: (index: number) => void;
  onGenerate: () => void;
}

function EdgeButton({ side, label, sub, onClick, children, disabled }: { side: "left" | "right"; label: string; sub: string; onClick: () => void; children: React.ReactNode; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "group pointer-events-auto absolute top-1/2 z-20 flex -translate-y-1/2 items-center gap-3 outline-none",
        side === "left" ? "left-2 flex-row sm:left-5" : "right-2 flex-row-reverse sm:right-5",
      )}
    >
      <span className="glass flex h-11 w-11 items-center justify-center rounded-full text-white/85 shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:bg-white/15 group-hover:text-white group-focus-visible:ring-2 group-focus-visible:ring-white/70 sm:h-14 sm:w-14">
        {children}
      </span>
      <span
        className={cn(
          "glass hidden max-w-[180px] rounded-full px-3.5 py-1.5 text-left text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:block",
          side === "left" ? "-translate-x-2 group-hover:translate-x-0" : "translate-x-2 text-right group-hover:translate-x-0",
        )}
      >
        <span className="block text-[10px] uppercase tracking-[0.18em] text-white/55">{sub}</span>
        <span className="block truncate text-sm font-medium">{label.replace(/^(Go to|Previous:|Next:)\s*/, "")}</span>
      </span>
    </button>
  );
}

export function NavigationControls({ sections, index, generating, allowGenerate, onGo, onGenerate }: Props) {
  const prev = sections[index - 1];
  const next = sections[index + 1];
  return (
    <>
      {prev && (
        <EdgeButton side="left" label={`Previous: ${prev.name}`} sub="Back to" onClick={() => onGo(index - 1)}>
          <ChevronLeft className="h-6 w-6" />
        </EdgeButton>
      )}
      {next ? (
        <EdgeButton side="right" label={`Next: ${next.name}`} sub="Continue to" onClick={() => onGo(index + 1)}>
          <ChevronRight className="h-6 w-6" />
        </EdgeButton>
      ) : (
        allowGenerate && (
          <EdgeButton side="right" label={TERMS.generateSection} sub="New area" onClick={onGenerate} disabled={generating}>
            {generating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-6 w-6" />}
          </EdgeButton>
        )
      )}
    </>
  );
}

/** Dots along the bottom: where you are in the world. */
export function SectionDots({ sections, index, onGo }: { sections: Section[]; index: number; onGo: (i: number) => void }) {
  return (
    <nav aria-label="Sections" className="glass pointer-events-auto flex max-w-[92vw] items-center gap-3 rounded-full px-4 py-2 text-white">
      <span className="shrink-0 text-xs tabular-nums text-white/60">
        {index + 1} / {sections.length}
      </span>
      <ol className="scrollbar-none flex items-center gap-1.5 overflow-x-auto">
        {sections.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => onGo(i)}
              aria-label={s.name}
              aria-current={i === index ? "location" : undefined}
              title={s.name}
              className={cn("block h-2 rounded-full transition-all duration-300", i === index ? "w-6 bg-gold" : "w-2 bg-white/35 hover:bg-white/70")}
            />
          </li>
        ))}
      </ol>
    </nav>
  );
}
