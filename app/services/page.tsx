import Container from "../../components/ui/Container";

export default function ServicesPage() {
  return (
    <div className="section">
      <Container>
        <div className="stack">
          <h1 className="h1">Services</h1>
          <div className="muted" style={{ maxWidth: 780 }}>
            This is the dedicated Services page (different from the homepage segment).
            Replace with your real service modules later.
          </div>

          <div className="cardGrid">
            <div className="card" style={{ borderRadius: 0 }}>
              <h3 className="h3">Livestream & Broadcast</h3>
              <div className="muted">Signal flow, redundancy, encoding, delivery.</div>
            </div>
            <div className="card" style={{ borderRadius: 0 }}>
              <h3 className="h3">Commercial & Content</h3>
              <div className="muted">Production, post, versioning, publishing formats.</div>
            </div>
            <div className="card" style={{ borderRadius: 0 }}>
              <h3 className="h3">Sound / Light / Event</h3>
              <div className="muted">Tech planning, coordination, on-site execution.</div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
