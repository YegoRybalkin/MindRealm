import type { ReactNode } from "react";
import { resolveLook, type LookPattern, type ObjectLook } from "@/lib/looks";
import type { ArtDef } from "./art/types";

/** Pattern tile drawn in a unit cell of size t. */
function tile(pattern: LookPattern, t: number, c: string): ReactNode {
  const h = t / 2;
  switch (pattern) {
    case "dots":
      return (
        <g fill={c}>
          <circle cx={h / 2} cy={h / 2} r={t * 0.13} />
          <circle cx={h * 1.5} cy={h * 1.5} r={t * 0.13} />
        </g>
      );
    case "stripes":
      return <path d={`M${-h} ${h}L${h} ${-h}M0 ${t}L${t} 0M${h} ${t + h}L${t + h} ${h}`} stroke={c} strokeWidth={t * 0.2} />;
    case "checks":
      return (
        <g fill={c}>
          <rect x={0} y={0} width={h} height={h} />
          <rect x={h} y={h} width={h} height={h} />
        </g>
      );
    case "stars":
      return (
        <path
          fill={c}
          transform={`translate(${h} ${h}) scale(${t / 40})`}
          d="M0 -12l3.5 8 8.5.8-6.4 5.6 1.9 8.4L0 6.6-7.5 10.8l1.9-8.4-6.4-5.6 8.5-.8z"
        />
      );
    case "zigzag":
      return <path d={`M0 ${h * 0.7}l${h / 2} ${-h * 0.5} ${h / 2} ${h * 0.5} ${h / 2} ${-h * 0.5} ${h / 2} ${h * 0.5}`} fill="none" stroke={c} strokeWidth={t * 0.12} />;
    case "veins":
      return <path d={`M0 ${t * 0.2}C${t * 0.3} ${t * 0.4} ${t * 0.5} 0 ${t} ${t * 0.35}M${t * 0.2} ${t}C${t * 0.35} ${t * 0.7} ${t * 0.7} ${t * 0.8} ${t * 0.8} ${t * 0.55}`} fill="none" stroke={c} strokeWidth={t * 0.04} />;
    case "scales":
      return (
        <g fill="none" stroke={c} strokeWidth={t * 0.07}>
          <path d={`M0 ${h}a${h} ${h} 0 0 1 ${t} 0`} />
          <path d={`M${-h} ${t}a${h} ${h} 0 0 1 ${t} 0M${h} ${t}a${h} ${h} 0 0 1 ${t} 0`} />
        </g>
      );
    case "plaid":
      return (
        <g fill={c}>
          <rect x={0} y={t * 0.3} width={t} height={t * 0.22} opacity={0.7} />
          <rect x={t * 0.3} y={0} width={t * 0.22} height={t} opacity={0.7} />
          <rect x={0} y={t * 0.8} width={t} height={t * 0.05} />
          <rect x={t * 0.8} y={0} width={t * 0.05} height={t} />
        </g>
      );
    case "diamonds":
      return <path d={`M${h} 0L${t} ${h} ${h} ${t} 0 ${h}z`} fill="none" stroke={c} strokeWidth={t * 0.08} />;
    case "waves":
      return <path d={`M0 ${h}c${t * 0.25} ${-h * 0.6} ${t * 0.5} ${-h * 0.6} ${h} 0s${t * 0.25} ${h * 0.6} ${h} 0`} fill="none" stroke={c} strokeWidth={t * 0.1} />;
    case "hearts":
      return (
        <path
          fill={c}
          transform={`translate(${h} ${h * 0.9}) scale(${t / 44})`}
          d="M0 10C-14 0-12-12-5-12c3 0 5 2 5 5 0-3 2-5 5-5 7 0 9 12-5 22z"
        />
      );
    case "crosses":
      return <path d={`M${h * 0.6} ${h * 0.6}l${h * 0.8} ${h * 0.8}M${h * 1.4} ${h * 0.6}l${-h * 0.8} ${h * 0.8}`} stroke={c} strokeWidth={t * 0.1} />;
  }
}

/**
 * Render an illustration in its own viewBox coordinates, optionally transformed by a
 * look: hue/saturation/brightness + a colour tint, and a surface pattern masked to the
 * object's silhouette.
 */
export function renderArt(art: ArtDef, u: string, look?: ObjectLook): ReactNode {
  if (!look) return art.render(u);
  const L = resolveLook(look);
  const t = Math.max(8, Math.min(art.w, art.h) / 4.5);
  return (
    <g>
      <defs>
        <filter id={`${u}-lk`} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feColorMatrix type="hueRotate" values={String((L.hue + L.hueShift) % 360)} result="h" />
          <feColorMatrix in="h" type="saturate" values={String(L.saturate)} result="s" />
          <feFlood floodColor={L.tint} floodOpacity={L.tintAmount} result="t" />
          <feComposite in="t" in2="SourceAlpha" operator="in" result="tm" />
          <feBlend in="tm" in2="s" mode="multiply" result="b" />
          <feComponentTransfer in="b">
            <feFuncR type="linear" slope={L.brightness} />
            <feFuncG type="linear" slope={L.brightness} />
            <feFuncB type="linear" slope={L.brightness} />
          </feComponentTransfer>
        </filter>
        <filter id={`${u}-wh`} colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" result="w" />
          {/* ignore soft glows: only fairly opaque pixels receive the pattern */}
          <feComponentTransfer in="w">
            <feFuncA type="discrete" tableValues="0 0 0 1 1" />
          </feComponentTransfer>
        </filter>
        <pattern id={`${u}-pt`} width={t} height={t} patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
          {tile(L.pattern, t, L.patternColor)}
        </pattern>
        <mask id={`${u}-mk`} maskUnits="userSpaceOnUse" x={-art.w} y={-art.h} width={art.w * 3} height={art.h * 3}>
          <g filter={`url(#${u}-wh)`}>{art.render(`${u}m`)}</g>
        </mask>
      </defs>
      <g filter={`url(#${u}-lk)`}>{art.render(u)}</g>
      <rect x={-art.w * 0.2} y={-art.h * 0.2} width={art.w * 1.4} height={art.h * 1.4} fill={`url(#${u}-pt)`} mask={`url(#${u}-mk)`} opacity={L.patternOpacity} />
    </g>
  );
}
