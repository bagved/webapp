// components/Footer/Footer.tsx

import Link from "next/link";
import Container from "../ui/Container";

export default function Footer() {
  return (
    <footer style={{ padding: "60px 0 26px" }}>
      <Container>
        <div
          className="card"
          style={{
            borderRadius: 0,
            background: "var(--c4)", // ✅ color 4
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: 18,
              alignItems: "start",
            }}
          >
            <div style={{ fontWeight: 800 }}>
              <div>Phone: +45 61 74 64 16</div>
              <div>Mail: info@bagved.com</div>
              <div>CVR: 42597376</div>
              <div>Address: Frederiksvej 32, st. th., 2000 Frederiksberg</div>
            </div>

            <div style={{ display: "grid", gap: 8, justifyItems: "end", fontWeight: 800 }}>
              <Link href="/cookie">Cookie</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </div>

          <div
            style={{
              marginTop: 12,
              paddingTop: 12,
              borderTop: "1px solid rgba(11,11,12,0.16)",
              textAlign: "center",
              fontWeight: 800,
            }}
          >
            © 2026 Bagved
          </div>
        </div>
      </Container>
    </footer>
  );
}
