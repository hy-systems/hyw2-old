"use client";

import React, { useState } from "react";
import { useCountUp, LinkButton, Arrow } from "./primitives";
import { aud } from "../lib/format";

const CLOSE = 0.4;
const RECOVER = 0.6;

export function RoiCalculator() {
  const [mc, setMc] = useState(45);
  const [av, setAv] = useState(450);
  const leak = mc * av * CLOSE;
  const recovered = leak * RECOVER;
  const aLeak = useCountUp(leak);
  const aYr = useCountUp(leak * 12);
  const aRec = useCountUp(recovered);

  return (
    <div className="roi-grid">
      <div
        style={{
          background: "var(--bg1)",
          padding: 34,
          display: "flex",
          flexDirection: "column",
          gap: 40,
          justifyContent: "center",
        }}
      >
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
            <label
              htmlFor="roi-mc"
              className="mono"
              style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--txt2)" }}
            >
              Missed calls / month
            </label>
            <span className="mono" style={{ fontSize: "1.6rem", color: "var(--txt)", fontWeight: 700 }}>
              {mc}
            </span>
          </div>
          <input
            id="roi-mc"
            type="range"
            min="5"
            max="150"
            step="1"
            value={mc}
            onChange={(e) => setMc(+e.target.value)}
            aria-label="Missed calls per month"
          />
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
            <label
              htmlFor="roi-av"
              className="mono"
              style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--txt2)" }}
            >
              Avg job value
            </label>
            <span className="mono" style={{ fontSize: "1.6rem", color: "var(--txt)", fontWeight: 700 }}>
              {aud(av)}
            </span>
          </div>
          <input
            id="roi-av"
            type="range"
            min="100"
            max="2000"
            step="25"
            value={av}
            onChange={(e) => setAv(+e.target.value)}
            aria-label="Average job value"
          />
        </div>
        <p className="mono" style={{ fontSize: "0.7rem", lineHeight: 1.65, color: "var(--txt3)" }}>
          Assumes a 40% close rate on answered leads and 60% recovery via automated text-back. Tune
          average job value to your numbers.
        </p>
      </div>
      <div
        style={{
          background: "var(--bg2)",
          padding: 34,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div>
          <div className="mono" style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--txt2)" }}>
            Revenue leaking / month
          </div>
          <div
            style={{
              fontFamily: "var(--sans)",
              fontWeight: 600,
              fontSize: "clamp(2.4rem,5.5vw,3.4rem)",
              color: "var(--acc1)",
              letterSpacing: "-0.025em",
              marginTop: 4,
            }}
          >
            {aud(aLeak)}
          </div>
        </div>
        <div>
          <div style={{ height: 8, background: "var(--bg3)", position: "relative", overflow: "hidden" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                width: RECOVER * 100 + "%",
                background: "linear-gradient(90deg,var(--acc),var(--acc2))",
                transition: "width .5s var(--e-expo)",
              }}
            />
          </div>
          <div
            className="mono"
            style={{ fontSize: "0.66rem", color: "var(--txt3)", marginTop: 8, display: "flex", justifyContent: "space-between" }}
          >
            <span>Recoverable {Math.round(RECOVER * 100)}%</span>
            <span>{aud(aRec)} / mo</span>
          </div>
        </div>
        <div style={{ height: 1, background: "var(--line)" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <div className="mono" style={{ fontSize: "0.64rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--txt3)" }}>
              Annualized leak
            </div>
            <div style={{ fontWeight: 600, fontSize: "1.5rem", marginTop: 4 }}>{aud(aYr)}</div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: "0.64rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--txt3)" }}>
              Recoverable / mo
            </div>
            <div style={{ fontWeight: 600, fontSize: "1.5rem", marginTop: 4, color: "#fff" }}>{aud(aRec)}</div>
          </div>
        </div>
        <div style={{ marginTop: 4 }}>
          <LinkButton href="/audit" variant="primary" style={{ padding: "13px 22px", fontSize: "0.88rem" }}>
            Book Revenue Leak Audit <Arrow />
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
