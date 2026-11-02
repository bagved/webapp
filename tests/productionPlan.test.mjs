import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const module={exports:{}};
const code=ts.transpileModule(readFileSync(new URL('../lib/productionPlan.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
vm.runInNewContext(code,{module,exports:module.exports,URLSearchParams});
const api=module.exports;

test('every context and goal produces an editable contact brief with exactly the selected channels',()=>{
 for(const context of api.contexts)for(const goal of api.goals){
  const plan={context:context.id,goal:goal.id,channels:['website','linkedin']};
  const brief=api.describePlan(plan);
  assert.ok(brief.message.includes(context.label));assert.ok(brief.message.includes(goal.label));
  assert.equal(brief.selected.length,2);assert.ok(!brief.message.includes('Instagram / Facebook'));
  const url=new URL(api.planContactHref(plan),'https://bagved.test');
  assert.equal(url.pathname,'/contact');assert.equal(url.hash,'#kontaktformular');
  assert.equal(url.searchParams.get('subject'),context.subject);
  assert.equal(JSON.stringify(api.decodePlan(url.searchParams.get('idea'))),JSON.stringify(api.validatePlan(plan)));
 }
});
test('unknown, oversized or malformed query data never becomes a contact brief',()=>{
 for(const raw of [null,'','hybrid:awareness','unknown:awareness:website','hybrid:nope:website','hybrid:awareness:customer@example.org','hybrid:awareness:','hybrid:awareness:website:extra','x'.repeat(201)]) assert.equal(api.decodePlan(raw),null);
 assert.equal(api.describePlan({context:'hybrid',goal:'awareness',channels:[]}),null);
 assert.equal(api.planContactHref({context:'<script>',goal:'awareness',channels:['website']}),'/contact#kontaktformular');
});
test('all channel combinations stay local data and duplicate channel IDs are normalized',()=>{
 for(const channel of api.channels){
  const brief=api.describePlan({context:'sports',goal:'engagement',channels:[channel.id]});
  assert.equal(brief.selected.length,1);assert.equal(brief.selected[0].id,channel.id);
  assert.ok(brief.message.includes(channel.output));
 }
 const valid=api.validatePlan({context:'event',goal:'sales',channels:['youtube','youtube']});
 assert.equal(valid.channels.length,1);
});

test('new activity, frequency and mode choices survive sharing and alter recommendations',()=>{
 for(const activity of api.activities)for(const frequency of api.frequencies)for(const mode of api.deliveryModes){
  const plan={context:'business',goal:'knowledge',channels:['linkedin'],activity:activity.id,frequency:frequency.id,mode:mode.id};
  const brief=api.describePlan(plan);assert.ok(brief);
  assert.ok(brief.message.includes(activity.label));assert.ok(brief.message.includes(frequency.label));assert.ok(brief.message.includes(mode.label));
  const url=new URL(api.planContactHref(plan),'https://bagved.test');
  assert.equal(JSON.stringify(api.decodePlan(url.searchParams.get('idea'))),JSON.stringify(api.validatePlan(plan)));
 }
 const film=api.describePlan({context:'sports',goal:'awareness',channels:['website'],activity:'film',frequency:'weekly',mode:'onsite'});
 assert.equal(film.recommendation.subject,'Virksomhedsvideo');
 const live=api.describePlan({context:'sports',goal:'awareness',channels:['website'],activity:'livestream',frequency:'yearly',mode:'hybrid'});
 assert.equal(live.recommendation.subject,'Sportsbroadcast');
});
test('legacy briefs remain usable while explicit incomplete or unapproved new choices are rejected',()=>{
 const legacy=api.decodePlan('hybrid:awareness:website,linkedin');
 assert.ok(legacy);assert.equal(legacy.activity,'unsure');assert.equal(legacy.frequency,'unsure');assert.equal(legacy.mode,'unsure');
 for(const field of ['activity','frequency','mode'])for(const value of ['', 'unapproved']){
  const plan={...api.defaultPlan,[field]:value};assert.equal(api.validatePlan(plan),null);assert.equal(api.encodePlan(plan),'');
 }
 for(const raw of ['v2:hybrid:awareness:website:event:weekly:nope','v3:hybrid:awareness:website:event:weekly:online','v2:hybrid:awareness:website:event:weekly'])assert.equal(api.decodePlan(raw),null);
});
