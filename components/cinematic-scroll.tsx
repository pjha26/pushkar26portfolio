'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { animate, inView, scroll } from 'framer-motion/dom'

type Frames = {
  opacity?: number[]
  y?: number[]
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
        const scene = hero.closest<HTMLElement>('.hero-scene')!
        remember(hero)
        remember(scene)
        let swipeStart = 0
        let swipeDistance = 1
        function measureHero() {
          if (!active) return
          scene.style.setProperty('--hero-height', `${hero!.offsetHeight}px`)
          swipeStart = Math.max(
            0,
            scene.getBoundingClientRect().top +
              window.scrollY +
              hero!.offsetHeight -
              window.innerHeight
          )
          swipeDistance = Math.min(window.innerHeight * 0.55, 480)
        }
        measureHero()
        const resize = new ResizeObserver(measureHero)
        resize.observe(hero)
        window.addEventListener('resize', measureHero)
        cleanups.push(() => {
          resize.disconnect()
          window.removeEventListener('resize', measureHero)
        })
        cleanups.push(
          scroll((_progress, info) => {
            if (!active) return
            // Begin the swipe only after the entire intro has been readable.
            const swipe = Math.max(0, Math.min(1, (info.y.current - swipeStart) / swipeDistance))
            hero.style.transform = `translateY(${-swipe * (compact.matches ? 12 : 24)}px) scale(${1 - swipe * (compact.matches ? 0.02 : 0.045)})`
          })
        )
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
        const line = work.querySelector<HTMLElement>('.work-transition-line')!
        remember(line)
        cleanups.push(
          scroll(
            (progress: number) => {
              if (!active) return
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
      cards.forEach((card) => {
        const image = card.querySelector<HTMLElement>('.project-reveal')!
        remember(image)
        cleanups.push(
          scroll(
            (progress: number) => {
              if (!active) return
              // Open the browser preview with the visitor's scroll, in either direction.
              const opening = card.contains(document.activeElement)
                ? 1
                : Math.min(1, progress / 0.65)
              const remaining = 1 - opening
              image.style.clipPath = `inset(${remaining * (compact.matches ? 4 : 16)}% 0% 0% 0% round 8px)`
              image.style.transform = `perspective(1200px) rotateX(${remaining * (compact.matches ? 0 : 8)}deg) scale(${1 - remaining * 0.045})`
            },
            { target: card, offset: ['start end', 'start 20%'] }
          )
        )
      })
      function revealFocusedContent(event: FocusEvent) {
        if (!(event.target instanceof Element)) return
        const preview = event.target
          .closest('.project-card')
          ?.querySelector<HTMLElement>('.project-reveal')
        if (preview) {
          preview.style.clipPath = 'none'
          preview.style.transform = 'none'
        }
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
