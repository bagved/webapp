import Container from "../../components/ui/Container";

export default function AboutPage() {
  return (
    <div className="section">
      <Container>
        <div className="stack">
          <h1 className="h1">About</h1>
          <div className="muted" style={{ maxWidth: 820 }}>
            Placeholder About page. Put your story, your approach, and what makes you different here.
            Keep it minimal — exhibition vibe, not corporate.
          </div>

          <div className="card" style={{ borderRadius: 0 }}>
            <h3 className="h3">What we do</h3>
            <div className="muted">
              Production, event execution, video + broadcast. Built for reliability and aesthetics.
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
