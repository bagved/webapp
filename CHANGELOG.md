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
