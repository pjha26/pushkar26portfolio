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
import Image from 'next/image'

const ActivityCalendar = dynamic(
  () => import('react-activity-calendar').then((mod) => mod.ActivityCalendar),
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

function InvestigatorMiniGame() {
  const [decrypted, setDecrypted] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)
  
  const handleDecrypt = () => {
    if (decrypted || !textRef.current) return
    setDecrypted(true)
    sound.playHover()
    
    const originalText = "CLASSIFIED SKILL: Advanced Cyber Threat Intelligence & Reverse Engineering"
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>/-_+=|\\'
    
    let iter = 0
    const interval = setInterval(() => {
      textRef.current!.innerText = originalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' '
          if (index < iter) return originalText[index]
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join('')
      
      if (iter >= originalText.length) {
        clearInterval(interval)
        sound.playAccessGranted()
      }
      iter += 1/2
    }, 20)
  }

  return (
    <div 
      className="mt-6 border-l-2 border-signal/50 pl-4 py-2 cursor-pointer group relative overflow-hidden"
      onClick={handleDecrypt}
      data-cursor-text="[ DECRYPT ]"
    >
      <div className="font-mono text-[10px] tracking-[0.2em] text-signal/50 uppercase mb-2">
        ATTACHMENT // FILE PR-99
      </div>
      <div 
        ref={textRef} 
        className={cn(
          "font-mono text-sm sm:text-base leading-relaxed break-words",
          decrypted ? "text-signal" : "bg-black text-black select-none"
        )}
      >
        CLASSIFIED SKILL: Advanced Cyber Threat Intelligence & Reverse Engineering
      </div>
      {!decrypted && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="font-mono text-xs tracking-widest text-signal animate-pulse">
            DECRYPT_PAYLOAD
          </span>
        </div>
      )}
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

function LiveActivityCalendar() {
  const [data, setData] = useState<any[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/github-calendar')
      .then(res => {
        if (!res.ok) throw new Error('API error')
        return res.json()
      })
      .then(setData)
      .catch(() => setError(true))
  }, [])

  if (error) {
    return <div className="text-muted-foreground text-sm font-mono">Error fetching GitHub calendar data.</div>
  }

  if (!data) {
    return (
      <div className="animate-pulse flex gap-1">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="w-3 h-3 bg-white/5 rounded-sm" />
        ))}
      </div>
    )
  }

  return (
    <ActivityCalendar 
      data={data}
      colorScheme="dark"
      theme={{
        dark: [
          '#1c1c20', 
          'color-mix(in srgb, var(--signal) 25%, transparent)', 
          'color-mix(in srgb, var(--signal) 50%, transparent)', 
          'color-mix(in srgb, var(--signal) 75%, transparent)', 
          'var(--signal)'
        ]
      }}
      labels={{
        totalCount: '{{count}} activities in the last year'
      }}
      fontSize={12}
      blockSize={12}
      blockMargin={4}
      blockRadius={1}
      showWeekdayLabels
    />
  )
}

export function About() {
  return (
    <Section id="about" fileLabel="SECTION 01 // SUBJECT PROFILE" title="About">
      <div className="grid gap-8 md:grid-cols-[auto_1fr_auto]">
        {/* Profile Image Column */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <div className="relative group p-2 border border-white/10 bg-card hover:bg-card-hover transition-colors overflow-hidden">
            <div className="relative w-48 h-64 overflow-hidden rounded-sm bg-black border border-white/5 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              {/* Continuous Scanner line effect (clipped inside the image now) */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-signal/30 to-transparent h-16 w-full -translate-y-full animate-scan pointer-events-none z-30 opacity-75" />
              
              {/* Intense Cyberpunk Color Grade to mask artifacts */}
              <div className="absolute inset-0 saturate-[0.6] contrast-[1.25] brightness-90 hue-rotate-[10deg] transition-all duration-700 group-hover:saturate-100 group-hover:contrast-100">
                <Image 
                  src="/PRF1.jpeg" 
                  alt="Subject Photo" 
                  fill
                  className="object-cover object-center grayscale-[0.3]"
                  sizes="(max-width: 768px) 192px, 192px"
                  priority
                />
              </div>
              
              {/* Dynamic Holographic Glow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-signal/40 via-signal/0 to-transparent mix-blend-overlay animate-pulse pointer-events-none z-10 opacity-80" />
              
              {/* Subtle dark overlay/gradient at the bottom for text contrast */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/50 to-transparent z-10 pointer-events-none" />
              
              {/* CRT Scanlines pattern */}
              <div 
                className="absolute inset-0 z-20 pointer-events-none opacity-[0.15]" 
                style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, #000 2px, #000 4px)' }}
              />
            </div>
            
            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-2">
              <span className="font-mono text-[9px] tracking-widest text-signal animate-pulse">● LIVE_FEED</span>
              <span className="font-mono text-[9px] tracking-widest text-muted-foreground">ID: PR-2027</span>
            </div>
          </div>
        </div>

        {/* Details Column */}
        <div className="flex flex-col">
          <RedactedText>
            Computer Science (AI &amp; ML) student at JSS Academy of Technical Education, Bengaluru (2023–2027). Working at the intersection of full-stack engineering and applied machine learning, with a bias toward systems that hold up in production.
          </RedactedText>
          <InvestigatorMiniGame />
        </div>
        
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
            <LiveActivityCalendar />
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
