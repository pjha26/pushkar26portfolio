import type { Metadata } from 'next'
import { Hero } from '@/components/hero'
import { Projects } from '@/components/projects'
import { About } from '@/components/about'
import { Skills } from '@/components/skills'
import { SecureComm } from '@/components/secure-comm'
import { CinematicScroll } from '@/components/cinematic-scroll'

export const metadata: Metadata = { alternates: { canonical: '/' } }

export default function Page() {
  return (
    <CinematicScroll>
      <Hero />
      <Projects />
      <About />
      <Skills />
      <SecureComm />
    </CinematicScroll>
  )
}
