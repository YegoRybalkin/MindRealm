import type { ReactNode } from "react";
import type { BackdropSpec } from "@/lib/types";
import { shade } from "@/lib/color";
import { WallpaperDef } from "./wallpapers";

/**
 * Scene backdrops are drawn as SVG in a fixed 1600×900 coordinate space.
 * Rooms share a simple one-point-perspective box:
 *   back wall  x 160–1440, y 70–620
 *   floor      y 620–900
 * Objects are positioned on top of this in percentage coordinates.
 */
export const SCENE_W = 1600;
export const SCENE_H = 900;

const BW = { x0: 160, x1: 1440, y0: 70, y1: 620 };
const VP = { x: 800, y: 330 };

type Opts = Record<string, string | number | boolean>;
type BackdropRenderer = (u: string, o: Opts) => ReactNode;

const str = (o: Opts, k: string, d: string) => (typeof o[k] === "string" ? (o[k] as string) : d);
const num = (o: Opts, k: string, d: number) => (typeof o[k] === "number" ? (o[k] as number) : d);
const list = (o: Opts, k: string): number[] =>
  typeof o[k] === "string" && o[k]
    ? (o[k] as string)
        .split(",")
        .map((s) => parseFloat(s))
        .filter((n) => !Number.isNaN(n))
    : [];

function Grad({ id, stops, x2 = 0, y2 = 1 }: { id: string; stops: [number, string, number?][]; x2?: number; y2?: number }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={x2} y2={y2}>
      {stops.map(([o, c, op], i) => (
        <stop key={i} offset={`${o}%`} stopColor={c} stopOpacity={op ?? 1} />
      ))}
    </linearGradient>
  );
}

/** Box-room shell: ceiling, side walls, back wall, floor. */
function RoomShell({
  u,
  wall,
  wallDark,
  side,
  ceiling,
  floor,
  floorDark,
}: {
  u: string;
  wall: string;
  wallDark: string;
  side: string;
  ceiling: string;
  floor: string;
  floorDark: string;
}) {
  return (
    <g>
      <defs>
        <Grad id={`${u}-wall`} stops={[[0, wallDark], [100, wall]]} />
        <Grad id={`${u}-floor`} stops={[[0, floorDark], [100, floor]]} />
        <Grad id={`${u}-sideL`} x2={1} y2={0} stops={[[0, side, 1], [100, wall, 1]]} />
        <Grad id={`${u}-sideR`} x2={1} y2={0} stops={[[0, wall, 1], [100, side, 1]]} />
      </defs>
      <rect x="0" y="0" width={SCENE_W} height={SCENE_H} fill={ceiling} />
      <rect x={BW.x0} y={BW.y0} width={BW.x1 - BW.x0} height={BW.y1 - BW.y0} fill={`url(#${u}-wall)`} />
      <polygon points={`0,0 ${BW.x0},${BW.y0} ${BW.x0},${BW.y1} 0,${SCENE_H}`} fill={`url(#${u}-sideL)`} />
      <polygon points={`${SCENE_W},0 ${BW.x1},${BW.y0} ${BW.x1},${BW.y1} ${SCENE_W},${SCENE_H}`} fill={`url(#${u}-sideR)`} />
      <polygon points={`0,0 ${SCENE_W},0 ${BW.x1},${BW.y0} ${BW.x0},${BW.y0}`} fill={ceiling} />
      <polygon points={`${BW.x0},${BW.y1} ${BW.x1},${BW.y1} ${SCENE_W},${SCENE_H} 0,${SCENE_H}`} fill={`url(#${u}-floor)`} />
    </g>
  );
}

/** Lines converging to the vanishing point, clipped to the floor. */
function FloorLines({ count, color, opacity, rows = 0 }: { count: number; color: string; opacity: number; rows?: number }) {
  const lines: ReactNode[] = [];
  for (let i = 0; i <= count; i++) {
    const xb = BW.x0 + ((BW.x1 - BW.x0) * i) / count;
    // extend from back wall edge toward viewer
    const t = (SCENE_H - BW.y1) / (BW.y1 - VP.y);
    const xf = xb + (xb - VP.x) * t;
    lines.push(<line key={`v${i}`} x1={xb} y1={BW.y1} x2={Math.round(xf)} y2={SCENE_H} />);
  }
  for (let r = 1; r <= rows; r++) {
    const y = BW.y1 + (SCENE_H - BW.y1) * Math.pow(r / (rows + 1), 1.6);
    lines.push(<line key={`h${r}`} x1={0} y1={Math.round(y)} x2={SCENE_W} y2={Math.round(y)} />);
  }
  return (
    <g stroke={color} strokeOpacity={opacity} strokeWidth={2}>
      {lines}
    </g>
  );
}

function Vignette({ u, strength = 0.55 }: { u: string; strength?: number }) {
  return (
    <g pointerEvents="none">
      <defs>
        <radialGradient id={`${u}-vig`} cx="50%" cy="48%" r="75%">
          <stop offset="55%" stopColor="#000" stopOpacity={0} />
          <stop offset="100%" stopColor="#000" stopOpacity={strength} />
        </radialGradient>
      </defs>
      <rect width={SCENE_W} height={SCENE_H} fill={`url(#${u}-vig)`} />
    </g>
  );
}

function LightPool({ u, k, cx, cy, rx, ry, color, opacity }: { u: string; k: string; cx: number; cy: number; rx: number; ry: number; color: string; opacity: number }) {
  return (
    <g>
      <defs>
        <radialGradient id={`${u}-lp-${k}`}>
          <stop offset="0%" stopColor={color} stopOpacity={opacity} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${u}-lp-${k})`} />
    </g>
  );
}


/** Patterned wallpaper on the back wall (from the top down to yEnd) and matching side-wall strips. */
function Wallpaper({ u, o, yEnd = BW.y1, sideShade = 0.38, scale = 1 }: { u: string; o: Opts; yEnd?: number; sideShade?: number; scale?: number }) {
  const wp = str(o, "wp", "");
  if (!wp) return null;
  const a = str(o, "wpA", "#555");
  const b = str(o, "wpB", "#777");
  const c = str(o, "wpC", b);
  const yf = Math.round(((yEnd - BW.y0) / (BW.y1 - BW.y0)) * SCENE_H);
  const left = `0,0 ${BW.x0},${BW.y0} ${BW.x0},${yEnd} 0,${yf}`;
  const right = `${SCENE_W},0 ${BW.x1},${BW.y0} ${BW.x1},${yEnd} ${SCENE_W},${yf}`;
  return (
    <g>
      <defs>
        <WallpaperDef id={`${u}-wp`} pattern={wp} a={a} b={b} c={c} scale={scale} />
        <WallpaperDef id={`${u}-wps`} pattern={wp} a={a} b={b} c={c} scale={scale * 1.35} />
        <Grad id={`${u}-wpshade`} stops={[[0, "#000", 0.35], [35, "#000", 0.05], [100, "#000", 0.12]]} />
      </defs>
      <rect x={BW.x0} y={BW.y0} width={BW.x1 - BW.x0} height={yEnd - BW.y0} fill={`url(#${u}-wp)`} />
      <rect x={BW.x0} y={BW.y0} width={BW.x1 - BW.x0} height={yEnd - BW.y0} fill={`url(#${u}-wpshade)`} />
      <polygon points={left} fill={`url(#${u}-wps)`} />
      <polygon points={right} fill={`url(#${u}-wps)`} />
      <polygon points={left} fill="#000" opacity={sideShade} />
      <polygon points={right} fill="#000" opacity={sideShade} />
    </g>
  );
}

