# Portfolio improvement plan

Prepared 3 November 2026. This is a proposed backlog, not work implemented in this update. Effort estimates are focused development days and depend on access to real project evidence and test devices.

## Direction

Keep the existing dark/light palettes, Bricolage headings, brush interaction, separate pages, original soundtrack, and cinematic closing scene. Make the portfolio easier to understand and more convincing to a recruiter or collaborator. Add motion where it explains an interaction; keep the main actions discoverable.

## Recommended order

| Priority | Work | Result and acceptance criteria | Estimated effort |
| --- | --- | --- | --- |
| 1 | Test the first impression | Ask five people unfamiliar with the site to identify who Pushkar is, what he builds, and how to open a project within ten seconds. Observe Brush/Unbrush discovery. Keep both modes; adjust the instruction or default only after reviewing results and agreeing on the change. Verify full text remains available on touch, keyboard, reduced motion, and without JavaScript. | 1 day |
| 2 | Deepen two flagship case studies | Start with ArthAI and MockMind. Add the actual role, constraints, one original architecture diagram, an annotated product screen, and a concrete engineering tradeoff. Add a measured result only when a reproducible measurement or real user evidence exists. Each page should explain the problem, contribution, and result in under a minute. | 2–3 days, plus evidence collection |
| 3 | Add reliable UI regression checks | Add a small browser test suite for Brush/Unbrush, keyboard focus, workbench close/Escape, route navigation/history, and reduced-motion behavior. Run production build and existing smoke/contrast checks in GitHub Actions; there is currently no `.github` workflow in this checkout. Keep screenshots for representative desktop and mobile widths in both themes. | 1–2 days |
| 4 | Measure and improve loading and responsiveness | Record a repeatable mobile Lighthouse baseline and inspect the production bundle before optimizing. Check portrait sizing, the Bricolage TTF, audio's interaction-only loading, and whether legacy AI/3D dependencies enter active bundles. Convert the font to WOFF2 if the measured savings justify it. Target LCP ≤2.5 s, INP ≤200 ms, and CLS ≤0.1 at the 75th percentile of real visits when sufficient field data exists; lab scores alone do not establish those results. | 1–2 days |
| 5 | Review navigation and accessibility on real devices | Test iPhone Safari, Android Chrome, Firefox, keyboard-only navigation, 200% zoom, and a screen reader. Check swipe boundaries, accidental page changes, audio opt-in, modal focus, caption motion, and Brush/Unbrush discoverability. Aim for 44 px touch controls as a design target; review WCAG 2.2's 24 px minimum target-size criterion and its spacing exceptions separately. | 1–2 days with devices |
| 6 | Add one useful project demonstration | Extend the existing ArthAI workbench with a clearly labeled, user-triggered short product walkthrough using real footage. Supply captions, a poster, and a direct case-study link; defer video loading until requested. Show one coherent task rather than another decorative animation. | 1–2 days, plus recording |
| 7 | Remove maintenance ambiguity | Inventory unmounted source and endpoints before deleting anything. The optional GitHub stats endpoint currently logs a 401 during builds; decide whether it is needed, then fix server-side configuration or remove it in a separate reviewed change. Never display fallback counts as verified achievements. Document active routes, necessary environment variables, and deployment ownership. | 1 day |

## A small follow-up after the essentials

Add a short "Currently building" note with a real update date and one useful link. Maintain it manually before considering a CMS. Keep the existing contact email and résumé prominent. Validate the résumé file and project links on each release.

## Release gates

- Build, smoke, contrast, and the targeted interaction checks pass.
- Both palettes remain unchanged unless explicitly approved.
- New animation has a static/reduced-motion fallback and works with the site's pause control.
- Contact, résumé, and project links remain accessible without hover.
- Record measured before/after results for performance changes; do not invent project metrics or testimonials.

## Suggested first milestone

Complete priorities 1–3 first: a tested first impression, two stronger project stories, and regression protection. Review those results before choosing another visual feature. This is roughly 4–6 focused days, excluding waiting for feedback and evidence.

## Reference guidance

- [Google: Web Vitals](https://web.dev/articles/vitals)
- [Google: PageSpeed Insights and performance thresholds](https://developers.google.com/speed/docs/insights/v5/about)
- [W3C: WCAG 2.2 target size minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)

These sources support the measurement and accessibility criteria; the feature priorities above are recommendations based on this repository and its current design.
