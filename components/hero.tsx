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
        { autoAlpha: 0, y: 30, rotationX: -10 },
        {
          autoAlpha: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.1,
          delay: 0.1,
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
      {/* Innovative AI Core Background - Shifted slightly left to balance asymmetry */}
      <div className="ai-core-bg" style={{ transform: 'translateX(-10%)' }}>
        <div className="ai-core-grid" />
        <div className="ai-core-energy" />
        <div className="ai-core-glow" />
      </div>

      {/* Subtle atmospheric dust */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-15 mix-blend-screen">
        <NeuralNetworkBackground />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-10">
        
        {/* ================= LEFT COLUMN: TYPOGRAPHY ================= */}
        <div className="lg:col-span-7 flex flex-col items-start text-left perspective-1000">
          
          <div data-hero-item className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(255,255,255,0.03)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-signal"></span>
            </span>
            <p className="font-mono text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              System Online // Full-Stack & AI
            </p>
          </div>

          <ScrambleText
            as="h1"
            text="Pushkar Raj"
            delay={300}
            className="name-heading text-[5rem] leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-100 to-neutral-600 font-extrabold md:text-[7rem] lg:text-[8.5rem] tracking-tighter cursor-default text-balance drop-shadow-sm pb-2"
          />

          <p
            data-hero-item
            className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/70 text-pretty md:text-xl font-light border-l-2 border-signal/30 pl-6 py-1"
          >
            I build resilient, data-driven systems — multi-agent AI platforms,
            real-time infrastructure, and machine learning pipelines that thrive in
            production.
          </p>

        </div>

        {/* ================= RIGHT COLUMN: BENTO GRID ================= */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4 lg:gap-6 mt-8 lg:mt-0 perspective-1000">
          
          {/* Bento 1: Command Line (Spans full width of right column) */}
          <div data-hero-item className="col-span-2">
            <CommandLine />
          </div>

          {/* Bento 2: Live Status */}
          <div data-hero-item className="col-span-2 sm:col-span-1 glass-panel flex flex-col justify-between rounded-xl border border-white/10 bg-black/20 backdrop-blur-xl p-5 hover:border-signal/30 transition-colors duration-300 group">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
              <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">Status</span>
            </div>
            <div>
              <p className="text-sm text-foreground/90 font-medium">Available for new opportunities</p>
              <p className="text-xs text-foreground/50 mt-1">Based in India // Remote</p>
            </div>
          </div>

          {/* Bento 3: Social Links Grid */}
          <div data-hero-item className="col-span-2 sm:col-span-1 glass-panel grid grid-cols-2 grid-rows-2 gap-px rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden hover:border-signal/30 transition-colors duration-300">
            <MagneticLink href={LINKS.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-black/40 hover:bg-white/5 transition-colors p-4 group/link">
              <span className="text-sm font-medium text-muted-foreground group-hover/link:text-white transition-colors">GitHub</span>
            </MagneticLink>
            <MagneticLink href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-black/40 hover:bg-white/5 transition-colors p-4 group/link">
              <span className="text-sm font-medium text-muted-foreground group-hover/link:text-white transition-colors">LinkedIn</span>
            </MagneticLink>
            <MagneticLink href={LINKS.leetcode} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-black/40 hover:bg-white/5 transition-colors p-4 group/link">
              <span className="text-sm font-medium text-muted-foreground group-hover/link:text-white transition-colors">LeetCode</span>
            </MagneticLink>
            <MagneticLink href={LINKS.email} className="flex items-center justify-center bg-black/40 hover:bg-white/5 transition-colors p-4 group/link">
              <span className="text-sm font-medium text-muted-foreground group-hover/link:text-signal transition-colors">Email</span>
            </MagneticLink>
          </div>

        </div>

      </div>
    </header>
  )
}

const PLACEHOLDER = 'Type a command... (e.g. help, about)'

function CommandLine() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')
  type HistoryEntry = { command: string; output: React.ReactNode | null }
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [focused, setFocused] = useState(false)
  const historyRef = useRef<HTMLDivElement>(null)

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
      response = "IDENTITY: PUSHKAR RAJ // STATUS: FULL-STACK DEVELOPER & ML ENGINEER"
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
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-muted-foreground">
            <p><span className="text-signal">projects</span></p>
            <p><span className="text-signal">skills</span></p>
            <p><span className="text-signal">about</span></p>
            <p><span className="text-signal">resume</span></p>
            <p><span className="text-signal">contact</span></p>
            <p><span className="text-signal">clear</span></p>
          </div>
        </div>
      )
    } else {
      response = `Command not found: ${query}. Type 'help'.`
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
      className="glass-panel group relative flex w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl px-5 py-5 font-mono text-sm sm:text-base shadow-2xl transition-all duration-500 hover:border-signal/30 hover:shadow-[0_0_30px_rgba(245,196,0,0.1)] text-left h-[280px]"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-signal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
        </div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-widest">root@system:~</div>
      </div>

      <div 
        ref={historyRef}
        className="flex-1 overflow-y-auto scrollbar-hide flex flex-col gap-2 mb-2"
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
      <div className="flex items-center text-foreground mt-auto pt-2 border-t border-white/5">
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
