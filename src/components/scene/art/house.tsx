import type { ArtDef } from "./types";
import { Glow, r2 } from "./helpers";

const WALNUT = "#8a5a3b";
const WALNUT_D = "#5e3c27";
const OAK = "#c89b6d";
const OAK_L = "#dcb68b";
const CHAR = "#2f3237";
const CHAR_L = "#4a4f57";
const WHITE = "#f3efe8";
const WHITE_D = "#d9d3c9";
const SAGE = "#8fa58a";
const SAGE_D = "#6f8a6c";
const TERRA = "#c46a4a";
const TERRA_D = "#9e4f35";
const MUSTARD = "#d9a441";
const NAVY = "#2f4863";
const BRASS = "#c9a25a";

export const houseArt: Record<string, ArtDef> = {
  "door-modern": {
    w: 80,
    h: 150,
    render: () => (
      <g>
        <rect x="0" y="0" width="80" height="150" fill={WHITE_D} />
        <rect x="6" y="6" width="68" height="144" fill={NAVY} />
        <rect x="40" y="6" width="34" height="144" fill="#000" opacity={0.1} />
        <rect x="16" y="18" width="48" height="50" rx="2" fill="#26394f" />
        <rect x="16" y="78" width="48" height="58" rx="2" fill="#26394f" />
        <rect x="20" y="22" width="40" height="42" rx="1" fill="#9fc3d6" opacity={0.55} />
        <rect x="58" y="74" width="4" height="18" rx="2" fill={BRASS} />
        <rect x="30" y="102" width="20" height="4" rx="1" fill={BRASS} />
      </g>
    ),
  },

  "coat-rack": {
    w: 54,
    h: 150,
    render: () => (
      <g>
        <rect x="25" y="10" width="4" height="134" fill={WALNUT_D} />
        <path d="M10 150l17-16 17 16" stroke={WALNUT_D} strokeWidth={4} fill="none" strokeLinecap="round" />
        <path d="M27 18l-14-8M27 18l14-8M27 24l-12 2M27 24l12 2" stroke={WALNUT_D} strokeWidth={3} strokeLinecap="round" />
        <path d="M12 14c-8 6-10 30-8 54h22c0-20-2-42-14-54z" fill={TERRA} />
        <path d="M12 14c-4 10-4 30-2 54h6c-2-18-2-40-4-54z" fill="#000" opacity={0.12} />
        <path d="M40 26c6 4 10 16 10 28-4 2-10 2-14 0 0-10 0-20 4-28z" fill={MUSTARD} />
        <circle cx="42" cy="14" r="8" fill={CHAR_L} />
        <rect x="32" y="16" width="20" height="3" rx="1.5" fill={CHAR} />
      </g>
    ),
  },

  mirror: {
    w: 60,
    h: 100,
    grounded: false,
    render: (u) => (
      <g>
        <defs>
          <linearGradient id={`${u}-m`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dbe7ee" />
            <stop offset="55%" stopColor="#9fb4c2" />
            <stop offset="100%" stopColor="#c8d7e0" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="56" height="96" rx="28" fill={BRASS} />
        <rect x="7" y="7" width="46" height="86" rx="23" fill={`url(#${u}-m)`} />
        <path d="M16 30l16-14M16 44l26-24" stroke="#fff" strokeOpacity={0.6} strokeWidth={3} strokeLinecap="round" />
      </g>
    ),
  },

  "umbrella-stand": {
    w: 44,
    h: 100,
    render: () => (
      <g>
        <path d="M14 20c-2-10 2-18 8-20" stroke={CHAR} strokeWidth={2.6} fill="none" strokeLinecap="round" />
        <path d="M24 22V6c0-4 6-4 6 0" stroke={TERRA_D} strokeWidth={2.6} fill="none" strokeLinecap="round" />
        <path d="M10 60l6-40h6l2 40z" fill={NAVY} />
        <path d="M22 60l3-38h6l4 38z" fill={TERRA} />
        <path d="M6 44h32l-3 56H9z" fill={WHITE_D} />
        <path d="M22 44h16l-3 56H22z" fill="#000" opacity={0.08} />
        <rect x="4" y="40" width="36" height="6" rx="2" fill={WHITE} />
      </g>
    ),
  },

  "console-table": {
    w: 110,
    h: 104,
    render: () => (
      <g>
        <rect x="8" y="58" width="4" height="46" fill={WALNUT_D} />
        <rect x="98" y="58" width="4" height="46" fill={WALNUT_D} />
        <rect x="14" y="88" width="82" height="4" fill={WALNUT_D} />
        <rect x="2" y="52" width="106" height="8" rx="1.5" fill={WALNUT} />
        <path d="M30 52c-6-8-6-18 0-26h10c6 8 6 18 0 26z" fill={TERRA} />
        <rect x="31" y="22" width="8" height="6" fill={TERRA_D} />
        <path d="M35 22c-6-10-14-14-20-12M35 22c2-12 8-18 16-18M35 22c6-6 14-8 20-4" stroke={SAGE_D} strokeWidth={2} fill="none" />
        <circle cx="15" cy="10" r="4" fill={MUSTARD} />
        <circle cx="51" cy="4" r="4" fill={WHITE} />
        <circle cx="55" cy="18" r="3.5" fill={MUSTARD} />
        <rect x="70" y="40" width="24" height="12" rx="1" fill={WHITE_D} />
        <rect x="72" y="34" width="20" height="6" rx="1" fill={NAVY} />
        <ellipse cx="60" cy="50" rx="6" ry="2" fill={BRASS} />
      </g>
    ),
  },

  "floor-lamp": {
    w: 56,
    h: 150,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={30} cy={34} rx={30} ry={40} color="#ffd98a" opacity={0.45} />
        <ellipse cx="28" cy="146" rx="16" ry="4" fill={CHAR} />
        <rect x="26.5" y="30" width="3" height="116" fill={CHAR} />
        <path d="M12 4h32l8 30H4z" fill="#efe2c6" />
        <path d="M28 4h16l8 30H28z" fill="#000" opacity={0.06} />
        <path d="M4 34h48" stroke="#ffe6a6" strokeWidth={2} />
      </g>
    ),
  },

  sofa: {
    w: 190,
    h: 90,
    render: () => (
      <g>
        <rect x="18" y="80" width="6" height="10" fill={WALNUT_D} />
        <rect x="166" y="80" width="6" height="10" fill={WALNUT_D} />
        <rect x="16" y="6" width="158" height="50" rx="12" fill={SAGE} />
        <rect x="18" y="12" width="74" height="42" rx="10" fill={SAGE} stroke={SAGE_D} strokeWidth={1.2} />
        <rect x="98" y="12" width="74" height="42" rx="10" fill={SAGE} stroke={SAGE_D} strokeWidth={1.2} />
        <rect x="14" y="48" width="162" height="34" rx="8" fill={SAGE_D} />
        <rect x="24" y="46" width="72" height="16" rx="6" fill={SAGE} />
        <rect x="94" y="46" width="72" height="16" rx="6" fill={SAGE} />
        <rect x="0" y="30" width="24" height="54" rx="10" fill={SAGE_D} />
        <rect x="166" y="30" width="24" height="54" rx="10" fill={SAGE_D} />
        <rect x="30" y="22" width="30" height="26" rx="6" fill={MUSTARD} transform="rotate(-8 45 35)" />
        <rect x="132" y="22" width="30" height="26" rx="6" fill={TERRA} transform="rotate(8 147 35)" />
      </g>
    ),
  },

  tv: {
    w: 150,
    h: 112,
    render: (u) => (
      <g>
        <defs>
          <linearGradient id={`${u}-s`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2c4a6e" />
            <stop offset="100%" stopColor="#15202e" />
          </linearGradient>
        </defs>
        <rect x="10" y="80" width="130" height="28" rx="2" fill={WALNUT} />
        <rect x="10" y="80" width="130" height="4" fill={OAK} />
        <rect x="16" y="108" width="4" height="4" fill={WALNUT_D} />
        <rect x="130" y="108" width="4" height="4" fill={WALNUT_D} />
        <rect x="20" y="88" width="50" height="14" rx="1" fill={WALNUT_D} />
        <rect x="80" y="88" width="50" height="14" rx="1" fill={WALNUT_D} />
        <rect x="68" y="72" width="14" height="8" fill={CHAR} />
        <rect x="14" y="2" width="122" height="72" rx="3" fill={CHAR} />
        <rect x="18" y="6" width="114" height="64" rx="1" fill={`url(#${u}-s)`} />
        <path d="M18 56c20-14 40-10 58-2s36 4 56-6v22H18z" fill="#3f6b5a" opacity={0.6} />
        <circle cx="104" cy="24" r="8" fill="#f5d88a" opacity={0.8} />
        <path d="M18 6l40 0-40 40z" fill="#fff" opacity={0.05} />
      </g>
    ),
  },

  plant: {
    w: 70,
    h: 120,
    render: () => (
      <g>
        <path d="M14 82h42l-5 38H19z" fill={TERRA} />
        <path d="M35 82h21l-5 38H35z" fill="#000" opacity={0.12} />
        <rect x="12" y="78" width="46" height="7" rx="2" fill={TERRA_D} />
        <g fill={SAGE_D}>
          <path d="M35 80C20 70 6 50 8 28c14 8 24 28 27 52z" />
          <path d="M35 80c4-26 14-44 28-52 2 22-10 42-28 52z" />
        </g>
        <g fill={SAGE}>
          <path d="M35 80c-8-22-6-48 2-72 10 22 8 50-2 72z" />
          <path d="M34 80C22 72 12 60 10 46c12 4 20 18 24 34z" />
          <path d="M36 80c4-14 14-26 26-30-2 14-12 26-26 30z" />
        </g>
        <path d="M36 80c0-24 1-48 1-72" stroke="#5a7358" strokeWidth={1.2} fill="none" />
      </g>
    ),
  },

  "coffee-table": {
    w: 130,
    h: 56,
    render: () => (
      <g>
        <rect x="14" y="26" width="5" height="30" fill={WALNUT_D} />
        <rect x="111" y="26" width="5" height="30" fill={WALNUT_D} />
        <rect x="20" y="42" width="90" height="4" fill={WALNUT_D} />
        <path d="M8 22h114l-4 8H12z" fill={WALNUT} />
        <path d="M14 16h102l6 6H8z" fill={OAK} />
        <rect x="26" y="8" width="30" height="5" rx="1" fill={NAVY} />
        <rect x="28" y="4" width="26" height="4" rx="1" fill={MUSTARD} />
        <path d="M78 16c0-6 3-10 8-10s8 4 8 10z" fill={WHITE} />
        <path d="M94 8c4 0 5 5 0 6" stroke={WHITE} strokeWidth={1.8} fill="none" />
        <path d="M84 2c-2-2 2-3 0-5M88 2c-2-2 2-3 0-5" stroke={WHITE_D} strokeWidth={0.8} fill="none" />
      </g>
    ),
  },

  "record-player": {
    w: 96,
    h: 96,
    render: () => (
      <g>
        <rect x="8" y="46" width="80" height="50" rx="2" fill={WALNUT} />
        <rect x="8" y="46" width="80" height="4" fill={OAK} />
        <rect x="14" y="56" width="68" height="34" rx="1" fill={WALNUT_D} />
        <g fill={CHAR}>
          {[18, 26, 34, 42, 50].map((x) => (
            <rect key={x} x={x} y={60} width={5} height={28} rx={1} />
          ))}
        </g>
        <rect x="58" y="62" width="4" height="26" fill={TERRA} />
        <rect x="64" y="60" width="4" height="28" fill={MUSTARD} />
        <rect x="4" y="30" width="88" height="16" rx="2" fill={OAK} />
        <ellipse cx="42" cy="34" rx="28" ry="6" fill="#16171a" />
        <ellipse cx="42" cy="34" rx="18" ry="3.8" fill="none" stroke="#303238" strokeWidth={0.8} />
        <ellipse cx="42" cy="34" rx="6" ry="1.6" fill={TERRA} />
        <path d="M80 26l-8 12" stroke="#c9ced4" strokeWidth={2} strokeLinecap="round" />
        <circle cx="80" cy="26" r="3" fill="#c9ced4" />
      </g>
    ),
  },

  fridge: {
    w: 70,
    h: 156,
    render: () => (
      <g>
        <rect x="2" y="2" width="66" height="154" rx="6" fill="#e3e6e8" />
        <rect x="36" y="2" width="32" height="154" rx="6" fill="#000" opacity={0.06} />
        <line x1="2" y1="56" x2="68" y2="56" stroke="#b9bec3" strokeWidth={2} />
        <rect x="56" y="20" width="4" height="26" rx="2" fill="#9aa1a8" />
        <rect x="56" y="66" width="4" height="40" rx="2" fill="#9aa1a8" />
        <rect x="14" y="72" width="10" height="12" rx="1" fill={MUSTARD} transform="rotate(-6 19 78)" />
        <rect x="28" y="78" width="14" height="10" rx="1" fill={SAGE} transform="rotate(4 35 83)" />
        <circle cx="20" cy="100" r="4" fill={TERRA} />
        <rect x="14" y="16" width="20" height="14" rx="1" fill={WHITE} transform="rotate(3 24 23)" />
      </g>
    ),
  },

  stove: {
    w: 100,
    h: 104,
    render: (u) => (
      <g>
        <rect x="2" y="20" width="96" height="84" rx="3" fill="#e3e6e8" />
        <rect x="2" y="20" width="96" height="14" rx="3" fill={CHAR_L} />
        {[16, 32, 68, 84].map((x) => (
          <circle key={x} cx={x} cy={27} r={3.2} fill="#c9ced4" />
        ))}
        <rect x="12" y="42" width="76" height="52" rx="3" fill={CHAR} />
        <rect x="18" y="48" width="64" height="38" rx="2" fill="#141518" />
        <Glow u={u} k="o" cx={50} cy={72} rx={30} ry={14} color="#ff8a2a" opacity={0.5} />
        <rect x="24" y="40" width="52" height="3" rx="1.5" fill="#9aa1a8" />
        <ellipse cx="34" cy="14" rx="18" ry="4" fill="#3a3d42" />
        <path d="M16 14h36v6H16z" fill="#3a3d42" />
        <path d="M60 10h26v8H60z" fill={TERRA} />
        <rect x="58" y="8" width="30" height="4" rx="2" fill={TERRA_D} />
        <path d="M34 4c-2-3 2-4 0-7M40 4c-2-3 2-4 0-7" stroke="#c9ced4" strokeWidth={1} fill="none" />
      </g>
    ),
  },

  kettle: {
    w: 56,
    h: 60,
    render: () => (
      <g>
        <path d="M8 58c-4-18 2-38 20-38s24 20 20 38z" fill={TERRA} />
        <path d="M28 20c18 0 24 20 20 38H28z" fill="#000" opacity={0.12} />
        <path d="M8 36L0 26" stroke={TERRA} strokeWidth={5} strokeLinecap="round" />
        <path d="M14 22c0-14 28-14 28 0" stroke={CHAR} strokeWidth={4} fill="none" />
        <circle cx="28" cy="18" r="3" fill={CHAR} />
        <rect x="6" y="54" width="44" height="6" rx="2" fill={CHAR} />
      </g>
    ),
  },

  "fruit-bowl": {
    w: 80,
    h: 50,
    render: () => (
      <g>
        <circle cx="26" cy="22" r="10" fill="#d94f3d" />
        <circle cx="44" cy="18" r="10" fill={MUSTARD} />
        <circle cx="58" cy="24" r="9" fill="#e38a3c" />
        <circle cx="36" cy="28" r="9" fill="#7fa04a" />
        <path d="M44 8c2-4 6-6 8-4" stroke="#5a7358" strokeWidth={2} fill="none" />
        <path d="M4 26h72c-2 14-16 22-36 22S6 40 4 26z" fill={WHITE} />
        <path d="M40 26h36c-2 14-16 22-36 22z" fill="#000" opacity={0.08} />
        <path d="M4 26h72" stroke={NAVY} strokeWidth={2.4} />
      </g>
    ),
  },

  "wall-clock": {
    w: 60,
    h: 60,
    grounded: false,
    render: () => (
      <g>
        <circle cx="30" cy="30" r="29" fill={CHAR} />
        <circle cx="30" cy="30" r="25" fill={WHITE} />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          return (
            <line
              key={i}
              x1={r2(30 + Math.sin(a) * 20)}
              y1={r2(30 - Math.cos(a) * 20)}
              x2={r2(30 + Math.sin(a) * 23)}
              y2={r2(30 - Math.cos(a) * 23)}
              stroke={CHAR}
              strokeWidth={i % 3 === 0 ? 2.4 : 1.2}
            />
          );
        })}
        <line x1="30" y1="30" x2="30" y2="14" stroke={CHAR} strokeWidth={2.4} strokeLinecap="round" />
        <line x1="30" y1="30" x2="41" y2="34" stroke={CHAR} strokeWidth={2.4} strokeLinecap="round" />
        <line x1="30" y1="30" x2="22" y2="46" stroke={TERRA} strokeWidth={1.2} />
        <circle cx="30" cy="30" r="2.4" fill={TERRA} />
      </g>
    ),
  },

  "pendant-lamp": {
    w: 60,
    h: 90,
    grounded: false,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={30} cy={80} rx={36} ry={20} color="#ffd98a" opacity={0.5} />
        <line x1="30" y1="0" x2="30" y2="56" stroke={CHAR} strokeWidth={1.4} />
        <path d="M8 80c0-14 10-24 22-24s22 10 22 24z" fill={MUSTARD} />
        <path d="M30 56c12 0 22 10 22 24H30z" fill="#000" opacity={0.12} />
        <ellipse cx="30" cy="80" rx="22" ry="3" fill="#ffe6a6" />
        <rect x="26" y="52" width="8" height="6" rx="1" fill={CHAR} />
      </g>
    ),
  },

  bed: {
    w: 180,
    h: 100,
    render: () => (
      <g>
        <rect x="6" y="4" width="168" height="56" rx="6" fill={WALNUT} />
        <rect x="12" y="10" width="156" height="44" rx="4" fill={WALNUT_D} opacity={0.4} />
        <rect x="4" y="50" width="172" height="44" rx="4" fill={WHITE} />
        <ellipse cx="50" cy="48" rx="30" ry="11" fill="#fbf8f2" />
        <ellipse cx="130" cy="48" rx="30" ry="11" fill={WHITE_D} />
        <path d="M4 64h172v28H4z" fill={NAVY} />
        <path d="M4 64h172v6H4z" fill="#3c5a7a" />
        <path d="M90 64h86v28H90z" fill="#000" opacity={0.1} />
        <rect x="8" y="92" width="6" height="8" fill={WALNUT_D} />
        <rect x="166" y="92" width="6" height="8" fill={WALNUT_D} />
      </g>
    ),
  },

  wardrobe: {
    w: 100,
    h: 158,
    render: () => (
      <g>
        <rect x="2" y="2" width="96" height="148" rx="2" fill={OAK} />
        <rect x="50" y="2" width="48" height="148" rx="2" fill="#000" opacity={0.08} />
        <rect x="8" y="8" width="41" height="136" rx="1" fill={OAK_L} />
        <rect x="51" y="8" width="41" height="136" rx="1" fill={OAK_L} opacity={0.85} />
        <rect x="42" y="64" width="3" height="22" rx="1.5" fill={CHAR} />
        <rect x="55" y="64" width="3" height="22" rx="1.5" fill={CHAR} />
        <rect x="8" y="150" width="6" height="8" fill={WALNUT_D} />
        <rect x="86" y="150" width="6" height="8" fill={WALNUT_D} />
        <rect x="18" y="-14" width="30" height="16" rx="2" fill={TERRA} />
        <rect x="52" y="-10" width="26" height="12" rx="2" fill={SAGE} />
      </g>
    ),
  },

  "table-lamp": {
    w: 64,
    h: 100,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={32} cy={20} rx={32} ry={26} color="#ffd98a" opacity={0.45} />
        <rect x="4" y="58" width="56" height="42" rx="2" fill={WALNUT} />
        <rect x="4" y="58" width="56" height="4" fill={OAK} />
        <rect x="10" y="72" width="44" height="3" rx="1" fill={WALNUT_D} />
        <circle cx="32" cy="86" r="2" fill={BRASS} />
        <path d="M24 58c0-8 3-14 8-18 5 4 8 10 8 18z" fill={SAGE} />
        <rect x="31" y="28" width="2" height="14" fill={BRASS} />
        <path d="M16 30l6-24h20l6 24z" fill="#efe2c6" />
        <path d="M16 30h32" stroke="#ffe6a6" strokeWidth={1.6} />
      </g>
    ),
  },

  guitar: {
    w: 50,
    h: 130,
    render: () => (
      <g>
        <path d="M22 130l-4-10h14l-4 10z" fill={CHAR} />
        <rect x="22" y="4" width="6" height="70" fill={WALNUT_D} />
        <rect x="19" y="0" width="12" height="14" rx="2" fill={CHAR} />
        <path d="M25 60c-10 0-14 8-12 16-8 4-12 12-10 24 2 14 12 20 22 20s20-6 22-20c2-12-2-20-10-24 2-8-2-16-12-16z" fill={MUSTARD} />
        <path d="M25 60c10 0 14 8 12 16 8 4 12 12 10 24-2 14-12 20-22 20z" fill="#000" opacity={0.12} />
        <circle cx="25" cy="86" r="6" fill="#3a2a1c" />
        <rect x="18" y="104" width="14" height="4" rx="1" fill={WALNUT_D} />
        <g stroke="#e8e2d6" strokeWidth={0.5}>
          <line x1="24" y1="6" x2="24" y2="106" />
          <line x1="26" y1="6" x2="26" y2="106" />
        </g>
      </g>
    ),
  },

  "window-curtain": {
    w: 100,
    h: 120,
    grounded: false,
    render: (u) => (
      <g>
        <defs>
          <linearGradient id={`${u}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8fb8d8" />
            <stop offset="100%" stopColor="#e9d8b8" />
          </linearGradient>
        </defs>
        <rect x="14" y="10" width="72" height="96" fill={WHITE} />
        <rect x="19" y="15" width="62" height="86" fill={`url(#${u}-sky)`} />
        <path d="M19 80c14-8 26-6 36-2s18 2 26-4v27H19z" fill="#8aa37a" opacity={0.8} />
        <line x1="50" y1="15" x2="50" y2="101" stroke={WHITE} strokeWidth={3} />
        <line x1="19" y1="56" x2="81" y2="56" stroke={WHITE} strokeWidth={3} />
        <rect x="10" y="104" width="80" height="5" fill={WHITE_D} />
        <rect x="0" y="2" width="100" height="4" rx="2" fill={BRASS} />
        <path d="M2 6h22c-4 30-2 70 4 110H2z" fill={TERRA} />
        <path d="M98 6H76c4 30 2 70-4 110h26z" fill={TERRA} />
        <path d="M10 6c0 30 2 70 6 110M88 6c0 30-2 70-6 110" stroke={TERRA_D} strokeWidth={1.4} fill="none" />
      </g>
    ),
  },

  "art-abstract": {
    w: 80,
    h: 100,
    grounded: false,
    render: () => (
      <g>
        <rect x="0" y="0" width="80" height="100" fill={CHAR} />
        <rect x="4" y="4" width="72" height="92" fill="#f4efe6" />
        <circle cx="30" cy="36" r="16" fill={TERRA} />
        <rect x="40" y="40" width="26" height="40" fill={NAVY} />
        <path d="M12 86c10-16 24-20 40-12" stroke={MUSTARD} strokeWidth={6} fill="none" strokeLinecap="round" />
        <circle cx="58" cy="22" r="6" fill={SAGE} />
      </g>
    ),
  },

  computer: {
    w: 140,
    h: 110,
    render: (u) => (
      <g>
        <defs>
          <linearGradient id={`${u}-s`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3a5f86" />
            <stop offset="100%" stopColor="#1b2a3c" />
          </linearGradient>
        </defs>
        <rect x="10" y="64" width="5" height="46" fill={CHAR} />
        <rect x="125" y="64" width="5" height="46" fill={CHAR} />
        <rect x="2" y="58" width="136" height="7" rx="1.5" fill={OAK} />
        <rect x="36" y="4" width="72" height="44" rx="3" fill={CHAR} />
        <rect x="39" y="7" width="66" height="36" rx="1" fill={`url(#${u}-s)`} />
        <g fill="#9fc3d6" opacity={0.7}>
          <rect x="44" y="12" width="30" height="3" rx="1" />
          <rect x="44" y="18" width="46" height="2" rx="1" />
          <rect x="44" y="22" width="40" height="2" rx="1" />
          <rect x="44" y="26" width="50" height="2" rx="1" />
          <rect x="44" y="32" width="24" height="6" rx="1" fill={MUSTARD} />
        </g>
        <rect x="68" y="48" width="8" height="8" fill={CHAR_L} />
        <rect x="58" y="55" width="28" height="3" rx="1" fill={CHAR_L} />
        <rect x="46" y="52" width="36" height="4" rx="1" fill="#d8dadd" transform="translate(-30 0)" />
        <ellipse cx="100" cy="55" rx="4" ry="2.4" fill="#d8dadd" />
        <path d="M118 58c0-6 2-10 6-10s6 4 6 10z" fill={WHITE} />
      </g>
    ),
  },

  "office-chair": {
    w: 70,
    h: 104,
    render: () => (
      <g>
        <path d="M10 102l25-12 25 12" stroke={CHAR} strokeWidth={3.5} fill="none" strokeLinecap="round" />
        <circle cx="10" cy="102" r="2.4" fill={CHAR_L} />
        <circle cx="60" cy="102" r="2.4" fill={CHAR_L} />
        <rect x="33" y="64" width="4" height="28" fill="#8e949b" />
        <rect x="12" y="2" width="46" height="52" rx="10" fill={CHAR_L} />
        <rect x="16" y="6" width="38" height="44" rx="8" fill={CHAR} />
        <rect x="8" y="54" width="54" height="12" rx="5" fill={CHAR_L} />
        <path d="M4 44h8v14M66 44h-8v14" stroke={CHAR} strokeWidth={3} fill="none" />
      </g>
    ),
  },

  whiteboard: {
    w: 120,
    h: 84,
    grounded: false,
    render: () => (
      <g>
        <rect x="0" y="0" width="120" height="76" rx="2" fill="#b9bec3" />
        <rect x="4" y="4" width="112" height="68" fill="#fbfbf9" />
        <path d="M12 18h36M12 26h28M12 34h40" stroke={NAVY} strokeWidth={2} strokeLinecap="round" />
        <circle cx="80" cy="30" r="14" fill="none" stroke={TERRA} strokeWidth={2} />
        <path d="M52 30h14" stroke={TERRA} strokeWidth={2} />
        <path d="M12 56l16-10 14 6 18-14 20 8" stroke={SAGE_D} strokeWidth={2} fill="none" />
        <rect x="20" y="76" width="80" height="4" rx="1" fill="#9aa1a8" />
        <rect x="30" y="73" width="12" height="3" rx="1" fill={TERRA} />
        <rect x="46" y="73" width="12" height="3" rx="1" fill={NAVY} />
      </g>
    ),
  },

  car: {
    w: 220,
    h: 90,
    render: () => (
      <g>
        <path d="M8 62c0-12 6-20 20-22l24-4 26-20c8-6 16-8 30-8h36c14 0 22 4 30 12l18 18c14 2 20 10 20 24v6H8z" fill="#9b3b36" />
        <path d="M110 8h34c14 0 22 4 30 12l18 18c14 2 20 10 20 24v6H110z" fill="#000" opacity={0.1} />
        <path d="M60 38l24-20c6-4 12-6 22-6h8v26z" fill="#b8d0de" />
        <path d="M122 12h22c10 0 16 4 22 10l14 16h-58z" fill="#a5c1d2" />
        <rect x="114" y="12" width="6" height="28" fill="#9b3b36" />
        <rect x="200" y="54" width="14" height="6" rx="2" fill="#f5d88a" />
        <rect x="8" y="54" width="10" height="6" rx="2" fill="#e35d6a" />
        <rect x="84" y="48" width="12" height="3" rx="1.5" fill="#6b2622" />
        <rect x="150" y="48" width="12" height="3" rx="1.5" fill="#6b2622" />
        <circle cx="56" cy="70" r="18" fill={CHAR} />
        <circle cx="56" cy="70" r="8" fill="#b9bec3" />
        <circle cx="174" cy="70" r="18" fill={CHAR} />
        <circle cx="174" cy="70" r="8" fill="#b9bec3" />
      </g>
    ),
  },

  bicycle: {
    w: 120,
    h: 76,
    render: () => (
      <g>
        <circle cx="26" cy="50" r="22" fill="none" stroke={CHAR} strokeWidth={4} />
        <circle cx="94" cy="50" r="22" fill="none" stroke={CHAR} strokeWidth={4} />
        <circle cx="26" cy="50" r="2.4" fill={CHAR_L} />
        <circle cx="94" cy="50" r="2.4" fill={CHAR_L} />
        <path d="M26 50l22-30h36L94 50M48 20l12 30 24-30M60 50H26" stroke={TERRA} strokeWidth={4} fill="none" strokeLinejoin="round" />
        <path d="M44 14h14" stroke={CHAR} strokeWidth={5} strokeLinecap="round" />
        <path d="M84 20l-4-12h12" stroke={CHAR_L} strokeWidth={3} fill="none" strokeLinecap="round" />
        <circle cx="60" cy="50" r="5" fill={CHAR_L} />
      </g>
    ),
  },

  toolbox: {
    w: 84,
    h: 56,
    render: () => (
      <g>
        <path d="M26 16v-10h32v10" stroke={CHAR} strokeWidth={4} fill="none" />
        <rect x="2" y="16" width="80" height="40" rx="3" fill="#c7412f" />
        <rect x="2" y="16" width="80" height="12" rx="3" fill="#dd5a45" />
        <rect x="42" y="16" width="40" height="40" rx="3" fill="#000" opacity={0.08} />
        <rect x="36" y="24" width="12" height="8" rx="1" fill="#b9bec3" />
        <path d="M60 14l14-12" stroke="#9aa1a8" strokeWidth={3} strokeLinecap="round" />
        <path d="M16 14l4-10 4 10" fill={MUSTARD} />
      </g>
    ),
  },

  ladder: {
    w: 60,
    h: 150,
    render: () => (
      <g>
        <line x1="12" y1="150" x2="22" y2="2" stroke="#b9bec3" strokeWidth={5} strokeLinecap="round" />
        <line x1="48" y1="150" x2="38" y2="2" stroke="#9aa1a8" strokeWidth={5} strokeLinecap="round" />
        {[20, 44, 68, 92, 116, 140].map((y) => {
          const t = y / 150;
          return <line key={y} x1={22 - 10 * t} y1={y} x2={38 + 10 * t} y2={y} stroke="#c9ced4" strokeWidth={4} />;
        })}
      </g>
    ),
  },

  tire: {
    w: 70,
    h: 70,
    render: () => (
      <g>
        <circle cx="35" cy="35" r="33" fill={CHAR} />
        <circle cx="35" cy="35" r="33" fill="none" stroke="#1f2125" strokeWidth={2} strokeDasharray="4 3" />
        <circle cx="35" cy="35" r="17" fill="#b9bec3" />
        <circle cx="35" cy="35" r="6" fill={CHAR_L} />
        {[0, 72, 144, 216, 288].map((a) => (
          <circle key={a} cx={r2(35 + Math.cos((a * Math.PI) / 180) * 11)} cy={r2(35 + Math.sin((a * Math.PI) / 180) * 11)} r={2} fill={CHAR_L} />
        ))}
      </g>
    ),
  },

  boxes: {
    w: 110,
    h: 100,
    render: () => (
      <g>
        <rect x="4" y="50" width="56" height="50" fill="#c9a06a" />
        <rect x="56" y="58" width="50" height="42" fill="#b88d58" />
        <rect x="18" y="12" width="50" height="40" fill="#d6b07a" />
        <rect x="4" y="50" width="56" height="8" fill="#b88d58" />
        <rect x="18" y="12" width="50" height="7" fill="#c9a06a" />
        <rect x="28" y="50" width="8" height="50" fill="#e3caa0" opacity={0.6} />
        <rect x="39" y="12" width="8" height="40" fill="#e3caa0" opacity={0.6} />
        <rect x="76" y="58" width="8" height="42" fill="#e3caa0" opacity={0.6} />
        <rect x="10" y="70" width="14" height="8" fill={WHITE} />
      </g>
    ),
  },

  bathtub: {
    w: 170,
    h: 80,
    render: () => (
      <g>
        <path d="M130 18V6c0-4 8-6 10 0" stroke="#b9bec3" strokeWidth={4} fill="none" />
        <path d="M4 26h162v14c0 20-18 32-40 32H44C22 72 4 60 4 40z" fill={WHITE} />
        <path d="M86 26h80v14c0 20-18 32-40 32H86z" fill="#000" opacity={0.06} />
        <rect x="0" y="22" width="170" height="8" rx="4" fill="#fbfbf9" />
        <circle cx="40" cy="20" r="8" fill="#fbfbf9" />
        <circle cx="52" cy="16" r="10" fill="#fbfbf9" />
        <circle cx="66" cy="20" r="7" fill="#fbfbf9" />
        <path d="M30 72l-4 8M140 72l4 8" stroke={BRASS} strokeWidth={4} strokeLinecap="round" />
      </g>
    ),
  },

  towel: {
    w: 60,
    h: 90,
    grounded: false,
    render: () => (
      <g>
        <rect x="0" y="4" width="60" height="5" rx="2.5" fill={BRASS} />
        <path d="M8 6h44v76H8z" fill={SAGE} />
        <path d="M30 6h22v76H30z" fill="#000" opacity={0.08} />
        <path d="M8 70h44M8 74h44" stroke={WHITE} strokeWidth={2} />
      </g>
    ),
  },

  "rubber-duck": {
    w: 50,
    h: 44,
    render: () => (
      <g>
        <path d="M4 30c0-10 10-14 20-12 2-8 8-14 14-12s8 10 4 16c6 2 8 8 6 14-4 8-40 8-44-6z" fill="#f2c230" />
        <path d="M42 16l8 2-8 4z" fill="#e3822b" />
        <circle cx="36" cy="12" r="1.8" fill={CHAR} />
        <path d="M14 30c6 4 14 4 20-2" stroke="#d9a41f" strokeWidth={2} fill="none" />
      </g>
    ),
  },

  "washing-machine": {
    w: 80,
    h: 96,
    render: () => (
      <g>
        <rect x="2" y="2" width="76" height="94" rx="4" fill="#eceef0" />
        <rect x="2" y="2" width="76" height="16" rx="4" fill="#dfe2e5" />
        <circle cx="62" cy="10" r="4" fill="#9aa1a8" />
        <rect x="10" y="7" width="22" height="6" rx="1" fill={CHAR_L} />
        <circle cx="40" cy="56" r="28" fill="#b9bec3" />
        <circle cx="40" cy="56" r="22" fill="#6d8ea8" />
        <path d="M22 60c10-6 26-6 36 0v6c-6 8-30 8-36 0z" fill="#a9c6da" opacity={0.7} />
        <path d="M28 44l10-8" stroke="#fff" strokeOpacity={0.6} strokeWidth={3} strokeLinecap="round" />
      </g>
    ),
  },
};
