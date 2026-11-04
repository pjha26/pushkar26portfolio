# Pushkar Raj — Portfolio

A continuous-scroll developer portfolio, reconstructed from the supplied creative portfolio reel: centered portrait, cinematic About, curved project previews, a circular work overview, a detailed project index, compact toolkit, contact, and the existing full-window closing artwork.

Headings use normal-width, self-hosted Bricolage Grotesque; body text uses Manrope. Display sizes are capped at 48–64 px on desktop. The previous stretched Syne poster typography is no longer loaded. The neutral light canvas and charcoal sections use restrained blue and rose accents; dark mode remains available. Font licenses are in `public/fonts/`.

## Navigation and motion

The homepage includes all sections. Header links use native anchors: `/#about`, `/#work`, `/#skills`, and `/#contact`. Legacy `/#projects` and `/#hero-section` anchors also remain valid. There are no global wheel, touch, or PageDown/PageUp handlers and no automatic route changes at scroll boundaries. Normal browser scrolling, trackpad momentum, pinch zoom, and keyboard scrolling stay in control.

Existing direct routes remain available:

| Content | Route |
| --- | --- |
| Full portfolio | `/` |
| Selected work | `/work` |
| About | `/about` |
| Toolkit | `/toolkit` |
| Contact | `/contact` |
| Detailed case studies | `/projects/[id]` |

Section reveals, artwork parallax, project tilts, and the circular overview follow native scroll position. A passive, frame-scheduled listener updates CSS variables without changing scroll position. Reduced motion and the header pause control show static content.

## Project gallery

The desktop gallery bends the real application screenshots over segmented 3D surfaces. The renderer is dynamically imported only near the viewport on eligible desktop displays and renders on demand rather than running a permanent loop. Arrow controls, project selectors, and left/right keys select projects. DOM links and optimized images remain underneath the enhancement; small screens, reduced motion, and unavailable WebGL use the image gallery. A no-JavaScript list and the detailed project index keep every case study reachable.

The circular overview and detailed index use the same four real projects. Their motion is bounded by scroll progress. No new dependency was added.

## Biography brush

Brush/Unbrush is retained as an optional discovery effect within the About biography. Unbrush is the default. Touch devices, small screens, animation pause, reduced motion, and visits without JavaScript receive visible details. Actions and navigation stay accessible.

## Artwork and sound

`public/art/about-ink.png` is original generated monochrome artwork for the cinematic About section. The portrait uses the existing illustration based on Pushkar's profile photo. The existing frontier silhouette and its caption animation remain the final full-width scene on the homepage and Contact route.

Quiet Circuit is the original 32-second instrumental in `public/audio/quiet-circuit.wav`. Sound is opt-in, the header control persists across sections and routes, and the hero retains volume controls. No commercial recordings or embeds are included. `node scripts/generate-soundtrack.mjs` regenerates the source audio; `npm run test:audio` validates it.

Explore ArthAI opens the existing native workbench dialog with its labeled prepared sample workflow. No live research is run by the demo.

Earlier poster and neon design documents describe superseded iterations; this README describes the current implementation.

## Development

Future work is prioritized in [the improvement plan](docs/improvement-plan.md).

```sh
pnpm install
pnpm dev --webpack
pnpm build
pnpm start
```

The production script uses webpack because the Windows environment previously had unstable Turbopack CSS workers.

```sh
npm run test:audio
npm run test:contrast
node scripts/smoke-check.mjs http://127.0.0.1:3000
```

Smoke checks cover the five distinct pages, case studies, contact/profile links, local audio delivery, optimized images, assets, social preview, sitemap, and 404 behavior. Browser QA checks actual media playhead progression, sound across route changes, native section scrolling, keyboard controls, and responsive layouts. Hardware speaker output, Safari/Firefox, and a full assistive-technology audit require separate checks.

The homepage portrait is a generated 3D-style illustration based on the profile photograph; see [portrait artwork](docs/portrait-artwork.md). Older optional AI/API components remain unmounted. The work gallery lazily uses the installed Three.js renderer for curved screenshot surfaces.

Design references: [Dribbble portfolio animation](https://dribbble.com/search/portfolio-animation) and [Next.js view-transition patterns](https://nextjs.org/docs/app/guides/view-transitions). The layout and interactions are implemented locally; reference-site assets and code are not copied.
