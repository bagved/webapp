"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { productions, productionCategories } from "@/lib/productions";
import ShowreelPlayer from "./ShowreelPlayer";
import styles from "./ProductionPages.module.css";

export default function CasesExplorer({ initialCategory = "all", initialFormat = null }: { initialCategory?: string; initialFormat?: string | null }) {
  const [category, setCategory] = useState(initialCategory);
  const [expanded, setExpanded] = useState<string | null>(initialFormat);
  const [columns, setColumns] = useState(3);
  const panel = useRef<HTMLElement>(null);
  const formats = productions.filter(item => category === "all" || item.category === category);
  useEffect(() => {
    const tablet = window.matchMedia("(max-width: 780px)");
    const mobile = window.matchMedia("(max-width: 600px)");
    const update = () => setColumns(mobile.matches ? 1 : tablet.matches ? 2 : 3);
    update();
    tablet.addEventListener("change", update); mobile.addEventListener("change", update);
    return () => { tablet.removeEventListener("change", update); mobile.removeEventListener("change", update); };
  }, []);
  useEffect(() => {
    if (!expanded) return;
    panel.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "nearest" });
  }, [expanded]);
  const rows = Array.from({ length: Math.ceil(formats.length / columns) }, (_, row) => formats.slice(row * columns, (row + 1) * columns));
  const close = () => {
    const previous = expanded;
    setExpanded(null);
    if (previous) document.getElementById(`format-button-${previous}`)?.focus({ preventScroll: true });
  };
  return <div className="container">
    <section className={styles.pageIntro}>
      <h1 className={styles.title}>Find dit format.</h1>
      <p className={styles.lead}>Produktionseksempler, der viser mulighederne for din virksomhed, klub eller dit næste event.</p>
      <div className={styles.filters} role="group" aria-label="Filtrer eksempler">
        {productionCategories.map(item => <button type="button" key={item.id} aria-pressed={category === item.id} onClick={() => { setCategory(item.id); setExpanded(null); }}>{item.label}</button>)}
      </div>
    </section>
    <section className={styles.formats} aria-label="Produktionsformater">
      {rows.map(row => {
        const selected = row.find(item => item.id === expanded);
        return <div key={row[0].id} className={styles.formatRow}>
          <div className={styles.formatGrid}>
            {row.map(item => {
              const isOpen = item.id === expanded;
              return <article key={item.id}>
                <button type="button" id={`format-button-${item.id}`} className={styles.formatButton}
                  aria-label={`Udforsk ${item.title}`} aria-expanded={isOpen} aria-controls={isOpen ? `case-${item.id}` : undefined}
                  onClick={() => setExpanded(isOpen ? null : item.id)}>
                  <div className={styles.cardImage}><Image src={item.image} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 780px) 50vw, 33vw" /></div>
                  <h2>{item.headline}</h2>
                  <p>{item.title}</p>
                </button>
              </article>;
            })}
          </div>
          {selected && <section ref={panel} id={`case-${selected.id}`} className={styles.expandedFormat} aria-labelledby={`expanded-heading-${selected.id}`}>
            <div className={styles.expandedTop}><h2 id={`expanded-heading-${selected.id}`} className={styles.sectionTitle}>{selected.title}</h2><button type="button" className={styles.closeFormat} onClick={close}>Luk eksempel</button></div>
            <div className={styles.ideaGrid}>
              <div><p className={styles.body}>{selected.intro}</p><h3 className={styles.smallTitle}>{selected.challenge}</h3><p className={styles.body}>{selected.approach}</p><Link className={styles.button} href={`/contact?subject=${encodeURIComponent(selected.subject)}#kontaktformular`}>Lad os tale om jeres idé</Link></div>
              <div><ShowreelPlayer key={selected.id} poster={selected.image} /><p className={styles.mediaCaption}>Bagveds showreel · inspiration til produktionsformatet</p><h3 className={styles.smallTitle}>Det kan I få med videre</h3><ul className={styles.outputs}>{selected.deliverables.map(text => <li key={text}>{text}</li>)}</ul></div>
            </div>
          </section>}
        </div>;
      })}
    </section>
  </div>;
}
