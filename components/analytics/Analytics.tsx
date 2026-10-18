"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";
import {CONSENT_KEY, readConsent, saveConsent, clearMeasurementCookies} from "@/lib/consent";
import {configureMeasurement, syncMeasurement, track, trackPage} from "@/lib/measurement";

declare global {interface Window {bagvedAnalytics?: {setConsent: (choice: boolean | {statistics: boolean; marketing: boolean}) => boolean}}}

// Only a visitor action in the consent banner supplies a new decision.
export default function Analytics({measurementId, pixelId, matchingReviewed}: {measurementId: string; pixelId: string; matchingReviewed: boolean}) {
 const pathname=usePathname();
 useEffect(()=>{
  configureMeasurement({ga4:measurementId,googleAds:"AW-1003664894",googleAdsLeadLabel:"xv1vCIHagJ0dEP7ryt4D",openaiPixel:pixelId,openaiMatchingReviewed:matchingReviewed,debug:false});
  const saved=readConsent();
  if(saved){syncMeasurement(saved);trackPage();}
  window.bagvedAnalytics={setConsent(choice){
   const granted=typeof choice === "boolean" ? {statistics:choice,marketing:false} : choice;
   const previous=readConsent();
   const {consent:next,persisted}=saveConsent(granted);
   window.dispatchEvent(new Event('bagved:consent'));
   if((previous?.statistics && !next.statistics) || (previous?.marketing && !next.marketing)){
    syncMeasurement(next);clearMeasurementCookies();
    // Reload removes already-loaded SDKs. Failed storage must not resurrect an old grant.
    if(persisted)location.reload();
    else { try{localStorage.removeItem(CONSENT_KEY);}catch{} }
    return persisted;
   }
   syncMeasurement(next);trackPage();
   return persisted;
  }};
  const storage=(event:StorageEvent)=>{if(event.key===CONSENT_KEY || event.key===null)location.reload();};
  window.addEventListener('storage',storage);
  const click=(e:MouseEvent)=>{
   const a=(e.target as Element).closest?.("a");if(!a)return;
   const href=a.getAttribute("href")||"";
   if(href.startsWith("tel:"))track("contact_phone_click");
   else if(href.startsWith("mailto:"))track("contact_email_click");
   else if(/\/contact([?#]|$)/.test(href))track("contact_cta_click");
   else if(/\/services([?#]|$)/.test(href))track("service_interest");
  };
  document.addEventListener("click",click);
  return ()=>{document.removeEventListener("click",click);window.removeEventListener('storage',storage);delete window.bagvedAnalytics;};
 },[measurementId,pixelId,matchingReviewed]);
 useEffect(()=>{trackPage();},[pathname]);
 return null;
}
