'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { prefersReducedMotion } from '@/lib/use-reveal'
import { scrollToSection } from '@/components/smooth-scroll'
import { MagneticLink } from '@/components/magnetic-link'
import { HeroRain, HeroSpotlight } from '@/components/gotham-atmosphere'
import { LINKS, SECTION_IDS } from '@/lib/dossier-data'
import dynamic from 'next/dynamic'

gsap.registerPlugin(TextPlugin)

const GuardianEntrance = dynamic(
  () => import('@/components/guardian-entrance').then((mod) => mod.GuardianEntrance),
  { ssr: false }
)

const VALID_SECTIONS = new Set<string>(SECTION_IDS)

export function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const blackoutRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const [isLanded, setIsLanded] = useState(false)

  // Cinematic entrance: power-outage flicker → staggered reveal → name glow pulse
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const items = el.querySelectorAll('[data-hero-item]')
    const blackout = blackoutRef.current
    const name = nameRef.current
    const reduced = prefersReducedMotion()
    const hasRun = sessionStorage.getItem('hero_has_run')

    const ctx = gsap.context(() => {
      if (reduced) {
        if (blackout) gsap.set(blackout, { autoAlpha: 0 })
        gsap.fromTo(items, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, stagger: 0.05 })
        return
      }

      sessionStorage.setItem('hero_has_run', 'true')
      const tl = gsap.timeline({ delay: hasRun ? 0 : 1.25 })

      // Power outage: black overlay flickers off at decreasing intervals
      if (blackout) {
        tl.set(blackout, { autoAlpha: 1 })
          .to(blackout, { autoAlpha: 0, duration: 0.05 }, 0.15)
          .to(blackout, { autoAlpha: 1, duration: 0.04 }, 0.24)
          .to(blackout, { autoAlpha: 0, duration: 0.04 }, 0.34)
          .to(blackout, { autoAlpha: 0.85, duration: 0.03 }, 0.42)
          .to(blackout, { autoAlpha: 0, duration: 0.08 }, 0.48)
      }

      // Staggered text reveal after the lights stabilize
      tl.fromTo(
        items,
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
          stagger: 0.08,
        },
        0.55,
      )

      // Searchlight glow pulse over the name: glow in, settle to none
      if (name) {
        tl.fromTo(
          name,
          { textShadow: '0 0 0px rgba(245, 196, 0, 0)' },
          {
            textShadow: '0 0 32px rgba(245, 196, 0, 0.45)',
            duration: 0.5,
            ease: 'power2.in',
          },
          0.85,
        ).to(name, {
          textShadow: '0 0 0px rgba(245, 196, 0, 0)',
          duration: 0.9,
          ease: 'power2.out',
        })
      }
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <header
      id="hero-section"
      ref={rootRef}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-6 py-24 md:px-12 lg:px-20"
    >
      <GuardianEntrance targetId="hero-section" onLandingComplete={() => setIsLanded(true)} />
      <HeroSpotlight />
      <HeroRain heroRef={rootRef} />

      {/* Power-outage blackout overlay */}
      <div
        ref={blackoutRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-black opacity-0"
      />

      <div className="relative z-20 w-full max-w-3xl">
        <p
          data-hero-item
          className="font-mono text-xs tracking-[0.2em] text-muted-foreground"
        >
          FILE REF: PR-2027 {'//'} STATUS:{' '}
          <span className="text-signal glow-signal">ACTIVE</span>
        </p>

        <h1
          ref={nameRef}
          data-hero-item
          className="name-heading mt-6 text-4xl leading-none text-foreground md:text-6xl lg:text-7xl xl:text-8xl"
        >
          Pushkar Raj
        </h1>

        <p
          data-hero-item
          className="dossier-heading mt-4 text-sm text-muted-foreground md:text-base"
        >
          Case Designation: Full-Stack Developer &amp; AI/ML Engineer
        </p>

        <p
          data-hero-item
          className="mt-8 max-w-2xl text-base leading-relaxed text-foreground text-pretty md:text-lg"
        >
          I build resilient, data-driven systems — multi-agent AI platforms,
          real-time infrastructure, and ML pipelines that survive contact with
          production.
        </p>

        <nav
          data-hero-item
          aria-label="External profiles"
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <MagneticLink href={LINKS.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </MagneticLink>
          <MagneticLink href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </MagneticLink>
          <MagneticLink href={LINKS.leetcode} target="_blank" rel="noopener noreferrer">
            LeetCode
          </MagneticLink>
          <MagneticLink href={LINKS.email}>Email</MagneticLink>
        </nav>

        <div data-hero-item className="mt-12">
          <CommandLine />
        </div>
      </div>

      <p
        data-hero-item
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground"
      >
        SCROLL TO REVIEW FILE ↓
      </p>
    </header>
  )
}

const PLACEHOLDER = 'projects / skills / about / resume / contact'

function CommandLine() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)
  const [focused, setFocused] = useState(false)

  // GSAP character-by-character typing animation for the placeholder hint
  const hintRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const hint = hintRef.current
    if (!hint) return
    if (prefersReducedMotion()) {
      hint.textContent = PLACEHOLDER
      return
    }

    const chars = PLACEHOLDER.split('')
    hint.textContent = ''
    
    const ctx = gsap.context(() => {
      const state = { i: 0 }
      gsap.to(state, {
        i: chars.length,
        duration: chars.length * 0.035,
        ease: 'none',
        delay: 1.1,
        onUpdate: () => {
          hint.textContent = chars.slice(0, Math.round(state.i)).join('')
        },
      })
    }, hint)
    
    return () => ctx.revert()
  }, [])

  const submit = () => {
    const query = value.trim().toLowerCase()
    if (!query) return
    if (VALID_SECTIONS.has(query)) {
      setFeedback(null)
      scrollToSection(query)
      setValue('')
    } else {
      setFeedback(`UNKNOWN SECTION: "${query.toUpperCase()}" — TRY: PROJECTS, SKILLS, ABOUT, RESUME, CONTACT`)
    }
  }

  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
        COMMAND LINE — TYPE A SECTION NAME AND PRESS ENTER
      </p>
      <div
        className="glow-hover mt-3 flex items-center gap-3 border border-border bg-card px-4 py-3"
        onClick={() => inputRef.current?.focus()}
      >
        <span className="font-mono text-sm text-signal" aria-hidden="true">
          {'>'}
        </span>
        <div className="relative flex-1">
          {value === '' && !focused && (
            <span
              ref={hintRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center font-mono text-sm text-muted-foreground"
            />
          )}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setFeedback(null)
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => {
              if (
                e.key === 'Enter' &&
                !e.nativeEvent.isComposing &&
                e.keyCode !== 229
              ) {
                submit()
              }
            }}
            aria-label="Command line: type a section name and press Enter to navigate"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="w-full bg-transparent font-mono text-sm text-foreground outline-none"
          />
        </div>
        <span
          aria-hidden="true"
          className="cursor-blink h-4 w-2 bg-signal"
        />
      </div>
      <p
        role="status"
        aria-live="polite"
        className="mt-2 min-h-4 font-mono text-[10px] tracking-widest text-signal"
      >
        {feedback}
      </p>
    </div>
  )
}
