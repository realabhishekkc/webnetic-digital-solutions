"use client";

import { useEffect, useRef } from "react";

// Neural-network particle field with cursor interactivity, drifting code glyphs and a
// morphing focal accent. Canvas 2D for low cost. Pauses off-screen and under reduced motion.

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  glyph?: string;
};

const GLYPHS = ["</>", "{ }", "()", "[]", "#", "AI", "<>", "/>"];

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let glyphNodes: Node[] = [];
    let raf = 0;
    let running = true;
    const mouse = { x: -9999, y: -9999, active: false };
    let intensity = 0; // 0..1, eases up on hover
    let targetIntensity = 0;

    const NODE_COUNT = () => {
      const base = Math.floor((width * height) / 16000);
      return Math.max(28, Math.min(90, base));
    };
    const LINK_DIST = () => Math.min(150, width / 9);

    function resize() {
      const rect = wrap!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function seed() {
      const count = NODE_COUNT();
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.8,
      }));
      glyphNodes = Array.from({ length: Math.max(5, Math.floor(count / 9)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 0,
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      }));
    }

    function drawStatic() {
      // Reduced-motion / fallback: gradient wash + a few static nodes.
      ctx!.clearRect(0, 0, width, height);
      const g = ctx!.createRadialGradient(width * 0.5, height * 0.35, 0, width * 0.5, height * 0.35, height);
      g.addColorStop(0, "rgba(56,182,255,0.10)");
      g.addColorStop(1, "rgba(7,11,20,0)");
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, width, height);
      for (const n of nodes.slice(0, 30)) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(125,211,255,0.5)";
        ctx!.fill();
      }
    }

    function step() {
      if (!running) return;
      intensity += (targetIntensity - intensity) * 0.06;
      const linkDist = LINK_DIST();
      const speedBoost = 1 + intensity * 0.6;
      ctx!.clearRect(0, 0, width, height);

      // soft focal glow that morphs gently (the lightbulb-brain accent)
      const t = Date.now() * 0.0006;
      const fx = width * (0.5 + Math.sin(t) * 0.06);
      const fy = height * (0.4 + Math.cos(t * 0.8) * 0.06);
      const glow = ctx!.createRadialGradient(fx, fy, 0, fx, fy, height * 0.7);
      glow.addColorStop(0, `rgba(56,182,255,${0.08 + intensity * 0.05})`);
      glow.addColorStop(1, "rgba(7,11,20,0)");
      ctx!.fillStyle = glow;
      ctx!.fillRect(0, 0, width, height);

      // update + draw connections
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx * speedBoost;
        n.y += n.vy * speedBoost;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // cursor interaction: gentle attraction within radius, lines brighten near cursor
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d2 = dx * dx + dy * dy;
          const radius = 140;
          if (d2 < radius * radius) {
            const d = Math.sqrt(d2) || 1;
            const force = (1 - d / radius) * 0.6;
            n.vx += (dx / d) * force * 0.04;
            n.vy += (dy / d) * force * 0.04;
          }
        }
        // friction so it never runs away
        n.vx = Math.max(-0.6, Math.min(0.6, n.vx * 0.995));
        n.vy = Math.max(-0.6, Math.min(0.6, n.vy * 0.995));
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            let alpha = (1 - dist / linkDist) * 0.5;
            // brighten lines near the cursor
            if (mouse.active) {
              const mx = (a.x + b.x) / 2 - mouse.x;
              const my = (a.y + b.y) / 2 - mouse.y;
              if (mx * mx + my * my < 160 * 160) alpha = Math.min(1, alpha + 0.35);
            }
            ctx!.strokeStyle = `rgba(56,182,255,${alpha})`;
            ctx!.lineWidth = 0.7;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(125,211,255,${0.7})`;
        ctx!.fill();
      }

      // drifting code glyphs
      ctx!.font = "600 13px ui-monospace, SFMono-Regular, Menlo, monospace";
      for (const g of glyphNodes) {
        g.x += g.vx;
        g.y += g.vy;
        if (g.x < -20) g.x = width + 20;
        if (g.x > width + 20) g.x = -20;
        if (g.y < -20) g.y = height + 20;
        if (g.y > height + 20) g.y = -20;
        ctx!.fillStyle = `rgba(125,211,255,${0.18 + intensity * 0.12})`;
        ctx!.fillText(g.glyph!, g.x, g.y);
      }

      raf = requestAnimationFrame(step);
    }

    function start() {
      if (reduce) {
        drawStatic();
        return;
      }
      cancelAnimationFrame(raf);
      running = true;
      raf = requestAnimationFrame(step);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    // pointer
    const onMove = (e: PointerEvent) => {
      const rect = wrap!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
      targetIntensity = 0;
    };
    const onEnter = () => {
      targetIntensity = 1;
    };

    resize();
    start();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    wrap.addEventListener("pointerenter", onEnter);

    // pause when off-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduce) return;
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.05 }
    );
    io.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (!reduce) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("pointerenter", onEnter);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 -z-10" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* fade the canvas into the page at the edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, transparent 40%, rgba(7,11,20,0.4) 80%, var(--bg) 100%)",
        }}
      />
    </div>
  );
}
