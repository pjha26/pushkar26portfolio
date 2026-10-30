# Pushkar Raj — Portfolio

A personal portfolio with animated orbital artwork, oversized typography, and project case studies. Dark mode combines jet black, cerulean blue, and neon rose; light mode uses ice silver, deep aubergine, and marigold. Dark mode is the default, with the visitor’s selected theme remembered locally.

Built with Next.js 16, React, TypeScript, and CSS. Most content renders on the server. A small Framer Motion DOM controller enhances the homepage, alongside navigation, theme and animation controls, the soundtrack player, and the email-copy button. Syne headings and Manrope body text are self-hosted with their licenses in `public/fonts/`. CSS retains the portrait and orbital idle motion; Framer Motion handles the cinematic entrances, scroll progression, and project reveals.

## Cinematic scrolling

`components/cinematic-scroll.tsx` coordinates three phases without replacing the existing sections:

- Introduction: staggered hero words, soft entrances, static grain, and bounded desktop parallax.
- Discovery: grouped heading and content reveals, a reading-progress line, and calmer transitions through About, Toolkit, and Contact.
- Work transition: a brief accent-light sweep, an extending seam, masked project previews, and staggered project titles. The lighting fades as the showcase settles.

The existing `framer-motion/dom` entry point supplies animation controls, shared scroll scheduling, and IntersectionObserver-based reveals. There are no new dependencies, per-scroll React state updates, scroll interception, or pinned sections. Parallax is disabled at 850px and below; mobile reveal distances and mask depth are smaller. Hero idle animations pause offscreen. Observers, media-query listeners, scroll subscriptions, and animation controls are cleaned up on route changes.

The global pause control cancels motion and restores original inline styles. Reduced-motion preferences use the same static fallback, including changes made while the page is open. Keyboard focus completes active reveals. All content is visible in the server HTML and remains usable without the motion controller.

Verification includes browser checks for pause/reset, keyboard navigation, mobile overflow, desktop/tablet layouts, case-study navigation and return, and visitor-initiated sound with scene pause/resume. `npm run test:audio` (Node 22.6+) checks audio scheduling against a suspended clock and disposal of all audio nodes. Full Safari/Firefox and assistive-technology audits remain separate checks.

The homepage portrait is a generated 3D-style illustration based on the existing profile photo, with CSS floating and perspective motion. Its source prompt and asset details are in [docs/portrait-artwork.md](docs/portrait-artwork.md).

The compact homepage sound control starts an original ambient progression generated with the Web Audio API after an explicit visitor click. Soft pads, overlapping chords, and a filtered echo accompany the scene without loading recordings or external players. The waveform reflects actual playback. Pausing animations or hiding the tab suspends the audio clock; resuming continues it. Disabling sound or leaving the homepage releases the audio graph and scheduler. No playback preference is persisted, so a new visit starts silent.

Design references: [Dribbble portfolio animation](https://dribbble.com/search/portfolio-animation), [animated portfolios on GitHub](https://github.com/topics/animated-portfolio), and [Awwwards animation](https://www.awwwards.com/websites/animation/). The layout, orbital SVG, and styles are implemented locally; no reference-site code or artwork is bundled.

## Development

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Production and checks

```sh
pnpm build
pnpm start
pnpm test:smoke
pnpm test:contrast
```

The build uses Next.js’s supported Webpack option because the local Windows Turbopack CSS worker fails in this environment. The development server still uses Turbopack.

Run the smoke checks against another running origin with:

```sh
node scripts/smoke-check.mjs http://127.0.0.1:3000
```

The smoke checks cover the homepage, all four case studies, canonical URLs, screenshot assets, image optimization, résumé, social preview, sitemap, and a missing-project 404. The contrast check validates WCAG AA text contrast for both palettes.

The existing lint command needs ESLint installed and configured; it is not a working check in this repository yet.

## Updating the content

- Projects, repository links, demo links, architecture flows, and case-study text: `lib/dossier-data.ts`.
- Introduction and portrait: `components/hero.tsx` and `components/about.tsx`.
- Toolkit: `components/skills.tsx`.
- Colors, typography, and responsive layouts: `app/globals.css`.
- Résumé: `public/resume.pdf`.
- Social preview: `app/opengraph-image.tsx`.

Contact uses a direct email link and a copy-address button. It does not pretend to submit a form, and needs no email-service credentials.

The homepage no longer mounts the previous boot sequences, AI terminal, sound engine, redaction controls, GitHub statistics, or 3D scenes. Their existing source and API routes remain available in the checkout; optional API credentials are not needed to render the redesigned portfolio.

[GitHub](https://github.com/pjha26) · [Portfolio domain](https://pushkar26portfolio.vercel.app/)
