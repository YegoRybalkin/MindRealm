"use client";

import { Brain, Globe2, MapPin, Target } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { buildTargets } from "@/lib/domain/testSession";
import { TERMS, plural } from "@/lib/terminology";
import type { Section, TestScope, World } from "@/lib/types";
import { cn } from "@/lib/utils";

export function TestSetupDialog({
  open,
  onOpenChange,
  world,
  section,
  onStart,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  world: World;
  section: Section | undefined;
  onStart: (scope: TestScope) => void;
}) {
  const worldCount = buildTargets(world, "world").length;
  const sectionCount = section ? buildTargets(world, "section", section.id).length : 0;
  const weakCount = buildTargets(world, "weak").length;

  const options: { scope: TestScope; icon: typeof Globe2; title: string; detail: string; count: number }[] = [
    { scope: "world", icon: Globe2, title: `Entire ${TERMS.world.toLowerCase()}`, detail: `Walk every ${TERMS.section.toLowerCase()} of ${world.name}`, count: worldCount },
    { scope: "section", icon: MapPin, title: `This ${TERMS.section.toLowerCase()}`, detail: section ? `Only the ${section.name}` : "", count: sectionCount },
    { scope: "weak", icon: Target, title: "Weak concepts", detail: "Concepts you've been missing", count: weakCount },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dark max-w-md">
        <DialogHeader>
          <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/15 text-gold">
            <Brain className="h-5 w-5" />
          </div>
          <DialogTitle>{TERMS.testMemory}</DialogTitle>
          <DialogDescription>Labels disappear. Walk through the space, click each object and recall what lives there.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {options.map((o) => (
            <button
              key={o.scope}
              type="button"
              disabled={o.count === 0}
              onClick={() => onStart(o.scope)}
              className={cn(
                "flex w-full items-center gap-4 rounded-2xl border bg-white/[0.02] p-4 text-left transition-all",
                o.count ? "hover:border-gold/60 hover:bg-white/[0.05]" : "cursor-not-allowed opacity-45",
              )}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
                <o.icon className="h-[18px] w-[18px] text-foreground/80" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{o.title}</span>
                <span className="block truncate text-sm text-muted-foreground">{o.detail}</span>
              </span>
              <span className="shrink-0 text-sm tabular-nums text-muted-foreground">{plural(o.count, "concept")}</span>
            </button>
          ))}
        </div>
        {worldCount === 0 && <p className="mt-4 text-sm text-muted-foreground">Add a few concepts to objects first — then come back to test yourself.</p>}
      </DialogContent>
    </Dialog>
  );
}
