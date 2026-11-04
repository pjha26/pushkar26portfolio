# Pushkar Raj — Portfolio

A minimal developer portfolio with five separate pages: Home, Work, About, Toolkit, and Contact. The poster homepage uses jet black, cerulean blue, and neon rose in dark mode; ice silver, deep aubergine, and marigold in light mode. Its free-standing portrait follows the active theme. The oversized homepage name uses the existing self-hosted Syne asset; other headings use Bricolage Grotesque and body text uses Manrope, with licenses in `public/fonts/`. The Bricolage variable font is subset to the Latin characters used by the portfolio.

## Pages and movement

The homepage now uses the reference's borderless poster composition: oversized blue/rose name, dominant portrait, text actions, and a compact footer. See [the poster homepage design](docs/poster-homepage.md). Unbrush is the default; visitors can opt into Brush discovery.

The reference-led dark palette and theme-specific portrait are documented in [the neon design direction](docs/neon-design-direction.md), including how the supplied UI/UX Pro Max repository was used. The original light theme remains intact.

| Page | Route |
| --- | --- |
| Home | `/` |
| Selected work | `/work` |
| About | `/about` |
| Toolkit | `/toolkit` |
| Contact | `/contact` |

Home ends after the intro shown in the design reference. It does not contain the other sections or an offscreen spacer. Work is a compact directory; the four detailed case studies keep their direct `/projects/[id]` URLs. Project screenshots share a named ViewTransition with their case-study covers, with a normal navigation fallback when unsupported. The numbered page rail provides direct navigation between the five pages.

At the end of a page, a deliberate wheel movement or upward touch swipe opens the next route. Swiping down at the start returns to the previous route. PageDown/PageUp and visible Previous/Next links provide keyboard and click alternatives. Longer pages scroll normally until their boundary. Controls, horizontal gestures, and pinch zoom are excluded from gesture navigation. A cooldown prevents momentum from skipping several pages.

The installed Next.js 16 App Router supports React ViewTransition. A new solid page slides over the outgoing page while the header remains fixed. Reduced motion and the animation pause control disable the transition animation. Browsers without View Transitions still navigate normally. Browser history and direct links remain available. Old section bookmarks redirect to the corresponding page.

## Homepage brush spotlight

The idle invitation has a staggered phrase entrance and a gentle brush-icon sweep. Its animations are scoped to the hint and obey reduced motion and the existing pause control.

On wide screens with a fine mouse pointer, **Brush** reveals the name, role, and short website promise beneath a moving soft brush. Revealed areas disappear when the pointer moves away. **Unbrush** is the default and shows all of that text with keyboard access. Actions, the free-standing portrait, and audio controls stay visible in both modes. Narrow screens, touch/coarse-pointer devices, reduced motion, motion pause, and visits without JavaScript receive visible details without needing hover. The effect uses a local CSS mask and pointer coordinates, with no extra dependency or animation loop.

## ArthAI workbench

Use **Explore ArthAI** on the Work page to open a native modal dialog. Four clickable stages trace a request through the interface, queue, research, and report. The sample workflow uses a fictional company and explicitly labeled prepared data; it makes no live AI calls. **Under the hood** explains the engineering decision at each stage. Escape and the close button dismiss it and restore focus to its launcher. Page-swipe navigation is suspended while the dialog is open.

## Closing artwork

The closing scene is edge to edge and fills the viewport below the persistent header. On Contact it follows the page navigation, so the artwork is the final screen rather than a framed card. Its caption sits within the scene, and narrow displays use a centered crop of the silhouettes.

The closing tagline reveals in a staggered sequence on the scene's own CSS view timeline. Its small accent line shares the sun's eight-second rhythm. These styles are scoped to the caption; reduced motion and animation pause show all words immediately, and browsers without scroll-timeline support retain readable static text.

The final Contact page ends with an original generated frontier silhouette, inspired by the supplied western poster reference. A transparent WebP mask lets the landscape use the existing palette tokens in both themes instead of introducing a red/orange background. The sun moves gently; the scene has a progressive scroll reveal where CSS view timelines are supported. Reduced motion and the site's motion-pause control stop these effects. No video, canvas loop, or additional animation dependency is needed.

## Soundtrack

**Quiet Circuit** is an original 32-second instrumental synthesized specifically for this portfolio, with no recordings or third-party samples. The previous low-frequency Web Audio pads have been replaced by a local PCM WAV with audible midrange notes and an immediate, short attack.

Audio loads only after a visitor clicks Enable sound or the header sound icon. One native audio element in the root layout persists between routes. The hero offers a volume slider, initially 65%. The header icon can pause playback on every page. Sound is independent of animation pause, pauses while the tab is hidden, and resumes only if the visitor had enabled it. A new visit starts silent. No Spotify embed or commercial song is included.

The asset is `public/audio/quiet-circuit.wav`. Regenerate it with `node scripts/generate-soundtrack.mjs`. The file is about 1.35 MB and is not loaded before interaction. `npm run test:audio` checks its PCM format, duration, audible first second, average level, and clipping headroom.

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

Smoke checks cover the five distinct pages, case studies, contact/profile links, local audio delivery, optimized images, assets, social preview, sitemap, and 404 behavior. Browser QA checks actual media playhead progression, sound across route changes, swipe navigation, keyboard controls, and responsive layouts. Hardware speaker output, Safari/Firefox, and a full assistive-technology audit require separate checks.

The homepage portrait is a generated 3D-style illustration based on the profile photograph; see [portrait artwork](docs/portrait-artwork.md). Existing optional AI/API/3D source remains in the checkout but is not mounted in the portfolio.

Design references: [Dribbble portfolio animation](https://dribbble.com/search/portfolio-animation) and [Next.js view-transition patterns](https://nextjs.org/docs/app/guides/view-transitions). The layout and interactions are implemented locally; reference-site assets and code are not copied.
