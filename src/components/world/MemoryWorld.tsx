"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MousePointerClick } from "lucide-react";
import { toast } from "sonner";
import { getEnvironment } from "@/environments";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { buttonVariants } from "@/components/ui/button";
import { WorldMap } from "@/components/map/WorldMap";
import { SearchDialog, useSearchHotkey } from "@/components/search/SearchDialog";
import { ReviewMistakes } from "@/components/test/ReviewMistakes";
import { TestHud } from "@/components/test/TestHud";
import { TestQuestion } from "@/components/test/TestQuestion";
import { TestResults } from "@/components/test/TestResults";
import { TestSetupDialog } from "@/components/test/TestSetupDialog";
import { parseConceptList } from "@/lib/domain/placement";
import { sortSections } from "@/lib/domain/sections";
import { gradeAnswer, isTarget, progress, startTest, startTestWithTargets, summarize, type TestSession, type TestSummary } from "@/lib/domain/testSession";
import { sectionStats } from "@/lib/domain/world";
import { useMemoryStore } from "@/lib/store/MemoryStore";
import { TERMS, plural } from "@/lib/terminology";
import type { TestScope, WorldObject } from "@/lib/types";
import { nowIso, pct } from "@/lib/utils";
import { ConceptPanel } from "./ConceptPanel";
import { ImportConceptsDialog } from "./ImportConceptsDialog";
import type { ObjectTestState } from "./InteractiveObject";
import { NavigationControls, SectionDots } from "./NavigationControls";
import { SectionView } from "./SectionView";
import { WorldSettingsDialog } from "./WorldSettingsDialog";
import { WorldTopBar } from "./WorldTopBar";

function isTypingOrDialog(e: KeyboardEvent) {
  const t = e.target as HTMLElement | null;
  if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return true;
  return !!document.querySelector('[role="dialog"],[role="alertdialog"],[role="menu"]');
}

