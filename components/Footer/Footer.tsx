"use client";

export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        padding: "32px clamp(20px, 4vw, 48px)",
        background: "transparent", // ✅ no background
        color: "var(--c1)", // ✅ CHANGED to color 1
        fontFamily: "var(--font-body)",
        fontWeight: 300,
        fontSize: 14,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Left side */}
      <div
        style={{
          flex: "1",
          minWidth: 180,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <div>CVR: 42497376</div>
        <div>Telefon: +45 61 74 64 16</div>
        <div>Email: info@bagved.dk</div>
        <div>Addresse: Frederiksvej 32, st. th., 2000 Frederiksberg</div>
      </div>

      {/* Center links */}
      <div
        style={{
          flex: "1",
          minWidth: 200,
          display: "flex",
          justifyContent: "center",
          gap: 24,
          flexWrap: "wrap",
          textAlign: "center",
        }}
      >
        <a href="/terms" style={linkStyle}>Terms</a>
        <a href="/cookies" style={linkStyle}>Cookie Policy</a>
        <a href="/privacy" style={linkStyle}>Privacy Policy</a>
        <a href="/mission" style={linkStyle}>Mission</a>
      </div>

      {/* Right side */}
      <div
        style={{
          flex: "1",
          minWidth: 120,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <div>© 2026</div>
      </div>
    </footer>
  );
}

// Shared link style
const linkStyle: React.CSSProperties = {
  color: "var(--c1)", // ✅ CHANGED to color 1
  textDecoration: "none",
  fontWeight: 300,
  fontSize: 14,
  whiteSpace: "nowrap",
  transition: "opacity 0.2s",
  opacity: 0.85,
  cursor: "pointer",
};
