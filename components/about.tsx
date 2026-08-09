'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Section } from '@/components/section'
import { PRINCIPLES } from '@/lib/dossier-data'
import { TiltCard } from '@/components/ui/tilt-card'
import { prefersReducedMotion } from '@/lib/use-reveal'
import { cn } from '@/lib/utils'
import { sound } from '@/lib/audio-engine'
import dynamic from 'next/dynamic'

const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then((mod) => mod.GitHubCalendar),
  { ssr: false }
)
gsap.registerPlugin(ScrollTrigger)

function StatCounter({ target, label, sublabel }: { target: number, label: string, sublabel: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    if (prefersReducedMotion()) {
      if (nodeRef.current) nodeRef.current.textContent = String(target)
      return
    }
    const node = nodeRef.current
    if (!node) return
    
    const obj = { val: 0 }
    const tl = gsap.to(obj, {
      val: target,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: node,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        node.textContent = Math.floor(obj.val).toString()
      }
    })
    
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [target])

  return (
    <div>
      <dt className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-4xl font-bold text-signal font-mono">
        <span ref={nodeRef}>0</span>+ <span className="text-xs font-sans font-normal text-muted-foreground">{sublabel}</span>
      </dd>
    </div>
  )
}

import { Redact } from '@/components/redact-context'

function RedactedText({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (prefersReducedMotion()) return
    const container = containerRef.current
    if (!container) return
    const lines = container.querySelectorAll('.redact-bar')
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        once: true,
      }
    })
    
    tl.to(lines, {
      scaleX: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: 'power2.out',
      transformOrigin: 'right center'
    })
    
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className="space-y-4 text-base leading-relaxed text-foreground/85">
      {/* We fake "lines" by splitting the paragraph into blocks and overlaying black bars */}
      <div className="relative inline-block w-full">
        Computer Science (<Redact>AI &amp; ML</Redact>) student at <Redact>JSS Academy of Technical</Redact>
        <div className="redact-bar absolute inset-0 bg-black scale-x-100 origin-right pointer-events-none" />
      </div>
      <div className="relative inline-block w-full">
        <Redact>Education, Bengaluru</Redact> (2023–2027). Working at the intersection of
        <div className="redact-bar absolute inset-0 bg-black scale-x-100 origin-right pointer-events-none" />
      </div>
      <div className="relative inline-block w-full">
        full-stack engineering and <Redact>applied machine learning</Redact>, with a bias
        <div className="redact-bar absolute inset-0 bg-black scale-x-100 origin-right pointer-events-none" />
      </div>
      <div className="relative inline-block w-full">
        toward systems that hold up in <Redact>production</Redact>.
        <div className="redact-bar absolute inset-0 bg-black scale-x-100 origin-right pointer-events-none" />
      </div>
    </div>
  )
}

function LiveGitHubStats() {
  const [data, setData] = useState<{ repos: number; commits: number; live: boolean } | null>(null)

  useEffect(() => {
    fetch('/api/github-stats')
      .then(res => {
        if (!res.ok) throw new Error('API error')
        return res.json()
      })
      .then(setData)
      .catch(() => setData({ repos: 15, commits: 150, live: false }))
  }, [])

  if (!data) {
    return <StatCounter target={15} label="Repositories Maintained" sublabel="GitHub" />
  }

  return (
    <>
      <div className="relative">
        {data.live && (
          <div className="absolute -top-5 right-0 flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-signal"></span>
            </span>
            <span className="font-mono text-[9px] tracking-widest text-signal">LIVE</span>
          </div>
        )}
        <StatCounter 
          target={data.repos} 
          label={data.live ? "REPOSITORIES" : "Repositories Maintained"} 
          sublabel="GitHub" 
        />
      </div>
      {data.live && (
        <StatCounter target={data.commits} label="COMMITS TRACKED" sublabel="GitHub" />
      )}
    </>
  )
}

