import Container from "../../components/ui/Container";

export default function CookiePage() {
  return (
    <div className="section">
      <Container>
        <div className="stack">
          <h1 className="h1">Cookie</h1>
          <div className="muted" style={{ maxWidth: 820 }}>
            Placeholder cookie policy. Add your cookie banner + analytics details later.
          </div>

          <div className="card" style={{ borderRadius: 0 }}>
            <h3 className="h3">What we collect</h3>
            <div className="muted">
              Typically: basic analytics + contact form submissions (if enabled). Adjust to reality.
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
