'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Section } from '@/components/section'
import { CASES, type CaseFile } from '@/lib/dossier-data'
import { prefersReducedMotion } from '@/lib/use-reveal'

gsap.registerPlugin(ScrollTrigger)

export function Projects() {
  const listRef = useRef<HTMLDivElement>(null)

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
      <div ref={listRef} className="flex flex-col gap-6" style={{ perspective: 900 }}>
        {CASES.map((c) => (
          <CaseCard key={c.fileNumber} caseFile={c} />
        ))}
      </div>
    </Section>
  )
}

import { TiltCard } from '@/components/ui/tilt-card'

function CaseCard({ caseFile: c }: { caseFile: CaseFile }) {
  const [open, setOpen] = useState(false)
  const tabRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (prefersReducedMotion()) return
    
    if (open) {
      // Slide OUT horizontally (like pulling a folder)
      gsap.to(tabRef.current, { x: 16, rotate: 1, duration: 0.4, ease: 'power2.out' })
      gsap.to(drawerRef.current, { autoAlpha: 1, height: 'auto', duration: 0.4, ease: 'power2.out', display: 'block' })
    } else {
      // Slide back IN
      gsap.to(tabRef.current, { x: 0, rotate: 0, duration: 0.35, ease: 'power2.inOut' })
      gsap.to(drawerRef.current, { autoAlpha: 0, height: 0, duration: 0.35, ease: 'power2.inOut', display: 'none' })
    }
  }, [open])

  return (
    <TiltCard
      data-case-card
      data-cursor-card="OPEN"
      className="group p-0 mb-6 bg-transparent border-none shadow-none"
    >
      <div className="relative">
        <button
          ref={tabRef}
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 flex w-full flex-col gap-2 px-6 py-5 text-left md:flex-row md:items-center md:justify-between outline-none bg-card border border-border shadow-md"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[10px] tracking-[0.25em] text-signal drop-shadow-[0_0_8px_rgba(245,196,0,0.4)]">
              {c.fileNumber}
            </span>
            <h3 className="dossier-heading text-xl text-foreground md:text-2xl uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
              {c.title}
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
              STATUS: {c.status}
            </span>
            <span
              aria-hidden="true"
              className={`font-mono text-sm text-signal transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
            >
              +
            </span>
          </div>
        </button>

        <div
          ref={drawerRef}
          className="relative z-0 hidden opacity-0 border border-border/50 bg-[#0e0e13]/90 backdrop-blur-md"
        >
          <div className="px-8 py-8 pt-10 mt-[-8px]">
            <div className="grid gap-8 md:grid-cols-2">
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

            <div className="mt-6">
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

            <div className="mt-8 flex flex-wrap gap-6">
              {c.github && (
                <a
                  href={c.github}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  className="link-underline font-mono text-xs uppercase tracking-widest text-signal"
                >
                  Live ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  )
}
