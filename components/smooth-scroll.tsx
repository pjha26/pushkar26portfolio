'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { prefersReducedMotion } from '@/lib/use-reveal'

gsap.registerPlugin(ScrollTrigger)

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = prefersReducedMotion()
    let lenis: Lenis | undefined

    if (!reduced) {
      lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
      })
      window.__lenis = lenis

      lenis.on('scroll', ScrollTrigger.update)

      const raf = (time: number) => {
        lenis?.raf(time * 1000)
      }
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)

      // Cleanup ticker on destroy
      const cleanupTicker = () => gsap.ticker.remove(raf)

      const onResize = () => ScrollTrigger.refresh()
      window.addEventListener('resize', onResize)

      return () => {
        window.removeEventListener('resize', onResize)
        cleanupTicker()
        lenis?.destroy()
        window.__lenis = undefined
        ScrollTrigger.getAll().forEach((st) => st.kill())
      }
    }

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  // Scroll progress line
  useEffect(() => {
    const bar = progressRef.current
    if (!bar) return

    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      bar.style.transform = `scaleY(${progress})`
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <>
      {/* Signal-yellow scroll progress line, fixed to right edge */}
      <div
        aria-hidden="true"
        className="fixed right-0 top-0 z-50 h-full w-0.5"
      >
        <div
          ref={progressRef}
          className="h-full w-full origin-top bg-signal"
          style={{ transform: 'scaleY(0)' }}
        />
      </div>
      {children}
    </>
  )
}

/** Smooth-scrolls to an element id, using Lenis when available. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return false
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -24 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return true
}
