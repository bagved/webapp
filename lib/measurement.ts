import {startPixel,pixelEvent,stopPixel} from './openai-pixel';
import { readConsent, type Consent } from './consent';
export type MeasurementConfig = { ga4: string; googleAds: string; googleAdsLeadLabel: string; openaiPixel: string; openaiMatchingReviewed: boolean; debug: boolean };
type Tag = (...args: unknown[]) => void;
declare global { interface Window { dataLayer?: unknown[]; gtag?: Tag; oaiq?: Tag & {q?: unknown[]}; bagvedMeasurement?: {name: string; destinations: string[]; eventId?: string}[] } }
let config: MeasurementConfig = {ga4:'',googleAds:'',googleAdsLeadLabel:'',openaiPixel:'',openaiMatchingReviewed:false,debug:false};
let googleLoaded = false, openaiLoaded = false;
let googleAnalyticsReady = false, googleAdsReady = false;
let pageKey = '';
const sent = new Set<string>();
export function safePagePath(path: string) {
  return /^\/[A-Za-z0-9_\/-]*$/.test(path) ? path : '/other';
}
function safeLocation() {
  const u = new URL(location.href), q = new URLSearchParams();
  for (const [k,v] of u.searchParams) if (/^(utm_source|utm_medium|utm_campaign|utm_content|gclid|gbraid|wbraid)$/.test(k) && /^[A-Za-z0-9_.~-]{1,250}$/.test(v)) q.set(k,v);
  return u.origin + safePagePath(u.pathname) + (q.size ? '?'+q.toString() : '');
}
function referrerOrigin() { try { return new URL(document.referrer).origin; } catch { return ''; } }
function loadScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const s=document.createElement('script'); s.id=id; s.async=true; s.src=src;
  s.onerror=()=>{ document.documentElement.dataset.measurementError='script-load-failed'; };
  document.head.appendChild(s);
}
function googleConsent(c: Consent) { return {analytics_storage:c.statistics?'granted':'denied',ad_storage:c.marketing?'granted':'denied',ad_user_data:c.marketing?'granted':'denied',ad_personalization:'denied',functionality_storage:'granted',security_storage:'granted',personalization_storage:'denied'}; }
export function configureMeasurement(value: MeasurementConfig) { config=value; window.bagvedMeasurement ??= []; }
export function syncMeasurement(c: Consent) {
  const ga=/^G-[A-Z0-9]+$/.test(config.ga4), ads=/^AW-\d+$/.test(config.googleAds);
  if ((ga&&c.statistics)||(ads&&c.marketing)) {
    if (!googleLoaded) {
      window.dataLayer ??= [];
      window.gtag = function(){window.dataLayer!.push(arguments);};
      window.gtag('consent','default',googleConsent({...c,statistics:false,marketing:false}));
      window.gtag('set','ads_data_redaction',true);
      window.gtag('set','url_passthrough',false);
      window.gtag('js',new Date()); googleLoaded=true;
      loadScript('bagved-google-tag','https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(ga&&c.statistics?config.ga4:config.googleAds));
    }
    window.gtag?.('consent','update',googleConsent(c));
    if (ga&&c.statistics&&!googleAnalyticsReady) {
      window.gtag?.('config',config.ga4,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,cookie_expires:60*60*24*365,cookie_update:false,page_location:safeLocation(),page_referrer:referrerOrigin(),debug_mode:config.debug}); googleAnalyticsReady=true;
    }
    if (ads&&c.marketing&&!googleAdsReady) {
      window.gtag?.('config',config.googleAds,{send_page_view:false,allow_ad_personalization_signals:false,page_location:safeLocation(),page_referrer:referrerOrigin()}); googleAdsReady=true;
    }
  }
  if (c.marketing&&config.openaiPixel&&config.openaiMatchingReviewed) {
    if (!openaiLoaded) {startPixel(config.openaiPixel,config.debug);openaiLoaded=true;}
  } else if(openaiLoaded) {stopPixel();openaiLoaded=false;}

}
export type EventName = 'page_view'|'form_start'|'form_error'|'contact_phone_click'|'contact_email_click'|'contact_cta_click'|'service_interest'|'video_requested'|'generate_lead';
export function track(name: EventName, form: 'homepage'|'contact'|'none' = 'none', eventId?: string) {
  const c=readConsent(); if (!c || (!c.statistics&&!c.marketing)) return;
  if (name==='generate_lead'&&!eventId) return;
  const key=eventId?`${name}:${eventId}`:''; if(key&&sent.has(key))return;
  if(key)sent.add(key);
  const destinations:string[]=[];
  const params={page_location:safeLocation(),page_path:safePagePath(location.pathname),page_referrer:referrerOrigin(),form_id:form,language:document.documentElement.lang,...(eventId?{event_id:eventId}:{}),...(config.debug?{debug_mode:true}:{})};
  if(c.statistics&&googleAnalyticsReady) { window.gtag?.('event',name,{...params,send_to:config.ga4});destinations.push('GA4'); }
  if(c.marketing&&googleAdsReady&&name==='generate_lead'&&/^[A-Za-z0-9_-]+$/.test(config.googleAdsLeadLabel)) {
    window.gtag?.('event','conversion',{send_to:config.googleAds+'/'+config.googleAdsLeadLabel,transaction_id:eventId,page_location:safeLocation(),page_referrer:referrerOrigin()});destinations.push('Google Ads');
  }
  if(c.marketing&&openaiLoaded) {
    const options={...(eventId?{event_id:eventId}:{}),opt_out:true};
    if(name==='page_view') pixelEvent('page_viewed',{type:'contents'},options);
    else if(name==='generate_lead') pixelEvent('lead_created',{type:'customer_action'},options);
    else pixelEvent('custom',{type:'custom'},{...options,custom_event_name:name});
    destinations.push('ChatGPT Ads');
  }
  window.bagvedMeasurement ??= []; window.bagvedMeasurement.push({name,destinations,...(eventId?{eventId}:{})});
  window.bagvedMeasurement=window.bagvedMeasurement.slice(-30);
  window.dispatchEvent(new Event('bagved:measurement'));
}
export function trackPage() {
  const c=readConsent();const key=location.pathname+':'+!!c?.statistics+':'+!!c?.marketing;
  if(pageKey===key)return;pageKey=key;track('page_view');
}