/** Horizontal rail (dado / picture rail) across back and side walls at back-wall height y. */
function WallRail({ y, color, h = 10 }: { y: number; color: string; h?: number }) {
  const yf = Math.round(((y - BW.y0) / (BW.y1 - BW.y0)) * SCENE_H);
  const yf2 = Math.round(((y + h - BW.y0) / (BW.y1 - BW.y0)) * SCENE_H);
  return (
    <g>
      <rect x={BW.x0} y={y} width={BW.x1 - BW.x0} height={h} fill={color} />
      <rect x={BW.x0} y={y + h} width={BW.x1 - BW.x0} height={3} fill="#000" opacity={0.25} />
      <polygon points={`0,${yf} ${BW.x0},${y} ${BW.x0},${y + h} 0,${yf2}`} fill={shade(color, -0.3)} />
      <polygon points={`${SCENE_W},${yf} ${BW.x1},${y} ${BW.x1},${y + h} ${SCENE_W},${yf2}`} fill={shade(color, -0.3)} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Castle                                                              */
/* ------------------------------------------------------------------ */

const castleInterior: BackdropRenderer = (u, o) => {
  const wall = str(o, "wall", "#5d544b");
  const floor = str(o, "floor", "#3e352d");
  const light = str(o, "light", "#ffb866");
  const windows = list(o, "windows");
  const banners = list(o, "banners");
  const rug = str(o, "rug", "");
  const glowX = num(o, "glowX", -1);
  return (
    <g>
      <RoomShell u={u} wall={wall} wallDark={shade(wall, -0.35)} side={shade(wall, -0.45)} ceiling={shade(wall, -0.6)} floor={floor} floorDark={shade(floor, -0.35)} />
      <defs>
        <pattern id={`${u}-stone`} width="120" height="56" patternUnits="userSpaceOnUse">
          <path d="M0 0H120M0 28H120M40 0V28M100 0V28M10 28V56M70 28V56" stroke="#000" strokeOpacity={0.22} strokeWidth={2} fill="none" />
          <path d="M2 2H38M42 30H68" stroke="#fff" strokeOpacity={0.05} strokeWidth={2} />
        </pattern>
      </defs>
      <rect x={BW.x0} y={BW.y0} width={BW.x1 - BW.x0} height={BW.y1 - BW.y0} fill={`url(#${u}-stone)`} />
      <polygon points={`0,0 ${BW.x0},${BW.y0} ${BW.x0},${BW.y1} 0,${SCENE_H}`} fill={`url(#${u}-stone)`} opacity={0.5} />
      <polygon points={`${SCENE_W},0 ${BW.x1},${BW.y0} ${BW.x1},${BW.y1} ${SCENE_W},${SCENE_H}`} fill={`url(#${u}-stone)`} opacity={0.5} />
      <Wallpaper u={u} o={o} yEnd={440} sideShade={0.45} />
      {o.wp && <WallRail y={440} color={str(o, "rail", "#8a6428")} h={12} />}
      {/* ceiling beams */}
      <g fill="#000" opacity={0.35}>
        {[0.2, 0.4, 0.6, 0.8].map((t) => {
          const xb = BW.x0 + (BW.x1 - BW.x0) * t;
          const xt = xb + (xb - VP.x) * 0.3;
          return <polygon key={t} points={`${xb - 10},${BW.y0} ${xb + 10},${BW.y0} ${xt + 16},0 ${xt - 16},0`} />;
        })}
      </g>
      {/* floor flagstones */}
      <FloorLines count={10} color="#000" opacity={0.25} rows={4} />
      {/* windows with light shafts */}
      {windows.map((px, i) => {
        const x = (px / 100) * SCENE_W;
        return (
          <g key={`w${i}`}>
            <defs>
              <Grad id={`${u}-sky${i}`} stops={[[0, "#9cb8d6"], [100, "#e8d2a8"]]} />
              <Grad id={`${u}-beam${i}`} stops={[[0, "#fff4d6", 0.28], [100, "#fff4d6", 0]]} />
            </defs>
            <path d={`M${x - 46} 330V190a46 46 0 0 1 92 0V330z`} fill={shade(wall, -0.5)} />
            <path d={`M${x - 36} 322V192a36 36 0 0 1 72 0V322z`} fill={`url(#${u}-sky${i})`} />
            <path d={`M${x} 156V322M${x - 36} 240H${x + 36}`} stroke={shade(wall, -0.55)} strokeWidth={6} />
            <polygon points={`${x - 36},322 ${x + 36},322 ${x + 160},${BW.y1 + 180} ${x - 20},${BW.y1 + 180}`} fill={`url(#${u}-beam${i})`} />
          </g>
        );
      })}
      {/* banners */}
      {banners.map((px, i) => {
        const x = (px / 100) * SCENE_W;
        const c = i % 2 ? "#23406a" : "#7b1f2a";
        return (
          <g key={`b${i}`}>
            <rect x={x - 44} y={96} width={88} height={8} rx={4} fill="#a87b2c" />
            <path d={`M${x - 38} 104h76v220l-38-26-38 26z`} fill={c} />
            <path d={`M${x} 104h38v220l-38-26z`} fill="#000" opacity={0.18} />
            <path d={`M${x} 170l18 26-18 26-18-26z`} fill="#d6a84a" />
          </g>
        );
      })}
      {rug && (
        <g>
          <polygon points={`640,640 960,640 1100,900 500,900`} fill={rug} />
          <polygon points={`660,650 940,650 1070,900 530,900`} fill="none" stroke="#d6a84a" strokeOpacity={0.55} strokeWidth={4} />
        </g>
      )}
      {glowX >= 0 && <LightPool u={u} k="glow" cx={(glowX / 100) * SCENE_W} cy={600} rx={420} ry={300} color={light} opacity={0.35} />}
      <LightPool u={u} k="amb" cx={800} cy={420} rx={900} ry={420} color={light} opacity={0.12} />
      <Vignette u={u} strength={0.6} />
    </g>
  );
};

const castleExterior: BackdropRenderer = (u, o) => {
  const sky = str(o, "sky", "#7fa6c8");
  const skyLow = str(o, "skyLow", "#f0d7a8");
  const ground = str(o, "ground", "#6a6a52");
  const wall = str(o, "wall", "#8b8175");
  return (
    <g>
      <defs>
        <Grad id={`${u}-sky`} stops={[[0, sky], [100, skyLow]]} />
        <Grad id={`${u}-ground`} stops={[[0, shade(ground, -0.2)], [100, ground]]} />
      </defs>
      <rect width={SCENE_W} height={SCENE_H} fill={`url(#${u}-sky)`} />
      <g fill="#fff" opacity={0.5}>
        <ellipse cx="300" cy="140" rx="120" ry="24" />
        <ellipse cx="380" cy="126" rx="80" ry="22" />
        <ellipse cx="1200" cy="100" rx="140" ry="22" />
        <ellipse cx="1290" cy="88" rx="70" ry="18" />
      </g>
      {/* far towers */}
      <g fill={shade(wall, -0.15)}>
        <rect x="120" y="170" width="170" height="420" />
        <rect x="1310" y="150" width="170" height="440" />
        <polygon points="105,170 205,70 305,170" fill="#5a3438" />
        <polygon points="1295,150 1395,48 1495,150" fill="#5a3438" />
        <rect x="185" y="250" width="40" height="70" rx="20" fill="#2a2420" />
        <rect x="1375" y="230" width="40" height="70" rx="20" fill="#2a2420" />
      </g>
      {/* curtain wall with crenellations */}
      <rect x="0" y="330" width={SCENE_W} height="270" fill={wall} />
      <g fill={wall}>
        {Array.from({ length: 21 }).map((_, i) => (
          <rect key={i} x={i * 80} y={296} width={48} height={40} />
        ))}
      </g>
      <defs>
        <pattern id={`${u}-stone`} width="120" height="56" patternUnits="userSpaceOnUse">
          <path d="M0 0H120M0 28H120M40 0V28M100 0V28M10 28V56M70 28V56" stroke="#000" strokeOpacity={0.16} strokeWidth={2} fill="none" />
        </pattern>
      </defs>
      <rect x="0" y="296" width={SCENE_W} height="304" fill={`url(#${u}-stone)`} />
      {o.wp && (
        <g>
          <defs>
            <WallpaperDef id={`${u}-wp`} pattern={str(o, "wp", "fleur")} a={str(o, "wpA", "#7b1f2a")} b={str(o, "wpB", "#d6a84a")} c={str(o, "wpC", "#d6a84a")} scale={0.7} />
          </defs>
          {[400, 560, 1040, 1200].map((x) => (
            <g key={x}>
              <rect x={x - 58} y={344} width={116} height={8} rx={4} fill="#6b4a2b" />
              <path d={`M${x - 50} 352h100v190l-50-30-50 30z`} fill={`url(#${u}-wp)`} />
              <path d={`M${x - 50} 352h100v190l-50-30-50 30z`} fill="none" stroke={str(o, "wpB", "#d6a84a")} strokeWidth={4} />
              <path d={`M${x} 352h50v190l-50-30z`} fill="#000" opacity={0.15} />
            </g>
          ))}
        </g>
      )}
      <path d="M700 600V470a100 100 0 0 1 200 0V600z" fill="#241e1a" />
      <g stroke="#3a322c" strokeWidth={6}>
        {[730, 770, 810, 850].map((x) => (
          <line key={x} x1={x} y1={440} x2={x} y2={560} />
        ))}
        <line x1={704} y1={500} x2={896} y2={500} />
      </g>
      <rect x="0" y="560" width={SCENE_W} height="40" fill="#000" opacity={0.15} />
      {/* courtyard ground */}
      <rect x="0" y="600" width={SCENE_W} height="300" fill={`url(#${u}-ground)`} />
      <g stroke="#000" strokeOpacity={0.14} strokeWidth={2}>
        {Array.from({ length: 9 }).map((_, i) => {
          const y = 600 + 300 * Math.pow((i + 1) / 10, 1.5);
          return <line key={i} x1={0} y1={Math.round(y)} x2={SCENE_W} y2={Math.round(y)} />;
        })}
      </g>
      <g fill="#4f7d45" opacity={0.7}>
        <ellipse cx="80" cy="610" rx="140" ry="22" />
        <ellipse cx="1540" cy="612" rx="160" ry="24" />
      </g>
      <LightPool u={u} k="sun" cx={1100} cy={200} rx={700} ry={400} color="#fff1c9" opacity={0.25} />
      <Vignette u={u} strength={0.4} />
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* House                                                               */
/* ------------------------------------------------------------------ */

const houseInterior: BackdropRenderer = (u, o) => {
  const wall = str(o, "wall", "#e7dfd2");
  const floor = str(o, "floor", "#b88a5e");
  const floorType = str(o, "floorType", "wood");
  const windows = list(o, "windows");
  const accent = str(o, "accent", "");
  const accentWall = str(o, "accentWall", "");
  const evening = o.evening === true;
  return (
    <g>
      <RoomShell u={u} wall={wall} wallDark={shade(wall, -0.06)} side={shade(wall, -0.16)} ceiling={shade(wall, 0.04)} floor={floor} floorDark={shade(floor, -0.22)} />
      {accentWall && <rect x={BW.x0 + (BW.x1 - BW.x0) * 0.3} y={BW.y0} width={(BW.x1 - BW.x0) * 0.4} height={BW.y1 - BW.y0} fill={accentWall} />}
      <Wallpaper u={u} o={o} yEnd={BW.y1 - 22} sideShade={0.16} />
      {typeof o.rail === "string" && <WallRail y={430} color={o.rail} h={10} />}
      {/* crown molding + baseboard */}
      <rect x={BW.x0} y={BW.y0} width={BW.x1 - BW.x0} height={10} fill={shade(wall, 0.06)} />
      <rect x={BW.x0} y={BW.y1 - 22} width={BW.x1 - BW.x0} height={22} fill={shade(wall, 0.08)} />
      <rect x={BW.x0} y={BW.y1 - 22} width={BW.x1 - BW.x0} height={3} fill="#000" opacity={0.06} />
      {/* floor */}
      {floorType === "wood" && <FloorLines count={22} color="#000" opacity={0.12} />}
      {floorType === "tile" && <FloorLines count={12} color="#fff" opacity={0.35} rows={5} />}
      {floorType === "concrete" && (
        <g>
          <FloorLines count={4} color="#000" opacity={0.1} rows={2} />
          <ellipse cx="700" cy="780" rx="220" ry="40" fill="#000" opacity={0.05} />
        </g>
      )}
      {accent && (
        <g>
          <polygon points="560,660 1040,660 1150,860 450,860" fill={accent} />
          <polygon points="590,672 1010,672 1110,848 490,848" fill="none" stroke="#fff" strokeOpacity={0.25} strokeWidth={3} />
        </g>
      )}
      {windows.map((px, i) => {
        const x = (px / 100) * SCENE_W;
        return (
          <g key={i}>
            <defs>
              <Grad id={`${u}-sky${i}`} stops={evening ? [[0, "#2c3b62"], [100, "#d98a5a"]] : [[0, "#8fbde0"], [100, "#e8eef0"]]} />
              <Grad id={`${u}-beam${i}`} stops={[[0, "#fff8e6", evening ? 0.1 : 0.35], [100, "#fff8e6", 0]]} />
            </defs>
            <rect x={x - 110} y={150} width={220} height={250} fill="#fff" />
            <rect x={x - 100} y={160} width={200} height={230} fill={`url(#${u}-sky${i})`} />
            <path d={`M${x - 100} 330c50-30 90-24 130-8s50 10 70 0v68H${x - 100}z`} fill={evening ? "#2b3a3a" : "#9ab58a"} opacity={0.8} />
            <path d={`M${x} 160V390M${x - 100} 275H${x + 100}`} stroke="#fff" strokeWidth={8} />
            <rect x={x - 124} y={398} width={248} height={12} fill="#fff" />
            <polygon points={`${x - 100},410 ${x + 100},410 ${x + 240},${BW.y1 + 200} ${x - 20},${BW.y1 + 200}`} fill={`url(#${u}-beam${i})`} />
          </g>
        );
      })}
      {/* ceiling light */}
      <LightPool u={u} k="amb" cx={800} cy={400} rx={900} ry={500} color={evening ? "#ffc68a" : "#fff6e0"} opacity={evening ? 0.22 : 0.18} />
      <Vignette u={u} strength={evening ? 0.5 : 0.28} />
    </g>
  );
};

const garage: BackdropRenderer = (u, o) => (
  <g>
    <RoomShell u={u} wall="#b9b4ab" wallDark="#a29d94" side="#8c877f" ceiling="#9c978e" floor="#8e8c88" floorDark="#6f6d69" />
    <Wallpaper u={u} o={o} sideShade={0.25} />
    <g stroke="#000" strokeOpacity={0.08} strokeWidth={2}>
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={i} x1={BW.x0} x2={BW.x1} y1={BW.y0 + 34 * (i + 1)} y2={BW.y0 + 34 * (i + 1)} />
      ))}
    </g>
    <rect x="520" y="140" width="560" height="480" fill="#d8d4cc" />
    <g stroke="#b2ada4" strokeWidth={4}>
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={i} x1={520} x2={1080} y1={140 + 68 * (i + 1)} y2={140 + 68 * (i + 1)} />
      ))}
    </g>
    <rect x="520" y="140" width="560" height="480" fill="none" stroke="#7b766e" strokeWidth={10} />
    <FloorLines count={4} color="#000" opacity={0.1} rows={2} />
    <ellipse cx="820" cy="800" rx="260" ry="36" fill="#000" opacity={0.06} />
    <rect x="690" y="80" width="220" height="10" rx="5" fill="#fffbe8" />
    <LightPool u={u} k="amb" cx={800} cy={300} rx={700} ry={400} color="#fff9e0" opacity={0.2} />
    <Vignette u={u} strength={0.4} />
  </g>
);

