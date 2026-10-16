"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";
import {CONSENT_KEY, CONSENT_VERSION, readConsent, deniedConsent, clearMeasurementCookies} from "@/lib/consent";
import {configureMeasurement, syncMeasurement, track, trackPage} from "@/lib/measurement";

declare global {interface Window {bagvedAnalytics?: {setConsent: (choice: boolean | {statistics: boolean; marketing: boolean}) => void}}}

// Invisible integration. A separate consent system must supply the decision.
export default function Analytics({measurementId, pixelId, matchingReviewed}: {measurementId: string; pixelId: string; matchingReviewed: boolean}) {
 const pathname=usePathname();
 useEffect(()=>{
  configureMeasurement({ga4:measurementId,googleAds:"AW-1003664894",googleAdsLeadLabel:"xv1vCIHagJ0dEP7ryt4D",openaiPixel:pixelId,openaiMatchingReviewed:matchingReviewed,debug:false});
  const saved=readConsent();
  if(saved){syncMeasurement(saved);trackPage();}
  window.bagvedAnalytics={setConsent(choice){
   const granted=typeof choice === "boolean" ? {statistics:choice,marketing:false} : choice;
   const previous=readConsent();
   const next={...deniedConsent(),version:CONSENT_VERSION,updatedAt:Date.now(),statistics:granted.statistics === true,marketing:granted.marketing === true};
   try{localStorage.setItem(CONSENT_KEY,JSON.stringify(next));}catch{return;}
   if((previous?.statistics && !next.statistics) || (previous?.marketing && !next.marketing)){syncMeasurement(next);clearMeasurementCookies();location.reload();return;}
   syncMeasurement(next);trackPage();
  }};
  const click=(e:MouseEvent)=>{
   const a=(e.target as Element).closest?.("a");if(!a)return;
   const href=a.getAttribute("href")||"";
   if(href.startsWith("tel:"))track("contact_phone_click");
   else if(href.startsWith("mailto:"))track("contact_email_click");
   else if(/\/contact([?#]|$)/.test(href))track("contact_cta_click");
   else if(/\/services([?#]|$)/.test(href))track("service_interest");
  };
  document.addEventListener("click",click);
  return ()=>{document.removeEventListener("click",click);delete window.bagvedAnalytics;};
 },[measurementId,pixelId,matchingReviewed]);
 useEffect(()=>{trackPage();},[pathname]);
 return null;
}
