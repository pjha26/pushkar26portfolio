'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSectionReveal, prefersReducedMotion } from '@/lib/use-reveal'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

type SectionProps = {
  id: string
  fileLabel: string
  title: string
  children: ReactNode
  className?: string
  disableReveal?: boolean
}

export function Section({ id, fileLabel, title, children, className, disableReveal }: SectionProps) {
  const ref = useSectionReveal<HTMLElement>({ disable: disableReveal })
  const dividerRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  // Signal-yellow divider draws itself across the screen when scrolled into view
  useEffect(() => {
    const divider = dividerRef.current
    if (!divider || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        divider,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: divider, start: 'top 90%', once: true },
        },
      )
    }, divider)
    
    return () => ctx.revert()
  }, [])

  // Cryptographic scramble text effect for fileLabel
  useEffect(() => {
    const label = labelRef.current
    if (!label || prefersReducedMotion() || disableReveal) return

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>/-_+=|\\'
    const originalText = fileLabel

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: label,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          let iter = 0
          const interval = setInterval(() => {
            label.innerText = originalText
              .split('')
              .map((char, index) => {
                if (char === ' ') return ' '
                if (index < iter) return originalText[index]
                return chars[Math.floor(Math.random() * chars.length)]
              })
              .join('')
            
            if (iter >= originalText.length) {
              clearInterval(interval)
              label.innerText = originalText
            }
            iter += 1/2
          }, 30)
        }
      })
    }, label)

    return () => ctx.revert()
  }, [fileLabel, disableReveal])

  return (
    <section
      id={id}
      ref={ref}
      className={cn("relative scroll-mt-12 px-6 py-20 md:px-12 md:py-28 lg:px-20", className)}
    >
      <div
        ref={dividerRef}
        aria-hidden="true"
        className="section-divider absolute left-0 top-0"
      />
      <div className="mx-auto w-full max-w-4xl">
        <div data-reveal className="flex items-baseline gap-4">
          <span ref={labelRef} className="font-mono text-[10px] tracking-[0.25em] text-signal min-h-[14px]">
            {fileLabel}
          </span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>
        <h2
          data-reveal
          className="dossier-heading mt-4 text-3xl text-[#f5f5f5] md:text-4xl"
        >
          <span className="inline-block w-3 h-[3px] bg-signal mr-3 align-middle" />
          {title}
        </h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
