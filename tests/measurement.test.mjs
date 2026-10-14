import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
function load(file,globals={},imports={}){
 const module={exports:{}};
 const code=ts.transpileModule(readFileSync(new URL('../'+file,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
 vm.runInNewContext(code,{module,exports:module.exports,require:n=>{if(n in imports)return imports[n];throw Error(n);},Date,URL,URLSearchParams,Event,...globals},{filename:file});return module.exports;
}
test('consent rejects tampering, expiry, invalid versions and future dates',()=>{
 const c=load('lib/consent.ts');const valid={version:1,updatedAt:100000000000,statistics:true,marketing:false,media:false};
 assert.equal(c.parseConsent(JSON.stringify(valid),valid.updatedAt+1).statistics,true);
 for(const altered of [{...valid,version:2},{...valid,marketing:'yes'},{...valid,updatedAt:NaN},{...valid,updatedAt:valid.updatedAt+100}])assert.equal(c.parseConsent(JSON.stringify(altered),valid.updatedAt+1),null);
 assert.equal(c.parseConsent(JSON.stringify(valid),valid.updatedAt+c.CONSENT_LIFETIME+1),null);
 assert.equal(c.parseConsent('{broken'),null);
});
function engine(consent){
 const scripts=[],win={dispatchEvent:()=>{}},doc={referrer:'https://example.org/private?email=private@example.org',documentElement:{lang:'da',dataset:{}},head:{appendChild:s=>scripts.push(s)},getElementById:()=>null,createElement:()=>({})};
 const api=load('lib/measurement.ts',{window:win,document:doc,location:{href:'http://localhost:3000/contact?email=private@example.org&utm_campaign=bagved_test&message=secret',pathname:'/contact'}},{'./consent':{readConsent:()=>consent},'./openai-pixel':{startPixel:()=>{win.oaiq={q:[['consent',false]]};},pixelEvent:(...args)=>win.oaiq.q.push(['measure',...args]),stopPixel:()=>win.oaiq.q.push(['consent',false])}});
 api.configureMeasurement({ga4:'G-TEST123',googleAds:'AW-123456',googleAdsLeadLabel:'test-label',openaiPixel:'test-only',openaiMatchingReviewed:true,debug:true});return {api,win,scripts};
}
test('no provider scripts or events before consent',()=>{
 const c={statistics:false,marketing:false,media:false};const {api,win,scripts}=engine(c);api.syncMeasurement(c);api.track('page_view');assert.equal(scripts.length,0);assert.equal(win.gtag,undefined);assert.equal(win.oaiq,undefined);
});
test('statistics-only sends GA4, no advertising, no PII/query leakage',()=>{
 const c={statistics:true,marketing:false,media:false};const {api,win,scripts}=engine(c);api.syncMeasurement(c);api.track('page_view');api.track('contact_phone_click');assert.equal(scripts.length,1);assert.equal(win.oaiq,undefined);
 const serialized=JSON.stringify(win.dataLayer);assert.ok(!serialized.includes('private@example.org'));assert.ok(!serialized.includes('message=secret'));assert.ok(!serialized.includes('AW-123456'));assert.ok(serialized.includes('bagved_test'));assert.ok(serialized.includes('contact_phone_click'));
});
test('marketing-only routes one successful lead to Ads and OpenAI; deduplicates receipts',()=>{
 const c={statistics:false,marketing:true,media:false};const {api,win}=engine(c);api.syncMeasurement(c);api.track('generate_lead');api.track('generate_lead','contact','receipt-123');api.track('generate_lead','contact','receipt-123');
 const rows=win.dataLayer.map(x=>Array.from(x));assert.equal(rows.filter(x=>x[0]==='event'&&x[1]==='conversion').length,1);assert.equal(rows.filter(x=>x[0]==='event'&&x[1]==='generate_lead').length,0);
 const pixel=win.oaiq.q.map(x=>Array.from(x));assert.equal(pixel[0][0],'consent');assert.equal(pixel[0][1],false);assert.equal(pixel.filter(x=>x[0]==='measure'&&x[1]==='lead_created').length,1);assert.equal(pixel.at(-1)[3].event_id,'receipt-123');assert.ok(!JSON.stringify(pixel).includes('private@example.org'));
});
test('withdrawal immediately stops new events',()=>{
 const c={statistics:true,marketing:true,media:false};const {api,win}=engine(c);api.syncMeasurement(c);api.track('page_view');const n=win.dataLayer.length;c.statistics=false;c.marketing=false;api.syncMeasurement(c);api.track('generate_lead','contact','new-id');assert.equal(win.dataLayer.length,n);assert.equal(Array.from(win.oaiq.q.at(-1))[1],false);
});
test('arbitrary paths are redacted',()=>{const {api}=engine(null);assert.equal(api.safePagePath('/customer/private@example.org'),'/other');assert.equal(api.safePagePath('/de/contact'),'/de/contact');});

test('one accepted enquiry reaches GA4 and ChatGPT Ads exactly once with the same event id',()=>{
 const c={statistics:true,marketing:true,media:false};const {api,win}=engine(c);
 api.syncMeasurement(c);api.track('form_start','contact');api.track('form_error','contact');
 const before=win.oaiq.q.map(x=>Array.from(x));
 assert.equal(before.filter(x=>x[0]==='measure'&&x[1]==='lead_created').length,0);
 api.track('generate_lead','contact','accepted-enquiry-1');api.track('generate_lead','contact','accepted-enquiry-1');
 const google=win.dataLayer.map(x=>Array.from(x)).filter(x=>x[0]==='event'&&x[1]==='generate_lead');
 const ads=win.oaiq.q.map(x=>Array.from(x)).filter(x=>x[0]==='measure'&&x[1]==='lead_created');
 assert.equal(google.length,1);assert.equal(ads.length,1);
 assert.equal(google[0][2].event_id,ads[0][3].event_id);
 assert.equal(ads[0][2].type,'customer_action');assert.equal(ads[0][3].opt_out,true);
});
test('pixel remains disabled until account matching configuration is reviewed',()=>{
 const c={statistics:true,marketing:true,media:false};const {api,win,scripts}=engine(c);
 api.configureMeasurement({ga4:'G-TEST123',googleAds:'',googleAdsLeadLabel:'',openaiPixel:'test-only',openaiMatchingReviewed:false,debug:false});
 api.syncMeasurement(c);api.track('generate_lead','contact','accepted-2');
 assert.equal(scripts.length,1);assert.equal(win.oaiq,undefined);
});
