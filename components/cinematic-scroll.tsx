'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { animate, inView, scroll } from 'framer-motion/dom'

type Frames = {
  opacity?: number[]
  x?: number[]
  y?: number[]
  scale?: number[]
  clipPath?: string[]
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function CinematicScroll({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLElement>(null)

  useEffect(() => {
    const main = scope.current
    if (!main) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const compact = window.matchMedia('(max-width: 850px)')
    const seen = new WeakSet<Element>()
    const originals = new Map<HTMLElement, string | null>()
    let introPlayed = false
    let dispose = () => {}

    function configure() {
      dispose()
      const disabled = reduced.matches || document.documentElement.dataset.motion === 'paused'
      main!.dataset.cinematic = disabled ? 'off' : 'on'
      if (disabled) {
        introPlayed = true
        return
      }

      let active = true
      const animations: ReturnType<typeof animate>[] = []
      const cleanups: (() => void)[] = []
      const distance = compact.matches ? 14 : 30

      function remember(element: HTMLElement) {
        if (!originals.has(element)) originals.set(element, element.getAttribute('style'))
      }

      function reveal(element: HTMLElement, frames: Frames, duration = 0.85, delay = 0) {
        remember(element)
        animations.push(animate(element, frames, { duration, delay, ease }))
      }

      // Restore visible, untransformed content on pause, preference changes, and unmount.
      dispose = () => {
        active = false
        cleanups.forEach((cleanup) => cleanup())
        animations.forEach((animation) => animation.cancel())
        originals.forEach((style, element) => {
          if (style === null) element.removeAttribute('style')
          else element.setAttribute('style', style)
        })
        main!.querySelector('#hero-section')?.removeAttribute('data-motion-visible')
      }

      const hero = main!.querySelector<HTMLElement>('#hero-section')
      const work = main!.querySelector<HTMLElement>('#projects')
      if (!introPlayed) {
        introPlayed = true
        if (
          window.scrollY < 80 &&
          ['', '#hero-section', '#main-content'].includes(window.location.hash)
        ) {
          main!.querySelectorAll<HTMLElement>('[data-hero-reveal]').forEach((element, index) => {
            reveal(element, { opacity: [0.15, 1], y: [distance, 0] }, 1.05, index * 0.1)
          })
        }
      }

      if (hero) {
        cleanups.push(
          inView(hero, () => {
            if (!active) return
            hero.dataset.motionVisible = 'true'
            return () => {
              hero.dataset.motionVisible = 'false'
            }
          })
        )
        if (!compact.matches) {
          const copy = hero.querySelector<HTMLElement>('.hero-copy')!
          const art = hero.querySelector<HTMLElement>('.hero-art')!
          remember(copy)
          remember(art)
          cleanups.push(
            scroll(
              (progress: number) => {
                if (!active) return
                copy.style.transform = `translateY(${progress * 42}px)`
                art.style.transform = `translateY(${progress * -30}px)`
              },
              {
                target: hero,
                offset: ['start start', 'end start'],
              }
            )
          )
        }
      }

      const progress = main!.querySelector<HTMLElement>('.cinema-progress')!
      remember(progress)
      cleanups.push(
        scroll((value: number) => {
          if (!active) return
          progress.style.transform = `scaleX(${value})`
        })
      )

      if (work) {
        const light = work.querySelector<HTMLElement>('.work-transition-light')!
        const line = work.querySelector<HTMLElement>('.work-transition-line')!
        remember(light)
        remember(line)
        cleanups.push(
          scroll(
            (progress: number) => {
              if (!active) return
              const intensity = 1 - Math.abs(progress * 2 - 1)
              light.style.opacity = String(intensity * (compact.matches ? 0.35 : 0.7))
              line.style.transform = `scaleX(${0.04 + Math.min(1, progress * 2) * 0.96})`
              line.style.opacity = String(Math.min(1, progress * 2))
            },
            {
              target: work,
              offset: ['start end', 'start start'],
            }
          )
        )
      }

      cleanups.push(
        inView(
          main!.querySelectorAll<HTMLElement>('[data-reveal]'),
          (element) => {
            if (!active || seen.has(element)) return
            seen.add(element)
            if (element.contains(document.activeElement)) return
            reveal(element as HTMLElement, { opacity: [0, 1], y: [distance, 0] })
          },
          { amount: 0.15, margin: '0px 0px -24px 0px' }
        )
      )

      const cards = main!.querySelectorAll<HTMLElement>('.project-card')
      cleanups.push(
        inView(
          cards,
          (element) => {
            if (!active || seen.has(element)) return
            seen.add(element)
            if (element.contains(document.activeElement)) return
            const card = element as HTMLElement
            const image = card.querySelector<HTMLElement>('.project-reveal')!
            const info = card.querySelector<HTMLElement>('.project-info')!
            const title = card.querySelector<HTMLElement>('h3')!
            reveal(
              image,
              {
                clipPath: [
                  compact.matches ? 'inset(8% 0% 8% 0%)' : 'inset(35% 0% 35% 0%)',
                  'inset(0% 0% 0% 0%)',
                ],
                scale: [compact.matches ? 1.025 : 1.08, 1],
                y: [compact.matches ? 12 : 36, 0],
              },
              1.15
            )
            reveal(info, { opacity: [0, 1], y: [distance, 0] }, 0.9, 0.12)
            reveal(title, { x: [compact.matches ? 0 : -16, 0] }, 0.9, 0.2)
          },
          { amount: 0.12, margin: '0px 0px -24px 0px' }
        )
      )

      function revealFocusedContent(event: FocusEvent) {
        if (!(event.target instanceof Element)) return
        // Keyboard navigation must never land on content that is still fading in.
        if (event.target.closest('[data-reveal], .project-card, .hero-copy')) {
          animations.forEach((animation) => {
            if (animation.state === 'running') animation.complete()
          })
        }
      }
      main!.addEventListener('focusin', revealFocusedContent)
      cleanups.push(() => main!.removeEventListener('focusin', revealFocusedContent))
    }

    configure()
    const observer = new MutationObserver(configure)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-motion'],
    })
    reduced.addEventListener('change', configure)
    compact.addEventListener('change', configure)
    return () => {
      observer.disconnect()
      reduced.removeEventListener('change', configure)
      compact.removeEventListener('change', configure)
      dispose()
    }
  }, [])

  return (
    <main ref={scope} id="main-content" className="cinematic-experience">
      <div className="cinema-grain" aria-hidden="true" />
      <div className="cinema-progress" aria-hidden="true" />
      {children}
    </main>
  )
}
