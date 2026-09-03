"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { heroField } from "@/content/home";

/**
 * The hero's centerpiece: a canvas of ~210 marks, one per person-and-skill.
 * "Before Skillar" they drift as unmeasured noise; flip the state and the
 * columns settle left to right, each mark springing to its assessed height
 * against the mastery threshold. The pointer acts as a soft lens: nearby
 * marks brighten and give way.
 *
 * An enacted metaphor, not a mock dashboard: the only numbers shown are the
 * per-column below-threshold counts, and those are derived from the marks
 * actually drawn. prefers-reduced-motion renders states with instant swaps.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  col: number;
  /** 0..1 assessed level; drives resting height and color. */
  level: number;
  /** Per-particle drift phase offsets. */
  p1: number;
  p2: number;
  size: number;
}

/** Deterministic PRNG so the field is identical every load. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COUNT = 210;
const THRESHOLD = 0.72; // fraction of field height treated as mastery line
/** ms between one column beginning to settle and the next. */
const COLUMN_STAGGER = 120;
const SETTLE_RAMP = 500;

function makeParticles(): Particle[] {
  const rand = mulberry32(20260903);
  return Array.from({ length: COUNT }, () => {
    const col = Math.floor(rand() * heroField.columns.length);
    // A healthy organisation with real gaps: most marks clear the threshold,
    // roughly a quarter sit below it. The gap is the exception the product
    // finds, not the norm.
    const level =
      rand() < 0.24
        ? 0.3 + rand() * 0.38 // below-mastery tail, 0.30-0.68
        : 0.74 + rand() * 0.24; // cleared, 0.74-0.98
    return {
      x: rand(),
      y: rand(),
      vx: 0,
      vy: 0,
      col,
      level: Math.min(level, 0.98),
      p1: rand() * Math.PI * 2,
      p2: rand() * Math.PI * 2,
      size: 2 + rand() * 1.6,
    };
  });
}

