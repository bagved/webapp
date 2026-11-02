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
