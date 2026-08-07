'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/use-reveal'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fixed background grid + vignette. The grid moves ~20% slower than the
 * foreground content via a scroll-driven parallax offset.
 */
export function GridBackground() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid || prefersReducedMotion()) return

    const tween = gsap.to(grid, {
      backgroundPositionY: () =>
        `${(document.documentElement.scrollHeight - window.innerHeight) * 0.2}px`,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div ref={gridRef} className="bg-grid absolute inset-0" />
      <div className="bg-vignette absolute inset-0" />
    </div>
  )
}
