"use client";

import { useEffect, useRef } from "react";

// Pseudo-3D neural-network field. Nodes carry depth (z); the whole field parallax-tilts
// toward the cursor for a 3D feel, nodes are repelled by the pointer, connections and a
// cursor halo brighten on hover. Canvas 2D (cheap), 60fps, pauses off-screen, reduced-motion safe.

type Node = {
  bx: number; // base x
  by: number; // base y
  z: number; // depth 0.25..1 (1 = nearest)
  vx: number;
  vy: number;
  ox: number; // live offset from repulsion
  oy: number;
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

    // pointer + smoothed tilt for the 3D parallax
    const mouse = { x: -9999, y: -9999, active: false };
    const tilt = { x: 0, y: 0 }; // smoothed normalised -1..1
    const tiltTarget = { x: 0, y: 0 };
    let intensity = 0;
    let targetIntensity = 0;

    const NODE_COUNT = () => {
      const base = Math.floor((width * height) / 15000);
      return Math.max(30, Math.min(96, base));
    };
    const LINK_DIST = () => Math.min(160, width / 8.5);

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
      nodes = Array.from({ length: count }, () => {
        const z = 0.25 + Math.random() * 0.75;
        return {
          bx: Math.random() * width,
          by: Math.random() * height,
          z,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          ox: 0,
          oy: 0,
          r: (Math.random() * 1.4 + 0.7) * z + 0.5,
        };
      });
      glyphNodes = Array.from({ length: Math.max(6, Math.floor(count / 8)) }, () => {
        const z = 0.4 + Math.random() * 0.6;
        return {
          bx: Math.random() * width,
          by: Math.random() * height,
          z,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          ox: 0,
          oy: 0,
          r: 0,
          glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        };
      });
    }

    // screen position of a node given the current parallax tilt + repulsion offset
    function pos(n: Node) {
      const depth = n.z;
      const px = n.bx + n.ox + tilt.x * 46 * depth;
      const py = n.by + n.oy + tilt.y * 46 * depth;
      return { px, py };
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, width, height);
      const g = ctx!.createRadialGradient(width * 0.5, height * 0.35, 0, width * 0.5, height * 0.35, height);
      g.addColorStop(0, "rgba(56,182,255,0.10)");
      g.addColorStop(1, "rgba(7,11,20,0)");
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, width, height);
      for (const n of nodes.slice(0, 34)) {
        ctx!.beginPath();
        ctx!.arc(n.bx, n.by, n.r, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(125,211,255,0.5)";
        ctx!.fill();
      }
    }

    function step() {
      if (!running) return;
      intensity += (targetIntensity - intensity) * 0.07;
      tilt.x += (tiltTarget.x - tilt.x) * 0.06;
      tilt.y += (tiltTarget.y - tilt.y) * 0.06;

      const linkDist = LINK_DIST() * (1 + intensity * 0.15);
      const speedBoost = 1 + intensity * 0.5;
      ctx!.clearRect(0, 0, width, height);

      // ambient focal glow
      const t = Date.now() * 0.0006;
      const fx = width * (0.5 + Math.sin(t) * 0.05);
      const fy = height * (0.4 + Math.cos(t * 0.8) * 0.05);
      const glow = ctx!.createRadialGradient(fx, fy, 0, fx, fy, height * 0.75);
      glow.addColorStop(0, `rgba(56,182,255,${0.07 + intensity * 0.05})`);
      glow.addColorStop(1, "rgba(7,11,20,0)");
      ctx!.fillStyle = glow;
      ctx!.fillRect(0, 0, width, height);

      // cursor halo
      if (mouse.active) {
        const halo = ctx!.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
        halo.addColorStop(0, `rgba(125,211,255,${0.12 + intensity * 0.1})`);
        halo.addColorStop(1, "rgba(125,211,255,0)");
        ctx!.fillStyle = halo;
        ctx!.fillRect(0, 0, width, height);
      }

      // update nodes
      for (const n of nodes) {
        n.bx += n.vx * speedBoost;
        n.by += n.vy * speedBoost;
        if (n.bx < -40) n.bx = width + 40;
        if (n.bx > width + 40) n.bx = -40;
        if (n.by < -40) n.by = height + 40;
        if (n.by > height + 40) n.by = -40;

        // pointer repulsion (deeper nodes react less) — gives clear hover response
        if (mouse.active) {
          const { px, py } = pos(n);
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const d2 = dx * dx + dy * dy;
          const radius = 150;
          if (d2 < radius * radius) {
            const d = Math.sqrt(d2) || 1;
            const force = (1 - d / radius) * 7 * n.z;
            n.ox += (dx / d) * force * 0.25;
            n.oy += (dy / d) * force * 0.25;
          }
        }
        // spring offsets back to rest
        n.ox *= 0.86;
        n.oy *= 0.86;
      }

      // connections (depth-sorted draw not needed for lines)
      for (let i = 0; i < nodes.length; i++) {
        const a = pos(nodes[i]);
        for (let j = i + 1; j < nodes.length; j++) {
          const b = pos(nodes[j]);
          const dx = a.px - b.px;
          const dy = a.py - b.py;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            let alpha = (1 - dist / linkDist) * 0.45 * ((nodes[i].z + nodes[j].z) / 2);
            if (mouse.active) {
              const mx = (a.px + b.px) / 2 - mouse.x;
              const my = (a.py + b.py) / 2 - mouse.y;
              if (mx * mx + my * my < 170 * 170) alpha = Math.min(1, alpha + 0.4);
            }
            ctx!.strokeStyle = `rgba(56,182,255,${alpha})`;
            ctx!.lineWidth = 0.7;
            ctx!.beginPath();
            ctx!.moveTo(a.px, a.py);
            ctx!.lineTo(b.px, b.py);
            ctx!.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const { px, py } = pos(n);
        ctx!.beginPath();
        ctx!.arc(px, py, n.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(125,211,255,${0.45 + n.z * 0.4})`;
        ctx!.fill();
      }

      // drifting code glyphs (parallax with depth)
      for (const g of glyphNodes) {
        g.bx += g.vx;
        g.by += g.vy;
        if (g.bx < -30) g.bx = width + 30;
        if (g.bx > width + 30) g.bx = -30;
        if (g.by < -30) g.by = height + 30;
        if (g.by > height + 30) g.by = -30;
        const { px, py } = pos(g);
        ctx!.font = `600 ${Math.round(11 + g.z * 6)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        ctx!.fillStyle = `rgba(125,211,255,${(0.12 + intensity * 0.14) * g.z})`;
        ctx!.fillText(g.glyph!, px, py);
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

    // Listen on window (the canvas sits behind content at -z-10, so it never gets pointer
    // events directly). Map global coordinates into the canvas and activate only inside it.
    const onMove = (e: PointerEvent) => {
      const rect = wrap!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      if (!inside) {
        onLeave();
        return;
      }
      mouse.x = x;
      mouse.y = y;
      mouse.active = true;
      tiltTarget.x = (x / width - 0.5) * 2;
      tiltTarget.y = (y / height - 0.5) * 2;
      targetIntensity = 1;
    };
    function onLeave() {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
      tiltTarget.x = 0;
      tiltTarget.y = 0;
      targetIntensity = 0;
    }

    resize();
    start();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

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
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 -z-10" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, transparent 40%, rgba(7,11,20,0.4) 80%, rgb(var(--bg)) 100%)",
        }}
      />
    </div>
  );
}
