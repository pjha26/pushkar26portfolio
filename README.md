# Pushkar Raj — Portfolio

A personal portfolio with a paper-and-olive palette, an optional dark theme, and project case studies.

Built with Next.js 16, React, TypeScript, and CSS. Most of the interface renders on the server; the navigation, theme switch, and email-copy button are the small interactive parts. Inter is self-hosted with its license in `public/fonts/`.

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
```

The build uses Next.js’s supported Webpack option because the local Windows Turbopack CSS worker fails in this environment. The development server still uses Turbopack.

Run the smoke checks against another running origin with:

```sh
node scripts/smoke-check.mjs http://127.0.0.1:3000
```

The checks cover the homepage, all four case studies, canonical URLs, screenshots, image optimization, résumé, social preview, sitemap, and a missing-project 404.

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
