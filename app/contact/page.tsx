"use client";

import Container from "../../components/ui/Container";
import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="section">
      <Container>
        <div className="stack">
          <h1 className="h1">Contact</h1>
          <div className="muted">
            Phone: +45 61 74 64 16 • Mail: info@bagved.com
          </div>

          <div className="card" style={{ borderRadius: 0, maxWidth: 640 }}>
            {sent ? (
              <>
                <h3 className="h3">Sent</h3>
                <div className="muted" style={{ marginTop: 8 }}>
                  Thanks — we’ll reply fast.
                </div>
              </>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="stack"
              >
                <input className="field" placeholder="Name" required />
                <input className="field" placeholder="Email" type="email" required />
                <textarea className="field" placeholder="Message" rows={5} required />
                <button className="btn" type="submit">Send</button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
