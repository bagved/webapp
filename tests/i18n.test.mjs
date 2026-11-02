import { test } from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import { checkTranslations } from '../scripts/check-translations.mjs';
const messages = JSON.parse(readFileSync(new URL('../lib/i18n/messages.json', import.meta.url), 'utf8'));
function load(file, require = () => { throw new Error('Unexpected import'); }) {
 const module = { exports: {} };
 const code = ts.transpileModule(readFileSync(new URL(file, import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
 vm.runInNewContext(code, { module, exports: module.exports, require, URLSearchParams });
 return module.exports;
}
const { translate, isLocale } = load('../lib/i18n/locale.ts', () => messages);
const planner = load('../lib/productionPlan.ts');

test('all source copy has English and German versions with matching placeholders', () => {
 assert.deepEqual(checkTranslations(), []);
});
test('source changes safely fall back to current Danish, whitespace and interpolation are preserved', () => {
 for (const locale of ['da', 'en', 'de']) {
  assert.equal(translate(locale, 'Unreleased source change'), 'Unreleased source change');
  assert.equal(translate(locale, ' '), ' ');
 }
 assert.equal(translate('en', ' Kontakt '), ' Contact ');
 assert.equal(translate('de', '{index} af {total}', { index: 2, total: 6 }), '2 von 6');
 assert.ok(isLocale('da') && isLocale('en') && isLocale('de'));
 assert.ok(!isLocale('EN') && !isLocale('<script>') && !isLocale(null));
});
test('every activity and recurrence produces a translated editable brief while stable plan IDs and subjects are unchanged', () => {
 for (const locale of ['en', 'de']) for (const activity of planner.activities) for (const frequency of planner.frequencies) {
  const plan = { context: 'business', goal: 'knowledge', channels: ['website', 'linkedin'], activity: activity.id, frequency: frequency.id, mode: 'hybrid' };
  const brief = planner.describePlan(plan, (text, values) => translate(locale, text, values));
  assert.ok(brief.message.startsWith(locale === 'en' ? 'Hi Bagved,' : 'Hallo Bagved,'));
  assert.ok(brief.message.includes(translate(locale, activity.label)));
  assert.ok(brief.message.includes(translate(locale, frequency.note)));
  assert.ok(!brief.message.includes('Vi planlægger') && !/\{\w+\}/.test(brief.message));
  assert.equal(brief.recommendation.subject, planner.describePlan(plan).recommendation.subject);
  assert.equal(JSON.stringify(planner.decodePlan(planner.encodePlan(plan))), JSON.stringify(planner.validatePlan(plan)));
 }
});
