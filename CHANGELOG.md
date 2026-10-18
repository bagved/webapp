# Change log

## 2026-10-14 — technical GA4 integration only
Baseline: original bagved/webapp commit 18af5a7127f2c346ddf9830b0bc80556826c1136.
Before: no Analytics integration in the production repository.
After: invisible GA4 integration using existing stream G-7J3HGDGM6C; route page views, contact clicks, submission attempts/errors and generate_lead after successful existing mail API responses. External consent API; off by default. No banner, visible design changes or cookie/privacy policy edits.
Files: app/layout.tsx, components/analytics/Analytics.tsx, lib/consent.ts, lib/measurement.ts, both contact forms, tests/measurement.test.mjs, ANALYTICS.md.
Verification: revised technical-only integration passed TypeScript, webpack production build and all six measurement tests. Cookie policy restored byte-for-byte from origin/main; invisible component returns null.
Limitations: production publication blocked by automatic approval review and has not occurred. Actual live event receipt remains unverified. SMTP configuration is unchanged.

## 2026-10-14 — ChatGPT Ads conversion preparation
Added separate statistics/marketing consent inputs to the invisible integration and Pixel configuration hooks. GA4 generate_lead and OpenAI lead_created share event_id after successful contact API response. No banner or policy changes. Pixel disabled until the selected account has a source and automatic matching has been reviewed. Source creation requires conversion terms acceptance; deployment still requires explicit approval. Additional tests cover dual-destination lead dispatch, errors not counting as leads and disabled unreviewed matching.

Verification for combined integration: TypeScript, production webpack build and eight automated measurement tests passed. Actual received GA4/OpenAI events not yet verified; Pixel ID has not been created.

## Approved Pixel configuration
Created Bagved.com — website and Bagved — kontaktformular after explicit conversion terms approval. OpenAI automatic advanced matching is enabled with no UI toggle; moved SDK into a separate form-free document and whitelisted message bridge so it does not scan the main page's customer fields. Inspected current SDK: own-document queries, no parent document traversal. Added returned Pixel ID to the public build configuration. Consent remains independently gated; no banner or visible website changes.

Verification after Pixel isolation: production build, TypeScript and eight tests passed. Live SDK receipt test in progress from a local synthetic harness; no customer emails sent. Deployment explicitly approved by the user on 14 October 2026.

Live receipt testing identified a bootstrap queue timing bug in the isolated Pixel bridge: late events were queued on the replaced stub. Fixed forwarding to resolve window.oaiq at send time; added a regression test for post-initialization lead delivery, origin/source validation and field filtering. GA4 received the synthetic test lead before this fix; OpenAI lead receipt is being retested.

## Final verification — 2026-10-14
Published commits 4959fc1 and cf8423e through main; Vercel reports successful deployment. Live HTML contains both IDs and no consent banner; live isolated Pixel document byte-matches tested source. GA4 DebugView received page_view, form_start, form_error and generate_lead from the synthetic local harness. OpenAI event stream received lead_created (customer_action) through pixel_sdk at 21:18:36 UTC, plus page_viewed and form_start. OpenAI detail shows no email hash or customer fields. Nine automated tests and TypeScript passed; production build passed before the static forwarding fix, which is covered by its regression test and Vercel's successful build.
Limits: test was synthetic and did not submit mail to Bagved. Existing SMTP delivery was not exercised. Production remains off until actual visitor consent is supplied through the invisible API. There is no UI to obtain it in this scope. No campaigns launched; received test events do not prove ad attribution. Automatic matching remains provider-enabled; the isolated document has no customer fields.

## 16 October 2026 — Enable production Google Ads conversion destination
- Before: GA4 and isolated ChatGPT Ads Pixel were configured; the Google Ads destination and lead label were empty.
- After: configure AW-1003664894/xv1vCIHagJ0dEP7ryt4D, read back from the existing Bagved conversion action in Google Ads. A successful contact response now routes the existing event to all permitted destinations. No form or mail handler changes.
- Files: components/analytics/Analytics.tsx, ANALYTICS.md, CHANGELOG.md.
- Verification: 9 measurement tests, TypeScript and Next.js webpack production build passed. Existing event is counted once per enquiry id.
- Limits: visitor consent still required through the invisible integration; no consent UI added as requested. No campaign or spend activated. SMTP mailbox delivery not exercised.

## 18 October 2026 — Cookie A implementation checkpoint; CLI handover
- User approved only the compact cookie concept A and necessary consent/tracking wiring for production; other local improvements remain excluded.
- Added a production consent banner/settings control in the root layout, independent statistics/marketing choices, session fallback on unavailable storage, cross-tab reload and immediate GA disable/Google consent update on withdrawal. Existing SMTP/forms and other page content are unchanged.
- Files: components/analytics/ConsentBanner.tsx and .module.css, Analytics.tsx, app/layout.tsx, lib/consent.ts, lib/measurement.ts, tests/measurement.test.mjs.
- Checks so far: 10 measurement/consent tests, TypeScript, webpack production build and diff whitespace check passed. Browser reject+reload preserved false/false with no provider resources; statistics-only loaded GA4 without Pixel. Collector responses observed: GA4 204, Google Ads page request 200, OpenAI SDK events 202. These are synthetic local checks, not platform-account verification or ad attribution.
- Remaining at handover: complete browser withdrawal/reopen/mobile matrix and synthetic conversion/deduplication checks; update current integration documentation; verify provider platform receipt and final live deployment. Some UI test sequences timed out after reload; no final browser approval claimed. Ads Manager source lookup returned connector unavailable. No form submission/email, commit, push or deployment by this task yet.
- Implementation ownership transferred from app task to one visible Codex CLI session at the user's request; checkpoint is outside the repo at /Users/mag/Documents/Codex/2026-10-18/task/COOKIE-A-CLI-HANDOVER.txt. Final results must be appended before release.

