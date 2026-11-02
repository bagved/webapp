"use client";
import { useI18n } from "@/components/i18n/LanguageProvider";


import ThemedSelect from "@/components/ui/ThemedSelect";
import Image from "next/image";
import Link from "@/components/i18n/LocalizedLink";
import { useEffect, useState } from "react";
import { contexts, goals, channels, activities, frequencies, deliveryModes, describePlan, planContactHref, type Plan } from "@/lib/productionPlan";
import styles from "./ProductionPages.module.css";
import { clientCases } from "@/lib/clientCases";

export default function ProjectPlanner() {
  const { t } = useI18n();
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
        <h1 id="planner-title" className={styles.title}>{t("Hvad skal vi gøre muligt?")}</h1>
        <p className={styles.lead}>{t("Start med jeres behov. Vi giver et bud på, hvordan én produktion kan få værdi flere steder.")}</p>
        <p className={styles.sentence}>
          {t("Vi er")}{t(" ")}<label><ThemedSelect fitContent aria-label={t("Hvem er I?")} value={plan.context} onChange={event => setPlan({ ...plan, context: event.target.value })}><option value="" disabled>{t("vælg virksomhedstype")}</option>{contexts.map(c => <option key={c.id} value={c.id}>{t(c.label)}</option>)}</ThemedSelect>,</label>{t(" og vi vil gerne ")}<label><ThemedSelect fitContent aria-label={t("Hvad vil I opnå?")} value={plan.goal} onChange={event => setPlan({ ...plan, goal: event.target.value })}><option value="" disabled>{t("vælg jeres mål")}</option>{goals.map(g => <option key={g.id} value={g.id}>{t(g.label)}</option>)}</ThemedSelect>.</label>
        </p>
        <p className={styles.sentence}>
          {t("Vi planlægger")}{t(" ")}<label><ThemedSelect fitContent aria-label={t("Hvad planlægger I?")} value={plan.activity} onChange={event => setPlan({ ...plan, activity: event.target.value })}><option value="" disabled>{t("vælg aktivitet")}</option>{activities.map(item => <option key={item.id} value={item.id}>{t(item.label)}</option>)}</ThemedSelect></label>{t(" ")}<label><ThemedSelect fitContent aria-label={t("Hvor ofte?")} value={plan.frequency} onChange={event => setPlan({ ...plan, frequency: event.target.value })}><option value="" disabled>{t("vælg hyppighed")}</option>{frequencies.map(item => <option key={item.id} value={item.id}>{t(item.label)}</option>)}</ThemedSelect>,</label>{t(" og formatet er ")}<label><ThemedSelect fitContent aria-label={t("Hvordan foregår det?")} value={plan.mode} onChange={event => setPlan({ ...plan, mode: event.target.value })}><option value="" disabled>{t("vælg format")}</option>{deliveryModes.map(item => <option key={item.id} value={item.id}>{t(item.label)}</option>)}</ThemedSelect>.</label>
        </p>
        <fieldset className={styles.channels}>
          <legend>{t("Her skal indholdet leve ")}<span>{t("Vælg én eller flere")}</span></legend>
          {channels.map(channel => <label key={channel.id}>
            <input type="checkbox" checked={plan.channels.includes(channel.id)} onChange={() => selectChannel(channel.id)} />
            <span>{t(channel.label)}</span>
          </label>)}
        </fieldset>
        {!result && <p className={styles.note}>{t("Vælg virksomhedstype, mål, aktivitet, hyppighed, format og mindst én kanal for at se en idé til jer.")}</p>}
      </div>
    </section>
    {result && <section data-background-tint="48" className={styles.recommendation} aria-labelledby="idea-title">
      <div className={`container ${styles.ideaGrid}`}>
        <div>
          <div aria-live="polite" aria-atomic="true">
            <h2 id="idea-title" className={styles.sectionTitle}>{t(result.recommendation.title)}</h2>
            <p className={styles.body}>{t(result.recommendation.lead)}</p>
            <p className={styles.body}>{t(result.recommendation.value)}</p>
            <p className={styles.body}>{t(result.frequency.note)}</p>
            <p className={styles.body}>{t(result.mode.note)}</p>
            <p className={styles.value}>{t(result.goal.value)}</p>
          </div>
          <Link className={styles.button} href={planContactHref(plan)}>{t("Tag idéen med til en samtale")}</Link>
          <p className={styles.note}>{t("Dine valg bliver til et redigerbart oplæg i kontaktformularen. Intet bliver sendt, før du selv sender det.")}</p>
        </div>
        <div>
          <div className={styles.media}>
            <Image src={result.recommendation.image} alt="" fill sizes="(max-width: 780px) 100vw, 60vw" />
          </div>
          <h3 className={styles.smallTitle}>{t("Én produktion. Flere steder at bruge den.")}</h3>
          <ul className={styles.outputs}>{result.selected.map(channel => <li key={channel.id}><span>{t(channel.label)}</span>{t(channel.output)}</li>)}</ul>
        </div>
      </div>
    </section>}
    <section data-background-tint="0" className={`container ${styles.useCases}`} aria-labelledby="use-cases-heading">
      <h2 id="use-cases-heading" className={styles.sectionTitle}>{t("Forskellige behov. Samme blik for helheden.")}</h2>
      <div className={styles.useGrid}>{contexts.map(context => <article className={styles.useCard} key={context.id}>
        <div className={styles.cardImage}><Image src={context.image} alt={t("")} fill sizes="(max-width: 700px) 100vw, 50vw" /></div>
        <h3>{t(context.title)}</h3>
        <p>{t(context.lead)}</p><p>{t(context.value)}</p>
        {"caseId" in context && <p><Link href={`/cases/${context.caseId}`}>{t(clientCases.find(project => project.id === context.caseId)!.title)}</Link></p>}
      </article>)}</div>
    </section>
  </>;
}