export default function HeroField({
  assessed: assessedProp,
  onAssessedChange,
}: {
  /** Controlled mode: the parent (scroll scrub) owns the state. */
  assessed?: boolean;
  onAssessedChange?: (next: boolean) => void;
} = {}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [assessedState, setAssessedState] = useState(false);
  const controlled = assessedProp !== undefined;
  const assessed = controlled ? assessedProp : assessedState;
  const setAssessed = (next: boolean) => {
    if (onAssessedChange) onAssessedChange(next);
    if (!controlled) setAssessedState(next);
  };
  const assessedRef = useRef(false);
  const reducedRef = useRef(false);
  /** When the field last switched into the assessed state. */
  const switchAtRef = useRef(0);

  const particles = useMemo(makeParticles, []);

  /** Honest per-column counts, derived from the marks actually drawn. */
  const belowCounts = useMemo(() => {
    const counts = heroField.columns.map(() => 0);
    for (const p of particles) if (p.level < THRESHOLD) counts[p.col] += 1;
    return counts;
  }, [particles]);

  useEffect(() => {
    if (assessed && !assessedRef.current) {
      switchAtRef.current = performance.now();
    }
    assessedRef.current = assessed;
  }, [assessed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedRef.current = reduced;

    // Authored entrance (uncontrolled mode only): the field assesses itself
    // once, shortly after load. In controlled mode the scroll scrub owns it.
    const entrance = controlled
      ? 0
      : window.setTimeout(() => setAssessed(true), reduced ? 0 : 1400);

    let W = 0;
    let H = 0;
    const resize = () => {
      const r = wrap.getBoundingClientRect();
      W = r.width;
      H = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const pointer = { x: -9999, y: -9999, active: false };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    const colX = (col: number) => ((col + 0.5) / heroField.columns.length) * W;

    let raf = 0;
    let t = 0;
    const frame = () => {
      t += 0.008;
      const now = performance.now();
      ctx.clearRect(0, 0, W, H);

      // Shared vertical mapping: level 1 rests near the top pad, level 0 at
      // the bottom pad, and the threshold line uses the same scale.
      const padTop = 26;
      const padBottom = 44;
      const yFor = (level: number) => padTop + (1 - level) * (H - padTop - padBottom);
      const thY = yFor(THRESHOLD);

      const isAssessed = assessedRef.current;

      // Threshold line, labelled on the field itself once assessed.
      ctx.strokeStyle = "rgba(255,255,255,0.22)";
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(16, thY);
      ctx.lineTo(W - 16, thY);
      ctx.stroke();
      ctx.setLineDash([]);
      if (isAssessed) {
        ctx.font = "11px var(--font-sans, sans-serif)";
        ctx.textAlign = "right";
        ctx.fillStyle = "rgba(255,255,255,0.55)";
        ctx.fillText(heroField.thresholdLabel, W - 16, thY - 8);
      }

      for (const p of particles) {
        // Columns settle left to right: each column's marks only begin
        // springing home once its stagger delay has elapsed.
        const settleDelay = p.col * COLUMN_STAGGER + p.p1 * 30;
        const sinceSwitch = now - switchAtRef.current - settleDelay;
        const settle = reducedRef.current
          ? 1
          : Math.max(0, Math.min(1, sinceSwitch / SETTLE_RAMP));
        const settling = isAssessed && settle > 0;

        let tx: number;
        let ty: number;
        if (settling) {
          const jitter = Math.sin(p.p1 * 7.3) * 0.09;
          tx = colX(p.col) + jitter * (W / heroField.columns.length) * 1.5;
          ty = yFor(p.level);
        } else {
          tx = (0.5 + 0.42 * Math.sin(t * 0.7 + p.p1) * Math.cos(t * 0.35 + p.p2)) * W;
          ty = (0.5 + 0.4 * Math.sin(t * 0.55 + p.p2) * Math.sin(t * 0.9 + p.p1 * 1.7)) * H;
        }

        if (reducedRef.current) {
          p.x = tx;
          p.y = ty;
        } else {
          // Spring toward the target; the spring stiffens as the column's
          // settle ramp completes, which reads as a cascade.
          const k = settling ? 0.006 + 0.016 * settle : 0.015;
          p.vx += (tx - p.x) * k;
          p.vy += (ty - p.y) * k;

          // Fluid pointer stir.
          if (pointer.active) {
            const dx = p.x - pointer.x;
            const dy = p.y - pointer.y;
            const d2 = dx * dx + dy * dy;
            const R = 110;
            if (d2 < R * R && d2 > 0.01) {
              const d = Math.sqrt(d2);
              const f = ((R - d) / R) * 1.1;
              p.vx += (dx / d) * f;
              p.vy += (dy / d) * f;
            }
          }

          p.vx *= 0.86;
          p.vy *= 0.86;
          p.x += p.vx;
          p.y += p.vy;
        }

        // Pointer lens: marks near the cursor brighten and grow slightly.
        let lens = 0;
        if (pointer.active && !reducedRef.current) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          const R = 130;
          if (d2 < R * R) lens = 1 - Math.sqrt(d2) / R;
        }

        if (isAssessed) {
          ctx.fillStyle =
            p.level < THRESHOLD
              ? `rgba(251, 113, 133, ${Math.min(1, 0.9 + lens * 0.1)})`
              : `rgba(52, 211, 153, ${Math.min(1, 0.75 + lens * 0.25)})`;
        } else {
          ctx.fillStyle = `rgba(148, 163, 184, ${0.5 + lens * 0.35})`;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + lens * 0.45), 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(entrance);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
    // Mount-once canvas setup by design: `controlled` never changes for the
    // life of the component, `particles` is memoized deterministic data, and
    // state reads go through assessedRef.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-2xl bg-[#0B1424] border border-white/10 shadow-2xl shadow-navy/40 text-white overflow-hidden">
      {/* State control */}
      <div className="px-5 sm:px-7 py-4 border-b border-white/10 flex items-center justify-between gap-3 flex-wrap">
        <div
          role="group"
          aria-label="Field state"
          className="inline-flex rounded-full border border-white/15 p-0.5 bg-white/[0.04]"
        >
          {([false, true] as const).map((state) => (
            <button
              key={String(state)}
              type="button"
              onClick={() => setAssessed(state)}
              aria-pressed={assessed === state}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                assessed === state
                  ? "bg-white text-navy font-medium"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {state ? heroField.states.after : heroField.states.before}
            </button>
          ))}
        </div>
      </div>

      {/* Field */}
      <div ref={wrapRef} className="relative h-[340px] sm:h-[420px]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />

        {/* The unmeasured state narrates itself; the scatter alone reads as
            noise. Fades away as the columns take over the storytelling. */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-6 pointer-events-none transition-opacity duration-500 motion-reduce:transition-none ${
            assessed ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden={assessed}
        >
          <div className="max-w-md text-center rounded-xl bg-[#0B1424]/60 px-6 py-5">
            <p className="font-serif text-2xl sm:text-3xl text-white leading-snug text-balance">
              {heroField.beforeOverlay.title}
            </p>
            <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
              {heroField.beforeOverlay.sub}
            </p>
          </div>
        </div>
        {/* Column labels and their honest below-threshold counts surface
            with the assessed state, cascading with the columns. */}
        <div
          className="absolute inset-x-0 bottom-0 grid px-4 pb-3"
          style={{ gridTemplateColumns: `repeat(${heroField.columns.length}, 1fr)` }}
          aria-hidden={!assessed}
        >
          {heroField.columns.map((c, i) => (
            <div
              key={c}
              className={`text-center transition-opacity duration-500 motion-reduce:transition-none ${assessed ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: assessed ? `${i * COLUMN_STAGGER + 250}ms` : "0ms" }}
            >
              <span className="block text-xs text-white/70">{c}</span>
              <span
                className={`block text-[11px] mt-0.5 font-mono tabular ${
                  belowCounts[i] > 0 ? "text-rose-300/90" : "text-emerald-300/80"
                }`}
              >
                {belowCounts[i] > 0 ? `${belowCounts[i]} below` : "clear"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 sm:px-7 py-3.5 border-t border-white/10">
        <p className="text-sm text-white/70 leading-relaxed">{heroField.caption}</p>
      </div>
    </div>
  );
}
