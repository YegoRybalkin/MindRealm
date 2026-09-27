import type { ReactNode } from "react";
import type { BackdropSpec } from "@/lib/types";
import { shade } from "@/lib/color";

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

const garage: BackdropRenderer = (u) => (
  <g>
    <RoomShell u={u} wall="#b9b4ab" wallDark="#a29d94" side="#8c877f" ceiling="#9c978e" floor="#8e8c88" floorDark="#6f6d69" />
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
      {hedge && (
        <g>
          <rect x="0" y="540" width={SCENE_W} height="54" rx="20" fill={p.hedge} />
          <rect x="0" y="540" width={SCENE_W} height="14" rx="7" fill="#fff" opacity={0.06} />
        </g>
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

export const BACKDROPS: Record<string, BackdropRenderer> = {
  "castle-interior": castleInterior,
  "castle-exterior": castleExterior,
  "house-interior": houseInterior,
  garage,
  garden,
  greenhouse,
  station,
};

export function renderBackdrop(spec: BackdropSpec, u: string): ReactNode {
  const r = BACKDROPS[spec.kind] ?? BACKDROPS["castle-interior"];
  return r(u, spec.options ?? {});
}
