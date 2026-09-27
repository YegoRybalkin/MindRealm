"use client";

import { useMemo, useState } from "react";
import { ListPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/input";
import { parseConceptList } from "@/lib/domain/placement";
import { worldStats } from "@/lib/domain/world";
import { plural } from "@/lib/terminology";
import { MAX_SECTIONS } from "@/lib/limits";
import type { World } from "@/lib/types";

const EXAMPLE = `Anomie: A state of normlessness when social rules break down
Bureaucracy — Formal organisation with a hierarchy of roles and written rules
Social Stratification: The ranking of groups into a hierarchy of unequal layers`;

export function ImportConceptsDialog({
  open,
  onOpenChange,
  world,
  onImport,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  world: World;
  onImport: (text: string) => Promise<{ placed: number; sectionsAdded: number; unplaced: number }>;
}) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const parsed = useMemo(() => parseConceptList(text), [text]);
  const free = worldStats(world).freeObjects;

  return (
    <Dialog open={open} onOpenChange={(o) => (onOpenChange(o), !o && setText(""))}>
      <DialogContent className="dark max-w-xl">
        <DialogHeader>
          <DialogTitle>Add concepts in bulk</DialogTitle>
          <DialogDescription>Paste one concept per line as “Term: definition”. Each is placed on the next free object, walking through your sections in order. New sections are generated if you run out of room, up to {MAX_SECTIONS} per world.</DialogDescription>
        </DialogHeader>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={EXAMPLE} rows={9} className="font-mono text-[13px]" aria-label="Concepts to import" />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {parsed.length ? `${plural(parsed.length, "concept")} detected` : "Nothing detected yet"} · {plural(free, "free object")}
          </p>
          <Button
            variant="gold"
            disabled={!parsed.length || busy}
            onClick={async () => {
              setBusy(true);
              try {
                const res = await onImport(text);
                toast.success(`${plural(res.placed, "concept")} placed${res.sectionsAdded ? ` · ${plural(res.sectionsAdded, "new section")}` : ""}`);
                if (res.unplaced) toast(`${plural(res.unplaced, "concept")} didn't fit`, { description: `This world has reached its ${MAX_SECTIONS}-section limit and every object is taken.` });
                setText("");
                onOpenChange(false);
              } finally {
                setBusy(false);
              }
            }}
          >
            <ListPlus /> Place {parsed.length || ""} concepts
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
