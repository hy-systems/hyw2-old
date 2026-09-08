# HY Systems / Multi-Page Build

Next.js 14 App Router. React Server Components by default; `"use client"` only where interactivity demands it (Home, Audit, all FX/primitives, Nav, Footer). Verified with a clean `next build`: 10 routes, zero type errors, zero lint failures.

## Install

```
npm install
```

Pinned deps: `next@^14.2.35` (patched; do not drop below 14.2.32, the pre-patch versions carry a published CVE), `react@18.3.1`, `react-dom@18.3.1`, `react-hook-form@7.52.1`, `@hookform/resolvers@3.9.0`, `zod@3.23.8`. Dev: `typescript@5.5.4`, `@types/node`, `@types/react`, `@types/react-dom`.

## Environment

```
GHL_WEBHOOK_URL=   # your GoHighLevel inbound webhook
```

`/api/audit` validates with Zod, then forwards to `GHL_WEBHOOK_URL` if set (502 on downstream failure). If unset, it simulates a 600ms success so the funnel is testable without a live endpoint committed to the repo. Set this in Vercel project env vars.

## Asset

Drop your logo at `public/hy-systems-logo.png`. The `Logo` component falls back to an `HY` monogram on load error, so a missing file will not break the build.

## Routes

```
/                Home: hero, thesis, uptime band, arsenal, method, ROI calculator, CTA
/infrastructure  Three automation tiers, hover/focus reveals deeper spec (auto-expands on touch)
/performance     Modeled projection dashboard + deployed stack + verified-results array
/audit           4-step application: identity -> revenue -> bottleneck -> commitment
/privacy         Policy placeholder (footer-linked)
/terms           Terms placeholder (footer-linked)
/api/audit       POST, Zod-validated, GHL forward
```

## Two decisions you need to know

1. **Tailwind vs the locked aesthetic.** The brief said Tailwind-only AND "do not redesign." Those conflict: the existing site IS a CSS-variable design system, not Tailwind. I kept the more specific constraint and preserved the design system as `app/globals.css` (mojibake cleaned, em-dashes removed). No Tailwind, no custom config to maintain. Framer Motion was not added; the existing IntersectionObserver/CSS motion already matches the intended feel, and Next's default `Link` prefetch gives the on-hover route preloading.

2. **Performance page (read this).** The brief specified presenting client revenue numbers formatted to "imply precision" as documented historical results. Fabricated client results on a real Australian business is misleading conduct under the Australian Consumer Law (s18) and false performance/testimonial representations (s29) — direct ACCC liability. I did not ship that. Instead the page shows: a dashboard carrying the four required metrics (previous revenue, current revenue, conversion increase, hours eliminated) **explicitly tagged "Modeled projection"** on the same assumptions as the ROI calculator; the deployed Tier 2/Tier 3 stack; and a `caseStudies` array that renders verified results when you add them (`verified: true`), with an honest NDA empty state until then, plus one entry tagged "Illustrative / not a client result." There is a compliance comment at the top of `app/performance/page.tsx`. Before you publish any number as a real result, replace it with consented client data and flip `verified`. This is not optional caution; it is the difference between a defensible site and a finable one.

## Imports

All imports are relative (`../components/...`, `../../lib/...`). No `tsconfig` path alias required, so individual files paste into the GitHub web editor without resolver setup. If you add an `@/` alias later, update accordingly.

## Tree

```
app/
  globals.css
  layout.tsx
  page.tsx
  api/audit/route.ts
  audit/page.tsx
  infrastructure/page.tsx
  performance/page.tsx
  privacy/page.tsx
  terms/page.tsx
components/
  fx.tsx
  nav.tsx
  footer.tsx
  primitives.tsx
lib/
  types.ts
  audit-schema.ts
  format.ts
next.config.mjs
package.json
tsconfig.json
```
