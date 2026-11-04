# Reference-led poster homepage

The user's supplied blue/rose portrait reference now controls the homepage composition, not only its colors. The page is a flat editorial poster with a large two-line personal name, a dominant free-standing portrait, restrained supporting copy, and unboxed actions.

## Changes

- Removed the profile card, framed image treatment, technology chips, stat blocks, filled hero buttons, and repeated profile text.
- Used the existing self-hosted Syne asset for the wide geometric name. Other pages retain their existing typography. Font preloading is disabled for this additional face so it need not preload on unrelated routes.
- Kept the approved dark blue/rose/black and light silver/aubergine/marigold palettes. The light name uses dark ink rather than low-contrast marigold text.
- Preserved email, résumé, GitHub, LinkedIn, LeetCode, sound, volume, route navigation, and the separate Contact closing scene.
- Made Unbrush the initial state so the reference-style headline is visible immediately. Brush remains an explicit optional mode. Touch and reduced-motion fallbacks still show the text.
- Used a consistent compact header height across routes. The homepage brand mark and résumé link are flat, with no surrounding box.
- Phone layouts stack the portrait below the introduction. The primary action remains in the first screen; smaller screens do not crop the headline or hide the contact links.

## Reference comparison ledger

| Reference point | Implementation and verification |
| --- | --- |
| Very large blue/rose two-line title at left | Pushkar / Raj in wide uppercase Syne, resized to avoid the face |
| Portrait dominates the right half | Existing identity-preserving neon portrait enlarged without a frame; lower edge fades into the canvas |
| Flat black canvas and sparse labels | No hero gradient, cards, chips, stat tiles, or solid CTA blocks |
| Compact horizontal navigation | Persistent header, one separator, existing links and accessible motion/sound controls |
| Small supporting statement and text action | Existing website promise retained; Explore my work leads to the real Work route |
| Minimal bottom details | Contact, résumé, social profiles, and page cue use compact text links |
| Responsive behavior | 390 px and 320 px reflow checked; no horizontal overflow and primary action visible before scrolling |

An image-generated desktop composition was used as a working concept, then compared with the browser render. The generated concept and QA screenshots are kept outside the repository. Intentional differences from the original screenshot are the user's own name, portrait, professional copy, portfolio navigation, optional Brush mode, and accessible sound controls. No social-media overlays or cyborg character from the reference were copied.

## Supplied design skill

Reviewed [elayadesign/ai-design-skills: landing-page-design](https://github.com/elayadesign/ai-design-skills/tree/main/skills/landing-page-design). Applied its focus on a clear primary action, meaningful line breaks, flat backgrounds, restrained structure, real content, focus visibility, reduced motion, and 390 px checks. The user's explicit reference, approved colors, and existing self-hosted typography take precedence over its suggested default gray heading gradient and font list. No CLI or global skill installation was required.

Framer was initially unavailable. On 4 November its tools became available and the connection was verified through the project list and project context. The accessible Framer project, Elated Imagine, is separate from the GitHub/Vercel portfolio; it was inspected without edits. This redesign is implemented and deployed from the existing Next.js repository.

## Validation scope

The production build, contrast checks, and smoke checks passed. Browser checks verified Work navigation and browser history, keyboard Brush/Unbrush, motion pause, and soundtrack opt-in, playback progression, and pause. Dark/light portrait switching and 390 px / 320 px reflow were checked during implementation. Physical-device, Safari, and full assistive-technology testing remain separate work.
