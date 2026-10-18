# GA4 and ChatGPT Ads technical integration

## Current Cookie A release — 19 October 2026

The approved compact Cookie A interface now collects the visitor's choice. Accept and reject have equal sizing; statistics and marketing are independently off initially. Settings can always be reopened through Cookieindstillinger below the footer. No other local design concepts are included. Existing TwentyThree video and Google Fonts behavior is unchanged and explicitly described in settings.

Statistics gates GA4; marketing gates the existing Google Ads action and isolated ChatGPT Ads Pixel. `window.bagvedAnalytics.setConsent({statistics, marketing})` returns whether the choice was persisted. Boolean true still grants statistics only. Stored choices retain version 1 and the 180-day lifetime. On failed storage the current page uses an in-memory choice and shows a notice. An old stored choice is removed where possible; a session-storage marker, when available, prevents it being restored on reload. If both storage mechanisms are read-only while an older grant remains readable, persistence of withdrawal across a manual reload cannot be guaranteed. The current page still denies immediately.

Withdrawal updates Google consent, disables GA4 immediately, removes the Pixel iframe and clears known Google/OpenAI cookies including `__oaiq_consent`. A persisted withdrawal reloads to remove loaded SDKs. Changes in another tab reload this tab. No optional provider code loads on a fresh visit or after persisted rejection. Form/API/SMTP code is unchanged; leads are dispatched only after an OK response from the existing API, using one event ID and the existing deduplication.

Release checks: 12 automated tests, TypeScript and the production webpack build passed. Isolated local browser checks covered rejection/reload, independent categories, reopening, acceptance, withdrawal with cookie removal, blocked writes, and mobile widths 320/390 plus desktop. A mocked API 500 produced no lead; mocked 200 produced one lead sent to all permitted destinations, with the same synthetic ID. Repeating that ID produced no second conversion. These requests did not reach SMTP. GA4 collector responses were 204 and the OpenAI collector accepted the synthetic lead with 202. Google Ads page collection returned 200; conversion fallback requests to DoubleClick failed DNS resolution in the test environment. These are transport observations, not fresh platform-account confirmation or advertising attribution.

Further network-log inspection confirmed GA4 `generate_lead` collector 204 and Google Ads `/pagead/conversion/1003664894/` collector 200 with the synthetic transaction ID. These strengthen transport verification only; the DoubleClick fallback failures remain.

Publication verified: runtime release `88976af2a5de5148d0440e10d02d10c98fa521e3` reached Vercel Production successfully. On bagved.com, fresh consent was unset with no optional providers; reject/reload retained denial; statistics-only loaded GA4 without Pixel. An intercepted homepage API 200 generated the labelled `synthetic-cookie-a-live-20261019` event, with GA4 collector 204, Google Ads collectors 200 and OpenAI lead collector 202. No API request reached the production mail handler. Withdrawing marketing retained only GA4; rejecting all then removed measurement cookies and provider resources after reload. Cross-tab reload was also verified locally. See CHANGELOG.md for the release/deployment record and remaining limits.

Remaining verification: fresh GA4/Google Ads/OpenAI account-side receipt, actual SMTP inbox delivery and ad attribution are unverified. Existing React hydration error #418 was observed; checks used stable loaded UI. Access to existing Safari was rejected by automatic approval review because it could expose unrelated private tabs/sessions. No security settings were changed. Deployment status is recorded in CHANGELOG.md.

## Historical integration notes — 14–16 October 2026

The following entries describe the integration before the Cookie A release; their references to an invisible API and absent banner are historical.

Property 559014590, stream 16130175301, measurement ID G-7J3HGDGM6C. Override with NEXT_PUBLIC_GA4_MEASUREMENT_ID at build time if needed. The measurement ID is public, not a secret.

