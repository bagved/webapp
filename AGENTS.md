# Bagved production repository instructions

This is the technical production version of bagved.com. The improved local client version is a separate working copy. Keep design, copy, typography, animation, StageTimer and consent-banner concepts in that local version until the client reviews and approves a specific public release. Do not copy its source or log here automatically.

For every change in this repository, update CHANGELOG.md in the same commit before finishing. Record date, before/after behavior, affected files, checks actually performed, deployment status and material limitations. Preserve historical entries and append corrections rather than rewriting then-pending statements as if known at the time. The baseline for this work is 18af5a7127f2c346ddf9830b0bc80556826c1136.

Keep SMTP/form behavior unchanged unless specifically asked. Count lead conversions only after an actual successful API response. Distinguish consent-gated code configuration, synthetic provider receipt, actual form delivery and advertising attribution; no one check proves the others. Never enable tracking without the required visitor choice or claim full marketing readiness merely because tags exist.

Use meaningful tests for changes. Document unperformed checks honestly. Do not send test customer emails, activate campaigns or add spend unless explicitly instructed. Never put credentials or customer submissions in the log.

## User design requirements — apply to every future UI change

- Follow styles/theme.css and the existing page styles. Use --font-body (Rubik) for body copy, buttons, navigation and ordinary headings; --font-heading (Genos) is for accents and places already explicitly using it. Keep theme color/type variables instead of introducing replacement fonts or hardcoded palettes.
- Preserve each page's established heading placement, scale, weight, line height and responsive sizing when changing its wording. Reference the existing page and Git history before redesigning typography. Main interior-page titles use the established 96px top spacing, Rubik 800, clamp(44px, 6.5vw, 88px) and 0.96 line height; preserve intentional page-specific exceptions such as the fitted homepage hero.
- Do not add small eyebrow/kicker text above headings, decorative arrows on cards or text links/CTAs, or decorative 01/02/03 labels and padded counters. Necessary form labels, captions, accessibility labels and functional controls remain appropriate.
- The examples index shows the small production-format cards with format filters. Selecting a card expands its information below that card's row on the same page. Do not restore a large featured client-project gallery above it unless requested.

- Background changes follow intentional section boundaries via data-background-tint markers, blending as a section enters the reading area and then holding that tone. Do not cycle colors by a generic percentage of page length. The examples index and its detail pages keep a fixed background. Keep the shared implementation in the root layout, use theme variables, respect reduced motion, and do not add competing wrappers. Legal pages are an explicit typography exception: match the compact bordered Cookie Policy panel using theme fonts, not the large interior-page title.

- The homepage Cover Flow carousel uses an opaque front cover and dot navigation that indicates the front/hovered item; do not replace the dots with Forrige/Næste buttons or padded counters. Its examples CTA matches the existing homepage Se eksempler button.
- The services needs selector reads as a continuous sentence with clearly interactive dropdowns. Start with unselected context/goal/channels and show a personalized recommendation only after a valid deliberate selection. Keep the fixed use-case cards visible before selection.

- Services and Contact use the shared transparent, underlined ThemedSelect control. Services includes activity, recurrence and participation format in its recommendation and contact brief; keep legacy idea links readable. The Mission invitation contains a purely decorative escaping Nej label, never a real refusal/consent control; Ja is the only navigation action. Respect reduced motion and never apply this joke to cookies, forms or actual consent choices.

- Keep the services questionnaire typography at the theme body scale and fit each inline select to its selected text. Fixed use-case cards have no Tilpas til os/Udforsk formatet actions. The Mission joke should evade proximity to the pointer along varied bounded paths, never oscillate between fixed corners or cover Ja. The normal header is fully transparent, including the background beneath its initial top offset: no separate tint, glow, blur or header-only backdrop.
