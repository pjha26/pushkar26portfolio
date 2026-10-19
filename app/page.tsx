import type { Metadata } from 'next'
import { Hero } from '@/components/hero'
import { Projects } from '@/components/projects'
import { About } from '@/components/about'
import { Skills } from '@/components/skills'
import { SecureComm } from '@/components/secure-comm'

export const metadata: Metadata = { alternates: { canonical: '/' } }

export default function Page() {
  return (
    <main id="main-content">
      <Hero />
      <Projects />
      <About />
      <Skills />
      <SecureComm />
    </main>
  )
}
