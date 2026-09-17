"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  baseRadius: number;
  color: string;
  alpha: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export default function Quantum404Canvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const particlesRef = useRef<Particle[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const mouseRef = useRef({ x: -2000, y: -2000, isDown: false });
  const animFrameIdRef = useRef<number>(0);

  // Sample points from the text "404"
  const sample404Points = useCallback((width: number, height: number): { x: number; y: number }[] => {
    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return [];

    offscreen.width = width;
    offscreen.height = height;

    const isMobile = width < 640;
    const fontSize = isMobile ? Math.min(width * 0.42, 140) : Math.min(width * 0.3, 210);

    offCtx.font = `800 ${fontSize}px "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";
    offCtx.fillStyle = "#ffffff";
    offCtx.fillText("404", width / 2, height / 2);

    const imgData = offCtx.getImageData(0, 0, width, height);
    const data = imgData.data;
    const points: { x: number; y: number }[] = [];

    // Step size controls particle density
    const step = isMobile ? 8 : 7;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const idx = (y * width + x) * 4;
        if (data[idx + 3] > 128) {
          points.push({
            x: x + (Math.random() - 0.5) * 2,
            y: y + (Math.random() - 0.5) * 2,
          });
        }
      }
    }

    return points;
  }, []);

  const initSimulation = useCallback((width: number, height: number) => {
    const points = sample404Points(width, height);
    const colors = [
      "79, 70, 229",   // Indigo
      "99, 102, 241",  // Slate Indigo
      "124, 58, 237",  // Violet
      "2, 132, 199",   // Sky
      "168, 85, 247",  // Purple
    ];

    const particles: Particle[] = points.map((pt) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 60 + 20;
      return {
        x: pt.x + Math.cos(angle) * dist,
        y: pt.y + Math.sin(angle) * dist,
        homeX: pt.x,
        homeY: pt.y,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        baseRadius: Math.random() * 1.5 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.35 + 0.65,
      };
    });

    particlesRef.current = particles;
  }, [sample404Points]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      initSimulation(rect.width, rect.height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const loop = () => {
      time += 0.02;
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const springK = 0.08;
      const damping = 0.86;
      const mouseRadius = mouse.isDown ? 160 : 110;

      // Update and render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Spring force to home position in "404"
        const dxHome = p.homeX - p.x;
        const dyHome = p.homeY - p.y;
        p.vx += dxHome * springK;
        p.vy += dyHome * springK;

        // 2. Gentle organic drift
        p.vx += Math.sin(time + p.homeX * 0.04) * 0.08;
        p.vy += Math.cos(time + p.homeY * 0.04) * 0.08;

        // 3. Cursor repulsion & swirl
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouseRadius && distMouse > 1) {
          const force = (1 - distMouse / mouseRadius) * (mouse.isDown ? 12 : 6);
          p.vx += (dxMouse / distMouse) * force;
          p.vy += (dyMouse / distMouse) * force;

          // Subtle tangential swirl
          p.vx += (-dyMouse / distMouse) * force * 0.25;
          p.vy += (dxMouse / distMouse) * force * 0.25;
        }

        // Apply velocity & damping
        p.vx *= damping;
        p.vy *= damping;
        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();

        // Soft ambient aura
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseRadius * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha * 0.12})`;
        ctx.fill();
      }

      // Connecting filaments between close particles
      const maxConnectDist = w < 640 ? 18 : 22;
      for (let i = 0; i < particles.length; i += 2) {
        for (let j = i + 1; j < particles.length; j += 2) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectDist * maxConnectDist) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxConnectDist) * 0.3;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Shockwave ripples
      const shockwaves = shockwavesRef.current;
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 5.5;
        sw.alpha -= 0.024;

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(79, 70, 229, ${sw.alpha * 0.5})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Disperse particles near the wave
          for (let j = 0; j < particles.length; j++) {
            const p = particles[j];
            const dx = p.x - sw.x;
            const dy = p.y - sw.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (Math.abs(d - sw.radius) < 25 && d > 1) {
              const push = (1 - Math.abs(d - sw.radius) / 25) * 4;
              p.vx += (dx / d) * push;
              p.vy += (dy / d) * push;
            }
          }
        }
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [initSimulation]);

  // Pointer interaction handlers
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  };

  const handlePointerLeave = () => {
    mouseRef.current.x = -2000;
    mouseRef.current.y = -2000;
    mouseRef.current.isDown = false;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current.isDown = true;
    shockwavesRef.current.push({
      x,
      y,
      radius: 5,
      maxRadius: 200,
      alpha: 1,
    });
  };

  const handlePointerUp = () => {
    mouseRef.current.isDown = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="relative w-full h-[240px] sm:h-[300px] md:h-[340px] rounded-2xl sm:rounded-3xl border border-navy-100/80 bg-white/70 backdrop-blur-md shadow-sm overflow-hidden select-none cursor-pointer transition-shadow duration-300 hover:shadow-md"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
