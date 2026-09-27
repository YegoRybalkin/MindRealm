"use client";

import { memo } from "react";
import { getArt } from "./art";
import { useUid } from "./useUid";

/** Fallback used if a template references an unknown visualType. */
function FallbackArt({ u }: { u: string }) {
  return (
    <g>
      <defs>
        <radialGradient id={`${u}-f`} cx="0.4" cy="0.35">
          <stop offset="0%" stopColor="#fff6dc" />
          <stop offset="60%" stopColor="#d6a84a" />
          <stop offset="100%" stopColor="#6b4a1f" />
        </radialGradient>
      </defs>
      <path d="M20 100l6-14h28l6 14z" fill="#5e564e" />
      <circle cx="40" cy="58" r="26" fill={`url(#${u}-f)`} />
    </g>
  );
}

export const ObjectArt = memo(function ObjectArt({ visualType, flip, className }: { visualType: string; flip?: boolean; className?: string }) {
  const u = useUid("a");
  const art = getArt(visualType);
  const w = art?.w ?? 80;
  const h = art?.h ?? 100;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} style={{ transform: flip ? "scaleX(-1)" : undefined, overflow: "visible" }} aria-hidden focusable="false">
      {art ? art.render(u) : <FallbackArt u={u} />}
    </svg>
  );
});

export function artAspect(visualType: string) {
  const art = getArt(visualType);
  return art ? art.w / art.h : 0.8;
}

export function isGrounded(visualType: string) {
  return getArt(visualType)?.grounded !== false;
}
