import type { ArtDef } from "./types";
import { Candle, Flame, Glow, VGrad } from "./helpers";

const IRON = "#2d2926";
const WOOD = "#6b4428";
const WOOD_D = "#4a2e1a";
const WOOD_L = "#8a5a36";
const GOLD = "#d6a84a";
const GOLD_D = "#a87b2c";
const STONE = "#7d746a";
const STONE_D = "#5e564e";
const STONE_L = "#978d82";

export const castleArt: Record<string, ArtDef> = {
  "door-arch": {
    w: 100,
    h: 140,
    render: () => (
      <g>
        <path d="M2 140V50A48 48 0 0 1 98 50V140Z" fill={STONE_D} />
        <path d="M2 140V50A48 48 0 0 1 50 2V14A36 36 0 0 0 14 50V140Z" fill={STONE_L} opacity={0.35} />
        <path d="M14 140V52A36 36 0 0 1 86 52V140Z" fill={WOOD} />
        <g stroke={WOOD_D} strokeWidth={1.6}>
          <line x1="26" y1="28" x2="26" y2="140" />
          <line x1="38" y1="18" x2="38" y2="140" />
          <line x1="62" y1="18" x2="62" y2="140" />
          <line x1="74" y1="28" x2="74" y2="140" />
        </g>
        <line x1="50" y1="16" x2="50" y2="140" stroke="#2e1c10" strokeWidth={2.4} />
        <rect x="14" y="58" width="72" height="5" fill={IRON} />
        <rect x="14" y="108" width="72" height="5" fill={IRON} />
        <g fill="none" stroke="#b8a27a" strokeWidth={2}>
          <circle cx="43" cy="86" r="4.5" />
          <circle cx="57" cy="86" r="4.5" />
        </g>
        <path d="M44 2h12l-2 14h-8z" fill={STONE_L} />
        <path d="M14 52A36 36 0 0 1 86 52" fill="none" stroke="#000" strokeOpacity={0.25} strokeWidth={3} />
      </g>
    ),
  },

  torch: {
    w: 30,
    h: 90,
    grounded: false,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={15} cy={22} rx={15} ry={22} color="#ffb54a" opacity={0.55} />
        <rect x="8" y="62" width="14" height="26" rx="2" fill="#26221f" />
        <rect x="13" y="50" width="4" height="20" fill={IRON} />
        <rect x="12" y="30" width="6" height="30" rx="2" fill={WOOD} />
        <path d="M7 28h16l-3 8h-10z" fill="#3b3531" />
        <Flame x={15} y={28} s={1.4} />
      </g>
    ),
  },

  armor: {
    w: 64,
    h: 150,
    render: () => (
      <g>
        <rect x="4" y="12" width="3" height="128" fill={WOOD_D} />
        <path d="M5.5 2l6 10h-12z" fill="#b9c0c7" />
        <path d="M5.5 14c6 0 8 4 8 9h-8z" fill="#9aa2aa" />
        <rect x="10" y="138" width="46" height="12" rx="2" fill="#403a35" />
        <rect x="19" y="92" width="11" height="46" rx="4" fill="#8e969f" />
        <rect x="34" y="92" width="11" height="46" rx="4" fill="#7c848d" />
        <ellipse cx="24.5" cy="112" rx="6" ry="4" fill="#a9b0b8" />
        <ellipse cx="39.5" cy="112" rx="6" ry="4" fill="#98a0a8" />
        <path d="M16 50h32l-3 44H19z" fill="#a8afb7" />
        <path d="M32 50h16l-3 44H32z" fill="#000" opacity={0.12} />
        <path d="M18 76h28" stroke="#6c737b" strokeWidth={2} />
        <ellipse cx="15" cy="53" rx="8" ry="6" fill="#b5bcc3" />
        <ellipse cx="49" cy="53" rx="8" ry="6" fill="#9da5ad" />
        <rect x="8" y="56" width="8" height="36" rx="4" fill="#9aa2aa" />
        <rect x="48" y="56" width="8" height="36" rx="4" fill="#8a929a" />
        <path d="M21 24a11 13 0 0 1 22 0v24H21z" fill="#b8bec5" />
        <rect x="23" y="31" width="18" height="3.5" rx="1" fill="#24272b" />
        <path d="M32 24v24" stroke="#8a929a" strokeWidth={1.5} />
        <path d="M32 12c8-10 20-6 22 2-9-3-15-1-19 6z" fill="#8b1e2b" />
      </g>
    ),
  },

  banner: {
    w: 40,
    h: 112,
    grounded: false,
    render: () => (
      <g>
        <rect x="0" y="2" width="40" height="4" rx="2" fill={GOLD_D} />
        <circle cx="2" cy="4" r="2.6" fill={GOLD} />
        <circle cx="38" cy="4" r="2.6" fill={GOLD} />
        <path d="M4 6h32v100l-16-12-16 12z" fill="#7b1f2a" />
        <path d="M20 6h16v100l-16-12z" fill="#000" opacity={0.14} />
        <path d="M8 6v88l12-9 12 9V6" fill="none" stroke={GOLD} strokeWidth={1.4} />
        <path d="M20 26c5 4 7 8 7 13s-3 9-7 12c-4-3-7-7-7-12s2-9 7-13z" fill={GOLD} />
        <path d="M20 34v14M15 40h10" stroke="#7b1f2a" strokeWidth={1.6} />
      </g>
    ),
  },

  lantern: {
    w: 40,
    h: 84,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={20} cy={50} rx={26} color="#ffc466" opacity={0.45} />
        <path d="M20 2a6 6 0 0 1 6 6v4h-12V8a6 6 0 0 1 6-6z" fill="none" stroke={IRON} strokeWidth={2.4} />
        <path d="M8 22l12-10 12 10z" fill={IRON} />
        <rect x="9" y="22" width="22" height="46" fill="#ffd58a" />
        <rect x="9" y="22" width="22" height="46" fill="#ffb347" opacity={0.35} />
        <g stroke={IRON} strokeWidth={2.4}>
          <line x1="9" y1="22" x2="9" y2="68" />
          <line x1="31" y1="22" x2="31" y2="68" />
          <line x1="20" y1="22" x2="20" y2="68" />
        </g>
        <Candle x={15} y={62} h={12} w={4} />
        <rect x="6" y="68" width="28" height="6" rx="1" fill={IRON} />
        <rect x="10" y="74" width="20" height="10" rx="1" fill="#3a3531" />
      </g>
    ),
  },

  "bench-stone": {
    w: 140,
    h: 52,
    render: () => (
      <g>
        <rect x="14" y="22" width="18" height="30" fill={STONE_D} />
        <rect x="108" y="22" width="18" height="30" fill={STONE_D} />
        <rect x="14" y="22" width="6" height="30" fill={STONE_L} opacity={0.4} />
        <path d="M2 14h136v10H2z" fill={STONE} />
        <path d="M6 6h128l4 8H2z" fill={STONE_L} />
      </g>
    ),
  },

  fireplace: {
    w: 160,
    h: 150,
    render: (u) => (
      <g>
        <rect x="8" y="30" width="144" height="120" fill={STONE_D} />
        <g stroke="#4c453e" strokeWidth={1.4}>
          <line x1="8" y1="60" x2="152" y2="60" />
          <line x1="8" y1="90" x2="36" y2="90" />
          <line x1="124" y1="90" x2="152" y2="90" />
          <line x1="8" y1="120" x2="36" y2="120" />
          <line x1="124" y1="120" x2="152" y2="120" />
          <line x1="40" y1="30" x2="40" y2="60" />
          <line x1="80" y1="30" x2="80" y2="60" />
          <line x1="120" y1="30" x2="120" y2="60" />
        </g>
        <rect x="0" y="22" width="160" height="12" rx="2" fill={STONE_L} />
        <rect x="0" y="30" width="160" height="4" fill="#000" opacity={0.2} />
        <path d="M36 150V88a44 30 0 0 1 88 0V150z" fill="#1a1411" />
        <Glow u={u} k="fire" cx={80} cy={128} rx={60} ry={40} color="#ff8a2a" opacity={0.75} />
        <g className="animate-flicker" style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}>
          <path d="M58 136c-4-14 4-24 10-34 0 10 6 12 8 6 2-8 0-16-2-22 12 8 20 22 18 36 4-4 6-10 6-16 8 10 8 22 2 30z" fill="#ff8f2b" />
          <path d="M68 136c-2-8 2-14 6-20 1 6 4 7 5 3 1-4 0-8-1-11 7 5 11 12 10 20 2-2 3-5 3-8 4 6 4 12 1 16z" fill="#ffd36b" />
        </g>
        <rect x="52" y="134" width="56" height="7" rx="3.5" fill={WOOD_D} transform="rotate(-6 80 137)" />
        <rect x="52" y="134" width="56" height="7" rx="3.5" fill={WOOD} transform="rotate(7 80 137)" />
        <path d="M36 150h88" stroke={IRON} strokeWidth={4} />
        <rect x="18" y="12" width="10" height="10" rx="1" fill={GOLD_D} />
        <rect x="132" y="12" width="10" height="10" rx="1" fill={GOLD_D} />
        <Candle x={23} y={12} h={10} w={4} />
        <Candle x={137} y={12} h={10} w={4} />
      </g>
    ),
  },

  throne: {
    w: 100,
    h: 150,
    render: (u) => (
      <g>
        <VGrad id={`${u}-v`} from="#8e2433" to="#5a1520" />
        <path d="M18 70V22c0-10 14-20 32-20s32 10 32 20v48z" fill={GOLD_D} />
        <path d="M24 70V26c0-8 10-16 26-16s26 8 26 16v44z" fill={`url(#${u}-v)`} />
        <path d="M50 2l5 9h-10z" fill={GOLD} />
        <circle cx="50" cy="30" r="5" fill={GOLD} />
        <path d="M34 44h32M34 56h32" stroke={GOLD} strokeOpacity={0.4} strokeWidth={1.2} />
        <rect x="6" y="80" width="12" height="70" rx="2" fill={GOLD_D} />
        <rect x="82" y="80" width="12" height="70" rx="2" fill={GOLD_D} />
        <rect x="4" y="68" width="22" height="16" rx="4" fill={GOLD} />
        <rect x="74" y="68" width="22" height="16" rx="4" fill={GOLD} />
        <path d="M18 90h64v14H18z" fill="#6d1a26" />
        <path d="M16 84h68v10H16z" fill="#a02c3d" />
        <rect x="14" y="104" width="72" height="12" fill={GOLD_D} />
        <rect x="14" y="104" width="72" height="3" fill={GOLD} />
        <path d="M22 116h56v34H22z" fill="#8a6326" />
        <path d="M22 116h56v34H22z" fill="#000" opacity={0.18} />
      </g>
    ),
  },

  chandelier: {
    w: 120,
    h: 96,
    grounded: false,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={60} cy={60} rx={60} ry={34} color="#ffc466" opacity={0.4} />
        <line x1="60" y1="0" x2="60" y2="52" stroke={IRON} strokeWidth={2.5} />
        <line x1="60" y1="30" x2="20" y2="64" stroke={IRON} strokeWidth={1.5} />
        <line x1="60" y1="30" x2="100" y2="64" stroke={IRON} strokeWidth={1.5} />
        <ellipse cx="60" cy="72" rx="52" ry="10" fill="none" stroke={IRON} strokeWidth={4} />
        <ellipse cx="60" cy="72" rx="52" ry="10" fill="none" stroke="#554c44" strokeWidth={1.2} />
        <circle cx="60" cy="54" r="5" fill={IRON} />
        <path d="M60 82l-4 10h8z" fill={IRON} />
        <Candle x={10} y={70} h={12} w={4.5} />
        <Candle x={34} y={64} h={12} w={4.5} />
        <Candle x={60} y={62} h={12} w={4.5} />
        <Candle x={86} y={64} h={12} w={4.5} />
        <Candle x={110} y={70} h={12} w={4.5} />
        <Candle x={34} y={82} h={12} w={4.5} />
        <Candle x={86} y={82} h={12} w={4.5} />
      </g>
    ),
  },

  painting: {
    w: 90,
    h: 112,
    grounded: false,
    render: (u) => (
      <g>
        <VGrad id={`${u}-sky`} from="#4c6275" to="#c8a46a" />
        <rect x="0" y="0" width="90" height="112" rx="3" fill={GOLD_D} />
        <rect x="4" y="4" width="82" height="104" rx="2" fill={GOLD} />
        <rect x="11" y="11" width="68" height="90" fill={`url(#${u}-sky)`} />
        <path d="M11 78c14-10 26-8 36-2s22 4 32-4v29H11z" fill="#3e4a33" />
        <path d="M11 88c18-6 34-4 68 4v9H11z" fill="#2c3624" />
        <path d="M30 78c0-18 7-28 15-28s15 10 15 28z" fill="#2e2a3a" />
        <circle cx="45" cy="44" r="8.5" fill="#d9b48c" />
        <path d="M36 42c1-8 17-9 18 0-3-3-15-3-18 0z" fill="#3a2718" />
        <rect x="4" y="4" width="82" height="104" rx="2" fill="none" stroke="#000" strokeOpacity={0.2} />
      </g>
    ),
  },

  shield: {
    w: 60,
    h: 72,
    grounded: false,
    render: () => (
      <g>
        <path d="M30 2c10 4 20 5 28 4v24c0 20-12 34-28 40C14 64 2 50 2 30V6c8 1 18 0 28-4z" fill={GOLD_D} />
        <path d="M30 7c9 3 17 4 23 4v19c0 17-10 29-23 34C17 59 7 47 7 30V11c6 0 14-1 23-4z" fill="#1f3a5f" />
        <path d="M30 7v57C17 59 7 47 7 30V11c6 0 14-1 23-4z" fill="#8f2230" />
        <path d="M30 20l5 8 9 1-6 7 2 9-10-5-10 5 2-9-6-7 9-1z" fill={GOLD} />
      </g>
    ),
  },

  "table-banquet": {
    w: 200,
    h: 84,
    render: () => (
      <g>
        <path d="M14 38h172l-8 16H22z" fill={WOOD_D} />
        <rect x="26" y="50" width="10" height="34" fill={WOOD_D} />
        <rect x="164" y="50" width="10" height="34" fill={WOOD_D} />
        <rect x="95" y="50" width="10" height="34" fill="#3b2415" />
        <path d="M24 28h152l10 12H14z" fill={WOOD_L} />
        <path d="M60 28h80l6 12H54z" fill="#e8dcc2" opacity={0.85} />
        <ellipse cx="54" cy="31" rx="10" ry="3" fill="#cfc6b8" />
        <ellipse cx="146" cy="31" rx="10" ry="3" fill="#cfc6b8" />
        <path d="M86 18h28l-4 14H90z" fill="#8c5a2a" />
        <circle cx="92" cy="17" r="5" fill="#b23a3a" />
        <circle cx="101" cy="14" r="5" fill="#d0a33c" />
        <circle cx="109" cy="17" r="5" fill="#7a9a3a" />
        <path d="M66 18h6l-1 8h-4z" fill={GOLD} />
        <rect x="68" y="26" width="2" height="4" fill={GOLD} />
        <path d="M128 18h6l-1 8h-4z" fill={GOLD} />
        <rect x="130" y="26" width="2" height="4" fill={GOLD} />
        <Candle x={40} y={30} h={12} w={4} />
        <Candle x={160} y={30} h={12} w={4} />
      </g>
    ),
  },

  "window-stained": {
    w: 60,
    h: 124,
    grounded: false,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={30} cy={70} rx={40} ry={60} color="#a8c7ff" opacity={0.25} />
        <path d="M2 124V32a28 28 0 0 1 56 0v92z" fill={STONE_D} />
        <path d="M8 118V34a22 22 0 0 1 44 0v84z" fill="#1c2233" />
        <path d="M8 34a22 22 0 0 1 22-22v38H8z" fill="#3a6fb0" />
        <path d="M30 12a22 22 0 0 1 22 22v16H30z" fill="#b23b48" />
        <rect x="8" y="50" width="22" height="34" fill="#d6a84a" />
        <rect x="30" y="50" width="22" height="34" fill="#3c8a6a" />
        <rect x="8" y="84" width="22" height="34" fill="#7b4aa0" />
        <rect x="30" y="84" width="22" height="34" fill="#3a6fb0" />
        <circle cx="30" cy="50" r="9" fill="#e7c76a" />
        <g stroke="#1a1612" strokeWidth={2} fill="none">
          <path d="M8 118V34a22 22 0 0 1 44 0v84z" />
          <line x1="30" y1="12" x2="30" y2="118" />
          <line x1="8" y1="50" x2="52" y2="50" />
          <line x1="8" y1="84" x2="52" y2="84" />
          <circle cx="30" cy="50" r="9" />
        </g>
        <path d="M8 34a22 22 0 0 1 22-22v106H8z" fill="#fff" opacity={0.08} />
      </g>
    ),
  },

  bookshelf: {
    w: 120,
    h: 156,
    render: () => {
      const rows = [14, 50, 86, 122];
      const colors = ["#7b2d2d", "#2d4a6b", "#5a6b2d", "#8a6a2d", "#4a2d5a", "#2d5a52", "#a0522d", "#34495e"];
      return (
        <g>
          <rect x="0" y="0" width="120" height="156" rx="2" fill={WOOD_D} />
          <rect x="6" y="8" width="108" height="142" fill="#2a1a10" />
          {rows.map((ry, r) => (
            <g key={ry}>
              {Array.from({ length: 11 }).map((_, i) => {
                const bw = 6 + ((i * 7 + r * 3) % 5);
                const bh = 22 + ((i * 5 + r * 7) % 9);
                const x = 8 + i * 9.6;
                const lean = (i + r) % 7 === 3;
                return (
                  <rect
                    key={i}
                    x={x}
                    y={ry + 32 - bh}
                    width={Math.min(bw, 8.6)}
                    height={bh}
                    rx={1}
                    fill={colors[(i + r * 3) % colors.length]}
                    transform={lean ? `rotate(-8 ${x} ${ry + 32})` : undefined}
                  />
                );
              })}
              <rect x="6" y={ry + 32} width="108" height="4" fill={WOOD_L} />
            </g>
          ))}
          <rect x="0" y="0" width="120" height="8" fill={WOOD_L} />
          <rect x="0" y="0" width="6" height="156" fill={WOOD} />
          <rect x="114" y="0" width="6" height="156" fill="#3b2415" />
        </g>
      );
    },
  },

  globe: {
    w: 64,
    h: 104,
    render: () => (
      <g>
        <path d="M22 104l10-24 10 24z" fill={WOOD_D} />
        <rect x="30" y="66" width="4" height="18" fill={WOOD} />
        <circle cx="32" cy="36" r="26" fill="#2f6b8a" />
        <path d="M14 26c6-2 10 2 14 0s4-8 10-8c4 0 6 4 4 8s-8 4-8 10 6 6 4 12-8 4-10 0-2-8-8-10-8-6-6-12z" fill="#9aa566" />
        <path d="M44 44c4 0 8 2 8 6s-4 6-6 4-4-6-2-10z" fill="#9aa566" />
        <circle cx="32" cy="36" r="26" fill="none" stroke="#fff" strokeOpacity={0.08} strokeWidth={6} />
        <path d="M32 10a26 26 0 0 1 0 52" fill="#000" opacity={0.18} />
        <path d="M6 36a26 26 0 0 0 52 0" fill="none" stroke={GOLD} strokeWidth={3} transform="rotate(-20 32 36)" />
        <circle cx="32" cy="36" r="30" fill="none" stroke={GOLD_D} strokeWidth={2.5} strokeDasharray="80 200" transform="rotate(200 32 36)" />
      </g>
    ),
  },

  "clock-grand": {
    w: 52,
    h: 156,
    render: () => (
      <g>
        <path d="M6 20c0-12 8-18 20-18s20 6 20 18v6H6z" fill={WOOD_D} />
        <rect x="8" y="24" width="36" height="40" fill={WOOD} />
        <circle cx="26" cy="44" r="14" fill="#efe4c8" />
        <circle cx="26" cy="44" r="14" fill="none" stroke={GOLD} strokeWidth={2} />
        <g stroke="#2a211a" strokeWidth={1.8} strokeLinecap="round">
          <line x1="26" y1="44" x2="26" y2="35" />
          <line x1="26" y1="44" x2="32" y2="47" />
        </g>
        <rect x="12" y="64" width="28" height="74" fill={WOOD_D} />
        <rect x="16" y="70" width="20" height="60" fill="#241810" />
        <line x1="26" y1="70" x2="26" y2="112" stroke={GOLD_D} strokeWidth={1.4} />
        <circle cx="26" cy="114" r="6" fill={GOLD} />
        <rect x="6" y="138" width="40" height="18" fill={WOOD} />
        <rect x="6" y="138" width="40" height="3" fill={WOOD_L} />
      </g>
    ),
  },

  statue: {
    w: 62,
    h: 156,
    render: () => (
      <g>
        <rect x="6" y="120" width="50" height="36" fill="#cfc8bd" />
        <rect x="2" y="116" width="58" height="8" fill="#e2dcd2" />
        <rect x="2" y="150" width="58" height="6" fill="#bdb5a9" />
        <path d="M20 116l4-44h14l4 44z" fill="#e8e3da" />
        <path d="M31 72h7l4 44H31z" fill="#000" opacity={0.08} />
        <path d="M18 76c0-14 6-24 13-24s13 10 13 24l-4 8H22z" fill="#eeeae2" />
        <path d="M44 60c6 4 8 10 6 18" fill="none" stroke="#e6e0d6" strokeWidth={6} strokeLinecap="round" />
        <path d="M18 62c-4 8-4 16-2 26" fill="none" stroke="#dcd5ca" strokeWidth={6} strokeLinecap="round" />
        <rect x="28" y="40" width="6" height="12" fill="#e6e0d6" />
        <ellipse cx="31" cy="32" rx="9" ry="11" fill="#f1ede6" />
        <path d="M22 30c0-8 18-8 18 0-3-4-15-4-18 0z" fill="#d8d1c6" />
        <path d="M20 90c6 4 16 4 22 0" stroke="#d2cbbf" strokeWidth={1.5} fill="none" />
      </g>
    ),
  },

  "desk-reading": {
    w: 120,
    h: 86,
    render: () => (
      <g>
        <rect x="10" y="44" width="10" height="42" fill={WOOD_D} />
        <rect x="100" y="44" width="10" height="42" fill={WOOD_D} />
        <rect x="70" y="44" width="32" height="30" fill={WOOD} />
        <rect x="74" y="50" width="24" height="8" fill={WOOD_D} />
        <circle cx="86" cy="54" r="1.6" fill={GOLD} />
        <rect x="4" y="36" width="112" height="9" rx="1.5" fill={WOOD_L} />
        <rect x="14" y="28" width="30" height="5" fill="#6b2d2d" />
        <rect x="16" y="23" width="26" height="5" fill="#2d4a6b" />
        <rect x="18" y="33" width="22" height="3" fill="#e9dfc5" />
        <path d="M52 34c6-4 14-4 20 0v2H52z" fill="#efe4c8" />
        <path d="M62 30v6" stroke="#b8a986" strokeWidth={0.8} />
        <rect x="92" y="30" width="12" height="6" rx="1" fill={GOLD_D} />
        <Candle x={98} y={30} h={14} w={5} />
      </g>
    ),
  },

  lectern: {
    w: 62,
    h: 104,
    render: () => (
      <g>
        <path d="M14 104l6-10h22l6 10z" fill={WOOD_D} />
        <rect x="26" y="40" width="10" height="56" fill={WOOD} />
        <path d="M4 42l54-12v10L8 52z" fill={WOOD_L} />
        <path d="M8 38c8-6 16-8 23-6v8c-7-2-15 0-23 6z" fill="#efe4c8" />
        <path d="M31 32c7-4 15-6 23-6v8c-8 0-16 2-23 6z" fill="#e5d8b8" />
        <g stroke="#9c8c6a" strokeWidth={0.6}>
          <line x1="12" y1="39" x2="27" y2="34.5" />
          <line x1="12" y1="42" x2="27" y2="37.5" />
          <line x1="35" y1="33" x2="50" y2="29" />
          <line x1="35" y1="36" x2="50" y2="32" />
        </g>
        <path d="M30 40c1 6 0 14-2 20" stroke="#7b1f2a" strokeWidth={2} fill="none" />
      </g>
    ),
  },

  candelabra: {
    w: 52,
    h: 104,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={26} cy={22} rx={30} ry={22} color="#ffc466" opacity={0.4} />
        <path d="M14 104c2-6 8-8 12-8s10 2 12 8z" fill={GOLD_D} />
        <rect x="24" y="44" width="4" height="54" fill={GOLD_D} />
        <path d="M8 40c0 10 8 12 18 12s18-2 18-12" fill="none" stroke={GOLD_D} strokeWidth={3} />
        <rect x="4" y="36" width="8" height="5" rx="1" fill={GOLD} />
        <rect x="40" y="36" width="8" height="5" rx="1" fill={GOLD} />
        <rect x="22" y="30" width="8" height="5" rx="1" fill={GOLD} />
        <Candle x={8} y={36} h={14} w={4.5} />
        <Candle x={44} y={36} h={14} w={4.5} />
        <Candle x={26} y={30} h={16} w={4.5} />
      </g>
    ),
  },

  "sword-rack": {
    w: 110,
    h: 112,
    render: () => (
      <g>
        <rect x="6" y="20" width="98" height="8" rx="2" fill={WOOD} />
        <rect x="6" y="84" width="98" height="8" rx="2" fill={WOOD} />
        <rect x="8" y="10" width="8" height="102" fill={WOOD_D} />
        <rect x="94" y="10" width="8" height="102" fill={WOOD_D} />
        {[28, 46, 64, 82].map((x, i) => (
          <g key={x}>
            <path d={`M${x} ${6 + (i % 2) * 4}l3 6v76h-6v-76z`} fill="#c7ced6" />
            <path d={`M${x} ${6 + (i % 2) * 4}l3 6v76h-3z`} fill="#fff" opacity={0.25} />
            <rect x={x - 7} y={88} width={14} height={4} rx={1} fill={GOLD_D} />
            <rect x={x - 1.8} y={92} width={3.6} height={12} fill="#4a2e1a" />
            <circle cx={x} cy={106} r={3} fill={GOLD} />
          </g>
        ))}
      </g>
    ),
  },

  helmet: {
    w: 60,
    h: 90,
    render: () => (
      <g>
        <path d="M18 90l4-20h16l4 20z" fill={WOOD_D} />
        <rect x="27" y="56" width="6" height="16" fill={WOOD} />
        <path d="M8 58V32C8 16 18 6 30 6s22 10 22 26v26z" fill="#a9b0b8" />
        <path d="M30 6c12 0 22 10 22 26v26H30z" fill="#000" opacity={0.14} />
        <rect x="12" y="28" width="36" height="4" rx="1" fill="#22262a" />
        <g fill="#22262a">
          {[16, 22, 28, 34, 40].map((x) => (
            <rect key={x} x={x} y="38" width="2.4" height="8" rx="1" />
          ))}
        </g>
        <path d="M30 6v52" stroke="#8a929a" strokeWidth={2} />
        <path d="M30 6c2-6 12-8 16-2" stroke={GOLD} strokeWidth={3} fill="none" strokeLinecap="round" />
      </g>
    ),
  },

  anvil: {
    w: 96,
    h: 76,
    render: () => (
      <g>
        <path d="M22 76l6-26h40l6 26z" fill={WOOD_D} />
        <path d="M22 76l6-26h12l-4 26z" fill={WOOD} />
        <path d="M34 50l4-12h20l4 12z" fill="#3a3f45" />
        <path d="M2 18c14 0 22 2 30 6h60v14H24C12 38 6 28 2 18z" fill="#4c535b" />
        <path d="M32 20h60v6H32z" fill="#6b737c" />
        <rect x="70" y="4" width="4" height="18" rx="1" fill={WOOD} transform="rotate(20 72 13)" />
        <rect x="62" y="2" width="16" height="7" rx="1" fill="#3a3f45" transform="rotate(20 70 5)" />
      </g>
    ),
  },

  bow: {
    w: 64,
    h: 124,
    render: () => (
      <g>
        <path d="M34 124l4-60h18l4 60z" fill="#6b4428" />
        <path d="M34 124l4-60h6l-2 60z" fill="#8a5a36" />
        <rect x="36" y="68" width="22" height="4" fill="#3b2415" />
        {[40, 46, 52].map((x, i) => (
          <g key={x}>
            <line x1={x} y1={64} x2={x - 1 + i} y2={20 + i * 4} stroke="#caa66a" strokeWidth={1.6} />
            <path d={`M${x - 1 + i} ${20 + i * 4}l-3-8 6 0z`} fill={i === 1 ? "#8b1e2b" : "#e6e0d6"} />
          </g>
        ))}
        <path d="M20 4c-18 30-18 86 0 116" fill="none" stroke={WOOD} strokeWidth={5} strokeLinecap="round" />
        <path d="M20 4c-18 30-18 86 0 116" fill="none" stroke={WOOD_L} strokeWidth={1.6} strokeLinecap="round" />
        <line x1="20" y1="4" x2="20" y2="120" stroke="#e8dcc2" strokeWidth={1} />
        <rect x="3" y="56" width="6" height="12" rx="2" fill="#3b2415" />
      </g>
    ),
  },

  barrel: {
    w: 62,
    h: 78,
    render: () => (
      <g>
        <path d="M8 6c-4 22-4 44 0 66 14 8 32 8 46 0 4-22 4-44 0-66-14-6-32-6-46 0z" fill={WOOD} />
        <path d="M31 2c8 0 16 1 23 4 4 22 4 44 0 66-7 4-15 6-23 6z" fill="#000" opacity={0.15} />
        <g stroke={WOOD_D} strokeWidth={1.2}>
          <path d="M20 3c-2 24-2 48 0 74" fill="none" />
          <path d="M31 2v76" />
          <path d="M42 3c2 24 2 48 0 74" fill="none" />
        </g>
        <path d="M6 18c16 5 34 5 50 0" fill="none" stroke={IRON} strokeWidth={4} />
        <path d="M5 60c17 5 35 5 52 0" fill="none" stroke={IRON} strokeWidth={4} />
        <ellipse cx="31" cy="6" rx="23" ry="4.5" fill={WOOD_L} />
        <ellipse cx="31" cy="6" rx="23" ry="4.5" fill="none" stroke={IRON} strokeWidth={2} />
      </g>
    ),
  },

  axe: {
    w: 70,
    h: 110,
    render: () => (
      <g>
        <path d="M6 78h58v28c0 3-13 4-29 4S6 109 6 106z" fill={WOOD} />
        <ellipse cx="35" cy="78" rx="29" ry="7" fill="#b98a58" />
        <ellipse cx="35" cy="78" rx="20" ry="4.5" fill="none" stroke="#9c7147" strokeWidth={1} />
        <ellipse cx="35" cy="78" rx="10" ry="2.2" fill="none" stroke="#9c7147" strokeWidth={1} />
        <rect x="30" y="8" width="6" height="72" rx="2" fill="#7a5130" transform="rotate(12 33 78)" />
        <g transform="rotate(12 33 78)">
          <path d="M36 12c14-4 24 2 28 14-8-2-18 0-28 8z" fill="#9aa2aa" />
          <path d="M36 12c14-4 24 2 28 14l-4-1c-4-8-12-12-24-10z" fill="#d4dade" />
          <path d="M30 14c-8-2-14 2-16 8 6 0 12 2 16 6z" fill="#7c848d" />
        </g>
      </g>
    ),
  },

  telescope: {
    w: 104,
    h: 132,
    render: () => (
      <g>
        <g stroke={WOOD_D} strokeWidth={4} strokeLinecap="round">
          <line x1="52" y1="70" x2="22" y2="130" />
          <line x1="52" y1="70" x2="82" y2="130" />
          <line x1="52" y1="70" x2="54" y2="130" />
        </g>
        <circle cx="52" cy="68" r="5" fill={GOLD_D} />
        <g transform="rotate(-30 52 64)">
          <rect x="6" y="56" width="92" height="16" rx="3" fill={GOLD_D} />
          <rect x="6" y="56" width="92" height="6" rx="3" fill={GOLD} />
          <rect x="84" y="52" width="16" height="24" rx="3" fill={GOLD_D} />
          <rect x="30" y="54" width="5" height="20" fill="#7a5a20" />
          <rect x="60" y="54" width="5" height="20" fill="#7a5a20" />
          <rect x="0" y="59" width="8" height="10" rx="2" fill="#3a3531" />
        </g>
      </g>
    ),
  },

  orb: {
    w: 62,
    h: 84,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={31} cy={32} rx={34} color="#a77bff" opacity={0.55} />
        <path d="M12 84l6-18h26l6 18z" fill={GOLD_D} />
        <path d="M16 66c2-6 8-8 15-8s13 2 15 8z" fill={GOLD} />
        <defs>
          <radialGradient id={`${u}-orb`} cx="0.38" cy="0.35">
            <stop offset="0%" stopColor="#f0e6ff" />
            <stop offset="40%" stopColor="#9d7bff" />
            <stop offset="100%" stopColor="#3b2270" />
          </radialGradient>
        </defs>
        <circle cx="31" cy="34" r="24" fill={`url(#${u}-orb)`} />
        <path d="M18 38c6 6 18 8 26-2" stroke="#e8dcff" strokeOpacity={0.5} strokeWidth={1.5} fill="none" />
        <ellipse cx="23" cy="24" rx="6" ry="4" fill="#fff" opacity={0.5} />
      </g>
    ),
  },

  chest: {
    w: 92,
    h: 70,
    render: () => (
      <g>
        <rect x="4" y="30" width="84" height="40" rx="2" fill={WOOD} />
        <path d="M4 30c0-18 12-26 42-26s42 8 42 26z" fill={WOOD_L} />
        <path d="M46 4c30 0 42 8 42 26v40H46z" fill="#000" opacity={0.14} />
        <g fill={GOLD_D}>
          <rect x="14" y="10" width="7" height="60" />
          <rect x="71" y="10" width="7" height="60" />
          <rect x="4" y="28" width="84" height="5" />
        </g>
        <rect x="40" y="30" width="12" height="14" rx="2" fill={GOLD} />
        <circle cx="46" cy="36" r="2" fill="#2b1f10" />
        <rect x="45" y="36" width="2" height="5" fill="#2b1f10" />
      </g>
    ),
  },

  potions: {
    w: 100,
    h: 110,
    render: (u) => {
      const bottles = [
        { x: 12, c: "#6bd4a8", h: 20, r: 7 },
        { x: 30, c: "#e35d6a", h: 26, r: 6 },
        { x: 48, c: "#a77bff", h: 18, r: 8 },
        { x: 68, c: "#f0c14b", h: 24, r: 6 },
        { x: 86, c: "#57a6e8", h: 20, r: 6 },
      ];
      return (
        <g>
          <Glow u={u} k="g" cx={50} cy={40} rx={50} ry={30} color="#a77bff" opacity={0.25} />
          <rect x="0" y="44" width="100" height="6" fill={WOOD_L} />
          <rect x="0" y="92" width="100" height="6" fill={WOOD_L} />
          <rect x="2" y="6" width="5" height="104" fill={WOOD_D} />
          <rect x="93" y="6" width="5" height="104" fill={WOOD_D} />
          {bottles.map((b, i) => (
            <g key={i}>
              <rect x={b.x - 2} y={44 - b.h - 8} width={4} height={8} fill="#d8cfbf" />
              <rect x={b.x - 2.5} y={44 - b.h - 11} width={5} height={4} rx={1} fill={WOOD} />
              <path d={`M${b.x - b.r} ${44}v-${b.h - b.r}a${b.r} ${b.r} 0 0 1 ${b.r * 2} 0v${b.h - b.r}z`} fill={b.c} opacity={0.9} />
              <rect x={b.x - b.r + 2} y={44 - b.h + 2} width={2} height={b.h - 6} fill="#fff" opacity={0.4} />
            </g>
          ))}
          {bottles.slice(0, 4).map((b, i) => (
            <g key={`b${i}`}>
              <circle cx={14 + i * 22} cy={82} r={9} fill={bottles[(i + 2) % 5].c} opacity={0.9} />
              <rect x={12 + i * 22} y={66} width={4} height={8} fill="#d8cfbf" />
              <circle cx={11 + i * 22} cy={79} r={2.5} fill="#fff" opacity={0.45} />
            </g>
          ))}
        </g>
      );
    },
  },

  "bed-canopy": {
    w: 160,
    h: 150,
    render: () => (
      <g>
        <rect x="6" y="10" width="7" height="140" fill={WOOD_D} />
        <rect x="147" y="10" width="7" height="140" fill={WOOD_D} />
        <rect x="0" y="4" width="160" height="12" rx="2" fill={WOOD} />
        <path d="M6 16h148v10c-24 8-50-6-74 2-24-8-50 6-74-2z" fill="#6d1a26" />
        <path d="M13 26c6 30 4 60 0 90l14-2c-6-30-6-60-4-86z" fill="#8f2433" />
        <path d="M147 26c-6 30-4 60 0 90l-14-2c6-30 6-60 4-86z" fill="#7a1d2b" />
        <rect x="20" y="70" width="120" height="20" rx="3" fill="#efe4c8" />
        <ellipse cx="46" cy="72" rx="18" ry="8" fill="#fff8e8" />
        <ellipse cx="114" cy="72" rx="18" ry="8" fill="#f5ecd7" />
        <path d="M16 86h128v36H16z" fill="#8f2433" />
        <path d="M16 86h128v6H16z" fill={GOLD} opacity={0.8} />
        <path d="M80 86h64v36H80z" fill="#000" opacity={0.12} />
        <rect x="12" y="120" width="136" height="16" fill={WOOD} />
      </g>
    ),
  },

  hourglass: {
    w: 42,
    h: 72,
    render: () => (
      <g>
        <rect x="2" y="2" width="38" height="6" rx="2" fill={WOOD} />
        <rect x="2" y="64" width="38" height="8" rx="2" fill={WOOD} />
        <rect x="5" y="8" width="3" height="56" fill={WOOD_D} />
        <rect x="34" y="8" width="3" height="56" fill={WOOD_D} />
        <path d="M10 8h22c0 12-8 18-10 28 2 10 10 16 10 28H10c0-12 8-18 10-28-2-10-10-16-10-28z" fill="#d7e6ef" opacity={0.55} />
        <path d="M14 18h14c-2 6-6 10-7 14-1-4-5-8-7-14z" fill="#d9ad5e" />
        <path d="M11 64c1-8 6-12 10-14 4 2 9 6 10 14z" fill="#d9ad5e" />
        <line x1="21" y1="36" x2="21" y2="50" stroke="#d9ad5e" strokeWidth={1} />
      </g>
    ),
  },

  well: {
    w: 112,
    h: 124,
    render: () => (
      <g>
        <rect x="14" y="12" width="6" height="74" fill={WOOD_D} />
        <rect x="92" y="12" width="6" height="74" fill={WOOD_D} />
        <path d="M2 22L56 0l54 22z" fill="#5b3a26" />
        <path d="M56 0l54 22H56z" fill="#000" opacity={0.18} />
        <rect x="20" y="34" width="72" height="4" fill={WOOD} />
        <line x1="56" y1="38" x2="56" y2="62" stroke="#c9b48a" strokeWidth={1.4} />
        <path d="M49 62h14l-2 12h-10z" fill={WOOD} />
        <path d="M6 80c0-6 22-10 50-10s50 4 50 10v40c0 3-22 4-50 4s-50-1-50-4z" fill={STONE} />
        <ellipse cx="56" cy="80" rx="50" ry="9" fill={STONE_L} />
        <ellipse cx="56" cy="81" rx="40" ry="6" fill="#1d1a17" />
        <g stroke={STONE_D} strokeWidth={1.2}>
          <line x1="6" y1="98" x2="106" y2="98" />
          <line x1="30" y1="86" x2="30" y2="98" />
          <line x1="66" y1="88" x2="66" y2="98" />
          <line x1="48" y1="98" x2="48" y2="122" />
          <line x1="86" y1="98" x2="86" y2="121" />
          <line x1="18" y1="98" x2="18" y2="120" />
        </g>
      </g>
    ),
  },

  tree: {
    w: 150,
    h: 210,
    render: () => (
      <g>
        <path d="M66 210c4-30 4-60 0-100h18c-4 40-4 70 0 100z" fill="#5a3d28" />
        <path d="M74 140c-12-10-22-14-34-14M76 124c10-8 20-12 32-12" stroke="#5a3d28" strokeWidth={6} strokeLinecap="round" fill="none" />
        <circle cx="46" cy="92" r="38" fill="#3f6b3a" />
        <circle cx="104" cy="92" r="38" fill="#355e32" />
        <circle cx="75" cy="56" r="48" fill="#4b7a41" />
        <circle cx="40" cy="60" r="26" fill="#4b7a41" />
        <circle cx="112" cy="58" r="28" fill="#44713c" />
        <circle cx="60" cy="40" r="22" fill="#5b8c4c" opacity={0.8} />
        <circle cx="75" cy="110" r="34" fill="#2f5230" opacity={0.6} />
      </g>
    ),
  },

  cart: {
    w: 150,
    h: 96,
    render: () => (
      <g>
        <line x1="96" y1="58" x2="150" y2="76" stroke={WOOD} strokeWidth={4} strokeLinecap="round" />
        <path d="M6 30h100v30H6z" fill={WOOD} />
        <g stroke={WOOD_D} strokeWidth={1.4}>
          <line x1="6" y1="40" x2="106" y2="40" />
          <line x1="6" y1="50" x2="106" y2="50" />
        </g>
        <path d="M14 30c4-14 20-18 30-10 6-8 22-8 26 2 10-6 24-2 26 8z" fill="#d6b35a" />
        <path d="M22 24c10-2 18 0 24 6M60 20c8 0 16 4 20 10" stroke="#b8943e" strokeWidth={1.4} fill="none" />
        <circle cx="40" cy="70" r="24" fill="none" stroke={WOOD_D} strokeWidth={5} />
        <circle cx="40" cy="70" r="4" fill={IRON} />
        <g stroke={WOOD_D} strokeWidth={2.4}>
          <line x1="40" y1="48" x2="40" y2="92" />
          <line x1="18" y1="70" x2="62" y2="70" />
          <line x1="24" y1="54" x2="56" y2="86" />
          <line x1="56" y1="54" x2="24" y2="86" />
        </g>
      </g>
    ),
  },

  haystack: {
    w: 110,
    h: 72,
    render: () => (
      <g>
        <path d="M4 72c0-40 22-66 51-66s51 26 51 66z" fill="#d8b456" />
        <path d="M55 6c29 0 51 26 51 66H55z" fill="#000" opacity={0.1} />
        <g stroke="#b8923a" strokeWidth={1.4} fill="none">
          <path d="M20 60c8-10 14-26 18-40" />
          <path d="M40 66c6-14 10-32 12-50" />
          <path d="M62 66c-2-16 0-32 4-48" />
          <path d="M82 64c-4-12-6-24-4-36" />
          <path d="M14 44c14 4 30 4 44 0" />
          <path d="M60 40c12 4 26 4 38-2" />
        </g>
        <path d="M86 70l10-18" stroke={WOOD} strokeWidth={3} />
        <path d="M94 54l4-12m-8 10l2-12m6 13l6-10" stroke="#8a929a" strokeWidth={1.6} />
      </g>
    ),
  },

  dummy: {
    w: 64,
    h: 132,
    render: () => (
      <g>
        <rect x="29" y="40" width="6" height="92" fill={WOOD_D} />
        <path d="M18 128h28" stroke={WOOD_D} strokeWidth={6} strokeLinecap="round" />
        <rect x="4" y="44" width="56" height="7" rx="3" fill={WOOD} />
        <path d="M14 48h36l-3 44H17z" fill="#c9ab76" />
        <path d="M14 58h36M16 72h32M17 84h30" stroke="#a88d5c" strokeWidth={1.6} />
        <circle cx="32" cy="26" r="15" fill="#c9ab76" />
        <path d="M24 22l6 6m0-6l-6 6M34 22l6 6m0-6l-6 6" stroke="#6b4a2b" strokeWidth={1.6} />
        <circle cx="32" cy="70" r="7" fill="none" stroke="#8b1e2b" strokeWidth={2.4} />
        <circle cx="32" cy="70" r="2" fill="#8b1e2b" />
      </g>
    ),
  },

  altar: {
    w: 140,
    h: 84,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={70} cy={20} rx={50} ry={24} color="#ffd98a" opacity={0.35} />
        <rect x="10" y="32" width="120" height="52" fill="#d9d1c4" />
        <path d="M70 32h60v52H70z" fill="#000" opacity={0.08} />
        <rect x="4" y="26" width="132" height="8" fill="#ebe4d8" />
        <path d="M44 34h52v40l-26 8-26-8z" fill="#6d1a26" />
        <path d="M44 34h52v4H44z" fill={GOLD} />
        <path d="M70 46v22M62 54h16" stroke={GOLD} strokeWidth={3} />
        <rect x="60" y="14" width="20" height="12" rx="1" fill="#efe4c8" />
        <path d="M60 14l10 4 10-4" stroke="#b8a986" strokeWidth={0.8} fill="none" />
        <Candle x={24} y={26} h={16} w={5} />
        <Candle x={116} y={26} h={16} w={5} />
      </g>
    ),
  },

  bell: {
    w: 84,
    h: 116,
    render: () => (
      <g>
        <rect x="6" y="8" width="8" height="108" fill={WOOD_D} />
        <rect x="70" y="8" width="8" height="108" fill={WOOD_D} />
        <rect x="0" y="4" width="84" height="10" rx="2" fill={WOOD} />
        <path d="M14 104l-8 12M70 104l8 12" stroke={WOOD_D} strokeWidth={6} />
        <rect x="38" y="14" width="8" height="8" fill={IRON} />
        <path d="M22 70c2-30 8-48 20-48s18 18 20 48c4 2 8 4 8 8H14c0-4 4-6 8-8z" fill="#b58a3c" />
        <path d="M42 22c12 0 18 18 20 48c4 2 8 4 8 8H42z" fill="#000" opacity={0.15} />
        <path d="M24 60c10 3 26 3 36 0" stroke={GOLD} strokeWidth={2} fill="none" />
        <circle cx="42" cy="82" r="5" fill="#7a5a20" />
        <path d="M42 86v14" stroke="#c9b48a" strokeWidth={1.6} />
      </g>
    ),
  },

  organ: {
    w: 150,
    h: 152,
    render: () => {
      const pipes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      return (
        <g>
          <rect x="6" y="86" width="138" height="66" fill={WOOD_D} />
          <rect x="0" y="80" width="150" height="10" fill={WOOD} />
          {pipes.map((i) => {
            const dist = Math.abs(i - 5);
            const h = 76 - dist * 9;
            const x = 12 + i * 11.6;
            return (
              <g key={i}>
                <rect x={x} y={80 - h} width={8} height={h} rx={3} fill="#c9ab6a" />
                <rect x={x} y={80 - h} width={3} height={h} rx={1.5} fill="#f0dca6" opacity={0.6} />
                <path d={`M${x + 1} ${70}h6l-3 4z`} fill="#3a2a14" />
              </g>
            );
          })}
          <rect x="24" y="104" width="102" height="8" fill="#efe4c8" />
          <g fill="#1c1410">
            {Array.from({ length: 14 }).map((_, i) => (
              <rect key={i} x={27 + i * 7} y={104} width={3.5} height={5} />
            ))}
          </g>
          <rect x="24" y="112" width="102" height="4" fill="#3b2415" />
        </g>
      );
    },
  },

  crown: {
    w: 72,
    h: 86,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={36} cy={30} rx={34} ry={26} color="#ffd98a" opacity={0.45} />
        <rect x="14" y="62" width="44" height="24" fill="#d9d1c4" />
        <rect x="10" y="58" width="52" height="6" fill="#ebe4d8" />
        <path d="M8 58c0-10 12-14 28-14s28 4 28 14z" fill="#6d1a26" />
        <path d="M14 46l-4-28 14 12 12-20 12 20 14-12-4 28z" fill={GOLD} />
        <path d="M36 10l12 20 14-12-4 28H36z" fill="#000" opacity={0.12} />
        <rect x="13" y="40" width="46" height="7" fill={GOLD_D} />
        <circle cx="36" cy="43.5" r="3" fill="#b23b48" />
        <circle cx="23" cy="43.5" r="2.4" fill="#3a6fb0" />
        <circle cx="49" cy="43.5" r="2.4" fill="#3c8a6a" />
        <circle cx="10" cy="17" r="2.6" fill={GOLD} />
        <circle cx="36" cy="9" r="2.6" fill={GOLD} />
        <circle cx="62" cy="17" r="2.6" fill={GOLD} />
      </g>
    ),
  },

  goblet: {
    w: 40,
    h: 72,
    render: () => (
      <g>
        <path d="M8 72c2-6 8-8 12-8s10 2 12 8z" fill={GOLD_D} />
        <rect x="18" y="38" width="4" height="28" fill={GOLD_D} />
        <circle cx="20" cy="50" r="3.5" fill={GOLD} />
        <path d="M4 6h32c0 20-6 32-16 34C10 38 4 26 4 6z" fill={GOLD} />
        <path d="M20 6h16c0 20-6 32-16 34z" fill="#000" opacity={0.14} />
        <ellipse cx="20" cy="6" rx="16" ry="3.5" fill="#7a1d2b" />
        <circle cx="20" cy="22" r="3" fill="#b23b48" />
      </g>
    ),
  },

  coins: {
    w: 112,
    h: 62,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={56} cy={36} rx={56} ry={30} color="#ffd98a" opacity={0.4} />
        <path d="M4 62c6-26 24-44 52-46 28 2 46 20 52 46z" fill={GOLD_D} />
        <path d="M14 58c6-20 20-34 42-36 16 2 28 10 36 22" fill="none" stroke={GOLD} strokeWidth={3} />
        {[
          [30, 44],
          [46, 32],
          [62, 28],
          [76, 40],
          [52, 50],
          [88, 54],
          [22, 56],
          [40, 58],
          [68, 56],
        ].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx={7} ry={3.2} fill={GOLD} stroke={GOLD_D} strokeWidth={0.8} />
        ))}
        <path d="M84 30l6-10 6 10-6 8z" fill="#57a6e8" />
        <path d="M24 34l5-8 5 8-5 6z" fill="#e35d6a" />
      </g>
    ),
  },

  gem: {
    w: 54,
    h: 90,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={27} cy={28} rx={30} color="#6fe0c8" opacity={0.5} />
        <rect x="10" y="56" width="34" height="34" fill="#d9d1c4" />
        <rect x="6" y="52" width="42" height="6" fill="#ebe4d8" />
        <rect x="10" y="84" width="34" height="6" fill="#c9c1b4" />
        <path d="M12 22l8-14h14l8 14-15 26z" fill="#3cc4a6" />
        <path d="M12 22h30L27 48z" fill="#1f9a80" />
        <path d="M20 8l7 14 7-14z" fill="#8ff0da" />
        <path d="M12 22l8-14 7 14z" fill="#62d9bf" />
      </g>
    ),
  },

  scales: {
    w: 84,
    h: 102,
    render: () => (
      <g>
        <path d="M26 102c2-8 8-10 16-10s14 2 16 10z" fill={GOLD_D} />
        <rect x="40" y="14" width="4" height="80" fill={GOLD_D} />
        <circle cx="42" cy="12" r="5" fill={GOLD} />
        <rect x="6" y="18" width="72" height="3.5" rx="1.5" fill={GOLD} transform="rotate(-6 42 20)" />
        <g stroke="#9c8c6a" strokeWidth={1}>
          <line x1="8" y1="24" x2="2" y2="52" />
          <line x1="8" y1="24" x2="22" y2="52" />
          <line x1="76" y1="16" x2="66" y2="44" />
          <line x1="76" y1="16" x2="84" y2="44" />
        </g>
        <path d="M0 52h24c0 6-5 9-12 9S0 58 0 52z" fill={GOLD} />
        <path d="M64 44h22c0 6-5 9-11 9s-11-3-11-9z" fill={GOLD} />
        <ellipse cx="75" cy="42" rx="5" ry="3" fill={GOLD_D} />
      </g>
    ),
  },
};

export { WOOD, WOOD_D, WOOD_L, GOLD, GOLD_D, IRON, STONE, STONE_D, STONE_L };
