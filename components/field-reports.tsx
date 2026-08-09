'use client'

import { useRef, useEffect } from 'react'
import { Section } from '@/components/section'
import { TESTIMONIALS } from '@/lib/dossier-data'
import { Redact } from '@/components/redact-context'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function FieldReports() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.field-report-card', 
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%'
          }
        }
      )
    }, containerRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <Section id="testimonials" fileLabel="SECTION 06 // FIELD_REPORTS" title="Declassified Intelligence">
      <div ref={containerRef} className="mt-12 grid gap-6 md:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <div 
            key={t.id} 
            data-cursor-text="[ DECRYPT ]"
            className="field-report-card relative p-8 border border-white/10 bg-[#0a0a0d] shadow-lg group hover:border-signal/50 transition-colors"
          >
            {/* Top right "stamp" */}
            <div className="absolute top-4 right-4 border border-red-500/50 text-red-500 px-2 py-1 font-mono text-[8px] uppercase tracking-widest rotate-12 opacity-70">
              CONFIDENTIAL
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs text-muted-foreground">
                0{i + 1}
              </div>
              <div>
                <h4 className="font-mono text-sm text-foreground font-bold uppercase tracking-wider">
                  <Redact>{t.author}</Redact>
                </h4>
                <p className="font-mono text-[10px] text-signal uppercase tracking-widest mt-1">
                  {t.title}
                </p>
              </div>
            </div>

            <blockquote className="relative">
              <span className="text-4xl text-white/5 absolute -top-4 -left-2 leading-none font-serif">"</span>
              <p className="relative z-10 text-sm leading-relaxed text-foreground/80 font-mono text-pretty italic">
                {/* Randomly redact parts of the quote if it's long, or just the whole thing? 
                    Let's redact random words to make it look like an actual dossier. */}
                {t.quote.split(' ').map((word, idx) => {
                  // Redact deterministically to avoid hydration mismatch
                  const isRedacted = word.length > 4 && (idx % 3 === 0 || idx % 7 === 0)
                  return isRedacted ? (
                    <span key={idx}><Redact>{word}</Redact>{' '}</span>
                  ) : (
                    <span key={idx}>{word}{' '}</span>
                  )
                })}
              </p>
            </blockquote>
          </div>
        ))}
      </div>
    </Section>
  )
}
