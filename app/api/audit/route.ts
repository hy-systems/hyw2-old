import { NextResponse } from "next/server";
import { createHash, randomUUID } from "crypto";
import { auditSchema, type AuditPayload } from "../../../lib/audit-schema";

export const runtime = "nodejs";

const TIMEOUT_MS = 8000;
const RETRY_DELAY_MS = 1000;
const TRACKING_TIMEOUT_MS = 2000;
const RETRYABLE = new Set([500, 502, 503, 504]);

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Security headers are applied globally in middleware.ts, so the route returns
// plain JSON. Field-level validation messages relate to the user's own input
// and are safe to surface; all backend failures are masked.
function json(body: unknown, status: number) {
  return NextResponse.json(body, { status });
}

async function fetchWithTimeout(url: string, payload: string, ms: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

// One automatic retry on a transient upstream failure, separated by a backoff.
async function forward(url: string, payload: string): Promise<boolean> {
  for (let i = 0; i < 2; i++) {
    try {
      const res = await fetchWithTimeout(url, payload, TIMEOUT_MS);
      if (res.ok) return true;
      if (!RETRYABLE.has(res.status) || i === 1) return false;
    } catch {
      if (i === 1) return false;
    }
    await wait(RETRY_DELAY_MS);
  }
  return false;
}

/*
 * SERVER-SIDE CONVERSION TRACKING (Australian Privacy Principles).
 * The functions below transmit a Lead conversion to Meta and Google. All
 * personal identifiers are SHA-256 hashed before they ever leave the server;
 * raw email and phone are never sent. Tracking only runs when the relevant
 * credentials are configured as environment variables.
 *
 * Obligations the business must keep in place (do not remove):
 *  - The privacy policy must disclose that hashed contact data is shared with
 *    Meta and Google for advertising measurement (APP 5 notice, APP 6 use).
 *  - You must have a lawful basis / consent and provide an opt-out path.
 *  - Never log or persist the raw or hashed identifiers beyond this request.
 */
const sha256 = (v: string): string => createHash("sha256").update(v).digest("hex");
const normEmail = (v: string): string => v.trim().toLowerCase();
const normPhone = (v: string): string => {
  const digits = v.replace(/\D/g, "");
  return digits.startsWith("0") ? "61" + digits.slice(1) : digits;
};

async function metaCapi(data: AuditPayload): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) return;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url: "https://hysystems.com.au/audit",
        user_data: {
          em: [sha256(normEmail(data.email))],
          ph: [sha256(normPhone(data.phone))],
        },
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;

  await fetchWithTimeout(
    `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
    JSON.stringify(body),
    TRACKING_TIMEOUT_MS
  );
}

async function ga4Lead(): Promise<void> {
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;
  if (!measurementId || !apiSecret) return;

  // No browser cookie server-side, so a fresh client_id is minted per event.
  const body = {
    client_id: randomUUID(),
    events: [{ name: "generate_lead", params: { currency: "AUD", value: 0 } }],
  };

  await fetchWithTimeout(
    `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(
      measurementId
    )}&api_secret=${encodeURIComponent(apiSecret)}`,
    JSON.stringify(body),
    TRACKING_TIMEOUT_MS
  );
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "We could not read that submission. Please try again." }, 400);
  }

  const parsed = auditSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      { ok: false, error: "Some fields need attention.", fieldErrors: parsed.error.flatten().fieldErrors },
      422
    );
  }

  const hook = process.env.GHL_WEBHOOK_URL;
  const payload = JSON.stringify({
    ...parsed.data,
    source: "hysystems.com.au / audit",
    submittedAt: new Date().toISOString(),
  });

  if (hook) {
    try {
      const delivered = await forward(hook, payload);
      if (!delivered) {
        return json(
          { ok: false, error: "We could not deliver your application right now. Please try again shortly." },
          502
        );
      }
    } catch {
      return json({ ok: false, error: "Something went wrong on our end. Please try again shortly." }, 500);
    }
  } else {
    // No webhook configured: simulate a successful capture so the funnel is
    // testable end to end without committing a live endpoint to the repo.
    await wait(600);
  }

  // Fire conversion tracking concurrently. allSettled guarantees a tracking
  // failure or latency spike can never block or fail the client response.
  await Promise.allSettled([metaCapi(parsed.data), ga4Lead()]);

  return json({ ok: true }, 200);
}