/* ------------------------------------------------------------------ */
/* Garden                                                              */
/* ------------------------------------------------------------------ */

const TIME_PALETTES: Record<string, { sky: string; skyLow: string; sun: string; hill: string; hill2: string; lawn: string; lawnFar: string; hedge: string }> = {
  morning: { sky: "#8dbfe0", skyLow: "#f3ead2", sun: "#fff4cf", hill: "#8fb07e", hill2: "#6f9a64", lawn: "#6f9a52", lawnFar: "#86ad66", hedge: "#3f6b3a" },
  golden: { sky: "#e9b27a", skyLow: "#f7dcae", sun: "#ffe0a0", hill: "#a8a06a", hill2: "#7f8a55", lawn: "#77914a", lawnFar: "#96a55c", hedge: "#44603a" },
  dusk: { sky: "#39426e", skyLow: "#d9907a", sun: "#ffc28a", hill: "#4d5a64", hill2: "#3a4654", lawn: "#3f5a44", lawnFar: "#50684e", hedge: "#27402d" },
  overcast: { sky: "#a9b8c4", skyLow: "#e4e6e2", sun: "#ffffff", hill: "#8ea08c", hill2: "#728872", lawn: "#6a8a5a", lawnFar: "#7e9a6a", hedge: "#3f5e3e" },
};

