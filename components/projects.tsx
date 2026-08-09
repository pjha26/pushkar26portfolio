'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Section } from '@/components/section'
import { CASES, type CaseFile } from '@/lib/dossier-data'
import { prefersReducedMotion } from '@/lib/use-reveal'

gsap.registerPlugin(ScrollTrigger)

import { TiltCard } from '@/components/ui/tilt-card'
import { cn } from '@/lib/utils'

function CaseCard({ 
  caseFile: c, 
  isOpen, 
  isOtherOpen, 
  onToggle, 
  onClose 
}: { 
  caseFile: CaseFile, 
  isOpen: boolean, 
  isOtherOpen: boolean, 
  onToggle: () => void, 
  onClose: () => void 
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const tabRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const innerContentRef = useRef<HTMLDivElement>(null)
  const scanlineRef = useRef<HTMLDivElement>(null)
  const bracketsRef = useRef<SVGSVGElement>(null)
  
  // Handle click outside
  useEffect(() => {
    if (!isOpen) return
    const handleClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    // Small delay to prevent immediate trigger on open
    setTimeout(() => document.addEventListener('click', handleClick), 10)
    return () => document.removeEventListener('click', handleClick)
  }, [isOpen, onClose])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        if (isOpen) {
          gsap.to(drawerRef.current, { autoAlpha: 1, height: 'auto', duration: 0.2, display: 'block' })
        } else {
          gsap.to(drawerRef.current, { autoAlpha: 0, height: 0, duration: 0.2, display: 'none' })
        }
        return
      }
      
      // Kill any ongoing tweens on our elements to prevent conflicts
      gsap.killTweensOf([drawerRef.current, scanlineRef.current, innerContentRef.current?.children])
      if (bracketsRef.current) gsap.killTweensOf(bracketsRef.current.querySelectorAll('path'))
      
      if (isOpen) {
        const tl = gsap.timeline()
        
        // Setup initial states before animation
        tl.set(drawerRef.current, { display: 'block' })
        if (innerContentRef.current) tl.set(innerContentRef.current.children, { autoAlpha: 0, y: 10 })
        
        // 1. Panel unfolds (400-500ms, power3.out)
        tl.fromTo(drawerRef.current,
          { rotateX: 90, z: -20, autoAlpha: 0, transformOrigin: 'top center' },
          { rotateX: 0, z: 20, autoAlpha: 1, duration: 0.5, ease: 'power3.out' },
          0
        )
        
        // 2. Corner brackets materialize (200-250ms), starts slightly before panel finishes
        if (bracketsRef.current) {
          const paths = bracketsRef.current.querySelectorAll('path')
          tl.fromTo(paths,
            { strokeDasharray: 40, strokeDashoffset: 40 },
            { strokeDashoffset: 0, duration: 0.25, ease: 'power2.out' },
            0.3
          )
        }
        
        // 3. Scanline sweeps (300ms)
        tl.fromTo(scanlineRef.current,
          { top: '0%', autoAlpha: 0.8 },
          { top: '100%', autoAlpha: 0, duration: 0.3, ease: 'none' },
          0.4
        )
        
        // 4. Content fades/staggers in AFTER rotation and scan-line
        if (innerContentRef.current) {
          tl.to(innerContentRef.current.children,
            { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' },
            0.6
          )
        }
        
      } else {
        // Close sequence (~300ms total)
        const tl = gsap.timeline()
        
        // 1. Content fades out first
        if (innerContentRef.current) {
          tl.to(innerContentRef.current.children,
            { autoAlpha: 0, y: -5, duration: 0.1, stagger: 0 },
            0
          )
        }
        
        // 2. Scanline sweeps up and brackets retract
        tl.fromTo(scanlineRef.current,
          { top: '100%', autoAlpha: 0.8 },
          { top: '0%', autoAlpha: 0, duration: 0.15, ease: 'none' },
          0.05
        )
        
        if (bracketsRef.current) {
          const paths = bracketsRef.current.querySelectorAll('path')
          tl.to(paths,
            { strokeDashoffset: 40, duration: 0.15, ease: 'power2.in' },
            0.05
          )
        }
        
        // 3. Panel rotates back to 90deg
        tl.to(drawerRef.current,
          { rotateX: 90, z: -20, autoAlpha: 0, duration: 0.2, ease: 'power2.in' },
          0.1
        )
        
        tl.set(drawerRef.current, { display: 'none' })
      }
    }, cardRef)

    return () => ctx.revert()
  }, [isOpen])

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!tabRef.current) return
    const rect = tabRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    tabRef.current.style.setProperty('--mouse-x', `${x}px`)
    tabRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div
      ref={cardRef}
      data-case-card
      className={cn(
        "group/card mb-6 transition-opacity duration-300",
        isOtherOpen ? "opacity-50" : "opacity-100"
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <TiltCard
        data-cursor-card="OPEN"
        className="p-0 bg-transparent border-none shadow-none"
      >
        <button
          ref={tabRef}
          type="button"
          aria-expanded={isOpen}
          onClick={(e) => {
            e.stopPropagation()
            onToggle()
          }}
          onMouseMove={handleMouseMove}
          className="relative z-10 flex w-full flex-col gap-2 px-6 py-5 text-left md:flex-row md:items-center md:justify-between outline-none bg-card hover:bg-[var(--card-hover)] transition-colors border border-white/5 shadow-md overflow-hidden"
        >
          {/* Spotlight Hover Layer */}
          <div 
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" 
            style={{ 
              background: 'radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(245, 196, 0, 0.08), transparent 40%)'
            }} 
          />

          <div className="relative z-10 flex items-baseline gap-4">
            <span className="font-mono text-[10px] tracking-[0.25em] text-signal drop-shadow-[0_0_8px_rgba(245,196,0,0.4)]">
              {c.fileNumber}
            </span>
            <h3 className="dossier-heading text-xl text-foreground md:text-2xl uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
              {c.title}
            </h3>
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] bg-signal text-signal-foreground px-2 py-1 rounded-sm uppercase">
              {c.status}
            </span>
            <span
              aria-hidden="true"
              className={`font-mono text-sm text-signal transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
            >
              +
            </span>
          </div>
        </button>
      </TiltCard>

      {/* Holographic Terminal Drawer */}
      <div
        ref={drawerRef}
        className="relative z-20 hidden mt-4 border border-signal/30 bg-[#0a0a0d] shadow-[0_0_15px_rgba(245,196,0,0.15),inset_0_0_10px_rgba(245,196,0,0.05)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Corner Brackets */}
        <svg ref={bracketsRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          {/* Top Left */}
          <path d="M 0 16 L 0 0 L 16 0" fill="none" stroke="#f5c400" strokeWidth="2" />
          {/* Top Right */}
          <path d="M calc(100% - 16px) 0 L 100% 0 L 100% 16" fill="none" stroke="#f5c400" strokeWidth="2" />
          {/* Bottom Left */}
          <path d="M 0 calc(100% - 16px) L 0 100% L 16 100%" fill="none" stroke="#f5c400" strokeWidth="2" />
          {/* Bottom Right */}
          <path d="M calc(100% - 16px) 100% L 100% 100% L 100% calc(100% - 16px)" fill="none" stroke="#f5c400" strokeWidth="2" />
        </svg>

        {/* Scanline */}
        <div ref={scanlineRef} className="absolute left-0 w-full h-[2px] bg-signal/60 shadow-[0_0_8px_rgba(245,196,0,0.8)] pointer-events-none opacity-0" style={{ zIndex: 2 }} />

        {/* Inner Content */}
        <div ref={innerContentRef} className="px-8 py-8 relative" style={{ zIndex: 3 }}>
          <div className="grid gap-8 md:grid-cols-2 opacity-0">
            <div>
              <h4 className="font-mono text-[10px] tracking-[0.25em] text-signal/70">
                PROBLEM
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                {c.problem}
              </p>
            </div>
            <div>
              <h4 className="font-mono text-[10px] tracking-[0.25em] text-signal/70">
                APPROACH
              </h4>
              <ul className="mt-2 space-y-2">
                {c.approach.map((line, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm leading-relaxed text-foreground/85"
                  >
                    <span className="text-signal" aria-hidden="true">
                      ▸
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {c.challenge && (
            <div className="mt-6 border-l-4 border-signal bg-white/5 p-4 shadow-sm opacity-0">
              <h4 className="font-mono text-[10px] tracking-[0.25em] text-signal uppercase">
                TECHNICAL CHALLENGE
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                {c.challenge}
              </p>
            </div>
          )}

          <div className="mt-6 opacity-0">
            <h4 className="font-mono text-[10px] tracking-[0.25em] text-signal/70">
              STACK
            </h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {c.stack.map((tag) => (
                <li
                  key={tag}
                  className="border border-signal/20 bg-signal/5 px-2 py-1 font-mono text-xs text-signal drop-shadow-[0_0_8px_rgba(245,196,0,0.1)]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 opacity-0">
            {c.github && (
              <a
                href={c.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="link-underline font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:text-signal"
              >
                GitHub ↗
              </a>
            )}
            {c.live && (
              <a
                href={c.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="link-underline font-mono text-xs uppercase tracking-widest text-signal"
              >
                Live ↗
              </a>
            )}
            <a
              href={`/projects/${c.id}`}
              onClick={(e) => e.stopPropagation()}
              className="link-underline font-mono text-xs uppercase tracking-widest text-signal transition-colors hover:text-white"
            >
              Case Study ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const listRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId] = useState<string | null>(null)

  // 3D tilt-in reveal for cards
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const cards = list.querySelectorAll('[data-case-card]')
    const reduced = prefersReducedMotion()

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.fromTo(
          cards,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.4,
            scrollTrigger: { trigger: list, start: 'top 85%', once: true },
          },
        )
        return
      }

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 24, rotateX: 5, transformPerspective: 900 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.45,
            ease: 'power3.out',
            delay: (i % 3) * 0.1,
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          },
        )
      })
    }, list)

    return () => ctx.revert()
  }, [])

  return (
    <Section id="projects" fileLabel="SECTION 03 // CASE FILES" title="Projects">
      <div ref={listRef} className="flex flex-col gap-6" style={{ perspective: 1200 }}>
        {CASES.map((c) => (
          <CaseCard 
            key={c.fileNumber} 
            caseFile={c} 
            isOpen={activeId === c.fileNumber}
            isOtherOpen={activeId !== null && activeId !== c.fileNumber}
            onToggle={() => setActiveId(activeId === c.fileNumber ? null : c.fileNumber)}
            onClose={() => setActiveId(null)}
          />
        ))}
      </div>
    </Section>
  )
}
