# Pushkar Raj — Portfolio

A personal portfolio with animated orbital artwork, oversized typography, and project case studies. Dark mode combines jet black, cerulean blue, and neon rose; light mode uses ice silver, deep aubergine, and marigold. Dark mode is the default, with the visitor’s selected theme remembered locally.

Built with Next.js 16, React, TypeScript, and CSS. Most of the interface renders on the server; navigation, theme and animation controls, the soundtrack player, and the email-copy button are the small interactive parts. Syne headings and Manrope body text are self-hosted with their licenses in `public/fonts/`. CSS drives the portrait, orbital animation, and progressive scroll reveals. The pause control stops animations, and reduced-motion preferences disable them.

The homepage portrait is a generated 3D-style illustration based on the existing profile photo, with CSS floating and perspective motion. Its source prompt and asset details are in [docs/portrait-artwork.md](docs/portrait-artwork.md).

The entry soundtrack control loads Spotify’s official “MY EYES” preview only after the visitor opens it. Native player controls handle playback; closing the panel removes the iframe. Full playback is linked through Spotify and may require an account. The recording is not bundled in the repository.

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
