import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const module={exports:{}};
const code=ts.transpileModule(readFileSync(new URL('../lib/sectionBackground.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
vm.runInNewContext(code,{module,exports:module.exports});
const {sectionTint}=module.exports;

test('sections blend on entering the reading area and hold a stable tone in their body',()=>{
 assert.equal(sectionTint([{top:400,tint:48}],1000,0),0);
 assert.equal(sectionTint([{top:350,tint:48}],1000,50),24);
 assert.equal(sectionTint([{top:900,tint:48}],1000,2000),0);
 assert.equal(sectionTint([{top:550,tint:48}],1000,2000),24);
 assert.equal(sectionTint([{top:300,tint:48}],1000,2000),48);
 assert.equal(sectionTint([{top:-1500,tint:48},{top:1000,tint:0}],1000,2000),48);
});
test('a later light section reverses the color only at its own boundary',()=>{
 const at=top=>sectionTint([{top:-1000,tint:48},{top,tint:0}],1000,2000);
 assert.equal(at(900),48);assert.equal(at(550),24);assert.equal(at(300),0);
 assert.equal(at(550),24);assert.equal(at(900),48);
});
test('unmarked pages stay fixed and invalid tint/viewport values do not corrupt CSS',()=>{
 assert.equal(sectionTint([],1000),0);assert.equal(sectionTint([{top:0,tint:48}],0,2000),0);
 assert.equal(sectionTint([{top:0,tint:NaN}],1000,2000),0);
 assert.equal(sectionTint([{top:0,tint:200}],1000,2000),100);
 assert.equal(sectionTint([{top:0,tint:-20}],1000,2000),0);
});
