"use client";

import { memo, type CSSProperties } from "react";
import { Check, PackageOpen, Plus, X } from "lucide-react";
import { ObjectArt, artAspect, isGrounded } from "@/components/scene/ObjectArt";
import { LEVEL_COLOR } from "@/components/common/ProgressIndicator";
import { masteryLevel } from "@/lib/domain/mastery";
import type { Concept, WorldObject } from "@/lib/types";
import { lookScale } from "@/lib/looks";
import { cn } from "@/lib/utils";

export type ObjectTestState = "pending" | "correct" | "incorrect" | "inactive";

/** Summary for openable containers: concepts inside / objects inside. */
export interface ContainerInfo {
  filled: number;
  total: number;
}

interface Props {
  object: WorldObject;
  mode: "learn" | "test";
  concept?: Concept;
  showLabel: boolean;
  testState?: ObjectTestState;
  highlighted?: boolean;
  selected?: boolean;
  glow: string;
  zIndex: number;
  container?: ContainerInfo;
  onSelect: (object: WorldObject) => void;
}

export const InteractiveObject = memo(function InteractiveObject({ object, mode, concept, showLabel, testState, highlighted, selected, glow, zIndex, container, onSelect }: Props) {
  const { x, y } = object.position;
  const width = object.size * lookScale(object.look).sx;
  const inactive = mode === "test" && testState === "inactive";
  const level = concept ? masteryLevel(concept) : null;

  const aria = container
    ? `Open ${object.name} — ${container.filled} of ${container.total} objects inside hold concepts`
    : mode === "learn"
      ? `${object.name}${concept ? ` — ${concept.title}` : " — add a concept"}`
      : inactive
        ? `${object.name} — no concept to recall`
        : testState === "pending"
          ? `${object.name} — recall the concept`
          : `${object.name} — already answered`;

  const label = container ? (
    <span className="inline-flex items-center gap-1.5">
      <PackageOpen className="h-3 w-3" /> Open {object.name}
      {mode === "learn" && (
        <span className="text-white/60">
          · {container.filled}/{container.total}
        </span>
      )}
    </span>
  ) : mode === "learn" ? (
      concept ? (
        concept.title
      ) : (
        <span className="inline-flex items-center gap-1">
          <Plus className="h-3 w-3" /> {object.name}
        </span>
      )
    ) : (
      object.name
    );

  return (
    <button
      type="button"
      onClick={() => !inactive && onSelect(object)}
      aria-label={aria}
      aria-disabled={inactive || undefined}
      data-object-id={object.id}
      className={cn(
        "group absolute block -translate-y-full rounded-lg outline-none",
        inactive ? "cursor-default" : "cursor-pointer",
      )}
      style={{ left: `${x - width / 2}%`, top: `${y}%`, width: `${width}%`, zIndex, ["--glow" as string]: glow } as CSSProperties}
    >
      {isGrounded(object.visualType) && (
        <span className="pointer-events-none absolute -bottom-[3%] left-[4%] right-[4%] h-[8%] min-h-[4px] rounded-[50%] bg-black/35 blur-[3px]" aria-hidden />
      )}
      {selected && !highlighted && (
        <span className="pointer-events-none absolute -inset-[14%] rounded-[40%]" style={{ background: `radial-gradient(closest-side, ${glow}55, transparent)` }} aria-hidden />
      )}
      {highlighted && (
        <>
          <span className="pointer-events-none absolute -inset-[22%] animate-focus-pulse rounded-full mix-blend-screen" style={{ background: `radial-gradient(closest-side, #fff6d6cc, ${glow}66 45%, transparent)` }} aria-hidden />
          <span className="pointer-events-none absolute -bottom-[6%] left-[-12%] right-[-12%] h-[18%] min-h-[10px] animate-focus-pulse rounded-[50%] border-2 border-[#ffe6a6] shadow-[0_0_24px_#ffd27a]" aria-hidden />
        </>
      )}
      <span
        className={cn(
          "relative block transition-[transform,filter,opacity] duration-300 ease-out",
          !inactive && "group-hover:-translate-y-[2%] group-hover:scale-[1.045] group-focus-visible:scale-[1.045]",
          !inactive && "group-hover:[filter:drop-shadow(0_0_12px_var(--glow))_brightness(1.08)] group-focus-visible:[filter:drop-shadow(0_0_12px_var(--glow))_brightness(1.08)]",
          selected && "[filter:drop-shadow(0_0_14px_var(--glow))_brightness(1.1)]",
          highlighted && "[filter:drop-shadow(0_0_18px_#ffe6a6)_drop-shadow(0_0_6px_#fff)_brightness(1.15)]",
          inactive && "opacity-40 saturate-[0.35]",
        )}
        style={{ aspectRatio: artAspect(object.visualType, object.look) }}
      >
        <ObjectArt visualType={object.visualType} flip={object.flip} look={object.look} className="block h-full w-full" />
      </span>

      {/* marker */}
      <span className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2" aria-hidden>
        {mode === "learn" && container && (
          <span className="flex h-5 min-w-5 items-center justify-center gap-0.5 rounded-full bg-black/60 px-1.5 text-[10px] font-semibold text-white ring-1 ring-white/25 backdrop-blur">
            <PackageOpen className="h-2.5 w-2.5" />
            {container.filled > 0 && container.filled}
          </span>
        )}
        {mode === "learn" && !container && concept && level && (
          <span className="block h-2.5 w-2.5 rotate-45 rounded-[2px] border border-black/40 shadow-[0_0_8px_rgba(255,220,140,.7)]" style={{ background: LEVEL_COLOR[level] }} />
        )}
        {mode === "test" && testState === "pending" && <span className="block h-2.5 w-2.5 rounded-full border-2 border-white/80 bg-white/10 shadow-[0_0_10px_rgba(255,255,255,.6)]" />}
        {mode === "test" && testState === "correct" && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg ring-2 ring-black/30">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
        )}
        {mode === "test" && testState === "incorrect" && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg ring-2 ring-black/30">
            <X className="h-3 w-3" strokeWidth={3} />
          </span>
        )}
      </span>

      {/* label chip */}
      {!inactive && (
        <span
          className={cn(
            "pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium leading-none text-white shadow-lg transition-all duration-200 sm:text-xs",
            "bottom-full mb-5 bg-black/70 backdrop-blur-md ring-1 ring-white/10",
            (showLabel || highlighted) && mode === "learn" && (concept || container) ? "opacity-100" : "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100",
          )}
        >
          {label}
        </span>
      )}
    </button>
  );
});
