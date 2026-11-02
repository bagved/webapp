import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';
const require = createRequire(import.meta.url);
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
function load(file, dependencies = {}) {
 const module = { exports: {} };
 const code = ts.transpileModule(readFileSync(new URL(file, import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
 vm.runInNewContext(code, { module, exports: module.exports, require: name => name in dependencies ? dependencies[name] : require(name) });
 return module.exports;
}
const productions = load('../lib/productions.ts', { './features': { SPORTS: 'yes' } });
const clientCases = load('../lib/clientCases.ts');
const { examples } = load('../lib/examples.ts', { './productions': productions, './clientCases': clientCases });

test('only featured customer cases join the shared examples order without duplicating format IDs', () => {
 assert.equal(examples[0].id, 'cag-2025');
 assert.equal(examples[0].kind, 'case');
 assert.equal(examples[0].partner, 'Sports Productions');
 assert.equal(examples[0].headline, 'Atletik stævne til Broadcast og Storskærm');
 assert.equal(new Set(examples.map(item => item.id)).size, examples.length);
 assert.deepEqual(Array.from(examples.filter(item => item.kind === 'format'), item => item.id), Array.from(productions.productions, item => item.id));
 assert.ok(!examples.some(item => item.id === 'finansforbundet-nytaarskur'));
});

const { default: ProductionMedia } = load('../components/production/ProductionMedia.tsx', {
 'next/image': { __esModule: true, default: ({ src, alt }) => React.createElement('img', { src, alt }) },
 '@/components/i18n/LanguageProvider': { useI18n: () => ({ t: source => source }) },
 './ProductionPages.module.css': { __esModule: true, default: { media: 'media', play: 'play' } },
});
test('direct case videos use native controls with no preload, autoplay or third-party iframe', () => {
 const html = renderToStaticMarkup(React.createElement(ProductionMedia, { production: { image: '/poster.jpg', video: { kind: 'file', src: '/test-video.mp4', title: 'Case video' } } }));
 assert.match(html, /<video/); assert.match(html, /controls=""/); assert.match(html, /preload="none"/); assert.match(html, /playsinline=""/i);
 assert.match(html, /src="\/test-video.mp4"/); assert.match(html, /poster="\/poster.jpg"/);
 assert.doesNotMatch(html, /iframe|autoplay/i);
});
test('missing videos keep their image and embedded videos wait for deliberate playback', () => {
 for (const video of [undefined, { kind: 'embed', src: 'https://example.test/video', title: 'Case video' }]) {
  const html = renderToStaticMarkup(React.createElement(ProductionMedia, { production: { image: '/poster.jpg', video } }));
  assert.match(html, /<img/); assert.doesNotMatch(html, /<iframe|<video/);
  assert.equal(html.includes('<button'), Boolean(video));
 }
});
