"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { SceneBackdrop } from "@/components/scene/SceneBackdrop";
import { paintOrder } from "@/lib/domain/sections";
import type { Section, World, WorldObject } from "@/lib/types";
import { InteractiveObject, type ContainerInfo, type ObjectTestState } from "./InteractiveObject";

const AR = 16 / 9;

interface Props {
  world: World;
  section: Section;
  direction: number;
  mode: "learn" | "test";
  glow: string;
  ambient: string;
  showLabels: boolean;
  selectedObjectId?: string | null;
  highlightedObjectId?: string | null;
  getTestState?: (objectId: string) => ObjectTestState;
  getContainerInfo?: (object: WorldObject) => ContainerInfo | undefined;
  /** "zoom" when stepping into / out of a container, "slide" between sections. */
  transition?: "slide" | "zoom";
  onSelectObject: (object: WorldObject) => void;
  /** Overlay rendered in scene-space (e.g. navigation doorways). */
  overlay?: ReactNode;
}

/** Fits a 16:9 stage into the available space; on portrait screens the stage pans horizontally. */
function useStageSize(ref: React.RefObject<HTMLDivElement | null>) {
  const [size, setSize] = useState<{ w: number; h: number; pan: boolean }>({ w: 0, h: 0, pan: false });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      if (!W || !H) return;
      if (W / H >= AR) setSize({ w: Math.round(H * AR), h: H, pan: false });
      else if (W / H >= 1.1) setSize({ w: W, h: Math.round(W / AR), pan: false });
      else {
        const h = Math.min(H, Math.max(360, Math.round(W * 1.25)));
        setSize({ w: Math.round(h * AR), h, pan: true });
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

export function SectionView({ world, section, direction, mode, glow, ambient, showLabels, selectedObjectId, highlightedObjectId, getTestState, getContainerInfo, transition = "slide", onSelectObject, overlay }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const size = useStageSize(containerRef);

  // Center the panorama on portrait screens and scroll highlighted objects into view.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !size.pan) return;
    const target = highlightedObjectId ? section.objects.find((o) => o.id === highlightedObjectId) : undefined;
    const x = target ? (target.position.x / 100) * size.w : size.w / 2;
    el.scrollTo({ left: Math.max(0, x - el.clientWidth / 2), behavior: target ? "smooth" : "auto" });
  }, [section.id, size.pan, size.w, highlightedObjectId, section.objects]);

  const ordered = paintOrder(section.objects);

  // Brief hint that portrait screens can pan around the room.
  const [panHint, setPanHint] = useState(false);
  useEffect(() => {
    if (!size.pan) return;
    setPanHint(true);
    const t = setTimeout(() => setPanHint(false), 3200);
    return () => clearTimeout(t);
  }, [size.pan, section.id]);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden" style={{ background: ambient }}>
      {/* Blurred ambient fill behind the letterboxed stage */}
      <div className="pointer-events-none absolute inset-0 scale-110 opacity-50 blur-3xl" aria-hidden>
        <SceneBackdrop spec={section.background} className="h-full w-full" />
      </div>
      <div ref={scrollRef} className={size.pan ? "scrollbar-none absolute inset-0 overflow-x-auto overflow-y-hidden" : "absolute inset-0 flex items-center justify-center"}>
        {size.w > 0 && (
          <div className={size.pan ? "relative flex h-full items-center" : "relative"} style={size.pan ? { width: size.w } : { width: size.w, height: size.h }}>
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <motion.div
                key={section.id}
                custom={direction}
                variants={
                  transition === "zoom"
                    ? {
                        enter: (d: number) => ({ opacity: 0, x: 0, scale: d > 0 ? 0.82 : 1.18, filter: "blur(6px)" }),
                        center: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
                        exit: (d: number) => ({ opacity: 0, x: 0, scale: d > 0 ? 1.25 : 0.85, filter: "blur(6px)" }),
                      }
                    : {
                        enter: (d: number) => ({ opacity: 0, x: `${d * 4}%`, scale: 1.02 }),
                        center: { opacity: 1, x: 0, scale: 1 },
                        exit: (d: number) => ({ opacity: 0, x: `${d * -4}%`, scale: 0.99 }),
                      }
                }
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,.7)] sm:rounded-2xl"
                style={{ width: size.w, height: size.h }}
                role="group"
                aria-label={`${section.name} — ${section.objects.length} objects`}
              >
                <SceneBackdrop spec={section.background} className="absolute inset-0 h-full w-full" />
                <div className="absolute inset-0">
                  {ordered.map((o, i) => (
                    <InteractiveObject
                      key={o.id}
                      object={o}
                      mode={mode}
                      concept={o.conceptId ? world.concepts[o.conceptId] : undefined}
                      showLabel={showLabels}
                      testState={getTestState?.(o.id)}
                      highlighted={highlightedObjectId === o.id}
                      selected={selectedObjectId === o.id}
                      glow={glow}
                      zIndex={i + 1}
                      container={getContainerInfo?.(o)}
                      onSelect={onSelectObject}
                    />
                  ))}
                </div>
                {overlay}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
      <AnimatePresence>
        {panHint && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-white/90"
          >
            <MoveHorizontal className="h-3.5 w-3.5" /> Swipe to look around
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
