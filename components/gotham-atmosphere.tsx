'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/use-reveal'

gsap.registerPlugin(ScrollTrigger)

/* Deterministic pseudo-random (SSR-safe, no hydration mismatch) */
function prand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

/**
 * Fixed full-page atmosphere: layered city skyline silhouette + drifting fog.
 * Skyline parallaxes slower than content; fog slower still.
 */
export function CityAtmosphere() {
  const skylineRef = useRef<HTMLDivElement>(null)
  const fogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const skyline = skylineRef.current
    const fog = fogRef.current
    if (!skyline || !fog) return

    const ctx = gsap.context(() => {
      gsap.to(skyline, {
        y: () => -(document.documentElement.scrollHeight - window.innerHeight) * 0.06,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
      gsap.to(fog, {
        y: () => -(document.documentElement.scrollHeight - window.innerHeight) * 0.03,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Sky: slightly darker than the page base so silhouettes read near-black on near-black */}
      <div className="absolute inset-0 bg-[#050506]" />

      {/* Fog layers — drift horizontally on long loops */}
      <div ref={fogRef} className="absolute inset-x-0 bottom-0 h-[55vh]">
        <div className="fog-layer fog-a" />
        <div className="fog-layer fog-b" />
        <div className="fog-layer fog-c" />
      </div>

      {/* Layered skyline silhouettes, fixed to the bottom */}
      <div ref={skylineRef} className="absolute inset-x-0 bottom-0">
        <SkylineFar />
        <SkylineNear />
      </div>
    </div>
  )
}

/* Far layer: shorter, hazier buildings */
function SkylineFar() {
  return (
    <svg
      viewBox="0 0 1440 260"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 h-[26vh] w-full opacity-70"
    >
      <path
        fill="#08080b"
        d="M0 260V150h40v-28h26v28h34V96h18v-22h14v22h20v54h48V120h52v-36h16v-14h12v14h18v36h30v40h44V110h58v-30h22v30h30v50h36V128h48v-42h14V64h16v22h16v42h40v32h52V96h20V78h16v18h26v64h44V132h60v-44h18V70h14v18h20v44h34v28h48V118h54v-56h16V44h14v18h20v56h32v42h46V140h50v-26h24v26h28v20h52V112h20V92h18v20h24v48h40v-20h58v120H0Z"
      />
    </svg>
  )
}

/* Near layer: taller, darker, sharper shapes */
function SkylineNear() {
  return (
    <svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 h-[32vh] w-full"
    >
      <path
        fill="#0a0a0d"
        d="M0 320V190h58v-52h22V96h16v42h24v52h42V160h64v-64h20V58h16v38h24v64h38v30h56V140h26v-40h20v40h30v50h44V116h70v-44h18V38h14v34h22v44h34v74h50V152h60v-58h18V56h16v38h26v58h36v38h58V128h24V84h20v44h28v62h46V166h54v-46h24v46h30v24h50V132h20v-28h18v28h26v58h44v-32h64v162H0Z"
      />
    </svg>
  )
}

/**
 * Rain overlay — hero only. Thin light-gray streaks at low opacity, capped
 * particle count. The whole layer fades out as the hero exits the viewport.
 */
const RAIN_COUNT = 60

export function HeroRain({ heroRef }: { heroRef: React.RefObject<HTMLElement | null> }) {
  const rainRef = useRef<HTMLDivElement>(null)
  const reduced = typeof window !== 'undefined' && prefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion()) return
    const rain = rainRef.current
    const hero = heroRef.current
    if (!rain || !hero) return

    const ctx = gsap.context(() => {
      gsap.to(rain, {
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'bottom 80%',
          end: 'bottom 30%',
          scrub: true,
        },
      })
    }, rainRef)
    
    return () => ctx.revert()
  }, [heroRef])

  if (reduced) return null

  return (
    <div
      ref={rainRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden motion-reduce:hidden"
    >
      {Array.from({ length: RAIN_COUNT }, (_, i) => {
        const left = (prand(i) * 100).toFixed(4)
        const duration = (0.3 + prand(i + 100) * 1.2).toFixed(4) // More varied fall speed
        const delay = (-prand(i + 200) * 3).toFixed(4) // Wider delay distribution
        const height = (20 + prand(i + 300) * 70).toFixed(4) // More varied heights
        const opacity = Number((0.02 + prand(i + 400) * 0.04).toFixed(4)) // Much lower opacity
        return (
          <span
            key={i}
            className="rain-streak"
            style={{
              left: `${left}%`,
              height: `${height}px`,
              opacity,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        )
      })}
    </div>
  )
}

/** Searchlight sweep across the hero — soft yellow radial on a slow loop */
export function HeroSpotlight() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden motion-reduce:hidden"
    >
      <div className="spotlight-sweep" />
    </div>
  )
}

/** Full-page film grain via SVG feTurbulence, extremely faint */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="grain-overlay pointer-events-none fixed inset-0 z-40 motion-reduce:hidden"
    />
  )
}
