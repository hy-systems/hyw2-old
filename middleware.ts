import { NextResponse, type NextRequest } from "next/server";

// Content-Security-Policy tuned to this app. style-src and script-src must allow
// 'unsafe-inline' because the design system relies on inline styles and Next.js
// injects inline hydration scripts plus inline JSON-LD. Google Fonts are loaded
// via CSS @import, so the font stylesheet and font files are whitelisted. Remote
// scripts are restricted to 'self'. Tighten script-src to nonces as a follow-up.
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data: https:",
  "font-src 'self' https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
].join("; ");

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "Content-Security-Policy": CSP,
};

// Known vulnerability scanners, exploit tools, and abusive clients. Deliberately
// excludes legitimate search crawlers (Googlebot, Bingbot) so SEO is unaffected.
const BAD_UA =
  /(sqlmap|nikto|nmap|masscan|zgrab|nessus|acunetix|wpscan|dirbuster|gobuster|havij|jorgee|fuzzer|nuclei|x?rumer|python-requests|go-http-client|libwww-perl|scrapy|httrack|zmeu)/i;

// Best-effort in-memory rate limiter. Edge instances do not share memory and are
// recycled, so this is a first line of defence only. For a hard, distributed
// guarantee, back this with Vercel KV / Upstash Redis keyed by IP.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): { limited: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return { limited: false, retryAfter: 0 };
  }
  if (entry.count >= MAX_HITS) {
    return { limited: true, retryAfter: Math.ceil((entry.reset - now) / 1000) };
  }
  entry.count += 1;
  return { limited: false, retryAfter: 0 };
}

function withSecurity(res: NextResponse): NextResponse {
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) res.headers.set(k, v);
  return res;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const ua = req.headers.get("user-agent") || "";

  // 1. Bot mitigation, scoped to the intake surface to minimise collateral.
  if ((pathname === "/audit" || pathname === "/api/audit") && BAD_UA.test(ua)) {
    return withSecurity(new NextResponse("Forbidden", { status: 403 }));
  }

  // 2. Rate limiting on the audit submission endpoint.
  if (pathname === "/api/audit" && req.method === "POST") {
    const { limited, retryAfter } = rateLimited(clientIp(req));
    if (limited) {
      const res = NextResponse.json(
        { ok: false, error: "Too many attempts. Please wait a few minutes and try again." },
        { status: 429 }
      );
      res.headers.set("Retry-After", String(retryAfter));
      return withSecurity(res);
    }
  }

  // 3. Global security headers on every response.
  return withSecurity(NextResponse.next());
}

export const config = {
  // Run on everything except Next internals and common static asset extensions.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|txt|xml|woff2?)$).*)"],
};
