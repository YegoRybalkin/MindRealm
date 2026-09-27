import type { ArtDef } from "./types";
import { Glow } from "./helpers";

/* Additional room furniture & creatures (second wave). */

const WOOD = "#6b4428";
const WOOD_D = "#4a2e1a";
const STONE = "#c9c2b4";
const STONE_D = "#a79f90";
const CHAR = "#2f3237";
const STEEL = "#b9c0c7";
const STEEL_D = "#8e969f";

export const rooms2Art: Record<string, ArtDef> = {
  dog: {
    w: 120,
    h: 60,
    render: () => (
      <g>
        <ellipse cx="62" cy="44" rx="42" ry="15" fill="#8a5a36" />
        <path d="M24 44c-10 0-16 6-18 12h30z" fill="#7a4e30" />
        <ellipse cx="100" cy="46" rx="16" ry="11" fill="#8a5a36" />
        <path d="M104 36c6-10 14-8 14 0-4 4-8 6-14 4z" fill="#5e3c27" />
        <ellipse cx="112" cy="50" rx="6" ry="4" fill="#a8744a" />
        <circle cx="116" cy="48" r="2" fill="#1a1a1a" />
        <path d="M100 44c2-2 4-2 6 0" stroke="#1a1a1a" strokeWidth={1.4} fill="none" />
        <path d="M20 40c-8-6-14-4-18 2" stroke="#7a4e30" strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d="M40 38c10 4 30 4 40 0" stroke="#6b4428" strokeWidth={2} fill="none" />
      </g>
    ),
  },
  owl: {
    w: 50,
    h: 64,
    render: () => (
      <g>
        <ellipse cx="25" cy="38" rx="20" ry="24" fill="#8a6a44" />
        <ellipse cx="25" cy="44" rx="13" ry="16" fill="#d9c8a4" />
        <path d="M12 46l4 4-4 4M20 50l4 4-4 4M30 50l4 4-4 4" stroke="#a8977a" strokeWidth={1.4} fill="none" />
        <path d="M6 18l6 10M44 18l-6 10" stroke="#6b4a2b" strokeWidth={5} strokeLinecap="round" />
        <circle cx="17" cy="28" r="8" fill="#f3efe6" />
        <circle cx="33" cy="28" r="8" fill="#f3efe6" />
        <circle cx="17" cy="28" r="4" fill="#e8a820" />
        <circle cx="33" cy="28" r="4" fill="#e8a820" />
        <circle cx="17" cy="28" r="2" fill="#111" />
        <circle cx="33" cy="28" r="2" fill="#111" />
        <path d="M22 34l3 6 3-6z" fill="#e3822b" />
        <path d="M16 62l2-4M32 62l2-4" stroke="#e3822b" strokeWidth={3} />
      </g>
    ),
  },
  "armchair-leather": {
    w: 100,
    h: 96,
    render: () => (
      <g>
        <rect x="16" y="86" width="6" height="10" fill={WOOD_D} />
        <rect x="78" y="86" width="6" height="10" fill={WOOD_D} />
        <path d="M18 8c0-6 64-6 64 0v50H18z" fill="#7a2e22" />
        <g fill="#5e2019">
          {[26, 42, 58, 74].map((x) => [22, 38].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r={2} />))}
        </g>
        <rect x="12" y="54" width="76" height="22" rx="6" fill="#8e3628" />
        <rect x="2" y="36" width="20" height="50" rx="9" fill="#6b261c" />
        <rect x="78" y="36" width="20" height="50" rx="9" fill="#6b261c" />
        <rect x="16" y="74" width="68" height="14" rx="3" fill="#5e2019" />
      </g>
    ),
  },
  "archery-target": {
    w: 80,
    h: 110,
    render: () => (
      <g>
        <path d="M18 110l12-50M62 110l-12-50M40 110V64" stroke={WOOD} strokeWidth={5} />
        <circle cx="40" cy="40" r="38" fill="#e9dfc5" />
        <circle cx="40" cy="40" r="30" fill="#2f3237" />
        <circle cx="40" cy="40" r="22" fill="#3a6fb0" />
        <circle cx="40" cy="40" r="14" fill="#c43d3d" />
        <circle cx="40" cy="40" r="6" fill="#f2c230" />
        <path d="M44 36l24-18" stroke="#8a5a36" strokeWidth={2.4} />
        <path d="M66 14l6 2-4 4z" fill="#e6e0d6" />
      </g>
    ),
  },
  cauldron: {
    w: 100,
    h: 90,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={50} cy={30} rx={40} ry={24} color="#6bd48a" opacity={0.5} />
        <path d="M24 80l-6 10M76 80l6 10M50 84v6" stroke={CHAR} strokeWidth={5} />
        <path d="M10 36h80c0 28-18 48-40 48S10 64 10 36z" fill={CHAR} />
        <path d="M50 36h40c0 28-18 48-40 48z" fill="#000" opacity={0.2} />
        <ellipse cx="50" cy="36" rx="42" ry="9" fill="#3c4046" />
        <ellipse cx="50" cy="36" rx="34" ry="6" fill="#4fbf6a" />
        <circle cx="40" cy="34" r="4" fill="#8fe8a8" />
        <circle cx="58" cy="32" r="3" fill="#8fe8a8" />
        <circle cx="48" cy="20" r="3" fill="#8fe8a8" opacity={0.7} />
        <circle cx="56" cy="10" r="2" fill="#8fe8a8" opacity={0.5} />
      </g>
    ),
  },
  chicken: {
    w: 60,
    h: 56,
    render: () => (
      <g>
        <path d="M8 30c0-12 12-18 24-14 4-10 18-10 20 2 2 8-2 12-6 14 2 14-8 22-20 22S8 44 8 30z" fill="#f3efe6" />
        <path d="M8 26c-6-6-8-14-4-18 4 6 8 8 12 10z" fill="#e8e2d6" />
        <path d="M40 8c2-6 8-6 8 0-2-2-4 0-4 2" fill="#c43d3d" />
        <path d="M52 20l8 2-8 3z" fill="#e8a820" />
        <circle cx="46" cy="16" r="1.8" fill="#111" />
        <path d="M48 24c0 4-2 6-4 6" stroke="#c43d3d" strokeWidth={3} fill="none" />
        <path d="M24 52v4M34 52v4" stroke="#e8a820" strokeWidth={2.4} />
        <path d="M16 32c6 4 14 4 20-2" stroke="#d8d2c4" strokeWidth={2} fill="none" />
      </g>
    ),
  },
  "gold-bars": {
    w: 100,
    h: 60,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={50} cy={36} rx={50} ry={26} color="#ffd98a" opacity={0.4} />
        {[
          [10, 40],
          [40, 40],
          [70, 40],
          [25, 22],
          [55, 22],
          [40, 4],
        ].map(([x, y], i) => (
          <g key={i}>
            <path d={`M${x} ${y + 18}l4-14h22l4 14z`} fill="#d6a84a" />
            <path d={`M${x + 4} ${y + 4}h22l-2 5H${x + 6}z`} fill="#f2d16b" />
            <path d={`M${x + 20} ${y + 4}h6l4 14h-8z`} fill="#a87b2c" />
          </g>
        ))}
      </g>
    ),
  },
  doormat: {
    w: 120,
    h: 30,
    render: () => (
      <g>
        <path d="M14 4h92l14 24H0z" fill="#b8854a" />
        <path d="M20 8h80l10 16H10z" fill="#9a6a38" />
        <text x="60" y="21" fontSize="11" fontFamily="serif" textAnchor="middle" fill="#e8d2a4">
          WELCOME
        </text>
      </g>
    ),
  },
  cat: {
    w: 80,
    h: 50,
    render: () => (
      <g>
        <ellipse cx="40" cy="36" rx="30" ry="13" fill="#e38a3c" />
        <path d="M18 30c6-4 12-4 16 0M46 28c6-4 12-4 16 0" stroke="#c4682a" strokeWidth={3} fill="none" />
        <circle cx="64" cy="28" r="12" fill="#e38a3c" />
        <path d="M56 20l-2-12 8 8zM72 20l2-12-8 8z" fill="#e38a3c" />
        <path d="M58 28c2 2 4 2 6 0M66 28c2 2 4 2 6 0" stroke="#3a2718" strokeWidth={1.4} fill="none" />
        <circle cx="65" cy="32" r="1.4" fill="#c43d4f" />
        <path d="M10 40c-8 0-10-8-4-12" stroke="#e38a3c" strokeWidth={6} fill="none" strokeLinecap="round" />
      </g>
    ),
  },
  bin: {
    w: 50,
    h: 70,
    render: () => (
      <g>
        <path d="M6 16h38l-4 54H10z" fill="#8e969f" />
        <path d="M25 16h19l-4 54H25z" fill="#000" opacity={0.1} />
        <path d="M14 24v40M25 24v40M36 24v40" stroke="#6f777f" strokeWidth={2} />
        <rect x="2" y="10" width="46" height="8" rx="3" fill="#6f777f" />
        <rect x="18" y="4" width="14" height="6" rx="2" fill="#6f777f" />
      </g>
    ),
  },
  "kitchen-chair": {
    w: 60,
    h: 100,
    render: () => (
      <g>
        <path d="M10 4h40v6H10zM12 10v44M48 10v44" stroke="#c89b6d" strokeWidth={5} fill="none" />
        <path d="M14 22h32M14 36h32" stroke="#c89b6d" strokeWidth={3} />
        <rect x="4" y="52" width="52" height="8" rx="2" fill="#dcb68b" />
        <path d="M10 60l-4 40M50 60l4 40M16 60v36M44 60v36" stroke="#a87b50" strokeWidth={4} />
        <rect x="8" y="46" width="44" height="8" rx="4" fill="#c46a4a" />
      </g>
    ),
  },
  teddy: {
    w: 60,
    h: 70,
    render: () => (
      <g>
        <ellipse cx="30" cy="50" rx="18" ry="18" fill="#a8744a" />
        <ellipse cx="30" cy="54" rx="10" ry="10" fill="#d9b48c" />
        <circle cx="12" cy="62" r="8" fill="#a8744a" />
        <circle cx="48" cy="62" r="8" fill="#a8744a" />
        <circle cx="10" cy="42" r="7" fill="#a8744a" />
        <circle cx="50" cy="42" r="7" fill="#a8744a" />
        <circle cx="30" cy="22" r="16" fill="#a8744a" />
        <circle cx="16" cy="8" r="6" fill="#a8744a" />
        <circle cx="44" cy="8" r="6" fill="#a8744a" />
        <ellipse cx="30" cy="28" rx="7" ry="5" fill="#d9b48c" />
        <circle cx="30" cy="26" r="2" fill="#2a1a10" />
        <circle cx="24" cy="18" r="2" fill="#2a1a10" />
        <circle cx="36" cy="18" r="2" fill="#2a1a10" />
        <path d="M22 36h16l-4 5h-8z" fill="#c43d4f" />
      </g>
    ),
  },
  "laundry-basket": {
    w: 80,
    h: 70,
    render: () => (
      <g>
        <path d="M14 20c6-14 16-18 26-16 10 0 20 4 26 16z" fill="#8fb3cf" />
        <path d="M22 18c4-8 10-10 16-10" stroke="#c43d4f" strokeWidth={6} fill="none" />
        <path d="M6 20h68l-6 50H12z" fill="#e8dcc2" />
        <g stroke="#c9b894" strokeWidth={2}>
          {[30, 40, 50, 60].map((y) => (
            <line key={y} x1="8" x2="72" y1={y} y2={y} />
          ))}
          {[20, 32, 44, 56].map((x) => (
            <line key={x} x1={x} x2={x - 1} y1="22" y2="68" />
          ))}
        </g>
        <rect x="4" y="18" width="72" height="6" rx="3" fill="#d9c8a4" />
      </g>
    ),
  },
  "filing-cabinet": {
    w: 60,
    h: 120,
    render: () => (
      <g>
        <rect x="4" y="2" width="52" height="118" rx="2" fill="#7d8a96" />
        <rect x="30" y="2" width="26" height="118" fill="#000" opacity={0.08} />
        {[6, 44, 82].map((y) => (
          <g key={y}>
            <rect x="8" y={y} width="44" height="34" rx="1" fill="#8e9ba8" />
            <rect x="22" y={y + 8} width="16" height="4" rx="2" fill="#4a5360" />
            <rect x="24" y={y + 16} width="12" height="7" fill="#f3efe6" />
          </g>
        ))}
      </g>
    ),
  },
  "lawn-mower": {
    w: 120,
    h: 90,
    render: () => (
      <g>
        <path d="M60 50L100 6h14" stroke={CHAR} strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d="M6 50c0-12 8-20 24-20h40c10 0 16 8 16 20v14H6z" fill="#3f8a4a" />
        <rect x="20" y="22" width="30" height="14" rx="4" fill={CHAR} />
        <rect x="26" y="16" width="10" height="8" fill="#c43d3d" />
        <circle cx="22" cy="72" r="14" fill={CHAR} />
        <circle cx="22" cy="72" r="5" fill={STEEL} />
        <circle cx="76" cy="74" r="12" fill={CHAR} />
        <circle cx="76" cy="74" r="4" fill={STEEL} />
        <path d="M86 40c10 0 16 8 16 18H86z" fill="#6f8a3a" />
      </g>
    ),
  },
  "paint-cans": {
    w: 90,
    h: 70,
    render: () => (
      <g>
        {[
          [4, 24, "#3a6fb0"],
          [34, 14, "#e8b93a"],
          [60, 30, "#c43d3d"],
        ].map(([x, y, c], i) => (
          <g key={i}>
            <rect x={x as number} y={y as number} width="26" height={70 - (y as number)} rx="2" fill="#c9ced4" />
            <rect x={x as number} y={(y as number) + 10} width="26" height="18" fill={c as string} />
            <ellipse cx={(x as number) + 13} cy={y as number} rx="13" ry="3" fill={c as string} />
            <path d={`M${(x as number) + 4} ${(y as number) + 2}c0 8 2 12 0 18`} stroke={c as string} strokeWidth={3} fill="none" />
          </g>
        ))}
      </g>
    ),
  },
  toilet: {
    w: 70,
    h: 90,
    render: () => (
      <g>
        <rect x="10" y="2" width="44" height="34" rx="4" fill="#f7f7f5" />
        <rect x="32" y="2" width="22" height="34" rx="4" fill="#000" opacity={0.05} />
        <rect x="40" y="10" width="10" height="4" rx="2" fill="#b9c0c7" />
        <path d="M4 44c0-6 6-8 30-8s32 2 32 8c0 16-12 24-22 26v20H24V70C14 68 4 60 4 44z" fill="#f7f7f5" />
        <ellipse cx="35" cy="44" rx="26" ry="6" fill="#e3e6e8" />
        <path d="M44 70v20H34z" fill="#000" opacity={0.06} />
      </g>
    ),
  },
  mailbox: {
    w: 60,
    h: 110,
    render: () => (
      <g>
        <rect x="26" y="40" width="8" height="70" fill={WOOD} />
        <path d="M4 44V20a18 18 0 0 1 36 0v24z" fill="#2f4863" />
        <path d="M4 20a18 18 0 0 1 36 0" stroke="#3c5a7a" strokeWidth={3} fill="none" />
        <rect x="40" y="14" width="4" height="22" fill="#c43d3d" />
        <path d="M44 14h14v10H44z" fill="#c43d3d" />
        <rect x="8" y="30" width="28" height="4" rx="2" fill="#1f3044" />
        <path d="M12 26l10-6 10 6" stroke="#f3efe6" strokeWidth={1.6} fill="none" />
      </g>
    ),
  },
  gnome: {
    w: 50,
    h: 80,
    render: () => (
      <g>
        <path d="M25 0l16 34H9z" fill="#c43d3d" />
        <circle cx="25" cy="38" r="9" fill="#f2c6a0" />
        <circle cx="25" cy="41" r="3" fill="#e8a080" />
        <path d="M12 42c0 16 6 24 13 24s13-8 13-24c-4 6-8 8-13 8s-9-2-13-8z" fill="#f3efe6" />
        <path d="M10 58h30l4 20H6z" fill="#3a6fb0" />
        <rect x="8" y="74" width="14" height="6" rx="2" fill="#5e3c27" />
        <rect x="28" y="74" width="14" height="6" rx="2" fill="#5e3c27" />
        <circle cx="21" cy="36" r="1.4" fill="#2a1a10" />
        <circle cx="29" cy="36" r="1.4" fill="#2a1a10" />
      </g>
    ),
  },
  pigeon: {
    w: 70,
    h: 50,
    render: () => (
      <g>
        <path d="M6 30c4-14 20-18 34-12 8-10 22-8 24 4 2 6-2 10-6 12-2 10-14 16-30 14-12-2-22-8-22-18z" fill="#8a94a6" />
        <path d="M16 26c10-4 20-2 26 6-10 4-20 2-26-6z" fill="#6f7a8c" />
        <path d="M52 22c4 4 8 6 6 10" stroke="#5aa08a" strokeWidth={4} fill="none" />
        <path d="M62 18l8 2-8 2z" fill="#3a3a3a" />
        <circle cx="56" cy="16" r="2" fill="#e8742a" />
        <path d="M26 46v4M34 46v4" stroke="#c46a6a" strokeWidth={2.4} />
        <path d="M6 30L0 36l8-2z" fill="#6f7a8c" />
      </g>
    ),
  },
  flowerbed: {
    w: 130,
    h: 50,
    render: () => (
      <g>
        <path d="M4 34c20-8 102-8 122 0v16H4z" fill="#6b4a32" />
        {Array.from({ length: 11 }).map((_, i) => {
          const x = 10 + i * 11;
          const c = ["#e35d6a", "#f2c230", "#c77dff", "#ff9f43"][i % 4];
          return (
            <g key={i}>
              <line x1={x} y1="36" x2={x} y2={16 + (i % 3) * 4} stroke="#4f7d45" strokeWidth={2} />
              <path d={`M${x - 5} ${14 + (i % 3) * 4}c0 8 10 8 10 0l-2 -6-3 4-3-4z`} fill={c} />
            </g>
          );
        })}
      </g>
    ),
  },
  frog: {
    w: 70,
    h: 44,
    render: () => (
      <g>
        <ellipse cx="35" cy="36" rx="34" ry="8" fill="#5d8c4c" />
        <path d="M35 36l30-6" stroke="#4a7a3e" strokeWidth={2} />
        <ellipse cx="35" cy="26" rx="16" ry="11" fill="#6fbf4a" />
        <circle cx="27" cy="16" r="6" fill="#6fbf4a" />
        <circle cx="43" cy="16" r="6" fill="#6fbf4a" />
        <circle cx="27" cy="15" r="3" fill="#f3efe6" />
        <circle cx="43" cy="15" r="3" fill="#f3efe6" />
        <circle cx="27" cy="15" r="1.5" fill="#111" />
        <circle cx="43" cy="15" r="1.5" fill="#111" />
        <path d="M28 26c4 3 10 3 14 0" stroke="#3a6a2a" strokeWidth={1.6} fill="none" />
        <path d="M18 30l-6 4M52 30l6 4" stroke="#6fbf4a" strokeWidth={5} strokeLinecap="round" />
      </g>
    ),
  },
  heron: {
    w: 70,
    h: 130,
    render: () => (
      <g>
        <path d="M30 80l-4 50M38 80l2 50" stroke="#c9a060" strokeWidth={2.4} />
        <path d="M12 60c4-20 24-26 38-18 8 6 8 22-2 32-12 10-34 6-36-14z" fill="#b9c3cf" />
        <path d="M16 62c10 8 24 10 34 4" stroke="#8e98a6" strokeWidth={3} fill="none" />
        <path d="M44 44c-4-12-2-24 4-32" stroke="#dfe4ea" strokeWidth={7} fill="none" strokeLinecap="round" />
        <circle cx="50" cy="12" r="7" fill="#dfe4ea" />
        <path d="M56 12l14 3-14 2z" fill="#e8b93a" />
        <path d="M46 8c-6-4-12-4-16 0" stroke="#2f3237" strokeWidth={2} fill="none" />
        <circle cx="52" cy="10" r="1.4" fill="#111" />
      </g>
    ),
  },
  bust: {
    w: 50,
    h: 100,
    render: () => (
      <g>
        <rect x="8" y="64" width="34" height="36" fill={STONE_D} />
        <rect x="4" y="60" width="42" height="6" fill={STONE} />
        <path d="M6 60c0-12 8-18 19-18s19 6 19 18z" fill="#e8e3da" />
        <rect x="20" y="30" width="10" height="14" fill="#dcd5ca" />
        <ellipse cx="25" cy="22" rx="11" ry="13" fill="#eeeae2" />
        <path d="M14 18c0-10 22-12 22 0-2-6-18-6-22 0z" fill="#d2cbbf" />
        <path d="M12 16c4-6 10-8 14-6M38 16c-4-6-10-8-14-6" stroke="#8fbf6a" strokeWidth={3} fill="none" />
      </g>
    ),
  },
  sunflower: {
    w: 60,
    h: 140,
    render: () => (
      <g>
        <path d="M30 140V50" stroke="#4f7d45" strokeWidth={5} />
        <path d="M30 100c-14-8-22-4-24 4 10 2 18 0 24-4zM30 80c14-8 22-4 24 4-10 2-18 0-24-4z" fill="#5d8c4c" />
        <g fill="#f2c230">
          {Array.from({ length: 14 }).map((_, i) => (
            <ellipse key={i} cx="30" cy="12" rx="6" ry="12" transform={`rotate(${i * 25.7} 30 32)`} />
          ))}
        </g>
        <circle cx="30" cy="32" r="12" fill="#6b4428" />
        <circle cx="30" cy="32" r="8" fill="#4a2e1a" />
      </g>
    ),
  },
  "tomato-plant": {
    w: 60,
    h: 100,
    render: () => (
      <g>
        <path d="M14 76h32l-4 24H18z" fill="#c46a4a" />
        <path d="M30 76V6M20 76V20M40 76V16" stroke="#c9a060" strokeWidth={2} />
        <g fill="#4f7d45">
          <ellipse cx="22" cy="30" rx="12" ry="8" />
          <ellipse cx="38" cy="42" rx="12" ry="8" />
          <ellipse cx="24" cy="56" rx="12" ry="8" />
          <ellipse cx="36" cy="18" rx="10" ry="7" />
        </g>
        {[
          [18, 40],
          [42, 30],
          [30, 60],
          [40, 56],
          [22, 20],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={5} fill="#d9383a" />
        ))}
      </g>
    ),
  },
  rabbit: {
    w: 60,
    h: 60,
    render: () => (
      <g>
        <ellipse cx="26" cy="44" rx="20" ry="14" fill="#c9b8a4" />
        <circle cx="8" cy="42" r="5" fill="#f3efe6" />
        <circle cx="44" cy="34" r="11" fill="#c9b8a4" />
        <path d="M40 24c-4-14-2-22 2-22s4 10 2 22zM48 24c2-14 8-20 11-18s-2 12-7 20z" fill="#c9b8a4" />
        <path d="M42 22c-2-10-1-16 1-16" stroke="#e8b8b8" strokeWidth={2} fill="none" />
        <circle cx="48" cy="32" r="1.8" fill="#111" />
        <circle cx="54" cy="36" r="1.4" fill="#e88aa0" />
        <ellipse cx="34" cy="56" rx="8" ry="3" fill="#b8a690" />
      </g>
    ),
  },
  "hazard-bin": {
    w: 60,
    h: 80,
    render: () => (
      <g>
        <path d="M6 16h48l-4 64H10z" fill="#e8b93a" />
        <path d="M30 16h24l-4 64H30z" fill="#000" opacity={0.08} />
        <rect x="2" y="8" width="56" height="10" rx="3" fill="#2a3342" />
        <circle cx="30" cy="46" r="12" fill="#2a3342" />
        <g fill="#e8b93a">
          <circle cx="30" cy="40" r="3" />
          <circle cx="25" cy="49" r="3" />
          <circle cx="35" cy="49" r="3" />
        </g>
      </g>
    ),
  },
  "lab-coat": {
    w: 60,
    h: 110,
    grounded: false,
    render: () => (
      <g>
        <circle cx="30" cy="4" r="3" fill="#9aa4b2" />
        <path d="M18 8L4 22v70h14V40l0 66h24V40v52h14V22L42 8c-4 6-8 8-12 8s-8-2-12-8z" fill="#f3f5f7" />
        <path d="M30 16v90" stroke="#c7ced8" strokeWidth={2} />
        <path d="M22 8l8 14 8-14" fill="#dfe4ea" />
        <rect x="36" y="44" width="12" height="10" fill="#dfe4ea" />
        <rect x="40" y="40" width="3" height="8" fill="#5ce1e6" />
      </g>
    ),
  },
  "exercise-bike": {
    w: 90,
    h: 90,
    render: () => (
      <g>
        <path d="M10 88h70" stroke="#3a4558" strokeWidth={6} strokeLinecap="round" />
        <path d="M24 86L40 40M60 86L52 30" stroke="#9aa4b2" strokeWidth={6} />
        <circle cx="60" cy="62" r="14" fill="#2a3342" />
        <circle cx="60" cy="62" r="6" fill="#5ce1e6" />
        <rect x="28" y="30" width="24" height="8" rx="4" fill="#2a3342" />
        <path d="M52 30l14-14h10" stroke="#9aa4b2" strokeWidth={5} fill="none" />
        <rect x="68" y="8" width="16" height="12" rx="2" fill="#0d1622" />
        <rect x="70" y="10" width="12" height="8" fill="#5ce1e6" opacity={0.6} />
      </g>
    ),
  },
  "warning-sign": {
    w: 60,
    h: 56,
    grounded: false,
    render: () => (
      <g>
        <path d="M30 2l28 50H2z" fill="#ff9f43" />
        <path d="M30 10l21 38H9z" fill="#2a3342" />
        <path d="M28 20h4l-1 16h-2z" fill="#ff9f43" />
        <circle cx="30" cy="41" r="2.4" fill="#ff9f43" />
      </g>
    ),
  },
  wheelchair: {
    w: 90,
    h: 90,
    render: () => (
      <g>
        <circle cx="38" cy="60" r="28" fill="none" stroke={CHAR} strokeWidth={5} />
        <circle cx="38" cy="60" r="4" fill={STEEL_D} />
        <path d="M38 34v52M12 60h52" stroke={STEEL} strokeWidth={1.4} />
        <circle cx="76" cy="82" r="7" fill={CHAR} />
        <path d="M22 10v38h40l14 30" stroke={STEEL} strokeWidth={5} fill="none" strokeLinejoin="round" />
        <rect x="24" y="40" width="40" height="10" rx="3" fill="#2f7a8a" />
        <rect x="18" y="10" width="10" height="34" rx="3" fill="#2f7a8a" />
        <path d="M22 10h-10" stroke={STEEL} strokeWidth={4} strokeLinecap="round" />
      </g>
    ),
  },
};
