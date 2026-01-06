import Container from "../../components/ui/Container";

export default function CasesPage() {
  return (
    <div className="section">
      <Container>
        <div className="stack">
          <h1 className="h1">Cases</h1>
          <div className="muted" style={{ maxWidth: 780 }}>
            Dedicated Cases page. Replace placeholders with real projects (thumb + details).
          </div>

          <div className="cardGrid">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="card" style={{ borderRadius: 0, minHeight: 140 }}>
                <h3 className="h3">Project #{i + 1}</h3>
                <div className="muted">Format, role, short result, date.</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
