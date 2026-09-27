import type { ReactNode } from "react";

/** Soft radial light glow. */
export function Glow({
  u,
  k,
  cx,
  cy,
  rx,
  ry,
  color,
  opacity = 0.6,
}: {
  u: string;
  k: string;
  cx: number;
  cy: number;
  rx: number;
  ry?: number;
  color: string;
  opacity?: number;
}) {
  const id = `${u}-${k}`;
  return (
    <g>
      <defs>
        <radialGradient id={id}>
          <stop offset="0%" stopColor={color} stopOpacity={opacity} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry ?? rx} fill={`url(#${id})`} />
    </g>
  );
}

/** Vertical linear gradient definition; returns the url() reference via children callback. */
export function VGrad({ id, from, to }: { id: string; from: string; to: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={from} />
        <stop offset="100%" stopColor={to} />
      </linearGradient>
    </defs>
  );
}

export function HGrad({ id, from, to }: { id: string; from: string; to: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={from} />
        <stop offset="100%" stopColor={to} />
      </linearGradient>
    </defs>
  );
}

/** Animated candle / torch flame. */
export function Flame({ x, y, s = 1 }: { x: number; y: number; s?: number }): ReactNode {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="animate-flicker" style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}>
        <path d="M0 -14c4 5 5 8 4 11-.6 2.2-2.2 3-4 3s-3.4-.8-4-3c-1-3 0-6 4-11z" fill="#ff9d2e" />
        <path d="M0 -8c2 3 2.6 4.6 2 6.2-.4 1.1-1.1 1.6-2 1.6s-1.6-.5-2-1.6c-.6-1.6 0-3.2 2-6.2z" fill="#ffe7a3" />
      </g>
    </g>
  );
}

/** Simple candle with flame; (x, y) is the base. */
export function Candle({ x, y, h = 16, w = 5 }: { x: number; y: number; h?: number; w?: number }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - h} width={w} height={h} rx={1} fill="#efe6d2" />
      <rect x={x - w / 2} y={y - h} width={w / 2.5} height={h} rx={1} fill="#fff8e8" opacity={0.7} />
      <Flame x={x} y={y - h - 0.5} s={w / 7} />
    </g>
  );
}

/** Round to 2 decimals so server and client render identical attribute strings. */
export function r2(n: number) {
  return Math.round(n * 100) / 100;
}