const garden: BackdropRenderer = (u, o) => {
  const p = TIME_PALETTES[str(o, "time", "morning")] ?? TIME_PALETTES.morning;
  const path = str(o, "path", "gravel");
  const pond = o.pond === true;
  const hedge = o.hedge !== false;
  const trees = o.trees !== false;
  return (
    <g>
      <defs>
        <Grad id={`${u}-sky`} stops={[[0, p.sky], [100, p.skyLow]]} />
        <Grad id={`${u}-lawn`} stops={[[0, p.lawnFar], [100, p.lawn]]} />
        <Grad id={`${u}-water`} stops={[[0, "#9cc9dd"], [100, "#4f8aa8"]]} />
      </defs>
      <rect width={SCENE_W} height={SCENE_H} fill={`url(#${u}-sky)`} />
      <LightPool u={u} k="sun" cx={1180} cy={250} rx={420} ry={300} color={p.sun} opacity={0.8} />
      <circle cx="1180" cy="250" r="54" fill={p.sun} opacity={0.9} />
      <g fill="#fff" opacity={0.45}>
        <ellipse cx="320" cy="150" rx="150" ry="26" />
        <ellipse cx="420" cy="134" rx="90" ry="24" />
        <ellipse cx="900" cy="110" rx="120" ry="20" />
      </g>
      <path d="M0 470c200-90 380-110 560-60s360 40 520-20 360-60 520 10V620H0z" fill={p.hill} />
      <path d="M0 520c240-60 460-50 700-10s520 20 900-40V640H0z" fill={p.hill2} />
      {trees && (
        <g fill={p.hedge} opacity={0.9}>
          {[60, 150, 250, 1320, 1420, 1520].map((x, i) => (
            <g key={x}>
              <rect x={x - 6} y={470} width={12} height={90} fill="#4a3a2a" />
              <ellipse cx={x} cy={440 + (i % 2) * 20} rx={60} ry={80} />
            </g>
          ))}
        </g>
      )}
      <rect x="0" y="560" width={SCENE_W} height="340" fill={`url(#${u}-lawn)`} />
      {str(o, "wp", "") ? (
        <GardenBoundary kind={str(o, "wp", "hedge")} a={str(o, "wpA", p.hedge)} b={str(o, "wpB", "#fff")} c={str(o, "wpC", "#e7a6b8")} />
      ) : (
        hedge && <GardenBoundary kind="hedge" a={p.hedge} b="#fff" c="#fff" />
      )}
      {path === "gravel" && <polygon points="730,594 870,594 1120,900 480,900" fill="#d9ceb5" opacity={0.9} />}
      {path === "stone" && (
        <g fill="#cfc6b4" opacity={0.95}>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const t = i / 5;
            const y = 610 + t * t * 250;
            const w = 60 + t * 180;
            return <ellipse key={i} cx={800 + (i % 2 ? 20 : -20) * t} cy={Math.round(y)} rx={Math.round(w / 2)} ry={Math.round(8 + t * 22)} />;
          })}
        </g>
      )}
      {pond && (
        <g>
          <ellipse cx="800" cy="760" rx="520" ry="110" fill="#3f6a58" opacity={0.6} />
          <ellipse cx="800" cy="756" rx="500" ry="100" fill={`url(#${u}-water)`} />
          <g stroke="#fff" strokeOpacity={0.35} strokeWidth={3} fill="none">
            <path d="M520 740c40-8 80-8 120 0" />
            <path d="M900 790c50-8 100-8 150 0" />
            <path d="M700 820c30-6 60-6 90 0" />
          </g>
          <g fill="#5d8c4c">
            <ellipse cx="620" cy="790" rx="30" ry="9" />
            <ellipse cx="1020" cy="730" rx="26" ry="8" />
            <ellipse cx="760" cy="720" rx="22" ry="7" />
          </g>
          <circle cx="628" cy="784" r="6" fill="#f2c6d6" />
        </g>
      )}
      <g fill={p.hedge} opacity={0.5}>
        {Array.from({ length: 30 }).map((_, i) => (
          <path key={i} d={`M${i * 55 + 10} 900l6-26 6 26z`} />
        ))}
      </g>
      <Vignette u={u} strength={0.35} />
    </g>
  );
};


/** Garden "wallpaper": a distinct boundary along the back of each garden area. */
function GardenBoundary({ kind, a, b, c }: { kind: string; a: string; b: string; c: string }) {
  const W = SCENE_W;
  const n = (step: number) => Array.from({ length: Math.ceil(W / step) + 1 }, (_, i) => i * step);
  switch (kind) {
    case "picket":
      return (
        <g>
          <rect x="0" y="548" width={W} height="10" fill={b} />
          <rect x="0" y="574" width={W} height="10" fill={b} />
          {n(34).map((x) => (
            <path key={x} d={`M${x} 600V522l10-14 10 14v78z`} fill={a} />
          ))}
          <rect x="0" y="590" width={W} height="10" fill="#000" opacity={0.08} />
        </g>
      );
    case "brick":
      return (
        <g>
          <rect x="0" y="486" width={W} height="112" fill={a} />
          {Array.from({ length: 7 }, (_, r) => (
            <g key={r}>
              <line x1="0" x2={W} y1={486 + r * 16} y2={486 + r * 16} stroke={b} strokeWidth={2} />
              {n(48).map((x) => (
                <line key={x} x1={x + (r % 2) * 24} x2={x + (r % 2) * 24} y1={486 + r * 16} y2={502 + r * 16} stroke={b} strokeWidth={2} />
              ))}
            </g>
          ))}
          <rect x="0" y="478" width={W} height="10" fill={shade(a, -0.25)} />
          {n(210).map((x, i) => (
            <g key={x} fill={c}>
              <ellipse cx={x + 40} cy={492} rx={46} ry={16} />
              <ellipse cx={x + 22} cy={516 + (i % 3) * 10} rx={16} ry={26} />
              <ellipse cx={x + 70} cy={506} rx={20} ry={14} opacity={0.8} />
            </g>
          ))}
        </g>
      );
    case "balustrade":
      return (
        <g>
          <rect x="0" y="512" width={W} height="14" fill={a} />
          <rect x="0" y="526" width={W} height="4" fill={b} opacity={0.5} />
          {n(36).map((x) => (
            <path key={x} d={`M${x + 8} 530c-8 12 8 20 0 34 4 10 6 18 0 26h20c-6-8-4-16 0-26-8-14 8-22 0-34z`} fill={a} />
          ))}
          <rect x="0" y="588" width={W} height="10" fill={shade(a, -0.15)} />
          {n(360).map((x) => (
            <g key={x}>
              <rect x={x} y="500" width="30" height="98" fill={shade(a, -0.08)} />
              <ellipse cx={x + 15} cy={496} rx={14} ry={9} fill={c} />
            </g>
          ))}
        </g>
      );
    case "bamboo":
      return (
        <g>
          {n(17).map((x, i) => (
            <g key={x}>
              <rect x={x} y={440 + (i % 5) * 8} width="14" height={160 - (i % 5) * 8} rx="3" fill={i % 3 ? a : shade(a, -0.15)} />
              <rect x={x} y={500 + (i % 4) * 6} width="14" height="3" fill={b} />
              <rect x={x} y={548 - (i % 3) * 5} width="14" height="3" fill={b} />
            </g>
          ))}
          <rect x="0" y="520" width={W} height="4" fill={c} />
          <rect x="0" y="566" width={W} height="4" fill={c} />
        </g>
      );
    case "trellis":
      return (
        <g>
          <rect x="0" y="470" width={W} height="126" fill={shade(a, -0.1)} />
          <g stroke={b} strokeWidth={4} opacity={0.9}>
            {n(60).map((x) => (
              <g key={x}>
                <line x1={x} y1={470} x2={x + 126} y2={596} />
                <line x1={x} y1={470} x2={x - 126} y2={596} />
              </g>
            ))}
          </g>
          <rect x="0" y="464" width={W} height="8" fill={b} />
          {n(46).map((x, i) => (
            <circle key={x} cx={x + 12} cy={486 + ((i * 37) % 96)} r={6} fill={c} />
          ))}
        </g>
      );
    case "stonewall":
      return (
        <g>
          <rect x="0" y="500" width={W} height="98" fill={shade(a, -0.2)} />
          {Array.from({ length: 4 }, (_, r) =>
            n(56).map((x) => (
              <ellipse key={`${r}-${x}`} cx={x + (r % 2) * 28} cy={512 + r * 24} rx={27} ry={12} fill={(x / 56 + r) % 3 ? a : b} />
            )),
          )}
          <path d={`M0 500h${W}`} stroke={c} strokeWidth={10} />
        </g>
      );
    case "lavender":
      return (
        <g>
          {n(64).map((x, i) => (
            <g key={x}>
              <ellipse cx={x + 32} cy={584} rx={42} ry={22} fill={a} />
              <ellipse cx={x + 32} cy={560 - (i % 2) * 6} rx={34} ry={20} fill={c} />
              <ellipse cx={x + 24} cy={552 - (i % 2) * 6} rx={10} ry={6} fill={b} opacity={0.6} />
            </g>
          ))}
        </g>
      );
    case "topiaryrow":
      return (
        <g>
          <rect x="0" y="560" width={W} height="36" rx="14" fill={a} />
          {n(150).map((x) => (
            <g key={x}>
              <rect x={x + 71} y={490} width="8" height="72" fill="#5a3d28" />
              <circle cx={x + 75} cy={496} r={32} fill={a} />
              <circle cx={x + 66} cy={486} r={10} fill={b} opacity={0.25} />
              <circle cx={x + 75} cy={462} r={6} fill={c} />
            </g>
          ))}
        </g>
      );
    case "maze":
      return (
        <g>
          <rect x="0" y="470" width={W} height="126" fill={a} />
          {[260, 800, 1340].map((x) => (
            <path key={x} d={`M${x - 46} 596V526a46 46 0 0 1 92 0V596z`} fill={shade(a, -0.45)} />
          ))}
          <rect x="0" y="470" width={W} height="16" fill={b} opacity={0.12} />
          {n(90).map((x, i) => (
            <circle key={x} cx={x + 20} cy={482 + (i % 3) * 30} r={4} fill={c} />
          ))}
        </g>
      );
    default:
      return (
        <g>
          <rect x="0" y="540" width={W} height="54" rx="20" fill={a} />
          <rect x="0" y="540" width={W} height="14" rx="7" fill={b} opacity={0.08} />
        </g>
      );
  }
}

