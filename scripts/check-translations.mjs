import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'lib/i18n/messages.json'), 'utf8'));
const humanProperties = new Set(['title', 'headline', 'intro', 'challenge', 'approach', 'deliverables', 'label', 'lead', 'value', 'output', 'note', 'q', 'a', 'quote', 'role', 'body', 'subtitle']);
const sourceData = ['lib/productions.ts', 'lib/productionPlan.ts', 'lib/clientCases.ts'];
const neutral = new Set(['Bagved', 'BAGVED', 'CAG 2025', 'IS Nordic', 'Sports Productions', 'Moot Agency', 'Finansforbundet', 'Mia Grønbæk', 'Thomas Elkjær', 'Sofie Dahl', 'Kristian Holm', 'LinkedIn', 'YouTube', 'Instagram / Facebook']);
function walk(dir) {
  return fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`]);
}
export function translationSources() {
 const sources = new Map();
 const add = (text, file) => {
  const key = text.trim().replace(/\s+/g, ' ');
  if (!/[a-zæøå]/i.test(key) || neutral.has(key) || key.includes('@') || /^https?:/.test(key) || /^(?:CVR:|\+45)/.test(key)) return;
  sources.set(key, file);
 };
 for (const file of [...walk('app'), ...walk('components'), ...sourceData].filter(file => /\.tsx?$/.test(file) && !file.includes('/api/'))) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  function callStrings(node) {
   if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) add(node.text, file);
   else if (ts.isConditionalExpression(node)) { callStrings(node.whenTrue); callStrings(node.whenFalse); }
   else if (ts.isBinaryExpression(node)) { callStrings(node.left); callStrings(node.right); }
  }
  function visit(node) {
   if (ts.isJsxElement(node) && ['style', 'script'].includes(node.openingElement.tagName.getText(ast))) return;
   if (file.endsWith('.tsx') && source.includes('useI18n') && ts.isJsxText(node)) add(node.text, file);
   if (ts.isCallExpression(node) && node.expression.getText(ast) === 't') node.arguments.slice(0, 1).forEach(callStrings);
   if (sourceData.includes(file) && ts.isPropertyAssignment(node) && humanProperties.has(node.name.getText(ast))) {
    if (ts.isStringLiteral(node.initializer)) add(node.initializer.text, file);
    if (ts.isArrayLiteralExpression(node.initializer)) node.initializer.elements.forEach(callStrings);
   }
   // Content stored outside JSX, such as FAQ data, typing phrases and validation messages.
   if (file.endsWith('.tsx') && ts.isPropertyAssignment(node) && humanProperties.has(node.name.getText(ast)) && ts.isStringLiteral(node.initializer)) add(node.initializer.text, file);
   if (ts.isJsxAttribute(node) && node.name.getText(ast) === 'phrases' && node.initializer && ts.isJsxExpression(node.initializer) && node.initializer.expression && ts.isArrayLiteralExpression(node.initializer.expression)) node.initializer.expression.elements.forEach(callStrings);
   if (ts.isBinaryExpression(node) && ts.isPropertyAccessExpression(node.left) && ['e.name', 'e.message', 'e.contact'].includes(node.left.getText(ast))) callStrings(node.right);
   ts.forEachChild(node, visit);
  }
  visit(ast);
 }
 return sources;
}
export function checkTranslations() {
 const missing = [];
 for (const [key, file] of translationSources()) {
  for (const locale of ['en', 'de']) if (!catalog[key]?.[locale]?.trim()) missing.push(`${file}: missing ${locale}: ${key}`);
 }
 for (const [key, versions] of Object.entries(catalog)) {
  const placeholders = text => [...text.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort().join(',');
  for (const locale of ['en', 'de']) if (typeof versions[locale] !== 'string' || placeholders(key) !== placeholders(versions[locale])) missing.push(`Invalid translation/placeholders (${locale}): ${key}`);
 }
 return missing;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
 const missing = checkTranslations();
 if (missing.length) { console.error(missing.join('\n')); process.exitCode = 1; }
 else console.log(`Translations complete: ${Object.keys(catalog).length} Danish sources, English and German.`);
}
