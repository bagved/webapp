import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { productions } from "@/lib/productions";
import { clientCases } from "@/lib/clientCases";
import ShowreelPlayer from "@/components/production/ShowreelPlayer";
import styles from "@/components/production/ProductionPages.module.css";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return [...productions, ...clientCases].map(item => ({ slug: item.id })); }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = [...clientCases, ...productions].find(item => item.id === slug);
  return { title: item ? `${item.title} | Bagved` : "Eksempel ikke fundet | Bagved" };
}
export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = clientCases.find(item => item.id === slug);
  const format = productions.find(item => item.id === slug);
  if (!project && !format) notFound();
  const item = (project || format)!;
  const contactHref = `/contact?subject=${encodeURIComponent(item.subject)}#kontaktformular`;
  return <div className="container">
    <section className={styles.detailHero}>
      <Link href="/cases" className={styles.breadcrumb}>Alle eksempler</Link>
      <h1 className={styles.title}>{project ? project.title : format!.headline}</h1>
      <p className={styles.lead}>{item.intro}</p>
      <figure style={{ margin: 0 }}>
        <div className={styles.media}><Image src={item.image} alt={project ? "Illustration af produktionsformatet" : item.title} fill sizes="100vw" priority /></div>
        {project && <figcaption className={styles.mediaCaption}>Illustrationsbillede · viser produktionsformatet, ikke den konkrete opgave</figcaption>}
      </figure>
    </section>
    {project ? <section className={styles.detailCopy} aria-label="Om projektet">
      <div>
        <h2>{project.partner ? "Skabt i samarbejde." : "Billede og digitalt udtryk."}</h2>
        <p>{project.role}</p>
        {project.partner && <p>Samarbejdspartner: {project.partner}.</p>}
      </div>
      <div>
        {project.deliverables.length > 0 && <><h2>Opgavens formater</h2><ul className={styles.outputs}>{project.deliverables.map(text => <li key={text}>{text}</li>)}</ul></>}
        <Link className={styles.button} href={contactHref}>Har du et lignende projekt?</Link>
      </div>
    </section> : <>
      <section className={styles.detailCopy} aria-label="Udforsk formatet">
        <div><h2>{format!.challenge}</h2><p>{format!.approach}</p></div>
        <div><h2>Det kan I få med videre.</h2><ul className={styles.outputs}>{format!.deliverables.map(text => <li key={text}>{text}</li>)}</ul><p className={styles.note}>Et eksempel på mulighederne. Den konkrete leverance aftaler vi ud fra jeres behov og rammer.</p><Link className={styles.button} href={contactHref}>Lad os tale om jeres idé</Link></div>
      </section>
      <section style={{ paddingBottom: 80 }} aria-label="Showreel"><h2 className={styles.sectionTitle}>Flere øjeblikke fra Bagved.</h2><ShowreelPlayer poster={format!.image} /><p className={styles.mediaCaption}>Bagveds showreel · et samlet indblik i vores formater</p></section>
    </>}
  </div>;
}
