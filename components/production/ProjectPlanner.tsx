"use client";


import ThemedSelect from "@/components/ui/ThemedSelect";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { contexts, goals, channels, activities, frequencies, deliveryModes, describePlan, planContactHref, type Plan } from "@/lib/productionPlan";
import ShowreelPlayer from "./ShowreelPlayer";
import styles from "./ProductionPages.module.css";

export default function ProjectPlanner() {
  const [plan, setPlan] = useState<Plan>({ context: "", goal: "", channels: [], activity: "", frequency: "", mode: "" });
  useEffect(() => {
    const context = new URLSearchParams(window.location.search).get("context");
    if (contexts.some(c => c.id === context)) setPlan(current => ({ ...current, context: context! }));
  }, []);
  const result = describePlan(plan);
  const selectChannel = (id: string) => {
    setPlan(current => {
      return { ...current, channels: current.channels.includes(id) ? current.channels.filter(c => c !== id) : [...current.channels, id] };
    });
  };
  return <>
    <section data-background-tint="0" id="project-planner" className={styles.planner} aria-labelledby="planner-title">
      <div className="container">
        <h1 id="planner-title" className={styles.title}>Hvad skal vi gøre muligt?</h1>
        <p className={styles.lead}>Start med jeres behov. Vi giver et bud på, hvordan én produktion kan få værdi flere steder.</p>
        <p className={styles.sentence}>
          Vi er{" "}<label><ThemedSelect fitContent aria-label="Hvem er I?" value={plan.context} onChange={event => setPlan({ ...plan, context: event.target.value })}><option value="" disabled>vælg virksomhedstype</option>{contexts.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}</ThemedSelect>,</label>{" og vi vil gerne "}<label><ThemedSelect fitContent aria-label="Hvad vil I opnå?" value={plan.goal} onChange={event => setPlan({ ...plan, goal: event.target.value })}><option value="" disabled>vælg jeres mål</option>{goals.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}</ThemedSelect>.</label>
        </p>
        <p className={styles.sentence}>
          Vi planlægger{" "}<label><ThemedSelect fitContent aria-label="Hvad planlægger I?" value={plan.activity} onChange={event => setPlan({ ...plan, activity: event.target.value })}><option value="" disabled>vælg aktivitet</option>{activities.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</ThemedSelect></label>{" "}<label><ThemedSelect fitContent aria-label="Hvor ofte?" value={plan.frequency} onChange={event => setPlan({ ...plan, frequency: event.target.value })}><option value="" disabled>vælg hyppighed</option>{frequencies.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</ThemedSelect>,</label>{" og formatet er "}<label><ThemedSelect fitContent aria-label="Hvordan foregår det?" value={plan.mode} onChange={event => setPlan({ ...plan, mode: event.target.value })}><option value="" disabled>vælg format</option>{deliveryModes.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</ThemedSelect>.</label>
        </p>
        <fieldset className={styles.channels}>
          <legend>Her skal indholdet leve <span>Vælg én eller flere</span></legend>
          {channels.map(channel => <label key={channel.id}>
            <input type="checkbox" checked={plan.channels.includes(channel.id)} onChange={() => selectChannel(channel.id)} />
            <span>{channel.label}</span>
          </label>)}
        </fieldset>
        {!result && <p className={styles.note}>Vælg virksomhedstype, mål, aktivitet, hyppighed, format og mindst én kanal for at se en idé til jer.</p>}
      </div>
    </section>
    {result && <section data-background-tint="48" className={styles.recommendation} aria-labelledby="idea-title">
      <div className={`container ${styles.ideaGrid}`}>
        <div>
          <div aria-live="polite" aria-atomic="true">
            <h2 id="idea-title" className={styles.sectionTitle}>{result.recommendation.title}</h2>
            <p className={styles.body}>{result.recommendation.lead}</p>
            <p className={styles.body}>{result.recommendation.value}</p>
            <p className={styles.body}>{result.frequency.note}</p>
            <p className={styles.body}>{result.mode.note}</p>
            <p className={styles.value}>{result.goal.value}</p>
          </div>
          <Link className={styles.button} href={planContactHref(plan)}>Tag idéen med til en samtale</Link>
          <p className={styles.note}>Dine valg bliver til et redigerbart oplæg i kontaktformularen. Intet bliver sendt, før du selv sender det.</p>
        </div>
        <div>
          <ShowreelPlayer key={plan.context} poster={result.recommendation.image} />
          <p className={styles.mediaCaption}>Bagveds showreel · inspiration til jeres næste produktion</p>
          <h3 className={styles.smallTitle}>Én produktion. Flere steder at bruge den.</h3>
          <ul className={styles.outputs}>{result.selected.map(channel => <li key={channel.id}><span>{channel.label}</span>{channel.output}</li>)}</ul>
        </div>
      </div>
    </section>}
    <section data-background-tint="0" className={`container ${styles.useCases}`} aria-labelledby="use-cases-heading">
      <h2 id="use-cases-heading" className={styles.sectionTitle}>Forskellige behov. Samme blik for helheden.</h2>
      <div className={styles.useGrid}>{contexts.map(context => <article className={styles.useCard} key={context.id}>
        <div className={styles.cardImage}><Image src={context.image} alt="" fill sizes="(max-width: 700px) 100vw, 50vw" /></div>
        <h3>{context.title}</h3>
        <p>{context.lead}</p><p>{context.value}</p>
      </article>)}</div>
    </section>
  </>;
}
