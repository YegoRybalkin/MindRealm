"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, Loader2, MousePointerClick, PackageOpen, Plus, X } from "lucide-react";
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
import { findObject, sectionStats } from "@/lib/domain/world";
import { countWithConcepts } from "@/lib/domain/objects";
import { useMemoryStore } from "@/lib/store/MemoryStore";
import { TERMS, plural } from "@/lib/terminology";
import type { Section, TestScope, WorldObject } from "@/lib/types";
import { nowIso, pct } from "@/lib/utils";
import { MAX_SECTIONS } from "@/lib/limits";
import { ConceptPanel } from "./ConceptPanel";
import { ImportConceptsDialog } from "./ImportConceptsDialog";
import type { ContainerInfo, ObjectTestState } from "./InteractiveObject";
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
  const [openContainerId, setOpenContainerId] = useState<string | null>(null);
  const [transition, setTransition] = useState<"slide" | "zoom">("slide");
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
  const qOpen = params.get("open");
  useEffect(() => {
    if (!world) return;
    const valid = qSection && world.sections.some((s) => s.id === qSection) ? qSection : null;
    setSectionId((cur) => valid ?? (cur && world.sections.some((s) => s.id === cur) ? cur : sections[0]?.id ?? null));
    if (valid) setOpenContainerId(qOpen);
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
  }, [world?.id, qSection, qFocus, qOpen]);

  // Keep the section in the URL so a refresh returns to the same place.
  useEffect(() => {
    if (!sectionId || !world) return;
    const url = new URL(window.location.href);
    if (!world.sections.some((s) => s.id === sectionId)) return;
    const open = openContainerId ?? "";
    if (url.searchParams.get("s") !== sectionId || (url.searchParams.get("open") ?? "") !== open) {
      url.searchParams.set("s", sectionId);
      if (open) url.searchParams.set("open", open);
      else url.searchParams.delete("open");
      url.searchParams.delete("focus");
      window.history.replaceState(window.history.state, "", url.toString());
    }
  }, [sectionId, openContainerId, world]);

  const index = Math.max(0, sections.findIndex((s) => s.id === sectionId));
  const section = sections[index];
  const container = openContainerId && section ? section.objects.find((o) => o.id === openContainerId && o.contents) : undefined;
  /** What the stage shows: the room, or the close-up inside an opened container. */
  const view: Section | undefined = useMemo(
    () =>
      section && container?.contents
        ? { ...section, id: `${section.id}~${container.id}`, name: container.contents.title, background: container.contents.background, objects: container.contents.objects }
        : section,
    [section, container],
  );

  const openContainer = useCallback((o: WorldObject) => {
    setTransition("zoom");
    setDirection(1);
    setOpenContainerId(o.id);
    setHighlightId(null);
  }, []);

  const closeContainer = useCallback(() => {
    setTransition("zoom");
    setDirection(-1);
    setOpenContainerId(null);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const target = sections[i];
      if (!target || target.id === section?.id) return;
      setTransition("slide");
      setDirection(i > index ? 1 : -1);
      setSectionId(target.id);
      setOpenContainerId(null);
      setHighlightId(null);
    },
    [sections, index, section?.id],
  );

  const jumpTo = useCallback(
    (id: string, focusObjectId?: string, containerId?: string | null) => {
      const i = sections.findIndex((s) => s.id === id);
      if (i >= 0) {
        setTransition(id === section?.id ? "zoom" : "slide");
        setDirection(i >= index ? 1 : -1);
        setSectionId(id);
        setOpenContainerId(containerId ?? null);
      }
      if (focusObjectId) {
        setHighlightId(focusObjectId);
        setTimeout(() => setHighlightId((h) => (h === focusObjectId ? null : h)), 3600);
      }
    },
    [sections, index, section?.id],
  );

  /** Jump to an object anywhere, opening its container if it has one. */
  const locate = useCallback(
    (sid: string, oid: string) => {
      if (!world) return;
      jumpTo(sid, oid, findObject(world, sid, oid).container?.id ?? null);
    },
    [world, jumpTo],
  );

  const atMax = sections.length >= MAX_SECTIONS;
  const generate = useCallback(async () => {
    if (!world || generating) return;
    if (world.sections.length >= MAX_SECTIONS) {
      toast(`This world is complete — ${MAX_SECTIONS} sections is the maximum.`, { description: "Fill the objects and containers you already have." });
      return;
    }
    setGenerating(true);
    try {
      const s = await store.generateSection(world.id);
      toast.success(`Section generated: ${s.name}`, { description: `${plural(s.objects.length, "new object")} ready for concepts.` });
      setTransition("slide");
      setDirection(1);
      setSectionId(s.id);
      setOpenContainerId(null);
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
      if (container) {
        if (e.key === "Escape" || e.key === "Backspace") closeContainer();
        return;
      }
      if (e.key === "ArrowRight") goTo(index + 1);
      else if (e.key === "ArrowLeft") goTo(index - 1);
      else if (e.key.toLowerCase() === "m") setMapOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index, container, closeContainer]);

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
      if (!session) return "inactive";
      const own = (id: string): ObjectTestState | null => {
        if (!isTarget(session, id)) return null;
        const a = session.answers[id];
        return a ? (a.correct ? "correct" : "incorrect") : "pending";
      };
      const obj = section?.objects.find((o) => o.id === objectId);
      if (!obj?.contents) return own(objectId) ?? "inactive";
      // Containers summarise their own target plus everything inside.
      const states = [own(objectId), ...obj.contents.objects.map((o) => own(o.id))].filter(Boolean) as ObjectTestState[];
      if (!states.length) return "inactive";
      if (states.includes("pending")) return "pending";
      return states.includes("incorrect") ? "incorrect" : "correct";
    },
    [session, section],
  );

  const getContainerInfo = useCallback(
    (o: WorldObject): ContainerInfo | undefined => (o.contents && !container ? { filled: countWithConcepts(o.contents.objects), total: o.contents.objects.length } : undefined),
    [container],
  );

  const onSelectObject = useCallback(
    (o: WorldObject) => {
      if (!section) return;
      if (o.contents && !container) {
        openContainer(o);
        return;
      }
      setSelected({ sectionId: section.id, objectId: o.id });
      setPanelOpen(true);
      setHighlightId(null);
    },
    [section, container, openContainer],
  );

  if (store.status === "loading") {
    return (
      <div className="dark flex h-dvh items-center justify-center bg-background text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Opening world…
      </div>
    );
  }

  if (!world || !section || !view) {
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

  const found = selected ? findObject(world, selected.sectionId, selected.objectId) : undefined;
  const selSection = found?.section;
  const selObject = found?.object;
  const selContainer = found?.container ?? undefined;
  const selConcept = selObject?.conceptId ? world.concepts[selObject.conceptId] : undefined;
  const prog = session ? progress(session) : null;
  const stats = sectionStats(world, section);
  const containerConcept = container?.conceptId ? world.concepts[container.conceptId] : undefined;
  const containerAnswer = container && session ? session.answers[container.id] : undefined;
  const containerIsTarget = !!(container && session && isTarget(session, container.id));
  const selectSelf = () => {
    if (!container) return;
    setSelected({ sectionId: section.id, objectId: container.id });
    setPanelOpen(true);
  };

  return (
    <div className="dark relative h-dvh w-full overflow-hidden bg-background text-foreground" style={{ background: env.theme.ambient }}>
      <main className="absolute inset-0 pb-16 pt-[68px] sm:pb-20 sm:pt-20">
        <SectionView
          world={world}
          section={view}
          transition={transition}
          getContainerInfo={getContainerInfo}
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
        sectionName={container ? `${section.name} / ${container.name}` : section.name}
        mode={mode}
        showLabels={showLabels}
        saving={store.saving}
        generating={generating}
        sectionCount={sections.length}
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
        {!container && <NavigationControls sections={sections} index={index} generating={generating} allowGenerate={mode === "learn" && !atMax} onGo={goTo} onGenerate={generate} />}
      </div>

      {/* Bottom bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 bg-gradient-to-t from-black/60 to-transparent px-3 pb-3 pt-10 sm:px-5 sm:pb-4">
        <div className="hidden min-w-0 flex-1 text-xs text-white/60 md:block">
          {mode === "learn" &&
            (container?.contents ? (
              <span>
                {countWithConcepts(container.contents.objects)}/{container.contents.objects.length} items inside hold concepts
              </span>
            ) : (
              <span>
                {stats.conceptCount}/{stats.objectCount} objects hold concepts · {pct(stats.mastery)} mastery
              </span>
            ))}
        </div>
        <div className="flex flex-1 justify-center">
          <AnimatePresence mode="wait">
            {mode === "test" && prog ? (
              <TestHud key="hud" answered={prog.answered} total={prog.total} correct={prog.correct} onFinish={finishTest} onExit={exitTest} />
            ) : container ? (
              <motion.div key="inside" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass pointer-events-auto flex items-center gap-2 rounded-full px-4 py-2 text-xs text-white/80">
                <PackageOpen className="h-3.5 w-3.5 text-gold" /> {container.contents?.title}
                <span className="hidden sm:inline">
                  · <kbd className="rounded border border-white/20 px-1">Esc</kbd> to step back
                </span>
              </motion.div>
            ) : (
              <motion.div key="dots" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <SectionDots sections={sections} index={index} onGo={goTo} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="hidden flex-1 md:block" />
      </div>

      {/* Inside a container: way back + the container's own concept */}
      <AnimatePresence>
        {container && (
          <motion.div
            key="container-bar"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute inset-x-0 top-[76px] z-30 flex flex-wrap items-center justify-center gap-2 px-3 sm:top-[88px]"
          >
            <button type="button" onClick={closeContainer} className="glass flex h-10 items-center gap-2 rounded-full pl-3 pr-4 text-sm font-medium text-white transition-colors hover:bg-white/15">
              <ArrowLeft className="h-4 w-4" /> Back to {section.name}
            </button>
            {mode === "learn" ? (
              <button type="button" onClick={selectSelf} className="glass flex h-10 max-w-[80vw] items-center gap-2 rounded-full px-4 text-sm text-white/90 transition-colors hover:bg-white/15">
                <PackageOpen className="h-4 w-4 shrink-0 text-gold" />
                {containerConcept ? (
                  <span className="truncate">
                    <span className="text-white/60">{container.name}:</span> {containerConcept.title}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 truncate">
                    <Plus className="h-3.5 w-3.5" /> Concept for the {container.name.toLowerCase()} itself
                  </span>
                )}
              </button>
            ) : (
              containerIsTarget && (
                <button type="button" onClick={selectSelf} className="glass flex h-10 items-center gap-2 rounded-full px-4 text-sm text-white/90 transition-colors hover:bg-white/15">
                  {containerAnswer ? (
                    containerAnswer.correct ? <Check className="h-4 w-4 text-emerald-400" /> : <X className="h-4 w-4 text-rose-400" />
                  ) : (
                    <span className="h-2.5 w-2.5 rounded-full border-2 border-white/80" />
                  )}
                  Recall: the {container.name.toLowerCase()} itself
                </button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Test-mode hint */}
      <AnimatePresence>
        {showHint && mode === "test" && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`glass pointer-events-none absolute left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm text-white ${container ? "top-40" : "top-24"}`}>
            <MousePointerClick className="h-4 w-4 text-gold" /> Click any glowing object and recall its concept
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty-section hint */}
      {mode === "learn" && !container && stats.conceptCount === 0 && (
        <div className="glass pointer-events-none absolute left-1/2 top-24 z-10 hidden -translate-x-1/2 rounded-full px-4 py-2 text-sm text-white/85 sm:block">
          Click any object to place a {TERMS.concept.toLowerCase()} on it
        </div>
      )}

      {/* Panels */}
      <ConceptPanel
        open={panelOpen && mode === "learn"}
        onOpenChange={setPanelOpen}
        section={selSection}
        container={selContainer}
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
        container={selContainer}
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
          locate(sid, oid);
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
        atMax={atMax}
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
