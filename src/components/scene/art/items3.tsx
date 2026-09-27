import type { ArtDef } from "./types";
import { Glow } from "./helpers";

/* Items for rooms that hold a second container. */

const GOLD = "#d6a84a";
const GOLD_D = "#a87b2c";
const STEEL = "#b9c0c7";
const STEEL_D = "#8e969f";
const CHAR = "#2f3237";
const PAPER = "#efe4c8";
const PANEL = "#2a3342";

export const items3Art: Record<string, ArtDef> = {
  /* ---------- library desk drawer ---------- */
  "wax-seal": {
    w: 70,
    h: 60,
    render: () => (
      <g>
        <rect x="30" y="2" width="10" height="30" rx="4" fill="#5e3c27" />
        <path d="M22 30h26l-4 10H26z" fill={GOLD_D} />
        <circle cx="35" cy="46" r="14" fill="#9e1f2e" />
        <circle cx="35" cy="46" r="9" fill="none" stroke="#c43d4f" strokeWidth={2} />
        <path d="M31 46l4-6 4 6-4 4z" fill="#c43d4f" />
      </g>
    ),
  },
  spectacles: {
    w: 100,
    h: 40,
    grounded: false,
    render: () => (
      <g fill="none" stroke={GOLD} strokeWidth={3}>
        <circle cx="28" cy="22" r="16" />
        <circle cx="72" cy="22" r="16" />
        <path d="M44 20c4-4 8-4 12 0M12 18L2 10M88 18l10-8" />
        <path d="M20 16l8-4M64 16l8-4" stroke="#fff" strokeOpacity={0.6} />
      </g>
    ),
  },
  "ink-bottle": {
    w: 50,
    h: 64,
    render: () => (
      <g>
        <rect x="16" y="4" width="18" height="12" rx="2" fill="#5e3c27" />
        <path d="M8 18h34l4 44H4z" fill="#1c2a3a" />
        <path d="M10 34h30v26H8z" fill="#10182a" />
        <rect x="12" y="22" width="6" height="34" rx="3" fill="#fff" opacity={0.25} />
        <rect x="14" y="38" width="22" height="12" fill={PAPER} />
      </g>
    ),
  },
  "letter-opener": {
    w: 110,
    h: 30,
    grounded: false,
    render: () => (
      <g>
        <path d="M40 10h60l8 5-8 5H40z" fill={STEEL} />
        <rect x="6" y="8" width="34" height="14" rx="4" fill={GOLD_D} />
        <circle cx="10" cy="15" r="5" fill="#3a6fb0" />
        <path d="M18 10v10M26 10v10" stroke={GOLD} strokeWidth={2} />
      </g>
    ),
  },
  "pocket-watch": {
    w: 70,
    h: 80,
    grounded: false,
    render: () => (
      <g>
        <path d="M35 2c-10 0-10 12 0 12" stroke={GOLD} strokeWidth={3} fill="none" />
        <rect x="31" y="12" width="8" height="8" rx="2" fill={GOLD_D} />
        <circle cx="35" cy="48" r="30" fill={GOLD} />
        <circle cx="35" cy="48" r="24" fill="#fbf8f2" />
        {Array.from({ length: 12 }).map((_, i) => (
          <circle key={i} cx={Math.round((35 + Math.sin((i * Math.PI) / 6) * 20) * 10) / 10} cy={Math.round((48 - Math.cos((i * Math.PI) / 6) * 20) * 10) / 10} r={1.4} fill={CHAR} />
        ))}
        <path d="M35 48V32M35 48l10 6" stroke={CHAR} strokeWidth={2.4} strokeLinecap="round" />
      </g>
    ),
  },
  magnifier: {
    w: 90,
    h: 90,
    grounded: false,
    render: () => (
      <g>
        <path d="M54 54l30 30" stroke="#6b4428" strokeWidth={10} strokeLinecap="round" />
        <circle cx="36" cy="36" r="28" fill="#dff4ff" opacity={0.45} />
        <circle cx="36" cy="36" r="28" fill="none" stroke={GOLD} strokeWidth={6} />
        <path d="M20 26a18 18 0 0 1 12-10" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" />
      </g>
    ),
  },

  /* ---------- astronomer's trunk ---------- */
  astrolabe: {
    w: 70,
    h: 80,
    grounded: false,
    render: () => (
      <g>
        <circle cx="35" cy="8" r="5" fill="none" stroke={GOLD_D} strokeWidth={3} />
        <circle cx="35" cy="44" r="32" fill={GOLD_D} />
        <circle cx="35" cy="44" r="26" fill={GOLD} />
        <circle cx="35" cy="44" r="18" fill="none" stroke={GOLD_D} strokeWidth={1.4} />
        <path d="M10 44h50M35 18v52" stroke={GOLD_D} strokeWidth={1.4} />
        <path d="M22 30l26 28" stroke="#6b4a1c" strokeWidth={3} />
        <circle cx="35" cy="44" r="3" fill="#6b4a1c" />
      </g>
    ),
  },
  sextant: {
    w: 80,
    h: 80,
    grounded: false,
    render: () => (
      <g>
        <path d="M10 70a60 60 0 0 1 60 0" fill="none" stroke={GOLD} strokeWidth={5} />
        <path d="M40 8L10 70M40 8l30 62" stroke={GOLD_D} strokeWidth={4} />
        <path d="M40 8l14 62" stroke="#6b4a1c" strokeWidth={3} />
        <rect x="48" y="26" width="14" height="8" rx="2" fill={STEEL} />
        <circle cx="40" cy="8" r="5" fill={GOLD} />
      </g>
    ),
  },
  lens: {
    w: 70,
    h: 50,
    render: () => (
      <g>
        <ellipse cx="35" cy="26" rx="30" ry="22" fill={GOLD_D} />
        <ellipse cx="35" cy="26" rx="24" ry="17" fill="#bfe3f2" opacity={0.8} />
        <ellipse cx="28" cy="20" rx="8" ry="4" fill="#fff" opacity={0.7} />
      </g>
    ),
  },
  "moon-globe": {
    w: 60,
    h: 80,
    render: () => (
      <g>
        <path d="M18 80l12-14 12 14z" fill="#5e3c27" />
        <circle cx="30" cy="36" r="26" fill="#d9d5cc" />
        <circle cx="20" cy="28" r="6" fill="#b9b3a6" />
        <circle cx="38" cy="44" r="8" fill="#b9b3a6" />
        <circle cx="36" cy="22" r="3" fill="#b9b3a6" />
        <path d="M30 10a26 26 0 0 1 0 52" fill="#000" opacity={0.15} />
      </g>
    ),
  },

  /* ---------- royal vault ---------- */
  ruby: {
    w: 50,
    h: 50,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={25} cy={24} rx={24} color="#ff5a7a" opacity={0.55} />
        <path d="M8 18l8-12h18l8 12-17 26z" fill="#d9203e" />
        <path d="M8 18h34L25 44z" fill="#a8102e" />
        <path d="M16 6l9 12 9-12z" fill="#ff7a92" />
      </g>
    ),
  },
  pearls: {
    w: 80,
    h: 60,
    grounded: false,
    render: () => (
      <g>
        {Array.from({ length: 13 }).map((_, i) => {
          const a = Math.PI * (0.05 + (i / 12) * 0.9);
          return <circle key={i} cx={Math.round(40 - Math.cos(a) * 34)} cy={Math.round(8 + Math.sin(a) * 40)} r={5} fill="#f7f2ea" stroke="#d8cfbf" />;
        })}
        <circle cx="40" cy="52" r="7" fill="#f7f2ea" stroke="#d8cfbf" />
      </g>
    ),
  },
  "royal-seal": {
    w: 60,
    h: 60,
    render: () => (
      <g>
        <circle cx="30" cy="30" r="26" fill={GOLD} />
        <circle cx="30" cy="30" r="20" fill={GOLD_D} />
        <path d="M18 34l-2-14 8 6 6-10 6 10 8-6-2 14z" fill={GOLD} />
        <rect x="16" y="36" width="28" height="4" fill={GOLD} />
      </g>
    ),
  },
  medal: {
    w: 50,
    h: 80,
    grounded: false,
    render: () => (
      <g>
        <path d="M12 0l13 30L38 0z" fill="#3a6fb0" />
        <path d="M20 0l5 12 5-12z" fill="#c43d3d" />
        <circle cx="25" cy="52" r="22" fill={GOLD} />
        <circle cx="25" cy="52" r="16" fill="none" stroke={GOLD_D} strokeWidth={2} />
        <path d="M25 40l4 8 9 1-6 6 2 9-9-4-9 4 2-9-6-6 9-1z" fill={GOLD_D} />
      </g>
    ),
  },
  diamond: {
    w: 60,
    h: 50,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={30} cy={22} rx={28} color="#dff4ff" opacity={0.7} />
        <path d="M6 16l10-12h28l10 12-24 30z" fill="#dff4ff" />
        <path d="M6 16h48L30 46z" fill="#a8d4ee" />
        <path d="M16 4l6 12 8-12 8 12 6-12M22 16l8 30 8-30" stroke="#7ab8dc" strokeWidth={1.4} fill="none" />
      </g>
    ),
  },
  "silver-coins": {
    w: 80,
    h: 50,
    render: () => (
      <g>
        {[
          [20, 36],
          [40, 38],
          [60, 36],
          [30, 26],
          [50, 26],
          [40, 16],
        ].map(([x, y], i) => (
          <g key={i}>
            <ellipse cx={x} cy={y} rx="14" ry="6" fill={STEEL_D} />
            <ellipse cx={x} cy={y - 2} rx="14" ry="6" fill={STEEL} />
            <ellipse cx={x} cy={y - 2} rx="8" ry="3" fill="none" stroke={STEEL_D} />
          </g>
        ))}
      </g>
    ),
  },

  /* ---------- down the well ---------- */
  bucket: {
    w: 70,
    h: 70,
    grounded: false,
    render: () => (
      <g>
        <path d="M35 0v12M12 22c0-14 46-14 46 0" stroke="#8a6a44" strokeWidth={3} fill="none" />
        <path d="M8 22h54l-6 46H14z" fill="#8a5f3c" />
        <path d="M10 34h50M12 56h46" stroke="#2d2926" strokeWidth={4} />
        <ellipse cx="35" cy="22" rx="27" ry="6" fill="#5a8aa8" />
      </g>
    ),
  },
  "old-boot": {
    w: 80,
    h: 60,
    grounded: false,
    render: () => (
      <g>
        <path d="M14 4h24v34c10 4 26 6 34 12v8H10V14z" fill="#5a4a3a" />
        <path d="M14 4h24v8H14z" fill="#3a2e24" />
        <path d="M40 40c6 2 10 2 14 0" stroke="#2a1e14" strokeWidth={2} fill="none" />
        <circle cx="60" cy="48" r="4" fill="#4f7d45" />
        <path d="M22 18l10 4M22 26l10 4" stroke="#8a7a5a" strokeWidth={2} />
      </g>
    ),
  },
  eel: {
    w: 110,
    h: 40,
    grounded: false,
    render: () => (
      <g>
        <path d="M6 22c14-16 26 12 40-2s26 12 40-2 14 6 20 4" stroke="#3a5a3a" strokeWidth={10} fill="none" strokeLinecap="round" />
        <path d="M6 22c14-16 26 12 40-2s26 12 40-2" stroke="#6a8a4a" strokeWidth={3} fill="none" />
        <circle cx="104" cy="22" r="2" fill="#f2d16b" />
      </g>
    ),
  },

  /* ---------- oven ---------- */
  pizza: {
    w: 90,
    h: 50,
    render: () => (
      <g>
        <ellipse cx="45" cy="30" rx="42" ry="18" fill="#d9a45a" />
        <ellipse cx="45" cy="28" rx="36" ry="14" fill="#d9442a" />
        <ellipse cx="45" cy="27" rx="32" ry="12" fill="#f2d16b" opacity={0.85} />
        {[
          [30, 24],
          [52, 22],
          [44, 32],
          [62, 30],
          [24, 32],
        ].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="5" ry="3" fill="#a8243a" />
        ))}
        <path d="M36 20l4 2M56 32l4-2" stroke="#4f7d45" strokeWidth={3} />
      </g>
    ),
  },
  cookies: {
    w: 90,
    h: 40,
    render: () => (
      <g>
        <rect x="2" y="26" width="86" height="10" rx="2" fill={STEEL_D} />
        {[16, 45, 74].map((x) => (
          <g key={x}>
            <ellipse cx={x} cy="24" rx="12" ry="6" fill="#c98a42" />
            <circle cx={x - 4} cy="22" r="2" fill="#4a2e1a" />
            <circle cx={x + 4} cy="25" r="2" fill="#4a2e1a" />
            <circle cx={x + 2} cy="20" r="1.4" fill="#4a2e1a" />
          </g>
        ))}
      </g>
    ),
  },
  muffin: {
    w: 50,
    h: 60,
    render: () => (
      <g>
        <path d="M10 30h30l-4 30H14z" fill="#e35d6a" />
        <path d="M14 30v30M22 30v30M30 30v30M38 30v30" stroke="#c43d4f" strokeWidth={1.4} />
        <path d="M6 32c0-18 10-26 19-26s19 8 19 26z" fill="#b8742a" />
        <circle cx="18" cy="20" r="2.4" fill="#3a2a6a" />
        <circle cx="30" cy="16" r="2.4" fill="#3a2a6a" />
        <circle cx="28" cy="26" r="2.4" fill="#3a2a6a" />
      </g>
    ),
  },
  casserole: {
    w: 100,
    h: 50,
    render: () => (
      <g>
        <path d="M2 18h10M88 18h10" stroke="#9e4f35" strokeWidth={6} strokeLinecap="round" />
        <path d="M8 14h84l-6 34H14z" fill="#c46a4a" />
        <path d="M12 16h76v10H12z" fill="#e8b95a" />
        <path d="M18 18c6 4 12-2 18 2s12-2 18 2 12-2 18 2 10-2 12 0" stroke="#b8742a" strokeWidth={3} fill="none" />
      </g>
    ),
  },
  croissant: {
    w: 90,
    h: 50,
    render: () => (
      <g>
        <path d="M6 40c4-24 24-34 39-34s35 10 39 34c-8-6-16-6-20-2-6-10-32-10-38 0-4-4-12-4-20 2z" fill="#d9954a" />
        <path d="M26 16l6 20M45 8v24M64 16l-6 20" stroke="#b8742a" strokeWidth={3} />
      </g>
    ),
  },
  pretzel: {
    w: 70,
    h: 60,
    render: () => (
      <g fill="none" stroke="#8a4a1a" strokeWidth={9} strokeLinecap="round">
        <path d="M14 52C2 38 6 12 24 12c14 0 12 20 11 26M56 52C68 38 64 12 46 12c-14 0-12 20-11 26M14 52l42-24M56 52L14 28" />
        <path d="M14 52C2 38 6 12 24 12M56 52C68 38 64 12 46 12" stroke="#f3efe6" strokeWidth={1.4} strokeDasharray="1 6" />
      </g>
    ),
  },

  /* ---------- nightstand ---------- */
  diary: {
    w: 70,
    h: 80,
    render: () => (
      <g>
        <rect x="6" y="4" width="54" height="74" rx="4" fill="#b0477e" />
        <rect x="6" y="4" width="10" height="74" rx="3" fill="#8e2e62" />
        <rect x="56" y="34" width="10" height="12" rx="2" fill={GOLD} />
        <path d="M26 30c6-8 14-8 20 0-6 8-14 8-20 0z" fill="#f7d6e6" />
        <circle cx="36" cy="30" r="3" fill={GOLD} />
      </g>
    ),
  },
  "sleep-mask": {
    w: 100,
    h: 44,
    grounded: false,
    render: () => (
      <g>
        <path d="M2 18h96" stroke="#2a2a3a" strokeWidth={3} />
        <path d="M12 10c10-8 30-8 38 4 8-12 28-12 38-4 4 14-4 26-18 26-10 0-16-6-20-12-4 6-10 12-20 12-14 0-22-12-18-26z" fill="#3a3a6a" />
        <path d="M22 22c6 4 12 4 16 0M62 22c6 4 12 4 16 0" stroke="#d9c0f0" strokeWidth={2} fill="none" />
      </g>
    ),
  },
  "alarm-clock": {
    w: 70,
    h: 76,
    render: () => (
      <g>
        <circle cx="16" cy="12" r="10" fill={GOLD} />
        <circle cx="54" cy="12" r="10" fill={GOLD} />
        <path d="M14 70l6-10M56 70l-6-10" stroke={CHAR} strokeWidth={4} />
        <circle cx="35" cy="40" r="28" fill="#e35d3a" />
        <circle cx="35" cy="40" r="22" fill="#fbf8f2" />
        <path d="M35 40V24M35 40l12 4" stroke={CHAR} strokeWidth={3} strokeLinecap="round" />
      </g>
    ),
  },
  earrings: {
    w: 60,
    h: 60,
    grounded: false,
    render: () => (
      <g>
        {[18, 42].map((x) => (
          <g key={x}>
            <path d={`M${x} 4c-6 0-6 10 0 10`} stroke={GOLD} strokeWidth={2} fill="none" />
            <path d={`M${x} 14l8 16-8 22-8-22z`} fill="#3c8a6a" />
            <circle cx={x} cy={30} r="3" fill="#8ff0da" />
          </g>
        ))}
      </g>
    ),
  },
  novel: {
    w: 60,
    h: 84,
    render: () => (
      <g>
        <rect x="6" y="4" width="48" height="76" rx="3" fill="#2f4863" />
        <rect x="6" y="4" width="8" height="76" fill="#1f3044" />
        <rect x="20" y="16" width="28" height="4" fill="#f2d16b" />
        <circle cx="34" cy="44" r="12" fill="#f2d16b" opacity={0.85} />
        <path d="M24 60h20" stroke="#f2d16b" strokeWidth={2} />
        <path d="M44 4v20l-4-4-4 4V4z" fill="#c43d3d" />
      </g>
    ),
  },

  /* ---------- filing cabinet ---------- */
  folder: {
    w: 90,
    h: 64,
    render: () => (
      <g>
        <path d="M4 12h28l6 6h48v44H4z" fill="#e8b93a" />
        <rect x="10" y="6" width="66" height="44" fill="#fbf8f2" transform="rotate(-4 43 28)" />
        <path d="M16 16h40M16 24h50M16 32h34" stroke="#b9c0c7" strokeWidth={2} transform="rotate(-4 43 28)" />
        <path d="M4 26h82v36H4z" fill="#f2c94c" />
        <rect x="56" y="40" width="22" height="8" rx="2" fill="#fbf8f2" />
      </g>
    ),
  },
  stapler: {
    w: 100,
    h: 40,
    render: () => (
      <g>
        <rect x="4" y="28" width="92" height="10" rx="4" fill={CHAR} />
        <path d="M6 26c0-12 10-18 30-18h54c4 0 6 4 6 10v8z" fill="#c43d3d" />
        <path d="M12 20h70" stroke="#e35d6a" strokeWidth={3} />
        <circle cx="86" cy="28" r="3" fill={STEEL} />
      </g>
    ),
  },
  calculator: {
    w: 60,
    h: 84,
    render: () => (
      <g>
        <rect x="4" y="2" width="52" height="80" rx="6" fill="#3a3d42" />
        <rect x="10" y="8" width="40" height="16" rx="2" fill="#b8d0a8" />
        <text x="46" y="20" fontSize="10" fill={CHAR} fontFamily="monospace" textAnchor="end">
          3.14
        </text>
        {Array.from({ length: 16 }).map((_, i) => (
          <rect key={i} x={10 + (i % 4) * 10.5} y={30 + Math.floor(i / 4) * 12} width="8" height="9" rx="2" fill={i % 4 === 3 ? "#ff9f43" : "#6f777f"} />
        ))}
      </g>
    ),
  },
  usb: {
    w: 90,
    h: 36,
    grounded: false,
    render: () => (
      <g>
        <rect x="4" y="6" width="58" height="24" rx="6" fill="#3a6fb0" />
        <rect x="62" y="10" width="22" height="16" fill={STEEL} />
        <rect x="68" y="14" width="4" height="4" fill={STEEL_D} />
        <rect x="76" y="14" width="4" height="4" fill={STEEL_D} />
        <circle cx="14" cy="18" r="4" fill="#1f3a5f" />
      </g>
    ),
  },
  "sticky-notes": {
    w: 70,
    h: 70,
    render: () => (
      <g>
        <rect x="18" y="4" width="46" height="46" fill="#ff9aa8" transform="rotate(8 41 27)" />
        <rect x="6" y="18" width="48" height="48" fill="#f2e24a" />
        <path d="M12 30h32M12 38h26M12 46h30" stroke="#b8a82a" strokeWidth={2} />
      </g>
    ),
  },
  paperclips: {
    w: 80,
    h: 50,
    grounded: false,
    render: () => (
      <g fill="none" strokeWidth={3} strokeLinecap="round">
        {[
          [10, "#c43d3d", -10],
          [30, "#3a6fb0", 6],
          [50, "#59a86a", -4],
        ].map(([x, c, a], i) => (
          <path key={i} d={`M${x} 40V12a6 6 0 0 1 12 0v24a4 4 0 0 1-8 0V16`} stroke={c as string} transform={`rotate(${a} ${(x as number) + 6} 26)`} />
        ))}
      </g>
    ),
  },

  /* ---------- garage storage box ---------- */
  "baseball-glove": {
    w: 80,
    h: 70,
    render: () => (
      <g>
        <path d="M12 66V30C8 18 12 6 22 6c4 0 6 4 6 8V6c0-4 8-4 8 0v6c0-4 8-4 8 0v8c2-4 8-4 8 0v14l10-10c6-2 10 4 6 8L56 46v20z" fill="#b8742a" />
        <path d="M20 40c10 4 22 4 32 0" stroke="#8a4a1a" strokeWidth={2} fill="none" />
        <circle cx="62" cy="54" r="12" fill="#f7f7f5" />
        <path d="M54 46c4 4 4 12 0 16M70 46c-4 4-4 12 0 16" stroke="#c43d3d" strokeWidth={1.6} fill="none" />
      </g>
    ),
  },
  "roller-skate": {
    w: 80,
    h: 76,
    render: () => (
      <g>
        <path d="M14 4h26v34c14 2 28 8 32 18v4H10V10z" fill="#ff8aa8" />
        <path d="M14 4h26v8H14z" fill="#e86a8a" />
        <path d="M18 18l14 4M18 26l14 4" stroke="#fff" strokeWidth={2} />
        <rect x="8" y="58" width="66" height="6" rx="2" fill={CHAR} />
        <circle cx="20" cy="68" r="7" fill="#59d98e" />
        <circle cx="62" cy="68" r="7" fill="#59d98e" />
      </g>
    ),
  },
  kite: {
    w: 70,
    h: 100,
    grounded: false,
    render: () => (
      <g>
        <path d="M35 4L64 36 35 70 6 36z" fill="#e35d3a" />
        <path d="M35 4L64 36H35z" fill="#f2c230" />
        <path d="M6 36h29v34z" fill="#3a6fb0" />
        <path d="M35 4v66M6 36h58" stroke="#2a1a10" strokeWidth={1.4} />
        <path d="M35 70c-6 8 6 12 0 18s6 8 2 12" stroke="#8a6a44" strokeWidth={1.4} fill="none" />
        <path d="M31 80l4 4 4-4M31 92l4 4 4-4" fill="#c43d3d" />
      </g>
    ),
  },
  "fairy-lights": {
    w: 100,
    h: 50,
    grounded: false,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={50} cy={26} rx={50} ry={22} color="#ffd98a" opacity={0.35} />
        <path d="M4 10c16 24 30 24 46 0s30-24 46 0" stroke="#2f5a3a" strokeWidth={2} fill="none" />
        {[
          [12, 20, "#ff5c6c"],
          [26, 28, "#ffd166"],
          [40, 22, "#59d98e"],
          [58, 10, "#5ce1e6"],
          [72, 6, "#c77dff"],
          [86, 12, "#ff9f43"],
        ].map(([x, y, c], i) => (
          <ellipse key={i} cx={x as number} cy={(y as number) + 6} rx="4" ry="6" fill={c as string} />
        ))}
      </g>
    ),
  },
  "snow-globe": {
    w: 60,
    h: 76,
    render: () => (
      <g>
        <path d="M10 76l4-16h32l4 16z" fill="#8a5a36" />
        <circle cx="30" cy="34" r="26" fill="#dff4ff" opacity={0.6} />
        <path d="M14 48h32c-2 6-8 8-16 8s-14-2-16-8z" fill="#fff" />
        <path d="M30 20l8 14h-4l6 10H20l6-10h-4z" fill="#3a6a3a" />
        <g fill="#fff">
          <circle cx="16" cy="26" r="1.6" />
          <circle cx="44" cy="22" r="1.6" />
          <circle cx="40" cy="38" r="1.4" />
          <circle cx="22" cy="16" r="1.4" />
        </g>
        <path d="M14 22a18 18 0 0 1 10-10" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" />
      </g>
    ),
  },
  "yo-yo": {
    w: 60,
    h: 80,
    grounded: false,
    render: () => (
      <g>
        <path d="M30 0v30" stroke="#f3efe6" strokeWidth={1.6} />
        <circle cx="30" cy="52" r="26" fill="#3a6fb0" />
        <circle cx="30" cy="52" r="18" fill="#ffd166" />
        <circle cx="30" cy="52" r="6" fill="#3a6fb0" />
      </g>
    ),
  },

  /* ---------- record crate ---------- */
  vinyl: {
    w: 80,
    h: 80,
    render: () => (
      <g>
        <rect x="4" y="4" width="72" height="72" fill="#e35d8a" />
        <circle cx="52" cy="40" r="30" fill="#16171a" />
        <circle cx="52" cy="40" r="20" fill="none" stroke="#303238" />
        <circle cx="52" cy="40" r="8" fill="#f2c230" />
        <rect x="4" y="4" width="40" height="72" fill="#e35d8a" />
        <path d="M10 60h26M10 66h18" stroke="#fff" strokeWidth={3} />
        <circle cx="24" cy="30" r="10" fill="#fff" opacity={0.7} />
      </g>
    ),
  },
  cassette: {
    w: 90,
    h: 56,
    render: () => (
      <g>
        <rect x="4" y="4" width="82" height="50" rx="4" fill={CHAR} />
        <rect x="12" y="10" width="66" height="16" rx="2" fill="#f2c230" />
        <rect x="24" y="30" width="42" height="14" rx="6" fill="#16171a" />
        <circle cx="34" cy="37" r="5" fill="#f3efe6" />
        <circle cx="56" cy="37" r="5" fill="#f3efe6" />
        <path d="M24 50h42l-4-6H28z" fill="#4a4f57" />
      </g>
    ),
  },
  microphone: {
    w: 40,
    h: 100,
    render: () => (
      <g>
        <rect x="16" y="40" width="8" height="54" rx="3" fill={CHAR} />
        <rect x="8" y="94" width="24" height="6" rx="2" fill={CHAR} />
        <rect x="8" y="4" width="24" height="38" rx="12" fill={STEEL} />
        <path d="M10 14h20M10 22h20M10 30h20" stroke={STEEL_D} strokeWidth={1.4} />
        <rect x="8" y="34" width="24" height="8" fill="#c43d3d" />
      </g>
    ),
  },
  harmonica: {
    w: 100,
    h: 36,
    render: () => (
      <g>
        <rect x="4" y="6" width="92" height="12" rx="2" fill={STEEL} />
        <rect x="4" y="18" width="92" height="10" fill="#6b4428" />
        <rect x="4" y="28" width="92" height="4" rx="1" fill={STEEL_D} />
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={i} x={10 + i * 8.4} y="20" width="4" height="6" fill="#1a1a1a" />
        ))}
      </g>
    ),
  },
  maracas: {
    w: 80,
    h: 90,
    render: () => (
      <g>
        {[
          [24, -12, "#e35d3a"],
          [56, 12, "#2f9a8a"],
        ].map(([x, a, c], i) => (
          <g key={i} transform={`rotate(${a} ${x} 70)`}>
            <rect x={(x as number) - 3} y="40" width="6" height="46" rx="3" fill="#b8854a" />
            <ellipse cx={x as number} cy="26" rx="16" ry="22" fill={c as string} />
            <path d={`M${(x as number) - 12} 22h24M${(x as number) - 10} 32h20`} stroke="#f2c230" strokeWidth={3} />
          </g>
        ))}
      </g>
    ),
  },
  metronome: {
    w: 60,
    h: 90,
    render: () => (
      <g>
        <path d="M16 4h28l12 84H4z" fill="#6b3a1c" />
        <path d="M30 4h14l12 84H30z" fill="#000" opacity={0.12} />
        <path d="M18 30h24l6 44H12z" fill="#f3efe6" />
        <path d="M30 76L40 20" stroke={GOLD} strokeWidth={3} />
        <rect x="35" y="36" width="8" height="6" fill={GOLD_D} transform="rotate(20 39 39)" />
      </g>
    ),
  },

  /* ---------- tree hollow ---------- */
  squirrel: {
    w: 80,
    h: 70,
    render: () => (
      <g>
        <path d="M20 60C0 50 2 20 14 10c10-8 20 4 14 16-4 8-4 18 2 24z" fill="#c46a2a" />
        <path d="M20 60C6 50 6 26 16 18" stroke="#e8a060" strokeWidth={4} fill="none" />
        <ellipse cx="46" cy="50" rx="18" ry="16" fill="#d9772a" />
        <circle cx="58" cy="30" r="12" fill="#d9772a" />
        <path d="M54 20l2-10 6 8z" fill="#d9772a" />
        <circle cx="62" cy="28" r="2" fill="#111" />
        <ellipse cx="46" cy="54" rx="9" ry="9" fill="#f2c9a0" />
        <ellipse cx="60" cy="46" rx="6" ry="5" fill="#8a5a2a" />
      </g>
    ),
  },
  hazelnuts: {
    w: 80,
    h: 40,
    render: () => (
      <g>
        {[14, 32, 50, 66, 40, 24].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={i > 3 ? 18 : 28} r="9" fill="#9a6a3a" />
            <path d={`M${x - 8} ${(i > 3 ? 18 : 28) - 3}c4-6 12-6 16 0`} fill="#c9a06a" />
          </g>
        ))}
      </g>
    ),
  },
  toadstool: {
    w: 60,
    h: 70,
    render: () => (
      <g>
        <path d="M24 70c-2-16 0-28 2-32h8c2 4 4 16 2 32z" fill="#f3efe6" />
        <path d="M4 40c0-20 12-34 26-34s26 14 26 34z" fill="#d9203e" />
        {[
          [18, 22],
          [34, 16],
          [44, 30],
          [26, 34],
          [12, 34],
        ].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="4" ry="3" fill="#fff" />
        ))}
      </g>
    ),
  },
  ladybug: {
    w: 60,
    h: 50,
    render: () => (
      <g>
        <circle cx="46" cy="26" r="9" fill={CHAR} />
        <ellipse cx="28" cy="28" rx="22" ry="18" fill="#d9203e" />
        <path d="M28 10v36" stroke={CHAR} strokeWidth={2.4} />
        {[
          [18, 20],
          [38, 20],
          [16, 34],
          [40, 34],
          [28, 28],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={3.5} fill={CHAR} />
        ))}
        <path d="M50 18l6-8M52 22l8-4" stroke={CHAR} strokeWidth={1.6} />
      </g>
    ),
  },
  pinecone: {
    w: 50,
    h: 70,
    render: () => (
      <g>
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 3 }).map((_, c) => (
            <path key={`${r}${c}`} d={`M${12 + c * 13 - (r % 2) * 6} ${10 + r * 10}l6 8-6 4-6-4z`} fill={r % 2 ? "#8a5a36" : "#6b4428"} />
          )),
        )}
        <path d="M25 70v-6" stroke="#4a2e1a" strokeWidth={3} />
      </g>
    ),
  },
  caterpillar: {
    w: 100,
    h: 44,
    render: () => (
      <g>
        {[14, 28, 42, 56, 70].map((x, i) => (
          <circle key={x} cx={x} cy={i % 2 ? 26 : 30} r="10" fill={i % 2 ? "#7fbf4a" : "#6fae3a"} />
        ))}
        <circle cx="86" cy="22" r="12" fill="#8fce4a" />
        <circle cx="90" cy="18" r="2.4" fill="#111" />
        <path d="M82 10l-4-8M90 10l2-8" stroke="#3a5a2a" strokeWidth={2} />
      </g>
    ),
  },

  /* ---------- mailbox ---------- */
  postcard: {
    w: 90,
    h: 60,
    render: () => (
      <g>
        <rect x="4" y="4" width="82" height="54" rx="2" fill="#fbf8f2" />
        <rect x="8" y="8" width="38" height="46" fill="#8fbde0" />
        <path d="M8 40l12-12 10 8 16-14v32H8z" fill="#5a8a5a" />
        <rect x="66" y="10" width="14" height="16" fill="#c43d4f" />
        <path d="M52 34h28M52 42h28M52 50h20" stroke="#b9c0c7" strokeWidth={2} />
      </g>
    ),
  },
  parcel: {
    w: 80,
    h: 70,
    render: () => (
      <g>
        <rect x="6" y="14" width="68" height="54" fill="#c9a06a" />
        <path d="M6 14l10-10h48l10 10z" fill="#d9b884" />
        <rect x="36" y="4" width="8" height="64" fill="#8a6a44" opacity={0.6} />
        <rect x="14" y="28" width="20" height="14" fill="#fbf8f2" />
        <path d="M50 30l12 12M62 30L50 42" stroke="#c43d3d" strokeWidth={3} />
      </g>
    ),
  },
  newspaper: {
    w: 90,
    h: 60,
    render: () => (
      <g>
        <rect x="4" y="4" width="82" height="54" fill="#e8e2d6" />
        <rect x="10" y="8" width="70" height="10" fill={CHAR} />
        <rect x="10" y="22" width="30" height="24" fill="#b9c0c7" />
        <path d="M46 24h34M46 30h34M46 36h34M46 42h26M10 50h70" stroke="#8e969f" strokeWidth={2} />
      </g>
    ),
  },
  stamp: {
    w: 50,
    h: 60,
    render: () => (
      <g>
        <rect x="4" y="4" width="42" height="52" fill="#fbf8f2" stroke="#d8cfbf" strokeWidth={2} strokeDasharray="3 2" />
        <rect x="10" y="10" width="30" height="34" fill="#3a6fb0" />
        <circle cx="25" cy="24" r="8" fill="#f2c230" />
        <path d="M12 40l8-8 6 4 8-8 6 6v6H12z" fill="#2a4a78" />
        <text x="25" y="53" fontSize="7" textAnchor="middle" fill={CHAR} fontFamily="serif">
          1p
        </text>
      </g>
    ),
  },
  magazine: {
    w: 70,
    h: 86,
    render: () => (
      <g>
        <rect x="4" y="4" width="62" height="80" rx="2" fill="#9fd08a" />
        <text x="35" y="20" fontSize="12" fontWeight="700" textAnchor="middle" fill="#2f5a3a" fontFamily="serif">
          GARDEN
        </text>
        <circle cx="35" cy="48" r="16" fill="#e07a88" />
        <circle cx="35" cy="48" r="6" fill="#f2c230" />
        <path d="M35 64v14M28 72c4-4 10-4 14 0" stroke="#2f5a3a" strokeWidth={3} fill="none" />
      </g>
    ),
  },

  /* ---------- space food ---------- */
  "food-tube": {
    w: 40,
    h: 90,
    render: () => (
      <g>
        <path d="M6 4h28l-4 70H10z" fill="#eef1f4" />
        <rect x="6" y="2" width="28" height="6" rx="2" fill="#9aa4b2" />
        <rect x="14" y="74" width="12" height="12" rx="2" fill="#ff9f43" />
        <rect x="10" y="24" width="20" height="30" fill="#59d98e" />
        <text x="20" y="42" fontSize="7" textAnchor="middle" fill={PANEL} fontFamily="sans-serif">
          PEA
        </text>
      </g>
    ),
  },
  "space-icecream": {
    w: 70,
    h: 60,
    render: () => (
      <g>
        <rect x="4" y="8" width="62" height="50" rx="4" fill="#dfe4ea" />
        <rect x="12" y="18" width="46" height="10" fill="#8a4a2a" />
        <rect x="12" y="28" width="46" height="10" fill="#f3efe6" />
        <rect x="12" y="38" width="46" height="10" fill="#ff8aa8" />
        <path d="M4 8l6-6h50l6 6" fill="#b9c3cf" />
      </g>
    ),
  },
  "protein-bar": {
    w: 100,
    h: 36,
    render: () => (
      <g>
        <rect x="6" y="8" width="88" height="22" rx="4" fill="#2a3342" />
        <path d="M2 8l6 6-6 6 6 6-6 4M98 8l-6 6 6 6-6 6 6 4" fill="#2a3342" />
        <rect x="30" y="12" width="40" height="14" rx="2" fill="#ff9f43" />
        <path d="M34 19h32" stroke="#2a3342" strokeWidth={2} />
      </g>
    ),
  },
  "juice-pouch": {
    w: 50,
    h: 80,
    render: () => (
      <g>
        <rect x="20" y="0" width="10" height="12" rx="2" fill="#ff5c6c" />
        <path d="M8 12h34l4 64H4z" fill="#c77dff" />
        <circle cx="25" cy="42" r="10" fill="#ffd166" />
        <path d="M10 18h30" stroke="#fff" strokeOpacity={0.5} strokeWidth={2} />
      </g>
    ),
  },
  "noodle-cup": {
    w: 60,
    h: 70,
    render: () => (
      <g>
        <path d="M6 16h48l-6 52H12z" fill="#eef1f4" />
        <path d="M8 30h44l-2 14H10z" fill="#ff5c6c" />
        <ellipse cx="30" cy="16" rx="24" ry="6" fill="#f2d16b" />
        <path d="M14 14c4-4 8 4 12 0s8 4 12 0 6 2 8 0" stroke="#e8b93a" strokeWidth={2} fill="none" />
        <path d="M40 16L52 0M44 16L58 4" stroke="#b8854a" strokeWidth={3} />
      </g>
    ),
  },

  /* ---------- engineer's toolkit ---------- */
  multitool: {
    w: 100,
    h: 40,
    grounded: false,
    render: () => (
      <g>
        <rect x="10" y="12" width="66" height="16" rx="8" fill="#c43d3d" />
        <path d="M76 20l20-10v6l-16 6z" fill={STEEL} />
        <path d="M76 22l18 10h-8l-12-6z" fill={STEEL_D} />
        <path d="M12 16L2 6" stroke={STEEL} strokeWidth={4} strokeLinecap="round" />
        <path d="M24 20h44" stroke="#9e1f2e" strokeWidth={2} />
        <path d="M40 18l4-4 4 4-4 4z" fill="#f3efe6" />
      </g>
    ),
  },
  "laser-cutter": {
    w: 110,
    h: 44,
    grounded: false,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={100} cy={22} rx={12} color="#ff5c6c" opacity={0.7} />
        <rect x="4" y="14" width="30" height="24" rx="6" fill={PANEL} />
        <rect x="30" y="10" width="54" height="18" rx="6" fill="#eef1f4" />
        <rect x="84" y="16" width="10" height="8" fill={STEEL_D} />
        <path d="M94 20h14" stroke="#ff5c6c" strokeWidth={3} />
        <rect x="42" y="14" width="18" height="8" rx="2" fill="#ff9f43" />
      </g>
    ),
  },
  "wire-spool": {
    w: 70,
    h: 70,
    render: () => (
      <g>
        <ellipse cx="35" cy="60" rx="30" ry="9" fill={STEEL_D} />
        <rect x="12" y="16" width="46" height="44" fill="#e8742a" />
        <g stroke="#c45a1a" strokeWidth={2}>
          {[24, 32, 40, 48].map((y) => (
            <path key={y} d={`M12 ${y}h46`} />
          ))}
        </g>
        <ellipse cx="35" cy="14" rx="30" ry="9" fill={STEEL} />
        <ellipse cx="35" cy="14" rx="8" ry="3" fill={PANEL} />
      </g>
    ),
  },
  voltmeter: {
    w: 70,
    h: 90,
    render: () => (
      <g>
        <rect x="6" y="4" width="58" height="84" rx="8" fill="#f2c230" />
        <rect x="12" y="10" width="46" height="24" rx="2" fill="#b8d0a8" />
        <text x="54" y="27" fontSize="11" fill={CHAR} fontFamily="monospace" textAnchor="end">
          12.6
        </text>
        <circle cx="35" cy="56" r="14" fill={CHAR} />
        <path d="M35 56l8-8" stroke="#f2c230" strokeWidth={3} />
        <circle cx="20" cy="80" r="4" fill="#c43d3d" />
        <circle cx="50" cy="80" r="4" fill={CHAR} />
      </g>
    ),
  },
  goggles: {
    w: 100,
    h: 44,
    grounded: false,
    render: () => (
      <g>
        <path d="M2 22h96" stroke="#8e969f" strokeWidth={6} />
        <rect x="10" y="6" width="36" height="32" rx="12" fill="#6f777f" />
        <rect x="54" y="6" width="36" height="32" rx="12" fill="#6f777f" />
        <circle cx="28" cy="22" r="11" fill="#ff9f43" opacity={0.85} />
        <circle cx="72" cy="22" r="11" fill="#ff9f43" opacity={0.85} />
        <path d="M22 16l6-4M66 16l6-4" stroke="#fff" strokeWidth={3} strokeLinecap="round" />
      </g>
    ),
  },
  "hex-keys": {
    w: 80,
    h: 60,
    grounded: false,
    render: () => (
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${14 + i * 12} 6v${40 - i * 6}h${24 - i * 3}`} stroke={i % 2 ? STEEL : STEEL_D} strokeWidth={5 - i * 0.6} />
        ))}
        <rect x="6" y="42" width="60" height="12" rx="4" fill="#c43d3d" stroke="none" />
      </g>
    ),
  },
};
