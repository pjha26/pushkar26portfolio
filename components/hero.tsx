'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { prefersReducedMotion } from '@/lib/use-reveal'
import { scrollToSection } from '@/components/smooth-scroll'
import { MagneticLink } from '@/components/magnetic-link'
import { HeroSpotlight } from '@/components/gotham-atmosphere'
import { NeuralNetworkBackground } from '@/components/particle-network'
import { LINKS, SECTION_IDS } from '@/lib/dossier-data'
import { useScramble } from '@/lib/use-scramble'
import { sound } from '@/lib/audio-engine'
import dynamic from 'next/dynamic'

gsap.registerPlugin(TextPlugin)

const GuardianEntrance = dynamic(
  () => import('@/components/guardian-entrance').then((mod) => mod.GuardianEntrance),
  { ssr: false }
)

const VALID_SECTIONS = new Set<string>(SECTION_IDS)

function ScrambleText({ text, as: Component = 'span', className, delay = 0 }: { text: string, as?: any, className?: string, delay?: number }) {
  const { displayText, trigger } = useScramble(text, 800, delay)
  return (
    <Component className={className} onMouseEnter={trigger}>
      {displayText}
    </Component>
  )
}

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
          clearProps: 'all',
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
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-6 py-24 md:px-12 lg:px-20 bg-[#0a0a0d]"
    >
      <NeuralNetworkBackground />
      <GuardianEntrance targetId="hero-section" onLandingComplete={() => setIsLanded(true)} />
      <HeroSpotlight />

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

        <ScrambleText
          as="h1"
          text="Pushkar Raj"
          delay={1500}
          className="name-heading mt-6 text-4xl leading-none text-[#f5f5f5] font-bold md:text-6xl lg:text-7xl xl:text-8xl cursor-default"
        />

        <ScrambleText
          as="p"
          text="Case Designation: Full-Stack Developer & AI/ML Engineer"
          delay={2000}
          className="dossier-heading mt-4 text-sm text-[#f5f5f5] tracking-widest md:text-base cursor-default"
        />

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
  type HistoryEntry = { command: string; output: string | null }
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [focused, setFocused] = useState(false)
  const historyRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of history
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight
    }
  }, [history])

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
    let response: string | null = null
    
    if (VALID_SECTIONS.has(query)) {
      response = `ACCESSING FILE: [${query.toUpperCase()}]...`
      scrollToSection(query)
    } else if (query === 'clear') {
      setHistory([])
      setValue('')
      return
    } else if (query === 'whoami') {
      response = "IDENTITY: PUSHKAR RAJ // STATUS: FULL-STACK DEVELOPER & ML ENGINEER // THREAT LEVEL: HIGH"
      sound.playAccessGranted()
    } else if (query === 'sudo rm -rf /') {
      response = "CRITICAL: INITIATING SYSTEM WIPEOUT... JUST KIDDING. YOU DON'T HAVE ROOT."
      sound.playGlitch()
      triggerGlitch()
    } else if (query === 'matrix') {
      response = "WAKING UP IN THE MATRIX..."
      document.body.style.color = '#00ff00'
      document.documentElement.style.setProperty('--signal', '#00ff00')
      sound.playGlitch()
    } else if (query === 'sudo override') {
      response = "CRITICAL: OVERRIDE ACCEPTED. ROOT ACCESS GRANTED."
      sound.playAccessGranted()
      triggerGlitch()
    } else if (query.startsWith('sudo')) {
      response = "CRITICAL: Unauthorized access logged. Dispatching trace."
      sound.playGlitch()
    } else {
      response = `Command not found: ${query}`
    }

    setHistory((prev) => [...prev, { command: value, output: response }])
    setValue('')
  }

  const triggerGlitch = () => {
    // Add global glitch class to body for 2 seconds
    document.body.classList.add('global-glitch')
    setTimeout(() => {
      document.body.classList.remove('global-glitch')
    }, 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      submit()
    } else {
      sound.playKeystroke()
    }
  }

  return (
    <div
      data-cursor-text="[ EXECUTE ]"
      className="glow-hover relative flex w-full max-w-lg flex-col overflow-hidden border border-border bg-card px-4 py-3 font-mono text-sm sm:text-base"
      onClick={() => inputRef.current?.focus()}
    >
      <div 
        ref={historyRef}
        className="max-h-32 overflow-y-auto scrollbar-hide flex flex-col gap-1 mb-2"
      >
        {history.map((entry, i) => (
          <div key={i} className="flex flex-col">
            <div className="flex text-muted-foreground">
              <span className="mr-2 text-signal">❯</span>
              <span>{entry.command}</span>
            </div>
            {entry.output && (
              <div className="text-foreground pl-4 mt-1 opacity-90">{entry.output}</div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center text-foreground">
        <span className="mr-3 text-signal" aria-hidden="true">
          ❯
        </span>
        <div className="relative flex-1">
          {!value && !focused && history.length === 0 && (
            <span
              ref={hintRef}
              className="pointer-events-none absolute left-0 top-0 text-muted-foreground opacity-50"
              aria-hidden="true"
            ></span>
          )}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-label="Command line input"
            className="w-full bg-transparent outline-none placeholder:text-transparent"
            spellCheck="false"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  )
}
