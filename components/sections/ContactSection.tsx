"use client";

import Link from "next/link";
import ContactTypewriter from "../ContactTypewriter";
import { useState } from "react";

export default function ContactSection() {
  const [hover, setHover] = useState(false);

  return (
    <section
      id="contact"
      style={{
        padding: "96px 0",
        background: "transparent",
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: "min(calc(100vw - 48px), 1900px)",
          height: "min(90vh, 760px)",
          background: "var(--c2)",
          borderRadius: 0,
          border: "1px solid rgba(11,11,12,0.10)",
          position: "relative",
          overflow: "hidden",
          display: "grid",
          transform: hover ? "translateY(-2px)" : "translateY(0px)",
          boxShadow: hover
            ? "0 34px 110px rgba(0,0,0,0.14)"
            : "0 28px 90px rgba(0,0,0,0.10)",
          transition: "transform 180ms ease, box-shadow 220ms ease",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "32px 34px",
            display: "grid",
            gap: 22,
          }}
        >
          {/* ✅ One continuous headline line: "Skriv til os " + typewriter */}
          <div
            style={{
              fontFamily: "var(--font-heading)", // ✅ same font for both parts
              fontSize: 28,
              fontWeight: 900,
              color: "var(--c1)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              display: "flex",
              alignItems: "baseline",
              flexWrap: "wrap", // wraps nicely on small screens
              gap: 10,
              minHeight: 34, // reduces layout jump
            }}
          >
            <span>Skriv til os</span>
            <span
              style={{
                // keep same style, but slightly softer weight so it feels like continuation
                fontWeight: 800,
              }}
            >
              <ContactTypewriter
                phrases={[
                  "her, eller på info@bagved.com",
                  "eller ring på +45 61 74 64 16",
                  "hvor end du foretrækker!",
                ]}
                startDelayMs={220}
                typeMs={80}
                deleteMs={55}
                pauseMs={2800}
              />
            </span>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{
              display: "grid",
              gap: 18,
              marginTop: 4,
            }}
          >
            <Row>
              <Field label="Navn" placeholder="Dit navn" />
              <Field label="Tlf." placeholder="+45 ..." />
              <Field label="Mail" placeholder="dig@firma.dk" />
            </Row>

            <div style={{ display: "grid", gap: 10 }}>
              <label style={labelStyle}>Besked</label>
              <textarea
                rows={7}
                placeholder="Skriv din besked..."
                style={{
                  background: "var(--c4)",
                  border: "1px solid rgba(11,11,12,0.16)",
                  borderRadius: 14,
                  padding: "14px 14px",
                  fontSize: 12,
                  fontFamily: "var(--font-body)",
                  color: "var(--text)",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
              <button type="submit" className="sendBtn">
                Send
              </button>
            </div>
          </form>

          {/* Bottom helper link */}
          <div style={{ marginTop: "auto" }}>
            <Link href="/contact" className="contactBottomLink">
              Hvis du er en mulig samarbejdespartner, fremtidig kollega eller nogen helt tredje, kan du også fortælle os mere om dig her
            </Link>
          </div>
        </div>

        <style jsx>{`
          .sendBtn {
            background: var(--c5);
            border: 1px solid rgba(11, 11, 12, 0.14);
            border-radius: 14px;
            padding: 12px 18px;
            font-family: var(--font-body);
            font-weight: 900;
            font-size: 14px;
            cursor: pointer;
            color: var(--text);
            transition: transform 160ms ease, filter 160ms ease, opacity 160ms ease;
            opacity: 0.95;
          }
          .sendBtn:hover {
            transform: translateY(-1px);
            filter: brightness(1.02);
            opacity: 1;
          }

          .contactBottomLink {
            font-size: 8px;
            font-weight: 900;
            letter-spacing: -0.01em;
            color: var(--c1);
            transition: color 160ms ease;
            display: inline-block;
            max-width: 980px;
          }
          .contactBottomLink:hover {
            color: var(--c5);
          }
        `}</style>
      </div>
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gap: 14,
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      }}
    >
      {children}
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label style={labelStyle}>{label}</label>
      <input
        placeholder={placeholder}
        style={{
          background: "var(--c4)",
          border: "1px solid rgba(11,11,12,0.16)",
          borderRadius: 14,
          padding: "12px 14px",
          fontSize: 12,
          fontFamily: "var(--font-body)",
          color: "var(--text)",
          outline: "none",
        }}
      />
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 900,
  color: "var(--text)",
  opacity: 0.9,
  fontFamily: "var(--font-body)",
};
