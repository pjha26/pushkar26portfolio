'use client'

import { Section } from '@/components/section'
import { PRINCIPLES } from '@/lib/dossier-data'

export function About() {
  return (
    <Section id="about" fileLabel="SECTION 01 // SUBJECT PROFILE" title="About">
      <div data-reveal className="grid gap-8 md:grid-cols-[1fr_auto]">
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>
            Computer Science (AI &amp; ML) student at JSS Academy of Technical
            Education, Bengaluru — class of 2023&ndash;2027. Working at the
            intersection of full-stack engineering and applied machine
            learning, with a bias toward systems that hold up in production.
          </p>
        </div>
        <dl className="grid shrink-0 grid-cols-1 gap-6 border border-border bg-card p-6 font-mono text-sm md:w-64">
          <div>
            <dt className="text-[10px] tracking-[0.2em] text-muted-foreground">
              DSA PROBLEMS SOLVED
            </dt>
            <dd className="mt-1 text-2xl text-foreground">
              200+ <span className="text-xs text-muted-foreground">LeetCode</span>
            </dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.2em] text-muted-foreground">
              REPOSITORIES MAINTAINED
            </dt>
            <dd className="mt-1 text-2xl text-foreground">
              15+ <span className="text-xs text-muted-foreground">GitHub</span>
            </dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.2em] text-muted-foreground">
              STUDENTS MENTORED
            </dt>
            <dd className="mt-1 text-2xl text-foreground">
              50+{' '}
              <span className="text-xs text-muted-foreground">MERN workshops</span>
            </dd>
          </div>
        </dl>
      </div>
    </Section>
  )
}

import { TiltCard } from '@/components/ui/tilt-card'

export function HowIBuild() {
  return (
    <Section
      id="how-i-build"
      fileLabel="SECTION 02 // FIELD NOTES"
      title="How I Build"
    >
      <div className="grid gap-4 md:grid-cols-3" style={{ perspective: 1200 }}>
        {PRINCIPLES.map((p) => (
          <TiltCard key={p.code} className="group p-6 h-full flex flex-col">
            <p className="font-mono text-[10px] tracking-[0.25em] text-signal">
              {p.code}
            </p>
            <h3 className="dossier-heading mt-3 text-lg text-foreground uppercase tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
              {p.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground flex-grow">
              {p.body}
            </p>
          </TiltCard>
        ))}
      </div>
    </Section>
  )
}
