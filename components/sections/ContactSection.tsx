"use client";

import Link from "next/link";
import ContactTypewriter from "../ContactTypewriter";
import { useState, useEffect } from "react";

export default function ContactSection() {
  const [hover, setHover] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsSmall(window.innerWidth < 800);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

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
          height: "auto",
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
            padding: "clamp(24px, 5vw, 64px)",
            display: "grid",
            gap: 32,
          }}
        >
          {/* ✅ Header */}
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(24px, 5vw, 48px)",
              fontWeight: 900,
              color: "var(--c1)",
              lineHeight: 1.1,
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 14,
            }}
          >
            <span>Skriv til os</span>
            <span style={{ fontWeight: 800 }}>
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
                showCursor={true} // ✅ shows blinking line
              />
            </span>
          </div>

          {/* ✅ Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{
              display: "grid",
              gap: 24,
              marginTop: 4,
            }}
          >
            <div
              style={{
                display: "grid",
                gap: 16,
                gridTemplateColumns: isSmall
                  ? "1fr"
                  : "repeat(3, minmax(0, 1fr))",
              }}
            >
              <Field label="Navn" placeholder="Dit navn" />
              <Field label="Tlf." placeholder="+45 ..." />
              <Field label="Mail" placeholder="dig@firma.dk" />
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              <label style={labelStyle}>Besked</label>
              <textarea
                rows={6}
                placeholder="Skriv din besked..."
                style={{
                  background: "var(--c4)",
                  border: "1px solid rgba(11,11,12,0.16)",
                  borderRadius: 14,
                  padding: "14px 16px",
                  fontSize: 14,
                  fontFamily: "var(--font-body)",
                  color: "var(--text)",
                  outline: "none",
                  resize: "vertical",
                  lineHeight: 1.5,
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 6,
              }}
            >
              <button type="submit" className="sendBtn">
                Send
              </button>
            </div>
          </form>

          {/* ✅ Footer link */}
          <div style={{ marginTop: "auto" }}>
            <Link href="/contact" className="contactBottomLink">
              Hvis du er en mulig samarbejdespartner, fremtidig kollega eller
              nogen helt tredje, kan du også fortælle os mere om dig her
            </Link>
          </div>
        </div>

        {/* ✅ Styles */}
        <style jsx>{`
          .sendBtn {
            background: var(--c3); /* ✅ Color 3 */
            border: 1px solid rgba(11, 11, 12, 0.14);
            border-radius: 14px;
            padding: 14px 24px;
            font-family: var(--font-body);
            font-weight: 900;
            font-size: 15px;
            cursor: pointer;
            color: var(--text);
            transition: transform 160ms ease, filter 160ms ease, opacity 160ms ease;
            opacity: 0.95;
          }
          .sendBtn:hover {
            transform: scale(1.06); /* ✅ Slight scale */
            filter: brightness(1.05);
            opacity: 1;
          }

          .contactBottomLink {
            font-size: 10px;
            font-weight: 900;
            letter-spacing: -0.01em;
            color: var(--c1);
            transition: color 160ms ease;
            display: inline-block;
            max-width: 980px;
            line-height: 1.4;
          }
          .contactBottomLink:hover {
            color: var(--c5);
          }
        `}</style>
      </div>
    </section>
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
          fontSize: 14,
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
