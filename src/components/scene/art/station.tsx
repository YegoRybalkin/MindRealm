import type { ArtDef } from "./types";
import { Glow, r2 } from "./helpers";

const HULL = "#c7ced8";
const HULL_D = "#9aa4b2";
const PANEL = "#2a3342";
const PANEL_D = "#1b2230";
const PANEL_L = "#3a4558";
const CYAN = "#5ce1e6";
const ORANGE = "#ff9f43";
const MAGENTA = "#c77dff";
const GREEN = "#59d98e";
const RED = "#ff5c6c";

function Screen({ x, y, w, h, color = CYAN }: { x: number; y: number; w: number; h: number; color?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2} fill="#0d1622" />
      <rect x={x} y={y} width={w} height={h} rx={2} fill={color} opacity={0.12} />
      <rect x={x} y={y} width={w} height={h} rx={2} fill="none" stroke={color} strokeOpacity={0.5} strokeWidth={0.8} />
    </g>
  );
}

export const stationArt: Record<string, ArtDef> = {
  hatch: {
    w: 120,
    h: 150,
    render: (u) => (
      <g>
        <rect x="0" y="0" width="120" height="150" rx="16" fill={PANEL_L} />
        <rect x="8" y="8" width="104" height="142" rx="12" fill={HULL_D} />
        <rect x="16" y="16" width="88" height="134" rx="10" fill={HULL} />
        <path d="M60 16h34a10 10 0 0 1 10 10v124H60z" fill="#000" opacity={0.07} />
        <circle cx="60" cy="72" r="30" fill={HULL_D} />
        <circle cx="60" cy="72" r="24" fill={PANEL} />
        <circle cx="60" cy="72" r="24" fill="none" stroke={CYAN} strokeOpacity={0.5} strokeWidth={1.2} />
        <g stroke={HULL} strokeWidth={5} strokeLinecap="round">
          <line x1="60" y1="54" x2="60" y2="90" />
          <line x1="42" y1="72" x2="78" y2="72" />
        </g>
        <circle cx="60" cy="72" r="7" fill={HULL} />
        <g fill={ORANGE}>
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M${20 + i * 17} 128l8 0 -6 12h-8z`} />
          ))}
        </g>
        <rect x="16" y="126" width="88" height="2" fill={PANEL} />
        <Glow u={u} k="l" cx={60} cy={4} rx={20} ry={8} color={RED} opacity={0.6} />
        <rect x="52" y="0" width="16" height="6" rx="3" fill={RED} />
      </g>
    ),
  },

  spacesuit: {
    w: 70,
    h: 150,
    render: () => (
      <g>
        <rect x="4" y="2" width="62" height="6" rx="3" fill={PANEL_L} />
        <line x1="35" y1="8" x2="35" y2="18" stroke={PANEL_L} strokeWidth={2} />
        <rect x="22" y="94" width="12" height="46" rx="5" fill="#eef1f4" />
        <rect x="37" y="94" width="12" height="46" rx="5" fill="#dfe4ea" />
        <rect x="20" y="136" width="15" height="12" rx="3" fill={PANEL_L} />
        <rect x="36" y="136" width="15" height="12" rx="3" fill={PANEL_L} />
        <path d="M16 50c0-10 8-16 19-16s19 6 19 16v46H16z" fill="#f3f5f7" />
        <path d="M35 34c11 0 19 6 19 16v46H35z" fill="#000" opacity={0.06} />
        <rect x="24" y="58" width="22" height="14" rx="2" fill={PANEL} />
        <circle cx="29" cy="65" r="2" fill={RED} />
        <circle cx="35" cy="65" r="2" fill={GREEN} />
        <rect x="39" y="62" width="5" height="6" rx="1" fill={CYAN} />
        <rect x="6" y="50" width="11" height="40" rx="5" fill="#eef1f4" />
        <rect x="53" y="50" width="11" height="40" rx="5" fill="#dfe4ea" />
        <rect x="16" y="80" width="38" height="4" fill={ORANGE} />
        <circle cx="35" cy="28" r="15" fill="#eef1f4" />
        <path d="M24 28a11 10 0 0 1 22 0v2a11 8 0 0 1-22 0z" fill="#1c2b3d" />
        <path d="M27 24c3-4 8-5 12-3" stroke={CYAN} strokeOpacity={0.6} strokeWidth={1.6} fill="none" />
      </g>
    ),
  },

  "oxygen-tanks": {
    w: 80,
    h: 110,
    render: () => (
      <g>
        {[
          [16, "#f3f5f7"],
          [40, ORANGE],
          [64, "#f3f5f7"],
        ].map(([x, c], i) => (
          <g key={i}>
            <rect x={(x as number) - 10} y={16} width={20} height={90} rx={10} fill={c as string} />
            <rect x={(x as number) - 10} y={16} width={8} height={90} rx={4} fill="#fff" opacity={0.25} />
            <rect x={(x as number) - 3} y={6} width={6} height={12} fill={HULL_D} />
            <rect x={(x as number) - 6} y={4} width={12} height={4} rx={1} fill={PANEL_L} />
            <rect x={(x as number) - 10} y={50} width={20} height={10} fill={i === 1 ? "#fff" : CYAN} opacity={0.7} />
          </g>
        ))}
        <rect x="0" y="100" width="80" height="10" rx="2" fill={PANEL_L} />
        <rect x="0" y="36" width="80" height="4" fill={PANEL_L} />
      </g>
    ),
  },

  "control-panel": {
    w: 90,
    h: 110,
    grounded: false,
    render: () => (
      <g>
        <rect x="0" y="0" width="90" height="110" rx="6" fill={PANEL} />
        <rect x="4" y="4" width="82" height="102" rx="4" fill={PANEL_D} />
        <Screen x={10} y={10} w={70} h={34} />
        <path d="M14 36l10-10 8 6 12-14 10 8 10-6 12 10" stroke={CYAN} strokeWidth={1.4} fill="none" />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect
            key={i}
            x={12 + (i % 4) * 17}
            y={52 + Math.floor(i / 4) * 14}
            width={12}
            height={8}
            rx={2}
            fill={[CYAN, ORANGE, GREEN, PANEL_L, RED, PANEL_L][i % 6]}
            opacity={i % 6 === 3 || i % 6 === 5 ? 1 : 0.85}
          />
        ))}
        <rect x="12" y="94" width="66" height="4" rx="2" fill={PANEL_L} />
        <rect x="12" y="94" width="40" height="4" rx="2" fill={GREEN} />
      </g>
    ),
  },

  beacon: {
    w: 50,
    h: 80,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={25} cy={24} rx={26} color={RED} opacity={0.55} />
        <rect x="8" y="58" width="34" height="22" rx="3" fill={PANEL} />
        <rect x="14" y="52" width="22" height="8" rx="2" fill={PANEL_L} />
        <path d="M13 52V28a12 12 0 0 1 24 0v24z" fill={RED} opacity={0.85} />
        <path d="M17 50V30a8 8 0 0 1 8-8" stroke="#fff" strokeOpacity={0.5} strokeWidth={2} fill="none" />
        <g className="animate-twinkle">
          <circle cx="25" cy="36" r="5" fill="#ffd0d6" />
        </g>
      </g>
    ),
  },

  console: {
    w: 200,
    h: 96,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={100} cy={30} rx={100} ry={30} color={CYAN} opacity={0.25} />
        <path d="M10 52h180l-10 44H20z" fill={PANEL} />
        <path d="M100 52h90l-10 44h-80z" fill="#000" opacity={0.15} />
        <path d="M0 40h200l-10 14H10z" fill={PANEL_L} />
        <path d="M6 40h188" stroke={CYAN} strokeOpacity={0.6} strokeWidth={1} />
        <Screen x={20} y={2} w={48} h={32} />
        <Screen x={76} y={0} w={48} h={34} color={GREEN} />
        <Screen x={132} y={2} w={48} h={32} color={ORANGE} />
        <path d="M26 26l8-8 6 4 10-10 12 8" stroke={CYAN} strokeWidth={1.2} fill="none" />
        <circle cx="100" cy="17" r="10" fill="none" stroke={GREEN} strokeWidth={1} />
        <circle cx="100" cy="17" r="4" fill="none" stroke={GREEN} strokeWidth={1} />
        <line x1="100" y1="17" x2="108" y2="11" stroke={GREEN} strokeWidth={1.2} />
        <g fill={ORANGE} opacity={0.8}>
          <rect x="138" y="24" width="4" height="6" />
          <rect x="145" y="18" width="4" height="12" />
          <rect x="152" y="12" width="4" height="18" />
          <rect x="159" y="20" width="4" height="10" />
          <rect x="166" y="8" width="4" height="22" />
        </g>
        {Array.from({ length: 16 }).map((_, i) => (
          <rect key={i} x={24 + i * 9.6} y={45} width={6} height={4} rx={1} fill={[CYAN, PANEL_D, ORANGE, PANEL_D, GREEN][i % 5]} />
        ))}
      </g>
    ),
  },

  "captain-chair": {
    w: 90,
    h: 120,
    render: () => (
      <g>
        <path d="M30 120l6-30h18l6 30z" fill={PANEL_L} />
        <rect x="18" y="4" width="54" height="72" rx="14" fill="#e9edf1" />
        <rect x="24" y="10" width="42" height="60" rx="10" fill={PANEL} />
        <rect x="41" y="14" width="8" height="52" rx="4" fill={CYAN} opacity={0.35} />
        <rect x="12" y="68" width="66" height="22" rx="8" fill="#e9edf1" />
        <rect x="0" y="54" width="18" height="30" rx="6" fill={HULL_D} />
        <rect x="72" y="54" width="18" height="30" rx="6" fill={HULL_D} />
        <rect x="3" y="58" width="12" height="6" rx="2" fill={PANEL} />
        <circle cx="6" cy="61" r="1.4" fill={GREEN} />
        <circle cx="11" cy="61" r="1.4" fill={RED} />
        <rect x="75" y="58" width="12" height="6" rx="2" fill={CYAN} opacity={0.7} />
      </g>
    ),
  },

  "holo-planet": {
    w: 100,
    h: 130,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={50} cy={50} rx={50} color={CYAN} opacity={0.35} />
        <path d="M30 110L20 60h60l-10 50z" fill={CYAN} opacity={0.08} />
        <circle cx="50" cy="50" r="30" fill={CYAN} opacity={0.18} />
        <circle cx="50" cy="50" r="30" fill="none" stroke={CYAN} strokeWidth={1.4} />
        <ellipse cx="50" cy="50" rx="30" ry="10" fill="none" stroke={CYAN} strokeOpacity={0.6} strokeWidth={1} />
        <ellipse cx="50" cy="50" rx="12" ry="30" fill="none" stroke={CYAN} strokeOpacity={0.6} strokeWidth={1} />
        <ellipse cx="50" cy="50" rx="46" ry="12" fill="none" stroke={MAGENTA} strokeWidth={1.4} transform="rotate(-18 50 50)" />
        <circle cx="90" cy="38" r="3" fill={MAGENTA} />
        <rect x="24" y="110" width="52" height="12" rx="4" fill={PANEL_L} />
        <rect x="16" y="120" width="68" height="10" rx="3" fill={PANEL} />
        <ellipse cx="50" cy="110" rx="26" ry="3" fill={CYAN} opacity={0.8} />
      </g>
    ),
  },

  radar: {
    w: 100,
    h: 124,
    render: (u) => (
      <g>
        <rect x="40" y="96" width="20" height="18" fill={PANEL_L} />
        <rect x="20" y="112" width="60" height="12" rx="3" fill={PANEL} />
        <circle cx="50" cy="50" r="48" fill={PANEL} />
        <circle cx="50" cy="50" r="42" fill="#0b1a14" />
        <g fill="none" stroke={GREEN} strokeOpacity={0.45} strokeWidth={1}>
          <circle cx="50" cy="50" r="30" />
          <circle cx="50" cy="50" r="16" />
          <line x1="8" y1="50" x2="92" y2="50" />
          <line x1="50" y1="8" x2="50" y2="92" />
        </g>
        <defs>
          <linearGradient id={`${u}-sw`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={GREEN} stopOpacity={0} />
            <stop offset="100%" stopColor={GREEN} stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <path d="M50 50L50 8a42 42 0 0 1 36 20z" fill={`url(#${u}-sw)`} />
        <circle cx="70" cy="34" r="2.6" fill={GREEN} />
        <circle cx="32" cy="64" r="2" fill={GREEN} opacity={0.7} />
        <circle cx="60" cy="72" r="2" fill={ORANGE} />
      </g>
    ),
  },

  "star-chart": {
    w: 130,
    h: 90,
    grounded: false,
    render: () => (
      <g>
        <rect x="0" y="0" width="130" height="90" rx="6" fill={PANEL} />
        <Screen x={5} y={5} w={120} h={80} color={MAGENTA} />
        {[
          [20, 20],
          [38, 30],
          [30, 52],
          [58, 44],
          [76, 22],
          [96, 36],
          [110, 60],
          [84, 66],
          [52, 70],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.6 : 1.6} fill="#f1e6ff" />
        ))}
        <path d="M20 20L38 30 58 44 76 22 96 36 110 60 84 66 52 70 30 52 38 30" stroke={MAGENTA} strokeOpacity={0.6} strokeWidth={0.8} fill="none" />
        <circle cx="58" cy="44" r="8" fill="none" stroke={CYAN} strokeWidth={1} />
      </g>
    ),
  },

  microscope: {
    w: 70,
    h: 100,
    render: () => (
      <g>
        <rect x="6" y="90" width="58" height="10" rx="3" fill={PANEL} />
        <path d="M44 90V50c0-10-4-16-12-20" stroke="#e9edf1" strokeWidth={8} fill="none" strokeLinecap="round" />
        <rect x="12" y="64" width="38" height="5" rx="2" fill={PANEL_L} />
        <circle cx="30" cy="66" r="2" fill={CYAN} />
        <g transform="rotate(-24 26 30)">
          <rect x="20" y="4" width="12" height="44" rx="3" fill="#f3f5f7" />
          <rect x="18" y="0" width="16" height="8" rx="2" fill={PANEL_L} />
          <rect x="22" y="46" width="8" height="8" fill={HULL_D} />
        </g>
        <circle cx="48" cy="58" r="5" fill={HULL_D} />
      </g>
    ),
  },

  "test-tubes": {
    w: 100,
    h: 80,
    render: (u) => {
      const tubes = [CYAN, MAGENTA, GREEN, ORANGE, CYAN, RED];
      return (
        <g>
          <Glow u={u} k="g" cx={50} cy={50} rx={50} ry={26} color={MAGENTA} opacity={0.2} />
          {tubes.map((c, i) => {
            const x = 12 + i * 15;
            const level = 30 + ((i * 11) % 22);
            return (
              <g key={i}>
                <rect x={x - 5} y={4} width={10} height={64} rx={5} fill="#d6e6f0" opacity={0.3} />
                <rect x={x - 5} y={level} width={10} height={68 - level} rx={5} fill={c} opacity={0.85} />
                <rect x={x - 3} y={8} width={2} height={54} fill="#fff" opacity={0.4} />
              </g>
            );
          })}
          <rect x="0" y="40" width="100" height="6" rx="2" fill={HULL} />
          <rect x="0" y="68" width="100" height="12" rx="3" fill={PANEL_L} />
        </g>
      );
    },
  },

  dna: {
    w: 70,
    h: 150,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={35} cy={64} rx={36} ry={64} color={MAGENTA} opacity={0.3} />
        <path d="M20 130L12 20h46l-8 110z" fill={MAGENTA} opacity={0.06} />
        {Array.from({ length: 14 }).map((_, i) => {
          const y = 12 + i * 8.4;
          const a = r2(Math.sin(i * 0.7) * 20);
          return (
            <g key={i}>
              <line x1={35 - a} y1={y} x2={35 + a} y2={y} stroke={i % 2 ? CYAN : MAGENTA} strokeOpacity={0.7} strokeWidth={1.6} />
              <circle cx={35 - a} cy={y} r={3} fill={MAGENTA} />
              <circle cx={35 + a} cy={y} r={3} fill={CYAN} />
            </g>
          );
        })}
        <rect x="14" y="130" width="42" height="10" rx="3" fill={PANEL_L} />
        <rect x="8" y="138" width="54" height="12" rx="3" fill={PANEL} />
        <ellipse cx="35" cy="130" rx="21" ry="2.6" fill={MAGENTA} opacity={0.8} />
      </g>
    ),
  },

  "specimen-tank": {
    w: 70,
    h: 150,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={35} cy={76} rx={36} ry={60} color={GREEN} opacity={0.3} />
        <rect x="4" y="134" width="62" height="16" rx="3" fill={PANEL} />
        <rect x="4" y="0" width="62" height="16" rx="3" fill={PANEL} />
        <rect x="10" y="16" width="50" height="118" fill={GREEN} opacity={0.22} />
        <rect x="10" y="16" width="50" height="118" fill="none" stroke="#bfeecf" strokeOpacity={0.5} />
        <path d="M35 48c10 0 14 10 12 20-2 12-8 18-12 30-4-12-10-18-12-30-2-10 2-20 12-20z" fill="#7fbf8e" />
        <path d="M30 96c-4 8-8 12-14 14M40 96c4 8 8 12 14 14M35 100v20" stroke="#7fbf8e" strokeWidth={2} fill="none" />
        <circle cx="31" cy="62" r="2" fill="#1b2230" />
        <circle cx="39" cy="62" r="2" fill="#1b2230" />
        <g fill="#d6ffe2" opacity={0.7}>
          <circle cx="18" cy="40" r="2" />
          <circle cx="52" cy="84" r="1.6" />
          <circle cx="20" cy="110" r="1.4" />
          <circle cx="50" cy="30" r="1.2" />
        </g>
        <rect x="14" y="20" width="4" height="110" fill="#fff" opacity={0.2} />
      </g>
    ),
  },

  "robot-arm": {
    w: 100,
    h: 120,
    render: () => (
      <g>
        <rect x="10" y="104" width="50" height="16" rx="4" fill={PANEL} />
        <rect x="24" y="92" width="22" height="14" rx="3" fill={PANEL_L} />
        <path d="M35 94L30 50" stroke="#f3f5f7" strokeWidth={12} strokeLinecap="round" />
        <path d="M30 50L72 30" stroke="#e3e8ee" strokeWidth={10} strokeLinecap="round" />
        <circle cx="35" cy="94" r="8" fill={ORANGE} />
        <circle cx="30" cy="50" r="8" fill={ORANGE} />
        <circle cx="72" cy="30" r="6" fill={ORANGE} />
        <path d="M76 30l10-8M76 30l12 4" stroke={HULL_D} strokeWidth={4} strokeLinecap="round" />
        <circle cx="30" cy="50" r="3" fill={PANEL} />
        <circle cx="35" cy="94" r="3" fill={PANEL} />
      </g>
    ),
  },

  centrifuge: {
    w: 90,
    h: 70,
    render: () => (
      <g>
        <rect x="4" y="24" width="82" height="46" rx="8" fill="#e9edf1" />
        <rect x="45" y="24" width="41" height="46" rx="8" fill="#000" opacity={0.06} />
        <path d="M8 26c0-14 16-22 37-22s37 8 37 22z" fill="#cfd6de" />
        <path d="M20 22c0-8 12-12 25-12s25 4 25 12z" fill={CYAN} opacity={0.35} />
        <rect x="14" y="40" width="30" height="12" rx="2" fill={PANEL} />
        <text x="17" y="49" fontSize="8" fill={GREEN} fontFamily="monospace">
          4200
        </text>
        <circle cx="58" cy="46" r="5" fill={PANEL_L} />
        <circle cx="72" cy="46" r="5" fill={GREEN} opacity={0.8} />
      </g>
    ),
  },

  "bunk-pod": {
    w: 180,
    h: 96,
    render: (u) => (
      <g>
        <rect x="0" y="0" width="180" height="96" rx="18" fill={HULL} />
        <rect x="8" y="8" width="164" height="72" rx="14" fill={PANEL_D} />
        <Glow u={u} k="g" cx={90} cy={20} rx={70} ry={18} color={CYAN} opacity={0.35} />
        <rect x="14" y="48" width="152" height="28" rx="8" fill="#5a6d8a" />
        <rect x="14" y="48" width="152" height="6" rx="3" fill="#6f84a3" />
        <rect x="20" y="38" width="36" height="14" rx="6" fill="#eef1f4" />
        <rect x="120" y="54" width="46" height="22" rx="6" fill="#48597a" />
        <rect x="8" y="80" width="164" height="16" rx="6" fill={HULL_D} />
        <rect x="80" y="84" width="20" height="6" rx="3" fill={CYAN} opacity={0.6} />
      </g>
    ),
  },

  locker: {
    w: 80,
    h: 156,
    render: () => (
      <g>
        {[0, 40].map((x, i) => (
          <g key={x}>
            <rect x={x + 1} y="0" width="38" height="156" rx="3" fill={i ? HULL_D : HULL} />
            <g fill={PANEL_L}>
              {[12, 18, 24].map((y) => (
                <rect key={y} x={x + 8} y={y} width={22} height={3} rx={1} />
              ))}
            </g>
            <rect x={x + 30} y={70} width={4} height={18} rx={2} fill={PANEL} />
            <rect x={x + 8} y={120} width={22} height={10} rx={2} fill={i ? ORANGE : CYAN} opacity={0.75} />
          </g>
        ))}
      </g>
    ),
  },

  "food-dispenser": {
    w: 80,
    h: 130,
    render: (u) => (
      <g>
        <rect x="2" y="0" width="76" height="130" rx="8" fill={HULL} />
        <rect x="40" y="0" width="38" height="130" rx="8" fill="#000" opacity={0.06} />
        <Screen x={12} y={10} w={56} h={30} color={ORANGE} />
        <g fill={ORANGE} opacity={0.8}>
          <rect x="18" y="16" width="20" height="3" rx="1" />
          <rect x="18" y="23" width="30" height="3" rx="1" />
          <rect x="18" y="30" width="14" height="3" rx="1" />
        </g>
        <rect x="14" y="52" width="52" height="44" rx="6" fill={PANEL_D} />
        <Glow u={u} k="g" cx={40} cy={74} rx={24} ry={18} color={ORANGE} opacity={0.35} />
        <path d="M30 90h20l-2-16H32z" fill="#f3f5f7" />
        <path d="M36 70c-2-4 2-6 0-10M44 70c-2-4 2-6 0-10" stroke="#fff" strokeOpacity={0.6} strokeWidth={1.2} fill="none" />
        <g>
          {[20, 34, 48].map((x, i) => (
            <circle key={x} cx={x + 6} cy={110} r={5} fill={[CYAN, GREEN, RED][i]} opacity={0.8} />
          ))}
        </g>
      </g>
    ),
  },

  "plant-pod": {
    w: 70,
    h: 110,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={35} cy={30} rx={34} ry={30} color="#b9ff9a" opacity={0.25} />
        <rect x="8" y="80" width="54" height="30" rx="6" fill={HULL} />
        <rect x="8" y="80" width="54" height="6" rx="3" fill={GREEN} opacity={0.7} />
        <path d="M8 84V40a27 27 0 0 1 54 0v44z" fill="#d6f5ff" opacity={0.15} />
        <path d="M8 84V40a27 27 0 0 1 54 0v44" fill="none" stroke="#d6f5ff" strokeOpacity={0.5} />
        <g fill="#5fbf6a">
          <path d="M35 80c-12-8-20-24-16-40 10 8 16 22 16 40z" />
          <path d="M35 80c10-10 18-28 14-44-10 10-16 26-14 44z" />
          <path d="M35 80c-2-18 0-40 2-56 6 18 4 38-2 56z" fill="#77d27f" />
        </g>
      </g>
    ),
  },

  reactor: {
    w: 130,
    h: 170,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={65} cy={86} rx={66} ry={80} color={CYAN} opacity={0.4} />
        <rect x="10" y="150" width="110" height="20" rx="4" fill={PANEL} />
        <rect x="10" y="0" width="110" height="20" rx="4" fill={PANEL} />
        <rect x="24" y="20" width="82" height="130" fill={PANEL_D} />
        <rect x="40" y="20" width="50" height="130" fill={CYAN} opacity={0.25} />
        <g className="animate-twinkle">
          <rect x="52" y="20" width="26" height="130" fill={CYAN} opacity={0.55} />
        </g>
        <rect x="60" y="20" width="10" height="130" fill="#e6fdff" opacity={0.8} />
        {[40, 70, 100, 130].map((y) => (
          <rect key={y} x="18" y={y} width="94" height="8" rx="2" fill={HULL_D} />
        ))}
        <rect x="24" y="20" width="16" height="130" fill={PANEL_L} />
        <rect x="90" y="20" width="16" height="130" fill={PANEL_L} />
        <g fill={ORANGE}>
          <rect x="28" y="156" width="10" height="8" rx="1" />
          <rect x="92" y="156" width="10" height="8" rx="1" />
        </g>
      </g>
    ),
  },

  valve: {
    w: 110,
    h: 120,
    render: () => (
      <g>
        <rect x="14" y="0" width="16" height="120" fill={HULL_D} />
        <rect x="80" y="0" width="16" height="120" fill="#8a94a2" />
        <rect x="14" y="54" width="82" height="16" fill={HULL_D} />
        {[20, 100].map((y) => (
          <g key={y}>
            <rect x="10" y={y} width="24" height="6" rx="1" fill={PANEL_L} />
            <rect x="76" y={y} width="24" height="6" rx="1" fill={PANEL_L} />
          </g>
        ))}
        <circle cx="55" cy="62" r="24" fill="none" stroke={RED} strokeWidth={5} />
        <g stroke={RED} strokeWidth={4}>
          <line x1="55" y1="38" x2="55" y2="86" />
          <line x1="31" y1="62" x2="79" y2="62" />
        </g>
        <circle cx="55" cy="62" r="6" fill={PANEL} />
        <circle cx="96" cy="30" r="10" fill="#f3f5f7" />
        <circle cx="96" cy="30" r="10" fill="none" stroke={PANEL_L} strokeWidth={2} />
        <line x1="96" y1="30" x2="101" y2="24" stroke={RED} strokeWidth={1.6} />
      </g>
    ),
  },

  turbine: {
    w: 130,
    h: 130,
    render: (u) => (
      <g>
        <rect x="6" y="110" width="118" height="20" rx="4" fill={PANEL} />
        <circle cx="65" cy="62" r="58" fill={HULL_D} />
        <circle cx="65" cy="62" r="50" fill={PANEL_D} />
        <Glow u={u} k="g" cx={65} cy={62} rx={46} color={ORANGE} opacity={0.35} />
        <g fill="#8a94a2">
          {Array.from({ length: 8 }).map((_, i) => (
            <path key={i} d="M65 62c4-12 14-30 20-40-10 2-20 14-22 38z" transform={`rotate(${i * 45} 65 62)`} />
          ))}
        </g>
        <circle cx="65" cy="62" r="10" fill={HULL} />
        <circle cx="65" cy="62" r="4" fill={ORANGE} />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          return <circle key={i} cx={r2(65 + Math.cos(a) * 54)} cy={r2(62 + Math.sin(a) * 54)} r={1.8} fill={PANEL_L} />;
        })}
      </g>
    ),
  },

  droid: {
    w: 70,
    h: 110,
    render: (u) => (
      <g>
        <ellipse cx="35" cy="104" rx="22" ry="5" fill={PANEL} />
        <path d="M14 58h42l-4 42H18z" fill="#e9edf1" />
        <path d="M35 58h21l-4 42H35z" fill="#000" opacity={0.07} />
        <rect x="20" y="70" width="30" height="10" rx="3" fill={PANEL} />
        <rect x="24" y="73" width="8" height="4" rx="1" fill={CYAN} />
        <rect x="36" y="73" width="10" height="4" rx="1" fill={ORANGE} />
        <path d="M8 60c-6 10-6 22 0 30M62 60c6 10 6 22 0 30" stroke={HULL_D} strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d="M10 56c0-22 12-38 25-38s25 16 25 38z" fill="#f3f5f7" />
        <rect x="16" y="32" width="38" height="16" rx="8" fill={PANEL_D} />
        <Glow u={u} k="e" cx={35} cy={40} rx={16} ry={8} color={CYAN} opacity={0.5} />
        <circle cx="27" cy="40" r="3.6" fill={CYAN} />
        <circle cx="43" cy="40" r="3.6" fill={CYAN} />
        <line x1="35" y1="18" x2="35" y2="6" stroke={HULL_D} strokeWidth={2} />
        <circle cx="35" cy="5" r="3" fill={RED} />
      </g>
    ),
  },

  gauge: {
    w: 70,
    h: 70,
    grounded: false,
    render: () => (
      <g>
        <circle cx="35" cy="35" r="34" fill={HULL_D} />
        <circle cx="35" cy="35" r="28" fill="#f3f5f7" />
        <path d="M13 45a24 24 0 0 1 44 0" fill="none" stroke={GREEN} strokeWidth={4} />
        <path d="M48 20a24 24 0 0 1 9 25" fill="none" stroke={RED} strokeWidth={4} />
        <line x1="35" y1="40" x2="50" y2="22" stroke={PANEL} strokeWidth={2.6} strokeLinecap="round" />
        <circle cx="35" cy="40" r="4" fill={PANEL} />
        <rect x="24" y="50" width="22" height="7" rx="1.5" fill={PANEL} />
      </g>
    ),
  },

  "lounge-chair": {
    w: 120,
    h: 80,
    render: () => (
      <g>
        <path d="M20 80l8-14h64l8 14" stroke={HULL_D} strokeWidth={4} fill="none" />
        <path d="M8 40c0-24 12-36 30-36 12 0 16 10 18 30h52c6 0 10 4 10 10v10c0 8-4 12-12 12H22C12 66 8 56 8 40z" fill="#eef1f4" />
        <path d="M56 34h52c6 0 10 4 10 10v10c0 8-4 12-12 12H56z" fill="#000" opacity={0.06} />
        <path d="M18 40c0-18 8-26 20-26 8 0 12 8 12 24z" fill={PANEL_L} />
        <rect x="52" y="38" width="60" height="14" rx="6" fill={PANEL_L} />
        <rect x="52" y="50" width="60" height="2" fill={CYAN} opacity={0.6} />
      </g>
    ),
  },

  "satellite-model": {
    w: 120,
    h: 110,
    render: () => (
      <g>
        <rect x="40" y="96" width="40" height="14" rx="3" fill={PANEL} />
        <line x1="60" y1="96" x2="60" y2="64" stroke={HULL_D} strokeWidth={3} />
        <g transform="rotate(-14 60 44)">
          <rect x="2" y="30" width="36" height="24" fill="#2a4a8a" />
          <rect x="82" y="30" width="36" height="24" fill="#2a4a8a" />
          <g stroke="#6f95d8" strokeWidth={0.8}>
            <line x1="14" y1="30" x2="14" y2="54" />
            <line x1="26" y1="30" x2="26" y2="54" />
            <line x1="2" y1="42" x2="38" y2="42" />
            <line x1="94" y1="30" x2="94" y2="54" />
            <line x1="106" y1="30" x2="106" y2="54" />
            <line x1="82" y1="42" x2="118" y2="42" />
          </g>
          <line x1="38" y1="42" x2="82" y2="42" stroke={HULL_D} strokeWidth={2} />
          <rect x="46" y="28" width="28" height="30" rx="3" fill="#d9b262" />
          <path d="M60 28c-10-4-14-14-10-22 8 2 14 10 10 22z" fill="#eef1f4" />
          <line x1="60" y1="28" x2="54" y2="12" stroke={HULL_D} strokeWidth={1.2} />
        </g>
      </g>
    ),
  },

  "space-telescope": {
    w: 110,
    h: 130,
    render: () => (
      <g>
        <rect x="30" y="112" width="50" height="18" rx="4" fill={PANEL} />
        <rect x="50" y="70" width="10" height="44" fill={HULL_D} />
        <circle cx="55" cy="70" r="8" fill={PANEL_L} />
        <g transform="rotate(-32 55 62)">
          <rect x="8" y="50" width="96" height="26" rx="6" fill="#eef1f4" />
          <rect x="8" y="50" width="96" height="10" rx="5" fill="#fff" opacity={0.6} />
          <rect x="96" y="46" width="14" height="34" rx="4" fill={PANEL_L} />
          <ellipse cx="110" cy="63" rx="3" ry="15" fill={CYAN} opacity={0.7} />
          <rect x="36" y="48" width="6" height="30" fill={ORANGE} />
          <rect x="0" y="56" width="10" height="14" rx="3" fill={PANEL} />
        </g>
      </g>
    ),
  },

  "med-pod": {
    w: 180,
    h: 90,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={90} cy={40} rx={90} ry={34} color={CYAN} opacity={0.3} />
        <rect x="30" y="68" width="120" height="22" rx="4" fill={PANEL} />
        <path d="M6 60c0-10 6-16 16-16h136c10 0 16 6 16 16v10H6z" fill="#eef1f4" />
        <path d="M14 46c0-26 34-42 76-42s76 16 76 42z" fill={CYAN} opacity={0.18} />
        <path d="M14 46c0-26 34-42 76-42s76 16 76 42" fill="none" stroke="#bff6ff" strokeOpacity={0.7} />
        <rect x="18" y="40" width="144" height="10" rx="5" fill="#dfe4ea" />
        <rect x="22" y="32" width="28" height="10" rx="5" fill="#fff" />
        <rect x="70" y="72" width="40" height="6" rx="3" fill={GREEN} opacity={0.7} />
        <path d="M40 18l10-8" stroke="#fff" strokeOpacity={0.5} strokeWidth={3} strokeLinecap="round" />
      </g>
    ),
  },

  "body-scanner": {
    w: 90,
    h: 160,
    render: (u) => (
      <g>
        <Glow u={u} k="g" cx={45} cy={80} rx={40} ry={70} color={CYAN} opacity={0.25} />
        <rect x="4" y="146" width="82" height="14" rx="4" fill={PANEL} />
        <rect x="4" y="0" width="82" height="14" rx="4" fill={PANEL} />
        <rect x="8" y="14" width="8" height="132" fill={HULL} />
        <rect x="74" y="14" width="8" height="132" fill={HULL_D} />
        <g className="animate-twinkle">
          <rect x="16" y="70" width="58" height="3" fill={CYAN} />
        </g>
        <g fill="none" stroke={CYAN} strokeOpacity={0.35} strokeWidth={1.2}>
          <circle cx="45" cy="36" r="9" />
          <path d="M33 52h24l4 40h-8l-2 50h-12l-2-50h-8z" />
        </g>
      </g>
    ),
  },

  medkit: {
    w: 80,
    h: 60,
    render: () => (
      <g>
        <path d="M28 14V6h24v8" stroke={HULL_D} strokeWidth={4} fill="none" />
        <rect x="2" y="14" width="76" height="46" rx="6" fill="#f3f5f7" />
        <rect x="40" y="14" width="38" height="46" rx="6" fill="#000" opacity={0.06} />
        <rect x="2" y="30" width="76" height="4" fill={RED} opacity={0.3} />
        <rect x="34" y="24" width="12" height="28" rx="2" fill={RED} />
        <rect x="26" y="32" width="28" height="12" rx="2" fill={RED} />
      </g>
    ),
  },

  "vitals-monitor": {
    w: 80,
    h: 150,
    render: () => (
      <g>
        <path d="M22 150l18-12 18 12" stroke={PANEL_L} strokeWidth={4} fill="none" />
        <rect x="38" y="60" width="4" height="80" fill={HULL_D} />
        <rect x="2" y="4" width="76" height="60" rx="6" fill={PANEL} />
        <Screen x={7} y={9} w={66} h={50} color={GREEN} />
        <path d="M10 34h12l4-12 6 24 5-16 4 4h28" stroke={GREEN} strokeWidth={1.6} fill="none" />
        <text x="12" y="54" fontSize="9" fill={ORANGE} fontFamily="monospace">
          98
        </text>
        <text x="46" y="54" fontSize="9" fill={CYAN} fontFamily="monospace">
          72
        </text>
      </g>
    ),
  },

  "comms-array": {
    w: 100,
    h: 130,
    render: () => (
      <g>
        <rect x="20" y="110" width="60" height="20" rx="4" fill={PANEL} />
        <rect x="46" y="60" width="8" height="52" fill={HULL_D} />
        <g transform="rotate(-20 50 44)">
          <path d="M10 44a40 40 0 0 0 80 0z" fill="#eef1f4" />
          <path d="M50 44a40 40 0 0 0 40 0z" fill="#000" opacity={0.06} />
          <line x1="50" y1="44" x2="50" y2="10" stroke={HULL_D} strokeWidth={2} />
          <circle cx="50" cy="8" r="4" fill={ORANGE} />
        </g>
        <path d="M78 8a14 14 0 0 1 10 14M82 2a22 22 0 0 1 14 22" stroke={CYAN} strokeWidth={1.6} fill="none" strokeLinecap="round" />
      </g>
    ),
  },
};
