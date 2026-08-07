'use client'

import type { ReactNode } from 'react'
import { useSectionReveal } from '@/lib/use-reveal'

type SectionProps = {
  id: string
  fileLabel: string
  title: string
  children: ReactNode
}

export function Section({ id, fileLabel, title, children }: SectionProps) {
  const ref = useSectionReveal<HTMLElement>()

  return (
    <section
      id={id}
      ref={ref}
      className="scroll-mt-12 border-t border-border px-6 py-20 md:px-12 md:py-28 lg:px-20"
    >
      <div className="mx-auto w-full max-w-4xl">
        <div data-reveal className="flex items-baseline gap-4">
          <span className="font-mono text-[10px] tracking-[0.25em] text-signal">
            {fileLabel}
          </span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>
        <h2
          data-reveal
          className="dossier-heading mt-4 text-3xl text-foreground md:text-4xl"
        >
          {title}
        </h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
