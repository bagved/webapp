import Container from "../ui/Container";
import Link from "next/link";

export default function ServicesSection() {
  return (
    <section id="services" className="section">
      <Container>
        <div className="sectionTitleRow">
          <h2 className="h2">Services</h2>
          <Link className="btn" href="/services">Open services →</Link>
        </div>

        <div className="cardGrid">
          <div className="card" style={{ borderRadius: 0 }}>
            <h3 className="h3">Livestream & Broadcast</h3>
            <div className="muted">Setup, redundancy, delivery, calm execution.</div>
          </div>
          <div className="card" style={{ borderRadius: 0 }}>
            <h3 className="h3">Commercial & Content</h3>
            <div className="muted">Shoot, edit, grade, delivery — clean pipeline.</div>
          </div>
          <div className="card" style={{ borderRadius: 0 }}>
            <h3 className="h3">Sound / Light / Events</h3>
            <div className="muted">Planning + on-site execution that just works.</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
