const cases = [
  {
    img: "/cases/1.jpg",
    title: "Case",
    subtitle: "Underoverskrift",
    text: "Tekst",
  },
  {
    img: "/cases/2.jpg",
    title: "Case",
    subtitle: "Underoverskrift",
    text: "Tekst",
  },
  {
    img: "/cases/3.jpg",
    title: "Case",
    subtitle: "Underoverskrift",
    text: "Tekst",
  },
];

export default function CasesPage() {
  return (
    <main className="section">
      <style>{css}</style>

      <div className="container">
        <div className="h">Cases</div>

        <div className="stack">
          {cases.map((c, idx) => (
            <article key={idx} className="row">
              <div className={`imgBox box ${idx % 2 ? "right" : "left"}`}>
                <img src={c.img} alt="" loading="lazy" />
                <div className="dots" aria-hidden />
              </div>

              <div className={`txt box pad ${idx % 2 ? "left" : "right"}`}>
                <div className="h">{c.title}</div>
                <div className="t14 muted">{c.subtitle}</div>
                <div className="t14">{c.text}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

const css = `
.stack{ display:grid; gap: 18px; margin-top: 18px; }

.row{
  display:grid;
  grid-template-columns: minmax(260px, 46%) 1fr;
  gap: 18px;
  align-items:start;
}

.imgBox{ position:relative; overflow:hidden; }
.imgBox img{
  width:100%;
  height:100%;
  display:block;
  object-fit:cover;
  aspect-ratio: 4 / 3;
}
.dots{
  position:absolute;
  left: 12px;
  bottom: 12px;
  width: 120px;
  height: 120px;
  background-image: radial-gradient(color-mix(in srgb, var(--c3) 26%, transparent) 1px, transparent 1px);
  background-size: 6px 6px;
  opacity: 0.45;
}

@media (min-width: 901px){
  .imgBox.right{ order: 2; }
  .txt.left{ order: 1; }
}

.txt{
  display:grid;
  gap: 10px;
}
.txt .t14{ color: color-mix(in srgb, var(--text) 88%, transparent); }

@media (max-width: 900px){
  .row{ grid-template-columns: 1fr; }
}
`;
