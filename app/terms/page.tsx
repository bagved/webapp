export default function TermsPage() {
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
        Terms and Conditions
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
          Disse vilkår gælder for brugen af BAGVEDs hjemmeside og de ydelser,
          der præsenteres her. Ved at benytte sitet accepterer du disse
          vilkår.
        </p>

        <p>
          Intellektuelle rettigheder: Alt materiale på sitet er ophavsretligt
          beskyttet og tilhører BAGVED eller vores licensgivere. Materialet må
          ikke gengives uden tilladelse.
        </p>

        <p>
          Ansvarsbegrænsning: Vi bestræber os på at holde indholdet korrekt,
          men kan ikke garantere fuldstændig nøjagtighed. BAGVED er ikke
          ansvarlig for indirekte tab eller tab som følge af brug af sitet.
        </p>

        <p style={{ marginBottom: 0 }}>
          Lovvalg og tvister: Enhver tvist afgøres efter dansk ret ved
          danske domstole, medmindre andet aftales.
        </p>
      </div>
    </div>
  );
}
