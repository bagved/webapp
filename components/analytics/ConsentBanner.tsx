"use client";

import {useEffect, useRef, useState} from "react";
import {readConsent} from "@/lib/consent";
import styles from "./ConsentBanner.module.css";

export default function ConsentBanner() {
 const [open,setOpen]=useState(false),[settings,setSettings]=useState(false);
 const [statistics,setStatistics]=useState(false),[marketing,setMarketing]=useState(false);
 const [sessionOnly,setSessionOnly]=useState(false);
 const heading=useRef<HTMLHeadingElement>(null),reopen=useRef<HTMLButtonElement>(null);
 useEffect(()=>{const saved=readConsent();setStatistics(saved?.statistics??false);setMarketing(saved?.marketing??false);setOpen(!saved);},[]);
 const save=(stats:boolean,ads:boolean)=>{
  if(!window.bagvedAnalytics)return;
  setSessionOnly(!window.bagvedAnalytics.setConsent({statistics:stats,marketing:ads}));
  setStatistics(stats);setMarketing(ads);setOpen(false);setSettings(false);
  requestAnimationFrame(()=>reopen.current?.focus({preventScroll:true}));
 };
 const show=()=>{
  const saved=readConsent();setStatistics(saved?.statistics??false);setMarketing(saved?.marketing??false);
  setSettings(true);setOpen(true);requestAnimationFrame(()=>heading.current?.focus({preventScroll:true}));
 };
 return <>
  <div className={styles.manage}>
   <button ref={reopen} type="button" onClick={show} aria-expanded={open} aria-controls="bagved-cookie-banner">Cookieindstillinger</button>
   {sessionOnly&&<p role="status">Browseren kunne ikke gemme valget. Det gælder kun på den åbne side; du bliver spurgt igen ved genindlæsning.</p>}
  </div>
  {open&&<section id="bagved-cookie-banner" className={styles.banner} aria-labelledby="bagved-cookie-heading" aria-describedby="bagved-cookie-description">
   <div className={styles.copy}>
    <h2 id="bagved-cookie-heading" ref={heading} tabIndex={-1}>Cookies på Bagved</h2>
    <p id="bagved-cookie-description">Vi bruger nødvendige funktioner. Statistik og markedsføring er dit valg.</p>
   </div>
   {settings&&<div className={styles.settings}>
    <div><strong>Nødvendige funktioner</strong><span>Altid aktive</span></div>
    <label><input type="checkbox" checked={statistics} onChange={e=>setStatistics(e.target.checked)}/><span><strong>Statistik</strong><small>Google Analytics 4 måler besøg og indsendte kontaktformularer. Ingen formulartekst sendes til målingen.</small></span></label>
    <label><input type="checkbox" checked={marketing} onChange={e=>setMarketing(e.target.checked)}/><span><strong>Markedsføring</strong><small>Google Ads og ChatGPT Ads (OpenAI) måler kampagner og konverteringer. De aktiveres kun med dit samtykke til markedsføring.</small></span></label>
    <p>Valgfrie formål er slået fra, indtil du vælger dem. Valget gemmes i op til 180 dage. Du kan altid ændre eller trække dit samtykke tilbage under Cookieindstillinger nederst på siden.</p>
    <p>Video fra TwentyThree og fonte fra Google Fonts indlæses fortsat som på den eksisterende hjemmeside; disse valg styrer statistik og markedsføring. Læs vores <a href="/cookies">cookiepolitik</a> og <a href="/privacy">privatlivspolitik</a>.</p>
   </div>}
   <div className={styles.controls}>
    <div className={styles.actions}><button type="button" onClick={()=>save(true,true)}>Acceptér alle</button><button type="button" onClick={()=>save(false,false)}>Afvis valgfrie</button></div>
    <div className={styles.secondary}><button type="button" aria-expanded={settings} onClick={()=>setSettings(!settings)}>Tilpas valg</button>{settings&&<button type="button" onClick={()=>save(statistics,marketing)}>Gem mine valg</button>}</div>
   </div>
  </section>}
 </>;
}
