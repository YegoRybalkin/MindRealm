"use client";

import { memo } from "react";
import type { BackdropSpec } from "@/lib/types";
import { renderBackdrop, SCENE_H, SCENE_W } from "./backdrops";
import { useUid } from "./useUid";

export const SceneBackdrop = memo(function SceneBackdrop({ spec, className }: { spec: BackdropSpec; className?: string }) {
  const u = useUid("b");
  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden focusable="false">
      {renderBackdrop(spec, u)}
    </svg>
  );
});
