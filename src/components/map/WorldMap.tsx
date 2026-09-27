"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Check, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ScenePreview } from "@/components/scene/ScenePreview";
import { MasteryBar } from "@/components/common/ProgressIndicator";
import { sectionStats } from "@/lib/domain/world";
import { sortSections } from "@/lib/domain/sections";
import { TERMS, plural } from "@/lib/terminology";
import type { Section, World } from "@/lib/types";
import { cn, pct } from "@/lib/utils";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  world: World;
  currentSectionId: string;
  generating: boolean;
  onJump: (sectionId: string) => void;
  onGenerate: () => void;
  onRename: (sectionId: string, name: string) => Promise<void>;
  onDelete: (sectionId: string) => Promise<void>;
}

export function WorldMap({ open, onOpenChange, world, currentSectionId, generating, onJump, onGenerate, onRename, onDelete }: Props) {
  const sections = sortSections(world.sections);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [toDelete, setToDelete] = useState<Section | null>(null);
  const gridRef = useRef<HTMLOListElement>(null);
  const [path, setPath] = useState("");
  const [box, setBox] = useState({ w: 0, h: 0 });

  // Draw a dashed route connecting sections in order.
  useLayoutEffect(() => {
    if (!open) return;
    let raf = 0;
    const el = gridRef.current;
    const measure = () => {
      if (!el) return;
      const base = el.getBoundingClientRect();
      const nodes = Array.from(el.querySelectorAll<HTMLElement>("[data-map-node]"));
      const pts = nodes.map((n) => {
        const r = n.getBoundingClientRect();
        return [r.left - base.left + r.width / 2, r.top - base.top + r.height * 0.35];
      });
      setBox({ w: base.width, h: base.height });
      setPath(pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" "));
    };
    raf = requestAnimationFrame(measure);
    const late = setTimeout(measure, 260);
    const ro = new ResizeObserver(measure);
    if (el) ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(late);
      ro.disconnect();
    };
  }, [open, sections.length]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dark max-w-5xl p-5 sm:p-8">
        <DialogHeader>
          <DialogTitle>{TERMS.worldMap}</DialogTitle>
          <DialogDescription>
            {world.name} · {plural(sections.length, TERMS.section.toLowerCase())} · {plural(Object.keys(world.concepts).length, TERMS.concept.toLowerCase())}
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          <svg className="pointer-events-none absolute inset-0 hidden sm:block" width={box.w} height={box.h} aria-hidden>
            <path d={path} fill="none" stroke="hsl(var(--gold))" strokeOpacity={0.45} strokeWidth={2} strokeDasharray="6 8" strokeLinecap="round" />
          </svg>
          <ol ref={gridRef} className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 lg:grid-cols-3">
            {sections.map((s, i) => {
              const st = sectionStats(world, s);
              const current = s.id === currentSectionId;
              return (
                <li key={s.id} data-map-node className="group relative">
                  <div
                    className={cn(
                      "overflow-hidden rounded-2xl border bg-card transition-all",
                      current ? "border-gold/70 ring-2 ring-gold/30" : "hover:border-white/25",
                    )}
                  >
                    <button type="button" onClick={() => onJump(s.id)} className="block w-full text-left" aria-label={`Go to ${s.name}`} aria-current={current ? "location" : undefined}>
                      <div className="relative aspect-[16/8] overflow-hidden">
                        <ScenePreview background={s.background} objects={s.objects} markConcepts className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]" />
                        <span className="absolute left-2.5 top-2.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-black/60 px-1.5 text-xs font-semibold tabular-nums text-white backdrop-blur">{i + 1}</span>
                        {current && <span className="absolute right-2.5 top-2.5 rounded-full bg-gold px-2 py-0.5 text-[11px] font-semibold text-black">You are here</span>}
                      </div>
                    </button>
                    <div className="space-y-2 p-3.5">
                      {editing === s.id ? (
                        <form
                          className="flex items-center gap-1.5"
                          onSubmit={async (e) => {
                            e.preventDefault();
                            await onRename(s.id, draft);
                            setEditing(null);
                          }}
                        >
                          <Input value={draft} onChange={(e) => setDraft(e.target.value)} className="h-8 text-sm" autoFocus aria-label="Section name" maxLength={48} onKeyDown={(e) => e.key === "Escape" && (e.stopPropagation(), setEditing(null))} />
                          <Button type="submit" size="icon-sm" variant="secondary" aria-label="Save name">
                            <Check />
                          </Button>
                          <Button type="button" size="icon-sm" variant="ghost" aria-label="Cancel rename" onClick={() => setEditing(null)}>
                            <X />
                          </Button>
                        </form>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="min-w-0 flex-1 truncate font-medium">{s.name}</span>
                          <span className="flex shrink-0 gap-0.5 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                            <button type="button" className="rounded-md p-1.5 text-muted-foreground hover:bg-white/10 hover:text-foreground" aria-label={`Rename ${s.name}`} onClick={() => (setEditing(s.id), setDraft(s.name))}>
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            {sections.length > 1 && (
                              <button type="button" className="rounded-md p-1.5 text-muted-foreground hover:bg-white/10 hover:text-destructive" aria-label={`Delete ${s.name}`} onClick={() => setToDelete(s)}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {st.conceptCount}/{st.objectCount} objects used
                        </span>
                        <span className="tabular-nums">{pct(st.mastery)} mastery</span>
                      </div>
                      <MasteryBar value={st.mastery} />
                    </div>
                  </div>
                </li>
              );
            })}
            <li data-map-node className="relative">
              <button
                type="button"
                onClick={onGenerate}
                disabled={generating}
                className="flex aspect-[16/8] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 text-muted-foreground transition-colors hover:border-gold/60 hover:text-foreground sm:h-full sm:min-h-[180px]"
              >
                {generating ? <Loader2 className="h-6 w-6 animate-spin" /> : <Plus className="h-6 w-6" />}
                <span className="font-medium">{TERMS.generateSection}</span>
                <span className="text-xs">Extend the world with a new area</span>
              </button>
            </li>
          </ol>
        </div>
        <ConfirmDialog
          dark
          open={!!toDelete}
          onOpenChange={(o) => !o && setToDelete(null)}
          title={`Delete “${toDelete?.name}”?`}
          description={`This removes the ${TERMS.section.toLowerCase()} and ${plural(toDelete ? sectionStats(world, toDelete).conceptCount : 0, TERMS.concept.toLowerCase())} attached to its objects. This can't be undone.`}
          onConfirm={async () => {
            if (toDelete) await onDelete(toDelete.id);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
