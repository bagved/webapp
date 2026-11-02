"use client";


import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { contexts, goals, channels, defaultPlan, describePlan, planContactHref, type Plan } from "@/lib/productionPlan";
import ShowreelPlayer from "./ShowreelPlayer";
import styles from "./ProductionPages.module.css";

export default function ProjectPlanner() {
  const [plan, setPlan] = useState<Plan>(defaultPlan);
  const planner = useRef<HTMLElement>(null);
  useEffect(() => {
    const context = new URLSearchParams(window.location.search).get("context");
    if (contexts.some(c => c.id === context)) setPlan(current => ({ ...current, context: context! }));
  }, []);
  const result = describePlan(plan)!;
  const chooseContext = (context: string) => {
    setPlan(current => ({ ...current, context }));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    planner.current?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
  };
  const selectChannel = (id: string) => {
    setPlan(current => {
      if (current.channels.includes(id) && current.channels.length === 1) return current;
      return { ...current, channels: current.channels.includes(id) ? current.channels.filter(c => c !== id) : [...current.channels, id] };
    });
  };
  return <>
    <section ref={planner} id="project-planner" className={styles.planner} aria-labelledby="planner-title">
      <div className="container">
        <h1 id="planner-title" className={styles.title}>Hvad skal vi gøre muligt?</h1>
        <p className={styles.lead}>Start med jeres behov. Vi giver et bud på, hvordan én produktion kan få værdi flere steder.</p>
        <div className={styles.sentence}>
          <label>Vi er <select aria-label="Hvem er I?" value={plan.context} onChange={event => setPlan({ ...plan, context: event.target.value })}>{contexts.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}</select></label>
          <label>og vi vil gerne <select aria-label="Hvad vil I opnå?" value={plan.goal} onChange={event => setPlan({ ...plan, goal: event.target.value })}>{goals.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}</select></label>
        </div>
        <fieldset className={styles.channels}>
          <legend>Her skal indholdet leve <span>Vælg én eller flere</span></legend>
          {channels.map(channel => <label key={channel.id}>
            <input type="checkbox" checked={plan.channels.includes(channel.id)} onChange={() => selectChannel(channel.id)} />
            <span>{channel.label}</span>
          </label>)}
        </fieldset>
      </div>
    </section>
    <section className={styles.recommendation} aria-labelledby="idea-title">
      <div className={`container ${styles.ideaGrid}`}>
        <div>
          <div aria-live="polite" aria-atomic="true">
            <h2 id="idea-title" className={styles.sectionTitle}>{result.context.title}</h2>
            <p className={styles.body}>{result.context.lead}</p>
            <p className={styles.body}>{result.context.value}</p>
            <p className={styles.value}>{result.goal.value}</p>
          </div>
          <Link className={styles.button} href={planContactHref(plan)}>Tag idéen med til en samtale</Link>
          <p className={styles.note}>Dine valg bliver til et redigerbart oplæg i kontaktformularen. Intet bliver sendt, før du selv sender det.</p>
        </div>
        <div>
          <ShowreelPlayer key={plan.context} poster={result.context.image} />
          <p className={styles.mediaCaption}>Bagveds showreel · inspiration til jeres næste produktion</p>
          <h3 className={styles.smallTitle}>Én produktion. Flere steder at bruge den.</h3>
          <ul className={styles.outputs}>{result.selected.map(channel => <li key={channel.id}><span>{channel.label}</span>{channel.output}</li>)}</ul>
        </div>
      </div>
    </section>
    <section className={`container ${styles.useCases}`} aria-labelledby="use-cases-heading">
      <h2 id="use-cases-heading" className={styles.sectionTitle}>Forskellige behov. Samme blik for helheden.</h2>
      <div className={styles.useGrid}>{contexts.map(context => <article className={styles.useCard} key={context.id}>
        <div className={styles.cardImage}><Image src={context.image} alt="" fill sizes="(max-width: 700px) 100vw, 50vw" /></div>
        <h3>{context.title}</h3>
        <p>{context.lead}</p><p>{context.value}</p>
        <div className={styles.cardActions}><button type="button" onClick={() => chooseContext(context.id)}>Tilpas til os</button><Link href={`/cases/${context.production}`}>Udforsk formatet</Link></div>
      </article>)}</div>
    </section>
  </>;
}