const greenhouse: BackdropRenderer = (u, o) => {
  const base = garden(u + "g", { ...o, hedge: false, trees: true, path: "stone" });
  return (
    <g>
      {base}
      <rect width={SCENE_W} height={SCENE_H} fill="#dff2e6" opacity={0.18} />
      <g stroke="#f3f7f2" strokeOpacity={0.85} strokeWidth={10} fill="none">
        <path d="M0 260Q800 -120 1600 260" />
        <path d="M0 260V900M1600 260V900" />
        {[200, 400, 600, 800, 1000, 1200, 1400].map((x) => {
          const y = Math.round(260 - Math.sin((x / 1600) * Math.PI) * 190);
          return <line key={x} x1={x} y1={Math.round(y)} x2={x} y2={600} />;
        })}
        <line x1="0" y1="600" x2={SCENE_W} y2="600" />
        <line x1="0" y1="420" x2={SCENE_W} y2="420" strokeWidth={5} />
      </g>
      <rect x="0" y="600" width={SCENE_W} height="30" fill="#8d6e55" />
      <rect x="0" y="600" width={SCENE_W} height="6" fill="#a88a6e" />
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* Space station                                                       */
/* ------------------------------------------------------------------ */

const station: BackdropRenderer = (u, o) => {
  const accent = str(o, "accent", "#5ce1e6");
  const wall = str(o, "wall", "#2a3342");
  const viewport = str(o, "viewport", "wide");
  const planet = str(o, "planet", "");
  const stars = Array.from({ length: 70 }).map((_, i) => ({
    x: Math.round((i * 137.5) % 1600),
    y: Math.round((i * 71.3) % 900),
    r: (i % 5 === 0 ? 2.2 : 1.2),
  }));
  const port =
    viewport === "wide"
      ? { x: 420, y: 150, w: 760, h: 300, rx: 40 }
      : viewport === "panorama"
        ? { x: 190, y: 110, w: 1220, h: 420, rx: 30 }
        : viewport === "round"
          ? { x: 660, y: 150, w: 280, h: 280, rx: 140 }
          : null;
  return (
    <g>
      <RoomShell u={u} wall={wall} wallDark={shade(wall, -0.3)} side={shade(wall, -0.4)} ceiling={shade(wall, -0.55)} floor={shade(wall, -0.2)} floorDark={shade(wall, -0.5)} />
      <Wallpaper u={u} o={o} sideShade={0.45} />
      {/* wall panels */}
      <g fill="#fff" opacity={0.04}>
        {Array.from({ length: 8 }).map((_, i) =>
          Array.from({ length: 3 }).map((_, j) => (
            <rect key={`${i}-${j}`} x={BW.x0 + 12 + i * 159} y={BW.y0 + 14 + j * 178} width={147} height={166} rx={10} />
          )),
        )}
      </g>
      {port && (
        <g>
          <clipPath id={`${u}-port`}>
            <rect x={port.x} y={port.y} width={port.w} height={port.h} rx={port.rx} />
          </clipPath>
          <rect x={port.x - 14} y={port.y - 14} width={port.w + 28} height={port.h + 28} rx={port.rx + 12} fill={shade(wall, 0.25)} />
          <g clipPath={`url(#${u}-port)`}>
            <rect x={port.x} y={port.y} width={port.w} height={port.h} fill="#050812" />
            {stars.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={0.8} className={i % 7 === 0 ? "animate-twinkle" : undefined} style={i % 7 === 0 ? { animationDelay: `${(i % 5) * 0.6}s` } : undefined} />
            ))}
            <LightPool u={u} k="neb" cx={port.x + port.w * 0.3} cy={port.y + port.h * 0.4} rx={port.w * 0.5} ry={port.h * 0.5} color="#7b5cff" opacity={0.35} />
            {planet && (
              <g>
                <circle cx={port.x + port.w * 0.72} cy={port.y + port.h * 0.95} r={port.h * 0.75} fill={planet} />
                <circle cx={port.x + port.w * 0.72} cy={port.y + port.h * 0.95} r={port.h * 0.75} fill="none" stroke="#fff" strokeOpacity={0.25} strokeWidth={8} />
                <ellipse cx={port.x + port.w * 0.62} cy={port.y + port.h * 0.7} rx={port.h * 0.3} ry={port.h * 0.08} fill="#fff" opacity={0.18} />
              </g>
            )}
          </g>
          <rect x={port.x} y={port.y} width={port.w} height={port.h} rx={port.rx} fill="none" stroke={accent} strokeOpacity={0.35} strokeWidth={2} />
        </g>
      )}
      {/* accent light strips */}
      <rect x={BW.x0} y={BW.y1 - 8} width={BW.x1 - BW.x0} height={4} fill={accent} opacity={0.8} />
      <rect x={BW.x0} y={BW.y0 + 4} width={BW.x1 - BW.x0} height={3} fill={accent} opacity={0.5} />
      <line x1={BW.x0} y1={BW.y1} x2={0} y2={SCENE_H} stroke={accent} strokeOpacity={0.5} strokeWidth={3} />
      <line x1={BW.x1} y1={BW.y1} x2={SCENE_W} y2={SCENE_H} stroke={accent} strokeOpacity={0.5} strokeWidth={3} />
      <FloorLines count={14} color="#fff" opacity={0.05} rows={4} />
      <LightPool u={u} k="floor" cx={800} cy={720} rx={620} ry={170} color={accent} opacity={0.12} />
      <g fill="#fff" opacity={0.7}>
        <rect x="560" y="22" width="480" height="8" rx="4" />
      </g>
      <LightPool u={u} k="ceil" cx={800} cy={40} rx={500} ry={120} color="#dff8ff" opacity={0.18} />
      <Vignette u={u} strength={0.55} />
    </g>
  );
};


/* ------------------------------------------------------------------ */
/* Close-up interiors (inside containers)                              */
/* ------------------------------------------------------------------ */

