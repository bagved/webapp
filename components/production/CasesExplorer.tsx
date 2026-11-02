"use client";

import ArrowUpRight from "@/components/ui/ArrowUpRight";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { clientCases } from "@/lib/clientCases";
import { productions, productionCategories } from "@/lib/productions";
import styles from "./ProductionPages.module.css";

export default function CasesExplorer({ initialCategory = "all" }: { initialCategory?: string }) {
  const [category, setCategory] = useState(initialCategory);
  const cases = clientCases.filter(item => category === "all" || item.category === category);
  const formats = productions.filter(item => category === "all" || item.category === category);
  return <div className="container">
    <section className={styles.pageIntro}>
      <p className={styles.eyebrow}>Bagved produktionen</p>
      <h1 className={styles.title}>Fra idé til<br /><em>noget, man mærker.</em></h1>
      <p className={styles.lead}>Udforsk projekter, samarbejder og de formater, der kan sætte din næste fortælling i bevægelse.</p>
      <div className={styles.filters} role="group" aria-label="Filtrer eksempler">
        {productionCategories.map(item => <button type="button" key={item.id} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.label}</button>)}
      </div>
      <p className={styles.note} role="status">{cases.length} projekter · {formats.length} produktionseksempler</p>
    </section>
    <section className={styles.caseGrid} aria-label="Projekter og samarbejder">
      {cases.map(item => <article key={item.id} className={styles.caseCard}>
        <Link href={`/cases/${item.id}`} aria-label={`Læs om ${item.title}`}>
          <div className={styles.cardImage}><Image src={item.image} alt="" fill sizes="(max-width: 600px) 100vw, 80vw" /></div>
          <div className={styles.cardFooter}><span>{item.subtitle}</span><ArrowUpRight /></div>
          <h2>{item.title}</h2>
          <p>{item.intro}</p>
          <p className={styles.mediaCaption}>Illustrationsbillede</p>
        </Link>
      </article>)}
    </section>
    <section aria-labelledby="formats-title">
      <p className={styles.eyebrow}>Hvad kan vi skabe sammen?</p>
      <h2 className={styles.sectionTitle} id="formats-title">Find dit format.</h2>
      <p className={styles.body}>Produktionseksempler, der viser mulighederne for din virksomhed, klub eller dit næste event.</p>
      <div className={styles.formatGrid}>{formats.map(item => <article key={item.id}>
        <Link href={`/cases/${item.id}`}>
          <div className={styles.cardImage}><Image src={item.image} alt="" fill sizes="(max-width: 600px) 100vw, 33vw" /></div>
          <h3>{item.headline}</h3>
          <p>{item.title} <ArrowUpRight /></p>
        </Link>
      </article>)}</div>
    </section>
  </div>;
}
