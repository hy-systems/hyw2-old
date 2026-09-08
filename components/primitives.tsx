"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { reduced } from "./fx";

/* ---------- motion primitives ---------- */

export function SplitText({
  text,
  accent = [],
  baseDelay = 0,
  stagger = 42,
  className,
  style,
}: {
  text: string;
  accent?: string[];
  baseDelay?: number;
  stagger?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const words = text.split(" ");
  const acc = new Set(accent.map((w) => w.toLowerCase()));
  return (
    <span className={className} style={style} aria-label={text}>
      {words.map((w, i) => {
        const clean = w.replace(/[^a-zA-Z]/g, "").toLowerCase();
        const on = acc.has(clean);
        return (
          <span
            key={i}
            aria-hidden="true"
            className="word"
            style={{
              animationDelay: baseDelay + i * stagger + "ms",
              ...(on
                ? {
                    color: "transparent",
                    backgroundImage:
                      "linear-gradient(100deg,var(--acc1),var(--acc))",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }
                : {}),
            }}
          >
            {w}&nbsp;
          </span>
        );
      })}
    </span>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) {
      setV(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            setV(true);
            io.disconnect();
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity .9s var(--e-expo) ${delay}ms, transform .9s var(--e-expo) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function CountUpOnView({
  to,
  dur = 1500,
  prefix = "",
  suffix = "",
  fmt = (n: number) => Math.round(n).toLocaleString("en-AU"),
}: {
  to: number;
  dur?: number;
  prefix?: string;
  suffix?: string;
  fmt?: (n: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) {
      setV(to);
      return;
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting && !done.current) {
            done.current = true;
            const s = performance.now();
            const tick = (t: number) => {
              const p = Math.min((t - s) / dur, 1);
              setV(to * (1 - Math.pow(1 - p, 3)));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.disconnect();
          }
        }),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, dur]);
  return (
    <span ref={ref}>
      {prefix}
      {fmt(v)}
      {suffix}
    </span>
  );
}

export function useCountUp(value: number, dur = 600) {
  const [n, setN] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    if (reduced()) {
      setN(value);
      prev.current = value;
      return;
    }
    const from = prev.current,
      to = value,
      s = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - s) / dur, 1);
      setN(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, dur]);
  return n;
}

export function useMagnetic(strength = 0.25, pad = 16, cap = 12) {
  const ref = useRef<HTMLElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (reduced()) return;
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const inside =
        e.clientX >= r.left - pad &&
        e.clientX <= r.right + pad &&
        e.clientY >= r.top - pad &&
        e.clientY <= r.bottom + pad;
      if (inside) {
        const cx = r.left + r.width / 2,
          cy = r.top + r.height / 2;
        let x = (e.clientX - cx) * strength,
          y = (e.clientY - cy) * strength;
        x = Math.max(-cap, Math.min(cap, x));
        y = Math.max(-cap, Math.min(cap, y));
        setT({ x, y });
      } else setT((p) => (p.x === 0 && p.y === 0 ? p : { x: 0, y: 0 }));
    };
    addEventListener("mousemove", move);
    return () => removeEventListener("mousemove", move);
  }, [strength, pad, cap]);
  return [ref, t] as const;
}

export function Spotlight({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", e.clientX - r.left + "px");
    el.style.setProperty("--my", e.clientY - r.top + "px");
  };
  return (
    <div ref={ref} onMouseMove={onMove} className={`spot ${className}`} style={style}>
      {children}
    </div>
  );
}

/* ---------- buttons ---------- */

type Variant = "primary" | "ghost";

export function MagBtn({
  children,
  onClick,
  variant = "primary",
  disabled,
  cap = 12,
  style,
  type = "button",
  ...rest
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  disabled?: boolean;
  cap?: number;
  style?: React.CSSProperties;
  type?: "button" | "submit";
} & Record<string, unknown>) {
  const [ref, t] = useMagnetic(variant === "primary" ? 0.25 : 0.2, 16, cap);
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`btn btn--${variant}`}
      data-hover
      style={{ transform: `translate(${t.x}px,${t.y}px)`, ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}

// Route-aware CTA. Next.js prefetches the target on hover/in-view, giving the
// zero-perceived-latency route transitions the brief requires.
export function LinkButton({
  href,
  children,
  variant = "primary",
  cap = 12,
  style,
  prefetch = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  cap?: number;
  style?: React.CSSProperties;
  prefetch?: boolean;
}) {
  const [ref, t] = useMagnetic(variant === "primary" ? 0.25 : 0.2, 16, cap);
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={`btn btn--${variant}`}
      data-hover
      style={style}
    >
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          transform: `translate(${t.x}px,${t.y}px)`,
          pointerEvents: "none",
        }}
      >
        {children}
      </span>
    </Link>
  );
}

