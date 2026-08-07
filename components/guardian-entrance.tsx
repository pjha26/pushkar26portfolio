'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/use-reveal'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

type GuardianEntranceProps = {
  targetId: string
  onLandingComplete: () => void
  className?: string
}

export function GuardianEntrance({ targetId, onLandingComplete, className }: GuardianEntranceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const silhouetteRef = useRef<SVGSVGElement>(null)
  const shockwaveRef = useRef<SVGSVGElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const hasTriggered = useRef(false)

  useEffect(() => {
    const section = document.getElementById(targetId)
    if (!section || !containerRef.current) return
    const silhouette = silhouetteRef.current
    const shockwave = shockwaveRef.current
    const particles = particlesRef.current

    if (prefersReducedMotion()) {
      onLandingComplete()
      if (silhouette) {
        gsap.set(silhouette, { autoAlpha: 0.08, y: 0 })
      }
      return
    }

    // Set initial states
    gsap.set(silhouette, { y: -800, rotation: 5, autoAlpha: 0 })
    gsap.set(shockwave, { scale: 0, autoAlpha: 0 })
    if (particles) {
      const particleEls = particles.children
      gsap.set(particleEls, { autoAlpha: 0, scale: 0, x: 0, y: 0 })
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        once: true,
        onEnter: () => {
          if (hasTriggered.current) return
          hasTriggered.current = true
        }
      }
    })

    // 1. Fall (150-200ms)
    tl.to(silhouette, {
      y: 0,
      rotation: 0,
      autoAlpha: 1,
      duration: 0.25,
      ease: 'power4.in',
    })

    // 2. Landing Actions
    tl.add(() => {
      // Screen shake
      section.classList.add('shake-active')
      setTimeout(() => section.classList.remove('shake-active'), 200)

      // Dust / Particles burst
      if (particles) {
        const particleEls = particles.children
        Array.from(particleEls).forEach((p, i) => {
          const angle = (Math.PI * 2 * i) / particleEls.length
          const dist = 60 + Math.random() * 60
          gsap.to(p, {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist + 20,
            autoAlpha: 0,
            scale: 1.5 + Math.random(),
            duration: 0.5,
            ease: 'power2.out'
          })
          gsap.set(p, { autoAlpha: 0.8, scale: 0.5 })
        })
      }
    })

    // Shockwave expand and fade
    tl.to(shockwave, {
      scale: 3,
      autoAlpha: 0,
      duration: 0.4,
      ease: 'power2.out',
    }, '<')

    // 3. Settling (fade out silhouette to act as background)
    tl.to(silhouette, {
      autoAlpha: 0.05,
      duration: 0.4,
      ease: 'power2.out',
      onComplete: onLandingComplete
    }, '<+=0.1')

    return () => {
      tl.kill()
      tl.scrollTrigger?.kill()
    }
  }, [targetId, onLandingComplete])

  return (
    <div ref={containerRef} className={cn("absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center", className)} aria-hidden="true">
      {/* Shockwave */}
      <svg ref={shockwaveRef} width="300" height="300" viewBox="0 0 100 100" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <circle cx="50" cy="50" r="45" fill="none" stroke="var(--vengeance)" strokeWidth="2" className="opacity-80" />
      </svg>

      {/* Particles */}
      <div ref={particlesRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute inset-0 rounded-full bg-foreground/60 w-2 h-2" />
        ))}
      </div>

      {/* Silhouette */}
      <svg ref={silhouetteRef} width="400" height="600" viewBox="0 0 100 160" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] origin-bottom">
        <path
          d="M50,15 C42,15 36,21 36,29 C36,36 41,41 47,43 C33,48 18,80 12,145 C28,140 72,140 88,145 C82,80 67,48 53,43 C59,41 64,36 64,29 C64,21 58,15 50,15 Z"
          fill="var(--foreground)"
        />
      </svg>
    </div>
  )
}
