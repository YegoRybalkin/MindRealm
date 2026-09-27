import type { ArtDef } from "./types";
import { Glow, r2 } from "./helpers";

const LEAF = "#4f7d45";
const LEAF_D = "#3a6035";
const LEAF_L = "#6b9a58";
const STONE = "#c9c2b4";
const STONE_D = "#a79f90";
const STONE_L = "#dfd9cd";
const IRON = "#2f3432";
const WOOD = "#8a5f3c";
const WOOD_D = "#5e4029";
const WATER = "#6aa6c4";
const ROSE = "#c43d4f";
const BLOOM = "#e7a6b8";

export const gardenArt: Record<string, ArtDef> = {
  gate: {
    w: 140,
    h: 140,
    render: () => (
      <g>
        <rect x="0" y="30" width="18" height="110" fill={STONE_D} />
        <rect x="122" y="30" width="18" height="110" fill={STONE_D} />
        <rect x="-3" y="24" width="24" height="10" fill={STONE} />
        <rect x="119" y="24" width="24" height="10" fill={STONE} />
        <circle cx="9" cy="18" r="7" fill={STONE} />
        <circle cx="131" cy="18" r="7" fill={STONE} />
        <path d="M18 60c16-30 36-40 52-40s36 10 52 40" fill="none" stroke={IRON} strokeWidth={3} />
        <path d="M18 70c16-26 36-34 52-34s36 8 52 34" fill="none" stroke={IRON} strokeWidth={2} />
        {Array.from({ length: 13 }).map((_, i) => {
          const x = 24 + i * 7.7;
          const top = r2(64 - Math.sin((i / 12) * Math.PI) * 36);
          return (
            <g key={i}>
              <line x1={x} y1={top} x2={x} y2={138} stroke={IRON} strokeWidth={2.2} />
              <path d={`M${x - 2.5} ${top + 2}l2.5-6 2.5 6z`} fill={IRON} />
            </g>
          );
        })}
        <line x1="70" y1="20" x2="70" y2="140" stroke={IRON} strokeWidth={3.2} />
        <line x1="18" y1="100" x2="122" y2="100" stroke={IRON} strokeWidth={2.4} />
        <line x1="18" y1="132" x2="122" y2="132" stroke={IRON} strokeWidth={2.4} />
        <circle cx="62" cy="96" r="2.6" fill="#c9a25a" />
        <path d="M6 110c-8-10-8-30 2-40 4 10 6 26-2 40zM134 110c8-10 8-30-2-40-4 10-6 26 2 40z" fill={LEAF} />
      </g>
    ),
  },

  lamppost: {
    w: 44,
    h: 160,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={22} cy={26} rx={26} color="#ffd98a" opacity={0.55} />
        <path d="M12 160l4-14h12l4 14z" fill={IRON} />
        <rect x="19.5" y="40" width="5" height="108" fill={IRON} />
        <path d="M10 42h24" stroke={IRON} strokeWidth={3} />
        <path d="M12 16h20l-3 24H15z" fill="#ffe2a0" />
        <path d="M8 16l14-12 14 12z" fill={IRON} />
        <g stroke={IRON} strokeWidth={1.6}>
          <line x1="22" y1="16" x2="22" y2="40" />
          <line x1="12" y1="16" x2="15" y2="40" />
          <line x1="32" y1="16" x2="29" y2="40" />
        </g>
        <circle cx="22" cy="4" r="2.4" fill={IRON} />
      </g>
    ),
  },

  topiary: {
    w: 70,
    h: 130,
    render: () => (
      <g>
        <path d="M16 102h38l-5 28H21z" fill="#b8654a" />
        <rect x="14" y="98" width="42" height="7" rx="2" fill="#9e4f35" />
        <rect x="33" y="56" width="4" height="44" fill={WOOD_D} />
        <circle cx="35" cy="80" r="14" fill={LEAF_D} />
        <circle cx="35" cy="32" r="28" fill={LEAF} />
        <path d="M35 4a28 28 0 0 1 0 56z" fill="#000" opacity={0.12} />
        <circle cx="26" cy="22" r="8" fill={LEAF_L} opacity={0.6} />
      </g>
    ),
  },

  signpost: {
    w: 80,
    h: 130,
    render: () => (
      <g>
        <rect x="36" y="6" width="8" height="124" fill={WOOD_D} />
        <path d="M40 18h36l4 8-4 8H40z" fill={WOOD} />
        <path d="M40 44H6l-4 8 4 8h34z" fill={WOOD} />
        <path d="M40 70h30l4 7-4 7H40z" fill={WOOD} />
        <g stroke="#f0e2c6" strokeWidth={2} strokeLinecap="round">
          <line x1="48" y1="26" x2="68" y2="26" />
          <line x1="12" y1="52" x2="32" y2="52" />
          <line x1="48" y1="77" x2="62" y2="77" />
        </g>
        <path d="M24 130c4-8 10-10 16-10s12 2 16 10z" fill={LEAF} />
      </g>
    ),
  },

  "bench-garden": {
    w: 140,
    h: 66,
    render: () => (
      <g>
        <path d="M14 66V36M126 66V36" stroke={IRON} strokeWidth={4} />
        <path d="M22 66l-6-26M118 66l6-26" stroke={IRON} strokeWidth={3} />
        {[4, 12, 20].map((y) => (
          <rect key={y} x="10" y={y} width="120" height="5" rx="1" fill={WOOD} />
        ))}
        <rect x="4" y="36" width="132" height="6" rx="1" fill={WOOD} />
        <rect x="6" y="42" width="128" height="5" rx="1" fill={WOOD_D} />
        <path d="M14 36V2M126 36V2" stroke={IRON} strokeWidth={4} />
        <path d="M14 26c-8 0-10 6-10 14M126 26c8 0 10 6 10 14" stroke={IRON} strokeWidth={3} fill="none" />
      </g>
    ),
  },

  fountain: {
    w: 170,
    h: 150,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={85} cy={60} rx={70} ry={50} color="#bfe3f2" opacity={0.3} />
        <path d="M4 124c0-10 36-16 81-16s81 6 81 16v20c0 4-36 6-81 6s-81-2-81-6z" fill={STONE_D} />
        <ellipse cx="85" cy="124" rx="81" ry="14" fill={STONE_L} />
        <ellipse cx="85" cy="125" rx="72" ry="10" fill={WATER} />
        <ellipse cx="60" cy="123" rx="20" ry="3" fill="#fff" opacity={0.3} />
        <path d="M76 124V70h18v54z" fill={STONE} />
        <path d="M44 72c0-6 18-10 41-10s41 4 41 10c0 8-18 12-41 12s-41-4-41-12z" fill={STONE_D} />
        <ellipse cx="85" cy="68" rx="41" ry="8" fill={STONE_L} />
        <ellipse cx="85" cy="68" rx="34" ry="5" fill={WATER} />
        <path d="M80 68V36h10v32z" fill={STONE} />
        <ellipse cx="85" cy="36" rx="16" ry="4" fill={STONE_L} />
        <g fill="none" stroke="#d6eef8" strokeWidth={2} opacity={0.85}>
          <path d="M85 30c0-16 0-20 0-24" />
          <path d="M85 8c-10 4-18 14-22 28" />
          <path d="M85 8c10 4 18 14 22 28" />
          <path d="M48 72c-8 10-12 26-14 50" />
          <path d="M122 72c8 10 12 26 14 50" />
        </g>
      </g>
    ),
  },

  sundial: {
    w: 70,
    h: 104,
    render: () => (
      <g>
        <path d="M16 104l6-10h26l6 10z" fill={STONE_D} />
        <path d="M24 94c-2-20 4-40 0-56h22c-4 16 2 36 0 56z" fill={STONE} />
        <path d="M35 38h11c-4 16 2 36 0 56H35z" fill="#000" opacity={0.08} />
        <ellipse cx="35" cy="36" rx="32" ry="8" fill={STONE_D} />
        <ellipse cx="35" cy="34" rx="32" ry="8" fill={STONE_L} />
        <ellipse cx="35" cy="34" rx="24" ry="5.5" fill="#b89a5a" />
        <path d="M35 34l-16-22h8z" fill="#8a6a2e" />
        <g stroke="#6e5424" strokeWidth={0.8}>
          <line x1="35" y1="34" x2="14" y2="32" />
          <line x1="35" y1="34" x2="56" y2="32" />
          <line x1="35" y1="34" x2="35" y2="39" />
          <line x1="35" y1="34" x2="22" y2="38" />
          <line x1="35" y1="34" x2="48" y2="38" />
        </g>
      </g>
    ),
  },

  birdbath: {
    w: 80,
    h: 100,
    render: () => (
      <g>
        <path d="M22 100l6-12h24l6 12z" fill={STONE_D} />
        <path d="M32 88c2-16-2-30 2-44h12c4 14 0 28 2 44z" fill={STONE} />
        <path d="M4 38c0-4 16-6 36-6s36 2 36 6c-2 8-16 12-36 12S6 46 4 38z" fill={STONE_D} />
        <ellipse cx="40" cy="36" rx="36" ry="6" fill={STONE_L} />
        <ellipse cx="40" cy="36" rx="28" ry="3.6" fill={WATER} />
        <path d="M56 30c0-8 6-12 12-10l6-2-4 4c2 6-2 10-8 10z" fill="#6b7d8a" />
        <circle cx="68" cy="22" r="1.2" fill="#111" />
      </g>
    ),
  },

  urn: {
    w: 70,
    h: 100,
    render: () => (
      <g>
        <rect x="16" y="84" width="38" height="16" fill={STONE_D} />
        <rect x="12" y="80" width="46" height="6" fill={STONE} />
        <path d="M28 80l2-8h10l2 8z" fill={STONE} />
        <path d="M10 36h50c0 20-10 36-25 36S10 56 10 36z" fill={STONE} />
        <path d="M35 36h25c0 20-10 36-25 36z" fill="#000" opacity={0.08} />
        <rect x="6" y="32" width="58" height="6" rx="2" fill={STONE_L} />
        <path d="M14 48c10 4 32 4 42 0" stroke={STONE_D} strokeWidth={1.4} fill="none" />
        <path d="M10 32c-4-14 6-28 14-24 2-10 14-12 20-4 8-4 18 4 14 14 6 4 6 12 0 14z" fill={LEAF} />
        <circle cx="22" cy="18" r="4" fill={BLOOM} />
        <circle cx="42" cy="12" r="4" fill="#f2d16b" />
        <circle cx="52" cy="24" r="3.6" fill={BLOOM} />
        <path d="M12 34c-6 8-6 18-4 26" stroke={LEAF_D} strokeWidth={2} fill="none" />
      </g>
    ),
  },

  roses: {
    w: 120,
    h: 90,
    render: () => {
      const blooms: [number, number, string][] = [
        [20, 40, ROSE],
        [36, 22, "#d85a6a"],
        [54, 34, ROSE],
        [70, 18, "#e07a88"],
        [86, 36, ROSE],
        [102, 26, "#d85a6a"],
        [44, 52, "#e07a88"],
        [78, 54, ROSE],
        [60, 12, ROSE],
      ];
      return (
        <g>
          <path d="M4 90c-2-30 10-60 34-70 10-10 34-12 46-2 24 6 34 36 32 72z" fill={LEAF_D} />
          <path d="M14 90c0-24 10-46 30-54 14-10 36-8 46 4 16 10 22 30 20 50z" fill={LEAF} />
          {blooms.map(([x, y, c], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={7} fill={c} />
              <path d={`M${x - 3} ${y}a3 3 0 1 1 6 0`} stroke="#8e2433" strokeWidth={1.2} fill="none" />
              <circle cx={x} cy={y - 1} r={1.8} fill="#8e2433" />
            </g>
          ))}
        </g>
      );
    },
  },

  arbor: {
    w: 130,
    h: 170,
    render: () => (
      <g>
        <rect x="8" y="30" width="10" height="140" fill="#efe9dd" />
        <rect x="112" y="30" width="10" height="140" fill="#efe9dd" />
        <path d="M4 40c10-30 34-40 61-40s51 10 61 40" fill="none" stroke="#efe9dd" strokeWidth={8} />
        <path d="M14 44c10-22 30-30 51-30s41 8 51 30" fill="none" stroke="#dcd4c4" strokeWidth={3} />
        <path d="M0 50c6-22 20-38 40-44 18 6 12 18 0 22-8 8-20 12-28 26zM130 50c-6-22-20-38-40-44-18 6-12 18 0 22 8 8 20 12 28 26z" fill={LEAF} />
        <path d="M6 70c-6 20-4 50 2 80 8-24 10-54-2-80zM124 70c6 20 4 50-2 80-8-24-10-54 2-80z" fill={LEAF} />
        {[
          [16, 22],
          [36, 8],
          [94, 8],
          [114, 22],
          [8, 94],
          [122, 104],
          [60, 4],
          [10, 130],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={4.5} fill={i % 2 ? BLOOM : ROSE} />
        ))}
      </g>
    ),
  },

  "watering-can": {
    w: 80,
    h: 56,
    render: () => (
      <g>
        <path d="M60 30l18-20" stroke="#6e8f9a" strokeWidth={5} strokeLinecap="round" />
        <path d="M74 6l8 6-6 4z" fill="#6e8f9a" />
        <path d="M14 18h44v34c0 3-10 4-22 4s-22-1-22-4z" fill="#7da2ae" />
        <path d="M36 18h22v34c0 3-10 4-22 4z" fill="#000" opacity={0.1} />
        <ellipse cx="36" cy="18" rx="22" ry="4" fill="#9bbcc6" />
        <path d="M14 26c-14 0-14 20 0 20" stroke="#6e8f9a" strokeWidth={4} fill="none" />
        <path d="M24 16c0-14 24-14 24 0" stroke="#6e8f9a" strokeWidth={4} fill="none" />
      </g>
    ),
  },

  wheelbarrow: {
    w: 130,
    h: 74,
    render: () => (
      <g>
        <path d="M60 40l66-18" stroke={WOOD_D} strokeWidth={4} strokeLinecap="round" />
        <path d="M76 44l-4 26M100 38l2 32" stroke={IRON} strokeWidth={3} />
        <path d="M10 18h86l-12 32H26z" fill="#4f7a8c" />
        <path d="M52 18h44l-12 32H52z" fill="#000" opacity={0.1} />
        <path d="M12 18c6-14 20-16 30-10 8-8 26-8 34 0 10-4 20 0 20 10z" fill="#5a3d28" />
        <path d="M30 12c-2-8 4-12 8-10M66 10c0-8 6-10 10-8" stroke={LEAF} strokeWidth={3} fill="none" />
        <circle cx="30" cy="56" r="16" fill={IRON} />
        <circle cx="30" cy="56" r="6" fill="#8e949b" />
      </g>
    ),
  },

  birdhouse: {
    w: 50,
    h: 130,
    render: () => (
      <g>
        <rect x="22" y="50" width="6" height="80" fill={WOOD_D} />
        <path d="M6 24h38v34H6z" fill="#d7a24a" />
        <path d="M25 24h19v34H25z" fill="#000" opacity={0.1} />
        <path d="M0 26L25 4l25 22z" fill={ROSE} />
        <circle cx="25" cy="38" r="5.5" fill="#3a2718" />
        <rect x="23" y="46" width="4" height="7" fill={WOOD_D} />
      </g>
    ),
  },

  beehive: {
    w: 70,
    h: 94,
    render: () => (
      <g>
        <rect x="14" y="80" width="42" height="14" fill={WOOD_D} />
        <ellipse cx="35" cy="80" rx="26" ry="5" fill={WOOD} />
        {[
          [35, 70, 24],
          [35, 56, 22],
          [35, 42, 19],
          [35, 29, 15],
          [35, 18, 10],
        ].map(([cx, cy, rx], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={8} fill={i % 2 ? "#d9b262" : "#c9a050"} />
        ))}
        <path d="M29 76a6 6 0 0 1 12 0z" fill="#3a2718" />
        <g fill="#f2c230">
          <circle cx="60" cy="30" r="2.4" />
          <circle cx="8" cy="46" r="2.4" />
          <circle cx="56" cy="54" r="2" />
        </g>
      </g>
    ),
  },

  bridge: {
    w: 190,
    h: 90,
    render: () => (
      <g>
        <path d="M0 90c30-50 60-66 95-66s65 16 95 66h-18c-24-38-48-52-77-52S42 52 18 90z" fill="#b6503c" />
        <path d="M0 90c30-50 60-66 95-66s65 16 95 66" fill="none" stroke="#8f3a2a" strokeWidth={3} />
        <path d="M10 70c28-40 54-54 85-54s57 14 85 54" fill="none" stroke="#c9644c" strokeWidth={4} />
        {[24, 50, 76, 114, 140, 166].map((x) => {
          const t = Math.abs(x - 95) / 95;
          const y = r2(16 + t * t * 54);
          return <line key={x} x1={x} y1={y} x2={x} y2={y + 22} stroke="#8f3a2a" strokeWidth={3} />;
        })}
      </g>
    ),
  },

  "stone-lantern": {
    w: 60,
    h: 110,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={30} cy={46} rx={24} color="#ffd98a" opacity={0.5} />
        <rect x="14" y="98" width="32" height="12" fill={STONE_D} />
        <rect x="24" y="64" width="12" height="36" fill={STONE} />
        <rect x="12" y="58" width="36" height="8" fill={STONE_D} />
        <rect x="16" y="36" width="28" height="22" fill={STONE} />
        <rect x="22" y="40" width="16" height="14" fill="#ffd98a" />
        <path d="M2 38L30 18l28 20z" fill={STONE_D} />
        <path d="M30 18l28 20H30z" fill="#000" opacity={0.1} />
        <circle cx="30" cy="14" r="5" fill={STONE} />
      </g>
    ),
  },

  rowboat: {
    w: 150,
    h: 56,
    render: () => (
      <g>
        <path d="M2 16h146l-14 30c-2 4-8 6-14 6H30c-6 0-12-2-14-6z" fill="#7a4e30" />
        <path d="M2 16h146l-4 8H6z" fill="#a8744a" />
        <path d="M12 32h126" stroke="#5e3c27" strokeWidth={1.4} />
        <rect x="46" y="16" width="8" height="18" fill="#5e3c27" />
        <rect x="96" y="16" width="8" height="18" fill="#5e3c27" />
        <path d="M60 10l70-8" stroke="#c9a06a" strokeWidth={3} strokeLinecap="round" />
        <path d="M122 0l18-2 2 8-18 2z" fill="#c9a06a" />
        <path d="M0 52c20-4 40 4 75 0s55-4 75 0" stroke="#bfe3f2" strokeWidth={2} fill="none" opacity={0.7} />
      </g>
    ),
  },

  reeds: {
    w: 80,
    h: 120,
    render: () => (
      <g>
        {[
          [10, 40, -6],
          [22, 20, -2],
          [34, 8, 2],
          [48, 24, 4],
          [60, 14, 6],
          [70, 44, 8],
        ].map(([x, top, lean], i) => (
          <g key={i}>
            <path d={`M${x} 120C${x} 90 ${x + lean} ${top + 20} ${x + lean} ${top}`} stroke={LEAF} strokeWidth={2.4} fill="none" />
            <rect x={x + lean - 2.5} y={top + 6} width={5} height={16} rx={2.5} fill="#6b4a2b" />
          </g>
        ))}
        <path d="M6 120c6-20 10-34 18-46-2 16-6 30-8 46zM74 120c-6-20-10-34-18-46 2 16 6 30 8 46z" fill={LEAF_L} />
      </g>
    ),
  },

  swan: {
    w: 84,
    h: 70,
    render: () => (
      <g>
        <path d="M6 44c0-12 20-16 44-10 10 2 20-2 26-8 4 16-6 30-30 32-24 2-40-2-40-14z" fill="#f7f4ee" />
        <path d="M58 36c-8-4-10-16-6-26 4-10 16-10 18 0" stroke="#f7f4ee" strokeWidth={7} fill="none" strokeLinecap="round" />
        <path d="M70 10l10 4-10 2z" fill="#e3822b" />
        <circle cx="66" cy="9" r="1.4" fill="#111" />
        <path d="M18 44c10-6 22-6 32 0" stroke="#dcd6ca" strokeWidth={2} fill="none" />
        <path d="M0 62c14-4 28 4 42 0s28-4 42 0" stroke="#bfe3f2" strokeWidth={2} fill="none" opacity={0.7} />
      </g>
    ),
  },

  column: {
    w: 60,
    h: 170,
    render: () => (
      <g>
        <rect x="4" y="156" width="52" height="14" fill={STONE_D} />
        <rect x="8" y="150" width="44" height="8" fill={STONE} />
        <rect x="12" y="22" width="36" height="128" fill={STONE_L} />
        {[18, 26, 34, 42].map((x) => (
          <line key={x} x1={x} y1={24} x2={x} y2={148} stroke={STONE_D} strokeWidth={1.4} />
        ))}
        <rect x="30" y="22" width="18" height="128" fill="#000" opacity={0.06} />
        <rect x="6" y="14" width="48" height="10" fill={STONE} />
        <path d="M2 14c0-6 4-8 8-8h40c4 0 8 2 8 8z" fill={STONE_L} />
        <path d="M14 24c-4 40 0 80-4 120" stroke={LEAF} strokeWidth={3} fill="none" />
        <circle cx="12" cy="60" r="3" fill={LEAF_L} />
        <circle cx="11" cy="100" r="3" fill={LEAF_L} />
      </g>
    ),
  },

  obelisk: {
    w: 50,
    h: 170,
    render: () => (
      <g>
        <rect x="2" y="152" width="46" height="18" fill={STONE_D} />
        <path d="M12 152l5-132h16l5 132z" fill={STONE_L} />
        <path d="M25 20h8l5 132H25z" fill="#000" opacity={0.08} />
        <path d="M17 20l8-16 8 16z" fill={STONE} />
        <g fill={STONE_D} opacity={0.7}>
          <rect x="21" y="40" width="8" height="3" />
          <circle cx="25" cy="54" r="3" />
          <rect x="22" y="66" width="6" height="10" />
          <path d="M20 90h10l-5 8z" />
          <rect x="21" y="108" width="8" height="3" />
        </g>
      </g>
    ),
  },

  cactus: {
    w: 60,
    h: 110,
    render: () => (
      <g>
        <path d="M14 84h32l-4 26H18z" fill="#c46a4a" />
        <rect x="12" y="80" width="36" height="6" rx="2" fill="#9e4f35" />
        <rect x="22" y="16" width="16" height="66" rx="8" fill="#5d8c55" />
        <path d="M22 50h-6a6 6 0 0 1-6-6V30a4 4 0 0 1 8 0v10h4z" fill="#5d8c55" />
        <path d="M38 40h6a4 4 0 0 0 4-4V22a4 4 0 0 0-8 0v10h-2z" fill="#5d8c55" />
        <path d="M30 18v62" stroke="#4a7444" strokeWidth={1.4} />
        <circle cx="30" cy="14" r="4" fill={BLOOM} />
      </g>
    ),
  },

  "hanging-basket": {
    w: 60,
    h: 90,
    grounded: false,
    render: () => (
      <g>
        <path d="M30 0L10 46M30 0l20 46M30 0v46" stroke="#6b5a44" strokeWidth={1} />
        <path d="M6 46h48c0 12-10 20-24 20S6 58 6 46z" fill="#8a6a44" />
        <path d="M6 46c-4-10 4-18 12-14 2-8 16-10 20 0 8-6 18 2 16 14z" fill={LEAF} />
        <path d="M10 56c-4 10-2 22 2 30M50 56c4 10 2 20-2 26M30 64c0 8 2 16 0 22" stroke={LEAF_L} strokeWidth={3} fill="none" strokeLinecap="round" />
        <circle cx="18" cy="38" r="4" fill="#9d7bff" />
        <circle cx="34" cy="34" r="4" fill={BLOOM} />
        <circle cx="46" cy="42" r="3.6" fill="#9d7bff" />
      </g>
    ),
  },

  orchid: {
    w: 60,
    h: 110,
    render: () => (
      <g>
        <path d="M14 82h32l-3 28H17z" fill="#f2efe8" />
        <rect x="12" y="78" width="36" height="6" rx="2" fill="#e0dbd0" />
        <path d="M20 80c-8-4-14-4-18 0 6 4 12 4 18 0zM40 80c8-4 14-4 18 0-6 4-12 4-18 0z" fill={LEAF} />
        <path d="M30 80C28 50 36 30 48 18" stroke="#6b7a4a" strokeWidth={1.6} fill="none" />
        {[
          [34, 50],
          [38, 38],
          [44, 28],
          [50, 20],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x - 4} cy={y} r={4} fill="#f2e6f4" />
            <circle cx={x + 4} cy={y} r={4} fill="#f2e6f4" />
            <circle cx={x} cy={y - 4} r={4} fill="#f7eef8" />
            <circle cx={x} cy={y + 2} r={2.4} fill="#b0477e" />
          </g>
        ))}
      </g>
    ),
  },

  "seed-tray": {
    w: 110,
    h: 50,
    render: () => (
      <g>
        <rect x="2" y="30" width="106" height="20" rx="2" fill="#3b3f3d" />
        <rect x="2" y="30" width="106" height="5" fill="#4f5552" />
        {Array.from({ length: 6 }).map((_, i) => (
          <g key={i}>
            <path d={`M${14 + i * 17} 30c-2-8-8-12-12-10 4 4 8 8 12 10zM${14 + i * 17} 30c2-8 8-14 12-12-4 4-8 10-12 12z`} fill={i % 2 ? LEAF_L : LEAF} />
            <line x1={14 + i * 17} y1={30} x2={14 + i * 17} y2={18 + (i % 3) * 3} stroke={LEAF} strokeWidth={1.4} />
          </g>
        ))}
      </g>
    ),
  },

  scarecrow: {
    w: 90,
    h: 150,
    render: () => (
      <g>
        <rect x="42" y="40" width="6" height="110" fill={WOOD_D} />
        <rect x="4" y="54" width="82" height="6" fill={WOOD_D} />
        <path d="M26 52h38l4 46H22z" fill="#6f8aa8" />
        <path d="M45 52h19l4 46H45z" fill="#000" opacity={0.1} />
        <rect x="36" y="66" width="10" height="10" fill="#c46a4a" />
        <path d="M26 54L8 60l2 8 16-4M64 54l18 6-2 8-16-4" fill="#6f8aa8" />
        <path d="M6 62l-6 6M8 66l-4 8M84 62l6 6M82 66l4 8" stroke="#d8b456" strokeWidth={2} />
        <circle cx="45" cy="34" r="14" fill="#e3cf9a" />
        <circle cx="40" cy="32" r="1.8" fill="#3a2718" />
        <circle cx="50" cy="32" r="1.8" fill="#3a2718" />
        <path d="M40 40c3 2 7 2 10 0" stroke="#3a2718" strokeWidth={1.2} fill="none" />
        <path d="M22 22h46l-6-4H28z" fill="#6b4a2b" />
        <path d="M32 18c0-10 6-16 13-16s13 6 13 16z" fill="#8a6a44" />
        <path d="M32 98l-4 12M58 98l4 12" stroke="#d8b456" strokeWidth={2} />
      </g>
    ),
  },

  "apple-basket": {
    w: 80,
    h: 60,
    render: () => (
      <g>
        <path d="M14 22c0-20 52-20 52 0" stroke={WOOD_D} strokeWidth={3} fill="none" />
        {[
          [22, 26],
          [34, 22],
          [46, 24],
          [58, 26],
          [28, 30],
          [52, 30],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={8} fill={i % 3 === 1 ? "#d9a441" : "#c43d3d"} />
        ))}
        <path d="M4 30h72l-8 30H12z" fill="#b38552" />
        <g stroke="#8a6238" strokeWidth={1.4}>
          <line x1="6" y1="38" x2="74" y2="38" />
          <line x1="8" y1="46" x2="72" y2="46" />
          <line x1="10" y1="54" x2="70" y2="54" />
        </g>
      </g>
    ),
  },

  "tree-apple": {
    w: 140,
    h: 190,
    render: () => (
      <g>
        <path d="M62 190c4-26 4-50 0-80h16c-4 30-4 54 0 80z" fill="#6b4a32" />
        <path d="M70 124c-12-8-22-12-32-10M72 112c10-6 18-8 28-6" stroke="#6b4a32" strokeWidth={5} strokeLinecap="round" fill="none" />
        <ellipse cx="70" cy="64" rx="66" ry="58" fill="#5b8c4c" />
        <ellipse cx="70" cy="82" rx="60" ry="36" fill="#4a7a40" />
        <ellipse cx="50" cy="40" rx="30" ry="22" fill="#6b9a58" opacity={0.7} />
        {[
          [30, 60],
          [52, 88],
          [80, 46],
          [104, 72],
          [66, 70],
          [42, 32],
          [96, 34],
          [118, 58],
          [84, 96],
          [22, 84],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={5} fill="#c43d3d" />
        ))}
      </g>
    ),
  },
};
