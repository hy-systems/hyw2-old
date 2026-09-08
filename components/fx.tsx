"use client";

import React, { useEffect, useRef } from "react";

export const reduced = (): boolean =>
  typeof window !== "undefined" &&
  !!window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function CursorFX() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    if (!fine || reduced()) return;
    document.documentElement.classList.add("hy-cursor-on");
    let mx = innerWidth / 2,
      my = innerHeight / 2,
      rx = mx,
      ry = my,
      raf = 0;
    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current)
        dot.current.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    };
    const over = (e: MouseEvent) => {
      const t =
        e.target &&
        (e.target as HTMLElement).closest &&
        (e.target as HTMLElement).closest(
          "a,button,input,select,textarea,[data-hover]"
        );
      if (ring.current) ring.current.classList.toggle("hov", !!t);
    };
    const loop = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      if (ring.current)
        ring.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("hy-cursor-on");
    };
  }, []);
  return (
    <>
      <div ref={dot} className="cur-dot" />
      <div ref={ring} className="cur-ring" />
    </>
  );
}

export function Grain() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9990,
        pointerEvents: "none",
        opacity: 0.05,
        backgroundImage: `url("${NOISE}")`,
        backgroundSize: "180px 180px",
        mixBlendMode: "overlay",
      }}
    />
  );
}

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const f = () => {
      const h = document.documentElement;
      const s = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (bar.current)
        bar.current.style.transform = `scaleX(${Math.min(Math.max(s, 0), 1)})`;
    };
    f();
    addEventListener("scroll", f, { passive: true });
    addEventListener("resize", f);
    return () => {
      removeEventListener("scroll", f);
      removeEventListener("resize", f);
    };
  }, []);
  return (
    <div
      ref={bar}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 9995,
        transformOrigin: "0 0",
        transform: "scaleX(0)",
        background: "linear-gradient(90deg,var(--acc),var(--acc2))",
      }}
    />
  );
}

export function Orbs() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />
    </div>
  );
}

export function ParticleField() {
  const cv = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = cv.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let w = 0,
      h = 0,
      dpr = 1,
      raf = 0;
    let nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      z: number;
      ph: number;
    }[] = [];
    let ripples: { x: number; y: number; r: number; a: number }[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    const off = { x: 0, y: 0 };
    const N = innerWidth < 720 ? 46 : innerWidth < 1200 ? 72 : 96;
    const D = 128,
      MR = 190;
    function size() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      const r = c!.getBoundingClientRect();
      w = r.width;
      h = r.height;
      c!.width = w * dpr;
      c!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function init() {
      nodes = Array.from({ length: N }, () => {
        const z = 0.35 + Math.random() * 0.65;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.16 * z,
          vy: (Math.random() - 0.5) * 0.16 * z,
          z,
          ph: Math.random() * Math.PI * 2,
        };
      });
    }
    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h);
      const txp = mouse.active ? (mouse.x - w / 2) * 0.022 : 0;
      const typ = mouse.active ? (mouse.y - h / 2) * 0.022 : 0;
      off.x += (txp - off.x) * 0.05;
      off.y += (typ - off.y) * 0.05;
      for (const p of nodes) {
        p.x += p.vx;
        p.y += p.vy;
        p.x += Math.sin(t * 0.0002 + p.ph) * 0.05;
        if (p.x < -25) p.x = w + 25;
        if (p.x > w + 25) p.x = -25;
        if (p.y < -25) p.y = h + 25;
        if (p.y > h + 25) p.y = -25;
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const ax = a.x + off.x * a.z,
          ay = a.y + off.y * a.z;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const bx = b.x + off.x * b.z,
            by = b.y + off.y * b.z;
          const d = Math.hypot(ax - bx, ay - by);
          if (d < D) {
            ctx!.strokeStyle =
              "rgba(150,170,215," +
              (1 - d / D) * 0.13 * ((a.z + b.z) / 2) +
              ")";
            ctx!.lineWidth = 0.8;
            ctx!.beginPath();
            ctx!.moveTo(ax, ay);
            ctx!.lineTo(bx, by);
            ctx!.stroke();
          }
        }
      }
      if (mouse.active)
        for (const p of nodes) {
          const px = p.x + off.x * p.z,
            py = p.y + off.y * p.z;
          const d = Math.hypot(mouse.x - px, mouse.y - py);
          if (d < MR) {
            ctx!.strokeStyle = "rgba(46,107,255," + (1 - d / MR) * 0.55 + ")";
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(mouse.x, mouse.y);
            ctx!.lineTo(px, py);
            ctx!.stroke();
          }
        }
      for (const p of nodes) {
        const px = p.x + off.x * p.z,
          py = p.y + off.y * p.z;
        const d = mouse.active ? Math.hypot(mouse.x - px, mouse.y - py) : 9999;
        const near = d < MR;
        const base = 0.3 + p.z * 0.4;
        ctx!.fillStyle = near
          ? "rgba(90,140,255," + 0.13 * (1 - d / MR) + ")"
          : "rgba(150,170,215,0.04)";
        ctx!.beginPath();
        ctx!.arc(px, py, (near ? 5 : 3) * p.z, 0, 6.283);
        ctx!.fill();
        ctx!.fillStyle = near
          ? "rgba(160,190,255," + Math.min(1, base + 0.4) + ")"
          : "rgba(200,210,232," + base + ")";
        ctx!.beginPath();
        ctx!.arc(px, py, 1.5 * p.z + 0.4, 0, 6.283);
        ctx!.fill();
      }
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.r += 2.6;
        r.a *= 0.95;
        if (r.a < 0.02) {
          ripples.splice(i, 1);
          continue;
        }
        ctx!.strokeStyle = "rgba(46,107,255," + r.a + ")";
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.arc(r.x, r.y, r.r, 0, 6.283);
        ctx!.stroke();
      }
    }
    function loop(t: number) {
      draw(t);
      raf = requestAnimationFrame(loop);
    }
    size();
    init();
    if (reduced()) draw(0);
    else loop(0);
    const onMove = (e: MouseEvent) => {
      const r = c!.getBoundingClientRect();
      const x = e.clientX - r.left,
        y = e.clientY - r.top;
      if (x < 0 || x > w || y < 0 || y > h) mouse.active = false;
      else {
        mouse.x = x;
        mouse.y = y;
        mouse.active = true;
      }
    };
    const onDown = (e: MouseEvent) => {
      const r = c!.getBoundingClientRect();
      const x = e.clientX - r.left,
        y = e.clientY - r.top;
      if (x >= 0 && x <= w && y >= 0 && y <= h)
        ripples.push({ x, y, r: 4, a: 0.5 });
    };
    const onResize = () => {
      size();
      init();
    };
    addEventListener("mousemove", onMove);
    addEventListener("mousedown", onDown);
    addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", onMove);
      removeEventListener("mousedown", onDown);
      removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <canvas
      ref={cv}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}

export function GlobalFX() {
  return (
    <>
      <CursorFX />
      <Grain />
      <ScrollProgress />
    </>
  );
}
