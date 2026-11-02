"use client";
import { useI18n } from "@/components/i18n/LanguageProvider";
import Link from "@/components/i18n/LocalizedLink";
import Image from "next/image";
import { productions } from "@/lib/productions";
import { clientCases } from "@/lib/clientCases";
import ProductionMedia from "./ProductionMedia";
import styles from "./ProductionPages.module.css";
export default function CaseDetail({ slug }: { slug: string }) {
  const { t } = useI18n();
  const project = clientCases.find(item => item.id === slug);
  const format = productions.find(item => item.id === slug);
  const item = (project || format)!;
  const contactHref = `/contact?subject=${encodeURIComponent(item.subject)}#kontaktformular`;
  return <div className="container">
    <section className={styles.detailHero}>
      <Link href="/cases" className={styles.breadcrumb}>{t("Alle eksempler")}</Link>
      <h1 className={styles.title}>{t(project ? project.title : format!.headline)}</h1>
      <p className={styles.lead}>{t(item.intro)}</p>
      <figure style={{ margin: 0 }}>
        {format ? <ProductionMedia key={format.id} production={format} priority /> : <div className={styles.media}><Image src={item.image} alt={t("Illustration af produktionsformatet")} fill sizes="100vw" priority /></div>}
        {project && <figcaption className={styles.mediaCaption}>{t("Illustrationsbillede · viser produktionsformatet, ikke den konkrete opgave")}</figcaption>}
      </figure>
    </section>
    {project ? <section className={styles.detailCopy} aria-label={t("Om projektet")}>
      <div>
        <h2>{t(project.partner ? "Skabt i samarbejde." : "Billede og digitalt udtryk.")}</h2>
        <p>{t(project.role)}</p>
        {project.partner && <p>{t("Samarbejdspartner: ")}{t(project.partner)}.</p>}
      </div>
      <div>
        {project.deliverables.length > 0 && <><h2>{t("Opgavens formater")}</h2><ul className={styles.outputs}>{project.deliverables.map(text => <li key={text}>{t(text)}</li>)}</ul></>}
        <Link className={styles.button} href={contactHref}>{t("Har du et lignende projekt?")}</Link>
      </div>
    </section> : <>
      <section className={styles.detailCopy} aria-label={t("Udforsk formatet")}>
        <div><h2>{t(format!.challenge)}</h2><p>{t(format!.approach)}</p></div>
        <div><h2>{t("Det kan I få med videre.")}</h2><ul className={styles.outputs}>{format!.deliverables.map(text => <li key={text}>{t(text)}</li>)}</ul><p className={styles.note}>{t("Et eksempel på mulighederne. Den konkrete leverance aftaler vi ud fra jeres behov og rammer.")}</p><Link className={styles.button} href={contactHref}>{t("Lad os tale om jeres idé")}</Link></div>
      </section>
    </>}
  </div>;
}
