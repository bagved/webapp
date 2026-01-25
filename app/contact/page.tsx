"use client";

export default function ContactPage() {
  return (
    <main className="section">
      <div className="container">
        <div className="h">Kontakt</div>

        <div style={{ height: 18 }} />

        <div style={{ display:"grid", gridTemplateColumns:"minmax(260px, 36%) 1fr", gap:18, alignItems:"start" }}>
          <aside className="box pad">
            <div style={{ display:"grid", gap:10 }}>
              <div className="h">BAGVED</div>
              <div className="t14">CVR: 42497376</div>
              <div className="t14">Telefon: +45 61 74 64 16</div>
              <div className="t14">Email: info@bagved.dk</div>
              <div className="t14">Frederiksvej 32, st. th., 2000 Frederiksberg</div>
            </div>
          </aside>

          <section className="box pad">
            <form onSubmit={(e) => e.preventDefault()} style={{ display:"grid", gap:14 }}>
              <Row3 />

              <div style={{ display:"grid", gap:8 }}>
                <label className="label">Hvem er du</label>
                <select className="field" defaultValue="">
                  <option value="" disabled>Vælg…</option>
                  <option>Virksomhed</option>
                  <option>Selskab</option>
                  <option>Samarbejdspartner</option>
                  <option>FTP elev</option>
                  <option>Andet</option>
                </select>
              </div>

              <div style={{ display:"grid", gap:8 }}>
                <label className="label">Hvad handler det om</label>
                <select className="field" defaultValue="">
                  <option value="" disabled>Vælg…</option>
                  <option>Livestream</option>
                  <option>Reklamefilm</option>
                  <option>Lyd og Lys</option>
                </select>
              </div>

              <div style={{ display:"grid", gap:8 }}>
                <label className="label">Besked</label>
                <textarea className="field" rows={8} placeholder="Skriv…" />
              </div>

              <div style={{ display:"flex", justifyContent:"flex-end" }}>
                <button className="btn" type="submit">Send</button>
              </div>
            </form>
          </section>

          <style jsx>{`
            @media (max-width: 900px){
              div[style*="grid-template-columns"]{ grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </div>
    </main>
  );
}

function Row3() {
  return (
    <div style={{ display:"grid", gap:14, gridTemplateColumns:"repeat(3, minmax(0, 1fr))" }}>
      <div style={{ display:"grid", gap:8 }}>
        <label className="label">Navn</label>
        <input className="field" placeholder="Dit navn" />
      </div>
      <div style={{ display:"grid", gap:8 }}>
        <label className="label">Telefon</label>
        <input className="field" placeholder="+45 ..." />
      </div>
      <div style={{ display:"grid", gap:8 }}>
        <label className="label">Email</label>
        <input className="field" placeholder="dig@firma.dk" />
      </div>

      <style jsx>{`
        @media (max-width: 820px){
          div{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
