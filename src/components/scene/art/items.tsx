import type { ArtDef } from "./types";
import { Glow } from "./helpers";

/* Small objects found inside containers (shelves, chests, wardrobes, fridges, kits). */

const GOLD = "#d6a84a";
const GOLD_D = "#a87b2c";
const PAPER = "#efe4c8";
const PAPER_D = "#d8c9a4";
const INK = "#2a211a";
const STEEL = "#b9c0c7";
const STEEL_D = "#8e969f";
const CHAR = "#2f3237";

export const itemArt: Record<string, ArtDef> = {
  /* ---------- scholar's shelf ---------- */
  tome: {
    w: 90,
    h: 70,
    render: () => (
      <g>
        <path d="M4 40h82v26H4z" fill="#6b2d2d" />
        <path d="M8 44h74v6H8z" fill={PAPER} />
        <path d="M8 52h74v2H8z" fill={PAPER_D} />
        <path d="M10 14h70v28H10z" fill="#2d4a6b" />
        <path d="M14 18h62v4H14z" fill={PAPER} />
        <rect x="36" y="24" width="18" height="12" rx="2" fill={GOLD} />
        <path d="M4 40h82" stroke={GOLD} strokeWidth={2} />
        <path d="M4 64h82" stroke={GOLD} strokeWidth={2} />
      </g>
    ),
  },
  scroll: {
    w: 100,
    h: 50,
    render: () => (
      <g>
        <rect x="14" y="14" width="72" height="30" fill={PAPER} />
        <path d="M22 22h50M22 28h40M22 34h46" stroke="#a8977a" strokeWidth={1.4} />
        <rect x="4" y="10" width="14" height="38" rx="7" fill={PAPER_D} />
        <rect x="82" y="10" width="14" height="38" rx="7" fill={PAPER_D} />
        <rect x="8" y="6" width="6" height="46" rx="3" fill="#6b4428" />
        <rect x="86" y="6" width="6" height="46" rx="3" fill="#6b4428" />
        <path d="M50 44v6l-5 -3" fill="#8b1e2b" />
        <circle cx="50" cy="44" r="5" fill="#8b1e2b" />
      </g>
    ),
  },
  quill: {
    w: 70,
    h: 90,
    render: () => (
      <g>
        <path d="M40 4c20 6 26 30 8 54L22 80c6-24 6-50 18-76z" fill="#f3efe6" />
        <path d="M40 4c-4 28-8 52-18 76" stroke="#c9bfae" strokeWidth={1.5} fill="none" />
        <path d="M22 80l-4 8" stroke={INK} strokeWidth={2} />
        <path d="M30 70h36v20H30z" fill="#1c2a3a" rx={3} />
        <ellipse cx="48" cy="70" rx="18" ry="4" fill="#2d4a6b" />
        <ellipse cx="48" cy="70" rx="12" ry="2.4" fill="#0b0f16" />
      </g>
    ),
  },
  "herb-jar": {
    w: 60,
    h: 80,
    render: () => (
      <g>
        <rect x="8" y="18" width="44" height="60" rx="10" fill="#cfe6d8" opacity={0.45} />
        <path d="M14 76c0-20 6-34 16-40 10 6 16 20 16 40z" fill="#5d8c55" />
        <path d="M22 60c4-8 12-10 16-6M24 70c6-6 12-6 16-2" stroke="#7fb06f" strokeWidth={2} fill="none" />
        <rect x="8" y="18" width="44" height="60" rx="10" fill="none" stroke="#e8f4ec" strokeOpacity={0.7} strokeWidth={2} />
        <rect x="12" y="6" width="36" height="14" rx="3" fill="#8a5a36" />
        <rect x="14" y="44" width="32" height="14" fill={PAPER} />
        <path d="M18 51h24" stroke="#8a7a5a" strokeWidth={1.4} />
      </g>
    ),
  },
  key: {
    w: 100,
    h: 44,
    render: () => (
      <g>
        <circle cx="20" cy="22" r="16" fill="none" stroke={GOLD} strokeWidth={7} />
        <circle cx="20" cy="22" r="5" fill={GOLD_D} />
        <rect x="34" y="18" width="62" height="8" rx="2" fill={GOLD} />
        <path d="M76 26v12h6V26M86 26v8h6v-8" fill={GOLD} />
        <path d="M34 18h62" stroke="#fff" strokeOpacity={0.35} strokeWidth={2} />
      </g>
    ),
  },
  "star-map": {
    w: 90,
    h: 80,
    render: () => (
      <g>
        <path d="M4 10h82v64H4z" fill="#1d2440" />
        <path d="M4 10h82v64H4z" fill="none" stroke={GOLD} strokeWidth={3} />
        {[
          [20, 26],
          [36, 40],
          [54, 30],
          [70, 50],
          [48, 60],
          [26, 58],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 2 ? 2 : 3} fill="#f5e6b8" />
        ))}
        <path d="M20 26L36 40 54 30 70 50 48 60 26 58 36 40" stroke="#f5e6b8" strokeOpacity={0.5} fill="none" />
        <circle cx="45" cy="42" r="24" fill="none" stroke={GOLD} strokeOpacity={0.5} />
        <rect x="0" y="4" width="90" height="8" rx="4" fill="#6b4428" />
      </g>
    ),
  },

  /* ---------- alchemist's cabinet ---------- */
  "flask-round": {
    w: 60,
    h: 80,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={30} cy={52} rx={30} color="#6bd4a8" opacity={0.45} />
        <rect x="24" y="4" width="12" height="28" fill="#dbe8ef" opacity={0.6} />
        <rect x="22" y="0" width="16" height="8" rx="2" fill="#8a5a36" />
        <circle cx="30" cy="54" r="24" fill="#dbe8ef" opacity={0.35} />
        <path d="M8 58a22 22 0 0 0 44 0c0-4-1-6-2-8H10c-1 2-2 4-2 8z" fill="#3fc49a" />
        <circle cx="22" cy="46" r="4" fill="#fff" opacity={0.6} />
        <circle cx="36" cy="62" r="2.4" fill="#c6ffe9" />
      </g>
    ),
  },
  "flask-tall": {
    w: 44,
    h: 100,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={22} cy={70} rx={24} ry={30} color="#e35d6a" opacity={0.4} />
        <rect x="16" y="6" width="12" height="30" fill="#e8dfe2" opacity={0.5} />
        <rect x="14" y="0" width="16" height="8" rx="2" fill="#6b4428" />
        <path d="M16 36L4 90c-1 6 3 10 8 10h20c5 0 9-4 8-10L28 36z" fill="#e8dfe2" opacity={0.35} />
        <path d="M11 60L4 90c-1 6 3 10 8 10h20c5 0 9-4 8-10l-7-30z" fill="#d64a5a" />
        <path d="M12 64l-4 22" stroke="#fff" strokeOpacity={0.5} strokeWidth={3} strokeLinecap="round" />
      </g>
    ),
  },
  crystal: {
    w: 60,
    h: 80,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={30} cy={40} rx={32} color="#9ad0ff" opacity={0.5} />
        <path d="M10 80l6-30 10 30z" fill="#6f95d8" />
        <path d="M22 80l8-70 10 70z" fill="#9ad0ff" />
        <path d="M30 10l10 70H30z" fill="#6fa8e8" />
        <path d="M36 80l8-40 8 40z" fill="#b8dcff" />
        <rect x="6" y="76" width="48" height="4" rx="2" fill="#5a4a3a" />
      </g>
    ),
  },
  "mushroom-jar": {
    w: 60,
    h: 80,
    render: () => (
      <g>
        <rect x="8" y="20" width="44" height="58" rx="8" fill="#e8e0d2" opacity={0.35} />
        <rect x="16" y="52" width="6" height="24" fill="#f3efe6" />
        <path d="M8 54c0-12 10-18 11-18s11 6 11 18z" fill="#c43d3d" />
        <circle cx="14" cy="48" r="2" fill="#fff" />
        <circle cx="22" cy="44" r="2" fill="#fff" />
        <rect x="36" y="58" width="5" height="18" fill="#f3efe6" />
        <path d="M30 60c0-9 7-13 8-13s9 4 9 13z" fill="#d9a441" />
        <rect x="8" y="20" width="44" height="58" rx="8" fill="none" stroke="#f3efe6" strokeOpacity={0.6} strokeWidth={2} />
        <rect x="10" y="10" width="40" height="12" rx="3" fill="#5e3c27" />
      </g>
    ),
  },
  vial: {
    w: 70,
    h: 70,
    render: () => (
      <g>
        <rect x="2" y="44" width="66" height="10" rx="2" fill="#6b4428" />
        <rect x="6" y="54" width="4" height="16" fill="#4a2e1a" />
        <rect x="60" y="54" width="4" height="16" fill="#4a2e1a" />
        {["#57a6e8", "#f0c14b", "#c77dff", "#6bd4a8"].map((c, i) => (
          <g key={c}>
            <rect x={10 + i * 14} y={8} width={9} height={46} rx={4.5} fill="#e8f0f4" opacity={0.35} />
            <rect x={10 + i * 14} y={24 + (i % 2) * 8} width={9} height={30 - (i % 2) * 8} rx={4.5} fill={c} />
            <rect x={9 + i * 14} y={4} width={11} height={6} rx={1.5} fill="#8a5a36" />
          </g>
        ))}
      </g>
    ),
  },
  mortar: {
    w: 80,
    h: 64,
    render: () => (
      <g>
        <path d="M44 26L70 2" stroke="#9c8c7a" strokeWidth={8} strokeLinecap="round" />
        <path d="M6 24h68c0 20-14 34-34 34S6 44 6 24z" fill="#8f877c" />
        <path d="M40 24h34c0 20-14 34-34 34z" fill="#000" opacity={0.12} />
        <ellipse cx="40" cy="24" rx="34" ry="7" fill="#a8a094" />
        <ellipse cx="40" cy="24" rx="26" ry="4" fill="#5d8c55" />
        <rect x="26" y="56" width="28" height="8" rx="2" fill="#7a7266" />
      </g>
    ),
  },
  "herb-bundle": {
    w: 60,
    h: 90,
    grounded: false,
    render: () => (
      <g>
        <line x1="30" y1="0" x2="30" y2="14" stroke="#8a7a5a" strokeWidth={2} />
        <rect x="24" y="12" width="12" height="8" rx="2" fill="#b8923a" />
        <g fill="#7a9a5a">
          <path d="M30 20C18 30 10 56 14 86c8-20 12-40 16-66z" />
          <path d="M30 20c12 10 20 36 16 66-8-20-12-40-16-66z" fill="#6b8a4a" />
          <path d="M30 20c-4 20-4 44 0 70 4-26 4-50 0-70z" fill="#8fb06a" />
        </g>
        <g fill="#b88fd8">
          <circle cx="18" cy="70" r="3" />
          <circle cx="42" cy="76" r="3" />
          <circle cx="30" cy="84" r="3" />
        </g>
      </g>
    ),
  },

  /* ---------- treasure & traveller's chest ---------- */
  ring: {
    w: 60,
    h: 60,
    grounded: false,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={30} cy={16} rx={20} color="#ff6b8a" opacity={0.5} />
        <ellipse cx="30" cy="38" rx="22" ry="18" fill="none" stroke={GOLD} strokeWidth={7} />
        <ellipse cx="30" cy="38" rx="22" ry="18" fill="none" stroke="#fff" strokeOpacity={0.3} strokeWidth={2} />
        <path d="M18 18l12-14 12 14-12 10z" fill="#e8385a" />
        <path d="M18 18h24L30 28z" fill="#b8243e" />
      </g>
    ),
  },
  necklace: {
    w: 90,
    h: 70,
    grounded: false,
    render: () => (
      <g>
        <path d="M6 6c4 34 20 52 39 52S80 40 84 6" fill="none" stroke={GOLD} strokeWidth={3} strokeDasharray="4 2" />
        {[16, 28, 62, 74].map((x, i) => (
          <circle key={x} cx={x} cy={[26, 40, 40, 26][i]} r={4} fill="#f3efe6" />
        ))}
        <path d="M45 50l10 10-10 10-10-10z" fill="#3a6fb0" />
        <path d="M45 50l10 10H35z" fill="#6f95d8" />
      </g>
    ),
  },
  dagger: {
    w: 110,
    h: 36,
    grounded: false,
    render: () => (
      <g>
        <path d="M40 12h56l12 6-12 6H40z" fill={STEEL} />
        <path d="M40 12h56l12 6H40z" fill="#fff" opacity={0.35} />
        <rect x="32" y="2" width="8" height="32" rx="3" fill={GOLD} />
        <rect x="8" y="13" width="24" height="10" rx="3" fill="#5a1f24" />
        <circle cx="6" cy="18" r="6" fill={GOLD} />
        <circle cx="36" cy="18" r="3" fill="#e8385a" />
      </g>
    ),
  },
  pouch: {
    w: 70,
    h: 70,
    render: () => (
      <g>
        <path d="M14 30c-10 16-8 38 21 38s31-22 21-38z" fill="#8a5a36" />
        <path d="M35 30h21c10 16 8 38-21 38z" fill="#000" opacity={0.14} />
        <path d="M18 30l-4-12 10 4 11-10 11 10 10-4-4 12z" fill="#a8744a" />
        <path d="M16 30h38" stroke={GOLD} strokeWidth={4} />
        <circle cx="28" cy="16" r="5" fill={GOLD} />
        <circle cx="40" cy="12" r="5" fill={GOLD} />
      </g>
    ),
  },
  scepter: {
    w: 120,
    h: 40,
    grounded: false,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={104} cy={20} rx={18} color="#9d7bff" opacity={0.6} />
        <rect x="6" y="16" width="84" height="8" rx="4" fill={GOLD} />
        <rect x="30" y="14" width="6" height="12" rx="2" fill={GOLD_D} />
        <rect x="60" y="14" width="6" height="12" rx="2" fill={GOLD_D} />
        <path d="M88 20l8-12h8l-4 12 4 12h-8z" fill={GOLD_D} />
        <circle cx="106" cy="20" r="10" fill="#9d7bff" />
        <circle cx="102" cy="16" r="3" fill="#fff" opacity={0.6} />
      </g>
    ),
  },
  tiara: {
    w: 90,
    h: 50,
    grounded: false,
    render: () => (
      <g>
        <path d="M4 44c10-10 26-14 41-14s31 4 41 14" fill="none" stroke={GOLD} strokeWidth={5} />
        <path d="M20 34l6-16 8 12 11-24 11 24 8-12 6 16" fill="none" stroke={GOLD} strokeWidth={3} strokeLinejoin="round" />
        <circle cx="45" cy="8" r="5" fill="#9ad0ff" />
        <circle cx="26" cy="20" r="3" fill="#e8385a" />
        <circle cx="64" cy="20" r="3" fill="#e8385a" />
      </g>
    ),
  },
  cloak: {
    w: 100,
    h: 60,
    grounded: false,
    render: () => (
      <g>
        <path d="M6 16c10-10 78-10 88 0v34c-10 8-78 8-88 0z" fill="#2f4a3a" />
        <path d="M6 30c30 8 58 8 88 0" stroke="#223a2c" strokeWidth={3} fill="none" />
        <path d="M6 42c30 8 58 8 88 0" stroke="#223a2c" strokeWidth={3} fill="none" />
        <path d="M6 16c10-10 78-10 88 0" stroke="#4a6a52" strokeWidth={4} fill="none" />
        <circle cx="50" cy="12" r="6" fill={GOLD} />
      </g>
    ),
  },
  boots: {
    w: 90,
    h: 70,
    render: () => (
      <g>
        {[0, 38].map((dx) => (
          <g key={dx} transform={`translate(${dx} 0)`}>
            <path d="M8 4h26v46l14 8v10H8z" fill={dx ? "#6b4428" : "#7a4e30"} />
            <rect x="8" y="4" width="26" height="8" fill="#4a2e1a" />
            <rect x="6" y="64" width="44" height="6" rx="2" fill="#2e1c10" />
          </g>
        ))}
      </g>
    ),
  },
  map: {
    w: 100,
    h: 70,
    grounded: false,
    render: () => (
      <g>
        <path d="M4 8l30-6 32 6 30-6v60l-30 6-32-6-30 6z" fill={PAPER} />
        <path d="M34 2v60M66 8v60" stroke={PAPER_D} strokeWidth={1.5} />
        <path d="M14 42c10-14 24-18 34-8s26 8 38-10" stroke="#3a6fb0" strokeWidth={2} fill="none" />
        <path d="M20 20c6-4 12 0 10 6s-10 4-10-6z" fill="#7a9a5a" />
        <path d="M70 46l6 6m0-6l-6 6" stroke="#b23a3a" strokeWidth={3} />
        <path d="M22 50l40 0" stroke="#8a6a44" strokeWidth={1.4} strokeDasharray="3 3" />
      </g>
    ),
  },
  compass: {
    w: 64,
    h: 64,
    grounded: false,
    render: () => (
      <g>
        <circle cx="32" cy="32" r="30" fill={GOLD_D} />
        <circle cx="32" cy="32" r="24" fill={PAPER} />
        <path d="M32 12l6 20-6 20-6-20z" fill="#b23a3a" />
        <path d="M32 32l6 0-6 20-6-20z" fill="#2a3a4a" />
        <circle cx="32" cy="32" r="3" fill={GOLD} />
        <text x="29" y="21" fontSize="6" fill={INK} fontFamily="serif">
          N
        </text>
      </g>
    ),
  },
  waterskin: {
    w: 70,
    h: 80,
    render: () => (
      <g>
        <path d="M30 8h10v14H30z" fill="#5e3c27" />
        <rect x="28" y="2" width="14" height="8" rx="2" fill="#3b2415" />
        <path d="M16 26c-14 20-12 52 19 52s33-32 19-52c-6-6-32-6-38 0z" fill="#a8744a" />
        <path d="M35 22c8 0 15 1 19 4 14 20 12 52-19 52z" fill="#000" opacity={0.12} />
        <path d="M14 48c12 6 30 6 42 0" stroke="#7a4e30" strokeWidth={2} fill="none" />
        <path d="M6 20c20 20 40 20 58 0" stroke="#5e3c27" strokeWidth={3} fill="none" />
      </g>
    ),
  },
  rope: {
    w: 80,
    h: 60,
    render: () => (
      <g fill="none" stroke="#b8945e" strokeWidth={8}>
        <ellipse cx="40" cy="42" rx="34" ry="14" />
        <ellipse cx="40" cy="34" rx="28" ry="11" stroke="#c9a56e" />
        <ellipse cx="40" cy="27" rx="22" ry="8" />
        <path d="M62 30c8 4 12 12 14 22" strokeWidth={6} />
      </g>
    ),
  },

  /* ---------- wardrobe ---------- */
  hat: {
    w: 90,
    h: 50,
    render: () => (
      <g>
        <ellipse cx="45" cy="42" rx="42" ry="8" fill="#6b4a32" />
        <path d="M20 42c0-24 10-36 25-36s25 12 25 36z" fill="#7a5a3e" />
        <path d="M21 32h48v6H21z" fill="#2f2320" />
      </g>
    ),
  },
  shirt: {
    w: 80,
    h: 110,
    grounded: false,
    render: () => (
      <g>
        <path d="M40 0v10" stroke="#9aa1a8" strokeWidth={2} />
        <path d="M24 16c6-6 26-6 32 0" stroke="#9aa1a8" strokeWidth={3} fill="none" />
        <path d="M22 16l-18 14 8 22 12-6v62h52V46l12 6 8-22-18-14c-4 8-12 12-18 12s-14-4-18-12z" fill="#e9eef3" transform="translate(-4 0)" />
        <path d="M40 22v84" stroke="#c7d0d8" strokeWidth={1.5} />
        {[36, 52, 68, 84].map((y) => (
          <circle key={y} cx="40" cy={y} r="1.6" fill="#9aa1a8" />
        ))}
        <path d="M30 18l10 10 10-10" fill="none" stroke="#c7d0d8" strokeWidth={2} />
        <rect x="26" y="34" width="8" height="8" fill="#c7d0d8" />
      </g>
    ),
  },
  dress: {
    w: 80,
    h: 120,
    grounded: false,
    render: () => (
      <g>
        <path d="M40 0v10" stroke="#9aa1a8" strokeWidth={2} />
        <path d="M24 16c6-6 26-6 32 0" stroke="#9aa1a8" strokeWidth={3} fill="none" />
        <path d="M28 14h24l-2 36 26 70H4l26-70z" fill="#c43d4f" />
        <path d="M40 50l36 70H40z" fill="#000" opacity={0.1} />
        <path d="M26 50h28" stroke="#8e2433" strokeWidth={4} />
        <path d="M18 96c10 4 34 4 44 0" stroke="#e07a88" strokeWidth={2} fill="none" />
      </g>
    ),
  },
  coat: {
    w: 90,
    h: 130,
    grounded: false,
    render: () => (
      <g>
        <path d="M45 0v10" stroke="#9aa1a8" strokeWidth={2} />
        <path d="M28 16c6-6 28-6 34 0" stroke="#9aa1a8" strokeWidth={3} fill="none" />
        <path d="M26 16L6 30l4 86h16V52l2 76h34l2-76v64h16l4-86-20-14c-6 10-14 14-19 14s-13-4-19-14z" fill="#b08a5a" />
        <path d="M45 30v98" stroke="#8a6a44" strokeWidth={2} />
        <path d="M32 18l13 24 13-24" fill="#9a7648" />
        {[56, 76, 96].map((y) => (
          <circle key={y} cx="50" cy={y} r="2.6" fill="#3a2a1c" />
        ))}
        <rect x="16" y="84" width="14" height="10" fill="#9a7648" />
        <rect x="60" y="84" width="14" height="10" fill="#9a7648" />
      </g>
    ),
  },
  sweater: {
    w: 86,
    h: 100,
    grounded: false,
    render: () => (
      <g>
        <path d="M43 0v10" stroke="#9aa1a8" strokeWidth={2} />
        <path d="M26 16c6-6 28-6 34 0" stroke="#9aa1a8" strokeWidth={3} fill="none" />
        <path d="M24 16L4 30l2 56h14V44l-2 54h50l-2-54v42h14l2-56-20-14c-4 6-12 10-19 10s-15-4-19-10z" fill="#3f6a5a" />
        <path d="M18 60h50M18 70h50" stroke="#d9a441" strokeWidth={4} />
        <path d="M18 65h50" stroke="#f3efe6" strokeWidth={2} strokeDasharray="4 4" />
        <path d="M18 92h50" stroke="#2f5246" strokeWidth={4} />
      </g>
    ),
  },
  scarf: {
    w: 50,
    h: 120,
    grounded: false,
    render: () => (
      <g>
        <path d="M25 0v10" stroke="#9aa1a8" strokeWidth={2} />
        <path d="M8 14h34v6H8z" fill="#9aa1a8" />
        <path d="M10 18h14v96H10zM26 18h14v80H26z" fill="#d9a441" />
        {[30, 50, 70, 90].map((y) => (
          <path key={y} d={`M10 ${y}h30`} stroke="#b23a3a" strokeWidth={5} />
        ))}
        <path d="M10 114v6M14 114v6M18 114v6M22 114v6M26 98v6M30 98v6M34 98v6M38 98v6" stroke="#d9a441" strokeWidth={1.6} />
      </g>
    ),
  },
  sneakers: {
    w: 100,
    h: 44,
    render: () => (
      <g>
        {[0, 48].map((dx) => (
          <g key={dx} transform={`translate(${dx} 0)`}>
            <path d="M4 36c0-14 4-26 12-28 6 6 14 8 20 6 6 6 12 10 14 22z" fill="#f3f5f7" />
            <path d="M16 8c6 6 14 8 20 6" stroke="#c43d4f" strokeWidth={4} fill="none" />
            <path d="M14 26l18-6" stroke="#c43d4f" strokeWidth={4} />
            <rect x="2" y="34" width="50" height="8" rx="3" fill="#2f3237" />
          </g>
        ))}
      </g>
    ),
  },
  handbag: {
    w: 80,
    h: 74,
    render: () => (
      <g>
        <path d="M24 28c0-24 32-24 32 0" stroke="#5e3c27" strokeWidth={5} fill="none" />
        <path d="M8 28h64l-6 44H14z" fill="#8a5a3b" />
        <path d="M40 28h32l-6 44H40z" fill="#000" opacity={0.12} />
        <path d="M8 28h64v10H8z" fill="#6b4428" />
        <rect x="34" y="34" width="12" height="8" rx="2" fill={GOLD} />
      </g>
    ),
  },

  /* ---------- fridge ---------- */
  milk: {
    w: 44,
    h: 90,
    render: () => (
      <g>
        <path d="M6 26l16-16 16 16v62H6z" fill="#f7f7f5" />
        <path d="M22 10l16 16v62H22z" fill="#000" opacity={0.06} />
        <rect x="16" y="2" width="12" height="10" fill="#57a6e8" />
        <rect x="6" y="40" width="32" height="30" fill="#57a6e8" />
        <text x="10" y="60" fontSize="10" fontWeight="700" fill="#fff" fontFamily="sans-serif">
          MILK
        </text>
      </g>
    ),
  },
  juice: {
    w: 44,
    h: 90,
    render: () => (
      <g>
        <rect x="14" y="2" width="16" height="10" rx="3" fill="#2f7a3a" />
        <path d="M14 12h16l8 14v60c0 3-3 4-16 4S6 89 6 86V26z" fill="#f2a33a" opacity={0.9} />
        <circle cx="22" cy="56" r="11" fill="#f7c35a" />
        <path d="M22 45v22M11 56h22" stroke="#e38a2a" strokeWidth={1.4} />
        <rect x="10" y="26" width="4" height="54" rx="2" fill="#fff" opacity={0.35} />
      </g>
    ),
  },
  jam: {
    w: 50,
    h: 56,
    render: () => (
      <g>
        <rect x="6" y="16" width="38" height="40" rx="8" fill="#9e2a3e" />
        <rect x="10" y="20" width="6" height="30" rx="3" fill="#fff" opacity={0.3} />
        <path d="M2 10h46l-3 8H5z" fill="#f3efe6" />
        <path d="M2 10l6 8M14 10l4 8M26 10v8M38 10l-4 8M48 10l-6 8" stroke="#c43d4f" strokeWidth={2} />
        <rect x="12" y="30" width="26" height="14" rx="2" fill={PAPER} />
      </g>
    ),
  },
  cheese: {
    w: 80,
    h: 54,
    render: () => (
      <g>
        <path d="M4 22L60 4l16 18v30H4z" fill="#f2c94c" />
        <path d="M4 22h72v30H4z" fill="#e8b93a" />
        <circle cx="22" cy="36" r="5" fill="#d9a431" />
        <circle cx="46" cy="42" r="4" fill="#d9a431" />
        <circle cx="62" cy="32" r="3" fill="#d9a431" />
        <circle cx="40" cy="14" r="3" fill="#e8b93a" />
      </g>
    ),
  },
  cake: {
    w: 80,
    h: 70,
    render: () => (
      <g>
        <ellipse cx="40" cy="64" rx="38" ry="6" fill="#dfe2e5" />
        <path d="M8 30h64v30H8z" fill="#f2d1a8" />
        <path d="M8 42h64v6H8z" fill="#e35d6a" />
        <path d="M8 30c0-8 64-8 64 0v6c-6 6-12-2-16 4s-10-2-16 2-10-4-16 0-10-2-16 0z" fill="#fbeff2" />
        <circle cx="26" cy="22" r="5" fill="#c43d3d" />
        <circle cx="54" cy="22" r="5" fill="#c43d3d" />
        <path d="M40 4v18" stroke="#57a6e8" strokeWidth={4} />
        <path d="M40 0c3 3 3 6 0 7-3-1-3-4 0-7z" fill="#ffb347" />
      </g>
    ),
  },
  eggs: {
    w: 90,
    h: 50,
    render: () => (
      <g>
        {[14, 32, 50, 68].map((x, i) => (
          <ellipse key={x} cx={x + 4} cy={20 + (i % 2) * 2} rx={9} ry={12} fill={i % 2 ? "#f3e6d4" : "#fbf8f2"} />
        ))}
        <path d="M2 28h86l-4 20H6z" fill="#b9a88a" />
        <path d="M2 28c8 8 14 8 22 0s14 8 22 0 14 8 22 0 14 8 20 0" stroke="#a8977a" strokeWidth={2} fill="none" />
      </g>
    ),
  },
  carrots: {
    w: 90,
    h: 50,
    render: () => (
      <g>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 8} ${i * 10}) rotate(${-6 + i * 4} 45 20)`}>
            <path d="M18 14c30-6 50-4 66 4-16 6-40 8-66 2z" fill="#e8742a" />
            <path d="M30 16l2 4M44 14l2 4M58 16l2 4" stroke="#c45a1a" strokeWidth={1.4} />
            <path d="M18 17c-6-6-12-8-16-6M18 17c-6 0-12 4-14 8M18 17c-4-8-6-12-4-16" stroke="#5d8c55" strokeWidth={3} fill="none" />
          </g>
        ))}
      </g>
    ),
  },
  melon: {
    w: 90,
    h: 54,
    render: () => (
      <g>
        <path d="M4 10h82c0 24-18 40-41 40S4 34 4 10z" fill="#3f8a4a" />
        <path d="M10 10h70c0 20-16 34-35 34S10 30 10 10z" fill="#f3efe6" />
        <path d="M14 10h62c0 18-14 30-31 30S14 28 14 10z" fill="#e8455a" />
        {[26, 36, 46, 56, 66, 40, 52].map((x, i) => (
          <ellipse key={i} cx={x} cy={i < 5 ? 20 : 28} rx={1.6} ry={2.6} fill="#2a1a1a" />
        ))}
      </g>
    ),
  },

  /* ---------- modern bookshelf ---------- */
  "book-stack": {
    w: 90,
    h: 70,
    render: () => (
      <g>
        <rect x="6" y="54" width="78" height="14" rx="1" fill="#2f4863" />
        <rect x="10" y="40" width="70" height="14" rx="1" fill="#c46a4a" />
        <rect x="14" y="26" width="64" height="14" rx="1" fill="#d9a441" />
        <rect x="8" y="12" width="68" height="14" rx="1" fill="#8fa58a" transform="rotate(-3 42 19)" />
        <path d="M80 56h4v10h-4zM76 42h4v10h-4z" fill="#f3efe8" />
      </g>
    ),
  },
  trophy: {
    w: 70,
    h: 90,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={35} cy={30} rx={30} color="#ffd98a" opacity={0.4} />
        <rect x="14" y="76" width="42" height="14" rx="2" fill="#3a2a1c" />
        <rect x="30" y="54" width="10" height="22" fill={GOLD_D} />
        <path d="M14 6h42v20c0 16-10 28-21 28S14 42 14 26z" fill={GOLD} />
        <path d="M35 6h21v20c0 16-10 28-21 28z" fill="#000" opacity={0.12} />
        <path d="M14 12H4c0 14 6 20 12 22M56 12h10c0 14-6 20-12 22" stroke={GOLD} strokeWidth={4} fill="none" />
        <path d="M35 16l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z" fill="#fff4cf" />
      </g>
    ),
  },
  "photo-frame": {
    w: 70,
    h: 80,
    render: () => (
      <g>
        <rect x="4" y="4" width="62" height="72" rx="3" fill={CHAR} />
        <rect x="10" y="10" width="50" height="60" fill="#9fc3d6" />
        <path d="M10 56c10-12 22-14 32-6s14 6 18 2v18H10z" fill="#8aa37a" />
        <circle cx="28" cy="36" r="7" fill="#e3c4a0" />
        <path d="M18 60c0-10 5-14 10-14s10 4 10 14z" fill="#c46a4a" />
        <circle cx="44" cy="38" r="6" fill="#d9b48c" />
        <path d="M36 60c0-9 4-13 8-13s8 4 8 13z" fill="#2f4863" />
      </g>
    ),
  },
  camera: {
    w: 90,
    h: 64,
    render: () => (
      <g>
        <rect x="4" y="16" width="82" height="46" rx="6" fill={CHAR} />
        <rect x="4" y="26" width="82" height="20" fill="#8a5a3b" />
        <rect x="14" y="8" width="20" height="10" rx="2" fill="#4a4f57" />
        <circle cx="50" cy="38" r="18" fill="#4a4f57" />
        <circle cx="50" cy="38" r="12" fill="#16171a" />
        <circle cx="45" cy="33" r="4" fill="#57a6e8" opacity={0.7} />
        <circle cx="76" cy="22" r="3" fill="#e35d6a" />
      </g>
    ),
  },
  headphones: {
    w: 80,
    h: 76,
    render: () => (
      <g>
        <path d="M12 50V38a28 28 0 0 1 56 0v12" stroke={CHAR} strokeWidth={7} fill="none" />
        <rect x="4" y="42" width="18" height="30" rx="8" fill="#c46a4a" />
        <rect x="58" y="42" width="18" height="30" rx="8" fill="#c46a4a" />
        <rect x="8" y="46" width="6" height="22" rx="3" fill="#9e4f35" />
        <rect x="66" y="46" width="6" height="22" rx="3" fill="#9e4f35" />
      </g>
    ),
  },
  "piggy-bank": {
    w: 90,
    h: 66,
    render: () => (
      <g>
        <ellipse cx="44" cy="36" rx="34" ry="24" fill="#f2a7b8" />
        <ellipse cx="78" cy="36" rx="9" ry="10" fill="#e88aa0" />
        <circle cx="76" cy="34" r="1.6" fill="#9e4f60" />
        <circle cx="80" cy="38" r="1.6" fill="#9e4f60" />
        <circle cx="62" cy="26" r="2.6" fill="#2f3237" />
        <path d="M52 12l6-10 6 12z" fill="#e88aa0" />
        <rect x="30" y="12" width="16" height="3" rx="1.5" fill="#9e4f60" />
        <rect x="22" y="54" width="8" height="12" rx="2" fill="#e88aa0" />
        <rect x="56" y="54" width="8" height="12" rx="2" fill="#e88aa0" />
        <path d="M10 32c-8 0-8 8-2 8" stroke="#e88aa0" strokeWidth={3} fill="none" />
      </g>
    ),
  },

  /* ---------- toolbox ---------- */
  hammer: {
    w: 110,
    h: 44,
    grounded: false,
    render: () => (
      <g>
        <rect x="4" y="18" width="78" height="10" rx="4" fill="#b8854a" />
        <rect x="4" y="18" width="30" height="10" rx="4" fill="#2f3237" />
        <path d="M80 6h14l12 6v4H94v14H80z" fill={STEEL_D} />
        <path d="M80 6h14l12 6H80z" fill={STEEL} />
      </g>
    ),
  },
  wrench: {
    w: 110,
    h: 40,
    grounded: false,
    render: () => (
      <g>
        <rect x="22" y="15" width="66" height="10" rx="5" fill={STEEL} />
        <path d="M22 20a16 16 0 1 1-4-12l-8 8 4 8 8 2 8-8a16 16 0 0 1-8 2z" fill={STEEL_D} />
        <circle cx="96" cy="20" r="12" fill={STEEL_D} />
        <circle cx="96" cy="20" r="6" fill="#2a2d31" />
      </g>
    ),
  },
  screwdriver: {
    w: 110,
    h: 30,
    grounded: false,
    render: () => (
      <g>
        <rect x="4" y="6" width="42" height="18" rx="8" fill="#e8b93a" />
        <path d="M14 6v18M24 6v18M34 6v18" stroke="#c9981a" strokeWidth={2} />
        <rect x="46" y="12" width="52" height="6" fill={STEEL} />
        <path d="M98 12l8 3-8 3z" fill={STEEL_D} />
      </g>
    ),
  },
  saw: {
    w: 120,
    h: 44,
    grounded: false,
    render: () => (
      <g>
        <path d="M36 6h80l-4 26H36z" fill={STEEL} />
        <path d="M36 32h76" stroke={STEEL_D} strokeWidth={2} strokeDasharray="4 2" />
        <path d="M4 4h32v34H4z" fill="#b8854a" rx={6} />
        <rect x="12" y="14" width="16" height="14" rx="6" fill="#2a2d31" />
        <circle cx="104" cy="16" r="3" fill={STEEL_D} />
      </g>
    ),
  },
  pliers: {
    w: 110,
    h: 50,
    grounded: false,
    render: () => (
      <g>
        <path d="M4 12l52 10M4 38l52-10" stroke="#c43d3d" strokeWidth={10} strokeLinecap="round" />
        <circle cx="60" cy="25" r="7" fill={STEEL_D} />
        <path d="M60 25l44-10v6l-40 6M60 25l44 10v-6l-40-6" fill={STEEL} stroke={STEEL} strokeWidth={4} />
      </g>
    ),
  },
  "tape-measure": {
    w: 70,
    h: 60,
    render: () => (
      <g>
        <rect x="4" y="6" width="50" height="50" rx="12" fill="#e8b93a" />
        <circle cx="29" cy="31" r="12" fill="#2f3237" />
        <circle cx="29" cy="31" r="4" fill={STEEL} />
        <rect x="50" y="46" width="18" height="8" fill="#f2d16b" />
        <path d="M54 46v4M58 46v3M62 46v4" stroke={CHAR} strokeWidth={1} />
        <rect x="66" y="42" width="4" height="14" fill={STEEL_D} />
      </g>
    ),
  },

  /* ---------- potting bench ---------- */
  trowel: {
    w: 110,
    h: 40,
    grounded: false,
    render: () => (
      <g>
        <rect x="4" y="14" width="40" height="12" rx="6" fill="#4f7d45" />
        <rect x="44" y="17" width="14" height="6" fill={STEEL_D} />
        <path d="M58 20c10-16 34-18 48 0-14 18-38 16-48 0z" fill={STEEL} />
        <path d="M60 20h44" stroke={STEEL_D} strokeWidth={1.5} />
      </g>
    ),
  },
  gloves: {
    w: 90,
    h: 70,
    grounded: false,
    render: () => (
      <g>
        {[0, 34].map((dx, i) => (
          <g key={dx} transform={`translate(${dx} ${i * 6}) rotate(${i ? 12 : -8} 30 40)`}>
            <path d="M14 66V30l-4-14c-1-4 5-6 6-2l4 12V8c0-4 6-4 6 0v18V4c0-4 6-4 6 0v22V8c0-4 6-4 6 0v26l6-8c3-4 8 0 5 4l-9 16v20z" fill={i ? "#d9a441" : "#e8b95a"} />
            <rect x="14" y="56" width="30" height="10" fill="#8fa58a" />
          </g>
        ))}
      </g>
    ),
  },
  "seed-packet": {
    w: 60,
    h: 80,
    render: () => (
      <g>
        <path d="M6 10h48v66H6z" fill="#f3efe6" />
        <path d="M6 10l4-6h40l4 6z" fill="#d9d2c4" />
        <rect x="10" y="16" width="40" height="36" fill="#9fc3d6" />
        <circle cx="30" cy="34" r="10" fill="#f2d16b" />
        <g fill="#e8742a">
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse key={a} cx="30" cy="20" rx="4" ry="7" transform={`rotate(${a} 30 34)`} />
          ))}
        </g>
        <circle cx="30" cy="34" r="6" fill="#6b4428" />
        <path d="M12 60h36M12 66h26" stroke="#8a8272" strokeWidth={2} />
      </g>
    ),
  },
  "clay-pot": {
    w: 70,
    h: 74,
    render: () => (
      <g>
        <path d="M12 28h46l-6 44H18z" fill="#c46a4a" />
        <path d="M35 28h23l-6 44H35z" fill="#000" opacity={0.12} />
        <rect x="8" y="20" width="54" height="12" rx="2" fill="#b35c3e" />
        <path d="M24 20c-2-10 2-16 8-18M34 20c2-12 8-16 14-16M30 20c-6-6-14-6-18-2" stroke="#5d8c55" strokeWidth={3} fill="none" strokeLinecap="round" />
        <ellipse cx="46" cy="5" rx="5" ry="3" fill="#6b9a58" />
      </g>
    ),
  },
  shears: {
    w: 110,
    h: 50,
    grounded: false,
    render: () => (
      <g>
        <path d="M50 25L104 10l-4 8-46 10M50 25l54 15-4-8-46-10" fill={STEEL} />
        <circle cx="50" cy="25" r="5" fill={STEEL_D} />
        <path d="M46 23L10 8M46 27L10 42" stroke="#c43d3d" strokeWidth={10} strokeLinecap="round" />
      </g>
    ),
  },
  twine: {
    w: 64,
    h: 64,
    render: () => (
      <g>
        <ellipse cx="32" cy="52" rx="26" ry="10" fill="#b8945e" />
        <rect x="6" y="18" width="52" height="34" fill="#c9a56e" />
        <ellipse cx="32" cy="18" rx="26" ry="10" fill="#d9b884" />
        <ellipse cx="32" cy="18" rx="8" ry="3" fill="#8a6a44" />
        <path d="M6 26c16 6 36 6 52 0M6 36c16 6 36 6 52 0M6 46c16 6 36 6 52 0" stroke="#a8844e" strokeWidth={1.6} fill="none" />
        <path d="M58 40c6 6 4 16-4 22" stroke="#c9a56e" strokeWidth={3} fill="none" />
      </g>
    ),
  },

  /* ---------- locker ---------- */
  "space-helmet": {
    w: 80,
    h: 76,
    render: () => (
      <g>
        <rect x="12" y="62" width="56" height="14" rx="4" fill="#9aa4b2" />
        <circle cx="40" cy="38" r="34" fill="#eef1f4" />
        <path d="M16 38a24 20 0 0 1 48 0v4a24 16 0 0 1-48 0z" fill="#1c2b3d" />
        <path d="M22 32c6-8 16-10 24-6" stroke="#5ce1e6" strokeOpacity={0.7} strokeWidth={3} fill="none" />
        <rect x="62" y="30" width="8" height="16" rx="3" fill="#ff9f43" />
      </g>
    ),
  },
  mug: {
    w: 60,
    h: 60,
    render: () => (
      <g>
        <path d="M44 22c14 0 14 22 0 22" stroke="#eef1f4" strokeWidth={6} fill="none" />
        <rect x="6" y="12" width="40" height="46" rx="6" fill="#eef1f4" />
        <rect x="6" y="26" width="40" height="12" fill="#5ce1e6" />
        <path d="M18 8c-3-3 3-5 0-8M28 8c-3-3 3-5 0-8" stroke="#c7ced8" strokeWidth={1.6} fill="none" />
      </g>
    ),
  },
  tablet: {
    w: 80,
    h: 96,
    render: () => (
      <g>
        <rect x="4" y="2" width="72" height="92" rx="8" fill="#2a3342" />
        <rect x="10" y="10" width="60" height="72" rx="3" fill="#0d1622" />
        <rect x="10" y="10" width="60" height="72" rx="3" fill="#5ce1e6" opacity={0.15} />
        <path d="M16 60l10-12 10 6 12-16 16 12" stroke="#5ce1e6" strokeWidth={2} fill="none" />
        <rect x="16" y="18" width="30" height="4" rx="2" fill="#5ce1e6" />
        <rect x="16" y="26" width="44" height="3" rx="1.5" fill="#5ce1e6" opacity={0.5} />
        <circle cx="40" cy="88" r="2.4" fill="#3a4558" />
      </g>
    ),
  },
  badge: {
    w: 60,
    h: 76,
    render: () => (
      <g>
        <path d="M18 0l12 20 12-20" stroke="#ff9f43" strokeWidth={5} fill="none" />
        <circle cx="30" cy="48" r="26" fill="#d6a84a" />
        <circle cx="30" cy="48" r="20" fill="#2a3342" />
        <path d="M30 32l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1z" fill="#5ce1e6" />
      </g>
    ),
  },

  /* ---------- medkit ---------- */
  pills: {
    w: 50,
    h: 80,
    render: () => (
      <g>
        <rect x="6" y="18" width="38" height="60" rx="6" fill="#ff9f43" opacity={0.85} />
        <rect x="4" y="6" width="42" height="14" rx="3" fill="#f3f5f7" />
        <rect x="10" y="34" width="30" height="26" fill="#f3f5f7" />
        <path d="M18 47h14M25 40v14" stroke="#ff5c6c" strokeWidth={4} />
        <rect x="10" y="22" width="5" height="50" rx="2.5" fill="#fff" opacity={0.3} />
      </g>
    ),
  },
  syringe: {
    w: 120,
    h: 30,
    grounded: false,
    render: () => (
      <g>
        <rect x="4" y="11" width="10" height="8" fill="#9aa4b2" />
        <rect x="0" y="4" width="6" height="22" rx="2" fill="#9aa4b2" />
        <rect x="14" y="6" width="64" height="18" rx="3" fill="#e8f6fb" opacity={0.8} />
        <rect x="40" y="8" width="36" height="14" fill="#5ce1e6" opacity={0.7} />
        <path d="M24 6v6M34 6v6M44 6v6M54 6v6M64 6v6" stroke="#9aa4b2" strokeWidth={1.4} />
        <rect x="78" y="10" width="8" height="10" fill="#9aa4b2" />
        <rect x="86" y="14" width="30" height="2" fill="#c7ced8" />
      </g>
    ),
  },
  bandage: {
    w: 70,
    h: 60,
    render: () => (
      <g>
        <ellipse cx="30" cy="48" rx="26" ry="10" fill="#e3ddd2" />
        <rect x="4" y="18" width="52" height="30" fill="#f3efe6" />
        <ellipse cx="30" cy="18" rx="26" ry="10" fill="#fbf8f2" />
        <ellipse cx="30" cy="18" rx="8" ry="3" fill="#d9d2c4" />
        <path d="M56 36c6 2 10 8 12 18" stroke="#f3efe6" strokeWidth={8} fill="none" />
        <path d="M4 28c16 6 36 6 52 0" stroke="#e3ddd2" strokeWidth={1.4} fill="none" />
      </g>
    ),
  },
  thermometer: {
    w: 110,
    h: 30,
    grounded: false,
    render: () => (
      <g>
        <rect x="4" y="6" width="80" height="18" rx="9" fill="#eef1f4" />
        <rect x="12" y="11" width="44" height="8" rx="2" fill="#0d1622" />
        <text x="16" y="18" fontSize="7" fill="#59d98e" fontFamily="monospace">
          36.8°
        </text>
        <path d="M84 12h20l4 3-4 3H84z" fill="#9aa4b2" />
        <circle cx="68" cy="15" r="4" fill="#ff5c6c" />
      </g>
    ),
  },
  stethoscope: {
    w: 90,
    h: 80,
    grounded: false,
    render: () => (
      <g fill="none" strokeLinecap="round">
        <path d="M20 6v24c0 16 10 24 22 24s22-8 22-24V6" stroke="#2a3342" strokeWidth={5} />
        <path d="M42 54v8c0 10 10 12 20 10s14-8 14-14" stroke="#2a3342" strokeWidth={5} />
        <circle cx="76" cy="52" r="10" fill="#9aa4b2" stroke="#c7ced8" strokeWidth={3} />
        <circle cx="20" cy="6" r="4" fill="#9aa4b2" stroke="none" />
        <circle cx="64" cy="6" r="4" fill="#9aa4b2" stroke="none" />
      </g>
    ),
  },
  ampoule: {
    w: 70,
    h: 70,
    render: () => (
      <g>
        {[0, 22, 44].map((x, i) => (
          <g key={x} transform={`translate(${x} 0)`}>
            <path d="M10 26c-4 6-4 14-4 20v18c0 3 2 5 5 5h4c3 0 5-2 5-5V46c0-6 0-14-4-20V14c2-2 2-6 0-8h-2c-2 2-2 6 0 8z" fill="#e8f6fb" opacity={0.7} />
            <rect x="6" y={44 - i * 4} width="14" height={24 + i * 4} rx="4" fill={["#59d98e", "#5ce1e6", "#c77dff"][i]} opacity={0.8} />
          </g>
        ))}
      </g>
    ),
  },
};