export function About() {
  return (
    <Section id="about" fileLabel="SECTION 01 // SUBJECT PROFILE" title="About">
      <div className="grid gap-8 md:grid-cols-[1fr_auto]">
        <RedactedText>
          Computer Science (AI &amp; ML) student at JSS Academy of Technical Education, Bengaluru (2023–2027). Working at the intersection of full-stack engineering and applied machine learning, with a bias toward systems that hold up in production.
        </RedactedText>
        
        <dl className="grid shrink-0 grid-cols-1 gap-6 border border-white/5 bg-card hover:bg-card-hover transition-colors p-6 md:w-64">
          <StatCounter target={200} label="DSA Problems Solved" sublabel="LeetCode" />
          <LiveGitHubStats />
          <StatCounter target={50} label="Students Mentored" sublabel="MERN workshops" />
        </dl>
      </div>

      <div className="mt-8 border border-white/5 bg-card hover:bg-card-hover transition-colors p-6 overflow-hidden">
        <h4 className="font-mono text-[10px] tracking-[0.25em] text-signal/70 mb-6 uppercase">
          GITHUB ACTIVITY MATRIX
        </h4>
        <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-signal/50 scrollbar-track-transparent">
          <div className="min-w-fit">
            <GitHubCalendar 
              username="pjha26" 
              colorScheme="dark"
              theme={{
                dark: ['#1c1c20', '#5c4a00', '#997a00', '#d6ab00', '#f5c400']
              }}
              fontSize={12}
              blockSize={12}
              blockMargin={4}
              blockRadius={1}
            />
          </div>
        </div>
      </div>
    </Section>
  )
}

function Pushpin() {
  return (
    <svg className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 drop-shadow-md z-10" viewBox="0 0 24 24" fill="none" stroke="#f5c400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="6" r="4" fill="#f5c400" />
      <line x1="12" y1="10" x2="12" y2="22" stroke="#d1d5db" />
      <line x1="8" y1="10" x2="16" y2="10" />
    </svg>
  )
}

function EvidenceBoard() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (prefersReducedMotion()) return
    const container = containerRef.current
    if (!container) return
    
    const cards = container.querySelectorAll('.evidence-card')
    const path = container.querySelector('.red-string-path') as SVGPathElement
    
    if (path) {
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
    }
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        once: true
      }
    })
    
    // Cards reveal first
    tl.fromTo(cards, 
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out' }
    )
    
    // Then string draws in
    if (path) {
      tl.to(path, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.inOut'
      }, '-=0.2') // Slight overlap
    }
    
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className="relative mt-12 pt-4">
      <svg className="absolute top-12 left-[16%] w-[68%] h-24 pointer-events-none hidden md:block z-0 overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
        <path className="red-string-path" d="M0,0 Q25,20 50,0 Q75,20 100,0" fill="none" stroke="#8b1a1a" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <div className="grid gap-8 md:grid-cols-3 relative z-10">
        {PRINCIPLES.map((p, i) => {
          const rotation = i % 2 === 0 ? '-rotate-2' : 'rotate-2'
          return (
            <div key={p.code} className={cn("evidence-card relative transition-all duration-200 hover:rotate-0 hover:scale-[1.02]", rotation)}>
              <Pushpin />
              <TiltCard 
                data-cursor-text="[ EXAMINE ]"
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  sound.playAccessGranted()
                  gsap.fromTo(e.currentTarget, 
                    { filter: 'brightness(2) contrast(1.5)', scale: 0.95 },
                    { filter: 'brightness(1) contrast(1)', scale: 1, duration: 0.5, ease: 'back.out(2)' }
                  )
                }}
                className="p-6 h-full flex flex-col glass-panel hover:bg-[var(--card-hover)] transition-colors border-white/5 shadow-xl cursor-none"
              >
                <p className="font-mono text-[10px] tracking-[0.25em] text-signal text-glow">
                  {p.code}
                </p>
                <h3 className="dossier-heading mt-3 text-lg text-foreground uppercase tracking-widest">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground flex-grow">
                  {p.body}
                </p>
              </TiltCard>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function HowIBuild() {
  return (
    <Section
      id="how-i-build"
      fileLabel="SECTION 02 // FIELD NOTES"
      title="How I Build"
    >
      <EvidenceBoard />
    </Section>
  )
}
