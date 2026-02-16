export default function MissionPage() {
  return (
    <div className="container" style={{ padding: "96px 0" }}>
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
        Mission
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
        <p>
          Vores mission er at skabe klare, effektive visuelle og audiovisuelle
          løsninger, der kommunikerer budskaber med gennemslagskraft. Vi arbejder
          tværfagligt fra koncept til aflevering for at sikre kvalitet,
          tydelighed og målbar effekt.
        </p>

        <p>
          Tilgang: Vi kombinerer strategisk tænkning, kreativt håndværk og
          teknisk præcision. Hvert projekt tilpasses kundens mål, målgruppe og
          budget for at levere skræddersyede løsninger.
        </p>

        <p style={{ marginBottom: 0 }}>
          Vi prioriterer samarbejde, gennemsigtighed og ansvarlighed i alle
          faser af produktionen.
        </p>
      </div>
    </div>
  );
}
