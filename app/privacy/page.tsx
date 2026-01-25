export default function PrivacyPage() {
  return (
    <div className="container" style={{ padding: "96px 0" }}>
      <div
        style={{
          fontSize: "var(--t11)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontWeight: 900,
          color: "color-mix(in srgb, var(--c1) 62%, transparent)",
        }}
      >
        Privacy
      </div>

      <h1
        style={{
          margin: "14px 0 0",
          fontFamily: "var(--font-heading)",
          fontWeight: 350,
          letterSpacing: "-0.02em",
          lineHeight: 1.12,
          fontSize: "clamp(28px, 3.2vw, 44px)",
          color: "color-mix(in srgb, var(--c1) 92%, transparent)",
        }}
      >
        Privacy Policy
      </h1>

      <div
        style={{
          marginTop: 18,
          fontSize: "var(--t14)",
          lineHeight: 1.7,
          color: "color-mix(in srgb, var(--c1) 72%, transparent)",
          maxWidth: "70ch",
        }}
      >
        <p style={{ margin: 0 }}>Indhold kommer snart.</p>
      </div>
    </div>
  );
}
