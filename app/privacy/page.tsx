import LogoWall from "../../components/sections/LogoWall";

export default function PrivacyPage() {
  return (
    <div style={{ position: "relative" }}>
      <LogoWall />
      <div className="container" style={{ position: "relative", zIndex: 1, padding: "96px 0" }}>
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
            Du har ret til indsigt, berigtigelse, sletning og dataportabilitet.
            Henvendelser rettes til info@bagved.com. Du kan også klage til
            Datatilsynet.
          </p>

          <p style={{ marginBottom: 0 }}>
            Vi opbevarer data så længe det er nødvendigt for formålet, og
            anvender passende sikkerhedsforanstaltninger for at beskytte dine
            oplysninger.
          </p>
        </div>
      </div>
    </div>
  );
}
