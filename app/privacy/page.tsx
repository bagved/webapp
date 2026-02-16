export default function PrivacyPage() {
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
        <p>
          BAGVED behandler personoplysninger i overensstemmelse med gældende
          databeskyttelseslovgivning. Denne politik forklarer hvilke data vi
          indsamler, formålet med behandlingen og hvilke rettigheder du har.
        </p>

        <p>
          Vi indsamler kun nødvendige oplysninger (fx navn, e-mail og
          korrespondance) for at levere vores ydelser, administrere forespørgsler
          og forbedre vores kommunikation. Behandlingen sker på lovligt grundlag
          som samtykke eller berettiget interesse, afhængigt af formålet.
        </p>

        <p>
          Deling: Oplysninger kan deles med betroede tredjepartsleverandører
          (fx hosting, analytics) når det er nødvendigt, og altid under
          passende databehandleraftaler.
        </p>

        <p style={{ marginBottom: 0 }}>
          Rettigheder: Du har ret til indsigt, berigtigelse, sletning og
          dataportabilitet. Kontakt os på info@bagved.dk for at udøve dine
          rettigheder eller ved spørgsmål vedrørende dine data.
        </p>
      </div>
    </div>
  );
}
