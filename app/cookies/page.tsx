export default function CookiesPage() {
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
          textTransform: "none",
        }}
      >
        Cookie Policy
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
          Vi anvender cookies og tilsvarende teknologier for at forbedre din
          oplevelse på siden, analysere trafik og levere relevante funktioner.
        </p>

        <p>
          Typer af cookies: Nødvendige cookies, der sikrer basale funktioner;
          præference-cookies, der husker dine valg; og analytiske cookies, som
          hjælper os med at forstå, hvordan siden anvendes. Tredjepartsudbydere
          (fx analytics- eller reklametjenester) kan også placere cookies.
        </p>

        <p>
          Du kan når som helst trække dit samtykke tilbage eller slette
          cookies via din browser. Bemærk, at blokering af visse cookies kan
          påvirke funktionaliteten på sitet.
        </p>

        <p style={{ marginBottom: 0 }}>
          Har du spørgsmål til vores cookie-praksis, kontakt os på
          info@bagved.dk.
        </p>
      </div>
    </div>
  );
}
