import type { ReactNode } from "react";

/**
 * Wallpaper patterns for scene walls. Each renders an SVG <pattern> in scene space
 * (1600×900 units) from three colours: a = base, b = motif, c = accent.
 */

type P = { a: string; b: string; c: string };
type PatternDef = { w: number; h: number; draw: (p: P) => ReactNode };

const fleur = "M0 -22c5 6 7 12 4 20 5-6 12-8 16-3-5 1-8 4-9 9h-6l2 6h-14l2-6h-6c-1-5-4-8-9-9 4-5 11-3 16 3-3-8-1-14 4-20z";

export const WALLPAPER_PATTERNS: Record<string, PatternDef> = {
  damask: {
    w: 120,
    h: 150,
    draw: ({ b, c }) => {
      const motif = (x: number, y: number, k: string) => (
        <g key={k} transform={`translate(${x} ${y})`} fill={b}>
          <path d="M0 -40c10 12 22 18 22 32S10 30 0 40c-10-10-22-18-22-48S-10-28 0-40z" opacity={0.9} />
          <path d="M0 -26c6 8 12 12 12 20S6 18 0 24c-6-6-12-10-12-30S-6-18 0-26z" fill={c} />
          <path d="M-22 -8c-14-6-22 4-18 12 4-6 10-6 18-2zM22 -8c14-6 22 4 18 12-4-6-10-6-18-2z" />
          <circle cx="0" cy="-48" r="4" />
          <circle cx="0" cy="48" r="4" />
        </g>
      );
      return [motif(30, 38, "a"), motif(90, 113, "b"), motif(90, -37, "c"), motif(-30, 113, "d"), motif(150, 113, "e")];
    },
  },
  fleur: {
    w: 90,
    h: 110,
    draw: ({ b, c }) => (
      <g fill={b}>
        <path d={fleur} transform="translate(22 32)" />
        <path d={fleur} transform="translate(67 87)" />
        <circle cx="67" cy="32" r="3" fill={c} />
        <circle cx="22" cy="87" r="3" fill={c} />
      </g>
    ),
  },
  stripes: {
    w: 90,
    h: 20,
    draw: ({ b, c }) => (
      <g>
        <rect x="0" y="0" width="34" height="20" fill={b} />
        <rect x="44" y="0" width="3" height="20" fill={c} />
        <rect x="56" y="0" width="3" height="20" fill={c} />
      </g>
    ),
  },
  pinstripe: {
    w: 34,
    h: 20,
    draw: ({ b, c }) => (
      <g>
        <rect x="0" y="0" width="2" height="20" fill={b} />
        <rect x="17" y="0" width="1" height="20" fill={c} />
      </g>
    ),
  },
  argyle: {
    w: 80,
    h: 120,
    draw: ({ b, c }) => (
      <g>
        <path d="M40 0L80 60 40 120 0 60z" fill={b} />
        <path d="M0 0L80 120M80 0L0 120" stroke={c} strokeWidth={1.5} />
      </g>
    ),
  },
  chevron: {
    w: 80,
    h: 46,
    draw: ({ b, c }) => (
      <g fill="none">
        <path d="M-2 30L20 8 40 28 60 8 82 30" stroke={b} strokeWidth={10} />
        <path d="M-2 44L20 22 40 42 60 22 82 44" stroke={c} strokeWidth={2} />
      </g>
    ),
  },
  dots: {
    w: 56,
    h: 56,
    draw: ({ b, c }) => (
      <g>
        <circle cx="14" cy="14" r="7" fill={b} />
        <circle cx="42" cy="42" r="7" fill={b} />
        <circle cx="42" cy="14" r="2" fill={c} />
        <circle cx="14" cy="42" r="2" fill={c} />
      </g>
    ),
  },
  leaves: {
    w: 140,
    h: 140,
    draw: ({ b, c }) => {
      const leaf = "M0 0c14-16 36-16 48 0-12 16-34 16-48 0z";
      return (
        <g>
          <path d="M10 130C40 90 60 60 70 10" stroke={c} strokeWidth={2} fill="none" />
          <path d={leaf} fill={b} transform="translate(30 100) rotate(-40)" />
          <path d={leaf} fill={c} transform="translate(52 70) rotate(-150)" />
          <path d={leaf} fill={b} transform="translate(56 50) rotate(-60)" />
          <path d={leaf} fill={c} transform="translate(66 22) rotate(-120)" />
          <path d={leaf} fill={b} transform="translate(100 120) rotate(-20) scale(.8)" />
          <circle cx="118" cy="40" r="6" fill={c} />
          <circle cx="128" cy="52" r="4" fill={b} />
        </g>
      );
    },
  },
  artdeco: {
    w: 80,
    h: 48,
    draw: ({ b, c }) => (
      <g fill="none" stroke={b} strokeWidth={2.5}>
        {[0, 40, 80].map((x) => (
          <g key={x}>
            <path d={`M${x - 40} 48a40 40 0 0 1 80 0`} />
            <path d={`M${x - 28} 48a28 28 0 0 1 56 0`} />
            <path d={`M${x - 16} 48a16 16 0 0 1 32 0`} stroke={c} />
          </g>
        ))}
        {[20, 60].map((x) => (
          <g key={x}>
            <path d={`M${x - 40} 24a40 40 0 0 1 80 0`} />
          </g>
        ))}
      </g>
    ),
  },
  waves: {
    w: 100,
    h: 44,
    draw: ({ b, c }) => (
      <g fill="none" strokeLinecap="round">
        <path d="M0 14c12-10 25-10 37 0s25 10 37 0 19-8 26-4" stroke={b} strokeWidth={5} />
        <path d="M0 34c12-10 25-10 37 0s25 10 37 0 19-8 26-4" stroke={c} strokeWidth={2} />
      </g>
    ),
  },
  stars: {
    w: 110,
    h: 110,
    draw: ({ b, c }) => {
      const star = "M0 -10l3 7 7 .6-5.4 4.6 1.8 7L0 5.4-6.4 9.2l1.8-7L-10-2.4l7-.6z";
      return (
        <g>
          <path d={star} fill={b} transform="translate(26 30)" />
          <path d={star} fill={b} transform="translate(82 84) scale(.7)" />
          <path d={star} fill={c} transform="translate(86 24) scale(.45)" />
          <circle cx="40" cy="80" r="2" fill={c} />
          <circle cx="60" cy="50" r="1.4" fill={b} />
          <circle cx="12" cy="100" r="1.4" fill={c} />
        </g>
      );
    },
  },
  checker: {
    w: 80,
    h: 80,
    draw: ({ b, c }) => (
      <g>
        <rect x="0" y="0" width="40" height="40" fill={b} />
        <rect x="40" y="40" width="40" height="40" fill={b} />
        <path d="M0 0H80V80H0z" fill="none" stroke={c} strokeWidth={2} />
      </g>
    ),
  },
  herringbone: {
    w: 60,
    h: 40,
    draw: ({ b, c }) => (
      <g>
        <path d="M0 0l30 20v20L0 20z" fill={b} />
        <path d="M60 0L30 20v20l30-20z" fill={c} />
      </g>
    ),
  },
  ogee: {
    w: 80,
    h: 110,
    draw: ({ b, c }) => (
      <g fill="none">
        <path d="M40 0c0 20-40 35-40 55s40 35 40 55c0-20 40-35 40-55S40 20 40 0z" stroke={b} strokeWidth={3} />
        <circle cx="40" cy="55" r="5" fill={c} />
        <circle cx="0" cy="0" r="5" fill={c} />
        <circle cx="80" cy="110" r="5" fill={c} />
      </g>
    ),
  },
  hexagon: {
    w: 72,
    h: 124.7,
    draw: ({ b, c }) => (
      <g fill="none" stroke={b} strokeWidth={2.5}>
        <path d="M36 0l36 20.8v41.6L36 83.1 0 62.4V20.8z" />
        <path d="M0 62.4v41.6l36 20.7M72 62.4v41.6L36 124.7" />
        <circle cx="36" cy="41.6" r="3" fill={c} stroke="none" />
      </g>
    ),
  },
  circuit: {
    w: 140,
    h: 140,
    draw: ({ b, c }) => (
      <g fill="none" stroke={b} strokeWidth={2.2}>
        <path d="M0 30h40l20 20h50l30-30" />
        <path d="M20 140v-40l20-20h40" />
        <path d="M100 140v-30l20-20h20" />
        <path d="M70 0v20" />
        <g fill={c} stroke="none">
          <circle cx="40" cy="30" r="4" />
          <circle cx="110" cy="50" r="4" />
          <circle cx="80" cy="80" r="4" />
          <circle cx="70" cy="20" r="4" />
          <rect x="112" y="84" width="12" height="12" rx="2" />
        </g>
      </g>
    ),
  },
  hazard: {
    w: 56,
    h: 56,
    draw: ({ b, c }) => (
      <g>
        <path d="M0 56L56 0h20L20 56zM-20 56L0 36v20zM56 36l0 20H36z" fill={b} />
        <path d="M0 0h56" stroke={c} strokeWidth={1} opacity={0.4} />
      </g>
    ),
  },
  plus: {
    w: 70,
    h: 70,
    draw: ({ b, c }) => (
      <g>
        <path d="M14 8h6v6h6v6h-6v6h-6v-6H8v-6h6z" fill={b} />
        <path d="M49 43h6v6h6v6h-6v6h-6v-6h-6v-6h6z" fill={b} />
        <circle cx="52" cy="17" r="2" fill={c} />
        <circle cx="17" cy="52" r="2" fill={c} />
      </g>
    ),
  },
  wood: {
    w: 120,
    h: 400,
    draw: ({ b, c }) => (
      <g>
        <rect x="0" y="0" width="40" height="400" fill={b} />
        <rect x="80" y="0" width="40" height="400" fill={b} opacity={0.6} />
        <path d="M40 0v400M80 0v400M120 0v400" stroke={c} strokeWidth={2} />
        <path d="M12 40c6 30-6 60 2 110M58 120c-6 40 8 70 0 130M98 20c6 40-4 80 4 120" stroke={c} strokeWidth={1} opacity={0.5} fill="none" />
      </g>
    ),
  },
  plaid: {
    w: 100,
    h: 100,
    draw: ({ b, c }) => (
      <g>
        <rect x="0" y="30" width="100" height="30" fill={b} opacity={0.55} />
        <rect x="30" y="0" width="30" height="100" fill={b} opacity={0.55} />
        <rect x="0" y="78" width="100" height="4" fill={c} opacity={0.7} />
        <rect x="78" y="0" width="4" height="100" fill={c} opacity={0.7} />
      </g>
    ),
  },
  quatrefoil: {
    w: 70,
    h: 70,
    draw: ({ b, c }) => (
      <g fill="none" stroke={b} strokeWidth={3}>
        <circle cx="35" cy="22" r="13" />
        <circle cx="35" cy="48" r="13" />
        <circle cx="22" cy="35" r="13" />
        <circle cx="48" cy="35" r="13" />
        <circle cx="35" cy="35" r="3" fill={c} stroke="none" />
      </g>
    ),
  },
  triangles: {
    w: 80,
    h: 70,
    draw: ({ b, c }) => (
      <g>
        <path d="M0 70L40 0l40 70z" fill={b} />
        <path d="M40 0l40 70" stroke={c} strokeWidth={2} />
      </g>
    ),
  },
  scales: {
    w: 60,
    h: 40,
    draw: ({ b, c }) => (
      <g fill="none" stroke={b} strokeWidth={3}>
        <path d="M0 20a30 30 0 0 1 60 0" />
        <path d="M-30 40a30 30 0 0 1 60 0M30 40a30 30 0 0 1 60 0" />
        <circle cx="30" cy="12" r="2.5" fill={c} stroke="none" />
      </g>
    ),
  },
  grid: {
    w: 60,
    h: 60,
    draw: ({ b, c }) => (
      <g>
        <path d="M0 0H60M0 0V60" stroke={b} strokeWidth={1.5} />
        <circle cx="0" cy="0" r="3" fill={c} />
        <circle cx="60" cy="60" r="3" fill={c} />
        <circle cx="60" cy="0" r="3" fill={c} />
        <circle cx="0" cy="60" r="3" fill={c} />
      </g>
    ),
  },
  tapestry: {
    w: 160,
    h: 160,
    draw: ({ b, c }) => (
      <g>
        <path d="M80 10l14 26 28 4-20 20 5 28-27-14-27 14 5-28-20-20 28-4z" fill={b} />
        <path d="M0 80h40M120 80h40M80 110v50" stroke={c} strokeWidth={3} />
        <circle cx="80" cy="46" r="6" fill={c} />
        <path d="M10 150l20-20M150 150l-20-20M10 10l20 20M150 10l-20 20" stroke={b} strokeWidth={3} />
      </g>
    ),
  },
};

export const WALLPAPER_KEYS = Object.keys(WALLPAPER_PATTERNS);

/** Defines <pattern id={id}> for a wallpaper. */
export function WallpaperDef({ id, pattern, a, b, c, scale = 1 }: { id: string; pattern: string; a: string; b: string; c?: string; scale?: number }) {
  const def = WALLPAPER_PATTERNS[pattern] ?? WALLPAPER_PATTERNS.damask;
  const w = def.w * scale;
  const h = def.h * scale;
  return (
    <pattern id={id} width={w} height={h} patternUnits="userSpaceOnUse" viewBox={`0 0 ${def.w} ${def.h}`}>
      <rect x="0" y="0" width={def.w} height={def.h} fill={a} />
      {def.draw({ a, b, c: c ?? b })}
    </pattern>
  );
}