/** Shelving close-up: bookshelves, potion cabinets, fridges, lockers. */
const interiorShelf: BackdropRenderer = (u, o) => {
  const style = str(o, "style", "wood");
  const glassy = style === "fridge" || style === "glass";
  const wood = str(o, "wood", style === "metal" ? "#8e98a6" : glassy ? "#f3f5f7" : "#5e3c27");
  const back = str(o, "back", style === "fridge" ? "#e8eef2" : style === "glass" ? "#e4f0ec" : "#2a1a10");
  const glow = str(o, "glow", "");
  const shelves = list(o, "shelves").length ? list(o, "shelves") : [300, 560, 820];
  const wp = str(o, "wp", "");
  return (
    <g>
      <defs>
        {wp && <WallpaperDef id={`${u}-wp`} pattern={wp} a={str(o, "wpA", back)} b={str(o, "wpB", back)} c={str(o, "wpC", back)} scale={1.4} />}
        <Grad id={`${u}-under`} stops={[[0, "#000", 0.45], [100, "#000", 0]]} />
        <Grad id={`${u}-side`} x2={1} y2={0} stops={[[0, shade(wood, -0.25)], [100, wood]]} />
      </defs>
      <rect width={SCENE_W} height={SCENE_H} fill={back} />
      {wp && <rect width={SCENE_W} height={SCENE_H} fill={`url(#${u}-wp)`} opacity={0.85} />}
      {style === "fridge" && <LightPool u={u} k="cold" cx={800} cy={40} rx={800} ry={260} color="#dff4ff" opacity={0.9} />}
      {glow && <LightPool u={u} k="glow" cx={800} cy={420} rx={760} ry={420} color={glow} opacity={0.28} />}
      {shelves.map((y, i) => (
        <g key={i}>
          <rect x="0" y={y + 22} width={SCENE_W} height="70" fill={`url(#${u}-under)`} />
          {glassy ? (
            <g>
              <rect x="80" y={y} width={SCENE_W - 160} height="16" fill="#cfe9f5" opacity={0.55} />
              <rect x="80" y={y} width={SCENE_W - 160} height="4" fill="#fff" opacity={0.9} />
            </g>
          ) : (
            <g>
              <rect x="0" y={y} width={SCENE_W} height="24" fill={wood} />
              <rect x="0" y={y} width={SCENE_W} height="5" fill={shade(wood, 0.18)} />
              {style === "metal" && Array.from({ length: 30 }, (_, k) => <circle key={k} cx={40 + k * 52} cy={y + 14} r={4} fill={shade(wood, -0.4)} />)}
            </g>
          )}
        </g>
      ))}
      {style === "metal" && (
        <g>
          <rect x="120" y="58" width={SCENE_W - 240} height="8" rx="4" fill={shade(wood, 0.1)} />
          {[360, 800, 1240].map((x) => (
            <path key={x} d={`M${x} 66v26a14 14 0 0 1-14 14`} stroke={shade(wood, 0.15)} strokeWidth={6} fill="none" />
          ))}
          {Array.from({ length: 9 }, (_, k) => (
            <rect key={k} x={620 + k * 40} y="20" width="22" height="6" rx="3" fill={shade(back, 0.2)} />
          ))}
        </g>
      )}
      <rect x="0" y="0" width="90" height={SCENE_H} fill={`url(#${u}-side)`} />
      <rect x={SCENE_W - 90} y="0" width="90" height={SCENE_H} fill={shade(wood, -0.2)} />
      <rect x="0" y="0" width={SCENE_W} height="40" fill={shade(wood, -0.1)} />
      <Vignette u={u} strength={style === "fridge" ? 0.25 : 0.55} />
    </g>
  );
};

/** Open wardrobe: lined back, hanging rail, hat shelf and shoe shelf. */
const interiorWardrobe: BackdropRenderer = (u, o) => {
  const wood = str(o, "wood", "#c89b6d");
  const back = str(o, "back", "#e9dfd0");
  const wp = str(o, "wp", "");
  return (
    <g>
      <defs>
        {wp && <WallpaperDef id={`${u}-wp`} pattern={wp} a={str(o, "wpA", back)} b={str(o, "wpB", back)} c={str(o, "wpC", back)} scale={1.2} />}
        <Grad id={`${u}-under`} stops={[[0, "#000", 0.4], [100, "#000", 0]]} />
      </defs>
      <rect width={SCENE_W} height={SCENE_H} fill={back} />
      {wp && <rect x="140" y="0" width={SCENE_W - 280} height={SCENE_H} fill={`url(#${u}-wp)`} />}
      <LightPool u={u} k="lamp" cx={800} cy={60} rx={700} ry={300} color="#fff6dc" opacity={0.45} />
      {/* hat shelf */}
      <rect x="140" y="150" width={SCENE_W - 280} height="60" fill={`url(#${u}-under)`} />
      <rect x="140" y="130" width={SCENE_W - 280} height="22" fill={wood} />
      <rect x="140" y="130" width={SCENE_W - 280} height="5" fill={shade(wood, 0.2)} />
      {/* rail */}
      <rect x="140" y="198" width={SCENE_W - 280} height="12" rx="6" fill="#c9a25a" />
      <rect x="140" y="198" width={SCENE_W - 280} height="4" rx="2" fill="#f0d99a" />
      {/* shoe shelf */}
      <rect x="140" y="838" width={SCENE_W - 280} height="62" fill={shade(wood, -0.25)} />
      <rect x="140" y="826" width={SCENE_W - 280} height="16" fill={wood} />
      {/* frame + open doors */}
      <rect x="110" y="0" width="34" height={SCENE_H} fill={shade(wood, -0.15)} />
      <rect x={SCENE_W - 144} y="0" width="34" height={SCENE_H} fill={shade(wood, -0.15)} />
      <polygon points={`0,0 110,40 110,${SCENE_H - 40} 0,${SCENE_H}`} fill={shade(wood, -0.05)} />
      <polygon points={`${SCENE_W},0 ${SCENE_W - 110},40 ${SCENE_W - 110},${SCENE_H - 40} ${SCENE_W},${SCENE_H}`} fill={shade(wood, -0.05)} />
      <rect x="40" y="380" width="10" height="120" rx="5" fill="#2f3237" />
      <rect x={SCENE_W - 50} y="380" width="10" height="120" rx="5" fill="#2f3237" />
      <rect x="0" y="0" width={SCENE_W} height="34" fill={shade(wood, -0.2)} />
      <Vignette u={u} strength={0.35} />
    </g>
  );
};

/** Looking down into an open case: chests, toolboxes, medkits. */
const interiorCase: BackdropRenderer = (u, o) => {
  const shell = str(o, "shell", "#6b4428");
  const lining = str(o, "lining", "#6d1a26");
  const table = str(o, "table", "#2a211b");
  const trim = str(o, "trim", "#c9a25a");
  return (
    <g>
      <defs>
        <pattern id={`${u}-quilt`} width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="80" height="80" fill={lining} />
          <path d="M0 40L40 0 80 40 40 80z" fill="none" stroke="#000" strokeOpacity={0.18} strokeWidth={2} />
          <circle cx="40" cy="0" r="3" fill="#000" opacity={0.2} />
          <circle cx="0" cy="40" r="3" fill="#000" opacity={0.2} />
        </pattern>
        <Grad id={`${u}-lid`} stops={[[0, shade(lining, -0.4)], [100, lining]]} />
      </defs>
      <rect width={SCENE_W} height={SCENE_H} fill={table} />
      {/* raised lid */}
      <polygon points="150,190 1450,190 1380,20 220,20" fill={shade(shell, -0.1)} />
      <polygon points="190,180 1410,180 1350,44 250,44" fill={`url(#${u}-lid)`} />
      {/* box */}
      <rect x="90" y="180" width={SCENE_W - 180} height="690" rx="26" fill={shell} />
      <rect x="130" y="216" width={SCENE_W - 260} height="622" rx="14" fill={`url(#${u}-quilt)`} />
      <rect x="130" y="216" width={SCENE_W - 260} height="40" fill="#000" opacity={0.22} />
      <rect x="130" y="216" width="40" height="622" fill="#000" opacity={0.12} />
      <rect x="90" y="180" width={SCENE_W - 180} height="690" rx="26" fill="none" stroke={trim} strokeWidth={8} />
      <LightPool u={u} k="shine" cx={800} cy={520} rx={700} ry={360} color="#fff2d0" opacity={0.18} />
      <Vignette u={u} strength={0.45} />
    </g>
  );
};

/** Potting bench: pegboard wall above a wooden work surface. */
const interiorBench: BackdropRenderer = (u, o) => {
  const board = str(o, "board", "#c8b996");
  const wood = str(o, "wood", "#9c7148");
  return (
    <g>
      <defs>
        <pattern id={`${u}-peg`} width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill={board} />
          <circle cx="20" cy="20" r="4" fill={shade(board, -0.4)} />
        </pattern>
        <Grad id={`${u}-top`} stops={[[0, shade(wood, -0.2)], [100, wood]]} />
      </defs>
      <rect width={SCENE_W} height="440" fill={`url(#${u}-peg)`} />
      <LightPool u={u} k="win" cx={1250} cy={120} rx={500} ry={260} color="#fff6d6" opacity={0.5} />
      <rect x="0" y="420" width={SCENE_W} height="30" fill={shade(wood, -0.3)} />
      <polygon points={`0,450 ${SCENE_W},450 ${SCENE_W},${SCENE_H} 0,${SCENE_H}`} fill={`url(#${u}-top)`} />
      <g stroke={shade(wood, -0.3)} strokeWidth={3} opacity={0.6}>
        {[560, 690, 830].map((y) => (
          <line key={y} x1="0" y1={y} x2={SCENE_W} y2={y} />
        ))}
      </g>
      <Vignette u={u} strength={0.4} />
    </g>
  );
};