export function Field({
  label,
  children,
  error,
  errorId,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  errorId?: string;
}) {
  return (
    <label style={{ display: "block" }}>
      <span
        className="mono"
        style={{
          display: "block",
          fontSize: "0.68rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--txt2)",
          marginBottom: 9,
        }}
      >
        {label}
      </span>
      {children}
      {error ? (
        <span className="err" id={errorId} role="alert">
          <IAlert width={14} height={14} />
          {error}
        </span>
      ) : null}
    </label>
  );
}

/* ---------- icons ---------- */

const ic = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type IconProps = React.SVGProps<SVGSVGElement>;

export const Logo = () => {
  const [bad, setBad] = useState(false);
  if (bad) {
    return (
      <span
        aria-label="HY Systems"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: 34,
          minWidth: 34,
          padding: "0 8px",
          border: "1px solid var(--line2)",
          fontFamily: "var(--mono)",
          fontWeight: 700,
          fontSize: "0.86rem",
          letterSpacing: "0.04em",
          color: "#fff",
        }}
      >
        HY
      </span>
    );
  }
  return (
    <img
      src="/hy-systems-logo.png"
      alt="HY Systems"
      width={120}
      height={36}
      onError={() => setBad(true)}
      style={{ height: 34, width: "auto", objectFit: "contain", display: "block" }}
    />
  );
};

export const Arrow = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" {...ic} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const ArrowUp = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...ic} {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);
export const IPhone = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...ic} {...p}>
    <path d="M5 4h3l1.5 4-2 1.5a12 12 0 005 5l1.5-2 4 1.5V18a2 2 0 01-2 2A15 15 0 014 6a2 2 0 012-2" />
    <path d="M15 4l5 5M20 4l-5 5" />
  </svg>
);
export const IChat = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...ic} {...p}>
    <path d="M4 5h16v11H9l-5 4z" />
    <path d="M8 10h8M8 13h5" />
  </svg>
);
export const IHook = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...ic} {...p}>
    <path d="M12 4v6a4 4 0 11-4 4" />
    <circle cx="12" cy="4" r="1.6" />
    <circle cx="8" cy="14" r="1.6" />
    <path d="M14 16h4a2 2 0 012 2" />
    <circle cx="20" cy="18" r="1.6" />
  </svg>
);
export const IPipe = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...ic} {...p}>
    <path d="M3 5h18l-7 8v6l-4-2v-4z" />
  </svg>
);
export const ICheck = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" {...ic} {...p}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
export const IAlert = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" {...ic} {...p}>
    <path d="M12 4l9 16H3z" />
    <path d="M12 10v4M12 17.4v.2" />
  </svg>
);
export const IDot = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor" {...p}>
    <circle cx="12" cy="12" r="3.5" />
  </svg>
);
export const ICross = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...ic} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const ICpu = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...ic} {...p}>
    <rect x="7" y="7" width="10" height="10" rx="1" />
    <path d="M10 10h4v4h-4z" />
    <path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2" />
  </svg>
);
export const IRoute = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...ic} {...p}>
    <circle cx="6" cy="6" r="2.4" />
    <circle cx="18" cy="18" r="2.4" />
    <path d="M8 6h6a4 4 0 014 4v0a4 4 0 01-4 4H10a4 4 0 00-4 4" />
  </svg>
);
export const ICal = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...ic} {...p}>
    <rect x="3" y="5" width="18" height="16" rx="1.5" />
    <path d="M3 9h18M8 3v4M16 3v4M8 14h2M14 14h2" />
  </svg>
);
export const IDatabase = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...ic} {...p}>
    <ellipse cx="12" cy="6" rx="7" ry="3" />
    <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
  </svg>
);
export const IBolt = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...ic} {...p}>
    <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
  </svg>
);
export const IGraph = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...ic} {...p}>
    <path d="M4 4v16h16" />
    <path d="M7 15l4-5 3 3 4-6" />
  </svg>
);
export const IClock = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...ic} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
export const IShield = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...ic} {...p}>
    <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);
export const IPlug = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...ic} {...p}>
    <path d="M9 3v5M15 3v5M7 8h10v3a5 5 0 01-10 0zM12 16v5" />
  </svg>
);
