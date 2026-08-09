'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EXPERIENCE } from '@/lib/dossier-data'
import { Section } from '@/components/section'

gsap.registerPlugin(ScrollTrigger)

export function EvidenceBoard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const nodesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return

    const nodes = nodesRef.current.filter(Boolean) as HTMLDivElement[]
    
    // Draw SVG Line path
    const drawLine = () => {
      if (nodes.length < 2) return
      let d = ''
      nodes.forEach((node, i) => {
        const rect = node.getBoundingClientRect()
        const containerRect = containerRef.current!.getBoundingClientRect()
        // Connect the left side of each node (the glowing dot)
        const x = rect.left - containerRect.left + 16 // roughly center of the pin
        const y = rect.top - containerRect.top + 24
        
        if (i === 0) {
          d += `M ${x} ${y}`
        } else {
          // Curved path for "red string" effect
          const prevRect = nodes[i - 1].getBoundingClientRect()
          const prevX = prevRect.left - containerRect.left + 16
          const prevY = prevRect.top - containerRect.top + 24
          const cpY = (y + prevY) / 2
          d += ` C ${prevX} ${cpY}, ${x} ${cpY}, ${x} ${y}`
        }
      })
      lineRef.current!.setAttribute('d', d)
    }

    // Delay drawing to ensure fonts and layout are fully painted
    setTimeout(drawLine, 100)
    window.addEventListener('resize', drawLine)

    // Scroll animation to "reveal" the red string
    const pathLength = lineRef.current.getTotalLength() || 1000
    gsap.set(lineRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        end: 'bottom 80%',
        scrub: 1,
      }
    })

    tl.to(lineRef.current, {
      strokeDashoffset: 0,
      ease: 'none',
    })

    nodes.forEach((node) => {
      gsap.fromTo(node, 
        { autoAlpha: 0, x: -20 },
        { 
          autoAlpha: 1, 
          x: 0, 
          duration: 0.5, 
          scrollTrigger: {
            trigger: node,
            start: 'top 85%',
          }
        }
      )
    })

    return () => {
      window.removeEventListener('resize', drawLine)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <Section id="experience" fileLabel="SECTION 04 // EVIDENCE_BOARD" title="Development Milestones">
      <div className="relative mt-12 w-full min-h-[500px]" ref={containerRef}>
        
        {/* The Red String SVG */}
        <svg className="absolute left-0 top-0 h-full w-full pointer-events-none" style={{ zIndex: 0 }}>
          <path
            ref={lineRef}
            fill="none"
            stroke="rgb(220, 38, 38)"
            strokeWidth="2"
            className="drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]"
          />
        </svg>

        <div className="space-y-16 pl-4 md:pl-12">
          {EXPERIENCE.map((exp, i) => (
            <div 
              key={exp.id} 
              ref={(el) => { nodesRef.current[i] = el }}
              className="relative z-10 p-6 border border-white/5 bg-[#0a0a0d] shadow-[0_0_15px_rgba(0,0,0,0.5)] max-w-2xl group transition-colors hover:border-red-500/30"
            >
              {/* Pin / Node Point */}
              <div className="absolute -left-4 top-4 h-8 w-8 rounded-full border-2 border-[#0a0a0d] bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.6)] flex items-center justify-center transition-transform group-hover:scale-110">
                <div className="h-2 w-2 rounded-full bg-black" />
              </div>

              {/* Tape corner effect */}
              <div className="absolute -top-2 left-1/2 h-4 w-16 -translate-x-1/2 rotate-2 bg-white/10 shadow-sm" />

              <span className="font-mono text-[10px] tracking-widest text-red-500 mb-2 block uppercase">
                {exp.date}
              </span>
              <h3 className="text-xl font-bold text-foreground font-mono tracking-tight mb-1">
                {exp.role}
              </h3>
              <p className="text-sm font-mono tracking-widest text-muted-foreground uppercase mb-6">
                @ {exp.company}
              </p>

              <ul className="space-y-2">
                {exp.details.map((detail, j) => (
                  <li key={j} className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
                    <span className="text-red-500 mt-1">▸</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </Section>
  )
}
