
"use client";

import Link from "next/link";
import React from "react";

export default function ContactPage() {
  return (
    <div className="container" style={{ padding: "96px 0" }}>
      <h1
        style={{
          margin: "0 0 12px",
          fontFamily: "var(--font-heading)",
          fontWeight: 500,
          lineHeight: 1.12,
          fontSize: "clamp(28px, 3.2vw, 44px)",
          color: "color-mix(in srgb, var(--c1) 92%, transparent)",
        }}
      >
        Kontakt
      </h1>

      <p style={{ margin: 0, marginBottom: 18, color: "color-mix(in srgb, var(--c1) 72%, transparent)", maxWidth: "70ch" }}>
        Vi hjælper gerne med spørgsmål om produktion, priser eller samarbejde.
        Ring, skriv eller udfyld formularen — så vender vi tilbage hurtigst muligt.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <div>
          <h2 style={{ marginTop: 0, marginBottom: 8, fontWeight: 600 }}>Kontaktoplysninger</h2>
          <p style={{ margin: 0 }}>Tlf: <a href="tel:+4561746416">+45 61 74 64 16</a></p>
          <p style={{ margin: 0 }}>E-mail: <a href="mailto:info@bagved.dk">info@bagved.dk</a></p>
          <p style={{ marginTop: 8, marginBottom: 0 }}>Adresse: Frederiksvej 32, st. th., 2000 Frederiksberg</p>
        </div>

        <div>
          <h2 style={{ marginTop: 0, marginBottom: 8, fontWeight: 600 }}>Send en besked</h2>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: "grid", gap: 10 }}>
            <input name="name" placeholder="Navn" style={{ padding: 10, border: "1px solid color-mix(in srgb, var(--c1) 12%, transparent)", background: "transparent" }} />
            <input name="email" placeholder="Email" style={{ padding: 10, border: "1px solid color-mix(in srgb, var(--c1) 12%, transparent)", background: "transparent" }} />
            <textarea name="message" placeholder="Besked" rows={6} style={{ padding: 10, border: "1px solid color-mix(in srgb, var(--c1) 12%, transparent)", background: "transparent" }} />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" className="send">Send besked</button>
              </div>
          </form>
        </div>
      </div>

      <p style={{ marginTop: 28 }}>
        Eller se vores <Link href="/cases">eksempler</Link> og <Link href="/services">ydelser</Link> for mere information.
      </p>
    </div>
  );
}
