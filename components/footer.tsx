"use client";

import React from "react";
import Link from "next/link";
import { Logo, ArrowUp } from "./primitives";

const OPS_EMAIL = "info@hysystems.com.au";
const OPS_PHONE = "+61 450 935 568";
const OPS_PHONE_TEL = "+61450935568";
const ABN = "33 273 774 384";

const SITEMAP = [
  { label: "Home", href: "/" },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Pricing", href: "/services" },
  { label: "Performance", href: "/performance" },
  { label: "Audit", href: "/audit" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

function colHead(label: string): React.CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: "0.66rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--txt3)",
    marginBottom: 18,
  };
}

const linkStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.92rem",
  color: "var(--txt1)",
  padding: "7px 0",
};

export function Footer() {
  const toTop = () => scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--line)" }}>
      <div
        className="wrap"
        style={{
          paddingTop: 72,
          paddingBottom: 56,
          display: "grid",
          gap: 48,
          gridTemplateColumns: "1fr",
        }}
      >
        <div className="footer-grid">
          {/* Column one: brand mark, positioning, legal operating ABN. */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Logo />
              <span style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>HY SYSTEMS</span>
            </div>
            <p className="body" style={{ marginTop: 18, fontSize: "0.92rem", maxWidth: 300 }}>
              Autonomous web and AI infrastructure for high-revenue local service operators.
            </p>
            <div
              className="mono"
              style={{
                marginTop: 24,
                fontSize: "0.72rem",
                letterSpacing: "0.06em",
                color: "var(--txt3)",
              }}
            >
              ABN {ABN}
            </div>
            <div
              className="live"
              style={{ marginTop: 16, color: "var(--txt2)" }}
            >
              <span className="dot" /> 24/7 Autonomous Uptime
            </div>
          </div>

          {/* Column two: site map. */}
          <div>
            <div style={colHead("Sitemap")}>Sitemap</div>
            {SITEMAP.map((l) => (
              <Link key={l.href} href={l.href} prefetch data-hover style={linkStyle}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Column three: legal documents and direct contact. */}
          <div>
            <div style={colHead("Legal")}>Legal</div>
            {LEGAL.map((l) => (
              <Link key={l.href} href={l.href} data-hover style={linkStyle}>
                {l.label}
              </Link>
            ))}
            <div style={{ ...colHead("Contact"), marginTop: 30 }}>Contact</div>
            <a href={`mailto:${OPS_EMAIL}`} data-hover style={linkStyle}>
              {OPS_EMAIL}
            </a>
            <a href={`tel:${OPS_PHONE_TEL}`} data-hover style={linkStyle}>
              {OPS_PHONE}
            </a>
          </div>
        </div>
      </div>

      <div
        className="marquee"
        aria-hidden="true"
        style={{ borderTop: "1px solid var(--line)", paddingTop: 24, paddingBottom: 8 }}
      >
        <div className="marquee__t">
          <span>HY SYSTEMS / HY SYSTEMS / </span>
          <span>HY SYSTEMS / HY SYSTEMS / </span>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: 24, paddingBottom: 44 }}>
        <div
          className="mono"
          style={{
            fontSize: "0.7rem",
            color: "var(--txt3)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span>© 2026 HY Systems. Infrastructure for local service markets.</span>
          <button
            onClick={toTop}
            data-hover
            style={{
              background: "transparent",
              border: "none",
              color: "var(--txt1)",
              fontFamily: "var(--mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.06em",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: 0,
            }}
          >
            Back to top <ArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}
