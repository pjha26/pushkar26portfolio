'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '@/lib/use-reveal'
import { MagneticLink } from '@/components/magnetic-link'
import { NeuralNetworkBackground } from '@/components/particle-network'
import { LINKS, SECTION_IDS } from '@/lib/dossier-data'
import { useScramble } from '@/lib/use-scramble'
import { sound } from '@/lib/audio-engine'
import { scrollToSection } from '@/components/smooth-scroll'

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

  // Clean, staggered fade-in entrance
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const items = el.querySelectorAll('[data-hero-item]')
    const reduced = prefersReducedMotion()

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(items, { autoAlpha: 1 })
        return
      }

      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          delay: 0.2,
          clearProps: 'all',
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <header
      id="hero-section"
      ref={rootRef}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-6 py-24 md:px-12 lg:px-20 bg-[#08080a]"
    >
      {/* Innovative AI Core Background */}
      <div className="ai-core-bg">
        <div className="ai-core-grid" />
        <div className="ai-core-energy" />
        <div className="ai-core-glow" />
      </div>

      {/* Subtle atmospheric dust */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-15 mix-blend-screen">
        <NeuralNetworkBackground />
      </div>

      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-start md:items-center md:text-center">
        <div data-hero-item className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-signal"></span>
          </span>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            System Online // Full-Stack & AI
          </p>
        </div>

        <ScrambleText
          as="h1"
          text="Pushkar Raj"
          delay={500}
          className="name-heading text-6xl leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-neutral-600 font-extrabold md:text-7xl lg:text-8xl tracking-tight cursor-default text-balance drop-shadow-sm"
        />

        <p
          data-hero-item
          className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/70 text-pretty md:text-xl font-light"
        >
          I build resilient, data-driven systems — multi-agent AI platforms,
          real-time infrastructure, and machine learning pipelines that thrive in
          production.
        </p>

        <nav
          data-hero-item
          aria-label="External profiles"
          className="mt-10 mb-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          <MagneticLink href={LINKS.github} target="_blank" rel="noopener noreferrer">
            <span className="hover:text-white transition-colors duration-300">GitHub</span>
          </MagneticLink>
          <MagneticLink href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            <span className="hover:text-white transition-colors duration-300">LinkedIn</span>
          </MagneticLink>
          <MagneticLink href={LINKS.leetcode} target="_blank" rel="noopener noreferrer">
            <span className="hover:text-white transition-colors duration-300">LeetCode</span>
          </MagneticLink>
          <MagneticLink href={LINKS.email}>
            <span className="hover:text-white transition-colors duration-300">Email</span>
          </MagneticLink>
        </nav>

        <div data-hero-item className="w-full max-w-2xl mt-4">
          <CommandLine />
        </div>
      </div>
    </header>
  )
}

const PLACEHOLDER = 'Type a command... (e.g. projects, skills, whoami, clear)'

function CommandLine() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')
  type HistoryEntry = { command: string; output: React.ReactNode | null }
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [focused, setFocused] = useState(false)
  const historyRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of history
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight
    }
  }, [history])

  const submit = () => {
    const query = value.trim().toLowerCase()
    if (!query) return
    let response: React.ReactNode | null = null
    
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
    } else if (query === 'matrix') {
      response = "WAKING UP IN THE MATRIX..."
      document.body.style.color = '#00ff00'
      document.documentElement.style.setProperty('--signal', '#00ff00')
      sound.playGlitch()
    } else if (query === 'help') {
      response = (
        <div className="flex flex-col gap-1 text-xs sm:text-sm mt-1">
          <p className="text-white/80 border-b border-white/10 pb-1 mb-1">AVAILABLE COMMANDS:</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
            <p><span className="text-signal">projects</span> - View case files</p>
            <p><span className="text-signal">skills</span> - Technical capabilities</p>
            <p><span className="text-signal">about</span> - Background intel</p>
            <p><span className="text-signal">resume</span> - Access dossier</p>
            <p><span className="text-signal">contact</span> - Initiate comms</p>
            <p><span className="text-signal">whoami</span> - Identity check</p>
            <p><span className="text-signal">clear</span> - Wipe terminal log</p>
            <p><span className="text-signal">matrix</span> - [ REDACTED ]</p>
          </div>
        </div>
      )
    } else {
      response = `Command not found: ${query}. Type 'help' for a list of commands.`
    }

    setHistory((prev) => [...prev, { command: value, output: response }])
    setValue('')
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
      className="glass-panel group relative flex w-full flex-col overflow-hidden rounded-xl border border-white/10 px-5 py-4 font-mono text-sm sm:text-base shadow-2xl transition-all duration-300 hover:border-signal/30 hover:shadow-[0_0_30px_rgba(245,196,0,0.1)] text-left"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-signal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div 
        ref={historyRef}
        className="max-h-48 overflow-y-auto scrollbar-hide flex flex-col gap-2 mb-2"
      >
        {history.length === 0 && (
          <div className="text-muted-foreground/70 text-xs sm:text-sm italic mb-2">
            Terminal ready. Type 'help' to view available commands.
          </div>
        )}
        {history.map((entry, i) => (
          <div key={i} className="flex flex-col animate-in fade-in slide-in-from-bottom-1 duration-300">
            <div className="flex text-muted-foreground">
              <span className="mr-2 text-signal">❯</span>
              <span className="text-white/90">{entry.command}</span>
            </div>
            {entry.output && (
              <div className="text-foreground pl-4 mt-1 opacity-90">{entry.output}</div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center text-foreground mt-1">
        <span className="mr-3 text-signal animate-pulse" aria-hidden="true">
          ❯
        </span>
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-label="Command line input"
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground/40 text-white/90"
            placeholder={focused ? '' : PLACEHOLDER}
            spellCheck="false"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  )
}
