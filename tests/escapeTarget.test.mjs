import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const module={exports:{}};
const code=ts.transpileModule(readFileSync(new URL('../lib/escapeTarget.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
vm.runInNewContext(code,{module,exports:module.exports});
const {escapeTarget}=module.exports;
const rng=()=>{let state=9451;return ()=>{state=(state*16807)%2147483647;return state/2147483647;};};

test('the joke stays still when the pointer is far away',()=>{
 assert.equal(escapeTarget({width:560,height:220,button:{x:294,y:80,width:90,height:44},pointer:{x:0,y:0},obstacle:{x:176,y:80,width:90,height:44}},rng()),null);
});
test('repeated pursuit gives varied positions within bounds and paths clear of Ja',()=>{
 for(const width of [246,300,560]){
  const random=rng();let current={x:width/2+14,y:80},previous=null;const positions=[];
  const obstacle={x:width/2-104,y:80,width:90,height:44};
  for(let i=0;i<30;i++){
   const next=escapeTarget({width,height:220,button:{...current,width:90,height:44},pointer:{x:current.x+45,y:current.y+22},obstacle,previous},random);
   assert.ok(next,`an escape path should exist at width ${width}`);
   assert(next.x>=8&&next.x+90<=width-8+.001&&next.y>=8&&next.y+44<=212+.001);
   for(let t=0;t<=1;t+=.05){
    const p={x:current.x+(next.x-current.x)*t,y:current.y+(next.y-current.y)*t};
    assert(!(p.x<obstacle.x+obstacle.width&&p.x+90>obstacle.x&&p.y<obstacle.y+obstacle.height&&p.y+44>obstacle.y),'path must not cover Ja');
   }
   positions.push(`${Math.round(next.x)},${Math.round(next.y)}`);previous=current;current=next;
  }
  assert(new Set(positions).size>20,'movement must not bounce between a handful of presets');
 }
});
