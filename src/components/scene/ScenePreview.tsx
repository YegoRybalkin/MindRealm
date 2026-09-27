"use client";

import { memo } from "react";
import type { BackdropSpec } from "@/lib/types";
import { paintOrder } from "@/lib/domain/sections";
import { getArt } from "./art";
import { renderBackdrop, SCENE_H, SCENE_W } from "./backdrops";
import { useUid } from "./useUid";

interface PreviewObject {
  id: string;
  visualType: string;
  position: { x: number; y: number };
  size: number;
  flip?: boolean;
  z?: number;
  conceptId?: string | null;
}

/**
 * Static, non-interactive render of a whole section in a single SVG.
 * Used for world cards, environment templates and world-map nodes.
 */
export const ScenePreview = memo(function ScenePreview({
  background,
  objects,
  className,
  markConcepts = false,
}: {
  background: BackdropSpec;
  objects: PreviewObject[];
  className?: string;
  markConcepts?: boolean;
}) {
  const u = useUid("p");
  const ordered = paintOrder(objects.map((o) => ({ ...o, name: "", conceptId: o.conceptId ?? null })));
  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden focusable="false">
      {renderBackdrop(background, u)}
      {ordered.map((o, i) => {
        const art = getArt(o.visualType);
        if (!art) return null;
        const w = (o.size / 100) * SCENE_W;
        const h = (w * art.h) / art.w;
        const x = (o.position.x / 100) * SCENE_W - w / 2;
        const y = (o.position.y / 100) * SCENE_H - h;
        return (
          <g key={o.id}>
            {art.grounded !== false && <ellipse cx={x + w / 2} cy={y + h} rx={w * 0.46} ry={Math.max(4, w * 0.06)} fill="#000" opacity={0.28} />}
            <svg x={x} y={y} width={w} height={h} viewBox={`0 0 ${art.w} ${art.h}`} overflow="visible">
              <g transform={o.flip ? `translate(${art.w} 0) scale(-1 1)` : undefined}>{art.render(`${u}o${i}`)}</g>
            </svg>
            {markConcepts && o.conceptId && <circle cx={x + w / 2} cy={y - 18} r={9} fill="#f3c969" stroke="#1a1408" strokeOpacity={0.5} strokeWidth={3} />}
          </g>
        );
      })}
    </svg>
  );
});
