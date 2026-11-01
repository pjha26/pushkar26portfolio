# Pushkar Raj — Portfolio

A minimal developer portfolio with five separate pages: Home, Work, About, Toolkit, and Contact. The reference-inspired editorial layout retains the original themes: jet black, cerulean blue, and neon rose in dark mode; ice silver, deep aubergine, and marigold in light mode. The portrait card and subtle light-leak effect follow the active theme across the five pages. Syne and Manrope are self-hosted with their licenses in `public/fonts/`.

## Pages and movement

| Page | Route |
| --- | --- |
| Home | `/` |
| Selected work | `/work` |
| About | `/about` |
| Toolkit | `/toolkit` |
| Contact | `/contact` |

Home ends after the intro shown in the design reference. It does not contain the other sections or an offscreen spacer. Work is a compact directory; the four detailed case studies keep their direct `/projects/[id]` URLs.

At the end of a page, a deliberate wheel movement or upward touch swipe opens the next route. Swiping down at the start returns to the previous route. PageDown/PageUp and visible Previous/Next links provide keyboard and click alternatives. Longer pages scroll normally until their boundary. Controls, horizontal gestures, and pinch zoom are excluded from gesture navigation. A cooldown prevents momentum from skipping several pages.

The installed Next.js 16 App Router supports React ViewTransition. A new solid page slides over the outgoing page while the header remains fixed. Reduced motion and the animation pause control disable the transition animation. Browsers without View Transitions still navigate normally. Browser history and direct links remain available. Old section bookmarks redirect to the corresponding page.

## Soundtrack

**Quiet Circuit** is an original 32-second instrumental synthesized specifically for this portfolio, with no recordings or third-party samples. The previous low-frequency Web Audio pads have been replaced by a local PCM WAV with audible midrange notes and an immediate, short attack.

Audio loads only after a visitor clicks Enable sound or the header sound icon. One native audio element in the root layout persists between routes. The hero offers a volume slider, initially 65%. The header icon can pause playback on every page. Sound is independent of animation pause, pauses while the tab is hidden, and resumes only if the visitor had enabled it. A new visit starts silent. No Spotify embed or commercial song is included.

The asset is `public/audio/quiet-circuit.wav`. Regenerate it with `node scripts/generate-soundtrack.mjs`. The file is about 1.35 MB and is not loaded before interaction. `npm run test:audio` checks its PCM format, duration, audible first second, average level, and clipping headroom.

## Development

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

Smoke checks cover the five distinct pages, case studies, contact/profile links, local audio delivery, optimized images, assets, social preview, sitemap, and 404 behavior. Browser QA checks actual media playhead progression, sound across route changes, swipe navigation, keyboard controls, and responsive layouts. Hardware speaker output, Safari/Firefox, and a full assistive-technology audit require separate checks.

The homepage portrait is a generated 3D-style illustration based on the profile photograph; see [portrait artwork](docs/portrait-artwork.md). Existing optional AI/API/3D source remains in the checkout but is not mounted in the portfolio.

Design references: [Dribbble portfolio animation](https://dribbble.com/search/portfolio-animation) and [Next.js view-transition patterns](https://nextjs.org/docs/app/guides/view-transitions). The layout and interactions are implemented locally; reference-site assets and code are not copied.
