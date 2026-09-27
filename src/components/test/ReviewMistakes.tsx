"use client";

import { MapPin, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ObjectArt } from "@/components/scene/ObjectArt";
import type { TestAnswer } from "@/lib/domain/testSession";
import type { World } from "@/lib/types";
import { findObject } from "@/lib/domain/world";

export function ReviewMistakes({
  open,
  onOpenChange,
  world,
  mistakes,
  onLocate,
  onRetryMistakes,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  world: World;
  mistakes: TestAnswer[];
  onLocate: (sectionId: string, objectId: string) => void;
  onRetryMistakes: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dark max-w-xl">
        <DialogHeader>
          <DialogTitle>Review mistakes</DialogTitle>
          <DialogDescription>Revisit each place. Picture the object, then the concept sitting on it.</DialogDescription>
        </DialogHeader>
        <ul className="space-y-3">
          {mistakes.map((m) => {
            const { section, object, container } = findObject(world, m.sectionId, m.objectId);
            const concept = world.concepts[m.conceptId];
            if (!section || !object || !concept) return null;
            return (
              <li key={m.objectId} className="rounded-2xl border bg-white/[0.02] p-4">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/5 p-1.5">
                    <ObjectArt visualType={object.visualType} look={object.look} className="max-h-full max-w-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">
                      {section.name} → {container ? `${container.name} → ` : ""}
                      {object.name}
                    </p>
                    <p className="font-serif text-lg font-medium text-gold">{concept.title}</p>
                    {concept.description && <p className="mt-1 text-sm leading-relaxed text-foreground/85">{concept.description}</p>}
                    <p className="mt-2 text-xs text-muted-foreground">
                      You answered: <span className="text-rose-300">{m.answer || "—"}</span>
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button size="sm" variant="secondary" onClick={() => onLocate(section.id, object.id)}>
                    <MapPin /> Show in world
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-5 flex justify-end">
          <Button variant="gold" onClick={onRetryMistakes}>
            <RotateCcw /> Retest these
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
