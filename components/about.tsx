'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Section } from '@/components/section'
import { PRINCIPLES } from '@/lib/dossier-data'
import { TiltCard } from '@/components/ui/tilt-card'
import { prefersReducedMotion } from '@/lib/use-reveal'
import { cn } from '@/lib/utils'

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
      <dd className="mt-1 text-3xl font-bold text-foreground font-mono">
        <span ref={nodeRef}>0</span>+ <span className="text-xs font-sans font-normal text-muted-foreground">{sublabel}</span>
      </dd>
    </div>
  )
}

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
        Computer Science (AI &amp; ML) student at JSS Academy of Technical
        <div className="redact-bar absolute inset-0 bg-black scale-x-100 origin-right pointer-events-none" />
      </div>
      <div className="relative inline-block w-full">
        Education, Bengaluru (2023–2027). Working at the intersection of
        <div className="redact-bar absolute inset-0 bg-black scale-x-100 origin-right pointer-events-none" />
      </div>
      <div className="relative inline-block w-full">
        full-stack engineering and applied machine learning, with a bias
        <div className="redact-bar absolute inset-0 bg-black scale-x-100 origin-right pointer-events-none" />
      </div>
      <div className="relative inline-block w-full">
        toward systems that hold up in production.
        <div className="redact-bar absolute inset-0 bg-black scale-x-100 origin-right pointer-events-none" />
      </div>
    </div>
  )
}

export function About() {
  return (
    <Section id="about" fileLabel="SECTION 01 // SUBJECT PROFILE" title="About">
      <div className="grid gap-8 md:grid-cols-[1fr_auto]">
        <RedactedText>
          Computer Science (AI &amp; ML) student at JSS Academy of Technical Education, Bengaluru (2023–2027). Working at the intersection of full-stack engineering and applied machine learning, with a bias toward systems that hold up in production.
        </RedactedText>
        
        <dl className="grid shrink-0 grid-cols-1 gap-6 border border-border bg-card p-6 md:w-64">
          <StatCounter target={200} label="DSA Problems Solved" sublabel="LeetCode" />
          <StatCounter target={15} label="Repositories Maintained" sublabel="GitHub" />
          <StatCounter target={50} label="Students Mentored" sublabel="MERN workshops" />
        </dl>
      </div>
    </Section>
  )
}

function Pushpin() {
  return (
    <svg className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 drop-shadow-md z-10" viewBox="0 0 24 24" fill="none" stroke="#b3453f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="6" r="4" fill="#b3453f" />
      <line x1="12" y1="10" x2="12" y2="22" stroke="#d1d5db" />
      <line x1="8" y1="10" x2="16" y2="10" />
    </svg>
  )
}

function RedString() {
  const pathRef = useRef<SVGPathElement>(null)
  
  useEffect(() => {
    if (prefersReducedMotion()) return
    const path = pathRef.current
    if (!path) return
    const length = path.getTotalLength()
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
    
    const tl = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: path,
        start: 'top 75%',
        once: true
      }
    })
    
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <svg className="absolute top-12 left-[15%] w-[70%] h-32 pointer-events-none hidden md:block z-0" viewBox="0 0 100 20" preserveAspectRatio="none">
      <path ref={pathRef} d="M0,0 Q25,20 50,0 T100,0" fill="none" stroke="#8b1a1a" strokeWidth="1.5" className="opacity-70 drop-shadow-sm" />
    </svg>
  )
}

export function HowIBuild() {
  return (
    <Section
      id="how-i-build"
      fileLabel="SECTION 02 // FIELD NOTES"
      title="How I Build"
    >
      <div className="relative mt-8">
        <RedString />
        <div className="grid gap-8 md:grid-cols-3 relative z-10">
          {PRINCIPLES.map((p, i) => {
            const rotation = i % 2 === 0 ? '-rotate-2' : 'rotate-2'
            
            return (
              <div key={p.code} className={cn("relative transition-transform duration-300 hover:rotate-0 hover:-translate-y-2", rotation)}>
                <Pushpin />
                <TiltCard className="p-6 h-full flex flex-col bg-[#14141a]/95 border-border shadow-xl backdrop-blur-sm">
                  <p className="font-mono text-[10px] tracking-[0.25em] text-signal">
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
    </Section>
  )
}
