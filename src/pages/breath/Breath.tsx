/**
 * Zential Breath — /breath.
 * High-fidelity port of design-reference/editorial/zential-breath.dc.html.
 * Markup + inline styles are ported 1:1 from the sc-if blocks; keyframes and
 * :hover/:active states live in breath.css. Behavior is in useBreathEngine.
 *
 * Mandated deviations (only these): Poppins → 'DM Sans' (self-hosted; same
 * weights), five base colors → --ed-* tokens, internal Face Introducer link,
 * one pixelViewContent on mount, props folded to constants (in the hook), logo
 * asset swapped for the self-hosted mark, <SEO>, SSR guards (in the hook).
 */

import { useEffect, type CSSProperties } from "react";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { pixelViewContent } from "@/pages/editorial/tracking";
import { useBreathEngine } from "./useBreathEngine";
import "./breath.css";

const SANS = "'DM Sans', system-ui, sans-serif";
const SERIF = "'Lora', serif";

const FACE_INTRODUCER_LINK =
  "/instruments/face-introducer?utm_source=breath&utm_medium=app&utm_campaign=the-system";

// Shared style fragments (values identical to the design source).
const screenPad: CSSProperties = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  minHeight: "100dvh",
  padding: "60px 28px 108px",
  boxSizing: "border-box",
};
const topGlow: CSSProperties = {
  position: "absolute",
  left: "-30%",
  right: "-30%",
  top: "-22%",
  height: "58%",
  background: "radial-gradient(ellipse at 50% 0%, rgba(46,216,168,0.09) 0%, rgba(26,23,20,0) 62%)",
  animation: "zbHomeBreathe 12s ease-in-out infinite",
  pointerEvents: "none",
};
const kicker: CSSProperties = {
  fontFamily: SANS,
  fontWeight: 600,
  fontSize: "10px",
  letterSpacing: "0.32em",
  color: "var(--ed-gold)",
};
const roleLabel: CSSProperties = {
  fontFamily: SANS,
  fontWeight: 700,
  fontSize: "9px",
  letterSpacing: "0.3em",
  color: "var(--ed-gold)",
};
const numLabel: CSSProperties = {
  fontWeight: 300,
  fontSize: "10px",
  letterSpacing: "0.22em",
  color: "rgba(198,160,124,0.55)",
};
const actName: CSSProperties = {
  fontFamily: SERIF,
  fontStyle: "italic",
  fontSize: "40px",
  lineHeight: 1.08,
  marginTop: "9px",
  color: "var(--ed-on-dark)",
};
const actDesc: CSSProperties = {
  marginTop: "10px",
  fontWeight: 300,
  fontSize: "13px",
  lineHeight: 1.55,
  color: "rgba(247,244,240,0.55)",
  maxWidth: "310px",
};
const provenance: CSSProperties = {
  marginTop: "9px",
  fontWeight: 300,
  fontSize: "9.5px",
  letterSpacing: "0.13em",
  lineHeight: 1.75,
  color: "rgba(198,160,124,0.7)",
  textTransform: "uppercase",
  maxWidth: "320px",
};
const chipStyle: CSSProperties = {
  borderRadius: "9999px",
  padding: "0 18px",
  minHeight: "44px",
  fontFamily: SANS,
  fontWeight: 600,
  fontSize: "10px",
  letterSpacing: "0.18em",
  cursor: "pointer",
};
const pillStyle: CSSProperties = {
  borderRadius: "9999px",
  padding: "0 22px",
  minHeight: "44px",
  fontFamily: SANS,
  fontWeight: 600,
  fontSize: "10px",
  letterSpacing: "0.18em",
  cursor: "pointer",
};
const bigPill: CSSProperties = {
  borderRadius: "9999px",
  padding: "0 32px",
  minHeight: "46px",
  fontFamily: SANS,
  fontWeight: 600,
  fontSize: "10px",
  letterSpacing: "0.22em",
  cursor: "pointer",
};
const endBtn: CSSProperties = {
  position: "absolute",
  top: "24px",
  left: "20px",
  background: "transparent",
  border: "none",
  padding: "12px",
  cursor: "pointer",
  fontFamily: SANS,
  fontWeight: 600,
  fontSize: "9px",
  letterSpacing: "0.3em",
};
const logoWrap: CSSProperties = { width: "28px", height: "28px", animation: "zbHomeBreathe 12s ease-in-out infinite" };
const riseAt = (delay: string): CSSProperties => ({
  animation: `zbRiseIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}both`,
});
const sigDot = (path: string, dur: string): CSSProperties => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "6px",
  height: "6px",
  margin: "-3px",
  borderRadius: "50%",
  background: "var(--ed-teal)",
  boxShadow: "0 0 8px 2px rgba(46,216,168,0.7)",
  offsetPath: `path('${path}')`,
  animation: `zbTravel ${dur} linear infinite`,
});