/** Top-down tabletop with a cloth runner: feasts, games. */
const interiorTable: BackdropRenderer = (u, o) => {
  const wood = str(o, "wood", "#6b4428");
  const cloth = str(o, "cloth", "#e8dcc2");
  const trim = str(o, "trim", "#8e2433");
  return (
    <g>
      <defs>
        <pattern id={`${u}-planks`} width="1600" height="110" patternUnits="userSpaceOnUse">
          <rect width="1600" height="110" fill={wood} />
          <path d="M0 108H1600" stroke="#000" strokeOpacity={0.25} strokeWidth={4} />
          <path d="M200 30c200 10 400-10 600 6M900 70c200-8 400 8 600-4" stroke="#000" strokeOpacity={0.1} strokeWidth={3} fill="none" />
        </pattern>
      </defs>
      <rect width={SCENE_W} height={SCENE_H} fill={`url(#${u}-planks)`} />
      <rect x="120" y="120" width={SCENE_W - 240} height="700" rx="10" fill={cloth} />
      <rect x="150" y="150" width={SCENE_W - 300} height="640" rx="6" fill="none" stroke={trim} strokeWidth={10} />
      <rect x="170" y="170" width={SCENE_W - 340} height="600" rx="4" fill="none" stroke={trim} strokeOpacity={0.4} strokeWidth={3} />
      <LightPool u={u} k="candle" cx={800} cy={420} rx={760} ry={420} color="#ffd9a0" opacity={0.3} />
      <Vignette u={u} strength={0.55} />
    </g>
  );
};

/** Looking down into a crate, barrel, cart or basket (straw or wicker lining). */
const interiorCrate: BackdropRenderer = (u, o) => {
  const wood = str(o, "wood", "#8a5f3c");
  const fill = str(o, "fill", "straw");
  const round = o.round === true;
  return (
    <g>
      <defs>
        <pattern id={`${u}-straw`} width="60" height="30" patternUnits="userSpaceOnUse">
          <rect width="60" height="30" fill="#d8b456" />
          <path d="M0 8l30 6M20 24l36-8M4 20l16-14M40 4l18 10" stroke="#b8923a" strokeWidth={3} />
        </pattern>
        <pattern id={`${u}-weave`} width="48" height="48" patternUnits="userSpaceOnUse">
          <rect width="48" height="48" fill="#c9954a" />
          <path d="M0 12h24M24 36h24" stroke="#a8743a" strokeWidth={10} />
          <path d="M36 0v24M12 24v24" stroke="#b8844a" strokeWidth={10} />
        </pattern>
        <pattern id={`${u}-boards`} width="160" height="900" patternUnits="userSpaceOnUse">
          <rect width="160" height="900" fill={shade(wood, -0.15)} />
          <path d="M158 0v900" stroke="#000" strokeOpacity={0.3} strokeWidth={4} />
        </pattern>
      </defs>
      <rect width={SCENE_W} height={SCENE_H} fill={shade(wood, -0.55)} />
      {round ? (
        <g>
          <ellipse cx="800" cy="470" rx="760" ry="430" fill={wood} />
          <ellipse cx="800" cy="470" rx="700" ry="380" fill="none" stroke="#2d2926" strokeWidth={22} />
          <ellipse cx="800" cy="480" rx="660" ry="350" fill={fill === "weave" ? `url(#${u}-weave)` : fill === "boards" ? `url(#${u}-boards)` : `url(#${u}-straw)`} />
        </g>
      ) : (
        <g>
          <rect x="40" y="40" width={SCENE_W - 80} height={SCENE_H - 60} rx="12" fill={wood} />
          <rect x="100" y="100" width={SCENE_W - 200} height={SCENE_H - 170} rx="6" fill={fill === "weave" ? `url(#${u}-weave)` : fill === "boards" ? `url(#${u}-boards)` : `url(#${u}-straw)`} />
          <rect x="100" y="100" width={SCENE_W - 200} height="50" fill="#000" opacity={0.25} />
          <path d={`M40 60H${SCENE_W - 40}M40 ${SCENE_H - 40}H${SCENE_W - 40}`} stroke={shade(wood, 0.2)} strokeWidth={10} />
        </g>
      )}
      <Vignette u={u} strength={0.5} />
    </g>
  );
};

/** An opened drawer seen from above: felt lining and dividers. */
const interiorDrawer: BackdropRenderer = (u, o) => {
  const wood = str(o, "wood", "#8a5a3b");
  const felt = str(o, "felt", "#2f4863");
  return (
    <g>
      <rect width={SCENE_W} height={SCENE_H} fill={shade(wood, -0.5)} />
      <polygon points={`60,40 ${SCENE_W - 60},40 ${SCENE_W - 20},${SCENE_H} 20,${SCENE_H}`} fill={wood} />
      <polygon points={`130,100 ${SCENE_W - 130},100 ${SCENE_W - 100},${SCENE_H - 40} 100,${SCENE_H - 40}`} fill={felt} />
      <polygon points={`130,100 ${SCENE_W - 130},100 ${SCENE_W - 140},150 140,150`} fill="#000" opacity={0.25} />
      <path d={`M${SCENE_W / 2} 100L${SCENE_W / 2} ${SCENE_H - 40}M115 470H${SCENE_W - 115}`} stroke={wood} strokeWidth={18} />
      <rect x={SCENE_W / 2 - 90} y={SCENE_H - 40} width="180" height="24" rx="12" fill="#c9a25a" />
      <LightPool u={u} k="l" cx={800} cy={360} rx={760} ry={380} color="#fff6dc" opacity={0.15} />
      <Vignette u={u} strength={0.45} />
    </g>
  );
};

/** A woven bird's nest from above. */
const interiorNest: BackdropRenderer = (u) => (
  <g>
    <rect width={SCENE_W} height={SCENE_H} fill="#3a2a1c" />
    <LightPool u={u} k="sky" cx={800} cy={0} rx={900} ry={300} color="#fff1c9" opacity={0.35} />
    <ellipse cx="800" cy="470" rx="760" ry="420" fill="#6b4a2b" />
    <g fill="none" strokeLinecap="round">
      {Array.from({ length: 60 }).map((_, i) => {
        const a = (i / 60) * Math.PI * 2;
        const r1 = 560 + (i % 5) * 30;
        const x1 = Math.round(800 + Math.cos(a) * r1);
        const y1 = Math.round(470 + Math.sin(a) * r1 * 0.55);
        const x2 = Math.round(800 + Math.cos(a + 0.5) * (r1 + 120));
        const y2 = Math.round(470 + Math.sin(a + 0.5) * (r1 + 120) * 0.55);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i % 2 ? "#8a6a44" : "#5e3c27"} strokeWidth={10} />;
      })}
    </g>
    <ellipse cx="800" cy="480" rx="580" ry="310" fill="#c9a86a" />
    <ellipse cx="800" cy="480" rx="580" ry="310" fill="none" stroke="#8a6a44" strokeWidth={30} strokeDasharray="40 20" />
    <g stroke="#b8945e" strokeWidth={4} opacity={0.7}>
      {Array.from({ length: 30 }).map((_, i) => (
        <line key={i} x1={300 + ((i * 131) % 1000)} y1={260 + ((i * 71) % 420)} x2={380 + ((i * 131) % 1000)} y2={250 + ((i * 97) % 420)} />
      ))}
    </g>
    <Vignette u={u} strength={0.5} />
  </g>
);

/** Underwater: pond / fountain basin / specimen tank. */
const interiorWater: BackdropRenderer = (u, o) => {
  const top = str(o, "top", "#7ec8e3");
  const deep = str(o, "deep", "#1f5a7a");
  const floor = str(o, "floor", "#c9b48a");
  return (
    <g>
      <defs>
        <Grad id={`${u}-w`} stops={[[0, top], [100, deep]]} />
        <Grad id={`${u}-ray`} stops={[[0, "#fff", 0.35], [100, "#fff", 0]]} />
      </defs>
      <rect width={SCENE_W} height={SCENE_H} fill={`url(#${u}-w)`} />
      {[300, 700, 1100, 1400].map((x, i) => (
        <polygon key={x} points={`${x},0 ${x + 90},0 ${x + 260 - i * 30},${SCENE_H} ${x + 120 - i * 30},${SCENE_H}`} fill={`url(#${u}-ray)`} />
      ))}
      <path d="M0 800c200-40 400 20 600-10s500-30 1000 10V900H0z" fill={floor} />
      <g fill="#4f8a4a" opacity={0.85}>
        <path d="M120 900c-20-120 30-220 0-340 40 100 60 220 30 340z" />
        <path d="M180 900c20-100-20-180 20-280 20 90 10 200-10 280z" />
        <path d="M1460 900c-30-140 40-240 0-380 50 120 70 250 30 380z" />
        <path d="M1380 900c10-90-20-160 10-240 20 80 20 170 0 240z" />
      </g>
      <g fill="#fff" opacity={0.5}>
        {[
          [400, 300, 8],
          [420, 250, 5],
          [1000, 400, 7],
          [1010, 350, 4],
          [760, 180, 6],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="none" stroke="#fff" strokeWidth={2} />
        ))}
      </g>
      <Vignette u={u} strength={0.45} />
    </g>
  );
};

