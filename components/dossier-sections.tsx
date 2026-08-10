'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { Section } from '@/components/section'
import { MagneticLink } from '@/components/magnetic-link'
import { LINKS, SKILL_GROUPS } from '@/lib/dossier-data'
import { prefersReducedMotion } from '@/lib/use-reveal'
import { cn } from '@/lib/utils'
import { AnimatedSkillBadge } from '@/components/animated-skill-badge'
import { SkillsSphere } from '@/components/skills-sphere'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.to('.skill-badge', {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section id="skills" fileLabel="SECTION 04 // EQUIPMENT" title="Tactical Loadout">
      <div ref={containerRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((group) => (
          <div key={group.label} className="group relative overflow-hidden border border-white/5 bg-card hover:bg-[var(--card-hover)] transition-colors p-5">
            {/* Hover scanning line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-signal -translate-x-full group-hover:animate-[scan_150ms_ease-in-out_forwards]" />
            <h3 className="font-mono text-[10px] tracking-[0.25em] text-signal/70 mb-4">
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <AnimatedSkillBadge key={item} skill={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>
      <SkillsSphere />
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </Section>
  )
}

function TypewriterLog({ children }: { children: React.ReactNode }) {
  const textRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (prefersReducedMotion()) return
    const el = textRef.current
    if (!el) return
    const originalText = el.innerText
    el.innerText = ''
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    })
    
    // Add brief scanline flicker
    tl.fromTo(el, 
      { opacity: 0, textShadow: '0 0 10px var(--vengeance)' },
      { opacity: 1, textShadow: 'none', duration: 0.2 }
    )
    
    // Typewriter
    tl.to(el, {
      text: originalText,
      duration: originalText.length * 0.02,
      ease: 'none'
    })
    
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])
  
  return <div ref={textRef} className="whitespace-pre-wrap">{children}</div>
}

export function Experience() {
  return (
    <div className="theme-vengeance">
      <Section
        id="experience"
        fileLabel="SECTION 05 // SURVEILLANCE LOG"
        title="Experience"
      >
        <div className="relative border-l-2 border-vengeance/30 pl-6 py-2 font-mono text-xs text-foreground/80">
          <div className="absolute top-0 left-[-5px] w-2 h-2 bg-vengeance rounded-full animate-pulse" />
          <TypewriterLog>
{`[TIMESTAMP: 2023-09-01 00:00:00 UTC]
LOCATION: BENGALURU
SUBJECT_ROLE: FULL-STACK DEVELOPER & OPEN SOURCE CONTRIBUTOR

> Analyzing operations...
> Independent Technical Projects initiated.

Designing, shipping, and operating production systems end-to-end:
multi-agent AI platforms, real-time booking infrastructure, voice
interview tooling, and edge-deployed bot analytics — with CI/CD,
observability, and failure-tolerant architecture as defaults, not
afterthoughts.

> STATUS: ACTIVE
> EOF`}
          </TypewriterLog>
        </div>
      </Section>
    </div>
  )
}

function PlaqueCard({ label, title, subtitle }: { label: string, title: string, subtitle: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const stampRef = useRef<SVGSVGElement>(null)
  
  useEffect(() => {
    if (prefersReducedMotion()) {
      if (stampRef.current) gsap.set(stampRef.current, { scale: 1, autoAlpha: 1 })
      return
    }
    
    const stamp = stampRef.current
    if (!stamp || !cardRef.current) return
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 80%',
        once: true
      }
    })
    
    tl.fromTo(stamp, 
      { scale: 1.5, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 0.15, ease: 'power4.out', delay: 0.3 }
    )
    
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])
  
  return (
    <article ref={cardRef} className="relative border border-white/5 bg-card hover:bg-[var(--card-hover)] transition-colors p-6 overflow-hidden">
      <p className="font-mono text-[10px] tracking-[0.25em] text-signal mb-3">
        {label}
      </p>
      <h3 className="dossier-heading text-lg text-foreground mb-1">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">
        {subtitle}
      </p>
      
      <svg ref={stampRef} className="absolute -right-4 -bottom-4 w-24 h-24 opacity-0 text-signal/40 rotate-[-15deg] pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <circle cx="50" cy="50" r="45" strokeWidth="4" />
        <circle cx="50" cy="50" r="38" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M35 50 L45 60 L65 40" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </article>
  )
}

export function Achievements() {
  return (
    <Section
      id="achievements"
      fileLabel="SECTION 06 // COMMENDATIONS"
      title="Achievements"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <PlaqueCard 
          label="1ST PLACE" 
          title="Nexathon 2025" 
          subtitle="Dr. T. Thimmaiah Institute of Technology" 
        />
        <PlaqueCard 
          label="PARTICIPANT" 
          title="THINK2IMPACT Ideathon 2.0" 
          subtitle="AICTE IC-AISMART, JSSATE Bengaluru" 
        />
      </div>
    </Section>
  )
}

export function Resume() {
  return (
    <Section
      id="resume"
      fileLabel="SECTION 07 // FULL FILE"
      title="Resume"
    >
      <div className="flex flex-col items-start gap-6">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          Complete record available for download
        </p>
        <a
          href="/resume.pdf"
          download="Pushkar_Raj_Resume.pdf"
          data-cursor-card="OPEN"
          className="group relative flex items-center gap-5 border border-white/5 bg-card hover:bg-[var(--card-hover)] hover:border-signal/40 hover:shadow-[0_0_20px_rgba(245,196,0,0.1)] transition-all duration-300 px-8 py-6 w-full max-w-md"
        >
          {/* File icon */}
          <svg
            className="shrink-0 w-10 h-12 text-signal/70 group-hover:text-signal transition-colors"
            viewBox="0 0 40 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4h22l10 10v30H4V4z" />
            <path d="M26 4v10h10" />
            <line x1="12" y1="24" x2="28" y2="24" />
            <line x1="12" y1="30" x2="28" y2="30" />
            <line x1="12" y1="36" x2="22" y2="36" />
          </svg>
          <div className="flex flex-col gap-1">
            <span className="dossier-heading text-lg text-[#f5f5f5] group-hover:text-signal transition-colors">
              Download Dossier — PDF
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
              PDF · RÉSUMÉ · 1 PAGE
            </span>
          </div>
          {/* Download arrow */}
          <svg
            className="ml-auto shrink-0 w-5 h-5 text-muted-foreground group-hover:text-signal group-hover:translate-y-0.5 transition-all"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="10" y1="3" x2="10" y2="14" />
            <polyline points="5 10 10 15 15 10" />
            <line x1="4" y1="17" x2="16" y2="17" />
          </svg>
        </a>
      </div>
    </Section>
  )
}

export function Contact() {
  const containerRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    if (prefersReducedMotion()) return
    const el = containerRef.current
    if (!el) return
    
    gsap.fromTo(el, 
      { autoAlpha: 0, y: 20, filter: 'contrast(200%) brightness(150%) blur(2px)' },
      { 
        autoAlpha: 1, 
        y: 0, 
        filter: 'contrast(100%) brightness(100%) blur(0px)',
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true
        }
      }
    )
  }, [])
  
  return (
    <footer
      ref={containerRef}
      id="contact"
      className="scroll-mt-12 border-t border-border px-6 py-20 md:px-12 lg:px-20 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-signal/50 animate-[scan_3s_ease-in-out_infinite]" />
      
      <div className="mx-auto w-full max-w-4xl text-center">
        <p className="font-mono text-[10px] tracking-[0.25em] text-signal/70 mb-8 uppercase">
          INCOMING TRANSMISSION...
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <MagneticLink href={LINKS.email}>Email</MagneticLink>
          <MagneticLink href={LINKS.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </MagneticLink>
          <MagneticLink href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </MagneticLink>
          <MagneticLink href={LINKS.leetcode} target="_blank" rel="noopener noreferrer">
            LeetCode
          </MagneticLink>
        </div>
      </div>
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(200px); opacity: 0; }
        }
      `}</style>
    </footer>
  )
}
