"use client";

import { useMemo, useState } from "react";
import { BookOpenCheck, Flame, Globe2, Loader2, Plus, Search, Sparkles, Target } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { SearchDialog, useSearchHotkey } from "@/components/search/SearchDialog";
import { WorldSettingsDialog } from "@/components/world/WorldSettingsDialog";
import { dashboardStats } from "@/lib/domain/profile";
import { useMemoryStore } from "@/lib/store/MemoryStore";
import { TERMS, plural } from "@/lib/terminology";
import type { World } from "@/lib/types";
import { pct } from "@/lib/utils";
import { CreateWorldModal } from "./CreateWorldModal";
import { WorldCard } from "./WorldCard";

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <rect width="32" height="32" rx="9" fill="#1d1a16" />
        <path d="M8 24V13l8-6 8 6v11" fill="none" stroke="#d6a84a" strokeWidth="2" strokeLinejoin="round" />
        <path d="M13 24v-6a3 3 0 0 1 6 0v6" fill="none" stroke="#f1e6cf" strokeWidth="2" />
        <circle cx="16" cy="12.5" r="1.6" fill="#f3c969" />
      </svg>
      <span className="font-serif text-xl font-medium tracking-tight">MindRealm</span>
    </div>
  );
}

function Stat({ icon: Icon, label, value, detail }: { icon: typeof Globe2; label: string; value: string; detail?: string }) {
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-soft sm:p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-2 font-serif text-3xl font-medium tabular-nums">{value}</p>
      {detail && <p className="mt-0.5 text-xs text-muted-foreground">{detail}</p>}
    </div>
  );
}

export function Dashboard() {
  const store = useMemoryStore();
  const [createOpen, setCreateOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [editing, setEditing] = useState<World | null>(null);
  const [deleting, setDeleting] = useState<World | null>(null);
  useSearchHotkey(setSearchOpen);

  const worlds = useMemo(
    () => [...store.worlds].sort((a, b) => (b.lastStudiedAt ?? b.updatedAt).localeCompare(a.lastStudiedAt ?? a.updatedAt)),
    [store.worlds],
  );
  const stats = dashboardStats(store.worlds, store.profile);

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-30 border-b border-transparent bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between gap-3">
          <Logo />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 items-center gap-2 rounded-full border bg-card px-3 text-sm text-muted-foreground shadow-sm transition-colors hover:text-foreground sm:w-64 sm:px-4"
              aria-label="Search concepts"
            >
              <Search className="h-4 w-4" />
              <span className="hidden flex-1 text-left sm:inline">Search concepts…</span>
              <kbd className="hidden rounded border px-1.5 text-[11px] sm:inline">⌘K</kbd>
            </button>
          </div>
        </div>
      </header>

      <main className="container pb-24 pt-8 sm:pt-12">
        <section className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-gold">Method of Loci</p>
            <h1 className="mt-1 font-serif text-4xl font-medium tracking-tight sm:text-5xl">Your {TERMS.worlds}</h1>
            <p className="mt-3 max-w-xl text-muted-foreground">Place ideas inside rooms you can walk through. Recall them by retracing your steps.</p>
          </div>
          <Button size="lg" onClick={() => setCreateOpen(true)} className="shrink-0">
            <Plus /> Create {TERMS.world}
          </Button>
        </section>

        {store.status === "loading" ? (
          <div className="flex items-center justify-center py-32 text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading your worlds…
          </div>
        ) : (
          <>
            <section aria-label="Statistics" className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
              <Stat icon={BookOpenCheck} label="Concepts learned" value={String(stats.conceptsLearned)} detail={`of ${plural(stats.conceptsTotal, "concept")} placed`} />
              <Stat icon={Target} label="Recall accuracy" value={stats.recallAccuracy === null ? "—" : pct(stats.recallAccuracy)} detail={stats.recallAccuracy === null ? "Take a test to see it" : "across all tests"} />
              <Stat icon={Globe2} label={TERMS.worlds} value={String(stats.worldCount)} detail={plural(store.worlds.reduce((s, w) => s + w.sections.length, 0), "section")} />
              <Stat icon={Flame} label="Study streak" value={`${stats.streak}`} detail={stats.streak === 1 ? "day" : "days in a row"} />
            </section>

            {worlds.length === 0 ? (
              <section className="mt-12 flex flex-col items-center rounded-3xl border border-dashed bg-card/50 px-6 py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
                  <Sparkles className="h-6 w-6 text-gold" />
                </div>
                <h2 className="mt-5 font-serif text-2xl">Build your first memory palace</h2>
                <p className="mt-2 max-w-md text-muted-foreground">Choose a castle, house, garden or space station, then attach what you&apos;re studying to the objects inside.</p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <Button onClick={() => setCreateOpen(true)}>
                    <Plus /> Create {TERMS.world}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={async () => {
                      await store.restoreDemo();
                      toast.success("Example world added");
                    }}
                  >
                    Load example world
                  </Button>
                </div>
              </section>
            ) : (
              <section aria-label={TERMS.worlds} className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {worlds.map((w) => (
                  <WorldCard key={w.id} world={w} onEdit={() => setEditing(w)} onDelete={() => setDeleting(w)} />
                ))}
                <button
                  type="button"
                  onClick={() => setCreateOpen(true)}
                  className="group flex min-h-[260px] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed text-muted-foreground transition-colors hover:border-foreground/40 hover:bg-card hover:text-foreground"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary transition-transform group-hover:scale-110">
                    <Plus className="h-5 w-5" />
                  </span>
                  <span className="font-medium">Create {TERMS.world}</span>
                </button>
              </section>
            )}

            <section className="mt-16 grid gap-6 border-t pt-10 sm:grid-cols-3">
              {[
                ["1 · Place", "Walk into a room and attach a concept to a vivid object — the throne, the globe, the fountain."],
                ["2 · Walk", "Move through rooms in order. The same object always holds the same idea."],
                ["3 · Recall", "Labels vanish in Test Mode. Click each object and retrieve what lives there."],
              ].map(([t, d]) => (
                <div key={t}>
                  <p className="font-serif text-lg">{t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </div>
              ))}
            </section>
          </>
        )}
      </main>

      <CreateWorldModal open={createOpen} onOpenChange={setCreateOpen} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      {editing && <WorldSettingsDialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)} world={editing} onSave={(patch) => store.updateWorldMeta(editing.id, patch)} />}
      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(o) => !o && setDeleting(null)}
        title={`Delete “${deleting?.name}”?`}
        description={`This permanently deletes ${plural(deleting?.sections.length ?? 0, "section")} and ${plural(Object.keys(deleting?.concepts ?? {}).length, "concept")}.`}
        confirmLabel="Delete world"
        onConfirm={async () => {
          if (!deleting) return;
          await store.deleteWorld(deleting.id);
          toast("World deleted");
        }}
      />
    </div>
  );
}
