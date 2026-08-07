'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Fades in + slides up a section (and staggers its [data-reveal] children)
 * when it scrolls into view. Falls back to a simple fade when the user
 * prefers reduced motion.
 */
export function useSectionReveal<T extends HTMLElement>(options?: { disable?: boolean }) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (options?.disable) return
    const el = ref.current
    if (!el) return

    const reduced = prefersReducedMotion()
    const children = el.querySelectorAll('[data-reveal]')
    const targets = children.length > 0 ? Array.from(children) : [el]

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.fromTo(
          targets,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.4,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          },
        )
        return
      }

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: 'power3.out',
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}
