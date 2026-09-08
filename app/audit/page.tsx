"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  auditSchema,
  type AuditPayload,
  REVENUE_BANDS,
  STEP_FIELDS,
  BOTTLENECK_MIN,
} from "../../lib/audit-schema";
import {
  Reveal,
  Spotlight,
  MagBtn,
  Field,
  Arrow,
  ICheck,
  IAlert,
  IDot,
} from "../../components/primitives";

const OPS_EMAIL = "info@hysystems.com.au";
const OPS_PHONE = "+61 450 935 568";
const OPS_PHONE_TEL = "+61450935568";

const STEPS = [
  { title: "Identity", note: "Who is applying." },
  { title: "Revenue", note: "The capital threshold." },
  { title: "Bottleneck", note: "The operational constraint." },
  { title: "Commitment", note: "The terms of engagement." },
];

type Status = "idle" | "loading" | "success" | "error";

const STORAGE_KEY = "hy_audit_v1";
const MAX_AGE_MS = 24 * 60 * 60 * 1000; // discard a stale draft after 24h

const DEFAULTS: AuditPayload = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  websiteUrl: "",
  monthlyRevenue: "",
  bottleneck: "",
  currentSystems: "",
  commitment: false,
};

export default function AuditPage() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [online, setOnline] = useState(true);
  const [restored, setRestored] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<AuditPayload>({
    resolver: zodResolver(auditSchema),
    mode: "onTouched",
    defaultValues: DEFAULTS,
  });

  const revenue = watch("monthlyRevenue");
  const bottleneck = watch("bottleneck") || "";
  const commitment = watch("commitment");
  const last = STEPS.length - 1;

  // Rehydrate a previous draft once on mount, restoring the step the user left
  // off at. The cached payload holds PII, so it carries a TTL and is cleared on
  // successful submission (see clearSaved).
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved && typeof saved.ts === "number" && Date.now() - saved.ts < MAX_AGE_MS) {
          if (saved.values) reset({ ...DEFAULTS, ...saved.values });
          if (typeof saved.step === "number") {
            setStep(Math.min(Math.max(saved.step, 0), STEPS.length - 1));
          }
        } else {
          window.localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      /* ignore corrupt draft */
    }
    setRestored(true);
  }, [reset]);

  // Persist on every field change, once rehydration has run.
  useEffect(() => {
    if (typeof window === "undefined" || !restored) return;
    const sub = watch((values) => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ values, step, ts: Date.now() }));
      } catch {
        /* storage full or unavailable */
      }
    });
    return () => sub.unsubscribe();
  }, [watch, step, restored]);

  // Persist immediately on step transitions so a refresh resumes at the right step.
  useEffect(() => {
    if (typeof window === "undefined" || !restored) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ values: getValues(), step, ts: Date.now() })
      );
    } catch {
      /* ignore */
    }
  }, [step, restored, getValues]);

  // Network status listener for offline handling on the final step.
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    setOnline(navigator.onLine);
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  function clearSaved() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  async function next() {
    const ok = await trigger(STEP_FIELDS[step]);
    if (ok) setStep((s) => Math.min(s + 1, last));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function onValid(data: AuditPayload) {
    if (status === "loading") return; // prevent duplicate submissions
    setStatus("loading");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("rejected");
      setStatus("success");
      clearSaved();
    } catch {
      setStatus("error");
    }
  }

  const fieldClass = (k: keyof AuditPayload) =>
    "field" + (errors[k] ? " field--err" : "");

  // aria wiring: link each input to its error container for screen readers.
  const aria = (k: keyof AuditPayload) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });

  return (
    <>
      <section className="page-head">
        <div className="wrap" style={{ position: "relative", zIndex: 3 }}>
          <Reveal>
            <div className="eyebrow">Audit</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h2" style={{ marginTop: 24, maxWidth: 900 }}>
              This is an application, not a contact form.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="lede" style={{ marginTop: 24, maxWidth: 680 }}>
              We deploy infrastructure for operators with revenue to protect and the discipline to
              run a system. Complete the audit. We map your inbound flow, quantify the leak, and
              return a build specification.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ background: "var(--bg)" }}>
        <div className="wrap" style={{ paddingBottom: 120 }}>
          <div className="audit">
            <div>
              <Reveal>
                <div className="mono" style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--txt3)" }}>
                  What you receive
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div style={{ marginTop: 20 }}>
                  {[
                    "A full map of your inbound call flow",
                    "Revenue leak quantified in dollars",
                    "A written build specification",
                    "A fixed, transparent quote",
                  ].map((x) => (
                    <div
                      key={x}
                      style={{
                        display: "flex",
                        gap: 14,
                        alignItems: "center",
                        padding: "13px 0",
                        borderTop: "1px solid var(--line)",
                      }}
                    >
                      <span style={{ color: "var(--acc1)" }}>
                        <IDot />
                      </span>
                      <span className="body" style={{ fontSize: "0.96rem", color: "var(--txt1)" }}>
                        {x}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={150}>
                <p className="mono" style={{ marginTop: 26, fontSize: "0.7rem", lineHeight: 1.7, color: "var(--txt3)", maxWidth: 320 }}>
                  Pre-revenue and sub-threshold operators are not a fit. This filter is
                  deliberate.
                </p>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <Spotlight style={{ border: "1px solid var(--line2)", background: "var(--bg1)", padding: "clamp(24px,4vw,40px)" }}>
                {status === "success" ? (
                  <div>
                    <span style={{ color: "var(--acc1)" }}>
                      <ICheck />
                    </span>
                    <h2 className="h3" style={{ marginTop: 20, color: "#fff" }}>
                      Application received.
                    </h2>
                    <p className="body" style={{ marginTop: 12 }}>
                      Your audit request is logged and under review. Qualified applicants are
                      contacted within one business day. Logged at{" "}
                      {new Date().toLocaleString("en-AU")}.
                    </p>
                  </div>
                ) : status === "error" ? (
                  <div style={{ borderLeft: "2px solid var(--err)", paddingLeft: 20 }}>
                    <span style={{ color: "var(--err)" }}>
                      <IAlert />
                    </span>
                    <h2 className="h3" style={{ marginTop: 16, color: "#fff" }}>
                      Transmission failed.
                    </h2>
                    <p className="body" style={{ marginTop: 10 }}>
                      The connection dropped before delivery. Email us directly at{" "}
                      <a href={`mailto:${OPS_EMAIL}`} data-hover style={{ color: "#fff", textDecoration: "underline" }}>
                        {OPS_EMAIL}
                      </a>{" "}
                      or call{" "}
                      <a href={`tel:${OPS_PHONE_TEL}`} data-hover style={{ color: "#fff", textDecoration: "underline" }}>
                        {OPS_PHONE}
                      </a>{" "}
                      and we will pick it up manually.
                    </p>
                    <div style={{ marginTop: 24 }}>
                      <MagBtn variant="ghost" onClick={() => setStatus("idle")}>
                        Retry transmission <Arrow />
                      </MagBtn>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* progress */}
                    <div className="steps" aria-hidden="true">
                      {STEPS.map((s, i) => (
                        <i key={s.title} className={i <= step ? "on" : ""} />
                      ))}
                    </div>
                    <div
                      className="mono"
                      style={{
                        fontSize: "0.68rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--txt2)",
                        marginBottom: 22,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        Step 0{step + 1} / 0{STEPS.length}
                      </span>
                      <span style={{ color: "var(--acc1)" }}>{STEPS[step].title}</span>
                    </div>

                    {/* progressive-disclosure step, re-animated on each transition */}
                    <div className="step-anim" key={step}>
                    {/* STEP 1: identity */}
                    {step === 0 ? (
                      <div style={{ display: "grid", gap: 20 }}>
                        <div className="form-2">
                          <Field label="Full name" error={errors.fullName?.message} errorId="fullName-err">
                            <input
                              className={fieldClass("fullName")}
                              autoComplete="name"
                              disabled={status === "loading"}
                              {...aria("fullName")}
                              {...register("fullName")}
                            />
                          </Field>
                          <Field label="Company name" error={errors.companyName?.message} errorId="companyName-err">
                            <input
                              className={fieldClass("companyName")}
                              autoComplete="organization"
                              disabled={status === "loading"}
                              {...aria("companyName")}
                              {...register("companyName")}
                            />
                          </Field>
                        </div>
                        <div className="form-2">
                          <Field label="Email" error={errors.email?.message} errorId="email-err">
                            <input
                              className={fieldClass("email")}
                              type="email"
                              autoComplete="email"
                              disabled={status === "loading"}
                              {...aria("email")}
                              {...register("email")}
                            />
                          </Field>
                          <Field label="Phone" error={errors.phone?.message} errorId="phone-err">
                            <input
                              className={fieldClass("phone")}
                              inputMode="tel"
                              autoComplete="tel"
                              disabled={status === "loading"}
                              {...aria("phone")}
                              {...register("phone")}
                            />
                          </Field>
                        </div>
                        <Field label="Website URL" error={errors.websiteUrl?.message} errorId="websiteUrl-err">
                          <input
                            className={fieldClass("websiteUrl")}
                            placeholder="https://yoursite.com.au or type none"
                            disabled={status === "loading"}
                            {...aria("websiteUrl")}
                            {...register("websiteUrl")}
                          />
                        </Field>
                      </div>
                    ) : null}

                    {/* STEP 2: revenue */}
                    {step === 1 ? (
                      <div>
                        <p className="body" style={{ marginBottom: 18, fontSize: "0.95rem" }}>
                          Current monthly recurring revenue.
                        </p>
                        <div
                          role="radiogroup"
                          aria-label="Current monthly revenue"
                          aria-invalid={errors.monthlyRevenue ? true : undefined}
                          aria-describedby={errors.monthlyRevenue ? "monthlyRevenue-err" : undefined}
                          style={{ display: "grid", gap: 12 }}
                        >
                          {REVENUE_BANDS.map((b) => (
                            <label key={b} className="radio-row" data-on={revenue === b}>
                              <input type="radio" value={b} {...register("monthlyRevenue")} />
                              <span className="rl">{b}</span>
                            </label>
                          ))}
                        </div>
                        {errors.monthlyRevenue ? (
                          <span className="err" id="monthlyRevenue-err" role="alert">
                            <IAlert width={14} height={14} />
                            {errors.monthlyRevenue.message}
                          </span>
                        ) : null}

                        {revenue === "$250k+" ? (
                          <div className="step-anim" style={{ marginTop: 22 }}>
                            <Field
                              label="Current systems (CRM, booking, phone)"
                              error={errors.currentSystems?.message}
                              errorId="currentSystems-err"
                            >
                              <input
                                className={fieldClass("currentSystems")}
                                placeholder="e.g. HubSpot, ServiceM8, Aircall"
                                disabled={status === "loading"}
                                {...aria("currentSystems")}
                                {...register("currentSystems")}
                              />
                            </Field>
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {/* STEP 3: bottleneck */}
                    {step === 2 ? (
                      <div>
                        <Field label="Primary operational constraint" error={errors.bottleneck?.message} errorId="bottleneck-err">
                          <textarea
                            className={fieldClass("bottleneck")}
                            rows={6}
                            placeholder="Describe where revenue actually leaks. Where does the system break: capture, response time, scheduling, follow-up, fulfilment."
                            disabled={status === "loading"}
                            style={{ resize: "vertical", fontFamily: "var(--sans)" }}
                            {...aria("bottleneck")}
                            {...register("bottleneck")}
                          />
                        </Field>
                        <div
                          className="mono"
                          style={{
                            marginTop: 9,
                            fontSize: "0.68rem",
                            letterSpacing: "0.04em",
                            color: bottleneck.length >= BOTTLENECK_MIN ? "var(--acc1)" : "var(--txt3)",
                            textAlign: "right",
                          }}
                        >
                          {bottleneck.length} / {BOTTLENECK_MIN} min
                        </div>
                      </div>
                    ) : null}

                    {/* STEP 4: commitment */}
                    {step === 3 ? (
                      <div>
                        <label className="commit" data-on={commitment}>
                          <input
                            type="checkbox"
                            aria-invalid={errors.commitment ? true : undefined}
                            aria-describedby={errors.commitment ? "commitment-err" : undefined}
                            {...register("commitment")}
                          />
                          <span className="body" style={{ fontSize: "0.95rem", color: "var(--txt1)" }}>
                            I understand this is a high-ticket infrastructure investment, not a
                            cheap website build, and I have the capital and intent to deploy a
                            system.
                          </span>
                        </label>
                        {errors.commitment ? (
                          <span className="err" id="commitment-err" role="alert">
                            <IAlert width={14} height={14} />
                            {errors.commitment.message}
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                    </div>

                    {/* trust signals near the conversion point */}
                    <div className="trust" style={{ marginTop: 26 }}>
                      <span className="trust__item">
                        <IDot width={9} height={9} /> Your details are validated before sending
                      </span>
                      <span className="trust__item">
                        <IDot width={9} height={9} /> Reviewed within 1 business day
                      </span>
                    </div>

                    {step === last && !online ? (
                      <div
                        role="alert"
                        style={{
                          marginTop: 22,
                          border: "1px solid var(--color-error)",
                          background: "rgba(255,90,77,0.08)",
                          padding: "14px 16px",
                          display: "flex",
                          gap: 12,
                          alignItems: "center",
                        }}
                      >
                        <span style={{ color: "var(--color-error)" }}>
                          <IAlert width={18} height={18} />
                        </span>
                        <span className="body" style={{ fontSize: "0.92rem", color: "var(--txt1)" }}>
                          You are offline. Reconnect to the internet before submitting your
                          application.
                        </span>
                      </div>
                    ) : null}

                    {/* controls */}
                    <div
                      style={{
                        marginTop: 30,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 16,
                        flexWrap: "wrap",
                      }}
                    >
                      <button
                        onClick={back}
                        disabled={step === 0 || status === "loading"}
                        data-hover
                        style={{
                          background: "transparent",
                          border: "none",
                          color: step === 0 ? "var(--txt3)" : "var(--txt1)",
                          fontFamily: "var(--sans)",
                          fontWeight: 500,
                          fontSize: "0.9rem",
                          cursor: step === 0 ? "not-allowed" : "pointer",
                          padding: "8px 2px",
                          opacity: step === 0 ? 0.4 : 1,
                        }}
                      >
                        Back
                      </button>

                      {step < last ? (
                        <MagBtn variant="primary" onClick={next} disabled={status === "loading"}>
                          Continue <Arrow />
                        </MagBtn>
                      ) : (
                        <MagBtn
                          variant="primary"
                          onClick={() => handleSubmit(onValid)()}
                          disabled={status === "loading" || !online}
                        >
                          {status === "loading" ? (
                            <>
                              <span className="spin" /> Processing Data
                            </>
                          ) : (
                            <>
                              Submit application <Arrow />
                            </>
                          )}
                        </MagBtn>
                      )}
                    </div>
                  </div>
                )}
              </Spotlight>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
