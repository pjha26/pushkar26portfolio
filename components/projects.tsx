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

function CaseCard({ caseFile: c }: { caseFile: CaseFile }) {
  const [open, setOpen] = useState(false)
  const bodyId = `${c.fileNumber.replace(/\s/g, '-').toLowerCase()}-body`

  return (
    <article
      data-case-card
      data-cursor-card="OPEN"
      className="glow-hover border border-border bg-card"
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full flex-col gap-2 px-6 py-5 text-left md:flex-row md:items-center md:justify-between"
      >
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[10px] tracking-[0.25em] text-signal">
            {c.fileNumber}
          </span>
          <h3 className="dossier-heading text-xl text-foreground md:text-2xl">
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
        id={bodyId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-6 py-6">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h4 className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
                  PROBLEM
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                  {c.problem}
                </p>
              </div>
              <div>
                <h4 className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
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
              <h4 className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
                STACK
              </h4>
              <ul className="mt-2 flex flex-wrap gap-2">
                {c.stack.map((tag) => (
                  <li
                    key={tag}
                    className="border border-border bg-muted px-2 py-1 font-mono text-xs text-foreground/80"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap gap-6">
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
    </article>
  )
}
