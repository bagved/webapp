# GA4 and ChatGPT Ads technical integration

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