export function MemoryWorld({ worldId }: { worldId: string }) {
  const store = useMemoryStore();
  const router = useRouter();
  const params = useSearchParams();
  const world = store.getWorld(worldId);
  const env = getEnvironment(world?.environmentType ?? "castle");
  const sections = useMemo(() => (world ? sortSections(world.sections) : []), [world]);

  const [sectionId, setSectionId] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const [mode, setMode] = useState<"learn" | "test">("learn");
  const [showLabels, setShowLabels] = useState(false);
  const [selected, setSelected] = useState<{ sectionId: string; objectId: string } | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [setupOpen, setSetupOpen] = useState(false);
  const [session, setSession] = useState<TestSession | null>(null);
  const [summary, setSummary] = useState<TestSummary | null>(null);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const studiedRef = useRef(false);

  useSearchHotkey(setSearchOpen);

  // Mark world as studied once per visit (drives "last studied" + streak).
  useEffect(() => {
    if (world && !studiedRef.current) {
      studiedRef.current = true;
      void store.markStudied(world.id);
    }
  }, [world, store]);

  // Resolve current section from URL (?s=…) and handle ?focus=… from search.
  const qSection = params.get("s");
  const qFocus = params.get("focus");
  useEffect(() => {
    if (!world) return;
    const valid = qSection && world.sections.some((s) => s.id === qSection) ? qSection : null;
    setSectionId((cur) => valid ?? (cur && world.sections.some((s) => s.id === cur) ? cur : sections[0]?.id ?? null));
    if (qFocus) {
      setHighlightId(qFocus);
      const t = setTimeout(() => {
        setHighlightId((h) => (h === qFocus ? null : h));
        const url = new URL(window.location.href);
        url.searchParams.delete("focus");
        window.history.replaceState(window.history.state, "", url.toString());
      }, 4200);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [world?.id, qSection, qFocus]);

  // Keep the section in the URL so a refresh returns to the same place.
  useEffect(() => {
    if (!sectionId || !world) return;
    const url = new URL(window.location.href);
    if (url.searchParams.get("s") !== sectionId && world.sections.some((s) => s.id === sectionId)) {
      url.searchParams.set("s", sectionId);
      url.searchParams.delete("focus");
      window.history.replaceState(window.history.state, "", url.toString());
    }
  }, [sectionId, world]);

  const index = Math.max(0, sections.findIndex((s) => s.id === sectionId));
  const section = sections[index];

  const goTo = useCallback(
    (i: number) => {
      const target = sections[i];
      if (!target || target.id === section?.id) return;
      setDirection(i > index ? 1 : -1);
      setSectionId(target.id);
      setHighlightId(null);
    },
    [sections, index, section?.id],
  );

  const jumpTo = useCallback(
    (id: string, focusObjectId?: string) => {
      const i = sections.findIndex((s) => s.id === id);
      if (i >= 0) {
        setDirection(i >= index ? 1 : -1);
        setSectionId(id);
      }
      if (focusObjectId) {
        setHighlightId(focusObjectId);
        setTimeout(() => setHighlightId((h) => (h === focusObjectId ? null : h)), 3600);
      }
    },
    [sections, index],
  );

  const generate = useCallback(async () => {
    if (!world || generating) return;
    setGenerating(true);
    try {
      const s = await store.generateSection(world.id);
      toast.success(`Section generated: ${s.name}`, { description: `${plural(s.objects.length, "new object")} ready for concepts.` });
      setDirection(1);
      setSectionId(s.id);
      setMapOpen(false);
    } catch {
      toast.error("Couldn't generate a section.");
    } finally {
      setGenerating(false);
    }
  }, [world, generating, store]);

  // Arrow-key navigation.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTypingOrDialog(e) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowRight") goTo(index + 1);
      else if (e.key === "ArrowLeft") goTo(index - 1);
      else if (e.key.toLowerCase() === "m") setMapOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index]);

  /* ------------------------------ test mode ------------------------------ */

  const beginTest = useCallback(
    (scope: TestScope) => {
      if (!world || !section) return;
      const s = startTest(world, scope, section.id);
      if (!s.targets.length) {
        toast("Nothing to test here yet", { description: "Add concepts to objects first." });
        return;
      }
      setSession(s);
      setMode("test");
      setSetupOpen(false);
      setResultsOpen(false);
      setReviewOpen(false);
      setPanelOpen(false);
      setShowHint(true);
      setTimeout(() => setShowHint(false), 3500);
      // Start where the first target lives when testing the whole world.
      const first = s.targets[0];
      if (first && scope !== "section" && !s.targets.some((t) => t.sectionId === section.id)) jumpTo(first.sectionId);
    },
    [world, section, jumpTo],
  );

  const finishTest = useCallback(async () => {
    if (!world || !session) return;
    const sum = summarize(session, world);
    if (sum.total > 0) {
      await store.recordTest({ id: session.id, worldId: world.id, scope: session.scope, startedAt: session.startedAt, finishedAt: nowIso(), correct: sum.correct, total: sum.total });
    }
    setSummary(sum);
    setPanelOpen(false);
    setResultsOpen(true);
  }, [world, session, store]);

  const exitTest = useCallback(() => {
    setSession(null);
    setMode("learn");
    setPanelOpen(false);
    setResultsOpen(false);
  }, []);

  const onModeChange = (m: "learn" | "test") => {
    if (m === mode) return;
    if (m === "test") setSetupOpen(true);
    else if (session && progress(session).answered > 0) void finishTest();
    else exitTest();
  };

  const getTestState = useCallback(
    (objectId: string): ObjectTestState => {
      if (!session || !isTarget(session, objectId)) return "inactive";
      const a = session.answers[objectId];
      return a ? (a.correct ? "correct" : "incorrect") : "pending";
    },
    [session],
  );

  const onSelectObject = useCallback(
    (o: WorldObject) => {
      if (!section) return;
      setSelected({ sectionId: section.id, objectId: o.id });
      setPanelOpen(true);
      setHighlightId(null);
    },
    [section],
  );

  if (store.status === "loading") {
    return (
      <div className="dark flex h-dvh items-center justify-center bg-background text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Opening world…
      </div>
    );
  }

  if (!world || !section) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="font-serif text-3xl">World not found</h1>
        <p className="max-w-sm text-muted-foreground">This memory world doesn&apos;t exist on this device — it may have been deleted.</p>
        <Link href="/" className={buttonVariants()}>
          Back to dashboard
        </Link>
      </div>
    );
  }

  const selSection = selected ? world.sections.find((s) => s.id === selected.sectionId) : undefined;
  const selObject = selSection?.objects.find((o) => o.id === selected?.objectId);
  const selConcept = selObject?.conceptId ? world.concepts[selObject.conceptId] : undefined;
  const prog = session ? progress(session) : null;
  const stats = sectionStats(world, section);

  return (
    <div className="dark relative h-dvh w-full overflow-hidden bg-background text-foreground" style={{ background: env.theme.ambient }}>
      <main className="absolute inset-0 pb-16 pt-[68px] sm:pb-20 sm:pt-20">
        <SectionView
          world={world}
          section={section}
          direction={direction}
          mode={mode}
          glow={env.theme.glow}
          ambient={env.theme.ambient}
          showLabels={showLabels}
          selectedObjectId={panelOpen ? selected?.objectId : null}
          highlightedObjectId={highlightId}
          getTestState={mode === "test" ? getTestState : undefined}
          onSelectObject={onSelectObject}
        />
      </main>

      <WorldTopBar
        worldName={world.name}
        environmentName={env.name}
        sectionName={section.name}
        mode={mode}
        showLabels={showLabels}
        saving={store.saving}
        generating={generating}
        onToggleLabels={() => setShowLabels((v) => !v)}
        onModeChange={onModeChange}
        onSearch={() => setSearchOpen(true)}
        onMap={() => setMapOpen(true)}
        onGenerate={generate}
        onImport={() => setImportOpen(true)}
        onSettings={() => setSettingsOpen(true)}
        onDelete={() => setDeleteOpen(true)}
      />

      <div className="pointer-events-none absolute inset-0 z-20">
        <NavigationControls sections={sections} index={index} generating={generating} allowGenerate={mode === "learn"} onGo={goTo} onGenerate={generate} />
      </div>

      {/* Bottom bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 bg-gradient-to-t from-black/60 to-transparent px-3 pb-3 pt-10 sm:px-5 sm:pb-4">
        <div className="hidden min-w-0 flex-1 text-xs text-white/60 md:block">
          {mode === "learn" && (
            <span>
              {stats.conceptCount}/{stats.objectCount} objects hold concepts · {pct(stats.mastery)} mastery
            </span>
          )}
        </div>
        <div className="flex flex-1 justify-center">
          <AnimatePresence mode="wait">
            {mode === "test" && prog ? (
              <TestHud key="hud" answered={prog.answered} total={prog.total} correct={prog.correct} onFinish={finishTest} onExit={exitTest} />
            ) : (
              <motion.div key="dots" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <SectionDots sections={sections} index={index} onGo={goTo} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="hidden flex-1 md:block" />
      </div>

      {/* Test-mode hint */}
      <AnimatePresence>
        {showHint && mode === "test" && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass pointer-events-none absolute left-1/2 top-24 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-sm text-white">
            <MousePointerClick className="h-4 w-4 text-gold" /> Click any glowing object and recall its concept
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty-section hint */}
      {mode === "learn" && stats.conceptCount === 0 && (
        <div className="glass pointer-events-none absolute left-1/2 top-24 z-10 hidden -translate-x-1/2 rounded-full px-4 py-2 text-sm text-white/85 sm:block">
          Click any object to place a {TERMS.concept.toLowerCase()} on it
        </div>
      )}

      {/* Panels */}
      <ConceptPanel
        open={panelOpen && mode === "learn"}
        onOpenChange={setPanelOpen}
        section={selSection}
        object={selObject}
        concept={selConcept}
        glow={env.theme.glow}
        onSave={async (input) => {
          if (!selected) return;
          await store.saveConcept(world.id, selected.sectionId, selected.objectId, input);
        }}
        onDelete={async () => {
          if (!selected) return;
          await store.deleteConcept(world.id, selected.sectionId, selected.objectId);
        }}
      />

      <TestQuestion
        open={panelOpen && mode === "test"}
        onOpenChange={setPanelOpen}
        section={selSection}
        object={selObject}
        concept={selConcept}
        result={session && selObject ? session.answers[selObject.id] : undefined}
        glow={env.theme.glow}
        onSubmit={(answer) => {
          if (!session || !selObject) return;
          const graded = gradeAnswer(session, world, selObject.id, answer);
          if (!graded) return;
          setSession(graded.session);
          void store.recordAnswer(world.id, graded.result.conceptId, graded.result.correct);
        }}
        onContinue={() => {
          setPanelOpen(false);
          if (session && progress(session).done) setTimeout(() => void finishTest(), 250);
        }}
      />

      <TestSetupDialog open={setupOpen} onOpenChange={setSetupOpen} world={world} section={section} onStart={beginTest} />

      <TestResults
        open={resultsOpen}
        onOpenChange={(o) => {
          setResultsOpen(o);
          if (!o) exitTest();
        }}
        summary={summary}
        onReview={() => {
          setResultsOpen(false);
          setReviewOpen(true);
          setSession(null);
          setMode("learn");
        }}
        onRetry={() => {
          if (!session) return;
          setResultsOpen(false);
          const fresh = session.scope === "weak" ? startTestWithTargets(world, session.targets) : startTest(world, session.scope, session.sectionId);
          setSession(fresh);
          setMode("test");
        }}
        onReturn={exitTest}
      />

      <ReviewMistakes
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        world={world}
        mistakes={summary?.mistakes ?? []}
        onLocate={(sid, oid) => {
          setReviewOpen(false);
          setMode("learn");
          jumpTo(sid, oid);
        }}
        onRetryMistakes={() => {
          if (!summary) return;
          const s = startTestWithTargets(world, summary.mistakes);
          setReviewOpen(false);
          setSession(s);
          setMode("test");
          const first = s.targets[0];
          if (first) jumpTo(first.sectionId);
        }}
      />

      <WorldMap
        open={mapOpen}
        onOpenChange={setMapOpen}
        world={world}
        currentSectionId={section.id}
        generating={generating}
        onJump={(id) => {
          jumpTo(id);
          setMapOpen(false);
        }}
        onGenerate={generate}
        onRename={(id, name) => store.renameSection(world.id, id, name)}
        onDelete={async (id) => {
          await store.deleteSection(world.id, id);
          toast("Section deleted");
        }}
      />

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} dark />

      <ImportConceptsDialog open={importOpen} onOpenChange={setImportOpen} world={world} onImport={(text) => store.importConcepts(world.id, parseConceptList(text))} />

      <WorldSettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} world={world} dark onSave={(patch) => store.updateWorldMeta(world.id, patch)} />

      <ConfirmDialog
        dark
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title={`Delete “${world.name}”?`}
        description={`All ${plural(sections.length, "section")} and ${plural(Object.keys(world.concepts).length, "concept")} in this world will be permanently deleted.`}
        confirmLabel="Delete world"
        onConfirm={async () => {
          await store.deleteWorld(world.id);
          toast("World deleted");
          router.push("/");
        }}
      />
    </div>
  );
}