## Maintenance contract — 18 October 2026

- Update this production CHANGELOG.md in the same commit as every future production change. Record date, before/after behavior, affected files, checks actually run, deployment status and unresolved limits. Never store credentials or customer submissions here.
- The original production baseline remains 18af5a7127f2c346ddf9830b0bc80556826c1136. Technical integration commits are 4959fc1, cf8423e, d3557cf and 12eb89b. Historical intermediate entries above are retained; later final-verification entries supersede their then-pending statuses.
- This repository is the technical production version. Design, copy, animation, local StageTimer and cookie-banner concepts belong in the separate improved local client version and its own CHANGELOG.md. Client review is required before any future public design release.
- A log entry is not proof of production event receipt. Last previously documented synthetic GA4/OpenAI receipt is 16 October; no new provider receipt or ad-attribution test was run for this documentation change. Existing form/SMTP delivery has not been re-tested by sending mail.

## 18 October 2026 — Clarify production change tracking

- Before: historical tracking changes were logged, but the ongoing logging rule and local/production boundary were not explicit in repository instructions.
- After: added this maintenance contract and AGENTS.md instructions requiring the production log to stay current. The improved local version keeps a separate log; it is not copied into production.
- Files: CHANGELOG.md and AGENTS.md only.
- Verification: compared production history and changed-file inventory against the original baseline and current head 12eb89b; all historical tracking changes are represented above. This is documentation only; runtime source, form handler, tracking configuration and user-facing content are unchanged.
- Deployment: this documentation commit follows the repository's existing automatic-deployment mechanism. Provider build result is verified separately where available. No campaign, spend or cookie banner is activated by it.

## 19 October 2026 — Cookie A release candidate; single-writer CLI completion

- Before: production exposed only the invisible consent API; ordinary visitors had no optional-tracking choice UI. After: the approved compact Cookie A provides equal accept/reject controls, independent initially-off statistics/marketing, saved choices and a permanent settings control. No other local design, copy, animation, StageTimer or offer/demo features are included.
- Fixed withdrawal edge cases found during review: immediate Google denial/GA disable, Pixel removal, expiry of the observed OpenAI `__oaiq_consent` cookie, and an unsaved-choice session marker to prevent restoration of an older grant where session storage works. Blocked writes retain only the current-page choice and display a notice. Cross-tab changes trigger reload.
- Files: app/layout.tsx; components/analytics/ConsentBanner.tsx, ConsentBanner.module.css and Analytics.tsx; lib/consent.ts and measurement.ts; tests/measurement.test.mjs; ANALYTICS.md; CHANGELOG.md. Contact form/API/SMTP source, other page content, dependencies and lockfile remain unchanged from a42a18e. Original baseline: 18af5a7127f2c346ddf9830b0bc80556826c1136.
- Checks performed: 12/12 automated measurement/consent tests; TypeScript without incremental output; production webpack build (12 routes); whitespace diff check. Local production-browser checks covered reject/reload (no providers), statistics-only (GA4 without Pixel), marketing-only, both categories, reopening, withdrawal (no provider resources and empty measurement cookies after reload), blocked writes (notice, denied Google state, removed Pixel), and responsive settings at 320/390/1200 pixels. Screenshots were inspected, including scroll access to all actions at 320 pixels.
- Synthetic homepage form checks intercepted /api/contact in the isolated browser: mocked 500 produced no lead; mocked 200 dispatched one shared synthetic event ID to GA4, Google Ads and ChatGPT Ads. A repeated success with the same ID produced no second lead/Google Ads conversion. No request reached SMTP and no real customer email was sent. No customer fields appeared in the inspected measurement bodies. Local test URLs and event IDs were explicitly synthetic.
- Collector transport evidence: GA4 generate_lead HTTP 204; Google Ads primary conversion collector HTTP 200 with the synthetic transaction ID; OpenAI lead_created HTTP 202. DoubleClick fallback DNS resolution failed in this environment. None of these proves account event-stream visibility, mail delivery or advertising attribution.
- Limitations: fresh platform-account receipt remains unverified; prior GA4/OpenAI dashboard evidence is historical. The handover's Ads Manager connector lookup was forbidden/unavailable, and automatic approval review rejected Safari inspection because it could expose unrelated private tabs/sessions. No security/access settings changed. Existing React hydration error #418 was observed, so browser interactions were checked after stable loading. If both storage mechanisms reject writes/removal while an older grant stays readable, a manual reload can restore it; immediate current-page withdrawal still works. Existing video/fonts remain outside these two choices and are described in settings.
- Deployment at this checkpoint: not yet pushed or deployed; remote main read back as a42a18e12d09f64bb6d646cf458c5ad1154d1c37. User's scoped production authorization is retained. The exact release commit, Vercel result and live verification will be appended after publication. No campaigns, spend, new terms or real mail tests were activated.
