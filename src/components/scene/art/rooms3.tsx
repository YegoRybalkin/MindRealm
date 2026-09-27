import type { ArtDef } from "./types";
import { Candle, Glow } from "./helpers";

/* Third wave: distinct replacements for objects that used to repeat within an environment. */

const GOLD = "#d6a84a";
const GOLD_D = "#a87b2c";
const WOOD = "#6b4428";
const WOOD_D = "#4a2e1a";
const WOOD_L = "#8a5a36";
const STONE = "#c9c2b4";
const STONE_D = "#a79f90";
const STONE_L = "#e2dcd2";
const IRON = "#2d2926";
const LEAF = "#4f7d45";
const LEAF_D = "#3a6035";
const LEAF_L = "#6b9a58";
const HULL = "#c7ced8";
const HULL_D = "#9aa4b2";
const PANEL = "#2a3342";
const PANEL_L = "#3a4558";
const CYAN = "#5ce1e6";

export const rooms3Art: Record<string, ArtDef> = {
  /* ------------------------------ castle ------------------------------ */
  crest: {
    w: 70,
    h: 80,
    grounded: false,
    render: () => (
      <g>
        <path d="M8 20l-8-8 10-2 4-10 8 8M62 20l8-8-10-2-4-10-8 8" fill={GOLD} />
        <path d="M35 6c12 5 22 6 28 6v26c0 22-12 34-28 40C19 72 7 60 7 38V12c6 0 16-1 28-6z" fill="#1f3a5f" />
        <path d="M7 38h56v-6H7z" fill={GOLD} />
        <path d="M22 18l6 12h-12zM48 18l6 12H42z" fill={GOLD} />
        <path d="M35 44c8 4 10 10 6 18-2-4-6-6-6-6s-4 2-6 6c-4-8-2-14 6-18z" fill="#c43d3d" />
        <path d="M35 6c12 5 22 6 28 6v26c0 22-12 34-28 40C19 72 7 60 7 38V12c6 0 16-1 28-6z" fill="none" stroke={GOLD} strokeWidth={3} />
      </g>
    ),
  },
  "round-shield": {
    w: 64,
    h: 64,
    grounded: false,
    render: () => (
      <g>
        <circle cx="32" cy="32" r="30" fill="#6b4428" />
        {[0, 45, 90, 135].map((a) => (
          <path key={a} d="M32 2v60" stroke="#4a2e1a" strokeWidth={2} transform={`rotate(${a} 32 32)`} />
        ))}
        <circle cx="32" cy="32" r="30" fill="none" stroke="#8e969f" strokeWidth={5} />
        <circle cx="32" cy="32" r="9" fill="#b9c0c7" />
        <circle cx="29" cy="29" r="3" fill="#fff" opacity={0.4} />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <circle key={a} cx="32" cy="7" r="2" fill="#b9c0c7" transform={`rotate(${a} 32 32)`} />
        ))}
      </g>
    ),
  },
  brazier: {
    w: 60,
    h: 104,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={30} cy={22} rx={32} ry={24} color="#ff8a2a" opacity={0.55} />
        <path d="M14 104l10-50M46 104L36 54M30 104V56" stroke={IRON} strokeWidth={4} />
        <path d="M4 34h52l-8 22H12z" fill="#3a3531" />
        <path d="M4 34h52" stroke="#5a524a" strokeWidth={4} />
        <g className="animate-flicker" style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}>
          <path d="M12 34c-2-12 6-18 10-26 0 8 4 10 6 4 2-6 0-12-2-16 10 6 14 16 12 26 4-4 4-8 4-12 6 8 6 16 2 24z" fill="#ff8f2b" />
          <path d="M20 34c-1-7 3-10 6-15 1 5 3 6 4 2 1-3 0-6-1-9 6 4 8 10 7 16 2-2 3-4 3-7 3 5 3 9 1 13z" fill="#ffd36b" />
        </g>
      </g>
    ),
  },
  "jewelry-stand": {
    w: 50,
    h: 100,
    render: () => (
      <g>
        <rect x="10" y="88" width="30" height="12" rx="2" fill={WOOD_D} />
        <rect x="23" y="44" width="4" height="46" fill={WOOD} />
        <path d="M10 44c0-20 6-36 15-36s15 16 15 36z" fill="#2a1a2e" />
        <path d="M13 20c4 10 20 10 24 0" stroke={GOLD} strokeWidth={2} fill="none" strokeDasharray="3 2" />
        <path d="M25 30l4 5-4 5-4-5z" fill="#e8385a" />
        <path d="M12 34c6 8 20 8 26 0" stroke="#f3efe6" strokeWidth={2} fill="none" strokeDasharray="2 3" />
      </g>
    ),
  },
  "wine-rack": {
    w: 80,
    h: 90,
    render: () => (
      <g>
        <rect x="2" y="2" width="76" height="88" rx="2" fill={WOOD} />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <g key={`${r}${c}`}>
              <rect x={6 + c * 24} y={6 + r * 28} width="20" height="24" fill={WOOD_D} />
              <circle cx={16 + c * 24} cy={18 + r * 28} r="8" fill={["#5a1a2a", "#2a4a2a", "#6b2d2d"][(r + c) % 3]} />
              <circle cx={16 + c * 24} cy={18 + r * 28} r="3" fill={GOLD_D} />
            </g>
          )),
        )}
      </g>
    ),
  },
  "water-trough": {
    w: 110,
    h: 50,
    render: () => (
      <g>
        <path d="M6 10h98l-8 36H14z" fill={WOOD} />
        <path d="M6 10h98v6H6z" fill={WOOD_L} />
        <path d="M12 16h86l-2 10H14z" fill="#5a8aa8" />
        <path d="M24 20c6-2 12 2 18 0" stroke="#bfe3f2" strokeWidth={2} fill="none" />
        <path d="M30 16v30M80 16v30" stroke={WOOD_D} strokeWidth={3} />
        <rect x="10" y="44" width="10" height="6" fill={WOOD_D} />
        <rect x="90" y="44" width="10" height="6" fill={WOOD_D} />
      </g>
    ),
  },
  pew: {
    w: 140,
    h: 64,
    render: () => (
      <g>
        <path d="M8 4c0-4 10-4 10 0v58H8zM122 4c0-4 10-4 10 0v58h-10z" fill={WOOD_D} />
        <rect x="14" y="8" width="112" height="24" fill={WOOD} />
        <path d="M14 14h112M14 22h112" stroke={WOOD_D} strokeWidth={1.4} />
        <rect x="10" y="34" width="120" height="10" rx="2" fill={WOOD_L} />
        <rect x="16" y="44" width="108" height="8" fill={WOOD_D} />
        <rect x="40" y="26" width="16" height="8" rx="1" fill="#5a1f3a" />
      </g>
    ),
  },
  "log-bench": {
    w: 140,
    h: 50,
    render: () => (
      <g>
        <ellipse cx="30" cy="38" rx="14" ry="12" fill="#6b4a32" />
        <ellipse cx="110" cy="38" rx="14" ry="12" fill="#6b4a32" />
        <rect x="4" y="10" width="132" height="22" rx="11" fill="#8a6a44" />
        <ellipse cx="6" cy="21" rx="5" ry="11" fill="#c9a86a" />
        <ellipse cx="6" cy="21" rx="2.5" ry="6" fill="none" stroke="#8a6a44" />
        <path d="M20 16h100M24 26h90" stroke="#6b4a32" strokeWidth={1.4} />
      </g>
    ),
  },
  "angel-statue": {
    w: 80,
    h: 150,
    render: () => (
      <g>
        <rect x="18" y="126" width="44" height="24" fill={STONE_D} />
        <rect x="14" y="122" width="52" height="6" fill={STONE} />
        <path d="M24 60C6 50 0 30 4 10c10 10 16 26 20 40zM56 60c18-10 24-30 20-50-10 10-16 26-20 40z" fill={STONE_L} />
        <path d="M28 122l-2-54c0-10 6-16 14-16s14 6 14 16l-2 54z" fill="#eeeae2" />
        <path d="M40 68v54" stroke="#d2cbbf" strokeWidth={1.4} />
        <circle cx="40" cy="40" r="10" fill="#f1ede6" />
        <ellipse cx="40" cy="26" rx="12" ry="3" fill="none" stroke={GOLD} strokeWidth={2.4} />
        <path d="M30 76c6 6 14 6 20 0" stroke="#d2cbbf" strokeWidth={4} fill="none" strokeLinecap="round" />
      </g>
    ),
  },
  "rose-window": {
    w: 80,
    h: 80,
    grounded: false,
    render: (u) => {
      const petals = ["#3a6fb0", "#b23b48", "#d6a84a", "#3c8a6a", "#7b4aa0", "#3a6fb0", "#b23b48", "#d6a84a"];
      return (
        <g>
          <Glow u={u} k="g" cx={40} cy={40} rx={44} color="#a8c7ff" opacity={0.3} />
          <circle cx="40" cy="40" r="38" fill={STONE_D} />
          <circle cx="40" cy="40" r="32" fill="#1c2233" />
          {petals.map((c, i) => (
            <path key={i} d="M40 40L34 12a6 6 0 0 1 12 0z" fill={c} transform={`rotate(${i * 45} 40 40)`} />
          ))}
          <circle cx="40" cy="40" r="8" fill="#e7c76a" />
          <circle cx="40" cy="40" r="32" fill="none" stroke="#1a1612" strokeWidth={2} />
        </g>
      );
    },
  },
  spellbook: {
    w: 70,
    h: 104,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={35} cy={30} rx={34} ry={28} color="#a77bff" opacity={0.55} />
        <path d="M20 104l6-40h18l6 40z" fill={STONE_D} />
        <rect x="16" y="60" width="38" height="6" fill={STONE} />
        <g>
          <path d="M6 30c10-8 20-8 29-2 9-6 19-6 29 2v18c-10-8-20-8-29-2-9-6-19-6-29 2z" fill="#3a2a5a" />
          <path d="M9 30c9-6 18-6 26 0v14c-8-6-17-6-26 0zM35 30c8-6 17-6 26 0v14c-9-6-18-6-26 0z" fill="#f0e6ff" />
          <path d="M14 34h16M14 38h12M40 34h16M40 38h12" stroke="#a77bff" strokeWidth={1.4} />
        </g>
        <g fill="#d9c0ff">
          <circle cx="12" cy="14" r="2" />
          <circle cx="58" cy="10" r="2.4" />
          <circle cx="34" cy="6" r="1.6" />
        </g>
      </g>
    ),
  },
  "treasure-chest": {
    w: 96,
    h: 84,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={48} cy={34} rx={44} ry={24} color="#ffd98a" opacity={0.55} />
        <path d="M8 36L18 4h60l10 32z" fill="#5a1f24" />
        <path d="M14 34l8-26h52l8 26z" fill="#7a2a30" />
        <rect x="6" y="40" width="84" height="44" rx="3" fill="#6b3a1c" />
        <path d="M10 42c8-10 20-10 26-2 6-10 20-10 26 0 6-8 18-8 24 2z" fill={GOLD} />
        <circle cx="30" cy="36" r="4" fill="#e8385a" />
        <circle cx="62" cy="34" r="4" fill="#3a6fb0" />
        <g fill={GOLD_D}>
          <rect x="6" y="40" width="84" height="6" />
          <rect x="16" y="40" width="7" height="44" />
          <rect x="73" y="40" width="7" height="44" />
        </g>
        <rect x="42" y="50" width="12" height="14" rx="2" fill={GOLD} />
      </g>
    ),
  },
  "astronomer-trunk": {
    w: 92,
    h: 70,
    render: () => (
      <g>
        <rect x="4" y="30" width="84" height="40" rx="2" fill="#1f3a5f" />
        <path d="M4 30c0-18 12-26 42-26s42 8 42 26z" fill="#2a4a78" />
        <g fill="#f5e6b8">
          {[
            [20, 22],
            [36, 14],
            [58, 18],
            [74, 24],
            [26, 50],
            [66, 56],
            [46, 46],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 2 ? 1.6 : 2.4} />
          ))}
        </g>
        <path d="M60 50a8 8 0 1 1-4-14 6 6 0 0 0 4 14z" fill="#f5e6b8" />
        <rect x="4" y="28" width="84" height="5" fill="#c9ced4" />
        <rect x="40" y="30" width="12" height="14" rx="2" fill="#c9ced4" />
      </g>
    ),
  },
  "vault-door": {
    w: 100,
    h: 130,
    render: () => (
      <g>
        <rect x="0" y="0" width="100" height="130" rx="6" fill="#4a4f57" />
        <rect x="8" y="8" width="84" height="122" rx="4" fill="#8e969f" />
        <circle cx="50" cy="62" r="30" fill="#6f777f" />
        <circle cx="50" cy="62" r="24" fill="#b9c0c7" />
        <g stroke="#4a4f57" strokeWidth={5} strokeLinecap="round">
          {[0, 60, 120].map((a) => (
            <line key={a} x1="50" y1="40" x2="50" y2="84" transform={`rotate(${a} 50 62)`} />
          ))}
        </g>
        <circle cx="50" cy="62" r="7" fill={GOLD} />
        <rect x="80" y="20" width="8" height="14" rx="2" fill="#4a4f57" />
        <rect x="80" y="96" width="8" height="14" rx="2" fill="#4a4f57" />
      </g>
    ),
  },

  "votive-rack": {
    w: 90,
    h: 90,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={45} cy={30} rx={46} ry={28} color="#ffc466" opacity={0.45} />
        <path d="M10 90V40M80 90V40" stroke={IRON} strokeWidth={4} />
        {[40, 58, 76].map((y, r) => (
          <g key={y}>
            <rect x="6" y={y} width="78" height="5" fill={IRON} />
            {Array.from({ length: 5 - r }).map((_, i) => (
              <g key={i}>
                <rect x={14 + r * 7 + i * 15} y={y - 8} width="10" height="8" rx="1" fill="#c43d3d" opacity={0.85} />
                <Candle x={19 + r * 7 + i * 15} y={y - 6} h={2} w={3} />
              </g>
            ))}
          </g>
        ))}
      </g>
    ),
  },
  "star-fern": {
    w: 70,
    h: 110,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={35} cy={40} rx={34} ry={40} color="#c77dff" opacity={0.35} />
        <rect x="10" y="82" width="50" height="28" rx="6" fill={HULL} />
        <rect x="10" y="82" width="50" height="5" rx="2" fill="#c77dff" opacity={0.8} />
        {[-50, -25, 0, 25, 50].map((a) => (
          <g key={a} transform={`rotate(${a} 35 84)`}>
            <path d="M35 84V20" stroke="#8a6ad8" strokeWidth={3} />
            {[30, 42, 54, 66].map((y) => (
              <path key={y} d={`M35 ${y}l-10 -6M35 ${y}l10 -6`} stroke="#b89aff" strokeWidth={3} strokeLinecap="round" />
            ))}
            <circle cx="35" cy="18" r="3" fill="#f2e6ff" />
          </g>
        ))}
      </g>
    ),
  },

  /* ------------------------------ house ------------------------------ */
  "fiddle-leaf": {
    w: 70,
    h: 150,
    render: () => (
      <g>
        <path d="M18 116h34l-4 34H22z" fill="#e8e2d6" />
        <rect x="16" y="112" width="38" height="6" rx="2" fill="#d9d2c4" />
        <path d="M35 114V40" stroke="#6b4a32" strokeWidth={4} />
        {[
          [22, 40, -30],
          [48, 30, 30],
          [20, 70, -40],
          [50, 60, 40],
          [34, 16, 0],
          [24, 92, -50],
          [46, 88, 50],
        ].map(([x, y, a], i) => (
          <ellipse key={i} cx={x} cy={y} rx={12} ry={17} fill={i % 2 ? LEAF_D : LEAF} transform={`rotate(${a} ${x} ${y})`} />
        ))}
      </g>
    ),
  },
  "snake-plant": {
    w: 60,
    h: 110,
    render: () => (
      <g>
        <rect x="10" y="80" width="40" height="30" rx="3" fill="#2f3237" />
        <rect x="8" y="78" width="44" height="6" rx="2" fill="#4a4f57" />
        {[
          [18, 20, -8],
          [26, 6, -2],
          [34, 12, 4],
          [42, 26, 10],
          [30, 30, 0],
        ].map(([x, top, lean], i) => (
          <path key={i} d={`M${x - 4} 80C${x - 5} 60 ${x - 3 + lean} ${top + 20} ${x + lean} ${top}C${x + 3 + lean} ${top + 20} ${x + 5} 60 ${x + 4} 80z`} fill={i % 2 ? "#4a7a3a" : "#5d8c45"} stroke="#c9d65a" strokeWidth={1.4} />
        ))}
      </g>
    ),
  },
  "bamboo-plant": {
    w: 60,
    h: 120,
    render: () => (
      <g>
        <rect x="12" y="92" width="36" height="28" rx="14" fill="#f3efe6" />
        <rect x="12" y="92" width="36" height="8" rx="4" fill="#dfe4ea" />
        {[20, 30, 40].map((x, i) => (
          <g key={x}>
            <rect x={x - 2.5} y={20 + i * 12} width="5" height={76 - i * 12} fill="#8fbf5a" />
            {[40, 60, 80].map((y) => (
              <rect key={y} x={x - 3} y={y} width="6" height="2" fill="#6f9a3a" />
            ))}
            <path d={`M${x} ${24 + i * 12}c8-6 14-4 16 0-6 2-12 2-16 0zM${x} ${34 + i * 12}c-8-6-14-4-16 0 6 2 12 2 16 0z`} fill={LEAF_L} />
          </g>
        ))}
      </g>
    ),
  },
  "arc-lamp": {
    w: 90,
    h: 150,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={78} cy={56} rx={26} ry={30} color="#ffd98a" opacity={0.45} />
        <rect x="4" y="138" width="30" height="12" rx="3" fill="#c9ced4" />
        <path d="M19 138C16 60 30 10 70 18c10 2 14 10 14 20" stroke="#c9ced4" strokeWidth={4} fill="none" />
        <path d="M66 36a18 18 0 0 1 36 0z" fill="#c9a25a" transform="translate(-8 0)" />
        <ellipse cx="76" cy="36" rx="14" ry="3" fill="#fff4cf" />
      </g>
    ),
  },
  "mirror-cabinet": {
    w: 70,
    h: 90,
    grounded: false,
    render: (u) => (
      <g>
        <defs>
          <linearGradient id={`${u}-m`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e8f2f6" />
            <stop offset="60%" stopColor="#a9c2cf" />
            <stop offset="100%" stopColor="#d6e4ea" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="66" height="86" rx="4" fill="#f3f5f7" />
        <rect x="7" y="7" width="27" height="72" fill={`url(#${u}-m)`} />
        <rect x="36" y="7" width="27" height="72" fill={`url(#${u}-m)`} />
        <rect x="30" y="38" width="3" height="10" rx="1.5" fill="#9aa4b2" />
        <rect x="37" y="38" width="3" height="10" rx="1.5" fill="#9aa4b2" />
        <path d="M12 20l14-10M40 24l16-12" stroke="#fff" strokeOpacity={0.6} strokeWidth={3} strokeLinecap="round" />
        <rect x="0" y="80" width="70" height="8" rx="2" fill="#dfe4ea" />
      </g>
    ),
  },
  "art-landscape": {
    w: 110,
    h: 80,
    grounded: false,
    render: () => (
      <g>
        <rect x="0" y="0" width="110" height="80" fill="#c9a25a" />
        <rect x="6" y="6" width="98" height="68" fill="#f2d7a8" />
        <circle cx="76" cy="26" r="10" fill="#f28c3a" />
        <path d="M6 54l24-22 20 18 18-14 36 26v12H6z" fill="#5a7a6a" />
        <path d="M6 64c20-8 40-8 60-2s28 4 38 0v12H6z" fill="#3a5a4a" />
      </g>
    ),
  },
  "dining-table": {
    w: 140,
    h: 70,
    render: () => (
      <g>
        <path d="M14 26l-6 44M126 26l6 44M36 28l-2 36M104 28l2 36" stroke="#8a5a3b" strokeWidth={6} />
        <ellipse cx="70" cy="22" rx="68" ry="12" fill="#b88a5e" />
        <ellipse cx="70" cy="20" rx="68" ry="12" fill="#d0a474" />
        <ellipse cx="70" cy="20" rx="40" ry="6" fill="#f3efe6" opacity={0.8} />
      </g>
    ),
  },
  hamper: {
    w: 60,
    h: 84,
    render: () => (
      <g>
        <path d="M6 22h48l-4 62H10z" fill="#d9c49a" />
        <g stroke="#b8a070" strokeWidth={2}>
          {[34, 46, 58, 70].map((y) => (
            <line key={y} x1="8" x2="52" y1={y} y2={y} />
          ))}
        </g>
        <path d="M4 22c0-10 52-10 52 0v6H4z" fill="#c9b080" />
        <rect x="24" y="10" width="12" height="6" rx="3" fill="#8a6a44" />
        <path d="M44 22c4 6 2 12-2 14" stroke="#8fb3cf" strokeWidth={5} fill="none" />
      </g>
    ),
  },

  /* ------------------------------ garden ------------------------------ */
  "topiary-spiral": {
    w: 60,
    h: 140,
    render: () => (
      <g>
        <path d="M14 112h32l-4 28H18z" fill="#6b7a8a" />
        <rect x="12" y="108" width="36" height="6" rx="2" fill="#57646f" />
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse key={i} cx={30 + (i % 2 ? 6 : -6)} cy={96 - i * 20} rx={22 - i * 3} ry={11} fill={i % 2 ? LEAF_D : LEAF} />
        ))}
        <circle cx="30" cy="4" r="4" fill={LEAF_L} />
      </g>
    ),
  },
  "topiary-bird": {
    w: 80,
    h: 120,
    render: () => (
      <g>
        <path d="M22 96h36l-4 24H26z" fill="#b8654a" />
        <rect x="20" y="92" width="40" height="6" rx="2" fill="#9e4f35" />
        <ellipse cx="38" cy="66" rx="30" ry="26" fill={LEAF} />
        <circle cx="62" cy="32" r="14" fill={LEAF} />
        <path d="M74 30l8 4-8 4z" fill={LEAF_D} />
        <path d="M8 60C0 44 4 30 14 26c2 14 6 24 12 30z" fill={LEAF_D} />
        <circle cx="66" cy="28" r="2" fill="#2a1a10" />
      </g>
    ),
  },
  "garden-swing": {
    w: 140,
    h: 110,
    render: () => (
      <g>
        <path d="M10 110L30 6M130 110L110 6M24 6h92" stroke="#5a3d28" strokeWidth={6} strokeLinecap="round" />
        <path d="M44 8v56M96 8v56" stroke="#8a7a5a" strokeWidth={2} />
        <rect x="34" y="40" width="72" height="8" rx="3" fill="#b8854a" />
        <rect x="32" y="60" width="76" height="10" rx="3" fill="#c9954a" />
        <rect x="40" y="50" width="26" height="12" rx="5" fill="#e07a88" />
        <rect x="72" y="50" width="26" height="12" rx="5" fill="#8fb3cf" />
      </g>
    ),
  },
  "bird-feeder": {
    w: 60,
    h: 130,
    render: () => (
      <g>
        <rect x="27" y="50" width="6" height="80" fill="#3a3a3a" />
        <path d="M10 22L30 4l20 18z" fill="#2f5a3a" />
        <rect x="16" y="22" width="28" height="30" fill="#e8f4ff" opacity={0.5} />
        <rect x="16" y="36" width="28" height="16" fill="#c9a86a" />
        <rect x="8" y="52" width="44" height="5" rx="2" fill="#2f5a3a" />
        <path d="M44 44c6-6 14-4 14 2-4 4-10 4-14-2z" fill="#c43d3d" />
        <circle cx="54" cy="42" r="1.4" fill="#111" />
      </g>
    ),
  },
  armillary: {
    w: 70,
    h: 110,
    render: () => (
      <g>
        <path d="M18 110l6-10h22l6 10z" fill={STONE_D} />
        <path d="M26 100c-2-16 2-26 0-40h18c-2 14 2 24 0 40z" fill={STONE} />
        <g fill="none" stroke="#b8923a" strokeWidth={3}>
          <circle cx="35" cy="32" r="26" />
          <ellipse cx="35" cy="32" rx="26" ry="9" />
          <ellipse cx="35" cy="32" rx="9" ry="26" transform="rotate(30 35 32)" />
        </g>
        <path d="M10 56L60 8" stroke="#8a6a2e" strokeWidth={3} />
        <circle cx="35" cy="32" r="4" fill={GOLD} />
      </g>
    ),
  },
  "planter-box": {
    w: 100,
    h: 70,
    render: () => (
      <g>
        <path d="M6 34h88l-6 36H12z" fill="#8a6a4a" />
        <path d="M6 34h88v6H6z" fill="#a8845e" />
        <path d="M30 40v30M70 40v30" stroke="#6b4a32" strokeWidth={2} />
        {[14, 26, 38, 50, 62, 74, 86].map((x, i) => (
          <g key={x}>
            <path d={`M${x} 34V${14 + (i % 3) * 5}`} stroke={LEAF} strokeWidth={2} />
            <circle cx={x} cy={12 + (i % 3) * 5} r={5} fill={["#f2c230", "#e07a88", "#9b7fd0"][i % 3]} />
          </g>
        ))}
      </g>
    ),
  },
  "hose-reel": {
    w: 80,
    h: 70,
    render: () => (
      <g>
        <path d="M14 70l6-24M66 70l-6-24" stroke="#3a4a3a" strokeWidth={4} />
        <circle cx="40" cy="36" r="26" fill="#3f8a4a" />
        <circle cx="40" cy="36" r="20" fill="none" stroke="#2f6a3a" strokeWidth={4} />
        <circle cx="40" cy="36" r="13" fill="none" stroke="#5aaa62" strokeWidth={4} />
        <circle cx="40" cy="36" r="5" fill="#2a3a2a" />
        <path d="M60 50c10 6 16 14 18 20" stroke="#3f8a4a" strokeWidth={4} fill="none" />
        <rect x="36" y="2" width="8" height="10" rx="2" fill="#e8b93a" />
      </g>
    ),
  },
  "fruit-press": {
    w: 80,
    h: 90,
    render: () => (
      <g>
        <rect x="8" y="80" width="64" height="10" fill={WOOD_D} />
        <path d="M14 80V14M66 80V14" stroke={WOOD} strokeWidth={8} />
        <rect x="8" y="8" width="64" height="10" rx="2" fill={WOOD} />
        <rect x="37" y="18" width="6" height="30" fill="#6f777f" />
        <path d="M24 12h32" stroke="#6f777f" strokeWidth={4} />
        <path d="M20 48h40l-4 30H24z" fill="#b8854a" />
        <path d="M20 56h40M20 66h40" stroke="#6b4428" strokeWidth={3} />
        <rect x="26" y="44" width="28" height="6" fill="#8e969f" />
        <circle cx="30" cy="42" r="4" fill="#c43d3d" />
        <circle cx="46" cy="42" r="4" fill="#8fce4a" />
      </g>
    ),
  },
  flamingo: {
    w: 50,
    h: 110,
    render: () => (
      <g>
        <path d="M24 110V66M28 110V70" stroke="#e86a8a" strokeWidth={2.4} />
        <ellipse cx="26" cy="58" rx="18" ry="12" fill="#ff8aa8" />
        <path d="M10 56c-6-6-6-12 0-14 4 6 8 8 12 8z" fill="#e86a8a" />
        <path d="M40 54c4-12 0-24-6-32" stroke="#ff8aa8" strokeWidth={6} fill="none" strokeLinecap="round" />
        <circle cx="32" cy="18" r="7" fill="#ff8aa8" />
        <path d="M38 18c6 0 8 4 6 10l-6-4z" fill="#2a1a1a" />
        <circle cx="31" cy="16" r="1.4" fill="#111" />
      </g>
    ),
  },
  "double-lamppost": {
    w: 80,
    h: 160,
    render: (u) => (
      <g>
        <Glow u={u} k="a" cx={14} cy={30} rx={18} color="#ffd98a" opacity={0.55} />
        <Glow u={u} k="b" cx={66} cy={30} rx={18} color="#ffd98a" opacity={0.55} />
        <path d="M30 160l4-14h12l4 14z" fill={IRON} />
        <rect x="37.5" y="30" width="5" height="118" fill={IRON} />
        <path d="M40 40c-10-10-24-10-26-2M40 40c10-10 24-10 26-2" stroke={IRON} strokeWidth={3} fill="none" />
        {[14, 66].map((x) => (
          <g key={x}>
            <path d={`M${x - 8} 22h16l-2 18h-12z`} fill="#ffe2a0" />
            <path d={`M${x - 11} 22l11-10 11 10z`} fill={IRON} />
          </g>
        ))}
        <circle cx="40" cy="26" r="4" fill={IRON} />
      </g>
    ),
  },

  /* --------------------------- space station --------------------------- */
  "wall-screen": {
    w: 110,
    h: 80,
    grounded: false,
    render: () => (
      <g>
        <rect x="0" y="0" width="110" height="80" rx="6" fill={PANEL} />
        <rect x="5" y="5" width="100" height="62" rx="2" fill="#2a3a5a" />
        <path d="M5 54c20-14 40-10 60-2s30 4 40-4v19H5z" fill="#4a7a5a" />
        <circle cx="38" cy="30" r="9" fill="#e3c4a0" />
        <path d="M26 58c0-12 5-18 12-18s12 6 12 18z" fill="#c46a4a" />
        <circle cx="70" cy="32" r="8" fill="#d9b48c" />
        <path d="M60 58c0-10 5-16 10-16s10 6 10 16z" fill="#3a6fb0" />
        <circle cx="96" cy="14" r="3" fill="#ff5c6c" />
        <rect x="40" y="70" width="30" height="5" rx="2.5" fill={CYAN} opacity={0.7} />
      </g>
    ),
  },
  "medicine-cabinet": {
    w: 90,
    h: 100,
    grounded: false,
    render: () => (
      <g>
        <rect x="2" y="2" width="86" height="96" rx="6" fill="#eef1f4" />
        <rect x="8" y="8" width="74" height="84" rx="3" fill="#dff4ff" opacity={0.6} />
        {[34, 62].map((y) => (
          <rect key={y} x="8" y={y} width="74" height="3" fill="#b9c3cf" />
        ))}
        {[16, 30, 44, 58, 70].map((x, i) => (
          <rect key={x} x={x} y={18 + (i % 2) * 2} width="8" height={16 - (i % 2) * 2} rx="2" fill={["#ff9f43", "#59d98e", "#5ce1e6", "#ff5c6c", "#c77dff"][i]} />
        ))}
        <rect x="16" y="44" width="22" height="18" rx="2" fill="#f3f5f7" />
        <path d="M24 53h6M27 50v6" stroke="#ff5c6c" strokeWidth={2} />
        <rect x="48" y="46" width="26" height="16" rx="3" fill="#9aa4b2" />
        <path d="M36 2h18v8H36z" fill="#ff5c6c" />
      </g>
    ),
  },
  "fuel-cell": {
    w: 60,
    h: 110,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={30} cy={56} rx={30} ry={46} color="#ffd166" opacity={0.35} />
        <rect x="6" y="96" width="48" height="14" rx="3" fill={PANEL} />
        <rect x="6" y="0" width="48" height="12" rx="3" fill={PANEL} />
        <rect x="12" y="12" width="36" height="84" rx="4" fill="#ffd166" opacity={0.3} />
        <rect x="18" y="30" width="24" height="66" rx="3" fill="#ffd166" />
        <g className="animate-twinkle">
          <rect x="18" y="30" width="24" height="10" rx="3" fill="#fff4c8" />
        </g>
        <rect x="12" y="12" width="36" height="84" rx="4" fill="none" stroke={HULL_D} strokeWidth={3} />
      </g>
    ),
  },
  "emergency-case": {
    w: 90,
    h: 62,
    render: () => (
      <g>
        <path d="M30 14V6h30v8" stroke={PANEL_L} strokeWidth={4} fill="none" />
        <rect x="2" y="14" width="86" height="48" rx="6" fill="#ff9f43" />
        <rect x="2" y="30" width="86" height="6" fill="#2a3342" />
        <path d="M14 46h14M60 46h16" stroke="#2a3342" strokeWidth={4} />
        <path d="M45 18l10 18H35z" fill="#2a3342" />
        <path d="M44 24h2v6h-2zM44 32h2v2h-2z" fill="#ff9f43" />
      </g>
    ),
  },
  orrery: {
    w: 100,
    h: 120,
    render: () => (
      <g>
        <rect x="30" y="108" width="40" height="12" rx="3" fill={PANEL} />
        <rect x="47" y="56" width="6" height="54" fill="#c9a25a" />
        <circle cx="50" cy="50" r="10" fill="#ffd166" />
        <g fill="none" stroke="#c9a25a" strokeWidth={1.4}>
          <ellipse cx="50" cy="50" rx="26" ry="8" />
          <ellipse cx="50" cy="50" rx="40" ry="13" />
          <ellipse cx="50" cy="50" rx="48" ry="17" />
        </g>
        <circle cx="76" cy="50" r="4" fill="#5ce1e6" />
        <circle cx="16" cy="44" r="5" fill="#ff7b5c" />
        <circle cx="90" cy="58" r="6" fill="#c77dff" />
        <path d="M76 50L50 50M16 44L50 50" stroke="#c9a25a" strokeWidth={1} />
      </g>
    ),
  },
  "spider-bot": {
    w: 90,
    h: 70,
    render: (u) => (
      <g>
        <path d="M30 40L10 30 4 68M60 40l20-10 6 38M34 44L20 52l-4 16M56 44l14 8 4 16" stroke={HULL_D} strokeWidth={4} fill="none" strokeLinejoin="round" />
        <ellipse cx="45" cy="38" rx="22" ry="16" fill="#eef1f4" />
        <rect x="31" y="30" width="28" height="10" rx="5" fill={PANEL} />
        <Glow u={u} k="e" cx={45} cy={35} rx={14} ry={6} color="#ff9f43" opacity={0.6} />
        <circle cx="38" cy="35" r="3" fill="#ff9f43" />
        <circle cx="52" cy="35" r="3" fill="#ff9f43" />
        <path d="M45 22V10" stroke={HULL_D} strokeWidth={2} />
        <circle cx="45" cy="9" r="3" fill="#59d98e" />
      </g>
    ),
  },
  "iv-stand": {
    w: 50,
    h: 150,
    render: () => (
      <g>
        <path d="M10 150l15-12 15 12" stroke={HULL_D} strokeWidth={4} fill="none" />
        <rect x="23" y="10" width="4" height="130" fill={HULL} />
        <path d="M10 12h30" stroke={HULL} strokeWidth={4} strokeLinecap="round" />
        <path d="M30 14h14v28c0 4-3 6-7 6s-7-2-7-6z" fill="#dff4ff" opacity={0.8} />
        <path d="M30 28h14v14c0 4-3 6-7 6s-7-2-7-6z" fill="#ff9aa8" />
        <path d="M37 48c0 20-6 30-10 50" stroke="#dfe4ea" strokeWidth={1.4} fill="none" />
      </g>
    ),
  },
  bonsai: {
    w: 70,
    h: 90,
    render: () => (
      <g>
        <rect x="10" y="72" width="50" height="14" rx="3" fill={PANEL_L} />
        <rect x="6" y="84" width="58" height="6" rx="2" fill={PANEL} />
        <path d="M34 72c-4-10 6-16 0-26s10-14 6-22" stroke="#6b4a32" strokeWidth={5} fill="none" strokeLinecap="round" />
        <ellipse cx="22" cy="42" rx="16" ry="9" fill="#5fbf6a" />
        <ellipse cx="46" cy="28" rx="18" ry="10" fill="#77d27f" />
        <ellipse cx="44" cy="54" rx="12" ry="7" fill="#5fbf6a" />
        <rect x="10" y="74" width="50" height="3" fill={CYAN} opacity={0.6} />
      </g>
    ),
  },
  "aloe-pod": {
    w: 60,
    h: 90,
    render: () => (
      <g>
        <path d="M8 60h44l-4 30H12z" fill="#eef1f4" />
        <rect x="8" y="60" width="44" height="4" fill="#59d98e" opacity={0.7} />
        {[
          [30, 6, 0],
          [16, 20, -20],
          [44, 18, 20],
          [22, 34, -35],
          [40, 32, 35],
        ].map(([x, y, a], i) => (
          <path key={i} d={`M30 60C${30 + (x - 30) * 0.4} 50 ${x - 4} ${y + 10} ${x} ${y}C${x + 4} ${y + 10} ${30 + (x - 30) * 0.4 + 6} 50 34 60z`} fill={i % 2 ? "#6fa87a" : "#7fbf8a"} transform={`rotate(${a / 4} 30 60)`} />
        ))}
      </g>
    ),
  },
  "antenna-mast": {
    w: 60,
    h: 140,
    render: () => (
      <g>
        <rect x="14" y="126" width="32" height="14" rx="3" fill={PANEL} />
        <path d="M22 126L30 10l8 116" stroke={HULL_D} strokeWidth={3} fill="none" />
        {[30, 54, 78, 102].map((y, i) => (
          <path key={y} d={`M${22 + i * 2} ${y + 20}L${38 - i * 2} ${y}`} stroke={HULL_D} strokeWidth={1.6} />
        ))}
        <path d="M12 30h36M16 60h28M20 90h20" stroke={HULL} strokeWidth={3} />
        <circle cx="30" cy="8" r="5" fill="#ff5c6c" />
      </g>
    ),
  },
};