No banner, CSS, policy changes, or other visible UI is added. The component renders null. Google Analytics stays off until an external consent mechanism calls `window.bagvedAnalytics.setConsent(true)`. For independent category decisions call `setConsent({statistics: true, marketing: true})` (only after those actual permissions have been obtained). Boolean true grants statistics only. Call `setConsent(false)` to revoke, clear measurement cookies, and reload. This API records an actual visitor choice; it must not be used to assume consent. Choices expire after 180 days.

Tracked: route page_view, contact_phone_click, contact_email_click, contact_cta_click, service_interest, form_start (submission attempt), form_error and generate_lead only after a successful existing contact API response. No form contents are sent to Google. The existing SMTP delivery implementation is unchanged.

GA4 enhanced measurement is disabled on this stream to avoid duplicate automatic page views. generate_lead is already a key event. Production debug mode is disabled; advertising destinations are not configured.

Deployment: push to bagved/webapp main triggers the existing Vercel integration. Publication approved on 14 October 2026; verify consent behavior and event receipt on the live domain after deployment.

ChatGPT Ads: selected browser account Bagved ApS (created 14 October 2026 at approximately 22:50 Copenhagen time). Conversion terms were accepted explicitly on 14 October 2026; source created. Set NEXT_PUBLIC_OPENAI_PIXEL_ID to the returned public Pixel ID, The code uses the isolated Pixel bridge described below; automatic matching remains enabled at the provider. Neither value is an API secret. SDK loads only with marketing consent and the reviewed configuration. No explicit customer identifiers are supplied; events opt out of future personalization.

Conversion mapping: GA4 generate_lead -> OpenAI lead_created (customer_action), same event_id. Validation errors and failed requests must not count as leads. Contact email/phone clicks are separate custom events, not successful enquiry conversions.

Verification completed so far: automated dispatch, default denial, independent destinations, no form/query leakage, withdrawal and deduplication. Synthetic end-to-end SDK delivery to GA4 DebugView and OpenAI event stream was verified after explicit test consent. Actual SMTP contact submission and ad attribution were not tested. Synthetic tests must be labelled as tests and never represented as attributable ad results.

Approved and created: Pixel HvBSQVgUXmJ4xvRvXYuTyZ, conversion goal Bagved — kontaktformular, base event lead_created, click attribution 30 days / view attribution 1 day (UI defaults). Actual public Pixel configuration reports automatic_advanced_matching_enabled=true; the UI offers no disabling control. SDK runs in /analytics/openai-pixel.html, a separate form-free document, rather than the parent containing input. Only whitelisted events and event IDs are forwarded by a same-origin/source-validated message bridge, with opt_out=true. The currently inspected SDK scans its own document and does not traverse the parent. Source matching is enabled at the provider; isolation is our implementation measure, not a provider-side disable.

Live publication verified: Vercel successful on cf8423e, live Pixel document matches the tested source. Production loads no provider tags until the consent API records actual permission. No banner or consent interface has been deployed.

## Production Google Ads update — 16 October 2026
Google Ads now uses the existing Bagved — modtaget formular website action (AW-1003664894/xv1vCIHagJ0dEP7ryt4D), verified from its event snippet. The action is primary, counted once, without monetary value. It is not a shared account-default goal; a future Bagved campaign must explicitly select it. Do not import GA4 generate_lead as an additional primary goal for the same submission.

GA4 and OpenAI Pixel retain their existing success-only integration and identifiers. Script loading is gated by visitor choices: statistics for GA4, marketing for Google Ads and ChatGPT Ads. No consent collection UI exists in production. Ordinary new visitors therefore send no optional measurement until a consent system calls window.bagvedAnalytics.setConsent({statistics:true,marketing:true}) with their actual choices. Owner approval does not provide visitor consent.

Form API and mail transport remain identical to the original baseline. Automated tests and provider telemetry tests do not establish final SMTP inbox delivery. Billing and the conversion goal's association with a future ChatGPT Ads campaign remain separate launch tasks.
