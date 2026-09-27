import type { ReactNode } from "react";
import type { ArtDef } from "./types";
import { Candle, Glow } from "./helpers";

/* Items for the second wave of containers. */

const GOLD = "#d6a84a";
const GOLD_D = "#a87b2c";
const STEEL = "#b9c0c7";
const STEEL_D = "#8e969f";
const CHAR = "#2f3237";
const PAPER = "#efe4c8";

/** Floating hologram wrapper: glow + projector ring under the shape. */
function holo(u: string, color: string, shape: ReactNode): ReactNode {
  return (
    <g>
      <Glow u={u} k="h" cx={40} cy={36} rx={40} ry={36} color={color} opacity={0.4} />
      <ellipse cx="40" cy="76" rx="22" ry="4" fill={color} opacity={0.7} />
      <path d="M22 76L30 44h20l8 32z" fill={color} opacity={0.08} />
      <g fill="none" stroke={color} strokeWidth={2}>
        {shape}
      </g>
    </g>
  );
}
const H = (render: (u: string) => ReactNode): ArtDef => ({ w: 80, h: 80, grounded: false, render });

export const items2Art: Record<string, ArtDef> = {
  /* ---------- feast table ---------- */
  roast: {
    w: 100,
    h: 60,
    grounded: false,
    render: () => (
      <g>
        <ellipse cx="50" cy="44" rx="48" ry="14" fill="#e8e2d6" />
        <ellipse cx="50" cy="42" rx="40" ry="10" fill="#cfc6b8" />
        <path d="M18 38c0-18 16-28 32-28s32 10 32 28c-10 6-54 6-64 0z" fill="#b8642a" />
        <path d="M30 22c8-6 24-8 36 0" stroke="#d98a4a" strokeWidth={4} fill="none" />
        <path d="M78 26l14-10M84 30l12-4" stroke="#f3efe6" strokeWidth={5} strokeLinecap="round" />
        <circle cx="30" cy="42" r="4" fill="#4f7d45" />
        <circle cx="70" cy="44" r="4" fill="#d9383a" />
      </g>
    ),
  },
  bread: {
    w: 90,
    h: 50,
    render: () => (
      <g>
        <path d="M6 40c0-22 18-32 39-32s39 10 39 32c0 6-78 6-78 0z" fill="#c98a42" />
        <path d="M45 8c21 0 39 10 39 32c0 3-20 5-39 5z" fill="#000" opacity={0.08} />
        <path d="M22 22l8 10M38 16l8 12M56 16l8 12" stroke="#f0d09a" strokeWidth={4} strokeLinecap="round" />
      </g>
    ),
  },
  grapes: {
    w: 60,
    h: 80,
    render: () => (
      <g>
        <path d="M30 6v10M30 10c6-8 16-8 20-2-8 2-14 2-20 2z" stroke="#5d8c55" strokeWidth={3} fill="#6b9a58" />
        {[
          [20, 24],
          [32, 22],
          [44, 26],
          [14, 36],
          [26, 36],
          [38, 36],
          [50, 38],
          [20, 48],
          [32, 48],
          [44, 50],
          [26, 60],
          [38, 60],
          [32, 72],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={7} fill={i % 3 ? "#7a3a8a" : "#8e4aa0"} />
            <circle cx={x - 2} cy={y - 2} r={2} fill="#fff" opacity={0.35} />
          </g>
        ))}
      </g>
    ),
  },
  pie: {
    w: 90,
    h: 50,
    render: () => (
      <g>
        <path d="M4 26h82l-6 18H10z" fill="#b8854a" />
        <ellipse cx="45" cy="26" rx="41" ry="12" fill="#d9a45a" />
        <g stroke="#b8752a" strokeWidth={4}>
          <path d="M18 20l54 12M18 32l54-12M45 14v24" />
        </g>
        <path d="M60 22l14 -4 4 8z" fill="#9e2a3e" />
      </g>
    ),
  },
  jug: {
    w: 60,
    h: 80,
    render: () => (
      <g>
        <path d="M40 26c16 0 18 30 2 32" stroke="#8a5a36" strokeWidth={6} fill="none" />
        <path d="M14 20c-10 20-10 40 0 58h32c10-18 10-38 0-58z" fill="#a8744a" />
        <path d="M30 20h16c10 20 10 40 0 58H30z" fill="#000" opacity={0.12} />
        <path d="M12 8h36l-2 14H14z" fill="#8a5a36" />
        <path d="M12 8l-8-4 10 0" fill="#8a5a36" />
        <path d="M10 44c12 4 28 4 40 0" stroke="#d6a84a" strokeWidth={3} fill="none" />
      </g>
    ),
  },

  /* ---------- armory barrel ---------- */
  arrows: {
    w: 60,
    h: 110,
    render: () => (
      <g>
        {[18, 26, 34, 42].map((x, i) => (
          <g key={x} transform={`rotate(${(i - 1.5) * 6} 30 100)`}>
            <line x1={x} y1="100" x2={x} y2="14" stroke="#c9a060" strokeWidth={2.4} />
            <path d={`M${x - 4} 16l4-12 4 12z`} fill={STEEL} />
            <path d={`M${x} 88l-5 10M${x} 88l5 10`} stroke="#c43d3d" strokeWidth={3} />
          </g>
        ))}
        <rect x="16" y="66" width="28" height="6" rx="2" fill="#6b4428" />
      </g>
    ),
  },
  mace: {
    w: 50,
    h: 110,
    render: () => (
      <g>
        <rect x="22" y="40" width="6" height="68" rx="3" fill="#6b4428" />
        <rect x="20" y="86" width="10" height="20" rx="2" fill="#3b2415" />
        <circle cx="25" cy="26" r="16" fill={STEEL_D} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <path key={a} d="M25 4l4 8h-8z" fill={STEEL} transform={`rotate(${a} 25 26)`} />
        ))}
        <circle cx="20" cy="21" r="4" fill="#fff" opacity={0.3} />
      </g>
    ),
  },
  gauntlet: {
    w: 70,
    h: 80,
    render: () => (
      <g>
        <path d="M14 78V44l-6-20c-2-6 6-8 8-2l6 16V10c0-6 8-6 8 0v24V6c0-6 8-6 8 0v28V10c0-6 8-6 8 0v30l6-10c4-6 10-2 6 4l-10 22v22z" fill={STEEL} />
        <path d="M22 34h26M22 44h28" stroke={STEEL_D} strokeWidth={2} />
        <rect x="12" y="62" width="44" height="16" rx="3" fill={STEEL_D} />
        <path d="M12 68h44" stroke={GOLD} strokeWidth={3} />
      </g>
    ),
  },
  horn: {
    w: 100,
    h: 60,
    render: () => (
      <g>
        <path d="M8 20c30-10 60-4 84 24l-10 10C64 34 40 30 12 36z" fill="#e8d9b8" />
        <path d="M12 36c28-6 52-2 70 18" stroke="#c9b48a" strokeWidth={3} fill="none" />
        <ellipse cx="10" cy="28" rx="6" ry="10" fill="#c9b48a" />
        <path d="M40 22l4 14M60 28l2 14" stroke={GOLD} strokeWidth={4} />
        <path d="M30 26c10 20 30 24 50 20" stroke="#6b4428" strokeWidth={2} fill="none" />
      </g>
    ),
  },
  whetstone: {
    w: 90,
    h: 40,
    render: () => (
      <g>
        <path d="M6 14h78l-4 22H10z" fill="#6f7a82" />
        <path d="M6 14h78l-4 8H10z" fill="#8e98a2" />
        <path d="M20 26h50" stroke="#5a646c" strokeWidth={2} />
        <path d="M14 10l30-8" stroke={STEEL} strokeWidth={3} />
      </g>
    ),
  },
  chainmail: {
    w: 80,
    h: 80,
    render: () => (
      <g>
        <path d="M20 4L4 18l6 20 8-4v44h44V34l8 4 6-20L60 4c-6 8-14 10-20 10s-14-2-20-10z" fill={STEEL_D} />
        <g fill="none" stroke={STEEL} strokeWidth={1.4}>
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 6 }).map((_, c) => <circle key={`${r}${c}`} cx={24 + c * 7 + (r % 2) * 3} cy={26 + r * 8} r={3} />),
          )}
        </g>
      </g>
    ),
  },

  /* ---------- hay cart ---------- */
  "grain-sack": {
    w: 70,
    h: 80,
    render: () => (
      <g>
        <path d="M14 20c-12 20-10 52 4 58h34c14-6 16-38 4-58z" fill="#d9c49a" />
        <path d="M35 20h21c12 20 10 52-4 58H35z" fill="#000" opacity={0.08} />
        <path d="M20 20l-4-12 8 6 11-10 11 10 8-6-4 12z" fill="#c9b48a" />
        <path d="M16 20h38" stroke="#8a6a44" strokeWidth={4} />
        <path d="M26 44c4 6 14 6 18 0M35 40v16" stroke="#8a6a44" strokeWidth={2} fill="none" />
      </g>
    ),
  },
  pumpkin: {
    w: 80,
    h: 64,
    render: () => (
      <g>
        <path d="M40 12c0-6 4-10 10-10" stroke="#5d8c55" strokeWidth={5} fill="none" />
        <ellipse cx="22" cy="38" rx="18" ry="24" fill="#e0752a" />
        <ellipse cx="58" cy="38" rx="18" ry="24" fill="#e0752a" />
        <ellipse cx="40" cy="38" rx="18" ry="26" fill="#f08a3a" />
        <path d="M40 14v48" stroke="#c45a1a" strokeWidth={2} />
      </g>
    ),
  },
  cabbage: {
    w: 70,
    h: 60,
    render: () => (
      <g>
        <circle cx="35" cy="34" r="26" fill="#7fb06a" />
        <path d="M10 34c10-20 40-20 50 0M16 44c10-14 28-14 38 0" stroke="#5d8c4c" strokeWidth={3} fill="none" />
        <circle cx="35" cy="30" r="12" fill="#a8d08a" />
        <path d="M35 18v24" stroke="#7fb06a" strokeWidth={2} />
      </g>
    ),
  },
  horseshoe: {
    w: 70,
    h: 70,
    render: () => (
      <g>
        <path d="M12 64V34a23 23 0 0 1 46 0v30" fill="none" stroke={STEEL_D} strokeWidth={12} strokeLinecap="round" />
        <path d="M12 64V34a23 23 0 0 1 46 0v30" fill="none" stroke={STEEL} strokeWidth={4} strokeDasharray="3 8" />
      </g>
    ),
  },
  "milk-pail": {
    w: 70,
    h: 76,
    render: () => (
      <g>
        <path d="M12 26c0-22 46-22 46 0" stroke={STEEL_D} strokeWidth={3} fill="none" />
        <path d="M8 26h54l-6 48H14z" fill={STEEL} />
        <path d="M35 26h27l-6 48H35z" fill="#000" opacity={0.1} />
        <ellipse cx="35" cy="26" rx="27" ry="6" fill="#f7f7f5" />
        <path d="M10 44h50M12 60h46" stroke={STEEL_D} strokeWidth={2} />
      </g>
    ),
  },
  turnips: {
    w: 90,
    h: 60,
    render: () => (
      <g>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 26} ${i % 2 ? 6 : 0})`}>
            <path d="M18 18c-4-10-2-16 2-18M22 18c2-10 6-14 10-14" stroke="#5d8c55" strokeWidth={3} fill="none" />
            <path d="M4 36c0-12 8-18 16-18s16 6 16 18-8 18-16 22c-8-4-16-10-16-22z" fill="#f3efe6" />
            <path d="M4 32c0-8 8-14 16-14s16 6 16 14z" fill="#9b4aa0" />
          </g>
        ))}
      </g>
    ),
  },

  /* ---------- reliquary ---------- */
  rosary: {
    w: 80,
    h: 80,
    grounded: false,
    render: () => (
      <g>
        <ellipse cx="40" cy="30" rx="30" ry="24" fill="none" stroke="#8a5a36" strokeWidth={1.4} />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return <circle key={i} cx={Math.round((40 + Math.cos(a) * 30) * 10) / 10} cy={Math.round((30 + Math.sin(a) * 24) * 10) / 10} r={3} fill="#6b2d2d" />;
        })}
        <path d="M40 54v10" stroke="#8a5a36" strokeWidth={1.4} />
        <path d="M37 62h6v6h6v4h-6v8h-6v-8h-6v-4h6z" fill={GOLD} />
      </g>
    ),
  },
  censer: {
    w: 60,
    h: 90,
    render: () => (
      <g>
        <path d="M30 0v30M18 30l12-20 12 20" stroke={GOLD_D} strokeWidth={1.6} fill="none" />
        <path d="M14 34c0-10 32-10 32 0z" fill={GOLD} />
        <path d="M10 36h40c0 18-8 28-20 28S10 54 10 36z" fill={GOLD_D} />
        <g fill="#6b4a1c">
          <circle cx="22" cy="46" r="2" />
          <circle cx="30" cy="50" r="2" />
          <circle cx="38" cy="46" r="2" />
        </g>
        <path d="M22 64h16l2 8H20z" fill={GOLD} />
        <path d="M24 26c-4-8 4-10 0-18M34 24c-4-8 4-10 0-18" stroke="#d8d2c4" strokeWidth={1.4} fill="none" opacity={0.7} />
      </g>
    ),
  },
  "prayer-book": {
    w: 90,
    h: 50,
    render: () => (
      <g>
        <path d="M4 16c14-6 28-6 41 0 13-6 27-6 41 0v30c-14-6-28-6-41 0-13-6-27-6-41 0z" fill="#5a1f3a" />
        <path d="M8 14c12-4 24-4 37 2v26c-13-6-25-6-37-2zM45 16c13-6 25-6 37-2v26c-12-4-24-4-37 2z" fill={PAPER} />
        <path d="M14 22h24M14 28h20M52 22h24M52 28h22" stroke="#a8977a" strokeWidth={1.2} />
        <path d="M60 34h8M64 30v10" stroke="#b23a3a" strokeWidth={2} />
        <path d="M45 16v30" stroke="#c43d4f" strokeWidth={2} />
      </g>
    ),
  },
  "relic-box": {
    w: 80,
    h: 60,
    render: () => (
      <g>
        <path d="M8 26h64v32H8z" fill={GOLD_D} />
        <path d="M4 26l8-16h56l8 16z" fill={GOLD} />
        <path d="M40 10l6-8h-12z" fill={GOLD} />
        <rect x="14" y="32" width="52" height="20" fill="#3a2a5a" />
        <circle cx="40" cy="42" r="6" fill="#c77dff" />
        <circle cx="22" cy="42" r="3" fill="#e8385a" />
        <circle cx="58" cy="42" r="3" fill="#3a6fb0" />
      </g>
    ),
  },
  feather: {
    w: 90,
    h: 40,
    grounded: false,
    render: () => (
      <g>
        <path d="M6 30C30 4 70 2 86 10 70 26 34 36 6 30z" fill="#e8e2f0" />
        <path d="M6 30C36 24 62 16 86 10" stroke="#b8a8c8" strokeWidth={1.6} fill="none" />
        <path d="M30 24l-6-8M46 20l-6-10M62 16l-4-8M40 22l2 8M56 18l4 8" stroke="#c8b8d8" strokeWidth={1} />
      </g>
    ),
  },

  /* ---------- entrance drawer ---------- */
  wallet: {
    w: 80,
    h: 56,
    render: () => (
      <g>
        <rect x="4" y="8" width="72" height="46" rx="6" fill="#6b4428" />
        <rect x="4" y="8" width="72" height="18" rx="6" fill="#8a5a36" />
        <rect x="14" y="2" width="36" height="12" rx="2" fill="#3a6fb0" />
        <rect x="18" y="4" width="10" height="6" fill="#d6a84a" />
        <circle cx="64" cy="36" r="5" fill="#d6a84a" />
        <path d="M8 40h40" stroke="#4a2e1a" strokeWidth={1.4} strokeDasharray="3 3" />
      </g>
    ),
  },
  sunglasses: {
    w: 100,
    h: 40,
    render: () => (
      <g>
        <path d="M4 12h92" stroke={CHAR} strokeWidth={4} />
        <path d="M8 12h34c0 14-6 22-17 22S8 26 8 12zM58 12h34c0 14-6 22-17 22S58 26 58 12z" fill="#1c2a3a" />
        <path d="M14 16l10 10M64 16l10 10" stroke="#fff" strokeOpacity={0.3} strokeWidth={3} />
        <path d="M42 14c4-4 12-4 16 0" stroke={CHAR} strokeWidth={4} fill="none" />
      </g>
    ),
  },
  envelopes: {
    w: 90,
    h: 60,
    render: () => (
      <g>
        <rect x="18" y="4" width="64" height="40" fill="#f3e6d4" transform="rotate(8 50 24)" />
        <rect x="8" y="16" width="68" height="42" fill="#fbf8f2" />
        <path d="M8 16l34 24 34-24" stroke="#d8cfbf" strokeWidth={2} fill="none" />
        <rect x="58" y="22" width="12" height="14" fill="#c43d4f" />
        <circle cx="42" cy="44" r="5" fill="#b23a3a" />
      </g>
    ),
  },
  phone: {
    w: 50,
    h: 90,
    render: () => (
      <g>
        <rect x="4" y="2" width="42" height="86" rx="8" fill={CHAR} />
        <rect x="8" y="10" width="34" height="68" rx="3" fill="#2f4863" />
        <rect x="12" y="16" width="12" height="12" rx="3" fill="#59d98e" />
        <rect x="26" y="16" width="12" height="12" rx="3" fill="#ff9f43" />
        <rect x="12" y="32" width="12" height="12" rx="3" fill="#5ce1e6" />
        <rect x="26" y="32" width="12" height="12" rx="3" fill="#c77dff" />
        <rect x="19" y="4" width="12" height="3" rx="1.5" fill="#4a4f57" />
      </g>
    ),
  },
  lipstick: {
    w: 30,
    h: 80,
    render: () => (
      <g>
        <rect x="6" y="40" width="18" height="40" rx="2" fill={GOLD} />
        <rect x="6" y="36" width="18" height="6" fill={GOLD_D} />
        <rect x="8" y="16" width="14" height="22" fill={GOLD_D} />
        <path d="M8 16V8l14-6v14z" fill="#c43d4f" />
      </g>
    ),
  },

  /* ---------- games drawer ---------- */
  dice: {
    w: 80,
    h: 50,
    render: () => (
      <g>
        {[
          [4, 10, "#f7f7f5"],
          [40, 16, "#c43d3d"],
        ].map(([x, y, c], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${i ? 12 : -8} 16 16)`}>
            <rect width="32" height="32" rx="6" fill={c as string} />
            {[
              [9, 9],
              [23, 23],
              [16, 16],
              [23, 9],
              [9, 23],
            ]
              .slice(0, i ? 3 : 5)
              .map(([px, py], k) => (
                <circle key={k} cx={px} cy={py} r={3} fill={i ? "#fff" : "#2f3237"} />
              ))}
          </g>
        ))}
      </g>
    ),
  },
  "chess-knight": {
    w: 50,
    h: 80,
    render: () => (
      <g>
        <rect x="6" y="66" width="38" height="12" rx="3" fill={CHAR} />
        <rect x="10" y="58" width="30" height="10" rx="2" fill="#3a3d42" />
        <path d="M14 58c0-16 4-24 2-32l-6-6 8-2c4-10 14-16 22-12 8 4 6 20 0 30l-2 22z" fill="#2f3237" />
        <circle cx="28" cy="18" r="2" fill="#f3efe6" />
        <path d="M24 10l4-8 4 8" fill="#2f3237" />
      </g>
    ),
  },
  cards: {
    w: 80,
    h: 70,
    render: () => (
      <g>
        {[-14, 0, 14].map((a, i) => (
          <g key={a} transform={`rotate(${a} 40 64)`}>
            <rect x="24" y="6" width="32" height="46" rx="3" fill="#fbf8f2" stroke="#d8d2c4" />
            <text x="28" y="18" fontSize="9" fill={i === 1 ? "#c43d3d" : "#2f3237"} fontFamily="serif">
              {["K", "A", "Q"][i]}
            </text>
            <path d={i === 1 ? "M40 28c-6-6 0-12 0-4 0-8 6-2 0 4 0 0 0 0 0 0z" : "M40 24l6 8-6 8-6-8z"} fill={i === 1 ? "#c43d3d" : "#2f3237"} />
          </g>
        ))}
      </g>
    ),
  },
  puzzle: {
    w: 70,
    h: 60,
    render: () => (
      <g>
        <path d="M6 12h18c-4-10 16-10 12 0h18v16c10-4 10 16 0 12v16H36c4 10-16 10-12 0H6V40c10 4 10-16 0-12z" fill="#3a8a9a" />
        <path d="M6 12h18c-4-10 16-10 12 0h18v16" stroke="#2a6a7a" strokeWidth={2} fill="none" />
      </g>
    ),
  },
  remote: {
    w: 36,
    h: 90,
    render: () => (
      <g>
        <rect x="4" y="2" width="28" height="86" rx="10" fill={CHAR} />
        <circle cx="18" cy="14" r="4" fill="#c43d3d" />
        <circle cx="18" cy="34" r="8" fill="#4a4f57" />
        {[52, 62, 72].map((y) => (
          <g key={y}>
            <rect x="9" y={y} width="7" height="5" rx="1.5" fill="#6f777f" />
            <rect x="20" y={y} width="7" height="5" rx="1.5" fill="#6f777f" />
          </g>
        ))}
      </g>
    ),
  },
  "candle-jar": {
    w: 50,
    h: 64,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={25} cy={20} rx={24} color="#ffc466" opacity={0.5} />
        <rect x="6" y="24" width="38" height="40" rx="6" fill="#d9c8e8" opacity={0.7} />
        <rect x="8" y="40" width="34" height="22" rx="4" fill="#b88fd8" />
        <Candle x={25} y={40} h={4} w={4} />
      </g>
    ),
  },

  /* ---------- mirror cabinet ---------- */
  toothbrush: {
    w: 30,
    h: 90,
    render: () => (
      <g>
        <rect x="4" y="50" width="22" height="40" rx="4" fill="#dfe4ea" opacity={0.8} />
        <rect x="12" y="8" width="6" height="70" rx="3" fill="#3a8ad8" />
        <rect x="10" y="4" width="10" height="18" rx="2" fill="#f7f7f5" />
      </g>
    ),
  },
  toothpaste: {
    w: 90,
    h: 36,
    render: () => (
      <g>
        <path d="M6 8h64l12 8v6l-12 8H6z" fill="#f7f7f5" />
        <path d="M6 8h20v22H6z" fill="#3a6fb0" />
        <rect x="82" y="14" width="6" height="10" rx="1" fill="#3a6fb0" />
        <path d="M34 16h26" stroke="#c43d3d" strokeWidth={4} />
      </g>
    ),
  },
  soap: {
    w: 70,
    h: 40,
    render: () => (
      <g>
        <ellipse cx="35" cy="32" rx="32" ry="7" fill="#b9d8d8" />
        <rect x="10" y="10" width="50" height="22" rx="10" fill="#f2b8c8" />
        <circle cx="16" cy="6" r="4" fill="#fff" opacity={0.8} />
        <circle cx="26" cy="4" r="3" fill="#fff" opacity={0.8} />
      </g>
    ),
  },
  perfume: {
    w: 50,
    h: 70,
    render: () => (
      <g>
        <rect x="18" y="4" width="14" height="10" rx="2" fill={GOLD} />
        <path d="M8 20h34l4 44c0 4-4 6-8 6H12c-4 0-8-2-8-6z" fill="#c77dff" opacity={0.75} />
        <rect x="16" y="14" width="18" height="8" fill={GOLD_D} />
        <rect x="12" y="30" width="6" height="30" rx="3" fill="#fff" opacity={0.35} />
      </g>
    ),
  },
  comb: {
    w: 90,
    h: 30,
    render: () => (
      <g>
        <rect x="4" y="4" width="82" height="10" rx="4" fill="#2a2a2a" />
        {Array.from({ length: 18 }).map((_, i) => (
          <rect key={i} x={8 + i * 4.4} y="12" width="2" height="16" fill="#2a2a2a" />
        ))}
      </g>
    ),
  },
  lotion: {
    w: 40,
    h: 90,
    render: () => (
      <g>
        <path d="M20 4v10M14 4h14" stroke="#f7f7f5" strokeWidth={4} />
        <rect x="14" y="12" width="12" height="10" fill="#f7f7f5" />
        <rect x="4" y="22" width="32" height="66" rx="8" fill="#8fd0c0" />
        <rect x="8" y="40" width="24" height="24" rx="2" fill="#f7f7f5" />
        <path d="M14 52c4-6 8-6 12 0" stroke="#5aa08a" strokeWidth={2} fill="none" />
      </g>
    ),
  },

  /* ---------- nest ---------- */
  "bird-eggs": {
    w: 70,
    h: 44,
    render: () => (
      <g>
        {[14, 34, 54].map((x, i) => (
          <g key={x}>
            <ellipse cx={x} cy={24 - (i % 2) * 4} rx={10} ry={13} fill="#9ad0e8" />
            <circle cx={x - 3} cy={20 - (i % 2) * 4} r={1.6} fill="#5a86a8" />
            <circle cx={x + 4} cy={28 - (i % 2) * 4} r={1.2} fill="#5a86a8" />
          </g>
        ))}
      </g>
    ),
  },
  acorn: {
    w: 50,
    h: 60,
    render: () => (
      <g>
        <path d="M10 26c0 20 8 32 15 32s15-12 15-32z" fill="#b8854a" />
        <path d="M25 26h15c0 20-8 32-15 32z" fill="#000" opacity={0.12} />
        <path d="M6 28c0-14 8-20 19-20s19 6 19 20z" fill="#6b4428" />
        <path d="M10 22h30M12 16h26" stroke="#4a2e1a" strokeWidth={1.6} />
        <path d="M25 8c0-4 2-6 6-6" stroke="#4a2e1a" strokeWidth={3} fill="none" />
      </g>
    ),
  },
  snail: {
    w: 80,
    h: 50,
    render: () => (
      <g>
        <path d="M4 44c10-2 50-2 72-6 0-6-6-8-12-6" fill="#c9b8a4" />
        <path d="M62 34l4-20M70 34l8-18" stroke="#c9b8a4" strokeWidth={3} />
        <circle cx="66" cy="13" r="3" fill="#2a1a10" />
        <circle cx="78" cy="15" r="3" fill="#2a1a10" />
        <circle cx="34" cy="26" r="20" fill="#b8742a" />
        <path d="M34 26m0-12a12 12 0 1 1-10 18 8 8 0 1 1 12-6 4 4 0 1 1-4 2" fill="none" stroke="#8a5a1a" strokeWidth={3} />
      </g>
    ),
  },
  berries: {
    w: 70,
    h: 50,
    render: () => (
      <g>
        <path d="M10 20c10-10 30-14 50-8" stroke="#5d8c4c" strokeWidth={3} fill="none" />
        <path d="M44 12c6-8 14-8 18-4-6 4-12 6-18 4z" fill="#5d8c4c" />
        {[
          [16, 30],
          [28, 36],
          [40, 30],
          [24, 22],
          [36, 42],
          [48, 38],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={7} fill={i % 2 ? "#3a2a6a" : "#5a3a8a"} />
        ))}
      </g>
    ),
  },
  button: {
    w: 50,
    h: 50,
    render: () => (
      <g>
        <circle cx="25" cy="25" r="22" fill={GOLD} />
        <circle cx="25" cy="25" r="16" fill="none" stroke={GOLD_D} strokeWidth={2} />
        {[
          [20, 20],
          [30, 20],
          [20, 30],
          [30, 30],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2.6} fill={GOLD_D} />
        ))}
        <path d="M10 14a18 18 0 0 1 12-8" stroke="#fff" strokeOpacity={0.5} strokeWidth={3} fill="none" />
      </g>
    ),
  },

  /* ---------- fountain (underwater) ---------- */
  goldfish: {
    w: 90,
    h: 50,
    grounded: false,
    render: () => (
      <g>
        <path d="M70 25l18-16v32z" fill="#ff8a3a" />
        <ellipse cx="42" cy="25" rx="32" ry="17" fill="#ff9a3a" />
        <path d="M34 10c6-8 18-8 22 2" fill="#ff7a2a" />
        <circle cx="22" cy="21" r="4" fill="#fff" />
        <circle cx="21" cy="21" r="2" fill="#111" />
        <path d="M40 16c4 6 4 12 0 18" stroke="#ffc07a" strokeWidth={2} fill="none" />
      </g>
    ),
  },
  "wish-coin": {
    w: 60,
    h: 60,
    grounded: false,
    render: () => (
      <g>
        <circle cx="30" cy="30" r="26" fill={GOLD} />
        <circle cx="30" cy="30" r="20" fill="none" stroke={GOLD_D} strokeWidth={2} />
        <path d="M30 16l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z" fill={GOLD_D} />
      </g>
    ),
  },
  "message-bottle": {
    w: 100,
    h: 44,
    grounded: false,
    render: () => (
      <g>
        <path d="M8 10h56l14 6h12v12H78l-14 6H8c-4 0-6-4-6-12s2-12 6-12z" fill="#8fd0b8" opacity={0.55} />
        <rect x="88" y="14" width="8" height="16" rx="2" fill="#8a5a36" />
        <rect x="16" y="14" width="40" height="16" rx="3" fill={PAPER} />
        <path d="M22 20h28M22 24h20" stroke="#a8977a" strokeWidth={1.2} />
        <path d="M34 14v16" stroke="#c43d3d" strokeWidth={2} />
      </g>
    ),
  },
  turtle: {
    w: 90,
    h: 56,
    grounded: false,
    render: () => (
      <g>
        <ellipse cx="74" cy="28" rx="12" ry="9" fill="#8fbf6a" />
        <circle cx="80" cy="25" r="2" fill="#111" />
        <path d="M22 12l-10-8M22 44l-10 8M58 12l8-8M58 44l8 8" stroke="#8fbf6a" strokeWidth={8} strokeLinecap="round" />
        <ellipse cx="40" cy="28" rx="30" ry="22" fill="#5a7a3a" />
        <path d="M40 8v40M16 20h48M16 36h48M26 10l-6 36M54 10l6 36" stroke="#3f5a24" strokeWidth={2} />
      </g>
    ),
  },
  "lily-flower": {
    w: 80,
    h: 50,
    render: () => (
      <g>
        <ellipse cx="40" cy="40" rx="38" ry="9" fill="#4f8a4a" />
        <path d="M40 40L72 34" stroke="#3a6a3a" strokeWidth={2} />
        {[-50, -25, 0, 25, 50].map((a) => (
          <ellipse key={a} cx="40" cy="22" rx="6" ry="16" fill="#f7d6e6" transform={`rotate(${a} 40 36)`} />
        ))}
        <circle cx="40" cy="30" r="5" fill="#f2c230" />
      </g>
    ),
  },
  pebbles: {
    w: 90,
    h: 40,
    render: () => (
      <g>
        {[
          [14, 28, 12, "#a8a094"],
          [36, 30, 14, "#8f877c"],
          [60, 28, 11, "#c9c2b4"],
          [78, 32, 9, "#7a7266"],
          [48, 18, 8, "#d9d2c4"],
        ].map(([x, y, r, c], i) => (
          <ellipse key={i} cx={x as number} cy={y as number} rx={r as number} ry={(r as number) * 0.7} fill={c as string} />
        ))}
      </g>
    ),
  },

  /* ---------- beehive ---------- */
  bee: {
    w: 70,
    h: 50,
    grounded: false,
    render: () => (
      <g>
        <ellipse cx="26" cy="12" rx="12" ry="8" fill="#e8f4ff" opacity={0.8} />
        <ellipse cx="44" cy="12" rx="12" ry="8" fill="#e8f4ff" opacity={0.8} />
        <ellipse cx="35" cy="30" rx="24" ry="15" fill="#f2c230" />
        <path d="M26 16v28M36 15v30M46 17v26" stroke="#2a1a10" strokeWidth={5} />
        <circle cx="58" cy="28" r="7" fill="#2a1a10" />
        <path d="M60 22l6-8M62 24l8-4" stroke="#2a1a10" strokeWidth={1.6} />
        <path d="M10 30l-8 2" stroke="#2a1a10" strokeWidth={3} />
      </g>
    ),
  },
  "honey-jar": {
    w: 60,
    h: 76,
    render: () => (
      <g>
        <path d="M10 22h40v48c0 4-4 6-8 6H18c-4 0-8-2-8-6z" fill="#e8a820" opacity={0.9} />
        <path d="M6 12h48v12H6z" fill="#c9a060" />
        <path d="M6 12h48" stroke="#8a6a3a" strokeWidth={4} />
        <path d="M12 24c4 8 8 8 12 0M28 24c4 10 8 10 12 0" fill="#e8a820" />
        <rect x="16" y="40" width="28" height="18" rx="2" fill={PAPER} />
        <path d="M24 50l6-6 6 6-6 6z" fill="#e8a820" />
      </g>
    ),
  },
  "queen-bee": {
    w: 80,
    h: 56,
    grounded: false,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={40} cy={30} rx={36} ry={24} color="#ffd98a" opacity={0.5} />
        <ellipse cx="28" cy="14" rx="14" ry="8" fill="#e8f4ff" opacity={0.8} />
        <ellipse cx="50" cy="14" rx="14" ry="8" fill="#e8f4ff" opacity={0.8} />
        <ellipse cx="38" cy="34" rx="30" ry="15" fill="#e8a820" />
        <path d="M26 20v28M36 19v30M46 20v28" stroke="#2a1a10" strokeWidth={5} />
        <circle cx="68" cy="32" r="8" fill="#2a1a10" />
        <path d="M60 22l4-10 4 6 4-8 2 10z" fill={GOLD} />
      </g>
    ),
  },
  "honey-dipper": {
    w: 110,
    h: 40,
    grounded: false,
    render: () => (
      <g>
        <rect x="2" y="14" width="68" height="10" rx="5" fill="#2a1a10" />
        <rect x="4" y="16" width="64" height="6" rx="3" fill="#6b4428" />
        <g fill="#6b3a10" stroke="#2a1a10" strokeWidth={2}>
          {[70, 80, 90, 100].map((x) => (
            <ellipse key={x} cx={x} cy="19" rx="5" ry="12" />
          ))}
        </g>
        <path d="M78 30c0 6 2 8 4 8" stroke="#e8a820" strokeWidth={4} fill="none" />
      </g>
    ),
  },
  honeycomb: {
    w: 90,
    h: 70,
    render: () => (
      <g>
        {[
          [20, 18],
          [44, 18],
          [68, 18],
          [32, 38],
          [56, 38],
          [20, 58],
          [44, 58],
          [68, 58],
        ].map(([x, y], i) => (
          <path
            key={i}
            d={`M${x} ${y - 12}l11 6v12l-11 6-11-6v-12z`}
            fill={i % 3 ? "#e8a820" : "#f2c230"}
            stroke="#b8751a"
            strokeWidth={2}
          />
        ))}
      </g>
    ),
  },
  "wax-candle": {
    w: 40,
    h: 80,
    render: () => (
      <g>
        <rect x="8" y="30" width="24" height="48" rx="3" fill="#f2d16b" />
        <g stroke="#d9b24a" strokeWidth={1.4}>
          {[38, 46, 54, 62, 70].map((y) => (
            <path key={y} d={`M8 ${y}h24`} />
          ))}
        </g>
        <Candle x={20} y={30} h={2} w={5} />
      </g>
    ),
  },

  /* ---------- rowboat ---------- */
  "fishing-rod": {
    w: 120,
    h: 60,
    grounded: false,
    render: () => (
      <g>
        <path d="M4 54L110 6" stroke="#1c2a3a" strokeWidth={7} strokeLinecap="round" />
        <path d="M4 54L110 6" stroke="#e8d9b8" strokeWidth={3.5} strokeLinecap="round" />
        <rect x="4" y="44" width="24" height="10" rx="3" fill="#2f3237" transform="rotate(-24 16 49)" />
        <circle cx="30" cy="42" r="6" fill={STEEL} />
        <path d="M110 6v40" stroke="#e8e2d6" strokeWidth={1} />
        <path d="M110 46a4 4 0 1 1-4 4" stroke={STEEL_D} strokeWidth={2} fill="none" />
        <circle cx="110" cy="36" r="4" fill="#c43d3d" />
      </g>
    ),
  },
  net: {
    w: 90,
    h: 70,
    render: () => (
      <g>
        <path d="M6 20c20-14 58-14 78 0l-10 44c-14 6-44 6-58 0z" fill="#c9b894" opacity={0.25} />
        <g stroke="#a8977a" strokeWidth={1.6} fill="none">
          {[14, 26, 38, 50, 62, 74].map((x) => (
            <path key={x} d={`M${x} 14l${(45 - x) / 6} 52`} />
          ))}
          {[26, 38, 50, 60].map((y) => (
            <path key={y} d={`M10 ${y}c20 6 50 6 70 0`} />
          ))}
        </g>
        <path d="M6 20c20-14 58-14 78 0" stroke="#6b4428" strokeWidth={4} fill="none" />
      </g>
    ),
  },
  "life-ring": {
    w: 70,
    h: 70,
    render: () => (
      <g>
        <circle cx="35" cy="35" r="30" fill="none" stroke="#f3efe6" strokeWidth={14} />
        <circle cx="35" cy="35" r="30" fill="none" stroke="#e35d3a" strokeWidth={14} strokeDasharray="23.5 23.5" />
        <circle cx="35" cy="35" r="37" fill="none" stroke="#c9b894" strokeWidth={1.6} strokeDasharray="6 4" />
      </g>
    ),
  },
  "bait-tin": {
    w: 70,
    h: 50,
    render: () => (
      <g>
        <path d="M6 20h58v26H6z" fill="#3f6a8a" />
        <ellipse cx="35" cy="20" rx="29" ry="7" fill="#6f95b8" />
        <ellipse cx="35" cy="20" rx="24" ry="5" fill="#4a2e1a" />
        <path d="M22 18c4-4 8 2 12-2s8 2 12-2" stroke="#e88aa0" strokeWidth={3} fill="none" strokeLinecap="round" />
        <rect x="16" y="28" width="38" height="12" fill={PAPER} />
      </g>
    ),
  },
  "caught-fish": {
    w: 100,
    h: 44,
    render: () => (
      <g>
        <path d="M78 22l18-16v32z" fill="#8a9aa8" />
        <ellipse cx="44" cy="22" rx="38" ry="16" fill="#a8b8c8" />
        <path d="M14 22c20-4 40-4 60 0" stroke="#7a8a98" strokeWidth={2} fill="none" />
        <g fill="#6f8a9a">
          {[30, 42, 54, 66].map((x) => (
            <circle key={x} cx={x} cy={16} r={2} />
          ))}
        </g>
        <circle cx="18" cy="18" r="3" fill="#111" />
      </g>
    ),
  },

  /* ---------- stone urn ---------- */
  laurel: {
    w: 80,
    h: 60,
    grounded: false,
    render: () => (
      <g>
        <path d="M14 50C4 30 12 10 34 6M66 50c10-20 2-40-20-44" stroke="#8a7a2a" strokeWidth={2.4} fill="none" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <ellipse cx={12 + i * 2} cy={46 - i * 7} rx="4" ry="8" fill="#c9a830" transform={`rotate(${-40 + i * 10} ${12 + i * 2} ${46 - i * 7})`} />
            <ellipse cx={68 - i * 2} cy={46 - i * 7} rx="4" ry="8" fill="#c9a830" transform={`rotate(${40 - i * 10} ${68 - i * 2} ${46 - i * 7})`} />
          </g>
        ))}
      </g>
    ),
  },
  "marble-hand": {
    w: 60,
    h: 80,
    render: () => (
      <g>
        <rect x="14" y="66" width="32" height="14" rx="2" fill="#a79f90" />
        <path d="M18 66V34l-6-16c-2-6 6-8 8-2l4 12V8c0-5 7-5 7 0v20V4c0-5 7-5 7 0v24V10c0-5 7-5 7 0v26l4-6c3-5 9-2 6 3l-8 14v19z" fill="#eeeae2" />
        <path d="M30 34h14" stroke="#d2cbbf" strokeWidth={1.6} />
      </g>
    ),
  },
  mosaic: {
    w: 70,
    h: 70,
    render: () => (
      <g>
        <rect x="4" y="4" width="62" height="62" rx="4" fill="#d9d2c4" />
        {Array.from({ length: 36 }).map((_, i) => {
          const r = Math.floor(i / 6);
          const c = i % 6;
          const d = Math.abs(r - 2.5) + Math.abs(c - 2.5);
          const col = d < 1.5 ? "#c43d3d" : d < 2.5 ? "#e8b93a" : d < 3.5 ? "#3a6fb0" : "#2f5a4a";
          return <rect key={i} x={7 + c * 10} y={7 + r * 10} width={8.5} height={8.5} rx={1} fill={col} />;
        })}
      </g>
    ),
  },
  "oil-lamp": {
    w: 90,
    h: 50,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={78} cy={12} rx={16} color="#ffc466" opacity={0.6} />
        <path d="M10 26c0-8 16-12 34-12s30 4 36 10l-10 6c-6 10-20 16-34 16S10 38 10 26z" fill="#b8642a" />
        <path d="M10 26c-8 0-10 10-2 12" stroke="#b8642a" strokeWidth={4} fill="none" />
        <ellipse cx="42" cy="18" rx="10" ry="3" fill="#6b3a1a" />
        <path d="M78 22c4-6 2-12-2-16 0 6-4 8-2 14z" fill="#ffb347" />
      </g>
    ),
  },
  amphora: {
    w: 60,
    h: 100,
    render: () => (
      <g>
        <path d="M20 4h20v10H20z" fill="#b8642a" />
        <path d="M22 14C6 24 6 60 22 86h16c16-26 16-62 0-72z" fill="#c9743a" />
        <path d="M30 14h8c16 10 16 46 0 72h-8z" fill="#000" opacity={0.12} />
        <path d="M20 16c-10 0-12 14-4 18M40 16c10 0 12 14 4 18" stroke="#b8642a" strokeWidth={4} fill="none" />
        <path d="M12 50h36" stroke="#2a1a10" strokeWidth={4} />
        <path d="M16 40l6 6 6-6 6 6 6-6 6 6" stroke="#2a1a10" strokeWidth={2} fill="none" />
        <path d="M24 86h12l-2 12h-8z" fill="#b8642a" />
      </g>
    ),
  },

  /* ---------- fruit basket ---------- */
  pear: {
    w: 50,
    h: 70,
    render: () => (
      <g>
        <path d="M26 8c0-4 2-6 6-8" stroke="#5e3c27" strokeWidth={3} fill="none" />
        <path d="M24 10c-8 0-8 14-10 20-8 6-12 14-10 24 2 10 10 16 21 16s19-6 21-16c2-10-2-18-10-24-2-6-2-20-12-20z" fill="#c9d65a" />
        <ellipse cx="18" cy="44" rx="4" ry="8" fill="#fff" opacity={0.3} />
      </g>
    ),
  },
  plum: {
    w: 50,
    h: 52,
    render: () => (
      <g>
        <path d="M26 10c0-4 2-6 6-8" stroke="#5e3c27" strokeWidth={3} fill="none" />
        <ellipse cx="25" cy="30" rx="20" ry="20" fill="#5a2a6a" />
        <path d="M25 12c-4 10-4 26 0 38" stroke="#4a1f5a" strokeWidth={2} fill="none" />
        <ellipse cx="17" cy="24" rx="4" ry="6" fill="#fff" opacity={0.25} />
      </g>
    ),
  },
  cherries: {
    w: 60,
    h: 64,
    render: () => (
      <g>
        <path d="M30 4C22 20 16 34 16 44M30 4c6 16 12 28 14 40" stroke="#5d8c4c" strokeWidth={2.4} fill="none" />
        <path d="M30 4c8-4 16-2 20 4-8 2-14 0-20-4z" fill="#5d8c4c" />
        <circle cx="16" cy="50" r="12" fill="#c41d3d" />
        <circle cx="44" cy="50" r="12" fill="#b0102e" />
        <circle cx="12" cy="46" r="3" fill="#fff" opacity={0.4} />
        <circle cx="40" cy="46" r="3" fill="#fff" opacity={0.4} />
      </g>
    ),
  },
  peach: {
    w: 56,
    h: 56,
    render: () => (
      <g>
        <circle cx="28" cy="32" r="22" fill="#ffb38a" />
        <path d="M28 32a22 22 0 0 1 22 0 22 22 0 0 1-22 22z" fill="#ff8a6a" opacity={0.6} />
        <path d="M28 12c-6 8-6 24 0 40" stroke="#e8745a" strokeWidth={2} fill="none" />
        <path d="M28 12c6-8 16-8 20-4-6 4-14 6-20 4z" fill="#5d8c4c" />
      </g>
    ),
  },
  lemon: {
    w: 70,
    h: 50,
    render: () => (
      <g>
        <path d="M6 26c0-12 14-20 29-20s29 8 29 20-14 20-29 20S6 38 6 26z" fill="#f2d82a" />
        <path d="M2 26l6-3v6zM68 26l-6-3v6z" fill="#e0c41a" />
        <ellipse cx="24" cy="18" rx="10" ry="4" fill="#fff" opacity={0.35} />
      </g>
    ),
  },
  "green-apple": {
    w: 56,
    h: 60,
    render: () => (
      <g>
        <path d="M28 14c0-6 2-10 6-12" stroke="#5e3c27" strokeWidth={3} fill="none" />
        <path d="M30 10c6-6 14-4 16 0-6 4-12 4-16 0z" fill="#5d8c4c" />
        <path d="M28 16c-8-6-24-4-24 16s12 28 24 26c12 2 24-6 24-26S36 10 28 16z" fill="#8fce4a" />
        <ellipse cx="18" cy="28" rx="4" ry="8" fill="#fff" opacity={0.3} />
      </g>
    ),
  },

  /* ---------- emergency kit ---------- */
  flare: {
    w: 100,
    h: 36,
    grounded: false,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={88} cy={18} rx={16} color="#ff5c6c" opacity={0.6} />
        <rect x="4" y="10" width="76" height="16" rx="4" fill="#e35d3a" />
        <rect x="4" y="10" width="16" height="16" rx="4" fill={CHAR} />
        <path d="M30 14h40M30 22h30" stroke="#fff" strokeOpacity={0.5} strokeWidth={2} />
        <rect x="80" y="12" width="10" height="12" rx="2" fill="#ffd0d6" />
      </g>
    ),
  },
  ration: {
    w: 80,
    h: 50,
    render: () => (
      <g>
        <path d="M6 12h68l4 34H2z" fill="#6f8a5a" />
        <path d="M6 12h68v8H6z" fill="#5a7248" />
        <path d="M2 12l6-6h64l6 6" fill="#8aa270" />
        <rect x="20" y="24" width="40" height="14" rx="2" fill="#e8e2d6" />
        <path d="M26 31h28" stroke="#5a7248" strokeWidth={2} />
      </g>
    ),
  },
  flashlight: {
    w: 100,
    h: 40,
    grounded: false,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={94} cy={20} rx={14} color="#fff6c8" opacity={0.7} />
        <rect x="4" y="12" width="62" height="16" rx="4" fill="#2a3342" />
        <path d="M66 10h12l10-6v32l-10-6H66z" fill="#9aa4b2" />
        <ellipse cx="88" cy="20" rx="3" ry="16" fill="#fff6c8" />
        <rect x="30" y="14" width="10" height="12" rx="2" fill="#ff9f43" />
      </g>
    ),
  },
  "oxygen-mask": {
    w: 70,
    h: 70,
    render: () => (
      <g>
        <path d="M10 30c0-16 50-16 50 0" stroke="#9aa4b2" strokeWidth={3} fill="none" />
        <path d="M18 24h34l6 20c0 14-10 22-23 22S12 58 12 44z" fill="#dff4ff" opacity={0.75} />
        <path d="M24 30h22l4 14c0 8-6 12-15 12s-15-4-15-12z" fill="#5ce1e6" opacity={0.4} />
        <path d="M35 66v4" stroke="#9aa4b2" strokeWidth={6} />
      </g>
    ),
  },
  "repair-tape": {
    w: 64,
    h: 64,
    render: () => (
      <g>
        <circle cx="32" cy="32" r="28" fill="#9aa4b2" />
        <circle cx="32" cy="32" r="12" fill="#2a3342" />
        <circle cx="32" cy="32" r="22" fill="none" stroke="#b9c3cf" strokeWidth={2} />
        <path d="M58 40l6 22-12-4z" fill="#9aa4b2" />
      </g>
    ),
  },

  /* ---------- hologram archive ---------- */
  "holo-galaxy": H((u) =>
    holo(
      u,
      "#5ce1e6",
      <>
        <path d="M40 36c10-10 22-2 18 8s-22 12-30 2-2-26 14-26 26 14 20 28" />
        <circle cx="40" cy="36" r="3" fill="#5ce1e6" />
      </>,
    ),
  ),
  "holo-comet": H((u) =>
    holo(
      u,
      "#5ce1e6",
      <>
        <circle cx="54" cy="22" r="7" />
        <path d="M48 26L14 50M50 30L22 56M46 22L18 40" />
      </>,
    ),
  ),
  "holo-ship": H((u) =>
    holo(
      u,
      "#5ce1e6",
      <>
        <path d="M40 8l10 26v18H30V34z" />
        <path d="M30 40l-10 12h10M50 40l10 12H50M34 52l6 10 6-10" />
        <circle cx="40" cy="28" r="4" />
      </>,
    ),
  ),
  "holo-moon": H((u) =>
    holo(
      u,
      "#5ce1e6",
      <>
        <circle cx="40" cy="34" r="22" />
        <circle cx="32" cy="28" r="5" />
        <circle cx="48" cy="40" r="4" />
        <circle cx="44" cy="24" r="2.5" />
      </>,
    ),
  ),
  "holo-sun": H((u) =>
    holo(
      u,
      "#ffd166",
      <>
        <circle cx="40" cy="34" r="14" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <path key={a} d="M40 14v-8" transform={`rotate(${a} 40 34)`} />
        ))}
      </>,
    ),
  ),
  "holo-asteroid": H((u) =>
    holo(
      u,
      "#5ce1e6",
      <>
        <path d="M22 30l10-14 18-2 12 14-4 20-18 8-16-8z" />
        <circle cx="36" cy="30" r="4" />
        <circle cx="50" cy="40" r="3" />
      </>,
    ),
  ),

  /* ---------- specimen tank ---------- */
  jellyfish: {
    w: 60,
    h: 90,
    grounded: false,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={30} cy={24} rx={30} ry={24} color="#c77dff" opacity={0.45} />
        <path d="M6 30C6 12 16 4 30 4s24 8 24 26z" fill="#d9a8ff" opacity={0.85} />
        <path d="M12 30c0 20 4 40-2 56M22 30c2 20-4 36 2 52M38 30c-2 20 4 36-2 52M48 30c0 20-4 40 2 56" stroke="#c77dff" strokeWidth={2.4} fill="none" />
        <circle cx="22" cy="18" r="3" fill="#fff" opacity={0.6} />
      </g>
    ),
  },
  "alien-egg": {
    w: 50,
    h: 70,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={25} cy={38} rx={26} ry={32} color="#59d98e" opacity={0.45} />
        <ellipse cx="25" cy="40" rx="20" ry="28" fill="#3a8a5a" />
        <g fill="#8fe8a8">
          <circle cx="18" cy="30" r="4" />
          <circle cx="32" cy="42" r="5" />
          <circle cx="20" cy="54" r="3" />
          <circle cx="30" cy="22" r="2.5" />
        </g>
      </g>
    ),
  },
  microbe: {
    w: 70,
    h: 60,
    grounded: false,
    render: () => (
      <g>
        <ellipse cx="35" cy="30" rx="26" ry="18" fill="#6fe0d8" opacity={0.8} />
        {Array.from({ length: 14 }).map((_, i) => {
          const a = (i / 14) * Math.PI * 2;
          const x1 = Math.round((35 + Math.cos(a) * 26) * 10) / 10;
          const y1 = Math.round((30 + Math.sin(a) * 18) * 10) / 10;
          const x2 = Math.round((35 + Math.cos(a) * 33) * 10) / 10;
          const y2 = Math.round((30 + Math.sin(a) * 25) * 10) / 10;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6fe0d8" strokeWidth={2} />;
        })}
        <circle cx="30" cy="28" r="7" fill="#1f8a80" />
        <circle cx="44" cy="34" r="3" fill="#1f8a80" />
      </g>
    ),
  },
  "spore-pod": {
    w: 60,
    h: 70,
    render: () => (
      <g>
        <path d="M30 70V34" stroke="#8a6a9a" strokeWidth={4} />
        <circle cx="30" cy="24" r="20" fill="#b88fd8" />
        {[
          [22, 16],
          [36, 14],
          [40, 28],
          [24, 30],
          [30, 22],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={3} fill="#f2e6ff" />
        ))}
        <circle cx="10" cy="8" r="2" fill="#d9c0f0" />
        <circle cx="52" cy="6" r="1.6" fill="#d9c0f0" />
      </g>
    ),
  },
  "tentacle-plant": {
    w: 70,
    h: 90,
    render: () => (
      <g>
        <path d="M16 74h38l-4 16H20z" fill="#3a4558" />
        <g fill="none" strokeLinecap="round" strokeWidth={7}>
          <path d="M26 74c-10-20 4-30-6-54" stroke="#e35d8a" />
          <path d="M35 74c0-24 12-34 4-62" stroke="#ff7aa8" />
          <path d="M44 74c10-16-2-28 10-44" stroke="#e35d8a" />
        </g>
        <g fill="#ffd0e0">
          <circle cx="20" cy="20" r="3" />
          <circle cx="39" cy="12" r="3" />
          <circle cx="54" cy="30" r="3" />
        </g>
      </g>
    ),
  },

  /* ---------- parts case ---------- */
  gear: {
    w: 64,
    h: 64,
    render: () => (
      <g>
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={i} x="28" y="2" width="8" height="12" rx="1" fill={STEEL_D} transform={`rotate(${i * 36} 32 32)`} />
        ))}
        <circle cx="32" cy="32" r="22" fill={STEEL_D} />
        <circle cx="32" cy="32" r="16" fill={STEEL} />
        <circle cx="32" cy="32" r="7" fill="#2a3342" />
      </g>
    ),
  },
  bolt: {
    w: 90,
    h: 36,
    grounded: false,
    render: () => (
      <g>
        <path d="M4 6h18l6 12-6 12H4z" fill={STEEL_D} />
        <rect x="28" y="12" width="58" height="12" fill={STEEL} />
        <path d="M34 12v12M42 12v12M50 12v12M58 12v12M66 12v12M74 12v12" stroke={STEEL_D} strokeWidth={2} />
      </g>
    ),
  },
  "circuit-board": {
    w: 90,
    h: 64,
    render: () => (
      <g>
        <rect x="4" y="4" width="82" height="56" rx="3" fill="#2a6a3a" />
        <g stroke="#e8c96a" strokeWidth={1.6} fill="none">
          <path d="M10 14h20v14h20M10 46h30l10-10h30M60 10v16h20" />
        </g>
        <rect x="34" y="20" width="22" height="16" rx="1" fill={CHAR} />
        <g fill="#e8c96a">
          {[36, 42, 48, 54].map((x) => (
            <rect key={x} x={x} y="36" width="2" height="4" />
          ))}
        </g>
        <circle cx="72" cy="44" r="5" fill="#c43d3d" />
        <circle cx="16" cy="36" r="4" fill="#3a6fb0" />
      </g>
    ),
  },
  battery: {
    w: 50,
    h: 80,
    render: () => (
      <g>
        <rect x="18" y="2" width="14" height="8" rx="2" fill={STEEL} />
        <rect x="6" y="8" width="38" height="70" rx="6" fill="#2a3342" />
        <rect x="10" y="48" width="30" height="26" rx="3" fill="#59d98e" />
        <rect x="10" y="30" width="30" height="16" rx="3" fill="#59d98e" opacity={0.5} />
        <path d="M28 14l-8 14h8l-6 12" stroke="#ffd166" strokeWidth={3} fill="none" />
      </g>
    ),
  },
  fuse: {
    w: 90,
    h: 36,
    render: () => (
      <g>
        <rect x="4" y="10" width="16" height="16" rx="2" fill={GOLD} />
        <rect x="70" y="10" width="16" height="16" rx="2" fill={GOLD} />
        <rect x="18" y="8" width="54" height="20" rx="4" fill="#dff4ff" opacity={0.6} />
        <path d="M20 18c8-8 12 8 20 0s12 8 20 0 8 4 10 0" stroke="#9aa4b2" strokeWidth={2} fill="none" />
      </g>
    ),
  },
  spring: {
    w: 50,
    h: 80,
    render: () => (
      <g fill="none" stroke={STEEL_D} strokeWidth={5} strokeLinecap="round">
        <path d="M10 8h30M10 72h30" />
        <path d="M40 8L10 18 40 28 10 38 40 48 10 58 40 68" stroke={STEEL} />
      </g>
    ),
  },

  /* ---------- satellite archive ---------- */
  "moon-rock": {
    w: 70,
    h: 56,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={35} cy={30} rx={34} ry={26} color="#c77dff" opacity={0.3} />
        <path d="M8 44l6-22 18-14 22 6 10 20-8 16H16z" fill="#9aa0aa" />
        <circle cx="26" cy="28" r="5" fill="#7a808a" />
        <circle cx="44" cy="36" r="4" fill="#7a808a" />
        <circle cx="38" cy="20" r="2.4" fill="#7a808a" />
        <rect x="6" y="48" width="58" height="8" rx="2" fill="#2a3342" />
      </g>
    ),
  },
  "rocket-model": {
    w: 50,
    h: 110,
    render: () => (
      <g>
        <path d="M25 2c10 12 14 30 14 56v24H11V58c0-26 4-44 14-56z" fill="#eef1f4" />
        <path d="M25 2c10 12 14 30 14 56v24H25z" fill="#000" opacity={0.06} />
        <path d="M18 20h14c-2-8-4-12-7-16-3 4-5 8-7 16z" fill="#e35d3a" />
        <circle cx="25" cy="42" r="6" fill="#5ce1e6" stroke="#9aa4b2" strokeWidth={2} />
        <path d="M11 66L2 90h9zM39 66l9 24h-9z" fill="#e35d3a" />
        <path d="M17 82h16l-3 10H20z" fill="#3a4558" />
        <path d="M21 92c0 8 4 14 4 16 0-2 4-8 4-16z" fill="#ff9f43" />
      </g>
    ),
  },
  "astronaut-toy": {
    w: 50,
    h: 76,
    render: () => (
      <g>
        <rect x="12" y="30" width="26" height="28" rx="6" fill="#f3f5f7" />
        <rect x="18" y="36" width="14" height="8" rx="2" fill="#ff9f43" />
        <rect x="2" y="32" width="10" height="20" rx="5" fill="#dfe4ea" />
        <rect x="38" y="32" width="10" height="20" rx="5" fill="#dfe4ea" />
        <rect x="14" y="56" width="9" height="18" rx="4" fill="#dfe4ea" />
        <rect x="27" y="56" width="9" height="18" rx="4" fill="#dfe4ea" />
        <circle cx="25" cy="18" r="15" fill="#f3f5f7" />
        <ellipse cx="25" cy="19" rx="10" ry="8" fill="#1c2b3d" />
        <path d="M19 15c3-3 7-4 10-2" stroke="#5ce1e6" strokeWidth={2} fill="none" />
      </g>
    ),
  },
  meteorite: {
    w: 70,
    h: 56,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={35} cy={28} rx={30} ry={22} color="#ff7b5c" opacity={0.4} />
        <path d="M10 36c-2-14 10-26 26-26s26 10 24 24-12 20-26 20-22-6-24-18z" fill="#3a2e2a" />
        <path d="M20 24c6-4 12-2 14 4M40 36c4-2 10 0 10 6" stroke="#ff7b5c" strokeWidth={2.4} fill="none" />
        <circle cx="30" cy="38" r="3" fill="#5a4a44" />
      </g>
    ),
  },
};
