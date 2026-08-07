'use client'

import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { Section } from '@/components/section'
import { MagneticLink } from '@/components/magnetic-link'
import { LINKS, SKILL_GROUPS } from '@/lib/dossier-data'

export function Skills() {
  return (
    <Section id="skills" fileLabel="SECTION 04 // EQUIPMENT" title="Skills">
      <div className="space-y-8">
        {SKILL_GROUPS.map((group) => (
          <div key={group.label} data-reveal>
            <h3 className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
              {group.label}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="glow-hover border border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground/85"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

export function Experience() {
  return (
    <Section
      id="resume"
      fileLabel="SECTION 05 // SERVICE RECORD"
      title="Experience"
    >
      <ol className="relative border-l border-border pl-8">
        <li data-reveal className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[37px] top-1.5 h-2 w-2 bg-signal"
          />
          <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
            SEP 2023 — PRESENT · BENGALURU
          </p>
          <h3 className="dossier-heading mt-2 text-lg text-foreground">
            Full-Stack Developer &amp; Open Source Contributor
          </h3>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            Independent Technical Projects
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/85">
            Designing, shipping, and operating production systems end-to-end:
            multi-agent AI platforms, real-time booking infrastructure, voice
            interview tooling, and edge-deployed bot analytics — with CI/CD,
            observability, and failure-tolerant architecture as defaults, not
            afterthoughts.
          </p>
        </li>
      </ol>
    </Section>
  )
}

export function Achievements() {
  return (
    <Section
      id="achievements"
      fileLabel="SECTION 06 // COMMENDATIONS"
      title="Achievements"
    >
      <div className="grid gap-px border border-border bg-border md:grid-cols-2">
        <article data-reveal className="glow-hover bg-card p-6">
          <p className="font-mono text-[10px] tracking-[0.25em] text-signal">
            1ST PLACE
          </p>
          <h3 className="dossier-heading mt-3 text-lg text-foreground">
            Nexathon 2025
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Dr. T. Thimmaiah Institute of Technology
          </p>
        </article>
        <article data-reveal className="glow-hover bg-card p-6">
          <p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
            PARTICIPANT
          </p>
          <h3 className="dossier-heading mt-3 text-lg text-foreground">
            THINK2IMPACT Ideathon 2.0
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            AICTE IC-AISMART, JSSATE Bengaluru
          </p>
        </article>
      </div>
    </Section>
  )
}

export function Contact() {
  return (
    <footer
      id="contact"
      className="scroll-mt-12 border-t border-border px-6 py-20 md:px-12 lg:px-20"
    >
      <div className="mx-auto w-full max-w-4xl">
        <p className="font-mono text-[10px] tracking-[0.25em] text-signal">
          END OF FILE {'//'} CONTACT
        </p>
        <h2 className="dossier-heading mt-4 text-3xl text-foreground md:text-4xl">
          Open a Channel
        </h2>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <MagneticLink href={LINKS.email}>Email</MagneticLink>
          <MagneticLink href={LINKS.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </MagneticLink>
          <MagneticLink href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </MagneticLink>
          <MagneticLink href={LINKS.leetcode} target="_blank" rel="noopener noreferrer">
            LeetCode
          </MagneticLink>
        </div>
        <p className="mt-16 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
          FILE REF: PR-2027 · LAST UPDATED 2026 · ALL SYSTEMS NOMINAL
        </p>
      </div>
    </footer>
  )
}
