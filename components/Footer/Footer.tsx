"use client";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "42px clamp(20px, 4vw, 48px)",
        borderTop: "1px solid var(--border)",
        background: "transparent",
        color: "var(--c1)",
        display: "grid",
        gap: 18,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap: 18,
          alignItems: "end",
        }}
      >
        <div style={{ display: "grid", gap: 6, fontSize: 14 }}>
          <div>CVR: 42497376</div>
          <div>Telefon: +45 61 74 64 16</div>
          <div>Email: info@bagved.dk</div>
          <div>Addresse: Frederiksvej 32, st. th., 2000 Frederiksberg</div>
        </div>

        <div style={{ display: "grid", gap: 10, textAlign: "center" }}>
          <a href="/mission" style={linkStyle}>Mission</a>
          <a href="/cookies" style={linkStyle}>Cookie Policy</a>
          <a href="/terms" style={linkStyle}>Terms and Conditions</a>
          <a href="/privacy" style={linkStyle}>Privacy Policy</a>
        </div>

        <div style={{ textAlign: "right", fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.75 }}>
          © 2026
        </div>
      </div>
    </footer>
  );
}

const linkStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--c1)",
  opacity: 0.82,
  borderBottom: "1px solid color-mix(in srgb, var(--c3) 18%, transparent)",
  paddingBottom: 6,
};
