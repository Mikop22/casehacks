# Scotiabank Public-Site Design Language

Source baseline: Scotiabank Canada public site, especially `https://www.scotiabank.com/ca/en/personal.html`, inspected 2026-05-23.

## Visual Thesis

Scotia’s public digital language is direct, high-contrast, practical banking UI: white canvas, Scotia red for brand and decisive action, charcoal typography, restrained gray structure, rounded/pill CTAs, and campaign photography used as concrete product support rather than decoration.

## Brand Signals To Preserve

- Use the red Scotiabank wordmark prominently in headers and title slides.
- Lead with Scotia red `#ec111a` for primary actions, section markers, active nav underlines, and sparse emphasis.
- Keep most surfaces white or near-white `#fafbfd`; let red work by contrast.
- Use charcoal text `#333333` rather than pure black for body and UI labels.
- Use generous but simple spacing based on 15px increments: `7.5`, `15`, `30`, `45`, `90`.
- Prefer squared or lightly rounded structure. The site uses `5px` rectangular buttons and pill CTAs; cards are mostly square-edged.
- Use modular banking patterns: product grids, comparison tables, tabs, accordions, recommendation rows, and concise CTA bands.
- Use clear product/category navigation language: Banking, Credit cards, Investing, Mortgages, Advice, Rates.
- Keep imagery real and finance-adjacent: people, homes, advisors, cards, mobile banking, life moments.

## Palette

Core:

- Scotia red: `#ec111a`
- Alternate red from meta theme color: `#ed0722`
- Ink: `#333333`
- Black CTA: `#1f1f1f`
- White: `#ffffff`
- Canvas: `#fafbfd`
- Border: `#e2e8ee`
- Footer/cool gray surface: `#f5f6fc`

Support:

- Dark reds: `#ad0000`, `#bb061b`
- Link blue: `#157db9`
- Alternate link blue: `#31709e`
- Navy: `#233e5b`
- Focus blue: `#009dd6`
- Skip/focus purple used in public accessibility affordances: `#8230df`
- Gray scale: `#2b2b2b`, `#4a4a4a`, `#555555`, `#747474`, `#a8a8a8`, `#d6d6d6`, `#eeeeee`

Use red and charcoal first. Use blue only for link-like affordances, not as a second brand color.

## Typography

The public CSS declares Scotia-specific fonts:

- Headlines: `Scotiabank-Headline`
- Body: `Scotiabank-Regular`
- Strong labels/actions: `Scotiabank-Bold`
- Fallbacks: Frutiger and sans-serif

For hackathon work where licensed fonts may not be available, use:

- Headings: Arial or Aptos Display, bold, tight but not condensed.
- Body/UI: Arial, Aptos, or Inter.
- Avoid playful, geometric, or tech-startup display faces.

Observed public-site sizes:

- H1 desktop: `46px`
- H1 mobile: `40px`
- H2 desktop: `36px`
- H3: `30px`
- Body/card text: `16px`
- Legal/footer: `12-14px`

## UI Components

Header:

- White, utility-first header.
- Logo left, search/nav/actions right.
- Red active state or underline.
- Avoid glass, gradients, or oversized app chrome.

Buttons:

- Primary: red fill, white bold text, 1px red border.
- Hover/focus pattern: transparent fill with red text.
- Shape: pill for marketing CTAs, `5px` rectangle for product/workflow actions.
- Padding: about `18px 30px`.

Cards:

- Use sparingly for repeated products or advice tiles.
- Media on top, content below, modest radius, thin borders, light shadow at most.
- Public cards commonly use 686x386 or 1200x600 imagery.

Links:

- Standalone links often read as bold text with chevron and dotted underline.
- Keep link copy action-oriented: "Compare cards", "Book an appointment", "Learn about FHSAs".

Forms:

- White input fields, gray iconography, clear labels.
- Use blue focus ring `#009dd6`.
- Banking flows should feel utilitarian and trustworthy, not promotional.

## Software Output Guidance

Build the product UI as a real banking workspace, not a marketing page:

- Top nav with Scotia logo, product name, and concise account/user actions.
- Left or top-level nav grouped by outcome: Overview, Insights, Recommendations, Plan, Documents.
- Use red for the one next action and active state, not every chart.
- Use tabs, accordions, product comparison tables, recommendation modules, and KPI strips; these map better to Scotia than generic SaaS card mosaics.
- Use gray bands/dividers to create hierarchy.
- Keep dashboards dense but readable. Tables, KPIs, filters, and status chips should carry the experience.
- Use public Scotia icons only as small functional cues. Prefer simple line icons when a Scotia asset is not needed.
- Charts should use charcoal and gray with red as a highlight series or threshold.

## Slide Deck Guidance

Deck mood: clean internal strategy memo, not startup pitch theatre.

- Title slide: white background, Scotiabank logo top left, one large black/charcoal title, thin red rule or bottom bar.
- Alternate title slide: full Scotia-red background, white title, small team/date metadata, and wordmark treatment.
- Section divider: full red background or white slide with oversized red section number.
- Content slides: one headline, one chart/table/diagram, one takeaway line.
- Corporate-style content slide: red title band across the top, white body, small footer note/page number.
- Case slides: use Scotia red for the recommendation or target state, gray for current state, charcoal for labels.
- Image slides: use one public-site-style photo full bleed or large right-side crop. Do not collage.
- Footer: small page number, team name, optional "Case competition concept".

Recommended 10-slide outline:

1. Title and team
2. Executive recommendation
3. Customer or business problem
4. Evidence and market context
5. Proposed solution
6. Product workflow or architecture
7. Business impact model
8. Risk, compliance, and trust controls
9. Implementation roadmap
10. Ask / decision / next steps

## Do

- Make the Scotiabank logo visible early.
- Use a white/light-gray base.
- Let red be decisive and sparse.
- Use real banking terms and pragmatic labels.
- Keep components stable, rectangular, and easy to scan.
- Use public assets as references or light decoration with attribution discipline.
- Label all demo data as synthetic.

## Don't

- Do not make the UI mostly red.
- Do not use purple/blue gradients or glassmorphism.
- Do not round every surface heavily.
- Do not use generic startup cards as the entire page.
- Do not imply official endorsement if this is competition work.
- Do not redistribute public assets beyond the hackathon/deck context without checking usage rights.
- Do not copy internal dashboards, employee portals, internal deck screenshots, or proprietary font files.
