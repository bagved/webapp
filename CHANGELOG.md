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
