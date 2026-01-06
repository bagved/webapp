import Container from "../ui/Container";
import Link from "next/link";

export default function CasesSection() {
  return (
    <section id="cases" className="section">
      <Container>
        <div className="sectionTitleRow">
          <h2 className="h2">Cases</h2>
          <Link className="btn" href="/cases">Open cases →</Link>
        </div>

        <div className="cardGrid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card" style={{ borderRadius: 0 }}>
              <h3 className="h3">Case #{i + 1}</h3>
              <div className="muted">Placeholder thumbnail + 2 lines of context.</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
