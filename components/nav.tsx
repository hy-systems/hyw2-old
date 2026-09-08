"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo, LinkButton, Arrow } from "./primitives";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Pricing", href: "/services" },
  { label: "Performance", href: "/performance" },
  { label: "Audit", href: "/audit" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(scrollY > 16);
    f();
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: scrolled || open ? "rgba(0,0,0,0.62)" : "transparent",
          backdropFilter:
            scrolled || open ? "blur(16px) saturate(150%)" : "none",
          WebkitBackdropFilter:
            scrolled || open ? "blur(16px) saturate(150%)" : "none",
          borderBottom: `1px solid ${
            scrolled ? "var(--line)" : "transparent"
          }`,
          transition:
            "background .45s var(--e-expo), border-color .45s var(--e-expo)",
        }}
      >
        <div
          className="wrap"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 70,
            gap: 24,
          }}
        >
          <Link
            href="/"
            data-hover
            style={{ display: "flex", alignItems: "center", gap: 12 }}
            aria-label="HY Systems home"
          >
            <Logo />
            <span style={{ fontWeight: 600, letterSpacing: "-0.01em", fontSize: "1.04rem" }}>
              HY SYSTEMS
            </span>
          </Link>

          <div className="nav-links">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                prefetch
                className="navlink"
                data-hover
                data-active={isActive(l.href)}
              >
                {l.label}
              </Link>
            ))}
            <LinkButton
              href="/audit"
              variant="primary"
              style={{ padding: "12px 22px", fontSize: "0.84rem" }}
            >
              Initiate Audit <Arrow />
            </LinkButton>
          </div>

          <button
            className="burger"
            data-open={open}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {open ? (
        <div className="menu-panel" role="dialog" aria-modal="true">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className="menu-link"
              data-active={isActive(l.href)}
              onClick={() => setOpen(false)}
            >
              {l.label}
              <span className="idx">0{i + 1}</span>
            </Link>
          ))}
          <div style={{ marginTop: 32 }}>
            <LinkButton href="/audit" variant="primary">
              Initiate Infrastructure Audit <Arrow />
            </LinkButton>
          </div>
        </div>
      ) : null}
    </>
  );
}
