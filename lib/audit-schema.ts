import { z } from "zod";

// Monthly revenue bands. Pre-revenue / sub-$10k operators are intentionally excluded.
export const REVENUE_BANDS = [
  "$10k - $50k",
  "$50k - $100k",
  "$100k - $250k",
  "$250k+",
] as const;

const isBand = (v: string): boolean =>
  (REVENUE_BANDS as readonly string[]).includes(v);

// Strip any HTML tags, collapse internal whitespace, trim. Defends the
// downstream webhook against markup injection from free-text fields.
const sanitize = (s: string): string =>
  s
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim();

// Reduce a phone entry to + and digits so spacing variants normalise to one form.
const normalizePhone = (s: string): string => s.replace(/[\s().\-]/g, "").trim();

// Australian mobile: 04XX XXX XXX, +61 4XX XXX XXX, or 61 4XX XXX XXX.
const AU_PHONE = /^(?:\+?61|0)4\d{8}$/;

// Accept "none" or a domain, with or without scheme.
const URL_LIKE = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[^\s]*)?$/i;

const text = (min: number, msg: string) =>
  z
    .string()
    .transform(sanitize)
    .pipe(z.string().min(min, msg));

export const auditSchema = z.object({
  fullName: text(2, "Enter your full name as it should appear on the brief."),
  companyName: text(2, "Enter your registered or trading business name."),
  email: z
    .string()
    .transform((s) => s.trim())
    .pipe(z.string().email("Enter a valid email, for example name@company.com.au.")),
  phone: z
    .string()
    .transform(normalizePhone)
    .pipe(
      z
        .string()
        .regex(AU_PHONE, "Enter a valid Australian mobile, for example 04XX XXX XXX or +61 4XX XXX XXX.")
    ),
  websiteUrl: z
    .string()
    .transform(sanitize)
    .pipe(
      z
        .string()
        .refine((v) => v.toLowerCase() === "none" || URL_LIKE.test(v), {
          message:
            "Enter a full URL including https:// (for example https://yoursite.com.au), or type none if you have no site.",
        })
    ),
  monthlyRevenue: z
    .string()
    .refine(isBand, { message: "Select the band that matches your current monthly revenue." }),
  bottleneck: text(
    80,
    "Describe your primary operational constraint in at least 80 characters so we can map it."
  ),
  // Optional in general; conditionally required for the top revenue tier below.
  currentSystems: z.string().transform(sanitize).pipe(z.string()),
  commitment: z.boolean().refine((v) => v === true, {
    message: "Confirm you understand this is an infrastructure investment before submitting.",
  }),
}).superRefine((val, ctx) => {
  // High-revenue operators must declare their existing stack so we can scope
  // integration work. The error maps precisely to the dynamically required field.
  if (val.monthlyRevenue === "$250k+" && val.currentSystems.trim().length < 10) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["currentSystems"],
      message:
        "At your revenue, tell us what CRM, booking, or phone systems you currently run (at least 10 characters).",
    });
  }
});

export type AuditPayload = z.infer<typeof auditSchema>;

// Field groupings per progressive-disclosure step (used by the form to gate Next).
export const STEP_FIELDS: Record<number, (keyof AuditPayload)[]> = {
  0: ["fullName", "companyName", "email", "phone", "websiteUrl"],
  1: ["monthlyRevenue", "currentSystems"],
  2: ["bottleneck"],
  3: ["commitment"],
};

export const BOTTLENECK_MIN = 80;
