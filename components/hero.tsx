'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '@/lib/use-reveal'
import { scrollToSection } from '@/components/smooth-scroll'
import { MagneticLink } from '@/components/magnetic-link'
import { LINKS, SECTION_IDS } from '@/lib/dossier-data'

const VALID_SECTIONS = new Set<string>(SECTION_IDS)

export function Hero() {
  const rootRef = useRef<HTMLElement>(null)

  // Entrance sequence: staggered fade + upward slide
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const items = el.querySelectorAll('[data-hero-item]')
    const reduced = prefersReducedMotion()

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.fromTo(items, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, stagger: 0.05 })
        return
      }
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
          stagger: 0.08,
        },
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <header
      ref={rootRef}
      className="relative flex min-h-svh flex-col justify-center px-6 py-24 md:px-12 lg:px-20"
    >
      <div className="mx-auto w-full max-w-4xl">
        <p
          data-hero-item
          className="font-mono text-xs tracking-[0.2em] text-muted-foreground"
        >
          FILE REF: PR-2027 {'//'} STATUS:{' '}
          <span className="text-signal">ACTIVE</span>
        </p>

        <h1
          data-hero-item
          className="dossier-heading mt-6 text-6xl leading-none text-foreground md:text-8xl lg:text-9xl"
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
          className="mt-8 max-w-2xl text-base leading-relaxed text-foreground/85 text-pretty md:text-lg"
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
    const state = { i: 0 }
    const tween = gsap.to(state, {
      i: chars.length,
      duration: chars.length * 0.035,
      ease: 'none',
      delay: 1.1,
      onUpdate: () => {
        hint.textContent = chars.slice(0, Math.round(state.i)).join('')
      },
    })
    return () => {
      tween.kill()
    }
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
