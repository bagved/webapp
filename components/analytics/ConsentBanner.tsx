"use client";
import { useI18n } from "@/components/i18n/LanguageProvider";

import Link from "@/components/i18n/LocalizedLink";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {readConsent} from "@/lib/consent";
import styles from "./ConsentBanner.module.css";

export default function ConsentBanner({inline = false}: {inline?: boolean}) {
  const { t } = useI18n();
 const Heading = inline ? 'h1' : 'h2';
 const pathname = usePathname();
 const [open,setOpen]=useState(false);
 const [statistics,setStatistics]=useState(false),[marketing,setMarketing]=useState(false);
 const [sessionOnly,setSessionOnly]=useState(false),[saved,setSaved]=useState(false);
 useEffect(()=>{
  const update=()=>{
   const consent=readConsent();
   setStatistics(consent?.statistics??false);setMarketing(consent?.marketing??false);setOpen(!consent);
  };
  update();
  window.addEventListener('bagved:consent',update);
  return ()=>window.removeEventListener('bagved:consent',update);
 },[pathname]);
 const save=(stats:boolean,ads:boolean)=>{
  if(!window.bagvedAnalytics)return;
  setSessionOnly(!window.bagvedAnalytics.setConsent({statistics:stats,marketing:ads}));
  setStatistics(stats);setMarketing(ads);setOpen(false);setSaved(true);
 };
 // The policy page renders the same controls inline, without a second banner.
 if(!inline && pathname==='/cookies')return null;
 return <>
  {saved&&(inline||sessionOnly)&&<p className={inline?styles.status:styles.notice} role="status">{t(sessionOnly
   ?'Browseren kunne ikke gemme valget. Det gælder kun på den åbne side; du bliver spurgt igen ved genindlæsning.'
   :'Dine cookievalg er gemt. Du kan altid ændre dem på Cookie Policy-siden.')}</p>}
  {(inline||open)&&<section id={inline?'cookievalg':'bagved-cookie-banner'} className={inline?styles.inline:styles.banner} aria-labelledby={inline?'cookievalg-heading':'bagved-cookie-heading'}>
   <div className={styles.copy}>
    <Heading id={inline?'cookievalg-heading':'bagved-cookie-heading'}>{t(inline?'Dine cookievalg':'Cookies på Bagved')}</Heading>
    <p>{t("Vi bruger nødvendige funktioner. Statistik og markedsføring er dit valg.")}</p>
   </div>
   {inline&&<div className={styles.settings}>
    <div><strong>{t("Nødvendige funktioner")}</strong><span>{t("Altid aktive")}</span></div>
    <label><input type="checkbox" checked={statistics} onChange={e=>{setStatistics(e.target.checked);setSaved(false);}}/><span><strong>{t("Statistik")}</strong><small>{t("Google Analytics 4 måler besøg og indsendte kontaktformularer. Ingen formulartekst sendes til målingen.")}</small></span></label>
    <label><input type="checkbox" checked={marketing} onChange={e=>{setMarketing(e.target.checked);setSaved(false);}}/><span><strong>{t("Markedsføring")}</strong><small>{t("Google Ads og ChatGPT Ads (OpenAI) måler kampagner og konverteringer. De aktiveres kun med dit samtykke til markedsføring.")}</small></span></label>
    <p>{t("Valgfrie formål er slået fra, indtil du vælger dem. Valget gemmes i op til 180 dage. Du kan altid ændre eller trække dit samtykke tilbage her via linket Cookie Policy nederst på siden.")}</p>
    <p>{t("Video fra TwentyThree og fonte fra Google Fonts indlæses fortsat som på den eksisterende hjemmeside; disse valg styrer statistik og markedsføring. Læs også vores ")}<Link href="/privacy">{t("privatlivspolitik")}</Link>.</p>
   </div>}
   <div className={styles.controls}>
    <div className={styles.actions}><button type="button" onClick={()=>save(true,true)}>{t("Acceptér alle")}</button><button type="button" onClick={()=>save(false,false)}>{t("Afvis valgfrie")}</button></div>
    <div className={styles.secondary}>{inline
     ?<button type="button" onClick={()=>save(statistics,marketing)}>{t("Gem mine valg")}</button>
     :<Link href="/cookies">{t("Tilpas valg")}</Link>}</div>
   </div>
  </section>}
 </>;
}
