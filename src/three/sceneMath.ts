export interface LogoKeyframe {
  p: number;
  pos: [number, number, number];
  rot: [number, number, number];
  scale: number;
  op: number;
}

export const LOGO_KEYFRAMES: LogoKeyframe[] = [
  { p: 0.0, pos: [0, 0, 0], rot: [0.05, 0.3, 0.02], scale: 1.0, op: 1 },
  { p: 0.12, pos: [0, 0.15, 0], rot: [0.08, 0.6, 0.04], scale: 1.08, op: 1 },
  { p: 0.22, pos: [0, 0.05, 2.6], rot: [0.5, 3.6, 0.35], scale: 2.1, op: 1 },
  { p: 0.34, pos: [0, -0.1, 6.4], rot: [0.9, 6.6, 0.6], scale: 3.7, op: 0.9 },
  { p: 0.42, pos: [0, -0.3, -1.6], rot: [0.3, 8.2, 0.1], scale: 0.85, op: 0.8 },
  { p: 0.58, pos: [3.4, 1.1, -3.2], rot: [0.15, 9.4, 0.05], scale: 0.55, op: 0.5 },
  { p: 0.7, pos: [-3.2, -0.8, -2.6], rot: [0.1, 10.4, 0], scale: 0.6, op: 0.5 },
  { p: 0.82, pos: [-2.6, 0.6, -2.2], rot: [0.08, 11.2, 0], scale: 0.62, op: 0.55 },
  { p: 0.92, pos: [0, 0.1, 1.4], rot: [0.05, 12.4, 0], scale: 1.5, op: 1 },
  { p: 1.0, pos: [0, -0.05, 1.7], rot: [0.03, 12.7, 0], scale: 1.6, op: 1 },
];

export function smootherstep(u: number) {
  const x = Math.min(1, Math.max(0, u));
  return x * x * x * (x * (x * 6 - 15) + 10);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

export function mapRange(
  v: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  clamp = true
) {
  const t = (v - inMin) / (inMax - inMin || 1e-6);
  const u = clamp ? clamp01(t) : t;
  return outMin + (outMax - outMin) * u;
}

export interface SampledPose {
  pos: [number, number, number];
  rot: [number, number, number];
  scale: number;
  op: number;
}

export function sampleLogoPose(t: number): SampledPose {
  const p = clamp01(t);
  let i = 0;
  while (i < LOGO_KEYFRAMES.length - 2 && LOGO_KEYFRAMES[i + 1].p < p) i++;
  const a = LOGO_KEYFRAMES[i];
  const b = LOGO_KEYFRAMES[i + 1];
  const span = b.p - a.p || 1e-6;
  const u = smootherstep((p - a.p) / span);

  return {
    pos: [
      lerp(a.pos[0], b.pos[0], u),
      lerp(a.pos[1], b.pos[1], u),
      lerp(a.pos[2], b.pos[2], u),
    ],
    rot: [
      lerp(a.rot[0], b.rot[0], u),
      lerp(a.rot[1], b.rot[1], u),
      lerp(a.rot[2], b.rot[2], u),
    ],
    scale: lerp(a.scale, b.scale, u),
    op: lerp(a.op, b.op, u),
  };
}
