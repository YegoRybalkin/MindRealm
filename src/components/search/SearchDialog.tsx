"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronRight, CornerDownLeft, Search as SearchIcon } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ObjectArt } from "@/components/scene/ObjectArt";
import { searchConcepts } from "@/lib/domain/search";
import { useMemoryStore } from "@/lib/store/MemoryStore";
import { TERMS } from "@/lib/terminology";
import { cn } from "@/lib/utils";

export function worldHref(worldId: string, sectionId?: string, objectId?: string, containerId?: string | null) {
  const q = new URLSearchParams();
  if (sectionId) q.set("s", sectionId);
  if (containerId) q.set("open", containerId);
  if (objectId) q.set("focus", objectId);
  const qs = q.toString();
  return `/worlds/${worldId}${qs ? `?${qs}` : ""}`;
}

export function SearchDialog({ open, onOpenChange, dark }: { open: boolean; onOpenChange: (o: boolean) => void; dark?: boolean }) {
  const { worlds } = useMemoryStore();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const hits = useMemo(() => searchConcepts(worlds, query), [worlds, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
    }
  }, [open]);
  useEffect(() => setActive(0), [query]);

  const go = (i: number) => {
    const h = hits[i];
    if (!h) return;
    onOpenChange(false);
    router.push(worldHref(h.world.id, h.section.id, h.object.id, h.container?.id));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("top-[12vh] max-w-xl translate-y-0 gap-0 p-0", dark && "dark")} hideClose aria-describedby={undefined}>
        <DialogPrimitive.Title className="sr-only">Search concepts</DialogPrimitive.Title>
        <div className="flex items-center gap-3 border-b px-5">
          <SearchIcon className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, hits.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter") {
                e.preventDefault();
                go(active);
              }
            }}
            placeholder={`Search ${TERMS.concepts.toLowerCase()} across all worlds…`}
            className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground/70"
            aria-label="Search concepts"
            role="combobox"
            aria-expanded={hits.length > 0}
            aria-controls="search-results"
          />
          <kbd className="hidden rounded-md border px-1.5 py-0.5 text-[11px] text-muted-foreground sm:block">Esc</kbd>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-2" id="search-results" role="listbox">
          {!query.trim() ? (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">Type a concept, object or room — e.g. “conflict theory”.</p>
          ) : hits.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">No concepts match “{query}”.</p>
          ) : (
            hits.map((h, i) => (
              <button
                key={`${h.world.id}-${h.object.id}`}
                type="button"
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(i)}
                className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors", i === active && "bg-accent")}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted p-1.5">
                  <ObjectArt visualType={h.object.visualType} look={h.object.look} className="max-h-full max-w-full" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{h.concept.title}</span>
                  <span className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                    {h.world.name}
                    <ChevronRight className="h-3 w-3 shrink-0" />
                    {h.environmentName}
                    <ChevronRight className="h-3 w-3 shrink-0" />
                    {h.section.name}
                    {h.container && (
                      <>
                        <ChevronRight className="h-3 w-3 shrink-0" />
                        {h.container.name}
                      </>
                    )}
                    <ChevronRight className="h-3 w-3 shrink-0" />
                    {h.object.name}
                  </span>
                </span>
                {i === active && <CornerDownLeft className="h-4 w-4 shrink-0 text-muted-foreground" />}
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Registers ⌘K / Ctrl+K and "/" to open search. */
export function useSearchHotkey(setOpen: (o: boolean) => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen, enabled]);
}
