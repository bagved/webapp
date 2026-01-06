import Container from "../../components/ui/Container";

export default function TermsPage() {
  return (
    <div className="section">
      <Container>
        <div className="stack">
          <h1 className="h1">Terms</h1>
          <div className="muted" style={{ maxWidth: 820 }}>
            Placeholder terms. Replace with your real business terms (pricing, delivery, cancellation, rights, liability).
          </div>

          <div className="card" style={{ borderRadius: 0 }}>
            <h3 className="h3">Key topics</h3>
            <div className="muted">
              Offer/accept, payment, delivery changes, cancellation, rights, disputes.
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