function Logo() {
  return (
    <div style={logoWrap}>
      <img
        src="/editorial/logo/zential-mark-teal.png"
        alt=""
        width={26}
        height={26}
        style={{ width: 26, height: 26, display: "block" }}
      />
    </div>
  );
}

export default function Breath() {
  const v = useBreathEngine();

  useEffect(() => {
    pixelViewContent("breath-app");
  }, []);

  // Completion is the retargeting signal that matters — a finished session is
  // a warm audience. ViewContent only, per editorial pixel hygiene.
  useEffect(() => {
    if (v.isCredits) pixelViewContent("breath-session-complete");
  }, [v.isCredits]);

  return (
    <>
      <SEO
        title="The Breath — Zential Pure"
        description="The instruments return the energy. The breath returns the rhythm. Three breathing practices, calibrated to the same return."
        canonicalUrl="/breath"
      />
      <Helmet>
        <meta name="theme-color" content="#1A1714" />
      </Helmet>
      <div
        className="zb-root"
        data-screen-label="Zential Breath"
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100dvh",
          background: "radial-gradient(ellipse 120% 90% at 50% 42%, #211D19 0%, var(--ed-dark) 64%)",
          color: "var(--ed-on-dark)",
          fontFamily: SANS,
          overflow: "hidden",
        }}
      >
        <div style={{ opacity: v.rootOpacity, transition: "opacity 0.65s ease", minHeight: "100dvh", display: "flex", flexDirection: "column" }}>

          {/* ─── HOME ─────────────────────────────────────────────────────── */}
          {v.isHome && (
            <div data-screen-label="Home" className="zb-screen" style={screenPad}>
              <div style={topGlow} />
              <div data-rise style={{ animation: "zbRiseIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                <Logo />
                <div style={{ ...kicker, marginTop: "22px" }}>ZENTIAL PURE · BREATH</div>
                <h1 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "56px", lineHeight: 1.02, margin: "16px 0 0", letterSpacing: "-0.02em", color: "var(--ed-on-dark)" }}>The Breath</h1>
                <div style={{ marginTop: "14px", fontWeight: 300, fontSize: "13px", lineHeight: 1.6, color: "rgba(247,244,240,0.55)", maxWidth: "290px" }}>The instruments return the energy. The breath returns the rhythm.</div>
                <div style={{ marginTop: "28px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ height: "1px", flex: "0 0 28px", background: "rgba(198,160,124,0.5)" }} />
                  <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: "8.5px", letterSpacing: "0.3em", color: "rgba(198,160,124,0.7)" }}>THE PROGRAM · THREE ACTS</div>
                </div>
              </div>

              <div style={{ marginTop: "34px", display: "flex", flexDirection: "column" }}>
                {/* Act 01 — Meditate */}
                <div data-rise style={{ borderTop: "1px solid rgba(247,244,240,0.10)", padding: "24px 0 28px", ...riseAt("0.15s ") }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                    <div style={roleLabel}>OBSERVE</div>
                    <div style={numLabel}>( 01 )</div>
                  </div>
                  <div style={actName}>Meditate</div>
                  <div style={{ position: "relative", width: "100%", maxWidth: "320px", height: "48px", marginTop: "12px" }}>
                    <svg width="100%" height="48" viewBox="0 0 320 48" preserveAspectRatio="none" style={{ display: "block" }}>
                      <path d="M0 24 Q40 6 80 24 T160 24 Q200 10 240 24 T320 24" style={{ fill: "none", stroke: "rgba(46,216,168,0.32)", strokeWidth: 1.2 }} />
                    </svg>
                    <div data-sig style={sigDot("M0 24 Q40 6 80 24 T160 24 Q200 10 240 24 T320 24", "10.4s")} />
                  </div>
                  <div style={actDesc}>No forced rhythm. Attend to the breath at the nostrils or the belly. Nothing to control.</div>
                  <div style={provenance}>Anapanasati — the breath-awareness practice at the root of Buddhist meditation.</div>
                  <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                    {v.medChips.map((c) => (
                      <button key={c.label} className="zb-pill" onClick={c.start} style={chipStyle}>{c.label}</button>
                    ))}
                  </div>
                </div>

                {/* Act 02 — Restore */}
                <div data-rise style={{ borderTop: "1px solid rgba(247,244,240,0.10)", padding: "24px 0 28px", ...riseAt("0.3s ") }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                    <div style={roleLabel}>SYNCHRONIZE</div>
                    <div style={numLabel}>( 02 )</div>
                  </div>
                  <div style={actName}>Restore</div>
                  <div style={{ position: "relative", width: "100%", maxWidth: "320px", height: "48px", marginTop: "12px" }}>
                    <svg width="100%" height="48" viewBox="0 0 320 48" preserveAspectRatio="none" style={{ display: "block" }}>
                      <path d="M0 24 Q40 4 80 24 T160 24 Q200 4 240 24 T320 24" style={{ fill: "none", stroke: "rgba(46,216,168,0.32)", strokeWidth: 1.2 }} />
                    </svg>
                    <div data-sig style={sigDot("M0 24 Q40 4 80 24 T160 24 Q200 4 240 24 T320 24", "11s")} />
                  </div>
                  <div style={actDesc}>{v.resDesc}</div>
                  <div style={provenance}>Coherent breathing — the rate at which heart rhythm and breath fall into phase.</div>
                  <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                    {v.resChips.map((c) => (
                      <button key={c.label} className="zb-pill" onClick={c.start} style={chipStyle}>{c.label}</button>
                    ))}
                  </div>
                </div>

                {/* Act 03 — Reset */}
                <div data-rise style={{ borderTop: "1px solid rgba(247,244,240,0.10)", padding: "24px 0 28px", ...riseAt("0.45s ") }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                    <div style={roleLabel}>RELEASE</div>
                    <div style={numLabel}>( 03 )</div>
                  </div>
                  <div style={actName}>Reset</div>
                  <div style={{ position: "relative", width: "100%", maxWidth: "320px", height: "48px", marginTop: "12px" }}>
                    <svg width="100%" height="48" viewBox="0 0 320 48" preserveAspectRatio="none" style={{ display: "block" }}>
                      <path d="M0 40 Q14 22 26 26 Q34 29 44 12 Q54 4 66 14 Q120 36 320 40" style={{ fill: "none", stroke: "rgba(46,216,168,0.32)", strokeWidth: 1.2 }} />
                    </svg>
                    <div data-sig style={sigDot("M0 40 Q14 22 26 26 Q34 29 44 12 Q54 4 66 14 Q120 36 320 40", "8.5s")} />
                  </div>
                  <div style={actDesc}>Two inhales through the nose, then one long release. The downshift between tasks.</div>
                  <div style={provenance}>The physiological sigh — the breath pattern the body already uses to reset itself. Commonly used for rapid downregulation.</div>
                  <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                    {v.rstChips.map((c) => (
                      <button key={c.label} className="zb-pill" onClick={c.start} style={chipStyle}>{c.label}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div data-rise style={{ marginTop: "auto", paddingTop: "24px", borderTop: "1px solid rgba(247,244,240,0.10)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", ...riseAt("0.6s ") }}>
                <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: "9px", letterSpacing: "0.28em", color: "rgba(247,244,240,0.35)" }}>CUES</div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={v.toggleTone} aria-pressed={v.toneOn} style={{ background: "transparent", border: "none", padding: "12px 6px", cursor: "pointer", fontFamily: SANS, fontWeight: 600, fontSize: "9px", letterSpacing: "0.24em", color: v.toneColor }}>TONE · {v.toneState}</button>
                  <button onClick={v.togglePulse} aria-pressed={v.pulseOn} style={{ background: "transparent", border: "none", padding: "12px 6px", cursor: "pointer", fontFamily: SANS, fontWeight: 600, fontSize: "9px", letterSpacing: "0.24em", color: v.pulseColor }}>PULSE · {v.pulseState}</button>
                </div>
              </div>
            </div>
          )}

          {/* ─── PROTOCOLS ────────────────────────────────────────────────── */}
          {v.isProtocols && (
            <div data-screen-label="Protocols" className="zb-screen" style={screenPad}>
              <div style={topGlow} />
              <div data-rise style={{ animation: "zbRiseIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                <div style={kicker}>ZENTIAL PURE · BREATH</div>
                <h1 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "48px", lineHeight: 1.04, margin: "16px 0 0", letterSpacing: "-0.02em", color: "var(--ed-on-dark)" }}>Protocols</h1>
                <div style={{ marginTop: "14px", fontWeight: 300, fontSize: "13px", lineHeight: 1.6, color: "rgba(247,244,240,0.55)", maxWidth: "300px" }}>One practice prepares the next. A protocol runs the acts in sequence.</div>
              </div>
              <div style={{ marginTop: "34px", display: "flex", flexDirection: "column" }}>
                {v.protocols.map((p) => (
                  <div key={p.name} data-rise style={{ borderTop: "1px solid rgba(247,244,240,0.10)", padding: "24px 0 28px", ...riseAt("0.2s ") }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                      <div style={roleLabel}>{p.role}</div>
                      <div style={numLabel}>{p.num}</div>
                    </div>
                    <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "34px", lineHeight: 1.1, marginTop: "9px", color: "var(--ed-on-dark)" }}>{p.name}</div>
                    <div style={{ marginTop: "10px", fontFamily: SANS, fontWeight: 600, fontSize: "9px", letterSpacing: "0.22em", color: "rgba(46,216,168,0.75)" }}>{p.seqText}</div>
                    <div style={actDesc}>{p.desc}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "16px" }}>
                      <button className="zb-pill" onClick={p.begin} style={pillStyle}>BEGIN</button>
                      <div style={{ fontWeight: 300, fontSize: "10px", letterSpacing: "0.22em", color: "rgba(247,244,240,0.35)" }}>{p.totalText}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── SYSTEM ───────────────────────────────────────────────────── */}
          {v.isSystem && (
            <div data-screen-label="The System" className="zb-screen" style={screenPad}>
              <div style={topGlow} />
              <div data-rise style={{ animation: "zbRiseIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                <Logo />
                <div style={{ ...kicker, marginTop: "22px" }}>RESONANCE RESTORATION</div>
                <h1 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "48px", lineHeight: 1.04, margin: "16px 0 0", letterSpacing: "-0.02em", color: "var(--ed-on-dark)" }}>The System</h1>
                <div style={{ marginTop: "14px", fontWeight: 300, fontSize: "13px", lineHeight: 1.6, color: "rgba(247,244,240,0.55)", maxWidth: "300px" }}>Two channels. One return.</div>
              </div>

              <div data-rise style={{ margin: "40px 0 6px", ...riseAt("0.15s ") }}>
                <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "24px", lineHeight: 1.4, color: "rgba(247,244,240,0.85)", maxWidth: "300px" }}>The body remembers its frequency.</div>
              </div>

              <div style={{ marginTop: "28px", display: "flex", flexDirection: "column" }}>
                <div data-rise style={{ borderTop: "1px solid rgba(247,244,240,0.10)", padding: "24px 0 28px", ...riseAt("0.3s ") }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                    <div style={roleLabel}>FROM THE OUTSIDE</div>
                    <div style={numLabel}>( 01 )</div>
                  </div>
                  <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "34px", lineHeight: 1.1, marginTop: "9px", color: "var(--ed-on-dark)" }}>The Instruments</div>
                  <div style={actDesc}>Calibrated electrical pulses and lightwaves, returned to the tissue. The Face Introducer runs a 12 minute daily ritual.</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "14px" }}>
                    {["EMS", "MICROCURRENT", "THERMAL", "LED 630–660NM"].map((tag) => (
                      <div key={tag} style={{ border: "1px solid rgba(247,244,240,0.14)", borderRadius: "9999px", padding: "7px 12px", fontFamily: SANS, fontWeight: 600, fontSize: "8px", letterSpacing: "0.2em", color: "rgba(247,244,240,0.55)" }}>{tag}</div>
                    ))}
                  </div>
                  <a href={FACE_INTRODUCER_LINK} style={{ display: "inline-block", marginTop: "16px", fontFamily: SANS, fontWeight: 600, fontSize: "9px", letterSpacing: "0.24em", color: "rgba(198,160,124,0.85)" }}>ORDER THE FACE INTRODUCER · €88. ONCE.</a>
                </div>

                <div data-rise style={{ borderTop: "1px solid rgba(247,244,240,0.10)", padding: "24px 0 28px", ...riseAt("0.45s ") }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                    <div style={roleLabel}>FROM WITHIN</div>
                    <div style={numLabel}>( 02 )</div>
                  </div>
                  <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "34px", lineHeight: 1.1, marginTop: "9px", color: "var(--ed-on-dark)" }}>The Breath</div>
                  <div style={actDesc}>The body's own instrument. Three acts, calibrated to the same return.</div>
                  <button className="zb-pill" onClick={v.goPractice} style={{ ...pillStyle, marginTop: "16px" }}>BEGIN THE PRACTICE</button>
                </div>
              </div>
            </div>
          )}

          {/* ─── LEDGER ───────────────────────────────────────────────────── */}
          {v.isLedger && (
            <div data-screen-label="The Ledger" className="zb-screen" style={screenPad}>
              <div data-rise style={{ animation: "zbRiseIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                <div style={kicker}>ZENTIAL PURE · BREATH</div>
                <h1 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "48px", lineHeight: 1.04, margin: "16px 0 0", letterSpacing: "-0.02em", color: "var(--ed-on-dark)" }}>The Ledger</h1>
              </div>

              {v.hasLog && (
                <>
                  <div data-rise style={{ marginTop: "26px", display: "flex", flexDirection: "column", gap: "8px", ...riseAt("0.15s ") }}>
                    <div style={{ fontWeight: 300, fontSize: "10.5px", letterSpacing: "0.22em", color: "rgba(198,160,124,0.85)" }}>CONTINUITY · {v.continuityText}</div>
                    <div style={{ fontWeight: 300, fontSize: "10.5px", letterSpacing: "0.22em", color: "rgba(247,244,240,0.5)" }}>THIS WEEK · {v.weekText}</div>
                    <div style={{ fontWeight: 300, fontSize: "10.5px", letterSpacing: "0.22em", color: "rgba(247,244,240,0.5)" }}>SESSIONS · {v.sessionCount}</div>
                  </div>
                  <div style={{ marginTop: "30px", display: "flex", flexDirection: "column" }}>
                    {v.ledger.map((e, i) => (
                      <div key={i} style={{ borderTop: "1px solid rgba(247,244,240,0.10)", padding: "16px 0", display: "flex", alignItems: "baseline", gap: "14px" }}>
                        <div style={{ flex: "0 0 58px", fontWeight: 300, fontSize: "9.5px", letterSpacing: "0.18em", color: "rgba(198,160,124,0.7)" }}>{e.date}</div>
                        <div style={{ flex: 1, fontFamily: SERIF, fontStyle: "italic", fontSize: "17px", color: "rgba(247,244,240,0.85)" }}>{e.name}</div>
                        <div style={{ fontWeight: 300, fontSize: "9.5px", letterSpacing: "0.18em", color: "rgba(247,244,240,0.4)" }}>{e.spec}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {v.noLog && (
                <div data-rise style={{ marginTop: "80px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "24px", ...riseAt("0.15s ") }}>
                  <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "26px", lineHeight: 1.4, color: "rgba(247,244,240,0.85)", maxWidth: "280px" }}>The record begins with the first breath.</div>
                  <button className="zb-pill" onClick={v.goPractice} style={pillStyle}>BEGIN THE PRACTICE</button>
                </div>
              )}
            </div>
          )}

          {/* ─── INTERLUDE ────────────────────────────────────────────────── */}
          {v.isInterlude && (
            <div data-screen-label="Interlude" style={{ position: "relative", height: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 32px", boxSizing: "border-box" }}>
              <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: "9px", letterSpacing: "0.3em", color: "var(--ed-gold)", paddingLeft: "0.3em" }}>PROTOCOL · {v.protoNameCaps}</div>
              <div style={{ marginTop: "34px", fontFamily: SANS, fontWeight: 600, fontSize: "9px", letterSpacing: "0.3em", color: "rgba(247,244,240,0.4)", paddingLeft: "0.3em" }}>NEXT</div>
              <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "44px", marginTop: "12px", color: "var(--ed-on-dark)" }}>{v.nextName}</div>
              <div style={{ marginTop: "12px", fontWeight: 300, fontSize: "10.5px", letterSpacing: "0.22em", color: "rgba(247,244,240,0.5)" }}>{v.nextSpec}</div>
              <div style={{ width: "44px", height: "1px", background: "var(--ed-teal)", margin: "30px 0 26px" }} />
              <div style={{ fontWeight: 300, fontSize: "12px", lineHeight: 1.6, color: "rgba(247,244,240,0.45)", maxWidth: "250px" }}>Continues in a moment. Or begin.</div>
              <button className="zb-pill" onClick={v.beginNext} style={{ ...bigPill, marginTop: "34px" }}>BEGIN</button>
              <button onClick={v.endEarly} style={{ ...endBtn, color: "rgba(247,244,240,0.35)" }}>END</button>
            </div>
          )}

          {/* ─── SESSION ──────────────────────────────────────────────────── */}
          {v.isSession && (
            <div data-screen-label="Session" style={{ position: "relative", height: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

              <div data-ambient style={{ position: "absolute", inset: "-25%", background: `radial-gradient(circle at 50% 50%, ${v.ambientRGBA} 0%, rgba(26,23,20,0) 60%)`, transform: `scale(${v.ambientScale})`, opacity: v.ambientOpacity, transition: `transform ${v.phaseDur}s cubic-bezier(0.45, 0, 0.55, 1), opacity ${v.phaseDur}s cubic-bezier(0.45, 0, 0.55, 1)`, pointerEvents: "none" }} />

              {v.terraWash && (
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 70% at 50% 72%, rgba(155,90,46,0.10) 0%, rgba(155,90,46,0) 62%)", pointerEvents: "none" }} />
              )}

              {v.isRestore && (
                <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: "140px", marginTop: "-70px", overflow: "hidden", pointerEvents: "none", opacity: 0.45 }}>
                  <div data-wave style={{ width: "200%", height: "100%", animation: `zbWaveScroll ${v.waveDur}s linear infinite` }}>
                    <svg width="100%" height="100%" viewBox="0 0 1600 140" preserveAspectRatio="none" style={{ display: "block" }}>
                      <path d="M0 70 Q200 14 400 70 T800 70 Q1000 14 1200 70 T1600 70" style={{ fill: "none", stroke: "var(--ed-teal)", strokeWidth: 1.4, opacity: 0.75, filter: "drop-shadow(0 0 6px rgba(46,216,168,0.8))" }} />
                    </svg>
                  </div>
                </div>
              )}

              <button className="zb-end" onClick={v.endEarly} style={{ ...endBtn, zIndex: 5 }}>END</button>

              {v.inProtocol && (
                <div style={{ position: "absolute", top: "33px", right: "24px", fontFamily: SANS, fontWeight: 600, fontSize: "8.5px", letterSpacing: "0.24em", color: "rgba(198,160,124,0.6)" }}>{v.protoTag}</div>
              )}

              <div aria-live="polite" style={{ position: "absolute", top: "17%", left: 0, right: 0, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: "11px", letterSpacing: "0.38em", color: "rgba(247,244,240,0.72)", paddingLeft: "0.38em" }}>{v.phaseWord}</div>

              <div style={{ position: "relative", width: "264px", height: "264px", display: "flex", alignItems: "center", justifyContent: "center" }}>

                <div data-spin style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "conic-gradient(from 0deg, rgba(46,216,168,0) 0%, rgba(46,216,168,0.55) 28%, rgba(198,160,124,0.35) 48%, rgba(46,216,168,0.10) 62%, rgba(46,216,168,0) 78%)", WebkitMask: "radial-gradient(circle, transparent 55%, black 60%, black 63%, transparent 69%)", mask: "radial-gradient(circle, transparent 55%, black 60%, black 63%, transparent 69%)", animation: "zbSpinSlow 34s linear infinite", opacity: 0.7 }} />

                <svg width="264" height="264" viewBox="0 0 264 264" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)", overflow: "visible" }}>
                  <defs>
                    <linearGradient id="zbBreathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "#2ED8A8" }} />
                      <stop offset="70%" style={{ stopColor: "#1BAF86" }} />
                      <stop offset="100%" style={{ stopColor: "#C6A07C" }} />
                    </linearGradient>
                  </defs>
                  <circle cx="132" cy="132" r="118" style={{ fill: "none", stroke: "rgba(247,244,240,0.08)", strokeWidth: 1 }} />
                  <circle cx="132" cy="132" r="118" style={{ fill: "none", stroke: "url(#zbBreathGrad)", strokeWidth: 1.6, strokeLinecap: "round", strokeDasharray: 741.4, strokeDashoffset: v.ringOffset, transition: `stroke-dashoffset ${v.phaseDur}s cubic-bezier(0.45, 0, 0.55, 1)`, filter: "drop-shadow(0 0 5px rgba(46,216,168,0.6))" }} />
                </svg>

                <div data-orb style={{ width: "140px", height: "140px", borderRadius: "50%", background: "radial-gradient(circle at 50% 50%, rgba(46,216,168,0.95) 0%, rgba(46,216,168,0.45) 38%, rgba(46,216,168,0.10) 62%, rgba(46,216,168,0) 72%)", boxShadow: "0 0 60px 24px rgba(46,216,168,0.22), 0 0 160px 70px rgba(46,216,168,0.10), 0 0 300px 150px rgba(46,216,168,0.045)", transform: `scale(${v.orbScale})`, transition: `transform ${v.phaseDur}s cubic-bezier(0.45, 0, 0.55, 1)`, animation: "zbGlowDrift 7s ease-in-out infinite" }} />
              </div>

              {v.showCounter && (
                <div style={{ position: "absolute", bottom: "24%", left: 0, right: 0, textAlign: "center", fontFamily: SERIF, fontStyle: "italic", fontSize: "28px", color: "rgba(198,160,124,0.85)" }}>{v.countText}</div>
              )}

              {v.isRestore && (
                <div style={{ position: "absolute", bottom: "15%", left: 0, right: 0, textAlign: "center", fontWeight: 300, fontSize: "9.5px", letterSpacing: "0.24em", color: "rgba(198,160,124,0.7)", paddingLeft: "0.24em" }}>0.09 HZ · THE RESONANCE RATE</div>
              )}

              <div style={{ position: "absolute", bottom: "9%", left: 0, right: 0, textAlign: "center", fontWeight: 300, fontSize: "11px", letterSpacing: "0.24em", color: "rgba(247,244,240,0.35)", paddingLeft: "0.24em" }}>{v.remainingText}</div>
            </div>
          )}

          {/* ─── CREDITS ──────────────────────────────────────────────────── */}
          {v.isCredits && (
            <div data-screen-label="Post-session" style={{ position: "relative", height: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 32px", boxSizing: "border-box" }}>
              <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: "10px", letterSpacing: "0.34em", color: "var(--ed-gold)", paddingLeft: "0.34em" }}>{v.creditsKicker}</div>
              <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "42px", marginTop: "16px", color: "var(--ed-on-dark)" }}>{v.creditsMode}</div>
              <div style={{ width: "44px", height: "1px", background: "var(--ed-teal)", margin: "28px 0 24px" }} />
              {v.specs.map((s, i) => (
                <div key={i} style={{ fontWeight: 300, fontSize: "10.5px", letterSpacing: "0.22em", color: "rgba(247,244,240,0.6)", margin: "7px 0", textTransform: "uppercase" }}>{s.k} · {s.v}</div>
              ))}
              <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "19px", lineHeight: 1.5, color: "rgba(247,244,240,0.85)", marginTop: "42px", maxWidth: "280px" }}>Your skin responds to the same stillness.</div>
              <a href="/instruments?utm_source=breath&utm_medium=app&utm_campaign=session-complete" style={{ display: "inline-block", fontFamily: SANS, fontWeight: 600, fontSize: "8.5px", letterSpacing: "0.26em", lineHeight: 2, color: "rgba(198,160,124,0.75)", marginTop: "20px", maxWidth: "300px" }}>PAIR WITH THE SYSTEM — THREE INSTRUMENTS, ONE RETURN</a>
              <button className="zb-pill" onClick={v.returnHome} style={{ ...bigPill, marginTop: "44px" }}>RETURN</button>
            </div>
          )}

        </div>

        {/* ─── FIXED NAV ──────────────────────────────────────────────────── */}
        {v.showNav && (
          <nav aria-label="Breath" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40, padding: "6px 8px 14px", borderTop: "1px solid rgba(247,244,240,0.10)", background: "var(--ed-dark)" }}>
            <div className="zb-nav-inner">
              {v.navItems.map((n) => (
                <button key={n.label} onClick={n.go} aria-current={n.active ? "page" : undefined} style={{ background: "transparent", border: "none", cursor: "pointer", padding: "16px 8px", minHeight: "44px", fontFamily: SANS, fontWeight: 600, fontSize: "8.5px", letterSpacing: "0.22em", color: n.color, transition: "color 0.3s ease" }}>{n.label}</button>
              ))}
            </div>
          </nav>
        )}

        {/* ─── GRAIN ──────────────────────────────────────────────────────── */}
        {v.grainOn && (
          <div style={{ position: "fixed", inset: 0, zIndex: 60, pointerEvents: "none", opacity: 0.035, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
        )}
      </div>
    </>
  );
}
