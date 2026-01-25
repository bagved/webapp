import Link from "next/link";

const services = [
  { id: "livestream", title: "Livestream" },
  { id: "reklamefilm", title: "Reklamefilm" },
  { id: "lyd-og-lys", title: "Lyd og Lys" },
];

export default function ServicesPage() {
  return (
    <main className="section">
      <div className="container">
        <div className="h">Ydelser</div>

        <div style={{ height: 16 }} />

        <nav className="box pad" style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
          {services.map(s => (
            <Link key={s.id} className="btn" href={`#${s.id}`}>{s.title}</Link>
          ))}
        </nav>

        <div style={{ height: 18 }} />

        <div style={{ display:"grid", gap:18 }}>
          {services.map(s => (
            <section key={s.id} id={s.id} className="box pad">
              <div style={{ display:"grid", gap:10 }}>
                <div className="h">{s.title}</div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