/** Inside a beehive: honeycomb walls. */
const interiorHive: BackdropRenderer = (u) => (
  <g>
    <defs>
      <pattern id={`${u}-comb`} width="104" height="180" patternUnits="userSpaceOnUse">
        <rect width="104" height="180" fill="#b8751a" />
        <path d="M52 0l52 30v60l-52 30L0 90V30zM0 90v60l52 30M104 90v60l-52 30" fill="#e8a820" stroke="#8a5a14" strokeWidth={6} />
        <path d="M52 20l34 20v40l-34 20-34-20V40z" fill="#f2c230" opacity={0.6} />
      </pattern>
    </defs>
    <rect width={SCENE_W} height={SCENE_H} fill={`url(#${u}-comb)`} />
    <LightPool u={u} k="glow" cx={800} cy={420} rx={760} ry={420} color="#fff1c9" opacity={0.35} />
    <Vignette u={u} strength={0.6} />
  </g>
);

/** Holographic archive: dark grid with projector pads. */
const interiorHolo: BackdropRenderer = (u, o) => {
  const color = str(o, "color", "#5ce1e6");
  return (
    <g>
      <rect width={SCENE_W} height={SCENE_H} fill="#070b14" />
      <g stroke={color} strokeOpacity={0.12} strokeWidth={2}>
        {Array.from({ length: 17 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 100} y1={0} x2={i * 100} y2={SCENE_H} />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 100} x2={SCENE_W} y2={i * 100} />
        ))}
      </g>
      <ellipse cx="800" cy="860" rx="700" ry="60" fill={color} opacity={0.08} />
      <ellipse cx="800" cy="860" rx="700" ry="60" fill="none" stroke={color} strokeOpacity={0.5} strokeWidth={3} />
      <LightPool u={u} k="h" cx={800} cy={450} rx={760} ry={420} color={color} opacity={0.15} />
      <Vignette u={u} strength={0.55} />
    </g>
  );
};

/** Inside an oven: glowing element, two racks. */
const interiorOven: BackdropRenderer = (u) => (
  <g>
    <rect width={SCENE_W} height={SCENE_H} fill="#16100c" />
    <rect x="80" y="60" width={SCENE_W - 160} height={SCENE_H - 100} rx="30" fill="#2a1d16" />
    <LightPool u={u} k="heat" cx={800} cy={860} rx={900} ry={420} color="#ff7a2a" opacity={0.55} />
    <LightPool u={u} k="top" cx={800} cy={90} rx={700} ry={140} color="#ffb05a" opacity={0.35} />
    <path d="M160 110H1440" stroke="#ff8a3a" strokeWidth={10} strokeLinecap="round" opacity={0.8} />
    {[420, 780].map((y) => (
      <g key={y}>
        <rect x="120" y={y} width={SCENE_W - 240} height="10" rx="5" fill="#8e969f" />
        {Array.from({ length: 24 }).map((_, i) => (
          <rect key={i} x={140 + i * 55} y={y - 36} width="4" height="46" fill="#6f777f" />
        ))}
      </g>
    ))}
    <Vignette u={u} strength={0.6} />
  </g>
);

/** A bank-vault interior with safe-deposit drawers and lit shelves. */
const interiorSafe: BackdropRenderer = (u) => (
  <g>
    <rect width={SCENE_W} height={SCENE_H} fill="#3a3f46" />
    <g>
      {Array.from({ length: 16 }).map((_, c) =>
        Array.from({ length: 2 }).map((_, r) => (
          <g key={`${c}${r}`}>
            <rect x={20 + c * 98} y={20 + r * 60} width="90" height="52" rx="4" fill="#8e969f" />
            <rect x={55 + c * 98} y={40 + r * 60} width="20" height="10" rx="3" fill="#d6a84a" />
          </g>
        )),
      )}
    </g>
    {[400, 700].map((y) => (
      <g key={y}>
        <rect x="0" y={y} width={SCENE_W} height="24" fill="#6f777f" />
        <rect x="0" y={y} width={SCENE_W} height="5" fill="#b9c0c7" />
        <rect x="0" y={y + 24} width={SCENE_W} height="60" fill="#000" opacity={0.25} />
      </g>
    ))}
    <rect x="0" y="780" width={SCENE_W} height="120" fill="#2a2e34" />
    <LightPool u={u} k="gold" cx={800} cy={500} rx={760} ry={380} color="#ffd98a" opacity={0.25} />
    <Vignette u={u} strength={0.6} />
  </g>
);

/** A hollow inside a tree trunk. */
const interiorHollow: BackdropRenderer = (u) => (
  <g>
    <rect width={SCENE_W} height={SCENE_H} fill="#4a3322" />
    <g stroke="#3a2618" strokeWidth={14} fill="none" opacity={0.7}>
      {Array.from({ length: 14 }).map((_, i) => (
        <path key={i} d={`M${i * 120} 0c${40 - (i % 3) * 30} 300 ${-30 + (i % 2) * 60} 600 ${10} 900`} />
      ))}
    </g>
    <ellipse cx="800" cy="470" rx="700" ry="400" fill="#2a1a10" />
    <ellipse cx="800" cy="500" rx="640" ry="340" fill="#6b4a2b" />
    <path d="M160 640c200-60 1080-60 1280 0v200H160z" fill="#8a6a44" />
    <g fill="#c9a86a" opacity={0.6}>
      {Array.from({ length: 40 }).map((_, i) => (
        <ellipse key={i} cx={220 + ((i * 97) % 1160)} cy={680 + ((i * 53) % 140)} rx="14" ry="4" transform={`rotate(${(i * 37) % 180} ${220 + ((i * 97) % 1160)} ${680 + ((i * 53) % 140)})`} />
      ))}
    </g>
    <LightPool u={u} k="sun" cx={800} cy={120} rx={600} ry={260} color="#fff1c9" opacity={0.35} />
    <Vignette u={u} strength={0.6} />
  </g>
);

/** Inside a canvas mail sack. */
const interiorBag: BackdropRenderer = (u, o) => {
  const canvas = str(o, "canvas", "#b8a47a");
  return (
    <g>
      <rect width={SCENE_W} height={SCENE_H} fill={shade(canvas, -0.55)} />
      <path d="M40 60c200-60 1320-60 1520 0l-60 800c-300 60-1100 60-1400 0z" fill={canvas} />
      <path d="M120 120c200-40 1160-40 1360 0l-50 700c-280 50-980 50-1260 0z" fill={shade(canvas, -0.15)} />
      <g stroke={shade(canvas, -0.3)} strokeWidth={3} opacity={0.5}>
        {Array.from({ length: 30 }).map((_, i) => (
          <line key={i} x1={140 + i * 45} y1={130} x2={170 + i * 42} y2={820} />
        ))}
      </g>
      <path d="M40 60c200-60 1320-60 1520 0" stroke={shade(canvas, -0.4)} strokeWidth={20} fill="none" strokeDasharray="30 18" />
      <LightPool u={u} k="l" cx={800} cy={140} rx={800} ry={300} color="#fff6dc" opacity={0.3} />
      <Vignette u={u} strength={0.55} />
    </g>
  );
};

/* ------------------------------------------------------------------ */

export const BACKDROPS: Record<string, BackdropRenderer> = {
  "castle-interior": castleInterior,
  "castle-exterior": castleExterior,
  "house-interior": houseInterior,
  garage,
  garden,
  greenhouse,
  station,
  "interior-shelf": interiorShelf,
  "interior-wardrobe": interiorWardrobe,
  "interior-case": interiorCase,
  "interior-bench": interiorBench,
  "interior-table": interiorTable,
  "interior-crate": interiorCrate,
  "interior-drawer": interiorDrawer,
  "interior-nest": interiorNest,
  "interior-water": interiorWater,
  "interior-hive": interiorHive,
  "interior-holo": interiorHolo,
  "interior-oven": interiorOven,
  "interior-safe": interiorSafe,
  "interior-hollow": interiorHollow,
  "interior-bag": interiorBag,
};

export function renderBackdrop(spec: BackdropSpec, u: string): ReactNode {
  const r = BACKDROPS[spec.kind] ?? BACKDROPS["castle-interior"];
  return r(u, spec.options ?? {});
}
